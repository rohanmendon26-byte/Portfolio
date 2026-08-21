"use client";

import { useEffect, useState } from "react";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING SYSTEM...");
  const [isDone, setIsDone] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";

    const statusSteps = [
      { threshold: 15, text: "INITIALIZING WEBGL CORE..." },
      { threshold: 40, text: "COMPILING THREE.JS SHADERS..." },
      { threshold: 70, text: "SYNCHRONIZING CANVAS SCENE..." },
      { threshold: 90, text: "ESTABLISHING SYSTEM MATRIX..." },
      { threshold: 100, text: "SYSTEM READY // WELCOME" },
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      // Accelerating progress curve
      const increment = Math.floor(Math.random() * 12) + 6;
      currentProgress = Math.min(100, currentProgress + increment);
      setProgress(currentProgress);

      const matchedStep = statusSteps.find((step) => currentProgress <= step.threshold);
      if (matchedStep) {
        setStatusText(matchedStep.text);
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsHiding(true);
          setTimeout(() => {
            setIsDone(true);
            document.body.style.overflow = "";
            if (onComplete) onComplete();
          }, 600); // Fade out duration matching CSS
        }, 300);
      }
    }, 90);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      className={`preloader-overlay ${isHiding ? "preloader--hiding" : ""}`}
      aria-busy="true"
      aria-label="Loading Website"
    >
      <div className="preloader-content">
        {/* Top HUD Status Label */}
        <div className="preloader-hud-top">
          <span className="preloader-pulse-dot" />
          <span className="preloader-hud-code">SYS.BOOT // 2026</span>
        </div>

        {/* Brand Name */}
        <div className="preloader-brand">
          <h1 className="preloader-title">ROHAN MENDON</h1>
          <p className="preloader-subtitle">CREATIVE DEVELOPER • WEBGL SPECIALIST</p>
        </div>

        {/* Big Counter Percentage */}
        <div className="preloader-counter">
          <span className="preloader-num">{progress.toString().padStart(3, "0")}</span>
          <span className="preloader-percent">%</span>
        </div>

        {/* Progress Bar Container */}
        <div className="preloader-bar-outer">
          <div
            className="preloader-bar-inner"
            style={{ width: `${progress}%` }}
          />
          <div className="preloader-bar-glow" style={{ left: `${progress}%` }} />
        </div>

        {/* Status Text & Hex Code */}
        <div className="preloader-status">
          <span className="preloader-status-msg">{statusText}</span>
          <span className="preloader-status-hex">0x{progress.toString(16).toUpperCase().padStart(2, "0")}FF</span>
        </div>
      </div>

      {/* Cyber Grid Overlay lines */}
      <div className="preloader-grid" />
    </div>
  );
}
