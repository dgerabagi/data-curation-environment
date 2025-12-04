/*
 * SCRIPT: rename-files.js
 * AUTHOR: AI Model & Curator
 * DATE: C80
 * PURPOSE: To recursively scan a directory and remove a specific suffix from filenames.
 *
 * USAGE:
 * 1. COPY this script to the root of the directory you want to clean up (e.g., your main downloads folder).
 * 2. Open a terminal/command prompt in that directory.
 * 3. Run the script with the command: `node rename-files.js`
 *
 * NOTE: This script performs file operations directly. It's always a good idea to have a backup.
 */

const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
const directoryToScan = process.cwd(); // This makes the script run in the directory it's placed in.
const suffixToRemove = '-Photoroom';
// -------------------

/**
 * Recursively walks a directory, renaming files that match the criteria.
 * @param {string} dir - The directory path to scan.
 */
function walkAndRename(dir) {
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      try {
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          walkAndRename(filePath); // Recurse into subdirectory
        } else if (file.includes(suffixToRemove)) {
          const newFileName = file.replace(suffixToRemove, '');
          const newFilePath = path.join(dir, newFileName);
          
          fs.renameSync(filePath, newFilePath);
          console.log(`Renamed: ${filePath} -> ${newFilePath}`);
        }
      } catch (statError) {
        console.error(`Could not stat file ${filePath}:`, statError);
      }
    });
  } catch (readError) {
    console.error(`Could not read directory ${dir}:`, readError);
  }
}

console.log(`Starting file rename process...`);
console.log(`Target directory: ${directoryToScan}`);
console.log(`Suffix to remove: "${suffixToRemove}"`);
console.log('---');

walkAndRename(directoryToScan);

console.log('---');
console.log('Finished renaming files.');