# DCE Changelog

All notable changes to the "Data Curation Environment" extension will be documented in this file.

## [0.1.9] - Q3 2025

### Added
- **Native Diff Viewer:** Replaced the custom, in-panel diff viewer with an integration of VS Code's native diffing functionality (`vscode.diff`). This provides a much richer, more stable, and familiar user experience for comparing AI-generated code with workspace files.

### Fixed
- **File Duplication:** Resolved several bugs that could cause duplicate files to appear in the flattened context, particularly during the onboarding workflow and when using the "auto-add new files" feature.
- **Data Loss Prevention:** Implemented a more robust, UI-driven autosave status indicator with navigation locking. This prevents race conditions when switching between cycles, significantly reducing the chance of data loss.
- **Auto-Add Logic:** Fixed a race condition in the "auto-add new files" feature that caused newly created files to be "stuck" in the selection state and unable to be removed.

## [0.1.2] - Q3 2025

### Added
- **Similarity Score:** The PCPP now displays a similarity score for associated files and uses a color gradient to indicate the degree of change.
- **Robust Autosave:** Implemented a more robust autosave with navigation locking to prevent data loss when switching cycles.
- **Settings Panel:** Created a new settings panel to display the README and Changelog.
- **Auto-Tab on Paste:** The PCPP now automatically advances to the next empty response tab after pasting in a large response.
- **Smarter Restore:** The "Restore Baseline" button now correctly deletes newly created files that were part of the accepted response.

## [0.1.1] - Q3 2025

### Added
- **Git-Integrated Testing:** Added "Baseline (Commit)" and "Restore Baseline" buttons to the PCPP for a rapid test-and-revert workflow.
- **Undo/Redo for File Operations:** Implemented `Ctrl+Z` and `Ctrl+Y` in the File Tree View to undo/redo file moves.
- **Tab Persistence:** The active response tab in the PCPP is now saved and restored across sessions.

### Fixed
- **Command Registration:** Fixed a critical activation error caused by a command being registered twice.
- **Exclusion List:** `tsconfig.tsbuildinfo` and `dist` directories are now correctly excluded from selection and the flattened context.