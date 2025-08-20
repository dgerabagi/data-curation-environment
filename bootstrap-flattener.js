#!/usr/bin/env node
/**
 * bootstrap-flattener.js
 *
 * This script recursively finds all files in a given directory, ignoring specified
 * patterns, and concatenates them into a single output file with a metadata header.
 *
 * Updated on: Cycle 2
 * - Added comprehensive metadata header including:
 *   - Total file, line, character, and token counts.
 *   - Top 10 files by token count.
 *   - A full list of all processed files with their stats.
 * - Added a configurable `DEFAULT_IGNORE` set to exclude common unnecessary files
 *   and directories (e.g., node_modules, .git, package-lock.json).
 * - Logic inspired by `flattenv2.js` to provide more useful output.
 */

const fs = require('fs').promises;
const path = require('path');

const OUTPUT_FILENAME = 'flattened_repo.md';

// --- Configuration ---
// Files and directories to ignore. Uses simple string matching.
const DEFAULT_IGNORE = new Set([
  'node_modules',
  '.git',
  '.vscode',
  'dist',
  'out',
  'package-lock.json',
  '.DS_Store',
  '.npm',
  '.yarn',
  'data-curation-environment-0.0.1.vsix',
  'data-curation-environment-0.0.2.vsix',
  'data-curation-environment-0.0.3.vsix',
  'data-curation-environment-0.0.4.vsix',
  'data-curation-environment-0.0.5.vsix',
  'data-curation-environment-0.0.6.vsix',
  'data-curation-environment-0.0.7.vsix',
  'data-curation-environment-0.0.8.vsix',
  'data-curation-environment-0.0.9.vsix',
  'flattened_repo.md',
  'prompt.md'
]);


/**
 * Recursively gets all file paths in a directory, respecting the ignore list.
 * @param {string} dirPath The directory to start from.
 * @param {Set<string>} ignoreSet The set of directory/file names to ignore.
 * @returns {Promise<string[]>} A promise that resolves to an array of file paths.
 */
async function getFilePaths(dirPath, ignoreSet) {
  let filePaths = [];
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (ignoreSet.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      filePaths = filePaths.concat(await getFilePaths(fullPath, ignoreSet));
    } else {
      filePaths.push(fullPath);
    }
  }
  return filePaths;
}

/**
 * Gets stats and content for a single file.
 * @param {string} filePath The path to the file.
 * @returns {Promise<object>} An object with file stats and content.
 */
async function getFileStatsAndContent(filePath) {
    try {
        const content = await fs.readFile(filePath, 'utf-8');
        const lines = content.split('\n').length;
        const characters = content.length;
        const tokens = Math.ceil(characters / 4); // Simple approximation
        return { filePath, lines, characters, tokens, content, error: null };
    } catch (error) {
        console.warn(`Warning: Could not read file ${filePath}. Error: ${error.message}`);
        return { filePath, lines: 0, characters: 0, tokens: 0, content: `Error reading file: ${error.message}`, error: error.message };
    }
}


/**
 * The main function to execute the script.
 */
async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error('Usage: node bootstrap-flattener.js <directory_path>');
    process.exit(1);
  }

  const rootDir = path.resolve(args[0]);
  const outputFilePath = path.join(process.cwd(), OUTPUT_FILENAME);

  try {
    await fs.access(rootDir);
  } catch (error) {
    console.error(`Error: Directory not found at ${rootDir}`);
    process.exit(1);
  }

  console.log(`Starting to flatten repository at: ${rootDir}`);
  console.log(`Ignoring: ${[...DEFAULT_IGNORE].join(', ')}`);

  const filePaths = await getFilePaths(rootDir, DEFAULT_IGNORE);
  console.log(`Found ${filePaths.length} files to process...`);

  const results = await Promise.all(filePaths.map(getFileStatsAndContent));

  let totalLines = 0;
  let totalCharacters = 0;
  let totalTokens = 0;
  let errorCount = 0;

  for (const res of results) {
      if (!res.error) {
          totalLines += res.lines;
          totalCharacters += res.characters;
          totalTokens += res.tokens;
      } else {
          errorCount++;
      }
  }

  // --- Build Metadata Header ---
  let output = `<!--\n`;
  output += `  File: ${OUTPUT_FILENAME}\n`;
  output += `  Source Directory: ${rootDir}\n`;
  output += `  Date Generated: ${new Date().toISOString()}\n`;
  output += `  ---\n`;
  output += `  Total Files: ${results.length}\n`;
  if (errorCount > 0) {
      output += `  Files with Errors: ${errorCount}\n`;
  }
  output += `  Total Lines: ${totalLines}\n`;
  output += `  Total Characters: ${totalCharacters}\n`;
  output += `  Approx. Tokens: ${totalTokens}\n`;
  output += `-->\n\n`;

  // --- Top 10 Files by Tokens ---
  const top10 = results
    .filter(r => !r.error)
    .sort((a, b) => b.tokens - a.tokens)
    .slice(0, 10);

  output += `<!-- Top 10 Files by Token Count -->\n`;
  top10.forEach((r, i) => {
     output += `${i + 1}. ${path.relative(rootDir, r.filePath)} (${r.tokens} tokens)\n`;
  });
  output += `\n`;

  // --- Full File List ---
  output += `<!-- Full File List -->\n`;
  results.forEach((r, i) => {
    const relativePath = path.relative(rootDir, r.filePath);
    if (r.error) {
        output += `${i + 1}. ${relativePath} - ERROR: ${r.error}\n`;
    } else {
        output += `${i + 1}. ${relativePath} - Lines: ${r.lines} - Chars: ${r.characters} - Tokens: ${r.tokens}\n`;
    }
  });
  output += `\n`;


  // --- File Contents ---
  for (const { filePath, content } of results) {
    const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/');
    output += `<file path="${relativePath}">\n`;
    output += content;
    if (!content.endsWith('\n')) {
      output += '\n';
    }
    output += `</file>\n\n`;
  }

  await fs.writeFile(outputFilePath, output);
  console.log(`✅ Success! Flattened repository saved to: ${outputFilePath}`);
}

main().catch(err => {
  console.error('An unexpected error occurred:', err);
  process.exit(1);
});