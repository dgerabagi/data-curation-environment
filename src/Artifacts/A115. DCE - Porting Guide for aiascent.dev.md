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