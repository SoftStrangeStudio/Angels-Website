"use client";

import { useEffect, useRef } from "react";
import styles from "./paper-scroll-experience.module.css";

const BASE_PATH = "/Angels-Website";
const INITIAL_RUNWAY_VIEWPORTS = 6;
const RUNWAY_GROWTH_VIEWPORTS = 5;
const REBASE_THRESHOLD = 800000;
const REBASE_DISTANCE = 400000;

export default function PaperScrollExperience({ children }) {
  const contentRef = useRef(null);
  const runwayRef = useRef(null);
  const shaderRef = useRef(null);

  useEffect(() => {
    let disposed = false;
    let frame = 0;
    let paperOffset = 0;
    let paperStart = 0;
    let lastScrollY = window.scrollY;
    let runwayHeight = Math.max(window.innerHeight * INITIAL_RUNWAY_VIEWPORTS, 1);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const setRunwayHeight = (nextHeight) => {
      runwayHeight = Math.max(nextHeight, window.innerHeight * INITIAL_RUNWAY_VIEWPORTS);
      if (runwayRef.current) runwayRef.current.style.height = `${Math.round(runwayHeight)}px`;
    };

    const measure = () => {
      const content = contentRef.current;
      const shader = shaderRef.current;
      if (!content || !shader) return;
      const contentRect = content.getBoundingClientRect();
      paperStart = contentRect.bottom + window.scrollY;
      const paperColumn = content.querySelector(".reference-home-sheet");
      const paperRect = paperColumn?.getBoundingClientRect() ?? contentRect;
      const width = Math.max(window.innerWidth, 1);
      const left = Math.max(0.025, Math.min(0.46, paperRect.left / width));
      const right = Math.min(0.975, Math.max(0.54, paperRect.right / width));

      shader.setVector2?.("uPaperBounds", left, right);
      shader.style.setProperty("--shader-fallback-background", "#5d7563");
      shader.style.setProperty("--fallback-left", `${(left * 100).toFixed(3)}%`);
      shader.style.setProperty("--fallback-right", `${(right * 100).toFixed(3)}%`);
      shader.dataset.paperStart = String(Math.round(paperStart));
      shader.requestRender?.();
    };

    const extendRunwayIfNeeded = (currentScrollY) => {
      const distanceFromBottom = document.documentElement.scrollHeight - currentScrollY - window.innerHeight;
      if (distanceFromBottom < window.innerHeight * 2) {
        setRunwayHeight(runwayHeight + window.innerHeight * RUNWAY_GROWTH_VIEWPORTS);
      }
    };

    const rebaseIfNeeded = (currentScrollY) => {
      if (currentScrollY - paperStart < REBASE_THRESHOLD) return currentScrollY;
      const availableReduction = runwayHeight - window.innerHeight * INITIAL_RUNWAY_VIEWPORTS;
      const reduction = Math.min(REBASE_DISTANCE, availableReduction);
      if (reduction <= 0) return currentScrollY;
      setRunwayHeight(runwayHeight - reduction);
      const rebasedScrollY = currentScrollY - reduction;
      window.scrollTo({ top: rebasedScrollY, behavior: "auto" });
      return rebasedScrollY;
    };

    const updateScroll = () => {
      frame = 0;
      const shader = shaderRef.current;
      if (!shader) return;
      let currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      if (!motionQuery.matches && currentScrollY > paperStart && deltaY > 0) {
        paperOffset += Math.min(deltaY, window.innerHeight * 1.5);
        shader.setFloat?.("uPaperOffset", paperOffset);
      }
      extendRunwayIfNeeded(currentScrollY);
      currentScrollY = rebaseIfNeeded(currentScrollY);
      lastScrollY = currentScrollY;
      shader.dataset.paperOffset = paperOffset.toFixed(2);
      shader.dataset.runwayHeight = String(Math.round(runwayHeight));
    };

    const scheduleScrollUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateScroll);
    };

    const resizeObserver = new ResizeObserver(() => {
      setRunwayHeight(Math.max(runwayHeight, window.innerHeight * INITIAL_RUNWAY_VIEWPORTS));
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

      setRunwayHeight(runwayHeight);
      shaderRef.current.setFloat?.("uPaperOffset", 0);
      resizeObserver.observe(contentRef.current);
      const paperColumn = contentRef.current.querySelector(".reference-home-sheet");
      if (paperColumn) resizeObserver.observe(paperColumn);
      measure();
      scheduleScrollUpdate();
    };

    const handleMotionChange = () => {
      shaderRef.current?.setFloat?.("uPaperOffset", motionQuery.matches ? 0 : paperOffset);
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
          shader-src={`${BASE_PATH}/shader-canvas/paper-scroll.frag`}
          fallback={`${BASE_PATH}/shader-canvas/paper-scroll-fallback.svg`}
          fallback-fill=""
          render-mode="manual"
          quality="auto"
          max-dpr="1.5"
        />
      </div>
      <div ref={contentRef} className={styles.content} data-paper-content>{children}</div>
      <div className={styles.transition} data-paper-transition aria-hidden="true" />
      <div ref={runwayRef} className={styles.runway} data-paper-runway aria-hidden="true" />
    </div>
  );
}
