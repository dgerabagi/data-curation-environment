# Data Curation Environment (DCE)

The Data Curation Environment (DCE) is a VS Code extension designed to streamline the workflow of interacting with large language models (LLMs) for software development and other complex tasks. It provides an integrated toolset for selecting, packaging, and managing the context (code files, documents, etc.) required for effective AI-assisted development.

## Core Features

### Phase 1: The Context Chooser
- **File Tree with Checkboxes:** An intuitive UI to select files and folders for your AI context directly within a custom VS Code panel.
- **Context Flattening:** A one-click button to "flatten" all selected files into a single, portable `flattened_repo.md` file, ready to be used in a prompt.
- **Advanced File Handling:** On-demand text extraction for complex file types like PDF, Word, and Excel, converting them to Markdown and including them in the context without creating temporary files in your workspace.
- **Feature Parity:** Aims to replicate the core usability features of the native VS Code Explorer, including file operations (rename, delete, copy/paste), keyboard navigation, and drag-and-drop.

### Phase 2: The Parallel Co-Pilot Panel
- **Multi-Response Management:** A dedicated panel with a multi-tabbed interface to manage, compare, and test multiple AI-generated responses to a single prompt.
- **Integrated Diffing:** A built-in diff viewer to compare an AI's suggested changes against your current workspace files.
- **Cycle Navigator:** A persistent, navigable history of your development cycles. Each cycle stores the context, prompt, and all AI responses, creating a "knowledge graph" of your project's evolution.
- **Git-Integrated Testing:** "Baseline" and "Restore" buttons that leverage Git to allow for rapid, safe testing of AI-generated code.

### Phase 3: Advanced AI & Local LLM Integration
- **Direct API Calls:** Future support for making API calls directly to various LLM providers from within the extension.
- **Local LLM Support:** The ability to configure an endpoint for a locally hosted LLM, enabling fully offline and private AI-assisted development.

## Development

To run the extension locally for development:
1.  Run `npm install` to install dependencies.
2.  Run `npm run watch` to start the Webpack compiler in watch mode.
3.  Press `F5` in VS Code to launch the **Extension Development Host**, a new VS Code window with the DCE extension installed and running.