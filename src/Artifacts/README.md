# Artifact A72: DCE - README for Artifacts
# Date Created: C158
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** The content for the `README.md` file that is automatically created in a new project's `src/Artifacts` directory, explaining the purpose of the extension and the artifact-driven workflow.
- **Tags:** documentation, onboarding, readme, source of truth

## 1. Welcome to the Data Curation Environment (DCE)

This directory (`src/Artifacts/`) is the heart of your project's planning and documentation. It's managed by the **Data Curation Environment (DCE)**, a VS Code extension designed to streamline AI-assisted development.

This `README.md` file was automatically generated to provide context for you (the developer) and for the AI assistants you will be working with.

## 2. What is an "Artifact"?

In the context of this workflow, an **Artifact** is a formal, written document that serves as a "source of truth" for a specific part of your project. Think of these files as the official blueprints, plans, and records.

The core principle of the DCE workflow is **"Documentation First."** Before writing code, you and your AI partner should first create or update an artifact that describes the plan.

-   **Why?** This ensures clarity, reduces misunderstandings, and creates a persistent record of design decisions. It's much easier to iterate on a plan in plain English than it is to refactor code.

## 3. The Iterative Cycle Workflow

Development in the DCE is organized into **Cycles**. You are currently in the early stages of your project.

1.  **Curate Context:** Using the "Data Curation" panel in the VS Code Activity Bar, you select (by checking the boxes) which artifacts and code files are relevant for your current task.
2.  **Generate a Prompt:** Using the "Parallel Co-Pilot" panel, you will write instructions for your AI assistant for the current cycle. The panel will help you generate a `prompt.md` file that includes your instructions, the project's history, and the content of the files you curated.
3.  **Get AI Responses:** You use this `prompt.md` with your preferred AI model (e.g., Gemini, Claude) to get one or more proposed solutions.
4.  **Review and Accept:** You paste the AI's responses back into the Parallel Co-Pilot panel. The panel allows you to compare the responses, see the proposed changes (diffs), and accept the best solution into your workspace with a single click.
5.  **Repeat:** This completes a cycle. You then start the next cycle, building upon the newly accepted code and documentation.

This structured, iterative process helps maintain project quality and ensures that both human and AI developers are always aligned with the project's goals.