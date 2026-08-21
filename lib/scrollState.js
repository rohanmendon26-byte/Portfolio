// Shared mutable scroll state for 60FPS synchronization between GSAP and Three.js
// This avoids React state re-renders and eliminates window.scroll event listeners.
export const scrollState = {
  progress: 0,
  velocity: 0,
};
