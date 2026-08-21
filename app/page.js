"use client";

import { useEffect, useRef, useState } from "react";
import Scene from "@/components/Scene";
import SciFiButton from "@/components/SciFiButton";
import SectionNavigation from "@/components/SectionNavigation";
import AudioToggle from "@/components/AudioToggle";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import ProjectModal from "@/components/ProjectModal";
import Starfield from "@/components/Starfield";
import Card from "@/components/Card";
import { CyberCardShell } from "@/components/CyberCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { scrollState } from "@/lib/scrollState";

/* =====================================================
   ACADEMIC STATUS DATA (CHAPTER 01: ORIGIN)
===================================================== */
const academics = [
  {
    id: "01",
    label: "10TH",
    value: "95.65%",
    numericVal: 95.65,
    decimals: 2,
    suffix: "%",
    subtext: "SECONDARY",
    kanji: "学業",
  },
  {
    id: "02",
    label: "12TH",
    value: "90.67%",
    numericVal: 90.67,
    decimals: 2,
    suffix: "%",
    subtext: "HIGHER SEC",
    kanji: "修得",
  },
  {
    id: "03",
    label: "CURRENT CGPA",
    value: "9.26",
    numericVal: 9.26,
    decimals: 2,
    suffix: "",
    subtext: "UNDERGRAD",
    kanji: "成績",
  },
];

/* =====================================================
   PROBLEM SOLVING / DSA DATA (CHAPTER 01: ORIGIN)
===================================================== */
const codingProfiles = [
  {
    id: "01",
    name: "LeetCode",
    description: "Data Structures & Algorithms",
    icon: "/icons/leetcode.svg",
    url: "https://leetcode.com/", // Replace with actual LeetCode profile URL
    accent: "leetcode",
    tag: "01 / PLATFORM",
    kanji: "鍛錬",
  },
  {
    id: "02",
    name: "GeeksforGeeks",
    description: "DSA & Problem Solving",
    icon: "/icons/gfg.svg",
    url: "https://auth.geeksforgeeks.org/user/", // Replace with actual GFG profile URL
    accent: "gfg",
    tag: "02 / PLATFORM",
    kanji: "修練",
  },
  {
    id: "03",
    name: "Coding Ninjas",
    description: "DSA & Algorithms",
    icon: "/icons/coding-ninjas.svg",
    url: "https://www.naukri.com/code360/profile/", // Replace with actual Coding Ninjas profile URL
    accent: "coding-ninjas",
    tag: "03 / PLATFORM",
    kanji: "攻略",
  },
];

/* =====================================================
   JOURNEY DATA (CHAPTER 02: THE JOURNEY)
===================================================== */
const journeyEntries = [
  {
    id: "01",
    label: "ENTRY 01",
    title: "COMPUTER SCIENCE",
    kanji: "基盤",
    description:
      "Started my journey in Computer Science and began building a strong foundation in programming, problem solving and software development.",
    tags: ["Programming Fundamentals", "Problem Solving", "Software Engineering"],
  },
  {
    id: "02",
    label: "ENTRY 02",
    title: "WEB DEVELOPMENT",
    kanji: "開発",
    description:
      "Explored web development and started building projects using HTML, CSS, JavaScript, React and Next.js. Built projects while learning frontend and full-stack development.",
    tags: ["HTML / CSS", "JavaScript", "React", "Next.js", "Full-Stack"],
  },
  {
    id: "03",
    label: "ENTRY 03",
    title: "DATA STRUCTURES & ALGORITHMS",
    kanji: "修練",
    description:
      "Currently strengthening my Data Structures and Algorithms skills by regularly solving problems across LeetCode, GeeksforGeeks and Coding Ninjas.",
    tags: [
      "Arrays & Strings",
      "Binary Search",
      "Linked Lists",
      "Stacks & Queues",
      "Trees & Graphs",
      "DP",
    ],
  },
  {
    id: "04",
    label: "ENTRY 04",
    title: "DATA SCIENCE",
    kanji: "探求",
    description:
      "Currently exploring Data Science and building my understanding of data-driven problem solving, data analysis, statistics, Python and machine learning.",
    tags: ["Python", "Data Analysis", "Statistics", "Machine Learning"],
  },
  {
    id: "05",
    label: "ENTRY 05",
    title: "CURRENT JOURNEY",
    kanji: "前進",
    isCurrent: true,
    description:
      "Continuously improving my skills in Web Development, DSA, Data Science, and Creative Development. Building projects, solving problems and learning new technologies along the way.",
    tags: ["Web Development", "DSA Practice", "Data Science", "Creative Dev"],
  },
];

/* =====================================================
   PROJECTS DATA (CHAPTER 03: MISSIONS)
===================================================== */
const projects = [
  {
    id: "01",
    title: "GET ME A CHAI",
    subtitle: "CREATOR MONETIZATION PLATFORM",
    description:
      "A full-stack platform that allows creators to build communities, create tiers, publish posts and receive support from their audience.",
    fullDescription:
      "GetMeAChai is a full-stack crowdfunding and creator support platform built with Next.js 16 and MongoDB. It empowers content creators to receive micro-donations, set funding milestones, and publish exclusive posts for supporters.",
    highlights: [
      "Next.js App Router architecture with Server Actions",
      "MongoDB database layer with custom Mongoose schemas",
      "OAuth authentication via NextAuth (GitHub & Google)",
      "Cloudinary media upload pipeline for user covers & avatars",
      "Dynamic creator dashboard & real-time analytics",
    ],
    tech: ["NEXT.JS", "MONGODB", "NEXTAUTH", "CLOUDINARY", "TAILWIND"],
    githubUrl: "https://github.com/rohanmendon26-byte",
    liveUrl: "https://github.com/rohanmendon26-byte",
  },
  {
    id: "02",
    title: "PASSWORD MANAGER",
    subtitle: "SECURE FULL-STACK APPLICATION",
    description:
      "A full-stack password management application with a React frontend, Express backend and MongoDB database.",
    fullDescription:
      "A secure, encrypted vault application built to store and manage credentials safely. Features master key verification, client-side generation of strong passwords, and CRUD operations over a RESTful API.",
    highlights: [
      "RESTful API service built with Express.js & Node.js",
      "Client-side password generator with custom complexity rules",
      "MongoDB persistence with encrypted string payloads",
      "Clean Cyberpunk UI interface with instant copy-to-clipboard",
    ],
    tech: ["REACT", "NODE.JS", "EXPRESS", "MONGODB"],
    githubUrl: "https://github.com/rohanmendon26-byte",
    liveUrl: "https://github.com/rohanmendon26-byte",
  },
  {
    id: "03",
    title: "SPOTIFY CLONE",
    subtitle: "MUSIC STREAMING ENGINE",
    description:
      "A responsive Spotify-inspired interface focused on recreating the modern music streaming experience.",
    fullDescription:
      "A interactive web audio player mimicking Spotify's core interface. Built using modern HTML5 Audio APIs, custom volume controls, playlist management, and responsive track sliders.",
    highlights: [
      "HTML5 Web Audio API integration with progress scrubbing",
      "Custom audio queue & play/pause state synchronization",
      "Pixel-perfect responsive design replicating desktop & mobile views",
    ],
    tech: ["HTML", "CSS", "JAVASCRIPT"],
    githubUrl: "https://github.com/rohanmendon26-byte",
    liveUrl: "https://github.com/rohanmendon26-byte",
  },
  {
    id: "04",
    title: "NETFLIX CLONE",
    subtitle: "STREAMING INTERFACE",
    description:
      "A Netflix-inspired landing experience with a focus on responsive layouts and modern UI design.",
    fullDescription:
      "A high-fidelity front-end clone of Netflix featuring dynamic hero previews, interactive FAQ accordions, multi-row media carousels, and responsive typography.",
    highlights: [
      "Responsive hero banner with video/backdrop overlay",
      "Custom CSS Grid & Flexbox row carousel sliders",
      "Interactive accordion component for membership FAQ",
    ],
    tech: ["HTML", "CSS", "JAVASCRIPT"],
    githubUrl: "https://github.com/rohanmendon26-byte",
    liveUrl: "https://github.com/rohanmendon26-byte",
  },
  {
    id: "05",
    title: "MICROSOFT CLONE",
    subtitle: "CORPORATE WEB EXPERIENCE",
    description:
      "A responsive recreation of the Microsoft homepage focused on layout, navigation and visual hierarchy.",
    fullDescription:
      "A responsive replica of Microsoft's corporate portal. Demonstrates mastery over complex multi-column responsive grids, mega-menus, accessible navigation controls, and hero banners.",
    highlights: [
      "Multi-breakpoint responsive layout matching official desktop & mobile specifications",
      "Mega-menu navigation drop-downs with accessible hover states",
      "Clean, semantic HTML5 structure with optimized CSS assets",
    ],
    tech: ["HTML", "CSS", "JAVASCRIPT"],
    githubUrl: "https://github.com/rohanmendon26-byte",
    liveUrl: "https://github.com/rohanmendon26-byte",
  },
];

/* =====================================================
   PROFILES DATA (CHAPTER 04: ALLIES)
===================================================== */
const profiles = [
  {
    number: "01",
    title: "GITHUB",
    subtitle: "CODE ARCHIVE",
    description:
      "Explore my projects, experiments and development journey.",
    url: "https://github.com/rohanmendon26-byte",
  },
  {
    number: "02",
    title: "LINKEDIN",
    subtitle: "PROFESSIONAL NETWORK",
    description:
      "Connect with me and follow my professional journey.",
    url: "https://www.linkedin.com/",
  },
  {
    number: "03",
    title: "EMAIL",
    subtitle: "DIRECT CONNECTION",
    description:
      "Have an idea, opportunity or project? Let's talk.",
    url: "mailto:your-email@gmail.com",
  },
];

/* =====================================================
   CONTACT INFORMATION (CHAPTER 05: FINAL CHAPTER)
===================================================== */
const contact = {
  email: "your-email@gmail.com",
  github: "https://github.com/rohanmendon26-byte",
  linkedin: "https://www.linkedin.com/",
};

/* =====================================================
   SKILLS DATASET (CHAPTER 02: THE ARSENAL)
===================================================== */
const skills = [
  {
    id: "javascript",
    number: "01",
    name: "JavaScript",
    category: "CORE LANGUAGE",
    icon: "/icons/javascript.svg",
    accent: "javascript",
    status: "CORE",
    abilityCode: "SYS.ABILITY // 01",
    subtext: "Core Development & Logic",
    featured: true,
    filterTags: ["frontend", "core"],
  },
  {
    id: "react",
    number: "02",
    name: "React",
    category: "FRONTEND ENGINE",
    icon: "/icons/react.svg",
    accent: "react",
    status: "CURRENT",
    abilityCode: "SYS.ABILITY // 02",
    subtext: "Component Architecture & UI",
    featured: true,
    filterTags: ["frontend"],
  },
  {
    id: "nextjs",
    number: "03",
    name: "Next.js",
    category: "FULL-STACK FRAMEWORK",
    icon: "/icons/nextjs.svg",
    accent: "nextjs",
    status: "CURRENT",
    abilityCode: "SYS.ABILITY // 03",
    subtext: "App Router & SSR Architecture",
    featured: false,
    filterTags: ["frontend", "backend"],
  },
  {
    id: "nodejs",
    number: "04",
    name: "Node.js",
    category: "BACKEND RUNTIME",
    icon: "/icons/nodejs.svg",
    accent: "nodejs",
    status: "BUILDING",
    abilityCode: "SYS.ABILITY // 04",
    subtext: "Server Runtime & APIs",
    featured: true,
    filterTags: ["backend"],
  },
  {
    id: "html",
    number: "05",
    name: "HTML5",
    category: "SEMANTIC MARKUP",
    icon: "/icons/html.svg",
    accent: "html",
    status: "CORE",
    abilityCode: "SYS.ABILITY // 05",
    subtext: "Web Structure & Accessibility",
    featured: false,
    filterTags: ["frontend", "core"],
  },
  {
    id: "css",
    number: "06",
    name: "CSS3",
    category: "STYLING & LAYOUT",
    icon: "/icons/css.svg",
    accent: "css",
    status: "CORE",
    abilityCode: "SYS.ABILITY // 06",
    subtext: "Futuristic Design & Animations",
    featured: false,
    filterTags: ["frontend", "core"],
  },
  {
    id: "mongodb",
    number: "07",
    name: "MongoDB",
    category: "NO-SQL DATABASE",
    icon: "/icons/mongodb.svg",
    accent: "mongodb",
    status: "BUILDING",
    abilityCode: "SYS.ABILITY // 07",
    subtext: "Data Persistence & Schemas",
    featured: false,
    filterTags: ["backend"],
  },
  {
    id: "git",
    number: "08",
    name: "Git",
    category: "VERSION CONTROL",
    icon: "/icons/git.svg",
    accent: "git",
    status: "CURRENT",
    abilityCode: "SYS.ABILITY // 08",
    subtext: "Source Tracking & Workflows",
    featured: false,
    filterTags: ["tools"],
  },
  {
    id: "threejs",
    number: "09",
    name: "Three.js",
    category: "CREATIVE 3D",
    icon: "/icons/threejs.svg",
    accent: "threejs",
    status: "EXPLORING",
    abilityCode: "SYS.ABILITY // 09",
    subtext: "WebGL & 3D Web Graphics",
    featured: false,
    filterTags: ["frontend"],
  },
  {
    id: "python",
    number: "10",
    name: "Python",
    category: "DATA & ANALYTICS",
    icon: "/icons/python.svg",
    accent: "python",
    status: "LEARNING",
    abilityCode: "SYS.ABILITY // 10",
    subtext: "Data Science & Scripting",
    featured: false,
    filterTags: ["backend", "tools"],
  },
];

/* =====================================================
   INTERACTIVE SKILL CARD (CHAPTER 02: THE ARSENAL)
===================================================== */
function SkillCard({ skill }) {
  return (
    <CyberCardShell
      className={`skill-card-shell skill-card-shell--${skill.accent} ${skill.featured ? "skill-card-shell--featured" : ""}`}
      innerClassName={`skill-card skill-card--${skill.accent}`}
    >
      {/* Subtle Brand Background Glow Disc */}
      <div className="skill-card-brand-glow" />
      <div className="skill-card-scanline" />

      {/* HUD Top Bar */}
      <div className="skill-card-top">
        <span className="skill-ability-code">{skill.abilityCode}</span>
        <span className={`skill-status-badge skill-status-badge--${skill.status.toLowerCase()}`}>
          <span className="skill-status-dot" />
          {skill.status}
        </span>
      </div>

      {/* Tech Icon Container */}
      <div className="skill-icon-wrapper">
        <div className="skill-icon-glow-ring" />
        <img
          src={skill.icon}
          alt={`${skill.name} logo`}
          className="skill-icon"
          width={40}
          height={40}
          loading="lazy"
        />
      </div>

      {/* Main Information */}
      <div className="skill-body">
        <div className="skill-number-watermark" aria-hidden="true">
          {skill.number}
        </div>
        <span className="skill-category">{skill.category}</span>
        <h3 className="skill-title">{skill.name}</h3>
        <p className="skill-subtext">{skill.subtext}</p>
      </div>

      {/* CTA Footer */}
      <div className="skill-footer">
        <span className="skill-cta-text">EXPLORE ABILITY</span>
        <span className="skill-cta-arrow">→</span>
      </div>
    </CyberCardShell>
  );
}


/* =====================================================
   MISSION CARD COMPONENT (CHAPTER 04: MISSIONS)
===================================================== */
function MissionCard({ project, onSelect }) {
  return (
    <div className="mission-glow-card" id={`mission-card-${project.id}`}>
      <b />
      
      {/* Central Visual Badge (Glitches/Scales on hover) */}
      <div className="mission-card-visual">
        <span className="mission-badge-id">MISSION {project.id}</span>
        <h3 className="mission-badge-title">{project.title}</h3>
        <span className="mission-badge-subtitle">{project.subtitle}</span>
      </div>

      {/* Sliding Content Container */}
      <div className="content">
        <p className="title">
          {project.title}
          <br />
          <span>{project.subtitle}</span>
        </p>

        <p className="mission-glow-desc">{project.description}</p>

        <div className="mission-glow-tech">
          {project.tech.map((t) => (
            <span key={t} className="mission-glow-pill">{t}</span>
          ))}
        </div>

        <ul className="sci">
          {project.githubUrl && (
            <li>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Repository"
              >
                <svg className="fa-brands" width={16} height={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" fill="currentColor">
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 0 0 20.9-6.5 69 25.8 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c48.1-32.6 69-25.8 69-25.8 13.7 34.6 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17.1 23.2 17.1 46.7 0 33.7-.3 60.7-.3 69 0 6.5 4.6 14.4 17.3 12.1C426.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8z"/>
                </svg>
              </a>
            </li>
          )}
          {project.liveUrl && (
            <li>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live Demo"
              >
                <svg className="fa-brands" width={16} height={16} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M432 320H400a16 16 0 0 0-16 16v112H64V128h112a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16H48A48 48 0 0 0 0 112v352a48 48 0 0 0 48 48h352a48 48 0 0 0 48-48V336a16 16 0 0 0-16-16zM488 0H360a24 24 0 0 0-17 41l43 43-171 171a24 24 0 0 0 0 34l22 22a24 24 0 0 0 34 0l171-171 43 43a24 24 0 0 0 41-17V24a24 24 0 0 0-24-24z"/>
                </svg>
              </a>
            </li>
          )}
          <li>
            <button
              type="button"
              className="mission-details-btn"
              onClick={() => onSelect && onSelect(project)}
              aria-label={`View Mission Details: ${project.title}`}
            >
              DETAILS
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

/* =====================================================
   GITHUB HOVER TOOLTIP COMPONENT
===================================================== */
function GitHubTooltip({ href = "https://github.com/rohanmendon26-byte", label = "GitHub" }) {
  return (
    <div className="github-tooltip-wrapper">
      <span
        className="github-tooltip-btn group"
        aria-label={label}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 15 15"
          className="github-svg-icon"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            fill="currentColor"
            d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
          />
        </svg>
        <span className="github-tooltip-label">
          {label}
        </span>
      </span>
    </div>
  );
}

/* =====================================================
   LINKEDIN 3D LAYERED TOOLTIP COMPONENT
===================================================== */
function LinkedInTooltip({
  href = "https://www.linkedin.com/",
  label = "LinkedIn",
}) {
  return (
    <div className="linkedin-tooltip-container">
      <div className="linkedin-tooltip">{label}</div>

      <span
        className="linkedin-icon-link"
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
      </span>
    </div>
  );
}

/* =====================================================
   EMAIL HOVER TOOLTIP COMPONENT
===================================================== */
function EmailTooltip({
  href = "mailto:your-email@gmail.com",
  label = "Mail",
}) {
  return (
    <div className="email-tooltip-container">
      <div className="email-tooltip">{label}</div>
      <span
        className="email-link"
        aria-label={label}
      >
        <svg version="1.1" viewBox="0 0 100 100">
          <path
            d="M20 80A12 12 0 0 1 8 68v-40A12 12 0 0 1 20 16h56A12 12 0 0 1 88 28v40A12 12 0 0 1 76 80zm10.5 -47.12a4 4 0 1 0 -5.001 6.24l15.001 12.004a12 12 0 0 0 15.001 0l15.001 -12a4 4 0 1 0 -5.001 -6.247l-15.001 12a4 4 0 0 1 -5.001 0z"
            fill="currentColor"
          />
        </svg>
      </span>
    </div>
  );
}

/* =====================================================
   ALLY CARD COMPONENT (CHAPTER 05: ALLIES)
===================================================== */
function AllyCard({ profile }) {
  const isGithub = profile.title === "GITHUB";
  const isLinkedin = profile.title === "LINKEDIN";
  const isEmail = profile.title === "EMAIL";

  return (
    <div
      className="ally-card-container"
      id={`ally-card-${profile.number}`}
      aria-label={`${profile.title}: ${profile.subtitle}`}
    >
      <div className="content">
        <div className="ally-top">
          <p className="ally-status">CONNECTION {profile.number}</p>

          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "8px" }}>
            <h3 style={{ fontFamily: "var(--font-orbitron, 'Orbitron', sans-serif)", fontSize: "20px", fontWeight: 800, letterSpacing: "2px", color: "#fff", margin: 0 }}>
              {profile.title}
            </h3>
            {isGithub && <GitHubTooltip href={profile.url} label="GitHub" />}
            {isLinkedin && <LinkedInTooltip href={profile.url} />}
            {isEmail && <EmailTooltip href={profile.url} label="Mail" />}
          </div>

          <p className="ally-subtitle" style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", marginTop: "6px", letterSpacing: "1px" }}>
            {profile.subtitle}
          </p>
        </div>

        <p className="ally-description" style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", lineHeight: "1.6", margin: "16px 0" }}>
          {profile.description}
        </p>

        <SciFiButton
          as="a"
          href={profile.url}
          target={profile.url.startsWith("mailto:") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="ally-enter"
          ariaLabel={`Connect via ${profile.title}`}
        >
          ENTER
        </SciFiButton>
      </div>
    </div>
  );
}

export default function Home() {
  const mainRef = useRef(null);
  const lenisRef = useRef(null);
  const [imgError, setImgError] = useState(false);
  const [skillFilter, setSkillFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredSkills =
    skillFilter === "all"
      ? skills
      : skills.filter((s) => s.filterTags.includes(skillFilter));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize high-performance smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.0,
      lerp: 0.08,
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(500, 33);

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // =====================================================
      // 0. MASTER SCROLL TRIGGER (ONE TRUTH FOR THREE.JS CAMERA)
      // =====================================================
      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.2,
        onUpdate: (self) => {
          scrollState.progress = self.progress;
          scrollState.velocity = Math.abs(self.getVelocity() || 0);
        },
      });

      // =====================================================
      // 1. HERO PROLOGUE — INTRO & PINNED FLY-THROUGH EXIT
      // =====================================================
      const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      introTl
        .fromTo(
          ".welcome",
          { opacity: 0, y: 20, letterSpacing: "20px" },
          { opacity: 0.8, y: 0, letterSpacing: "12px", duration: 0.8, delay: 0.1 }
        )
        .fromTo(
          "h1",
          { opacity: 0, scale: 0.88, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.9 },
          "-=0.6"
        )
        .fromTo(
          ".line",
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 0.6, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          [".name", ".role", ".enter"],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          "-=0.4"
        )
        .fromTo(
          ".scroll-indicator",
          { opacity: 0 },
          { opacity: 0.5, duration: 0.7 },
          "-=0.2"
        );

      const heroExit = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      heroExit
        .fromTo(
          ".hero-content",
          { scale: 1, opacity: 1 },
          { scale: isMobile ? 3.5 : 5.8, opacity: 0, ease: "power2.in", duration: 1 },
          0
        )
        .fromTo(
          ".welcome",
          { opacity: 0.8, scale: 1, y: 0 },
          { opacity: 0, scale: isMobile ? 2.0 : 3.2, y: -80, ease: "power2.in", duration: 1 },
          0
        )
        .fromTo(
          "h1",
          { scale: 1, opacity: 1, y: 0 },
          { scale: isMobile ? 3.2 : 5.5, opacity: 0, y: -40, ease: "power2.in", duration: 1 },
          0
        )
        .fromTo(
          ".line",
          { scaleX: 1, opacity: 0.6 },
          { scaleX: 6, opacity: 0, ease: "power2.in", duration: 0.9 },
          0
        )
        .fromTo(
          ".name",
          { scale: 1, opacity: 1, y: 0 },
          { scale: isMobile ? 2.0 : 3.5, opacity: 0, y: 60, ease: "power2.in", duration: 1 },
          0
        )
        .fromTo(
          ".role",
          { scale: 1, opacity: 1, y: 0 },
          { scale: isMobile ? 2.0 : 3.5, opacity: 0, y: 90, ease: "power2.in", duration: 1 },
          0
        )
        .fromTo(
          ".enter",
          { opacity: 1, scale: 1, y: 0 },
          { opacity: 0, scale: isMobile ? 2.2 : 3.8, y: 100, ease: "power2.in", duration: 1 },
          0
        )
        .fromTo(
          ".scroll-indicator",
          { opacity: 0.5, scale: 1 },
          { opacity: 0, scale: 2, ease: "power2.in", duration: 0.5 },
          0
        )
        .to(
          ".hero",
          { opacity: 0, pointerEvents: "none", duration: 0.3 },
          0.75
        );

      // Timeline progress line fill on scroll
      gsap.fromTo(
        ".timeline-line-progress",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline",
            start: "top 70%",
            end: "bottom 50%",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        }
      );

      // Section Smooth Entrance & Depth Zoom Transitions
      const secConfigs = [
        {
          sec: ".origin",
          hdr: ".origin-title, .origin-chapter-label",
          items: ".origin-visual, .origin-bio, .origin-academic-wrapper, .origin-dsa-wrapper",
        },
        {
          sec: ".arsenal",
          hdr: ".arsenal-header",
          items: ".arsenal-filter-bar, .skill-card-shell",
        },
        {
          sec: ".missions",
          hdr: ".missions-header",
          items: ".mission-card-shell",
        },
        {
          sec: ".allies",
          hdr: ".allies-header",
          items: ".ally-card",
        },
        {
          sec: ".contact",
          hdr: ".contact-header",
          items: ".contact-card",
        },
      ];

      secConfigs.forEach(({ sec, hdr, items }) => {
        const sectionEl = document.querySelector(sec);
        if (!sectionEl) return;

        const secTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionEl,
            start: "top 82%",
            end: "top 25%",
            toggleActions: "play none none reverse",
          },
        });

        if (hdr) {
          secTl.fromTo(
            sec,
            { opacity: 0.3, filter: "blur(6px)" },
            { opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" },
            0
          );
          secTl.fromTo(
            hdr,
            { opacity: 0, y: 55, scale: 0.9, filter: "blur(8px)" },
            { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
            0
          );
        }

        if (items) {
          secTl.fromTo(
            items,
            { opacity: 0, y: 40, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" },
            0.2
          );
        }
      });

      // Section Cyber Divider Laser Fill Animations
      gsap.utils.toArray(".cyber-section-divider").forEach((divider) => {
        const fillLine = divider.querySelector(".divider-line-fill");
        const badge = divider.querySelector(".divider-badge");
        if (fillLine) {
          gsap.fromTo(
            fillLine,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: divider,
                start: "top 90%",
                end: "top 40%",
                scrub: 0.6,
              },
            }
          );
        }
        if (badge) {
          gsap.fromTo(
            badge,
            { opacity: 0, scale: 0.7, y: 15 },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: divider,
                start: "top 85%",
                end: "top 50%",
                scrub: 0.4,
              },
            }
          );
        }
      });
    }, mainRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);

  const scrollToOrigin = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(".origin", {
        offset: 0,
        duration: 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      document.querySelector(".origin")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="portfolio" ref={mainRef}>
      {/* Animated Cosmic Starfield Background */}
      <Starfield />

      {/* Sci-Fi WebGL Preloader */}
      <Preloader />

      {/* Project Detail Briefing Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Custom HUD Cursor */}
      <CustomCursor />
      {/* Anime Futuristic Section Navigation HUD */}
      <SectionNavigation lenisRef={lenisRef} />

      {/* Top-Right Cyberpunk Sound HUD Switch */}
      <AudioToggle />

      {/* Background 3D Three.js Scene */}
      <Scene />

      {/* ================= HERO ================= */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="welcome">WELCOME TO</p>

          <h1>
            MY
            <span>PORTFOLIO</span>
          </h1>

          <div className="line" />

          <p className="name">ROHAN MENDON</p>

          <p className="role">
            CREATIVE DEVELOPER
            <span> • </span>
            FULL-STACK DEVELOPER
          </p>

          <SciFiButton
            className="enter"
            onClick={scrollToOrigin}
            ariaLabel="Enter the Journey"
          >
            ENTER THE JOURNEY
          </SciFiButton>
        </div>

        <div className="scroll-indicator">SCROLL TO EXPLORE</div>
      </section>

      {/* Cyber Section Divider: Welcome -> Origin */}
      <div className="cyber-section-divider" aria-hidden="true">
        <div className="divider-line-bg" />
        <div className="divider-line-fill" />
        <div className="divider-badge">
          <span className="divider-dot" />
          <span className="divider-text">CHAPTER 01 // ORIGIN</span>
        </div>
      </div>

      {/* ================= CHAPTER 01: ORIGIN (ABOUT ME) ================= */}
      <section className="origin" id="about">
        <div className="origin-container">
          {/* Left: Cinematic Character Portrait Frame */}
          <div className="origin-visual">
            <div className="origin-glow-ring" />
            <div className="origin-frame">
              {/* Corner tech brackets */}
              <div className="origin-corner origin-corner-tl" />
              <div className="origin-corner origin-corner-tr" />
              <div className="origin-corner origin-corner-bl" />
              <div className="origin-corner origin-corner-br" />

              {/* HUD Top Bar */}
              <div className="origin-hud-top">
                <span>01 // ORIGIN</span>
                <span className="origin-hud-status">
                  <span className="origin-hud-dot" />
                  SYSTEM ONLINE
                </span>
              </div>

              {/* Image Container with safe fallback */}
              <div className="origin-image-wrapper">
                {!imgError ? (
                  <img
                    src="/images/rohan.png"
                    alt="Rohan Mendon"
                    className="origin-image"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="origin-image-fallback">
                    <span>ROHAN MENDON</span>
                    <span style={{ fontSize: "10px", opacity: 0.5 }}>IMAGE NOT FOUND</span>
                  </div>
                )}
              </div>

              {/* HUD Bottom Bar */}
              <div className="origin-hud-bottom">
                <span>ROHAN MENDON</span>
                <span>PROTAGONIST // DEV</span>
              </div>
            </div>
          </div>

          {/* Right: Character Info / Developer Introduction */}
          <div className="origin-content">
            <div className="origin-chapter-label">CHAPTER 01</div>

            <h2 className="origin-title">ORIGIN</h2>

            <div className="origin-name">ROHAN MENDON</div>

            <p className="origin-bio">
              I'm a Computer Science student and developer who enjoys building
              interactive digital experiences.
            </p>

            {/* Academic Status / Stats Section */}
            <div className="origin-academic-wrapper">
              <div className="origin-academic-header">
                <span className="origin-academic-heading">ACADEMIC STATUS</span>
                <span className="origin-academic-line" />
              </div>

              <div className="origin-academic-grid">
                {academics.map((item) => (
                  <CyberCardShell
                    key={item.id}
                    className="origin-stat-card-shell"
                    innerClassName="origin-stat-card"
                  >
                    <Card>
                      <span className="origin-stat-kanji" aria-hidden="true">
                        {item.kanji}
                      </span>

                      <div className="origin-stat-top">
                        <span className="origin-stat-id">{item.id}</span>
                        <span className="origin-stat-label">{item.label}</span>
                      </div>

                      <div className="origin-stat-value">
                        <span
                          className="origin-stat-value-num"
                          data-val={item.numericVal}
                          data-suffix={item.suffix}
                        >
                          {item.value}
                        </span>
                      </div>

                      <div className="origin-stat-subtext">{item.subtext}</div>
                    </Card>
                  </CyberCardShell>
                ))}
              </div>
            </div>

            {/* Problem Solving / Ability System Section */}
            <div className="origin-dsa-wrapper">
              <div className="origin-dsa-header">
                <div className="origin-dsa-header-left">
                  <span className="origin-dsa-heading">ABILITY SYSTEM // PROBLEM SOLVING</span>
                  <span className="origin-dsa-kanji-title" aria-hidden="true">問題解決</span>
                </div>
                <span className="origin-dsa-line" />
              </div>

              <p className="origin-dsa-desc">
                Currently strengthening my Data Structures and Algorithms skills by
                solving problems and practicing competitive/problem-solving patterns
                across LeetCode, GeeksforGeeks and Coding Ninjas.
              </p>

              <div className="origin-dsa-grid">
                {codingProfiles.map((profile) => (
                  <a
                    key={profile.name}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`dsa-profile-card dsa-profile-card--${profile.accent}`}
                    aria-label={`${profile.name} - ${profile.description}`}
                  >
                    {/* Subtle Watermark Kanji */}
                    <span className="dsa-card-kanji" aria-hidden="true">
                      {profile.kanji}
                    </span>

                    {/* Ambient Glow */}
                    <div className="dsa-card-glow" />

                    {/* Top HUD Row: Platform Index & Corner Arrow */}
                    <div className="dsa-card-top">
                      <span className="dsa-card-tag">{profile.tag}</span>
                      <span className="dsa-card-corner-arrow" aria-hidden="true">↗</span>
                    </div>

                    {/* Platform Official Icon */}
                    <div className="dsa-card-icon-wrap">
                      <img
                        src={profile.icon}
                        alt={`${profile.name} logo`}
                        className="dsa-card-icon"
                        width={30}
                        height={30}
                        loading="lazy"
                      />
                    </div>

                    {/* Main Content */}
                    <div className="dsa-card-body">
                      <h3 className="dsa-card-title">{profile.name}</h3>
                      <p className="dsa-card-desc">{profile.description}</p>
                    </div>

                    {/* CTA Footer */}
                    <div className="dsa-card-footer">
                      <span className="dsa-card-cta">
                        VIEW PROFILE <span className="dsa-card-arrow">→</span>
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="origin-tech-wrapper">
              <div className="origin-tech-heading">I work with:</div>
              <div className="origin-tech-list">
                <span className="origin-tech-pill">JavaScript</span>
                <span className="origin-tech-pill">React</span>
                <span className="origin-tech-pill">Next.js</span>
                <span className="origin-tech-pill">Node.js</span>
                <span className="origin-tech-pill">MongoDB</span>
                <span className="origin-tech-pill">Tailwind</span>
              </div>
            </div>

            <p className="origin-extra">
              Outside of coding, I'm an anime lover, cricket enthusiast, and I
              enjoy exploring creative technology.
            </p>

            <div className="origin-continue">
              <span>CONTINUE // SCROLL</span>
              <span>↓</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cyber Section Divider: Origin -> Journey */}
      <div className="cyber-section-divider" aria-hidden="true">
        <div className="divider-line-bg" />
        <div className="divider-line-fill" />
        <div className="divider-badge">
          <span className="divider-dot" />
          <span className="divider-text">CHAPTER 02 // THE JOURNEY</span>
        </div>
      </div>

      {/* ================= CHAPTER 02: THE JOURNEY ================= */}
      <section className="journey" id="journey">
        <div className="chapter-label">CHAPTER 02</div>

        <h2 className="journey-title">THE JOURNEY</h2>

        <p className="journey-text">
          I started with Computer Science fundamentals, explored Web Development,
          began strengthening my DSA and problem-solving skills, and am now also learning
          Data Science while continuing to build and experiment with technology.
        </p>

        <div className="timeline">
          {/* Ambient vertical neon line */}
          <div className="timeline-line-base" />
          <div className="timeline-line-progress" />

          {journeyEntries.map((entry) => (
            <div
              key={entry.id}
              className={`timeline-item ${entry.isCurrent ? "timeline-item--current" : ""}`}
            >
              <div className="timeline-marker-col">
                <span className={`timeline-year ${entry.isCurrent ? "highlight-year" : ""}`}>
                  {entry.label}
                </span>
                <div className="timeline-dot" />
              </div>

              <CyberCardShell
                className={`timeline-card-shell ${entry.isCurrent ? "timeline-card-shell--current" : ""}`}
                innerClassName={`timeline-card ${entry.isCurrent ? "timeline-card--current active-arc" : ""}`}
              >
                {/* Kanji watermark */}
                <span className="timeline-card-kanji" aria-hidden="true">
                  {entry.kanji}
                </span>

                <div className="timeline-card-header">
                  <span className="timeline-card-badge">{entry.label}</span>
                  {entry.isCurrent && (
                    <span className="timeline-card-status">
                      <span className="timeline-card-status-dot" />
                      ACTIVE
                    </span>
                  )}
                </div>

                <h3>{entry.title}</h3>
                <p>{entry.description}</p>

                <div className="card-tags">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`tag ${entry.isCurrent ? "highlight-tag-pill" : ""}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CyberCardShell>
            </div>
          ))}
        </div>
      </section>

      {/* Cyber Section Divider: Journey -> Arsenal */}
      <div className="cyber-section-divider" aria-hidden="true">
        <div className="divider-line-bg" />
        <div className="divider-line-fill" />
        <div className="divider-badge">
          <span className="divider-dot" />
          <span className="divider-text">CHAPTER 03 // ARSENAL</span>
        </div>
      </div>

      {/* ================= CHAPTER 03: THE ARSENAL ================= */}
      <section className="arsenal" id="arsenal">
        <div className="arsenal-header">
          <p className="chapter-label">CHAPTER 03</p>
          <h2 className="arsenal-title">ARSENAL</h2>
          <p className="arsenal-subtitle">
            MY TECHNOLOGICAL ABILITIES // ABILITY SYSTEM ONLINE
          </p>
        </div>

        {/* Futuristic Cyber Filter Bar */}
        <div className="arsenal-filter-bar" role="tablist" aria-label="Skill Categories">
          {[
            { id: "all", label: "ALL ABILITIES", count: skills.length },
            { id: "frontend", label: "FRONTEND & UI", count: skills.filter((s) => s.filterTags.includes("frontend")).length },
            { id: "backend", label: "BACKEND & DB", count: skills.filter((s) => s.filterTags.includes("backend")).length },
            { id: "tools", label: "TOOLS & DEV", count: skills.filter((s) => s.filterTags.includes("tools")).length },
          ].map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={skillFilter === tab.id}
              className={`arsenal-filter-btn ${skillFilter === tab.id ? "is-active" : ""}`}
              onClick={() => setSkillFilter(tab.id)}
            >
              <span className="filter-bracket">[</span>
              <span className="filter-label">{tab.label}</span>
              <span className="filter-count">({tab.count})</span>
              <span className="filter-bracket">]</span>
            </button>
          ))}
        </div>

        <div className={`skills-grid ${skillFilter !== "all" ? "skills-grid--filtered" : ""}`}>
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      </section>

      {/* Cyber Section Divider: Arsenal -> Missions */}
      <div className="cyber-section-divider" aria-hidden="true">
        <div className="divider-line-bg" />
        <div className="divider-line-fill" />
        <div className="divider-badge">
          <span className="divider-dot" />
          <span className="divider-text">CHAPTER 04 // MISSIONS</span>
        </div>
      </div>

      {/* ================= CHAPTER 04: MISSIONS ================= */}
      <section className="missions" id="missions">
        <div className="missions-header">
          <p className="chapter-label">
            CHAPTER 04
          </p>

          <h2 className="missions-title">
            MISSIONS
          </h2>

          <p className="missions-subtitle">
            Every project is another mission.
            <br />
            These are the worlds I've built.
          </p>
        </div>

        <div className="missions-list">
          {projects.map((project) => (
            <MissionCard
              key={project.id}
              project={project}
              onSelect={(proj) => setSelectedProject(proj)}
            />
          ))}
        </div>
      </section>

      {/* Cyber Section Divider: Missions -> Allies */}
      <div className="cyber-section-divider" aria-hidden="true">
        <div className="divider-line-bg" />
        <div className="divider-line-fill" />
        <div className="divider-badge">
          <span className="divider-dot" />
          <span className="divider-text">CHAPTER 05 // ALLIES</span>
        </div>
      </div>

      {/* ================= CHAPTER 05: ALLIES ================= */}
      <section className="allies" id="allies">
        <div className="allies-header">
          <p className="chapter-label">
            CHAPTER 05
          </p>

          <h2 className="allies-title">
            ALLIES
          </h2>

          <p className="allies-subtitle">
            The places where my work
            <br />
            continues beyond this world.
          </p>
        </div>

        <div className="allies-grid">
          {profiles.map((profile) => (
            <AllyCard
              key={profile.number}
              profile={profile}
            />
          ))}
        </div>
      </section>

      {/* Cyber Section Divider: Allies -> Final Chapter */}
      <div className="cyber-section-divider" aria-hidden="true">
        <div className="divider-line-bg" />
        <div className="divider-line-fill" />
        <div className="divider-badge">
          <span className="divider-dot" />
          <span className="divider-text">FINAL CHAPTER // CONTACT</span>
        </div>
      </div>

      {/* ================= FINAL CHAPTER ================= */}
      <section className="final-chapter" id="contact">
        <div className="final-content">
          <p className="chapter-label">
            FINAL CHAPTER
          </p>

          <h2 className="final-title">
            THE FINAL
            <span>CHAPTER</span>
          </h2>

          <div className="final-line" />

          <h3 className="final-name">
            ROHAN MENDON
          </h3>

          <p className="final-message">
            LET'S BUILD SOMETHING
            <br />
            <strong>AMAZING.</strong>
          </p>

          <SciFiButton
            as="a"
            href={`mailto:${contact.email}`}
            className="contact-button"
            ariaLabel="Contact Me via Email"
          >
            CONTACT ME
          </SciFiButton>

          <div className="final-links">
            <GitHubTooltip href={contact.github} label="GitHub" />

            <LinkedInTooltip href={contact.linkedin} />

            <EmailTooltip href={`mailto:${contact.email}`} label="Mail" />
          </div>
        </div>

        <div className="final-footer">
          <span>
            ROHAN MENDON © 2026
          </span>

          <span>
            BUILT WITH NEXT.JS + THREE.JS
          </span>
        </div>
      </section>
    </main>
  );
}