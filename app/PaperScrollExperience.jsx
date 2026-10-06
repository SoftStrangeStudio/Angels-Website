"use client";

import { useEffect, useRef } from "react";
import styles from "./paper-scroll-experience.module.css";

const BASE_PATH = "/Angels-Website";
const PAPER_SCROLL_SPEED = 0.65;

export default function PaperScrollExperience({ children }) {
  const contentRef = useRef(null);
  const shaderRef = useRef(null);

  useEffect(() => {
    let disposed = false;
    let frame = 0;
    let paperOffset = 0;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const measure = () => {
      const content = contentRef.current;
      const shader = shaderRef.current;
      if (!content || !shader) return;
      const contentRect = content.getBoundingClientRect();
      const paperColumn = content.querySelector(".reference-home-sheet");
      const paperRect = paperColumn?.getBoundingClientRect() ?? contentRect;
      const width = Math.max(window.innerWidth, 1);
      const left = Math.max(0.025, Math.min(0.46, paperRect.left / width));
      const right = Math.min(0.975, Math.max(0.54, paperRect.right / width));

      shader.setVector2?.("uPaperBounds", left, right);
      shader.setVector2?.("uCssResolution", width, Math.max(window.innerHeight, 1));
      shader.style.setProperty("--shader-fallback-background", "#5d7563");
      shader.style.setProperty("--fallback-left", `${(left * 100).toFixed(3)}%`);
      shader.style.setProperty("--fallback-right", `${(right * 100).toFixed(3)}%`);
      shader.requestRender?.();
    };

    const updateScroll = () => {
      frame = 0;
      const shader = shaderRef.current;
      if (!shader) return;
      // The real document scroll drives the paper, without creating more page height.
      paperOffset = motionQuery.matches ? 0 : Math.max(0, window.scrollY) * PAPER_SCROLL_SPEED;
      shader.setFloat?.("uPaperOffset", paperOffset);
      shader.dataset.paperOffset = paperOffset.toFixed(2);
    };

    const scheduleScrollUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateScroll);
    };

    const resizeObserver = new ResizeObserver(() => {
      measure();
      scheduleScrollUpdate();
    });

    const initialize = async () => {
      const moduleUrl = new URL(`${BASE_PATH}/shader-canvas/shader-canvas.js?v=paper-scroll-1`, window.location.origin);
      if (!customElements.get("shader-canvas")) {
        let moduleScript = document.querySelector("script[data-shader-canvas-module]");
        if (!moduleScript) {
          moduleScript = document.createElement("script");
          moduleScript.type = "module";
          moduleScript.src = moduleUrl.href;
          moduleScript.dataset.shaderCanvasModule = "";
          document.head.append(moduleScript);
        }
        await customElements.whenDefined("shader-canvas");
      }
      if (disposed || !shaderRef.current || !contentRef.current) return;

      shaderRef.current.setFloat?.("uPaperOffset", 0);
      resizeObserver.observe(contentRef.current);
      const paperColumn = contentRef.current.querySelector(".reference-home-sheet");
      if (paperColumn) resizeObserver.observe(paperColumn);
      measure();
      scheduleScrollUpdate();
    };

    const revealTargets = [
      ...contentRef.current.querySelectorAll(".reference-home-sheet__intro, .reference-card")
    ].filter(Boolean);
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.dataset.paperReveal = "visible";
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealTargets.forEach((target) => {
      target.dataset.paperReveal = motionQuery.matches ? "visible" : "pending";
      revealObserver.observe(target);
    });

    const handleMotionChange = () => {
      if (motionQuery.matches) {
        revealTargets.forEach((target) => { target.dataset.paperReveal = "visible"; });
      }
      scheduleScrollUpdate();
    };

    window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    motionQuery.addEventListener("change", handleMotionChange);
    initialize().catch((error) => {
      shaderRef.current?.dispatchEvent(new CustomEvent("shadererror", { detail: error, bubbles: true }));
    });

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      revealObserver.disconnect();
      revealTargets.forEach((target) => { delete target.dataset.paperReveal; });
      window.removeEventListener("scroll", scheduleScrollUpdate);
      window.removeEventListener("resize", measure);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div className={styles.experience} data-paper-scroll-experience>
      <div className={styles.shaderLayer} aria-hidden="true">
        <shader-canvas
          ref={shaderRef}
          shader-src={`${BASE_PATH}/shader-canvas/paper-scroll.frag?v=dot-grid-1`}
          fallback={`${BASE_PATH}/shader-canvas/paper-scroll-fallback.svg?v=dot-grid-1`}
          fallback-fill=""
          render-mode="manual"
          quality="auto"
          max-dpr="1.5"
        />
      </div>
      <div ref={contentRef} className={styles.content} data-paper-content>{children}</div>
    </div>
  );
}
