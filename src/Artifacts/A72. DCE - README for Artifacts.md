# Artifact A72: DCE - README for Artifacts
# Date Created: C158
# Author: AI Model & Curator
# Updated on: C129 (Move Git Init to Step 3 and automate .gitignore)

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

1.  **Generate Responses:** The `prompt.md` file has been automatically opened for you. This file contains your project plan and instructions for the AI. Copy its entire contents and paste it into your preferred AI chat interface (like Google's AI Studio, ChatGPT, etc.).

2.  **Review and Accept:** Paste the AI's responses back into the "Resp 1", "Resp 2", etc. tabs in the Parallel Co-Pilot panel. The UI will guide you through parsing the responses, selecting the best one, and accepting its changes into your workspace.

3.  **Baseline & Secure (Git Initialization):**
    Once you have accepted your first set of files (Cycle 1), you should initialize your Git repository to enable the DCE's powerful testing features ("Baseline" and "Restore").
    
    *   In the DCE panel, click the **"Baseline (Commit)"** button.
    *   If your repository is not yet initialized, the DCE will prompt you to initialize it.
    *   Click **"Initialize Repository"**. This will automatically run `git init` and create a `.gitignore` file that correctly excludes DCE system files (`.vscode/`), preventing UI issues.
    
    This creates a safe "restore point" for your project.

4.  **Repeat:** This completes a cycle. You then start the next cycle, building upon the newly accepted code and documentation.

This structured, iterative process helps maintain project quality and ensures that both human and AI developers are always aligned with the project's goals.