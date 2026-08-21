"use client";

import { useEffect } from "react";
import SciFiButton from "./SciFiButton";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;

    // Lock scroll while modal is active
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="project-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Fixed ESC Close Button floating outside the scrollable card */}
      <button
        className="project-modal-close-fixed"
        onClick={onClose}
        aria-label="Close Modal"
      >
        ✕ ESC
      </button>

      <div
        className="project-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner HUD Brackets */}
        <span className="modal-corner modal-corner--tl" />
        <span className="modal-corner modal-corner--tr" />
        <span className="modal-corner modal-corner--bl" />
        <span className="modal-corner modal-corner--br" />

        {/* Modal Header */}
        <div className="project-modal-header">
          <div>
            <div className="project-modal-tag">
              <span className="modal-tag-dot" />
              MISSION BRIEFING // {project.id}
            </div>
            <h2 id="modal-title" className="project-modal-title">
              {project.title}
            </h2>
            <p className="project-modal-subtitle">{project.subtitle}</p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="project-modal-body">
          {/* Detailed Overview */}
          <div className="project-modal-section">
            <h4 className="modal-section-title">
              <span className="section-prefix">//</span> SYSTEM OVERVIEW
            </h4>
            <p className="modal-description">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Key Mission Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="project-modal-section">
              <h4 className="modal-section-title">
                <span className="section-prefix">//</span> KEY HIGHLIGHTS & ARCHITECTURE
              </h4>
              <ul className="modal-highlights-list">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="modal-highlight-item">
                    <span className="highlight-bullet">▸</span> {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div className="project-modal-section">
            <h4 className="modal-section-title">
              <span className="section-prefix">//</span> TECHNOLOGICAL MATRIX
            </h4>
            <div className="project-modal-tech">
              {project.tech.map((t) => (
                <span key={t} className="modal-tech-badge">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer / Actions */}
        <div className="project-modal-footer">
          {project.liveUrl && (
            <SciFiButton
              className="modal-action-btn modal-action-btn--primary"
              onClick={() => window.open(project.liveUrl, "_blank", "noopener,noreferrer")}
              ariaLabel={`Open Live Demo for ${project.title}`}
            >
              EXPLORE MISSION ↗
            </SciFiButton>
          )}

          {project.githubUrl && (
            <SciFiButton
              className="modal-action-btn"
              onClick={() => window.open(project.githubUrl, "_blank", "noopener,noreferrer")}
              ariaLabel={`View Source Code on GitHub for ${project.title}`}
            >
              SOURCE CODE (GITHUB)
            </SciFiButton>
          )}
        </div>
      </div>
    </div>
  );
}
