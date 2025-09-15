# DCE Changelog

All notable changes to the "Data Curation Environment" extension will be documented in this file.

## [0.1.1] - Q3 2025

### Added
- **Git-Integrated Testing:** Added "Baseline (Commit)" and "Restore Baseline" buttons to the PCPP for a rapid test-and-revert workflow.
- **Undo/Redo for File Operations:** Implemented `Ctrl+Z` and `Ctrl+Y` in the File Tree View to undo/redo file moves.
- **Settings & Help Panel:** Added a `?` icon to the PCPP that opens this panel, containing the changelog and README.
- **Tab Persistence:** The active response tab in the PCPP is now saved and restored across sessions.

### Fixed
- **Command Registration:** Fixed a critical activation error caused by a command being registered twice.
- **Exclusion List:** `tsconfig.tsbuildinfo` and `dist` directories are now correctly excluded from selection and the flattened context.