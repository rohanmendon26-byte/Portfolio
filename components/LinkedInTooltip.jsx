"use client";

import React from "react";

export default function LinkedInTooltip({
  href = "https://www.linkedin.com/",
  label = "LinkedIn",
}) {
  return (
    <div className="linkedin-tooltip-container">
      <div className="linkedin-tooltip">{label}</div>

      <a
        className="linkedin-icon-link"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn Profile"
      >
        <div className="linkedin-layer">
          <span />
          <span />
          <span />
          <span />
          <span className="fab-linkedin">
            <svg viewBox="0 0 448 512" height="1em">
              <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
            </svg>
          </span>
        </div>
      </a>
    </div>
  );
}
