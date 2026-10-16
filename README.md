<div align="center">

# ⚡ ROHAN MENDON | CYBERPUNK 3D PORTFOLIO ⚡

***A Futuristic 3D WebGL Developer Portfolio & Interactive Cyberpunk HUD***

[![Next.js](https://img.shields.io/badge/Next.js-16.3.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185.1-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.15.0-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://gsap.com/)
[![Lenis](https://img.shields.io/badge/Lenis-1.3.26-000000?style=for-the-badge)](https://lenis.darkroom.engineering/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

[🌐 View Live Portfolio](https://rohanmendon.vercel.app) • [💼 LinkedIn](https://www.linkedin.com/in/rohanmendon/) • [📧 Email Me](mailto:rohanmendon26@gmail.com)

---

</div>

## 🌌 Overview

Welcome to the central command for **Rohan Mendon's** creative development showcase. Designed with a **Cyberpunk / Sci-Fi HUD aesthetic**, this web application merges high-performance full-stack web engineering with real-time **3D WebGL graphics**, smooth kinetic scroll physics, and immersive UI micro-interactions.

Whether you are exploring project telemetry, inspecting problem-solving metrics, or navigating academic milestones, every chapter of this interactive journey is animated and synchronized with GSAP ScrollTrigger camera paths.

---

## ✨ Key Features & Architectural Highlights

### 🎨 3D WebGL Canvas & Particle Systems
- **Three.js & React Three Fiber integration**: High-fps WebGL background featuring cosmic starfield warp particles, glowing matrix grids, and dynamic camera choreography.
- **Scroll-Driven Camera Fly-Through**: GSAP ScrollTrigger maps scroll progress directly into 3D camera coordinates (`x, y, z`) and rotation targets.

### 🕹️ Cyberpunk HUD Visual System
- **Interactive Audio SFX Engine**: Web Audio API sound synthesis providing instantaneous spatial clicks, hover ticks, and futuristic UI feedback.
- **Custom Futuristic Cursor & Scanlines**: Hardware-accelerated custom cursor with magnetic hover snapping and subtle monitor scanline overlays.
- **Dynamic Theme Switcher**: Multi-accent neon palette toggling (Cyan, Purple, Crimson, Emerald, Amber) with instant global state propagation.
- **Japanese Kanji & Tactical Badging**: Minimalist Japanese typography, status badges, ability codes, and glowing cyberpunk borders.

### 📜 Interactive Chapters & Telemetry
- **Chapter 01: Origin**: Academic scores (95.65% 10th, 90.67% 12th, 9.26 CGPA) and active problem-solving profiles (LeetCode, GeeksforGeeks, Coding Ninjas).
- **Chapter 02: The Arsenal**: Filterable skill grid highlighting Core Frontend, Backend Runtime, Database Systems, and Creative 3D tools.
- **Chapter 03: The Journey**: Interactive timeline logging key computer science milestones from fundamental algorithms to full-stack engineering.
- **Chapter 04: Missions (Projects)**: Interactive project cards with deep-dive modal telemetry windows detailing architectural highlights, stack tags, GitHub repositories, and live deployments.
- **Chapter 05: Allies & Contact**: Interactive direct communication links and social profile cards.

---

## 🛠️ Technology Stack

| Category | Technologies |
| :--- | :--- |
| **Framework & Core** | Next.js 16 (App Router), React 19, JavaScript (ES6+) |
| **3D & WebGL Graphics** | Three.js, `@react-three/fiber`, `@react-three/drei` |
| **Animations & Kinetics** | GSAP 3.15, ScrollTrigger, Lenis Smooth Scroll, Framer Motion 13 |
| **Styling & HUD Design** | Tailwind CSS v4, Vanilla CSS Custom Properties, Glassmorphism |
| **Audio & SFX** | Web Audio API (Synthesized UI audio feedback engine) |
| **Tooling & Build** | Node.js, ESLint, PostCSS, Vercel |

---

## 🚀 Featured Missions (Projects)

### ☕ 01. Get Me A Chai
> **Creator Crowdfunding & Membership Platform**
* **Description**: Full-stack creator platform inspired by Patreon and Buy Me A Coffee. Features Razorpay payments with HMAC SHA256 signature verification, tiered memberships, content gating, and real-time revenue analytics.
* **Tech Stack**: Next.js 16, MongoDB Atlas, NextAuth.js, Razorpay API, Tailwind CSS
* **Links**: [GitHub Repository](https://github.com/rohanmendon26-byte/GetMeAChai) • [Live Demo](https://get-me-a-chai-ecru.vercel.app/)

### 🔗 02. LinkForge
> **Next-Gen URL Shortener & Click Telemetry**
* **Description**: High-performance URL shortening suite with low-latency 302 redirections, NanoID collision protection, customizable branded aliases, dynamic QR code studio, and real-time visitor analytics.
* **Tech Stack**: Next.js 16, React 19, MongoDB Atlas, Recharts, NextAuth.js
* **Links**: [GitHub Repository](https://github.com/rohanmendon26-byte/URL-Shortener) • [Live Demo](https://url-shortener-coral-nine.vercel.app/)

### 🔐 03. PassOP
> **Secure Password Vault & Management System**
* **Description**: Password management suite with 1-click clipboard actions, show/hide password toggles, Lord Icon animations, REST API backend, and instant entry edit modes.
* **Tech Stack**: React 18, Express.js, Node.js, MongoDB Atlas, Tailwind CSS
* **Links**: [GitHub Repository](https://github.com/rohanmendon26-byte/Password-Manager) • [Live Demo](https://password-manager-df75-xi.vercel.app/)

---

## 💻 Getting Started Locally

Follow these steps to run the portfolio locally on your machine.

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** / **yarn** / **pnpm** / **bun**

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rohanmendon26-byte/rohan-portfolio.git
   cd rohan-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application in action.

---

## 📂 Directory Structure

```plaintext
rohan-portfolio/
├── app/
│   ├── layout.js            # Global layout wrapper & SEO meta configuration
│   ├── page.js              # Core single-page application & GSAP scroll orchestration
│   └── globals.css          # Futuristic HUD CSS variables, scanlines & animations
├── components/
│   ├── Scene.jsx            # Three.js / R3F WebGL 3D Canvas & Camera Controller
│   ├── AudioToggle.jsx      # Cyberpunk UI Audio SFX Toggle Switch
│   ├── CustomCursor.jsx     # Custom hardware-accelerated mouse tracking cursor
│   ├── CyberCard.jsx        # Neon-bordered futuristic card shell wrapper
│   ├── ProjectModal.jsx     # Detailed mission breakdown modal dialog
│   ├── SectionNavigation.jsx# Interactive scroll chapter jump navigation HUD
│   ├── SciFiButton.jsx      # Glitch & clip-path styled interactive button
│   ├── Starfield.jsx        # High-performance CSS background starfield fallback
│   ├── ThemeToggle.jsx      # Multi-color neon palette theme selector
│   └── ui/                  # UI utility components (e.g., LampContainer)
├── lib/
│   ├── audioSystem.js       # Web Audio API sound effect generator
│   ├── scrollState.js       # Global reactive scroll progress telemetry
│   └── themeState.js        # Theme state provider & palette management
├── public/
│   ├── icons/               # SVG technology & platform icons
│   └── audio/               # Audio assets & sound effects
├── package.json             # NPM dependencies & project scripts
└── README.md                # Project documentation
```

---

## ⚡ Available Scripts

In the project directory, you can run:

* `npm run dev` - Starts the development server with Hot Module Replacement (HMR)
* `npm run build` - Compiles and builds the production bundle for deployment
* `npm run start` - Runs the built production server locally
* `npm run lint` - Runs ESLint to check for code quality and syntax issues

---

## 📊 Problem Solving & DSA Profiles

- 🟢 **LeetCode**: [Rohan_mendon117](https://leetcode.com/u/Rohan_mendon117/)
- 🟢 **GeeksforGeeks**: [rohanme1mbd](https://www.geeksforgeeks.org/profile/rohanme1mbd)
- 🔴 **Coding Ninjas**: [AlgoRohan](https://www.naukri.com/code360/profile/AlgoRohan)

---

## 📬 Contact & Connect

If you'd like to collaborate, discuss web development / data science opportunities, or build something awesome together, feel free to get in touch!

* **GitHub**: [@rohanmendon26-byte](https://github.com/rohanmendon26-byte)
* **LinkedIn**: [Rohan Mendon](https://www.linkedin.com/in/rohanmendon/)
* **Email**: [rohanmendon26@gmail.com](mailto:rohanmendon26@gmail.com)

---

<div align="center">

*Designed & Built with ❤️ and ☕ by **Rohan Mendon***

© 2026 Rohan Mendon. All rights reserved.

</div>
