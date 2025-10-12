# Artifact A3: aiascent.dev - Technical Scaffolding Plan
# Date Created: C0
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** Outlines the proposed technical scaffolding and file structure, leveraging the `automationsaas` project shell and components from `aiascent.game`.
- **Tags:** technical plan, scaffolding, file structure, nextjs, react, tailwindcss

## 1. Overview

This document outlines the proposed technical scaffolding and file structure for the `aiascent.dev` project. This plan leverages existing assets to accelerate development, ensuring a clean and scalable architecture from the start.

## 2. Technology Stack

-   **Language:** TypeScript
-   **Framework:** Next.js (from `automationsaas` shell)
-   **UI Library:** React (from `automationsaas` shell)
-   **Styling:** TailwindCSS (from `automationsaas` shell)
-   **Deployment:** The project will be deployed as a static site, hosted on the existing server infrastructure and managed by Caddy.

## 3. Proposed File Structure

The project will start with the file structure from the `automationsaas` project and will be adapted as follows:

```
aiascent-dev/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   └── whitepaper/
│   │       ├── InteractiveWhitepaper.tsx  # Ported & refactored from aiascent.game
│   │       └── PageContent.tsx            # Dependency of the viewer
│   │
│   ├── pages/
│   │   ├── _app.tsx
│   │   ├── index.tsx                  # The main landing page
│   │   └── whitepaper.tsx             # Page to host the interactive whitepaper
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   └── data/
│       └── whitepaperContent.json     # Data source for the whitepaper
│
├── public/
│   └── ... (images, fonts)
│
├── package.json
├── tsconfig.json
└── ... (Next.js config files)
```

## 4. Key Architectural Concepts

-   **Leverage Existing Assets:** The core strategy is to reuse and adapt existing, proven components and project structures to accelerate development.
    -   The Next.js/React/TailwindCSS foundation from `automationsaas` provides a modern and efficient web development stack.
    -   The `ReportViewer` from `aiascent.game` provides the complex logic for the interactive document experience.
-   **Component-Based Architecture:** The UI will be built by composing reusable React components.
-   **Static Site Generation (SSG):** Next.js will be used to generate a static site, ensuring maximum performance and security.
-   **Data Decoupling:** The content for the whitepaper will be stored in a separate JSON file, decoupling the data from the presentation layer and making it easy to update or add new reports in the future.