/*
 * SCRIPT: generate-d-info.js
 * AUTHOR: AI Model & Curator
 * DATE: C80
 * UPDATED: C101 (Fixed command-line argument parsing)
 * PURPOSE: To recursively scan a directory and generate `d-info.md` summary files.
 *          This is used to consolidate thousands of small `.png.txt` files into a few
 *          summary files to reduce the token count for AI context.
 *
 * USAGE: 
 * 1. Run the script from the project root directory.
 * 2. Pass the target directory as an argument.
 * 3. Example: `npm run script:generate-d-info -- packages/ag-client/public/assets/icons/items`
 *          `npm run script:generate-d-info -- packages/ag-server/maps`
 *          `npm run script:generate-d-info -- C:\Projects\altered-galaxy\packages\ag-client\public\assets\audio\sfx\weapons
 *          `npm run script:generate-d-info -- packages\ag-client\public\assets\audio\sfx\weapons`
 *          `npm run script:generate-d-info -- packages\ag-client\public\assets\sprites\units\npc\xylos\boss\effects`
 */

const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
const rootDirectoryArg = process.argv[2];
const outputFileName = 'd-info.md';
// -------------------

if (!rootDirectoryArg) {
    console.error('Error: Please provide a target directory path as an argument.');
    console.error('Example: npm run script:generate-d-info -- path/to/your/assets');
    process.exit(1);
}

const rootDirectory = path.resolve(process.cwd(), rootDirectoryArg);


/**
 * Recursively processes a directory to generate d-info.md files.
 * @param {string} dir - The directory path to process.
 */
function processDirectory(dir) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = [];
    const subdirectories = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        subdirectories.push(entry.name);
      } else {
        // Exclude the output file itself and any other unwanted files from the list
        if (entry.name !== outputFileName && !entry.name.startsWith('.')) {
          files.push(entry.name);
        }
      }
    }

    // Only create a d-info.md file if there are other files present
    if (files.length > 0) {
      const relativeDir = path.relative(path.join(rootDirectory, '..', '..'), dir); // Make path more readable
      
      let content = `<d-info.md (directory info)>\n`;
      content += `File Count: ${files.length}\n`;
      content += `Directory Located at: ${relativeDir.replace(/\\/g, '/')}/\n`;
      content += `Files:\n`;
      
      files.sort().forEach((file, index) => {
        content += `${index + 1}. ${file}\n`;
      });
      content += `</d-info.md (directory info)>`;

      const outputPath = path.join(dir, outputFileName);
      fs.writeFileSync(outputPath, content);
      console.log(`Generated: ${outputPath}`);
    }

    // Recurse into subdirectories
    for (const subdir of subdirectories) {
      processDirectory(path.join(dir, subdir));
    }
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error);
  }
}

console.log(`Starting directory info generation in: ${rootDirectory}`);
console.log('---');

if (fs.existsSync(rootDirectory)) {
  processDirectory(rootDirectory);
} else {
  console.error(`Error: Root directory not found at ${rootDirectory}`);
}

console.log('---');
console.log('Finished generating directory info files.');