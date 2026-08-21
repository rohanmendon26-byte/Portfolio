"use client";

/* =====================================================
   CYBERPUNK / ANIME WEB AUDIO SFX ENGINE
   Synthesized 100% in real-time via Web Audio API
===================================================== */

let audioCtx = null;
let isMuted = false;

// Initialize AudioContext lazily on user gesture
function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export const audioSystem = {
  get isMuted() {
    return isMuted;
  },

  setMuted(muted) {
    isMuted = muted;
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("hud_audio_muted", muted ? "true" : "false");
      } catch (e) {}
    }
  },

  initFromStorage() {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("hud_audio_muted");
        if (saved === "true") {
          isMuted = true;
        }
      } catch (e) {}
    }
  },

  // 1. Futuristic UI Hover Tick (NieR / Cyberpunk style UI tick)
  playHoverTick() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(2200, now + 0.025);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.025);
    } catch (e) {}
  },

  // 2. High-Tech Button Click / Select Blip
  playClickBlip() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      
      // Dual oscillator synth (Sine + Triangle) for rich metallic blip
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc2.type = "triangle";

      osc1.frequency.setValueAtTime(750, now);
      osc1.frequency.exponentialRampToValueAtTime(1600, now + 0.05);

      osc2.frequency.setValueAtTime(375, now);
      osc2.frequency.exponentialRampToValueAtTime(800, now + 0.05);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.055);
      osc2.stop(now + 0.055);
    } catch (e) {}
  },

  // 3. Section Navigation Warp / Transition Whoosh
  playWarpWhoosh() {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Sub-bass sweep
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(90, now);
      subOsc.frequency.exponentialRampToValueAtTime(320, now + 0.15);
      subOsc.frequency.exponentialRampToValueAtTime(60, now + 0.35);

      subGain.gain.setValueAtTime(0.001, now);
      subGain.gain.linearRampToValueAtTime(0.12, now + 0.08);
      subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);

      subOsc.start(now);
      subOsc.stop(now + 0.35);
    } catch (e) {}
  },

  // 4. Mobile Menu Open / Close Cyber Chime
  playMenuToggle(isOpen) {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";

      if (isOpen) {
        // Ascending 2-note chime
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.setValueAtTime(1200, now + 0.04);
      } else {
        // Descending 2-note chime
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.setValueAtTime(600, now + 0.04);
      }

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  },
};
