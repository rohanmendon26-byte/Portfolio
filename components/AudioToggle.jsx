"use client";

import { useEffect, useState } from "react";
import { audioSystem } from "@/lib/audioSystem";

export default function AudioToggle() {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    audioSystem.initFromStorage();
    setIsMuted(audioSystem.isMuted);
  }, []);

  const handleToggle = (e) => {
    const nextMuted = e.target.checked;
    audioSystem.setMuted(nextMuted);
    setIsMuted(nextMuted);
    if (!nextMuted) {
      audioSystem.playClickBlip();
    }
  };

  return (
    <div className="hud-sound-toggle-wrapper">
      <input
        type="checkbox"
        id="hud-audio-checkbox"
        checked={isMuted}
        onChange={handleToggle}
      />
      <label
        htmlFor="hud-audio-checkbox"
        className="hud-toggle-switch"
        onMouseEnter={() => audioSystem.playHoverTick()}
        aria-label={isMuted ? "Unmute Audio SFX" : "Mute Audio SFX"}
        title={isMuted ? "Audio SFX: OFF" : "Audio SFX: ON"}
      >
        <div className="speaker">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75">
            <path
              d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
              style={{
                stroke: "var(--cyan, #00f0ff)",
                strokeWidth: 5,
                strokeLinejoin: "round",
                fill: "var(--cyan, #00f0ff)",
              }}
            />
            <path
              d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6"
              style={{
                fill: "none",
                stroke: "var(--cyan, #00f0ff)",
                strokeWidth: 5,
                strokeLinecap: "round",
              }}
            />
          </svg>
        </div>

        <div className="mute-speaker">
          <svg viewBox="0 0 75 75">
            <path
              d="m39,14-17,15H6V48H22l17,15z"
              fill="rgba(255,255,255,0.4)"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth={5}
              strokeLinejoin="round"
            />
            <path
              d="m49,26 20,24m0-24-20,24"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth={5}
              strokeLinecap="round"
            />
          </svg>
        </div>
      </label>
    </div>
  );
}
