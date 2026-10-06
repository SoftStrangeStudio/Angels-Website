#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform vec2 uPaperBounds;
uniform vec2 uCssResolution;
uniform float uPaperOffset;
uniform float uReducedMotion;

out vec4 outColor;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise21(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), f.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float weight = 0.5;
  for (int octave = 0; octave < 5; octave += 1) {
    value += weight * noise21(p);
    p = p * 2.03 + vec2(19.1, 7.7);
    weight *= 0.5;
  }
  return value;
}

void main() {
  vec2 pixel = gl_FragCoord.xy;
  vec2 uv = pixel / max(uResolution, vec2(1.0));
  float paperOffset = mix(uPaperOffset, 0.0, step(0.5, uReducedMotion));
  float worldY = pixel.y + paperOffset;
  float edgeScale = clamp(10.0 / max(uResolution.x, 1.0), 0.004, 0.018);

  float leftTear = (fbm(vec2(worldY * 0.012, 13.4)) - 0.5) * edgeScale;
  leftTear += (noise21(vec2(worldY * 0.051, 2.8)) - 0.5) * edgeScale * 0.38;
  float rightTear = (fbm(vec2(worldY * 0.013, 67.2)) - 0.5) * edgeScale;
  rightTear += (noise21(vec2(worldY * 0.047, 31.6)) - 0.5) * edgeScale * 0.42;

  float leftEdge = uPaperBounds.x + leftTear;
  float rightEdge = uPaperBounds.y + rightTear;
  float signedPaper = min(uv.x - leftEdge, rightEdge - uv.x);
  float aa = max(fwidth(signedPaper), 1.0 / max(uResolution.x, 1.0));
  float paperMask = smoothstep(-aa, aa, signedPaper);
  float shadowMask = smoothstep(-edgeScale * 2.0, aa, signedPaper) - paperMask;

  vec3 exterior = vec3(0.365, 0.459, 0.388);
  float exteriorGrain = noise21(vec2(pixel.x * 0.11, worldY * 0.09)) - 0.5;
  exterior += exteriorGrain * 0.018;

  vec3 paper = vec3(0.985, 0.985, 0.973);
  vec2 cssPixel = uv * max(uCssResolution, vec2(1.0));
  vec2 gridPosition = vec2(cssPixel.x, cssPixel.y + paperOffset);
  vec2 dotCell = mod(gridPosition, 20.0) - vec2(10.0);
  float dotDistance = length(dotCell);
  float dotAA = max(fwidth(dotDistance), 0.25);
  float dotMask = 1.0 - smoothstep(0.75 - dotAA, 0.75 + dotAA, dotDistance);
  paper = mix(paper, vec3(0.69, 0.73, 0.70), dotMask * 0.65);

  float edgeDistance = max(signedPaper, 0.0) * uResolution.x;
  float edgeShade = exp(-edgeDistance * 0.10);
  paper *= 1.0 - edgeShade * 0.045;
  paper += exp(-edgeDistance * 0.34) * vec3(0.01);

  vec3 color = exterior - shadowMask * vec3(0.14, 0.13, 0.10);
  color = mix(color, paper, paperMask);
  outColor = vec4(color, 1.0);
}
