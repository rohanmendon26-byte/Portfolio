"use client";

import { useEffect, useRef, useState } from "react";
import { audioSystem } from "@/lib/audioSystem";

const sections = [
  { id: "home", label: "HOME", target: ".hero", color: "#00f0ff" },
  { id: "about", label: "ABOUT", target: ".origin", color: "#a855f7" },
  { id: "journey", label: "JOURNEY", target: ".journey", color: "#ec4899" },
  { id: "arsenal", label: "ARSENAL", target: ".arsenal", color: "#10b981" },
  { id: "missions", label: "MISSIONS", target: ".missions", color: "#f97316" },
  { id: "allies", label: "ALLIES", target: ".allies", color: "#3b82f6" },
  { id: "contact", label: "CONTACT", target: ".final-chapter", color: "#ef4444" },
];

export default function SectionNavigation({ lenisRef }) {
  const [activeId, setActiveId] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const activeIndex = sections.findIndex((s) => s.id === activeId);
  const activeSection = sections[activeIndex] || sections[0];
  const itemRefs = useRef([]);
  const navBarRef = useRef(null);

  // Handle smooth scroll navigation without breaking GSAP pin triggers
  const handleNavigate = (target, id) => {
    setActiveId(id);
    setIsOpen(false); // Auto-close mobile menu on selection
    audioSystem.playClickBlip();
    audioSystem.playWarpWhoosh();

    if (id === "home") {
      if (lenisRef?.current) {
        lenisRef.current.scrollTo(0, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const element = document.querySelector(target);
    if (element) {
      if (lenisRef?.current) {
        lenisRef.current.scrollTo(element, {
          offset: -40,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
      if (window.scrollY <= 50) {
        setActiveId("home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Single IntersectionObserver for all section targets
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const matched = sections.find((s) => {
            const el = document.querySelector(s.target);
            return el === entry.target;
          });
          if (matched) {
            setActiveId(matched.id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: "-20% 0px -40% 0px",
      threshold: 0.1,
    });

    sections.forEach((s) => {
      const el = document.querySelector(s.target);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Mobile Top-Left Hamburger Switch Toggle */}
      <div className="hud-mobile-switch-wrapper">
        <input
          type="checkbox"
          id="hud-hamburger-checkbox"
          checked={isOpen}
          onChange={(e) => {
            setIsOpen(e.target.checked);
            audioSystem.playMenuToggle(e.target.checked);
          }}
        />
        <label htmlFor="hud-hamburger-checkbox" className="toggle">
          <div className="bars" id="bar1" />
          <div className="bars" id="bar2" />
          <div className="bars" id="bar3" />
        </label>
      </div>

      {/* Navigation Container (Desktop Horizontal / Mobile Vertical Left Panel) */}
      <div
        className={`hud-nav-container ${isScrolled ? "scrolled" : ""} ${isOpen ? "mobile-open" : ""}`}
        style={{
          "--total-sections": sections.length,
          "--active-color": activeSection.color,
        }}
      >
        {/* Navigation Bar */}
        <nav
          ref={navBarRef}
          className="hud-nav-bar"
          aria-label="Portfolio Section Navigation"
        >
          <div className="hud-nav-items">
            {sections.map((section, idx) => {
              const isActive = section.id === activeId;
              return (
                <button
                  key={section.id}
                  ref={(el) => (itemRefs.current[idx] = el)}
                  type="button"
                  className={`hud-nav-item ${isActive ? "active" : ""}`}
                  style={{ "--item-color": section.color }}
                  onMouseEnter={() => audioSystem.playHoverTick()}
                  onClick={() => handleNavigate(section.target, section.id)}
                >
                  {/* Custom Anime Radio Button */}
                  <div className="hud-radio">
                    <span className="hud-radio-ring" />
                    <span className="hud-radio-dot" />
                  </div>
                  <span className="hud-nav-label">{section.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Backdrop overlay for closing menu when clicking outside */}
      {isOpen && (
        <div
          className="hud-mobile-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
