# ORZU — Smart IELTS & SAT Learning Platform

<div align="center">

![ORZU Platform Banner](https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=400&fit=crop&auto=format)

[![React](https://img.shields.io/badge/React-18.3-blue.svg?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Security](https://img.shields.io/badge/Security-Audited-brightgreen.svg?logo=securityscorecard)](https://github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**An interactive, gamified e-learning platform crafted for students aiming for top-tier IELTS & SAT scores.**

[Key Features](#key-features) • [Architecture](#architecture) • [Getting Started](#getting-started) • [Security & Standards](#security--standards) • [Deployment](#deployment)

</div>

---

## 🌟 Overview

**ORZU** is a modern, high-performance web application tailored to support students preparing for **IELTS** and **SAT** standardized examinations. With an intuitive user experience, adaptive dark/light interface, gamified streak accountability, and interactive assignments with mentor feedback, ORZU elevates self-paced learning to an engaging, result-oriented discipline.

---

## 🚀 Key Features

- **🎯 Dual Exam Paths**: Dedicated curriculum tracks for **IELTS** (Band 7.5 - 9.0) and **SAT** (1500+), or combined dual-track preparation.
- **🔥 Gamified Streak Engine**: Daily activity tracking, visual calendar streaks, and streak repair protection mechanisms.
- **📚 Rich Course Modules**: Step-by-step modular curriculum covering Reading, Listening, Writing, Speaking, and SAT Quantitative/Verbal sections.
- **📝 Interactive Assignments & Mentor Feedback**: Submit tasks with file attachments or code/essay repositories and receive comprehensive mentor evaluations.
- **📊 Real-time Progress Analytics**: Dynamic charts, score distributions, and subject-level proficiency breakdowns powered by Recharts.
- **🌓 Adaptive Theme**: Seamless Dark & Light modes with persistent system and user preference synchronization.
- **🛡️ Enterprise Error Handling**: Graceful React Error Boundaries prevent application crashes and suppress sensitive technical trace leaks.
- **📱 Responsive across All Viewports**: Meticulously designed for devices ranging from ultra-compact smartphones (320px) to 4K displays.

---

## 🏗️ Architecture & Project Structure

The project follows senior clean architecture standards with separated concerns:

```text
orzu-app/
├── public/                 # Static assets & modern SVG favicon
├── src/
│   ├── app/
│   │   ├── components/     # UI views & domain-specific components
│   │   │   ├── ui/         # Accessible headless primitives (Radix UI based)
│   │   │   ├── Dashboard.tsx
│   │   │   ├── CoursesPage.tsx
│   │   │   ├── CourseDetail.tsx
│   │   │   ├── LessonPage.tsx
│   │   │   ├── AssignmentPage.tsx
│   │   │   ├── AssignmentsListPage.tsx
│   │   │   ├── MentorFeedbackPage.tsx
│   │   │   ├── ProgressPage.tsx
│   │   │   ├── StreakModal.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── ...
│   │   ├── context/        # React Context providers (UserContext, DarkModeContext)
│   │   ├── data/           # Structured mock data & domain types
│   │   └── App.tsx         # Root application router & composition layer
│   ├── styles/             # Global CSS variables, fonts, and Tailwind styles
│   └── main.tsx            # Application entrypoint
├── .env.example            # Environment configuration template
├── .gitignore              # Strict security gitignore rules
├── index.html              # SEO-optimized HTML5 shell with Open Graph tags
├── package.json            # Project manifest & dependencies
└── vite.config.ts          # Vite build configuration with vendor chunk optimization
```

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Core** | React 18, TypeScript, Vite 6 |
| **Styling & Design** | Tailwind CSS v4, Lucide Icons, Emotion |
| **Component Primitives**| Radix UI headless components |
| **Data Visualization** | Recharts, D3-scale |
| **PDF & Export** | jsPDF, html2canvas |
| **State & Storage** | React Context API, Web Storage API (safely wrapped) |

---

## ⚡ Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **Package Manager**: `pnpm` (recommended), `npm`, or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/pulatov077/orzu-app.git
   cd orzu-app
   ```

2. **Set up Environment Variables**:
   ```bash
   cp .env.example .env
   ```

3. **Install Dependencies**:
   ```bash
   pnpm install
   # or: npm install
   ```

4. **Start the Development Server**:
   ```bash
   pnpm dev
   # or: npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for Production**:
   ```bash
   pnpm build
   # or: npm run build
   ```

---

## 🔒 Security & Code Standards

- **Zero Secrets Leak Guarantee**: All sensitive configurations are decoupled into environment variables (`.env`). No API tokens, passwords, or private keys are hardcoded in source control.
- **Strict `.gitignore` Policy**: Prevents local environments, credentials, debug logs, and build artifacts from leaking into public Git repositories.
- **Safe Web Storage Access**: LocalStorage operations are encapsulated with `try/catch` and runtime payload validation to eliminate client-side crash vectors.
- **Zero Warnings Production Bundle**: Configured with optimized Rollup vendor chunking (`radix-vendor`, `charts-vendor`, `pdf-vendor`, `icons-vendor`) to ensure fast first contentful paint (FCP) and no chunk size warnings.
- **SEO & Social Preview**: Complete Open Graph, Twitter Cards, theme colors, and semantic metadata for search engine indexing.

---

## 🚢 Deployment

The repository includes pre-configured deployment targets:

- **Vercel**: Configured via `vercel.json` with Single Page Application (SPA) rewrite rules.
- **Static Hosting**: Ready to deploy on Cloudflare Pages, Netlify, or AWS S3/CloudFront using the `dist/` build directory.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).