# ORZU Platform — Architecture & Code Guidelines

This document outlines the coding standards, component architecture, and design principles followed across the ORZU codebase.

## 1. Clean Architecture & Folder Structure

- **`src/app/components/`**: Domain-specific pages and interactive screens.
- **`src/app/components/ui/`**: Reusable, accessible UI atoms and primitives based on Radix UI.
- **`src/app/context/`**: Global state management providers (User session, Theme).
- **`src/app/data/`**: Strongly-typed mock repositories, schemas, and data models.
- **`src/styles/`**: Global styles, themes, and design tokens via Tailwind CSS.

## 2. Component Design Principles

- **Explicit Interfaces**: All components must define strict TypeScript interfaces for their props. Avoid loose `any` types.
- **Safe Fallbacks**: Always provide graceful fallbacks for dynamic data (e.g., student name, streak, avatar URLs).
- **Graceful Error Handling**: Render safe UI boundaries using `<ErrorBoundary>` rather than exposing raw runtime errors to end-users.

## 3. Styling & Responsiveness

- **Mobile First**: All layouts must be responsive and tested down to **320px** screen widths without horizontal scroll bleeding.
- **Dark Mode Support**: Ensure sufficient color contrast in both dark and light modes according to WCAG AA guidelines.
- **Design Tokens**: Brand colors (`#ae8c5e` / `#8b6f4a` in light mode, `#01de9d` accents in dark mode) should remain consistent across views.

## 4. Security & Environment Standards

- **Zero Secrets in Code**: Never commit credentials, tokens, or private endpoints. Use `import.meta.env` with `.env` and provide defaults in `.env.example`.
- **Sanitized Web Storage**: All `localStorage` / `sessionStorage` accesses must be wrapped in `try/catch` with runtime schema validation.
