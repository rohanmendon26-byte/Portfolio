"use client";

import React from "react";

export default function EmailTooltip({
  href = "mailto:your-email@gmail.com",
  label = "Mail",
  className = "",
}) {
  return (
    <div className={`email-tooltip-container ${className}`}>
      <div className="email-tooltip">{label}</div>
      <a
        href={href}
        className="email-link"
        aria-label={label}
        data-social="telegram"
      >
        <svg version="1.1" viewBox="0 0 100 100">
          <path
            d="M20 80A12 12 0 0 1 8 68v-40A12 12 0 0 1 20 16h56A12 12 0 0 1 88 28v40A12 12 0 0 1 76 80zm10.5 -47.12a4 4 0 1 0 -5.001 6.24l15.001 12.004a12 12 0 0 0 15.001 0l15.001 -12a4 4 0 1 0 -5.001 -6.247l-15.001 12a4 4 0 0 1 -5.001 0z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  );
}
