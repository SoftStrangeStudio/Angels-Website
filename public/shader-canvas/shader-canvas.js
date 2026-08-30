const MODULE_URL = new URL(import.meta.url);
const DEFAULT_VERTEX_URL = new URL("./fullscreen.vert", MODULE_URL).href;
const DEFAULT_FRAGMENT_URL = new URL("./lightbulb.frag", MODULE_URL).href;
const DEFAULT_FALLBACK_URL = new URL("./lightbulb-fallback.svg", MODULE_URL).href;

const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      position: relative;
      display: block;
      min-width: 1px;
      min-height: 1px;
      overflow: hidden;
      contain: layout paint style;
      isolation: isolate;
      pointer-events: none;
      background: var(--shader-fallback-background, transparent);
    }

    canvas,
    img {
      position: absolute;
      inset: 0;
      display: block;
      width: 100%;
      height: 100%;
    }

    canvas {
      z-index: 1;
      pointer-events: none;
    }

    :host([fallback-fill]) img {
      left: var(--fallback-left, 0%);
      right: auto;
      width: calc(var(--fallback-right, 100%) - var(--fallback-left, 0%));
      object-fit: fill;
    }

    :host([interactive]) {
      pointer-events: auto;
    }

    :host([interactive]) canvas {
      pointer-events: auto;
    }

    img {
      z-index: 0;
      object-fit: contain;
      opacity: 1;
      transition: opacity 160ms ease;
      pointer-events: none;
    }

    :host([data-shader-ready]) img {
      opacity: 0;
    }

    @media (prefers-reduced-motion: reduce) {
      img {
        transition: none;
      }
    }
  </style>
  <img part="fallback" alt="" />
  <canvas part="canvas"></canvas>
`;

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function finiteAttribute(element, name, fallback) {
  const value = Number.parseFloat(element.getAttribute(name) ?? "");
  return Number.isFinite(value) ? value : fallback;
}

function compileShader(gl, type, source, label) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || `Unable to compile ${label}.`;
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
}

function createProgram(gl, vertexSource, fragmentSource) {
  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexSource, "vertex shader");
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource, "fragment shader");
  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) || "Unable to link shader program.";
    gl.deleteProgram(program);
    throw new Error(message);
  }

  return program;
}

export class ShaderCanvas extends HTMLElement {
  static get observedAttributes() {
    return ["fallback", "paused", "quality", "max-dpr", "interactive", "render-mode"];
  }

  #canvas;
  #fallback;
  #gl = null;
  #program = null;
  #vao = null;
  #uniforms = null;
  #resizeObserver = null;
  #intersectionObserver = null;
  #motionQuery = null;
  #frame = 0;
  #startTime = 0;
  #connected = false;
  #visible = true;
  #documentVisible = true;
  #reducedMotion = false;
  #contextLost = false;
  #loadToken = 0;
  #pointer = [0.5, 0.5];
  #customUniforms = new Map();
  #customUniformLocations = new Map();

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));
    this.#canvas = shadow.querySelector("canvas");
    this.#fallback = shadow.querySelector("img");
  }

  connectedCallback() {
    if (this.#connected) return;
    this.#connected = true;
    this.setAttribute("aria-hidden", "true");
    this.#fallback.src = this.getAttribute("fallback") || DEFAULT_FALLBACK_URL;
    this.#documentVisible = document.visibilityState !== "hidden";

    this.#resizeObserver = new ResizeObserver(() => {
      this.#resize();
      this.#renderOnce();
    });
    this.#resizeObserver.observe(this);

    this.#intersectionObserver = new IntersectionObserver(([entry]) => {
      this.#visible = entry?.isIntersecting ?? true;
      this.#syncAnimation();
    });
    this.#intersectionObserver.observe(this);

    this.#motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    this.#reducedMotion = this.#motionQuery.matches;
    this.#motionQuery.addEventListener("change", this.#onMotionChange);
    document.addEventListener("visibilitychange", this.#onVisibilityChange);
    this.#canvas.addEventListener("webglcontextlost", this.#onContextLost);
    this.#canvas.addEventListener("webglcontextrestored", this.#onContextRestored);
    this.#canvas.addEventListener("pointermove", this.#onPointerMove, { passive: true });
    this.#canvas.addEventListener("pointerleave", this.#onPointerLeave, { passive: true });

    this.#initialize();
  }

  disconnectedCallback() {
    this.#connected = false;
    this.#loadToken += 1;
    this.#stopAnimation();
    this.#resizeObserver?.disconnect();
    this.#intersectionObserver?.disconnect();
    this.#motionQuery?.removeEventListener("change", this.#onMotionChange);
    document.removeEventListener("visibilitychange", this.#onVisibilityChange);
    this.#canvas.removeEventListener("webglcontextlost", this.#onContextLost);
    this.#canvas.removeEventListener("webglcontextrestored", this.#onContextRestored);
    this.#canvas.removeEventListener("pointermove", this.#onPointerMove);
    this.#canvas.removeEventListener("pointerleave", this.#onPointerLeave);
    this.#dispose(false);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === "fallback" && this.#fallback) {
      this.#fallback.src = newValue || DEFAULT_FALLBACK_URL;
    }

    if (name === "interactive" && !this.hasAttribute("interactive")) {
      this.#pointer = [0.5, 0.5];
    }

    if (this.#connected) {
      this.#resize();
      this.#syncAnimation();
      this.#renderOnce();
    }
  }

  get rendererInfo() {
    if (!this.#gl) return null;
    const extension = this.#gl.getExtension("WEBGL_debug_renderer_info");
    return {
      version: this.#gl.getParameter(this.#gl.VERSION),
      vendor: extension
        ? this.#gl.getParameter(extension.UNMASKED_VENDOR_WEBGL)
        : this.#gl.getParameter(this.#gl.VENDOR),
      renderer: extension
        ? this.#gl.getParameter(extension.UNMASKED_RENDERER_WEBGL)
        : this.#gl.getParameter(this.#gl.RENDERER),
    };
  }

  pause() {
    this.setAttribute("paused", "");
  }

  resume() {
    this.removeAttribute("paused");
  }

  setFloat(name, value) {
    if (typeof name !== "string" || !name.startsWith("u")) {
      throw new TypeError("Uniform names must be strings beginning with 'u'.");
    }
    if (!Number.isFinite(value)) {
      throw new TypeError(`${name} must be a finite number.`);
    }
    this.#customUniforms.set(name, { type: "1f", values: [value] });
    this.requestRender();
  }

  setVector2(name, x, y) {
    if (typeof name !== "string" || !name.startsWith("u")) {
      throw new TypeError("Uniform names must be strings beginning with 'u'.");
    }
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      throw new TypeError(`${name} values must be finite numbers.`);
    }
    this.#customUniforms.set(name, { type: "2f", values: [x, y] });
    this.requestRender();
  }

  requestRender() {
    this.#renderOnce();
  }

  async #initialize() {
    const loadToken = ++this.#loadToken;
    this.removeAttribute("data-shader-ready");

    try {
      const [vertexSource, fragmentSource] = await Promise.all([
        this.#loadSource("vertex-src", DEFAULT_VERTEX_URL),
        this.#loadSource("shader-src", DEFAULT_FRAGMENT_URL),
      ]);

      if (!this.#connected || loadToken !== this.#loadToken) return;

      const gl = this.#canvas.getContext("webgl2", {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        powerPreference: "high-performance",
      });

      if (!gl) throw new Error("WebGL2 is unavailable.");

      this.#gl = gl;
      this.#program = createProgram(gl, vertexSource, fragmentSource);
      this.#vao = gl.createVertexArray();
      this.#uniforms = {
        resolution: gl.getUniformLocation(this.#program, "uResolution"),
        time: gl.getUniformLocation(this.#program, "uTime"),
        pointer: gl.getUniformLocation(this.#program, "uPointer"),
        reducedMotion: gl.getUniformLocation(this.#program, "uReducedMotion"),
      };
      this.#customUniformLocations.clear();

      gl.useProgram(this.#program);
      gl.bindVertexArray(this.#vao);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.clearColor(0, 0, 0, 0);

      this.#startTime = performance.now();
      this.#resize();
      this.setAttribute("data-shader-ready", "");
      this.#renderOnce();
      this.#syncAnimation();

      this.dispatchEvent(new CustomEvent("shaderready", {
        detail: this.rendererInfo,
        bubbles: true,
      }));
    } catch (error) {
      if (!this.#connected || loadToken !== this.#loadToken) return;
      this.#fail(error);
    }
  }

  async #loadSource(attributeName, fallbackUrl) {
    const url = new URL(this.getAttribute(attributeName) || fallbackUrl, document.baseURI);
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Unable to load ${url.href}: ${response.status} ${response.statusText}`);
    }
    return response.text();
  }

  #resize() {
    if (!this.#gl || this.#contextLost) return;
    const rect = this.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const quality = this.getAttribute("quality") || "auto";
    const qualityScale = quality === "low" ? 0.65 : quality === "high" ? 1 : 0.85;
    const dprCap = clamp(finiteAttribute(this, "max-dpr", 1.5), 0.5, 2);
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap) * qualityScale;
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));

    if (this.#canvas.width !== width || this.#canvas.height !== height) {
      this.#canvas.width = width;
      this.#canvas.height = height;
      this.#gl.viewport(0, 0, width, height);
    }
  }

  #render = (timestamp) => {
    this.#frame = 0;
    if (!this.#canRender()) return;

    const elapsed = this.#reducedMotion ? 0 : (timestamp - this.#startTime) / 1000;
    const gl = this.#gl;
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(this.#program);
    gl.bindVertexArray(this.#vao);
    gl.uniform2f(this.#uniforms.resolution, this.#canvas.width, this.#canvas.height);
    gl.uniform1f(this.#uniforms.time, elapsed);
    gl.uniform2f(this.#uniforms.pointer, this.#pointer[0], this.#pointer[1]);
    gl.uniform1f(this.#uniforms.reducedMotion, this.#reducedMotion ? 1 : 0);
    this.#applyCustomUniforms();
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    if (this.#shouldAnimate()) {
      this.#frame = requestAnimationFrame(this.#render);
    }
  };

  #renderOnce() {
    if (!this.#canRender()) return;
    if (this.#frame) cancelAnimationFrame(this.#frame);
    this.#frame = requestAnimationFrame(this.#render);
  }

  #syncAnimation() {
    if (this.#shouldAnimate()) {
      if (!this.#frame) this.#frame = requestAnimationFrame(this.#render);
    } else {
      this.#stopAnimation();
      if (this.#canRender()) this.#renderOnce();
    }
  }

  #shouldAnimate() {
    return this.#canRender()
      && this.#visible
      && this.#documentVisible
      && !this.hasAttribute("paused")
      && this.getAttribute("render-mode") !== "manual"
      && !this.#reducedMotion;
  }

  #applyCustomUniforms() {
    for (const [name, uniform] of this.#customUniforms) {
      if (!this.#customUniformLocations.has(name)) {
        this.#customUniformLocations.set(name, this.#gl.getUniformLocation(this.#program, name));
      }
      const location = this.#customUniformLocations.get(name);
      if (location === null) continue;
      if (uniform.type === "1f") {
        this.#gl.uniform1f(location, uniform.values[0]);
      } else if (uniform.type === "2f") {
        this.#gl.uniform2f(location, uniform.values[0], uniform.values[1]);
      }
    }
  }

  #canRender() {
    return Boolean(
      this.#connected
      && this.#gl
      && this.#program
      && this.#vao
      && !this.#contextLost,
    );
  }

  #stopAnimation() {
    if (this.#frame) cancelAnimationFrame(this.#frame);
    this.#frame = 0;
  }

  #dispose(loseContext = false) {
    if (!this.#gl) return;
    const gl = this.#gl;
    if (!this.#contextLost) {
      if (this.#vao) gl.deleteVertexArray(this.#vao);
      if (this.#program) gl.deleteProgram(this.#program);
      if (loseContext) gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
    this.#vao = null;
    this.#program = null;
    this.#uniforms = null;
    this.#customUniformLocations.clear();
    this.#gl = null;
    this.removeAttribute("data-shader-ready");
  }

  #fail(error) {
    this.#stopAnimation();
    this.#dispose(false);
    this.removeAttribute("data-shader-ready");
    const detail = error instanceof Error ? error : new Error(String(error));
    this.dispatchEvent(new CustomEvent("shadererror", { detail, bubbles: true }));
  }

  #onVisibilityChange = () => {
    this.#documentVisible = document.visibilityState !== "hidden";
    this.#syncAnimation();
  };

  #onMotionChange = (event) => {
    this.#reducedMotion = event.matches;
    this.#syncAnimation();
  };

  #onPointerMove = (event) => {
    if (!this.hasAttribute("interactive")) return;
    const rect = this.#canvas.getBoundingClientRect();
    this.#pointer = [
      clamp((event.clientX - rect.left) / Math.max(rect.width, 1), 0, 1),
      clamp(1 - (event.clientY - rect.top) / Math.max(rect.height, 1), 0, 1),
    ];
  };

  #onPointerLeave = () => {
    this.#pointer = [0.5, 0.5];
  };

  #onContextLost = (event) => {
    event.preventDefault();
    this.#contextLost = true;
    this.#stopAnimation();
    this.removeAttribute("data-shader-ready");
    this.dispatchEvent(new CustomEvent("shadercontextlost", { bubbles: true }));
  };

  #onContextRestored = () => {
    this.#contextLost = false;
    this.#program = null;
    this.#vao = null;
    this.#uniforms = null;
    this.#gl = null;
    if (this.#connected) this.#initialize();
  };
}

if (!customElements.get("shader-canvas")) {
  customElements.define("shader-canvas", ShaderCanvas);
}
