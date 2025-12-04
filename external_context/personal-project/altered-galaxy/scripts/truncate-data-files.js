/*
 * SCRIPT: truncate-data-files.js
 * AUTHOR: AI Model & Curator
 * DATE: C100
 * UPDATED: C102 (Enhanced to handle object-based data files like chassisSpecData)
 * PURPOSE: To recursively scan a directory and create truncated `.local.ts` versions
 *          of large data files. The local version contains only the first
 *          and last entries of a data array/object to reduce token count for AI context
 *          while preserving the file's structure.
 *
 * USAGE:
 * 1. Run the script from the project root directory.
 * 2. Pass the target directory as an argument.
 * 3. Example: `npm run script:truncate-data -- packages\ag-shared\src\data\items`
 */

const fs = require('fs');
const path = require('path');

const targetDirArg = process.argv[2];

if (!targetDirArg) {
  console.error('Error: Please provide a target directory path as an argument.');
  console.error('Example: npm run script:truncate-data -- packages/ag-server/src/data');
  process.exit(1);
}

const absoluteTargetDir = path.resolve(process.cwd(), targetDirArg);

function processDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    return;
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if ((entry.name.endsWith('Data.ts') || entry.name.endsWith('Weapons.ts')) && !entry.name.endsWith('.local.ts')) {
      createLocalVersion(fullPath);
    }
  }
}

function createLocalVersion(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Try matching array structure first
    let match = content.match(/(const\s+\w+\s*:\s*[^=\[]+\[\]\s*=\s*)\[([\s\S]*)\];/);
    if (match && match[2]) {
      const arrayContent = match[2].trim();
      if (arrayContent === '') {
        console.log(`Skipping ${filePath}: Array is empty.`);
        return;
      }
      const objects = arrayContent.match(/\{[\s\S]*?\}(?=\s*,|\s*$)/g);
      if (!objects || objects.length < 2) {
        console.log(`Skipping ${filePath}: Contains fewer than 2 array objects.`);
        return;
      }

      const header = match[1];
      const newContent = `${header}[\n  ${objects[0]},\n  // [...]\n  ${objects[objects.length - 1]}\n];`;
      const finalContent = content.replace(match[0], newContent);
      const newFilePath = filePath.replace('.ts', '.local.ts');
      fs.writeFileSync(newFilePath, finalContent);
      console.log(`Generated: ${newFilePath}`);
      return;
    }

    // Fallback to matching object structure (for chassisSpecData, etc.)
    match = content.match(/(export const \w+\s*:\s*Record<string, \w+>\s*=\s*)\{([\s\S]*)\};/);
    if (match && match[2]) {
      const objectContent = match[2].trim();
      if (objectContent === '') {
        console.log(`Skipping ${filePath}: Object is empty.`);
        return;
      }
      
      // This regex is designed to capture top-level properties like "Key": { ... }
      const properties = objectContent.match(/"[^"]+"\s*:\s*\{[\s\S]*?\}(?=,?\s*\n)/g);

      if (!properties || properties.length < 2) {
        console.log(`Skipping ${filePath}: Contains fewer than 2 object properties.`);
        return;
      }

      const header = match[1];
      const newContent = `${header}{\n  ${properties[0]},\n  // [...]\n  ${properties[properties.length - 1]}\n};`;
      const finalContent = content.replace(match[0], newContent);
      const newFilePath = filePath.replace('.ts', '.local.ts');
      fs.writeFileSync(newFilePath, finalContent);
      console.log(`Generated: ${newFilePath}`);
      return;
    }

    console.log(`Skipping ${filePath}: No recognized data array or object found.`);

  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
}

console.log(`Starting data file truncation process in: ${absoluteTargetDir}`);
console.log('---');
processDirectory(absoluteTargetDir);
console.log('---');
console.log('Finished truncation process.');