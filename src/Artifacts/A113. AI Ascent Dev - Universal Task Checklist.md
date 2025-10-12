# Artifact A113: AI Ascent Dev - Universal Task Checklist
# Date Created: C117
# Author: AI Model & Curator

## 1. Purpose

This artifact provides a structured checklist for the initial development tasks for the new `aiascent.dev` website project. It organizes the work required to set up the project shell, port over relevant components, and build the core features like the interactive whitepaper.

## Task List for `aiascent.dev` - Phase 1

## T-1: Project Setup and Scaffolding
- **Files Involved:**
    - `package.json`
    - `.gitignore`
    - Next.js project structure (from `automationsaas` shell)
    - `src/Artifacts/` (All newly generated `aiascent-dev-A*.md` files)
- **Total Tokens:** ~5,000
- **More than one cycle?** No
- **Status:** To Do

- [ ] **Task (T-ID: 1.1):** Initialize the `aiascent-dev` project folder.
- [ ] **Task (T-ID: 1.2):** Copy the shell of the `automationsaas` project into the new directory.
- [ ] **Task (T-ID: 1.3):** Initialize a Git repository and create the first commit, following the `A9. GitHub Repository Setup Guide`.
- [ ] **Task (T-ID: 1.4):** Create the `src/Artifacts` directory and place all the `aiascent-dev-A*.md` planning documents inside it.
- [ ] **Task (T-ID: 1.5):** Clean out any `automationsaas`-specific logic, leaving only the Next.js/React/TailwindCSS shell.

### Verification Steps
1.  Run `npm install` and `npm run dev` in the new project directory.
2.  **Expected:** A blank or minimal starter page should be viewable at `http://localhost:3000`. The project should have no compilation errors.

## T-2: Port and Adapt Report Viewer
- **Files Involved:**
    - `aiascent.game/src/components/ReportViewer.tsx` (and its dependencies)
    - `aiascent-dev/src/components/InteractiveWhitepaper.tsx` (New)
    - `aiascent-dev/src/pages/whitepaper.tsx` (New)
- **Total Tokens:** ~10,000+ (depending on dependencies)
- **More than one cycle?** Yes
- **Status:** To Do

- [ ] **Task (T-ID: 2.1):** Analyze the `ReportViewer` component from `aiascent.game` and identify all its child components and dependencies.
- [ ] **Task (T-ID: 2.2):** Copy the component and its dependencies into the `aiascent-dev` project.
- [ ] **Task (T-ID: 2.3):** Refactor the copied components to remove any `aiascent.game`-specific logic, styling, or state management. Rename `ReportViewer` to `InteractiveWhitepaper`.
- [ ] **Task (T-ID: 2.4):** Create a new page at `/whitepaper` that renders the `InteractiveWhitepaper` component.
- [ ] **Task (T-ID: 2.5):** Adapt the component to load its content from a local JSON file (e.g., the content from `A78. DCE - Whitepaper - Process as Asset.md`).

### Verification Steps
1.  Navigate to `/whitepaper` in the browser.
2.  **Expected:** The interactive report viewer should render, displaying the content of the DCE whitepaper, complete with page navigation and section breakdowns.

## T-3: Build Main Website Shell
- **Files Involved:**
    - `aiascent-dev/src/pages/index.tsx`
    - `aiascent-dev/src/components/Header.tsx`
    - `aiascent-dev/src/components/Footer.tsx`
- **Total Tokens:** ~3,000
- **More than one cycle?** No
- **Status:** To Do

- [ ] **Task (T-ID: 3.1):** Design and implement the main landing page (`index.tsx`).
- [ ] **Task (T-ID: 3.2):** Create a reusable `Header` component with navigation links (e.g., Home, Whitepaper, Tutorials, GitHub).
- [ ] **Task (T-ID: 3.3):** Create a reusable `Footer` component.

### Verification Steps
1.  View the home page in the browser.
2.  **Expected:** A professional-looking landing page is displayed with a functional header and footer.

## T-4: Plan for Next Cycle
- **Files Involved:**
    - `src/Artifacts/A113. AI Ascent Dev - Universal Task Checklist.md`
- **Total Tokens:** ~1,000
- **More than one cycle?** No
- **Status:** To Do

- [ ] **Task (T-ID: 4.1):** Update this checklist based on the progress made and create a new checklist for the next phase of development (e.g., creating tutorial content).