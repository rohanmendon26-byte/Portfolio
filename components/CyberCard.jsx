"use client";

import React, { useRef, useState } from "react";
import { audioSystem } from "@/lib/audioSystem";

/**
 * CyberCardShell:
 * Ultra-smooth 60fps 3D interactive perspective wrapper with
 * corner brackets, animated cyber circuit lines, vertical scan line,
 * floating particle sparks, and glowing ambient backlights.
 * 
 * Supports full hover and click interactivity on all child elements
 * (buttons, links, tooltips) without z-index conflicts.
 */
export function CyberCardShell({
  children,
  className = "",
  innerClassName = "",
  style = {},
  onClick,
  as: Component = "div",
  maxTilt = 10,
  ...props
}) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease",
  });
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -maxTilt;
    const rotY = ((x - centerX) / centerX) * maxTilt;

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: "transform 0.08s ease-out, border-color 0.3s ease, box-shadow 0.3s ease",
    });

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareStyle({
      opacity: 1,
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.24) 0%, rgba(0, 240, 255, 0.14) 30%, transparent 65%)`,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    audioSystem.playHoverTick();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.3s ease, box-shadow 0.3s ease",
    });
    setGlareStyle({ opacity: 0 });
  };

  return (
    <Component
      ref={cardRef}
      className={`cyber-card-frame ${isHovered ? "is-hovered" : ""} ${className}`}
      style={style}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="cyber-canvas noselect">
        <div
          className={`cyber-card-body ${innerClassName}`}
          style={transformStyle}
        >
          <div className="card-glare" style={glareStyle} />

          {/* Animated horizontal cyber lines */}
          <div className="cyber-lines">
            <span />
            <span />
            <span />
            <span />
          </div>

          {/* Ambient glowing radial disc lights */}
          <div className="glowing-elements">
            <div className="glow-1" />
            <div className="glow-2" />
            <div className="glow-3" />
          </div>

          {/* Floating animated particle sparks */}
          <div className="card-particles">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          {/* 4 Cyber corner brackets */}
          <div className="corner-elements">
            <span />
            <span />
            <span />
            <span />
          </div>

          {/* Vertical sweeping scan line */}
          <div className="scan-line" />

          {/* Card Content with full interactivity */}
          <div className="cyber-card-content">{children}</div>
        </div>
      </div>
    </Component>
  );
}

/**
 * Standalone CyberCard component:
 * Features the signature "HOVER ME", "CYBER CARD", and "INTERACTIVE 3D EFFECT"
 * with complete 3D tilt interaction.
 */
export default function CyberCard({
  prompt = "HOVER ME",
  title = (
    <>
      CYBER
      <br />
      CARD
    </>
  ),
  subtitle = "INTERACTIVE",
  highlight = "3D EFFECT",
  className = "",
  style = {},
}) {
  return (
    <CyberCardShell className={`cyber-card-standalone ${className}`} style={style}>
      <p className="cyber-prompt">{prompt}</p>
      <div className="cyber-title">{title}</div>
      <div className="cyber-subtitle">
        <span>{subtitle}</span>
        {highlight && <span className="highlight">{highlight}</span>}
      </div>
    </CyberCardShell>
  );
}
