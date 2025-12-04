# Scripts Directory

This directory contains utility scripts for project maintenance and workflow optimization.

## `rename-files.js`

**Purpose:** To recursively find files in a directory and remove a specific suffix from their names. This is useful for batch-cleaning files downloaded from services that add their own branding to filenames.

**Usage:**
1.  **COPY** this script to the root of the directory you want to clean up (e.g., `C:\Users\YourUser\Downloads\my-images`).
2.  Open a terminal or command prompt in that same directory.
3.  Run the script with the command: `node rename-files.js`

The script is pre-configured to remove `-Photoroom` from filenames. You can change the `suffixToRemove` variable inside the script if needed.

## `generate-d-info.js` (Updated C100)

**Purpose:** To recursively scan a specified directory and generate a `d-info.md` summary file in each subdirectory that contains assets.

**Usage:**
1.  Run this script from the **project root directory**.
2.  Use the configured npm script and pass the target directory as an argument.
    ```bash
    # Note the '--' is important for passing arguments to the script via npm
    npm run script:generate-d-info -- packages/ag-client/public/assets/icons/items
    ```
3.  This script is a key part of our token management strategy. It consolidates thousands of small `.png.txt` files into a few summary files, which dramatically reduces the token count required for providing context to the AI.

## `truncate-data-files.js` (New C100)

**Purpose:** To recursively scan a directory and create truncated `.local.ts` versions of large `*Data.ts` files. The `.local` version contains only the first and last entries of a data array, preserving the file's structure while reducing token count for AI context.

**Usage:**
1.  Run this script from the **project root directory**.
2.  Use the configured npm script and pass the target directory as an argument.
    ```bash
    npm run script:truncate-data -- packages/ag-server/src/data