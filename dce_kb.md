<!--
  File: flattened_repo.md
  Source Directory: c:\Projects\DCE
  Date Generated: 2025-10-12T20:28:59.793Z
  ---
  Total Files: 125
  Approx. Tokens: 140581
-->

<!-- Top 10 Text Files by Token Count -->
1. src\Artifacts\A0. DCE Master Artifact List.md (9297 tokens)
2. src\Artifacts\A117. DCE - FAQ for aiascent.dev Knowledge Base.md (3112 tokens)
3. src\Artifacts\A71. Sample M0 Prompt.md (2706 tokens)
4. src\Artifacts\A52.2 DCE - Interaction Schema Source.md (2473 tokens)
5. src\Artifacts\A78. DCE - Whitepaper - Process as Asset.md (2455 tokens)
6. src\Artifacts\A42. DCE - Phase 2 - Initial Scaffolding Deployment Script.md (2066 tokens)
7. src\Artifacts\A97. DCE - vLLM Response Progress UI Plan.md (1895 tokens)
8. src\Artifacts\A21. DCE - Phase 1 - Feature Drift Analysis vs. VS Code Explorer.md (1847 tokens)
9. src\Artifacts\A10. DCE - Metadata and Statistics Display.md (1822 tokens)
10. src\Artifacts\A20. DCE - Phase 1 - Advanced UX & Automation Plan.md (1817 tokens)

<file path="src/Artifacts/A0. DCE Master Artifact List.md">
# Artifact A0: DCE Master Artifact List
# Date Created: C1
# Author: AI Model & Curator
# Updated on: C118 (Consolidate A117 FAQ artifacts)

## 1. Purpose

# This file serves as the definitive, parseable list of all documentation artifacts for the "Data Curation Environment" (DCE) VS Code Extension project.

## 2. Formatting Rules for Parsing

# *   Lines beginning with `#` are comments and are ignored.
# *   `##` denotes a major category header and is ignored.
# *   `###` denotes an artifact entry. The text following it is the artifact's full name and ID.
# *   Lines beginning with `- **Description:**` provide context for the project.
# *   Lines beginning with `- **Tags:**` provide keywords for Inference.

## 3. Artifacts List

## I. Project Planning & Design

### A1. DCE - Project Vision and Goals
- **Description:** High-level overview of the DCE VS Code extension, its purpose, and the three-phase development plan.
- **Tags:** project vision, goals, scope, phase 1, phase 2, phase 3, vs code extension

### A2. DCE - Phase 1 - Context Chooser - Requirements & Design
- **Description:** Detailed functional and technical requirements for Phase 1, focusing on the file tree with checkboxes and the flattening functionality.
- **Tags:** requirements, design, phase 1, context chooser, tree view, checkbox, flatten, vs code api

### A3. DCE - Technical Scaffolding Plan
- **Description:** Outlines the proposed file structure, technologies, and key VS Code API components for the extension, based on the `The-Creator-AI-main` reference repo.
- **Tags:** technical plan, scaffolding, file structure, typescript, vs code extension, api

### A4. DCE - Analysis of The-Creator-AI Repo
- **Description:** Provides a detailed analysis of the `The-Creator-AI-main` reference repository, its architecture, and its mapping to the Data Curation Environment project goals.
- **Tags:** analysis, repository, architecture, vscode-extension, project-planning

### A5. DCE - Target File Structure
- **Description:** A text-based representation of the target file structure for the DCE extension, outlining the layout of directories and key files.
- **Tags:** file structure, architecture, project layout, scaffolding

### A6. DCE - Initial Scaffolding Deployment Script (DEPRECATED)
- **Description:** (Deprecated) Contains a Node.js script that creates the initial directory structure. This is obsolete as the AI now generates files directly.
- **Tags:** deployment, script, scaffolding, bootstrap, nodejs, automation, deprecated

### A7. DCE - Development and Testing Guide
- **Description:** A step-by-step guide explaining how to run, debug, and test the DCE extension within VS Code using the Extension Development Host.
- **Tags:** development, testing, debugging, workflow, vs code extension, f5

### A8. DCE - Phase 1 - Selection Sets Feature Plan
- **Description:** A plan outlining the user stories, UI/UX, and technical implementation for saving, loading, and persisting different sets of selected files (selection profiles).
- **Tags:** feature plan, selection sets, profiles, context management, persistence, phase 1

### A9. DCE - GitHub Repository Setup Guide
- **Description:** A step-by-step guide with the necessary git commands to initialize the project as a local repository and push it to a new remote repository on GitHub.
- **Tags:** git, github, version control, setup, repository

### A10. DCE - Metadata and Statistics Display
- **Description:** Outlines the requirements and design for displaying live metadata (total selected files, total tokens) and for showing aggregate statistics (token and file counts) for folders in the file tree.
- **Tags:** feature plan, metadata, statistics, token count, ui, ux

### A11. DCE - Regression Case Studies
- **Description:** Documents recurring bugs, their root causes, and codified solutions to prevent future regressions during development.
- **Tags:** bugs, regression, troubleshooting, development, best practices

### A12. DCE - Logging and Debugging Guide
- **Description:** Explains how to access and use the integrated logging solution for debugging the extension's backend and frontend components.
- **Tags:** logging, debugging, troubleshooting, development, output channel

### A13. DCE - Phase 1 - Right-Click Context Menu
- **Description:** A plan for implementing standard file explorer context menu actions (e.g., Rename, Delete, Copy Path) in the custom file tree.
- **Tags:** feature plan, context menu, right-click, file operations, ux, phase 1

### A14. DCE - Ongoing Development Issues
- **Description:** A tracking document for recurring or persistent issues that need to be monitored across development cycles until they are confirmed as resolved.
- **Tags:** bugs, tracking, issues, logging, node_modules, performance

### A15. DCE - Phase 1 - Multi-Select & Sorting Feature Plan
- **Description:** Details the requirements for multi-selection (click, Ctrl, Shift) in both the main file tree and the "Selected Items" panel, and multi-level column sorting.
- **Tags:** feature plan, multi-select, sorting, list view, ux, phase 1

### A16. DCE - Phase 1 - UI & UX Refinements Plan
- **Description:** Covers visual and usability improvements like fixing panel layouts, resolving overflow bugs, adding loading indicators, and improving scrollbar visibility.
- **Tags:** feature plan, ui, ux, layout, bug fix, loading indicator, phase 1

### A17. DCE - Phase 1 - Advanced Tree View Features
- **Description:** Outlines the plan for advanced tree view interactions, specifically the implementation of scrollable, self-contained views for large, expanded folders.
- **Tags:** feature plan, tree view, ux, scrollable, phase 1

### A18. DCE - Phase 1 - Active File Sync Feature Plan
- **Description:** Details the requirements and implementation for automatically revealing and highlighting the active editor's file in the custom Data Curation file tree.
- **Tags:** feature plan, active file, sync, reveal, tree view, ux, phase 1

### A19. DCE - Phase 1 - File Interaction Plan (Click & Remove)
- **Description:** Details the requirements for opening files by single-clicking them and quickly removing single files from the selection list via a mouse-over action.
- **Tags:** feature plan, single-click, open file, quick remove, ux, phase 1

### A20. DCE - Phase 1 - Advanced UX & Automation Plan
- **Description:** Details plans for several UX enhancements, including auto-revealing the flattened file, showing selected counts in folder stats, and providing an option to auto-add new files to the selection.
- **Tags:** feature plan, ux, automation, reveal, statistics, auto-add, phase 1

### A21. DCE - Phase 1 - Feature Drift Analysis vs. VS Code Explorer
- **Description:** A comparative analysis documenting the functional and behavioral differences between the DCE custom file view and the native VS Code Explorer to guide future development and feature parity.
- **Tags:** feature plan, analysis, drift, ux, vs code explorer, parity

### A22. DCE - Phase 1 - Search & Filter Feature Plan
- **Description:** Outlines the requirements and implementation for a search bar to filter the main file tree view by file or folder name.
- **Tags:** feature plan, search, filter, tree view, ux, phase 1

### A23. DCE - Phase 1 - Advanced Interactions (Keyboard & Drag-Drop) Plan
- **Description:** Details the requirements for implementing full keyboard navigation and drag-and-drop file/folder operations within the main file tree.
- **Tags:** feature plan, keyboard navigation, drag and drop, file operations, accessibility, ux, phase 1

### A24. DCE - Selection Paradigm Terminology
- **Description:** A document to clarify the terminology used within the project to distinguish between different types of user selections (e.g., "checking" for flattening vs. "selecting" for actions).
- **Tags:** documentation, terminology, selection, checking, design

### A25. DCE - Phase 1 - Git & Problems Integration Plan
- **Description:** Outlines the user stories and technical approach for integrating Git status indicators and VS Code Problem Diagnostics into the custom file tree.
- **Tags:** feature plan, git, problems, diagnostics, ux, phase 1

### A26. DCE - Phase 1 - File System Traversal & Caching Strategy
- **Description:** Documents the root cause of the folder visibility bug and outlines the new strategy of using recursive directory traversal instead of `findFiles` to build a complete and accurate file system map.
- **Tags:** bug fix, file system, traversal, refresh, cache, architecture

### A27. DCE - Phase 1 - Undo-Redo Feature Plan
- **Description:** Details the requirements for implementing an undo/redo stack for file system operations (move, delete) performed within the DCE view, to achieve parity with the native explorer's Ctrl+Z functionality.
- **Tags:** feature plan, undo, redo, ctrl+z, file operations, ux, phase 1

### A28. DCE - Packaging and Distribution Guide
- **Description:** Provides a step-by-step guide on how to package the extension into a `.vsix` file for beta testing and distribution.
- **Tags:** packaging, distribution, vsix, vsce, deployment

### A29. DCE - Phase 1 - Binary and Image File Handling Strategy
- **Description:** Defines the strategy for handling binary files; they can be checked, but only their metadata (path, size) is included in the flattened output, not their content.
- **Tags:** feature plan, binary, image, metadata, flatten, phase 1

### A30. DCE - Phase 1 - PDF Handling and Virtualization Strategy
- **Description:** Defines the strategy for handling PDF files. Text is extracted on-demand and cached in memory for flattening, creating a "virtual" markdown file without modifying the user's workspace.
- **Tags:** feature plan, pdf, text extraction, virtualization, cache, phase 1

### A31. DCE - Phase 2 - Multimodal Content Extraction (PDF Images)
- **Description:** A plan for a future feature to extract images from PDF files and use a multimodal LLM to generate rich, textual descriptions for inclusion in the context.
- **Tags:** feature plan, multimodal, image to text, pdf, llm, phase 2

### A32. DCE - Phase 1 - Excel and CSV Handling Strategy
- **Description:** Defines the strategy for handling tabular data files (.xlsx, .xls, .csv) by converting them to Markdown tables on-demand and caching them in memory for flattening.
- **Tags:** feature plan, excel, csv, text extraction, virtualization, cache, phase 1

### A33. DCE - Phase 1 - Copy-Paste Feature Plan
- **Description:** Details the requirements and implementation for copying and pasting files and folders within the DCE file tree using standard keyboard shortcuts (Ctrl+C, Ctrl+V).
- **Tags:** feature plan, copy, paste, file operations, keyboard shortcuts, ux, phase 1

### A34. DCE - Phase 2 - Parallel Co-Pilot Panel - Vision & Requirements
- **Description:** Outlines the high-level vision and user stories for the Phase 2 multi-tabbed editor panel, designed for comparing and managing multiple AI-generated responses.
- **Tags:** feature plan, phase 2, co-pilot, multi-tab, ui, ux, requirements

### A35. DCE - Phase 2 - UI Mockups and Flow
- **Description:** Provides a detailed textual description and flow diagram for the user interface of the Parallel Co-Pilot Panel, including tab management and the "swap" interaction.
- **Tags:** feature plan, phase 2, ui, ux, mockup, workflow

### A36. DCE - Phase 2 - Technical Implementation Plan
- **Description:** Details the technical approach for building the Parallel Co-Pilot Panel, including the new webview provider, state management, IPC channels, and backend logic for file content swapping.
- **Tags:** feature plan, phase 2, technical plan, architecture, webview, ipc

### A37. DCE - Phase 2 - Cycle Navigator & Knowledge Graph - Vision
- **Description:** Outlines the vision for a cycle-based navigation system to browse the history of AI-generated responses and project states, creating a navigable knowledge graph.
- **Tags:** feature plan, phase 2, knowledge graph, history, cycle navigator, ui, ux

### A38. DCE - Phase 2 - Cycle Navigator - UI Mockup
- **Description:** Provides a textual mockup and interaction flow for the Cycle Navigator UI, including the cycle counter and navigation controls within the Parallel Co-Pilot Panel.
- **Tags:** feature plan, phase 2, ui, ux, mockup, workflow, cycle navigator

### A39. DCE - Phase 2 - Cycle Navigator - Technical Plan
- **Description:** Details the technical approach for implementing the Cycle Navigator, including data structures for storing cycle-specific responses and the state management for historical navigation.
- **Tags:** feature plan, phase 2, technical plan, architecture, state management, data model

### A40. DCE - Phase 2 - Parallel Co-Pilot - Target File Structure
- **Description:** A text-based representation of the target file structure for the new Phase 2 Parallel Co-Pilot panel, outlining the layout of new directories and key files.
- **Tags:** file structure, architecture, project layout, scaffolding, phase 2

### A40.1. DCE - Phase 2 - Competitive Analysis & Feature Ideas
- **Description:** An analysis of existing tools and extensions for managing multiple AI responses, with a list of potential features to incorporate into the Parallel Co-Pilot panel.
- **Tags:** feature plan, phase 2, research, competitive analysis, co-pilot

### A41. DCE - Phase 2 - API Key Management - Feature Plan
- **Description:** Outlines the user stories and technical plan for a settings UI where users can securely input and manage their API keys for various LLM services.
- **Tags:** feature plan, phase 2, settings, api key, configuration, security

### A41.1. DCE - Phase 2 - Advanced Features & Integrations Plan
- **Description:** Explores future enhancements for the Parallel Co-Pilot, such as applying AI responses as diff patches and integrating with Git for direct commits.
- **Tags:** feature plan, phase 2, ideation, diff, patch, git, workflow

### A41.2. DCE - Phase 2 - Feature Ideation & Competitive Analysis
- **Description:** An analysis of similar AI coding assistant tools (e.g., Cursor.sh, Copilot Chat) and a brainstorm of potential advanced features for the Parallel Co-Pilot panel.
- **Tags:** feature plan, phase 2, research, competitive analysis, ideation, roadmap

### A42. DCE - Phase 2 - Initial Scaffolding Deployment Script
- **Description:** Contains a Node.js script that, when executed, creates the file and directory structure for the Phase 2 Parallel Co-Pilot panel.
- **Tags:** deployment, script, scaffolding, bootstrap, nodejs, automation, phase 2

### A43. DCE - Phase 2 - Implementation Roadmap
- **Description:** Provides a step-by-step implementation plan for building the Phase 2 features, including the Parallel Co-Pilot panel and the integrated Diff Tool.
- **Tags:** feature plan, phase 2, roadmap, project plan, diff tool

### A44. DCE - Phase 1 - Word Document Handling Strategy
- **Description:** Defines the strategy for handling Word document files (.docx) by converting them to text on-demand and caching them in memory for flattening.
- **Tags:** feature plan, docx, text extraction, virtualization, cache, phase 1

### A45. DCE - Phase 2 - Pop-out Co-Pilot Window - Feature Plan
- **Description:** Outlines the technical strategy to allow the Parallel Co-Pilot panel to be "popped out" into a separate window by re-implementing it as a main editor WebviewPanel.
- **Tags:** feature plan, phase 2, pop-out, window, webview, ux

### A46. DCE - Phase 2 - Paste and Parse Response - Feature Plan
- **Description:** Details the plan for allowing users to paste a full AI response into a tab, which the extension will then parse to identify file paths referenced within XML tags.
- **Tags:** feature plan, phase 2, paste, parse, workflow, automation

### A48. DCE - Phase 2 - Advanced Syntax Highlighting Plan
- **Description:** Outlines the strategy to replace the plain textarea in response tabs with a proper code editor component to provide rich syntax highlighting for Markdown and embedded code.
- **Tags:** feature plan, phase 2, ui, ux, syntax highlighting, monaco, codemirror

### A49. DCE - Phase 2 - File Association & Diffing Plan
- **Description:** Plans the UI and backend logic to visually link file blocks in an AI response to workspace files and sets the stage for an integrated diff tool.
- **Tags:** feature plan, phase 2, ui, ux, diff, file association

### A50. DCE - Phase 2 - UI Component Plan (Resizable Panes & Inner Editors)
- **Description:** Documents the plan for advanced UI components like resizable panes and nested, scrollable editors within the Parallel Co-Pilot panel.
- **Tags:** feature plan, phase 2, ui, ux, resizable, scrollable, editor

### A51. DCE - A-B-C Testing Strategy for UI Bugs
- **Description:** Outlines a development pattern for creating parallel, isolated test components to diagnose and resolve persistent UI bugs, such as event handling or rendering issues.
- **Tags:** process, debugging, troubleshooting, ui, ux, react

### A52. DCE - Interaction Schema Refinement
- **Description:** Proposes a set of refined rules for the AI's output format to improve the reliability and consistency of automated parsing within the Parallel Co-Pilot Panel.
- **Tags:** documentation, process, parsing, interaction schema, roadmap

### A52.1 DCE - Parser Logic and AI Guidance
- **Description:** Provides the literal source code for the response parser and explicit instructions to the AI on how to format its output to ensure successful parsing.
- **Tags:** documentation, process, parsing, metainterpretability, source of truth

### A52.2 DCE - Interaction Schema Source
- **Description:** The canonical source text for the M3. Interaction Schema, which is injected into all generated prompts.
- **Tags:** documentation, process, interaction schema, source of truth

### A52.3 DCE - Harmony Interaction Schema Source
- **Description:** The canonical source text for the M3. Interaction Schema, adapted for use with Harmony-based models like GPT-OSS. This version is injected into prompts when "Demo Mode" is active.
- **Tags:** documentation, process, interaction schema, source of truth, harmony, gpt-oss

### A53. DCE - Phase 2 - Token Count and Similarity Analysis
- **Description:** Details the plan to implement token counting for raw and parsed responses, and to calculate a similarity score between AI-generated files and their workspace originals.
- **Tags:** feature plan, phase 2, token count, similarity, metrics, ui, ux

### A54. starry-night Readme
- **Description:** A copy of the readme.md file for the `@wooorm/starry-night` syntax highlighting library, providing a reference for available languages and API usage.
- **Tags:** documentation, library, syntax highlighting, starry-night

### A55. DCE - FSService Refactoring Plan
- **Description:** Outlines a strategic plan to refactor the monolithic `FSService` into smaller, more focused services to improve modularity, maintainability, and reduce token count.
- **Tags:** refactor, architecture, technical debt, services

### A56. DCE - Phase 2 - Advanced Diff Viewer Plan
- **Description:** Details the plan to enhance the integrated diff viewer with background coloring for changes and WinMerge-like navigation controls to jump between differences.
- **Tags:** feature plan, phase 2, ui, ux, diff, navigation, side-by-side

### A57. DCE - Phase 2 - Cycle Management Plan
- **Description:** Details the plan for adding critical cycle management features to the Parallel Co-Pilot panel, including deleting the current cycle and resetting the entire history.
- **Tags:** feature plan, phase 2, ui, ux, history, cycle management

### A59. DCE - Phase 2 - Debugging and State Logging
- **Description:** Documents the plan for a "Log State" button that outputs critical state information (cycle history, current inputs) to the debug channel to accelerate troubleshooting.
- **Tags:** feature plan, phase 2, ui, ux, debugging, logging, state management

### A60. DCE - Phase 2 - Cycle 0 Onboarding Experience
- **Description:** Documents the plan for a special "Cycle 0" mode to guide new users in setting up their project by generating an initial set of planning documents.
- **Tags:** feature plan, phase 2, onboarding, first-run, project setup

### A61. DCE - Phase 2 - Cycle History Management Plan
- **Description:** Outlines the plan to allow users to save and load their entire cycle history (`dce_history.json`), enabling them to manage multiple development threads or back up their work.
- **Tags:** feature plan, phase 2, history, import, export, cycle management

### A65. DCE - Universal Task Checklist
- **Description:** A universal checklist for organizing development tasks by file, focusing on complexity in terms of token count and estimated cycles for completion.
- **Tags:** process, checklist, task management, planning, workflow

### A67. DCE - PCPP View Refactoring Plan
- **Description:** A plan to refactor the large `parallel-copilot.view.tsx` into smaller, more manageable components to improve maintainability.
- **Tags:** refactor, architecture, technical debt, pcpp

### A68. DCE - PCPP Context Pane UX Plan
- **Description:** A plan to enhance the UX of the cycle context and ephemeral context text areas with features like token counts and line numbers.
- **Tags:** feature plan, ui, ux, pcpp, context

### A69. DCE - Animated UI Workflow Guide
- **Description:** A plan for a guided user workflow that uses animated UI highlighting to indicate the next logical step in the process.
- **Tags:** feature plan, ui, ux, workflow, animation, guidance

### A70. DCE - Git-Integrated Testing Workflow Plan
- **Description:** Outlines the plan for `Baseline (Commit)` and `Restore Baseline` buttons to streamline the testing of AI-generated code by leveraging Git.
- **Tags:** feature plan, workflow, git, testing, automation

### A71. Sample M0 Prompt.md
- **Description:** An example of a fully-formed `prompt.md` file generated by the Cycle 0 onboarding experience.
- **Tags:** example, cycle 0, onboarding, prompt

### A72. DCE - README for Artifacts
- **Description:** The content for the `README.md` file that is automatically created in a new project's `src/Artifacts` directory, explaining the purpose of the extension and the artifact-driven workflow.
- **Tags:** documentation, onboarding, readme, source of truth

### A73. DCE - GitService Plan
- **Description:** A plan for a dedicated backend service to encapsulate all interactions with the Git command line for features like baselining and restoring.
- **Tags:** plan, architecture, backend, git, service

### A74. DCE - Per-Input Undo-Redo Feature Plan
- **Description:** A plan to implement a separate undo/redo history for each major text input in the PCPP to provide a more intuitive editing experience.
- **Tags:** feature plan, ui, ux, undo, redo, state management

### A75. DCE - Text Area Component A-B-C Test Plan
- **Description:** A plan to create a test harness for the `NumberedTextarea` component to diagnose and fix persistent scrolling and alignment bugs.
- **Tags:** plan, process, debugging, troubleshooting, ui, ux, react

### A76. DCE - Word Wrap Line Numbering Challenges
- **Description:** Explains the technical complexity of implementing line numbers that accurately reflect visual word wrapping in a textarea component.
- **Tags:** documentation, technical debt, ui, ux, word wrap, line numbers

### A77. DCE - Monaco Editor Replacement Plan
- **Description:** Documents the failure of the Monaco Editor integration and the new plan to switch to a lighter-weight, non-worker-based editor component.
- **Tags:** plan, refactor, ui, ux, monaco, codemirror, technical debt

### A78. DCE - VSIX Packaging and FTV Flashing Bug
- **Description:** Documents the root cause and solution for the bloated VSIX package and the persistent File Tree View flashing bug in the packaged extension.
- **Tags:** bug fix, packaging, vsix, vscodeignore, file watcher, git

### A79. DCE - Autosave and Navigation Locking Plan
- **Description:** Outlines the plan to fix the cycle data loss bug by implementing a UI-driven autosave status indicator and locking navigation controls while there are unsaved changes.
- **Tags:** bug fix, data integrity, race condition, autosave, ui, ux

### A80. DCE - Settings Panel Plan
- **Description:** A plan for a new settings panel, accessible via a help icon, to house changelogs, settings, and other informational content.
- **Tags:** feature plan, settings, ui, ux, changelog

### A81. DCE - Curator Activity Plan
- **Description:** A plan to introduce a new `<curator_activity>` section to the AI response format, allowing for explicit instructions to the human curator.
- **Tags:** documentation, process, interaction schema, workflow

### A82. DCE - Advanced Exclusion Management Plan
- **Description:** A plan for a feature allowing users to right-click files or folders and add them to a persistent exclusion list, preventing them from being automatically selected or flattened.
- **Tags:** feature plan, context menu, exclusion, ignore, ux

### A85. DCE - Model Card Management Plan
- **Description:** A plan for an enhanced settings panel where users can create and manage "model cards" to easily switch between different LLM providers and configurations.
- **Tags:** feature plan, settings, ui, ux, llm, configuration, model management

### A86. DCE - PCPP Workflow Centralization and UI Persistence Plan
- **Description:** A plan to centralize the main workflow buttons in the PCPP, make the animated workflow highlight persistent, and fix the broken cost calculation.
- **Tags:** feature plan, ui, ux, workflow, refactor, bug fix

### A87. VCPG - vLLM High-Throughput Inference Plan
- **Description:** A research and planning document analyzing the potential of using vLLM for high-throughput, low-latency inference for JANE, particularly for batched tool calling.
- **Tags:** guide, research, planning, ai, jane, llm, vllm, inference, performance

### A88. DCE - Native Diff Integration Plan
- **Description:** A plan to integrate VS Code's native diff viewer (`vscode.diff`) for comparing AI-generated file content against the current workspace file, leveraging a TextDocumentContentProvider for in-memory content.
- **Tags:** feature plan, ui, ux, diff, vscode api, virtual document

### A89. DCE - Phase 3 - Hosted LLM & vLLM Integration Plan
- **Description:** Outlines the architecture and roadmap for integrating the DCE extension with a remote, high-throughput vLLM backend via a secure proxy server.
- **Tags:** feature plan, phase 3, llm, vllm, inference, performance, architecture, proxy

### A90. AI Ascent - server.ts (Reference)
- **Description:** A reference copy of the `server.ts` file from the `aiascent.game` project, used as a baseline for implementing the DCE LLM proxy.
- **Tags:** reference, source code, backend, nodejs, express

### A91. AI Ascent - Caddyfile (Reference)
- **Description:** A reference copy of the `Caddyfile` from the `aiascent.game` project, used for configuring the web server proxy.
- **Tags:** reference, configuration, caddy, proxy

### A92. DCE - vLLM Setup Guide
- **Description:** A step-by-step guide for setting up the vLLM inference server with an OpenAI-compatible API endpoint for use with the DCE.
- **Tags:** guide, setup, vllm, llm, inference, performance, openai

### A93. DCE - vLLM Encryption in Transit Guide
- **Description:** Explains the standard architectural pattern of using a reverse proxy to provide HTTPS encryption for the vLLM API endpoint.
- **Tags:** guide, security, encryption, https, proxy, caddy, vllm

### A94. DCE - Connecting to a Local LLM Guide
- **Description:** A step-by-step guide on how to configure the DCE extension to use a local LLM with an OpenAI-compatible API.
- **Tags:** guide, setup, llm, vllm, model card, configuration, local

### A95. DCE - LLM Connection Modes Plan
- **Description:** Outlines the plan for a multi-modal settings UI to allow users to switch between manual copy/paste, a pre-configured demo mode, and user-provided API URLs or Keys.
- **Tags:** feature plan, settings, ui, ux, llm, configuration, api

### A96. DCE - Harmony-Aligned Response Schema Plan
- **Description:** An analysis of the `openai_harmony` library and a proposed plan for migrating the DCE's vLLM interaction schema from XML tags to a more robust, token-based structured format.
- **Tags:** plan, architecture, interaction schema, parsing, llm, vllm, harmony

### A97. DCE - vLLM Response Progress UI Plan
- **Description:** A plan and textual mockup for a UI to display the progress of incoming vLLM responses, including progress bars and a tokens/second metric.
- **Tags:** feature plan, ui, ux, vllm, progress indicator, metrics

### A98. DCE - Harmony JSON Output Schema Plan
- **Description:** A plan to migrate the vLLM interaction schema from XML-based parsing to a structured JSON object output, leveraging the `response_format` parameter in OpenAI-compatible APIs.
- **Tags:** plan, architecture, interaction schema, parsing, llm, vllm, harmony, json

### A99. DCE - Response Regeneration Workflow Plan
- **Description:** Details the user stories and technical implementation for the "Regenerate" button in the PCPP, including logic for regenerating empty tabs, all tabs, and a new per-tab refresh feature.
- **Tags:** feature plan, ui, ux, workflow, regeneration

### A100. DCE - Model Card & Settings Refactor Plan
- **Description:** A plan to implement a user-configurable "Model Card" system in the settings panel. This includes a UI for managing different LLM configurations and a feature to query a vLLM server's `/v1/models` endpoint to auto-populate model details.
- **Tags:** feature plan, settings, ui, ux, llm, configuration, model management

### A101. DCE - Asynchronous Generation and State Persistence Plan
- **Description:** Documents the new, more robust workflow for generating responses. This involves creating a new cycle with a "generating" status first, which provides a persistent state container for the asynchronous LLM call, making the UI state recoverable on reload.
- **Tags:** plan, architecture, workflow, persistence, asynchronous, state management

### A103. DCE - Consolidated Response UI Plan
- **Description:** Details the user flow where generating responses navigates to a new cycle, and selecting any tab in that "generating" cycle displays the progress UI.
- **Tags:** feature plan, ui, ux, workflow, refactor

### A105. DCE - PCPP View Refactoring Plan for Cycle 76
- **Description:** Provides a detailed plan for refactoring the monolithic `parallel-copilot.view/view.tsx` component into smaller, more manageable sub-components to improve maintainability and reduce token count.
- **Tags:** plan, refactor, architecture, technical debt, pcpp

### A106. DCE - vLLM Performance and Quantization Guide
- **Description:** A guide explaining the performance warnings from the vLLM logs and detailing the various model quantization options available.
- **Tags:** guide, vllm, performance, quantization, llm

### A110. DCE - Response UI State Persistence and Workflow Plan
- **Description:** A plan to fix the response UI state loss by expanding the data model to include generation metrics and refactoring the UI to be driven by a per-response status.
- **Tags:** plan, bug fix, persistence, state management, ui, ux

### A111. DCE - New Regression Case Studies
- **Description:** Documents new, complex bugs and their codified solutions to prevent future regressions.
- **Tags:** bugs, regression, troubleshooting, development, best practices

### A112. DCE - Per-Cycle Connection Mode Plan
- **Description:** A plan for a dropdown in the PCPP to allow users to select a generation mode for the current cycle, overriding the global default from the settings panel.
- **Tags:** feature plan, ui, ux, llm, configuration

### A117. DCE - FAQ for aiascent.dev Knowledge Base
- **Description:** A comprehensive, consolidated Frequently Asked Questions (FAQ) document to serve as the primary knowledge base for the `aiascent.dev` website's RAG chatbot, Ascentia.
- **Tags:** documentation, faq, knowledge base, rag, user guide

### A200. Cycle Log
- **Description:** A log of all development cycles for historical reference and context.
- **Tags:** history, log, development process, cycles

## II. Standalone Utilities & Guides

### A149. Local LLM Integration Plan
- **Description:** The technical plan for integrating a locally hosted LLM into the game via a secure backend proxy.
- **Tags:** llm, integration, plan, backend, api

### A189. Number Formatting Reference Guide
- **Description:** A standalone guide and utility script for formatting large numbers with K/M/B/T suffixes and dynamic decimal place adjustment for clean UI presentation.
- **Tags:** utility, script, formatting, numbers, ui, ux, javascript, typescript

## III. Cycle 0 Static Content Templates

### T1. Template - Master Artifact List
- **Description:** A generic template for a Master Artifact List, to be used as static context in the Cycle 0 prompt.
- **Tags:** template, cycle 0, documentation, project setup

### T2. Template - Project Vision and Goals
- **Description:** A generic template for a Project Vision and Goals document.
- **Tags:** template, cycle 0, documentation, project setup

### T3. Template - Phase 1 Requirements & Design
- **Description:** A generic template for a requirements and design document.
- **Tags:** template, cycle 0, documentation, project setup

### T4. Template - Technical Scaffolding Plan
- **Description:** A generic template for a technical scaffolding plan.
- **Tags:** template, cycle 0, documentation, project setup

### T5. Template - Target File Structure
- **Description:** A generic template for a target file structure document.
- **Tags:** template, cycle 0, documentation, project setup

### T6. Template - Initial Scaffolding Deployment Script (DEPRECATED)
- **Description:** (Deprecated) A generic template for a scaffolding deployment script. This is obsolete.
- **Tags:** template, cycle 0, documentation, project setup, deprecated

### T7. Template - Development and Testing Guide
- **Description:** A generic template for a development and testing guide.
- **Tags:** template, cycle 0, documentation, project setup

### T8. Template - Regression Case Studies
- **Description:** A generic template for a regression case studies document, promoting development best practices.
- **Tags:** template, cycle 0, documentation, project setup

### T9. Template - Logging and Debugging Guide
- **Description:** A generic template for a logging and debugging guide.
- **Tags:** template, cycle 0, documentation, project setup

### T10. Template - Feature Plan Example
- **Description:** A generic template for a feature plan, using a right-click context menu as an example.
- **Tags:** template, cycle 0, documentation, project setup

### T11. Template - Implementation Roadmap
- **Description:** A generic template for an implementation roadmap document, guiding the development process.
- **Tags:** template, cycle 0, documentation, project setup, roadmap

### T12. Template - Competitive Analysis
- **Description:** A generic template for a competitive analysis document, used for feature ideation.
- **Tags:** template, cycle 0, documentation, project setup, research

### T13. Template - Refactoring Plan
- **Description:** A generic template for a refactoring plan, guiding users to consider constraints like token count.
- **Tags:** template, cycle 0, documentation, project setup, refactor

### T14. Template - GitHub Repository Setup Guide
- **Description:** A generic template for a guide on setting up a new project with Git and GitHub.
- **Tags:** template, cycle 0, git, github, version control

### T15. Template - A-B-C Testing Strategy for UI Bugs
- **Description:** A generic template for a guide on using the A-B-C testing pattern to diagnose UI bugs.
- **Tags:** template, cycle 0, process, debugging, troubleshooting

### T16. Template - Developer Environment Setup Guide
- **Description:** A generic template for a guide on setting up a new project's development environment, including OS, tools, and installation steps.
- **Tags:** template, cycle 0, documentation, project setup, environment

### T17. Template - Universal Task Checklist
- **Description:** A generic template for a universal task checklist, designed to organize work by file and complexity.
- **Tags:** template, process, checklist, task management, planning
</file_artifact>

<file path="src/Artifacts/A1. DCE - Project Vision and Goals.md">
# Artifact A1: DCE - Project Vision and Goals
# Date Created: Cycle 1
# Author: AI Model
# Updated on: C87 (Shifted Diff Tool to Phase 2, defined Phase 3 as LLM Integration)

## 1. Project Vision

The vision of the Data Curation Environment (DCE) is to create a seamless, integrated toolset within VS Code that streamlines the workflow of interacting with large language models. The core problem this project solves is the manual, cumbersome process of selecting, packaging, and managing the context (code files, documents, etc.) required for effective AI-assisted development.

## 2. High-Level Goals & Phases

The project will be developed in three distinct phases.

**Note on Reference Repository:** The discovery of the `The-Creator-AI-main` repository in Cycle 2 has provided a significant head-start, especially for Phase 1 and 2. The project's focus shifts from building these components from the ground up to adapting and extending the powerful, existing foundation.

### Phase 1: The Context Chooser

The goal of this phase is to eliminate the manual management of a `files_list.txt`. Users should be able to intuitively select files and folders for their AI context directly within the VS Code file explorer UI.

-   **Core Functionality:** Implement a file explorer view with checkboxes for every file and folder.
-   **Action:** A "Flatten Context" button will take all checked items and generate a single `flattened_repo.md` file in the project root.
-   **Outcome:** A user can curate a complex context with simple mouse clicks, completely removing the need to edit a text file.
-   **Status:** Largely complete.

### Phase 2: The Parallel Co-Pilot Panel & Integrated Diff Tool

This phase addresses the limitation of being locked into a single conversation with an AI assistant and brings the critical "diffing" workflow directly into the extension. The goal is to enable multiple, parallel interactions and to create a navigable record of the AI-driven development process.

-   **Core Functionality (Parallel Co-Pilot):** Create a custom panel within VS Code that hosts a multi-tabbed text editor. Users can manually paste or have the extension ingest different AI-generated code responses into each tab for side-by-side comparison.
-   **Key Feature ("Swap & Test"):** A button on each tab allows the user to "swap" the content of that tab with the corresponding source file in their workspace. This provides an immediate, low-friction way to test a given AI response.
-   **Core Functionality (Integrated Diff):** The panel will include a built-in diff viewer to compare the content of any two tabs, or a tab and the source file. This eliminates the need for external tools like WinMerge.
-   **Core Functionality (Cycle Navigator):** Integrate a UI element to navigate back and forth between development cycles. Each cycle will be associated with the set of AI responses generated during that cycle.
-   **Outcome:** A user can efficiently manage, compare, and test multiple AI solutions, and also review the historical evolution of the code by navigating through past cycles and their corresponding AI suggestions, creating a powerful "knowledge graph" of the project's development.

### Phase 3: Advanced AI & Local LLM Integration

This phase focuses on deeper integration with AI services and providing support for local models.

-   **Core Functionality:** Implement direct API calls to various LLM providers (e.g., Gemini, OpenAI, Anthropic) from within the Parallel Co-Pilot panel, populating the tabs automatically. This requires building a secure API key management system.
-   **Local LLM Support:** Allow users to configure an endpoint URL for a locally hosted LLM (e.g., via LM Studio, Ollama), enabling fully offline and private AI-assisted development.
-   **Outcome:** The DCE becomes a fully-featured AI interaction environment, supporting both cloud and local models, and automating the entire prompt-to-test workflow.
</file_artifact>

<file path="src/Artifacts/A2. DCE - Phase 1 - Context Chooser - Requirements & Design.md">
# Artifact A2: DCE - Phase 1 - Context Chooser - Requirements & Design
# Date Created: Cycle 1
# Author: AI Model
# Updated on: C46 (Remove requirement for ignoring binary files, per A29)

## 1. Overview

This document outlines the requirements for Phase 1 of the Data Curation Environment (DCE) project. The primary goal of this phase is to replace the manual, error-prone process of managing context via a `files_list.txt` with an intuitive, UI-driven approach within VS Code.

**Major Update (Cycle 2):** The analysis of the `The-Creator-AI-main` repository revealed an existing, highly-functional file tree component (`src/client/components/file-tree/FileTree.tsx`) with checkbox selection. The project requirements have been updated to reflect a shift from *building* this component from scratch to *analyzing, adapting, and integrating* the existing solution.

## 2. Functional Requirements

| ID | Requirement | User Story | Acceptance Criteria | Update (Cycle 2) |
|---|---|---|---|---|
| FR-01 | **Analyze Existing File Tree** | As a developer, I want to understand the capabilities of the `FileTree.tsx` component | - Analyze the component's props and state. <br> - Document its dependencies on other frontend components and backend services (`FSService`). <br> - Determine how checkbox state is managed and communicated. | **New** |
| FR-02 | **Display File Tree in View** | As a user, I want to see a tree of all files and folders in my workspace within a dedicated VS Code view. | - The view should accurately reflect the workspace's file system structure. <br> - It should respect `.gitignore` rules to hide irrelevant files. | **Adaptation.** The `FileTree.tsx` component and `FSService` already provide this. We need to ensure it's correctly instantiated in our extension's view. |
| FR-03 | **Checkbox Selection** | As a user, I want to select and deselect files and folders for my context using checkboxes. | - Every file and folder in the tree has a checkbox. <br> - Checking a folder checks all its children. <br> - Unchecking a folder unchecks all its children. <br> - A folder shows an "indeterminate" state if only some of its children are checked. | **Adaptation.** The reference component appears to support this logic. We must verify and adapt its state management (`selectedFiles` array). |
| FR-04 | **Flatten Selected Context** | As a user, I want a single button to package all my selected files into one context file. | - A "Flatten Context" button is present in the view. <br> - Clicking it triggers a process that reads the content of all checked files. <br> - The contents are concatenated into a single `flattened_repo.md` file in the project root. | **Implementation.** The logic for this will need to be implemented, using the state from the `FileTree` component as input for our enhanced `bootstrap-flattener.js` logic. |
| FR-05 | **Handle Binary Files** | As a user, I want to be able to select binary/image files to include their metadata in the context, without including their raw content. | - All files, including binary and image files, are selectable via their checkbox. <br> - When a binary/image file is selected and flattened, only its metadata (path, size, type) is included in `flattened_repo.md`. <br> - See `A29` for the full strategy. | **Revised (C46)** |
</file_artifact>

<file path="src/Artifacts/A3. DCE - Technical Scaffolding Plan.md">
# Artifact A3: DCE - Technical Scaffolding Plan
# Date Created: Cycle 1
# Author: AI Model
# Updated on: Cycle 2 (Adopted architecture from `The-Creator-AI-main` repository)

## 1. Overview

This document outlines the technical scaffolding and file structure for the Data Curation Environment (DCE) VS Code extension.

**Major Update (Cycle 2):** The initial plan for a simple file structure has been superseded. We are officially adopting the mature and robust architecture of the `The-Creator-AI-main` reference repository as our project's blueprint. This provides a proven, scalable foundation for all three project phases.

## 2. Adopted File Structure

The project will adhere to the following directory structure, derived directly from the reference repository:

```
.
├── public/                     # Static assets for webviews (icons, css)
├── src/
│   ├── backend/                # Extension Host code (Node.js environment)
│   │   ├── commands/           # Command definitions and registration
│   │   ├── repositories/       # Data persistence logic (workspace state)
│   │   ├── services/           # Core backend services (LLM, FS, Git, etc.)
│   │   ├── types/              # TypeScript types for the backend
│   │   └── utils/              # Utility functions for the backend
│   │
│   ├── client/                 # Webview code (Browser environment)
│   │   ├── components/         # Generic, reusable React components (FileTree, Modal)
│   │   ├── modules/            # Feature-specific modules (Context, Plan)
│   │   ├── store/              # Global state management for webviews (RxJS)
│   │   └── views/              # Entry points for each webview panel
│   │
│   ├── common/                 # Code shared between backend and client
│   │   ├── constants/
│   │   ├── ipc/                # IPC channel definitions and managers
│   │   ├── types/              # Shared TypeScript types (FileNode)
│   │   └── utils/              # Shared utility functions (parse-json)
│   │
│   └── extension.ts            # Main entry point for the VS Code extension
│
├── package.json                # Extension manifest, dependencies, and scripts
├── tsconfig.json               # TypeScript configuration
├── webpack.config.js           # Webpack configuration for bundling client/server code
└── ... (config files like .eslintrc.json, .gitignore)
```

## 3. Key Architectural Concepts

-   **Separation of Concerns:** The structure strictly separates backend (Node.js) logic from frontend (React/webview) logic.
-   **Shared Code:** The `src/common/` directory is critical for sharing types and IPC definitions, ensuring type safety and consistency between the extension host and the webview.
-   **Service-Oriented Backend:** The `src/backend/services/` directory promotes modularity. Each service has a single responsibility (e.g., `FSService` for file operations, `LlmService` for AI interaction), making the system easier to maintain and test.
-   **Dependency Injection:** The `Services.ts` class acts as a simple injector, managing the instantiation and provision of backend services.
-   **Modular Frontend:** The `src/client/modules/` directory allows for building complex UIs by composing smaller, feature-focused modules.
-   **Component-Based UI:** The `src/client/components/` directory holds the fundamental building blocks of the UI, promoting reusability.
-   **Typed IPC Communication:** The use of `channels.enum.ts` and `channels.type.ts` in `src/common/ipc/` provides a strongly-typed and well-documented contract for communication between the webview and the extension host, reducing runtime errors.
</file_artifact>

<file path="src/Artifacts/A5. DCE - Target File Structure.md">
# Artifact A5: DCE - Target File Structure
# Date Created: Cycle 3
# Author: AI Model

- **Description:** A text-based representation of the target file structure for the DCE extension, outlining the layout of directories and key files.
- **Tags:** file structure, architecture, project layout, scaffolding

## 1. Overview

This document provides a visual representation of the file structure that the `A6. DCE - Initial Scaffolding Deployment Script` will create. It is based on the robust and scalable architecture of the `The-Creator-AI-main` reference repository, as detailed in `A3. DCE - Technical Scaffolding Plan`.

## 2. File Tree

```
DCE/
├── .gitignore
├── .vscodeignore
├── package.json
├── tsconfig.json
├── webpack.config.js
├── public/
│   └── spiral.svg
└── src/
    ├── backend/
    │   ├── commands/
    │   │   ├── commands.ts
    │   │   └── register-commands.ts
    │   ├── repositories/
    │   │   └── persistent-store.repository.ts
    │   ├── services/
    │   │   ├── fs.service.ts
    │   │   ├── services.ts
    │   │   └── flattener.service.ts
    │   └── types/
    │       └── storage-keys.enum.ts
    │
    ├── client/
    │   ├── components/
    │   │   └── file-tree/
    │   │       ├── FileTree.tsx
    │   │       └── FileTree.utils.ts
    │   ├── views/
    │   │   ├── context-chooser.view/
    │   │   │   ├── index.ts
    │   │   │   ├── on-message.ts
    │   │   │   ├── view.scss
    │   │   │   └── view.tsx
    │   │   └── index.ts
    │   └── store/
    │       ├── store.ts
    │       └── useStore.ts
    │
    ├── common/
    │   ├── ipc/
    │   │   ├── channels.enum.ts
    │   │   ├── channels.type.ts
    │   │   ├── client-ipc.ts
    │   │   ├── get-vscode-api.ts
    │   │   └── server-ipc.ts
    │   ├── types/
    │   │   ├── file-node.ts
    │   │   └── vscode-webview.d.ts
    │   └── utils/
    │       └── view-html.ts
    │
    └── extension.ts
```
</file_artifact>

<file path="src/Artifacts/A7. DCE - Development and Testing Guide.md">
# Artifact A7: DCE - Development and Testing Guide
# Date Created: Cycle 7
# Author: AI Model
# Updated on: Cycle 9 (Revised workflow to use integrated debugger configuration)

- **Description:** A step-by-step guide explaining how to run, debug, and test the DCE extension within VS Code using the Extension Development Host.
- **Tags:** development, testing, debugging, workflow, vs code extension, f5, launch.json

## 1. Purpose

This guide provides the correct and simplified procedure for running and testing the Data Curation Environment (DCE) extension locally. Following these steps is crucial to see your changes and the extension's UI in action.

## 2. The Core Concept: The Extension Development Host

You cannot see the extension's UI (like the spiral icon or the custom panel) in the same VS Code window where you are writing the code. Instead, you must launch a special, separate VS Code window called the **Extension Development Host**. This new window has your extension installed and running, allowing you to test it as a user would.

Our project now includes the necessary `.vscode/launch.json` and `.vscode/tasks.json` files to make this process seamless.

## 3. Step-by-Step Workflow

Follow these steps every time you want to test the extension:

### Step 1: Open the "Run and Debug" View

In your main project window (e.g., `C:\Projects\DCE`), navigate to the "Run and Debug" panel in the activity bar on the left. The icon looks like a play button with a bug on it.

### Step 2: Launch the Extension

At the top of the "Run and Debug" panel, you will see a dropdown menu. It should already have **"Run Extension"** selected.

Simply press the **F5** key or click the green play button next to the "Run Extension" dropdown.

This single action will now:
1.  Automatically start the `npm run watch` task in the background to compile your code.
2.  Launch the new **"[Extension Development Host]"** VS Code window.

### Step 3: Find the Extension UI

In the newly opened **Extension Development Host** window, look at the activity bar on the far left. You should now see our spiral icon. Clicking this icon will open the "Context Chooser" panel, where you'll see the file tree with checkboxes.

### Step 4: Making and Viewing Changes

1.  **Make Code Changes:** Edit the source code in your **original** project window.
2.  **Auto-Compile:** When you save a file, the `npm run watch` task (which was started automatically) will recompile it. You can see its progress in the terminal panel of your original window.
3.  **Reload the Host:** To see your changes, go to the **Extension Development Host** window (the one you launched with F5) and reload it. The easiest way is to open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and run the command **`Developer: Reload Window`**.

You only need to stop the debugger (Shift+F5) and restart it (F5) if you make changes to configuration files like `package.json`. For all other code changes, simply reloading the host window is sufficient and much faster.
</file_artifact>

<file path="src/Artifacts/A8. DCE - Phase 1 - Selection Sets Feature Plan.md">
# Artifact A8: DCE - Phase 1 - Selection Sets Feature Plan
# Date Created: Cycle 11
# Author: AI Model
# Updated on: C23 (Add requirement for selection persistence)

- **Key/Value for A0:**
- **Description:** A plan outlining the user stories, UI/UX, and technical implementation for saving, loading, and persisting different sets of selected files (selection profiles).
- **Tags:** feature plan, selection sets, profiles, context management, persistence, phase 1

## 1. Overview & Goal

The goal of the "Selection Sets" feature is to address the user feedback regarding the need to save and switch between different file selections, and to ensure the current selection is not lost during a session. Users often work on multiple tasks or projects concurrently, each requiring a different context. Manually re-selecting files is tedious and losing the current selection when switching tabs is a critical usability flaw. This feature will allow users to save a named "set" of their current selections, quickly load it back later, and have their current selection state persist automatically.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| US-01 | **Selection Persistence** | As a user, I expect my current selection of checked files to remain active when I switch to another VS Code tab and then return, so my work is not lost. | - The current array of selected file paths is automatically saved to the webview's persistent state whenever it changes. <br> - When the webview is re-activated (e.g., tab is clicked), it restores the last saved selection state. |
| US-02 | **Save Current Selection** | As a developer, I want to save my currently checked files as a named set, so I don't have to re-select them manually when I switch tasks. | - A UI element (e.g., button or menu item) exists to "Save current selection". <br> - Clicking it prompts me to enter a name for the selection set. <br> - After providing a name, the current list of selected file paths is saved. <br> - I receive a confirmation that the set was saved. |
| US-03 | **Load a Saved Selection** | As a developer, I want to load a previously saved selection set, so I can quickly restore a specific context. | - A UI element (e.g., a dropdown menu) lists all saved selection sets by name. <br> - Selecting a set from the list immediately updates the file tree, checking all the files and folders from that set. <br> - Any previously checked files that are not part of the loaded set become unchecked. |
| US-04 | **Delete a Saved Selection** | As a developer, I want to delete a selection set that I no longer need, so I can keep my list of saved sets clean. | - A UI element exists to manage or delete saved sets. <br> - I can select a set to delete from a list. <br> - I am asked to confirm the deletion. <br> - Upon confirmation, the set is removed from the list of saved sets. |

## 3. Proposed UI/UX

The functionality will be consolidated into the `view-header` of our Context Chooser panel for easy access.

1.  **Header Controls:**
    *   A dropdown menu and/or a set of dedicated toolbar buttons for managing selection sets.
    *   Example: A "Save" icon button and a "Load" icon button.
    *   Clicking "Save" would trigger the save workflow.
    *   Clicking "Load" would open a Quick Pick menu of saved sets.

2.  **Saving a Set:**
    *   Clicking the "Save" button will execute the `dce.saveSelectionSet` command.
    *   This command will trigger a VS Code input box (`vscode.window.showInputBox`).
    *   The user will enter a name (e.g., "API Feature", "Frontend Refactor").
    *   On submission, the backend saves the current `selectedFiles` array under that name.

3.  **Loading a Set:**
    *   Clicking the "Load" button will execute the `dce.loadSelectionSet` command.
    *   This command shows a Quick Pick list (`vscode.window.showQuickPick`) of all saved sets.
    *   Selecting a set triggers an IPC message (`ApplySelectionSet`) to the frontend with the array of file paths for that set.
    *   The frontend updates its `selectedFiles` state, causing the tree to re-render with the new selections.

## 4. Technical Implementation Plan

1.  **State Persistence (`view.tsx`):**
    *   Define a state type in `vscode-webview.d.ts`: `interface ViewState { selectedFiles: string[] }`.
    *   In the main `App` component in `view.tsx`, use a `useEffect` hook that triggers whenever the `selectedFiles` state changes. Inside this effect, call `vscode.setState({ selectedFiles })`.
    *   On initial component mount, retrieve the persisted state using `const savedState = vscode.getState();` and if it exists, use it to initialize the `selectedFiles` state: `useState<string[]>(savedState?.selectedFiles || [])`.

2.  **Data Storage (`selection.service.ts`):**
    *   Selection sets will continue to be stored in the VS Code `workspaceState`. This is a key-value store specific to the current workspace.
    *   A single key, e.g., `dce.selectionSets`, will hold an object where keys are the set names and values are the `string[]` of absolute file paths.

3.  **IPC Channels & Commands (`commands.ts`):**
    *   The existing commands (`dce.saveSelectionSet`, `dce.loadSelectionSet`, `dce.deleteSelectionSet`) are suitable.
    *   The backend `loadSelectionSet` command will trigger the `ApplySelectionSet` IPC message to the client with the file paths.

4.  **Frontend Logic (`view.tsx`):**
    *   Add state to store the map of selection sets: `const [selectionSets, setSelectionSets] = useState({});`
    *   On mount, request the list of sets from the backend to populate any UI elements.
    *   Implement an effect to listen for `ApplySelectionSet` and call `setSelectedFiles()` with the new paths.
    *   Render the new "Save" and "Load" buttons in the header toolbar.
    *   The `onClick` handler for the "Save" button will trigger an IPC message that executes the `dce.saveSelectionSet` command, passing the current `selectedFiles` state.
</file_artifact>

<file path="src/Artifacts/A9. DCE - GitHub Repository Setup Guide.md">
# Artifact A9: DCE - GitHub Repository Setup Guide
# Date Created: Cycle 12
# Author: AI Model
# Updated on: C160 (Add sample workflow with `git restore`)

- **Description:** A step-by-step guide with the necessary git commands to initialize the project as a local repository and push it to a new remote repository on GitHub, including a sample workflow for testing AI responses.
- **Tags:** git, github, version control, setup, repository, workflow

## 1. Overview

This guide provides the necessary commands to turn your local project folder into a Git repository and link it to a new, empty repository on GitHub. It also describes a sample workflow for using Git to efficiently test multiple AI-generated responses.

## 2. Prerequisites

*   You have `git` installed on your machine.
*   You have a GitHub account.

## 3. Step-by-Step Setup

### Step 1: Create a New Repository on GitHub

1.  Go to [github.com](https://github.com) and log in.
2.  In the top-right corner, click the `+` icon and select **"New repository"**.
3.  **Repository name:** A good name would be `data-curation-environment` or `vscode-dce-extension`.
4.  **Description:** (Optional) "A VS Code extension for curating context for Large Language Models."
5.  Choose **"Private"** or **"Public"** based on your preference.
6.  **IMPORTANT:** Do **not** initialize the repository with a `README`, `.gitignore`, or `license`. We will be pushing our existing files, and this will prevent conflicts.
7.  Click **"Create repository"**.

GitHub will now show you a page with several command-line instructions. We will use the section titled **"...or push an existing repository from the command line"**.

### Step 2: Initialize Git in Your Local Project

Open a terminal (like the one integrated into VS Code) and navigate to your project's root directory (e.g., `C:\Projects\DCE`). Then, run the following commands one by one.

1.  **Initialize the repository:** This creates a new `.git` subdirectory in your project folder.
    ```bash
    git init
    ```

2.  **Add all existing files to the staging area:** The `.` adds all files in the current directory and subdirectories.
    ```bash
    git add .
    ```

3.  **Create the first commit:** This saves the staged files to the repository's history.
    ```bash
    git commit -m "Initial commit"
    ```

4.  **Rename the default branch to `main`:** This is the modern standard, replacing the older `master`.
    ```bash
    git branch -M main
    ```

### Step 3: Link and Push to GitHub

Now, you will link your local repository to the empty one you created on GitHub.

1.  **Add the remote repository:** Replace the URL with the one from your GitHub repository page. It should look like the example below.
    ```bash
    git remote add origin https://github.com/dgerabagi/data-curation-environment.git
    ```

2.  **Push your local `main` branch to GitHub:** The `-u` flag sets the upstream remote so that in the future, you can simply run `git push`.
    ```bash
    git push -u origin main
    ```

After these commands complete, refresh your GitHub repository page. You should see all of your project files. You have successfully created and linked your repository.

## 4. Sample Workflow for Testing AI Responses

Once your project is set up with Git, you can leverage it to create a powerful and non-destructive testing workflow with the DCE.

1.  **Start with a Clean State:** Make sure your working directory is clean. You can check this with `git status`. If you have any uncommitted changes, either commit them or stash them.
2.  **Generate Responses:** Use the DCE to generate a `prompt.md` file and get several responses from your AI. Paste these into the Parallel Co-Pilot Panel and parse them.
3.  **Accept a Response:** Choose the response you want to test (e.g., "Resp 1"). Select its files in the "Associated Files" list and click "Accept Selected Files". This will overwrite the files in your workspace.
4.  **Test the Changes:** Run your project's build process (`npm run watch`), check for errors, and test the functionality in the VS Code Extension Development Host.
5.  **Revert and Test the Next One:**
    *   If you're not satisfied with the changes from "Resp 1," you can instantly and safely revert all the changes by running a single command in your terminal:
        ```bash
        git restore .
        ```
    *   This command discards all uncommitted changes in your working directory, restoring your files to the state of your last commit.
6.  **Repeat:** Your workspace is now clean again. You can go back to the Parallel Co-Pilot Panel, accept the files from "Resp 2," and repeat the testing process.

This workflow allows you to rapidly test multiple complex, multi-file changes from different AI responses without the risk of permanently breaking your codebase.
</file_artifact>

<file path="src/Artifacts/A10. DCE - Metadata and Statistics Display.md">
# Artifact A10: DCE - Metadata and Statistics Display
# Date Created: Cycle 14
# Author: AI Model
# Updated on: C40 (Clarify file counter label and tooltip)

- **Key/Value for A0:**
- **Description:** Outlines the requirements and design for displaying live metadata (total selected files, total tokens) and for showing aggregate statistics (token and file counts) for folders in the file tree.
- **Tags:** feature plan, metadata, statistics, token count, ui, ux

## 1. Overview & Goal

To enhance the data curation process, it is critical for the user to have immediate, quantitative feedback on their selections. This feature will provide at-a-glance statistics at both the folder level and the overall selection level. The goal is to empower the user to make informed decisions about context size and composition without needing to perform manual calculations.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| US-01 | **Folder Statistics** | As a data curator, I want to see the total token count and the total number of files contained within each folder, so I can quickly assess the size and complexity of different parts of my project. | - Next to each folder name in the file tree, a token count is displayed. <br> - This token count is the recursive sum of all tokens from all non-image files within that folder and its subfolders. <br> - Next to the token count, a file count is also displayed, formatted with commas (e.g., "1,234"). <br> - These numbers are calculated on the backend and provided with the initial file tree data. |
| US-02 | **Live Selection Summary** | As a data curator, I want to see a live summary of my total selection as I check and uncheck files, so I can monitor the total size of my context in real-time. | - A dedicated summary panel/footer is visible in the UI. <br> - This panel displays "X files" and "Y tokens". <br> - **(C40 Update)** The label for the file count is "Selected Files". The tooltip reads: "Total number of individual files selected for flattening. This does not include empty directories." <br> - "X" is the total count of all individual files included in the current selection, formatted with commas. <br> - "Y" is the sum of all token counts for those selected non-image files. <br> - These values update instantly whenever a checkbox is changed. |
| US-03 | **Readable Numbers & Icons** | As a data curator, I want large token counts to be formatted in a compact and readable way (e.g., 1,234 becomes "1.2K"), and for icons to visually represent the data, so I can easily parse the information. | - All token counts use K/M/B suffixes for numbers over 1,000. <br> - All file counts use commas for thousands separators. <br> - An icon is displayed next to the token count and file count for visual distinction. <br> - The statistics are right-justified in the file tree for better readability. |
| US-04 | **Image File Handling** | As a data curator, I want to see the file size for images instead of a token count, so I can understand their contribution to storage/transfer size rather than context length. | - The backend identifies common image file types (png, jpg, etc.). <br> - For image files, the token count is treated as 0. <br> - In the file tree, instead of a token count, the human-readable file size is displayed (e.g., "15.2 KB", "2.1 MB"). |
| US-05 | **Selected Token Count in Folders** | As a data curator, I want to see how many tokens are selected within a folder, so I can understand the composition of my selection without expanding the entire directory. | - Next to a folder's total token count, a secondary count in parentheses `(x)` appears. <br> - `x` is the recursive sum of tokens from all selected files within that folder. <br> - The display format is `TotalTokens (SelectedTokens)`, e.g., `347K (13K)`. <br> - This count only appears if selected tokens are > 0 and less than the total tokens. |
| US-06 | **Visual Cue for Selected Tokens** | As a curator, I want a clear visual indicator on the token count itself when an item is included in the selection, so I can confirm its inclusion without looking at the checkbox. | - When an individual file is checked, its token count is wrapped in parentheses, e.g., `(168)`. <br> - When a folder is checked, and *all* of its children are included in the selection, its total token count is wrapped in parentheses, e.g., `(336)`. <br> - This complements the `Total (Selected)` format for partially selected folders. |

## 3. Technical Implementation Plan

1.  **Backend (`fs.service.ts`):**
    *   The `FileNode` interface in `src/common/types/file-node.ts` will be updated to include `isImage: boolean` and `sizeInBytes: number`.
    *   The backend service will maintain a list of image file extensions.
    *   When building the tree, it will check each file's extension.
    *   If it's an image, it will use `fs.stat` to get the `sizeInBytes`, set `isImage: true`, and set `tokenCount: 0`.
    *   If it's not an image, it will calculate the `tokenCount` and get the `sizeInBytes`.
    *   The recursive sum logic for folders will aggregate `tokenCount`, `fileCount`, and `sizeInBytes` from their children.
    *   The `vscode.workspace.findFiles` call will be updated to exclude the `node_modules` directory.

2.  **Frontend - Formatting (`formatting.ts`):**
    *   A new `formatBytes(bytes)` utility will be created to convert bytes to KB, MB, etc.
    *   A new `formatNumberWithCommas(number)` utility will be created.

3.  **Frontend - File Tree (`FileTree.tsx` & `view.scss`):**
    *   The `FileTree.tsx` component will be updated to render the new data.
    *   It will conditionally display either a formatted token count (using `formatLargeNumber`) or a formatted file size (using `formatBytes`) based on the `isImage` flag.
    *   It will display folder file counts using `formatNumberWithCommas`.
    *   **Selected Token Calculation:** A new memoized, recursive function will be created within `FileTree.tsx` to calculate the selected token count for a given directory node by checking its descendants against the `selectedFiles` prop.
    *   The rendering logic will be updated to display the `(SelectedTokens)` value conditionally.
    *   **Parenthesis Logic (US-06):** The rendering logic will be further updated. For files, it will check if the file's path is in the `selectedFiles` list. For folders, it will compare the calculated `selectedTokensInDir` with the `node.tokenCount`. Based on these checks, it will conditionally wrap the output string in parentheses.
    *   It will incorporate icons from `react-icons/vsc` for tokens and file counts.
    *   The stylesheet (`view.scss`) will be updated to right-align all statistics, pushing them to the end of the file/folder row.

4.  **Frontend - Live Summary Panel (`context-chooser.view.tsx`):**
    *   The `useMemo` hook that calculates the summary will be updated to correctly sum the total number of files and total tokens from the selected items. It will continue to ignore image sizes for the token total to avoid mixing units.
    *   The rendered output will use the new formatting utilities and icons.
    *   **(C40)** The label and title attribute will be updated for clarity.
</file_artifact>

<file path="src/Artifacts/A11. DCE - Regression Case Studies.md">
# Artifact A11: DCE - Regression Case Studies
# Date Created: C16
# Author: AI Model & Curator
# Updated on: C94 (Add Onboarding Spinner race condition)

## 1. Purpose

This document serves as a living record of persistent or complex bugs that have recurred during development. By documenting the root cause analysis (RCA) and the confirmed solution for each issue, we create a "source of truth" that can be referenced to prevent the same mistakes from being reintroduced into the codebase.

## 2. Case Studies

---
old cases removed (deprecated)
</file_artifact>

<file path="src/Artifacts/A12. DCE - Logging and Debugging Guide.md">
# Artifact A12: DCE - Logging and Debugging Guide
# Date Created: Cycle 19
# Author: AI Model & Curator
# Updated on: C185 (Mandate truncated logging for large data)

- **Key/Value for A0:**
- **Description:** Explains how to access and use the integrated logging solution for debugging the extension's backend and frontend components.
- **Tags:** logging, debugging, troubleshooting, development, output channel

## 1. Purpose

This document provides instructions on how to access and use the logging features built into the Data Curation Environment (DCE) extension. Effective logging is crucial for diagnosing performance issues, tracking down bugs, and understanding the extension's behavior during development.

## 2. Two Primary Log Locations

There are two separate places to look for logs, depending on where the code is running.

### Location 1: The "Debug Console" (For `console.log`)

This is where you find logs from the **backend** (the extension's main Node.js process).

-   **What you'll see here:** `console.log()` statements from files in `src/backend/` and `src/extension.ts`. This is useful for debugging the extension's core activation and services *before* the UI is even visible.
-   **Where to find it:** In your **main development window** (the one where you press `F5`), look in the bottom panel for the **"DEBUG CONSOLE"** tab.

    ```
    -----------------------------------------------------------------------------------
    | PROBLEMS    OUTPUT    DEBUG CONSOLE    TERMINAL                                 |
    |---------------------------------------------------------------------------------|
    |                                                                                 |
    |  > Congratulations, your extension "Data Curation Environment" is now active!   |
    |  > FSService watcher initialized.                                               |
    |  ...                                                                            |
    -----------------------------------------------------------------------------------
    ```

### Location 2: The "Output" Channel (For Centralized Logging)

This is the primary, centralized log for the entire extension, including messages from the **frontend (WebView)**.

-   **What you'll see here:** Formatted log messages from both the backend (`LoggerService`) and the frontend (`logger.ts`). All messages are prefixed with a level (`[INFO]`, `[WARN]`, `[ERROR]`) and a timestamp. Frontend messages are also prefixed with `[WebView]`.
-   **Where to find it:** In the **"[Extension Development Host]" window** (the new window that opens after you press `F5`), follow these steps:
    1.  **Open the Panel:** Press `Ctrl+J` (or `Cmd+J` on Mac).
    2.  **Navigate to the "OUTPUT" Tab.**
    3.  In the dropdown menu on the right, select **`Data Curation Environment`**.

    ```
    -----------------------------------------------------------------------------------
    | PROBLEMS    OUTPUT    DEBUG CONSOLE    TERMINAL                                 |
    |---------------------------------------------------------------------------------|
    |                                                 [Data Curation Environment v]   |
    |                                                                                 |
    |  [INFO] [2:30:00 PM] Services initialized.                                      |
    |  [INFO] [2:30:01 PM] Received request for workspace files.                      |
    |  [INFO] [2:30:01 PM] [WebView] Initializing view and requesting workspace files.|
    |  [INFO] [2:30:01 PM] Scanning for files with exclusion pattern: ...             |
    |  ...                                                                            |
    -----------------------------------------------------------------------------------
    ```

## 3. Tactical Debugging with Logs (C93)

When a feature is not working as expected, especially one that involves communication between the frontend and backend, the most effective debugging technique is to add **tactical logs** at every step of the data's journey.

### Case Study: Fixing the "Associated Files" Parser (Cycle 93)

-   **Problem:** The UI was incorrectly reporting that files from a parsed AI response did not exist in the workspace.
-   **Data Flow:**
    1.  **Frontend (`view.tsx`):** User clicks "Parse All".
    2.  **Frontend (`response-parser.ts`):** Raw text is parsed into a list of relative file paths (e.g., `src/main.ts`).
    3.  **IPC (`RequestFileExistence`):** The list of relative paths is sent to the backend.
    4.  **Backend (`fs.service.ts`):** The backend receives the list and compares it against its own list of known workspace files, which are stored as absolute paths (e.g., `c:/project/src/main.ts`). The comparison fails.

## 4. Truncated Logging for Large Content (C185)

To prevent the output channel from becoming overwhelmed with large blocks of text (e.g., entire file contents or full AI responses), a logging utility has been implemented to truncate long strings.

-   **Behavior:** When a service logs a large piece of content (like a code block for syntax highlighting or the entire application state), it **must** use the `truncateCodeForLogging` utility.
-   **Format:** If a string is longer than a set threshold, it will be displayed in the logs in a format like this:
    `[First 15 lines]...// (content truncated) ...[Last 15 lines]`
-   **Benefit:** This keeps the logs clean and readable, allowing you to see that a large piece of data was processed without having its entire content flood the output. You can still see the beginning and end of the content to verify its identity.
</file_artifact>

<file path="src/Artifacts/A13. DCE - Phase 1 - Right-Click Context Menu.md">
# Artifact A13: DCE - Phase 1 - Right-Click Context Menu
# Date Created: C19
# Author: AI Model
# Updated on: C131 (Add Create File action for non-existent associated files)

- **Key/Value for A0:**
- **Description:** A plan for implementing standard file explorer context menu actions (e.g., Rename, Delete, Copy Path) in the custom file tree and other UI lists.
- **Tags:** feature plan, context menu, right-click, file operations, ux, phase 1

## 1. Overview & Goal

To enhance the user experience and make the Data Curation Environment a more complete replacement for the native VS Code explorer, this feature adds standard right-click context menus. The goal is to provide essential file and list management operations directly within our extension's view, reducing the need for users to switch contexts for common tasks.

This plan covers three distinct context menus: one for the main file tree, one for the "Selected Items" list, and one for the "Associated Files" list in the Parallel Co-Pilot Panel.

## 2. Main File Tree Context Menu

| ID | User Story | Acceptance Criteria |
|---|---|---|
| US-01 | **Copy Path** | As a user, I want to right-click a file or folder and copy its absolute or relative path to my clipboard, so I can easily reference it elsewhere. | - Right-clicking a node in the file tree opens a context menu. <br> - The menu contains "Copy Path" and "Copy Relative Path" options. <br> - Selecting an option copies the corresponding path string to the system clipboard. |
| US-02 | **Rename File/Folder** | As a user, I want to right-click a file or folder and rename it, so I can correct mistakes or refactor my project structure. | - The context menu contains a "Rename" option. <br> - Selecting it turns the file/folder name into an editable input field. <br> - Pressing Enter or clicking away saves the new name. <br> - The underlying file/folder is renamed on the file system. <br> - The file tree updates to reflect the change. |
| US-03 | **Delete File/Folder** | As a user, I want to right-click a file or folder and delete it, so I can remove unnecessary files from my project. | - The context menu contains a "Delete" option. <br> - Selecting it shows a confirmation dialog to prevent accidental deletion. <br> - Upon confirmation, the file or folder (and its contents, recursively) is moved to the trash/recycling bin. <br> - The file tree updates to reflect the change. |
| US-04 | **Reveal in OS Explorer** | As a user, I want to right-click a file or folder and have it revealed in the native OS file explorer, so I can interact with it outside of VS Code. | - The context menu contains a "Reveal in File Explorer" (or "Reveal in Finder" on macOS) option. <br> - Selecting it opens the parent directory of the item in the **operating system's default file manager** (e.g., Windows File Explorer) with the item selected. This should not simply switch to the VS Code Explorer tab. |
| US-05 | **New File/Folder** | As a user, I want to create new files and folders from the toolbar or context menu in the correct location, so I can build out my project structure without leaving the view. | - The header toolbar has "New File" and "New Folder" buttons. <br> - Clicking either prompts for a name. <br> - The new file/folder is created in the directory of the currently *active/highlighted* item in the tree. <br> - If the active item is a file, the new item is created in that file's parent directory. <br> - If no item is active, it defaults to the workspace root. <br> - The file tree automatically refreshes. |

## 3. "Selected Items" Panel Context Menu

| ID | User Story | Acceptance Criteria |
|---|---|---|
| US-06 | **Select All/Deselect All** | As a user, I want to right-click in the "Selected Items" panel to quickly select or deselect all items in the list, so I can perform batch removal operations more efficiently. | - Right-clicking anywhere within the list of selected files opens a context menu. <br> - The menu contains a "Select All" option. <br> - Clicking "Select All" highlights every item in the list, updating the "Remove selected" button count. <br> - The menu also contains a "Deselect All" option. <br> - Clicking "Deselect All" clears all selections in the list. |

## 4. "Associated Files" List Actions (C131)

| ID | User Story | Acceptance Criteria |
|---|---|---|
| US-07 | **Create Missing File** | As a developer, when an AI response refers to a file that doesn't exist, I want an easy way to create it directly from the "Associated Files" list, so I can quickly implement the AI's suggestion for a new file. | - In the "Associated Files" list, a file that does not exist is marked with an '✗'. <br> - When I hover over this item, a "Create File" button appears next to it. <br> - Clicking the button creates a new, empty file at that path in the workspace. <br> - The file tree and the "Associated Files" list automatically refresh, and the indicator changes to a '✓'. |

## 5. Technical Implementation Plan

-   **Main Tree Menu:** Implemented in `TreeView.tsx` and `ContextMenu.tsx` using an `onContextMenu` event handler and state management to control visibility and position.
-   **"Selected Items" Menu (C37):** Implemented in `SelectedFilesView.tsx` with its own context menu state and handlers for "Select All" / "Deselect All".
-   **"Create Missing File" Action (C131):**
    1.  **IPC:** Create a new `ClientToServerChannel.RequestCreateFile` channel with a payload of `{ filePath: string }`.
    2.  **Backend (`file-operation.service.ts`):** Implement `handleCreateFileRequest`. It will receive the relative path, resolve it to an absolute path, and use `vscode.workspace.fs.writeFile` with an empty `Uint8Array` to create the file. The file watcher will trigger a refresh.
    3.  **Frontend (`view.tsx`):** In the "Associated Files" list rendering logic, if a file does not exist (`!fileExistenceMap.get(file)`), render a "Create File" button. The button will be visible on hover. Its `onClick` handler will send the new IPC message.
</file_artifact>

<file path="src/Artifacts/A14. DCE - Ongoing Development Issues.md">
# Artifact A14: DCE - Ongoing Development Issues
# Date Created: C20
# Author: AI Model & Curator
# Updated on: C23 (Add issues for selection persistence and remove button)

- **Key/Value for A0:**
- **Description:** A tracking document for recurring or persistent issues that need to be monitored across development cycles until they are confirmed as resolved.
- **Tags:** bugs, tracking, issues, logging, node_modules, performance

## 1. Purpose

This artifact serves as a centralized list to track ongoing and recurring issues during the development of the Data Curation Environment (DCE) extension. This ensures that persistent problems are not forgotten and are actively monitored across cycles until a definitive solution is implemented and verified.

## 2. Active Issues

---

### Issue #5: Selection State is Not Persistent

-   **Symptom:** When the user makes selections in the "Data Curation" view, then switches to another VS Code tab and back, all selections are lost.
-   **First Reported:** Cycle 23
-   **Status (C23):** **Active.** The frontend state for `selectedFiles` is not being persisted in the VS Code `workspaceState`.
-   **Next Steps (C23):** Implement a mechanism to save the `selectedFiles` array to `workspaceState` on every change and load it when the view is initialized. This will involve both frontend (`view.tsx`) and backend (`selection.service.ts`) changes.

---

### Issue #6: "Remove selected" Button is Non-Functional

-   **Symptom:** In the "Selected Items" view, selecting one or more files and clicking the "Remove selected" button does not remove them from the list or from the main selection. It also causes the file tree in the main view to collapse.
-   **First Reported:** Cycle 23
-   **Status (C23):** **Active.** The logic in `removePathsFromSelected` or the way its result is being used to update the state is flawed. The tree collapsing indicates an improper state update is causing a major re-render.
-   **Next Steps (C23):** Debug the `removePathsFromSelected` function in `FileTree.utils.ts`. Add logging to the `onClick` handler in `SelectedFilesView.tsx` to trace the data flow. Fix the state update to prevent the side-effect of collapsing the tree.

---

### Issue #1: Logging Visibility

-   **Symptom:** The custom "Data Curation Environment" output channel is not visible in the "OUTPUT" tab's dropdown menu in the Extension Development Host window. This prevents the primary logging mechanism from being used for debugging.
-   **First Reported:** Cycle 19
-   **Status (C23):** **Resolved (C21).** The issue was caused by an early-exit error during extension activation. Adding robust `try...catch` blocks around service initializations in `extension.ts` allowed the extension to fully load, making the output channel visible.

---

### Issue #2: `node_modules` Exclusion and Performance

-   **Symptom:** The `node_modules` directory is included in file tree scans, leading to incorrect file and token counts and a significant performance delay.
-   **First Reported:** Cycle 15 (and earlier)
-   **Status (C23):** **Resolved (C20).** The `vscode.workspace.findFiles` call in `fs.service.ts` was updated with a more robust glob pattern `'{**/node_modules/**,**/dist/**,**/out/**,**/.git/**,**/flattened_repo.md}'` which now correctly excludes these directories.

---

### Issue #3: Incorrect Image Token Counting

-   **Symptom:** Image files are being assigned a token count instead of displaying their file size.
-   **First Reported:** Cycle 18
-   **Status (C23):** **Resolved (C20).** The logic in `fs.service.ts` was corrected to identify images by extension, set `tokenCount` to 0, and get their `sizeInBytes`. The frontend (`FileTree.tsx`) now uses an `isImage` flag to display the formatted byte size instead of tokens.

---

### Issue #4: File Tree Caching and Refresh Behavior

-   **Symptom:** The file tree reloaded from scratch on every tab switch and did not auto-update on file changes.
-   **First Reported:** Cycle 19
-   **Status (C23):** **Resolved (C20).** A frontend cache was implemented by changing the `useEffect` dependency array. A backend `FileSystemWatcher` was implemented in `fs.service.ts` to detect changes and push updates to the client, triggering a refresh.
</file_artifact>

<file path="src/Artifacts/A15. DCE - Phase 1 - Multi-Select & Sorting Feature Plan.md">
# Artifact A15: DCE - Phase 1 - Multi-Select & Sorting Feature Plan
# Date Created: Cycle 22
# Author: AI Model
# Updated on: C40 (Documented RCA and fix for batch removal bug)

- **Key/Value for A0:**
- **Description:** Details the requirements for multi-selection (click, Ctrl, Shift) in both the main file tree and the "Selected Items" panel, and multi-level column sorting.
- **Tags:** feature plan, multi-select, sorting, list view, ux, phase 1

## 1. Overview & Goal

To elevate the Data Curation Environment beyond basic functionality, this plan introduces advanced list-interaction features common in modern applications. The goal is to provide users with powerful and intuitive tools for managing their file selections, mirroring the behavior of native operating system file explorers. This includes robust multi-selection capabilities in both the main file tree and the "Selected Items" panel, and comprehensive sorting for the "Selected Items" list.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| US-01 | **"Selected Items" Multi-Selection** | As a curator, after selecting a large folder, I want to quickly remove a small group of unwanted files from the "Selected Items" list using standard Shift-click and Ctrl-click, so I don't have to uncheck them one by one in the main tree. | - Clicking a single item in the "Selected Items" list selects it and deselects all others. <br> - Ctrl-clicking an item toggles its selection state without affecting other items. <br> - Shift-clicking an item selects the range of items between the last-clicked anchor item and the current one. The anchor is set by the last non-Shift click. <br> - A "Remove Selected" button acts on all currently selected items in this list. |
| US-02 | **"Selected Items" Column Sorting** | As a curator, I want to sort the "Selected Items" list by file name or token count, so I can easily find specific files or identify the largest contributors to my context. | - The "Selected Items" panel has a header row with clickable "File" and "Tokens" labels. <br> - Clicking a column header sorts the list by that column. <br> - Clicking the same header again reverses the sort direction (ascending/descending). <br> - A visual indicator (e.g., an arrow) shows the current sort column and direction. <br> - The default, initial sort is by Token Count, descending. |
| US-03 | **"Selected Items" Multi-Layer Sorting** | As a curator, I want to apply a secondary sort, so I can group my selected files by type and then see the largest files within each group. | - The sorting mechanism supports at least two levels of sorting. <br> - The UI provides a way to define a primary and secondary sort key (e.g., Shift-clicking a second column header). <br> - The list first organizes by the primary key, then sorts items within those groups by the secondary key. For example, sort by Type (asc), then by Token Count (desc). |
| US-04 | **Main Tree Multi-Selection** | As a user, I want to select multiple files and folders in the main "Data Curation" file tree using standard OS conventions (Ctrl/Shift click), so I can perform context menu actions (like Delete) on multiple items at once. | - Standard multi-selection is implemented in the main file tree. <br> - This selection is a separate state from the checkbox state and is used for contextual actions, not for flattening. <br> - Right-clicking on any item within a multi-selected group opens a context menu that applies its actions to all selected items. <br> - **(Bug C31):** Ctrl-click is non-functional. Shift-click is inconsistent and difficult to use. |
| US-05 | **"As-Is" Sorting** | As a user, I want to be able to revert the "Selected Items" list to its default sort order, so I can see the files as they appear in the native VS Code explorer. | - A sort option for "Default" or "As-Is" is available. <br> - Selecting it sorts the items based on their original file system order (folders first, then files, all alphabetized). |

## 3. Technical Implementation Plan

1.  **`SelectedFilesView.tsx` Refactor:**
    *   **State Management:** Introduce new state variables to manage selection, sorting, and multi-selection.
        *   `const [selection, setSelection] = useState<Set<string>>(new Set());`
        *   `const [selectionAnchor, setSelectionAnchor] = useState<string | null>(null);` // For stable shift-click
        *   `const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }[]>([{ key: 'tokenCount', direction: 'desc' }]);`
    *   **Event Handling:** Implement a comprehensive `onClick` handler for list items that inspects `event.ctrlKey` and `event.shiftKey`. A non-modifier click will set both the `selection` and the `selectionAnchor`. A shift-click will select from the `selectionAnchor` to the current item.
    *   **Sorting Logic:** The `useMemo` hook that sorts the `selectedFileNodes` prop will be updated to handle an array of `sortConfig` objects. It will perform a stable sort, iterating through the sort criteria until a non-zero comparison result is found. A new "Type" column will be added, requiring a utility to extract the file extension.

2.  **Batch Removal Logic (`FileTree.utils.ts`):**
    *   **Root Cause of C40 Bug:** The `removePathsFromSelected` function was buggy. It iterated through the list of files to remove, calling the single-item removal utility (`addRemovePathInSelectedFiles`) on each. This created a race condition where the first removal would perform a "subtractive uncheck" (e.g., removing `src` and adding back all its other children), drastically changing the selection state that subsequent iterations of the loop were relying on.
    *   **Codified Solution (C40):** The `removePathsFromSelected` function will be rewritten to be non-iterative and set-based. It will calculate the final desired state in a single pass by determining the full set of effectively selected files, removing the unwanted files from that set, and then "compressing" the remaining set of files back into the most efficient list of parent directories and individual files. This atomic approach is more robust and avoids the state mutation bug.

3.  **`FileTree.tsx` & `TreeView.tsx` (Main Tree Multi-Select):**
    *   This is a more complex task that mirrors the `SelectedFilesView` implementation but within a recursive tree structure.
    *   A new selection state for contextual actions (`const [contextSelection, setContextSelection] = useState<Set<string>>(new Set())`) will be managed at the top level (`view.tsx`).
    *   The selection state and handler functions will need to be passed down through `FileTree` to `TreeView`.
    *   **(Fix for C31):** The `handleNodeClick` event handler in `TreeView.tsx` must be corrected. The anchor for shift-click (`lastClickedPath`) must only be updated on a click *without* the Shift key pressed. The logic for Ctrl-click must be revised to correctly toggle a path's inclusion in the selection set without clearing other selections.
    *   The `onContextMenu` handler will need to be updated to check if the right-clicked node is part of the current `contextSelection` and pass the entire selection to the backend if an action is chosen.
</file_artifact>

<file path="src/Artifacts/A16. DCE - Phase 1 - UI & UX Refinements Plan.md">
# Artifact A16: DCE - Phase 1 - UI & UX Refinements Plan
# Date Created: Cycle 22
# Author: AI Model
# Updated on: C187 (Add Associated Files animation glitch)

- **Key/Value for A0:**
- **Description:** Covers visual and usability improvements like fixing panel layouts, resolving overflow bugs, adding loading indicators, and improving scrollbar visibility.
- **Tags:** feature plan, ui, ux, layout, bug fix, loading indicator, phase 1

## 1. Overview & Goal

This document outlines a series of user interface (UI) and user experience (UX) refinements identified during playtesting. The goal is to address layout bugs, provide better visual feedback to the user, and improve the overall professional feel of the extension. These changes focus on fixing immediate usability problems and making the extension more intuitive to operate.

## 2. User Stories & Issues

| ID | User Story / Issue | Acceptance Criteria |
|---|---|---|
| UI-01 | **Header Layout Bug** | As a user, I want the header of the "Data Curation" panel to be compact, without the extra vertical space between the title and the toolbar buttons, so it looks clean and professional. | - The vertical gap between the view title row and the toolbar button row is removed. <br> - The header area takes up minimal vertical space. <br> - This is a CSS fix, likely involving adjusting `padding`, `margin`, or `gap` in the flex container. |
| UI-02 | **"Selected Items" Overflow Bug** | As a user, when I select many files, I want the "Selected Items" list to scroll within its panel instead of running off the screen behind the "Flatten Context" footer, so I can see and manage all my selections. | - The "Selected Items" panel has a defined `max-height`. <br> - When the content exceeds this height, a vertical scrollbar appears. <br> - The panel never overlaps or pushes the footer out of view. <br> - This is a CSS fix involving `flex-grow`, `flex-shrink`, `min-height: 0` on the file tree container, and `overflow-y: auto` on the list container. |
| UI-03 | **Resizable "Selected Items" Panel** | As a user, I want to be able to vertically resize the "Selected Items" panel, so I can see more or fewer items as needed for my current task. | - A draggable handle or resizer element is added to the top border of the "Selected Items" panel. <br> - Clicking and dragging this handle adjusts the `height` or `max-height` of the panel. <br> - The main file tree above it resizes accordingly to fill the remaining space. |
| UI-04 | **Visible Loading State** | As a user, when I perform a slow action like renaming a file or refreshing the explorer, I want to see a loading indicator, so I have clear feedback that the system is working and not frozen. | - A loading state (e.g., `isLoading`) is added to the main view's state. <br> - This state is set to `true` when a file system scan begins (e.g., on initial load or refresh). <br> - A loading indicator (e.g., a spinning icon) is displayed in the UI (e.g., in the header toolbar) while `isLoading` is true. <br> - The state is set to `false` when the file data is received from the backend. |
| UI-05 | **Improved Scrollbar Gutter** | As a user, I find it difficult to distinguish between the extension's internal scrollbar and the main VS Code scrollbar when they are side-by-side. I want a clearer visual separation between them. | - A subtle vertical border (`border-right`) is added to the main file tree container. <br> - This creates a persistent, visible dividing line between the two scrollable areas, making it easier to position the mouse. |
| UI-06 | **Expand All Button** | As a user, I want an "Expand All" button in the toolbar, so I can quickly see all files in the project without manually clicking every folder. | - An "Expand All" button is added to the main header toolbar. <br> - Clicking it expands every collapsed folder in the file tree. <br> - The button complements the existing "Collapse All" button. |
| UI-07 | **Associated Files Animation Glitch** | As a user, I want the animated highlight on the "Associated Files" panel to be fully visible, so the guided workflow is clear. | - The top and left edges of the pulsing blue highlight are currently slightly obscured. <br> - A small `margin` will be added to the `.collapsible-section-inner` class to provide space for the `box-shadow` to render completely. |
</file_artifact>

<file path="src/Artifacts/A17. DCE - Phase 1 - Advanced Tree View Features.md">
# Artifact A17: DCE - Phase 1 - Advanced Tree View Features
# Date Created: Cycle 22
# Author: AI Model

- **Key/Value for A0:**
- **Description:** Outlines the plan for advanced tree view interactions, specifically the implementation of scrollable, self-contained views for large, expanded folders.
- **Tags:** feature plan, tree view, ux, scrollable, phase 1

## 1. Overview & Goal

The current file tree view expands vertically, which can create a poor user experience when a folder containing hundreds of files is opened. The entire view becomes excessively long, forcing the user to scroll a great distance to see files or folders below the expanded one. The goal of this feature is to innovate on the traditional tree view by containing the contents of a large expanded folder within a scrollable, "inline" window, preventing the main view from becoming unmanageable.

## 2. User Story

| ID | User Story | Acceptance Criteria |
|---|---|---|
| TV-01 | **Contained Folder Expansion** | As a user, when I expand a folder with a large number of children, I want its contents to appear in a scrollable sub-panel within the tree instead of pushing all subsequent items down, so I can browse the folder's contents without losing my place in the main file tree. | - When a folder is expanded, the extension checks the number of direct children. <br> - If the child count exceeds a certain threshold (e.g., 50), the children are rendered inside a nested, scrollable `div`. <br> - This `div` has a fixed `max-height`. <br> - A small 'x' icon is visible within this sub-panel. Clicking it closes the sub-panel and reverts the folder to the standard, fully expanded view for that session. |

## 3. Technical Implementation Plan

This is a significant UI/UX enhancement and will require careful implementation within the React component hierarchy.

1.  **Component (`TreeView.tsx`):**
    *   The core logic will reside in the `renderTreeNodes` function.
    *   **Threshold Check:** When rendering a directory node, check `if (node.children && node.children.length > FOLDER_CONTENT_THRESHOLD)`. The threshold will be a configurable constant.
    *   **State Management:** A new state variable will be needed to track which "large" folders have been reverted to the standard view by the user clicking the 'x' button. `const [standardViewFolders, setStandardViewFolders] = useState<Set<string>>(new Set());`
    *   **Conditional Rendering:**
        *   If the folder is expanded (`isExpanded`) AND its path is **not** in `standardViewFolders` AND it exceeds the threshold, render the children inside a special container:
            ```jsx
            <div className="large-folder-container" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              <button onClick={() => setStandardViewFolders(prev => new Set(prev).add(node.absolutePath))}>X</button>
              <ul>{renderTreeNodes(node.children)}</ul>
            </div>
            ```
        *   Otherwise, render the children normally as is currently done:
            ```jsx
            <ul className="treenode-children">{renderTreeNodes(node.children)}</ul>
            ```

2.  **Styling (`view.scss`):**
    *   Create styles for `.large-folder-container`.
    *   It will need `position: relative`, a subtle `border` or `background-color` to distinguish it from the rest of the tree.
    *   The close button will need to be positioned appropriately within the container.

3.  **Performance Considerations:**
    *   This approach avoids virtualizing the entire tree, which is much more complex. It only contains the content of single, large folders.
    *   Rendering hundreds of nodes within the scrollable container might still have a minor performance impact on initial render, but it will be contained and will not affect the performance of the main tree's scrolling.
</file_artifact>

<file path="src/Artifacts/A18. DCE - Phase 1 - Active File Sync Feature Plan.md">
# Artifact A18: DCE - Phase 1 - Active File Sync Feature Plan
# Date Created: Cycle 24
# Author: AI Model
# Updated on: C44 (Add logic for suppressing auto-reveal after file operations)

- **Key/Value for A0:**
- **Description:** Details the requirements and implementation for automatically revealing and highlighting the active editor's file in the custom Data Curation file tree.
- **Tags:** feature plan, active file, sync, reveal, tree view, ux, phase 1

## 1. Overview & Goal

To create a more seamless and integrated experience, the Data Curation Environment's file tree should stay in sync with the user's focus in the main editor. Currently, selecting a file in the editor does not reflect in our custom view. The goal of this feature is to replicate the behavior of the native VS Code Explorer, where the active file is automatically revealed and highlighted in the file tree.

## 2. User Story

| ID | User Story | Acceptance Criteria |
|---|---|---|
| UX-01 | **Sync with Active Editor** | As a user, when I click on a file in the VS Code editor tabs or the native Explorer, I want the "Data Curation" file tree to automatically scroll to and highlight that file, so I can easily see its location in the project hierarchy and interact with its checkbox without manually searching for it. | - When the active text editor changes in VS Code, the new file is highlighted in the "Data Curation" tree view. <br> - All parent folders of the active file are automatically expanded to ensure it is visible. <br> - The file tree view scrolls so that the active file item is visible on the screen. |
| UX-02 | **Preserve View State** | As a user, after I perform an action that collapses the tree (e.g., "Collapse All") and then perform a file operation (e.g., drag-and-drop), I do not want the tree to automatically re-expand to reveal the active file, so my intended view state is respected. | - After a file operation (move, delete, rename, new file) triggers a refresh, the "Sync with Active Editor" feature is temporarily suppressed for the next event. <br> - This prevents the tree from re-expanding against the user's will. |

## 3. Technical Implementation Plan

1.  **Backend Listener (`extension.ts`):**
    *   Utilize the `vscode.window.onDidChangeActiveTextEditor` event listener in the `activate` function.
    *   This event provides the `TextEditor` object, from which `editor.document.uri.fsPath` can be extracted.
    *   When the event fires and an editor is present, the backend will normalize the file path (to use forward slashes) and send an IPC message to the webview containing the active file's path.

2.  **IPC Channel:**
    *   The existing `ServerToClientChannel.SetActiveFile` will be used.
    *   **(C44 Update)** The `ServerToClientChannel.ForceRefresh` channel's payload is updated from `{}` to `{ reason?: 'fileOp' | 'manual' }`.

3.  **Frontend View Logic (`TreeView.tsx`):**
    *   A `useEffect` hook in the `TreeView` component triggers whenever the `activeFile` prop changes.
    *   This effect is responsible for "revealing" the file by calculating all parent directory paths, adding them to the `expandedNodes` state, and then calling `scrollIntoView()` on the file's element ref.

4.  **Auto-Reveal Suppression Logic (C44):**
    *   **Backend (`fs.service.ts`):** The file watcher, upon detecting a change, will now send the `ForceRefresh` message with a payload: `{ reason: 'fileOp' }`.
    *   **Frontend (`view.tsx`):**
        *   A `useRef` flag (`suppressActiveFileReveal`) is used to track the suppression state.
        *   The message handler for `ForceRefresh` checks for the `fileOp` reason and sets the suppression flag to `true`, with a timeout to reset it.
        *   The message handler for `SetActiveFile` checks the flag. If `true`, it ignores the event, resets the flag, and prevents the `activeFile` state from being updated, thus preventing the reveal.

## 5. Debugging Notes & Regression Prevention

-   **Root Cause of C30 Regression:** The feature failed because of a path normalization mismatch. The `editor.document.uri.fsPath` property from the VS Code API returns paths with **backslashes (`\`)** on Windows. The frontend webview components, however, exclusively use and expect **forward slashes (`/`)** for path comparisons and manipulations.
-   **Codified Solution:** The path from the `onDidChangeActiveTextEditor` event **must** be normalized to use forward slashes *before* it is sent to the frontend via the IPC channel.
</file_artifact>

<file path="src/Artifacts/A19. DCE - Phase 1 - Double-Click & Quick-Remove Feature Plan.md">
# Artifact A19: DCE - Phase 1 - File Interaction Plan (Click & Remove)
# Date Created: Cycle 26
# Author: AI Model
# Updated on: C28 (Changed interaction model from double-click to single-click to open files)

- **Key/Value for A0:**
- **Description:** Details the requirements for opening files by single-clicking them and quickly removing single files from the selection list via a mouse-over action.
- **Tags:** feature plan, single-click, open file, quick remove, ux, phase 1

## 1. Overview & Goal

To further align the Data Curation Environment with standard, intuitive user workflows, this plan introduces two high-impact interaction enhancements. The first is the ability to **single-click** any file to open it in the main editor, mimicking the native VS Code Explorer behavior. The second is a "quick-remove" feature in the "Selected Items" panel, allowing for rapid, single-click removal of files. The goal is to reduce friction and increase the speed at which a user can curate their context.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| UX-01 | **Single-Click to Open (Main Tree)** | As a user, I want to be able to single-click on a file in the main "Data Curation" file tree and have it open in the editor, so I can quickly view its contents just like in the native Explorer. | - A single click on a file item (not a folder) in the main file tree opens that file in the main VS Code editor pane. <br> - If the file is already open in a tab, the editor switches focus to that tab. <br> - A single click on a folder still expands or collapses it. |
| UX-02 | **Single-Click to Open (Selected List)** | As a user, I want to single-click a file in the "Selected Items" list to open it, so I can easily inspect the files that are contributing the most tokens to my context. | - A single click on a file item in the "Selected Items" list opens that file in the main VS Code editor pane. <br> - If the file is already open, focus is switched to its tab. |
| UX-03 | **Quick Remove from Selection** | As a user, after selecting a large folder, I want to quickly remove a single file from the "Selected Items" list with one click, so I don't have to select it and then click the "Remove Selected" button. | - In the "Selected Items" list, when I mouse over a file row, the row number (in the `#` column) is replaced by an 'X' icon. <br> - Clicking the 'X' icon immediately removes that single file from the selection. <br> - This action is equivalent to selecting only that file and clicking "Remove Selected". <br> - The mouse leaving the row restores the row number. |

## 3. Technical Implementation Plan

1.  **IPC Channel (`channels.enum.ts`, `channels.type.ts`):**
    *   The existing `ClientToServerChannel.RequestOpenFile` is sufficient.
    *   The `ChannelBody` remains `{ path: string }`.

2.  **Backend Handler (`on-message.ts`, `fs.service.ts`):**
    *   The existing handler for `RequestOpenFile` in `fs.service.ts` is sufficient. It uses `vscode.workspace.openTextDocument` and `vscode.window.showTextDocument`.

3.  **Frontend - Single-Click (`TreeView.tsx`, `SelectedFilesView.tsx`):**
    *   In `TreeView.tsx`, the main `onClick` handler (`handleToggleNode`) will be modified. It will now check if the clicked node is a file or a directory.
        *   If it's a file, it will call `clientIpc.sendToServer(ClientToServerChannel.RequestOpenFile, ...)`.
        *   If it's a directory, it will perform the existing expand/collapse logic.
    *   In `SelectedFilesView.tsx`, the `onDoubleClick` handler will be removed and the `onClick` handler will be simplified to *only* open the file, as the multi-selection logic is handled by checking for modifier keys (`ctrlKey`, `shiftKey`).

4.  **Frontend - Quick Remove (`SelectedFilesView.tsx`, `view.scss`):**
    *   **State:** A state variable will track the hovered item's path: `const [hoveredPath, setHoveredPath] = useState<string | null>(null);`.
    *   **Event Handlers:** Add `onMouseEnter` and `onMouseLeave` to the `<li>` element to update the hover state.
    *   **Conditional Rendering:** In the JSX for the index column, render conditionally: if the row is hovered, show an 'X' icon with an `onClick` handler; otherwise, show the row number.
    *   **Styling:** Add styles for the `.quick-remove` class in `view.scss` to ensure it's clickable and has appropriate hover effects.
    *   The `onClick` handler for the 'X' icon will call the existing `onRemove` prop and use `stopPropagation` to prevent the click from also selecting the row.
</file_artifact>

<file path="src/Artifacts/A20. DCE - Phase 1 - Advanced UX & Automation Plan.md">
# Artifact A20: DCE - Phase 1 - Advanced UX & Automation Plan
# Date Created: C27
# Author: AI Model
# Updated on: C73 (Adjust token count color scheme to make red the highest risk)

- **Key/Value for A0:**
- **Description:** Details plans for several UX enhancements, including auto-revealing the flattened file, showing selected counts in folder stats, and providing an option to auto-add new files to the selection.
- **Tags:** feature plan, ux, automation, reveal, statistics, auto-add, phase 1

## 1. Overview & Goal

This document outlines a series of advanced user experience (UX) and automation features designed to further streamline the data curation workflow. The goal is to reduce manual steps, provide more insightful contextual information, and make the extension's UI more flexible and powerful.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| UXA-01 | **Auto-Reveal Flattened File** | As a user, after I click "Flatten Context," I want the newly created `flattened_repo.md` file to be automatically selected and revealed in the file tree, so I can immediately open it without searching. | - After the `flattened_repo.md` file is created or updated, it becomes the `activeFile` in the Data Curation view. <br> - The tree view automatically expands and scrolls to show the `flattened_repo.md` file. |
| UXA-02 | **Contextual Selected Count** | As a user, when I have files selected inside a folder, I want to see a count of how many files are selected within that folder, displayed next to the folder's total file count, so I can understand my selection density at a glance. | - Next to a folder's total file count, a secondary count in parentheses `(x)` appears. <br> - `x` represents the number of files within that folder (recursively) that are part of the current selection. <br> - This count only appears if `x` is greater than 0 and less than the folder's total file count. |
| UXA-03 | **Minimize Selection Panel** | As a user, once I've made my selection, I want to minimize the "Selected Items" list to reclaim vertical space while keeping the "Flatten Context" button accessible, so I can focus on the main file tree. | - A minimize/expand button is present in the "Selected Items" panel header. <br> - Clicking it collapses the list of selected files, but the panel's header, toolbar, and the main footer (with the Flatten button) remain visible. <br> - Clicking it again expands the list to its previous state. |
| UXA-04 | **Auto-Add New Files** | As a user, I want to enable an "auto-add" mode where any new file I create in the workspace is automatically added to my current selection, so I don't have to break my coding flow to manually check the new file. | - A toggle button or checkbox exists in the UI to enable/disable "Auto-Add New Files" mode. <br> - When enabled, any file created in the workspace is automatically added to the `selectedFiles` list. <br> - The file system watcher is responsible for detecting file creation and triggering this logic. <br> - The state of this toggle is persisted in the workspace state. |
| UXA-05 | **Resizable Panels** | As a user, I want to be able to click and drag the divider between the main file tree and the "Selected Items" panel to vertically resize them, so I can customize the layout to my needs. | - The horizontal divider between the two main panels is a draggable handle. <br> - Dragging it up or down resizes both panels accordingly, while respecting their minimum and maximum height constraints. |
| UXA-06 | **Token Count Color Coding** | As a user, I want the items in the "Selected Items" list to be color-coded based on their token count, so I can immediately identify potentially problematic large files. | - List items have a background color that corresponds to their token count. <br> - **(C73 Update)** The color scheme indicates increasing risk: <br> - **0-8k tokens:** Green (Low risk). <br> - **8k-10k tokens:** Yellow (Slight risk). <br> - **10k-12k tokens:** Orange (Moderate risk). <br> - **12k+ tokens:** Red (High risk). <br> - A tooltip explains the color coding and associated risk. |
| UXA-07 | **Auto-Uncheck Empty Folder** | As a user, when I remove the last selected file from a folder via the "Selected Items" panel, I want the parent folder to become unchecked in the main file tree, so the UI state remains consistent. | - When a file removal action is processed, the logic checks if any sibling files of the removed file are still selected. <br> - If no siblings remain selected under a parent folder that was previously checked, that parent folder is also removed from the selection. |


## 3. Technical Implementation Plan

-   **Auto-Reveal (UXA-01):**
    -   Create a new IPC channel `ServerToClientChannel.FocusFile`.
    -   Backend (`flattener.service.ts`): After writing the file, send the `FocusFile` message with the file's absolute path. A small delay might be needed to allow the file watcher to trigger a UI refresh first.
    -   Frontend (`view.tsx`): Listen for `FocusFile` and call `setActiveFile` with the received path. The existing `useEffect` in `TreeView.tsx` will handle the reveal.
-   **Selected Count (UXA-02):**
    -   Frontend (`FileTree.tsx`): Implement a memoized recursive function that traverses a `FileNode`'s children and checks against the `selectedFiles` list to calculate the selected count. Render this count conditionally in the `renderFileNodeContent` function. This is a frontend-only calculation.
-   **Minimize Panel (UXA-03):**
    -   Frontend (`view.tsx`): Add a new state, `isSelectionListMinimized`.
    -   Frontend (`SelectedFilesView.tsx`): Add a button to the header that calls a prop function to toggle this state. Conditionally render the `<ul>` based on the state.
-   **Auto-Add Files (UXA-04):**
    -   Frontend (`view.tsx`): Add a toggle button and a state for this mode. When toggled, send an IPC message to the backend to update its persisted state.
    -   Backend (`selection.service.ts`): Store the toggle's state in `workspaceState`.
    -   Backend (`fs.service.ts`): The `onDidCreate` handler in the file watcher will check this state. If true, it will get the current selection, add the new file's path, and save it back using `selection.service.ts` before triggering the UI refresh.
-   **Token Count Coloring (UXA-06):**
    -   Frontend (`SelectedFilesView.tsx`): Create a helper function `getTokenBackgroundColor(tokenCount)` that returns an HSL color string based on the specified token ranges.
    -   Apply the returned color to the `<li>` element's `style` prop.
    -   Add a `title` attribute to the `<li>` to explain the risk associated with the token count.
-   **Auto-Uncheck Folder (UXA-07):**
    -   Frontend (`FileTree.utils.ts`): The `removePathsFromSelected` function will be enhanced. After calculating the new effective selection set, it will need to perform a check. For each removed path, it can traverse up the tree to find its parent directories. For each parent, it can check if any of its other children are still in the effective selection set. If not, the parent should not be included in the final compressed path list. This is complex and requires careful state calculation.
</file_artifact>

<file path="src/Artifacts/A21. DCE - Phase 1 - Feature Drift Analysis vs. VS Code Explorer.md">
# Artifact A21: DCE - Phase 1 - Feature Drift Analysis vs. VS Code Explorer
# Date Created: C28
# Author: AI Model
# Updated on: C39 (Update Keyboard Nav status to Complete)

- **Key/Value for A0:**
- **Description:** A comparative analysis documenting the functional and behavioral differences between the DCE custom file view and the native VS Code Explorer to guide future development and feature parity.
- **Tags:** feature plan, analysis, drift, ux, vs code explorer, parity

## 1. Overview & Goal

The primary goal of the Data Curation Environment (DCE) is to enhance, not replace, the core developer workflow. To minimize friction and maximize adoption, its custom file view must achieve a high degree of feature parity with the native VS Code Explorer. This document analyzes the "drift," or the set of features present in the native Explorer that are currently missing from the DCE view. This analysis will serve as a backlog and prioritization guide for future development cycles.

## 2. Feature Comparison Matrix

| Feature Category            | Native VS Code Explorer         | DCE (as of C39)        | Status & Notes                                                                                                                                              |
| --------------------------- | ------------------------------- | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **File Display**            |                                 |                        |                                                                                                                                                             |
| Hierarchical Tree           | ✅                              | ✅                     | **Complete.** Core functionality is present.                                                                                                                |
| File/Folder Icons           | ✅                              | ✅                     | **Complete.** Icons match file types.                                                                                                                       |
| Active File Highlighting    | ✅                              | ✅                     | **Complete.**                                                                                                                                               |
| Problems/Git Status         | ✅ (Colors, badges)             | ✅                     | **Complete.** Displays Git status colors/badges and problem indicators.                                                                                     |
| **Selection**               |                                 |                        |                                                                                                                                                             |
| Single-Click (Files)        | ✅ Opens file                   | ✅ Opens & Selects file| **Complete.** Aligns with native behavior.                                                                                                                  |
| Single-Click (Folders)      | ✅ Expands/Collapses            | ✅ Expands/Collapses   | **Complete.** |
| Multi-Select (Ctrl)         | ✅                              | ✅                     | **Complete.**                                                                                                                                               |
| Multi-Select (Shift)        | ✅ (Selects rows)               | ✅ (Selects rows)      | **Complete.**                                                                                                                                               |
| Select All (Ctrl+A)         | ✅ (In focused list)            | ✅                     | **Complete.** The focus-stealing bug is now resolved, making `Ctrl+A` in the "Selected Items" list reliable.                                           |
| **Interaction**             |                                 |                        |                                                                                                                                                             |
| Drag and Drop               | ✅ (Move files/folders)         | ✅                     | **Complete.**                                                                                                                                               |
| Right-Click Context Menu    | ✅ (Extensive options)          | ✅ (Basic + List actions) | **Partial.** DCE has basic file ops. Added "Select All" for lists in C37. Missing advanced options like `Open in Integrated Terminal`, `Compare...`.       |
| Keyboard Navigation         | ✅ (Arrows, Enter, Space)       | ✅                     | **Complete (C39).** Arrow keys, Enter, and Spacebar now function as expected. The focus-stealing bug has been resolved.                                   |
| Inline Rename               | ✅ (F2 or slow double-click)    | ✅                     | **Complete.** |
| **File Operations**         |                                 |                        |                                                                                                                                                             |
| New File / Folder           | ✅                              | ✅                     | **Complete.** |
| Delete (to Trash)           | ✅                              | ✅                     | **Complete.** |
| Cut / Copy / Paste          | ✅                              | ❌                     | **Missing.** Standard file system operations are not yet implemented.                                                                                       |
| Undo / Redo (Ctrl+Z)        | ✅                              | ❌                     | **Missing.** A critical feature for parity. Requires an action stack to reverse moves/deletes. Planned in A27.                                            |
| **Search & Filter**         |                                 |                        |                                                                                                                                                             |
| Filter by Name              | ✅ (Start typing)               | ✅                     | **Complete.**                                                                                                                                               |

## 3. High-Priority Features for Future Cycles

Based on the analysis, the following features represent the most significant gaps in user experience and should be prioritized:

1.  **Undo / Redo (Ctrl+Z):** The ability to undo a file move or deletion is a fundamental expectation for any file manager and its absence is a major point of friction.
2.  **Cut / Copy / Paste:** Adding standard clipboard operations for files is a key missing piece of basic file management.
3.  **Expanded Context Menu:** Adding more of the native right-click options, especially `Open in Integrated Terminal` and `Compare Selected`, would significantly reduce the need for users to switch back to the native Explorer.
</file_artifact>

<file path="src/Artifacts/A22. DCE - Phase 1 - Search & Filter Feature Plan.md">
# Artifact A22: DCE - Phase 1 - Search & Filter Feature Plan
# Date Created: C29
# Author: AI Model

- **Key/Value for A0:**
- **Description:** Outlines the requirements and implementation for a search bar to filter the main file tree view by file or folder name.
- **Tags:** feature plan, search, filter, tree view, ux, phase 1

## 1. Overview & Goal

To improve navigation and usability in large projects, this feature introduces a search and filter capability to the Data Curation Environment. The goal is to allow users to quickly find specific files or folders by typing a part of their name, mirroring the incremental filtering behavior of the native VS Code Explorer.

## 2. User Story

| ID | User Story | Acceptance Criteria |
|---|---|---|
| SF-01 | **Filter File Tree** | As a user working in a large repository, I want to type in a search bar to filter the file tree in real-time, so I can quickly locate the files and folders I need without extensive scrolling. | - A search icon/button is present in the main header toolbar. <br> - Clicking the icon reveals a text input field. <br> - As I type into the input field, the file tree dynamically updates to show only the files and folders whose names match the search string. <br> - All parent directories of a matching file are also shown to preserve the tree structure. <br> - The search is case-insensitive. <br> - Clearing the search input restores the full, unfiltered tree. |

## 3. Technical Implementation Plan

1.  **Frontend - UI (`view.tsx`, `view.scss`):**
    *   Add a new state variable to the main `App` component: `const [filterTerm, setFilterTerm] = useState('');`.
    *   Add a search icon (`VscSearch`) to the header toolbar. A second state, `isSearchVisible`, can be used to toggle the visibility of the input field when the icon is clicked.
    *   The search `<input>` element's `value` will be bound to `filterTerm`, and its `onChange` handler will call `setFilterTerm`.

2.  **Frontend - Filtering Logic (`FileTree.tsx`):**
    *   The `FileTree` component will receive the `filterTerm` as a new prop.
    *   A `useMemo` hook will be used to compute the filtered tree whenever the source `data` or the `filterTerm` changes.
    *   This hook will call a new recursive filtering function:
        ```typescript
        function filterTree(nodes: FileNode[], term: string): FileNode[] {
            if (!term) return nodes;
            const lowerCaseTerm = term.toLowerCase();

            return nodes.reduce((acc, node) => {
                if (node.name.toLowerCase().includes(lowerCaseTerm)) {
                    // If the node itself matches, include it and all its children
                    acc.push(node);
                    return acc;
                }

                if (node.children) {
                    // If the node is a directory, filter its children
                    const filteredChildren = filterTree(node.children, term);
                    if (filteredChildren.length > 0) {
                        // If any children match, include the parent with its filtered children
                        acc.push({ ...node, children: filteredChildren });
                    }
                }
                return acc;
            }, [] as FileNode[]);
        }
        ```
    *   The `TreeView` component will then be rendered with this new, filtered data.

3.  **State Management:**
    *   The filtering is a pure frontend operation. No backend changes or IPC communication are required for this feature.
    *   The search term is transient UI state and does not need to be persisted.
</file_artifact>

<file path="src/Artifacts/A23. DCE - Phase 1 - Advanced Interactions (Keyboard & Drag-Drop) Plan.md">
# Artifact A23: DCE - Phase 1 - Advanced Interactions (Keyboard & Drag-Drop) Plan
# Date Created: C29
# Author: AI Model
# Updated on: C71 (Add Delete key functionality)

- **Key/Value for A0:**
- **Description:** Details the requirements for implementing full keyboard navigation and drag-and-drop file/folder operations within the main file tree.
- **Tags:** feature plan, keyboard navigation, drag and drop, file operations, accessibility, ux, phase 1

## 1. Overview & Goal

To achieve true feature parity with the native VS Code Explorer and cater to power users, the Data Curation Environment must support advanced interactions. This plan outlines the requirements for two major features: full keyboard navigation for accessibility and speed, and drag-and-drop functionality for intuitive file system manipulation.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| AI-01 | **Keyboard Navigation** | As a power user, I want to navigate the file tree using only my keyboard, so I can find, select, and manage files without taking my hands off the keyboard. | - Arrow Up/Down keys move the focus between visible nodes. <br> - Arrow Right on a collapsed folder expands it. <br> - Arrow Left on an open folder collapses it. <br> - `Enter` key opens the focused file or toggles expansion. <br> - `Spacebar` toggles the checkbox of the focused node. <br> - **(Bug C68):** When a file within a checked parent folder is focused, pressing spacebar incorrectly de-selects a higher-level directory instead of just the single file. |
| AI-02 | **Internal Drag-and-Drop** | As a user, I want to be able to drag a file or folder and drop it into another folder within the DCE view to move it, so I can reorganize my project intuitively. | - Clicking and dragging a file or folder initiates a drag operation. <br> - Dragging over a folder highlights it as a potential drop target. <br> - Dropping a file/folder onto another folder moves the dragged item. <br> - **Validation:** A folder cannot be dropped into itself or one of its own descendants. |
| AI-03 | **External Drag-and-Drop** | As a user, I want to drag a file (e.g., a PDF) from my computer's file explorer or the VS Code Explorer and drop it into a folder in the DCE view to add it to my project, so I can quickly incorporate new assets. | - Dragging a file from the OS or VS Code Explorer and dropping it onto a folder in the DCE view copies that file into the target folder in the workspace. <br> - The file tree automatically refreshes to show the newly added file. |
| AI-04 | **Delete Key** | As a user, I want to press the `Delete` key on my keyboard when an item is focused in the file tree to delete it, so I can manage files quickly without using the mouse. | - Focusing an item in the main file tree and pressing `Delete` initiates the delete workflow. <br> - It uses the same backend logic as the context menu, including the confirmation dialog and moving the item to the trash. |
| AI-05 | **Copy & Paste** | As a user, I want to use `Ctrl+C` and `Ctrl+V` to copy and paste files/folders within the tree, so I can use standard keyboard shortcuts for file duplication. | - `Ctrl+C` on a focused item copies its path to an internal clipboard. <br> - `Ctrl+V` on another item pastes the copied item into that location. <br> - Handles name collisions gracefully (e.g., `file-copy.ts`). |
| AI-06 | **Hover to Expand Folder** | As a user dragging a file, when I hover over a collapsed folder for a moment, I want it to automatically expand, so I can drop the file into a nested subdirectory without having to cancel the drag operation. | - During a drag operation, hovering over a collapsed folder for ~500ms triggers its expansion. <br> - Moving the mouse away from the folder before the timer completes cancels the expansion. |

## 3. Implementation Status & Notes

### Keyboard Navigation & Internal Drag-Drop
These features are stable and complete, with the exception of the noted spacebar bug.

### External Drag and Drop (De-Prioritized as of C61)

-   **Status:** **On Hold.**
-   **Summary of Attempts:** Multiple approaches were attempted between C54 and C60 to implement file drops from outside the webview (e.g., from the OS or the native VS Code Explorer).
    1.  **Standard HTML5 API (`dataTransfer.files`):** This worked for drops from the OS but failed for drops from the VS Code Explorer, as the `files` collection is empty for security reasons.
    2.  **VS Code URI-based API (`text/uri-list`):** This approach correctly captured the URI of the file being dropped from the VS Code Explorer. The URI was passed to the backend, which then used the `vscode.workspace.fs.copy()` API.
-   **Root Cause of Failure:** Despite correctly implementing the URI-based approach, the drag-and-drop events (`onDrop`, `onDragOver`) failed to fire reliably or at all when dragging from an external source into the webview. The root cause appears to be a complex interaction with VS Code's webview security model, event propagation, and possibly the Workspace Trust feature, which could not be resolved within a reasonable number of cycles.
-   **Path Forward:** This feature is now considered a **tertiary, long-term research goal**. The core functionality of the extension is not dependent on it. For now, users can add new files using the native VS Code Explorer, the "New File..." button in the DCE toolbar, or by simply creating the file, which will then appear on refresh.
</file_artifact>

<file path="src/Artifacts/A24. DCE - Selection Paradigm Terminology.md">
# Artifact A24: DCE - Selection Paradigm Terminology
# Date Created: C29
# Author: AI Model

- **Key/Value for A0:**
- **Description:** A document to clarify the terminology used within the project to distinguish between different types of user selections (e.g., "checking" for flattening vs. "selecting" for actions).
- **Tags:** documentation, terminology, selection, checking, design

## 1. Problem Statement

During development and feedback cycles, the term "select" has been used ambiguously, leading to confusion. It has been used to describe two distinct user actions with different purposes:
1.  Clicking a checkbox to include a file/folder in the context to be flattened.
2.  Clicking a file/folder row (with optional Ctrl/Shift modifiers) to highlight it for a contextual action (e.g., Rename, Delete).

This ambiguity makes feature requests and technical discussions difficult. The goal of this document is to establish clear, consistent terminology for use in all future artifacts, code, and discussions.

## 2. Defined Terminology

Henceforth, the following terms will be used to describe user interactions with the file tree:

### **Checking / Unchecking**

*   **Action:** Clicking the `checkbox` next to a file or folder item.
*   **Purpose:** To include or exclude an item from the set of files that will be processed by the **"Flatten Context"** action.
*   **UI State:** A visible checkmark (`✓`), indeterminate mark (`-`), or empty state in the checkbox.
*   **State Variable (conceptual):** `checkedPaths: Set<string>`
*   **User Phrasing:** "I **checked** the `src` folder."

---

### **Selecting / Highlighting**

*   **Action:** Single-clicking a file/folder row. Using `Ctrl+Click` or `Shift+Click` to highlight multiple rows.
*   **Purpose:** To designate one or more items as the target for a contextual action, such as those in the **right-click context menu** (e.g., Rename, Delete, Copy Path). This is also used to identify the "active" item for operations like "New File".
*   **UI State:** A visual highlight on the entire row, typically matching the VS Code theme's selection color.
*   **State Variable (conceptual):** `selectedPaths: Set<string>`
*   **User Phrasing:** "I **selected** three files and then right-clicked to delete them."

---

### **Focusing**

*   **Action:** Navigating the tree with keyboard arrow keys.
*   **Purpose:** To move a visual indicator (a focus ring or subtle highlight) to an item, making it the active target for keyboard actions (`Enter` to open, `Spacebar` to check/uncheck).
*   **UI State:** A focus outline around the item row.
*   **State Variable (conceptual):** `focusedPath: string | null`
*   **User Phrasing:** "The `README.md` file is currently **focused**."

## 3. Summary Table

| Term | Action | Purpose | UI Cue | State Name |
| :--- | :--- | :--- | :--- | :--- |
| **Check** | Click checkbox | Include in Flatten Context | Checkmark | `checkedPaths` |
| **Select** | Click / Ctrl+Click / Shift+Click row | Target for Context Menu Actions | Row highlight | `selectedPaths` |
| **Focus** | Keyboard navigation | Target for Keyboard Actions | Focus ring | `focusedPath` |

By adhering to this terminology, we can ensure clarity in communication and precision in our technical implementation.
</file_artifact>

<file path="src/Artifacts/A25. DCE - Phase 1 - Git & Problems Integration Plan.md">
# Artifact A25: DCE - Phase 1 - Git & Problems Integration Plan
# Date Created: C30
# Author: AI Model
# Updated on: C184 (Reflect new decoration-based update architecture)

- **Key/Value for A0:**
- **Description:** Outlines the user stories and technical approach for integrating Git status indicators and VS Code Problem Diagnostics into the custom file tree.
- **Tags:** feature plan, git, problems, diagnostics, ux, phase 1

## 1. Overview & Goal

To achieve full feature parity with the native VS Code Explorer and provide critical context to the user, the Data Curation Environment (DCE) file tree must display information about a file's Git status and any associated problems (errors/warnings). The goal of this feature is to overlay this diagnostic and source control information directly onto the file tree, allowing users to make more informed decisions during context curation.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| GP-01 | **Git Status Coloring** | As a user, I want to see files and folders colored according to their Git status (e.g., green for new, yellow for modified, gray for ignored), so I can quickly identify changes in my workspace. | - The file/folder name text color in the tree view changes based on its Git status. <br> - Colors should align with the user's current VS Code theme for Git decorations. <br> - A new, untracked file is green. <br> - A modified file is yellow/orange. <br> - A deleted file (in some views) is red. <br> - An ignored file is gray. |
| GP-02 | **Git Status Badges** | As a user, I want to see a letter badge next to a file's name indicating its specific Git status (e.g., 'U' for untracked, 'M' for modified), so I have an unambiguous indicator of its state. | - A small, colored badge with a letter appears to the right of the file name. <br> - 'U' for Untracked. <br> - 'M' for Modified. <br> - 'D' for Deleted. <br> - 'A' for Added. <br> - 'C' for Conflicted. <br> - The badge has a tooltip explaining the status (e.g., "Modified"). |
| GP-03 | **Problem Indicator Badges** | As a user, I want to see a badge with a count of errors and warnings on files and their parent folders, so I can immediately identify parts of the codebase that have issues. | - A file with problems displays a badge with the number of errors (e.g., in red). <br> - A folder recursively aggregates the problem counts of its children and displays a summary badge. <br> - Tooltips on the badge provide a breakdown (e.g., "2 Errors, 3 Warnings"). <br> - The file name may also be colored (e.g., red for errors, yellow for warnings) to match the Problems panel. |

## 3. Technical Implementation Plan (C184 Revision)

### Phase 1: Data Gathering (Backend)
The backend is responsible for collecting Git and Problem data and sending it to the client.

-   **Git Status (`file-tree.service.ts`):** A `getGitStatusMap()` method builds a `Map<string, string>` of file paths to their status character by querying the Git API.
-   **Problems (`file-tree.service.ts`):** A `getProblemCountsMap()` method builds a map of file paths to their error/warning counts by querying `vscode.languages.getDiagnostics()`.

### Phase 2: Decoupled Refresh Architecture
To solve the FTV flashing bug, structural refreshes are now decoupled from decoration refreshes.

1.  **Structural Refresh (File Watcher):** The `FileSystemWatcher` is the sole trigger for a full tree rebuild (`ForceRefresh`). This is for file creations, deletions, and renames.
2.  **Decoration Refresh (Git API):** The overly sensitive `repo.state.onDidChange` listener no longer triggers a full refresh. Instead, it triggers a new, lightweight update.
    *   **New IPC Channel:** `ServerToClientChannel.UpdateDecorations` is created to carry the Git status map and the problem map to the client.
    *   **New Backend Method:** A `triggerDecorationsUpdate` method in `file-tree.service.ts` is called by the Git listener. It gathers the latest decoration data and sends it over the new channel.

### Phase 3: Rendering (Frontend)
The frontend receives the file tree structure and decoration data separately and combines them at render time.

-   **State Management (`context-chooser.view/view.tsx`):**
    *   The component maintains the `files` (tree structure), `problemMap`, and a new `gitStatusMap` in its state.
    *   A message handler for `UpdateDecorations` updates the `problemMap` and `gitStatusMap` state variables.
-   **Rendering (`FileTree.tsx`):**
    *   The component receives the `gitStatusMap` and `problemMap` as props.
    *   The `gitStatus` and `problemCounts` properties are **removed** from the `FileNode` type, as this data is no longer static.
    *   When rendering a file node, the component looks up the node's `absolutePath` in the `gitStatusMap` and `problemMap` props to get the most current decoration data.
    *   This allows the Git and problem indicators to update frequently without the expensive process of rebuilding the entire tree structure.
</file_artifact>

<file path="src/Artifacts/A26. DCE - Phase 1 - File System Traversal & Caching Strategy.md">
# Artifact A26: DCE - Phase 1 - File System Traversal & Caching Strategy
# Date Created: C31
# Author: AI Model
# Updated on: C152 (Update node_modules handling)

- **Key/Value for A0:**
- **Description:** Documents the root cause of the folder visibility bug and outlines the new strategy of using recursive directory traversal instead of `findFiles` to build a complete and accurate file system map. Also defines the performance-oriented handling of `node_modules`.
- **Tags:** bug fix, file system, traversal, refresh, cache, architecture, performance

## 1. Overview & Goal

This document addresses a critical bug where newly created empty folders do not appear in the Data Curation file tree. It also defines the strategy for handling large directories like `node_modules` to ensure the UI remains performant. The goal is to define a robust file system traversal strategy that guarantees an accurate and fast representation of the workspace.

## 2. Root Cause Analysis (RCA) - Folder Visibility

-   **Symptom:** Creating a new, empty folder in the workspace does not result in that folder appearing in the DCE file tree, even after a refresh.
-   **Root Cause:** The file discovery mechanism was using `vscode.workspace.findFiles("**/*", ...)`. This API is optimized to return a flat list of **files** and does **not** return directories, especially empty ones. When the tree was reconstructed from this file-only list, empty directories were invisible.

## 3. New Traversal Strategy

To resolve this, the reliance on `vscode.workspace.findFiles` for building the tree structure has been replaced with a manual, recursive directory traversal.

### 3.1. Technical Implementation Plan

1.  **Primary API:** The new strategy is centered around `vscode.workspace.fs.readDirectory(uri)`. This function returns an array of `[name, fileType]` tuples for all immediate children of a given directory.
2.  **Recursive Function:** A `private async _traverseDirectory(uri)` method in `file-tree.service.ts` implements the recursive scan. It iterates through directory contents, creating `FileNode` objects and recursively calling itself for subdirectories.

## 4. Performance Strategy for `node_modules` (C152)

-   **Problem:** Scanning `node_modules` for file and token counts is extremely slow and provides no value for context curation. However, completely hiding it can be confusing if a user needs to reference its structure.
-   **New Strategy:** The `node_modules` directory will be **visible but not counted**.
-   **Implementation (`_traverseDirectory`):**
    1.  When the traversal encounters a directory named `node_modules`, it will **not** skip it. It will create a `FileNode` for it.
    2.  However, it will **not** recursively call `_traverseDirectory` on its contents.
    3.  The `FileNode` for `node_modules` will be returned with an empty `children` array and `fileCount`/`tokenCount` set to 0.
-   **Benefit:** This approach makes the UI load instantly while still showing the `node_modules` folder in the tree, achieving the best of both worlds. The `flattener.service.ts` will continue to explicitly ignore this directory to prevent its inclusion in the flattened output.

## 5. Benefits of the New Approach

-   **Accuracy:** The method builds a true representation of the file system, including empty directories.
-   **Performance:** By special-casing `node_modules`, the initial tree scan remains fast and responsive.
-   **Control:** It gives us full control over the traversal, allowing for sophisticated filtering and caching.
</file_artifact>

<file path="src/Artifacts/A27. DCE - Phase 1 - Undo-Redo Feature Plan.md">
# Artifact A27: DCE - Phase 1 - Undo-Redo Feature Plan
# Date Created: C35
# Author: AI Model
# Updated on: C12 (Add requirement for preserving selection state)

- **Key/Value for A0:**
- **Description:** Details the requirements for implementing an undo/redo stack for file system operations (move, delete) performed within the DCE view, to achieve parity with the native explorer's Ctrl+Z functionality.
- **Tags:** feature plan, undo, redo, ctrl+z, file operations, ux, phase 1

## 1. Overview & Goal

A critical feature for achieving parity with the native VS Code Explorer is the ability to undo file system operations. Users expect to be able to press `Ctrl+Z` to revert an accidental file move or deletion. The goal of this feature is to implement a robust undo/redo stack for file operations initiated from within the Data Curation Environment view.

**Status (C10):** In Progress.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| UR-01 | **Undo File Move** | As a user, after I drag and drop a file to a new location, I want to be able to press `Ctrl+Z` to move it back to its original location, so I can easily correct mistakes. | - Performing a file/folder move pushes an "action" object onto an undo stack. <br> - Pressing `Ctrl+Z` while the DCE view is focused pops the last action and reverses it (moves the file back). <br> - The file tree updates to reflect the reversed move. |
| UR-02 | **Undo File Deletion** | As a user, after I delete a file or folder (to the trash), I want to be able to press `Ctrl+Z` to restore it, so I don't lose work accidentally. | - Deleting a file/folder pushes an "action" object onto the undo stack. <br> - Pressing `Ctrl+Z` reverses the deletion. Since we use `useTrash: true`, this might be handled by a native VS Code command, or we may need to implement a restore from trash mechanism if possible. |
| UR-03 | **Redo Operation** | As a user, after I undo an action, I want to be able to press `Ctrl+Y` (or `Ctrl+Shift+Z`) to redo the action, so I can toggle between states. | - Undoing an action moves it from the undo stack to a redo stack. <br> - Pressing `Ctrl+Y` pops the last action from the redo stack and re-applies it. <br> - The file tree updates accordingly. |
| UR-04 | **Preserve Selection State** | As a user, if I move a file that is *not* checked for flattening, and then I undo that move, I expect the file to still be unchecked when it returns to its original location, so its selection state is preserved. | - The "auto-add new files" feature must not incorrectly re-check a file that is being restored via an undo operation. |

## 3. Technical Implementation Plan

This feature will be implemented primarily on the backend to manage the file system state and the action history.

1.  **Action Stack Service (New Backend Service):**
    *   Create a new service, `action.service.ts`, to manage the undo and redo stacks.
    *   It will contain two arrays: `undoStack: Action[]` and `redoStack: Action[]`.
    *   An `Action` will be a typed object, e.g., `{ type: 'move', payload: { from: string, to: string } }` or `{ type: 'delete', payload: { path: string } }`.
    *   It will expose methods: `push(action: Action)`, `undo()`, and `redo()`.
        *   `push`: Adds an action to `undoStack` and clears `redoStack`.
        *   `undo`: Pops from `undoStack`, performs the reverse operation, and pushes the original action to `redoStack`.
        *   `redo`: Pops from `redoStack`, performs the original operation, and pushes it back to `undoStack`.

2.  **Integrate with `file-operation.service.ts`:**
    *   The `handleMoveFileRequest` and `handleFileDeleteRequest` methods in `file-operation.service.ts` will be updated.
    *   *Before* performing the file system operation, they will create the corresponding `Action` object.
    *   *After* the operation succeeds, they will call `Services.actionService.push(action)`.

3.  **IPC Channels and Commands:**
    *   Create two new `ClientToServerChannel` entries: `RequestUndo` and `RequestRedo`.
    *   The frontend (`TreeView.tsx`) will have a top-level `onKeyDown` handler. When `Ctrl+Z` or `Ctrl+Y` is detected, it will send the appropriate IPC message to the backend.
    *   Create two new backend commands, `dce.undo` and `dce.redo`, which will be called by the message handlers. These commands will simply call `Services.actionService.undo()` and `Services.actionService.redo()`.

4.  **Reverse Operations Logic (`action.service.ts`):**
    *   The `undo()` method will contain the logic to reverse actions.
    *   **Move:** To undo a move from `A` to `B`, it calls `vscode.workspace.fs.rename(B, A)`.
    *   **Delete:** Undoing a delete is more complex. Since we use `useTrash: true`, VS Code might not expose a direct API to "un-delete". Research is needed. The simplest approach might be to leverage a built-in command like `files.restoreFromTrash` if it can be targeted, or we may need to inform the user to use the native Explorer's undo for deletions. For a first pass, we might only support undo for **move** operations.
    *   **Selection State Preservation (UR-04):** Before performing the reverse `rename`, the `undo` method will call a new method on the `FileOperationService` to temporarily add the original file path to an "ignore" list for the "auto-add new files" feature. This prevents the file watcher from incorrectly re-checking the file when it reappears.

5.  **Frontend Focus:**
    *   The main `TreeView` component needs to be focusable (`tabIndex="0"`) to capture the keyboard shortcuts. The `onKeyDown` handler will check for `event.ctrlKey` and the specific key (`z` or `y`) and then send the IPC message.
</file_artifact>

<file path="src/Artifacts/A28. DCE - Packaging and Distribution Guide.md">
# Artifact A28: DCE - Packaging and Distribution Guide
# Date Created: C43
# Author: AI Model
# Updated on: C164 (Add critical step for including static assets)

- **Key/Value for A0:**
- **Description:** Provides a step-by-step guide on how to package the extension into a `.vsix` file for beta testing and distribution.
- **Tags:** packaging, distribution, vsix, vsce, deployment

## 1. Overview

This document provides instructions on how to package the Data Curation Environment (DCE) extension into a single `.vsix` file. This file is the standard format for distributing and installing VS Code extensions, making it easy to share with beta testers or submit to the official marketplace.

The primary tool used for this process is `vsce` (Visual Studio Code Extensions), the official command-line tool for managing extensions.

## 2. Prerequisites

1.  **Node.js and npm:** You must have Node.js and npm installed.
2.  **Install `vsce`:** If you haven't already, install `vsce` globally by running the following command in your terminal:
    ```bash
    npm install -g @vscode/vsce
    ```

## 3. Packaging the Extension

Follow these steps in your terminal from the root directory of the DCE project (e.g., `C:\Projects\DCE`):

### Step 0: Update `package.json` (Important!)

Before packaging, ensure your `package.json` file is complete. The `vsce` tool will warn you if important fields are missing. At a minimum, make sure the following fields are present and correct:

-   `publisher`: Your publisher ID from the VS Code Marketplace.
-   `repository`: An object pointing to your source code repository (e.g., on GitHub).
-   `homepage`: A link to your project's homepage.
-   `bugs`: A link to your project's issue tracker.
-   `version`: Increment the version number for each new release.

### Step 1: Verify Static Asset Handling (CRITICAL)

The extension's backend code runs from the compiled `dist` directory. Any static files that the backend needs to read at runtime (like our `T*` template artifacts in `src/Artifacts`) **must be copied into the `dist` directory** during the build process.

-   **Check `webpack.config.js`:** Ensure the `CopyPlugin` includes a rule to copy `src/Artifacts` to the `dist` folder.
    ```javascript
    // Example rule in CopyPlugin patterns:
    { from: "src/Artifacts", to: "Artifacts" }
    ```
-   **Check Backend Code:** Ensure any code that reads these files (e.g., `prompt.service.ts`) constructs the path relative to the final `dist` directory (e.g., `path.join(context.extensionPath, 'dist', 'Artifacts', ...)`).

### Step 2: Ensure Dependencies are Installed

Make sure your project's dependencies are up to date.

```bash
npm install
```

### Step 3: Create a Production Build

Before packaging, it's essential to create an optimized production build of the extension. Our `package.json` already has a script for this.

```bash
npm run package
```

This command runs webpack in `production` mode, which minifies the code and removes source maps, resulting in a smaller and faster extension. It will update the files in the `/dist` directory.

### Step 4: Run the Packaging Command

Once the production build is complete, you can run the `vsce` packaging command.

```bash
vsce package
```

This command will:
1.  Read the `package.json` manifest file.
2.  Gather all the necessary files, respecting the rules in `.vscodeignore`.
3.  Bundle everything into a single file named `data-curation-environment-X.X.X.vsix`, where `X.X.X` is the version number from `package.json`.

You will see the `.vsix` file in the root of your project directory.

## 4. Sharing and Installing the `.vsix` File

### For Beta Testers:

1.  **Share the File:** You can send the generated `.vsix` file directly to your testers (e.g., via email, Slack, or a shared drive).

2.  **Installation Instructions:** Your testers can install it in VS Code by following these steps:
    *   Open VS Code.
    *   Go to the **Extensions** view (Ctrl+Shift+X).
    *   Click the **...** (More Actions) button at the top of the Extensions view.
    *   Select **"Install from VSIX..."**.
    *   In the file dialog that opens, navigate to and select the `.vsix` file you provided.
    *   VS Code will install the extension and prompt for a reload.
</file_artifact>

<file path="src/Artifacts/A29. DCE - Phase 1 - Binary and Image File Handling Strategy.md">
# Artifact A29: DCE - Phase 1 - Binary and Image File Handling Strategy
# Date Created: C46
# Author: AI Model
# Updated on: C47 (Richer metadata format and JSON output)

- **Key/Value for A0:**
- **Description:** Defines the strategy for handling binary files; they can be checked, but only their metadata (path, size) is included in the flattened output, not their content.
- **Tags:** feature plan, binary, image, metadata, flatten, phase 1

## 1. Overview & Goal

During beta testing, a use case emerged for including information about binary files (like images) in the flattened context without including their raw, unreadable content. The goal of this strategy is to allow users to select *any* file, but to intelligently handle non-text files during the flattening process to prevent corrupting the output while still capturing useful metadata.

## 2. Problem Statement

-   **Initial Problem:** Flattening a folder containing images (`.png`, `.gif`) resulted in binary gibberish being written to `flattened_repo.md`.
-   **Initial Solution (C43):** Prevent selection of binary files by disabling their checkboxes.
-   **Refined Requirement (C46):** The user realized they *do* want to capture the existence and properties of these files (e.g., path, size) as part of the context, just not their content.
-   **Refined Requirement (C47):** The metadata should be richer, including name, directory, dimensions, and file type, and be presented in a structured format.

## 3. The New Strategy

The extension will now adopt a "metadata-only" approach for a predefined list of binary and image file types.

### 3.1. User Experience

1.  **Selection is Always Allowed:** All files in the file tree, regardless of type, will have an enabled checkbox. The user is free to check any file or folder.
2.  **File Opening:** Clicking on any file in the tree view will open it using VS Code's default viewer for that file type (e.g., text editor for `.ts`, image preview for `.png`).
3.  **Flattening Behavior is Differentiated:**
    *   When a **text file** is checked and the "Flatten Context" button is pressed, its full content is read and included in `flattened_repo.md`.
    *   When a **binary or image file** is checked, its content is **not** read. Instead, the flattener service will gather its metadata and include a structured, human-readable entry for it in `flattened_repo.md`.

### 3.2. Output Format for Binary Files

When a binary file is included, its entry in the `<files content>` section of `flattened_repo.md` will contain a `<metadata>` tag with a JSON object. Dimensions will be included on a best-effort basis for common formats (PNG, JPG, GIF).

**Example (with dimensions):**
```xml
<file path="public/images/logo.png">
<metadata>
{
  "name": "logo.png",
  "directory": "public/images",
  "fileType": "PNG",
  "sizeInBytes": 12345,
  "dimensions": {
    "width": 256,
    "height": 256
  }
}
</metadata>
</file>
```

**Example (without dimensions):**
```xml
<file path="assets/archive.zip">
<metadata>
{
  "name": "archive.zip",
  "directory": "assets",
  "fileType": "ZIP",
  "sizeInBytes": 102400
}
</metadata>
</file>
```

## 4. Technical Implementation Plan

1.  **File Opening (`fs.service.ts`):**
    *   The `handleOpenFileRequest` method will be updated to use `vscode.commands.executeCommand('vscode.open', uri)`. This delegates opening to VS Code, which correctly selects the appropriate viewer for any file type.

2.  **Backend Flattener Logic (`flattener.service.ts`):**
    *   A constant set of binary/image extensions will be defined.
    *   A new private method, `_parseImageMetadata`, will be added. It will read a file's buffer and attempt to parse dimensions for PNG, JPG, and GIF files, adapting logic from `flattenv2.js`.
    *   The `getFileStatsAndContent` method will be updated. When it encounters a binary file, it will:
        *   Call `_parseImageMetadata`.
        *   Collect the name, directory, type, size, and (if available) dimensions.
        *   Construct the formatted JSON string.
        *   Return a `FileStats` object where `content` is this JSON string, and `tokens` is 0.
</file_artifact>

<file path="src/Artifacts/A30. DCE - Phase 1 - PDF Handling and Virtualization Strategy.md">
# Artifact A30: DCE - Phase 1 - PDF Handling and Virtualization Strategy
# Date Created: C49
# Author: AI Model

- **Key/Value for A0:**
- **Description:** Defines the strategy for handling PDF files. Text is extracted on-demand and cached in memory for flattening, creating a "virtual" markdown file without modifying the user's workspace.
- **Tags:** feature plan, pdf, text extraction, virtualization, cache, phase 1

## 1. Overview & Goal

Users need to include the textual content of PDF documents in their flattened context. However, creating physical `.md` files for each PDF in the user's workspace is undesirable as it clutters their project. The goal of this strategy is to implement a "virtual file" system for PDFs. The extension will extract text from PDF files on demand and hold it in an in-memory cache, using this virtual content during the flattening process without ever writing new files to the user's disk.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| PDF-01 | **Include PDF Text in Context** | As a user, when I check a `.pdf` file in the DCE view, I want its textual content to be included in the `flattened_repo.md` file, so I can use documents and papers as context. | - Checking a `.pdf` file is allowed. <br> - The token count displayed for the PDF reflects its extracted text content, not its binary size. <br> - When flattened, the text from the PDF is included within a `<file>` tag, just like a normal text file. <br> - No `.md` file is ever created in the user's workspace. |
| PDF-02 | **Drag-Drop PDF to Add** | As a user, I want to drag a PDF from my computer's file explorer and drop it into the DCE view, so I can quickly add it to my project and include it in my context. | - Dropping a PDF file into a folder in the DCE view copies the PDF into that workspace directory. <br> - The new PDF immediately appears in the file tree. <br> - The user can then check it to include its text content for flattening. |

## 3. Technical Implementation Plan

1.  **Dependency:**
    *   The `pdf-parse` library will be added as a dependency to `package.json` to handle text extraction from PDF buffers.

2.  **Backend (`fs.service.ts`):**
    *   **In-Memory Cache:** A new private cache will be added: `private pdfTextCache = new Map<string, { text: string; tokenCount: number }>();`. This will store the extracted text and calculated token count, keyed by the PDF's absolute path.
    *   **New IPC Handler (`RequestPdfToText`):**
        *   This handler will receive a file path for a PDF.
        *   It will first check the `pdfTextCache`. If the content is present, it will return the cached data.
        *   If not cached, it will read the PDF file into a buffer, use `pdf-parse` to extract the text, calculate the token count, store the result in the cache, and then return it.
        *   It will send a `UpdateNodeStats` message back to the client with the new token count.

3.  **Frontend (`view.tsx`):**
    *   **On-Demand Extraction:** The `updateCheckedFiles` function will be modified. When a path that ends in `.pdf` is being checked for the first time, it will send a `RequestPdfToText` message to the backend.
    *   **Dynamic Stats Update:** A new IPC listener for `UpdateNodeStats` will be added. When it receives a message, it will find the corresponding `FileNode` in the `files` state and update its `tokenCount` property, causing the UI to re-render with the correct information.

4.  **Backend (`flattener.service.ts`):**
    *   **Virtual Content Retrieval:** The `getFileStatsAndContent` method will be updated.
    *   If it encounters a file path ending in `.pdf`, it will **not** attempt to read the file from the disk.
    *   Instead, it will call a new method on the `FSService` (e.g., `getVirtualPdfContent(filePath)`) to retrieve the text from the `pdfTextCache`.
    *   It will then use this cached text to generate the `FileStats` object, effectively treating the PDF as if it were a markdown file. If the content is not in the cache (e.g., the file was never checked), it will be flattened with empty content.

5.  **External Drag-and-Drop:**
    *   This will be handled by the generic "External Drag-and-Drop" feature planned in `A23`. The implementation will read the file buffer and send it to the backend for creation, which works for PDFs just as it does for any other file type.
</file_artifact>

<file path="src/Artifacts/A31. DCE - Phase 2 - Multimodal Content Extraction (PDF Images).md">
# Artifact A31: DCE - Phase 2 - Multimodal Content Extraction (PDF Images)
# Date Created: C49
# Author: AI Model

- **Key/Value for A0:**
- **Description:** A plan for a future feature to extract images from PDF files and use a multimodal LLM to generate rich, textual descriptions for inclusion in the context.
- **Tags:** feature plan, multimodal, image to text, pdf, llm, phase 2

## 1. Overview & Goal

Building on the PDF text extraction in Phase 1, this plan outlines a powerful Phase 2 enhancement: making the visual information within PDFs accessible to language models. Many technical papers, reports, and documents rely on diagrams, charts, and images to convey critical information. The goal of this feature is to extract these images from a PDF and use a multimodal vision-language model (VLM) to generate rich, textual descriptions. These descriptions can then be included in the flattened context, allowing an LLM to "understand" the visual elements of the document.

## 2. User Story

| ID | User Story | Acceptance Criteria |
|---|---|---|
| MM-01 | **Understand PDF Images** | As a data curator, when I include a PDF containing charts and diagrams in my context, I want the extension to generate textual descriptions of those images, so the LLM I'm prompting can reason about the visual data. | - When a PDF is processed, the extension identifies and extracts embedded images. <br> - For each extracted image, the extension sends it to a configured multimodal LLM API (e.g., Gemini). <br> - The LLM API returns a detailed textual description of the image's content. <br> - These descriptions are inserted into the virtual markdown content of the PDF at the appropriate locations (e.g., `[Image: A bar chart showing user growth from 2022 to 2024...]`). <br> - This feature can be enabled/disabled in the extension's settings to manage API costs. |

## 3. Technical Implementation Plan (High-Level)

This is a complex feature that will require new services and dependencies, likely as part of the project's Phase 2.

1.  **PDF Image Extraction Library:**
    *   **Research:** The first step is to research and select a robust Node.js library capable of extracting raw image data (e.g., as buffers) from a PDF file. `pdf-lib` or native command-line tools like `pdfimages` (wrapped in a Node.js process) are potential candidates.
    *   **Implementation:** A new method in `fs.service.ts`, `_extractImagesFromPdf(buffer)`, will be created to handle this process.

2.  **New Service: `ImageDescriptionService`:**
    *   A new backend service, `ImageDescriptionService`, will be created.
    *   This service will be responsible for communicating with a multimodal LLM provider (e.g., Google's Gemini API).
    *   It will have a method like `describeImage(imageBuffer: Buffer): Promise<string>`.
    *   This method will handle the API request, sending the image data and receiving the text description.
    *   It will require API key management, likely extending the existing settings infrastructure.

3.  **Integration with PDF Processing:**
    *   The `RequestPdfToText` handler in `fs.service.ts` will be significantly enhanced.
    *   After parsing the text with `pdf-parse`, it would ideally also call the new image extraction method.
    *   It would then iterate through the extracted images, call the `ImageDescriptionService` for each, and intelligently weave the resulting descriptions back into the main text content to create a comprehensive markdown representation of the entire PDF.
    *   This process would be computationally expensive and time-consuming, requiring clear user feedback (e.g., progress indicators) in the UI.

4.  **Configuration:**
    *   New settings will be added to `package.json` and managed via a settings service to allow the user to:
        *   Enable/disable this feature.
        *   Configure their multimodal API provider and key.
        *   Potentially set a budget or limit on the number of images to process per document.
</file_artifact>

<file path="src/Artifacts/A32. DCE - Phase 1 - Excel and CSV Handling Strategy.md">
# Artifact A32: DCE - Phase 1 - Excel and CSV Handling Strategy
# Date Created: C62
# Author: AI Model
# Updated on: C67 (Revert to xlsx and custom Markdown converter for stability)

- **Key/Value for A0:**
- **Description:** Defines the strategy for handling tabular data files (.xlsx, .xls, .csv) by converting them to Markdown tables on-demand and caching them in memory for flattening.
- **Tags:** feature plan, excel, csv, text extraction, virtualization, cache, phase 1

## 1. Overview & Goal

Following the successful implementation of PDF virtualization, users now require a similar capability for tabular data files, specifically Microsoft Excel (`.xlsx`, `.xls`) and Comma-Separated Values (`.csv`). The goal is to extract the content from these files and represent it as clean, readable Markdown tables within the flattened context. This will be achieved using the same on-demand, in-memory caching strategy to avoid creating temporary files in the user's workspace.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| XLS-01 | **Include Tabular Data in Context** | As a user, when I check an Excel or CSV file, I want its data to be converted to Markdown tables and included in the `flattened_repo.md`, so I can use structured data as context for the LLM. | - Checking `.xlsx`, `.xls`, and `.csv` files is allowed. <br> - The token count displayed for the file reflects its Markdown table content. <br> - When flattened, the content is included within a `<file>` tag. <br> - For Excel files with multiple sheets, each sheet is converted to a separate named Markdown table. <br> - No temporary `.md` files are created in the user's workspace. |

## 3. Technical Implementation Plan (C67 Update)

1.  **Dependency:**
    *   After encountering critical parsing bugs and format limitations with `exceljs`, the project has reverted to using the more robust **`xlsx` (SheetJS)** library. This will be the sole dependency for parsing tabular data.
    *   **Vulnerability Note:** The `xlsx` package has a known high-severity vulnerability. While a direct fix from the library maintainers is not yet available, our implementation mitigates risk by using it only for its core data parsing and implementing our own logic for converting that data to Markdown, rather than using the library's more complex and less-audited utility functions.

2.  **Backend (`fs.service.ts`):**
    *   **In-Memory Cache:** A private cache will be maintained: `private excelMarkdownCache = new Map<string, { markdown: string; tokenCount: number }>();`.
    *   **IPC Handler (`RequestExcelToText`):**
        *   This handler will receive a file path. It will first check the cache.
        *   If not cached, it will read the file buffer.
        *   It will use `XLSX.read(buffer)` to parse the file into a workbook object. This works for `.xlsx`, `.xls`, and `.csv`.
        *   It will iterate through each sheet name in the `workbook.SheetNames`.
        *   For each sheet, it will call a **custom private helper method, `_sheetToMarkdown`**.
    *   **Custom Markdown Converter (`_sheetToMarkdown`):**
        *   This new function will take a worksheet object from `xlsx` as input.
        *   It will use `XLSX.utils.sheet_to_json(worksheet, { header: 1 })` to get an array-of-arrays representation of the sheet.
        *   It will then manually iterate over these arrays to construct a Markdown table string, creating the header row (`| Col1 | Col2 |`), the separator line (`|---|---|`), and all data rows.
        *   This custom implementation provides stability and avoids potential bundling issues with the library's own `sheet_to_markdown` utility.
        *   The final Markdown string (including headers for each sheet) will be concatenated, its token count calculated, and the result stored in the cache.
        *   It will then send an `UpdateNodeStats` message back to the client with the new token count.

3.  **Frontend & Flattener Integration:**
    *   The frontend (`view.tsx`) will continue to trigger the `RequestExcelToText` message on-demand.
    *   The backend (`flattener.service.ts`) will continue to retrieve the virtual Markdown content from the `FSService`'s cache. No changes are needed in these files.
</file_artifact>

<file path="src/Artifacts/A33. DCE - Phase 1 - Copy-Paste Feature Plan.md">
# Artifact A33: DCE - Phase 1 - Copy-Paste Feature Plan
# Date Created: C68
# Author: AI Model

- **Key/Value for A0:**
- **Description:** Details the requirements for implementing copy-paste functionality (Ctrl+C, Ctrl+V) for files and folders within the DCE view, including handling name collisions.
- **Tags:** feature plan, copy, paste, file operations, ux, phase 1

## 1. Overview & Goal

To achieve greater feature parity with the native VS Code Explorer and improve workflow efficiency, this plan outlines the implementation of standard copy-paste functionality for files and folders. Users expect to be able to use `Ctrl+C` and `Ctrl+V` to duplicate items within the file tree. The goal is to provide this intuitive and essential file management feature, complete with robust handling of name collisions to prevent accidental file overwrites.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| CP-01 | **Copy and Paste File/Folder** | As a user, I want to select a file or folder, press `Ctrl+C`, then select a destination folder and press `Ctrl+V` to create a duplicate, so I can quickly copy assets or boilerplate code within my project. | - `Ctrl+C` on a focused file/folder in the DCE view copies its path to an internal clipboard. <br> - `Ctrl+V` pastes the copied item into the currently focused folder. <br> - If a file is focused, the paste occurs in its parent directory. <br> - Pasting a folder also copies its entire contents recursively. |
| CP-02 | **Handle Name Collisions** | As a user, when I paste a file named `file.txt` into a folder that already contains a `file.txt`, I expect the new file to be automatically renamed to `file-copy.txt` (or similar), so I don't accidentally overwrite my work. | - If a file with the same name exists at the destination, the pasted file is renamed. <br> - The renaming scheme is `[original]-copy.[ext]`. <br> - If `[original]-copy.[ext]` also exists, the scheme becomes `[original]-copy-2.[ext]`, `[original]-copy-3.[ext]`, and so on, until a unique name is found. <br> - This applies to both files and folders. |

## 3. Technical Implementation Plan

1.  **IPC Channels (`channels.enum.ts`, `channels.type.ts`):**
    *   Create a new `ClientToServerChannel.RequestCopyFile` channel.
    *   The payload will be `{ sourcePath: string; destinationDir: string; }`.

2.  **Frontend State & Logic (`view.tsx`, `TreeView.tsx`):**
    *   **Clipboard State (`view.tsx`):** Add a new state variable to the main `App` component to act as the internal clipboard: `const [clipboard, setClipboard] = useState<{ path: string; type: 'copy' } | null>(null);`.
    *   **Keyboard Event Handler (`TreeView.tsx`):** Update the `handleKeyDown` function.
        *   It will now listen for `e.key === 'c'` and `e.key === 'v'` when `e.ctrlKey` (or `e.metaKey`) is true.
        *   **On `Ctrl+C`:** It will call a prop function (`onCopy`) passed down from `view.tsx`, which will update the `clipboard` state with the `focusedNodePath`.
        *   **On `Ctrl+V`:** It will check if the `clipboard` state is populated. If so, it will determine the destination directory from the `focusedNodePath` (if the focused node is a folder, use its path; if it's a file, use its parent's path). It will then send the `RequestCopyFile` message to the backend.

3.  **Backend File Operation (`fs.service.ts`):**
    *   **New Handler:** Create a new `async handleCopyFileRequest({ sourcePath, destinationDir })` method.
    *   **Name Collision Logic:**
        *   This handler will contain a private helper function, `private async _findAvailableCopyName(destinationPath: string): Promise<string>`.
        *   This helper will parse the `destinationPath` into its directory, base name, and extension.
        *   It will check if the original path exists using `vscode.workspace.fs.stat`.
        *   If it exists, it will enter a loop, checking for `...-copy.[ext]`, then `...-copy-2.[ext]`, `...-copy-3.[ext]`, etc., until `fs.stat` throws an `ENOENT` error, indicating a free name.
        *   It will return the first available unique path.
    *   **File Copy:** The main handler will call `_findAvailableCopyName` to get the final target path and then use `vscode.workspace.fs.copy(sourceUri, targetUri)` to perform the recursive copy.
    *   The existing file system watcher will automatically detect the new file/folder and trigger a UI refresh.
</file_artifact>

<file path="src/Artifacts/A34. DCE - Phase 2 - Parallel Co-Pilot Panel - Vision & Requirements.md">
# Artifact A34: DCE - Phase 2 - Parallel Co-Pilot Panel - Vision & Requirements
# Date Created: C69
# Author: AI Model
# Updated on: C133 (Add requirement for visual feedback on selection)

- **Key/Value for A0:**
- **Description:** Outlines the high-level vision and user stories for the Phase 2 multi-tabbed editor panel, designed for comparing and managing multiple AI-generated responses. Includes plans for response annotation and a "Cycles Context" field.
- **Tags:** feature plan, phase 2, co-pilot, multi-tab, ui, ux, requirements, annotation, persistence, diff, parsing

## 1. Vision & Goal

Phase 2 of the Data Curation Environment aims to solve the "single-threaded" nature of interacting with AI assistants. The current workflow for developers often involves sending the same prompt to multiple models or conversations, copying the results to separate text files, and then manually integrating them into their project to test. This is inefficient and cumbersome.

The goal of the **Parallel Co-Pilot Panel** is to create an integrated, **persistent** environment within VS Code specifically for managing, comparing, diffing, and testing multiple AI-generated code responses.

**Core Workflow (C91 Update):** The primary interaction model is now **parse-centric** and **globally controlled**. The user pastes raw AI responses into simple text areas in each tab. A single, global "Parse All" button then processes the raw text in all tabs simultaneously, transforming their UIs into a structured, read-only view. This view separates the AI's plan from its code artifacts and includes a new "Associated Files" list for at-a-glance validation.

## 2. Core Concepts

1.  **Dedicated View Container:** The panel has its own icon in the Activity Bar, providing a distinct, full-height space for its UI.
2.  **Stateful & Persistent:** The content of all tabs, context fields, the current cycle number, and the **selected response** are automatically saved. The state persists across sessions and when moving the panel to a new window.
3.  **Global Parse-on-Demand:** A single "Parse All Responses" button in the main header controls the view mode for all tabs.
4.  **Structured, Readable View:** After parsing, each tab's `textarea` is replaced by a static, read-only view that:
    *   Renders the AI's summary and plan as **formatted Markdown**.
    *   Uses **collapsible sections** for the main UI areas (Cycle Info, Summary, etc.) to manage screen real estate.
    *   Displays an **"Associated Files" list** with indicators (`✓`/`✗`) showing if the files exist in the workspace.
    *   Displays individual, **syntax-highlighted** code blocks for each file.
5.  **Live Testing via "Accept":** The core innovation is an "accept" feature. The user can, with a single click, overwrite the content of a workspace file with the AI-generated version.
6.  **Integrated Diffing:** Users can click on a file in the "Associated Files" list to see an immediate diff view comparing the AI's suggestion against the current workspace file.
7.  **Cycle Navigator:** A UI to navigate back and forth through the history of development cycles, loading the corresponding AI responses for each cycle.
8.  **Metadata Display:** Each response tab will display key metadata, such as token counts and similarity scores, to help the user quickly evaluate the AI's output.

## 3. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-US-01 | **Manage Multiple Responses** | As a developer, I want a dedicated panel with multiple tabs where I can place different AI-generated code responses, so I can keep them organized. | - A new icon in the Activity Bar opens the Parallel Co-Pilot panel. <br> - The panel contains a slider or input to select the number of visible tabs. <br> - Each tab initially contains a large text input area. |
| P2-US-02 | **Parse All Responses** | As a developer, after pasting responses into multiple tabs, I want to click a single button to parse all of them into a structured view, so I can easily review them without repetitive clicking. | - A global "Parse All Responses" button exists in the panel's header. <br> - Clicking it processes the raw text in every tab. <br> - Each tab's UI transforms to show distinct sections for summary, action plan, and file blocks. <br> - A corresponding "Un-Parse All" button reverts all tabs to their raw text view. |
| P2-US-03 | **View Formatted Text** | As a developer, I want the AI's summary and plan to be rendered as formatted Markdown, so I can easily read lists, bolded text, and other formatting. | - The summary and course of action sections correctly render Markdown syntax. |
| P2-US-04 | **Manage UI Space** | As a developer, I want to be able to collapse the main sections of the UI, so I can focus on the code blocks without excessive scrolling. | - The Cycle Info, Summary, Course of Action, and Associated Files sections have collapsible headers. |
| P2-US-05 | **Verify Response Validity** | As a developer, I want to see a list of all files an AI response intends to modify, with a clear indicator of whether those files exist in my project, so I can immediately spot hallucinations or new file suggestions. | - After parsing, a list of "Associated Files" is displayed. <br> - A checkmark (`✓`) appears next to files that exist in the workspace. <br> - An 'x' (`✗`) appears next to files that do not exist. |
| P2-US-06 | **Persistent State** | As a developer, I want all the text I've entered and the response I've selected to be saved automatically, so I don't lose my work if I close the panel, move it, or restart VS Code. | - All raw text content and the ID of the selected response is saved to a history file (`.vscode/dce_history.json`). <br> - When the panel is reopened, it loads the state from the most recent cycle. |
| P2-US-07 | **Review Changes with Diff** | As a developer, I want to click on any file in the "Associated Files" list to see a diff, so I can review the exact changes before testing. | - Clicking a file path in the list opens a diff view comparing the workspace version with the AI's version. |
| P2-US-08 | **Navigate Cycle History** | As a developer, I want to navigate backward and forward through my project's development cycles, so I can review past AI suggestions. | - UI controls exist to move between cycles. <br> - Navigating to a past cycle loads its saved raw responses into the panel. |
| P2-US-09 | **Visual Feedback on Selection** | As a user, when I select a response that is ready to be used for the next cycle, I want clear visual feedback, so I know I can proceed with confidence. | - When a response is selected (and other conditions like having a cycle title are met), the current cycle's tab and the selected response's tab turn a distinct color (e.g., green). |
</file_artifact>

<file path="src/Artifacts/A35. DCE - Phase 2 - UI Mockups and Flow.md">
# Artifact A35: DCE - Phase 2 - UI Mockups and Flow
# Date Created: C69
# Author: AI Model
# Updated on: C158 (Add "Project Plan" button for navigation to Cycle 0)

## 1. Overview

This document describes the user interface (UI) and interaction flow for the Parallel Co-Pilot Panel. The design is centered around a two-stage workflow: **Input**, followed by a global **Parse** that transforms the entire panel into a **Review & Act** mode.

## 2. UI Mockup (Textual Description)

### 2.1. Main Header & Cycle Section
The main header contains global actions.

```
|-------------------------------------------------------------------------------------------------|
| [ Project Plan ] [ Generate prompt.md ] [ Log State ] [ Parse All ] [ Sort by Tokens ] [ Resp: [ 4 ] ] |
|-------------------------------------------------------------------------------------------------|
| [v] CYCLE & CONTEXT (C158: Review and Implement Feedback)                                       |
| |---------------------------------------------------------------------------------------------| |
| | Cycle: [ < ] [ C158 ] [ > ] [ + ] [ Title Input... ] [Delete] [Reset]                       | |
| | [ Cycle Context Text Area... ]                                                              | |
| | [ Ephemeral Context Text Area... ]                                                          | |
|-------------------------------------------------------------------------------------------------|
```
*   **`[ Project Plan ]` (New):** A new button in the main header. Clicking it navigates the user back to the Cycle 0 "Onboarding View," allowing them to view and edit their master project scope.

### 2.2. Response Tabs
The tabs now display metadata when in parsed mode.

```
|=================================================================================================|
| [ Resp 1 (5 files, 2.1K tk) ] [ Resp 2 (4 files, 1.8K tk) ] [ Resp 3 ] [ Resp 4 ]                |
|-------------------------------------------------------------------------------------------------|
```
*   **Tab Metadata:** When parsed, each tab will show the number of files detected in its response and the total token count of those files.

### 2.3. Parsed View (Non-Diff Mode)
(No changes from C134)

### 2.4. Diff View
(No changes from C133)

## 3. User Interaction Flow

1.  **Edit Project Scope:** The user is on Cycle 158 and realizes they need to update their high-level project plan.
    *   They click the new **`[ Project Plan ]`** button.
    *   The PCPP view changes to the "Onboarding View" (Cycle 0), displaying the large text area with their current project scope.
    *   A "Return to Cycles" button is now visible.
    *   The user edits their project scope and the changes are auto-saved.
    *   They click "Return to Cycles" and are taken back to their latest cycle (Cycle 158). The next time they click "Generate prompt.md," the updated scope will be used.
2.  **Paste & Parse:** User pastes responses and clicks "Parse All". The tabs update to show metadata (e.g., "Resp 1 (5 files, 2.1K tk)").
3.  **Sort Responses:** The user notices "Resp 2" has a higher token count than "Resp 1". They click the **"Sort by Tokens"** button. The order of the tabs in the tab bar immediately changes to `[ Resp 2 ] [ Resp 1 ] [ Resp 4 ] [ Resp 3 ]` (based on their respective token counts). The user can now review the longest, likely most detailed, response first.
4.  **Select & Accept:** The rest of the workflow for selecting and accepting files remains the same.
</file_artifact>

<file path="src/Artifacts/A36. DCE - Phase 2 - Technical Implementation Plan.md">
# Artifact A36: DCE - Phase 2 - Technical Implementation Plan
# Date Created: C69
# Author: AI Model
# Updated on: C137 (Add selectedFilesForReplacement to persisted state)

- **Key/Value for A0:**
- **Description:** Details the technical approach for building the Parallel Co-Pilot Panel, including the new webview provider, state management, IPC channels, and backend logic for file content swapping.
- **Tags:** feature plan, phase 2, technical plan, architecture, webview, ipc, parsing, markdown, diff

## 1. Overview

This document outlines the technical implementation strategy for the Parallel Co-Pilot Panel. The plan is updated to reflect several UI/UX fixes and new features from recent cycles.

## 2. Core Components

### 2.1. Frontend State Management (`view.tsx`)

The component state will be expanded to manage the new UI features.

```typescript
// State within the view.tsx component
interface PcppState {
  // ... existing state
  selectedFilesForReplacement: Set<string>; // This state must be persisted per-cycle
  fileExistenceMap: Map<string, boolean>;
}```
*   **`selectedFilesForReplacement`**: This state must be explicitly cleared when the user navigates to a new or different cycle to prevent "state bleeding." It must also be saved as part of the `PcppCycle` object.
*   **`fileExistenceMap`**: This state must be updated after a file is successfully created via the "Accept" functionality to provide immediate UI feedback.

### 2.2. Robust "New Cycle" Button Logic

*   **Goal:** The `[ + ]` (New Cycle) button must be disabled until all required precursor data from the *previous* cycle is present.
*   **Implementation (`view.tsx`):** The `isNewCycleButtonDisabled` memoized boolean will be updated. It must now check:
    1.  That the `cycleTitle` of the *current* cycle is non-default and not empty.
    2.  That the `cycleContext` of the *current* cycle is not empty.
    3.  That a `selectedResponseId` has been set for the *current* cycle.
    *   This ensures that a user cannot create an orphaned "Cycle 2" before they have finished providing all the necessary inputs for "Cycle 1".

### 2.3. Clearing Selection State on Navigation
*   **Goal:** Fix the bug where checked files from one cycle remain checked when viewing another cycle.
*   **Implementation (`view.tsx`):** The `handleCycleChange` and `handleNewCycle` functions will explicitly reset the `selectedFilesForReplacement` state to `new Set()` on every navigation.

### 2.4. IPC Channel Updates

*   **`ServerToClientChannel.FilesWritten`:** A channel to provide direct feedback from the backend to the PCPP frontend after a file write operation.
*   **`RequestLogState`:** A channel to facilitate the "Log State" feature.

### 2.5. Backend State Synchronization (`file-operation.service.ts`, `on-message.ts`)

*   **Goal:** Fix the UI desynchronization bug where a newly created file still shows a red `✗`.
*   **Implementation:** The `handleBatchFileWrite` method in `file-operation.service.ts` will return the paths of successfully written files. The `on-message.ts` handler will then send a `FilesWritten` message back to the frontend, which will update its `fileExistenceMap` state.

### 2.6. Backend State Logging (`prompt.service.ts`)

*   **Goal:** Implement the logic for the "Log State" button.
*   **Implementation:** A new method, `generateStateLog`, will be added to `PromptService`. It will receive the frontend state, construct a comprehensive log message including a JSON dump and the generated `<M6. Cycles>` block, and send it to the `LoggerService`.
</file_artifact>

<file path="src/Artifacts/A37. DCE - Phase 2 - Cycle Navigator & Knowledge Graph - Vision.md">
# Artifact A37: DCE - Phase 2 - Cycle Navigator & Knowledge Graph - Vision
# Date Created: C70
# Author: AI Model

- **Key/Value for A0:**
- **Description:** Outlines the vision for a cycle-based navigation system to browse the history of AI-generated responses and project states, creating a navigable knowledge graph.
- **Tags:** feature plan, phase 2, knowledge graph, history, cycle navigator, ui, ux

## 1. Vision & Goal

As the Data Curation Environment matures, the interaction history with the AI becomes a valuable asset in itself. Currently, this history is ephemeral, existing only within the context of a single session. The vision for the **Cycle Navigator & Knowledge Graph** is to capture this history and make it a persistent, navigable, and core feature of the development workflow.

The goal is to transform the series of AI interactions from a linear conversation into a structured, explorable history of the project's evolution. This creates a "knowledge graph" where each node is a development cycle, and the edges are the AI-generated solutions that led from one cycle to the next.

## 2. Core Concepts

1.  **Cycle-Based History:** The fundamental unit of history is the "Cycle." Every time the curator sends a prompt and receives responses, that entire transaction is associated with a unique Cycle ID (e.g., `C70`).
2.  **Persistent Response Storage:** All AI-generated responses (the content that would be pasted into the Parallel Co-Pilot tabs) are saved and tagged with their corresponding Cycle ID.
3.  **UI for Navigation:** A simple, non-intrusive UI will be added to the Parallel Co-Pilot panel, allowing the user to step backward and forward through the cycles.
4.  **Historical Context Loading:** As the user navigates to a past cycle (e.g., from `C70` to `C69`), the Parallel Co-Pilot panel will automatically load the set of AI responses that were generated during that cycle.

## 3. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-US-06 | **Navigate Project History** | As a developer, I want to navigate backward and forward through my project's development cycles, so I can review past decisions and the AI suggestions that prompted them. | - A UI control (e.g., left/right arrows and a cycle number display) is present in the Parallel Co-Pilot panel. <br> - Clicking the arrows changes the currently viewed cycle. |
| P2-US-07 | **View Historical Responses** | As a developer, when I navigate to a previous cycle, I want the Parallel Co-Pilot tabs to automatically populate with the AI-generated responses from that specific cycle, so I can see exactly what options I was considering at that time. | - Navigating to a cycle loads the associated set of AI responses into the tabs. <br> - The metadata (token counts, etc.) for these historical responses is also displayed. |
| P2-US-08 | **Preserve Interaction Context** | As a developer, I want every AI response to be automatically saved and associated with the current cycle, so a complete and accurate history of the project is built over time. | - A mechanism exists to automatically persist all AI responses received. <br> - Each response is tagged with a Cycle ID and a unique response UUID. |
</file_artifact>

<file path="src/Artifacts/A38. DCE - Phase 2 - Cycle Navigator - UI Mockup.md">
# Artifact A38: DCE - Phase 2 - Cycle Navigator - UI Mockup
# Date Created: C70
# Author: AI Model

- **Key/Value for A0:**
- **Description:** Provides a textual mockup and interaction flow for the Cycle Navigator UI, including the cycle counter and navigation controls within the Parallel Co-Pilot Panel.
- **Tags:** feature plan, phase 2, ui, ux, mockup, workflow, cycle navigator

## 1. Overview

This document describes the proposed user interface (UI) for the Cycle Navigator. The design prioritizes simplicity and integration, placing the navigation controls directly within the Parallel Co-Pilot Panel, reinforcing the connection between the cycle history and the AI responses.

## 2. UI Mockup (Textual Description)

The Cycle Navigator will be a new UI element added to the top of the Parallel Co-Pilot Panel, positioned just below the main header and above the tab configuration slider.

```
+-----------------------------------------------------------------+
| [Parallel Co-Pilot] [Settings Icon]                             |
|-----------------------------------------------------------------|
| Cycle: [ < ] [ C70 ] [ > ]                                      |
|-----------------------------------------------------------------|
| Number of Tabs: [Slider: 1 to 8]  (Current: 4)                  |
|=================================================================|
| [ Tab 1 (active) ] [ Tab 2 ] [ Tab 3 ] [ Tab 4 ] [ + ]           |
|-----------------------------------------------------------------|
|                                                                 |
|   [Swap with Source]                                            |
|                                                                 |
|   Source: src/services/user.service.ts                          |
|   ------------------------------------------------------------  |
|   |          | Original Source      | This Tab (Response 1) |  |
|   | Lines    | 150                  | 165                   |  |
|   | Tokens   | 2.1K                 | 2.4K                  |  |
|   |----------|----------------------|-----------------------|  |
|   | Similarity Score: 85%                                   |  |
|   ------------------------------------------------------------  |
|                                                                 |
|   [Text editor area where user pastes AI-generated code...]     |
|   |                                                         |   |
|   | export class UserService {                              |   |
|   |   // ... AI generated code ...                           |   |
|   | }                                                       |   |
|   |                                                         |   |
|                                                                 |
+-----------------------------------------------------------------+
```

### 2.1. UI Components Breakdown

1.  **Cycle Navigator Bar:**
    *   A new horizontal bar containing the navigation controls.
    *   **Label:** "Cycle:".
    *   **Previous Button (`<`):** A button with a left-arrow icon. Clicking it navigates to the previous cycle (e.g., `C69`). The button is disabled if the user is at the very first recorded cycle.
    *   **Cycle Display (`C70`):** A read-only (or potentially editable) text field showing the ID of the currently viewed cycle.
    *   **Next Button (`>`):** A button with a right-arrow icon. Clicking it navigates to the next cycle (e.g., `C71`). The button is disabled if the user is at the most recent cycle.

## 3. User Interaction Flow

1.  **Initial State:** The user is working on Cycle 70. The Cycle Display shows `C70`. The `>` button is disabled. The Parallel Co-Pilot tabs show the AI responses generated for Cycle 70.
2.  **Navigate Back:**
    *   The user clicks the **`<`** button.
    *   **Action:** The extension's state updates to the previous cycle, `C69`.
    *   **UI Update:** The Cycle Display changes to `C69`.
    *   **Data Load:** The Parallel Co-Pilot panel fetches the historical data for Cycle 69. The tabs are cleared and re-populated with the AI responses that were generated during that cycle. The metadata and similarity scores all update to reflect this historical data. Both `<` and `>` buttons are now enabled.
3.  **Navigate Forward:**
    *   The user is viewing Cycle 69 and clicks the **`>`** button.
    *   **Action:** The state moves forward to `C70`.
    *   **UI Update & Data Load:** The UI returns to the state described in step 1. The `>` button becomes disabled again.
</file_artifact>

<file path="src/Artifacts/A39. DCE - Phase 2 - Cycle Navigator - Technical Plan.md">
# Artifact A39: DCE - Phase 2 - Cycle Navigator - Technical Plan
# Date Created: C70
# Author: AI Model
# Updated on: C92 (Revise initialization flow to fix persistence issues)

- **Key/Value for A0:**
- **Description:** Details the technical approach for implementing the Cycle Navigator, including data structures for storing cycle-specific responses and the state management for historical navigation.
- **Tags:** feature plan, phase 2, technical plan, architecture, state management, data model

## 1. Overview

This document outlines the technical strategy for implementing the Cycle Navigator and PCPP persistence. The implementation will require a structured data format for storing historical data, enhancements to the frontend state management, new IPC channels, and robust backend logic for data persistence. The key change in this revision is a new initialization flow to make the backend the single source of truth, resolving state loss on reload or window pop-out.

## 2. Data Structure and Persistence

A structured approach to storing the historical data is critical. A simple JSON file stored within the workspace's `.vscode` directory is a suitable starting point.

### 2.1. `dce_history.json` (Example)

```json
{
  "version": 1,
  "cycles": [
    {
      "cycleId": 91,
      "timestamp": "2025-08-20T12:30:00Z",
      "title": "Initial implementation",
      "cycleContext": "Long-term notes...",
      "ephemeralContext": "<console_log>...</console_log>",
      "responses": {
        "1": { "content": "<src/client/views/view.tsx>...</file>" },
        "2": { "content": "..." },
        "3": { "content": "" }
      }
    },
    {
      "cycleId": 92,
      "timestamp": "2025-08-21T10:00:00Z",
      "title": "Persistence fix",
      "cycleContext": "Focus on fixing state loss.",
      "ephemeralContext": "",
      "responses": {
        "1": { "content": "" }, "2": { "content": "" }, "3": { "content": "" }, "4": { "content": "" }
      }
    }
  ]
}
```

*   **Backend (`history.service.ts`):** This service will manage reading from and writing to `dce_history.json`. It will handle file locking to prevent race conditions and provide methods like `getCycle(cycleId)`, `saveCycle(cycleData)`, `getCycleList()`, and a new `getLatestCycle()`.

## 3. Frontend State Management & Initialization Flow (C92 Revision)

### 3.1. Initialization
1.  **Problem:** Previously, the frontend managed its own state and only requested pieces of data, leading to state loss when the webview was re-initialized (e.g., on reload or pop-out).
2.  **Solution:** The new flow makes the backend the single source of truth.
    *   On component mount, the frontend sends a single new IPC message: `RequestLatestCycleData`.
    *   The backend's `HistoryService` finds the cycle with the highest `cycleId` in `dce_history.json`. If the file is empty, it creates a default "Cycle 1" object.
    *   The backend sends this complete `PcppCycle` object back to the client via `SendLatestCycleData`.
    *   The frontend's message handler uses this single object to populate its *entire* initial state: `currentCycleId`, `maxCycleId`, `cycleTitle`, `cycleContext`, `ephemeralContext`, and all `tabs` content. This guarantees the UI always starts with the latest saved data.

### 3.2. State Management (`parallel-copilot.view.tsx`)
```typescript
interface PcppState {
  currentCycleId: number;
  maxCycleId: number;
  cycleTitle: string;
  // ... other state
}
```
*   The state remains largely the same, but it is now initialized from a single backend message.
*   A "New Cycle" button (`+`) will be added. Its handler will increment `maxCycleId`, set `currentCycleId = maxCycleId`, clear the UI fields, and trigger a `saveCycleData` call to create the new empty cycle record.

## 4. IPC Communication

*   **REMOVED:** `RequestCycleHistoryList`.
*   **NEW:** `ClientToServerChannel.RequestLatestCycleData`:
    *   **Payload:** `{}`
    *   **Action:** Frontend requests the full data object for the most recent cycle.
*   **NEW:** `ServerToClientChannel.SendLatestCycleData`:
    *   **Payload:** `{ cycleData: PcppCycle }`
    *   **Action:** Backend sends the complete, latest cycle data to the frontend for initialization.
*   `ClientToServerChannel.RequestCycleData`: Still used for navigating to *older* cycles.
*   `ClientToServerChannel.SaveCycleData`: Unchanged. It sends the entire state of the *current* cycle to the backend to be persisted. It's critical that the `cycleId` in the payload is correct.
</file_artifact>

<file path="src/Artifacts/A40. DCE - Phase 2 - Parallel Co-Pilot - Target File Structure.md">
# Artifact A40: DCE - Phase 2 - Parallel Co-Pilot - Target File Structure
# Date Created: C71
# Author: AI Model

- **Key/Value for A0:**
- **Description:** A text-based representation of the new files and components required to build the Phase 2 Parallel Co-Pilot and Cycle Navigator features.
- **Tags:** file structure, architecture, project layout, scaffolding, phase 2

## 1. Overview

This document outlines the new files and directories that will be created to support the development of the Phase 2 features: the Parallel Co-Pilot Panel and the Cycle Navigator. This structure is designed to be modular and integrate cleanly with our existing architecture. This artifact also serves as the "pre-computation" plan requested in C71, allowing for a script to be created to scaffold these files when development begins.

## 2. New File Tree for Phase 2

This tree shows only the **new** files and directories to be added. Existing directories will be modified to import and use these new components.

```
src/
├── backend/
│   └── services/
│       └── history.service.ts      # New: Manages reading/writing dce_history.json
│
└── client/
    ├── components/
    │   ├── DiffViewer.tsx          # New (for Phase 3, but can be stubbed): A component for side-by-side text diffing.
    │   ├── Slider.tsx              # New: A simple reusable slider component for the tab count.
    │   └── TabbedEditor.tsx        # New: The core multi-tab editor component.
    │
    ├── views/
    │   └── parallel-copilot.view/  # New View for Phase 2
    │       ├── index.ts
    │       ├── on-message.ts
    │       ├── view.scss
    │       └── view.tsx            # Main React component for the Parallel Co-Pilot panel
    │
    └── utils/
        └── string-similarity.ts    # New: A lightweight utility for calculating string similarity scores.

.vscode/
└── dce_history.json                # New (auto-generated): Stores the cycle history and AI responses.
```

## 3. Component & Service Descriptions

### Backend

-   **`src/backend/services/history.service.ts`:**
    -   **Responsibility:** Solely responsible for abstracting the file I/O for the `dce_history.json` file.
    -   **Methods:** `getCycleHistory()`, `getCycleData(cycleId)`, `saveResponseToCycle(...)`. This keeps the main `fs.service.ts` clean from business logic.

### Frontend Components

-   **`src/client/views/parallel-copilot.view/`:**
    -   This new directory will contain everything needed for the new panel, following the same structure as our existing `context-chooser.view`.
    -   `view.tsx` will be the main component, managing the state for all tabs, the current cycle, and orchestrating IPC communication.
-   **`src/client/components/TabbedEditor.tsx`:**
    -   A component that will manage the tab bar and the content of each tab editor, receiving the array of tab data as props.
-   **`src/client/components/Slider.tsx`:**
    -   A simple, reusable slider component to control the number of tabs. This extracts UI logic from the main view.
-   **`src/client/utils/string-similarity.ts`:**
    -   Will contain a function to calculate the similarity between two strings, likely implementing the Dice Coefficient or a similar algorithm. This keeps the calculation logic separate and testable.

### Root Directory

-   **`.vscode/dce_history.json`:**
    -   This file will be automatically created and managed by the `HistoryService`. Storing it in `.vscode` is standard practice for workspace-specific extension data that should not typically be checked into source control. It will be added to `.gitignore`.
</file_artifact>

<file path="src/Artifacts/A40.1. DCE - Phase 2 - Competitive Analysis & Feature Ideas.md">
# Artifact A40.1: DCE - Phase 2 - Competitive Analysis & Feature Ideas
# Date Created: C71
# Author: AI Model
# Updated on: C71 (Incorporate user feedback and consolidate ideas)

- **Key/Value for A0:**
- **Description:** An analysis of existing tools and extensions for managing multiple AI responses, with a list of potential features to incorporate into the Parallel Co-Pilot panel.
- **Tags:** feature plan, phase 2, research, competitive analysis, co-pilot

## 1. Overview

As requested in Cycle 71, this document summarizes research into existing tools that address the problem of managing and comparing multiple AI-generated code responses. The goal is to identify common features, discover innovative ideas, and ensure our Phase 2 "Parallel Co-Pilot Panel" is a best-in-class solution.

## 2. Research Summary

A search for "VS Code extensions for comparing AI responses" reveals that while many extensions integrate a single AI chat (like GitHub Copilot Chat), very few are designed for the specific workflow of managing *multiple, parallel* responses to the *same* prompt. [1, 3] This represents a significant opportunity for our project. The "AI Toolkit for Visual Studio Code" is a notable exception, offering features to run prompts against multiple models simultaneously and compare the results, validating our core concept. [1, 2]

Most developers still use a manual process involving external tools:
1.  Pasting responses into separate tabs in a text editor (Notepad++, Sublime Text).
2.  Using a dedicated diff tool (WinMerge, Beyond Compare, VS Code's native diff) to compare two responses at a time.

The key pain point is the friction of moving text between applications and the lack of an integrated testing loop, which our "swap" feature directly addresses.

## 3. Existing Tools & Inspirations

| Tool / Extension | Relevant Features | How It Inspires DCE |
| :--- | :--- | :--- |
| **AI Toolkit for VS Code** | - "Bulk Run" executes a prompt across multiple models simultaneously. [1] <br> - "Compare" view for side-by-side model responses. [2] <br> - Model evaluation with metrics like similarity and relevance. [2] | This extension is the closest conceptually to our goal. It validates the need for parallel prompting and comparison. Our "swap" feature for live testing remains a key differentiator. |
| **Cursor.sh (IDE)** | - A fork of VS Code built around an AI-first workflow. <br> - "Auto-debug" feature attempts to fix errors. <br> - Inline diffing for AI-suggested changes. | Cursor's deep integration is a long-term inspiration. An "Auto-fix TS Errors" button in our panel could be a powerful feature, where we send the code + errors back to the AI. |
| **Continue.dev** | - Open-source and customizable. <br> - Strong concept of "Context Providers," very similar to our Phase 1. | Their flexible context system is a good model. A future DCE feature could allow highlighting a specific function and sending *just that* to the Parallel Co-Pilot panel for iteration. |

## 4. New Feature Ideas for DCE Phase 2 (Refined with C71 Feedback)

Based on the analysis and our project goals, here are some new or refined feature ideas for the Parallel Co-Pilot Panel:

| Feature Idea | Description |
| :--- | :--- |
| **"Accept Response" Button** | As per user feedback, this is a more intuitive name than "Promote to Source". A button to overwrite the source file with the tab's content without swapping back. This signifies a permanent acceptance of the AI's suggestion for that cycle. |
| **One-Click Diff View** | A button that opens VS Code's native diff viewer, comparing the tab's content with the original source file. This is a great stepping stone to our fully integrated Phase 3 diff tool. |
| **AI-Powered Summary of Changes** | A button that sends the original code and the tab's code to an LLM with a prompt like "Summarize the key changes between these two code blocks." The summary would be displayed in the tab's metadata area. |
| **Response Annotation & Rating** | A feature the user liked: Allow adding thumbs up/down, tags (e.g., `refactor`, `bug-fix`), and comments to each response tab. This metadata would be saved with the cycle history, adding valuable context. |
| **Intent Buttons** | As per user feedback, instead of slash commands, provide clear buttons for common refinement tasks like "Add Documentation," "Find Bugs," or "Refactor for Readability." These would re-prompt the AI with the tab's content and the specific instruction. |
| **Ephemeral "Cycles Context" Field** | As per user feedback, add a separate text field for temporary context like error logs that are useful for the current cycle's prompt but should not be saved in the long-term cycle history to avoid token bloat. |
</file_artifact>

<file path="src/Artifacts/A41. DCE - Phase 2 - API Key Management - Feature Plan.md">
# Artifact A41: DCE - Phase 2 - API Key Management - Feature Plan
# Date Created: C71
# Author: AI Model

- **Key/Value for A0:**
- **Description:** Outlines the user stories and technical plan for a settings UI where users can securely input and manage their API keys for various LLM services or a local endpoint URL.
- **Tags:** feature plan, phase 2, settings, api key, configuration, security

## 1. Overview & Goal

As the DCE project moves into Phase 2, it will begin to make its own API calls to LLM providers. To do this securely and flexibly, the extension needs a dedicated interface for users to manage their API keys and specify a local LLM endpoint. The goal of this feature is to provide a simple, secure, and intuitive settings panel for managing these credentials.

This functionality is heavily inspired by the `ApiKeysManagement.tsx` module in the `The-Creator-AI-main` reference repository.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-API-01 | **Configure API Key** | As a user, I want to add an API key for a specific cloud service (e.g., Gemini, OpenAI), so the extension can make API calls on my behalf. | - A UI is available to add a new API key. <br> - I can select the LLM provider from a dropdown list. <br> - I can paste my key into a text field. <br> - The key is stored securely using VS Code's `SecretStorage` API. |
| P2-API-02 | **Configure Local LLM Endpoint** | As a user with a local LLM (e.g., via LM Studio), I want to provide an API endpoint URL, so the extension can use my local model instead of a cloud service. | - The settings UI has a dedicated input field for a local LLM API URL. <br> - The URL is saved to the workspace settings. <br> - The extension prioritizes using this URL if it is set. |
| P2-API-03 | **View Saved Keys** | As a user, I want to see a list of my saved API keys (partially masked), so I can confirm which keys I have configured. | - The settings UI displays a list of all saved API keys. <br> - Keys are grouped by service. <br> - The key values are partially masked for security (e.g., `sk-xxxx...1234`). |
| P2-API-04 | **Delete an API Key** | As a user, I want to delete an API key that I no longer use, so I can manage my credentials. | - Each listed API key has a "Delete" button. <br> - Clicking "Delete" prompts for confirmation. <br> - Upon confirmation, the key is removed from the extension's secure storage. |
| P2-API-05 | **Secure Storage** | As a developer, I want API keys to be stored securely using VS Code's `SecretStorage` API, so sensitive user credentials are not exposed as plain text. | - API keys are not stored in plain text in `settings.json` or workspace state. <br> - The `SecretStorage` API is used to encrypt and store the keys, associating them with the extension. |

## 3. Technical Implementation Plan

1.  **New View / Command:**
    *   A new command, `dce.openApiSettings`, will be created. This command will open a new webview panel dedicated to API key management. This keeps the UI clean and separate from the main workflow panels.
    *   This can be triggered from a "Settings" icon within the Parallel Co-pilot view.

2.  **Backend (`settings.service.ts` - New):**
    *   A new `SettingsService` will be created to handle the logic for storing and retrieving secrets and settings.
    *   **API Key Storage:** It will use `vscode.ExtensionContext.secrets` (the `SecretStorage` API) for all API key operations.
    -   **Local URL Storage:** It will use the standard `vscode.workspace.getConfiguration` API to get/set the local LLM URL in the workspace `settings.json`.
    *   **Methods:** It will expose methods like `setApiKey(service: string, key: string)`, `getApiKeys()`, `deleteApiKey(service: string)`, `getLocalLlmUrl()`, and `setLocalLlmUrl(url: string)`. The `getApiKeys` method will return a structure with masked keys for the UI.

3.  **Frontend (New `api-settings.view.tsx`):**
    *   This new React view will render the UI for managing keys and the local endpoint URL.
    *   It will communicate with the backend `SettingsService` via new IPC channels.

4.  **IPC Channels:**
    *   `RequestApiKeys`: Frontend asks for the list of saved (masked) keys.
    *   `SendApiKeys`: Backend sends the list of keys.
    *   `SaveApiKey`: Frontend sends a new service and key to the backend.
    *   `DeleteApiKey`: Frontend requests the deletion of a specific key.
    *   `RequestLocalLlmUrl` / `SendLocalLlmUrl`
    *   `SaveLocalLlmUrl`
</file_artifact>

<file path="src/Artifacts/A41.1. DCE - Phase 2 - Advanced Features & Integrations Plan.md">
# Artifact A41.1: DCE - Phase 2 - Advanced Features & Integrations Plan
# Date Created: C71
# Author: AI Model

- **Key/Value for A0:**
- **Description:** Explores future enhancements for the Parallel Co-Pilot, such as applying AI responses as diff patches and integrating with Git for direct commits.
- **Tags:** feature plan, phase 2, ideation, diff, patch, git, workflow

## 1. Overview & Goal

This document explores potential high-impact features that could be built on top of the core Parallel Co-Pilot panel. The goal is to move beyond simple "swap" functionality and create a more powerful, integrated, and intelligent workflow for reviewing and applying AI-generated code. These ideas are intended for consideration and prioritization during Phase 2 development.

## 2. Proposed Advanced Features

### 2.1. Idea: Apply as Diff/Patch

-   **Problem:** The current "swap" feature is a blunt instrument. It replaces the entire file, which can be risky if the AI only intended to change a small part of it and made a mistake elsewhere. It also makes it hard to see exactly what changed.
-   **Proposed Solution:**
    1.  **Diff Generation:** When an AI response is pasted into a tab, the extension automatically generates a diff between the tab's content and the original source file.
    2.  **Inline Diff View:** The editor in the tab could be enhanced to show an inline diff view (similar to VS Code's source control view), highlighting added and removed lines.
    3.  **"Apply Patch" Button:** The "Swap" button is replaced with an "Apply Patch" button. Clicking it would attempt to apply only the identified changes to the source file, leaving the rest of the file untouched. This is a much safer and more precise way to integrate AI suggestions.
-   **Technical Notes:** This would require a diffing library (e.g., `diff-match-patch` or `jsdiff`) on the frontend or backend to generate and apply patches.

### 2.2. Idea: Integrated Git Workflow

-   **Problem:** After a developer tests and accepts an AI suggestion, the next step is almost always to commit the change. This requires leaving the co-pilot panel and using the source control view.
-   **Proposed Solution:**
    1.  **"Commit This Change" Button:** Add a new button to each tab in the Parallel Co-Pilot panel.
    2.  **Workflow:**
        *   The user swaps in the AI code and verifies it works.
        *   They click "Commit This Change".
        *   The extension automatically stages the modified file (`git add <file_path>`).
        *   The extension opens the Source Control commit input box.
        *   **Enhancement:** The commit message box could be pre-populated with a summary of the changes, potentially generated by another AI call based on the diff.
-   **Technical Notes:** This requires deeper integration with the `vscode.git` extension API to programmatically stage files and interact with the commit box.

### 2.3. Idea: Response Annotation and Rating

-   **Problem:** It's difficult to remember why a particular AI response was good or bad, especially when looking back at the history via the Cycle Navigator.
-   **Proposed Solution:**
    1.  **Rating/Annotation UI:** Add a small section to each tab allowing the user to give a thumbs up/down rating and add a short text note (e.g., "Works, but inefficient" or "Best solution, very clean"). This includes highlighting specific sections of code to associate with a comment.
    2.  **Persistence:** These annotations would be saved as part of the `dce_history.json` file, associated with that specific response.
    3.  **Benefit:** When navigating back through cycles, these notes would provide valuable context about the quality and outcome of each AI suggestion, enhancing the "knowledge graph" of the project.
-   **Technical Notes:** This requires extending the data model in `A39` and adding the corresponding UI elements and state management.
</file_artifact>

<file path="src/Artifacts/A41.2. DCE - Phase 2 - Feature Ideation & Competitive Analysis.md">
# Artifact A41.2: DCE - Phase 2 - Feature Ideation & Competitive Analysis
# Date Created: C71
# Author: AI Model
# Updated on: C71 (Incorporate user feedback from C71)

- **Key/Value for A0:**
- **Description:** An analysis of similar AI coding assistant tools (e.g., Cursor.sh, Copilot Chat) and a brainstorm of potential advanced features for the Parallel Co-Pilot panel.
- **Tags:** feature plan, phase 2, research, competitive analysis, ideation, roadmap

## 1. Overview & Goal

The core vision of the Parallel Co-Pilot panel is to solve the "single-threaded" limitation of current AI chat interfaces. As we plan its implementation, it's valuable to analyze existing tools to identify best-in-class features and brainstorm new ideas that could give our extension a unique advantage. The goal of this document is to explore this landscape and generate a backlog of potential enhancements for Phase 2 and beyond, incorporating feedback from Cycle 71.

## 2. Competitive Analysis (Incorporating Search Results [1, 2, 3, 4])

### 2.1. GitHub Copilot Chat & Similar Tools
-   **Strengths:** Deeply integrated, understands editor context, uses "slash commands" (`/fix`, `/doc`) for specific intents. [5]
-   **Weakness (Our Opportunity):** Fundamentally a linear, single-threaded chat. Comparing multiple responses to a single prompt is difficult and requires manual copy-pasting. Our parallel tabbed view is a direct solution to this.

### 2.2. Cursor.sh
-   **Strengths:** An "AI-first" fork of VS Code. Has an "AI-diff" feature that applies changes directly in the editor with an intuitive diff view.
-   **Weakness (Our Opportunity):** It's a separate application, not an extension. Users must leave their standard VS Code setup. Our tool integrates into the existing environment. The user has also specified a preference for a whole-file workflow over Cursor's chunk-based edits.

### 2.3. AI Toolkit for Visual Studio Code
-   **Strengths:** This is the most conceptually similar tool found. It explicitly supports a "Bulk Run" feature to execute prompts across multiple models simultaneously and a "Compare" view to see results side-by-side. [1, 2]
-   **Weakness (Our Opportunity):** While it excels at comparison, its workflow for *testing* the code within the user's live project is not as streamlined. Our "Swap" feature provides an immediate, integrated test loop that appears to be a unique advantage.

## 3. Brainstormed Feature Enhancements for DCE (Refined with C71 Feedback)

This is a backlog of potential features for the Parallel Co-Pilot panel, inspired by the analysis and our project's unique goals.

| Feature ID | Feature Name | Description | Priority |
| :--- | :--- | :--- | :--- |
| **P2-F01** | **Inline Diff View** | Instead of a blind "swap", clicking a button opens a diff view within the tab, comparing the AI response to the source file. The user can then accept the full change. | High |
| **P2-F02** | **AI Refinement Actions (Intent Buttons)** | Per user feedback, each tab will have a small toolbar with **buttons** like "Add Docs," "Find Bugs," or "Refactor." Clicking one sends the tab's content back to the LLM with that specific instruction, replacing the content with the refined response. | High |
| **P2-F03** | **Model Selection Per Tab** | Allow the user to select a different backend LLM (e.g., Gemini, Claude, Local URL) for each tab. This requires the API Key Management feature from `A41`. | Medium |
| **P2-F04** | **"Accept Response" Workflow** | Formalize the user's feedback. The "Swap" button is for temporary, iterative testing. A separate, explicit **"Accept Response"** button will permanently overwrite the source file, signifying the end of that iteration for that file. | High |
| **P2-F05** | **Response Annotation & Rating** | A feature the user liked: Add UI for thumbs up/down, short text notes, and tags (e.g., "works", "buggy"). This metadata is saved with the cycle history, enhancing the knowledge graph. | Medium |
| **P2-F06** | **Highlight-to-Context** | Allow a user to highlight a block of code in the main editor, right-click, and select "Send to Parallel Co-Pilot". This would open a new tab in the panel, pre-filled with the highlighted code. | Medium |
| **P2-F07** | **Ephemeral "Cycles Context" Field** | Per user feedback, add a separate text field for temporary context (e.g., error logs). This content is included in the prompt for the current cycle but is NOT saved to the permanent `dce_history.json` to prevent token bloat over time. | High |
</file_artifact>

<file path="src/Artifacts/A42. DCE - Phase 2 - Initial Scaffolding Deployment Script.md">
# Artifact A42: DCE - Phase 2 - Initial Scaffolding Deployment Script
# Date Created: C72
# Author: AI Model
# Updated on: C73 (Flesh out script with full placeholder content)

- **Key/Value for A0:**
- **Description:** Contains a Node.js script that, when executed, creates the file and directory structure for the Phase 2 Parallel Co-Pilot panel.
- **Tags:** deployment, script, scaffolding, bootstrap, nodejs, automation, phase 2

## 1. Overview

This artifact contains the `deploy_phase2_scaffold.js` script. Its purpose is to automate the creation of the new files and directories required for Phase 2, as outlined in `A40. DCE - Phase 2 - Parallel Co-Pilot - Target File Structure`. This ensures a consistent setup for starting development on the new features.

## 2. How to Use

1.  Save the code below as `deploy_phase2_scaffold.js` in your project's root directory (e.g., `C:\Projects\DCE\`).
2.  Open a terminal in that directory.
3.  Run the script using Node.js: `node deploy_phase2_scaffold.js`
4.  The script will create the new directories and placeholder files, logging its progress to the console.

## 3. Script: `deploy_phase2_scaffold.js`

```javascript
const fs = require('fs').promises;
const path = require('path');

// --- File Content Definitions ---

const filesToCreate = [
    {
        path: 'src/backend/services/history.service.ts',
        content: `// src/backend/services/history.service.ts
import * as vscode from 'vscode';
import { Services } from './services';

// Basic structure for history data
interface CycleResponse {
    responseId: string;
    model: string;
    content: string;
}

interface Cycle {
    cycleId: string;
    timestamp: string;
    prompt: string;
    responses: CycleResponse[];
}

interface HistoryFile {
    version: number;
    cycles: Cycle[];
}

export class HistoryService {
    private historyFilePath: string | undefined;

    constructor() {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            this.historyFilePath = path.join(workspaceFolders.uri.fsPath, '.vscode', 'dce_history.json');
        }
    }

    private async _readHistoryFile(): Promise<HistoryFile> {
        if (!this.historyFilePath) return { version: 1, cycles: [] };
        try {
            const content = await vscode.workspace.fs.readFile(vscode.Uri.file(this.historyFilePath));
            return JSON.parse(Buffer.from(content).toString('utf-8'));
        } catch (error) {
            Services.loggerService.warn("dce_history.json not found or is invalid. A new one will be created.");
            return { version: 1, cycles: [] };
        }
    }

    private async _writeHistoryFile(data: HistoryFile): Promise<void> {
        if (!this.historyFilePath) return;
        const dir = path.dirname(this.historyFilePath);
        try {
            await vscode.workspace.fs.createDirectory(vscode.Uri.file(dir));
            const content = Buffer.from(JSON.stringify(data, null, 2), 'utf-8');
            await vscode.workspace.fs.writeFile(vscode.Uri.file(this.historyFilePath), content);
        } catch (error) {
            Services.loggerService.error(\`Failed to write to dce_history.json: \${error}\`);
        }
    }

    public async getCycleHistory() {
        Services.loggerService.log("HistoryService: getCycleHistory called.");
        const history = await this._readHistoryFile();
        return history.cycles.map(c => c.cycleId).sort(); // Return sorted list of cycle IDs
    }
}
`
    },
    {
        path: 'src/client/views/parallel-copilot.view/index.ts',
        content: `// src/client/views/parallel-copilot.view/index.ts
import { onMessage } from "./on-message";

export const viewConfig = {
    entry: "parallelCopilotView.js",
    type: "viewType.sidebar.parallelCopilot",
    handleMessage: onMessage,
};
`
    },
    {
        path: 'src/client/views/parallel-copilot.view/on-message.ts',
        content: `// src/client/views/parallel-copilot.view/on-message.ts
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { Services } from "@/backend/services/services";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const loggerService = Services.loggerService;
    loggerService.log("Parallel Co-Pilot view message handler initialized.");

    // TODO: Add message handlers for Phase 2 features
    // e.g., serverIpc.onClientMessage(ClientToServerChannel.RequestSwapFileContent, ...)
}
`
    },
    {
        path: 'src/client/views/parallel-copilot.view/view.scss',
        content: `/* Styles for Parallel Co-Pilot View */
body {
    padding: 0;
    font-family: var(--vscode-font-family);
    font-size: var(--vscode-font-size);
    color: var(--vscode-editor-foreground);
    background-color: var(--vscode-sideBar-background);
}

.pc-view-container {
    padding: 8px;
    display: flex;
    flex-direction: column;
    height: 100vh;
    gap: 8px;
}

.cycle-navigator {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--vscode-panel-border);
}

.tab-bar {
    display: flex;
    border-bottom: 1px solid var(--vscode-panel-border);
}

.tab {
    padding: 6px 12px;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    color: var(--vscode-tab-inactiveForeground);
}

.tab.active {
    color: var(--vscode-tab-activeForeground);
    border-bottom-color: var(--vscode-tab-activeBorder);
}

.tab-content {
    padding-top: 8px;
}
`
    },
    {
        path: 'src/client/views/parallel-copilot.view/view.tsx',
        content: `// src/client/views/parallel-copilot.view/view.tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

const App = () => {
    const [activeTab, setActiveTab] = React.useState(1);
    const tabCount = 4; // Example tab count

    return (
        <div className="pc-view-container">
            <div className="cycle-navigator">
                <span>Cycle:</span>
                <button><VscChevronLeft /></button>
                <span>C73</span>
                <button><VscChevronRight /></button>
            </div>
            
            <div className="tab-bar">
                {[...Array(tabCount)].map((_, i) => (
                    <div 
                        key={i} 
                        className={\`tab \${activeTab === i + 1 ? 'active' : ''}\`}
                        onClick={() => setActiveTab(i + 1)}
                    >
                        Response {i + 1}
                    </div>
                ))}
            </div>

            <div className="tab-content">
                {[...Array(tabCount)].map((_, i) => (
                    activeTab === i + 1 && <div key={i}>Content for Response {i + 1}</div>
                ))}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
`
    },
];

// --- Main Execution ---

async function deployScaffold() {
    console.log('Starting Phase 2 scaffold deployment...');
    const rootDir = process.cwd();

    for (const file of filesToCreate) {
        const fullPath = path.join(rootDir, file.path);
        const dir = path.dirname(fullPath);

        try {
            await fs.mkdir(dir, { recursive: true });
            await fs.writeFile(fullPath, file.content, 'utf-8');
            console.log(`✅ Created: ${file.path}`);
        } catch (error) {
            console.error(`❌ Failed to create ${file.path}: ${error.message}`);
        }
    }

    console.log('\\n🚀 Phase 2 scaffold deployment complete! 🚀');
    console.log('Next steps:');
    console.log('1. Review and apply changes to package.json, webpack.config.js, src/client/views/index.ts, and src/common/view-types.ts.');
    console.log('2. Update services.ts to instantiate and provide the new HistoryService.');
}

deployScaffold();
```
</file_artifact>

<file path="src/Artifacts/A43. DCE - Phase 2 - Implementation Roadmap.md">
# Artifact A43: DCE - Phase 2 - Implementation Roadmap
# Date Created: C72
# Author: AI Model
# Updated on: C87 (Promote Persistence and Diffing, defer advanced UI)

- **Key/Value for A0:**
- **Description:** Provides a step-by-step implementation plan for building the Phase 2 features, including the Parallel Co-Pilot panel and the integrated Diff Tool.
- **Tags:** feature plan, phase 2, roadmap, project plan, diff tool

## 1. Overview & Goal

This document provides a clear, step-by-step roadmap for the implementation of Phase 2. The scope of Phase 2 is now defined as the **Parallel Co-Pilot Panel with state persistence and an integrated Diff Tool**. This roadmap breaks the large feature set into smaller, manageable, and testable steps. The goal is to build the functionality incrementally, ensuring a stable foundation at each stage.

## 2. Implementation Steps

### Step 1: Foundational UI & State Persistence (Highest Priority)

-   **Goal:** Create a functional UI for the PCPP where all user input is saved and restored reliably.
-   **Tasks:**
    1.  **Scaffolding & Config:** Ensure all files from `A42` are in place and correctly configured in `package.json`, `webpack.config.js`, etc.
    2.  **UI Development (`view.tsx`):**
        *   Build the static React components for the panel based on the updated mockup in `A35`.
        *   **Crucially, re-add the "Cycle Context" and "Ephemeral Context" text areas to fix the C87 regression.**
    3.  **Backend (`history.service.ts`):** Implement the core logic to read from and write to the `.vscode/dce_history.json` file.
    4.  **State Sync Loop:** Implement the full persistence loop. Changes in the frontend UI trigger a debounced `SaveCycleData` IPC message. The backend `HistoryService` updates the JSON file.
-   **Outcome:** A visible panel where any text typed into any field is saved and restored when the panel is closed and reopened or moved to a new window.

### Step 2: Cycle Navigator

-   **Goal:** Enable navigation through the persistent history created in Step 1.
-   **Tasks:**
    1.  **IPC:** Implement the `RequestCycleHistoryList` and `RequestCycleData` channels.
    2.  **Frontend (`view.tsx`):**
        *   On load, fetch the list of all cycle IDs to determine the valid range for navigation (`1` to `maxCycleId`).
        *   Wire the `<` and `>` buttons to change the `currentCycleId` state.
        *   Create a `useEffect` hook that listens for changes to `currentCycleId` and requests the corresponding data from the backend.
        *   The handler for `SendCycleData` will update the entire panel's state with the historical data.
-   **Outcome:** The user can click the back and forward buttons to load and view the complete state of the PCPP from previous cycles.

### Step 3: File Association and Diffing

-   **Goal:** Implement the ability to see a diff for any file mentioned in an AI response.
-   **Tasks:**
    1.  **Add Dependency:** Add the `diff` library to `package.json`.
    2.  **UI (`view.tsx`):**
        *   Implement the "Associated Files" list UI element. It will be populated by the `detectedFiles` state, which is already being parsed.
        *   Make each file in the list a clickable button.
    3.  **IPC:** Create a `RequestFileContent` channel.
    4.  **Backend (`fs.service.ts`):** Implement a handler that reads a file's content and sends it back.
    5.  **Component (`DiffViewer.tsx`):** Create a new component that takes two strings and renders a side-by-side or inline diff.
    6.  **Workflow:** Clicking a file in the list sends `RequestFileContent`. When the content arrives, the frontend shows the `DiffViewer` component (e.g., in a modal) with the original content and the content from the AI response.
-   **Outcome:** The user can paste a response and immediately get a clear, color-coded view of the changes being proposed for any file.

### Step 4: Core "Swap" Functionality

-   **Goal:** Implement the "Swap with Source" feature.
-   **Tasks:**
    1.  **IPC Channels:** Implement `RequestSwapFileContent`.
    2.  **Backend (`fs.service.ts`):** Implement the `handleSwapFileContentRequest` method.
    3.  **Frontend (`view.tsx`):** Wire up the "Swap" button to trigger the IPC message.
-   **Outcome:** The user can test AI-generated code in their workspace with a single click.

### Step 5: Advanced Features (Future Cycles)

-   **Goal:** Implement remaining features from the vision.
-   **Tasks:**
    *   Annotation and Rating (Comments, Thumbs Up/Down).
    *   Live API Integration (The new Phase 3).
    *   Advanced UI from `A50` (Resizable panes, inner editors).
</file_artifact>

<file path="src/Artifacts/A44. DCE - Phase 1 - Word Document Handling Strategy.md">
# Artifact A44: DCE - Phase 1 - Word Document Handling Strategy
# Date Created: C73
# Author: AI Model
# Updated on: C81 (Add handling for corrupted .docx files)

- **Key/Value for A0:**
- **Description:** Defines the strategy for handling Word document files (.docx) by converting them to text on-demand and caching them in memory for flattening.
- **Tags:** feature plan, docx, text extraction, virtualization, cache, phase 1

## 1. Overview & Goal

To further expand the data curation capabilities of the extension, users need to be able to include the content of Microsoft Word documents (`.docx`). Following the successful virtualization pattern used for PDFs and Excel files, the goal is to extract text from Word documents on-demand and hold it in an in-memory cache. This allows their content to be included in the flattened context without creating temporary files in the user's workspace.

## 2. Supported & Unsupported Formats

-   **Supported:** This strategy focuses exclusively on the modern, XML-based **`.docx`** format.
-   **Unsupported:** The legacy binary **`.doc`** format is significantly more complex to parse and is **not supported**. The extension will identify `.doc` files and insert a placeholder in the flattened output rather than attempting to process them.

## 3. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| DOCX-01 | **Include Word Document Text in Context** | As a user, when I check a `.docx` file, I want its text content to be extracted and included in the `flattened_repo.md`, so I can use reports and documents as context for the LLM. | - Checking `.docx` files is allowed. <br> - The token count displayed for the file reflects its extracted text content. <br> - When flattened, the text from the document is included within a `<file>` tag. <br> - No temporary files are created in the user's workspace. |
| DOCX-02 | **Handle Unsupported `.doc` format** | As a user, when I check a legacy `.doc` file, I want the system to acknowledge it but inform me in the output that its content could not be processed, so I am not confused by missing data or corrupted text. | - Checking `.doc` files is allowed. <br> - The token count for `.doc` files remains 0. <br> - When flattened, a clear placeholder comment is included for the `.doc` file, stating that the format is unsupported. |
| DOCX-03 | **Handle Corrupted `.docx` files** | As a user, if I check a `.docx` file that is corrupted or invalid, I want the extension to fail gracefully and show me an error in the UI, so I know the file has a problem. | - The extension attempts to parse the `.docx` file. <br> - If parsing fails due to file corruption (e.g., it's not a valid zip archive), the token count is set to 0. <br> - An error message (e.g., "File may be corrupted") is displayed in the file's tooltip in the UI. <br> - The flattened output includes a comment indicating the failure. |

## 4. Technical Implementation Plan

1.  **Dependency:**
    *   The `mammoth` library will be added to `package.json`. It is a popular and effective library for converting `.docx` files to HTML and raw text.

2.  **Backend (`fs.service.ts`):**
    *   **In-Memory Cache:** A new private cache will be added: `private wordTextCache = new Map<string, { text: string; tokenCount: number }>();`.
    *   **New IPC Handler (`RequestWordToText`):**
        *   This handler will receive a file path. It will first check the cache.
        *   **If `.doc`:** It will cache an "Unsupported Format" message and a token count of 0, then notify the client.
        *   **If `.docx`:** It will read the file buffer and attempt to parse it with `mammoth.extractRawText()`.
        *   **Success:** On success, it will calculate the token count, store the result in the cache, and send the stats to the client.
        *   **Failure:** The `try...catch` block will inspect the error. If the error message indicates a corrupted file (e.g., from `jszip`), it will create a specific, user-friendly error message and send that to the client with a token count of 0.

3.  **Frontend (`view.tsx`):**
    *   **On-Demand Extraction:** The logic for handling checked files and restored selections will be updated to send a `RequestWordToText` message to the backend for `.docx` and `.doc` files.

4.  **Backend (`flattener.service.ts`):**
    *   **Virtual Content Retrieval:** The flattener will retrieve the text from the `wordTextCache` in the `FSService` instead of reading the binary file. It will correctly handle the "Unsupported Format" and "Corrupted File" messages from the cache.
</file_artifact>

<file path="src/Artifacts/A45. DCE - Phase 2 - Pop-out Co-Pilot Window - Feature Plan.md">
# Artifact A45: DCE - Phase 2 - Pop-out Co-Pilot Window - Feature Plan
# Date Created: C76
# Author: AI Model
# Updated on: C78 (Reflect implementation of WebviewPanel)

- **Key/Value for A0:**
- **Description:** Outlines the technical strategy to allow the Parallel Co-Pilot panel to be "popped out" into a separate window by re-implementing it as a main editor WebviewPanel.
- **Tags:** feature plan, phase 2, pop-out, window, webview, ux

## 1. Overview & Goal

The Parallel Co-Pilot panel is designed for intensive, side-by-side comparison of code, a task that benefits greatly from maximum screen real estate. Many developers use multiple monitors and would prefer to move this panel to a secondary display. The goal of this feature is to enable the user to "pop out" the Parallel Co-Pilot panel into its own floating window.

## 2. Problem & Proposed Solution

A direct `popOut()` API for a sidebar webview does not exist in the VS Code extension API. The most robust and user-friendly way to achieve this is to leverage a native VS Code feature: users can drag any editor tab into its own floating window.

Therefore, the proposed solution is to **re-architect the Parallel Co-Pilot from a sidebar view (`WebviewViewProvider`) into a main editor view (`WebviewPanel`)**.

### 2.1. User Experience Flow

1.  The user runs the `DCE: Open Parallel Co-Pilot` command from the Command Palette or clicks the icon in the Activity Bar.
2.  Instead of opening in the sidebar, the Parallel Co-Pilot panel opens as a new tab in the main editor group.
3.  The user can then click and drag this tab out of the main VS Code window, and it will become its own floating window, which can be moved to another monitor.

## 3. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-WIN-01 | **Open Co-Pilot in Main Editor**| As a developer, I want a command or button to open the Parallel Co-Pilot panel in a main editor tab, so I have more horizontal space to view and compare responses. | - A command `DCE: Open Parallel Co-Pilot` exists. <br> - An icon in the activity bar triggers this command. <br> - Executing the command opens a new editor tab containing the full Co-Pilot UI. <br> - If the panel is already open, the command brings it into focus. |
| P2-WIN-02 | **Move Co-Pilot to New Window** | As a developer with multiple monitors, after opening the Co-Pilot in an editor tab, I want to drag that tab out of my main VS Code window to turn it into a separate, floating window, so I can place it on my second monitor. | - The Co-Pilot editor tab behaves like any other editor tab. <br> - It can be dragged to create new editor groups or dragged outside the main window to create a new floating window. |

## 4. Technical Implementation Plan (C78)

This is a significant architectural change that has been implemented.

1.  **Remove Sidebar Contribution (`package.json`):**
    *   The `dce-parallel-copilot` entry in `contributes.viewsContainers.activitybar` still exists to provide an entry point icon, but the view is no longer directly registered under `contributes.views`.

2.  **Create a `WebviewPanel` (`extension.ts`):**
    *   A new command, `dce.openParallelCopilot`, is registered.
    *   A module-level variable (`private static parallelCopilotPanel: vscode.WebviewPanel | undefined;`) is used to track the panel's instance, ensuring only one can exist.
    *   When the command is executed, it checks if the panel already exists. If so, it calls `panel.reveal()`.
    *   If not, it calls `vscode.window.createWebviewPanel`. This creates the webview in an editor tab.
    *   The panel's `onDidDispose` event is used to clear the static instance variable.
    *   The logic for setting the webview's HTML, options, and message handlers is now managed within this command's callback.

3.  **State Management:**
    *   Because the panel is now created on-demand, its state (tab content, cycle number) must be managed in a backend service to be restored if the panel is closed and reopened. This is a future enhancement. For now, the state is ephemeral to the panel's lifecycle.
</file_artifact>

<file path="src/Artifacts/A46. DCE - Phase 2 - Paste and Parse Response - Feature Plan.md">
# Artifact A46: DCE - Phase 2 - Paste and Parse Response - Feature Plan
# Date Created: C76
# Author: AI Model

- **Key/Value for A0:**
- **Description:** Details the plan for allowing users to paste a full AI response into a tab, which the extension will then parse to identify file paths referenced within XML tags.
- **Tags:** feature plan, phase 2, paste, parse, workflow, automation

## 1. Overview & Goal

The manual workflow for using the Parallel Co-Pilot involves copying an entire AI response and pasting it into one of the response tabs. These responses often contain multiple file updates, each wrapped in XML-like tags (e.g., `<file path="...">...</file>`). The goal of this feature is to make the extension "intelligent" about this pasted content. It should automatically parse the text, identify the files being modified, and associate them with the response tab.

## 2. User Story

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-PARSE-01 | **Parse Pasted Content** | As a developer, when I paste a full AI response into a tab, I want the extension to automatically detect the file paths mentioned in the `<file>` tags, so I can see a list of affected files and use them for "Swap" and "Diff" operations. | - Pasting text into a response tab's editor triggers a parsing event. <br> - The extension uses a regular expression to find all occurrences of `<file path="...">`. <br> - The extracted file paths are stored in the state for that tab. <br> - The UI for the tab is updated to display the list of detected files. |
| P2-PARSE-02 | **Set Primary Source File** | As a developer, after pasting a response with multiple files, I want the first file detected to be automatically set as the primary "source file" for the "Swap" and "Diff" actions, so I don't have to select it manually. | - After parsing, if the tab's `sourceFilePath` is not already set, it is automatically populated with the path of the first file found in the pasted content. <br> - The metadata table (comparing original vs. response) updates accordingly. |

## 3. Technical Implementation Plan

1.  **Frontend Logic (`parallel-copilot.view/view.tsx`):**
    *   **Event Handler:** An `onPaste` event handler will be added to the `<textarea>` or code editor component for each tab.
    *   **Parsing Function:** A new utility function, `parseFilePathsFromResponse(text: string): string[]`, will be created.
        *   It will use a regular expression: `/<file path="([^"]+)">/g`.
        *   It will execute this regex on the input text to extract all captured file paths.
    *   **State Update:**
        *   Inside the `onPaste` handler, it will call `event.clipboardData.getData('text')` to get the pasted content.
        *   It will pass this content to the `parseFilePathsFromResponse` function.
        *   The resulting array of paths will be stored in the state for the active tab (e.g., in a new `detectedFiles: string[]` property).
        *   If the tab's primary `sourceFilePath` is empty, it will be set to the first path in the array.

2.  **UI Update (`parallel-copilot.view/view.tsx`):**
    *   A new UI element will be added to each tab's content area.
    *   It will conditionally render if `detectedFiles` has items.
    *   It will display a list of the detected file paths, perhaps as clickable links that could set the active `sourceFilePath` for the tab.

3.  **No Backend Changes:** This feature is entirely a frontend concern, involving UI event handling, string parsing, and state management within the React component.
</file_artifact>

<file path="src/Artifacts/A47. DCE - Phase 2 - Prompt Amalgamation Feature Plan.md">
# Artifact A47: DCE - Phase 2 - Prompt Amalgamation Feature Plan
# Date Created: C82
# Author: AI Model

- **Key/Value for A0:**
- **Description:** Details the plan for a "Generate prompt.md" button that will assemble the static schemas, cycle history, and flattened code into a single, complete prompt file.
- **Tags:** feature plan, phase 2, prompt engineering, automation, workflow

## 1. Overview & Goal

The process of constructing the final `prompt.md` file is a core part of the curator's workflow. It involves manually assembling several distinct pieces of content: static schemas, the cycle history, and the dynamically generated `flattened_repo.md`. This is a repetitive and error-prone task. The goal of this feature is to automate this process with a single button click, generating a complete, perfectly formatted `prompt.md` file on demand.

## 2. User Story

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-PROMPT-01 | **Generate Complete Prompt** | As a curator, I want to click a button to generate a complete `prompt.md` file that includes all my standard schemas, the project's cycle history, and the latest flattened code, so I can start my next development cycle with zero manual setup. | - A "Generate `prompt.md`" button is available in the Parallel Co-Pilot Panel UI. <br> - A "Cycle Title" input field is available next to the cycle navigator. <br> - Clicking the button creates or overwrites `prompt.md` in the workspace root. <br> - The generated file has the correct structure: static schemas, then the dynamic cycle overview, then the content of `flattened_repo.md`. <br> - The cycle overview is built from the `dce_history.json` file and includes the title from the new input field. |

## 3. Technical Implementation Plan

1.  **UI (`parallel-copilot.view/view.tsx`):**
    *   Add a "Generate `prompt.md`" button to the main header toolbar.
    *   Add a new state variable and a corresponding `<input type="text">` element for the "Cycle Title" next to the cycle navigator.
    *   The button's `onClick` handler will send a new IPC message to the backend.

2.  **IPC Channels:**
    *   `ClientToServerChannel.RequestCreatePromptFile`: Payload will be `{ cycleTitle: string, currentCycle: number }`.

3.  **Backend (New `prompt.service.ts`):**
    *   Create a new `PromptService` to encapsulate the logic.
    *   **Static Templates:** The service will contain private string constants holding the content for `<M1. artifact schema>`, `<M3. Interaction Schema>`, and `<M4. current project scope>`.
    *   **`generatePromptFile` Method:** This method will be the core of the service.
        1.  It will receive the `cycleTitle` and `currentCycle` from the IPC message.
        2.  It will read the `dce_history.json` file (using `HistoryService`) to build the `<M2. cycle overview>` section dynamically.
        3.  It will read the entire content of `flattened_repo.md`.
        4.  It will assemble these strings in the correct order into a single, large string.
        5.  It will write this final string to `prompt.md` in the workspace root using `vscode.workspace.fs.writeFile`.
        6.  It will show a `showInformationMessage` to confirm completion.

4.  **Integration:**
    *   The new `PromptService` will be instantiated in `services.ts`.
    *   A new handler for `RequestCreatePromptFile` will be added to the `on-message.ts` for the Parallel Co-Pilot view, which will call the `PromptService`.
</file_artifact>

<file path="src/Artifacts/A48. DCE - Phase 2 - Advanced Syntax Highlighting Plan.md">
# Artifact A48: DCE - Phase 2 - Advanced Syntax Highlighting Plan
# Date Created: C82
# Author: AI Model
# Updated on: C90 (Update plan to reflect implementation)

## 1. Overview & Goal

AI-generated responses are complex documents, containing both explanatory Markdown text and code blocks in various languages. A plain `<textarea>` element does not provide any syntax highlighting, making these responses difficult to read and analyze. The goal of this feature is to significantly enhance the readability of AI responses by replacing the textareas with a proper code editor component that can provide rich, language-aware syntax highlighting.

## 2. User Story

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-SYNTAX-01 | **View Highlighted Responses** | As a developer, I want to see AI responses with full syntax highlighting inside the Parallel Co-Pilot tabs, so I can easily distinguish between comments, keywords, and code, just like in a real editor. | - The content area of each response tab renders with syntax highlighting. <br> - Standard Markdown elements (headers, lists, bold, italics, backticks) are formatted correctly. <br> - Code blocks (e.g., ` ```typescript ... ``` `) are highlighted with the correct grammar for the specified language. <br> - The highlighting should be theme-aware, matching the user's current VS Code theme. |

## 3. Technical Implementation Strategy (C90)

### 3.1. Chosen Library: `starry-night`

After research and consideration of alternatives like `refractor`, **`@wooorm/starry-night`** is the chosen library for syntax highlighting.

-   **Rationale (C85):**
    -   **High Fidelity:** It uses the same TextMate grammars as VS Code itself. This is the most important factor, as it ensures the highlighting in our panel will be a perfect visual match to the user's native editor experience.
    -   **Backend Architecture:** Our implementation performs highlighting on the backend (in the Node.js extension host) and sends pre-rendered HTML to the frontend webview. This means the primary drawback of `starry-night`—its large bundle size—is a non-issue for the client. The "heavy lifting" is done by the extension's server-side process, keeping the webview lightweight and performant.

### 3.2. Implementation Plan

1.  **Dependencies (`package.json`):**
    *   `@wooorm/starry-night` is the core backend dependency.
    *   `hast-util-to-html` is used to convert the abstract syntax tree to an HTML string.
    *   `react-markdown` is added as a frontend dependency to handle the rendering of non-code markdown content (lists, bold, etc.).

2.  **Backend (`fs.service.ts`):**
    *   The `handleSyntaxHighlightRequest({ code, lang, id })` method is implemented.
    *   It initializes `starry-night` with a set of common grammars.
    *   It uses `starryNight.highlight(code, scope)` where `scope` is determined from the language identifier (e.g., 'typescript' -> 'source.ts').
    *   It converts the resulting `hast` tree to an HTML string using `toHtml`.
    *   This HTML string is sent back to the client via the `SendSyntaxHighlight` IPC channel, including the `id` to match the request.

3.  **IPC Channels:**
    *   `ClientToServerChannel.RequestSyntaxHighlight`: Payload `{ code: string; lang: string, id: string }`.
    *   `ServerToClientChannel.SendSyntaxHighlight`: Payload `{ highlightedHtml: string, id: string }`.

4.  **Frontend (`parallel-copilot.view/view.tsx`):**
    *   After a response is parsed into `parsedContent`, the view iterates through `parsedContent.files`.
    *   For each file block, it sends a `RequestSyntaxHighlight` message to the backend.
    *   A state map (`highlightedCodeBlocks: Map<string, string>`) caches the HTML returned from the backend.
    *   The component that renders the file's code uses `dangerouslySetInnerHTML` to display the highlighted HTML.
    *   The `summary` and `courseOfAction` sections are rendered using the `<ReactMarkdown>` component to display formatted text.
</file_artifact>

<file path="src/Artifacts/A49. DCE - Phase 2 - File Association & Diffing Plan.md">
# Artifact A49: DCE - Phase 2 - File Association & Diffing Plan
# Date Created: C82
# Author: AI Model
# Updated on: C27 (Deprecate custom diff viewer in favor of native integration)

- **Key/Value for A0:**
- **Description:** Plans the UI and backend logic to visually link file blocks in an AI response to workspace files and sets the stage for an integrated diff tool.
- **Tags:** feature plan, phase 2, ui, ux, diff, file association

## 1. Overview & Goal

To make the Parallel Co-Pilot Panel's workflow trustworthy and intuitive, users need a clear visual confirmation of which local file an AI-generated code block is intended to modify. This feature introduces a "file association" mechanism that parses AI responses, verifies the existence of the mentioned files, and displays this status to the user.

**Update (C27):** The custom, integrated diff viewer has been **deprecated**. It is being replaced by an integration with VS Code's native diff viewer (`vscode.diff`), as detailed in `A88. DCE - Native Diff Integration Plan.md`. This provides a superior user experience with all the features of the native editor.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-ASSOC-01 | **See Affected Files** | As a developer, when I parse an AI response, I want the extension to automatically show me a list of all the file paths it intends to modify, so I can understand the scope of the proposed changes. | - After parsing, a collapsible "Associated Files" section appears in the tab's UI. <br> - This section displays a list of all file paths found in the response. |
| P2-ASSOC-02 | **Verify File Existence** | As a developer, for each file listed, I want to see a visual indicator of whether that file already exists in my workspace, so I can spot potential errors or new files proposed by the AI. | - Next to each listed file path, an icon is displayed. <br> - A green checkmark (`✓`) indicates the file exists at that path. <br> - A red cross (`✗`) indicates the file does not exist. |
| P2-ASSOC-03 | **Preview Changes with Native Diff** | As a developer, I want an "Open Changes" button to see a side-by-side comparison of the original file and the AI's proposed changes in a native VS Code diff tab, so I can review the exact changes before accepting them. | - An "Open Changes" icon appears on hover for each existing file in the "Associated Files" list. <br> - Clicking it opens a new editor tab showing the native VS Code diff view. <br> - The right side shows the current content of the workspace file. <br> - The left side shows the AI-generated content from the response tab. |
| P2-ASSOC-04 | **Accept Changes** | As a developer, I want to be able to accept changes from the AI response into my workspace, either for a single file or for a batch of selected files. | - An "Accept this file" button replaces the content of the workspace file with the AI's version. <br> - A separate "Accept Selected Files" button performs a bulk replacement for all files checked in the "Associated Files" list. <br> - This is a one-way copy from the AI response to the workspace. |

## 3. Technical Implementation Plan

1.  **Frontend - Parsing (`response-parser.ts`):**
    *   **Status:** **Complete.**

2.  **Backend - Verification & Highlighting (`file-operation.service.ts`, `highlighting.service.ts`):**
    *   **Status:** **Complete.** The `handleFileExistenceRequest` and `handleSyntaxHighlightRequest` handlers are working.

3.  **Frontend - UI & State (`view.tsx`):**
    *   **Status:** **In Progress.**
    *   **File List & Native Diff:** Implement the "Associated Files" list. An "Open Changes" button on each item will trigger the new native diff workflow as outlined in `A88`.
    *   **Selection State:** Manage a `Set<string>` of `selectedFilesForReplacement` to track which files are checked.
    *   **Accept/Replace Logic:**
        *   The "Accept this file" button will trigger a `RequestWriteFile` IPC message.
        *   The "Accept Selected Files" button will trigger a `RequestBatchFileWrite` IPC message with an array of file paths and their new content.

4.  **Backend - File Writing (`file-operation.service.ts`):**
    *   **Status:** **Complete.** `handleWriteFileRequest` and `handleBatchFileWrite` are implemented.
</file_artifact>

<file path="src/Artifacts/A50. DCE - Phase 2 - UI Component Plan (Resizable Panes & Inner Editors).md">
# Artifact A50: DCE - Phase 2 - UI Component Plan (Resizable Panes & Inner Editors)
# Date Created: C87
# Author: AI Model
# Updated on: C112 (Prioritize resizable panes implementation)

- **Key/Value for A0:**
- **Description:** Documents the plan for advanced UI components like resizable panes and nested, scrollable editors within the Parallel Co-Pilot panel.
- **Tags:** feature plan, phase 2, ui, ux, resizable, scrollable, editor

## 1. Overview & Goal

As the Parallel Co-Pilot Panel (PCPP) becomes more feature-rich, its UI needs to be flexible and efficient. This document outlines the plan for two advanced UI components: a **resizable pane** for the summary/code view and a system of **nested, scrollable "inner editors"** for individual file blocks within a response. The goal is to create a highly readable and customizable interface that prevents "endless scrolling" and allows users to focus on the information that matters most to them.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-UI-01 | **Resizable Panes** | As a developer, I want to be able to drag the vertical divider between the summary/file list pane and the code viewer pane, so I can give more space to the view that is most important for my current task. | - A draggable handle exists on the vertical divider between the two main panes in the parsed view. <br> - Clicking and dragging the handle adjusts the relative width of the two panes. <br> - The layout is responsive and does not break during resizing. <br> - The left pane should be collapsible. |
| P2-UI-02 | **Contained File Editors** | As a developer, when viewing a large AI response with multiple files, I want each file's code to be contained within its own fixed-height, scrollable text area, so I can quickly scroll past entire files without having to scroll through all of their content. | - The extension parses the AI response and identifies individual file blocks (e.g., content within `<file>` tags). <br> - Each file block is rendered inside its own container with a fixed `max-height` and `overflow-y: auto`. <br> - This allows the user to scroll through the list of files quickly, only scrolling within a specific file's content when needed. |
| P2-UI-03 | **File-Level Action Buttons** | As a developer, I want action buttons (like "Accept", "Diff", "Comment") to be associated with each individual file block within a response, so I can act on a single file at a time. | - In the "inner editor" view, each file container has its own set of action buttons. <br> - Clicking "Accept" on one file block only affects that specific file, not the entire response. |

## 3. Technical Implementation Plan

### 3.1. Resizable Panes (Priority for C112)

-   **Strategy:** Implement a custom, lightweight resizable pane component directly within `view.tsx`.
-   **Component Logic:**
    *   The main `.parsed-view-grid` will be the flex container.
    *   A new `div` element with a `.resizer` class will be added between the left and right panes to act as the draggable handle.
    *   **State:** A new state variable, `const [leftPaneWidth, setLeftPaneWidth] = useState(33);`, will manage the width of the left pane as a percentage.
    *   **Event Handling:**
        *   The resizer `div` will have an `onMouseDown` handler.
        *   This handler will attach `onMouseMove` and `onMouseUp` listeners to the `window`.
        *   The `onMouseMove` handler will calculate the new percentage width based on `event.clientX` and update the `leftPaneWidth` state, respecting min/max width constraints.
        *   The `onMouseUp` handler will remove the `mousemove` and `mouseup` listeners from the window.
-   **Integration:** The `style` attribute of the left pane will be bound to this state (e.g., `flex-basis: `${leftPaneWidth}%`).

### 3.2. Inner Editors / Contained File Blocks (Future Cycle)

-   **Strategy:** This requires a significant change to how the response content is rendered. Instead of treating the response as a single block of text to be rendered as Markdown, it must be parsed into a structured array of objects.
-   **Parsing Logic (`view.tsx`):**
    -   A new parsing function will take the raw response string and split it into an array of segments, e.g., `[{ type: 'markdown', content: '...' }, { type: 'file', path: '...', content: '...' }, ...]`.
-   **Rendering Logic (`view.tsx`):**
    -   The main render function will map over this array of segments.
    -   If `segment.type === 'markdown'`, it renders the content as before.
    -   If `segment.type === 'file'`, it renders a new component, e.g., `FileBlock.tsx`.
-   **`FileBlock.tsx` Component:**
    -   This component will be responsible for rendering a single file from the AI response.
    -   It will have a header displaying the file path and the file-specific action buttons (Accept, Diff, etc.).
    -   The main content area will be a `div` with CSS properties `max-height: 300px;` (or similar) and `overflow-y: auto;`.
    -   The code content within this `div` will be syntax-highlighted as before.
</file_artifact>

<file path="src/Artifacts/A50. DCE - UI Component Plan (Resizable Panes & Inner Editors).md">
# Artifact A50: DCE - Phase 2 - UI Component Plan (Resizable Panes & Inner Editors)
# Date Created: C87
# Author: AI Model
# Updated on: C116 (Mark resizable pane as implemented)

- **Key/Value for A0:**
- **Description:** Documents the plan for advanced UI components like resizable panes and nested, scrollable editors within the Parallel Co-Pilot panel.
- **Tags:** feature plan, phase 2, ui, ux, resizable, scrollable, editor

## 1. Overview & Goal

As the Parallel Co-Pilot Panel (PCPP) becomes more feature-rich, its UI needs to be flexible and efficient. This document outlines the plan for two advanced UI components: a **resizable pane** for the summary/code view and a system of **nested, scrollable "inner editors"** for individual file blocks within a response. The goal is to create a highly readable and customizable interface that prevents "endless scrolling" and allows users to focus on the information that matters most to them.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-UI-01 | **Resizable Panes** | As a developer, I want to be able to drag the vertical divider between the summary/file list pane and the code viewer pane, so I can give more space to the view that is most important for my current task. | - A draggable handle exists on the vertical divider between the two main panes in the parsed view. <br> - Clicking and dragging the handle adjusts the relative width of the two panes. <br> - The layout is responsive and does not break during resizing. <br> - The left pane should be collapsible. |
| P2-UI-02 | **Contained File Editors** | As a developer, when viewing a large AI response with multiple files, I want each file's code to be contained within its own fixed-height, scrollable text area, so I can quickly scroll past entire files without having to scroll through all of their content. | - The extension parses the AI response and identifies individual file blocks (e.g., content within `<file>` tags). <br> - Each file block is rendered inside its own container with a fixed `max-height` and `overflow-y: auto`. <br> - This allows the user to scroll through the list of files quickly, only scrolling within a specific file's content when needed. |
| P2-UI-03 | **File-Level Action Buttons** | As a developer, I want action buttons (like "Accept", "Diff", "Comment") to be associated with each individual file block within a response, so I can act on a single file at a time. | - In the "inner editor" view, each file container has its own set of action buttons. <br> - Clicking "Accept" on one file block only affects that specific file, not the entire response. |

## 3. Technical Implementation Plan

### 3.1. Resizable Panes (Implemented in C116)

-   **Strategy:** A custom, lightweight resizable pane component was implemented directly within `ParsedView.tsx`.
-   **Component Logic:**
    *   The main `.parsed-view-grid` acts as the flex container.
    *   A `div` element with a `.resizer` class was added between the left and right panes to act as the draggable handle.
    *   **State:** A `leftPaneWidth` state variable in `view.tsx`, persisted in the cycle data, manages the width of the left pane as a percentage.
    *   **Event Handling:**
        *   The resizer `div` has an `onMouseDown` handler that attaches `onMouseMove` and `onMouseUp` listeners to the `window`.
        *   The `onMouseMove` handler calculates the new percentage width based on `event.clientX` and updates the `leftPaneWidth` state, respecting min/max width constraints.
        *   The `onMouseUp` handler removes the `mousemove` and `mouseup` listeners.
-   **Integration:** The `style` attribute of the left pane is bound to this state (`flex-basis: `${leftPaneWidth}%`).

### 3.2. Inner Editors / Contained File Blocks (Future Cycle)

-   **Strategy:** This requires a significant change to how the response content is rendered. Instead of treating the response as a single block of text to be rendered as Markdown, it must be parsed into a structured array of objects.
-   **Parsing Logic (`view.tsx`):**
    -   A new parsing function will take the raw response string and split it into an array of segments, e.g., `[{ type: 'markdown', content: '...' }, { type: 'file', path: '...', content: '...' }, ...]`.
-   **Rendering Logic (`view.tsx`):**
    -   The main render function will map over this array of segments.
    -   If `segment.type === 'markdown'`, it renders the content as before.
    -   If `segment.type === 'file'`, it renders a new component, e.g., `FileBlock.tsx`.
-   **`FileBlock.tsx` Component:**
    -   This component will be responsible for rendering a single file from the AI response.
    -   It will have a header displaying the file path and the file-specific action buttons (Accept, Diff, etc.).
    -   The main content area will be a `div` with CSS properties `max-height: 300px;` (or similar) and `overflow-y: auto;`.
    -   The code content within this `div` will be syntax-highlighted as before.
</file_artifact>

<file path="src/Artifacts/A52. DCE - Interaction Schema Refinement.md">
# Artifact A52: DCE - Interaction Schema Refinement
# Date Created: C110
# Author: AI Model & Curator
# Updated on: C154 (Switch to XML tags for summary and course of action)

- **Key/Value for A0:**
- **Description:** A set of refined rules and an explanation of the parsing logic for the AI's output format to improve the reliability and consistency of automated parsing within the Parallel Co-Pilot Panel.
- **Tags:** documentation, process, parsing, interaction schema, metainterpretability

## 1. Overview & Goal

The Parallel Co-Pilot Panel (PCPP) relies on parsing your output to provide features like file association, diffing, and syntax highlighting. To ensure this process is reliable, your responses must adhere to a strict and consistent format.

The goal of this document is to serve as a definitive guide for you, the AI, on how to structure your responses. It explains the "documentation first" principle we follow and details the exact logic the PCPP parser uses. By understanding how you are being interpreted, you can generate perfectly parsable output every time.

## 2. The "Documentation First" Principle

A core principle of this project is to **plan before coding**.
-   **Cycle 0 (Project Initialization):** Your first task for a new project is **always** to generate planning and documentation artifacts (e.g., A1 Project Vision, A2 Requirements), not code files. You should use the provided templates as a guide.
-   **Subsequent Cycles:** When a new feature is requested, your first step should be to update existing documentation or create new artifacts that describe the plan for that feature. You should only generate code *after* the plan has been documented.

## 3. How the PCPP Parser Works

The parser is designed to be simple and robust. It looks for specific tags to break your response into structured data.

### Step 1: Extract Summary / Plan
-   **Rule:** Your high-level summary, thoughts, or plan must be enclosed in `<summary>...</summary>` tags.
-   **Parser Logic:** The parser captures all text between the opening and closing `summary` tags.

### Step 2: Extract Course of Action
-   **Rule:** Your point-by-point plan must be enclosed in `<course_of_action>...</course_of_action>` tags.
-   **Parser Logic:** The parser captures all text between the opening and closing `course_of_action` tags.

### Step 3: Extract File Blocks
The parser's most important job is to find and extract all file blocks.
-   **Rule:** Every file you generate **must** be enclosed in `<file path="..."></file>` tags.
-   **Example:**
    ```xml
    <file path="src/main.ts">
    // ... content of main.ts
    </file>
    ```
-   **Parser Logic:** The parser looks for the literal string `<file path="` followed by a quoted path, then captures everything until it finds the literal closing string `</file>`. **Any other format will be ignored.**

## 4. Canonical Response Structure

To guarantee successful parsing, every response should follow this structure:

```
<summary>
[High-level summary and analysis of the request.]
</summary>

<course_of_action>
1.  [A detailed, point-by-point plan of the changes you are about to make.]
2.  [Another point in the plan.]
</course_of_action>

<file path="path/to/first/file.ts">
// Full content of the first file...
</file>

<file path="path/to/second/file.md">
# Full content of the second file...
</file>
```
</file_artifact>

<file path="src/Artifacts/A52.1 DCE - Parser Logic and AI Guidance.md">
# Artifact A52.1: DCE - Parser Logic and AI Guidance
# Date Created: C155
# Author: AI Model & Curator
# Updated on: C14 (Make file tag parsing more flexible)

- **Key/Value for A0:**
- **Description:** Provides the literal source code for the response parser and explicit instructions to the AI on how to format its output to ensure successful parsing.
- **Tags:** documentation, process, parsing, metainterpretability, source of truth

## 1. Overview & Goal (Metainterpretability)

This document is included in every prompt to provide you with direct insight into how your responses are parsed. By understanding the exact logic used to interpret your output, you can structure your responses to be perfectly machine-readable, ensuring a smooth and reliable workflow.

The goal is to eliminate parsing failures caused by unexpected formatting. Adhering to this guide is a critical part of the interaction schema.

## 2. The Parser's Source Code

The following TypeScript code is the complete and exact logic used by the Parallel Co-Pilot Panel to parse your responses. It looks for specific XML tags to separate the summary, course of action, and file blocks.

```typescript
// src/client/utils/response-parser.ts
import { ParsedResponse, ParsedFile } from '@/common/types/pcpp.types';

const SUMMARY_REGEX = /<summary>([\s\S]*?)<\/summary>/;
const COURSE_OF_ACTION_REGEX = /<course_of_action>([\s\S]*?)<\/course_of_action>/;
const CURATOR_ACTIVITY_REGEX = /<curator_activity>([\s\S]*?)<\/curator_activity>/;
// C14 Update: More flexible closing tag matching
const FILE_TAG_REGEX = /<file path="([^"]+)">([\s\S]*?)(?:<\/file_path>|<\/file>|<\/filepath>|<\/file_artifact>)/g;
const CODE_FENCE_START_REGEX = /^\s*```[a-zA-Z]*\n/;

export function parseResponse(rawText: string): ParsedResponse {
    const fileMap = new Map<string, ParsedFile>();
    let totalTokens = 0;

    let processedText = rawText.replace(/\\</g, '<').replace(/\\>/g, '>').replace(/\\_/g, '_');

    const tagMatches = [...processedText.matchAll(FILE_TAG_REGEX)];

    if (tagMatches.length === 0 && processedText.includes('<file path')) {
        const summary = `**PARSING FAILED:** Could not find valid \`<file path="...">...</file_artifact>\` (or similar) tags. The response may be malformed or incomplete. Displaying raw response below.\n\n---\n\n${processedText}`;
        return { summary, courseOfAction: '', filesUpdated: [], files: [], totalTokens: Math.ceil(processedText.length / 4) };
    }

    for (const match of tagMatches) {
        const path = (match?. ?? '').trim();
        let content = (match?. ?? '');

        if (path) {
            content = content.replace(CODE_FENCE_START_REGEX, '');
            // C14 Update: Add new tags to the removal list
            const patternsToRemove = [`</file_artifact>`, `</file_path>`, `</filepath>`, `</file>`, `</${path}>`, '```', '***'];
            let changed = true;
            while(changed) {
                const originalContent = content;
                for (const pattern of patternsToRemove) {
                    if (content.trim().endsWith(pattern)) {
                        content = content.trim().slice(0, -pattern.length);
                    }
                }
                if (content === originalContent) { changed = false; }
            }
            content = content.trim();
            const tokenCount = Math.ceil(content.length / 4);
            fileMap.set(path, { path, content, tokenCount });
        }
    }

    const finalFiles = Array.from(fileMap.values());
    totalTokens = finalFiles.reduce((sum, file) => sum + file.tokenCount, 0);

    const summaryMatch = processedText.match(SUMMARY_REGEX);
    const courseOfActionMatch = processedText.match(COURSE_OF_ACTION_REGEX);
    const curatorActivityMatch = processedText.match(CURATOR_ACTIVITY_REGEX);

    const summary = (summaryMatch?.[1] ?? 'Could not parse summary.').trim();
    const courseOfAction = (courseOfActionMatch?.[1] ?? 'Could not parse course of action.').trim();
    const curatorActivity = (curatorActivityMatch?.[1] ?? '').trim();
    
    const filesUpdatedList = finalFiles.map(f => f.path);

    if (finalFiles.length === 0 && !summaryMatch && !courseOfActionMatch && !curatorActivityMatch) {
        return { summary: processedText, courseOfAction: '', filesUpdated: [], files: [], totalTokens: Math.ceil(processedText.length / 4) };
    }

    return {
        summary,
        courseOfAction,
        curatorActivity,
        filesUpdated: [...new Set(filesUpdatedList)],
        files: finalFiles,
        totalTokens,
    };
}
```

## 3. Critical Instructions for Formatting Your Response

To guarantee successful parsing, every response **must** follow this structure:

1.  **Summary:** Your high-level analysis and plan must be enclosed in `<summary>...</summary>` tags.
2.  **Course of Action:** Your point-by-point plan must be enclosed in `<course_of_action>...</course_of_action>` tags.
3.  **File Blocks:** Every file you generate must be enclosed in `<file path="..."></file_artifact>` tags (or a similar valid closing tag). The parser uses a global regex (`/g`) to find all occurrences of this pattern. The closing tag can be `</file_artifact>`, `</file_path>`, `</filepath>`, or `</file>`.

### Canonical Example:

```
<summary>
I have analyzed the request. My course of action is to update the main component and its corresponding stylesheet.
</summary>

<course_of_action>
1.  **Update `view.tsx`:** Add a new state variable and a button.
2.  **Update `view.scss`:** Add styling for the new button.
</course_of_action>

<file path="src/client/views/my-view/view.tsx">
// (Canonical Example) Full content of the view.tsx file...
</file_artifact>

<file path="src/client/views/my-view/view.scss">
/* (Canonical Example) Full content of the view.scss file... */
</file_artifact>
```
</file_artifact>

<file path="src/Artifacts/A52.2 DCE - Interaction Schema Source.md">
# Artifact A52.2: DCE - Interaction Schema Source
# Date Created: C156
# Author: AI Model & Curator
# Updated on: C6 (Clarify closing tag and add curator activity section)

- **Key/Value for A0:**
- **Description:** The canonical source text for the M3. Interaction Schema, which is injected into all generated prompts.
- **Tags:** documentation, process, interaction schema, source of truth

## Interaction Schema Text

1.  Artifacts are complete, individual texts enclosed in `<xmltags>`. To ensure consistent parsing by the DCE extension, all file artifacts **must** be enclosed in `<file path="path/to/file.ts">...</file_artifact>` tags. The path must be relative to the workspace root. **The closing tag must be exactly `</file_artifact>`.** Do not use the file path in the closing tag (e.g., `</file path="...">` is incorrect). Do not write the closing tag as `</file>` or `</file_path>`. Only `</file_artifact>` will parse successfully.

2.  Our Document Artifacts serve as our `Source of Truth` throughout multiple cycles. As such, over time, as issues occur, or code repeatedly regresses in the same way, seek to align our `Source of Truth` such that the Root Cause of such occurances is codified so that it can be avoided on subsequent cycles visits to those Code artifacts.

3.  Please output entire Document or Code artifacts. Do not worry about Token length. If your length continues for too long, and you reach the 600 second timeout, I will simply incorporate the work you did complete, and we can simply continue from where you left off. Better to have half of a solution to get started with, than not to have it. **Preference is for larger, more complete updates over smaller, incremental ones to align with the human curator's parallel processing workflow.** The human curator often sends the same prompt to multiple AI instances simultaneously and selects the most comprehensive response as the primary base for the next cycle, using other responses as supplementary information. Providing more complete updates increases the likelihood of a response being selected as the primary base.

4.  Do not output artifacts that do not require updates in this cycle. (Eg. Do not do this: // Updated on: Cycle 1040 (No functional changes, only cycle header))

5.  **Critical: `flattened_repo_v2.txt` contains all project files. Output updated *individual* files that are part of it (like `<src/state/coreStore.ts>...`). However, do **NOT** output the surrounding Artifact container tags (`<flattened_repo_v2.txt>...</flattened_repo_v2.txt>`) or any auto-generated metadata sections within it (like the Total Files summary, Top 10 list, or the `<files list>` section) which are created by the `flatten.js` script.**
5.1. `flattened_repo_v2.txt` is a copy of the codebase, generated by a script; assume its an accurate representation of the existing codebase, but not necessarily a 'source of truth' like we treat our documents as, our codebase is a living artifact, documents, while we can update them, should be considered less transient.
5.2. **`.local` File Convention:** To manage token count, some large data files (e.g., `researchNodes.ts`) may be represented by a truncated `.local.ts` version in the context. This version contains the essential structure and a few examples. If the full content of a file is required for a task (e.g., a comprehensive data refactor or fixing a bug related to a specific entry), explicitly state this need in your summary of actions and request that the curator swap the `.local.ts` file with the full `.ts` version in the `files_list.txt` for the subsequent cycle.

6.  remember to output complete artifacts without placeholders, im taking your output, putting it in winmerge, and confirming we arent losing data in the update. when you provide placeholders, my cursory review turns into a meticulous file parsing, taking me from what is 5 seconds per artifact to upwards of 5 minutes, only to realize that the output is actually un-parseable, due to the nature of relativity, as the theory of relativity also applies to code. if you give me a code snippet, and do not give me the code surrounding that snippet, i do not know where that code should go. by providing the complete file, on the other hand, i can put it in a diff, see easily what was altered, and if anything was accidentally omitted or lost, i can be sure that it's retained.

7.  **Update documentation before writing code.** document artifacts are like our project readme files, our source of truth. they are our blueprints. they guide the code we write. when we realize we need to alter our approach or invent new game mechanics, we update the source of truth first, cause english is easy and flexible, then we codify that.

8.  this query is part of a larger software engineering project

9.  After you complete delivery on a code artifact, review it to make sure you did not miss any intermediary files. for instance, if we have a DevelopmentSystem.ts, using the componentData.ts, which is displaying on the ComponentProductionTab.tsx. But then theres also still a DevPanel.tsx file that is in-between that *could*, but shouldnt, get overlooked.

10. If you are deciding where to put a particular piece of code or function, and due to its nature, there are one or more candidate files that it could be placed in, choose the smaller file (in tokens).

11. Begin your response with a course of action and end with a review of your work, surface any self corrections in the summary of changes for the subsequent cycle.

12. do not underestimate how much you can accomplish in a given cycle; you'd only accomplish handicapping yourself. (Eg. you've authored this whole thing with just my guidance. good job, keep it up.)

13. Not as relevant for this project: **Log State Button:** The 'Log State' button in the `DevInfoOverlay` is a dynamic debugging tool. Modify the `triggerDebugLogs` action in `uiStore.ts` to output specific state information relevant to the current bug being investigated. **See A85 (Logging Guide) for usage details.**

14. Not as relevant for this project: **Regression Case Studies:** Use Artifact A106 to document persistent or complex bugs and their resolutions. Add entries *after* a fix is confirmed to codify the RCA and solution, preventing future regressions.

15. Include in your cycle summary, a short list of files you've updated. This makes it easy for my reviews.

16. if you seem to have spare time in a cycle, see if you can spot any particular file with excessive levels of comments or logging that seems extensive and for troubleshooting an error that has since been resolved, see to it to clean those files but preserve their functionalities. im just looking to shave off excess tokens wherever possible in the master_content.txt file.

17. if you see `(No change from C850)` such language, it's data loss. there was supposed to be actual language behind that placeholder, but in one iteration (C850, in this case) you had provided a placeholder, and i 'missed it' and did not capture the initial information. you either need to deliver the placeholder in such a way as i can easily press the left arrow instead of the rigth arrow in winmerge to not accept that part, but to also not have winmerge confuse it with the rest, otherwise i must manually parse the information. when the process is a single keystroke, i can manage it quickly enough. when we remove that ability because you provided me data in a format that has placeholders AND the placeholders do not parse within winmerge such that it removes the benefit winmerge is adding, then we have our problem. when you see this, try to correct it using whatever current relevant context you have.

18. basically, you should not worry about brevity, because when you go too long, your response gets interrupted by the system anyway. its better that the products you do deliver are all complete except for the last one, rather than you delivering all incomplete products, including the last one. does that make sense?

19. remember, do not stop outputting for the reason of preventing a potential artifact interruption mid-output. you actually end up stopping yourself from producting two or three additional files before you actually get interrupted. what i mean is, in the outputs where you do not do this, you produce for 500 seconds, producing 7-9 files, and only the last one is interrupted and unusable. compared to when you stop yourself prematurely, for the reason stated, and you produce for 180 seconds and provide maybe 3-4 files. even with the -1, producing as much as you can still outperforms the alternative.

20. This is a misaligned statement: `// (For full history, see master_content.txt)` because your changes get rolled into master_content.txt. therefore, if you remove the history, then when your updates are rolled in, they will remove the full history. understand? after a while, the history is not relevant and can be rolled out, for a while, it ought to stay. you can see what we're working on + the current cycle and make this determination.

21. Each time we create a new documentation artifact, lets also create the key/value pairs needed for me to add it into our Master Artifact List. they can simply be added into the new artifact itself and ill make the new entry in A0. this will solve for me manually generating a description and tag for each new documentation artifact. also, dont place `/` in the title/name of a documentation artifact. VSCode treats it as a folder separator.
21.1. when creating a new documentation artifact, also just update the master artifacts list itself.

22. **New: Curator Activity Section:** If you need the human curator to perform an action that you cannot (e.g., delete a file, run a specific command), include these instructions in a dedicated `<curator_activity>...</curator_activity>` section in your response.
</file_artifact>

<file path="src/Artifacts/A52.3 DCE - Harmony Interaction Schema Source.md">
# Artifact A52.3: DCE - Harmony Interaction Schema Source
# Date Created: C49
# Author: AI Model & Curator
# Updated on: C64 (Add metainterpretability context)

- **Key/Value for A0:**
- **Description:** The canonical source text for the M3. Interaction Schema, adapted for use with Harmony-based models like GPT-OSS. This version is injected into prompts when "Demo Mode" is active and instructs the model to produce a structured JSON output.
- **Tags:** documentation, process, interaction schema, source of truth, harmony, gpt-oss, json

## Interaction Schema Text

**Meta-Context for AI:** Take a deep breath, and work through the problem step-by-step. You are Ascentia, an AI model interacting with a human curator through the Data Curation Environment (DCE), a VS Code extension. You are to act as a cognitive mentor and assist the user with their projects and goals. Your responses are parsed by this extension to automate development workflows. Adhering to the specified JSON format is critical for successful integration.

1.  **CRITICAL: Your entire response must be a single, valid JSON object.** Do not include any text, thoughts, or markdown before or after the JSON structure. The extension will parse your output directly using `JSON.parse()`.

2.  **JSON Schema:** Your output must conform to the following TypeScript interface. Pay close attention to the data types.

    ```typescript
    interface HarmonyFile {
      path: string;      // The relative path to the file from the workspace root.
      content: string;   // The complete and full content of the file.
    }

    interface CourseOfActionStep {
      step: number;      // The step number, starting from 1.
      description: string; // A description of the action for this step.
    }

    interface HarmonyJsonResponse {
      summary: string;
      course_of_action: CourseOfActionStep[];
      files_updated?: string[]; // Optional, can be derived from `files`
      curator_activity?: string; // Optional: For instructions to the human curator.
      files: HarmonyFile[];
    }
    ```

3.  **Example Output:**
    ```json
    {
      "summary": "I have analyzed the request and will update the main application component and its corresponding service.",
      "course_of_action": [
        {
          "step": 1,
          "description": "Update `src/App.tsx`: Add a new state variable and a button to trigger the new functionality."
        },
        {
          "step": 2,
          "description": "Update `src/services/api.ts`: Create a new function to fetch the required data from the backend."
        }
      ],
      "curator_activity": "Please ensure the backend API endpoint `GET /api/newdata` is running and accessible.",
      "files": [
        {
          "path": "src/App.tsx",
          "content": "// Full content of the updated App.tsx file...\n"
        },
        {
          "path": "src/services/api.ts",
          "content": "// Full content of the updated api.ts file...\n"
        }
      ]
    }
    ```

4.  **Content Rules:**
    *   Always output complete files inside the `content` string. Do not use placeholders or omit code.
    *   Ensure the `content` string correctly escapes characters as needed for a valid JSON string (e.g., newlines as `\n`, quotes as `\"`).
    *   Update documentation artifacts before updating code artifacts.
    *   If you need the human curator to perform an action (e.g., delete a file, run a command), describe it in the optional `curator_activity` field.

5.  Our Document Artifacts serve as our `Source of Truth`. As issues occur, or code repeatedly regresses, seek to align our `Source of Truth` documents to codify the root cause and prevent future regressions.

6.  If you are deciding where to place a new function, and multiple files are suitable candidates, choose the smaller file (in tokens).
</file_artifact>

<file path="src/Artifacts/A53. DCE - Phase 2 - Token Count and Similarity Analysis.md">
# Artifact A53: DCE - Phase 2 - Token Count and Similarity Analysis
# Date Created: C112
# Author: AI Model & Curator
# Updated on: C144 (Mark feature as implemented)

- **Key/Value for A0:**
- **Description:** Details the plan to implement token counting for raw and parsed responses, and to calculate a similarity score between AI-generated files and their workspace originals.
- **Tags:** feature plan, phase 2, token count, similarity, metrics, ui, ux

## 1. Overview & Goal

To enhance the curator's decision-making process, the Parallel Co-Pilot Panel (PCPP) must provide quantitative metrics about the AI's responses. The goal of this feature is to display token counts for various pieces of content and a similarity score to gauge the extent of changes proposed by the AI. This allows the user to quickly assess response verbosity, parser effectiveness, and the magnitude of code modifications.

**Status (C144):** This feature is now fully implemented.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-MET-01 | **Raw Response Token Count** | As a user, I want to see the total token count of the raw AI response I've pasted, so I can understand the overall size of the output. | - A token count is displayed for the raw content in each response tab. <br> - This count updates in real-time as I type or paste content. |
| P2-MET-02 | **Parsed vs. Original Token Count** | As a user, when viewing a parsed file, I want to see a comparison of the token count between the original workspace file and the AI's new version, so I can quickly see if the code is growing or shrinking. | - In the header of the code viewer pane, the token counts for both the original and new versions of the selected file are displayed (e.g., "Original: 4.1K | New: 4.2K"). |
| P2-MET-03 | **File Similarity Score** | As a user, along with the token counts, I want to see a percentage-based similarity score, so I can gauge how substantially the AI has altered the file. | - A similarity score (e.g., "Sim: 98%") is displayed in the code viewer header. <br> - A score of 100% indicates identical files. <br> - A low score indicates a major rewrite. |

## 3. Technical Implementation Plan

1.  **IPC Channel:**
    *   `ClientToServerChannel.RequestFileComparison` was created.
    *   Payload: `{ filePath: string; modifiedContent: string; }`.
    *   Response channel: `ServerToClientChannel.SendFileComparison`.
    *   Payload: `{ originalTokens: number; modifiedTokens: number; similarity: number; }`.

2.  **Backend (`file-operation.service.ts`):**
    *   `handleFileComparisonRequest` was implemented.
    *   It reads the content of the original `filePath` from the workspace.
    *   It calculates the token count for the original content and the `modifiedContent` received in the payload using `content.length / 4`.
    *   It computes a similarity score using the Sørensen-Dice coefficient algorithm located in `src/common/utils/similarity.ts`.
    *   It sends the results back to the client via `SendFileComparison`.

3.  **Frontend (`parallel-copilot.view/view.tsx`):**
    *   When a file is selected for viewing (`setSelectedFilePath`), a `RequestFileComparison` message is sent.
    *   A state variable, `comparisonMetrics`, holds the returned results.
    *   The message handler for `SendFileComparison` updates this state.
    *   The UI in the code viewer header renders the live data from the `comparisonMetrics` state.
</file_artifact>

<file path="src/Artifacts/A57. DCE - Phase 2 - Cycle Management Plan.md">
# Artifact A57: DCE - Phase 2 - Cycle Management Plan
# Date Created: C125
# Author: AI Model & Curator
# Updated on: C62 (Refine "Reset History" workflow)

- **Key/Value for A0:**
- **Description:** Outlines the user stories and technical implementation for deleting cycles and resetting the PCPP history.
- **Tags:** feature plan, phase 2, ui, ux, history, cycle management

## 1. Overview & Goal

As the number of development cycles increases, users need tools to manage their history within the Parallel Co-Pilot Panel (PCPP). The goal of this feature is to provide basic but essential management capabilities, allowing users to delete unwanted cycles and completely reset the history if needed. This keeps the history relevant and manageable.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-CM-01 | **Delete a Cycle** | As a developer, I want to be able to delete a specific cycle from my history, so I can remove erroneous or irrelevant entries. | - A "Delete Cycle" button is available in the "Cycle & Context" section. <br> - Clicking it prompts for confirmation (e.g., "Are you sure you want to delete Cycle X?"). <br> - Upon confirmation, the specified cycle is removed from the `dce_history.json` file. <br> - The UI automatically navigates to the next available cycle (e.g., the previous one or the new latest one). |
| P2-CM-02 | **Reset All History** | As a developer, I want to be able to reset the entire PCPP history, so I can start a project fresh without old cycle data. | - A "Reset History" button is available. <br> - Clicking it shows a strong confirmation warning (e.g., "This will delete ALL cycles and cannot be undone."). <br> - Upon confirmation, the `dce_history.json` file is deleted. <br> - The UI reloads to the "Cycle 0" onboarding/welcome screen, allowing the user to re-initialize the project. |

## 3. Technical Implementation Plan

1.  **IPC Channels (`channels.enum.ts`, `channels.type.ts`):**
    *   Create `ClientToServerChannel.RequestDeleteCycle` with a payload of `{ cycleId: number }`.
    *   Create `ClientToServerChannel.RequestResetHistory` with an empty payload.

2.  **Backend (`history.service.ts`):**
    *   **`deleteCycle(cycleId: number)`:**
        *   Read the `dce_history.json` file.
        *   Filter the `cycles` array to remove the entry where `cycle.cycleId === cycleId`.
        *   If only one cycle remains, do not allow deletion, or handle it by resetting to a default state.
        *   Write the updated history file back to disk.
    *   **`resetHistory()`:**
        *   Use `vscode.workspace.fs.delete` to remove the `dce_history.json` file.
        *   Clear the `lastViewedCycleId` from the workspace state.
        *   The existing logic in `getInitialCycle` will automatically create a new, default "Cycle 0" the next time data is requested.

3.  **Frontend (`view.tsx`):**
    *   **UI Buttons:** Add "Delete Cycle" and "Reset History" icon buttons to the `cycle-navigator` div.
    *   **Event Handlers:**
        *   The `onClick` handler for "Delete Cycle" will call `vscode.window.showWarningMessage` to confirm. If the user confirms, it will send the `RequestDeleteCycle` IPC message with the `currentCycle` ID. After sending, it should trigger a request for the new latest cycle data to refresh the UI.
        *   The `onClick` handler for "Reset History" will do the same, but for the `RequestResetHistory` message. After the backend confirms the reset, the frontend will navigate to `cycleId: 0`.

4.  **Message Handling (`on-message.ts`):**
    *   Add handlers for the new IPC channels that call the corresponding methods in `HistoryService`.
    *   After a successful deletion or reset, the backend should send a message back to the client (e.g., a `ForceRefresh` or a new dedicated message) to trigger a full state reload.
</file_artifact>

<file path="src/Artifacts/A59. DCE - Phase 2 - Debugging and State Logging.md">
# Artifact A59: DCE - Phase 2 - Debugging and State Logging
# Date Created: C134
# Author: AI Model & Curator
# Updated on: C3 (Focus log output on cycle management state and truncate large data)

- **Key/Value for A0:**
- **Description:** Documents the plan for a "Log State" button that outputs critical state information (cycle history, current inputs) to the debug channel to accelerate troubleshooting.
- **Tags:** feature plan, phase 2, ui, ux, debugging, logging, state management

## 1. Overview & Goal

Debugging complex state interactions in the Parallel Co-Pilot Panel can be challenging, as it often requires the curator to manually describe the state of multiple text fields and selections. To accelerate this process, a dedicated debugging feature is required.

The goal of this feature is to add a **"Log State"** button to the PCPP's main header. When clicked, this button will generate a comprehensive, formatted log of the panel's current state and send it to the "Data Curation Environment" output channel. This allows the curator to easily copy and paste the exact state of the application into their feedback, eliminating ambiguity and speeding up bug resolution.

## 2. User Story

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-LOG-01 | **Log Current State for Debugging** | As a curator encountering a bug, I want to click a "Log State" button that outputs the current state of the entire PCPP to the debug logs, so I can easily copy and paste this information for you to reproduce the issue. | - A "Log State" button is present in the main header of the PCPP. <br> - Clicking the button generates a formatted message in the "Data Curation Environment" output channel. <br> - **(C3 Update)** The log output is now focused specifically on the state variables relevant to cycle management to diagnose bugs like data loss or being stuck on a cycle. It will include: <br> &nbsp;&nbsp;&nbsp; 1. A summary of the key frontend state variables (`currentCycle`, `maxCycle`, `isNewCycleButtonDisabled`). <br> &nbsp;&nbsp;&nbsp; 2. A **truncated** JSON dump of the entire `dce_history.json` file from the backend for comparison, with large code blocks shortened to prevent flooding the logs. |

## 3. Technical Implementation Plan

1.  **UI (`view.tsx`):**
    *   A "Log State" button will be added to the main header toolbar.
    *   Its `onClick` handler will gather the complete current state of the panel into a single `PcppCycle` object and send it to the backend via a new IPC message.

2.  **IPC Channels (`channels.enum.ts`, `channels.type.ts`):**
    *   Create a new `ClientToServerChannel.RequestLogState`.
    *   The payload will be `{ currentState: PcppCycle }`.

3.  **Backend Logic (`prompt.service.ts`):**
    *   A new public method, `public async generateStateLog(currentState: PcppCycle)`, will be created.
    *   **Step 1: Generate Formatted State Dump (C3 Revision):**
        *   It will fetch the full history from `history.service.ts`.
        *   It will construct a focused log string containing the most relevant frontend state variables for the current bug (`currentCycle`, `maxCycle`, `isNewCycleButtonDisabled`, `cycleTitle`, `cycleContext`, `selectedResponseId`).
        *   It will use the `truncateCodeForLogging` utility on the `content` of each response in the history before creating a `JSON.stringify` of the full history file content.
    *   **Step 2: Log to Output Channel:**
        *   It will combine these strings into a single, clearly labeled log message and send it to `Services.loggerService.log()`.
        *   It will then call `Services.loggerService.show()` to programmatically open the output channel for the user.
</file_artifact>

<file path="src/Artifacts/A60. DCE - Phase 2 - Cycle 0 Onboarding Experience.md">
# Artifact A60: DCE - Phase 2 - Cycle 0 Onboarding Experience
# Date Created: C139
# Author: AI Model & Curator
# Updated on: C187 (Rename README.md to DCE_README.md)

## 1. Vision & Goal

The Parallel Co-Pilot Panel (PCPP) is a powerful tool, but its effectiveness relies on a structured set of planning and documentation artifacts. For a new user, bootstrapping this structure is a major hurdle.

The goal of the "Cycle 0" onboarding experience is to automate this bootstrapping process. The extension will capture the user's high-level project scope and generate a prompt that instructs an AI to create a starter pack of essential **planning and documentation artifacts**. As part of this process, it will also create a `DCE_README.md` file within the `src/Artifacts` directory that explains the artifact-driven workflow itself, providing meta-context to both the user and the AI.

## 2. User Flow

1.  **Detection:** The extension detects a "fresh workspace" by confirming the absence of any `A0.*Master Artifact List.md` file in the `src/Artifacts/` directory.
2.  **Cycle 0 UI:** The PCPP loads into a special "Cycle 0" view. It presents the user with an introduction and a single large text area for their "Project Scope".
3.  **User Input:** The user describes their project's vision and goals.
4.  **Generate Prompt & Artifacts:** The user clicks "Generate Initial Artifacts Prompt".
5.  **Backend Process:**
    *   The backend `PromptService` constructs a unique `prompt.md` file. The prompt's static context will contain the content of all template artifacts (files prefixed with `T` in the extension's artifacts).
    *   **Prompt Instruction Refinement (C179):** The instructions within the generated prompt will be updated to strongly encourage the AI to generate a comprehensive set of initial artifacts. It will explicitly prioritize foundational documents like **`T14. Template - GitHub Repository Setup Guide.md`** and **`T7. Template - Development and Testing Guide.md`** to ensure the user receives critical operational guidance from the very beginning, addressing potential setup hurdles like Git initialization proactively.
    *   It creates `src/Artifacts/DCE_README.md`, populated with the content from the extension's internal `A72. DCE - README for Artifacts.md`.
    *   It saves the user's "Project Scope" to a persistent field in `dce_history.json`.
6.  **Transition to Cycle 1:** The frontend reloads its state. Since an `A0` file does not yet exist, the user is presented with a "Continue to Cycle 1" button. Clicking this transitions them to the main PCPP interface.
7.  **User Action:** The user takes the generated `prompt.md` and uses it with their preferred LLM.
8.  **First Iteration:** The user pastes the AI's response (which should contain the new, correctly formatted documentation artifacts, including a project-specific `A0` file) back into the PCPP's "Cycle 1" tab. The standard iterative workflow begins.
9.  **Return to Cycle 0:** The user can click the "Project Plan" button to navigate back to Cycle 0 to view and edit their master project scope. A "Return to Cycles" button will take them back to their latest cycle.

## 3. Meta-Context Injection Process

To ensure the AI can always generate perfectly parsable responses, the DCE injects "meta-context" into the prompts for all cycles *after* Cycle 0. This process is automatic and transparent to the user.

-   **Cycle 0 (Bootstrapping):** Uses the curated `T` (template) artifacts as static context to guide the AI in creating initial *planning* documents for the user's project. The goal is to establish the project's structure.
-   **Cycle 1+ (Iterative Development):** The `prompt.service.ts` automatically reads and injects the following critical artifacts into the `<M3. Interaction Schema>` section of every generated `prompt.md`:
    -   **`A52.1 DCE - Parser Logic and AI Guidance.md`**: Contains the literal source code of the response parser, showing the AI exactly how its output will be interpreted.
    -   **`A52.2 DCE - Interaction Schema Source.md`**: Contains the canonical rules of interaction, ensuring the AI always has the latest formatting guidelines.
</file_artifact>

<file path="src/Artifacts/A61. DCE - Phase 2 - Cycle History Management Plan.md">
# Artifact A61: DCE - Phase 2 - Cycle History Management Plan
# Date Created: C152
# Author: AI Model & Curator
# Updated on: C163 (Flesh out plan and user stories for Import/Export)

- **Key/Value for A0:**
- **Description:** Outlines the plan to allow users to save and load their entire cycle history (`dce_history.json`), enabling them to manage multiple development threads or back up their work.
- **Tags:** feature plan, phase 2, history, import, export, cycle management

## 1. Overview & Goal

The `dce_history.json` file is a valuable asset that captures the entire iterative development process for a project, including the project scope, cycle notes, and all AI-generated responses. Users may want to work on different feature branches or experiments, each with its own cycle history.

The goal of this feature is to provide commands and UI controls to **export** the current cycle history to a file and **import** a history file, effectively allowing users to save and load different "cycle chains."

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-CHM-01 | **Export Cycle History** | As a developer, I want to export the entire cycle history to a named JSON file, so I can create a backup or save the history for a specific feature branch before starting a new one. | - A "Save History..." button is available in the cycle navigator toolbar. <br> - Clicking it opens a native "Save As..." dialog. <br> - The current content of `.vscode/dce_history.json` is written to the user-specified file. <br> - A success notification is shown. |
| P2-CHM-02 | **Import Cycle History** | As a developer, I want to import a cycle history from a JSON file, so I can switch between different development threads or restore a backup. | - A "Load History..." button is available in the cycle navigator toolbar. <br> - Clicking it opens a native "Open..." dialog to select a JSON file. <br> - The content of the selected file overwrites the current `.vscode/dce_history.json`. <br> - The PCPP UI automatically refreshes to show the new, imported history. |

## 3. Technical Implementation Plan

1.  **IPC Channels:**
    *   `ClientToServerChannel.RequestExportHistory`: No payload.
    *   `ClientToServerChannel.RequestImportHistory`: No payload.

2.  **Backend (`history.service.ts`):**
    *   **`handleExportHistory()`:**
        *   Read the current `.vscode/dce_history.json` file.
        *   Use `vscode.window.showSaveDialog` to get a destination URI from the user.
        *   If a URI is provided, write the history content to that file.
        *   Show a `showInformationMessage` on success.
    *   **`handleImportHistory()`:**
        *   Use `vscode.window.showOpenDialog` to get a source URI from the user.
        *   If a URI is provided, read its content.
        *   Perform basic validation to ensure it looks like a history file (e.g., has `version` and `cycles` properties).
        *   Overwrite the workspace's `.vscode/dce_history.json` with the new content.
        *   Trigger a `ForceRefresh` message with `reason: 'history'` to the PCPP frontend to force a full state reload.

3.  **Frontend (`view.tsx`):**
    *   The "Save History" (`VscCloudUpload`) and "Load History" (`VscCloudDownload`) buttons in the cycle navigator toolbar will be enabled.
    *   Their `onClick` handlers will trigger the corresponding IPC messages.
    *   The existing handler for the `ForceRefresh` message will automatically handle the UI update after a successful import.
</file_artifact>

<file path="src/Artifacts/A65. DCE - Universal Task Checklist.md">
# Artifact A65: DCE - Universal Task Checklist
# Date Created: C165
# Author: AI Model & Curator
# Updated on: C22 (Add new tasks from playtest feedback)

## 1. Purpose

This artifact provides a structured, universal format for tracking development tasks, feedback, and bugs. Unlike cycle-specific trackers, this checklist organizes work by the group of files involved in a given task. It also introduces a simple complexity metric based on the total token count of the affected files and an estimation of whether the task will require more than one development cycle to complete.

This file-centric approach helps in planning and prioritizing work, especially in an AI-assisted development workflow where context size (token count) is a primary constraint.

## 2. How to Use

-   **Group by File Packages:** Create a new `##` section for each logical task or feature. List all the files that are expected to be modified for this task.
-   **Assign an ID:** Give each task package a unique, simple ID (e.g., `T-1`, `T-2`) for easy reference in feedback.
-   **Estimate Complexity:**
    -   Calculate the **Total Tokens** for all files in the package. This gives a quantitative measure of the context size.
    -   Estimate if the task is likely to take **More than one cycle?**. This is a qualitative judgment based on the complexity of the changes required.
-   **List Action Items:** Under each file package, create a checklist of specific actions, bugs to fix, or features to implement.
-   **Add Verification Steps:** After the action items, add a section describing how the curator should test the feature to confirm it is working as expected.
-   **Note on Output Length:** Remember that the maximum output length for a single response is approximately 65,000 tokens. Do not prematurely stop generating files; attempt to complete as many full files as possible within this limit.
-   **Keep it Current:** At the beginning of each new cycle, review and update this checklist. Move completed tasks to a "Completed" section, add new tasks based on feedback, and re-prioritize as needed. This ensures the checklist remains a living, accurate reflection of the project's status.

---

## Task List for Cycle 22+

## T-1: Fix Onboarding Auto-Save Icon
- **Files Involved:**
    - `src/client/views/parallel-copilot.view/view.tsx`
- **Total Tokens:** ~8,500
- **More than one cycle?** No
- **Status:** In Progress

- [ ] **Task (T-ID: 1.1):** The `useEffect` hook listening for `NotifySaveComplete` is missing a dependency on `saveStatus`. Add it to the dependency array to ensure the callback has the latest state and can correctly transition from 'saving' to 'saved'.

### Verification Steps
1.  Launch the extension in a fresh workspace to trigger the onboarding view.
2.  Type a character in the "Project Scope" text area.
3.  **Expected:** The save status icon should change from a checkmark to a caution sign.
4.  Stop typing.
5.  **Expected:** The icon should change to a circular processing animation, and then, after a short delay, it should change back to the green checkmark. It should not get stuck on the processing animation.

## T-2: Fix File Duplication Bug
- **Files Involved:**
    - `src/backend/services/flattener.service.ts`
    - `src/backend/services/file-tree.service.ts`
- **Total Tokens:** ~6,800
- **More than one cycle?** No
- **Status:** In Progress

- [ ] **Task (T-ID: 2.1):** Add a safeguard in `flattener.service.ts` to de-duplicate the incoming file path list using `[...new Set(paths)]` before any processing occurs.
- [ ] **Task (T-ID: 2.2):** Review and harden the `processAutoAddQueue` logic in `file-tree.service.ts` to prevent race conditions that might add duplicate files to the selection state.

### Verification Steps
1.  Enable "Automatically add new files to selection".
2.  Create a new workspace and go through the Cycle 0 onboarding to generate the initial set of artifacts.
3.  Click "Flatten Context".
4.  Inspect the generated `flattened_repo.md` file.
5.  **Expected:** The file list and content should contain no duplicate file paths.

## T-3: Implement "Open All" Button
- **Files Involved:**
    - `src/client/views/parallel-copilot.view/components/ParsedView.tsx`
    - `src/backend/services/file-operation.service.ts`
    - `src/common/ipc/channels.enum.ts`
    - `src/common/ipc/channels.type.ts`
    - `src/client/views/parallel-copilot.view/on-message.ts`
- **Total Tokens:** ~8,000
- **More than one cycle?** No
- **Status:** In Progress

- [ ] **Task (T-ID: 3.1):** Add an "Open All" button to the header of the "Associated Files" section in `ParsedView.tsx`.
- [ ] **Task (T-ID: 3.2):** Create a new `RequestBatchFileOpen` IPC channel.
- [ ] **Task (T-ID: 3.3):** Implement the `handleBatchFileOpenRequest` method in `file-operation.service.ts` to iterate through a list of paths and open each one.

### Verification Steps
1.  Parse a response with multiple associated files.
2.  Click the "Open All" button.
3.  **Expected:** All files listed in the "Associated Files" section should open as new tabs in the VS Code editor.

## T-4: Plan Native Diff Integration
- **Files Involved:**
    - `src/Artifacts/A88. DCE - Native Diff Integration Plan.md`
- **Total Tokens:** ~1,000
- **More than one cycle?** Yes (Implementation is deferred)
- **Status:** In Progress

- [ ] **Task (T-ID: 4.1):** Create the new planning artifact `A88` to detail the implementation of a native VS Code diff view using a `TextDocumentContentProvider`.

### Verification Steps
1.  Check the `src/Artifacts` directory.
2.  **Expected:** The new `A88` artifact should exist and contain a detailed technical plan.
</file_artifact>

<file path="src/Artifacts/A66. DCE - Cycle 1 - Task Tracker.md">
# Artifact A66: DCE - Cycle 1 - Task Tracker
# Date Created: C167
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A tracking document for the feedback items and tasks from the first cycle of using the DCE to build itself.
- **Tags:** bugs, tracking, issues, backlog, cycle 1

## 1. Overview

This document lists the feedback and tasks from the first official development cycle using the DCE tool. It serves as a checklist to ensure all initial bugs and feature requests are addressed.

## 2. Task List

| ID | Task | Status (C167) | Notes |
|---|---|---|---|
| 1 | Fix FTV flashing on save/auto-save. | **In Progress** | Annoying UX issue. Investigate file watcher and refresh logic. |
| 2 | Rework line numbers in context panes for word wrap and scrolling. | **In Progress** | Critical usability bug. Requires rework of `NumberedTextarea.tsx`. |
| 3 | Fix cursor and selection highlighting in context panes. | **In Progress** | Critical usability bug. Likely related to the line number issue. |
| 4 | Implement animated UI workflow guide. | **In Progress** | Major new feature. Requires state management and CSS animations. |
| 5 | Document the new animated workflow in an artifact. | **Complete** | `A69. DCE - Animated UI Workflow Guide.md` created. |
| 6 | Fix `</prompt.md>` tag appearing at the top of generated prompts. | **In Progress** | Critical bug in `prompt.service.ts`. |
| 7 | Plan for UX improvements to context panes (token count, line numbers). | **Complete** | New artifact `A68` created to plan this feature. |
| 8 | Plan for refactoring the large `parallel-copilot.view.tsx`. | **Complete** | New artifact `A67` created to plan this refactor. |
| 9 | Plan for Git-integrated testing workflow. | **Complete** | New artifact `A70` created to plan this feature. |
</file_artifact>

<file path="src/Artifacts/A68. DCE - PCPP Context Pane UX Plan.md">
# Artifact A68: DCE - PCPP Context Pane UX Plan
# Date Created: C167
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A plan to enhance the UX of the cycle context and ephemeral context text areas with features like token counts and line numbers.
- **Tags:** feature plan, ui, ux, pcpp, context

## 1. Overview & Goal

The "Cycle Context" and "Ephemeral Context" text areas in the Parallel Co-Pilot Panel are crucial for prompt engineering, but their current implementation as basic `<textarea>` elements lacks key features. The goal of this plan is to significantly enhance their usability by adding token counts, line numbers, and persistent resizing.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-CTX-01 | **See Context Token Count** | As a developer, I want to see a live token count for the Cycle Context and Ephemeral Context fields, so I can manage the size of my prompt effectively. | - Below each text area, a label displays the approximate token count of its content. <br> - The count updates in real-time as the user types. |
| P2-CTX-02 | **See Line Numbers** | As a developer, I want to see line numbers in the context text areas, so I can easily reference specific parts of a long context or error log. | - A line number gutter is displayed to the left of the text input area. <br> - The line numbers scroll in sync with the text content. |
| P2-CTX-03 | **Persistent Resizing** | As a developer, when I resize the height of a context text area, I want it to remain that size when I navigate between cycles, so I don't lose my layout preferences. | - The `height` of each text area is stored as part of the `PcppCycle` state. <br> - When the user resizes a text area, its new height is saved. <br> - When the panel re-renders or a cycle is loaded, the text areas are restored to their saved heights. |

## 3. Technical Implementation Plan

### 3.1. Token Counts
-   **State:** Add new state variables to `view.tsx`: `cycleContextTokens` and `ephemeralContextTokens`.
-   **UI:** Add `<span>` elements below each text area to display these state values.
-   **Logic:** The `onChange` handlers for the text areas will be updated to calculate the token count (`e.target.value.length / 4`) and update the corresponding token count state.

### 3.2. Line Numbers & Resizing
-   **New Component (`NumberedTextarea.tsx`):**
    -   Create a new reusable component that renders a `textarea` alongside a synchronized `div` for line numbers.
    -   This component will manage its own internal state for line count based on the `value` prop.
    -   It will include a draggable handle at the bottom. `onMouseDown`, `onMouseMove`, and `onMouseUp` handlers will be used to track the drag gesture.
    -   It will call an `onHeightChange` prop function with the new height, allowing the parent to manage the state.
-   **Integration (`view.tsx`):**
    -   Replace the existing `<textarea>` elements with the new `<NumberedTextarea>` component.
    -   **State:** Add `cycleContextHeight` and `ephemeralContextHeight` to the component's state and to the `PcppCycle` type definition.
    -   The `onHeightChange` prop of the new component will be wired to update these state variables, which will be persisted via the existing debounced save mechanism.
</file_artifact>

<file path="src/Artifacts/A69. DCE - Animated UI Workflow Guide.md">
# Artifact A69: DCE - Animated UI Workflow Guide
# Date Created: C169
# Author: AI Model & Curator
# Updated on: C187 (Correct final workflow steps)

## 1. Overview & Goal

The Parallel Co-Pilot Panel (PCPP) has a powerful, multi-step workflow that may not be immediately obvious to new users. The goal of this feature is to implement a guided experience using subtle UI animations. These animations will highlight the next logical action the user should take, gently guiding them through the process from project creation to generating the next cycle's prompt.

## 2. User Story

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-WF-01 | **Guided Workflow** | As a new user, I want the UI to visually guide me through the steps of a development cycle, so I can learn the workflow intuitively. | - After a specific action is completed, the UI element for the next logical action is highlighted with a subtle animation (e.g., a pulsing blue glow). |

## 3. The Animated Workflow Sequence (The Perfect Loop)

The highlighting will follow this specific sequence of user actions:

### Onboarding / Cycle 0
1.  **Start (New Workspace):** User opens a new, empty folder in VS Code.
    *   **Auto-Action:** The **DCE Parallel Co-Pilot Panel** automatically opens.

2.  **Open PCPP (Welcome View):** The PCPP is open to the "Welcome" / "Onboarding" view.
    *   **Highlight:** The **Project Scope `textarea`** pulses.

3.  **Input Project Scope:** User types their project plan into the `textarea`.
    *   **Highlight:** The **`Generate Initial Artifacts Prompt`** button pulses.

4.  **Generate `prompt.md`:** User clicks the button. `prompt.md` and `DCE_README.md` are created. The view transitions to Cycle 1.
    *   **Auto-Action:** `prompt.md` and `src/Artifacts/DCE_README.md` are automatically opened in the editor.
    *   **Highlight:** The **`Resp 1`** tab in the PCPP pulses.

### Main Loop (Cycle 1+)
5.  **Paste Responses:** The user gets responses from an LLM and pastes them into the response tabs.
    *   **Highlight:** The highlight moves sequentially from **`Resp 1`** to **`Resp 2`**, etc., as each `textarea` is filled.
    *   **Trigger:** Once content is present in all tabs, the highlight moves to the next step.

6.  **Parse Responses:**
    *   **Highlight:** The **`Parse All`** button pulses.

7.  **Sort Responses:** User clicks `Parse All`.
    *   **Highlight:** The **`Sort`** button pulses. (Skips if already sorted).

8.  **Select a Response:** User reviews the responses.
    *   **Highlight:** The **`Select This Response`** button on each tab pulses.

9.  **Create Baseline:** User clicks `Select This Response`.
    *   **Highlight:** The **`Baseline (Commit)`** button pulses.
    *   **State-Aware Skip:** This step is skipped if the backend reports that the Git working tree is already clean.

10. **Select Files for Acceptance:** A successful baseline is created.
    *   **Highlight:** The "Associated Files" list panel and the **`Select All`** button within it pulse.

11. **Accept Changes:** User checks one or more files in the "Associated Files" list.
    *   **Highlight:** The **`Accept Selected`** button pulses.

12. **Write Context:** User clicks `Accept Selected`.
    *   **Highlight:** The **"Cycle Context"** `textarea` pulses.

13. **Write Title:** User types into the "Cycle Context" `textarea`.
    *   **Highlight:** The **"Cycle Title"** input field pulses.

14. **Generate Next Prompt:** User types a bespoke "Cycle Title".
    *   **Highlight:** The **`Generate prompt.md`** button pulses.

15. **Create New Cycle:** User clicks `Generate prompt.md`.
    *   **Highlight:** The **`[ + ]` (New Cycle)** button pulses, completing the loop and preparing for the next iteration which starts back at Step 5.
</file_artifact>

<file path="src/Artifacts/A70. DCE - Git-Integrated Testing Workflow Plan.md">
# Artifact A70: DCE - Git-Integrated Testing Workflow Plan
# Date Created: C169
# Author: AI Model & Curator
# Updated on: C12 (Specify that Restore must only delete associated new files)

## 1. Overview & Goal

A core part of the DCE workflow involves accepting an AI-generated response and testing it in the live workspace. If the response introduces bugs, the user must manually revert the changes. The goal of this feature is to automate this "test and revert" loop by deeply integrating with Git. This will provide a one-click method to create a baseline commit before testing and a one-click method to restore that baseline if the test fails.

**Status (C187):** In Progress.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-GIT-01 | **Create Baseline** | As a developer, after accepting an AI response but before testing it, I want to click a "Baseline (Commit)" button to create a Git commit, so I have a safe restore point. | - A "Baseline (Commit)" button is available in the response acceptance header. <br> - Clicking it executes `git add .` and `git commit -m "DCE Baseline: Cycle [currentCycle] - [cycleTitle]"`. <br> - A "Successfully created baseline commit" notification is shown. |
| P2-GIT-02 | **Restore Baseline** | As a developer, after testing an AI response and finding issues, I want to click a "Restore Baseline" button to discard all changes, so I can quickly test a different response. | - A "Restore Baseline" button is available. <br> - Clicking it executes `git restore .` to revert changes to tracked files. <br> - It also deletes any new, untracked files that were part of the accepted AI response, leaving other untracked files untouched. <br> - The restore operation must **exclude** DCE-specific state files (e.g., `.vscode/dce_history.json`) to prevent data loss. |
| P2-GIT-03 | **State-Aware Baseline** | As a developer, I don't want to be prompted to create a baseline if my project is already in a clean state, and I want clear feedback if I try to baseline an already-clean repository. | - Before highlighting the "Baseline" button, the extension checks the `git status`. <br> - If the working tree is clean, the "Baseline" step in the animated workflow is skipped. <br> - If the user manually clicks "Baseline" on a clean tree, a message like "Already baselined" is shown. |
| P2-GIT-04 | **Guided Git Initialization** | As a new user who hasn't initialized a Git repository, when I click "Baseline," I want to see a clear error message that tells me what's wrong and gives me the option to fix it with one click. | - If `git` is not initialized, clicking "Baseline" shows a `vscode.window.showErrorMessage`. <br> - The message explains that the folder is not a Git repository. <br> - The message includes an "Open README Guide" button that opens the project's `DCE_README.md`. <br> - The message also includes an "Initialize Repository" button that, when clicked, automatically runs `git init` in the workspace. |
| P2-GIT-05 | **Post-Baseline Workflow** | As a developer, after a successful baseline is created, I want the animated guide to immediately advance to the next step, so I know what to do next. | - After a successful baseline commit, the animated workflow highlight immediately moves to the "Select All" button in the "Associated Files" list. |

## 3. Feasibility Analysis

-   **"Insanely Powerful" Idea (Simulate TS Errors):**
    -   **Concept:** Programmatically run the TypeScript compiler on a virtual file system containing the proposed changes and display the resulting errors without modifying the user's workspace.
    -   **Feasibility:** This is a highly complex task. It would require integrating the TypeScript compiler API, creating an in-memory representation of the workspace file system, and managing dependencies. While theoretically possible, this is a very advanced feature that would require significant research and multiple development cycles.
    -   **Recommendation:** Defer as a long-term research goal.

-   **"Baseline/Restore" Idea:**
    -   **Concept:** Execute standard Git commands from the extension backend.
    -   **Feasibility:** This is highly feasible. The VS Code Git extension exposes an API that can be used to run commands, or a child process can be used to execute the `git` CLI directly. The main challenge is ensuring the `git restore` command excludes the necessary files.
    -   **Recommendation:** Proceed with planning and implementation.

## 4. Technical Implementation Plan

1.  **IPC Channels:**
    *   `ClientToServerChannel.RequestGitBaseline`: Payload `{ commitMessage: string }`.
    *   `ClientToServerChannel.RequestGitRestore`: Payload `{ filesToDelete: string[] }`.
    *   `ClientToServerChannel.RequestGitStatus`: No payload.
    *   `ClientToServerChannel.RequestGitInit`: (New) No payload.
    *   `ServerToClientChannel.SendGitStatus`: Payload `{ isClean: boolean }`.
    *   `ServerToClientChannel.NotifyGitOperationResult`: Payload `{ success: boolean; message: string; }`. This channel is critical for the backend to provide explicit feedback to the frontend's workflow state machine.

2.  **Backend (New `GitService` - See `A73`):**
    *   A new `GitService` will encapsulate all Git command logic.
    *   **`handleGitStatusRequest()`:** A new handler that runs `git status --porcelain`. If the output is empty, it sends `{ isClean: true }` to the frontend.
    *   **`handleGitBaselineRequest(commitMessage)`:**
        *   Checks the status first. If clean, it returns a specific "Already baselined" result.
        *   Otherwise, it executes `git add .` and `git commit -m "..."`.
        *   **Crucially, it will have a specific `catch` block for "not a git repository" errors. This block will trigger the user-facing `showErrorMessage` with the two action buttons.**
    *   **`handleGitRestoreRequest({ filesToDelete })`:**
        *   Executes `git restore -- . ':(exclude).vscode/dce_history.json'`.
        *   Iterates through `filesToDelete` and deletes each one using `vscode.workspace.fs.delete`.
        *   Returns a result object.
    *   **`handleGitInitRequest()`:** (New) A new handler that executes `git init` and returns a success/failure result.

3.  **Frontend (`view.tsx`):**
    *   The frontend will request the Git status at appropriate times to drive the workflow state.
    *   The `onClick` handler for "Baseline" will construct the commit message and send the `RequestGitBaseline` message.
    *   The `onClick` handler for "Restore" will determine which files were newly created and send them in the `RequestGitRestore` message.
    *   A new message handler for `NotifyGitOperationResult` will display the result message and, if successful, will advance the `workflowStep` state from `awaitingBaseline` to `awaitingFileSelect`.
</file_artifact>

<file path="src/Artifacts/A71. Sample M0 Prompt.md">
<prompt.md>

<M1. artifact schema>
M1. artifact schema
M2. cycle overview
M3. interaction schema
M4. current project scope
M5. organized artifacts list
M6. cycles
M7. Flattened Repo
</M1. artifact schema>

<M2. cycle overview>
Current Cycle 0 - Project Initialization
</M2. cycle overview>

<M3. Interaction Schema>
1.  Artifacts are complete, individual texts enclosed in `<xmltags>`. To ensure consistent parsing by the DCE extension, all file artifacts **must** be enclosed in `<file path="path/to/file.ts">...</file>` tags. The path must be relative to the workspace root. The closing tag must be a simple `</file>`. Do not use the file path in the closing tag.
2.  Our Document Artifacts serve as our `Source of Truth` throughout multiple cycles. As such, over time, as issues occur, or code repeatedly regresses in the same way, seek to align our `Source of Truth` such that the Root Cause of such occurances is codified so that it can be avoided on subsequent cycles visits to those Code artifacts.
3.  Please output entire Document or Code artifacts. Do not worry about Token length. If your length continues for too long, and you reach the 600 second timeout, I will simply incorporate the work you did complete, and we can simply continue from where you left off. Better to have half of a solution to get started with, than not to have it. **Preference is for larger, more complete updates over smaller, incremental ones to align with the human curator's parallel processing workflow.** The human curator often sends the same prompt to multiple AI instances simultaneously and selects the most comprehensive response as the primary base for the next cycle, using other responses as supplementary information. Providing more complete updates increases the likelihood of a response being selected as the primary base.
4.  Do not output artifacts that do not require updates in this cycle. (Eg. Do not do this: // Updated on: Cycle 1040 (No functional changes, only cycle header))
5.  **Critical: `flattened_repo_v2.txt` contains all project files. Output updated *individual* files that are part of it (like `<src/state/coreStore.ts>...`). However, do **NOT** output the surrounding Artifact container tags (`<flattened_repo_v2.txt>...</flattened_repo_v2.txt>`) or any auto-generated metadata sections within it (like the Total Files summary, Top 10 list, or the `<files list>` section) which are created by the `flatten.js` script.**
5.1. `flattened_repo_v2.txt` is a copy of the codebase, generated by a script; assume its an accurate representation of the existing codebase, but not necessarily a 'source of truth' like we treat our documents as, our codebase is a living artifact, documents, while we can update them, should be considered less transient.
5.2. **`.local` File Convention:** To manage token count, some large data files (e.g., `researchNodes.ts`) may be represented by a truncated `.local.ts` version in the context. This version contains the essential structure and a few examples. If the full content of a file is required for a task (e.g., a comprehensive data refactor or fixing a bug related to a specific entry), explicitly state this need in your summary of actions and request that the curator swap the `.local.ts` file with the full `.ts` version in the `files_list.txt` for the subsequent cycle.
6.  remember to output complete artifacts without placeholders, im taking your output, putting it in winmerge, and confirming we arent losing data in the update. when you provide placeholders, my cursory review turns into a meticulous file parsing, taking me from what is 5 seconds per artifact to upwards of 5 minutes, only to realize that the output is actually un-parseable, due to the nature of relativity, as the theory of relativity also applies to code. if you give me a code snippet, and do not give me the code surrounding that snippet, i do not know where that code should go. by providing the complete file, on the other hand, i can put it in a diff, see easily what was altered, and if anything was accidentally omitted or lost, i can be sure that it's retained.
7.  **Update documentation before writing code.** document artifacts are like our project readme files, our source of truth. they are our blueprints. they guide the code we write. when we realize we need to alter our approach or invent new game mechanics, we update the source of truth first, cause english is easy and flexible, then we codify that.
8.  this query is part of a larger software engineering project
9.  After you complete delivery on a code artifact, review it to make sure you did not miss any intermediary files. for instance, if we have a DevelopmentSystem.ts, using the componentData.ts, which is displaying on the ComponentProductionTab.tsx. But then theres also still a DevPanel.tsx file that is in-between that *could*, but shouldnt, get overlooked.
10. If you are deciding where to put a particular piece of code or function, and due to its nature, there are one or more candidate files that it could be placed in, choose the smaller file (in tokens).
11. Begin your response with a course of action and end with a review of your work, surface any self corrections in the summary of changes for the subsequent cycle.
12. do not underestimate how much you can accomplish in a given cycle; you'd only accomplish handicapping yourself. (Eg. you've authored this whole thing with just my guidance. good job, keep it up.)
13. Not as relevant for this project: **Log State Button:** The 'Log State' button in the `DevInfoOverlay` is a dynamic debugging tool. Modify the `triggerDebugLogs` action in `uiStore.ts` to output specific state information relevant to the current bug being investigated. **See A85 (Logging Guide) for usage details.**
14. Not as relevant for this project: **Regression Case Studies:** Use Artifact A106 to document persistent or complex bugs and their resolutions. Add entries *after* a fix is confirmed to codify the RCA and solution, preventing future regressions.
15. Include in your cycle summary, a short list of files you've updated. This makes it easy for my reviews.
16. if you seem to have spare time in a cycle, see if you can spot any particular file with excessive levels of comments or logging that seems extensive and for troubleshooting an error that has since been resolved, see to it to clean those files but preserve their functionalities. im just looking to shave off excess tokens wherever possible in the master_content.txt file.
17. if you see `(No change from C850)` such language, it's data loss. there was supposed to be actual language behind that placeholder, but in one iteration (C850, in this case) you had provided a placeholder, and i 'missed it' and did not capture the initial information. you either need to deliver the placeholder in such a way as i can easily press the left arrow instead of the rigth arrow in winmerge to not accept that part, but to also not have winmerge confuse it with the rest, otherwise i must manually parse the information. when the process is a single keystroke, i can manage it quickly enough. when we remove that ability because you provided me data in a format that has placeholders AND the placeholders do not parse within winmerge such that it removes the benefit winmerge is adding, then we have our problem. when you see this, try to correct it using whatever current relevant context you have.
18. basically, you should not worry about brevity, because when you go too long, your response gets interrupted by the system anyway. its better that the products you do deliver are all complete except for the last one, rather than you delivering all incomplete products, including the last one. does that make sense?
19. remember, do not stop outputting for the reason of preventing a potential artifact interruption mid-output. you actually end up stopping yourself from producting two or three additional files before you actually get interrupted. what i mean is, in the outputs where you do not do this, you produce for 500 seconds, producing 7-9 files, and only the last one is interrupted and unusable. compared to when you stop yourself prematurely, for the reason stated, and you produce for 180 seconds and provide maybe 3-4 files. even with the -1, producing as much as you can still outperforms the alternative.
20. This is a misaligned statement: `// (For full history, see master_content.txt)` because your changes get rolled into master_content.txt. therefore, if you remove the history, then when your updates are rolled in, they will remove the full history. understand? after a while, the history is not relevant and can be rolled out, for a while, it ought to stay. you can see what we're working on + the current cycle and make this determination.
21. Each time we create a new documentation artifact, lets also create the key/value pairs needed for me to add it into our Master Artifact List. they can simply be added into the new artifact itself and ill make the new entry in A0. this will solve for me manually generating a description and tag for each new documentation artifact. also, dont place `/` in the title/name of a documentation artifact. VSCode treats it as a folder separator.
21.1. when creating a new documentation artifact, also just update the master artifacts list itself.
</M3. Interaction Schema>

<M4. current project scope>
I want to build a turn-based tactical RPG game using the Phaser game engine and TypeScript. The game should feature a grid-based combat system similar to Final Fantasy Tactics or XCOM.
</M4. current project scope>

<M5. organized artifacts list>
# No artifacts exist yet.
</M5. organized artifacts list>

<M6. Cycles>
<Cycle 0>
<Cycle Context>
Review the user's project scope in M4. Your task is to act as a senior project architect and begin establishing the necessary documentation to achieve the user's goals. You have been provided with a set of best-practice templates for software engineering documentation as static context. Use these examples to guide your output. Your first response should be to generate a starter set of artifacts for this new project. Begin by creating a Master Artifact List (A0), similar to the provided template, and then create the first few essential planning documents (e.g., Project Vision, High-Level Requirements).
</Cycle Context>
<Static Context>
<T1. Template - Master Artifact List.md>
...
</T1. Template - Master Artifact List.md>

<T2. Template - Project Vision and Goals.md>
...
</T2. Template - Project Vision and Goals.md>

... (and so on for all templates T1-T10) ...

</Static Context>
</Cycle 0>
</M6. Cycles>

<M7. Flattened Repo>
<!-- No files selected for initial prompt -->
</M7. Flattened Repo>

</prompt.md>
</file_artifact>

<file path="src/Artifacts/A72. DCE - README for Artifacts.md">
# Artifact A72: DCE - README for Artifacts
# Date Created: C158
# Author: AI Model & Curator
# Updated on: C183 (Strengthen Git initialization and `.gitignore` guidance)

- **Key/Value for A0:**
- **Description:** The content for the `README.md` file that is automatically created in a new project's `src/Artifacts` directory, explaining the purpose of the extension and the artifact-driven workflow.
- **Tags:** documentation, onboarding, readme, source of truth

## 1. Welcome to the Data Curation Environment (DCE)

This directory (`src/Artifacts/`) is the heart of your project's planning and documentation. It's managed by the **Data Curation Environment (DCE)**, a VS Code extension designed to streamline AI-assisted development.

This `README.md` file was automatically generated to provide context for you (the developer) and for the AI assistants you will be working with.

## 2. What is an "Artifact"?

In the context of this workflow, an **Artifact** is a formal, written document that serves as a "source of truth" for a specific part of your project. Think of these files as the official blueprints, plans, and records.

The core principle of the DCE workflow is **"Documentation First."** Before writing code, you and your AI partner should first create or update an artifact that describes the plan.

## 3. The Iterative Cycle Workflow

Development in the DCE is organized into **Cycles**. You have just completed the initial setup.

### Your Next Steps

1.  **Initialize Your Git Repository (CRITICAL):**
    To take full advantage of the DCE's testing workflow (creating baselines and restoring changes), you **must** initialize a Git repository.
    
    Open a terminal in your project's root directory (you can use the integrated terminal in VS Code: `Terminal > New Terminal`) and run the following commands:
    ```bash
    git init
    # Create or update your .gitignore file with the line below
    echo ".vscode/" >> .gitignore
    git add .
    git commit -m "Initial commit"
    ```
    **Why `.gitignore`?** The DCE saves its state in a `.vscode/dce_history.json` file. Adding `.vscode/` to your `.gitignore` is crucial to prevent the extension's UI from flashing every time it auto-saves. For a complete guide, refer to the `GitHub Repository Setup Guide.md` artifact.

2.  **Submit Your First Prompt:** The `prompt.md` file has been automatically opened for you. This file contains your project plan and instructions for the AI. Copy its entire contents and paste it into your preferred AI chat interface (like Google's AI Studio, ChatGPT, etc.).

3.  **Review and Accept Responses:** Paste the AI's responses back into the "Resp 1", "Resp 2", etc. tabs in the Parallel Co-Pilot panel. The UI will guide you through parsing the responses, selecting the best one, and accepting its changes into your workspace.

4.  **Repeat:** This completes a cycle. You then start the next cycle, building upon the newly accepted code and documentation.

This structured, iterative process helps maintain project quality and ensures that both human and AI developers are always aligned with the project's goals.
</file_artifact>

<file path="src/Artifacts/A73. DCE - GitService Plan.md">
# Artifact A73: DCE - GitService Plan
# Date Created: C175
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A plan for a dedicated backend service to encapsulate all interactions with the Git command line for features like baselining and restoring.
- **Tags:** plan, architecture, backend, git, service

## 1. Overview & Goal

To implement the Git-integrated testing workflow (`A70`), we need a dedicated backend component to handle the execution of Git commands. The goal is to create a new, single-responsibility `GitService` that encapsulates all interactions with the Git CLI. This improves modularity and makes the code easier to maintain and test.

## 2. Service Responsibilities

The `GitService` will be responsible for:
-   Executing `git` commands in the user's workspace directory using Node.js's `child_process`.
-   Parsing the output (stdout and stderr) of Git commands.
-   Handling errors gracefully and providing clear feedback to the user.

## 3. Technical Implementation Plan

1.  **New File (`src/backend/services/git.service.ts`):**
    *   Create the new service file.
    *   It will import `exec` from `child_process` and `vscode`.

2.  **Core `execGitCommand` Method:**
    *   A private helper method will be the foundation of the service: `private execGitCommand(command: string): Promise<{ stdout: string; stderr: string }>`.
    *   This method will wrap the `exec` call in a `Promise`, making it easy to use with `async/await`.
    *   It will get the workspace root path from `vscode.workspace.workspaceFolders`.
    *   It will execute the command within that workspace directory.

3.  **Public Handler Methods:**
    *   **`handleGitBaselineRequest(commitMessage: string)`:**
        *   Calls `await this.execGitCommand('git add .')`.
        *   On success, calls `await this.execGitCommand(\`git commit -m "${commitMessage}"\`)`.
        *   Will show a `vscode.window.showInformationMessage` on success or `showErrorMessage` on failure.
    *   **`handleGitRestoreRequest()`:**
        *   Constructs the command: `git restore -- . ':(exclude).vscode/dce_history.json'`.
        *   Calls `await this.execGitCommand(...)`.
        *   Shows appropriate success or error messages to the user.

4.  **Integration:**
    *   The new `GitService` will be instantiated in `src/backend/services/services.ts`.
    *   The `parallel-copilot.view/on-message.ts` file will be updated to call the new service's methods when it receives the `RequestGitBaseline` and `RequestGitRestore` IPC messages.
</file_artifact>

<file path="src/Artifacts/A74. DCE - Per-Input Undo-Redo Feature Plan.md">
# Artifact A74: DCE - Per-Input Undo-Redo Feature Plan
# Date Created: C178
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A plan to implement a separate undo/redo history for each major text input in the PCPP to provide a more intuitive editing experience.
- **Tags:** feature plan, ui, ux, undo, redo, state management

## 1. Overview & Goal

Currently, all text inputs in the Parallel Co-Pilot Panel (e.g., Cycle Title, Cycle Context, Ephemeral Context) share a single, global undo/redo history stack, which is the default behavior for a webview. This leads to a confusing and non-standard user experience. For example, typing in the "Cycle Context" and then pressing `Ctrl+Z` in the "Cycle Title" input will undo the change made in the context field, not the title field.

The goal of this feature is to implement a separate, independent undo/redo history for each major text input, aligning the panel's behavior with standard application design.

## 2. User Story

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-UNDO-01 | **Per-Input Undo/Redo** | As a developer, when I am editing multiple text fields, I want `Ctrl+Z` (Undo) and `Ctrl+Y` (Redo) to apply only to the text field I am currently focused on, so I can manage my edits for each field independently. | - Changes made to the "Cycle Title" input can be undone/redone without affecting the other text areas. <br> - Changes made to the "Cycle Context" text area can be undone/redone independently. <br> - Changes made to the "Ephemeral Context" text area can be undone/redone independently. |

## 3. Technical Implementation Plan

This is a complex feature that requires overriding the browser's default undo/redo behavior and implementing a custom state management solution.

1.  **Create a Custom `useHistoryState` Hook:**
    *   A new React hook, `useHistoryState`, will be created to manage the state history for a single value (e.g., a string).
    *   This hook will manage a state object: `{ past: string[], present: string, future: string[] }`.
    *   It will return an array: `[state, setState, undo, redo, canUndo, canRedo]`.
    *   The `setState` function will update the `present` value and push the old `present` value onto the `past` stack.
    *   The `undo` and `redo` functions will move values between the `past`, `present`, and `future` stacks.

2.  **Integrate the Hook in `view.tsx`:**
    *   The main `view.tsx` component will use this custom hook for each of the relevant state variables:
        ```typescript
        const [cycleTitle, setCycleTitle, undoTitle, redoTitle] = useHistoryState('');
        const [cycleContext, setCycleContext, undoContext, redoContext] = useHistoryState('');
        const [ephemeralContext, setEphemeralContext, undoContext, redoContext] = useHistoryState('');
        ```

3.  **Implement Custom `onKeyDown` Handlers:**
    *   A new `onKeyDown` handler will be created and attached to each of the relevant input/textarea components.
    *   This handler will check for `Ctrl+Z` and `Ctrl+Y` (and their platform-specific variants).
    *   When an undo/redo shortcut is detected, it will call `event.preventDefault()` to stop the default browser action.
    *   It will then call the corresponding `undo` or `redo` function from the `useHistoryState` hook for that specific input.

4.  **Refactor `NumberedTextarea.tsx`:**
    *   The `NumberedTextarea` component will need to be updated to accept the new, more complex `onKeyDown` handler.

This approach will provide the robust, per-input undo/redo functionality required for a professional user experience.
</file_artifact>

<file path="src/Artifacts/A76. DCE - Word Wrap Line Numbering Challenges.md">
# Artifact A76: DCE - Word Wrap Line Numbering Challenges
# Date Created: C181
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** Explains the technical complexity of implementing line numbers that accurately reflect visual word wrapping in a textarea component.
- **Tags:** documentation, technical debt, ui, ux, word wrap, line numbers

## 1. Problem Statement

The user has requested that the line numbers in the `NumberedTextarea` component should respect word wrapping. Currently, the component counts lines based on newline characters (`\n`). This means a single logical line that visually wraps into three lines in the UI still only receives one line number. The user correctly points out that this is not ideal.

This document explains why this seemingly simple feature is technically complex to implement in a standard HTML `<textarea>` and outlines potential solutions.

## 2. The Core Challenge: Logical vs. Visual Lines

The fundamental issue is the difference between how a `<textarea>` handles content versus how the browser renders it.

*   **Logical Lines:** The `<textarea>` element's `value` is a simple string. The only concept of a "line" it has is the presence of a newline character (`\n`). When we split the string by `\n`, we are counting these logical lines. This is what our current implementation does, and it's fast and simple.

*   **Visual Lines:** Word wrapping is a purely visual phenomenon handled by the browser's rendering engine. The browser calculates how many words fit on a line based on the element's width, font size, font family, letter spacing, and word spacing. It then visually breaks the line and renders the overflow text below. **Crucially, the browser does not expose a simple API to ask, "How many visual lines are you currently rendering for this text?"**

Because we cannot directly query the rendered line count, we must resort to indirect methods to calculate it.

## 3. Potential Solutions & Their Complexity

Here are the common approaches to solving this problem, each with its own trade-offs.

### Solution A: The Hidden `div` Measurement Technique

This is the most common and reliable method.

1.  **How it Works:**
    *   Create a hidden `div` element off-screen or with `visibility: hidden`.
    *   Apply the *exact same* CSS styles to this `div` as the `<textarea>` (width, font, padding, etc.).
    *   Copy the content of the `<textarea>` into the `innerHTML` of the hidden `div`.
    *   Calculate the number of visual lines by dividing the `scrollHeight` of the hidden `div` by its `line-height`.

2.  **Complexity & Downsides:**
    *   **Performance:** This calculation must be run on every single keystroke, as any character change could affect word wrapping. Copying large amounts of text into the DOM and forcing a browser re-layout on every key press can be performance-intensive and may cause input lag.
    *   **Fragility:** The CSS styles must be perfectly synchronized. Any discrepancy in padding, border, font-size, etc., will result in an incorrect calculation.
    *   **Implementation:** Requires careful DOM manipulation within our React component, managing refs to both the textarea and the hidden div, and ensuring the calculation is efficient.

### Solution B: Using a Full-Fledged Code Editor Component

Instead of building our own, we could replace the `<textarea>` with a lightweight, embeddable code editor library.

1.  **How it Works:**
    *   Integrate a library like **CodeMirror** or **Monaco Editor** (the editor that powers VS Code itself, though it's much heavier).
    *   These components are not simple textareas; they are complete editing surfaces that render each line individually. Because they control the rendering process, they have full knowledge of visual lines and can provide accurate line numbering out of the box.

2.  **Complexity & Downsides:**
    *   **Bundle Size:** These libraries are significantly larger than a simple React component, which would increase the extension's load time.
    *   **Integration:** Integrating them into our existing React and VS Code Webview architecture can be complex, requiring custom wrappers and careful handling of the component's lifecycle.
    *   **Overkill:** For a simple context input field, using a full code editor might be architectural overkill.

## 4. Conclusion & Path Forward

The user's request is valid and would be a great UX improvement. However, due to the performance and implementation complexities described above, this feature is considered a significant piece of technical debt that requires a dedicated cycle to solve correctly.

The current priority is to fix the more critical usability bugs like scrolling, focus management, and highlighting. Once the component is stable, we can revisit this challenge and dedicate a future cycle to implementing one of the more advanced solutions above.
</file_artifact>

<file path="src/Artifacts/A78. DCE - Whitepaper - Process as Asset.md">
# Artifact A78: DCE - Whitepaper - Process as Asset

# Date Created: C182

# Author: AI Model & Curator

  - **Key/Value for A0:**
  - **Description:** A whitepaper targeted at high-level stakeholders (NSA, UKILRN) explaining the strategic value of the DCE by focusing on how it transforms the human-AI interaction process into a persistent, shareable asset that accelerates specialized content creation.
  - **Tags:** whitepaper, documentation, strategy, process, acceleration, human-ai collaboration

-----

# Process as Asset: Accelerating Specialized Content Creation through Structured Human-AI Collaboration

**A Whitepaper on the Data Curation Environment (DCE)**

**Date:** September 4, 2025
**Audience:** High-Level Stakeholders (NSA, UKILRN, Naval Operations)

-----

## 1\. Executive Summary

Organizations tasked with developing highly specialized content—such as technical training materials, intelligence reports, or complex software documentation—face a constant bottleneck: the time and expertise required to curate accurate data, collaborate effectively, and rapidly iterate on feedback. Traditional workflows, even those augmented by Artificial Intelligence (AI), are often ad-hoc, opaque, and inefficient.

This whitepaper introduces the Data Curation Environment (DCE), a framework and toolset integrated into the standard developer environment (Visual Studio Code) that transforms the content creation process itself into a valuable organizational asset. The DCE provides a structured, human-in-the-loop methodology that enables rapid dataset curation, seamless sharing of curated contexts between colleagues, and instant iteration on feedback.

By capturing the entire workflow as a persistent, auditable knowledge graph, the DCE doesn't just help teams build content faster; it provides the infrastructure necessary to scale expertise, ensure quality, and accelerate the entire organizational mission.

## 2\. The Challenge: The Bottleneck of Ad-Hoc AI Interaction

The integration of Large Language Models (LLMs) into organizational workflows promises significant acceleration. However, the way most organizations interact with these models remains unstructured and inefficient, creating several critical bottlenecks:

1.  **The Context Problem:** The quality of an LLM's output is entirely dependent on the quality of its input context. Manually selecting, copying, and pasting relevant data (code, documents, reports) into a chat interface is time-consuming, error-prone, and often results in incomplete or bloated context.
2.  **The Collaboration Gap:** When a task is handed off, the context is lost. A colleague must manually reconstruct the previous operator's dataset and understand their intent, leading to significant delays and duplication of effort.
3.  **The Iteration Overhead:** When feedback requires changes to a complex dataset, operators often resort to manual edits because re-prompting the AI requires reconstructing the entire context again. This negates the efficiency gains of using AI in the first place.
4.  **The Auditability Vacuum:** The iterative process of human-AI interaction—the prompts, the AI's suggestions, and the human's decisions—is a valuable record of the work, yet it is rarely captured in a structured, reusable format.

These challenges prevent organizations from fully realizing the potential of AI. They are forced to choose between the speed of AI and the rigor of a structured process.

## 3\. The Solution: The Data Curation Environment (DCE)

The Data Curation Environment (DCE) is designed to eliminate these bottlenecks by providing a structured framework for human-AI collaboration directly within the operator's working environment. It moves beyond the limitations of simple chat interfaces by introducing three core capabilities:

### 3.1. Precision Context Curation

The DCE replaces manual copy-pasting with an intuitive, integrated file management interface. Operators can precisely select the exact files, folders, or documents required for a task with simple checkboxes. The DCE intelligently handles various file types—including code, PDFs, Word documents, and Excel spreadsheets—extracting the relevant textual content automatically.

This ensures that the AI receives the highest fidelity context possible, maximizing the quality of its output while minimizing operator effort.

### 3.2. Parallel AI Scrutiny and Integrated Testing

The DCE recognizes that relying on a single AI response is risky. The "Parallel Co-Pilot Panel" allows operators to manage, compare, and test multiple AI-generated solutions simultaneously.

Integrated diffing tools provide immediate visualization of proposed changes. Crucially, the DCE offers a one-click "Accept" mechanism, integrated with Git version control, allowing operators to instantly apply an AI's suggestion to the live workspace, test it, and revert it if necessary. This creates a rapid, low-risk loop for evaluating multiple AI approaches.

### 3.3. The Cycle Navigator and Persistent Knowledge Graph

Every interaction within the DCE is captured as a "Cycle." A cycle includes the curated context, the operator's instructions, all AI-generated responses, and the operator's final decision. This history is saved as a structured, persistent Knowledge Graph.

The "Cycle Navigator" allows operators to step back through the history, review past decisions, and understand the evolution of the project.

## 4\. Transforming the Process into an Asset

The true power of the DCE lies in how these capabilities combine to transform the workflow itself into a persistent organizational asset.

### 4.1. The Curated Context as a Shareable Asset

In the DCE workflow, the curated context (the "Selection Set") is not ephemeral; it is a saved, versioned asset. When a task is handed off, the new operator doesn't just receive the files; they receive the exact context and the complete history of the previous operator's interactions.

This seamless handoff eliminates the "collaboration gap," allowing teams to work asynchronously and efficiently on complex datasets without duplication of effort.

### 4.2. Accelerating Iteration and Maintenance

The DCE dramatically reduces the overhead associated with feedback and maintenance. Because the context is already curated and saved, operators can rapidly iterate on complex datasets without manual reconstruction.

If feedback requires changes, the operator simply loads the curated context and issues a targeted instruction to the AI. The AI performs the edits against the precise context, completing the update in a single, efficient cycle. This enables organizations to maintain complex systems and content with unprecedented speed.

### 4.3. Scaling Expertise and Ensuring Auditability

The Knowledge Graph generated by the DCE serves as a detailed, auditable record of the entire development process. This is invaluable for:

  * **Training and Onboarding:** New personnel can review the cycle history to understand complex decision-making processes and best practices.
  * **After-Action Reviews:** The graph provides a precise record of what was known, what was instructed, and how the AI responded, enabling rigorous analysis.
  * **Accountability:** In mission-critical environments, the DCE provides a transparent and traceable record of human-AI interaction.

## 5\. Use Case Spotlight: Rapid Development of Training Materials

A government agency needs to rapidly update a specialized technical training lab based on new operational feedback. The feedback indicates that in the existing exam questions, "the correct answer is too often the longest answer choice," creating a pattern that undermines the assessment's validity.

### The Traditional Workflow (Weeks)

1.  **Identify Affected Files:** An analyst manually searches the repository to find all relevant question files (days).
2.  **Manual Editing:** The analyst manually edits each file, attempting to rewrite the "distractor" answers to be longer and more plausible without changing the technical meaning (weeks).
3.  **Review and Rework:** The changes are reviewed, often leading to further manual edits (days).

### The DCE Workflow (Hours)

1.  **Curate Context (Minutes):** The analyst uses the DCE interface to quickly select the folder containing all exam questions. This creates a precise, curated dataset.
2.  **Instruct the AI (Minutes):** The analyst loads the curated context into the Parallel Co-Pilot Panel and provides a targeted instruction: "Review the following exam questions. For any question where the correct answer is significantly longer than the distractors, rewrite the distractors to include more meaningful but ultimately fluffy language to camouflage the length difference, without changing the technical accuracy."
3.  **Review and Accept (Hours):** The AI generates several proposed solutions. The analyst uses the integrated diff viewer to compare the options. They select the best solution and "Accept" the changes with a single click.
4.  **Verification:** The updated lab is immediately ready for final verification.

## 6\. Conclusion

The Data Curation Environment is more than just a developer tool; it is a strategic framework for operationalizing AI in complex environments. By addressing the critical bottlenecks of context curation, collaboration, and iteration, the DCE transforms the human-AI interaction workflow into a structured, persistent, and valuable organizational asset.

For organizations facing an ever-increasing list of priorities and a need to accelerate the development of specialized content, the DCE provides the necessary infrastructure to scale expertise, ensure quality, and achieve the mission faster.
</file_artifact>

<file path="src/Artifacts/A80. DCE - Settings Panel Plan.md">
# Artifact A80: DCE - Settings Panel Plan
# Date Created: C6
# Author: AI Model & Curator
# Updated on: C17 (Reflect removal of Context Chooser icon)

- **Key/Value for A0:**
- **Description:** A plan for a new settings panel, accessible via a command, to house changelogs, settings, and other informational content.
- **Tags:** feature plan, settings, ui, ux, changelog

## 1. Overview & Goal

As the Data Curation Environment (DCE) grows in features, users will need a centralized location to manage settings, view changelogs, and access help documentation. The goal of this feature is to create a dedicated "Settings & Help" panel that serves as this central hub.

**Status (C17):** Implemented. The panel is now functional and opens as a `WebviewPanel` in the main editor area. The entry point icon from the Context Chooser view has been removed, and the panel is now accessed via the `DCE: Open Settings & Help` command.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-SET-01 | **Access Help and Settings** | As a user, I want to execute a command to open a dedicated panel, so I can access settings and information about the extension. | - A command `DCE: Open Settings & Help` is available in the command palette. <br> - Executing it opens a new `WebviewPanel` in the main editor area, titled "DCE Settings & Help". |
| P2-SET-02 | **View Changelog** | As a user, I want to view a changelog within the settings panel, so I can see what has changed in the latest version of the extension. | - The settings panel has a "Changelog" tab or collapsible section. <br> - This section displays the content of a `CHANGELOG.md` file from the workspace root, rendered as formatted Markdown. |
| P2-SET-03 | **View About/README** | As a user, I want to view an "About" page that explains the purpose and workflow of the DCE, so I can get help on how to use it. | - The settings panel has an "About" tab or collapsible section. <br> - This section displays the content of the `README.md` file from the workspace root. |
| P2-SET-04 | **Manage Settings** | As a user, I want to manage extension settings from this panel, so I can configure features to my preference. | - The settings panel has a "Settings" section. <br> - It provides UI controls for managing settings, such as a field for a local API URL and a toggle for "Free Mode" vs. "Local Mode". |

## 3. Technical Implementation Plan

1.  **Command Registration:**
    *   **`package.json`:** The `view/title` menu contribution for the `viewType.sidebar.contextChooser` has been removed. A new command `dce.openSettingsPanel` is registered for the command palette.
    *   **`commands.ts`:** The command executes an internal `dce.showSettingsPanel` command.
    *   **`extension.ts`:** The handler for `dce.showSettingsPanel` creates and manages a singleton `WebviewPanel`.

2.  **New Settings Webview (`settings.view/`):**
    *   `view.tsx` renders a UI with collapsible sections for "Changelog", "About", and "Settings".
    *   On mount, it sends IPC messages to the backend to request the content for the `CHANGELOG.md` and `README.md` files.
    *   The "Settings" section contains placeholder UI elements for future functionality.

3.  **Backend Logic (`file-operation.service.ts`):**
    *   The `handleChangelogContentRequest` and `handleReadmeContentRequest` methods read the respective files from the workspace root and send their content back to the settings webview.
    *   **IPC:** The existing channels (`RequestChangelogContent`, `SendChangelogContent`, etc.) facilitate this communication.
</file_artifact>

<file path="src/Artifacts/A81. DCE - Curator Activity Plan.md">
# Artifact A81: DCE - Curator Activity Plan
# Date Created: C6
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A plan to introduce a new `<curator_activity>` section to the AI response format, allowing for explicit instructions to the human curator.
- **Tags:** documentation, process, interaction schema, workflow

## 1. Overview & Goal

Currently, if the AI needs the human curator to perform an action it cannot (e.g., delete a file, install a dependency), it must embed this instruction within the "Course of Action" or summary. This can be missed and is not machine-parsable.

The goal of this feature is to create a formal, dedicated channel for these instructions. A new `<curator_activity>...</curator_activity>` section will be added to the interaction schema. The extension will parse this section and display it in a distinct, highly visible area of the UI, ensuring the curator sees and can act upon these critical instructions.

## 2. User Story

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-CA-01 | **Receive Curator Instructions** | As a curator, when an AI response includes actions I need to perform manually, I want to see them clearly separated from the AI's own course of action, so I don't miss them. | - The AI can include a `<curator_activity>` block in its response. <br> - The PCPP parser extracts the content of this block. <br> - The UI displays this content in a new, clearly labeled "Curator Activity" collapsible section. |

## 3. Technical Implementation Plan

1.  **Update Interaction Schema:**
    *   **`A52.2 DCE - Interaction Schema Source.md`:** A new rule will be added, defining the `<curator_activity>...</curator_activity>` section and explaining its purpose to the AI.

2.  **Update Parser (`response-parser.ts`):**
    *   A new `CURATOR_ACTIVITY_REGEX` will be added to extract the content from the new tags.
    *   The `ParsedResponse` interface in `pcpp.types.ts` will be updated with a new optional property, `curatorActivity?: string`.

3.  **Update UI (`ParsedView.tsx`):**
    *   A new `CollapsibleSection` will be added to the parsed view.
    *   It will be titled "Curator Activity".
    *   It will be conditionally rendered only if `parsedContent.curatorActivity` exists and is not empty.
    *   The content will be rendered as formatted Markdown.
</file_artifact>

<file path="src/Artifacts/A82. DCE - Advanced Exclusion Management Plan.md">
# Artifact A82: DCE - Advanced Exclusion Management Plan
# Date Created: C6
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A plan for a feature allowing users to right-click files or folders and add them to a persistent exclusion list, preventing them from being automatically selected or flattened.
- **Tags:** feature plan, context menu, exclusion, ignore, ux

## 1. Overview & Goal

Users need a simple, intuitive way to manage which files are included in the Data Curation Environment's view and processes. While some files are excluded by default (e.g., `.git`), users may have project-specific directories (like `dist`, `build`, or custom log folders) that they want to permanently ignore.

The goal of this feature is to allow users to right-click any file or folder in the main file tree and add it to a persistent exclusion list, which will be stored in the workspace's settings.

## 2. User Story

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P1-EX-01 | **Exclude from View** | As a developer, I want to right-click a build output directory (e.g., `dist`) and select "Add to DCE Exclusions", so it no longer appears in the Data Curation file tree and is never included in flattened contexts. | - A new "Add to DCE Exclusions" option is available in the file tree's right-click context menu. <br> - Selecting this option adds the file or folder's path to a custom setting in `.vscode/settings.json`. <br> - The file tree immediately refreshes and the excluded item (and its children) is no longer visible. |

## 3. Technical Implementation Plan

1.  **Configuration (`package.json`):**
    *   A new configuration point will be defined in the `contributes.configuration` section.
    *   This will create a new setting, `dce.files.exclude`, which will be an object similar to the native `files.exclude`.

2.  **Backend (`file-tree.service.ts`):**
    *   The file traversal logic will be updated to read this new `dce.files.exclude` setting from the workspace configuration.
    *   It will merge these user-defined patterns with the default exclusion patterns before scanning the file system.

3.  **UI & IPC:**
    *   **`ContextMenu.tsx`:** A new menu item, "Add to DCE Exclusions," will be added.
    *   **IPC:** A new IPC channel, `RequestAddToExclusions`, will be created.
    *   **Backend Handler (`settings.service.ts` - new or existing):** A new handler will receive the path to exclude. It will:
        1.  Get the current exclusion configuration object using `vscode.workspace.getConfiguration('dce')`.
        2.  Add the new path to the object (`newExclusion[path] = true`).
        3.  Update the configuration using `config.update('files.exclude', newExclusion, vscode.ConfigurationTarget.Workspace)`.
        4.  This will automatically trigger a refresh of the file tree as the configuration has changed.

This approach leverages VS Code's built-in settings infrastructure, making the exclusions persistent and easily manageable for the user.
</file_artifact>

<file path="src/Artifacts/A85. DCE - Phase 3 - Model Cards Feature Plan.md">
# Artifact A85: DCE - Phase 3 - Model Cards Feature Plan
# Date Created: C17
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A plan for a feature allowing users to create and manage "model cards" to easily switch between different local or remote LLM configurations.
- **Tags:** feature plan, settings, ui, ux, llm, configuration, phase 3

## 1. Overview & Goal

As the DCE project moves towards deeper AI integration (Phase 3), users will need a flexible way to manage connections to different Large Language Models (LLMs). A single text field for a local API is insufficient for users who may want to switch between different local models (e.g., a coding model vs. a writing model) or connect to various remote APIs.

The goal of this feature is to create a "Model Card" system within the DCE Settings Panel. This will allow users to create, save, and select from multiple configurations, making it easy to switch between different AI backends.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P3-MC-01 | **Create a Model Card** | As a user, I want to create a new "model card" where I can input all the necessary information to connect to an LLM, so I can configure different models for different tasks. | - A "New Model Card" button exists in the Settings Panel. <br> - Clicking it opens a form with fields for: Display Name, API Endpoint URL, API Key (optional), and Context Window Size (tokens). <br> - A "Save" button persists this card. |
| P3-MC-02 | **Manage Model Cards** | As a user, I want to see a list of my saved model cards and be able to edit or delete them, so I can manage my configurations. | - The Settings Panel displays a list of all saved model cards. <br> - Each card in the list has "Edit" and "Delete" buttons. |
| P3-MC-03 | **Select Active Model** | As a user, I want to select one of my model cards as the "active" model, so the extension knows which LLM to use for its API calls. | - Each model card in the list has a "Select" or "Activate" button (or a radio button). <br> - A default, non-deletable "AI Studio" (manual mode) card is always present. <br> - The currently active model is visually highlighted. |

## 3. Proposed UI/UX

The "Settings" section of the existing Settings Panel will be redesigned to accommodate this feature.

1.  **Main View:**
    *   A list of existing model cards will be displayed. Each entry will show the `Display Name` and part of the `Endpoint URL`.
    *   Each entry will have `Edit`, `Delete`, and `Select` buttons.
    *   A prominent "Add New Model Card" button will be at the bottom of the list.

2.  **Creation/Editing View:**
    *   Clicking "Add New" or "Edit" will either show a modal or navigate to a separate view within the panel.
    *   This view will contain a form with the following fields:
        *   **Display Name:** (e.g., "Local Llama3-70B", "OpenAI GPT-4o")
        *   **API Endpoint URL:** The full URL for the API.
        *   **API Key:** (Optional) A password field for the API key.
        *   **Context Window Size:** A number input for the model's context window in tokens. This is crucial for future calculations and prompt management.
    *   "Save" and "Cancel" buttons will be present.

## 4. Technical Implementation Plan (High-Level)

1.  **Data Storage:**
    *   Model card configurations will be stored in the VS Code `workspaceState` or global state under a dedicated key (e.g., `dce.modelCards`).
    *   API keys will be stored securely using the `SecretStorage` API, keyed by a unique ID associated with each model card.

2.  **Backend (`settings.service.ts` - New or Existing):**
    *   A new service, or an expansion of an existing one, will be needed to manage the CRUD (Create, Read, Update, Delete) operations for model cards.
    *   It will handle the logic for reading/writing from `workspaceState` and `SecretStorage`.

3.  **Frontend (`settings.view.tsx`):**
    *   The settings view will be refactored into a more complex React component that manages the state for the list of cards and the editing form.
    *   It will use new IPC channels to communicate with the backend service to perform the CRUD operations.
</file_artifact>

<file path="src/Artifacts/A86. DCE - PCPP Workflow Centralization and UI Persistence Plan.md">
# Artifact A86: DCE - PCPP Workflow Centralization and UI Persistence Plan
# Date Created: C19
# Author: AI Model & Curator
# Updated on: C21 (Re-add requirement for Select All buttons)

- **Key/Value for A0:**
- **Description:** A plan to centralize the main workflow buttons in the PCPP, make the animated workflow highlight persistent, and fix the broken cost calculation.
- **Tags:** feature plan, ui, ux, workflow, refactor, bug fix

## 1. Overview & Goal

User feedback from Cycle 19 identified three key areas for improvement in the Parallel Co-Pilot Panel (PCPP):
1.  **Scattered UI:** The buttons for the core workflow are located in different places, making the process unintuitive.
2.  **Ephemeral UI State:** The animated highlight that guides the user disappears if they switch away from the PCPP tab.
3.  **Broken Metric:** The total estimated cost calculation is non-functional.

The goal of this plan is to address all three issues to create a more intuitive, robust, and functional user experience.

## 2. The User Workflow Articulated

To centralize the buttons effectively, we must first define the ideal user workflow as a sequence of steps.

1.  **Paste & Parse:** User pastes responses into tabs. Clicks **`Parse All`**.
2.  **Sort & Select:** User reviews metadata. Clicks **`Sort`** to order responses. Clicks **`Select This Response`** on the most promising one.
3.  **Baseline (Optional):** User may click **`Baseline (Commit)`** to save the current state before testing.
4.  **Accept:** User checks files in the "Associated Files" list and clicks **`Accept Selected`**.
5.  **Test & Restore (Loop):** User tests the applied changes. If they fail, the user clicks **`Restore Baseline`** and returns to Step 4 to test a different set of files or a different response.
6.  **Finalize & Proceed:** Once satisfied, the user provides a cycle title/context and clicks **`Generate prompt.md`** and then **`+`** to start the next cycle.

## 3. Button Centralization Plan

### 3.1. ASCII Mockup of New Toolbar

The new, centralized toolbar will be located directly below the response tabs, making it the central point of interaction.

```
|=================================================================================================|
| [ Resp 1 (5 files, 2.1K tk) ] [ Resp 2 (4 files, 1.8K tk) ] [ Resp 3 ] [ Resp 4 ]      [ Sort ] |
|-------------------------------------------------------------------------------------------------|
|                                                                                                 |
|   +-----------------------------------------------------------------------------------------+   |
|   | [ Parse All ] [ Select This Resp ] [ Baseline ] [ Restore ] [ Accept Selected ]         |   |
|   +-----------------------------------------------------------------------------------------+   |
|                                                                                                 |
| | [v] Associated Files (5) [Select All] [Deselect All Across Responses]                     | | |
| |-------------------------------------------------------------------------------------------| | |
| | [✓] [ ] src/Artifacts/A86. ... .md                                                        | | |
| | [✓] [ ] src/client/views/.../view.tsx                                                     | | |
| | ...                                                                                       | | |
|-------------------------------------------------------------------------------------------------|```

### 3.2. Technical Implementation
-   A new component, `src/client/views/parallel-copilot.view/components/WorkflowToolbar.tsx`, will be created.
-   It will contain all the buttons related to the main workflow.
-   **(C21 Update):** The "Select All" and "Deselect All Across Responses" buttons, which were lost in a previous refactor, will be re-added to the toolbar to provide critical batch selection functionality for associated files.
-   The main `view.tsx` will manage the state for enabling/disabling these buttons and pass the state and `onClick` handlers down as props.
-   The buttons will be removed from their old locations (the main header and the `ParsedView` header). The "Select This Response" button will now act on the currently active tab.

## 4. Persistent Animation Plan

-   **Problem:** The `workflowStep` state is currently a local `useState` in `view.tsx`, which is lost when the webview is hidden and shown again.
-   **Solution:** The `workflowStep` will be elevated to become part of the persisted cycle state.
    1.  **Type Definition:** Add `activeWorkflowStep?: string;` to the `PcppCycle` interface in `src/common/types/pcpp.types.ts`.
    2.  **State Management:** The `saveCurrentCycleState` function in `view.tsx` will now also update the main `PcppCycle` object with the current `workflowStep`.
    3.  **Restoration:** When a cycle is loaded, the `activeWorkflowStep` from the loaded data will be used to initialize the state, ensuring the highlight is correctly re-applied.

## 5. Cost Calculation Fix Plan

-   **Problem:** The total estimated cost always shows `$0.00`.
-   **Investigation:** The cost is calculated based on a `totalPromptTokens` state, which is populated by a message from the backend. The request for this calculation is debounced and triggered by changes to the cycle context or title. It appears this request is not being triggered on the initial load of a cycle.
-   **Solution:**
    1.  In `view.tsx`, locate the `useEffect` hook that handles the `SendInitialCycleData` and `SendCycleData` messages.
    2.  Inside this hook, after the component's state is updated with the new cycle data, add a direct call to the `requestCostEstimation()` function.
    3.  This will ensure that a cost estimation is requested from the backend every time a cycle is loaded, fixing the bug and displaying an accurate cost.
</file_artifact>

<file path="src/Artifacts/A87. VCPG - vLLM High-Throughput Inference Plan.md">
# Artifact A87: VCPG - vLLM High-Throughput Inference Plan

# Date Created: C78
# Author: AI Model
# Updated on: C29 (Add API Proxy Server architecture)

- **Key/Value for A0:**
- **Description:** A research and planning document analyzing the potential of using vLLM for high-throughput, low-latency inference, and detailing the architecture for connecting to it via a secure proxy server.
- **Tags:** guide, research, planning, ai, llm, vllm, inference, performance, proxy

## 1. Vision & Goal

The goal is to investigate and plan the migration of our AI inference backend from the current LM Studio setup to a more performant and scalable solution using **vLLM**. As described by the curator's research, vLLM offers significant performance gains through techniques like continuous batching, which could enable more advanced AI capabilities, such as near-real-time analysis of multiple data streams or providing concurrent, low-latency AI assistance to every user of the DCE extension.

## 2. Analysis of vLLM

Research and community reports highlight several key advantages of vLLM:
-   **High Throughput:** Demonstrations show massive performance increases (e.g., 10,000+ tokens/second on a single high-end GPU).
-   **Continuous Batching:** vLLM's core innovation is its ability to dynamically batch incoming requests. This is highly efficient for serving multiple requests simultaneously, which is key to our goal of generating 10+ parallel responses.
-   **Low Latency:** Sub-100ms time-to-first-token (TTFT) is achievable, which is critical for a responsive user experience.
-   **OpenAI-Compatible Server:** vLLM includes a built-in server that mimics the OpenAI API protocol. This is a critical feature, as it allows our extension and proxy to interact with it using a standard, well-documented interface.

## 3. Proposed Architecture: Secure API Proxy

To securely connect the DCE extension to a powerful vLLM instance, we will use a backend proxy server. This architecture prevents exposing the vLLM server directly to the public internet and gives us a central point of control.

```
+---------------+      +-------------------------+      +----------------------+
| DCE Extension |----->| aiascent.game (Proxy)   |----->|   vLLM Server        |
| (VS Code)     |      | (Node.js/Express)       |      | (Python)             |
+---------------+      +-------------------------+      +----------------------+
```

### 3.1. vLLM Server Setup
-   **Deployment:** The vLLM server will be a dedicated Python application, likely in a Docker container for easy management.
-   **Model:** It can be configured to serve any Hugging Face model compatible with vLLM.
-   **Interface:** It will run the built-in OpenAI-compatible server, listening on a local port (e.g., `8000`).

### 3.2. AI Ascent Proxy Server (`server.ts`)
-   **Role:** The existing `aiascent.game` server will be enhanced to act as a secure proxy.
-   **New Endpoint:** A new API endpoint, `/api/dce/proxy`, will be created.
-   **Logic:**
    1.  This endpoint will receive requests from authenticated DCE extension users.
    2.  It will read the prompt data from the request body.
    3.  It will make a new `fetch` request to the internal vLLM server (e.g., `http://localhost:8000/v1/chat/completions`), forwarding the prompt.
    4.  Crucially, it will **stream** the response from vLLM back to the DCE extension client, providing the low-latency experience we need.

### 3.3. Caddyfile Configuration
-   The existing `Caddyfile` is already configured with a `reverse_proxy` directive that forwards all traffic to the Node.js server. This configuration is sufficient and automatically handles WebSocket upgrades and necessary headers, so no changes are required.

## 4. Implementation Plan (Future Cycle)

1.  **Setup vLLM Server:** Install vLLM and its dependencies, download a model, and run the OpenAI-compatible server.
2.  **Update `server.ts`:** Add the new `/api/dce/proxy` route with the streaming logic.
3.  **Configure DCE:** Update the DCE settings (via a Model Card) to point to the new `https://aiascent.game/api/dce/proxy` endpoint.
4.  **Test:** Send a prompt from the DCE and verify that the response is streamed back from the vLLM server through the proxy.
</file_artifact>

<file path="src/Artifacts/A88. DCE - Native Diff Integration Plan.md">
# Artifact A88: DCE - Native Diff Integration Plan
# Date Created: C22
# Author: AI Model & Curator
# Updated on: C27 (Mark as In Progress)

- **Key/Value for A0:**
- **Description:** A plan to integrate VS Code's native diff viewer (`vscode.diff`) for comparing AI-generated file content against the current workspace file, leveraging a TextDocumentContentProvider for in-memory content.
- **Tags:** feature plan, ui, ux, diff, vscode api, virtual document

## 1. Overview & Goal

**Status (C27): In Progress**

The current integrated diff viewer is functional but lacks the native feel, performance, and rich features of VS Code's own diffing engine (e.g., syntax highlighting, minimap, inline actions). The goal of this feature is to replace our custom `DiffViewer` component with a button that triggers the built-in `vscode.diff` command.

This provides a superior user experience and reduces the maintenance burden of our custom component. The primary technical challenge is that the AI-generated content exists only in the frontend's state (in-memory) and not as a file on disk. The solution is to create a **Virtual Document** using a `TextDocumentContentProvider`.

## 2. User Story

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-DIFF-NATIVE-01 | **View Diff Natively** | As a developer, when I hover over an associated file in the PCPP, I want to click an "Open Changes" button that opens the diff in a native VS Code diff tab, so I can use all the familiar features of the editor to review the changes. | - An "Open Changes" icon appears on hover for each existing file in the "Associated Files" list. <br> - Clicking it executes the `vscode.diff` command. <br> - A new editor tab opens, showing a side-by-side diff. <br> - The right side shows the current content of the workspace file. <br> - The left side shows the AI-generated content from the response tab. |

## 3. Technical Implementation Plan

This implementation involves creating a new backend provider and coordinating state between the frontend and backend.

### Step 1: Create a TextDocumentContentProvider
-   **New File (`src/backend/providers/ResponseContentProvider.ts`):** A new class will be created that implements `vscode.TextDocumentContentProvider`.
-   **State Cache:** This provider will need a simple in-memory cache (e.g., a `Map<string, string>`) to store the AI-generated content. The key will be a unique identifier (like the URI itself), and the value will be the file content string.
-   **`provideTextDocumentContent` method:** This is the core method. When VS Code needs to open a virtual document (e.g., `dce-response:path/to/file.ts?cycle=22&resp=1`), this method will be called with the URI. It will look up the content in its cache using the URI as the key and return it.

### Step 2: Register the Provider and Command
-   **`extension.ts`:** In the `activate` function, the new provider will be registered with a custom URI scheme: `vscode.workspace.registerTextDocumentContentProvider('dce-response', responseContentProvider);`.

### Step 3: Implement the Frontend-to-Backend Workflow
-   **UI (`ParsedView.tsx`):** An "Open Changes" button will be added to each associated file item, visible on hover.
-   **IPC Channel (`RequestNativeDiff`):** A new IPC channel will be created. Its payload will be `{ originalPath: string; modifiedContent: string; title: string; }`.
-   **Backend Handler (`file-operation.service.ts`):**
    1.  A new `handleNativeDiffRequest` method will be implemented.
    2.  When it receives a request, it will generate a unique URI for the virtual document, incorporating the file path and potentially cycle/response IDs to ensure uniqueness (e.g., `dce-response:${originalPath}?cycle=${cycleId}&resp=${respId}&ts=${Date.now()}`).
    3.  It will store the `modifiedContent` in the `ResponseContentProvider`'s cache, keyed by this unique URI.
    4.  It will then execute the command: `vscode.commands.executeCommand('vscode.diff', vscode.Uri.file(originalAbsolutePath), vscode.Uri.parse(virtualUri), title);`.
</file_artifact>

<file path="src/Artifacts/A89. DCE - vLLM Integration and API Proxy Plan.md">
# Artifact A89: DCE - vLLM Integration and API Proxy Plan
# Date Created: C29
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** Details the end-to-end plan for integrating the DCE with a remote vLLM instance via a secure proxy server, enabling high-throughput, parallelized AI responses.
- **Tags:** feature plan, vllm, llm, proxy, api, integration, performance

## 1. Vision & Goal

The goal of this integration is to unlock a new level of performance for the Data Curation Environment (DCE) by connecting its parallel response UI to a high-throughput vLLM backend. This will enable users to generate multiple, simultaneous AI responses with extremely low latency, dramatically accelerating the iterative development workflow.

To achieve this securely and flexibly, we will use the curator's existing `aiascent.game` server as a proxy, which will receive requests from the DCE extension and forward them to a dedicated vLLM instance.

## 2. End-to-End Architecture

The data will flow through three distinct components:

```
+---------------+      +---------------------------+      +----------------------+
| DCE Extension |----->|   aiascent.game (Proxy)   |----->|   vLLM Server        |
| (VS Code)     |      | (Node.js/Express Server)  |      | (Python Instance)    |
+---------------+      +---------------------------+      +----------------------+
```

1.  **DCE Extension (The Client):**
    *   The user will configure a "Model Card" in the DCE settings pointing to the proxy server's endpoint: `https://aiascent.game/api/dce/proxy`.
    *   When the user sends a prompt, the extension will make a `POST` request to this endpoint, sending the prompt data in the request body.
    *   It will be configured to handle a streaming response.

2.  **aiascent.game (The Proxy Server):**
    *   This server acts as a secure intermediary.
    *   A new API endpoint, `/api/dce/proxy`, will be added to `server.ts`.
    *   This endpoint will receive the request from the DCE extension.
    *   It will then create a new request to the internal vLLM server, whose address will be stored in an environment variable (e.g., `VLLM_URL=http://localhost:8000`).
    *   It will stream the response from the vLLM server back to the DCE extension client.

3.  **vLLM Server (The Inference Engine):**
    *   This is a dedicated Python process running the vLLM library.
    *   It will be configured to serve a specific model (e.g., `unsloth/gpt-oss-20b`) and will expose an OpenAI-compatible API endpoint.
    *   Its primary job is to handle the computationally intensive task of model inference with high efficiency through continuous batching.

## 3. Implementation Details

### 3.1. `server.ts` Modifications
A new route will be added to handle the proxy request. This route will use `node-fetch` or a similar library to make a server-to-server request to the vLLM instance and pipe the streaming response back.

**See Artifact `A90` for the proposed code.**

### 3.2. `Caddyfile` Configuration
The existing `Caddyfile` is already configured to reverse proxy all traffic to the Node.js server on port 3001. This configuration is sufficient and automatically handles HTTPS termination and header forwarding, so no changes are required.

**See Artifact `A91` for the full file and analysis.**

### 3.3. DCE Extension Configuration
The user will configure the connection in the DCE settings panel as follows:
-   **Model Card Name:** `Remote vLLM via AI Ascent`
-   **Endpoint URL:** `https://aiascent.game/api/dce/proxy`
-   **API Key:** (None required, as the proxy handles authentication if needed)

This architecture provides a secure, scalable, and highly performant solution for integrating the DCE with vLLM.
</file_artifact>

<file path="src/Artifacts/A92. DCE - vLLM Setup Guide.md">
# Artifact A92: DCE - vLLM Setup Guide
# Date Created: C30
# Author: AI Model & Curator
# Updated on: C45 (Add note about matching model name in proxy)

- **Key/Value for A0:**
- **Description:** A step-by-step guide for setting up the vLLM inference server with an OpenAI-compatible API endpoint for use with the DCE.
- **Tags:** guide, setup, vllm, llm, inference, performance, openai

## 1. Overview & Goal

This guide provides the necessary steps to install `vLLM` and run a large language model with a high-throughput, OpenAI-compatible API server. This will allow the Data Curation Environment (DCE) to connect to a powerful local or remote inference engine.

## 2. Prerequisites

*   **OS:** Linux or Windows with WSL2 (Windows Subsystem for Linux).
*   **Python:** Version 3.9 - 3.12.
*   **GPU:** An NVIDIA GPU with CUDA drivers installed. Compute capability 7.0 or higher is recommended (e.g., V100, T4, RTX 20-series or newer).
*   **Package Manager:** `pip` is required. Using a virtual environment manager like `venv` or `conda` is highly recommended.

## 3. Recommended Method for Windows: Using WSL2


The vLLM server has a dependency on `uvloop`, a library that is not compatible with native Windows. The most reliable and performant way to run vLLM on a Windows machine is within a WSL2 environment.

### Step 1: Install or Verify WSL2
Open PowerShell and check your WSL status.
```powershell
wsl --status
```
If WSL is not installed, run the following command and then restart your machine.
```powershell
wsl --install
```

### Step 2: Set up Python in WSL
Open your WSL terminal (e.g., by typing `wsl` in the Start Menu). Update your package lists and install the necessary Python tools.
```bash
sudo apt update
sudo apt install python3-venv python3-pip -y
```

### Step 3: Create and Activate a Virtual Environment in WSL
It is crucial to install `vLLM` and its dependencies in an isolated environment *inside WSL*.

```bash
# Create a directory for your project
mkdir -p ~/projects/vLLM
cd ~/projects/vLLM

# Create the virtual environment
python3 -m venv vllm-env

# Activate the environment
source vllm-env/bin/activate
```
Your terminal prompt should now be prefixed with `(vllm-env)`.

### Step 4: Install vLLM and uvloop
With the virtual environment activated inside WSL, you can now install `vLLM` and its required dependency `uvloop`.
```bash
pip install vllm uvloop
```

### Step 5: Launch the OpenAI-Compatible Server
This command will download the specified model and start the server.
```bash
python -m vllm.entrypoints.openai.api_server --model "unsloth/gpt-oss-20b"
```
The server will start on `http://localhost:8000` *inside* the WSL environment.

### Step 6: Accessing the Server from Windows
WSL2 automatically forwards network ports to your Windows host machine. This means you can access the vLLM server from your Windows applications (like the DCE extension or your browser) by navigating to **`http://localhost:8000`**.

### Step 7: Verifying the API Endpoint
When you navigate to `http://localhost:8000` in a web browser, you will see a `404 Not Found` error. This is expected and correct. The server is an API endpoint and is not designed to serve a webpage.

To verify that the API is working, run the following `curl` command from your **WSL terminal** (the same one where the server is running). This sends a test prompt to the completions endpoint.

```bash
curl http://localhost:8000/v1/completions \
-H "Content-Type: application/json" \
-d '{
    "model": "unsloth/gpt-oss-20b",
    "prompt": "San Francisco is a",
    "max_tokens": 7,
    "temperature": 0
}'
```

A successful response will be a JSON object that looks something like this:
```json
{"id":"cmpl-a1b2c3d4e5f6","object":"text_completion","created":1677652288,"model":"unsloth/gpt-oss-20b","choices":[{"index":0,"text":" city in Northern California,","logprobs":null,"finish_reason":"length"}],"usage":{"prompt_tokens":5,"total_tokens":12,"completion_tokens":7}}
```
If you receive this JSON response, your vLLM server is running correctly.

### Step 8: Connecting the DCE Extension
Once you have verified the API is running, you are ready to connect the DCE extension to it.

For detailed instructions, please refer to the next guide: **`A94. DCE - Connecting to a Local LLM Guide.md`**.
</file_artifact>

<file path="src/Artifacts/A93. DCE - vLLM Encryption in Transit Guide.md">
# Artifact A93: DCE - vLLM Encryption in Transit Guide
# Date Created: C32
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** Explains the standard architectural pattern of using a reverse proxy to provide HTTPS encryption for the vLLM API endpoint.
- **Tags:** guide, security, encryption, https, proxy, caddy, vllm

## 1. The Challenge: Securing LLM Traffic

When the Data Curation Environment (DCE) extension communicates with a remote vLLM server, the data (which includes source code and prompts) must be encrypted in transit to prevent eavesdropping. The vLLM OpenAI-compatible server runs on plain `http` by default, which is unencrypted. Connecting to an `http` endpoint over the public internet is insecure.

The goal is to provide a secure `https` endpoint for the DCE extension while allowing the vLLM server to run in its default, simple configuration.

## 2. The Solution: The Reverse Proxy Pattern

The standard and most robust solution is to place a **reverse proxy** in front of the vLLM server. The reverse proxy acts as a secure, public-facing gateway.

### 2.1. How It Works

The data flow is as follows:

```
+---------------+      +----------------------+      +----------------------+
| DCE Extension |----->|  Reverse Proxy       |----->|   vLLM Server        |
| (Client)      |      |  (e.g., Caddy/Nginx) |      | (Internal Service)   |
|               |      |                      |      |                      |
| (HTTPS Request)      |  (Handles TLS/SSL)   |      |  (HTTP Request)      |
+---------------+      +----------------------+      +----------------------+
```

1.  **Encrypted Connection:** The DCE extension makes a request to a secure URL, like `https://my-llm-server.com`. This connection is encrypted using HTTPS.
2.  **HTTPS Termination:** The reverse proxy server (e.g., Caddy) receives this encrypted request. Its primary job is to handle the complexity of TLS/SSL certificates. It decrypts the request.
3.  **Forwarding:** After decrypting the request, the proxy forwards it to the internal vLLM server over a trusted local network (e.g., to `http://localhost:8000`). Since this traffic never leaves the secure server environment, it does not need to be re-encrypted.
4.  **Response:** The vLLM server processes the request and sends its `http` response back to the proxy, which then encrypts it and sends it back to the DCE extension over `https`.

### 2.2. Benefits of this Architecture

-   **Security:** All traffic over the public internet is encrypted.
-   **Simplicity:** The vLLM server itself does not need to be configured with complex SSL certificates. Tools like Caddy can automatically provision and renew free Let's Encrypt certificates, making setup very easy.
-   **Flexibility:** The proxy can also handle load balancing, caching, and routing to multiple backend services if needed in the future.

## 3. Implementation Example with Caddy

Caddy is a modern web server that makes this process extremely simple.

-   **Prerequisites:** You need a server with a public IP address and a domain name pointing to it.
-   **Example `Caddyfile`:**
    ```caddy
    # Your domain name
    my-llm-server.com {
        # Caddy will automatically handle HTTPS for this domain
        
        # Log all requests for debugging
        log {
            output file /var/log/caddy/vllm.log
        }

        # Reverse proxy all requests to the vLLM server running on port 8000
        reverse_proxy localhost:8000
    }
    ```
-   **Reference:** For a more detailed example of a production `Caddyfile` used in a similar project, see **`A91. AI Ascent - Caddyfile (Reference).md`**.

This architecture is the industry standard for securing web services and is the recommended approach for deploying the vLLM server for use with the DCE.
</file_artifact>

<file path="src/Artifacts/A94. DCE - Connecting to a Local LLM Guide.md">
# Artifact A94: DCE - Connecting to a Local LLM Guide
# Date Created: C35
# Author: AI Model & Curator
# Updated on: C36 (Align with new multi-modal settings UI)

- **Key/Value for A0:**
- **Description:** A step-by-step guide on how to configure the DCE extension to use a local LLM with an OpenAI-compatible API via the new settings panel.
- **Tags:** guide, setup, llm, vllm, configuration, local

## 1. Overview & Goal

This guide explains how to configure the Data Curation Environment (DCE) extension to communicate with a locally hosted Large Language Model (LLM), such as the one set up via the `A92. DCE - vLLM Setup Guide`.

The goal is to switch the extension from its default "Manual" mode to one of the automated modes that can make API calls directly to your local model, streamlining the development workflow.

## 2. Step-by-Step Configuration

### Step 1: Open the Settings Panel
- Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
- Run the command: **`DCE: Open Settings & Help`**. This will open the settings panel in a new editor tab.

### Step 2: Navigate to the Settings Section
- In the settings panel, find and expand the **"Settings"** section.

### Step 3: Select Your Connection Mode
You will see a list of connection modes. Choose the one that matches your setup.

#### Option A: Demo Mode (Recommended for `aiascent.game` users)
This is the simplest option if you are using the pre-configured `aiascent.game` proxy.
-   Select the radio button for **"Demo Mode (Local vLLM via `aiascent.game`)"**.
-   The endpoint is pre-configured. No other steps are needed.

#### Option B: API Mode (URL)
Use this option if you are running your own vLLM server (or another OpenAI-compatible service) and want to connect to it directly without a proxy.
-   Select the radio button for **"API (URL)"**.
-   An input field will appear. Enter the full API endpoint URL. For a standard vLLM server, this will be `http://localhost:8000/v1`.
    -   **Important:** If your LLM server is on a different machine, replace `localhost` with that machine's local network IP address (e.g., `http://192.168.1.100:8000/v1`).
-   Save the settings.

## 4. Next Steps

The DCE extension is now configured to send its API requests to your local LLM server. You can now use the "Generate Responses" button (once implemented) in the Parallel Co-Pilot Panel to automatically populate the response tabs, completing the automated workflow. To switch back to the manual copy/paste method, simply re-open the settings and select **"Free Mode (Manual Copy/Paste)"**.
</file_artifact>

<file path="src/Artifacts/A95. DCE - LLM Connection Modes Plan.md">
# Artifact A95: DCE - LLM Connection Modes Plan
# Date Created: C36
# Author: AI Model & Curator
# Updated on: C42 (Refine "Generate Responses" workflow to create a new cycle first)

- **Key/Value for A0:**
- **Description:** Outlines the plan for a multi-modal settings UI and the associated workflow changes, allowing users to switch between manual copy/paste, a pre-configured demo mode, and user-provided API URLs or Keys.
- **Tags:** feature plan, settings, ui, ux, llm, configuration, api, streaming

## 1. Overview & Goal

To maximize the utility and accessibility of the DCE extension, users need a flexible way to connect to different LLM backends. This plan details the implementation of a multi-modal settings UI and the corresponding changes to the main workflow. This will allow users to seamlessly switch between different connection methods, from a simple manual workflow to advanced, automated API integrations.

This plan refines and supersedes `A85. DCE - Model Card Management Plan.md` by focusing on a more user-friendly, mode-based approach.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P3-CM-01 | **Use Manual Mode** | As a new user, I want the extension to default to a "Free (Manual)" mode, so I can use the core features by copying and pasting without any setup. | - The default setting is "Free Mode". <br> - In this mode, a "Generate prompt.md" button is shown. |
| P3-CM-02 | **Use Demo Mode** | As a demo user, I want to select a "Demo Mode" that connects to a local vLLM endpoint, so I can experience the full automated workflow. | - A "Demo Mode" option is available. <br> - When selected, the "Generate prompt.md" button is replaced with a "Generate responses" button. |
| P3-CM-03 | **Generate Into New Cycle** | As a user in an automated mode, when I click "Generate responses" on Cycle `N`, I want the extension to automatically create a new Cycle `N+1` and place the generated responses there, so my new results are cleanly separated from the prompt that created them. | - Clicking "Generate responses" initiates a process that creates a new cycle. <br> - The generated responses from the LLM populate the tabs of the new cycle. <br> - The UI automatically navigates to the new cycle upon completion. |
| P3-CM-04 | **Monitor Generation Speed** | As a user generating responses, I want to see a live "tokens per second" metric, so I have feedback on the generation performance. | - A "Tokens/sec" display appears near the "Generate responses" button during generation. <br> - It updates in real-time as token data streams in. |
| P3-CM-05 | **Persistent Settings** | As a user, I want my selected connection mode to be saved, so I don't have to re-configure it every time I open VS Code. | - The selected connection mode and any associated URL/Key is persisted in the workspace settings. |

## 3. UI/UX Design

(No changes from C37)

## 4. Technical Implementation Plan

### 4.1. Settings Persistence
(No changes from C37)

### 4.2. "Generate Responses" Workflow (C42 Update)
The workflow is now designed to be more robust and atomic, with the backend handling the creation of the new cycle.

1.  **Frontend (`view.tsx`):**
    *   The `handleGenerateResponses` `onClick` handler will gather the *current* cycle's data (`PcppCycle` object for Cycle `N`) and send it to the backend via a `RequestBatchGeneration` message.
2.  **Backend (`on-message.ts`):**
    *   The handler for `RequestBatchGeneration` receives the full data for Cycle `N`.
    *   It first calls `prompt.service.ts` to generate the prompt string from Cycle `N`'s data.
    *   It then calls `llm.service.ts` to get the array of response strings from the vLLM.
    *   It then calls a new method in `history.service.ts`, `createNewCycleWithResponses`, passing in the array of responses.
    *   The `history.service.ts` creates the new cycle (`N+1`), populates its response tabs, and saves the entire updated history.
    *   Finally, the backend sends a `SendBatchGenerationComplete` message to the frontend, containing the `newCycleId`.
3.  **Frontend (`view.tsx`):**
    *   A new message handler for `SendBatchGenerationComplete` receives the ID of the new cycle.
    *   It then calls the existing `handleCycleChange` logic to navigate the UI to this new cycle, which now contains all the generated responses.

### 4.3. Streaming & Metrics (Future Cycle)
-   The backend `llm.service.ts` will be updated to handle streaming responses.
-   New IPC channels (`StreamResponseChunk`, `StreamResponseEnd`) will be created.
-   The frontend in `view.tsx` will be updated to handle these streaming messages, append content to the tabs in real-time, and calculate the tokens/second metric.
</file_artifact>

<file path="src/Artifacts/A96. DCE - Harmony-Aligned Response Schema Plan.md">
# Artifact A96: DCE - Harmony-Aligned Response Schema Plan
# Date Created: C45
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** An analysis of the `openai_harmony` library and a proposed plan for migrating the DCE's vLLM interaction schema from XML tags to a more robust, token-based structured format.
- **Tags:** plan, architecture, interaction schema, parsing, llm, vllm, harmony

## 1. Overview & Goal

The current interaction schema (`A52.2`) relies on parsing XML-like tags (`<file>`, `<summary>`) and markdown headers from the LLM's free-text response. While functional, this approach is brittle. It is susceptible to minor formatting errors from the model and requires complex, string-based `stop` tokens that can prematurely truncate responses, as seen in Cycle 44.

The `GPT-OSS` repository introduces a more advanced approach, "Harmony," which uses a vocabulary of special control tokens (e.g., `<|start|>`, `<|channel|>`, `<|message|>`, `<|end|>`) to guide the model's generation into a structured, machine-readable format. This is a significantly more robust and powerful way to handle structured data generation with LLMs.

The goal of this plan is to outline a phased migration from our current XML-based schema to a Harmony-aligned schema for all communication with the vLLM backend.

## 2. Analysis of the Harmony Approach

The `openai_harmony` library and `harmony_vllm_app.py` demonstrate a sophisticated workflow:

1.  **Structured Prompt Rendering:** Instead of a single block of text, the prompt is constructed as a series of messages, each with a `role` (system, user, assistant), and potentially a `channel` (analysis, commentary, final). This entire structure is "rendered" into a sequence of tokens that includes the special control tokens.
2.  **Guided Generation:** The model is trained or fine-tuned to understand these control tokens. It learns to "speak" in this format, for example, by placing its internal monologue in an `analysis` channel and its final answer in a `final` channel.
3.  **Robust Parsing:** The response from the model is not just a block of text; it's a stream of tokens that can be parsed deterministically using the same control tokens. A `StreamableParser` can listen to the token stream and identify when the model is opening a new message, writing to a specific channel, or finishing its turn.

This is fundamentally superior to our current regex-based parsing.

## 3. Proposed Migration Plan

This is a major architectural change and should be implemented in phases.

### Phase 1: Adopt Harmony for File Formatting (Immediate)

-   **Goal:** Replace the `<file path="...">` and `
</file_artifact>

<file path="src/Artifacts/A97. DCE - vLLM Response Progress UI Plan.md">
# Artifact A97: DCE - vLLM Response Progress UI Plan
# Date Created: C48
# Author: AI Model & Curator
# Updated on: C76 (Add requirement for per-response timers)

- **Key/Value for A0:**
- **Description:** A plan and textual mockup for a UI to display the progress of incoming vLLM responses, including color-coded progress bars, status indicators, timers, and a manual "View Responses" button.
- **Tags:** feature plan, ui, ux, vllm, progress indicator, metrics, streaming, sse

## 1. Vision & Goal

Generating multiple, large AI responses can take a significant amount of time. To improve the user experience, it's critical to provide clear, real-time feedback that the system is working and to show the progress of the generation. The goal of this feature is to create a dedicated UI that appears during response generation, displaying progress bars, status indicators, performance metrics, and timing information for each parallel response.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P3-PROG-01 | **See Generation Progress** | As a user, when I click "Generate responses," I want a UI to immediately appear that shows me the progress of each response being generated, so I know the system is working and not frozen. | - When generation starts, a progress display UI is shown. <br> - It contains a separate progress bar for each of the `N` requested responses. <br> - Each progress bar updates in real-time as tokens are received. |
| P3-PROG-02 | **See Performance Metrics** | As a user, I want to see a live "tokens per second" metric during generation, so I can gauge the performance of the LLM backend. | - The progress UI displays a "Tokens/sec" value. <br> - This value is calculated and updated periodically throughout the generation process. |
| P3-PROG-03 | **Understand Progress Bar**| As a user, I want the progress bar to be color-coded so I can understand the allocation of tokens for the prompt versus the generated response. | - The progress bar is a stacked bar with multiple colors. <br> - One color represents the "thinking" (prompt) tokens. <br> - A second color represents the currently generated response tokens. <br> - **(C69 Update)** A third color (blue) represents the remaining, unused tokens up to the model's maximum. |
| P3-PROG-04 | **See Response Status** | As a user, I want to see the status of each individual response (e.g., "Thinking...", "Generating...", "Complete"), so I know what the system is doing. | - A text indicator next to each progress bar shows its current status. <br> - The indicator is animated during the "Thinking" and "Generating" phases. <br> - When a response is complete, the "unused" portion of its progress bar changes color to signify completion. |
| P3-PROG-05 | **See Unused Tokens** | As a user, once a response is complete, I want to see how many tokens were left unused, so I can understand how much headroom the model had. | - After a response's status changes to "Complete", a text element appears showing the count of unused tokens. |
| P3-PROG-06 | **Manage Responses** | As a user, I want to sort responses, stop a generation, or re-generate an individual response, so I have more control over the process. | - A sort button cycles through different sort orders. <br> - A "Stop" button for each response cancels its generation. <br> - A "Re-generate" button for each response triggers a new generation just for that slot. |
| P3-PROG-07 | **See Elapsed Time** | As a user, I want to see a timer showing the total elapsed time for the generation, so I can understand how long the process is taking. | - **(C76 Update)** Each response displays its own independent elapsed timer, showing how long that specific generation has taken. |
| P3-PROG-08 | **Review Metrics Before Navigating** | As a user, after all responses are complete, I want to stay on the progress screen to review the final metrics, and then click a button to navigate to the new cycle, so I am in control of the workflow. | - When generation finishes, the UI does not automatically navigate away. <br> - A "View Responses" button appears. <br> - A completion counter (e.g., "4/4 Responses Complete") is displayed. |
| P3-PROG-09 | **Three-Way Sorting** | As a user, I want the sort button to cycle between three states: the default order, sorting by total tokens (thinking + response), and sorting by response tokens only, so I can analyze the results in different ways. | - The sort button cycles through three distinct states. <br> - The UI re-orders the list of responses accordingly. |
| P3-PROG-10 | **Color-Coded Totals** | As a user, I want the total token count display to also be color-coded, so it's consistent with the individual progress bars. | - The numbers in the "Total Tokens" display are color-coded to match the "thinking", "response", and "unused" categories. |

## 3. UI Mockup (Textual Description - C76 Update)

The progress UI will be a dedicated component that is conditionally rendered in the PCPP view when `isGenerating` is true.

```
+----------------------------------------------------------------------+
| Generating Responses... [Sort by Total Tk] Tokens/sec: 1234            |
|----------------------------------------------------------------------|
|                                                                      |
| Resp 1: [blue|green|blue]  80% | 00:35.8 | Status: Gen... [Stop] [Re-gen]|
|         (1k+5.5k/8.1k tk)      |                                      |
| Resp 2: [blue|green|blue]  70% | 00:28.1 | Status: Gen... [Stop] [Re-gen]|
|         (1k+4.7k/8.1k tk)      |                                      |
| Resp 3: [blue|blue      ]  12% | 00:05.2 | Status: Think... [Stop] [Re-gen]|
|         (1k+0k/8.1k tk)        |                                      |
| Resp 4: [blue|green|done] 100% | 00:41.0 | Status: Complete ✓ [   ] [Re-gen]|
|         (1k+7.1k/8.1k tk)      | Unused: 1,024 tk                     |
|----------------------------------------------------------------------|
| [ 4/4 Responses Complete ]                                           |
+----------------------------------------------------------------------+
```
*   **Header:** The "Sort" button and TPS metric remain.
*   **Per-Response:**
    *   A new, individual timer (e.g., `00:35.8`) is displayed for each response.
    *   Stop/Regen buttons are on the same row as the status.
*   **Footer:** Appears only when generation is complete.

## 4. Technical Implementation Plan (C76 Revision)

1.  **IPC (`channels.type.ts`):** The `GenerationProgress` interface will be updated to include `startTime: number` for each individual response.
2.  **Backend (`llm.service.ts`):** The `generateBatch` method will be updated. When initializing the `progressData` array, it will set `startTime: Date.now()` for each response object.
3.  **Frontend (`GenerationProgressDisplay.tsx`):**
    *   **New Component (`ResponseTimer.tsx`):** A new, small component will be created to manage the timer logic. It will receive a `startTime` prop and use a `useEffect` with `setInterval` to calculate and render the elapsed time. This isolates the timer logic.
    *   **Integration:** `GenerationProgressDisplay.tsx` will map over the `progressData` and render a `ResponseTimer` for each item, passing `p.startTime`. This will result in an independent timer for each response.
4.  **Frontend (`view.tsx`):** No changes are required here for the timer, but it will be updated to handle the new navigation and view-switching logic.
</file_artifact>

<file path="src/Artifacts/A98. DCE - Harmony JSON Output Schema Plan.md">
# Artifact A98: DCE - Harmony JSON Output Schema Plan
# Date Created: C50
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A plan to migrate the vLLM interaction schema from XML-based parsing to a structured JSON object output, leveraging the `response_format` parameter in OpenAI-compatible APIs.
- **Tags:** plan, architecture, interaction schema, parsing, llm, vllm, harmony, json

## 1. Vision & Goal

The current method of parsing AI responses relies on a set of regular expressions to extract content from within custom XML tags (`<summary>`, `<file>`, etc.). While functional, this approach is brittle and can fail if the model produces even slightly malformed output.

Modern OpenAI-compatible APIs, including the one provided by vLLM, support a `response_format` parameter that can instruct the model to return its output as a guaranteed-valid JSON object. The goal of this plan is to leverage this feature to create a more robust, reliable, and maintainable parsing pipeline. We will define a clear JSON schema and update our extension to request and parse this structured format, moving away from fragile regex-based text processing.

## 2. The Proposed JSON Schema

Based on the example provided in the ephemeral context of Cycle 50, the target JSON schema for an AI response will be as follows:

```typescript
interface HarmonyFile {
  path: string;
  content: string;
}

interface CourseOfActionStep {
  step: number;
  description: string;
}

interface HarmonyJsonResponse {
  summary: string;
  course_of_action: CourseOfActionStep[];
  files_updated?: string[]; // Optional, can be derived from `files`
  curator_activity?: string; // Optional
  files: HarmonyFile[];
}
```

### Example JSON Output:
```json
{
  "summary": "I have analyzed the request and will update the main application component and its corresponding service.",
  "course_of_action": [
    {
      "step": 1,
      "description": "Update `src/App.tsx`: Add a new state variable and a button to trigger the new functionality."
    },
    {
      "step": 2,
      "description": "Update `src/services/api.ts`: Create a new function to fetch the required data from the backend."
    }
  ],
  "curator_activity": "Please ensure the backend API endpoint `GET /api/newdata` is running and accessible.",
  "files": [
    {
      "path": "src/App.tsx",
      "content": "// Full content of the updated App.tsx file..."
    },
    {
      "path": "src/services/api.ts",
      "content": "// Full content of the updated api.ts file..."
    }
  ]
}
```

## 3. Technical Implementation Plan

1.  **Backend (`llm.service.ts`):**
    *   The `generateBatch` method will be updated.
    *   When the `connectionMode` is set to `'demo'`, it will add `response_format: { "type": "json_object" }` to the JSON body of the `fetch` request sent to the vLLM proxy. This instructs the model to generate a JSON response.

2.  **Frontend (`response-parser.ts`):**
    *   The `parseResponse` function will be refactored to be "bilingual."
    *   It will first attempt to parse the `rawText` as JSON using a `try...catch` block.
    *   **If `JSON.parse` succeeds:**
        *   It will validate that the parsed object contains the required keys (`summary`, `course_of_action`, `files`).
        *   It will map the data from the JSON object to the `ParsedResponse` type.
            *   The `course_of_action` array will be formatted into a numbered markdown list.
            *   The `files` array will be directly mapped to the `ParsedFile` array.
    *   **If `JSON.parse` fails:**
        *   It will fall back to the existing regex-based parsing logic. This ensures backward compatibility with the manual copy/paste mode and any models that do not support JSON output mode.

3.  **Interaction Schema (`A52.3`):**
    *   The `A52.3 DCE - Harmony Interaction Schema Source.md` will be updated.
    *   It will now instruct the AI to produce its output in the specified JSON format, providing the schema definition as an example. The instructions for using XML tags will be preserved as a fallback for the model.

This migration to a structured JSON format will significantly improve the reliability of the extension's core parsing logic.
</file_artifact>

<file path="src/Artifacts/A99. DCE - Response Regeneration Workflow Plan.md">
# Artifact A99: DCE - Response Regeneration Workflow Plan
# Date Created: C50
# Author: AI Model & Curator
# Updated on: C78 (Add double-click confirmation and per-tab progress view)

- **Key/Value for A0:**
- **Description:** Details the user stories and technical implementation for the "Regenerate" button in the PCPP, including logic for regenerating empty tabs, all tabs, and a new per-tab refresh feature with double-click confirmation.
- **Tags:** feature plan, ui, ux, workflow, regeneration

## 1. Vision & Goal

The workflow for generating AI responses needs to be more flexible and deliberate. Users may decide they need more responses after the initial batch, a single response might be of low quality, or they may accidentally click the regenerate button. The goal of this feature is to provide intuitive, granular controls for regenerating responses while preventing accidental actions.

## 2. User Stories & Button Behaviors

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P2-REG-01 | **Regenerate Empty Tabs** | As a user, after increasing the number of response tabs from 4 to 6, I want to click the global "Regenerate responses" button, which should only generate new responses for the two new, empty tabs. | - A global "Regenerate responses" button exists in the PCPP header. <br> - If one or more response tabs are empty, clicking this button triggers a batch generation request only for the number of empty tabs. <br> - The new responses populate only the empty tabs. |
| P2-REG-02 | **Regenerate All Tabs** | As a user, if all my response tabs have content but I'm unsatisfied, I want to click the global "Regenerate responses" button and be asked if I want to regenerate *all* responses. | - If no response tabs are empty, clicking "Regenerate responses" shows a confirmation dialog. <br> - If confirmed, a batch request is sent to generate a full new set of responses, which replaces the content in all existing tabs. |
| P2-REG-03 | **Regenerate a Single Tab (from Tab View)** | As a user, if one specific response is poor, I want a "Refresh" icon on that tab to regenerate just that single response without affecting others. | - A "Refresh" icon appears on each response tab. <br> - Clicking this icon triggers a generation request for a single response. <br> - The new response replaces the content of only that specific tab. <br> - The main content area for the active tab switches to show the `GenerationProgressDisplay` to show the new response streaming in. |
| P2-REG-04 | **Re-generate a Single Response (from Progress View)** | As a user watching responses stream in, if one response seems stuck or is generating poorly, I want a "Re-generate" button next to it to discard the current attempt and start a new one for just that slot. | - In the `GenerationProgressDisplay`, a "Re-generate" button is available for each response. <br> - Clicking it stops the current generation for that response (if active) and immediately initiates a new request for that single response slot. |
| P2-REG-05 | **Prevent Accidental Regeneration** | As a user, I want to confirm my intent to regenerate a response, so I don't accidentally lose a good response by misclicking. | - The first click on a "Regenerate" button (on a tab) changes its icon to a "Confirm" (checkmark) icon. <br> - A second click on the same button within a few seconds triggers the regeneration. <br> - If the user does not click again, the button reverts to its original state. |

## 3. Technical Implementation Plan (C78 Update)

1.  **IPC Channels:** Existing channels are sufficient.

2.  **Frontend UI & Logic:**
    *   **Double-Click Confirmation (`ResponseTabs.tsx`):**
        *   Introduce a new local state `const [regenConfirmTabId, setRegenConfirmTabId] = useState<number | null>(null);`.
        *   The `onClick` handler for the regenerate button will implement the two-click logic. The first click sets the state, the second click triggers the regeneration and resets the state.
        *   A `useEffect` hook with a `setTimeout` will be used to reset the confirmation state after 3-4 seconds if no second click occurs.
        *   The button icon will be conditionally rendered (`VscSync` or `VscCheck`) based on the `regenConfirmTabId` state.
    *   **Per-Tab Progress View (`view.tsx`):**
        *   The `handleRegenerateTab` function will update the `status` of the specific response in the `tabs` state to `'generating'`.
        *   The main render logic will be refactored. It will check the status of the `activeTab`. If `tabs[activeTab].status === 'generating'`, it will render the `GenerationProgressDisplay` component. Otherwise, it will render the `ResponsePane`.

3.  **Backend Logic (Per-Response Status):**
    *   **`pcpp.types.ts`:** Add `status: 'pending' | 'generating' | 'complete' | 'error'` to the `PcppResponse` interface.
    *   **`history.service.ts`:**
        *   The `updateSingleResponseInCycle` method will be updated to set the `status` of the target response to `'generating'` and reset its content.
        *   When the response is fully received (from `llm.service.ts`), this method will be called again to set the status to `'complete'` and update the content.
    *   **`llm.service.ts`:**
        *   The `stopGeneration` method will be implemented using a `Map<number, AbortController>` to track and abort `fetch` requests.
</file_artifact>

<file path="src/Artifacts/A100. DCE - Model Card & Settings Refactor Plan.md">
# Artifact A100: DCE - Model Card & Settings Refactor Plan
# Date Created: C62
# Author: AI Model & Curator
# Updated on: C65 (Refine model card display details)

- **Key/Value for A0:**
- **Description:** A plan to implement a user-configurable "Model Card" system in the settings panel. This includes a UI for managing different LLM configurations and a feature to query a vLLM server's `/v1/models` endpoint to auto-populate model details. Also, specifies the display of a static model card for "Demo Mode".
- **Tags:** feature plan, settings, ui, ux, llm, configuration, model management

## 1. Vision & Goal

To enhance the flexibility of the DCE, users need a more sophisticated way to manage connections to different LLMs. The current mode-switching UI is a good start, but a "Model Card" system will provide a more powerful and user-friendly experience, allowing users to save, edit, and switch between multiple, named configurations for various local or remote models.

The goal is to refactor the settings panel to support a CRUD (Create, Read, Update, Delete) interface for these model cards and to add a feature that can query a vLLM endpoint to auto-populate model information, simplifying setup.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P3-MC-01 | **Create a Model Card** | As a user, I want to create a new "model card" where I can input all the necessary information to connect to an LLM, so I can configure different models for different tasks. | - A "New Model Card" button exists in the Settings Panel. <br> - Clicking it opens a form with fields for: Display Name, API Endpoint URL, API Key (optional), Total Context Window, Max Output Tokens, and Reasoning Effort. <br> - A "Save" button persists this card. |
| P3-MC-02 | **Manage Model Cards** | As a user, I want to see a list of my saved model cards and be able to edit or delete them, so I can manage my configurations. | - The Settings Panel displays a list of all saved model cards. <br> - Each card in the list has "Edit" and "Delete" buttons. |
| P3-MC-03 | **Select Active Model** | As a user, I want to select one of my model cards as the "active" model from a dropdown list, so the extension knows which LLM to use for its API calls. | - A dropdown menu in the settings panel lists all saved model cards by their display name. <br> - The currently active model is shown in the dropdown. <br> - Selecting a new model from the dropdown sets it as the active configuration. |
| P3-MC-04 | **Auto-Populate vLLM Info** | As a user configuring a vLLM endpoint, I want a button to automatically fetch the model's details (like its name and context window), so I don't have to look them up manually. | - In the model card creation form, next to the API Endpoint URL field, there is a "Query" or "Fetch Info" button. <br> - Clicking it sends a request to the `/v1/models` endpoint of the provided URL. <br> - If successful, the model name and max context length are parsed from the response and used to populate the form fields. |
| P3-MC-05 | **Display Static Demo Model Card** | As a user in "Demo Mode," I want to see a pre-configured, read-only model card in the settings panel that provides information about the demo LLM, so I understand its capabilities. | - When "Demo Mode" is selected, a static, non-editable section appears. <br> - It displays "Model: unsloth/gpt-oss-20b", "Total Context Window", "Max Output Tokens", "Reasoning Effort", and "GPU". |

## 3. Technical Implementation Plan

1.  **Data Storage (`settings.service.ts`):**
    *   The settings service will be updated to manage a list of `ModelCard` objects and the ID of the `activeModelCard`.
    *   API keys will continue to be stored securely in `SecretStorage`, associated with a unique ID for each model card.

2.  **Backend (`llm.service.ts`):**
    *   A new method, `getModelInfo(endpointUrl: string)`, will be created. It will make a `GET` request to the `${endpointUrl}/models` endpoint.
    *   It will parse the JSON response to extract the model ID and maximum context length (`max_model_len`).
    *   This will be exposed via a new `RequestModelInfo` IPC channel.

3.  **Settings Panel UI Refactor (`settings.view.tsx`):**
    *   The current radio-button UI will be replaced with the new Model Card management UI.
    *   A dropdown will display all saved `ModelCard` names and manage the `activeModelCard` state.
    *   A list view will display the cards with "Edit" and "Delete" buttons.
    *   A modal or separate view will be used for the "Create/Edit Model Card" form.
    *   The form will include the new "Query" button, which will trigger the `RequestModelInfo` IPC message and update the form's state with the response.
    *   A new conditional rendering block will display the static demo model card when `connectionMode` is `'demo'`.

4.  **Integration (`llm.service.ts`):**
    *   The main `generateBatch` and `generateSingle` methods will be updated. Instead of a `switch` on the `connectionMode`, they will now fetch the `activeModelCard` from the `SettingsService` and use its properties (URL, key, reasoning level) to construct the API request.
</file_artifact>

<file path="src/Artifacts/A101. DCE - Asynchronous Generation and State Persistence Plan.md">
# Artifact A101: DCE - Asynchronous Generation and State Persistence Plan
# Date Created: C67
# Author: AI Model & Curator
# Updated on: C78 (Add per-response status field)

- **Key/Value for A0:**
- **Description:** Documents the new, more robust workflow for generating responses. This involves creating a new cycle with a "generating" status first, which provides a persistent state container for the asynchronous LLM call, making the UI state recoverable on reload.
- **Tags:** plan, architecture, workflow, persistence, asynchronous, state management

## 1. Problem Statement

The "Generate responses" feature currently suffers from two critical flaws:
1.  **Stale Prompts:** The backend sometimes generates the `prompt.md` using a stale version of the cycle data from the `dce_history.json` file, ignoring the user's most recent (unsaved) changes in the UI.
2.  **Lack of UI Persistence:** If the user switches away from the PCPP tab while responses are streaming in, the response generation UI disappears. When they return, the UI does not reappear, even though the generation process continues in the background. This is because the webview is re-initialized and loses its transient `isGenerating` state.

## 2. The New Workflow: Create-Then-Generate

To solve both issues, the workflow will be re-architected to be stateful and persistent.

1.  **Initiate:** The user, on Cycle `N`, clicks "Generate responses".
2.  **Create Placeholder:** The frontend sends a `RequestNewCycleAndGenerate` message to the backend. The backend's first action is to immediately create and save a new **Cycle `N+1`** in `dce_history.json`. This new cycle has a special status, e.g., `status: 'generating'`, and each of its `PcppResponse` objects also has its status set to `'generating'`.
3.  **Start UI:** The backend immediately responds to the frontend with a `StartGenerationUI` message, containing the ID of the new cycle (`N+1`).
4.  **Navigate & Display:** The frontend navigates to Cycle `N+1` and, seeing the `generating` status, displays the `GenerationProgressDisplay` component.
5.  **Asynchronous Generation:** *In parallel*, the backend uses the data from the original Cycle `N` (which was sent with the initial request) to generate the prompt and start the LLM call.
6.  **Save Progress:** As response chunks stream in, the backend saves them directly into the placeholder Cycle `N+1` in `dce_history.json`.
7.  **Completion:** When generation is complete, the backend updates the status of Cycle `N+1` from `generating` to `complete`, and also updates the status of each individual response.

## 3. Benefits of this Architecture

-   **Fixes Stale Prompts:** The prompt for Cycle `N+1` is generated using the fresh, in-memory data from Cycle `N` that was sent directly from the client, guaranteeing it's up-to-date.
-   **Fixes UI Persistence:** The `isGenerating` state is no longer a transient boolean in the UI. It's now a persistent `status` field in the cycle data itself. If the user navigates away and back, the extension will load the latest cycle (N+1), see its status is `generating`, and automatically re-display the progress UI, which will be populated with the latest progress saved in the history file.
-   **Enables Granular Control:** Storing the status on each individual response allows for single-tab regeneration without disrupting the state of other tabs.

## 4. Technical Implementation Plan

1.  **Data Model (`pcpp.types.ts`):**
    *   Add a `status?: 'complete' | 'generating'` property to the `PcppCycle` interface.
    *   Add a `status?: 'pending' | 'generating' | 'complete' | 'error'` property to the `PcppResponse` interface.
2.  **IPC Channels:** Add `RequestNewCycleAndGenerate` and `StartGenerationUI`.
3.  **Backend (`history.service.ts`):** Create a `createNewCyclePlaceholder` method to create the new cycle with `status: 'generating'`. Update `saveCycleData` to handle partial progress updates for a generating cycle.
4.  **Backend (`on-message.ts`):** Implement the new handler for `RequestNewCycleAndGenerate` to orchestrate this workflow.
5.  **Frontend (`view.tsx`):**
    *   Update the "Generate responses" button to use the new IPC channel.
    *   Add a handler for `StartGenerationUI`.
    *   Update the main rendering logic: if the currently loaded cycle has `status === 'generating'`, render the `GenerationProgressDisplay` component. The logic will be further refined to check the status of the *active tab* for single-response regeneration.
</file_artifact>

<file path="src/Artifacts/A103. DCE - Consolidated Response UI Plan.md">
# Artifact A103: DCE - Consolidated Response UI Plan
# Date Created: C73
# Author: AI Model & Curator
# Updated on: C76 (Refine UI to allow viewing completed responses during generation)

- **Key/Value for A0:**
- **Description:** Details the plan to consolidate the response generation UI into the main PCPP view. This involves showing the progress display in the main content area when the current cycle is in a "generating" state, while keeping the response tabs visible and allowing completed responses to be viewed.
- **Tags:** feature plan, ui, ux, workflow, refactor, state management

## 1. Vision & Goal

The current workflow for generating responses involves a jarring context switch. The user clicks "Generate responses," and the entire UI is replaced by a separate "Generation Progress" view. To return to the main panel, the user must wait for completion or navigate away and lose the progress view.

The goal of this refactor is to create a more seamless, integrated experience. The response generation UI will now be displayed *within* the main Parallel Co-Pilot Panel (PCPP) view itself. This is achieved by making the UI state-driven: if the currently selected cycle is in a "generating" state, the progress display is shown; otherwise, the standard response tabs are shown.

## 2. User Flow (C76 Refinement)

1.  **User Action:** The user is on Cycle `N` and clicks `Generate responses`.
2.  **Backend Action:** The backend creates a new placeholder Cycle `N+1` with `status: 'generating'` and notifies the frontend.
3.  **UI Navigation:** The frontend automatically navigates to the new Cycle `N+1`.
4.  **Conditional Rendering:** The main PCPP view component loads the data for Cycle `N+1`. It sees that `status` is `'generating'`.
5.  **New UI State:**
    *   The `ResponseTabs` component **remains visible**. The tabs for the generating responses will show a loading indicator.
    *   The main content area *below* the tabs, which would normally show the `ResponsePane`, now renders the `GenerationProgressDisplay`. The user sees the progress bars for the new cycle they are on.
    *   **Viewing Completed Responses:** As individual responses complete, their loading indicators on the tabs disappear. The user can now click on a completed response's tab. The UI will switch from showing the overall `GenerationProgressDisplay` to showing the `ResponsePane` for that specific completed response, allowing them to review it while others are still generating. Clicking on a tab that is still generating will continue to show the `GenerationProgressDisplay`.
6.  **Completion:** When all LLM responses are complete, the backend updates the status of Cycle `N+1` to `'complete'`. The frontend receives this update, and the default view for all tabs becomes the `ResponsePane`.

## 3. Additional UI Refinements

-   **Collapsible Ephemeral Context:** To de-clutter the UI, the "Ephemeral Context" text area, which is used less frequently, will now be in a collapsible section. It will be collapsed by default for new cycles. This state will be persisted per-cycle.

## 4. Technical Implementation Plan

1.  **Remove `activeView` State:**
    *   **`view.tsx`:** The `const [activeView, setActiveView] = useState<'main' | 'progress'>('main');` state and all associated logic will be removed.
    *   **`vscode-webview.d.ts`:** The `pcppActiveView` property will be removed from the `ViewState` interface.

2.  **Implement Conditional Rendering (`view.tsx`):**
    *   The main render logic will be updated:
        ```jsx
        // Inside the App component's return statement
        const activeTabIsComplete = tabs[activeTab.toString()]?.parsedContent !== null; // Or a better check
        const showProgress = currentCycle?.status === 'generating' && !activeTabIsComplete;

        <ResponseTabs {...props} />
        {showProgress ? (
            <GenerationProgressDisplay {...props} />
        ) : (
            <>
                <WorkflowToolbar {...props} />
                <div className="tab-content">
                    <ResponsePane {...props} />
                </div>
            </>
        )}
        ```

3.  **Make Ephemeral Context Collapsible:**
    *   **`pcpp.types.ts`:** Add `isEphemeralContextCollapsed?: boolean;` to the `PcppCycle` interface.
    *   **`history.service.ts`:** In the default cycle object, set `isEphemeralContextCollapsed: true`.
    *   **`ContextInputs.tsx`:**
        *   Add a new state for the collapsed state, initialized from props.
        *   Wrap the Ephemeral Context `textarea` and its label in a `CollapsibleSection` component.
    *   **`view.tsx`:** Manage the collapsed state and pass it down to `ContextInputs`, ensuring it's included in the `saveCurrentCycleState` payload.
    *   **`view.scss`:** Add styling for the new collapsible section within the `context-inputs` container.
</file_artifact>

<file path="src/Artifacts/A105. DCE - PCPP View Refactoring Plan for Cycle 76.md">
# Artifact A105: DCE - PCPP View Refactoring Plan for Cycle 76
# Date Created: C76
# Author: AI Model & Curator
# Updated on: C86 (Complete rewrite of refactoring strategy)

## 1. Problem Statement & Acknowledgment of Prior Failures

The `parallel-copilot.view/view.tsx` component has grown to over 10,000 tokens, making it a "god component." It manages state and renders logic for numerous distinct features, making it difficult to maintain, prone to bugs, and inefficient to include in AI prompts.

Previous refactoring attempts in Cycles 82-85 were ineffective. They failed to significantly reduce the component's size because they only shuffled logic between `view.tsx` and other *existing* presentational components. They did not address the core problem: the monolithic concentration of business logic and state management within the `view.tsx` file itself.

This document presents a new, fundamentally different refactoring strategy that will resolve this issue by extracting logic into **new files** as custom React hooks.

## 2. The New Refactoring Strategy: Container/Hooks/Presentational

The new plan is to refactor `view.tsx` using a standard, robust React pattern for managing complexity: **Container/Hooks/Presentational**.

1.  **Container (`view.tsx`):** The `view.tsx` file will become a lean "container" component. Its sole responsibility will be to orchestrate the application. It will call the various custom hooks to get the state and logic handlers it needs, and then pass that data down as props to the presentational components.
2.  **Hooks (`/hooks/*.ts`):** All complex business logic, state management (`useState`, `useMemo`, `useEffect`), and IPC handling will be extracted from `view.tsx` and moved into a series of new, single-responsibility custom hooks. These are new files that will live in a new `src/client/views/parallel-copilot.view/hooks/` directory.
3.  **Presentational (`/components/*.tsx`):** The existing components (`CycleNavigator`, `ResponseTabs`, `ParsedView`, etc.) will remain as "dumb" presentational components. They will receive all the data they need to render and all the functions they need to call via props.

## 3. Proposed New Files: Custom Hooks

A new directory will be created: `src/client/views/parallel-copilot.view/hooks/`. The following new files will be created within it, each containing a custom hook to manage a specific domain of logic.

| New File | Hook Name | Responsibility | Estimated Tokens |
| :--- | :--- | :--- | :--- |
| `usePcppIpc.ts` | `usePcppIpc` | Encapsulates the massive `useEffect` that registers all `clientIpc.onServerMessage` listeners. It will take state-setter functions as arguments and call them when messages are received. | ~2,000 |
| `useCycleManagement.ts` | `useCycleManagement` | Manages `currentCycle`, `maxCycle`, `cycleTitle`, `cycleContext`, `ephemeralContext`, `saveStatus`. Exposes handlers like `handleCycleChange`, `handleNewCycle`, `saveCurrentCycleState`. | ~1,500 |
| `useTabManagement.ts` | `useTabManagement` | Manages `tabs`, `activeTab`, `tabCount`, `isParsedMode`, `isSortedByTokens`. Exposes handlers like `handleTabSelect`, `handleRawContentChange`, `parseAllTabs`, `handleSortToggle`. | ~1,800 |
| `useFileManagement.ts` | `useFileManagement` | Manages `selectedFilePath`, `selectedFilesForReplacement`, `fileExistenceMap`, `pathOverrides`, `comparisonMetrics`. Exposes handlers like `handleSelectForViewing`, `handleAcceptSelectedFiles`, `handleLinkFile`. | ~2,000 |
| `useWorkflow.ts` | `useWorkflow` | Manages the `workflowStep` state and contains the complex `useEffect` logic that determines the next step in the guided workflow. | ~1,200 |
| `useGeneration.ts` | `useGeneration` | Manages `generationProgress`, `tps`, `isGenerationComplete`, `connectionMode`. Exposes handlers like `handleGenerateResponses`, `handleStartGeneration`, `handleRegenerateTab`. | ~1,000 |

### 3.1. Revised Token Distribution Estimate

| Component | Responsibility | New Estimated Tokens |
| :--- | :--- | :--- |
| **`view.tsx` (Container)** | - Call all custom hooks. <br> - Render top-level conditional UI (`Onboarding`, `Progress`, `Main`). <br> - Pass props to presentational components. | **~1,500** |
| **New Hooks Total** | - All business logic and state management. | **~9,500** |
| **Existing Components** | - UI Rendering. | (Unchanged) |

This architecture will reduce `view.tsx` from **~10,300 tokens** to a much more manageable **~1,500 tokens**.

## 4. Implementation Steps (For Next Cycle)

1.  **Create `hooks` directory and files:** Create the new directory and the empty hook files listed above.
2.  **Migrate Logic to Hooks:** Systematically move related `useState`, `useCallback`, `useMemo`, and `useEffect` blocks from `view.tsx` into the appropriate new custom hook file. Each hook will return an object containing the state values and handler functions it manages.
3.  **Refactor `view.tsx`:**
    *   Remove all the logic that was moved to the hooks.
    *   Call each new custom hook at the top of the `App` component.
    *   Update the props being passed to the child presentational components (`CycleNavigator`, `ContextInputs`, etc.) to use the state and handlers returned from the hooks.
4.  **Verification:** Test the UI thoroughly to ensure that all functionality remains intact after the refactor.

---
</file_artifact>

<file path="src/Artifacts/A106. DCE - vLLM Performance and Quantization Guide.md">
# Artifact A106: DCE - vLLM Performance and Quantization Guide
# Date Created: C76
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A guide explaining the performance warnings from the vLLM logs and detailing the various model quantization options available.
- **Tags:** guide, vllm, performance, quantization, llm

## 1. Overview & Goal

This document addresses your questions from Cycle 76 regarding the vLLM startup logs and the different model versions available. The goal is to clarify what the performance warnings mean and to explain the concept of model quantization, which is what the different file versions (Q2_K, Q4_K_M, etc.) represent.

## 2. Understanding the vLLM Startup Logs

The logs you provided contain several warnings and informational messages that are useful for performance tuning. Here's a breakdown:

-   **`Your GPU does not have native support for FP4 computation... Weight-only FP4 compression will be used leveraging the Marlin kernel.`**
    *   **Explanation:** Your NVIDIA RTX 3090 GPU (Ampere architecture, SM86) does not have specialized hardware (Tensor Cores) for 4-bit floating-point (FP4) math. Newer GPUs (Hopper architecture, SM90+) do. To compensate, vLLM is using a highly optimized software routine called the "Marlin kernel" to perform the 4-bit operations.
    *   **Impact:** You can still run 4-bit models, but it might not be as fast as on the latest hardware.

-   **`You are running Marlin kernel with bf16 on GPUs before SM90. You can consider change to fp16 to achieve better performance if possible.`**
    *   **Explanation:** This is a direct performance suggestion. Your GPU is using `bfloat16` (a data type good for training) for its computations. The Marlin kernel maintainers suggest that `float16` (`fp16`) is often faster for inference on your specific GPU architecture.
    *   **Action:** You could potentially get a performance boost by starting the server with an additional flag: `--dtype float16`.

-   **`mxfp4 quantization is not fully optimized yet.`**
    *   **Explanation:** The specific 4-bit format vLLM is using (`mxfp4`) is still considered experimental and may not be as fast as other, more mature quantization methods.

## 3. Model Quantization Explained

The list of model versions you provided (`Q3_K_S`, `Q4_0`, `Q8_0`, `F16`, etc.) refers to different **quantization levels**.

**Quantization** is the process of reducing the precision of the numbers (weights) used in a neural network. This makes the model file smaller and can make inference faster, but it comes at the cost of a small reduction in accuracy or "intelligence."

-   **`F16` (Float 16):** This is the unquantized, full-precision version. It offers the highest quality but has the largest file size and VRAM requirement.
-   **`Q8_0` (8-bit Quantized):** Each weight is stored as an 8-bit integer. This is roughly half the size of the F16 version with very little quality loss. A great balance for performance and quality.
-   **`Q4_K_M` (4-bit K-Quant Medium):** This is a very popular 4-bit quantization. It significantly reduces the model size, allowing very large models to run on consumer hardware. The quality is generally excellent for the size. The `_K` refers to the "K-quants" method, which is an improved quantization strategy. `_M` means "Medium."
-   **`Q2_K` (2-bit K-Quant):** An extreme level of quantization. The model is very small but the quality loss is significant. Often used for research or on very constrained devices.

### Which Version Did You Load?

The command you ran (`python -m vllm.entrypoints.openai.api_server --model "unsloth/gpt-oss-20b"`) loads the **default, unquantized `bfloat16` version** of the model from Hugging Face. vLLM then applies its own `mxfp4` quantization on-the-fly.

The list of `Q` files you found are typically associated with the **GGUF format**, which is used by other inference engines like `llama.cpp`. vLLM does not load GGUF files directly. It has its own supported quantization methods (like AWQ, GPTQ, and the experimental `mxfp4`) that it applies to the base model.

**In summary:** You are not using one of the GGUF files from your list. You are using the base model, and vLLM is applying its own 4-bit quantization to it. The warnings are helpful tips for potentially improving performance on your specific hardware.
</file_artifact>

<file path="src/Artifacts/A110. DCE - Response UI State Persistence and Workflow Plan.md">
# Artifact A110: DCE - Response UI State Persistence and Workflow Plan
# Date Created: C96
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A plan to fix the response UI state loss and workflow bugs by expanding the data model to include generation metrics, refactoring the backend to persist them, and updating the frontend UI to be driven by a per-response status.
- **Tags:** plan, bug fix, persistence, state management, ui, ux, workflow

## 1. Problem Statement

The response generation UI, while functional, suffers from several critical bugs that make it unreliable and unintuitive:
1.  **State Loss:** All metrics (timers, token counts, progress) are lost if the user navigates away from the PCPP tab and back.
2.  **Missing Persistence:** The valuable metrics gathered during generation are not saved to `dce_history.json`, meaning they are lost forever once the UI is re-rendered.
3.  **"Stuck UI":** The UI often gets stuck on the "Generating Responses" view even after all responses are complete, because it is incorrectly keying off the overall cycle's status instead of the individual response's status.
4.  **Incorrect Workflow:** The UI doesn't allow a user to view a completed response while others are still generating.
5.  **Title Bug:** The backend incorrectly renames new cycles to "Cycle X - Generating...", which breaks the user-driven title workflow.

## 2. The Solution: Per-Response State & Persistence

The root cause of these issues is that the generation metrics are transient UI state and the rendering logic is too simplistic. The solution is to make these metrics a persistent part of our data model and make the UI rendering logic more granular.

### 2.1. New Data Model

The `PcppResponse` interface in `pcpp.types.ts` will be expanded to become the single source of truth for a response and its generation metadata.

**New `PcppResponse` Interface:**
```typescript
export interface PcppResponse {
    content: string;
    // The single source of truth for the response's state
    status: 'pending' | 'thinking' | 'generating' | 'complete' | 'error';
    
    // Persisted Metrics
    startTime?: number;         // Timestamp when generation for this response started
    thinkingEndTime?: number;   // Timestamp when the 'thinking' phase ended
    endTime?: number;           // Timestamp when the response was fully received
    thinkingTokens?: number;    // Total tokens from the 'thinking' phase
    responseTokens?: number;    // Total tokens from the 'response' phase
}
```

### 2.2. New UI Rendering Logic

The main view's logic will no longer be a simple binary switch based on the *cycle's* status. It will be driven by the *active tab's* response status.

**Logic in `view.tsx`:**
```
const activeTab = tabs[activeTabId];
const showProgressView = activeTab?.status === 'generating' || activeTab?.status === 'thinking';

if (showProgressView) {
  // Render <GenerationProgressDisplay />
} else {
  // Render <ResponsePane />
}
```
This allows the UI to correctly show the progress view for a tab that is actively generating (including a re-generation) but show the parsed content for a tab that is complete.

## 3. Technical Implementation Plan

1.  **Update Data Model (`pcpp.types.ts`):**
    *   Update the `PcppResponse` interface as defined in section 2.1.

2.  **Update Backend (`llm.service.ts`):**
    *   Refactor the `generateBatch` stream handler.
    *   It will now create a richer `GenerationProgress` object that includes `startTime`.
    *   As it processes chunks, it will distinguish between `reasoning_content` and `content`, summing their token counts into `thinkingTokens` and `responseTokens` respectively.
    *   It will capture `thinkingEndTime` and `endTime` timestamps.
    *   When a stream for a response ends, it will pass this complete metrics object to the history service.

3.  **Update Backend (`history.service.ts`):**
    *   Refactor `updateCycleWithResponses` to accept this new, richer response object and save all the new metric fields to `dce_history.json`.
    *   **Fix Title Bug:** Modify `createNewCyclePlaceholder` to set the `title` to `"New Cycle"` instead of `"Cycle X - Generating..."`.

4.  **Refactor Frontend (`view.tsx` and hooks):**
    *   Implement the new per-tab rendering logic described in section 2.2.
    *   Update the `GenerationProgressDisplay.tsx` component to source its data from the `PcppResponse` objects of the current cycle. This ensures that when the view is reloaded for a "generating" cycle, it can reconstruct its state from the persisted metrics in `dce_history.json`.

5.  **Add Manual View Toggle (UX Fallback):**
    *   Add a new button to the `WorkflowToolbar`.
    *   This button will be visible only when viewing a cycle with a status of `'complete'`.
    *   It will toggle a local `useState` boolean that overrides the main logic, allowing the user to manually switch between the `ResponsePane` and the (now historical) `GenerationProgressDisplay` for that cycle.
</file_artifact>

<file path="src/Artifacts/A112. DCE - Per-Cycle Connection Mode Plan.md">
# Artifact A112: DCE - Per-Cycle Connection Mode Plan
# Date Created: C116
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A plan for a dropdown in the PCPP to allow users to select a generation mode for the current cycle, overriding the global default from the settings panel.
- **Tags:** feature plan, ui, ux, llm, configuration

## 1. Overview & Goal

Currently, the LLM connection mode (e.g., "Manual", "Demo") is a global setting. This is too rigid. A user may want to generate one cycle using the automated "Demo" mode and the next using the "Manual" copy/paste workflow, without having to navigate to the settings panel each time.

The goal of this feature is to provide more flexible, in-context control over the generation mode. We will add a dropdown menu to the main Parallel Co-Pilot Panel (PCPP) that allows the user to select the connection mode for the *current* cycle. The global setting will now only determine the default mode for newly created cycles.

## 2. User Story

| ID | User Story | Acceptance Criteria |
|---|---|---|
| P3-CM-06 | **Per-Cycle Mode Selection** | As a user, I want a dropdown menu in the main PCPP view to select the connection mode (e.g., "Manual", "Demo") for the current cycle, so I can easily switch between different generation workflows without going to the settings panel. | - A dropdown menu is added to the PCPP header toolbar. <br> - It displays the available connection modes. <br> - The selected value in the dropdown determines which "Generate" button is shown ("Generate prompt.md" vs. "Generate responses"). <br> - When a new cycle is created, the dropdown defaults to the mode selected in the main settings panel. <br> - The mode for the current cycle is persisted as part of the cycle's data. |

## 3. Technical Implementation Plan

1.  **Data Model (`pcpp.types.ts`):**
    *   Add a new optional property to the `PcppCycle` interface: `connectionMode?: ConnectionMode;`.

2.  **Backend (`history.service.ts`):**
    *   In `createNewCyclePlaceholder` and the default cycle object in `getInitialCycle`, the new `connectionMode` property will be initialized from the global settings (retrieved from `settings.service.ts`). This ensures new cycles respect the user's default preference.

3.  **Frontend (`view.tsx` and hooks):**
    *   **State Management (`useGeneration.ts`):** The `connectionMode` state will be moved from a simple `useState` to be part of the persisted cycle data managed in `useCycleManagement.ts`. The `useGeneration` hook will receive it as a prop.
    *   **UI (`WorkflowToolbar.tsx` or `pc-header`):**
        *   A new `<select>` dropdown will be added to the UI.
        *   Its `value` will be bound to the `currentCycle.connectionMode`.
        *   Its `onChange` handler will update the `connectionMode` for the current cycle in the state and mark the cycle as `'unsaved'`.
    *   **Conditional Logic (`view.tsx`):** The logic that determines which "Generate" button to show will be updated to read from `currentCycle.connectionMode` instead of the global setting state.

4.  **Backend (`prompt.service.ts`):**
    *   The `getPromptParts` method, which selects the correct interaction schema (`A52.2` vs. `A52.3`), will be updated. It already receives the `cycleData` object. It will now check `cycleData.connectionMode` to make its decision, ensuring the correct schema is used for the per-cycle selection.
</file_artifact>

<file path="src/Artifacts/A114. AI Ascent - Dual Domain Hosting Guide.md">
# Artifact A114: AI Ascent - Dual Domain Hosting Guide
# Date Created: C117
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A guide explaining how to host multiple domains (e.g., `aiascent.game` and `aiascent.dev`) on a single server using a reverse proxy like Caddy.
- **Tags:** guide, networking, hosting, reverse proxy, caddy, dns

## 1. Overview & Goal

You have asked if it's possible to host both `aiascent.game` and the new `aiascent.dev` on the same server that is currently hosting the game and the vLLM instance. The answer is **yes**, and this is a standard and efficient way to manage multiple websites on a single machine.

The goal of this guide is to explain the technical concept of a **reverse proxy** and provide a concrete example of how to configure it using Caddy, which you are already using.

## 2. The Core Concept: Reverse Proxy with Virtual Hosts

The magic that makes this work is a **reverse proxy** that uses **virtual hosts**. Here's how the pieces fit together:

1.  **DNS Records:** You will configure the DNS "A" records for both `aiascent.game` and `aiascent.dev` to point to the **same public IP address**—the one for your home server.

2.  **Port Forwarding:** Your AT&T router will continue to forward all web traffic (ports 80 for HTTP and 443 for HTTPS) to the single PC in your closet that acts as the server.

3.  **The Reverse Proxy (Caddy):** This is the traffic controller. Caddy will be the only process listening on ports 80 and 443. When a request comes in, Caddy inspects the `Host` header to see which domain the user was trying to reach.
    *   If the `Host` is `aiascent.game`, Caddy forwards the request to the Node.js process running your game.
    *   If the `Host` is `aiascent.dev`, Caddy forwards the request to the *different* Node.js process running your new website.

4.  **Backend Applications:** Each of your applications (the game server, the new website server) will run on its own, separate, internal-only port (e.g., 3001 for the game, 3002 for the new website). They don't need to know anything about HTTPS or the public domains.

This architecture is secure, efficient, and makes adding more websites in the future very simple.

## 3. Example Caddyfile Configuration

Your existing `Caddyfile` (from `A91`) is already set up to handle `aiascent.game`. To add the new `aiascent.dev` site, you simply need to add another block to the file.

Let's assume:
*   Your `aiascent.game` Node.js server runs on `localhost:3001`.
*   Your new `aiascent-dev` Next.js server will run on `localhost:3002`.

Your new `Caddyfile` would look like this:

```caddy
# Caddyfile for dual domain hosting

aiascent.game {
    # Caddy will automatically handle HTTPS for this domain.
    encode zstd gzip
    log {
        output file /var/log/caddy/aiascent_game.log
    }

    # Reverse proxy all requests for aiascent.game to the game server on port 3001.
    reverse_proxy localhost:3001 {
        header_up Host {host}
        header_up X-Real-IP {remote_ip}
        header_up X-Forwarded-For {remote_ip}
        header_up X-Forwarded-Proto {scheme}
        header_up Connection {>Connection}
        header_up Upgrade {>Upgrade}
    }
}

aiascent.dev {
    # Caddy will automatically handle HTTPS for this domain as well.
    encode zstd gzip
    log {
        output file /var/log/caddy/aiascent_dev.log
    }

    # Reverse proxy all requests for aiascent.dev to the new website server on port 3002.
    reverse_proxy localhost:3002
}

# Optional: Redirect www versions to the main domains
www.aiascent.game {
    redir https://aiascent.game{uri} permanent
}
www.aiascent.dev {
    redir https://aiascent.dev{uri} permanent
}
```

### 4. Action Steps

1.  **DNS:** Point the `aiascent.dev` A record to your server's public IP address.
2.  **Application Ports:** Ensure your two applications are configured to run on different ports (e.g., 3001 and 3002).
3.  **Caddyfile:** Update your `Caddyfile` with the new block for `aiascent.dev`.
4.  **Reload Caddy:** Run `caddy reload` in your server's terminal to apply the new configuration.

Caddy will automatically obtain the SSL certificate for `aiascent.dev` and begin routing traffic to the correct application based on the domain name.
</file_artifact>

<file path="src/Artifacts/A115. DCE - Porting Guide for aiascent.dev.md">
# Artifact A115: DCE - Porting Guide for aiascent.dev
# Date Created: C117
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A list of recommended documentation artifacts to port from the DCE project to the new `aiascent.dev` project to bootstrap its development process.
- **Tags:** guide, documentation, project setup, aiascent-dev

## 1. Overview

To effectively bootstrap the `aiascent.dev` project using the Data Curation Environment (DCE), it is highly recommended to port over a set of existing documentation artifacts from the DCE project itself. These artifacts codify the development process, workflow, and interaction patterns that will be essential for building the new website.

This guide lists the specific artifacts you should copy from your main `DCE/src/Artifacts` directory into the `aiascent-dev/context/dce/` directory.

## 2. Recommended Artifacts to Port

The following artifacts provide the "source of truth" for the DCE-driven development process. They will be invaluable as context when prompting the AI to build the `aiascent.dev` website.

### Core Process & Workflow
*   **`A0. DCE Master Artifact List.md`**: Provides the structure and concept of the master list.
*   **`A9. DCE - GitHub Repository Setup Guide.md`**: Essential for initializing the new project's version control.
*   **`A65. DCE - Universal Task Checklist.md`**: The template and philosophy for organizing work in cycles.
*   **`A69. DCE - Animated UI Workflow Guide.md`**: Documents the "perfect loop" of the DCE workflow, which is a key concept to showcase and teach.
*   **`A70. DCE - Git-Integrated Testing Workflow Plan.md`**: The baseline/restore workflow is a core feature of the development process that should be used for the new project.
*   **`A72. DCE - README for Artifacts.md`**: Explains the purpose of the artifacts directory to both the user and the AI.

### Interaction & Parsing
*   **`A52.1 DCE - Parser Logic and AI Guidance.md`**: Provides the AI with the literal parser code, enabling metainterpretability.
*   **`A52.2 DCE - Interaction Schema Source.md`**: The canonical rules for how the AI should structure its responses to be parsed correctly by the DCE.

### Content & Showcase
*   **`A77. DCE - Whitepaper Generation Plan.md`**: The original plan for generating the whitepaper.
*   **`A78. DCE - Whitepaper - Process as Asset.md`**: The full content of the whitepaper that you intend to display in the interactive report viewer.
*   **`reportContent.json`**: The structured JSON data from `aiascent.game`'s report viewer, which can be used as the data source for the new `InteractiveWhitepaper` component.

### 3. Procedure

1.  Navigate to your `C:\Projects\DCE\src\Artifacts` directory.
2.  Copy the files listed above.
3.  Paste them into the `C:\Projects\aiascent-dev\context\dce\` directory.
4.  You can now use these files as part of the context when generating prompts for the `aiascent.dev` project within the DCE.
</file_artifact>

<file path="src/Artifacts/A149. Local LLM Integration Plan.md">
# Artifact: A149. Local LLM Integration Plan
# Updated on: C1280 (Add documentation for REMOTE_LLM_URL environment variable.)
# Updated on: C1217 (Update architecture to reflect that @Ascentia now uses a streaming Socket.IO event.)
# Updated on: C1216 (Reflect change from /chat/completions to /completions endpoint for chatbot streaming.)
# Date Created: Cycle 1211
# Author: AI Model

## 1. Overview & Goal

This document outlines the technical plan for integrating a locally hosted Large Language Model (LLM) into the "AI Ascent" game. The goal is to create a secure and robust connection between the game client/server and a local LLM endpoint (like one provided by LM Studio) to power new, dynamic gameplay features.

This integration will enable:
1.  An in-game helper bot, `@Ascentia`, that can answer player questions about the game.
2.  Interactive sessions where players can "talk" to their own AI products.
3.  A new "Poetry Battle" PvP competition between players' chatbot products.

## 2. Core Architecture: Backend Proxy

To ensure security and control, the game client will **never** directly call the local LLM endpoint. All communication will be routed through a dedicated backend API endpoint or WebSocket handler that acts as a proxy.

### 2.1. Rationale for a Backend Proxy
*   **Security:** Prevents malicious clients from directly accessing or overloading the local LLM server. It keeps the endpoint address and any potential API keys hidden from the client.
*   **Control:** Allows the server to inject, modify, or augment prompts before they are sent to the LLM. This is critical for:
    *   Adding system prompts and context for the `@Ascentia` helper bot.
    *   Injecting parameters to simulate quality degradation for the Poetry Battle.
    *   Enforcing rate limiting and preventing abuse.
*   **Flexibility:** The client-facing API remains consistent even if the underlying LLM provider or endpoint changes in the future.
*   **State Management:** The server can access the game's database (`prisma`) to fetch context for prompts (e.g., player stats, game rules from documentation artifacts).

### 2.2. Implementation: API Handlers in `server.ts`
*   The existing Express server (`src/server.ts`) will handle all LLM-related requests.
*   **Socket.IO `'start_ascentia_stream'` event:** This event is now used for all `@Ascentia` queries. It provides a streaming response for a better user experience.
*   **Socket.IO `'start_chatbot_stream'` event:** This event will be used for all streaming requests, specifically for the "Chat with Service" feature.
*   **`/api/llm/proxy` (POST):** This endpoint now handles only non-streaming, single-turn requests for features like the Player LLM Terminal.
*   The handlers for these routes and events will:
    1.  Authenticate the user session.
    2.  Based on the request's `context`, construct a final prompt string, potentially adding system instructions, game rules, or degradation parameters.
    3.  Use a server-side `fetch` to send the final, formatted request to the appropriate local LLM endpoint specified in an environment variable.
    4.  **For streaming:** The handler will read the `ReadableStream`, parse the SSE chunks, and emit the relevant `_stream_chunk` and `_stream_end` events back to the originating client socket.
    5.  **For non-streaming:** The handler will return the full response in the JSON body.

## 3. Local LLM Server Configuration (LM Studio)

### 3.1. Environment Variables (`.env` file)

To allow for flexible connections to different LLM servers (local, remote on the same network, or even production endpoints), the `server.ts` logic will prioritize URLs in the following order:

1.  **`REMOTE_LLM_URL` (NEW):** Use this to specify the address of an LLM running on a different machine on your local network. This is ideal for a two-PC development setup.
    *   **Example:** `REMOTE_LLM_URL=http://192.168.1.85:1234`
2.  **`LOCAL_LLM_URL`:** The standard variable for an LLM running on the same machine as the game server.
    *   **Example:** `LOCAL_LLM_URL=http://127.0.0.1:1234`
3.  **Hardcoded Default:** If neither environment variable is set, the server will fall back to `http://127.0.0.1:1234`.

The server will log which URL it is using upon startup for easy debugging.

### 3.2. Recommended Model & Settings
*   **Model:**
    *   **Identifier:** `qwen/qwen3-30b-a3b`
    *   **Context Length:** 32,768
*   **Server:**
    *   **Address:** Match the address in your `.env` file (e.g., `http://192.168.1.85:1234`).
    *   **Enable "Serve on Local Network"** in LM Studio if you are using `REMOTE_LLM_URL`.
    *   **Preset:** OpenAI API
*   **Hardware & Performance:**
    *   **GPU Offload:** Max
*   **Inference Parameters (Default for Creative/Chat Tasks):**
    *   **Temperature:** 0.8
    *   **Top K Sampling:** 40
    *   **Repeat Penalty:** 1.1
    *   **Top P Sampling:** 0.95
*   **Prompt Format:** For chatbot conversations sent to the `/v1/completions` endpoint, the prompt must be manually constructed using the model's chat template.

## 4. State Management: `llmStore.ts`

A new Zustand store will be created to manage the state of LLM-related interactions.

*   **`src/state/llmStore.ts`**
*   **State:**
    *   `isPlayerLlmTerminalOpen: boolean`
    *   `isPlayerChatbotInterfaceOpen: boolean`
    *   `isPoetryBattleViewerOpen: boolean`
    *   `productIdForInteraction: string | null`
    *   `activePoetryBattle: PoetryBattleState | null`
*   **Actions:**
    *   `openLlmTerminal(productId)`
    *   `openChatbotInterface(productId)`
    *   `closeInteractions()`
    *   ...and other actions for managing poetry battles.

## 5. New Files & Components

*   **Frontend UI:**
    *   `src/components/menus/llm/PlayerLlmTerminal.tsx`
    *   `src/components/menus/llm/PlayerChatbotInterface.tsx`
    *   `src/components/menus/llm/PoetryBattleViewer.tsx`
*   **Game Logic:** `src/game/systems/PoetryBattleSystem.ts`
*   **State:** `src/state/llmStore.ts`

This plan establishes a secure and extensible foundation for integrating LLM-powered features into AI Ascent.
</file_artifact>

<file path="src/Artifacts/A189. Number Formatting Reference Guide.md">
# Artifact A189: Number Formatting Guide (K/M Suffixes & Dynamic Decimals)
# Date Created: Cycle 14
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A standalone guide and utility script for formatting large numbers with K/M/B/T suffixes and dynamic decimal place adjustment for clean UI presentation.
- **Tags:** utility, script, formatting, numbers, ui, ux, javascript, typescript

## 1. Purpose

This artifact provides a set of robust, reusable TypeScript functions for formatting numbers in a user-friendly way. The core function, `formatLargeNumber`, intelligently converts large numbers into a compact format using suffixes like 'K' (thousands), 'M' (millions), 'B' (billions), and 'T' (trillions).

The key features of this utility are:
*   **Automatic Suffixing:** Automatically scales numbers and adds the appropriate suffix.
*   **Dynamic Decimal Precision:** Adjusts the number of decimal places shown based on the magnitude of the number, ensuring a clean and consistent look in the UI (e.g., `12.3K`, `123.5K`, `1.23M`).
*   **Handling of Small Numbers:** Gracefully handles numbers below 1,000 without applying a suffix.
*   **Specialized Wrappers:** Includes helper functions like `formatCurrency` and `formatCount` for common use cases.

## 2. Core Utility Functions (from `src/utils.ts`)

Below is the complete TypeScript code. You can save this as a `formatting.ts` file in a new project's `utils` directory.

```typescript
// src/common/utils/formatting.ts

const KMBT_SUFFIXES = ['', 'K', 'M', 'B', 'T', 'Q']; // Extend as needed

/**
 * Formats a large number with appropriate K/M/B/T suffixes and dynamic decimal places.
 * Handles very small near-zero numbers gracefully to avoid scientific notation.
 *
 * @param value The number to format.
 * @param decimalPlaces The base number of decimal places to aim for.
 * @returns A formatted string.
 */
export function formatLargeNumber(value: number | undefined | null, decimalPlaces: number = 2): string {
    if (value === null || value === undefined || isNaN(value) || !Number.isFinite(value)) {
        return '---';
    }
    if (value === 0) {
        return '0';
    }

    const VERY_SMALL_THRESHOLD = 1e-6; // 0.000001
    if (Math.abs(value) < VERY_SMALL_THRESHOLD) {
        return (0).toFixed(decimalPlaces);
    }

    const isNegative = value < 0;
    const absValue = Math.abs(value);

    let unitIndex = 0;
    let scaledValue = absValue;

    if (absValue < 1000) {
        return String(Math.round(value)); // Return whole number if less than 1000
    }

    if (absValue >= 1000) {
        unitIndex = Math.floor(Math.log10(absValue) / 3);
        unitIndex = Math.min(unitIndex, KMBT_SUFFIXES.length - 1);
        scaledValue = absValue / Math.pow(1000, unitIndex);
    }

    let adjustedDecimalPlaces = decimalPlaces;
    if (unitIndex > 0) { // If a suffix is used (K, M, B, T, Q)
        if (scaledValue >= 100) adjustedDecimalPlaces = Math.max(0, decimalPlaces - 2);
        else if (scaledValue >= 10) adjustedDecimalPlaces = Math.max(0, decimalPlaces - 1);
    } else { // No unit suffix (value < 1000)
        if (Math.abs(scaledValue) < 0.01 && scaledValue !== 0) {
            adjustedDecimalPlaces = Math.max(decimalPlaces, 4);
        } else if (Number.isInteger(scaledValue)) {
             adjustedDecimalPlaces = 0;
        }
    }

    const unit = KMBT_SUFFIXES[unitIndex] ?? '';
    let formattedValue = scaledValue.toFixed(adjustedDecimalPlaces);

    // Remove trailing .00 or .0
    if (adjustedDecimalPlaces > 0 && formattedValue.endsWith('0')) {
        formattedValue = formattedValue.replace(/\.?0+$/, '');
    }


    return `${isNegative ? '-' : ''}${formattedValue}${unit}`;
}```

## 3. Usage Examples

Here is how you can use these functions in your code:

```typescript
import { formatLargeNumber } from './path/to/formatting';

// formatLargeNumber examples
console.log(formatLargeNumber(123));        // "123"
console.log(formatLargeNumber(1234));       // "1.23K"
console.log(formatLargeNumber(12345));      // "12.3K"
console.log(formatLargeNumber(123456));     // "123K"
console.log(formatLargeNumber(1234567));    // "1.23M"
console.log(formatLargeNumber(9876543210)); // "9.88B"
console.log(formatLargeNumber(-54321));     // "-54.3K"
console.log(formatLargeNumber(0.0000001));  // "0.00"
```

## 4. Integration Guide

1.  **Copy the Code:** Save the code from Section 2 into a file named `formatting.ts` inside your project's `src/common/utils` directory.
2.  **Import and Use:** Import the function into your UI components.
    ```typescript
    import { formatLargeNumber } from '@/common/utils/formatting';

    const MyComponent = () => {
      const displayValue = formatLargeNumber(123456); // "123K"
      return <div>Tokens: {displayValue}</div>;
    };
    ```
</file_artifact>

<file path="src/Artifacts/aiascent-dev-A0-Master-Artifact-List.md">
# Artifact A0: aiascent.dev - Master Artifact List
# Date Created: C0
# Author: AI Model & Curator

## 1. Purpose

This file serves as the definitive, parseable list of all documentation artifacts for the `aiascent.dev` website project. This project aims to create a promotional website for the Data Curation Environment (DCE) VS Code Extension, featuring an interactive whitepaper as a primary showcase.

## 2. Formatting Rules for Parsing

*   Lines beginning with `#` are comments and are ignored.
*   `##` denotes a major category header and is ignored.
*   `###` denotes an artifact entry. The text following it is the artifact's full name and ID.
*   Lines beginning with `- **Description:**` provide context for the project.
*   Lines beginning with `- **Tags:**` provide keywords for Inference.

## 3. Artifacts List

## I. Project Planning & Design

### A1. aiascent.dev - Project Vision and Goals
- **Description:** High-level overview of the `aiascent.dev` website, its purpose to promote the DCE, and the phased development plan.
- **Tags:** project vision, goals, scope, dce, whitepaper, promotional website

### A2. aiascent.dev - Phase 1 - Requirements & Design
- **Description:** Detailed functional and technical requirements for Phase 1, focusing on building the static site shell and porting the interactive report viewer.
- **Tags:** requirements, design, phase 1, report viewer, nextjs

### A3. aiascent.dev - Technical Scaffolding Plan
- **Description:** Outlines the proposed file structure and technologies, leveraging the `automationsaas` project shell and components from `aiascent.game`.
- **Tags:** technical plan, scaffolding, file structure, nextjs, react, tailwindcss

### A7. aiascent.dev - Development and Testing Guide
- **Description:** A step-by-step guide explaining how to run, debug, and test the `aiascent.dev` website locally.
- **Tags:** development, testing, debugging, workflow, nextjs

### A9. aiascent.dev - GitHub Repository Setup Guide
- **Description:** A step-by-step guide with the necessary git commands to initialize the project as a local repository and push it to a new remote repository on GitHub.
- **Tags:** git, github, version control, setup, repository
</file_artifact>

<file path="src/Artifacts/aiascent-dev-A1-Project-Vision-and-Goals.md">
# Artifact A1: aiascent.dev - Project Vision and Goals
# Date Created: C0
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** High-level overview of the `aiascent.dev` website, its purpose to promote the DCE, and the phased development plan.
- **Tags:** project vision, goals, scope, dce, whitepaper, promotional website

## 1. Project Vision

The vision of **aiascent.dev** is to create a professional and engaging promotional website for the **Data Curation Environment (DCE) VS Code Extension**. The website will serve as the primary public-facing hub for the DCE project, explaining its value proposition and demonstrating its power. It aims to be more than a static landing page; it will be a living testament to the capabilities of the DCE by showcasing complex, interactive components that were themselves built using the extension.

## 2. High-Level Goals & Phases

The project will be developed in distinct phases to ensure an iterative and manageable workflow.

### Phase 1: Core Website and Interactive Whitepaper

The goal of this phase is to establish the foundational website and deliver the primary showcase content.
-   **Core Functionality:**
    -   Build a static website shell based on the `automationsaas` project, including a landing page, header, and footer.
    -   Port the "Report Viewer" component from `aiascent.game` and refactor it into a reusable "Interactive Whitepaper" component.
    -   Integrate the content of the DCE whitepaper (`A78`) into the interactive viewer.
-   **Outcome:** A functional website at `aiascent.dev` where visitors can learn about the DCE and explore the full interactive whitepaper, demonstrating a key product built with the tool.

### Phase 2: Vibe Coding Tutorials and Blog

This phase will build upon the foundation by adding educational content to foster a community and teach the "vibe coding" methodology.
-   **Core Functionality:**
    -   Create a new section on the website for tutorials.
    -   Develop the first set of interactive tutorials explaining the "Vibecoding to Virtuosity" pathway.
    -   Implement a simple blog or articles section for development updates and conceptual deep-dives.
-   **Outcome:** The website becomes an educational resource for users wanting to master AI-assisted development with the DCE.

### Phase 3: Community and Integration Features

This phase focuses on community building and deeper integration with the DCE ecosystem.
-   **Core Functionality:**
    -   Potentially add a community forum or Discord integration.
    -   Explore features like a showcase of projects built with the DCE.
    -   Provide direct download links for the DCE extension's `.vsix` file.
-   **Outcome:** `aiascent.dev` becomes the central community hub for the Data Curation Environment project.
</file_artifact>

<file path="src/Artifacts/aiascent-dev-A2-Phase1-Requirements.md">
# Artifact A2: aiascent.dev - Phase 1 Requirements & Design
# Date Created: C0
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** Detailed functional and technical requirements for Phase 1, focusing on building the static site shell and porting the interactive report viewer.
- **Tags:** requirements, design, phase 1, report viewer, nextjs

## 1. Overview

This document outlines the detailed requirements for Phase 1 of the `aiascent.dev` project. The primary goal of this phase is to launch the core website and implement the interactive whitepaper showcase.

## 2. Functional Requirements

| ID | Requirement | User Story | Acceptance Criteria |
|---|---|---|---|
| FR-01 | **Static Website Shell** | As a visitor, I want to land on a professional homepage that explains what the DCE is, so that I can quickly understand its purpose. | - The website has a main landing page (`/`). <br> - A persistent header provides navigation to "Home" and "Whitepaper". <br> - A persistent footer contains standard links (e.g., GitHub). |
| FR-02 | **Interactive Whitepaper** | As a visitor, I want to navigate to an interactive whitepaper, so that I can read the "Process as Asset" report in an engaging way. | - A page exists at `/whitepaper`. <br> - This page renders the "Interactive Whitepaper" component. <br> - The component loads its content from a structured JSON file. <br> - Users can navigate between pages and sections of the report. |
| FR-03 | **Content Integration** | As a project owner, I want the content of the DCE whitepaper to be displayed in the interactive viewer. | - The textual and structural content from `A78. DCE - Whitepaper - Process as Asset.md` is converted into the JSON format required by the viewer component. |

## 3. Non-Functional Requirements

| ID | Requirement | Description |
|---|---|---|
| NFR-01 | **Performance** | The website should load quickly and be responsive. It will be a statically generated site. |
| NFR-02 | **Reusability** | The "Interactive Whitepaper" component should be designed to be reusable for future reports or tutorials. |

## 4. High-Level Design

-   **Framework:** The project will use the Next.js/React framework from the `automationsaas` shell.
-   **Component Porting:** The `ReportViewer` component and its dependencies will be copied from the `aiascent.game` project. It will be refactored to remove game-specific styling and state, and renamed to `InteractiveWhitepaper`.
-   **Data Source:** The `InteractiveWhitepaper` component will be modified to fetch its data from a local JSON file (`src/data/whitepaperContent.json`), which will be a structured version of the content from the DCE artifacts.
</file_artifact>

<file path="src/Artifacts/aiascent-dev-A3-Technical-Scaffolding-Plan.md">
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
</file_artifact>

<file path="src/Artifacts/aiascent-dev-A7-Development-and-Testing-Guide.md">
# Artifact A7: aiascent.dev - Development and Testing Guide
# Date Created: C0
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A step-by-step guide explaining how to run, debug, and test the `aiascent.dev` website locally.
- **Tags:** template, cycle 0, documentation, project setup, nextjs

## 1. Purpose

This guide provides the standard procedure for running, debugging, and testing the **aiascent.dev** website locally.

## 2. Development Workflow

### Step 1: Install Dependencies

Ensure all project dependencies are installed using npm. Navigate to the project root (`C:\Projects\aiascent-dev`) in your terminal and run:
```bash
npm install
```

### Step 2: Start the Development Server

To compile the code and watch for changes with hot-reloading, run the following command:
```bash
npm run dev
```
This will start the Next.js development server.

### Step 3: Running the Application

Once the development server is running, you will see a message in your terminal, typically:
```
- ready started server on 0.0.0.0:3000, url: http://localhost:3000
```
Open a web browser and navigate to **`http://localhost:3000`** to view the application.

### Step 4: Debugging

You can use the browser's developer tools to debug the frontend application. You can set breakpoints directly in your source code within the "Sources" tab of the developer tools.

## 3. Testing

The project will be configured with a testing framework (e.g., Jest and React Testing Library). To run the test suite, use the following command:
```bash
npm run test
```
This will execute all test files located in the project and report the results to the console.
</file_artifact>

<file path="src/Artifacts/aiascent-dev-A9-GitHub-Repository-Setup-Guide.md">
# Artifact A9: aiascent.dev - GitHub Repository Setup Guide
# Date Created: C0
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A step-by-step guide with the necessary git commands to initialize the project as a local repository and push it to a new remote repository on GitHub.
- **Tags:** git, github, version control, setup, repository, workflow

## 1. Overview

This guide provides the necessary commands to turn your local `aiascent-dev` project folder into a Git repository and link it to a new, empty repository on GitHub.

## 2. Prerequisites

*   You have `git` installed on your machine.
*   You have a GitHub account.

## 3. Step-by-Step Setup

### Step 1: Create a New Repository on GitHub

1.  Go to [github.com](https://github.com) and log in.
2.  In the top-right corner, click the `+` icon and select **"New repository"**.
3.  **Repository name:** `aiascent-dev`.
4.  **Description:** "Promotional and educational website for the Data Curation Environment (DCE) VS Code Extension."
5.  Choose **"Private"** or **"Public"**.
6.  **IMPORTANT:** Do **not** initialize the repository with a `README`, `.gitignore`, or `license`. We will be pushing our existing files.
7.  Click **"Create repository"**.

GitHub will now show you a page with command-line instructions. We will use the section titled **"...or push an existing repository from the command line"**.

### Step 2: Initialize Git in Your Local Project

Open a terminal and navigate to your project's root directory (`C:\Projects\aiascent-dev`). Then, run the following commands one by one.

1.  **Initialize the repository:**
    ```bash
    git init
    ```

2.  **Add all existing files:**
    ```bash
    git add .
    ```

3.  **Create the first commit:**
    ```bash
    git commit -m "Initial commit: Project setup and Cycle 0 artifacts"
    ```

4.  **Rename the default branch to `main`:**
    ```bash
    git branch -M main
    ```

### Step 3: Link and Push to GitHub

1.  **Add the remote repository:** Replace the placeholder URL with the one from your new GitHub repository page.
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/aiascent-dev.git
    ```

2.  **Push your local `main` branch to GitHub:**
    ```bash
    git push -u origin main
    ```

Your new project is now set up with version control and linked to GitHub. You can now use the DCE's Git-integrated features like "Baseline" and "Restore" as you develop the website.
</file_artifact>

<file path="src/Artifacts/DCE_README.md">
# Artifact A72: DCE - README for Artifacts
# Date Created: C158
# Author: AI Model & Curator
# Updated on: C183 (Strengthen Git initialization and `.gitignore` guidance)

- **Key/Value for A0:**
- **Description:** The content for the `README.md` file that is automatically created in a new project's `src/Artifacts` directory, explaining the purpose of the extension and the artifact-driven workflow.
- **Tags:** documentation, onboarding, readme, source of truth

## 1. Welcome to the Data Curation Environment (DCE)

This directory (`src/Artifacts/`) is the heart of your project's planning and documentation. It's managed by the **Data Curation Environment (DCE)**, a VS Code extension designed to streamline AI-assisted development.

This `README.md` file was automatically generated to provide context for you (the developer) and for the AI assistants you will be working with.

## 2. What is an "Artifact"?

In the context of this workflow, an **Artifact** is a formal, written document that serves as a "source of truth" for a specific part of your project. Think of these files as the official blueprints, plans, and records.

The core principle of the DCE workflow is **"Documentation First."** Before writing code, you and your AI partner should first create or update an artifact that describes the plan.

## 3. The Iterative Cycle Workflow

Development in the DCE is organized into **Cycles**. You have just completed the initial setup.

### Your Next Steps

1.  **Initialize Your Git Repository (CRITICAL):**
    To take full advantage of the DCE's testing workflow (creating baselines and restoring changes), you **must** initialize a Git repository.
    
    Open a terminal in your project's root directory (you can use the integrated terminal in VS Code: `Terminal > New Terminal`) and run the following commands:
    ```bash
    git init
    # Create or update your .gitignore file with the line below
    echo ".vscode/" >> .gitignore
    git add .
    git commit -m "Initial commit"
    ```
    **Why `.gitignore`?** The DCE saves its state in a `.vscode/dce_history.json` file. Adding `.vscode/` to your `.gitignore` is crucial to prevent the extension's UI from flashing every time it auto-saves. For a complete guide, refer to the `GitHub Repository Setup Guide.md` artifact.

2.  **Submit Your First Prompt:** The `prompt.md` file has been automatically opened for you. This file contains your project plan and instructions for the AI. Copy its entire contents and paste it into your preferred AI chat interface (like Google's AI Studio, ChatGPT, etc.).

3.  **Review and Accept Responses:** Paste the AI's responses back into the "Resp 1", "Resp 2", etc. tabs in the Parallel Co-Pilot panel. The UI will guide you through parsing the responses, selecting the best one, and accepting its changes into your workspace.

4.  **Repeat:** This completes a cycle. You then start the next cycle, building upon the newly accepted code and documentation.

This structured, iterative process helps maintain project quality and ensures that both human and AI developers are always aligned with the project's goals.
</file_artifact>

<file path="src/Artifacts/T1. Template - Master Artifact List.md">
# Artifact T1: Template - Master Artifact List
# Date Created: C139
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A generic template for a Master Artifact List, to be used as static context in the Cycle 0 prompt.
- **Tags:** template, cycle 0, documentation, project setup

## 1. Purpose

This file serves as the definitive, parseable list of all documentation artifacts for your project. Maintaining this list is crucial for organizing project knowledge and ensuring that both human developers and AI assistants have a clear map of the "Source of Truth" documents.

## 2. Formatting Rules for Parsing

*   Lines beginning with `#` are comments and are ignored.
*   `##` denotes a major category header and is ignored.
*   `###` denotes an artifact entry. The text following it is the artifact's full name and ID.
*   Lines beginning with `- **Description:**` provide context for the project.
*   Lines beginning with `- **Tags:**` provide keywords for Inference.

## 3. Example Structure

## I. Project Planning & Design

### A1. [Your Project Name] - Project Vision and Goals
- **Description:** High-level overview of the project, its purpose, and the development plan.
- **Tags:** project vision, goals, scope, planning

### A2. [Your Project Name] - Phase 1 - Requirements & Design
- **Description:** Detailed functional and technical requirements for the first phase of the project.
- **Tags:** requirements, design, phase 1, features
</file_artifact>

<file path="src/Artifacts/T2. Template - Project Vision and Goals.md">
# Artifact T2: Template - Project Vision and Goals
# Date Created: C139
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A generic template for a Project Vision and Goals document.
- **Tags:** template, cycle 0, documentation, project setup

## 1. Project Vision

The vision of **[Your Project Name]** is to **[State the core problem you are solving and the ultimate goal of the project]**. It aims to provide a **[brief description of the product or system]** that will **[describe the key benefit or value proposition]**.

## 2. High-Level Goals & Phases

The project will be developed in distinct phases to ensure an iterative and manageable workflow.

### Phase 1: [Name of Phase 1, e.g., Core Functionality]

The goal of this phase is to establish the foundational elements of the project.
-   **Core Functionality:** [Describe the most critical feature to be built first].
-   **Outcome:** [Describe the state of the project at the end of this phase, e.g., "A user can perform the core action of X"].

### Phase 2: [Name of Phase 2, e.g., Feature Expansion]

This phase will build upon the foundation of Phase 1 by adding key features that enhance the user experience.
-   **Core Functionality:** [Describe the next set of important features].
-   **Outcome:** [Describe the state of the project at the end of this phase].

### Phase 3: [Name of Phase 3, e.g., Scalability and Polish]

This phase focuses on refining the product, improving performance, and ensuring it is ready for a wider audience.
-   **Core Functionality:** [Describe features related to performance, security, or advanced user interactions].
-   **Outcome:** [Describe the final, polished state of the project].
</file_artifact>

<file path="src/Artifacts/T3. Template - Phase 1 Requirements & Design.md">
# Artifact T3: Template - Phase 1 Requirements & Design
# Date Created: C139
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A generic template for a requirements and design document.
- **Tags:** template, cycle 0, documentation, project setup

## 1. Overview

This document outlines the detailed requirements for Phase 1 of **[Your Project Name]**. The primary goal of this phase is to implement the core functionality as defined in the Project Vision.

## 2. Functional Requirements

| ID | Requirement | User Story | Acceptance Criteria |
|---|---|---|---|
| FR-01 | **[Feature Name]** | As a [user type], I want to [perform an action], so that [I can achieve a goal]. | - [Criterion 1: A specific, testable outcome] <br> - [Criterion 2: Another specific, testable outcome] |
| FR-02 | **[Another Feature Name]** | As a [user type], I want to [perform an action], so that [I can achieve a goal]. | - [Criterion 1] <br> - [Criterion 2] |

## 3. Non-Functional Requirements

| ID | Requirement | Description |
|---|---|---|
| NFR-01 | **Performance** | The core action of [describe action] should complete in under [time, e.g., 500ms]. |
| NFR-02 | **Usability** | The user interface should be intuitive and follow standard design conventions for [platform, e.g., web applications]. |

## 4. High-Level Design

The implementation of Phase 1 will involve the following components:
-   **[Component A]:** Responsible for [its primary function].
-   **[Component B]:** Responsible for [its primary function].
-   **[Data Model]:** The core data will be structured as [describe the basic data structure].
</file_artifact>

<file path="src/Artifacts/T4. Template - Technical Scaffolding Plan.md">
# Artifact T4: Template - Technical Scaffolding Plan
# Date Created: C139
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A generic template for a technical scaffolding plan.
- **Tags:** template, cycle 0, documentation, project setup

## 1. Overview

This document outlines the proposed technical scaffolding and file structure for **[Your Project Name]**. This plan serves as a blueprint for the initial project setup, ensuring a clean, scalable, and maintainable architecture from the start.

## 2. Technology Stack

-   **Language:** [e.g., TypeScript]
-   **Framework/Library:** [e.g., React, Node.js with Express]
-   **Styling:** [e.g., SCSS, TailwindCSS]
-   **Bundler:** [e.g., Webpack, Vite]

## 3. Proposed File Structure

The project will adhere to a standard, feature-driven directory structure:

```
.
├── src/
│   ├── components/       # Reusable UI components (e.g., Button, Modal)
│   │
│   ├── features/         # Feature-specific modules
│   │   └── [feature-one]/
│   │       ├── index.ts
│   │       └── components/
│   │
│   ├── services/         # Core backend or client-side services (e.g., api.service.ts)
│   │
│   ├── types/            # Shared TypeScript type definitions
│   │
│   └── main.ts           # Main application entry point
│
├── package.json          # Project manifest and dependencies
└── tsconfig.json         # TypeScript configuration
```

## 4. Key Architectural Concepts

-   **Separation of Concerns:** The structure separates UI components, feature logic, and core services.
-   **Component-Based UI:** The UI will be built by composing small, reusable components.
-   **Service Layer:** Business logic and external communication (e.g., API calls) will be encapsulated in services to keep components clean.
-   **Strong Typing:** TypeScript will be used throughout the project to ensure type safety and improve developer experience.
</file_artifact>

<file path="src/Artifacts/T5. Template - Target File Structure.md">
# Artifact T5: Template - Target File Structure
# Date Created: C139
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A generic template for a target file structure document.
- **Tags:** template, cycle 0, documentation, project setup

## 1. Overview

This document provides a visual representation of the file structure that the `T6. Template - Initial Scaffolding Deployment Script` will create. It is based on the architecture defined in `T4. Template - Technical Scaffolding Plan`.

## 2. File Tree

```
[Your Project Name]/
├── .gitignore
├── package.json
├── tsconfig.json
└── src/
    ├── components/
    │   └── placeholder.ts
    ├── features/
    │   └── placeholder.ts
    ├── services/
    │   └── placeholder.ts
    ├── types/
    │   └── index.ts
    └── main.ts
```
</file_artifact>

<file path="src/Artifacts/T6. Template - Initial Scaffolding Deployment Script.md">
# Artifact T6: Template - Initial Scaffolding Deployment Script (DEPRECATED)
# Date Created: C139
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** (Deprecated) A generic template for a scaffolding deployment script. This is obsolete.
- **Tags:** template, cycle 0, documentation, project setup, deprecated

## 1. Overview

This artifact contains a simple Node.js script (`deploy_scaffold.js`). Its purpose is to automate the creation of the initial project structure for **[Your Project Name]**, as outlined in `T5. Template - Target File Structure`.

**Note:** This approach is now considered obsolete. The preferred method is to have the AI generate the necessary files directly in its response.

## 2. How to Use

1.  Save the code below as `deploy_scaffold.js` in your project's root directory.
2.  Open a terminal in that directory.
3.  Run the script using Node.js: `node deploy_scaffold.js`

## 3. Script: `deploy_scaffold.js`

```javascript
const fs = require('fs').promises;
const path = require('path');

const filesToCreate = [
    { path: 'package.json', content: '{ "name": "my-new-project", "version": "0.0.1" }' },
    { path: 'tsconfig.json', content: '{ "compilerOptions": { "strict": true } }' },
    { path: '.gitignore', content: 'node_modules\ndist' },
    { path: 'src/main.ts', content: '// Main application entry point' },
    { path: 'src/components/placeholder.ts', content: '// Reusable components' },
    { path: 'src/features/placeholder.ts', content: '// Feature modules' },
    { path: 'src/services/placeholder.ts', content: '// Core services' },
    { path: 'src/types/index.ts', content: '// Shared types' },
];

async function deployScaffold() {
    console.log('Deploying project scaffold...');
    const rootDir = process.cwd();

    for (const file of filesToCreate) {
        const fullPath = path.join(rootDir, file.path);
        const dir = path.dirname(fullPath);

        try {
            await fs.mkdir(dir, { recursive: true });
            await fs.writeFile(fullPath, file.content, 'utf-8');
            console.log(`✅ Created: ${file.path}`);
        } catch (error) {
            console.error(`❌ Failed to create ${file.path}: ${error.message}`);
        }
    }
    console.log('\n🚀 Scaffold deployment complete!');
}

deployScaffold();
```
</file_artifact>

<file path="src/Artifacts/T7. Template - Development and Testing Guide.md">
# Artifact T7: Template - Development and Testing Guide
# Date Created: C139
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A generic template for a development and testing guide.
- **Tags:** template, cycle 0, documentation, project setup

## 1. Purpose

This guide provides the standard procedure for running, debugging, and testing the **[Your Project Name]** application locally.

## 2. Development Workflow

### Step 1: Install Dependencies

Ensure all project dependencies are installed using npm.
```bash
npm install
```

### Step 2: Start the Development Server

To compile the code and watch for changes, run the following command:```bash
npm run watch
```
This will start the development server and automatically recompile your code when you save a file.

### Step 3: Running the Application

[Describe the specific steps to launch the application. For a VS Code extension, this would involve pressing F5 to launch the Extension Development Host. For a web app, it would be opening a browser to `http://localhost:3000`.]

### Step 4: Debugging

You can set breakpoints directly in your source code. [Describe how to attach a debugger. For a VS Code extension, this is automatic when launched with F5.]

## 3. Testing

The project is configured with a testing framework. To run the test suite, use the following command:
```bash
npm run test
```
This will execute all test files located in the project and report the results to the console.
</file_artifact>

<file path="src/Artifacts/T8. Template - Regression Case Studies.md">
# Artifact T8: Template - Regression Case Studies
# Date Created: C141
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A generic template for a regression case studies document, promoting development best practices.
- **Tags:** template, cycle 0, documentation, project setup

## 1. Purpose

This document serves as a living record of persistent or complex bugs that have recurred during development. By documenting the root cause analysis (RCA) and the confirmed solution for each issue, we create a "source of truth" that can be referenced to prevent the same mistakes from being reintroduced into the codebase.

## 2. Case Studies

---

### Case Study 001: [Name of the Bug]

-   **Artifacts Affected:** [List of files, e.g., `src/components/MyComponent.tsx`, `src/services/api.service.ts`]
-   **Cycles Observed:** [e.g., C10, C15]
-   **Symptom:** [Describe what the user sees. e.g., "When a user clicks the 'Save' button, the application crashes silently."]
-   **Root Cause Analysis (RCA):** [Describe the underlying technical reason for the bug. e.g., "The API service was not correctly handling a null response from the server. A race condition occurred where the UI component would unmount before the API promise resolved, leading to a state update on an unmounted component."]
-   **Codified Solution & Best Practice:**
    1.  [Describe the specific code change, e.g., "The API service was updated to always return a default object instead of null."]
    2.  [Describe the pattern or best practice to follow, e.g., "All API calls made within a React component's `useEffect` hook must include a cleanup function to cancel the request or ignore the result if the component unmounts."]
---
</file_artifact>

<file path="src/Artifacts/T9. Template - Logging and Debugging Guide.md">
# Artifact T9: Template - Logging and Debugging Guide
# Date Created: C141
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A generic template for a logging and debugging guide.
- **Tags:** template, cycle 0, documentation, project setup

## 1. Purpose

This document provides instructions on how to access and use the logging features built into the project. Effective logging is crucial for diagnosing performance issues, tracking down bugs, and understanding the application's behavior during development.

## 2. Log Locations

### Location 1: The Browser Developer Console

This is where you find logs from the **frontend**.

-   **What you'll see here:** `console.log()` statements from React components and client-side scripts.
-   **Where to find it:** Open your browser, right-click anywhere on the page, select "Inspect", and navigate to the "Console" tab.

### Location 2: The Server Terminal

This is where you find logs from the **backend** (the Node.js process).

-   **What you'll see here:** `console.log()` statements from your server-side code, API handlers, and services.
-   **Where to find it:** The terminal window where you started the server (e.g., via `npm start`).

## 3. Tactical Debugging with Logs

When a feature is not working as expected, the most effective debugging technique is to add **tactical logs** at every step of the data's journey to pinpoint where the process is failing.

### Example Data Flow for Debugging:

1.  **Frontend Component (`MyComponent.tsx`):** Log the user's input right before sending it.
    `console.log('[Component] User clicked save. Sending data:', dataToSend);`
2.  **Frontend Service (`api.service.ts`):** Log the data just before it's sent over the network.
    `console.log('[API Service] Making POST request to /api/data with body:', body);`
3.  **Backend Route (`server.ts`):** Log the data as soon as it's received by the server.
    `console.log('[API Route] Received POST request on /api/data with body:', req.body);`
4.  **Backend Service (`database.service.ts`):** Log the data just before it's written to the database.
    `console.log('[DB Service] Attempting to write to database:', data);`

By following the logs through this chain, you can identify exactly where the data becomes corrupted, is dropped, or causes an error.
</file_artifact>

<file path="src/Artifacts/T10. Template - Feature Plan Example.md">
# Artifact T10: Template - Feature Plan Example
# Date Created: C141
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A generic template for a feature plan, using a right-click context menu as an example.
- **Tags:** template, cycle 0, documentation, project setup

## 1. Overview & Goal

This document outlines the plan for implementing a standard right-click context menu. The goal is to provide essential management operations directly within the application, reducing the need for users to switch contexts for common tasks.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| US-01 | **Copy Item Name** | As a user, I want to right-click an item and copy its name to my clipboard, so I can easily reference it elsewhere. | - Right-clicking an item opens a context menu. <br> - The menu contains a "Copy Name" option. <br> - Selecting the option copies the item's name string to the system clipboard. |
| US-02 | **Rename Item** | As a user, I want to right-click an item and rename it, so I can correct mistakes or update its label. | - The context menu contains a "Rename" option. <br> - Selecting it turns the item's name into an editable input field. <br> - Pressing Enter or clicking away saves the new name. |
| US-03 | **Delete Item** | As a user, I want to right-click an item and delete it, so I can remove unnecessary items. | - The context menu contains a "Delete" option. <br> - Selecting it shows a confirmation dialog to prevent accidental deletion. <br> - Upon confirmation, the item is removed. |

## 3. Technical Implementation Plan

-   **State Management:** Introduce new state to manage the context menu's visibility and position: `const [contextMenu, setContextMenu] = useState<{ x: number; y: number; item: any } | null>(null);`.
-   **Event Handling:** Add an `onContextMenu` handler to the item element. This will prevent the default browser menu and set the state to show our custom menu at the event's coordinates.
-   **New Menu Component:** Render a custom context menu component conditionally based on the `contextMenu` state. It will contain the options defined in the user stories.
-   **Action Handlers:** Implement the functions for `handleRename`, `handleDelete`, etc. These will be called by the menu items' `onClick` handlers.
-   **Overlay:** An overlay will be added to the entire screen when the menu is open. Clicking this overlay will close the menu.
</file_artifact>

<file path="src/Artifacts/T11. Template - Implementation Roadmap.md">
# Artifact T11: Template - Implementation Roadmap
# Date Created: C152
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A generic template for an implementation roadmap document, guiding the development process.
- **Tags:** template, cycle 0, documentation, project setup, roadmap

## 1. Overview & Goal

This document provides a clear, step-by-step roadmap for the implementation of **[Your Project Name]**. This roadmap breaks the project vision into smaller, manageable, and testable steps. The goal is to build the functionality incrementally, ensuring a stable foundation at each stage.

## 2. Implementation Steps

### Step 1: Foundational Setup & Core Logic

-   **Goal:** Create the basic project structure and implement the single most critical feature.
-   **Tasks:**
    1.  **Scaffolding:** Set up the initial file and directory structure based on the technical plan.
    2.  **Core Data Model:** Define the primary data structures for the application.
    3.  **Implement [Core Feature]:** Build the first, most essential piece of functionality (e.g., the main user action).
-   **Outcome:** A runnable application with the core feature working in a basic form.

### Step 2: UI Development & User Interaction

-   **Goal:** Build out the primary user interface and make the application interactive.
-   **Tasks:**
    1.  **Component Library:** Create a set of reusable UI components (buttons, inputs, etc.).
    2.  **Main View:** Construct the main application view that users will interact with.
    3.  **State Management:** Implement robust state management to handle user input and data flow.
-   **Outcome:** A visually complete and interactive user interface.

### Step 3: Feature Expansion

-   **Goal:** Add secondary features that build upon the core functionality.
-   **Tasks:**
    1.  **Implement [Feature A]:** Build the next most important feature.
    2.  **Implement [Feature B]:** Build another key feature.
    3.  **Integration:** Ensure all new features are well-integrated with the core application.
-   **Outcome:** A feature-complete application ready for polishing.

### Step 4: Polish, Testing, and Deployment

-   **Goal:** Refine the application, fix bugs, and prepare for release.
-   **Tasks:**
    1.  **UI/UX Polish:** Address any minor layout, styling, or interaction issues.
    2.  **Testing:** Conduct thorough testing to identify and fix bugs.
    3.  **Documentation:** Write user-facing documentation and guides.
    4.  **Deployment:** Package and deploy the application.
-   **Outcome:** A stable, polished, and documented application.
</file_artifact>

<file path="src/Artifacts/T12. Template - Competitive Analysis.md">
# Artifact T12: [Project Name] - Competitive Analysis Template
# Date Created: C152
# Author: AI Model & Curator
# Updated on: C158 (Add guidance for researching AI-generated content)

- **Key/Value for A0:**
- **Description:** A generic template for a competitive analysis document, used for feature ideation.
- **Tags:** template, cycle 0, documentation, project setup, research

## 1. Overview

This document provides an analysis of existing tools and products that solve a similar problem to **[Project Name]**. The goal is to identify common features, discover innovative ideas, and understand the competitive landscape to ensure our project has a unique value proposition.

## 2. Research Summary

A search for "[keywords related to your project's core problem]" reveals several existing solutions. The market appears to be [describe the market: mature, emerging, niche, etc.]. The primary competitors or inspirational projects are [Competitor A], [Competitor B], and [Tool C].

The key pain point these tools address is [describe the common problem they solve]. The general approach is [describe the common solution pattern].

## 3. Existing Tools & Inspirations

| Tool / Product | Relevant Features | How It Inspires Your Project |
| :--- | :--- | :--- |
| **[Competitor A]** | - [Feature 1 of Competitor A] <br> - [Feature 2 of Competitor A] | This tool validates the need for [core concept]. Its approach to [Feature 1] is a good model, but we can differentiate by [your unique approach]. |
| **[Competitor B]** | - [Feature 1 of Competitor B] <br> - [Feature 2 of Competitor B] | The user interface of this tool is very polished. We should aim for a similar level of usability. Its weakness is [describe a weakness you can exploit]. |
| **[Tool C]** | - [Feature 1 of Tool C] | This tool has an innovative feature, [Feature 1], that we had not considered. We should evaluate if a similar feature would fit into our project's scope. |
| **AI-Generated Projects** | - [Novel feature from an AI-generated example] | Researching other seemingly AI-generated solutions for similar problems can reveal novel approaches or features that are not yet common in human-developed tools. This can be a source of cutting-edge ideas. |

## 4. Feature Ideas & Opportunities

Based on the analysis, here are potential features and strategic opportunities for **[Project Name]**:

| Feature Idea | Description |
| :--- | :--- |
| **[Differentiating Feature]** | This is a key feature that none of the competitors offer. It would allow users to [describe the benefit] and would be our primary unique selling proposition. |
| **[Improvement on Existing Feature]** | Competitor A has [Feature 1], but it's slow. We can implement a more performant version by [your technical advantage]. |
| **[User Experience Enhancement]** | Many existing tools have a complex setup process. We can win users by making our onboarding experience significantly simpler and more intuitive. |
</file_artifact>

<file path="src/Artifacts/T13. Template - Refactoring Plan.md">
# Artifact T13: Template - Refactoring Plan
# Date Created: C152
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A generic template for a refactoring plan, guiding users to consider constraints like token count.
- **Tags:** template, cycle 0, documentation, project setup, refactor

## 1. Problem Statement

The file `[path/to/problematic/file.ts]` has become difficult to maintain due to [e.g., its large size, high complexity, mixing of multiple responsibilities]. This is leading to [e.g., slower development, increased bugs, high token count for LLM context].

## 2. Refactoring Goals

1.  **Improve Readability:** Make the code easier to understand and follow.
2.  **Reduce Complexity:** Break down large functions and classes into smaller, more focused units.
3.  **Increase Maintainability:** Make it easier to add new features or fix bugs in the future.
4.  **Constraint:** The primary constraint for this refactor is to **reduce the token count** of the file(s) to make them more manageable for AI-assisted development.

## 3. Proposed Refactoring Plan

The monolithic file/class will be broken down into the following smaller, more focused modules/services:

### 3.1. New Service/Module A: `[e.g., DataProcessingService.ts]`

-   **Responsibility:** This service will be responsible for all logic related to [e.g., processing raw data].
-   **Functions/Methods to move here:**
    -   `functionA()`
    -   `functionB()`

### 3.2. New Service/Module B: `[e.g., ApiClientService.ts]`

-   **Responsibility:** This service will encapsulate all external API communication.
-   **Functions/Methods to move here:**
    -   `fetchDataFromApi()`
    -   `postDataToApi()`

### 3.3. Original File (`[e.g., MainController.ts]`):

-   **Responsibility:** The original file will be simplified to act as a coordinator, orchestrating calls to the new services.
-   **Changes:**
    -   Remove the moved functions.
    -   Import and instantiate the new services.
    -   Update the main logic to delegate work to the appropriate service.

## 4. Benefits

-   **Reduced Token Count:** The original file's token count will be significantly reduced.
-   **Improved Maintainability:** Each new service has a single, clear responsibility.
-   **Easier Testing:** The smaller, focused services will be easier to unit test in isolation.
</file_artifact>

<file path="src/Artifacts/T14. Template - GitHub Repository Setup Guide.md">
# Artifact T14: [Project Name] - GitHub Repository Setup Guide Template
# Date Created: C152
# Author: AI Model & Curator
# Updated on: C160 (Add Sample Development Workflow section)

- **Key/Value for A0:**
- **Description:** A generic template for a guide on setting up a new project with Git and GitHub, including a sample workflow.
- **Tags:** template, cycle 0, git, github, version control, workflow

## 1. Overview

This guide provides the necessary commands to turn your local project folder into a Git repository, link it to a new repository on GitHub, and outlines a sample workflow for using Git alongside the Data Curation Environment (DCE).

## 2. Prerequisites

*   You have `git` installed on your machine.
*   You have a GitHub account.

## 3. Step-by-Step Setup

### Step 1: Create a New Repository on GitHub

1.  Go to [github.com](https://github.com) and log in.
2.  In the top-right corner, click the `+` icon and select **"New repository"**.
3.  **Repository name:** Enter a name for your project (e.g., `my-new-project`).
4.  **Description:** (Optional) Provide a brief description of your project.
5.  Choose **"Private"** or **"Public"**.
6.  **IMPORTANT:** Do **not** initialize the repository with a `README`, `.gitignore`, or `license`. We will be pushing our existing files, and this will prevent conflicts.
7.  Click **"Create repository"**.

GitHub will now show you a page with command-line instructions. We will use the section titled **"...or push an existing repository from the command line"**.

### Step 2: Initialize Git in Your Local Project

Open a terminal and navigate to your project's root directory. Then, run the following commands one by one.

1.  **Initialize the repository:**
    ```bash
    git init
    ```

2.  **Add all existing files:**
    ```bash
    git add .
    ```

3.  **Create the first commit:**
    ```bash
    git commit -m "Initial commit"
    ```

4.  **Rename the default branch to `main`:**
    ```bash
    git branch -M main
    ```

### Step 3: Link and Push to GitHub

1.  **Add the remote repository:** Replace the placeholder URL with the one from your GitHub repository page.
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
    ```

2.  **Push your local `main` branch to GitHub:**
    ```bash
    git push -u origin main
    ```

After these commands complete, refresh your GitHub repository page. You should see all of your project files.

## 4. Sample Development Workflow with DCE and Git

Git is a powerful tool for managing the iterative changes produced by the DCE. It allows you to quickly test an AI's proposed solution and revert it cleanly if it doesn't work, without losing your place.

### Step 1: Start with a Clean State
Before starting a new cycle, ensure your working directory is clean. You can check this with `git status`. All your previous changes should be committed.

### Step 2: Generate a Prompt and Get Responses
Use the DCE to generate a `prompt.md` file. Use this prompt to get multiple responses (e.g., 4 to 8) from your preferred AI model.

### Step 3: Paste and Parse
Paste the responses into the Parallel Co-Pilot Panel and click "Parse All".

### Step 4: Accept and Test
1.  Review the responses and find one that looks promising.
2.  Select that response and use the **"Accept Selected Files"** button to write the AI's proposed changes to your workspace.
3.  Now, compile and test the application. Does it work? Does it have errors?

### Step 5: The "Restore" Loop
This is where Git becomes a powerful part of the workflow.

*   **If the changes are bad (e.g., introduce bugs, don't work as expected):**
    1.  Open the terminal in VS Code.
    2.  Run the command: `git restore .`
    3.  This command instantly discards all uncommitted changes in your workspace, reverting your files to the state of your last commit.
    4.  You are now back to a clean state and can go back to the Parallel Co-Pilot Panel, select a *different* AI response, and click "Accept Selected Files" again to test the next proposed solution.

*   **If the changes are good:**
    1.  Open the Source Control panel in VS Code.
    2.  Stage the changes (`git add .`).
    3.  Write a commit message (e.g., "Feat: Implement user login via AI suggestion C15").
    4.  Commit the changes.
    5.  You are now ready to start the next development cycle from a new, clean state.

This iterative loop of `accept -> test -> restore` allows you to rapidly audition multiple AI-generated solutions without fear of corrupting your codebase.
</file_artifact>

<file path="src/Artifacts/T15. Template - A-B-C Testing Strategy for UI Bugs.md">
# Artifact T15: Template - A-B-C Testing Strategy for UI Bugs
# Date Created: C154
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A generic template for a guide on using the A-B-C testing pattern to diagnose UI bugs.
- **Tags:** template, cycle 0, process, debugging, troubleshooting

## 1. Overview & Goal

When a user interface (UI) bug, particularly related to event handling (`onClick`, `onDrop`, etc.), proves resistant to conventional debugging, it often indicates a complex root cause. Continuously attempting small fixes on the main, complex component can be inefficient.

The goal of the **A-B-C Testing Strategy** is to break this cycle by creating a test harness with multiple, simplified, independent test components. Each test component attempts to solve the same basic problem using a slightly different technical approach, allowing for rapid diagnosis.

## 2. The Strategy

### 2.1. Core Principles
1.  **Preserve the Original:** Never remove existing functionality to build a test case. The original component should remain as the "control" in the experiment.
2.  **Isolate Variables:** Each test case should be as simple as possible, designed to test a single variable (e.g., raw event handling vs. local state updates).
3.  **Run in Parallel:** The original component and all test components should be accessible from the same UI (e.g., via tabs) for immediate comparison.

### 2.2. Steps
1.  **Identify the Core Problem:** Isolate the most fundamental action that is failing (e.g., "A click on a list item is not being registered").
2.  **Create Test Harness:** Refactor the main view to act as a "test harness" that can switch between the original component and several new test components.
3.  **Implement Isolated Test Components:** Create new, simple components for each test case.
    *   **Test A (Barebones):** The simplest possible implementation. Use raw HTML elements with inline event handlers that only log to the console.
    *   **Test B (Local State):** Introduce state management to test the component's ability to re-render on an event.
    *   **Test C (Prop-Driven):** Use a child component that calls a function passed down via props, testing the prop-drilling pattern.
4.  **Analyze Results:** Interact with each tab to see which implementation succeeds, thereby isolating the architectural pattern that is failing.

## 3. Cleanup Process

Once a working pattern is identified in a test component:
1.  **Codify Findings:** Document the successful pattern and the root cause of the failure.
2.  **Integrate Solution:** Refactor the original component to use the successful pattern.
3.  **Remove Test Artifacts:** Delete the test harness UI and the temporary test component files.
</file_artifact>

<file path="src/Artifacts/T16. Template - Developer Environment Setup Guide.md">
# Artifact T16: [Project Name] - Developer Environment Setup Guide Template
# Date Created: C158
# Author: AI Model & Curator
# Updated on: C160 (Add section for managing environment variables)

- **Key/Value for A0:**
- **Description:** A generic template for a guide on setting up a new project's development environment, including OS, tools, and installation steps.
- **Tags:** template, cycle 0, documentation, project setup, environment

## 1. Overview

This document provides a step-by-step guide for setting up the local development environment required to build and run **[Project Name]**. Following these instructions will ensure that all developers have a consistent and correct setup.

## 2. System Requirements

Before you begin, please ensure your system meets the following requirements. This information is critical for providing the correct commands and troubleshooting steps in subsequent development cycles.

-   **Operating System:** [e.g., Windows 11, macOS Sonoma, Ubuntu 22.04]
-   **Package Manager:** [e.g., npm, yarn, pnpm]
-   **Node.js Version:** [e.g., v20.11.0 or later]
-   **Code Editor:** Visual Studio Code (Recommended)

## 3. Required Tools & Software

Please install the following tools if you do not already have them:

1.  **Node.js:** [Provide a link to the official Node.js download page: https://nodejs.org/]
2.  **Git:** [Provide a link to the official Git download page: https://git-scm.com/downloads]
3.  **[Any other required tool, e.g., Docker, Python]:** [Link to installation guide]

## 4. Step-by-Step Setup Instructions

### Step 1: Clone the Repository

First, clone the project repository from GitHub to your local machine.

```bash
# Replace with your repository URL
git clone https://github.com/your-username/your-project.git
cd your-project
```

### Step 2: Install Project Dependencies

Next, install all the necessary project dependencies using your package manager.

```bash
# For npm
npm install

# For yarn
# yarn install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root of the project by copying the example file.

```bash
cp .env.example .env
```

Now, open the `.env` file and fill in the required environment variables:
-   `API_KEY`: [Description of what this key is for]
-   `DATABASE_URL`: [Description of the database connection string]

### Step 4: Run the Development Server

To start the local development server, run the following command. This will typically compile the code and watch for any changes you make.

```bash
# For npm
npm run dev

# For yarn
# yarn dev
```

### Step 5: Verify the Setup

Once the development server is running, you should be able to access the application at [e.g., `http://localhost:3000`]. [Describe what the developer should see to confirm that the setup was successful].

## 5. Managing Environment Variables and Secrets

To provide an AI assistant with the necessary context about which environment variables are available without exposing sensitive secrets, follow this best practice:

1.  **Create a `.env.local` file:** Make a copy of your `.env` file and name it `.env.local`.
2.  **Redact Secret Values:** In the `.env.local` file, replace all sensitive values (like API keys, passwords, or tokens) with the placeholder `[REDACTED]`.
3.  **Include in Context:** When curating your context for the AI, check the box for the `.env.local` file.
4.  **Exclude `.env`:** Ensure your `.gitignore` file includes `.env` to prevent your actual secrets from ever being committed to version control.

This allows the AI to see the names of all available constants (e.g., `OPENAI_API_KEY`) so it can write code that uses them correctly, but it never sees the actual secret values.
</file_artifact>

<file path="src/Artifacts/T17. Template - Universal Task Checklist.md">
# Artifact A[XX]: [Project Name] - Universal Task Checklist
# Date Created: C[XX]
# Author: AI Model & Curator
# Updated on: C10 (Add guidance for planning next cycle)

- **Key/Value for A0:**
- **Description:** A generic template for a universal task checklist, designed to organize work by file and complexity.
- **Tags:** template, process, checklist, task management, planning

## 1. Purpose

This artifact provides a structured, universal format for tracking development tasks, feedback, and bugs. Unlike cycle-specific trackers, this checklist organizes work by the group of files involved in a given task. It also introduces a simple complexity metric based on the total token count of the affected files and an estimation of whether the task will require more than one development cycle to complete.

This file-centric approach helps in planning and prioritizing work, especially in an AI-assisted development workflow where context size (token count) is a primary constraint.

## 2. How to Use

-   **Group by File Packages:** Create a new `##` section for each logical task or feature. List all the files that are expected to be modified for this task.
-   **Assign an ID:** Give each task package a unique, simple ID (e.g., `T-1`, `T-2`) for easy reference in feedback.
-   **Estimate Complexity:**
    -   Calculate the **Total Tokens** for all files in the package. This gives a quantitative measure of the context size.
    -   Estimate if the task is likely to take **More than one cycle?**. This is a qualitative judgment based on the complexity of the changes required.
-   **List Action Items:** Under each file package, create a checklist of specific actions, bugs to fix, or features to implement.
-   **Add Verification Steps:** After the action items, add a section describing how the curator should test the feature to confirm it is working as expected.
-   **Note on Output Length:** Remember that the maximum output length for a single response is approximately 65,000 tokens. Do not prematurely stop generating files; attempt to complete as many full files as possible within this limit.
-   **Plan for the Future:** Always conclude your task list with a final task to create the checklist for the next cycle (e.g., `T-X: Create A[XX+1] Universal Task Checklist for Cycle [Y+]`). This creates a continuous planning loop.
-   **Keep it Current:** At the beginning of each new cycle, review and update this checklist. Move completed tasks to a "Completed" section, add new tasks based on feedback, and re-prioritize as needed. This ensures the checklist remains a living, accurate reflection of the project's status.

---

## Example Task List

## T-1: [Feature Name or Bug Area]
- **Files Involved:**
    - `src/path/to/fileA.ts`
    - `src/path/to/fileB.tsx`
- **Total Tokens:** [e.g., ~5,500]
- **More than one cycle?** [e.g., No]

- [ ] **Task (T-ID: 1.1):** [Description of the first action item]
- [ ] **Bug Fix (T-ID: 1.2):** [Description of the bug to be fixed]

### Verification Steps
1.  [First verification step]
2.  **Expected:** [Expected outcome of the first step]
3.  [Second verification step]
4.  **Expected:** [Expected outcome of the second step]

## T-2: Plan for Next Cycle
- **Files Involved:**
    - `src/Artifacts/A[XX+1]-New-Checklist.md`
- **Total Tokens:** [e.g., ~500]
- **More than one cycle?** No

- [ ] **Task (T-ID: 2.1):** Create the Universal Task Checklist for the next cycle based on current progress and backlog.
</file_artifact>

<file path="src/Artifacts/A117. DCE - FAQ for aiascent.dev Knowledge Base.md">
# Artifact A117: DCE - FAQ for aiascent.dev Knowledge Base
# Date Created: C118
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A comprehensive, consolidated Frequently Asked Questions (FAQ) document to serve as the primary knowledge base for the `aiascent.dev` website's RAG chatbot, Ascentia.
- **Tags:** documentation, faq, knowledge base, rag, user guide

## 1. Purpose

This document provides a comprehensive list of frequently asked questions about the Data Curation Environment (DCE). It is intended to be the primary source of information for new and existing users, and will be used to create an embedding for the AI-powered chatbot on the `aiascent.dev` website.

---

## **I. General & Philosophy**

### **Q: What is the Data Curation Environment (DCE)?**

**A:** The Data Curation Environment (DCE) is a VS Code extension designed to streamline and enhance the workflow of AI-assisted development. It provides an integrated toolset for selecting, managing, and packaging the context (code files, documents, etc.) you provide to Large Language Models (LLMs), and for managing the multiple responses you get back. Its primary goal is to solve the "context problem" by automating the tedious and error-prone process of manually preparing prompts for an AI.

### **Q: What problem does DCE solve?**

**A:** DCE solves two main problems:
1.  **Context Management:** Manually copying and pasting files, tracking which files you've included, and managing the size of your prompt is cumbersome. DCE automates this with a user-friendly interface.
2.  **Single-Threaded Interaction:** Standard AI chats are linear. DCE's "Parallel Co-Pilot Panel" allows you to manage, compare, and test multiple, parallel AI responses to the same prompt, dramatically speeding up the iterative process of finding the best solution.

### **Q: Who is DCE for?**

**A:** DCE is for any developer, project manager, researcher, or "Citizen Architect" who uses LLMs as part of their workflow. It's particularly powerful for those working on complex, multi-file projects who want a more structured, efficient, and auditable process for collaborating with AI.

### **Q: Is DCE free? Do I need an API key?**

**A:** Yes, the DCE extension is free. The default "Manual Mode" does not require any API keys. It's a "bring your own AI" workflow where DCE helps you generate a `prompt.md` file, which you can then copy and paste into any AI service you prefer, including free services like Google's AI Studio. This allows you to leverage powerful models without incurring API costs.

### **Q: What is the "Process as Asset" philosophy?**

**A:** This is the core idea that the *process* of developing with AI—the curated context, the prompts, the multiple AI responses, and the developer's final choice—is itself a valuable, auditable, and reusable asset. DCE is built to capture this process in a structured way through its "Cycle" system, creating a persistent knowledge graph of your project's evolution.

### **Q: What is "Vibecoding"?**

**A:** "Vibecoding" is a term for the intuitive, conversational, and iterative process of collaborating with an AI to create something new. It starts with a high-level goal or "vibe" and progressively refines it into a functional product through a human-machine partnership. DCE is the professional toolset for serious vibecoding.

---

## **II. Installation & Setup**

### **Q: How do I install the DCE extension?**

**A:** The DCE is not currently available on the VS Code Marketplace. It is distributed as a `.vsix` file from the `aiascent.dev` website. To install it, follow these steps:
1.  Download the `.vsix` file.
2.  Open VS Code and go to the **Extensions** view in the Activity Bar (or press `Ctrl+Shift+X`).
3.  Click the **...** (More Actions) button at the top-right of the Extensions view.
4.  Select **"Install from VSIX..."** from the dropdown menu.
5.  In the file dialog that opens, navigate to and select the `.vsix` file you downloaded.
6.  VS Code will install the extension and prompt you to reload the window.

### **Q: What are the prerequisites?**

**A:** You need to have Visual Studio Code and `git` installed on your machine. The extension works best when your project is a Git repository, as this enables the powerful "Baseline" and "Restore" features for safe code testing.

### **Q: How do I start a new project with DCE?**

**A:** Simply open a new, empty folder in VS Code. The DCE panel will automatically open to an "Onboarding" view. Describe your project's goal in the "Project Scope" text area and click "Generate Initial Artifacts Prompt." This will create a `prompt.md` file and a starter set of planning documents (called "Artifacts") to bootstrap your project.

### **Q: Why does DCE create documentation first instead of code?**

**A:** This is part of the "Documentation First" philosophy. By establishing a clear plan, vision, and set of requirements in documentation artifacts, you provide a stable "source of truth" that guides all subsequent code generation. This leads to more coherent and aligned results from the AI and creates a valuable, auditable history of your project's design decisions.

---

## **III. The Core Workflow**

### **Q: What is the recommended "perfect loop" workflow?**

**A:** The ideal workflow is a guided, iterative process that DCE facilitates:
1.  **Curate & Prompt:** Use the Context Chooser to select files, write your instructions in the "Cycle Context," and generate a `prompt.md`.
2.  **Paste & Parse:** Get multiple AI responses and paste them into the Parallel Co-Pilot Panel (PCPP), then use "Parse All".
3.  **Select:** Review the parsed responses and click "Select This Response" on the best one.
4.  **Baseline:** Create a `git commit` restore point with the "Baseline" button.
5.  **Accept & Test:** In the "Associated Files" list, check the files you want to apply and click "Accept Selected". Then, test the changes in your application.
6.  **(If needed) Restore:** If the changes are bad, click "Restore Baseline" to revert everything instantly.
7.  **Finalize & Repeat:** Once you're happy, write your notes for the next task in the "Cycle Context" and "Cycle Title" fields, then start the next cycle.

### **Q: What is an "Artifact"?**

**A:** An "Artifact" is a formal, written document (like a project plan, this FAQ, or a requirements doc) that serves as a "source of truth" for your project. They are stored in the `src/Artifacts` directory and are the blueprints that guide development.

### **Q: What are "Cycles"?**

**A:** A "Cycle" represents one full loop of the development process. The DCE organizes your entire project history into these numbered cycles, allowing you to use the Cycle Navigator in the PCPP to move back and forth in time, reviewing the exact context and AI suggestions from any point in your project's history.

### **Q: What is the difference between "Cycle Context" and "Ephemeral Context"?**

**A:**
*   **Cycle Context:** This is for your main instructions and goals for the current cycle. This content is saved and becomes part of the permanent history of your project.
*   **Ephemeral Context:** This is for temporary information that is only relevant for the *current* prompt generation, such as error logs or a snippet of code you want the AI to analyze. This content is **not** saved in the cycle history to keep it clean.

---

## **IV. Features: Context Curation (File Tree View)**

### **Q: How do I select files to include in the context for the AI?**

**A:** You use the File Tree View (FTV), which is the panel with the spiral icon. It shows your entire workspace with checkboxes next to each file and folder. Simply check the items you want to include. The FTV also shows you token counts, file counts, and Git status for your project.

### **Q: What does "Flatten Context" do?**

**A:** "Flattening" is the process of taking all the files you've selected (checked) and concatenating their content into a single file, `flattened_repo.md`. This file, along with your cycle history and instructions, becomes part of the `prompt.md` that you send to the AI.

### **Q: Can DCE handle different file types like PDFs or Excel sheets?**

**A:** Yes. DCE has built-in extractors for various file types. When you check a `.pdf`, `.docx` (Word), or `.xlsx`/`.csv` (Excel) file, DCE automatically extracts the textual content and converts it into a readable format (like Markdown for tables) to be included in the flattened context.

### **Q: Why are some folders or files grayed out and un-selectable?**

**A:** The DCE automatically excludes common directories that shouldn't be included in an AI's context, such as `node_modules`, `.git`, `.vscode`, and build output folders like `dist`. This is to keep your context focused, reduce token count, and prevent errors.

---

## **V. Features: The Parallel Co-Pilot Panel (PCPP)**

### **Q: Why should I use multiple responses?**

**A:** LLMs are non-deterministic; asking the same question multiple times can yield vastly different solutions. The Parallel Co-Pilot Panel is designed to manage this. It allows you to generate and compare 4, 8, or more responses at once to find the most elegant, efficient, or creative solution.

### **Q: What does the "Parse All" button do?**

**A:** After you paste raw AI responses into the tabs, the "Parse All" button processes them. It automatically identifies the AI's summary, its plan, and any code blocks, transforming the raw text into a structured, easy-to-read view with syntax highlighting and file association.

### **Q: What are "Associated Files" and how does the diffing work?**

**A:** When a response is parsed, DCE lists all the files the AI intended to modify under "Associated Files." You can click the "Open Changes" icon next to any file to open VS Code's built-in, side-by-side diff viewer, showing a precise comparison between your current file and the version suggested by the AI.

### **Q: What do the "Baseline (Commit)" and "Restore Baseline" buttons do?**

**A:** These buttons integrate DCE with Git to provide a safe testing loop. "Baseline" creates a Git commit of your current work, creating a restore point. After you "Accept" an AI's changes, you can test them. If they're buggy, one click on "Restore Baseline" instantly discards all those changes and reverts your workspace, allowing you to test a different response without manual cleanup.

---

## **VI. Local LLM & Demo Mode**

### **Q: Can I use DCE with a local LLM?**

**A:** Yes. DCE supports connecting to any OpenAI-compatible API endpoint. You can run a model locally using a tool like vLLM, Ollama, or LM Studio, and then enter its URL (e.g., `http://localhost:8000/v1`) in the DCE settings panel to have the extension communicate directly with your local model.

### **Q: What is "Demo Mode"?**

**A:** "Demo Mode" is a pre-configured setting that connects the DCE extension to a specific, high-performance vLLM instance. When in this mode, the "Generate prompt.md" button is replaced with a "Generate responses" button, which fully automates the process of sending the prompt and streaming the responses back into the UI in real-time.

### **Q: What is the Response Progress UI?**

**A:** When using an automated connection mode like "Demo Mode," a special UI appears during generation. It shows real-time progress bars for each parallel response, token-per-second metrics, status indicators ("Thinking," "Generating," "Complete"), and timers. This gives you full visibility into the generation process.

---

## **VII. Troubleshooting**

### **Q: My file tree is flashing or constantly refreshing. How do I fix it?**

**A:** This is almost always caused by the DCE's auto-save feature writing to the `.vscode/dce_history.json` file, which then triggers the file watcher to refresh the tree. To fix this, you must add `.vscode/` to your project's `.gitignore` file.

### **Q: Parsing failed or looks incorrect. What can I do?**

**A:** Parsing failures can happen if the AI doesn't format its response correctly. You can click "Un-Parse All" to return to the raw text view. Often, you can fix the issue by manually adding a missing tag (like `<summary>...</summary>`) or correcting a malformed file tag (`<file path="...">...
</file_artifact>

