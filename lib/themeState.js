"use client";

import { useEffect, useState } from "react";
import { audioSystem } from "./audioSystem";

export const THEMES = {
  cyan: {
    id: "cyan",
    name: "CYAN // DEFAULT",
    primary: "#00f0ff",
    secondary: "#a855f7",
    accent: "#00ff88",
    bg: "#050505",
    glow: "rgba(0, 240, 255, 0.4)",
  },
  violet: {
    id: "violet",
    name: "VIOLET // SYNTH",
    primary: "#e040fb",
    secondary: "#7c4dff",
    accent: "#00e5ff",
    bg: "#090312",
    glow: "rgba(224, 64, 251, 0.4)",
  },
  amber: {
    id: "amber",
    name: "AMBER // DEUS EX",
    primary: "#ffb300",
    secondary: "#ff6d00",
    accent: "#ffd54f",
    bg: "#0d0a02",
    glow: "rgba(255, 179, 0, 0.4)",
  },
};

export function applyThemeToCSS(themeId) {
  if (typeof document === "undefined") return;
  const theme = THEMES[themeId] || THEMES.cyan;
  const root = document.documentElement;

  root.style.setProperty("--cyan", theme.primary);
  root.style.setProperty("--cyan-glow", theme.glow);
  root.style.setProperty("--purple", theme.secondary);
  root.style.setProperty("--theme-accent", theme.accent);
  root.setAttribute("data-theme", themeId);

  try {
    localStorage.setItem("hud_theme_color", themeId);
  } catch (e) {}
}

export function useThemeState() {
  const [activeTheme, setActiveTheme] = useState("cyan");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("hud_theme_color");
      if (saved && THEMES[saved]) {
        setActiveTheme(saved);
        applyThemeToCSS(saved);
      }
    } catch (e) {}
  }, []);

  const changeTheme = (themeId) => {
    if (!THEMES[themeId]) return;
    setActiveTheme(themeId);
    applyThemeToCSS(themeId);
    audioSystem.playClickBlip();
  };

  return { activeTheme, changeTheme, themeData: THEMES[activeTheme] || THEMES.cyan };
}
