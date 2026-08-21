"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Position & scale refs (no re-renders)
  const mouseRef = useRef({ x: -100, y: -100 });
  const ringRefPos = useRef({ x: -100, y: -100 });
  const scaleRef = useRef({ current: 1, target: 1 });
  const dotScaleRef = useRef({ current: 1, target: 1 });
  const isHoveredRef = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Direct mouse position tracker
    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    // Interactive selector query
    const INTERACTIVE_SELECTOR =
      "a, button, [role='button'], input, textarea, select, label, .cyber-card-frame, .hud-nav-item, .scifi-btn, .dsa-profile-card, .timeline-item, .ally-card, .project-modal-close, .project-modal-close-fixed, .modal-action-btn";

    const onMouseOver = (e) => {
      const target = e.target;
      if (target && target.closest && target.closest(INTERACTIVE_SELECTOR)) {
        if (!isHoveredRef.current) {
          isHoveredRef.current = true;
          scaleRef.current.target = 1.35;
          dotScaleRef.current.target = 1.6;
          ring.classList.add("cursor-ring--hover");
          dot.classList.add("cursor-dot--hover");
        }
      }
    };

    const onMouseOut = (e) => {
      const target = e.target;
      if (target && target.closest && target.closest(INTERACTIVE_SELECTOR)) {
        // Check if we actually left the interactive element
        const related = e.relatedTarget;
        if (!related || !related.closest || !related.closest(INTERACTIVE_SELECTOR)) {
          isHoveredRef.current = false;
          scaleRef.current.target = 1;
          dotScaleRef.current.target = 1;
          ring.classList.remove("cursor-ring--hover");
          dot.classList.remove("cursor-dot--hover");
        }
      }
    };

    // Visibility handlers
    const onMouseLeaveDoc = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onMouseEnterDoc = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    // Hardware accelerated 60+ FPS animation loop
    let animationFrameId;

    const render = () => {
      const mouse = mouseRef.current;
      const ringP = ringRefPos.current;

      // Smooth Lerp for Ring Position (0.2 = fast & crisp tracking)
      ringP.x += (mouse.x - ringP.x) * 0.22;
      ringP.y += (mouse.y - ringP.y) * 0.22;

      // Smooth Lerp for Scales
      scaleRef.current.current += (scaleRef.current.target - scaleRef.current.current) * 0.2;
      dotScaleRef.current.current += (dotScaleRef.current.target - dotScaleRef.current.current) * 0.25;

      const rScale = scaleRef.current.current;
      const dScale = dotScaleRef.current.current;

      // GPU translate3d hardware transforms
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) scale(${dScale.toFixed(3)})`;
      ring.style.transform = `translate3d(${ringP.x.toFixed(2)}px, ${ringP.y.toFixed(2)}px, 0) scale(${rScale.toFixed(3)})`;

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeaveDoc);
    document.documentElement.addEventListener("mouseenter", onMouseEnterDoc);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.documentElement.removeEventListener("mouseleave", onMouseLeaveDoc);
      document.documentElement.removeEventListener("mouseenter", onMouseEnterDoc);
    };
  }, []);

  return (
    <>
      {/* Precision inner dot */}
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />

      {/* Lagging outer ring with crosshairs */}
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span className="cursor-cross cursor-cross--h" />
        <span className="cursor-cross cursor-cross--v" />
      </div>
    </>
  );
}
