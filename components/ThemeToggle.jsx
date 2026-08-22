"use client";

import React from "react";
import { THEMES } from "@/lib/themeState";
import { audioSystem } from "@/lib/audioSystem";

export default function ThemeToggle({ activeTheme, onThemeChange }) {
  const themeKeys = Object.keys(THEMES);

  return (
    <div className="theme-toggle-hud" aria-label="Cyberpunk Theme Switcher">
      <div className="theme-pills">
        {themeKeys.map((key) => {
          const theme = THEMES[key];
          const isActive = activeTheme === key;

          return (
            <button
              key={key}
              type="button"
              className={`theme-pill ${isActive ? "active" : ""}`}
              onClick={() => onThemeChange(key)}
              onMouseEnter={() => audioSystem.playHoverTick()}
              title={theme.name}
              aria-label={`Select ${theme.name}`}
            >
              <span
                className="theme-dot"
                style={{
                  backgroundColor: theme.primary,
                  boxShadow: isActive ? `0 0 10px ${theme.primary}` : "none",
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
