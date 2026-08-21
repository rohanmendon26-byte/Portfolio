"use client";

import { useEffect, useState } from "react";
import { audioSystem } from "@/lib/audioSystem";

export default function AudioToggle() {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    audioSystem.initFromStorage();
    setIsMuted(audioSystem.isMuted);
  }, []);

  const handleToggle = () => {
    const nextMuted = !isMuted;
    audioSystem.setMuted(nextMuted);
    setIsMuted(nextMuted);
    if (!nextMuted) {
      audioSystem.playClickBlip();
    }
  };

  return (
    <button
      type="button"
      className={`hud-audio-toggle ${isMuted ? "muted" : "active"}`}
      onClick={handleToggle}
      onMouseEnter={() => audioSystem.playHoverTick()}
      aria-label={isMuted ? "Unmute HUD Audio SFX" : "Mute HUD Audio SFX"}
      title={isMuted ? "Audio SFX: OFF" : "Audio SFX: ON"}
    >
      {/* Equalizer / Speaker Icon Container */}
      <div className="hud-audio-icon-wrap">
        {!isMuted ? (
          <div className="hud-sound-bars">
            <span className="bar bar-1" />
            <span className="bar bar-2" />
            <span className="bar bar-3" />
          </div>
        ) : (
          <svg
            className="hud-mute-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="1" y1="1" x2="23" y2="23" />
            <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
            <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        )}
      </div>

      <span className="hud-audio-text">
        SFX // {isMuted ? "OFF" : "ON"}
      </span>

      <span className="hud-audio-indicator-dot" />
    </button>
  );
}
