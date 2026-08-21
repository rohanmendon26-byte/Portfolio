"use client";

import React, { useEffect, useState } from "react";

export default function Loader({ onComplete }) {
  const [isHiding, setIsHiding] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => {
      setIsHiding(true);
      setTimeout(() => {
        setIsDone(true);
        document.body.style.overflow = "";
        if (onComplete) onComplete();
      }, 600);
    }, 1600);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      className={`speeder-loader-overlay ${isHiding ? "speeder-loader--hiding" : ""}`}
      aria-busy="true"
      aria-label="Loading Website"
    >
      <div className="speeder-wrapper">
        <div className="loader">
          <span>
            <span />
            <span />
            <span />
            <span />
          </span>
          <div className="base">
            <span />
            <div className="face" />
          </div>
        </div>
        <div className="longfazers">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="speeder-hud-text">SYSTEM LOADING // HYPERDRIVE</div>
    </div>
  );
}
