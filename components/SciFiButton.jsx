"use client";

import React from "react";
import { audioSystem } from "@/lib/audioSystem";

export default function SciFiButton({
  children,
  onClick,
  href,
  target,
  rel,
  className = "",
  ariaLabel,
  as = "button",
  type = "button",
}) {
  const handleMouseEnter = () => {
    audioSystem.playHoverTick();
  };

  const handleClick = (e) => {
    audioSystem.playClickBlip();
    if (onClick) onClick(e);
  };

  const content = (
    <>
      <span className="scifi-btn-text">{children}</span>
      <div className="scifi-clip">
        <div className="scifi-corner corner-left-top" />
        <div className="scifi-corner corner-right-bottom" />
        <div className="scifi-corner corner-right-top" />
        <div className="scifi-corner corner-left-bottom" />
      </div>
      <span className="scifi-arrow scifi-right-arrow" />
      <span className="scifi-arrow scifi-left-arrow" />
    </>
  );

  if (as === "a" || href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`scifi-btn ${className}`}
        aria-label={ariaLabel}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  if (as === "span" || as === "div") {
    return (
      <span
        className={`scifi-btn ${className}`}
        aria-label={ariaLabel}
        onMouseEnter={handleMouseEnter}
      >
        {content}
      </span>
    );
  }

  return (
    <button
      type={type}
      className={`scifi-btn ${className}`}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}
