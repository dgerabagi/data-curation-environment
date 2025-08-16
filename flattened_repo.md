<!--
  File: flattened_repo.md
  Source Directory: C:\Projects\DCE
  Date Generated: 2025-08-16T01:42:48.634Z
  ---
  Total Files: 146
  Total Lines: 11605
  Total Characters: 422880
  Approx. Tokens: 105777
-->

<!-- Top 10 Files by Token Count -->
1. src\Artifacts\A6. DCE - Initial Scaffolding Deployment Script.md (10923 tokens)
2. deploy_scaffold.js (10600 tokens)
3. The-Creator-AI-main\src\common\constants\agents.constants.ts (9159 tokens)
4. The-Creator-AI-main\src\backend\services\code.service.ts (2618 tokens)
5. The-Creator-AI-main\src\backend\services\fs.service.ts (2495 tokens)
6. The-Creator-AI-main\src\client\views\change-plan.view\on-mesage.ts (2424 tokens)
7. The-Creator-AI-main\src\backend\services\llm.service.ts (2156 tokens)
8. The-Creator-AI-main\tailwind.config.js (1704 tokens)
9. The-Creator-AI-main\src\client\modules\plan.module\formatted-plan-preview.tsx (1620 tokens)
10. The-Creator-AI-main\src\client\modules\plan.module\plan-input-box.tsx (1603 tokens)

<!-- Full File List -->
1. .gitignore - Lines: 8 - Chars: 90 - Tokens: 23
2. .vscodeignore - Lines: 7 - Chars: 76 - Tokens: 19
3. bootstrap-flattener.js - Lines: 185 - Chars: 5834 - Tokens: 1459
4. deploy_scaffold.js - Lines: 1259 - Chars: 42400 - Tokens: 10600
5. package.json - Lines: 72 - Chars: 2165 - Tokens: 542
6. public\spiral.svg - Lines: 8 - Chars: 459 - Tokens: 115
7. src\Artifacts\A0. DCE Master Artifact List.md - Lines: 70 - Chars: 4332 - Tokens: 1083
8. src\Artifacts\A1. DCE - Project Vision and Goals.md - Lines: 38 - Chars: 3311 - Tokens: 828
9. src\Artifacts\A10. DCE - Metadata and Statistics Display.md - Lines: 47 - Chars: 5207 - Tokens: 1302
10. src\Artifacts\A11. DCE - Regression Case Studies.md - Lines: 48 - Chars: 3410 - Tokens: 853
11. src\Artifacts\A189. Number Formatting Reference Guide.md - Lines: 118 - Chars: 4938 - Tokens: 1235
12. src\Artifacts\A2. DCE - Phase 1 - Context Chooser - Requirements & Design.md - Lines: 31 - Chars: 4278 - Tokens: 1070
13. src\Artifacts\A3. DCE - Technical Scaffolding Plan.md - Lines: 55 - Chars: 3684 - Tokens: 921
14. src\Artifacts\A4. DCE - Analysis of The-Creator-AI Repo.md - Lines: 56 - Chars: 5722 - Tokens: 1431
15. src\Artifacts\A5. DCE - Target File Structure.md - Lines: 67 - Chars: 1977 - Tokens: 495
16. src\Artifacts\A6. DCE - Initial Scaffolding Deployment Script.md - Lines: 1282 - Chars: 43689 - Tokens: 10923
17. src\Artifacts\A7. DCE - Development and Testing Guide.md - Lines: 47 - Chars: 3075 - Tokens: 769
18. src\Artifacts\A8. DCE - Phase 1 - Selection Sets Feature Plan.md - Lines: 74 - Chars: 5773 - Tokens: 1444
19. src\Artifacts\A9. DCE - GitHub Repository Setup Guide.md - Lines: 71 - Chars: 3094 - Tokens: 774
20. src\backend\commands\commands.ts - Lines: 62 - Chars: 2633 - Tokens: 659
21. src\backend\commands\register-commands.ts - Lines: 9 - Chars: 331 - Tokens: 83
22. src\backend\services\flattener.service.ts - Lines: 156 - Chars: 5889 - Tokens: 1473
23. src\backend\services\fs.service.ts - Lines: 147 - Chars: 5802 - Tokens: 1451
24. src\backend\services\selection.service.ts - Lines: 39 - Chars: 1300 - Tokens: 325
25. src\backend\services\services.ts - Lines: 17 - Chars: 552 - Tokens: 138
26. src\client\components\Checkbox.tsx - Lines: 25 - Chars: 814 - Tokens: 204
27. src\client\components\file-tree\FileTree.tsx - Lines: 131 - Chars: 4481 - Tokens: 1121
28. src\client\components\file-tree\FileTree.utils.ts - Lines: 88 - Chars: 3350 - Tokens: 838
29. src\client\components\tree-view\TreeView.tsx - Lines: 74 - Chars: 2822 - Tokens: 706
30. src\client\components\tree-view\TreeView.utils.ts - Lines: 13 - Chars: 333 - Tokens: 84
31. src\client\views\context-chooser.view\index.ts - Lines: 7 - Chars: 184 - Tokens: 46
32. src\client\views\context-chooser.view\on-message.ts - Lines: 43 - Chars: 1840 - Tokens: 460
33. src\client\views\context-chooser.view\view.scss - Lines: 162 - Chars: 3417 - Tokens: 855
34. src\client\views\context-chooser.view\view.tsx - Lines: 115 - Chars: 4434 - Tokens: 1109
35. src\client\views\index.ts - Lines: 34 - Chars: 1604 - Tokens: 401
36. src\common\ipc\channels.enum.ts - Lines: 19 - Chars: 770 - Tokens: 193
37. src\common\ipc\channels.type.ts - Lines: 19 - Chars: 1074 - Tokens: 269
38. src\common\ipc\client-ipc.ts - Lines: 38 - Chars: 1385 - Tokens: 347
39. src\common\ipc\get-vscode-api.ts - Lines: 12 - Chars: 239 - Tokens: 60
40. src\common\ipc\server-ipc.ts - Lines: 42 - Chars: 1562 - Tokens: 391
41. src\common\types\file-node.ts - Lines: 9 - Chars: 276 - Tokens: 69
42. src\common\types\vscode-webview.d.ts - Lines: 9 - Chars: 282 - Tokens: 71
43. src\common\utils\formatting.ts - Lines: 81 - Chars: 2716 - Tokens: 679
44. src\common\utils\view-html.ts - Lines: 26 - Chars: 971 - Tokens: 243
45. src\common\view-types.ts - Lines: 8 - Chars: 246 - Tokens: 62
46. src\extension.ts - Lines: 24 - Chars: 730 - Tokens: 183
47. The-Creator-AI-main\.eslintrc.json - Lines: 30 - Chars: 662 - Tokens: 166
48. The-Creator-AI-main\.gitignore - Lines: 8 - Chars: 75 - Tokens: 19
49. The-Creator-AI-main\.vscode-test.mjs - Lines: 6 - Chars: 117 - Tokens: 30
50. The-Creator-AI-main\.vscodeignore - Lines: 15 - Chars: 192 - Tokens: 48
51. The-Creator-AI-main\CHANGELOG.md - Lines: 9 - Chars: 241 - Tokens: 61
52. The-Creator-AI-main\LICENSE - Lines: 22 - Chars: 1069 - Tokens: 268
53. The-Creator-AI-main\Notes.md - Lines: 2 - Chars: 67 - Tokens: 17
54. The-Creator-AI-main\package.json - Lines: 181 - Chars: 5082 - Tokens: 1271
55. The-Creator-AI-main\postcss.config.js - Lines: 7 - Chars: 82 - Tokens: 21
56. The-Creator-AI-main\public\main.css - Lines: 40 - Chars: 559 - Tokens: 140
57. The-Creator-AI-main\public\reset.css - Lines: 30 - Chars: 233 - Tokens: 59
58. The-Creator-AI-main\public\spiral.svg - Lines: 17 - Chars: 579 - Tokens: 145
59. The-Creator-AI-main\public\vscode.css - Lines: 91 - Chars: 1977 - Tokens: 495
60. The-Creator-AI-main\README.md - Lines: 44 - Chars: 1614 - Tokens: 404
61. The-Creator-AI-main\src\backend\commands\commands.ts - Lines: 138 - Chars: 4691 - Tokens: 1173
62. The-Creator-AI-main\src\backend\commands\register-commands.ts - Lines: 11 - Chars: 382 - Tokens: 96
63. The-Creator-AI-main\src\backend\repositories\chat.respository.ts - Lines: 142 - Chars: 3906 - Tokens: 977
64. The-Creator-AI-main\src\backend\repositories\persistent-store.repository.ts - Lines: 28 - Chars: 897 - Tokens: 225
65. The-Creator-AI-main\src\backend\repositories\settings.repository.ts - Lines: 62 - Chars: 1694 - Tokens: 424
66. The-Creator-AI-main\src\backend\services\code.service.ts - Lines: 344 - Chars: 10472 - Tokens: 2618
67. The-Creator-AI-main\src\backend\services\fs.service.ts - Lines: 323 - Chars: 9979 - Tokens: 2495
68. The-Creator-AI-main\src\backend\services\git.service.ts - Lines: 41 - Chars: 1411 - Tokens: 353
69. The-Creator-AI-main\src\backend\services\llm.service.ts - Lines: 264 - Chars: 8622 - Tokens: 2156
70. The-Creator-AI-main\src\backend\services\logger.service.ts - Lines: 55 - Chars: 1371 - Tokens: 343
71. The-Creator-AI-main\src\backend\services\message.service.ts - Lines: 58 - Chars: 1661 - Tokens: 416
72. The-Creator-AI-main\src\backend\services\plan-exim.service.ts - Lines: 114 - Chars: 4560 - Tokens: 1140
73. The-Creator-AI-main\src\backend\services\services.ts - Lines: 67 - Chars: 1964 - Tokens: 491
74. The-Creator-AI-main\src\backend\services\task-queue.service.ts - Lines: 128 - Chars: 3921 - Tokens: 981
75. The-Creator-AI-main\src\backend\types\llm-service.enum.ts - Lines: 6 - Chars: 94 - Tokens: 24
76. The-Creator-AI-main\src\backend\types\storage-keys.enum.ts - Lines: 6 - Chars: 202 - Tokens: 51
77. The-Creator-AI-main\src\backend\utils\handleActiveTabChange.ts - Lines: 26 - Chars: 775 - Tokens: 194
78. The-Creator-AI-main\src\backend\utils\mergeOpenEditorsWithSelectedFiles.ts - Lines: 33 - Chars: 952 - Tokens: 238
79. The-Creator-AI-main\src\backend\utils\remoteSetChangePlanViewState.ts - Lines: 26 - Chars: 989 - Tokens: 248
80. The-Creator-AI-main\src\client\components\AutoResizingTextarea.tsx - Lines: 49 - Chars: 2000 - Tokens: 500
81. The-Creator-AI-main\src\client\components\Checkbox.tsx - Lines: 26 - Chars: 815 - Tokens: 204
82. The-Creator-AI-main\src\client\components\ErrorBoundary.tsx - Lines: 44 - Chars: 1220 - Tokens: 305
83. The-Creator-AI-main\src\client\components\file-tree\FileTree.scss - Lines: 9 - Chars: 157 - Tokens: 40
84. The-Creator-AI-main\src\client\components\file-tree\FileTree.tsx - Lines: 137 - Chars: 4398 - Tokens: 1100
85. The-Creator-AI-main\src\client\components\file-tree\FileTree.utils.ts - Lines: 68 - Chars: 2214 - Tokens: 554
86. The-Creator-AI-main\src\client\components\Modal.tsx - Lines: 91 - Chars: 2649 - Tokens: 663
87. The-Creator-AI-main\src\client\components\ProgressSteps.tsx - Lines: 59 - Chars: 1648 - Tokens: 412
88. The-Creator-AI-main\src\client\components\tree-view\TreeView.tsx - Lines: 84 - Chars: 2738 - Tokens: 685
89. The-Creator-AI-main\src\client\components\tree-view\TreeView.utils.ts - Lines: 14 - Chars: 316 - Tokens: 79
90. The-Creator-AI-main\src\client\modules\api-keys-management.module\ApiKeysManagement.tsx - Lines: 150 - Chars: 6318 - Tokens: 1580
91. The-Creator-AI-main\src\client\modules\commit.module\Commit.tsx - Lines: 63 - Chars: 3218 - Tokens: 805
92. The-Creator-AI-main\src\client\modules\context.module\Context.tsx - Lines: 87 - Chars: 4052 - Tokens: 1013
93. The-Creator-AI-main\src\client\modules\plan.module\components\file-card.tsx - Lines: 93 - Chars: 4112 - Tokens: 1028
94. The-Creator-AI-main\src\client\modules\plan.module\formatted-plan-preview.tsx - Lines: 172 - Chars: 6480 - Tokens: 1620
95. The-Creator-AI-main\src\client\modules\plan.module\plan-input-box.tsx - Lines: 139 - Chars: 6410 - Tokens: 1603
96. The-Creator-AI-main\src\client\modules\plan.module\Plan.tsx - Lines: 55 - Chars: 1749 - Tokens: 438
97. The-Creator-AI-main\src\client\store\store.ts - Lines: 20 - Chars: 479 - Tokens: 120
98. The-Creator-AI-main\src\client\store\useStore.ts - Lines: 26 - Chars: 627 - Tokens: 157
99. The-Creator-AI-main\src\client\views\change-plan.view\index.ts - Lines: 9 - Chars: 221 - Tokens: 56
100. The-Creator-AI-main\src\client\views\change-plan.view\logic\commitStagedChanges.ts - Lines: 11 - Chars: 385 - Tokens: 97
101. The-Creator-AI-main\src\client\views\change-plan.view\logic\getSelectedFiles.ts - Lines: 37 - Chars: 1294 - Tokens: 324
102. The-Creator-AI-main\src\client\views\change-plan.view\logic\handleCommitMessageSuggestions.ts - Lines: 15 - Chars: 580 - Tokens: 145
103. The-Creator-AI-main\src\client\views\change-plan.view\logic\handleFileClick.ts - Lines: 24 - Chars: 665 - Tokens: 167
104. The-Creator-AI-main\src\client\views\change-plan.view\logic\handleSubmitPlanRequest.ts - Lines: 79 - Chars: 2463 - Tokens: 616
105. The-Creator-AI-main\src\client\views\change-plan.view\logic\requestCommitMessageSuggestions.ts - Lines: 15 - Chars: 511 - Tokens: 128
106. The-Creator-AI-main\src\client\views\change-plan.view\logic\setupChannelHandlers.ts - Lines: 102 - Chars: 3069 - Tokens: 768
107. The-Creator-AI-main\src\client\views\change-plan.view\logic\updateOrCreateChangePlan.ts - Lines: 51 - Chars: 1633 - Tokens: 409
108. The-Creator-AI-main\src\client\views\change-plan.view\on-mesage.ts - Lines: 271 - Chars: 9696 - Tokens: 2424
109. The-Creator-AI-main\src\client\views\change-plan.view\store\change-plan-view.initial-state.ts - Lines: 17 - Chars: 453 - Tokens: 114
110. The-Creator-AI-main\src\client\views\change-plan.view\store\change-plan-view.logic.ts - Lines: 54 - Chars: 1617 - Tokens: 405
111. The-Creator-AI-main\src\client\views\change-plan.view\store\change-plan-view.state-type.ts - Lines: 34 - Chars: 843 - Tokens: 211
112. The-Creator-AI-main\src\client\views\change-plan.view\store\change-plan-view.store.ts - Lines: 18 - Chars: 672 - Tokens: 168
113. The-Creator-AI-main\src\client\views\change-plan.view\view.constants.ts - Lines: 6 - Chars: 134 - Tokens: 34
114. The-Creator-AI-main\src\client\views\change-plan.view\view.scss - Lines: 10 - Chars: 160 - Tokens: 40
115. The-Creator-AI-main\src\client\views\change-plan.view\view.tsx - Lines: 91 - Chars: 2823 - Tokens: 706
116. The-Creator-AI-main\src\client\views\chat.view\index.ts - Lines: 9 - Chars: 208 - Tokens: 52
117. The-Creator-AI-main\src\client\views\chat.view\on-mesage.ts - Lines: 50 - Chars: 1545 - Tokens: 387
118. The-Creator-AI-main\src\client\views\chat.view\view.scss - Lines: 10 - Chars: 160 - Tokens: 40
119. The-Creator-AI-main\src\client\views\chat.view\view.tsx - Lines: 71 - Chars: 2614 - Tokens: 654
120. The-Creator-AI-main\src\client\views\file-explorer.view\index.ts - Lines: 9 - Chars: 225 - Tokens: 57
121. The-Creator-AI-main\src\client\views\file-explorer.view\on-mesage.ts - Lines: 49 - Chars: 1773 - Tokens: 444
122. The-Creator-AI-main\src\client\views\file-explorer.view\view.scss - Lines: 10 - Chars: 160 - Tokens: 40
123. The-Creator-AI-main\src\client\views\file-explorer.view\view.tsx - Lines: 62 - Chars: 2265 - Tokens: 567
124. The-Creator-AI-main\src\client\views\index.ts - Lines: 54 - Chars: 1714 - Tokens: 429
125. The-Creator-AI-main\src\common\constants\agents.constants.ts - Lines: 837 - Chars: 36635 - Tokens: 9159
126. The-Creator-AI-main\src\common\firebase.ts - Lines: 22 - Chars: 874 - Tokens: 219
127. The-Creator-AI-main\src\common\ipc\channels.enum.ts - Lines: 37 - Chars: 1831 - Tokens: 458
128. The-Creator-AI-main\src\common\ipc\channels.type.ts - Lines: 125 - Chars: 3933 - Tokens: 984
129. The-Creator-AI-main\src\common\ipc\client-ipc.ts - Lines: 42 - Chars: 1338 - Tokens: 335
130. The-Creator-AI-main\src\common\ipc\get-vscode-api.ts - Lines: 12 - Chars: 239 - Tokens: 60
131. The-Creator-AI-main\src\common\ipc\server-ipc.ts - Lines: 44 - Chars: 1522 - Tokens: 381
132. The-Creator-AI-main\src\common\types\file-node.ts - Lines: 6 - Chars: 96 - Tokens: 24
133. The-Creator-AI-main\src\common\types\vscode-webview.d.ts - Lines: 49 - Chars: 1607 - Tokens: 402
134. The-Creator-AI-main\src\common\utils\firebaseLogger.ts - Lines: 43 - Chars: 1108 - Tokens: 277
135. The-Creator-AI-main\src\common\utils\key-path.ts - Lines: 43 - Chars: 1036 - Tokens: 259
136. The-Creator-AI-main\src\common\utils\parse-json.ts - Lines: 20 - Chars: 515 - Tokens: 129
137. The-Creator-AI-main\src\common\utils\view-html.ts - Lines: 35 - Chars: 1271 - Tokens: 318
138. The-Creator-AI-main\src\common\view-types.ts - Lines: 8 - Chars: 184 - Tokens: 46
139. The-Creator-AI-main\src\extension.ts - Lines: 24 - Chars: 623 - Tokens: 156
140. The-Creator-AI-main\src\test\extension.test.ts - Lines: 16 - Chars: 459 - Tokens: 115
141. The-Creator-AI-main\tailwind.config.js - Lines: 102 - Chars: 6814 - Tokens: 1704
142. The-Creator-AI-main\tsconfig.json - Lines: 31 - Chars: 814 - Tokens: 204
143. The-Creator-AI-main\vsc-extension-quickstart.md - Lines: 49 - Chars: 2893 - Tokens: 724
144. The-Creator-AI-main\webpack.config.js - Lines: 98 - Chars: 2795 - Tokens: 699
145. tsconfig.json - Lines: 19 - Chars: 457 - Tokens: 115
146. webpack.config.js - Lines: 63 - Chars: 1710 - Tokens: 428

<file path=".gitignore">
node_modules
package-lock.json
dist
out
*.vsix
.vscode-test/
.vscode/
The-Creator-AI-main/
</file>

<file path=".vscodeignore">
node_modules
src
.gitignore
webpack.config.js
tsconfig.json
**/*.map
**/*.ts
</file>

<file path="bootstrap-flattener.js">
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
</file>

<file path="deploy_scaffold.js">
const fs = require('fs').promises;
const path = require('path');

// --- File Content Definitions ---

const filesToCreate = [
    {
        path: 'package.json',
        content: `{
    "name": "data-curation-environment",
    "publisher": "DCE-Developer",
    "displayName": "Data Curation Environment",
    "description": "A VS Code extension for curating context for Large Language Models.",
    "version": "0.0.1",
    "engines": {
        "vscode": "^1.90.0"
    },
    "categories": [
        "Other"
    ],
    "activationEvents": [
        "onView:viewType.sidebar.contextChooser"
    ],
    "main": "./dist/extension.js",
    "contributes": {
        "viewsContainers": {
            "activitybar": [
                {
                    "id": "data-curation-environment",
                    "title": "Data Curation",
                    "icon": "public/spiral.svg"
                }
            ]
        },
        "views": {
            "data-curation-environment": [
                {
                    "type": "webview",
                    "id": "viewType.sidebar.contextChooser",
                    "name": "Context Chooser"
                }
            ]
        }
    },
    "scripts": {
        "vscode:prepublish": "npm run package",
        "compile": "webpack",
        "watch": "webpack --watch",
        "package": "webpack --mode production --devtool hidden-source-map",
        "lint": "eslint src --ext ts"
    },
    "devDependencies": {
        "@types/node": "18.x",
        "@types/vscode": "^1.90.0",
        "@typescript-eslint/eslint-plugin": "^7.7.1",
        "@typescript-eslint/parser": "^7.7.1",
        "eslint": "^8.57.0",
        "ts-loader": "^9.5.1",
        "typescript": "^5.4.5",
        "webpack": "^5.91.0",
        "webpack-cli": "^5.1.4",
        "copy-webpack-plugin": "^12.0.2",
        "style-loader": "^4.0.0",
        "css-loader": "^7.1.2",
        "sass-loader": "^16.0.1",
        "sass": "^1.78.0",
        "postcss-loader": "^8.1.1",
        "babel-loader": "^9.1.3",
        "@babel/preset-react": "^7.24.7",
        "@babel/preset-typescript": "^7.24.7",
        "process": "^0.11.10"
    },
    "dependencies": {
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "react-icons": "^5.3.0",
        "rxjs": "^7.8.1",
        "reflect-metadata": "^0.2.2"
    }
}`
    },
    {
        path: 'tsconfig.json',
        content: `{
    "compilerOptions": {
        "module": "esnext",
        "moduleResolution": "node",
        "target": "ESNext",
        "lib": ["ES2022", "DOM"],
        "jsx": "react",
        "sourceMap": true,
        "rootDir": ".",
        "strict": false,
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        },
        "experimentalDecorators": true,
        "allowSyntheticDefaultImports": true
    },
    "include": ["src/**/*"]
}`
    },
    {
        path: 'webpack.config.js',
        content: `const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

/** @type {import('webpack').Configuration} */
const config = {
    target: 'node',
    mode: 'none',
    entry: {
        extension: './src/extension.ts',
        contextChooserView: './src/client/views/context-chooser.view/view.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        vscode: 'commonjs vscode'
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
        alias: {
            "@": path.resolve(__dirname, 'src'),
        }
    },
    module: {
        rules: [
            {
                test: /\\.ts$/,
                exclude: /node_modules/,
                use: [{ loader: 'ts-loader' }]
            },
            {
                test: /\\.?ts.?(x)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-typescript']
                    }
                }
            },
            {
                test: /\\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: "public", to: "public" }],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    devtool: 'nosources-source-map',
    infrastructureLogging: {
        level: "log",
    },
};
module.exports = [config];`
    },
    {
        path: '.gitignore',
        content: `node_modules
dist
out
*.vsix
.vscode-test/
.vscode/`
    },
    {
        path: '.vscodeignore',
        content: `node_modules
src
.gitignore
webpack.config.js
tsconfig.json
**/*.map
**/*.ts`
    },
    {
        path: '.vscode/launch.json',
        content: `{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Run Extension",
            "type": "extensionHost",
            "request": "launch",
            "args": ["--extensionDevelopmentPath=\${workspaceFolder}"],
            "outFiles": ["\${workspaceFolder}/dist/**/*.js"],
            "preLaunchTask": "npm: watch"
        }
    ]
}`
    },
    {
        path: '.vscode/tasks.json',
        content: `{
    "version": "2.0.0",
    "tasks": [
        {
            "type": "npm",
            "script": "watch",
            "isBackground": true,
            "presentation": {
                "reveal": "never"
            },
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "problemMatcher": {
                "base": "$ts-webpack-watch",
                "background": {
                    "activeOnStart": true,
                    "beginsPattern": "Compilation starting...",
                    "endsPattern": "compiled successfully"
                }
            }
        }
    ]
}`
    },
    {
        path: 'public/spiral.svg',
        content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <g id="Page-1" stroke="none" fill="none" fill-rule="evenodd">
        <g id="dep" transform="translate(4, 6)">
            <path d="M100 100 m 0 -80 a 80 80 0 0 1 0 160 a 70 70 0 0 1 0 -140 a 60 60 0 0 1 0 120 a 50 50 0 0 1 0 -100 a 40 40 0 0 1 0 80 a 30 30 0 0 1 0 -60 a 20 20 0 0 1 0 40"
                fill="none" stroke="white" stroke-width="8" id="Shape" />
        </g>
    </g>
</svg>`
    },
    {
        path: 'src/extension.ts',
        content: `import * as vscode from "vscode";
import { registerViews } from "./client/views";
import { registerCommands } from "./backend/commands/register-commands";
import { Services } from "./backend/services/services";

let globalContext: vscode.ExtensionContext | null = null;

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "Data Curation Environment" is now active!');
    globalContext = context;

    Services.initialize();
    registerCommands(context);
    registerViews(context);
}

export function getContext() {
    if (!globalContext) {
        throw new Error("Extension context not available.");
    }
    return globalContext;
}

export function deactivate() {}`
    },
    {
        path: 'src/common/types/file-node.ts',
        content: `export interface FileNode {
    name: string;
    absolutePath: string;
    children?: FileNode[];
}`
    },
    {
        path: 'src/common/types/vscode-webview.d.ts',
        content: `export interface WebviewApi<StateType> {
    postMessage(message: unknown): void;
    getState(): StateType | undefined;
    setState<T extends StateType | undefined>(newState: T): T;
}

declare global {
    function acquireVsCodeApi<StateType = unknown>(): WebviewApi<StateType>;
}`
    },
    {
        path: 'src/common/ipc/channels.enum.ts',
        content: `export enum ClientToServerChannel {
    RequestFlattenContext = "clientToServer.requestFlattenContext",
    RequestWorkspaceFiles = "clientToServer.requestWorkspaceFiles",
}

export enum ServerToClientChannel {
    SendWorkspaceFiles = "serverToClient.sendWorkspaceFiles",
}`
    },
    {
        path: 'src/common/ipc/channels.type.ts',
        content: `import { FileNode } from "@/common/types/file-node";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";

export type ChannelBody<T extends ClientToServerChannel | ServerToClientChannel> =
    T extends ClientToServerChannel.RequestFlattenContext ? { selectedPaths: string[] } :
    T extends ClientToServerChannel.RequestWorkspaceFiles ? {} :
    T extends ServerToClientChannel.SendWorkspaceFiles ? { files: FileNode[] } :
    never;`
    },
    {
        path: 'src/common/ipc/get-vscode-api.ts',
        content: `import { WebviewApi } from "../types/vscode-webview";

let vscode: WebviewApi<unknown> | null = null;

const getVscode = () => {
    if (!vscode) {
        vscode = acquireVsCodeApi();
    }
    return vscode;
};

export default getVscode;`
    },
    {
        path: 'src/common/ipc/client-ipc.ts',
        content: `import getVscode from "./get-vscode-api";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { ChannelBody } from "./channels.type";

export class ClientPostMessageManager {
    private static _instance?: ClientPostMessageManager;
    private _listeners: {
        channel: ServerToClientChannel,
        callback: (body: ChannelBody<ServerToClientChannel>) => void
    }[];

    private constructor() {
        this._listeners = [];
        window.addEventListener('message', (event: MessageEvent) => {
            const data = event.data;
            this._listeners.forEach((listener) => {
                if (listener.channel === data.channel) {
                    listener.callback(data.body);
                }
            });
        });
    }

    static getInstance(): ClientPostMessageManager {
        if (!ClientPostMessageManager._instance) {
            ClientPostMessageManager._instance = new ClientPostMessageManager();
        }
        return ClientPostMessageManager._instance;
    }

    sendToServer<T extends ClientToServerChannel>(channel: T, body: ChannelBody<T>): void {
        getVscode().postMessage({ channel, body });
    }

    onServerMessage<T extends ServerToClientChannel>(channel: T, callback: (body: ChannelBody<T>) => void): void {
        this._listeners.push({ channel, callback: callback as any });
    }
}`
    },
    {
        path: 'src/common/ipc/server-ipc.ts',
        content: `import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { ChannelBody } from "./channels.type";

export class ServerPostMessageManager {
    private static _instance?: ServerPostMessageManager;
    private _listeners: {
        channel: ClientToServerChannel,
        callback: (body: ChannelBody<ClientToServerChannel>) => void
    }[];

    private constructor(
        private onMessage: (data: any) => void,
        private sendMessage: (message: any) => void
    ) {
        this._listeners = [];
        this.onMessage((data: any) => {
            this._listeners.forEach((listener) => {
                if (listener.channel === data.channel) {
                    listener.callback(data.body);
                }
            });
        });
    }

    static getInstance(onMessage?: (data: any) => void, sendMessage?: (message: any) => void) {
        if (onMessage && sendMessage) {
            ServerPostMessageManager._instance = new ServerPostMessageManager(onMessage, sendMessage);
        }
        if (!ServerPostMessageManager._instance) {
            throw new Error("ServerPostMessageManager not initialized");
        }
        return ServerPostMessageManager._instance;
    }

    sendToClient<T extends ServerToClientChannel>(channel: T, body: ChannelBody<T>): void {
        this.sendMessage({ channel, body });
    }

    onClientMessage<T extends ClientToServerChannel>(channel: T, callback: (body: ChannelBody<T>) => void): void {
        this._listeners.push({ channel, callback: callback as any });
    }
}`
    },
    {
        path: 'src/common/utils/view-html.ts',
        content: `import * as vscode from "vscode";

export function getViewHtml({ webview, nonce, scriptUri }: { webview: vscode.Webview; nonce: string; scriptUri: string; }): string {
    return \`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src \${webview.cspSource} 'unsafe-inline'; script-src 'nonce-\${nonce}';">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            <div id="root"></div>
            <script nonce="\${nonce}" src="\${scriptUri}"></script>
        </body>
        </html>\`;
}

function getNonce() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
export { getNonce };`
    },
    {
        path: 'src/client/views/index.ts',
        content: `import { viewConfig as contextChooserViewConfig } from "./context-chooser.view";
import * as vscode from "vscode";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { getNonce, getViewHtml } from "@/common/utils/view-html";

export const views = [contextChooserViewConfig];
export const serverIPCs: Record<string, ServerPostMessageManager> = {};

export function registerViews(context: vscode.ExtensionContext) {
    views.forEach((viewConfig) => {
        context.subscriptions.push(
            vscode.window.registerWebviewViewProvider(viewConfig.type, {
                resolveWebviewView: (webviewView) => {
                    webviewView.webview.options = {
                        enableScripts: true,
                        localResourceRoots: [context.extensionUri],
                    };
                    const nonce = getNonce();
                    webviewView.webview.html = getViewHtml({
                        webview: webviewView.webview,
                        nonce,
                        scriptUri: webviewView.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", viewConfig.entry)).toString(),
                    });
                    const serverIpc = ServerPostMessageManager.getInstance(
                        webviewView.webview.onDidReceiveMessage,
                        (data: any) => webviewView.webview.postMessage(data)
                    );
                    serverIPCs[viewConfig.type] = serverIpc;
                    viewConfig.handleMessage(serverIpc);
                },
            })
        );
    });
}`
    },
    {
        path: 'src/client/views/context-chooser.view/index.ts',
        content: `import { onMessage } from "./on-message";

export const viewConfig = {
    entry: "contextChooserView.js",
    type: "viewType.sidebar.contextChooser",
    handleMessage: onMessage,
};`
    },
    {
        path: 'src/client/views/context-chooser.view/on-message.ts',
        content: `import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ClientToServerChannel } from "@/common/ipc/channels.enum";
import { Services } from "@/backend/services/services";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const fsService = Services.fsService;
    const flattenerService = Services.flattenerService;

    serverIpc.onClientMessage(ClientToServerChannel.RequestWorkspaceFiles, () =>
        fsService.handleWorkspaceFilesRequest(serverIpc)
    );

    serverIpc.onClientMessage(ClientToServerChannel.RequestFlattenContext, (data) => {
        console.log("Flattening context for paths:", data.selectedPaths);
        flattenerService.flatten(data.selectedPaths);
    });
}`
    },
    {
        path: 'src/client/views/context-chooser.view/view.tsx',
        content: `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { FileNode } from '@/common/types/file-node';
import FileTree from '../../components/file-tree/FileTree';
import { useState, useEffect } from 'react';

const App = () => {
    const [files, setFiles] = useState<FileNode[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [activeFile, setActiveFile] = useState<string | undefined>();
    
    const clientIpc = ClientPostMessageManager.getInstance();

    useEffect(() => {
        clientIpc.sendToServer(ClientToServerChannel.RequestWorkspaceFiles, {});

        const handleFileResponse = ({ files: receivedFiles }: { files: FileNode[] }) => {
            setFiles(receivedFiles);
        };
        clientIpc.onServerMessage(ServerToClientChannel.SendWorkspaceFiles, handleFileResponse);

    }, [clientIpc]);

    const handleFileClick = (filePath: string) => {
        setActiveFile(filePath);
    };

    const updateSelectedFiles = (newSelectedFiles: string[]) => {
        setSelectedFiles(newSelectedFiles);
    };

    const handleFlattenClick = () => {
        clientIpc.sendToServer(ClientToServerChannel.RequestFlattenContext, { selectedPaths: selectedFiles });
    };

    return (
        <div className="view-container">
            <div className="view-header">
                <button className="flatten-button" onClick={handleFlattenClick}>
                    Flatten Context
                </button>
            </div>
            <div className="file-tree-container">
                {files.length > 0 ? (
                    files.map((rootNode, index) => (
                        <FileTree
                            key={index}
                            data={[rootNode]}
                            onFileClick={handleFileClick}
                            selectedFiles={selectedFiles}
                            updateSelectedFiles={updateSelectedFiles}
                            activeFile={activeFile}
                        />
                    ))
                ) : (
                    <div className="loading-message">Loading file tree...</div>
                )}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);`
    },
    {
        path: 'src/client/views/context-chooser.view/view.scss',
        content: `body {
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 13px;
    color: var(--vscode-editor-foreground);
    background-color: var(--vscode-sideBar-background);
}

.view-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.view-header {
    padding: 8px;
    border-bottom: 1px solid var(--vscode-panel-border);
}

.flatten-button {
    width: 100%;
    padding: 6px;
    border: 1px solid var(--vscode-button-border, var(--vscode-focusBorder));
    background-color: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
    cursor: pointer;
    border-radius: 2px;
}

.flatten-button:hover {
    background-color: var(--vscode-button-hoverBackground);
}

.file-tree-container {
    padding: 5px;
    flex-grow: 1;
    overflow-y: auto;
}

.loading-message {
    padding: 8px;
    color: var(--vscode-descriptionForeground);
}

.tree-view ul {
    padding-left: 0;
    list-style-type: none;
    margin: 0;
}

.treenode-li {
    padding-left: 20px;
    position: relative;
}

.treenode-item-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 1px 4px;
    border-radius: 3px;
}

.treenode-item-wrapper:hover {
    background-color: var(--vscode-list-hoverBackground);
}

.treenode-chevron {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
    transition: transform 0.1s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
}

.treenode-chevron.expanded {
    transform: translateY(-50%) rotate(90deg);
}

.file-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1px;
}

.file-item.active {
    background-color: var(--vscode-list-activeSelectionBackground);
    color: var(--vscode-list-activeSelectionForeground);
}

.file-checkbox {
    margin-right: 6px;
    cursor: pointer;
}

.file-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}`
    },
    {
        path: 'src/backend/commands/commands.ts',
        content: `// No commands are needed for now, but we'll keep the file for future use.
export const commands = [];`
    },
    {
        path: 'src/backend/commands/register-commands.ts',
        content: `import * as vscode from "vscode";
import { commands } from "./commands";

export function registerCommands(context: vscode.ExtensionContext) {
    commands.forEach(({ commandId, callback }) => {
        let disposable = vscode.commands.registerCommand(commandId, callback);
        context.subscriptions.push(disposable);
    });
}`
    },
    {
        path: 'src/backend/services/services.ts',
        content: `import "reflect-metadata";
import { FSService } from "./fs.service";
import { FlattenerService } from "./flattener.service";

// A simple container for services
class ServiceContainer {
    public fsService = new FSService();
    public flattenerService = new FlattenerService();
    
    public initialize() {
        // This can be used for service initialization logic in the future
    }
}

export const Services = new ServiceContainer();`
    },
    {
        path: 'src/backend/services/fs.service.ts',
        content: `import * as vscode from "vscode";
import * as path from "path";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { FileNode } from "@/common/types/file-node";

export class FSService {
    public async handleWorkspaceFilesRequest(serverIpc: ServerPostMessageManager) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [] });
            return;
        }
        
        // For simplicity, we'll just use the first workspace folder.
        const rootUri = workspaceFolders[0].uri;
        if (!rootUri) {
            // This case is unlikely if the above check passes, but good for safety.
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [] });
            return;
        }
        const rootPath = rootUri.fsPath;
        const files = await vscode.workspace.findFiles("**/*");
        const fileTree = this.createFileTree(rootPath, files);

        serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [fileTree] });
    }

    private createFileTree(rootPath: string, files: vscode.Uri[]): FileNode {
        const rootNode: FileNode = {
            name: path.basename(rootPath),
            absolutePath: rootPath,
            children: []
        };

        for (const file of files) {
            const relativePath = path.relative(rootPath, file.fsPath);
            const parts = relativePath.split(path.sep);
            let currentNode = rootNode;

            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                let childNode = currentNode.children?.find(c => c.name === part);

                if (!childNode) {
                    const newPath = path.join(currentNode.absolutePath, part);
                    childNode = { name: part, absolutePath: newPath };
                    if (i < parts.length - 1) {
                        childNode.children = [];
                    }
                    currentNode.children?.push(childNode);
                }
                currentNode = childNode;
            }
        }
        return rootNode;
    }
}`
    },
    {
        path: 'src/client/components/Checkbox.tsx',
        content: `import React from "react";
import { useEffect, useRef } from "react";

interface CheckboxProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'> {
    checked: boolean;
    indeterminate?: boolean;
    onChange: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: CheckboxProps) => {
    const { checked, onChange, indeterminate, ...rest } = props;
    const cRef = useRef<any>(null);

    useEffect(() => {
        if (cRef.current) {
            cRef.current.indeterminate = indeterminate;
        }
    }, [cRef, indeterminate]);

    return (
        <input type="checkbox" ref={cRef} checked={checked} onChange={(e) => onChange(e.target.checked, e)} {...rest} />
    );
};

export default Checkbox;`
    },
        {
        path: 'src/client/components/file-tree/FileTree.tsx',
        content: `import React, { useEffect, useState } from 'react';
import TreeView from '../tree-view/TreeView';
import { FileNode } from '@/common/types/file-node';
import { addRemovePathInSelectedFiles, getFileNodeByPath } from './FileTree.utils';
import Checkbox from '../Checkbox';

interface FileTreeProps {
  data: FileNode[];
  onFileClick?: (filePath: string) => void;
  selectedFiles: string[];
  activeFile?: string;
  updateSelectedFiles: (selectedFiles: string[]) => void;
}

const FileTree: React.FC<FileTreeProps> = ({
  data,
  onFileClick,
  selectedFiles,
  activeFile,
  updateSelectedFiles,
}) => {

  const rootNode = data.length > 0 ? data[0] : null;

  const [expandedNodes, setExpandedNodes] = useState<string[]>(rootNode ? [rootNode.absolutePath] : []);

  useEffect(() => {
    const toExpand = new Set<string>();
    selectedFiles?.forEach((selectedFile) => {
        const node = getFileNodeByPath(data, selectedFile);
        if (node && node.children) {
            toExpand.add(node.absolutePath);
        }
    });

    setExpandedNodes(prevExpandedNodes => [...new Set([...prevExpandedNodes, ...Array.from(toExpand)])]);
  }, [selectedFiles, data]);

  const handleNodeClick = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, node: FileNode) => {
    if (e && (e.target as HTMLElement)?.closest('.file-checkbox')) {
        return;
    }
    onFileClick && onFileClick(node.absolutePath);
  };

  const renderCheckbox = (path: string) => {
    const isSelected = selectedFiles.includes(path);
    const hasSelectedAncestor = selectedFiles.some(ancestor => path.startsWith(ancestor) && path !== ancestor);
    const hasSelectedDescendant = selectedFiles.some(descendant => descendant.startsWith(path) && descendant !== path);
    
    return (
      <Checkbox
        className="file-checkbox"
        indeterminate={!isSelected && !hasSelectedAncestor && hasSelectedDescendant}
        checked={isSelected || hasSelectedAncestor}
        onChange={(_, e) => handleFileCheckboxChange(e, path)}
      />
    );
  };

  const handleFileCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, path: string) => {
    e.stopPropagation();
    e.preventDefault();
    updateSelectedFiles(addRemovePathInSelectedFiles(data, path, selectedFiles));
  };

  const renderFileNodeContent = (node: FileNode) => {
    const isActive = activeFile === node.absolutePath;
    const isDirectory = Array.isArray(node.children);

    return (
      <div
        className={\`file-item \${isActive ? 'active' : ''} \${isDirectory ? 'directory' : 'file'}\`}
        onClick={(e) => handleNodeClick(e, node)}
      >
        {renderCheckbox(node.absolutePath)}
        <span className="file-name">{node.name}</span>
      </div>
    );
  };

  return (
    <div className="file-tree">
      <TreeView 
        data={data} 
        renderNodeContent={renderFileNodeContent} 
      />
    </div>
  );
};

export default FileTree;`
    },
    {
        path: 'src/client/components/file-tree/FileTree.utils.ts',
        content: `import { FileNode } from "@/common/types/file-node";

function getAllDescendantPaths(node: FileNode): string[] {
    let paths: string[] = [];
    if (node.children) {
        for (const child of node.children) {
            paths.push(child.absolutePath);
            paths = paths.concat(getAllDescendantPaths(child));
        }
    }
    return paths;
}

export const addRemovePathInSelectedFiles = (
  fileTree: FileNode[],
  path: string,
  selectedFiles: string[]
): string[] => {
    const node = getFileNodeByPath(fileTree, path);
    if (!node) return selectedFiles;

    const descendantPaths = getAllDescendantPaths(node);
    const isSelected = selectedFiles.includes(path);
    const hasSelectedAncestor = selectedFiles.some(ancestor => path.startsWith(ancestor) && path !== ancestor);
    
    let newSelectedFiles = [...selectedFiles];

    if (isSelected) {
        // Uncheck: remove this path and all its descendants
        newSelectedFiles = newSelectedFiles.filter(p => p !== path && !descendantPaths.includes(p));
    } else if (hasSelectedAncestor) {
        // Uncheck a child of an already checked folder.
        // 1. Remove the ancestor.
        // 2. Add all children of the ancestor EXCEPT the one that was unchecked.
        const ancestor = selectedFiles.find(ancestor => path.startsWith(ancestor) && path !== ancestor)!;
        const ancestorNode = getFileNodeByPath(fileTree, ancestor)!;
        
        newSelectedFiles = newSelectedFiles.filter(p => p !== ancestor);
        
        const siblingsAndCousins = getAllDescendantPaths(ancestorNode).filter(p => p !== path && !p.startsWith(path));
        newSelectedFiles.push(...siblingsAndCousins);

    } else {
        // Check: remove all descendants that might be individually selected, then add the parent path.
        newSelectedFiles = newSelectedFiles.filter(p => !p.startsWith(path));
        newSelectedFiles.push(path);
    }
  
  return [...new Set(newSelectedFiles)]; // Remove duplicates for cleanliness
};

export const getFileNodeByPath = (
  fileNodes: FileNode[],
  filePath: string
): FileNode | null => {
    for (const rootNode of fileNodes) {
        const found = findNode(rootNode, filePath);
        if (found) return found;
    }
    return null;
};

function findNode(node: FileNode, filePath: string): FileNode | null {
    if (node.absolutePath === filePath) {
        return node;
    }
    if (node.children && filePath.startsWith(node.absolutePath)) {
        for (const child of node.children) {
            const found = findNode(child, filePath);
            if(found) return found;
        }
    }
    return null;
}`
    },
    {
        path: 'src/client/components/tree-view/TreeView.tsx',
        content: `import React, { useState } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { getExpandedNodes } from './TreeView.utils';

export interface TreeNode {
    name: string;
    absolutePath: string;
    children?: TreeNode[];
    isExpanded?: boolean;
    [key: string]: any;
}

interface TreeViewProps {
    data: TreeNode[];
    onNodeClick?: (node: TreeNode) => void;
    renderNodeContent?: (node: TreeNode) => React.ReactNode;
}

const TreeView: React.FC<TreeViewProps> = ({ data, onNodeClick, renderNodeContent }) => {
    const [expandedNodes, setExpandedNodes] = useState<string[]>(getExpandedNodes(data));

    const handleNodeClick = (node: TreeNode) => {
        if (node.children && node.children.length > 0) {
            setExpandedNodes((prevExpandedNodes) => {
                const isExpanded = prevExpandedNodes.includes(node.absolutePath);
                return isExpanded
                    ? prevExpandedNodes.filter((n) => n !== node.absolutePath)
                    : [...prevExpandedNodes, node.absolutePath];
            });
        }
        onNodeClick && onNodeClick(node);
    };

    const renderTreeNodes = (nodes: TreeNode[]) => {
        return nodes.map((node) => {
            const isExpanded = expandedNodes.includes(node.absolutePath);
            const isDirectory = !!(node.children && node.children.length > 0);

            return (
                <li key={node.absolutePath} className="treenode-li">
                    <div
                        onClick={() => handleNodeClick(node)}
                        className={\`treenode-item-wrapper\`}
                    >
                        {isDirectory && (
                            <span
                                className={\`treenode-chevron \${isExpanded ? 'expanded' : ''}\`}
                            >
                                <MdChevronRight />
                            </span>
                        )}
                        {renderNodeContent ? renderNodeContent(node) : node.name}
                    </div>
                    {isDirectory && isExpanded && (
                        <ul className="treenode-children">{renderTreeNodes(node.children)}</ul>
                    )}
                </li>
            );
        });
    };

    return (
        <div className="tree-view">
            <ul>{renderTreeNodes(data)}</ul>
        </div>
    );
};

export default TreeView;`
    },
    {
        path: 'src/client/components/tree-view/TreeView.utils.ts',
        content: `import { TreeNode } from "./TreeView";

export const getExpandedNodes = (data: TreeNode[]): string[] => {
  return data.reduce((acc: string[], node) => {
    if (node.isExpanded) {
      acc.push(node.absolutePath);
    }
    if (node.children) {
      acc.push(...getExpandedNodes(node.children));
    }
    return acc;
  }, []);
};`
    },
    {
        path: 'src/backend/services/flattener.service.ts',
        content: `import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs/promises';

interface FileStats {
    filePath: string;
    lines: number;
    characters: number;
    tokens: number;
    content: string;
    error: string | null;
}

export class FlattenerService {

    public async flatten(selectedPaths: string[]) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            vscode.window.showErrorMessage("Cannot flatten context: No workspace folder is open.");
            return;
        }
        if (selectedPaths.length === 0) {
            vscode.window.showWarningMessage("Cannot flatten context: No files or folders are selected.");
            return;
        }

        const rootPath = workspaceFolders[0].uri.fsPath;
        const outputFilePath = path.join(rootPath, 'flattened_repo.md');

        try {
            const allFilePaths = await this.expandDirectories(selectedPaths);
            const uniqueFilePaths = [...new Set(allFilePaths)];

            const fileStatsPromises = uniqueFilePaths.map(filePath => this.getFileStatsAndContent(filePath));
            const results = await Promise.all(fileStatsPromises);

            const outputContent = this.generateOutputContent(results, rootPath, outputFilePath);

            await fs.writeFile(outputFilePath, outputContent, 'utf-8');
            vscode.window.showInformationMessage(\`Successfully flattened \${results.filter(r => !r.error).length} files to flattened_repo.md.\`);

        } catch (error: any) {
            vscode.window.showErrorMessage(\`Failed to flatten context: \${error.message}\`);
            console.error(error);
        }
    }

    private async expandDirectories(paths: string[]): Promise<string[]> {
        const allFiles: string[] = [];
        for (const p of paths) {
            try {
                const stats = await fs.stat(p);
                if (stats.isDirectory()) {
                    allFiles.push(...await this.getAllFilesRecursive(p));
                } else {
                    allFiles.push(p);
                }
            } catch (e) {
                console.warn(\`Could not stat path \${p}, skipping.\`);
            }
        }
        return allFiles;
    }

    private async getAllFilesRecursive(dirPath: string): Promise<string[]> {
        let files: string[] = [];
        try {
            const entries = await fs.readdir(dirPath, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path.join(dirPath, entry.name);
                if (entry.isDirectory()) {
                    files = files.concat(await this.getAllFilesRecursive(fullPath));
                } else {
                    files.push(fullPath);
                }
            }
        } catch (e) {
            console.error(\`Error reading directory \${dirPath}:\`, e);
        }
        return files;
    }

    private async getFileStatsAndContent(filePath: string): Promise<FileStats> {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            const lines = content.split('\\n').length;
            const characters = content.length;
            const tokens = Math.ceil(characters / 4);
            return { filePath, lines, characters, tokens, content, error: null };
        } catch (error: any) {
            return { filePath, lines: 0, characters: 0, tokens: 0, content: '', error: error.message };
        }
    }

    private generateOutputContent(results: FileStats[], rootDir: string, outputFilename: string): string {
        let totalLines = 0;
        let totalCharacters = 0;
        let totalTokens = 0;
        let errorCount = 0;
        const validResults = results.filter(r => !r.error);

        for (const res of validResults) {
            totalLines += res.lines;
            totalCharacters += res.characters;
            totalTokens += res.tokens;
        }

        let output = \`<!--\\n\`;
        output += \`  File: \${path.basename(outputFilename)}\\n\`;
        output += \`  Source Directory: \${rootDir}\\n\`;
        output += \`  Date Generated: \${new Date().toISOString()}\\n\`;
        output += \`  ---\\n\`;
        output += \`  Total Files: \${validResults.length}\\n\`;
        if (errorCount > 0) {
            output += \`  Files with Errors: \${errorCount}\\n\`;
        }
        output += \`  Total Lines: \${totalLines}\\n\`;
        output += \`  Total Characters: \${totalCharacters}\\n\`;
        output += \`  Approx. Tokens: \${totalTokens}\\n\`;
        output += \`-->\\n\\n\`;

        const top10 = [...validResults].sort((a, b) => b.tokens - a.tokens).slice(0, 10);

        output += \`<!-- Top 10 Files by Token Count -->\\n\`;
        top10.forEach((r, i) => {
            output += \`\${i + 1}. \${path.relative(rootDir, r.filePath)} (\${r.tokens} tokens)\\n\`;
        });
        output += \`\\n\`;

        output += \`<!-- Full File List -->\\n\`;
        results.forEach((r, i) => {
            const relativePath = path.relative(rootDir, r.filePath);
            if (r.error) {
                output += \`\${i + 1}. \${relativePath} - ERROR: \${r.error}\\n\`;
            } else {
                output += \`\${i + 1}. \${relativePath} - Lines: \${r.lines} - Chars: \${r.characters} - Tokens: \${r.tokens}\\n\`;
            }
        });
        output += \`\\n\`;

        for (const { filePath, content, error } of results) {
            const relativePath = path.relative(rootDir, filePath).replace(/\\\\/g, '/');
            output += \`<file path="\${relativePath}">\\n\`;
            if (error) {
                output += \`Error reading file: \${error}\\n\`;
            } else {
                output += content;
            }
            if (!content.endsWith('\\n')) {
                output += '\\n';
            }
            output += \`</file>\\n\\n\`;
        }
        return output;
    }
}`
    }
];

// --- Main Execution ---

async function deployScaffold() {
    console.log('Starting scaffold deployment...');
    const rootDir = process.cwd();

    for (const file of filesToCreate) {
        const fullPath = path.join(rootDir, file.path);
        const dir = path.dirname(fullPath);

        try {
            await fs.mkdir(dir, { recursive: true });
            await fs.writeFile(fullPath, file.content, 'utf-8');
            console.log(`✅ Created: ${file.path}`);
        } catch (error) {
            console.error(`❌ Failed to create ${file.path}: ${error.message}`);
        }
    }

    console.log('\n🚀 Scaffold deployment complete! 🚀');
    console.log('Next steps:');
    console.log('1. Run npm install to install dependencies.');
    console.log('2. Press F5 in VS Code to start the extension (this will also run npm run watch).');
}

deployScaffold();
</file>

<file path="package.json">
{
    "name": "data-curation-environment",
    "publisher": "DCE-Developer",
    "displayName": "Data Curation Environment",
    "description": "A VS Code extension for curating context for Large Language Models.",
    "version": "0.0.1",
    "engines": {
        "vscode": "^1.90.0"
    },
    "categories": [
        "Other"
    ],
    "activationEvents": [
        "onView:viewType.sidebar.contextChooser"
    ],
    "main": "./dist/extension.js",
    "contributes": {
        "viewsContainers": {
            "activitybar": [
                {
                    "id": "data-curation-environment",
                    "title": "Data Curation",
                    "icon": "public/spiral.svg"
                }
            ]
        },
        "views": {
            "data-curation-environment": [
                {
                    "type": "webview",
                    "id": "viewType.sidebar.contextChooser",
                    "name": "Context Chooser"
                }
            ]
        }
    },
    "scripts": {
        "vscode:prepublish": "npm run package",
        "compile": "webpack",
        "watch": "webpack --watch",
        "package": "webpack --mode production --devtool hidden-source-map",
        "lint": "eslint src --ext ts"
    },
    "devDependencies": {
        "@types/node": "18.x",
        "@types/vscode": "^1.90.0",
        "@typescript-eslint/eslint-plugin": "^7.7.1",
        "@typescript-eslint/parser": "^7.7.1",
        "eslint": "^8.57.0",
        "ts-loader": "^9.5.1",
        "typescript": "^5.4.5",
        "webpack": "^5.91.0",
        "webpack-cli": "^5.1.4",
        "copy-webpack-plugin": "^12.0.2",
        "style-loader": "^4.0.0",
        "css-loader": "^7.1.2",
        "sass-loader": "^16.0.1",
        "sass": "^1.78.0",
        "postcss-loader": "^8.1.1",
        "babel-loader": "^9.1.3",
        "@babel/preset-react": "^7.24.7",
        "@babel/preset-typescript": "^7.24.7",
        "process": "^0.11.10"
    },
    "dependencies": {
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "react-icons": "^5.3.0",
        "rxjs": "^7.8.1",
        "reflect-metadata": "^0.2.2"
    }
}
</file>

<file path="public/spiral.svg">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <g id="Page-1" stroke="none" fill="none" fill-rule="evenodd">
        <g id="dep" transform="translate(4, 6)">
            <path d="M100 100 m 0 -80 a 80 80 0 0 1 0 160 a 70 70 0 0 1 0 -140 a 60 60 0 0 1 0 120 a 50 50 0 0 1 0 -100 a 40 40 0 0 1 0 80 a 30 30 0 0 1 0 -60 a 20 20 0 0 1 0 40"
                fill="none" stroke="white" stroke-width="8" id="Shape" />
        </g>
    </g>
</svg>
</file>

<file path="src/Artifacts/A0. DCE Master Artifact List.md">
# Artifact A0: DCE Master Artifact List
# Date Created: C1
# Author: AI Model & Curator
# Updated on: C16 (Add A11 for Regression Case Studies)

## 1. Purpose

# This file serves as the definitive, parseable list of all documentation artifacts for the "Data Curation Environment" (DCE) VS Code Extension project.

## 2. Formatting Rules for Parsing

# *   Lines beginning with `#` are comments and are ignored.
# *   `##` denotes a major category header and is ignored.
# *   `###` denotes an artifact entry. The text following it is the artifact's full name and ID.
# *   Lines beginning with `- **Description:**` provide context for the project.
# *   Lines beginning with `- **Tags:**` provide keywords for Inference.

## 3. Artifacts List

## I. Project Planning & Design

### A1. DCE - Project Vision and Goals
- **Description:** High-level overview of the DCE VS Code extension, its purpose, and the three-phase development plan.
- **Tags:** project vision, goals, scope, phase 1, phase 2, phase 3, vs code extension

### A2. DCE - Phase 1 - Context Chooser - Requirements & Design
- **Description:** Detailed functional and technical requirements for Phase 1, focusing on the file tree with checkboxes and the flattening functionality.
- **Tags:** requirements, design, phase 1, context chooser, tree view, checkbox, flatten, vs code api

### A3. DCE - Technical Scaffolding Plan
- **Description:** Outlines the proposed file structure, technologies, and key VS Code API components for the extension, based on the `The-Creator-AI-main` reference repo.
- **Tags:** technical plan, scaffolding, file structure, typescript, vs code extension, api

### A4. DCE - Analysis of The-Creator-AI Repo
- **Description:** Provides a detailed analysis of the `The-Creator-AI-main` reference repository, its architecture, and its mapping to the Data Curation Environment project goals.
- **Tags:** analysis, repository, architecture, vscode-extension, project-planning

### A5. DCE - Target File Structure
- **Description:** A text-based representation of the target file structure for the DCE extension, outlining the layout of directories and key files.
- **Tags:** file structure, architecture, project layout, scaffolding

### A6. DCE - Initial Scaffolding Deployment Script
- **Description:** Contains a Node.js script that, when executed, creates the entire initial directory structure and files for the DCE extension project.
- **Tags:** deployment, script, scaffolding, bootstrap, nodejs, automation

### A7. DCE - Development and Testing Guide
- **Description:** A step-by-step guide explaining how to run, debug, and test the DCE extension within VS Code using the Extension Development Host.
- **Tags:** development, testing, debugging, workflow, vs code extension, f5

### A8. DCE - Phase 1 - Selection Sets Feature Plan
- **Description:** A plan outlining the user stories, UI/UX, and technical implementation for saving and loading different sets of selected files (selection profiles).
- **Tags:** feature plan, selection sets, profiles, context management, phase 1

### A9. DCE - GitHub Repository Setup Guide
- **Description:** A step-by-step guide with the necessary git commands to initialize the project as a local repository and push it to a new remote repository on GitHub.
- **Tags:** git, github, version control, setup, repository

### A10. DCE - Metadata and Statistics Display
- **Description:** Outlines the requirements and design for displaying live metadata (total selected files, total tokens) and for showing aggregate statistics (token and file counts) for folders in the file tree.
- **Tags:** feature plan, metadata, statistics, token count, ui, ux

### A11. DCE - Regression Case Studies
- **Description:** Documents recurring bugs, their root causes, and codified solutions to prevent future regressions during development.
- **Tags:** bugs, regression, troubleshooting, development, best practices

## II. Standalone Utilities & Guides

# A189. Number Formatting Reference Guide
- **Description:** A standalone guide and utility script for formatting large numbers with K/M/B/T suffixes and dynamic decimal place adjustment for clean UI presentation.
- **Tags:** utility, script, formatting, numbers, ui, ux, javascript, typescript
</file>

<file path="src/Artifacts/A1. DCE - Project Vision and Goals.md">
# Artifact A1: DCE - Project Vision and Goals
# Date Created: Cycle 1
# Author: AI Model
# Updated on: Cycle 2 (Reflect findings from reference repository analysis)

## 1. Project Vision

The vision of the Data Curation Environment (DCE) is to create a seamless, integrated toolset within VS Code that streamlines the workflow of interacting with large language models. The core problem this project solves is the manual, cumbersome process of selecting, packaging, and managing the context (code files, documents, etc.) required for effective AI-assisted development.

## 2. High-Level Goals & Phases

The project will be developed in three distinct phases.

**Note on Reference Repository:** The discovery of the `The-Creator-AI-main` repository in Cycle 2 has provided a significant head-start, especially for Phase 1 and 2. The project's focus shifts from building these components from the ground up to adapting and extending the powerful, existing foundation.

### Phase 1: The Context Chooser

The goal of this phase is to eliminate the manual management of a `files_list.txt`. Users should be able to intuitively select files and folders for their AI context directly within the VS Code file explorer UI.

-   **Core Functionality:** Implement a file explorer view with checkboxes for every file and folder.
-   **Action:** A "Flatten Context" button will take all checked items and generate a single `flattened_repo.md` file in the project root.
-   **Outcome:** A user can curate a complex context with simple mouse clicks, completely removing the need to edit a text file.
-   **Update (Cycle 2):** The reference repository contains a fully-featured `FileTree.tsx` component that already accomplishes most of this. The task is now to adapt this component and its backend `FSService` to produce the desired `flattened_repo.md` output.

### Phase 2: The Parallel Co-Pilot Panel

This phase addresses the limitation of being locked into a single conversation with an AI assistant. The goal is to enable multiple, parallel interactions to compare and contrast different prompts or approaches simultaneously.

-   **Core Functionality:** Create a custom panel within VS Code that can host multiple, independent "chat" or "prompt" windows.
-   **Outcome:** A user can send the same (or different) prompts to multiple AI instances and view the results side-by-side, dramatically improving the efficiency of prompt engineering and response evaluation.
-   **Update (Cycle 2):** The reference repository's "Change Plan" view is an excellent, full-featured implementation of a *single* co-pilot panel. This provides a solid architectural base to build upon for the parallelization feature.

### Phase 3: The Integrated Diff Tool

This phase aims to bring a critical part of the external workflow—comparing text files—directly into the VS Code extension.

-   **Core Functionality:** Create a simple diffing utility within a VS Code webview. The user should be able to select two text sources (e.g., two AI responses from the Phase 2 panel, or a new response and an existing file) and see a visual comparison.
-   **Outcome:** Reduces the friction of copying and pasting text into external tools like WinMerge, keeping the entire curation and review workflow inside VS Code.
</file>

<file path="src/Artifacts/A10. DCE - Metadata and Statistics Display.md">
# Artifact A10: DCE - Metadata and Statistics Display
# Date Created: Cycle 14
# Author: AI Model
# Updated on: C15 (Add image file size handling and UI refinements)

- **Key/Value for A0:**
- **Description:** Outlines the requirements and design for displaying live metadata (total selected files, total tokens) and for showing aggregate statistics (token and file counts) for folders in the file tree.
- **Tags:** feature plan, metadata, statistics, token count, ui, ux

## 1. Overview & Goal

To enhance the data curation process, it is critical for the user to have immediate, quantitative feedback on their selections. This feature will provide at-a-glance statistics at both the folder level and the overall selection level. The goal is to empower the user to make informed decisions about context size and composition without needing to perform manual calculations.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| US-01 | **Folder Statistics** | As a data curator, I want to see the total token count and the total number of files contained within each folder, so I can quickly assess the size and complexity of different parts of my project. | - Next to each folder name in the file tree, a token count is displayed. <br> - This token count is the recursive sum of all tokens from all non-image files within that folder and its subfolders. <br> - Next to the token count, a file count is also displayed, formatted with commas (e.g., "1,234"). <br> - These numbers are calculated on the backend and provided with the initial file tree data. |
| US-02 | **Live Selection Summary** | As a data curator, I want to see a live summary of my total selection as I check and uncheck files, so I can monitor the total size of my context in real-time. | - A dedicated summary panel/footer is visible in the UI. <br> - This panel displays "X files" and "Y tokens". <br> - "X" is the total count of all individual files included in the current selection, formatted with commas. <br> - "Y" is the sum of all token counts for those selected non-image files. <br> - These values update instantly whenever a checkbox is changed. |
| US-03 | **Readable Numbers & Icons** | As a data curator, I want large token counts to be formatted in a compact and readable way (e.g., 1,234 becomes "1.2K"), and for icons to visually represent the data, so I can easily parse the information. | - All token counts use K/M/B suffixes for numbers over 1,000. <br> - All file counts use commas for thousands separators. <br> - An icon is displayed next to the token count and file count for visual distinction. <br> - The statistics are right-justified in the file tree for better readability. |
| US-04 | **Image File Handling** | As a data curator, I want to see the file size for images instead of a token count, so I can understand their contribution to storage/transfer size rather than context length. | - The backend identifies common image file types (png, jpg, etc.). <br> - For image files, the token count is treated as 0. <br> - In the file tree, instead of a token count, the human-readable file size is displayed (e.g., "15.2 KB", "2.1 MB"). |

## 3. Technical Implementation Plan

1.  **Backend (`fs.service.ts`):**
    *   The `FileNode` interface in `src/common/types/file-node.ts` will be updated to include `isImage: boolean` and `sizeInBytes: number`.
    *   The backend service will maintain a list of image file extensions.
    *   When building the tree, it will check each file's extension.
    *   If it's an image, it will use `fs.stat` to get the `sizeInBytes`, set `isImage: true`, and set `tokenCount: 0`.
    *   If it's not an image, it will calculate the `tokenCount` and get the `sizeInBytes`.
    *   The recursive sum logic for folders will aggregate `tokenCount`, `fileCount`, and `sizeInBytes` from their children.
    *   The `vscode.workspace.findFiles` call will be updated to exclude the `node_modules` directory.

2.  **Frontend - Formatting (`formatting.ts`):**
    *   A new `formatBytes(bytes)` utility will be created to convert bytes to KB, MB, etc.
    *   A new `formatNumberWithCommas(number)` utility will be created.

3.  **Frontend - File Tree (`FileTree.tsx` & `view.scss`):**
    *   The `FileTree.tsx` component will be updated to render the new data.
    *   It will conditionally display either a formatted token count (using `formatLargeNumber`) or a formatted file size (using `formatBytes`) based on the `isImage` flag.
    *   It will display folder file counts using `formatNumberWithCommas`.
    *   It will incorporate icons from `react-icons/vsc` for tokens and file counts.
    *   The stylesheet (`view.scss`) will be updated to right-align all statistics, pushing them to the end of the file/folder row.

4.  **Frontend - Live Summary Panel (`context-chooser.view.tsx`):**
    *   The `useMemo` hook that calculates the summary will be updated to correctly sum the total number of files and total tokens from the selected items. It will continue to ignore image sizes for the token total to avoid mixing units.
    *   The rendered output will use the new formatting utilities and icons.
</file>

<file path="src/Artifacts/A11. DCE - Regression Case Studies.md">
# Artifact A11: DCE - Regression Case Studies
# Date Created: Cycle 16
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** Documents recurring bugs, their root causes, and codified solutions to prevent future regressions during development.
- **Tags:** bugs, regression, troubleshooting, development, best practices

## 1. Purpose

This document serves as a living record of persistent or complex bugs that have recurred across multiple development cycles. By documenting the root cause analysis (RCA) and the confirmed solution for each issue, we create a "source of truth" that can be referenced to prevent the same mistakes from being reintroduced into the codebase.

## 2. Case Studies

---

### Case Study 001: `path.sep` Usage in Frontend Components

-   **Artifacts Affected:** `src/client/components/file-tree/FileTree.tsx`
-   **Cycles Observed:** 13, 14, 16
-   **Symptom:** The webpack build process fails with TypeScript errors similar to the following:
    ```
    [tsl] ERROR in C:\Projects\DCE\src\client\components\file-tree\FileTree.tsx(64,96)
          TS2339: Property 'sep' does not exist on type 'string'.
    ```
-   **Root Cause Analysis (RCA):**
    The error occurs when frontend code (React components running in a webview) attempts to use `path.sep`. The `path` module is a core part of the Node.js runtime environment, and `path.sep` provides the platform-specific path segment separator (`\` for Windows, `/` for POSIX). However, the webview environment is a browser context, not a Node.js context. In the browser, the `path` module does not exist, and attempting to access properties on it results in a TypeScript error and a runtime failure. This mistake typically happens when logic that should be on the backend (like path manipulation) is incorrectly placed in a frontend component.

-   **Codified Solution & Best Practice:**
    1.  **Strict Environment Separation:** All file system path manipulation **must** occur in the backend (the extension host, i.e., files in `src/backend/`). The backend is a Node.js environment and has access to modules like `path` and `fs`.
    2.  **Normalized Paths:** Before sending any file tree data or paths from the backend to the frontend, they should be normalized. The standard practice is to use forward slashes (`/`) as the separator, as this is universally understood by web standards. The backend can use `path.join` and `path.relative` as needed, but the final `FileNode` objects sent to the client should have paths constructed with `/`.
    3.  **Frontend Simplicity:** The frontend code should treat all file paths as simple strings. It should **never** attempt to parse, split, or join them using a path-specific separator. If path segments are needed on the frontend, the backend should provide them pre-split in the data structure.

-   **Example of Incorrect Code (Frontend):**
    ```typescript
    // This is WRONG and will cause the error
    import * as path from 'path';
    const parts = relativePath.split(path.sep);
    ```

-   **Example of Correct Code (Backend):**
    ```typescript
    // src/backend/services/fs.service.ts
    import * as path from 'path';
    // ...
    // When constructing the path for the frontend:
    const relativePath = path.relative(rootPath, file.fsPath).replace(/\\/g, '/'); // Normalize to forward slashes
    ```
</file>

<file path="src/Artifacts/A189. Number Formatting Reference Guide.md">
# Artifact A189: Number Formatting Guide (K/M Suffixes & Dynamic Decimals)
# Date Created: Cycle 14
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A standalone guide and utility script for formatting large numbers with K/M/B/T suffixes and dynamic decimal place adjustment for clean UI presentation.
- **Tags:** utility, script, formatting, numbers, ui, ux, javascript, typescript

## 1. Purpose

This artifact provides a set of robust, reusable TypeScript functions for formatting numbers in a user-friendly way. The core function, `formatLargeNumber`, intelligently converts large numbers into a compact format using suffixes like 'K' (thousands), 'M' (millions), 'B' (billions), and 'T' (trillions).

The key features of this utility are:
*   **Automatic Suffixing:** Automatically scales numbers and adds the appropriate suffix.
*   **Dynamic Decimal Precision:** Adjusts the number of decimal places shown based on the magnitude of the number, ensuring a clean and consistent look in the UI (e.g., `12.3K`, `123.5K`, `1.23M`).
*   **Handling of Small Numbers:** Gracefully handles numbers below 1,000 without applying a suffix.
*   **Specialized Wrappers:** Includes helper functions like `formatCurrency` and `formatCount` for common use cases.

## 2. Core Utility Functions (from `src/utils.ts`)

Below is the complete TypeScript code. You can save this as a `formatting.ts` file in a new project's `utils` directory.

```typescript
// src/common/utils/formatting.ts

const KMBT_SUFFIXES = ['', 'K', 'M', 'B', 'T', 'Q']; // Extend as needed

/**
 * Formats a large number with appropriate K/M/B/T suffixes and dynamic decimal places.
 * Handles very small near-zero numbers gracefully to avoid scientific notation.
 *
 * @param value The number to format.
 * @param decimalPlaces The base number of decimal places to aim for.
 * @returns A formatted string.
 */
export function formatLargeNumber(value: number | undefined | null, decimalPlaces: number = 2): string {
    if (value === null || value === undefined || isNaN(value) || !Number.isFinite(value)) {
        return '---';
    }
    if (value === 0) {
        return '0';
    }

    const VERY_SMALL_THRESHOLD = 1e-6; // 0.000001
    if (Math.abs(value) < VERY_SMALL_THRESHOLD) {
        return (0).toFixed(decimalPlaces);
    }

    const isNegative = value < 0;
    const absValue = Math.abs(value);

    let unitIndex = 0;
    let scaledValue = absValue;

    if (absValue < 1000) {
        return String(Math.round(value)); // Return whole number if less than 1000
    }

    if (absValue >= 1000) {
        unitIndex = Math.floor(Math.log10(absValue) / 3);
        unitIndex = Math.min(unitIndex, KMBT_SUFFIXES.length - 1);
        scaledValue = absValue / Math.pow(1000, unitIndex);
    }

    let adjustedDecimalPlaces = decimalPlaces;
    if (unitIndex > 0) { // If a suffix is used (K, M, B, T, Q)
        if (scaledValue >= 100) adjustedDecimalPlaces = Math.max(0, decimalPlaces - 2);
        else if (scaledValue >= 10) adjustedDecimalPlaces = Math.max(0, decimalPlaces - 1);
    } else { // No unit suffix (value < 1000)
        if (Math.abs(scaledValue) < 0.01 && scaledValue !== 0) {
            adjustedDecimalPlaces = Math.max(decimalPlaces, 4);
        } else if (Number.isInteger(scaledValue)) {
             adjustedDecimalPlaces = 0;
        }
    }

    const unit = KMBT_SUFFIXES[unitIndex] ?? '';
    let formattedValue = scaledValue.toFixed(adjustedDecimalPlaces);

    // Remove trailing .00 or .0
    if (adjustedDecimalPlaces > 0 && formattedValue.endsWith('0')) {
        formattedValue = formattedValue.replace(/\.?0+$/, '');
    }


    return `${isNegative ? '-' : ''}${formattedValue}${unit}`;
}```

## 3. Usage Examples

Here is how you can use these functions in your code:

```typescript
import { formatLargeNumber } from './path/to/formatting';

// formatLargeNumber examples
console.log(formatLargeNumber(123));        // "123"
console.log(formatLargeNumber(1234));       // "1.23K"
console.log(formatLargeNumber(12345));      // "12.3K"
console.log(formatLargeNumber(123456));     // "123K"
console.log(formatLargeNumber(1234567));    // "1.23M"
console.log(formatLargeNumber(9876543210)); // "9.88B"
console.log(formatLargeNumber(-54321));     // "-54.3K"
console.log(formatLargeNumber(0.0000001));  // "0.00"
```

## 4. Integration Guide

1.  **Copy the Code:** Save the code from Section 2 into a file named `formatting.ts` inside your project's `src/common/utils` directory.
2.  **Import and Use:** Import the function into your UI components.
    ```typescript
    import { formatLargeNumber } from '@/common/utils/formatting';

    const MyComponent = () => {
      const displayValue = formatLargeNumber(123456); // "123K"
      return <div>Tokens: {displayValue}</div>;
    };
    ```
</file>

<file path="src/Artifacts/A2. DCE - Phase 1 - Context Chooser - Requirements & Design.md">
# Artifact A2: DCE - Phase 1 - Context Chooser - Requirements & Design
# Date Created: Cycle 1
# Author: AI Model
# Updated on: Cycle 2 (Revised based on analysis of reference repository)

## 1. Overview

This document outlines the requirements for Phase 1 of the Data Curation Environment (DCE) project. The primary goal of this phase is to replace the manual, error-prone process of managing context via a `files_list.txt` with an intuitive, UI-driven approach within VS Code.

**Major Update (Cycle 2):** The analysis of the `The-Creator-AI-main` repository revealed an existing, highly-functional file tree component (`src/client/components/file-tree/FileTree.tsx`) with checkbox selection. The project requirements have been updated to reflect a shift from *building* this component from scratch to *analyzing, adapting, and integrating* the existing solution.

## 2. Functional Requirements

| ID | Requirement | User Story | Acceptance Criteria | Update (Cycle 2) |
|---|---|---|---|---|
| FR-01 | **Analyze Existing File Tree** | As a developer, I want to understand the capabilities of the `FileTree.tsx` component | - Analyze the component's props and state. <br> - Document its dependencies on other frontend components and backend services (`FSService`). <br> - Determine how checkbox state is managed and communicated. | **New** |
| FR-02 | **Display File Tree in View** | As a user, I want to see a tree of all files and folders in my workspace within a dedicated VS Code view. | - The view should accurately reflect the workspace's file system structure. <br> - It should respect `.gitignore` rules to hide irrelevant files. | **Adaptation.** The `FileTree.tsx` component and `FSService` already provide this. We need to ensure it's correctly instantiated in our extension's view. |
| FR-03 | **Checkbox Selection** | As a user, I want to select and deselect files and folders for my context using checkboxes. | - Every file and folder in the tree has a checkbox. <br> - Checking a folder checks all its children. <br> - Unchecking a folder unchecks all its children. <br> - A folder shows an "indeterminate" state if only some of its children are checked. | **Adaptation.** The reference component appears to support this logic. We must verify and adapt its state management (`selectedFiles` array). |
| FR-04 | **Flatten Selected Context** | As a user, I want a single button to package all my selected files into one context file. | - A "Flatten Context" button is present in the view. <br> - Clicking it triggers a process that reads the content of all checked files. <br> - The contents are concatenated into a single `flattened_repo.md` file in the project root. | **Implementation.** The logic for this will need to be implemented, using the state from the `FileTree` component as input for our enhanced `bootstrap-flattener.js` logic. |

## 3. Technical Design & Integration Plan

1.  **Extension View:** We will create a new Webview-based view in the VS Code activity bar, as defined in `package.json`.
2.  **Frontend Component:** This view will render the `Context.tsx` module (`src/client/modules/context.module/`), which in turn uses the `FileTree.tsx` component.
3.  **Backend Service:** The frontend will communicate with the `FSService.ts` on the extension's backend via the established IPC channels.
    -   On view load, the frontend sends a `RequestWorkspaceFiles` message.
    -   The `FSService` gathers the file list (respecting `.gitignore`), creates the tree structure, and sends it back via a `SendWorkspaceFiles` message.
4.  **State Management:** The list of selected file paths will be managed in the frontend's state store (`change-plan-view.store.ts`). The `FileTree.tsx` component will receive this list as a prop and use it to render the checkbox states. User interactions with checkboxes will dispatch actions to update this state.
5.  **Flattening Logic:**
    -   The "Flatten Context" button will trigger a new IPC message, `RequestFlattenContext`, sending the array of selected file paths to the backend.
    -   A new handler in the backend will receive this list, read the content of each file, and then use the logic from `bootstrap-flattener.js` to generate the final `flattened_repo.md` file.
</file>

<file path="src/Artifacts/A3. DCE - Technical Scaffolding Plan.md">
# Artifact A3: DCE - Technical Scaffolding Plan
# Date Created: Cycle 1
# Author: AI Model
# Updated on: Cycle 2 (Adopted architecture from `The-Creator-AI-main` repository)

## 1. Overview

This document outlines the technical scaffolding and file structure for the Data Curation Environment (DCE) VS Code extension.

**Major Update (Cycle 2):** The initial plan for a simple file structure has been superseded. We are officially adopting the mature and robust architecture of the `The-Creator-AI-main` reference repository as our project's blueprint. This provides a proven, scalable foundation for all three project phases.

## 2. Adopted File Structure

The project will adhere to the following directory structure, derived directly from the reference repository:

```
.
├── public/                     # Static assets for webviews (icons, css)
├── src/
│   ├── backend/                # Extension Host code (Node.js environment)
│   │   ├── commands/           # Command definitions and registration
│   │   ├── repositories/       # Data persistence logic (workspace state)
│   │   ├── services/           # Core backend services (LLM, FS, Git, etc.)
│   │   ├── types/              # TypeScript types for the backend
│   │   └── utils/              # Utility functions for the backend
│   │
│   ├── client/                 # Webview code (Browser environment)
│   │   ├── components/         # Generic, reusable React components (FileTree, Modal)
│   │   ├── modules/            # Feature-specific modules (Context, Plan)
│   │   ├── store/              # Global state management for webviews (RxJS)
│   │   └── views/              # Entry points for each webview panel
│   │
│   ├── common/                 # Code shared between backend and client
│   │   ├── constants/
│   │   ├── ipc/                # IPC channel definitions and managers
│   │   ├── types/              # Shared TypeScript types (FileNode)
│   │   └── utils/              # Shared utility functions (parse-json)
│   │
│   └── extension.ts            # Main entry point for the VS Code extension
│
├── package.json                # Extension manifest, dependencies, and scripts
├── tsconfig.json               # TypeScript configuration
├── webpack.config.js           # Webpack configuration for bundling client/server code
└── ... (config files like .eslintrc.json, .gitignore)
```

## 3. Key Architectural Concepts

-   **Separation of Concerns:** The structure strictly separates backend (Node.js) logic from frontend (React/webview) logic.
-   **Shared Code:** The `src/common/` directory is critical for sharing types and IPC definitions, ensuring type safety and consistency between the extension host and the webview.
-   **Service-Oriented Backend:** The `src/backend/services/` directory promotes modularity. Each service has a single responsibility (e.g., `FSService` for file operations, `LlmService` for AI interaction), making the system easier to maintain and test.
-   **Dependency Injection:** The `Services.ts` class acts as a simple injector, managing the instantiation and provision of backend services.
-   **Modular Frontend:** The `src/client/modules/` directory allows for building complex UIs by composing smaller, feature-focused modules.
-   **Component-Based UI:** The `src/client/components/` directory holds the fundamental building blocks of the UI, promoting reusability.
-   **Typed IPC Communication:** The use of `channels.enum.ts` and `channels.type.ts` in `src/common/ipc/` provides a strongly-typed and well-documented contract for communication between the webview and the extension host, reducing runtime errors.
</file>

<file path="src/Artifacts/A4. DCE - Analysis of The-Creator-AI Repo.md">
# Artifact A4: DCE - Analysis of The-Creator-AI Repo
# Date Created: Cycle 2
# Author: AI Model
- **Description:** Provides a detailed analysis of the `The-Creator-AI-main` reference repository, its architecture, and its mapping to the Data Curation Environment project goals.
- **Tags:** analysis, repository, architecture, vscode-extension, project-planning

## 1. Overview

The `The-Creator-AI-main` repository is a comprehensive and well-structured VS Code extension that functions as a sophisticated AI coding assistant. It utilizes a modern tech stack including TypeScript, React for webviews, and TailwindCSS for styling. Its architecture is service-oriented on the backend (extension host) and modular on the frontend (webview). The discovery of this repository provides a massive head-start for our project, as it contains pre-built solutions for many of our planned features.

## 2. Backend Architecture (Extension Host)

The backend, located primarily in `src/backend/`, follows a clean, service-oriented architecture.

-   **`extension.ts`**: The main entry point. It initializes services and registers the commands and webview providers.
-   **`services/`**: A directory containing distinct services for handling specific concerns:
    -   `LlmService.ts`: Manages interactions with multiple AI models (Gemini, OpenAI). It includes logic for API key management and prompt construction.
    -   `FSService.ts`: Handles all file system operations, including reading files, creating a file tree, and respecting `.gitignore`.
    -   `CodeService.ts`: Contains logic for applying code changes, parsing diffs, and generating code.
    -   `GitService.ts`: Provides an interface for Git operations, like committing changes.
    -   `MessageService.ts`: Orchestrates the flow of messages between the frontend and the LLM service.
    -   `PlanExImService.ts`: Manages exporting and importing of "Change Plans".
    -   `Services.ts`: A dependency injection container that initializes and provides access to all other services.
-   **`repositories/`**: Manages data persistence within the VS Code workspace state (e.g., `PersistentStoreRepository.ts`, `SettingsRepository.ts`).
-   **`commands/`**: Defines all the commands exposed by the extension in `package.json`.

## 3. Frontend Architecture (Webview)

The frontend, located in `src/client/`, is a React application bundled with Webpack.

-   **`views/`**: The application is divided into distinct views, each with its own entry point, state management, and logic (e.g., `change-plan.view`).
-   **`modules/`**: Contains reusable UI/logic modules that are composed into the main view, such as:
    -   `context.module/Context.tsx`: Renders the file explorer.
    -   `plan.module/Plan.tsx`: Handles displaying the AI-generated plan and user input.
-   **`components/`**: A collection of generic, reusable React components:
    -   `file-tree/FileTree.tsx`: A fully functional file tree component with checkbox selection, expansion state, and active file highlighting. This is directly applicable to our Phase 1 goal.
    -   `AutoResizingTextarea.tsx`, `Modal.tsx`, `ProgressSteps.tsx`: Other useful UI components.
-   **State Management**: Each view appears to have its own local store (`store/`), using RxJS `BehaviorSubject` for reactivity. This is a simple yet effective approach for managing state within a contained webview.
-   **IPC**: Communication with the backend is handled via a robust `ClientPostMessageManager` (`src/common/ipc/`) which defines clear channels for client-server interaction.

## 4. Mapping to DCE Project Goals

The reference repository provides solutions or strong foundations for all three of our project phases.

-   **Phase 1 (Context Chooser):** **Largely Complete.** The `FileTree.tsx` component in `src/client/components/file-tree/` combined with `FSService.ts` on the backend already provides the core functionality of a checkbox-based file explorer for context selection. Our work shifts from building this from scratch to adapting and integrating this existing, powerful component.

-   **Phase 2 (Parallel 'Co-pilot' Panel):** **Partially Complete.** The "Change Plan" view (`src/client/views/change-plan.view/`) is essentially a single "co-pilot" panel. It allows a user to describe a change, get an AI-generated plan, and interact with it. Our goal of *parallel* panels is not implemented, but the foundation for a single panel is incredibly strong.

-   **Phase 3 (Diff Tool):** **Not Present.** There is no integrated diff-viewing tool like WinMerge. However, the `CodeService.ts` *does* contain logic for parsing and applying diffs in a custom `<<<<<<< SEARCH` format, and the extension can trigger VS Code's native diff viewer (`git.openChange`).

## 5. Recommendations & Path Forward

1.  **Adopt the Architecture:** We should officially adopt the architecture of `The-Creator-AI-main` as the blueprint for our project. It is robust, scalable, and well-organized.
2.  **Focus on Adaptation:** Our immediate efforts for Phase 1 should be to isolate the `FileTree` component and its backend dependencies (`FSService.ts`) and ensure they can be used to generate the `flattened_repo.md` as originally specified.
3.  **De-risk Phase 2:** The "Change Plan" functionality is a perfect starting point for our parallel co-pilot. We should analyze its state management and IPC communication to understand how we might instantiate multiple, independent instances of it.
4.  **Update All Documentation:** All planning artifacts (`A1`, `A2`, `A3`) must be updated immediately to reflect this new context. Our plan has evolved from "build" to "analyze, adapt, and extend".
</file>

<file path="src/Artifacts/A5. DCE - Target File Structure.md">
# Artifact A5: DCE - Target File Structure
# Date Created: Cycle 3
# Author: AI Model

- **Description:** A text-based representation of the target file structure for the DCE extension, outlining the layout of directories and key files.
- **Tags:** file structure, architecture, project layout, scaffolding

## 1. Overview

This document provides a visual representation of the file structure that the `A6. DCE - Initial Scaffolding Deployment Script` will create. It is based on the robust and scalable architecture of the `The-Creator-AI-main` reference repository, as detailed in `A3. DCE - Technical Scaffolding Plan`.

## 2. File Tree

```
DCE/
├── .gitignore
├── .vscodeignore
├── package.json
├── tsconfig.json
├── webpack.config.js
├── public/
│   └── spiral.svg
└── src/
    ├── backend/
    │   ├── commands/
    │   │   ├── commands.ts
    │   │   └── register-commands.ts
    │   ├── repositories/
    │   │   └── persistent-store.repository.ts
    │   ├── services/
    │   │   ├── fs.service.ts
    │   │   ├── services.ts
    │   │   └── flattener.service.ts
    │   └── types/
    │       └── storage-keys.enum.ts
    │
    ├── client/
    │   ├── components/
    │   │   └── file-tree/
    │   │       ├── FileTree.tsx
    │   │       └── FileTree.utils.ts
    │   ├── views/
    │   │   ├── context-chooser.view/
    │   │   │   ├── index.ts
    │   │   │   ├── on-message.ts
    │   │   │   ├── view.scss
    │   │   │   └── view.tsx
    │   │   └── index.ts
    │   └── store/
    │       ├── store.ts
    │       └── useStore.ts
    │
    ├── common/
    │   ├── ipc/
    │   │   ├── channels.enum.ts
    │   │   ├── channels.type.ts
    │   │   ├── client-ipc.ts
    │   │   ├── get-vscode-api.ts
    │   │   └── server-ipc.ts
    │   ├── types/
    │   │   ├── file-node.ts
    │   │   └── vscode-webview.d.ts
    │   └── utils/
    │       └── view-html.ts
    │
    └── extension.ts
```
</file>

<file path="src/Artifacts/A6. DCE - Initial Scaffolding Deployment Script.md">
# Artifact A6: DCE - Initial Scaffolding Deployment Script
# Date Created: Cycle 3
# Author: AI Model
# Updated on: Cycle 10 (Fix problemMatcher in tasks.json to resolve F5 launch error)

- **Description:** Contains a Node.js script that, when executed, creates the entire initial directory structure and files for the DCE extension project.
- **Tags:** deployment, script, scaffolding, bootstrap, nodejs, automation

## 1. Overview

This artifact contains the `deploy_scaffold.js` script. Its purpose is to automate the creation of the initial project structure for the Data Curation Environment (DCE) VS Code extension. This eliminates the need for manual file creation and ensures a consistent setup based on our agreed-upon architecture, including the necessary configurations for debugging.

## 2. How to Use

1.  Save the code below as `deploy_scaffold.js` in your project's root directory (e.g., `C:\Projects\DCE\`).
2.  Open a terminal in that directory.
3.  Run the script using Node.js: `node deploy_scaffold.js`
4.  The script will create all the necessary directories and files, including the `.vscode` folder with `launch.json` and a corrected `tasks.json`, logging its progress to the console.

## 3. Script: `deploy_scaffold.js`

```javascript
const fs = require('fs').promises;
const path = require('path');

// --- File Content Definitions ---

const filesToCreate = [
    {
        path: 'package.json',
        content: `{
    "name": "data-curation-environment",
    "publisher": "DCE-Developer",
    "displayName": "Data Curation Environment",
    "description": "A VS Code extension for curating context for Large Language Models.",
    "version": "0.0.1",
    "engines": {
        "vscode": "^1.90.0"
    },
    "categories": [
        "Other"
    ],
    "activationEvents": [
        "onView:viewType.sidebar.contextChooser"
    ],
    "main": "./dist/extension.js",
    "contributes": {
        "viewsContainers": {
            "activitybar": [
                {
                    "id": "data-curation-environment",
                    "title": "Data Curation",
                    "icon": "public/spiral.svg"
                }
            ]
        },
        "views": {
            "data-curation-environment": [
                {
                    "type": "webview",
                    "id": "viewType.sidebar.contextChooser",
                    "name": "Context Chooser"
                }
            ]
        }
    },
    "scripts": {
        "vscode:prepublish": "npm run package",
        "compile": "webpack",
        "watch": "webpack --watch",
        "package": "webpack --mode production --devtool hidden-source-map",
        "lint": "eslint src --ext ts"
    },
    "devDependencies": {
        "@types/node": "18.x",
        "@types/vscode": "^1.90.0",
        "@typescript-eslint/eslint-plugin": "^7.7.1",
        "@typescript-eslint/parser": "^7.7.1",
        "eslint": "^8.57.0",
        "ts-loader": "^9.5.1",
        "typescript": "^5.4.5",
        "webpack": "^5.91.0",
        "webpack-cli": "^5.1.4",
        "copy-webpack-plugin": "^12.0.2",
        "style-loader": "^4.0.0",
        "css-loader": "^7.1.2",
        "sass-loader": "^16.0.1",
        "sass": "^1.78.0",
        "postcss-loader": "^8.1.1",
        "babel-loader": "^9.1.3",
        "@babel/preset-react": "^7.24.7",
        "@babel/preset-typescript": "^7.24.7",
        "process": "^0.11.10"
    },
    "dependencies": {
        "react": "^18.3.1",
        "react-dom": "^18.3.1",
        "react-icons": "^5.3.0",
        "rxjs": "^7.8.1",
        "reflect-metadata": "^0.2.2"
    }
}`
    },
    {
        path: 'tsconfig.json',
        content: `{
    "compilerOptions": {
        "module": "esnext",
        "moduleResolution": "node",
        "target": "ESNext",
        "lib": ["ES2022", "DOM"],
        "jsx": "react",
        "sourceMap": true,
        "rootDir": ".",
        "strict": false,
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        },
        "experimentalDecorators": true,
        "allowSyntheticDefaultImports": true
    },
    "include": ["src/**/*"]
}`
    },
    {
        path: 'webpack.config.js',
        content: `const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

/** @type {import('webpack').Configuration} */
const config = {
    target: 'node',
    mode: 'none',
    entry: {
        extension: './src/extension.ts',
        contextChooserView: './src/client/views/context-chooser.view/view.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        vscode: 'commonjs vscode'
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
        alias: {
            "@": path.resolve(__dirname, 'src'),
        }
    },
    module: {
        rules: [
            {
                test: /\\.ts$/,
                exclude: /node_modules/,
                use: [{ loader: 'ts-loader' }]
            },
            {
                test: /\\.?ts.?(x)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-typescript']
                    }
                }
            },
            {
                test: /\\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: "public", to: "public" }],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    devtool: 'nosources-source-map',
    infrastructureLogging: {
        level: "log",
    },
};
module.exports = [config];`
    },
    {
        path: '.gitignore',
        content: `node_modules
dist
out
*.vsix
.vscode-test/
.vscode/`
    },
    {
        path: '.vscodeignore',
        content: `node_modules
src
.gitignore
webpack.config.js
tsconfig.json
**/*.map
**/*.ts`
    },
    {
        path: '.vscode/launch.json',
        content: `{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Run Extension",
            "type": "extensionHost",
            "request": "launch",
            "args": ["--extensionDevelopmentPath=\${workspaceFolder}"],
            "outFiles": ["\${workspaceFolder}/dist/**/*.js"],
            "preLaunchTask": "npm: watch"
        }
    ]
}`
    },
    {
        path: '.vscode/tasks.json',
        content: `{
    "version": "2.0.0",
    "tasks": [
        {
            "type": "npm",
            "script": "watch",
            "isBackground": true,
            "presentation": {
                "reveal": "never"
            },
            "group": {
                "kind": "build",
                "isDefault": true
            },
            "problemMatcher": {
                "base": "$ts-webpack-watch",
                "background": {
                    "activeOnStart": true,
                    "beginsPattern": "Compilation starting...",
                    "endsPattern": "compiled successfully"
                }
            }
        }
    ]
}`
    },
    {
        path: 'public/spiral.svg',
        content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <g id="Page-1" stroke="none" fill="none" fill-rule="evenodd">
        <g id="dep" transform="translate(4, 6)">
            <path d="M100 100 m 0 -80 a 80 80 0 0 1 0 160 a 70 70 0 0 1 0 -140 a 60 60 0 0 1 0 120 a 50 50 0 0 1 0 -100 a 40 40 0 0 1 0 80 a 30 30 0 0 1 0 -60 a 20 20 0 0 1 0 40"
                fill="none" stroke="white" stroke-width="8" id="Shape" />
        </g>
    </g>
</svg>`
    },
    {
        path: 'src/extension.ts',
        content: `import * as vscode from "vscode";
import { registerViews } from "./client/views";
import { registerCommands } from "./backend/commands/register-commands";
import { Services } from "./backend/services/services";

let globalContext: vscode.ExtensionContext | null = null;

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "Data Curation Environment" is now active!');
    globalContext = context;

    Services.initialize();
    registerCommands(context);
    registerViews(context);
}

export function getContext() {
    if (!globalContext) {
        throw new Error("Extension context not available.");
    }
    return globalContext;
}

export function deactivate() {}`
    },
    {
        path: 'src/common/types/file-node.ts',
        content: `export interface FileNode {
    name: string;
    absolutePath: string;
    children?: FileNode[];
}`
    },
    {
        path: 'src/common/types/vscode-webview.d.ts',
        content: `export interface WebviewApi<StateType> {
    postMessage(message: unknown): void;
    getState(): StateType | undefined;
    setState<T extends StateType | undefined>(newState: T): T;
}

declare global {
    function acquireVsCodeApi<StateType = unknown>(): WebviewApi<StateType>;
}`
    },
    {
        path: 'src/common/ipc/channels.enum.ts',
        content: `export enum ClientToServerChannel {
    RequestFlattenContext = "clientToServer.requestFlattenContext",
    RequestWorkspaceFiles = "clientToServer.requestWorkspaceFiles",
}

export enum ServerToClientChannel {
    SendWorkspaceFiles = "serverToClient.sendWorkspaceFiles",
}`
    },
    {
        path: 'src/common/ipc/channels.type.ts',
        content: `import { FileNode } from "@/common/types/file-node";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";

export type ChannelBody<T extends ClientToServerChannel | ServerToClientChannel> =
    T extends ClientToServerChannel.RequestFlattenContext ? { selectedPaths: string[] } :
    T extends ClientToServerChannel.RequestWorkspaceFiles ? {} :
    T extends ServerToClientChannel.SendWorkspaceFiles ? { files: FileNode[] } :
    never;`
    },
    {
        path: 'src/common/ipc/get-vscode-api.ts',
        content: `import { WebviewApi } from "../types/vscode-webview";

let vscode: WebviewApi<unknown> | null = null;

const getVscode = () => {
    if (!vscode) {
        vscode = acquireVsCodeApi();
    }
    return vscode;
};

export default getVscode;`
    },
    {
        path: 'src/common/ipc/client-ipc.ts',
        content: `import getVscode from "./get-vscode-api";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { ChannelBody } from "./channels.type";

export class ClientPostMessageManager {
    private static _instance?: ClientPostMessageManager;
    private _listeners: {
        channel: ServerToClientChannel,
        callback: (body: ChannelBody<ServerToClientChannel>) => void
    }[];

    private constructor() {
        this._listeners = [];
        window.addEventListener('message', (event: MessageEvent) => {
            const data = event.data;
            this._listeners.forEach((listener) => {
                if (listener.channel === data.channel) {
                    listener.callback(data.body);
                }
            });
        });
    }

    static getInstance(): ClientPostMessageManager {
        if (!ClientPostMessageManager._instance) {
            ClientPostMessageManager._instance = new ClientPostMessageManager();
        }
        return ClientPostMessageManager._instance;
    }

    sendToServer<T extends ClientToServerChannel>(channel: T, body: ChannelBody<T>): void {
        getVscode().postMessage({ channel, body });
    }

    onServerMessage<T extends ServerToClientChannel>(channel: T, callback: (body: ChannelBody<T>) => void): void {
        this._listeners.push({ channel, callback: callback as any });
    }
}`
    },
    {
        path: 'src/common/ipc/server-ipc.ts',
        content: `import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { ChannelBody } from "./channels.type";

export class ServerPostMessageManager {
    private static _instance?: ServerPostMessageManager;
    private _listeners: {
        channel: ClientToServerChannel,
        callback: (body: ChannelBody<ClientToServerChannel>) => void
    }[];

    private constructor(
        private onMessage: (data: any) => void,
        private sendMessage: (message: any) => void
    ) {
        this._listeners = [];
        this.onMessage((data: any) => {
            this._listeners.forEach((listener) => {
                if (listener.channel === data.channel) {
                    listener.callback(data.body);
                }
            });
        });
    }

    static getInstance(onMessage?: (data: any) => void, sendMessage?: (message: any) => void) {
        if (onMessage && sendMessage) {
            ServerPostMessageManager._instance = new ServerPostMessageManager(onMessage, sendMessage);
        }
        if (!ServerPostMessageManager._instance) {
            throw new Error("ServerPostMessageManager not initialized");
        }
        return ServerPostMessageManager._instance;
    }

    sendToClient<T extends ServerToClientChannel>(channel: T, body: ChannelBody<T>): void {
        this.sendMessage({ channel, body });
    }

    onClientMessage<T extends ClientToServerChannel>(channel: T, callback: (body: ChannelBody<T>) => void): void {
        this._listeners.push({ channel, callback: callback as any });
    }
}`
    },
    {
        path: 'src/common/utils/view-html.ts',
        content: `import * as vscode from "vscode";

export function getViewHtml({ webview, nonce, scriptUri }: { webview: vscode.Webview; nonce: string; scriptUri: string; }): string {
    return \`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src \${webview.cspSource} 'unsafe-inline'; script-src 'nonce-\${nonce}';">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            <div id="root"></div>
            <script nonce="\${nonce}" src="\${scriptUri}"></script>
        </body>
        </html>\`;
}

function getNonce() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
export { getNonce };`
    },
    {
        path: 'src/client/views/index.ts',
        content: `import { viewConfig as contextChooserViewConfig } from "./context-chooser.view";
import * as vscode from "vscode";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { getNonce, getViewHtml } from "@/common/utils/view-html";

export const views = [contextChooserViewConfig];
export const serverIPCs: Record<string, ServerPostMessageManager> = {};

export function registerViews(context: vscode.ExtensionContext) {
    views.forEach((viewConfig) => {
        context.subscriptions.push(
            vscode.window.registerWebviewViewProvider(viewConfig.type, {
                resolveWebviewView: (webviewView) => {
                    webviewView.webview.options = {
                        enableScripts: true,
                        localResourceRoots: [context.extensionUri],
                    };
                    const nonce = getNonce();
                    webviewView.webview.html = getViewHtml({
                        webview: webviewView.webview,
                        nonce,
                        scriptUri: webviewView.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", viewConfig.entry)).toString(),
                    });
                    const serverIpc = ServerPostMessageManager.getInstance(
                        webviewView.webview.onDidReceiveMessage,
                        (data: any) => webviewView.webview.postMessage(data)
                    );
                    serverIPCs[viewConfig.type] = serverIpc;
                    viewConfig.handleMessage(serverIpc);
                },
            })
        );
    });
}`
    },
    {
        path: 'src/client/views/context-chooser.view/index.ts',
        content: `import { onMessage } from "./on-message";

export const viewConfig = {
    entry: "contextChooserView.js",
    type: "viewType.sidebar.contextChooser",
    handleMessage: onMessage,
};`
    },
    {
        path: 'src/client/views/context-chooser.view/on-message.ts',
        content: `import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ClientToServerChannel } from "@/common/ipc/channels.enum";
import { Services } from "@/backend/services/services";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const fsService = Services.fsService;
    const flattenerService = Services.flattenerService;

    serverIpc.onClientMessage(ClientToServerChannel.RequestWorkspaceFiles, () =>
        fsService.handleWorkspaceFilesRequest(serverIpc)
    );

    serverIpc.onClientMessage(ClientToServerChannel.RequestFlattenContext, (data) => {
        console.log("Flattening context for paths:", data.selectedPaths);
        flattenerService.flatten(data.selectedPaths);
    });
}`
    },
    {
        path: 'src/client/views/context-chooser.view/view.tsx',
        content: `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { FileNode } from '@/common/types/file-node';
import FileTree from '../../components/file-tree/FileTree';
import { useState, useEffect } from 'react';

const App = () => {
    const [files, setFiles] = useState<FileNode[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [activeFile, setActiveFile] = useState<string | undefined>();
    
    const clientIpc = ClientPostMessageManager.getInstance();

    useEffect(() => {
        clientIpc.sendToServer(ClientToServerChannel.RequestWorkspaceFiles, {});

        const handleFileResponse = ({ files: receivedFiles }: { files: FileNode[] }) => {
            setFiles(receivedFiles);
        };
        clientIpc.onServerMessage(ServerToClientChannel.SendWorkspaceFiles, handleFileResponse);

    }, [clientIpc]);

    const handleFileClick = (filePath: string) => {
        setActiveFile(filePath);
    };

    const updateSelectedFiles = (newSelectedFiles: string[]) => {
        setSelectedFiles(newSelectedFiles);
    };

    const handleFlattenClick = () => {
        clientIpc.sendToServer(ClientToServerChannel.RequestFlattenContext, { selectedPaths: selectedFiles });
    };

    return (
        <div className="view-container">
            <div className="view-header">
                <button className="flatten-button" onClick={handleFlattenClick}>
                    Flatten Context
                </button>
            </div>
            <div className="file-tree-container">
                {files.length > 0 ? (
                    files.map((rootNode, index) => (
                        <FileTree
                            key={index}
                            data={[rootNode]}
                            onFileClick={handleFileClick}
                            selectedFiles={selectedFiles}
                            updateSelectedFiles={updateSelectedFiles}
                            activeFile={activeFile}
                        />
                    ))
                ) : (
                    <div className="loading-message">Loading file tree...</div>
                )}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);`
    },
    {
        path: 'src/client/views/context-chooser.view/view.scss',
        content: `body {
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 13px;
    color: var(--vscode-editor-foreground);
    background-color: var(--vscode-sideBar-background);
}

.view-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.view-header {
    padding: 8px;
    border-bottom: 1px solid var(--vscode-panel-border);
}

.flatten-button {
    width: 100%;
    padding: 6px;
    border: 1px solid var(--vscode-button-border, var(--vscode-focusBorder));
    background-color: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
    cursor: pointer;
    border-radius: 2px;
}

.flatten-button:hover {
    background-color: var(--vscode-button-hoverBackground);
}

.file-tree-container {
    padding: 5px;
    flex-grow: 1;
    overflow-y: auto;
}

.loading-message {
    padding: 8px;
    color: var(--vscode-descriptionForeground);
}

.tree-view ul {
    padding-left: 0;
    list-style-type: none;
    margin: 0;
}

.treenode-li {
    padding-left: 20px;
    position: relative;
}

.treenode-item-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 1px 4px;
    border-radius: 3px;
}

.treenode-item-wrapper:hover {
    background-color: var(--vscode-list-hoverBackground);
}

.treenode-chevron {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
    transition: transform 0.1s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
}

.treenode-chevron.expanded {
    transform: translateY(-50%) rotate(90deg);
}

.file-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1px;
}

.file-item.active {
    background-color: var(--vscode-list-activeSelectionBackground);
    color: var(--vscode-list-activeSelectionForeground);
}

.file-checkbox {
    margin-right: 6px;
    cursor: pointer;
}

.file-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}`
    },
    {
        path: 'src/backend/commands/commands.ts',
        content: `// No commands are needed for now, but we'll keep the file for future use.
export const commands = [];`
    },
    {
        path: 'src/backend/commands/register-commands.ts',
        content: `import * as vscode from "vscode";
import { commands } from "./commands";

export function registerCommands(context: vscode.ExtensionContext) {
    commands.forEach(({ commandId, callback }) => {
        let disposable = vscode.commands.registerCommand(commandId, callback);
        context.subscriptions.push(disposable);
    });
}`
    },
    {
        path: 'src/backend/services/services.ts',
        content: `import "reflect-metadata";
import { FSService } from "./fs.service";
import { FlattenerService } from "./flattener.service";

// A simple container for services
class ServiceContainer {
    public fsService = new FSService();
    public flattenerService = new FlattenerService();
    
    public initialize() {
        // This can be used for service initialization logic in the future
    }
}

export const Services = new ServiceContainer();`
    },
    {
        path: 'src/backend/services/fs.service.ts',
        content: `import * as vscode from "vscode";
import * as path from "path";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { FileNode } from "@/common/types/file-node";

export class FSService {
    public async handleWorkspaceFilesRequest(serverIpc: ServerPostMessageManager) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [] });
            return;
        }
        
        // For simplicity, we'll just use the first workspace folder.
        const rootUri = workspaceFolders.uri;
        if (!rootUri) {
            // This case is unlikely if the above check passes, but good for safety.
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [] });
            return;
        }
        const rootPath = rootUri.fsPath;
        const files = await vscode.workspace.findFiles("**/*");
        const fileTree = this.createFileTree(rootPath, files);

        serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [fileTree] });
    }

    private createFileTree(rootPath: string, files: vscode.Uri[]): FileNode {
        const rootNode: FileNode = {
            name: path.basename(rootPath),
            absolutePath: rootPath,
            children: []
        };

        for (const file of files) {
            const relativePath = path.relative(rootPath, file.fsPath);
            const parts = relativePath.split(path.sep);
            let currentNode = rootNode;

            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                let childNode = currentNode.children?.find(c => c.name === part);

                if (!childNode) {
                    const newPath = path.join(currentNode.absolutePath, part);
                    childNode = { name: part, absolutePath: newPath };
                    if (i < parts.length - 1) {
                        childNode.children = [];
                    }
                    currentNode.children?.push(childNode);
                }
                currentNode = childNode;
            }
        }
        return rootNode;
    }
}`
    },
    {
        path: 'src/client/components/Checkbox.tsx',
        content: `import React from "react";
import { useEffect, useRef } from "react";

interface CheckboxProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'> {
    checked: boolean;
    indeterminate?: boolean;
    onChange: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: CheckboxProps) => {
    const { checked, onChange, indeterminate, ...rest } = props;
    const cRef = useRef<any>(null);

    useEffect(() => {
        if (cRef.current) {
            cRef.current.indeterminate = indeterminate;
        }
    }, [cRef, indeterminate]);

    return (
        <input type="checkbox" ref={cRef} checked={checked} onChange={(e) => onChange(e.target.checked, e)} {...rest} />
    );
};

export default Checkbox;`
    },
        {
        path: 'src/client/components/file-tree/FileTree.tsx',
        content: `import React, { useEffect, useState } from 'react';
import TreeView from '../tree-view/TreeView';
import { FileNode } from '@/common/types/file-node';
import { addRemovePathInSelectedFiles, getFileNodeByPath } from './FileTree.utils';
import Checkbox from '../Checkbox';

interface FileTreeProps {
  data: FileNode[];
  onFileClick?: (filePath: string) => void;
  selectedFiles: string[];
  activeFile?: string;
  updateSelectedFiles: (selectedFiles: string[]) => void;
}

const FileTree: React.FC<FileTreeProps> = ({
  data,
  onFileClick,
  selectedFiles,
  activeFile,
  updateSelectedFiles,
}) => {

  const rootNode = data.length > 0 ? data : null;

  const [expandedNodes, setExpandedNodes] = useState<string[]>(rootNode ? [rootNode.absolutePath] : []);

  useEffect(() => {
    const toExpand = new Set<string>();
    selectedFiles?.forEach((selectedFile) => {
        const node = getFileNodeByPath(data, selectedFile);
        if (node && node.children) {
            toExpand.add(node.absolutePath);
        }
    });

    setExpandedNodes(prevExpandedNodes => [...new Set([...prevExpandedNodes, ...Array.from(toExpand)])]);
  }, [selectedFiles, data]);

  const handleNodeClick = (e: React.MouseEvent<HTMLElement, MouseEvent> | undefined, node: FileNode) => {
    if (e && (e.target as HTMLElement)?.closest('.file-checkbox')) {
        return;
    }
    onFileClick && onFileClick(node.absolutePath);
  };

  const renderCheckbox = (path: string) => {
    const isSelected = selectedFiles.includes(path);
    const hasSelectedAncestor = selectedFiles.some(ancestor => path.startsWith(ancestor) && path !== ancestor);
    const hasSelectedDescendant = selectedFiles.some(descendant => descendant.startsWith(path) && descendant !== path);
    
    return (
      <Checkbox
        className="file-checkbox"
        indeterminate={!isSelected && !hasSelectedAncestor && hasSelectedDescendant}
        checked={isSelected || hasSelectedAncestor}
        onChange={(_, e) => handleFileCheckboxChange(e, path)}
      />
    );
  };

  const handleFileCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, path: string) => {
    e.stopPropagation();
    e.preventDefault();
    updateSelectedFiles(addRemovePathInSelectedFiles(data, path, selectedFiles));
  };

  const renderFileNodeContent = (node: FileNode) => {
    const isActive = activeFile === node.absolutePath;
    const isDirectory = Array.isArray(node.children);

    return (
      <div
        className={\`file-item \${isActive ? 'active' : ''} \${isDirectory ? 'directory' : 'file'}\`}
        onClick={(e) => handleNodeClick(e, node)}
      >
        {renderCheckbox(node.absolutePath)}
        <span className="file-name">{node.name}</span>
      </div>
    );
  };

  return (
    <div className="file-tree">
      <TreeView 
        data={data} 
        renderNodeContent={renderFileNodeContent} 
      />
    </div>
  );
};

export default FileTree;`
    },
    {
        path: 'src/client/components/file-tree/FileTree.utils.ts',
        content: `import { FileNode } from "@/common/types/file-node";

function getAllDescendantPaths(node: FileNode): string[] {
    let paths: string[] = [];
    if (node.children) {
        for (const child of node.children) {
            paths.push(child.absolutePath);
            paths = paths.concat(getAllDescendantPaths(child));
        }
    }
    return paths;
}

export const addRemovePathInSelectedFiles = (
  fileTree: FileNode[],
  path: string,
  selectedFiles: string[]
): string[] => {
    const node = getFileNodeByPath(fileTree, path);
    if (!node) return selectedFiles;

    const descendantPaths = getAllDescendantPaths(node);
    const isSelected = selectedFiles.includes(path);
    const hasSelectedAncestor = selectedFiles.some(ancestor => path.startsWith(ancestor) && path !== ancestor);
    
    let newSelectedFiles = [...selectedFiles];

    if (isSelected) {
        // Uncheck: remove this path and all its descendants
        newSelectedFiles = newSelectedFiles.filter(p => p !== path && !descendantPaths.includes(p));
    } else if (hasSelectedAncestor) {
        // Uncheck a child of an already checked folder.
        // 1. Remove the ancestor.
        // 2. Add all children of the ancestor EXCEPT the one that was unchecked.
        const ancestor = selectedFiles.find(ancestor => path.startsWith(ancestor) && path !== ancestor)!;
        const ancestorNode = getFileNodeByPath(fileTree, ancestor)!;
        
        newSelectedFiles = newSelectedFiles.filter(p => p !== ancestor);
        
        const siblingsAndCousins = getAllDescendantPaths(ancestorNode).filter(p => p !== path && !p.startsWith(path));
        newSelectedFiles.push(...siblingsAndCousins);

    } else {
        // Check: remove all descendants that might be individually selected, then add the parent path.
        newSelectedFiles = newSelectedFiles.filter(p => !p.startsWith(path));
        newSelectedFiles.push(path);
    }
  
  return [...new Set(newSelectedFiles)]; // Remove duplicates for cleanliness
};

export const getFileNodeByPath = (
  fileNodes: FileNode[],
  filePath: string
): FileNode | null => {
    for (const rootNode of fileNodes) {
        const found = findNode(rootNode, filePath);
        if (found) return found;
    }
    return null;
};

function findNode(node: FileNode, filePath: string): FileNode | null {
    if (node.absolutePath === filePath) {
        return node;
    }
    if (node.children && filePath.startsWith(node.absolutePath)) {
        for (const child of node.children) {
            const found = findNode(child, filePath);
            if(found) return found;
        }
    }
    return null;
}`
    },
    {
        path: 'src/client/components/tree-view/TreeView.tsx',
        content: `import React, { useState } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { getExpandedNodes } from './TreeView.utils';

export interface TreeNode {
    name: string;
    absolutePath: string;
    children?: TreeNode[];
    isExpanded?: boolean;
    [key: string]: any;
}

interface TreeViewProps {
    data: TreeNode[];
    onNodeClick?: (node: TreeNode) => void;
    renderNodeContent?: (node: TreeNode) => React.ReactNode;
}

const TreeView: React.FC<TreeViewProps> = ({ data, onNodeClick, renderNodeContent }) => {
    const [expandedNodes, setExpandedNodes] = useState<string[]>(getExpandedNodes(data));

    const handleNodeClick = (node: TreeNode) => {
        if (node.children && node.children.length > 0) {
            setExpandedNodes((prevExpandedNodes) => {
                const isExpanded = prevExpandedNodes.includes(node.absolutePath);
                return isExpanded
                    ? prevExpandedNodes.filter((n) => n !== node.absolutePath)
                    : [...prevExpandedNodes, node.absolutePath];
            });
        }
        onNodeClick && onNodeClick(node);
    };

    const renderTreeNodes = (nodes: TreeNode[]) => {
        return nodes.map((node) => {
            const isExpanded = expandedNodes.includes(node.absolutePath);
            const isDirectory = !!(node.children && node.children.length > 0);

            return (
                <li key={node.absolutePath} className="treenode-li">
                    <div
                        onClick={() => handleNodeClick(node)}
                        className={\`treenode-item-wrapper\`}
                    >
                        {isDirectory && (
                            <span
                                className={\`treenode-chevron \${isExpanded ? 'expanded' : ''}\`}
                            >
                                <MdChevronRight />
                            </span>
                        )}
                        {renderNodeContent ? renderNodeContent(node) : node.name}
                    </div>
                    {isDirectory && isExpanded && (
                        <ul className="treenode-children">{renderTreeNodes(node.children)}</ul>
                    )}
                </li>
            );
        });
    };

    return (
        <div className="tree-view">
            <ul>{renderTreeNodes(data)}</ul>
        </div>
    );
};

export default TreeView;`
    },
    {
        path: 'src/client/components/tree-view/TreeView.utils.ts',
        content: `import { TreeNode } from "./TreeView";

export const getExpandedNodes = (data: TreeNode[]): string[] => {
  return data.reduce((acc: string[], node) => {
    if (node.isExpanded) {
      acc.push(node.absolutePath);
    }
    if (node.children) {
      acc.push(...getExpandedNodes(node.children));
    }
    return acc;
  }, []);
};`
    },
    {
        path: 'src/backend/services/flattener.service.ts',
        content: `import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs/promises';

interface FileStats {
    filePath: string;
    lines: number;
    characters: number;
    tokens: number;
    content: string;
    error: string | null;
}

export class FlattenerService {

    public async flatten(selectedPaths: string[]) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            vscode.window.showErrorMessage("Cannot flatten context: No workspace folder is open.");
            return;
        }
        if (selectedPaths.length === 0) {
            vscode.window.showWarningMessage("Cannot flatten context: No files or folders are selected.");
            return;
        }

        const rootPath = workspaceFolders.uri.fsPath;
        const outputFilePath = path.join(rootPath, 'flattened_repo.md');

        try {
            const allFilePaths = await this.expandDirectories(selectedPaths);
            const uniqueFilePaths = [...new Set(allFilePaths)];

            const fileStatsPromises = uniqueFilePaths.map(filePath => this.getFileStatsAndContent(filePath));
            const results = await Promise.all(fileStatsPromises);

            const outputContent = this.generateOutputContent(results, rootPath, outputFilePath);

            await fs.writeFile(outputFilePath, outputContent, 'utf-8');
            vscode.window.showInformationMessage(\`Successfully flattened \${results.filter(r => !r.error).length} files to flattened_repo.md.\`);

        } catch (error: any) {
            vscode.window.showErrorMessage(\`Failed to flatten context: \${error.message}\`);
            console.error(error);
        }
    }

    private async expandDirectories(paths: string[]): Promise<string[]> {
        const allFiles: string[] = [];
        for (const p of paths) {
            try {
                const stats = await fs.stat(p);
                if (stats.isDirectory()) {
                    allFiles.push(...await this.getAllFilesRecursive(p));
                } else {
                    allFiles.push(p);
                }
            } catch (e) {
                console.warn(\`Could not stat path \${p}, skipping.\`);
            }
        }
        return allFiles;
    }

    private async getAllFilesRecursive(dirPath: string): Promise<string[]> {
        let files: string[] = [];
        try {
            const entries = await fs.readdir(dirPath, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path.join(dirPath, entry.name);
                if (entry.isDirectory()) {
                    files = files.concat(await this.getAllFilesRecursive(fullPath));
                } else {
                    files.push(fullPath);
                }
            }
        } catch (e) {
            console.error(\`Error reading directory \${dirPath}:\`, e);
        }
        return files;
    }

    private async getFileStatsAndContent(filePath: string): Promise<FileStats> {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            const lines = content.split('\\n').length;
            const characters = content.length;
            const tokens = Math.ceil(characters / 4);
            return { filePath, lines, characters, tokens, content, error: null };
        } catch (error: any) {
            return { filePath, lines: 0, characters: 0, tokens: 0, content: '', error: error.message };
        }
    }

    private generateOutputContent(results: FileStats[], rootDir: string, outputFilename: string): string {
        let totalLines = 0;
        let totalCharacters = 0;
        let totalTokens = 0;
        let errorCount = 0;
        const validResults = results.filter(r => !r.error);

        for (const res of validResults) {
            totalLines += res.lines;
            totalCharacters += res.characters;
            totalTokens += res.tokens;
        }

        let output = \`<!--\\n\`;
        output += \`  File: \${path.basename(outputFilename)}\\n\`;
        output += \`  Source Directory: \${rootDir}\\n\`;
        output += \`  Date Generated: \${new Date().toISOString()}\\n\`;
        output += \`  ---\\n\`;
        output += \`  Total Files: \${validResults.length}\\n\`;
        if (errorCount > 0) {
            output += \`  Files with Errors: \${errorCount}\\n\`;
        }
        output += \`  Total Lines: \${totalLines}\\n\`;
        output += \`  Total Characters: \${totalCharacters}\\n\`;
        output += \`  Approx. Tokens: \${totalTokens}\\n\`;
        output += \`-->\\n\\n\`;

        const top10 = [...validResults].sort((a, b) => b.tokens - a.tokens).slice(0, 10);

        output += \`<!-- Top 10 Files by Token Count -->\\n\`;
        top10.forEach((r, i) => {
            output += \`\${i + 1}. \${path.relative(rootDir, r.filePath)} (\${r.tokens} tokens)\\n\`;
        });
        output += \`\\n\`;

        output += \`<!-- Full File List -->\\n\`;
        results.forEach((r, i) => {
            const relativePath = path.relative(rootDir, r.filePath);
            if (r.error) {
                output += \`\${i + 1}. \${relativePath} - ERROR: \${r.error}\\n\`;
            } else {
                output += \`\${i + 1}. \${relativePath} - Lines: \${r.lines} - Chars: \${r.characters} - Tokens: \${r.tokens}\\n\`;
            }
        });
        output += \`\\n\`;

        for (const { filePath, content, error } of results) {
            const relativePath = path.relative(rootDir, filePath).replace(/\\\\/g, '/');
            output += \`<file path="\${relativePath}">\\n\`;
            if (error) {
                output += \`Error reading file: \${error}\\n\`;
            } else {
                output += content;
            }
            if (!content.endsWith('\\n')) {
                output += '\\n';
            }
            output += \`</file>\\n\\n\`;
        }
        return output;
    }
}`
    }
];

// --- Main Execution ---

async function deployScaffold() {
    console.log('Starting scaffold deployment...');
    const rootDir = process.cwd();

    for (const file of filesToCreate) {
        const fullPath = path.join(rootDir, file.path);
        const dir = path.dirname(fullPath);

        try {
            await fs.mkdir(dir, { recursive: true });
            await fs.writeFile(fullPath, file.content, 'utf-8');
            console.log(\`✅ Created: \${file.path}\`);
        } catch (error) {
            console.error(\`❌ Failed to create \${file.path}: \${error.message}\`);
        }
    }

    console.log('\\n🚀 Scaffold deployment complete! 🚀');
    console.log('Next steps:');
    console.log('1. Run `npm install` to install dependencies.');
    console.log('2. Press F5 in VS Code to start the extension (this will also run `npm run watch`).');
}

deployScaffold();
```
</file>

<file path="src/Artifacts/A7. DCE - Development and Testing Guide.md">
# Artifact A7: DCE - Development and Testing Guide
# Date Created: Cycle 7
# Author: AI Model
# Updated on: Cycle 9 (Revised workflow to use integrated debugger configuration)

- **Description:** A step-by-step guide explaining how to run, debug, and test the DCE extension within VS Code using the Extension Development Host.
- **Tags:** development, testing, debugging, workflow, vs code extension, f5, launch.json

## 1. Purpose

This guide provides the correct and simplified procedure for running and testing the Data Curation Environment (DCE) extension locally. Following these steps is crucial to see your changes and the extension's UI in action.

## 2. The Core Concept: The Extension Development Host

You cannot see the extension's UI (like the spiral icon or the custom panel) in the same VS Code window where you are writing the code. Instead, you must launch a special, separate VS Code window called the **Extension Development Host**. This new window has your extension installed and running, allowing you to test it as a user would.

Our project now includes the necessary `.vscode/launch.json` and `.vscode/tasks.json` files to make this process seamless.

## 3. Step-by-Step Workflow

Follow these steps every time you want to test the extension:

### Step 1: Open the "Run and Debug" View

In your main project window (e.g., `C:\Projects\DCE`), navigate to the "Run and Debug" panel in the activity bar on the left. The icon looks like a play button with a bug on it.

### Step 2: Launch the Extension

At the top of the "Run and Debug" panel, you will see a dropdown menu. It should already have **"Run Extension"** selected.

Simply press the **F5** key or click the green play button next to the "Run Extension" dropdown.

This single action will now:
1.  Automatically start the `npm run watch` task in the background to compile your code.
2.  Launch the new **"[Extension Development Host]"** VS Code window.

### Step 3: Find the Extension UI

In the newly opened **Extension Development Host** window, look at the activity bar on the far left. You should now see our spiral icon. Clicking this icon will open the "Context Chooser" panel, where you'll see the file tree with checkboxes.

### Step 4: Making and Viewing Changes

1.  **Make Code Changes:** Edit the source code in your **original** project window.
2.  **Auto-Compile:** When you save a file, the `npm run watch` task (which was started automatically) will recompile it. You can see its progress in the terminal panel of your original window.
3.  **Reload the Host:** To see your changes, go to the **Extension Development Host** window (the one you launched with F5) and reload it. The easiest way is to open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and run the command **`Developer: Reload Window`**.

You only need to stop the debugger (Shift+F5) and restart it (F5) if you make changes to configuration files like `package.json`. For all other code changes, simply reloading the host window is sufficient and much faster.
</file>

<file path="src/Artifacts/A8. DCE - Phase 1 - Selection Sets Feature Plan.md">
# Artifact A8: DCE - Phase 1 - Selection Sets Feature Plan
# Date Created: Cycle 11
# Author: AI Model

- **Description:** A plan outlining the user stories, UI/UX, and technical implementation for saving and loading different sets of selected files (selection profiles).
- **Tags:** feature plan, selection sets, profiles, context management, phase 1

## 1. Overview & Goal

The goal of the "Selection Sets" feature is to address the user feedback from Cycle 11 regarding the need to save and switch between different file selections. Users often work on multiple tasks or projects concurrently, each requiring a different context. Manually re-selecting dozens of files each time they switch tasks is tedious and inefficient. This feature will allow users to save a named "set" of their current selections and quickly load it back later.

## 2. User Stories

| ID | User Story | Acceptance Criteria |
|---|---|---|
| US-01 | **Save Current Selection** | As a developer, I want to save my currently checked files as a named set, so I don't have to re-select them manually when I switch tasks. | - A UI element (e.g., button or menu item) exists to "Save current selection". <br> - Clicking it prompts me to enter a name for the selection set. <br> - After providing a name, the current list of selected file paths is saved. <br> - I receive a confirmation that the set was saved. |
| US-02 | **Load a Saved Selection** | As a developer, I want to load a previously saved selection set, so I can quickly restore a specific context. | - A UI element (e.g., a dropdown menu) lists all saved selection sets by name. <br> - Selecting a set from the list immediately updates the file tree, checking all the files and folders from that set. <br> - Any previously checked files that are not part of the loaded set become unchecked. |
| US-03 | **Delete a Saved Selection** | As a developer, I want to delete a selection set that I no longer need, so I can keep my list of saved sets clean. | - A UI element exists to manage or delete saved sets. <br> - I can select a set to delete from a list. <br> - I am asked to confirm the deletion. <br> - Upon confirmation, the set is removed from the list of saved sets. |

## 3. Proposed UI/UX

The most efficient place for this functionality is within the `view-header` of our Context Chooser panel.

1.  **Header Controls:**
    *   A dropdown menu will be added to the header, perhaps next to the "Flatten Context" button.
    *   The dropdown's default text will be "Selection Sets".
    *   The dropdown will contain:
        *   A list of currently saved selection sets.
        *   A separator.
        *   An action item: "Save Current Selection..."
        *   An action item: "Manage Selections..."

2.  **Saving a Set:**
    *   Clicking "Save Current Selection..." will trigger a VS Code input box (`vscode.window.showInputBox`).
    *   The user will enter a name (e.g., "API Feature", "Frontend Refactor").
    *   On submission, the backend saves the current `selectedFiles` array under that name.

3.  **Loading a Set:**
    *   Clicking on a saved set's name in the dropdown will immediately trigger an IPC message to the frontend with the array of file paths for that set.
    *   The frontend will update its `selectedFiles` state, causing the tree to re-render with the new selections.

4.  **Managing Sets:**
    *   Clicking "Manage Selections..." will open a Quick Pick list (`vscode.window.showQuickPick`).
    *   The list will show all saved sets. Each item will have a trash can icon next to it.
    *   Selecting an item will prompt for confirmation and then delete the set.

## 4. Technical Implementation Plan

1.  **Data Storage:**
    *   Selection sets will be stored in the VS Code `workspaceState`. This is a key-value store specific to the current workspace.
    *   A single key, e.g., `dce.selectionSets`, will hold an object where keys are the set names and values are the `string[]` of absolute file paths.
    *   Example: `{ "API Feature": ["/path/to/api.ts", "/path/to/service.ts"], "UI Bugfix": ["/path/to/component.tsx"] }`

2.  **IPC Channels (New/Updated):**
    *   **Client -> Server:**
        *   `RequestSelectionSets`: Sent on view load to populate the dropdown.
        *   `SaveSelectionSet`: Sent with `{ name: string, paths: string[] }`.
        *   `DeleteSelectionSet`: Sent with `{ name: string }`.
    *   **Server -> Client:**
        *   `SendSelectionSets`: Sent with the entire map of saved sets.
        *   `LoadSelectionSet`: Sent with a single `{ paths: string[] }` to update the view's state.

3.  **Backend Logic (`on-message.ts` & new Service):**
    *   Create a new `SelectionService.ts` to encapsulate all logic for getting, setting, and deleting sets from `workspaceState`.
    *   Update `on-message.ts` to handle the new IPC messages and call the appropriate methods in `SelectionService`.
    *   The `LoadSelectionSet` message will be sent from the backend to the client after a user selects a set to load from the UI (which would be handled by a command). A command would be better for showing the Quick Pick UI.

4.  **Frontend Logic (`view.tsx`):**
    *   Add state to store the map of selection sets: `const [selectionSets, setSelectionSets] = useState({});`
    *   On mount, send `RequestSelectionSets`.
    *   Implement an effect to listen for `SendSelectionSets` and update the local state.
    *   Implement an effect to listen for `LoadSelectionSet` and call `setSelectedFiles()` with the new paths.
    *   Render the new dropdown menu in the header.
    *   Implement the `onClick` handler for "Save Current Selection..." which will trigger the `SaveSelectionSet` message.
</file>

<file path="src/Artifacts/A9. DCE - GitHub Repository Setup Guide.md">
# Artifact A9: DCE - GitHub Repository Setup Guide
# Date Created: Cycle 12
# Author: AI Model

- **Description:** A step-by-step guide with the necessary git commands to initialize the project as a local repository and push it to a new remote repository on GitHub.
- **Tags:** git, github, version control, setup, repository

## 1. Overview

This guide provides the necessary commands to turn your local project folder into a Git repository and link it to a new, empty repository on GitHub.

## 2. Prerequisites

*   You have `git` installed on your machine.
*   You have a GitHub account.
*   Your GitHub username is `dgerabagi`.

## 3. Step-by-Step Instructions

### Step 1: Create a New Repository on GitHub

1.  Go to [github.com](https://github.com) and log in.
2.  In the top-right corner, click the `+` icon and select **"New repository"**.
3.  **Repository name:** A good name would be `data-curation-environment` or `vscode-dce-extension`.
4.  **Description:** (Optional) "A VS Code extension for curating context for Large Language Models."
5.  Choose **"Private"** or **"Public"** based on your preference.
6.  **IMPORTANT:** Do **not** initialize the repository with a `README`, `.gitignore`, or `license`. We will be pushing our existing files, and this will prevent conflicts.
7.  Click **"Create repository"**.

GitHub will now show you a page with several command-line instructions. We will use the section titled **"...or push an existing repository from the command line"**.

### Step 2: Initialize Git in Your Local Project

Open a terminal (like the one integrated into VS Code) and navigate to your project's root directory (e.g., `C:\Projects\DCE`). Then, run the following commands one by one.

1.  **Initialize the repository:** This creates a new `.git` subdirectory in your project folder.
    ```bash
    git init
    ```

2.  **Add all existing files to the staging area:** The `.` adds all files in the current directory and subdirectories.
    ```bash
    git add .
    ```

3.  **Create the first commit:** This saves the staged files to the repository's history.
    ```bash
    git commit -m "Initial commit"
    ```

4.  **Rename the default branch to `main`:** This is the modern standard, replacing the older `master`.
    ```bash
    git branch -M main
    ```

### Step 3: Link and Push to GitHub

Now, you will link your local repository to the empty one you created on GitHub.

1.  **Add the remote repository:** Replace the URL with the one from your GitHub repository page. It should look like the example below.
    ```bash
    git remote add origin https://github.com/dgerabagi/data-curation-environment.git
    ```

2.  **Push your local `main` branch to GitHub:** The `-u` flag sets the upstream remote so that in the future, you can simply run `git push`.
    ```bash
    git push -u origin main
    ```

After these commands complete, refresh your GitHub repository page. You should see all of your project files. You have successfully created and linked your repository!
```
</file>

<file path="src/backend/commands/commands.ts">
import * as vscode from 'vscode';
import { Services } from '../services/services';
import { serverIPCs } from '@/client/views';
import { ServerToClientChannel } from '@/common/ipc/channels.enum';
import { VIEW_TYPES } from '@/common/view-types';

export const commands = [
    {
        commandId: 'dce.saveSelectionSet',
        callback: async (selectedPaths: string[]) => {
            const name = await vscode.window.showInputBox({
                prompt: 'Enter a name for the selection set',
                placeHolder: 'e.g., "API Feature" or "Frontend Refactor"'
            });
            if (name) {
                await Services.selectionService.saveSelectionSet(name, selectedPaths);
                // Refresh the list in the webview
                const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
                if(serverIpc) {
                    serverIpc.sendToClient(ServerToClientChannel.SendSelectionSets, { sets: Services.selectionService.getSelectionSets() });
                }
            }
        }
    },
    {
        commandId: 'dce.loadSelectionSet',
        callback: async (name: string) => {
            const sets = Services.selectionService.getSelectionSets();
            const paths = sets[name];
            if (paths) {
                const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
                if(serverIpc) {
                    serverIpc.sendToClient(ServerToClientChannel.ApplySelectionSet, { paths });
                    vscode.window.showInformationMessage(`Loaded selection set '${name}'.`);
                }
            }
        }
    },
    {
        commandId: 'dce.deleteSelectionSet',
        callback: async () => {
            const sets = Services.selectionService.getSelectionSets();
            const setNames = Object.keys(sets);
            if (setNames.length === 0) {
                vscode.window.showInformationMessage("No selection sets to delete.");
                return;
            }
            const setToDelete = await vscode.window.showQuickPick(setNames, {
                placeHolder: 'Select a selection set to delete'
            });

            if (setToDelete) {
                await Services.selectionService.deleteSelectionSet(setToDelete);
                 // Refresh the list in the webview
                 const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
                 if(serverIpc) {
                     serverIpc.sendToClient(ServerToClientChannel.SendSelectionSets, { sets: Services.selectionService.getSelectionSets() });
                 }
            }
        }
    }
];
</file>

<file path="src/backend/commands/register-commands.ts">
import * as vscode from "vscode";
import { commands } from "./commands";

export function registerCommands(context: vscode.ExtensionContext) {
    commands.forEach(({ commandId, callback }) => {
        let disposable = vscode.commands.registerCommand(commandId, callback);
        context.subscriptions.push(disposable);
    });
}
</file>

<file path="src/backend/services/flattener.service.ts">
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs/promises';

interface FileStats {
    filePath: string;
    lines: number;
    characters: number;
    tokens: number;
    content: string;
    error: string | null;
}

export class FlattenerService {

    public async flatten(selectedPaths: string[]) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            vscode.window.showErrorMessage("Cannot flatten context: No workspace folder is open.");
            return;
        }
        if (selectedPaths.length === 0) {
            vscode.window.showWarningMessage("Cannot flatten context: No files or folders are selected.");
            return;
        }

        const rootPath = workspaceFolders[0].uri.fsPath;
        const outputFilePath = path.join(rootPath, 'flattened_repo.md');

        try {
            const allFilePaths = await this.expandDirectories(selectedPaths);
            const uniqueFilePaths = [...new Set(allFilePaths)];

            const fileStatsPromises = uniqueFilePaths.map(filePath => this.getFileStatsAndContent(filePath));
            const results = await Promise.all(fileStatsPromises);

            const outputContent = this.generateOutputContent(results, rootPath, outputFilePath);

            await fs.writeFile(outputFilePath, outputContent, 'utf-8');
            vscode.window.showInformationMessage(`Successfully flattened ${results.filter(r => !r.error).length} files to flattened_repo.md.`);

        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to flatten context: ${error.message}`);
            console.error(error);
        }
    }

    private async expandDirectories(paths: string[]): Promise<string[]> {
        const allFiles: string[] = [];
        for (const p of paths) {
            try {
                const stats = await fs.stat(p);
                if (stats.isDirectory()) {
                    allFiles.push(...await this.getAllFilesRecursive(p));
                } else {
                    allFiles.push(p);
                }
            } catch (e) {
                console.warn(`Could not stat path ${p}, skipping.`);
            }
        }
        return allFiles;
    }

    private async getAllFilesRecursive(dirPath: string): Promise<string[]> {
        let files: string[] = [];
        try {
            const entries = await fs.readdir(dirPath, { withFileTypes: true });
            for (const entry of entries) {
                const fullPath = path.join(dirPath, entry.name);
                if (entry.isDirectory()) {
                    files = files.concat(await this.getAllFilesRecursive(fullPath));
                } else {
                    files.push(fullPath);
                }
            }
        } catch (e) {
            console.error(`Error reading directory ${dirPath}:`, e);
        }
        return files;
    }

    private async getFileStatsAndContent(filePath: string): Promise<FileStats> {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            const lines = content.split('\n').length;
            const characters = content.length;
            const tokens = Math.ceil(characters / 4);
            return { filePath, lines, characters, tokens, content, error: null };
        } catch (error: any) {
            return { filePath, lines: 0, characters: 0, tokens: 0, content: '', error: error.message };
        }
    }

    private generateOutputContent(results: FileStats[], rootDir: string, outputFilename: string): string {
        let totalLines = 0;
        let totalCharacters = 0;
        let totalTokens = 0;
        let errorCount = 0;
        const validResults = results.filter(r => !r.error);

        for (const res of validResults) {
            totalLines += res.lines;
            totalCharacters += res.characters;
            totalTokens += res.tokens;
        }

        let output = `<!--\n`;
        output += `  File: ${path.basename(outputFilename)}\n`;
        output += `  Source Directory: ${rootDir}\n`;
        output += `  Date Generated: ${new Date().toISOString()}\n`;
        output += `  ---\n`;
        output += `  Total Files: ${validResults.length}\n`;
        if (errorCount > 0) {
            output += `  Files with Errors: ${errorCount}\n`;
        }
        output += `  Total Lines: ${totalLines}\n`;
        output += `  Total Characters: ${totalCharacters}\n`;
        output += `  Approx. Tokens: ${totalTokens}\n`;
        output += `-->\n\n`;

        const top10 = [...validResults].sort((a, b) => b.tokens - a.tokens).slice(0, 10);

        output += `<!-- Top 10 Files by Token Count -->\n`;
        top10.forEach((r, i) => {
            output += `${i + 1}. ${path.relative(rootDir, r.filePath)} (${r.tokens} tokens)\n`;
        });
        output += `\n`;

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

        for (const { filePath, content, error } of results) {
            const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/');
            output += `<file path="${relativePath}">\n`;
            if (error) {
                output += `Error reading file: ${error}\n`;
            } else {
                output += content;
            }
            if (!content.endsWith('\n')) {
                output += '\n';
            }
            output += `</file>\n\n`;
        }
        return output;
    }
}
</file>

<file path="src/backend/services/fs.service.ts">
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs/promises";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { FileNode } from "@/common/types/file-node";

const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp', '.ico']);

export class FSService {

    private async getFileStats(filePath: string): Promise<{ tokenCount: number, sizeInBytes: number, isImage: boolean }> {
        try {
            const extension = path.extname(filePath).toLowerCase();
            const stats = await fs.stat(filePath);

            if (stats.isDirectory()) {
                return { tokenCount: 0, sizeInBytes: 0, isImage: false };
            }

            const isImage = IMAGE_EXTENSIONS.has(extension);
            if (isImage) {
                return { tokenCount: 0, sizeInBytes: stats.size, isImage: true };
            }

            // Ignore very large files to prevent performance issues
            if (stats.size > 2_000_000) { 
                return { tokenCount: 0, sizeInBytes: stats.size, isImage: false };
            }
            
            const content = await fs.readFile(filePath, 'utf-8');
            // Simple approximation: 1 token ~ 4 characters
            const tokenCount = Math.ceil(content.length / 4);
            return { tokenCount, sizeInBytes: stats.size, isImage: false };

        } catch (error) {
            // Could be a binary file or permissions issue
            return { tokenCount: 0, sizeInBytes: 0, isImage: false };
        }
    }

    public async handleWorkspaceFilesRequest(serverIpc: ServerPostMessageManager) {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [] });
            return;
        }
        
        const rootUri = workspaceFolders[0].uri;
        if (!rootUri) {
            serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [] });
            return;
        }
        const rootPath = rootUri.fsPath;
        // Updated to correctly exclude node_modules
        const files = await vscode.workspace.findFiles("**/*", '**/node_modules/**');
        const fileTree = await this.createFileTree(rootPath, files);

        serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, { files: [fileTree] });
    }

    private async createFileTree(rootPath: string, files: vscode.Uri[]): Promise<FileNode> {
        const rootNode: FileNode = {
            name: path.basename(rootPath),
            absolutePath: rootPath,
            children: [],
            tokenCount: 0,
            fileCount: 0,
            isImage: false,
            sizeInBytes: 0,
        };

        for (const file of files) {
            const relativePath = path.relative(rootPath, file.fsPath);
            // Use forward slashes for consistency, preventing `path.sep` issues on client
            const parts = relativePath.replace(/\\/g, '/').split('/');
            let currentNode = rootNode;

            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                if (!part) continue; // Skip empty parts from leading slashes etc.
                
                let childNode = currentNode.children?.find(c => c.name === part);

                if (!childNode) {
                    const newPath = path.join(currentNode.absolutePath, part);
                    const isDirectory = i < parts.length - 1;
                    const stats = isDirectory ? { tokenCount: 0, sizeInBytes: 0, isImage: false } : await this.getFileStats(newPath);

                    childNode = { 
                        name: part, 
                        absolutePath: newPath,
                        tokenCount: stats.tokenCount,
                        sizeInBytes: stats.sizeInBytes,
                        isImage: stats.isImage,
                        fileCount: isDirectory ? 0 : 1
                    };

                    if (isDirectory) {
                        childNode.children = [];
                    }
                    currentNode.children?.push(childNode);
                }
                currentNode = childNode;
            }
        }
        
        // Post-process to calculate folder stats and sort
        this.processNode(rootNode);

        return rootNode;
    }

    private processNode(node: FileNode): void {
        if (!node.children) {
            return;
        }

        // Recursively process children first
        for (const child of node.children) {
            this.processNode(child);
        }

        // Sort children: folders first, then files, then alphabetically
        node.children.sort((a, b) => {
            const aIsFolder = !!a.children;
            const bIsFolder = !!b.children;
            if (aIsFolder !== bIsFolder) {
                return aIsFolder ? -1 : 1;
            }
            return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
        });
        
        // Calculate totals for the current node
        let totalTokens = 0;
        let totalFiles = 0;
        let totalBytes = 0;
        for (const child of node.children) {
            totalTokens += child.tokenCount;
            totalFiles += child.fileCount;
            totalBytes += child.sizeInBytes;
        }
        node.tokenCount = totalTokens;
        node.fileCount = totalFiles;
        node.sizeInBytes = totalBytes;
    }
}
</file>

<file path="src/backend/services/selection.service.ts">
import * as vscode from 'vscode';
import { getContext } from '@/extension';

const SELECTION_SETS_KEY = 'dce.selectionSets';

export interface SelectionSet {
    [name: string]: string[];
}

export class SelectionService {
    
    private get context(): vscode.ExtensionContext {
        return getContext();
    }

    public getSelectionSets(): SelectionSet {
        return this.context.workspaceState.get<SelectionSet>(SELECTION_SETS_KEY, {});
    }

    public async saveSelectionSet(name: string, paths: string[]): Promise<void> {
        if (!name) {
            vscode.window.showErrorMessage("Selection set name cannot be empty.");
            return;
        }
        const sets = this.getSelectionSets();
        sets[name] = paths;
        await this.context.workspaceState.update(SELECTION_SETS_KEY, sets);
        vscode.window.showInformationMessage(`Selection set '${name}' saved.`);
    }

    public async deleteSelectionSet(name: string): Promise<void> {
        const sets = this.getSelectionSets();
        if (sets[name]) {
            delete sets[name];
            await this.context.workspaceState.update(SELECTION_SETS_KEY, sets);
            vscode.window.showInformationMessage(`Selection set '${name}' deleted.`);
        }
    }
}
</file>

<file path="src/backend/services/services.ts">
import "reflect-metadata";
import { FSService } from "./fs.service";
import { FlattenerService } from "./flattener.service";
import { SelectionService } from "./selection.service";

// A simple container for services
class ServiceContainer {
    public fsService = new FSService();
    public flattenerService = new FlattenerService();
    public selectionService = new SelectionService();
    
    public initialize() {
        // This can be used for service initialization logic in the future
    }
}

export const Services = new ServiceContainer();
</file>

<file path="src/client/components/Checkbox.tsx">
import React from "react";
import { useEffect, useRef } from "react";

interface CheckboxProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'> {
    checked: boolean;
    indeterminate?: boolean;
    onChange: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: CheckboxProps) => {
    const { checked, onChange, indeterminate, ...rest } = props;
    const cRef = useRef<any>(null);

    useEffect(() => {
        if (cRef.current) {
            cRef.current.indeterminate = indeterminate;
        }
    }, [cRef, indeterminate]);

    return (
        <input type="checkbox" ref={cRef} checked={checked} onChange={(e) => onChange(e.target.checked, e)} {...rest} />
    );
};

export default Checkbox;
</file>

<file path="src/client/components/file-tree/FileTree.tsx">
import React from 'react';
import TreeView from '../tree-view/TreeView';
import { FileNode } from '@/common/types/file-node';
import { addRemovePathInSelectedFiles } from './FileTree.utils';
import Checkbox from '../Checkbox';
import {
    VscFile, VscFolder, VscFolderOpened, VscJson, VscMarkdown, VscSymbolFile, VscSymbolNumeric, VscFiles
} from 'react-icons/vsc';
import { SiTypescript, SiReact, SiJavascript, SiSass } from 'react-icons/si';
import { formatLargeNumber, formatBytes, formatNumberWithCommas } from '@/common/utils/formatting';

interface FileTreeProps {
  data: FileNode[];
  onFileClick?: (filePath: string) => void;
  selectedFiles: string[];
  activeFile?: string;
  updateSelectedFiles: (selectedFiles: string[]) => void;
}

const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
        case 'ts':
            return <SiTypescript color="#3178C6" />;
        case 'tsx':
            return <SiReact color="#61DAFB" />;
        case 'js':
            return <SiJavascript color="#F7DF1E" />;
        case 'json':
            return <VscJson color="#F7DF1E" />;
        case 'md':
            return <VscMarkdown />;
        case 'scss':
        case 'css':
            return <SiSass color="#CF649A"/>;
        case 'svg':
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'ico':
        case 'webp':
            return <VscSymbolFile />;
        default:
            return <VscFile />;
    }
};

const FileTree: React.FC<FileTreeProps> = ({
  data,
  onFileClick,
  selectedFiles,
  activeFile,
  updateSelectedFiles,
}) => {

  const handleNodeClick = (node: FileNode) => {
    if (!node.children) { // Only trigger onFileClick for files
        onFileClick?.(node.absolutePath);
    }
  };

  const isChildPathOf = (child: string, parent: string) => {
    if (child === parent) return false;
    return child.startsWith(parent + '/') || child.startsWith(parent + '\\');
  };

  const renderCheckbox = (filePath: string) => {
    const isSelected = selectedFiles.includes(filePath);
    const hasSelectedAncestor = selectedFiles.some(ancestor => isChildPathOf(filePath, ancestor));
    const hasSelectedDescendant = selectedFiles.some(descendant => isChildPathOf(descendant, filePath));
    
    return (
      <Checkbox
        className="file-checkbox"
        indeterminate={!isSelected && !hasSelectedAncestor && hasSelectedDescendant}
        checked={isSelected || hasSelectedAncestor}
        onChange={(_, e) => handleFileCheckboxChange(e, filePath)}
      />
    );
  };

  const handleFileCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, filePath: string) => {
    e.stopPropagation(); // CRITICAL: This prevents the click from bubbling up to the tree node's expansion handler.
    updateSelectedFiles(addRemovePathInSelectedFiles(data, filePath, selectedFiles));
  };

  const renderFileNodeContent = (node: FileNode, isExpanded: boolean) => {
    const isActive = activeFile === node.absolutePath;
    const isDirectory = Array.isArray(node.children);

    return (
      <div className={`file-item ${isActive ? 'active' : ''}`}>
        {renderCheckbox(node.absolutePath)}
        <span className="file-icon">
            {isDirectory ? (isExpanded ? <VscFolderOpened /> : <VscFolder />) : getFileIcon(node.name)}
        </span>
        <span className="file-name">{node.name}</span>
        <div className="file-stats">
            {isDirectory && node.fileCount > 0 && (
                <>
                    <VscFiles />
                    <span>{formatNumberWithCommas(node.fileCount)}</span>
                </>
            )}
            {node.isImage ? (
                <span>{formatBytes(node.sizeInBytes)}</span>
            ) : (
                node.tokenCount > 0 && (
                    <>
                        <VscSymbolNumeric />
                        <span>{formatLargeNumber(node.tokenCount, 1)}</span>
                    </>
                )
            )}
        </div>
      </div>
    );
  };

  return (
    <div className="file-tree">
      <TreeView 
        data={data} 
        onNodeClick={handleNodeClick}
        renderNodeContent={(node, isExpanded) => renderFileNodeContent(node, isExpanded as boolean)} 
      />
    </div>
  );
};

export default FileTree;
</file>

<file path="src/client/components/file-tree/FileTree.utils.ts">
import { FileNode } from "@/common/types/file-node";

function getAllDescendantPaths(node: FileNode): string[] {
    let paths: string[] = [];
    if (node.children) {
        for (const child of node.children) {
            paths.push(child.absolutePath);
            paths = paths.concat(getAllDescendantPaths(child));
        }
    }
    return paths;
}

function findNode(node: FileNode, filePath: string): FileNode | null {
    if (node.absolutePath === filePath) {
        return node;
    }
    // Use startsWith and a path separator to avoid partial matches (e.g., 'src' matching 'src-tiled')
    if (node.children && filePath.startsWith(node.absolutePath + '/')) {
        for (const child of node.children) {
            const found = findNode(child, filePath);
            if(found) return found;
        }
    }
    return null;
}

export const getFileNodeByPath = (
  fileNodes: FileNode[],
  filePath: string
): FileNode | null => {
    for (const rootNode of fileNodes) {
        const found = findNode(rootNode, filePath);
        if (found) return found;
    }
    return null;
};

export const addRemovePathInSelectedFiles = (
  fileTree: FileNode[],
  path: string,
  selectedFiles: string[]
): string[] => {
    const node = getFileNodeByPath(fileTree, path);
    if (!node) return selectedFiles;

    let newSelectedFiles = [...selectedFiles];

    // Check if the node is directly selected or selected via an ancestor
    const isDirectlySelected = newSelectedFiles.includes(path);
    const selectedAncestor = newSelectedFiles.find(ancestor => path.startsWith(ancestor + '/') && path !== ancestor);
    const isEffectivelySelected = isDirectlySelected || !!selectedAncestor;

    if (isEffectivelySelected) {
        // --- UNCHECK LOGIC ---
        if (selectedAncestor) {
            // A child of an already checked folder is being unchecked.
            // 1. Remove the ancestor.
            newSelectedFiles = newSelectedFiles.filter(p => p !== selectedAncestor);
            const ancestorNode = getFileNodeByPath(fileTree, selectedAncestor);
            if (ancestorNode && ancestorNode.children) {
                // 2. Add all children of the ancestor EXCEPT the one that was just unchecked.
                for (const child of ancestorNode.children) {
                    // Don't re-add the path that was clicked.
                    if (child.absolutePath !== path) {
                         newSelectedFiles.push(child.absolutePath);
                    }
                }
            }
        } else {
            // A parent or a file that was checked directly is being unchecked.
            // Remove it and all its descendants.
            const descendantPaths = getAllDescendantPaths(node);
            newSelectedFiles = newSelectedFiles.filter(p => p !== path && !descendantPaths.includes(p));
        }
    } else {
        // --- CHECK LOGIC ---
        // 1. Remove any descendants that might already be individually selected,
        // as the new parent selection will cover them.
        const descendantPaths = getAllDescendantPaths(node);
        newSelectedFiles = newSelectedFiles.filter(p => !descendantPaths.includes(p));
        
        // 2. Add the new path.
        newSelectedFiles.push(path);
    }
  
  return [...new Set(newSelectedFiles)]; // Use Set to remove any duplicates.
};
</file>

<file path="src/client/components/tree-view/TreeView.tsx">
import React, { useState, useEffect } from 'react';
import { VscChevronRight } from 'react-icons/vsc';
import { getExpandedNodes } from './TreeView.utils';

export interface TreeNode {
    name: string;
    absolutePath: string;
    children?: TreeNode[];
    isExpanded?: boolean;
    [key: string]: any;
}

interface TreeViewProps {
    data: TreeNode[];
    renderNodeContent?: (node: TreeNode, isExpanded: boolean) => React.ReactNode;
}

const TreeView: React.FC<TreeViewProps> = ({ data, renderNodeContent }) => {
    const [expandedNodes, setExpandedNodes] = useState<string[]>([]);

    useEffect(() => {
        // Set initial expanded state only once when data is first loaded
        if (data.length > 0 && expandedNodes.length === 0) {
            setExpandedNodes(getExpandedNodes(data));
        }
    }, [data]);

    const handleToggleNode = (e: React.MouseEvent, nodePath: string) => {
        // Robustness fix: Do not toggle if the click was on a checkbox.
        if ((e.target as HTMLElement).closest('.file-checkbox')) {
            return;
        }
        e.stopPropagation(); // Prevent the click from bubbling to the parent item wrapper
        setExpandedNodes((prevExpandedNodes) => {
            const isExpanded = prevExpandedNodes.includes(nodePath);
            return isExpanded
                ? prevExpandedNodes.filter((n) => n !== nodePath)
                : [...prevExpandedNodes, nodePath];
        });
    };

    const renderTreeNodes = (nodes: TreeNode[]) => {
        return nodes.map((node) => {
            const isExpanded = expandedNodes.includes(node.absolutePath);
            const isDirectory = !!(node.children && node.children.length > 0);

            return (
                <li key={node.absolutePath} className="treenode-li">
                    <div className={`treenode-item-wrapper`} onClick={(e) => isDirectory && handleToggleNode(e, node.absolutePath)}>
                        <span 
                            className={`treenode-chevron ${isExpanded ? 'expanded' : ''}`}
                        >
                            {isDirectory && <VscChevronRight />}
                        </span>
                        <div className="treenode-content">
                            {renderNodeContent ? renderNodeContent(node, isExpanded) : node.name}
                        </div>
                    </div>
                    {isDirectory && isExpanded && (
                        <ul className="treenode-children">{renderTreeNodes(node.children)}</ul>
                    )}
                </li>
            );
        });
    };

    return (
        <div className="tree-view">
            <ul>{renderTreeNodes(data)}</ul>
        </div>
    );
};

export default TreeView;
</file>

<file path="src/client/components/tree-view/TreeView.utils.ts">
import { TreeNode } from "./TreeView";

export const getExpandedNodes = (data: TreeNode[]): string[] => {
  return data.reduce((acc: string[], node) => {
    if (node.isExpanded) {
      acc.push(node.absolutePath);
    }
    if (node.children) {
      acc.push(...getExpandedNodes(node.children));
    }
    return acc;
  }, []);
};
</file>

<file path="src/client/views/context-chooser.view/index.ts">
import { onMessage } from "./on-message";

export const viewConfig = {
    entry: "contextChooserView.js",
    type: "viewType.sidebar.contextChooser",
    handleMessage: onMessage,
};
</file>

<file path="src/client/views/context-chooser.view/on-message.ts">
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ClientToServerChannel, ServerToClientChannel } from "@/common/ipc/channels.enum";
import { Services } from "@/backend/services/services";
import * as vscode from "vscode";
import { VIEW_TYPES } from "@/common/view-types";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const fsService = Services.fsService;
    const flattenerService = Services.flattenerService;
    const selectionService = Services.selectionService;

    serverIpc.onClientMessage(ClientToServerChannel.RequestWorkspaceFiles, () =>
        fsService.handleWorkspaceFilesRequest(serverIpc)
    );

    serverIpc.onClientMessage(ClientToServerChannel.RequestFlattenContext, (data) => {
        console.log("Flattening context for paths:", data.selectedPaths);
        flattenerService.flatten(data.selectedPaths);
    });

    serverIpc.onClientMessage(ClientToServerChannel.OpenFolderDialog, () => {
        vscode.commands.executeCommand('workbench.action.files.openFolder');
    });

    // --- Selection Sets Handlers ---

    serverIpc.onClientMessage(ClientToServerChannel.RequestSelectionSets, () => {
        const sets = selectionService.getSelectionSets();
        serverIpc.sendToClient(ServerToClientChannel.SendSelectionSets, { sets });
    });

    serverIpc.onClientMessage(ClientToServerChannel.LoadSelectionSet, (data) => {
        vscode.commands.executeCommand('dce.loadSelectionSet', data.name);
    });
    
    serverIpc.onClientMessage(ClientToServerChannel.RequestSaveSelectionSet, (data) => {
        vscode.commands.executeCommand('dce.saveSelectionSet', data.selectedPaths);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestDeleteSelectionSet, () => {
        vscode.commands.executeCommand('dce.deleteSelectionSet');
    });
}
</file>

<file path="src/client/views/context-chooser.view/view.scss">
/* Updated on: C16 (Fix hierarchical indentation) */
body {
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-size: 13px;
    color: var(--vscode-editor-foreground);
    background-color: var(--vscode-sideBar-background);
}

.view-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.view-header {
    padding: 8px;
    border-bottom: 1px solid var(--vscode-panel-border);
}

.flatten-button {
    width: 100%;
    padding: 6px;
    border: 1px solid var(--vscode-button-border, var(--vscode-focusBorder));
    background-color: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
    cursor: pointer;
    border-radius: 2px;
}

.flatten-button:hover {
    background-color: var(--vscode-button-hoverBackground);
}

.file-tree-container {
    padding: 5px;
    flex-grow: 1;
    overflow-y: auto;
}

.loading-message {
    padding: 8px;
    color: var(--vscode-descriptionForeground);
}

.summary-panel {
    padding: 4px 8px;
    border-top: 1px solid var(--vscode-panel-border);
    font-size: 12px;
    color: var(--vscode-descriptionForeground);
    display: flex;
    justify-content: space-between;
    gap: 12px;
}

.summary-item {
    display: flex;
    align-items: center;
    gap: 4px;
}

/* --- Tree View Indentation Fix --- */
.tree-view {
    ul {
        list-style-type: none;
        margin: 0;
        padding-left: 0; /* Reset all UL padding first */
    }

    /* Apply indentation ONLY to nested children ULs */
    ul.treenode-children {
        padding-left: 20px;
    }
}


.treenode-li {
    position: relative;
}

.treenode-item-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 1px 4px;
    border-radius: 3px;
    min-height: 22px;
}

.treenode-item-wrapper:hover {
    background-color: var(--vscode-list-hoverBackground);
}

.treenode-chevron {
    flex-shrink: 0;
    width: 20px;
    text-align: center;
    transition: transform 0.1s ease-in-out;
}

.treenode-chevron.expanded {
    transform: rotate(90deg);
}

.treenode-content {
    flex-grow: 1;
    display: flex;
    align-items: center;
    overflow: hidden; /* Important for ellipsis */
}


.file-item {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1px;
    gap: 6px;
}

.file-item.active {
    background-color: var(--vscode-list-activeSelectionBackground);
    color: var(--vscode-list-activeSelectionForeground);
}

.file-checkbox {
    cursor: pointer;
}

.file-icon {
    display: flex;
    align-items: center;
    font-size: 16px;
    flex-shrink: 0;
}

.file-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-grow: 1;
}

.file-stats {
    margin-left: auto;
    padding-left: 8px;
    font-size: 11px;
    color: var(--vscode-descriptionForeground);
    flex-shrink: 0;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 8px; /* Space between stat groups */
    justify-content: flex-end;
    text-align: right;
}

.file-stats > * {
    display: flex;
    align-items: center;
    gap: 3px;
}
</file>

<file path="src/client/views/context-chooser.view/view.tsx">
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { FileNode } from '@/common/types/file-node';
import FileTree from '../../components/file-tree/FileTree';
import { useState, useEffect, useMemo } from 'react';
import { formatLargeNumber, formatNumberWithCommas } from '@/common/utils/formatting';
import { VscFiles, VscSymbolNumeric } from 'react-icons/vsc';

const App = () => {
    const [files, setFiles] = useState<FileNode[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [activeFile, setActiveFile] = useState<string | undefined>();
    
    const clientIpc = ClientPostMessageManager.getInstance();

    useEffect(() => {
        clientIpc.sendToServer(ClientToServerChannel.RequestWorkspaceFiles, {});

        const handleFileResponse = ({ files: receivedFiles }: { files: FileNode[] }) => {
            setFiles(receivedFiles);
        };
        clientIpc.onServerMessage(ServerToClientChannel.SendWorkspaceFiles, handleFileResponse);

    }, [clientIpc]);

    const handleFileClick = (filePath: string) => {
        setActiveFile(filePath);
    };

    const updateSelectedFiles = (newSelectedFiles: string[]) => {
        setSelectedFiles(newSelectedFiles);
    };

    const handleFlattenClick = () => {
        clientIpc.sendToServer(ClientToServerChannel.RequestFlattenContext, { selectedPaths: selectedFiles });
    };

    const selectionSummary = useMemo(() => {
        let totalTokens = 0;
        let totalFiles = 0;
        const selectedFileSet = new Set<string>();

        const fileMap: Map<string, FileNode> = new Map();
        const buildFileMap = (node: FileNode) => {
            fileMap.set(node.absolutePath, node);
            if (node.children) {
                node.children.forEach(buildFileMap);
            }
        };
        files.forEach(buildFileMap);

        const addNodeAndDescendants = (node: FileNode) => {
            if (!node.children) { // It's a file
                if (!selectedFileSet.has(node.absolutePath)) {
                    selectedFileSet.add(node.absolutePath);
                    totalTokens += node.tokenCount; // Images have 0 tokens
                    totalFiles++;
                }
            } else { // It's a directory
                node.children.forEach(child => addNodeAndDescendants(child));
            }
        };

        selectedFiles.forEach(path => {
            const node = fileMap.get(path);
            if (node) {
                addNodeAndDescendants(node);
            }
        });

        return { totalFiles, totalTokens };
    }, [selectedFiles, files]);

    return (
        <div className="view-container">
            <div className="view-header">
                <button className="flatten-button" onClick={handleFlattenClick}>
                    Flatten Context
                </button>
            </div>
            <div className="file-tree-container">
                {files.length > 0 ? (
                    files.map((rootNode, index) => (
                        <FileTree
                            key={index}
                            data={[rootNode]}
                            onFileClick={handleFileClick}
                            selectedFiles={selectedFiles}
                            updateSelectedFiles={updateSelectedFiles}
                            activeFile={activeFile}
                        />
                    ))
                ) : (
                    <div className="loading-message">Loading file tree...</div>
                )}
            </div>
            <div className="summary-panel">
                <span className='summary-item'>
                    <VscFiles />
                    {formatNumberWithCommas(selectionSummary.totalFiles)} files
                </span>
                <span className='summary-item'>
                    <VscSymbolNumeric />
                    {formatLargeNumber(selectionSummary.totalTokens, 1)} tokens
                </span>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
</file>

<file path="src/client/views/index.ts">
import { viewConfig as contextChooserViewConfig } from "./context-chooser.view";
import * as vscode from "vscode";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { getNonce, getViewHtml } from "@/common/utils/view-html";

export const views = [contextChooserViewConfig];
export const serverIPCs: Record<string, ServerPostMessageManager> = {};

export function registerViews(context: vscode.ExtensionContext) {
    views.forEach((viewConfig) => {
        context.subscriptions.push(
            vscode.window.registerWebviewViewProvider(viewConfig.type, {
                resolveWebviewView: (webviewView) => {
                    webviewView.webview.options = {
                        enableScripts: true,
                        localResourceRoots: [context.extensionUri],
                    };
                    const nonce = getNonce();
                    webviewView.webview.html = getViewHtml({
                        webview: webviewView.webview,
                        nonce,
                        scriptUri: webviewView.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, "dist", viewConfig.entry)).toString(),
                    });
                    const serverIpc = ServerPostMessageManager.getInstance(
                        webviewView.webview.onDidReceiveMessage,
                        (data: any) => webviewView.webview.postMessage(data)
                    );
                    serverIPCs[viewConfig.type] = serverIpc;
                    viewConfig.handleMessage(serverIpc);
                },
            })
        );
    });
}
</file>

<file path="src/common/ipc/channels.enum.ts">
export enum ClientToServerChannel {
    RequestFlattenContext = "clientToServer.requestFlattenContext",
    RequestWorkspaceFiles = "clientToServer.requestWorkspaceFiles",
    OpenFolderDialog = "clientToServer.openFolderDialog",

    // Selection Sets
    RequestSelectionSets = "clientToServer.requestSelectionSets",
    LoadSelectionSet = "clientToServer.loadSelectionSet",
    RequestSaveSelectionSet = "clientToServer.requestSaveSelectionSet",
    RequestDeleteSelectionSet = "clientToServer.requestDeleteSelectionSet",
}

export enum ServerToClientChannel {
    SendWorkspaceFiles = "serverToClient.sendWorkspaceFiles",

    // Selection Sets
    SendSelectionSets = "serverToClient.sendSelectionSets",
    ApplySelectionSet = "serverToClient.applySelectionSet",
}
</file>

<file path="src/common/ipc/channels.type.ts">
import { FileNode } from "@/common/types/file-node";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { SelectionSet } from "@/backend/services/selection.service";

export type ChannelBody<T extends ClientToServerChannel | ServerToClientChannel> =
    T extends ClientToServerChannel.RequestFlattenContext ? { selectedPaths: string[] } :
    T extends ClientToServerChannel.RequestWorkspaceFiles ? {} :
    T extends ClientToServerChannel.OpenFolderDialog ? {} :
    T extends ServerToClientChannel.SendWorkspaceFiles ? { files: FileNode[] } :

    // Selection Sets
    T extends ClientToServerChannel.RequestSelectionSets ? {} :
    T extends ServerToClientChannel.SendSelectionSets ? { sets: SelectionSet } :
    T extends ClientToServerChannel.LoadSelectionSet ? { name: string } :
    T extends ServerToClientChannel.ApplySelectionSet ? { paths: string[] } :
    T extends ClientToServerChannel.RequestSaveSelectionSet ? { selectedPaths: string[] } :
    T extends ClientToServerChannel.RequestDeleteSelectionSet ? {} :

    never;
</file>

<file path="src/common/ipc/client-ipc.ts">
import getVscode from "./get-vscode-api";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { ChannelBody } from "./channels.type";

export class ClientPostMessageManager {
    private static _instance?: ClientPostMessageManager;
    private _listeners: {
        channel: ServerToClientChannel,
        callback: (body: ChannelBody<ServerToClientChannel>) => void
    }[];

    private constructor() {
        this._listeners = [];
        window.addEventListener('message', (event: MessageEvent) => {
            const data = event.data;
            this._listeners.forEach((listener) => {
                if (listener.channel === data.channel) {
                    listener.callback(data.body);
                }
            });
        });
    }

    static getInstance(): ClientPostMessageManager {
        if (!ClientPostMessageManager._instance) {
            ClientPostMessageManager._instance = new ClientPostMessageManager();
        }
        return ClientPostMessageManager._instance;
    }

    sendToServer<T extends ClientToServerChannel>(channel: T, body: ChannelBody<T>): void {
        getVscode().postMessage({ channel, body });
    }

    onServerMessage<T extends ServerToClientChannel>(channel: T, callback: (body: ChannelBody<T>) => void): void {
        this._listeners.push({ channel, callback: callback as any });
    }
}
</file>

<file path="src/common/ipc/get-vscode-api.ts">
import { WebviewApi } from "../types/vscode-webview";

let vscode: WebviewApi<unknown> | null = null;

const getVscode = () => {
    if (!vscode) {
        vscode = acquireVsCodeApi();
    }
    return vscode;
};

export default getVscode;
</file>

<file path="src/common/ipc/server-ipc.ts">
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { ChannelBody } from "./channels.type";

export class ServerPostMessageManager {
    private static _instance?: ServerPostMessageManager;
    private _listeners: {
        channel: ClientToServerChannel,
        callback: (body: ChannelBody<ClientToServerChannel>) => void
    }[];

    private constructor(
        private onMessage: (data: any) => void,
        private sendMessage: (message: any) => void
    ) {
        this._listeners = [];
        this.onMessage((data: any) => {
            this._listeners.forEach((listener) => {
                if (listener.channel === data.channel) {
                    listener.callback(data.body);
                }
            });
        });
    }

    static getInstance(onMessage?: (data: any) => void, sendMessage?: (message: any) => void) {
        if (onMessage && sendMessage) {
            ServerPostMessageManager._instance = new ServerPostMessageManager(onMessage, sendMessage);
        }
        if (!ServerPostMessageManager._instance) {
            throw new Error("ServerPostMessageManager not initialized");
        }
        return ServerPostMessageManager._instance;
    }

    sendToClient<T extends ServerToClientChannel>(channel: T, body: ChannelBody<T>): void {
        this.sendMessage({ channel, body });
    }

    onClientMessage<T extends ClientToServerChannel>(channel: T, callback: (body: ChannelBody<T>) => void): void {
        this._listeners.push({ channel, callback: callback as any });
    }
}
</file>

<file path="src/common/types/file-node.ts">
export interface FileNode {
    name: string;
    absolutePath: string;
    children?: FileNode[];
    tokenCount: number;
    fileCount: number; // For directories, this is the count of files inside. For files, it's 1.
    isImage: boolean;
    sizeInBytes: number;
}
</file>

<file path="src/common/types/vscode-webview.d.ts">
export interface WebviewApi<StateType> {
    postMessage(message: unknown): void;
    getState(): StateType | undefined;
    setState<T extends StateType | undefined>(newState: T): T;
}

declare global {
    function acquireVsCodeApi<StateType = unknown>(): WebviewApi<StateType>;
}
</file>

<file path="src/common/utils/formatting.ts">
// src/common/utils/formatting.ts

const KMBT_SUFFIXES = ['', 'K', 'M', 'B', 'T', 'Q']; // Extend as needed

/**
 * Formats a large number with appropriate K/M/B/T suffixes and dynamic decimal places.
 *
 * @param value The number to format.
 * @param decimalPlaces The base number of decimal places to aim for.
 * @returns A formatted string.
 */
export function formatLargeNumber(value: number | undefined | null, decimalPlaces: number = 1): string {
    if (value === null || value === undefined || isNaN(value) || !Number.isFinite(value)) {
        return '---';
    }
    if (value === 0) {
        return '0';
    }

    const isNegative = value < 0;
    const absValue = Math.abs(value);

    if (absValue < 1000) {
        return String(Math.round(value)); // Return whole number if less than 1000
    }

    let unitIndex = 0;
    let scaledValue = absValue;

    unitIndex = Math.floor(Math.log10(absValue) / 3);
    unitIndex = Math.min(unitIndex, KMBT_SUFFIXES.length - 1);
    scaledValue = absValue / Math.pow(1000, unitIndex);

    let adjustedDecimalPlaces = decimalPlaces;
    if (scaledValue >= 100) adjustedDecimalPlaces = 0;
    else if (scaledValue >= 10) adjustedDecimalPlaces = 1;
    else adjustedDecimalPlaces = 2;


    const unit = KMBT_SUFFIXES[unitIndex] ?? '';
    let formattedValue = scaledValue.toFixed(adjustedDecimalPlaces);
    
    // Remove trailing .00 or .0
    if (adjustedDecimalPlaces > 0 && formattedValue.endsWith('0')) {
        formattedValue = formattedValue.replace(/\.?0+$/, '');
    }


    return `${isNegative ? '-' : ''}${formattedValue}${unit}`;
}

/**
 * Formats a number with commas as thousands separators.
 * @param value The number to format.
 * @returns A formatted string with commas.
 */
export function formatNumberWithCommas(value: number | undefined | null): string {
    if (value === null || value === undefined || isNaN(value)) {
        return '---';
    }
    return value.toLocaleString();
}

/**
 * Formats a file size in bytes into a human-readable string (KB, MB, GB, etc.).
 * @param bytes The number of bytes.
 * @param decimals The number of decimal places to use.
 * @returns A formatted string representing the file size.
 */
export function formatBytes(bytes: number, decimals: number = 1): string {
    if (bytes === 0) return '0 Bytes';
    if (isNaN(bytes)) return '---';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
</file>

<file path="src/common/utils/view-html.ts">
import * as vscode from "vscode";

export function getViewHtml({ webview, nonce, scriptUri }: { webview: vscode.Webview; nonce: string; scriptUri: string; }): string {
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
            <div id="root"></div>
            <script nonce="${nonce}" src="${scriptUri}"></script>
        </body>
        </html>`;
}

function getNonce() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
export { getNonce };
</file>

<file path="src/common/view-types.ts">
export const VIEW_TYPES = {
  SIDEBAR: {
    CHAT: "viewType.sidebar.chat",
    FILE_EXPLORER: "viewType.sidebar.fileExplorer",
    CHANGE_PLAN: "viewType.sidebar.changePlan",
    CONTEXT_CHOOSER: "viewType.sidebar.contextChooser",
  },
};
</file>

<file path="src/extension.ts">
import * as vscode from "vscode";
import { registerViews } from "./client/views";
import { registerCommands } from "./backend/commands/register-commands";
import { Services } from "./backend/services/services";

let globalContext: vscode.ExtensionContext | null = null;

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "Data Curation Environment" is now active!');
    globalContext = context;

    Services.initialize();
    registerCommands(context);
    registerViews(context);
}

export function getContext() {
    if (!globalContext) {
        throw new Error("Extension context not available.");
    }
    return globalContext;
}

export function deactivate() {}
</file>

<file path="The-Creator-AI-main/.eslintrc.json">
{
    "root": true,
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/naming-convention": [
            "warn",
            {
                "selector": "import",
                "format": [ "camelCase", "PascalCase" ]
            }
        ],
        "@typescript-eslint/semi": "warn",
        "curly": "warn",
        "eqeqeq": "warn",
        "no-throw-literal": "warn",
        "semi": "off"
    },
    "ignorePatterns": [
        "out",
        "dist",
        "**/*.d.ts"
    ]
}
</file>

<file path="The-Creator-AI-main/.gitignore">
.DS_Store
out
dist
node_modules
.vscode-test/
*.vsix
*.llm
*.code-workspace
</file>

<file path="The-Creator-AI-main/.vscode-test.mjs">
import { defineConfig } from '@vscode/test-cli';

export default defineConfig({
	files: 'out/test/**/*.test.js',
});
</file>

<file path="The-Creator-AI-main/.vscodeignore">
.vscode/**
.vscode-test/**
out/**
node_modules/**
src/**
.gitignore
.yarnrc
webpack.config.js
vsc-extension-quickstart.md
**/tsconfig.json
**/.eslintrc.json
**/*.map
**/*.ts
**/.vscode-test.*
</file>

<file path="The-Creator-AI-main/CHANGELOG.md">
# Change Log

All notable changes to the "the-creator-ai" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

- Initial release
</file>

<file path="The-Creator-AI-main/LICENSE">
MIT License

Copyright (c) 2024 Saoud Rizwan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
</file>

<file path="The-Creator-AI-main/Notes.md">
[Notes](https://github.com/The-Creator-AI/The-Creator-AI/issues/4)
</file>

<file path="The-Creator-AI-main/package.json">
{
  "name": "the-creator-ai",
  "publisher": "PulkitSingh",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/The-Creator-AI/the-Creator-AI"
  },
  "displayName": "The Creator AI",
  "description": "Coding assistant",
  "version": "0.1.3",
  "engines": {
    "vscode": "^1.90.0"
  },
  "categories": [
    "Other"
  ],
  "activationEvents": [],
  "main": "./dist/extension.js",
  "contributes": {
    "configuration": {
      "title": "Creator Extension",
      "properties": {
        "creatorExtension.llmRepository": {
          "type": "object",
          "description": "Configuration for LLM services"
        },
        "creatorExtension.chatRepository": {
          "type": "object",
          "description": "Chat repository data"
        }
      }
    },
    "commands": [
      {
        "command": "the-creator-ai.helloWorld",
        "title": "Creator AI: Hello World"
      },
      {
        "command": "the-creator-ai.resetClearChangePlanViewState",
        "title": "Creator AI: Clear Change Plan View State"
      },
      {
        "command": "the-creator-ai.chooseChangePlan",
        "title": "Creator AI: Choose Change Plan",
        "icon": "$(history)"
      },
      {
        "command": "the-creator-ai.newPlan",
        "title": "Creator AI: New Plan",
        "icon": "$(sync)"
      },
      {
        "command": "the-creator-ai.clearHistory",
        "title": "Creator AI: Clear History"
      },
      {
        "command": "the-creator-ai.exportChangePlan",
        "title": "Creator AI: Export Change Plan",
        "icon": "$(cloud-upload)"
      },
      {
        "command": "the-creator-ai.importChangePlan",
        "title": "Creator AI: Import Change Plan",
        "icon": "$(cloud-download)"
      }
    ],
    "viewsContainers": {
      "activitybar": [
        {
          "id": "the-creator-ai",
          "title": "Creator AI",
          "icon": "public/spiral.svg"
        }
      ]
    },
    "views": {
      "the-creator-ai": [
        {
          "type": "webview",
          "id": "viewType.sidebar.changePlan",
          "name": "Change Plan"
        }
      ]
    },
    "menus": {
      "view/title": [
        {
          "command": "the-creator-ai.chooseChangePlan",
          "when": "view == viewType.sidebar.changePlan",
          "group": "navigation",
          "title": "Choose Plan"
        },
        {
          "command": "the-creator-ai.newPlan",
          "when": "view == viewType.sidebar.changePlan",
          "group": "navigation",
          "title": "New Plan"
        },
        {
          "command": "the-creator-ai.exportChangePlan",
          "when": "view == viewType.sidebar.changePlan",
          "group": "navigation",
           "title": "Export Plan"
        },
        {
          "command": "the-creator-ai.importChangePlan",
          "when": "view == viewType.sidebar.changePlan",
          "group": "navigation",
           "title": "Import Plan"
        }
      ]
    }
  },
  "scripts": {
    "vscode:prepublish": "npm run package",
    "compile": "webpack",
    "watch": "webpack --watch",
    "package": "webpack --mode production --devtool hidden-source-map",
    "compile-tests": "tsc -p . --outDir out",
    "watch-tests": "tsc -p . -w --outDir out",
    "pretest": "npm run compile-tests && npm run compile && npm run lint",
    "lint": "eslint src --ext ts",
    "test": "vscode-test",
    "vsce-package": "vsce package"
  },
  "devDependencies": {
    "@babel/core": "^7.24.7",
    "@babel/preset-env": "^7.24.7",
    "@babel/preset-react": "^7.24.7",
    "@babel/preset-typescript": "^7.24.7",
    "@types/mocha": "^10.0.6",
    "@types/node": "18.x",
    "@types/react-dom": "^18.3.0",
    "@types/vscode": "^1.90.0",
    "@typescript-eslint/eslint-plugin": "^7.7.1",
    "@typescript-eslint/parser": "^7.7.1",
    "@vscode/test-cli": "^0.0.9",
    "@vscode/test-electron": "^2.3.9",
    "autoprefixer": "^10.4.20",
    "babel-loader": "^9.1.3",
    "copy-webpack-plugin": "^12.0.2",
    "css-loader": "^7.1.2",
    "eslint": "^8.57.0",
    "node-sass": "^9.0.0",
    "postcss": "^8.4.45",
    "postcss-loader": "^8.1.1",
    "postcss-preset-env": "^10.0.3",
    "process": "^0.11.10",
    "sass": "^1.78.0",
    "sass-loader": "^16.0.1",
    "style-loader": "^4.0.0",
    "tailwindcss": "^3.4.10",
    "ts-loader": "^9.5.1",
    "typescript": "^5.4.5",
    "vsce": "^2.15.0",
    "webpack": "^5.91.0",
    "webpack-cli": "^5.1.4"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.27.0",
    "@anthropic-ai/tokenizer": "^0.0.4",
    "@google/generative-ai": "^0.12.0",
    "@vscode/webview-ui-toolkit": "^1.4.0",
    "axios": "^1.7.5",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.1",
    "firebase": "^10.13.2",
    "injection-js": "^2.4.0",
    "markdown-to-jsx": "^7.5.0",
    "openai": "^4.56.0",
    "puppeteer": "^23.2.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-icons": "^5.3.0",
    "reflect-metadata": "^0.2.2",
    "rxjs": "^7.8.1",
    "tiktoken": "^1.0.16",
    "uuid": "^10.0.0"
  }
}
</file>

<file path="The-Creator-AI-main/postcss.config.js">
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
</file>

<file path="The-Creator-AI-main/public/main.css">
body {
	background-color: transparent;
}

.color-list {
	list-style: none;
	padding: 0;
}

.color-entry {
	width: 100%;
	display: flex;
	margin-bottom: 0.4em;
	border: 1px solid var(--vscode-input-border);
}

.color-preview {
	width: 2em;
	height: 2em;
}

.color-preview:hover {
	outline: inset white;
}

.color-input {
	display: block;
	flex: 1;
	width: 100%;
	color: var(--vscode-input-foreground);
	background-color: var(--vscode-input-background);
	border: none;
	padding: 0 0.6em;
}

.add-color-button {
	display: block;
	border: none;
	margin: 0 auto;
}
</file>

<file path="The-Creator-AI-main/public/reset.css">
html {
	box-sizing: border-box;
	font-size: 13px;
}

*,
*:before,
*:after {
	box-sizing: inherit;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ol,
ul {
	margin: 0;
	padding: 0;
	font-weight: normal;
}

img {
	max-width: 100%;
	height: auto;
}
</file>

<file path="The-Creator-AI-main/public/spiral.svg">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
    <g id="Page-1" stroke="none" fill="none" fill-rule="evenodd">
        <g id="dep" transform="translate(4, 6)">
            <path d="M100 100 
            m 0 -80 
            a 80 80 0 0 1 0 160 
            a 70 70 0 0 1 0 -140 
            a 60 60 0 0 1 0 120 
            a 50 50 0 0 1 0 -100 
            a 40 40 0 0 1 0 80 
            a 30 30 0 0 1 0 -60 
            a 20 20 0 0 1 0 40"
                fill="none" stroke="white" stroke-width="8"
                id="Shape" />
        </g>
    </g>
</svg>
</file>

<file path="The-Creator-AI-main/public/vscode.css">
:root {
	--container-paddding: 20px;
	--input-padding-vertical: 6px;
	--input-padding-horizontal: 4px;
	--input-margin-vertical: 4px;
	--input-margin-horizontal: 0;
}

body {
	padding: 0 var(--container-paddding);
	color: var(--vscode-foreground);
	font-size: var(--vscode-font-size);
	font-weight: var(--vscode-font-weight);
	font-family: var(--vscode-font-family);
	background-color: var(--vscode-editor-background);
}

ol,
ul {
	padding-left: var(--container-paddding);
}

body > *,
form > * {
	margin-block-start: var(--input-margin-vertical);
	margin-block-end: var(--input-margin-vertical);
}

*:focus {
	outline-color: var(--vscode-focusBorder) !important;
}

a {
	color: var(--vscode-textLink-foreground);
}

a:hover,
a:active {
	color: var(--vscode-textLink-activeForeground);
}

code {
	font-size: var(--vscode-editor-font-size);
	font-family: var(--vscode-editor-font-family);
}

button {
	border: none;
	padding: var(--input-padding-vertical) var(--input-padding-horizontal);
	width: 100%;
	text-align: center;
	outline: 1px solid transparent;
	outline-offset: 2px !important;
	color: var(--vscode-button-foreground);
	background: var(--vscode-button-background);
}

button:hover {
	cursor: pointer;
	background: var(--vscode-button-hoverBackground);
}

button:focus {
	outline-color: var(--vscode-focusBorder);
}

button.secondary {
	color: var(--vscode-button-secondaryForeground);
	background: var(--vscode-button-secondaryBackground);
}

button.secondary:hover {
	background: var(--vscode-button-secondaryHoverBackground);
}

input:not([type='checkbox']),
textarea {
	display: block;
	width: 100%;
	border: none;
	font-family: var(--vscode-font-family);
	padding: var(--input-padding-vertical) var(--input-padding-horizontal);
	color: var(--vscode-input-foreground);
	outline-color: var(--vscode-input-border);
	background-color: var(--vscode-input-background);
}

input::placeholder,
textarea::placeholder {
	color: var(--vscode-input-placeholderForeground);
}
</file>

<file path="The-Creator-AI-main/README.md">
# The Creator AI

This extension integrates a coding assistant directly into your VS Code environment.

<img width="350" alt="image" src="https://github.com/user-attachments/assets/ea18a853-4640-4b35-b291-f6c39ea35bb4" />
<img width="350" alt="image" src="https://github.com/user-attachments/assets/53cbe519-e8b9-4d7c-a101-151b316bf28f" />

## Features

* **Context chooser:** Choose files/folders through UI which are to be kept in the context.
* **Code Change Plan:** Describe code changes you'd like to plan, and the AI will generate a plan for implementation.

## Requirements

This extension requires an API key for either Gemini or OpenAI. You'll be prompted to enter your key when you first use the extension.


## Release Notes

### 0.0.1

Initial release of the Creator AI extension with basic chat, change plan, and file explorer functionalities.

## Following Extension Guidelines

This extension adheres to the VS Code extension guidelines and best practices.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can edit this README using Visual Studio Code. Some useful keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
* Press `Ctrl+Space` (Windows, Linux, macOS) for Markdown snippets.

## For More Information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!** 
</file>

<file path="The-Creator-AI-main/src/backend/commands/commands.ts">
import { ChangePlan } from "@/client/views/change-plan.view/store/change-plan-view.state-type";
import { remoteSetChangePlanViewState } from "@/backend/utils/remoteSetChangePlanViewState";
import { VIEW_TYPES } from "@/common/view-types";
import * as vscode from "vscode";
import { Services } from "@/backend/services/services";
import { serverIPCs } from "@/client/views";

// Define an array of commands with their corresponding callback functions
export const commands = [
  {
    commandId: "the-creator-ai.helloWorld",
    callback: () => {
      console.log("Hello World from the-creator-ai!");
      vscode.window.showInformationMessage(
        "Hello World from the-creator-ai!"
      );
    },
  },
  {
    commandId: "the-creator-ai.resetClearChangePlanViewState",
    callback: async () => {
      const persistentStoreRepository =
        Services.getPersistentStoreRepository();
      await persistentStoreRepository.clearChangePlanViewState();
    },
  },
  {
    commandId: "the-creator-ai.chooseChangePlan",
    callback: async () => {
      const persistentStoreRepository =
        Services.getPersistentStoreRepository();
      const store = persistentStoreRepository.getChangePlanViewState();
      const changePlans = store?.changePlans || [];

      // Sort change plans by last updated date (descending)
      changePlans.sort((a: ChangePlan, b: ChangePlan) => b.lastUpdatedAt - a.lastUpdatedAt);

      // Show quick pick with plan titles
      const selectedPlan = await vscode.window.showQuickPick(
        changePlans.map((plan: ChangePlan) => {
          return {
            label: plan.planTitle,
            description: new Date(plan.lastUpdatedAt).toLocaleString(),
            plan,
          };
        }),
        {
          placeHolder: "Select a plan to load or delete",
          matchOnDescription: true
        }
      );

      if (selectedPlan) {
        const choice = await vscode.window.showQuickPick(
          ['Load', 'Delete'],
          {
            placeHolder: `What do you want to do with: ${selectedPlan.label} plan?`
          }
        )
        if (choice === 'Load') {
          const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CHANGE_PLAN];
          remoteSetChangePlanViewState(
            serverIpc,
            "changeDescription",
            selectedPlan.plan.planDescription
          );
          remoteSetChangePlanViewState(
            serverIpc,
            "llmResponse",
            selectedPlan.plan.llmResponse
          );
          remoteSetChangePlanViewState(
            serverIpc,
            "selectedFiles",
            selectedPlan.plan.selectedFiles
          );
          remoteSetChangePlanViewState(
            serverIpc,
            "chatHistory",
            selectedPlan.plan.chatHistory
          );
          remoteSetChangePlanViewState(
            serverIpc,
            "changePlans",
            changePlans
          );
        } else if(choice === 'Delete') {
          const confirmDelete = await vscode.window.showWarningMessage(
            `Are you sure you want to delete the plan "${selectedPlan.label}"?`,
            { modal: true },
            'Yes', 'No'
          );

          if (confirmDelete === 'Yes') {
            const updatedChangePlans = changePlans.filter((plan: ChangePlan) => plan.planTitle !== selectedPlan.label);
            persistentStoreRepository.setChangePlanViewState({
              ...store,
              changePlans: updatedChangePlans,
            });
          }
        }
      }
    },
  },
  {
    commandId: "the-creator-ai.newPlan",
    callback: async () => {
      const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CHANGE_PLAN];
      remoteSetChangePlanViewState(serverIpc, "changeDescription", "");
      remoteSetChangePlanViewState(serverIpc, "llmResponse", "");
      remoteSetChangePlanViewState(serverIpc, "chatHistory", []);
      remoteSetChangePlanViewState(serverIpc, "fileChunkMap", {});
      remoteSetChangePlanViewState(serverIpc, "isLoading", false);
    },
  },
  {
    commandId: "the-creator-ai.clearHistory",
    callback: async () => {
      const persistentStoreRepository =
        Services.getPersistentStoreRepository();
      await persistentStoreRepository.clearChangePlanViewState();
    },
  },
  {
    commandId: "the-creator-ai.exportChangePlan",
    callback: async () => {
      const planExImService = Services.getPlanExImService();
      await planExImService.exportAllChangePlans();
    },
  },
  {
    commandId: "the-creator-ai.importChangePlan",
    callback: async () => {
       const planExImService = Services.getPlanExImService();
      await planExImService.importAllChangePlans();
    },
  },
];
</file>

<file path="The-Creator-AI-main/src/backend/commands/register-commands.ts">
import * as vscode from "vscode";
import { commands } from "./commands";

export function registerCommands(context: vscode.ExtensionContext) {
  // Iterate over the commands array to register each command
  commands.forEach(({ commandId, callback }) => {
    let disposable = vscode.commands.registerCommand(commandId, callback);
    context.subscriptions.push(disposable);
  });
}
</file>

<file path="The-Creator-AI-main/src/backend/repositories/chat.respository.ts">
import { randomUUID } from "crypto";
import { getContext } from "../../extension";
import { StorageKeysEnum } from "../types/storage-keys.enum";

export interface ChatMessage {
  user: 'user' | 'bot' | 'instrutor'
  message: string;
}

export interface Chat {
  id: string;
  messages: ChatMessage[];
}

interface ChatRepositoryData {
  chats: Chat[];
  activeChatId: string | null;
}

const defaultChatRepositoryData: ChatRepositoryData = {
  chats: [],
  activeChatId: null,
};

export class ChatRepository {
  private static async getChatRepositoryData(): Promise<ChatRepositoryData> {
    const chatRepositoryData =
      getContext().workspaceState.get<ChatRepositoryData>(
        StorageKeysEnum.ChatRepository
      );
    if (!chatRepositoryData || !chatRepositoryData.chats) {
      await getContext().workspaceState.update(
        StorageKeysEnum.ChatRepository,
        defaultChatRepositoryData
      );
      return defaultChatRepositoryData;
    }
    return chatRepositoryData;
  }

  private static async patchChatRepositoryData(
    chatRepositoryData: Partial<ChatRepositoryData>
  ): Promise<void> {
    const existingData = await this.getChatRepositoryData();
    const updatedData = {
      ...existingData,
      ...chatRepositoryData,
    };
    await getContext().workspaceState.update(
        StorageKeysEnum.ChatRepository,
      updatedData
    );
  }

  static async getChats(): Promise<Chat[]> {
    return (await this.getChatRepositoryData()).chats;
  }

  static async getChatById(id?: string): Promise<Chat | undefined> {
    if (!id) {
      return this.getActiveChat();
    }
    const chats = await this.getChats();
    return chats.find((chat) => chat.id === id);
  }

  static async createChat(): Promise<Chat> {
    const newChat: Chat = { id: randomUUID(), messages: [] };
    const chats = await this.getChats();
    chats.push(newChat);
    await this.patchChatRepositoryData({ chats });
    await this.setActiveChat(newChat.id);
    return newChat;
  }

  static async updateChat(updatedChat: Chat): Promise<void> {
    const chats = await this.getChats();
    const index = chats.findIndex((chat) => chat.id === updatedChat.id);
    if (index !== -1) {
      chats[index] = updatedChat;
      await this.patchChatRepositoryData({ chats });
    }
  }

  static async deleteChat(id: string): Promise<void> {
    const chats = await this.getChats();
    const updatedChats = chats.filter((chat) => chat.id !== id);
    await this.patchChatRepositoryData({ chats: updatedChats });
  }

  static async getActiveChat() {
    const activeChatId = (await this.getChatRepositoryData()).activeChatId;
    if (!activeChatId) {
      return await this.createChat();
    }
    const activeChat = await this.getChatById(activeChatId);
    if (!activeChat) {
      return await this.createChat();
    }
    return activeChat;
  }

  static async setActiveChat(chatId: string | null): Promise<void> {
    await this.patchChatRepositoryData({ activeChatId: chatId });
  }

  // Message Management within a Chat
  static async addMessageToChat(
    chatId: string,
    message: ChatMessage
  ): Promise<void> {
    const chat = await this.getChatById(chatId);
    if (chat) {
      chat.messages.push(message);
      await this.updateChat(chat);
    }
  }

  static async updateMessageInChat(
    chatId: string,
    messageIndex: number,
    updatedMessage: ChatMessage
  ): Promise<void> {
    const chat = await this.getChatById(chatId);
    if (chat && chat.messages[messageIndex]) {
      chat.messages[messageIndex] = updatedMessage;
      await this.updateChat(chat);
    }
  }

  static async deleteMessageFromChat(
    chatId: string,
    messageIndex: number
  ): Promise<void> {
    const chat = await this.getChatById(chatId);
    if (chat && chat.messages[messageIndex]) {
      chat.messages.splice(messageIndex, 1);
      await this.updateChat(chat);
    }
  }
}
</file>

<file path="The-Creator-AI-main/src/backend/repositories/persistent-store.repository.ts">
import * as vscode from "vscode";
import { StorageKeysEnum } from "../types/storage-keys.enum";
import { getContext } from "../../extension";
import {ChangePlanViewStore} from '@/client/views/change-plan.view/store/change-plan-view.state-type';

export class PersistentStoreRepository {
  private readonly workspaceState: vscode.Memento;

  constructor() {
    this.workspaceState = getContext().workspaceState;
  }

  public getChangePlanViewState(): ChangePlanViewStore | undefined {
    const data = this.workspaceState.get<ChangePlanViewStore>(
      StorageKeysEnum.ChangePlanViewState
    );
    return data;
  }

  public setChangePlanViewState(data: ChangePlanViewStore): void {
    this.workspaceState.update(StorageKeysEnum.ChangePlanViewState, data);
  }

  public clearChangePlanViewState(): void {
    this.workspaceState.update(StorageKeysEnum.ChangePlanViewState, undefined);
  }
}
</file>

<file path="The-Creator-AI-main/src/backend/repositories/settings.repository.ts">
import { Injectable } from "injection-js";
import { getContext } from "../../extension";
import { LlmServiceEnum } from "../types/llm-service.enum";
import { StorageKeysEnum } from "../types/storage-keys.enum";

@Injectable()
export class SettingsRepository {
  async getLLMApiKeys(): Promise<Record<LlmServiceEnum, string[]> | undefined> {
    try {
      const llmApiKeys = getContext().workspaceState.get<string>(
        StorageKeysEnum.LlmApiKeys
      );

      return llmApiKeys ? JSON.parse(llmApiKeys) : {};
    } catch (error) {
      console.error("Error retrieving LLM API keys:", error);
      return undefined;
    }
  }

  async setLLMApiKey(service: LlmServiceEnum, apiKey: string): Promise<void> {
    const llmApiKeys = (await this.getLLMApiKeys()) || {};
    llmApiKeys[service]
      ? llmApiKeys[service].push(apiKey)
      : (llmApiKeys[service] = [apiKey]);

    try {
      getContext().workspaceState.update(
        StorageKeysEnum.LlmApiKeys,
        JSON.stringify(llmApiKeys)
      );
    }
    catch (error) {
      console.error("Error setting LLM API key:", error);
      throw error;
    }
  }

  async deleteLLMApiKey(
    service: LlmServiceEnum,
    apiKeyToDelete: string
  ): Promise<void> {
    const llmApiKeys = (await this.getLLMApiKeys()) || {};
    llmApiKeys[service]
      ? (llmApiKeys[service] = llmApiKeys[service].filter(
          (apiKey) => apiKey !== apiKeyToDelete
        ))
      : null;

    try {
      getContext().workspaceState.update(
        StorageKeysEnum.LlmApiKeys,
        JSON.stringify(llmApiKeys)
      );
    }
    catch (error) {
      console.error("Error deleting LLM API key:", error);
      throw error;
    }
  }
}
</file>

<file path="The-Creator-AI-main/src/backend/services/code.service.ts">
import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { Injectable } from "injection-js";
import { Services } from "./services";
import { AGENTS } from "@/common/constants/agents.constants";

@Injectable()
export class CodeService {
  public findFilePaths(paths: string[]): string[] {
    return paths.map(this.findFilePath.bind(this)); // Bind to the service instance
  }

  public findFilePath(filePath: string): string {
    if (fs.existsSync(filePath)) {
      return filePath;
    }

    const parts = filePath.split(path.sep);
    let currentPath = parts[0];

    // Traverse the path from the top to find the deepest valid directory
    for (let i = 1; i < parts.length; i++) {
      currentPath = path.join(currentPath, parts[i]);
      if (!fs.existsSync(currentPath)) {
        currentPath = path.dirname(currentPath);
        break;
      }
    }

    const fileName = parts[parts.length - 1];
    let dirToSearch = currentPath;
    let foundFiles = this.findFilesInDirectory(dirToSearch, fileName);

    while (!foundFiles?.length) {
      dirToSearch = path.dirname(dirToSearch);
      if (dirToSearch === ".") break;
      foundFiles = this.findFilesInDirectory(dirToSearch, fileName);
    }

    if (foundFiles.length === 1) {
      return foundFiles[0];
    } else if (foundFiles.length > 1) {
      const parentDir = parts[parts.length - 2];
      for (const file of foundFiles) {
        if (path.basename(path.dirname(file)) === parentDir) {
          return file;
        }
      }
    }

    console.error(`File not found: ${filePath}`);
    console.log(`Creating file: ${filePath}`);

    fs.writeFileSync(filePath, "", "utf-8");
    return filePath;
  }

  /**
   * Recursively searches for files with a given name in a directory and its subdirectories.
   * @param dir The directory to search in.
   * @param fileName The name of the file to search for.
   * @returns An array of file paths that match the file name.
   */
  private findFilesInDirectory(dir: string, fileName: string): string[] {
    try {
      const stat = fs.statSync(dir);
      if (!stat.isDirectory()) return [];
    } catch (err) {
      return [];
    }

    const files: string[] = [];
    try {
      const items = fs.readdirSync(dir);

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isFile() && path.basename(fullPath) === fileName) {
          files.push(fullPath);
        } else if (stat.isDirectory()) {
          files.push(...this.findFilesInDirectory(fullPath, fileName)); // Use this.findFilesInDirectory
        }
      }
    } catch (err) {
      console.error(`Error reading directory ${dir}:`, err);
    }

    return files;
  }

  getDiff(diffText: string) {
    const diffLines = diffText.split("\n");

    let fileToChange: string | undefined = undefined;
    let originalCode: string | undefined = undefined;
    let modifiedCode: string | undefined = undefined;
    let inSearchBlock = false;
    let inReplaceBlock = false;
    let inFilePathBlock = false;

    const changes = [];

    for (const line of diffLines) {
      if (line.startsWith("\`\`\`diff")) {
        if (fileToChange && originalCode && modifiedCode) {
          changes.push({ fileToChange, originalCode, modifiedCode });
        }
        fileToChange = undefined;
        originalCode = undefined;
        modifiedCode = undefined;
        inFilePathBlock = true;
        continue;
      }

      if (inFilePathBlock) {
        fileToChange = line.trim();
        inFilePathBlock = false;
        continue;
      }

      if (line.startsWith("<<<<<<< SEARCH")) {
        inSearchBlock = true;
        inReplaceBlock = false;
        continue;
      }

      if (line.startsWith("=======")) {
        inSearchBlock = false;
        inReplaceBlock = true;
        continue;
      }

      if (line.startsWith(">>>>>>>")) {
        if (fileToChange && originalCode && modifiedCode) {
          changes.push({ fileToChange, originalCode, modifiedCode });
        }
        fileToChange = undefined;
        originalCode = undefined;
        modifiedCode = undefined;
        inSearchBlock = false;
        inReplaceBlock = false;
        continue;
      }

      if (inSearchBlock && originalCode !== undefined) {
        originalCode += line + "\n";
      } else if (inSearchBlock) {
        originalCode = line + "\n";
      } else if (inReplaceBlock && modifiedCode !== undefined) {
        modifiedCode += line + "\n";
      } else if (inReplaceBlock) {
        modifiedCode = line + "\n";
      }
    }

    // Push the last block if it exists
    if (fileToChange && originalCode && modifiedCode) {
      changes.push({ fileToChange, originalCode, modifiedCode });
    }

    return changes;
  }

  public async applyDiffs(
    diffText: string,
    trySmartApply: (
      filePath: string,
      originalCode: string,
      modifiedCode: string
    ) => void
  ): Promise<void> {
    const blocks = this.getDiff(diffText);
    console.log({ diffText, blocks });

    for await (const block of blocks) {
      const { fileToChange, originalCode, modifiedCode } = block;

      const currentFilePath = this.findFilePath(fileToChange); // Use injected service

      const resCode = await this.applyChangesToFile(
        currentFilePath,
        originalCode,
        modifiedCode
      );

      if (resCode) {
        trySmartApply(currentFilePath, originalCode, modifiedCode);
      }
    }
  }

  private escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  private async applyChangesToFile(
    filePath: string,
    originalCode: string,
    modifiedCode: string
  ): Promise<boolean> {
    console.log({ filePath, originalCode, modifiedCode });

    try {
      const fileContent = await fs.promises.readFile(filePath, "utf8");
      if (!originalCode ) {
        await fs.promises.writeFile(filePath, modifiedCode, "utf8");
      }

      const whitespaceFlexibleOriginalCode = this.escapeRegExp(originalCode)
        .split("\n")
        .map((line) => line.trim().replace(/\s+/g, "\\s+"))
        .join("\\s*");

      const regex = new RegExp(whitespaceFlexibleOriginalCode, "g");
      console.log({ whitespaceFlexibleOriginalCode });

      const updatedContent = fileContent.replace(regex, modifiedCode);

      await fs.promises.writeFile(filePath, updatedContent, "utf8");
      console.log(`Applied changes to ${filePath}`);

      return fileContent === updatedContent;
    } catch (error) {
      console.error(`Error applying changes to ${filePath}:`, error);
      return false; // Indicate failure
    }
  }

  private getFileContent(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const data = fs.readFileSync(filePath, "utf-8");
        resolve(data);
      } catch (error) {
        console.error("Error reading file:", error);
        reject("Error reading file");
      }
    });
  }

  private async writeFileContent(
    filePath: string,
    content: string
  ): Promise<void> {
    const fileUri = vscode.Uri.file(filePath);
    const encoder = new TextEncoder();
    await vscode.workspace.fs.writeFile(fileUri, encoder.encode(content));
  }

  private async openFileAndShowDiff(filePath: string): Promise<void> {
    const fileUri = vscode.Uri.file(filePath);
    const document = await vscode.workspace.openTextDocument(fileUri);
    await vscode.window.showTextDocument(document);
    await vscode.commands.executeCommand("git.openChange", fileUri);
  }

  private extractCodeFromResponse(response: string): string {
    const codeBlockRegex = /```[\w]*\n([\s\S]*?)\n```/;
    const match = response.match(codeBlockRegex);
    return match ? match[1] : response;
  }

  private extractDiffFromResponse(response: string): string {
    const diffBlockRegex = /```diff\n([\s\S]*?)\n```/;
    console.log(response);
    const match = response.match(diffBlockRegex);
    return match ? match[1] : response;
  }

  private createPromptForLLM(filePath: string, fileContent: string): string {
    return `Based on the plan above and previous conversation, please give the updated code for the file: ${filePath}.
      Also please make sure to give full file code in the response.
      `;
  }

  async requestFileCode(
    filePath: string,
    chatHistory: any[],
    selectedFiles: string[],
    onChunk?: (path: string, chunk: string) => void
  ) {
    ``;
    const fsService = Services.getFSService();
    const absoluteFilePath = await fsService.resolveFilePath(filePath);
    if (!absoluteFilePath) {
      throw new Error(`Could not resolve file path: ${filePath}`);
    }

    try {
      // Check if the file exists
      if (!fs.existsSync(absoluteFilePath)) {
        // If the file doesn't exist, create it
        if (path.isAbsolute(absoluteFilePath)) {
          // If the path is absolute, create it at that path
          fs.writeFileSync(absoluteFilePath, "");
        } else {
          // If the path is relative, create it relative to the workspace directory
          const workspacePath =
            vscode.workspace.workspaceFolders![0].uri.fsPath;
          const fullFilePath = path.join(workspacePath, absoluteFilePath);
          fs.writeFileSync(fullFilePath, "");
        }
      }

      const fileContentString = await this.getFileContent(absoluteFilePath);
      const finalMessage = this.createPromptForLLM(
        absoluteFilePath,
        fileContentString
      );
      const response = await Services.getLlmService().sendPrompt(
        [
          ...chatHistory,
          {
            user: "instructor",
            message: AGENTS.Developer_diff.systemInstructions,
          },
          { user: "user", message: finalMessage },
        ],
        selectedFiles,
        (chunk: string) => {
          if (onChunk) {
            onChunk(absoluteFilePath, chunk);
          }
        }
      );

      const updatedCode = await this.applyDiffs(response.response, () => {});

      // TODO: Instead of showing the diff after making change, we can show it before and ask user to apply the changes
      //   await this.openFileAndShowDiff(absoluteFilePath);
      return {
        filePath: absoluteFilePath,
        fileContent: response.response,
      };
    } catch (error) {
      console.error(`Error processing file: ${error}`);
      throw error;
    }
  }
}
</file>

<file path="The-Creator-AI-main/src/backend/services/fs.service.ts">
import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { Injectable } from "injection-js";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { FileNode } from "@/common/types/file-node";
import { Services } from "@/backend/services/services";

@Injectable()
export class FSService {
  createFileTree(
    workspaceRoots: vscode.Uri[],
    files: vscode.Uri[],
    fromSystemRoot = false
  ): FileNode[] {
    const rootNodes: FileNode[] = workspaceRoots.map((root) => {
      if (!fromSystemRoot) {
        return {
          name: root.path.split("/").pop() || "",
          children: [],
          absolutePath: root.fsPath,
        };
      }
      const parts = root.path.split("/").filter(Boolean);
      let currentNode: FileNode = {
        name: parts[0],
        children: [],
        absolutePath: "/" + parts[0],
      };
      let rootNode = currentNode;

      for (let i = 1; i < parts.length; i++) {
        const newNode: FileNode = {
          name: parts[i],
          children: [],
          absolutePath: path.join(currentNode.absolutePath, parts[i]),
        };
        currentNode.children!.push(newNode);
        currentNode = newNode;
      }

      return rootNode;
    });
    const leafNodes = rootNodes.map((root) => {
      let currentNode = root;
      while (currentNode.children && currentNode.children.length > 0) {
        currentNode = currentNode.children[currentNode.children.length - 1];
      }
      return currentNode;
    });

    const workspaceRootPaths = workspaceRoots.map((root) => root.fsPath);

    for (const file of files) {
      const workspaceRootIndex = workspaceRootPaths.findIndex((rootPath) =>
        file.fsPath.startsWith(rootPath)
      );

      if (workspaceRootIndex !== -1) {
        const relativePath = path.relative(
          workspaceRootPaths[workspaceRootIndex],
          file.fsPath
        );
        const parts = relativePath.split(path.sep).filter(Boolean);

        let currentNode = leafNodes[workspaceRootIndex];

        for (let i = 0; i < parts.length; i++) {
          const part = parts[i];
          let child = currentNode.children?.find((c) => c.name === part);

          if (!child) {
            child = {
              name: part,
              absolutePath: path.join(currentNode.absolutePath, part),
            };
            if (i < parts.length - 1) {
              child.children = [];
            }
            currentNode.children = currentNode.children || [];
            currentNode.children.push(child);
          }

          currentNode = child;
        }
      }
    }

    return rootNodes;
  }

  readFileContent(filePath: string): string {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      return data;
    } catch (error) {
      console.error("Error reading file:", error);
      return "Error reading file";
    }
  }

  readSelectedFilesContent(filePaths: string[]): {
    [filePath: string]: string;
  } {
    const fileContents: { [filePath: string]: string } = {};
    const processedPaths = new Set<string>();

    const readContentRecursive = (filePath: string) => {
      if (processedPaths.has(filePath)) {
        return;
      }
      processedPaths.add(filePath);

      try {
        if (fs.statSync(filePath).isDirectory()) {
          fs.readdirSync(filePath).forEach((file) =>
            readContentRecursive(path.join(filePath, file))
          );
        } else {
          try {
            fileContents[filePath] = fs.readFileSync(filePath, "utf8");
          } catch (error) {
            console.error(`Error reading file ${filePath}: ${error}`);
          }
        }
      } catch (error) {
        console.error(`Error reading file ${filePath}: ${error}`);
      }
    };

    filePaths.forEach((filePath) => readContentRecursive(filePath));

    return fileContents;
  }

  async resolveFilePath(originalFilePath: string): Promise<string | null> {
    async function findFile(filePath: string): Promise<string | null> {
      const files = await vscode.workspace.findFiles(
        `**/${filePath}`,
        null,
        10
      );

      if (files.length === 1) {
        return files[0].fsPath;
      } else if (files.length > 1) {
        const selectedFile = await vscode.window.showQuickPick(
          files.map((file) => file.fsPath),
          {
            placeHolder: "Multiple files found. Please select the correct one.",
          }
        );
        return selectedFile || null;
      } else {
        const pathParts = filePath.split("/");
        if (pathParts.length > 1) {
          // Drop the first part of the path and try again
          const remainingPath = pathParts.slice(1).join("/");
          return findFile(remainingPath);
        }
        return null;
      }
    }

    const resolvedPath = await findFile(originalFilePath);

    if (resolvedPath) {
      return resolvedPath;
    } else {
      // File not found, ask the user to confirm or modify the path for creating an empty file
      // TODO: What if there are multiple workspace folders?
      const workspacePath = vscode.workspace.workspaceFolders![0].uri.fsPath;
      let newFilePath = await vscode.window.showInputBox({
        prompt:
          "The file is not found. Please confirm or modify the file path to create an empty file.",
        value: originalFilePath,
      });
      const isAbsolute = path.isAbsolute(newFilePath);
      newFilePath = isAbsolute
        ? newFilePath
        : path.join(workspacePath, newFilePath);

      if (newFilePath) {
        const dirPath = path.dirname(newFilePath);

        // Create directory if it doesn't exist
        if (!fs.existsSync(dirPath)) {
          fs.mkdirSync(dirPath, { recursive: true });
        }

        console.log("Creating new file at", newFilePath);

        // Create empty file
        fs.writeFileSync(newFilePath, "");
        vscode.window.showTextDocument(vscode.Uri.file(newFilePath));
        return newFilePath;
      }
      return null;
    }
  }

  async handleFileOpen(data: { filePath: string }) {
    const { filePath } = data;

    const absoluteFilePath = await this.resolveFilePath(filePath);
    if (!absoluteFilePath) {
      return; // Error message already shown in resolveFilePath
    }

    try {
      // Check if the file exists
      if (!fs.existsSync(absoluteFilePath)) {
        // If the file doesn't exist, create it
        if (path.isAbsolute(absoluteFilePath)) {
          // If the path is absolute, create it at that path
          fs.writeFileSync(absoluteFilePath, "");
        } else {
          // If the path is relative, create it relative to the workspace directory
          const workspacePath =
            vscode.workspace.workspaceFolders![0].uri.fsPath;
          const fullFilePath = path.join(workspacePath, absoluteFilePath);
          fs.writeFileSync(fullFilePath, "");
        }
      }

      await vscode.window.showTextDocument(vscode.Uri.file(absoluteFilePath), {
        preview: false,
      });
    } catch (error) {
      vscode.window.showErrorMessage(`Error opening file: ${error}`);
    }
  }

  setupFileSystemWatcher(serverIpc: any) {
    let fileSystemWatcher: vscode.FileSystemWatcher | undefined;
    if (fileSystemWatcher) {
      fileSystemWatcher.dispose();
    }

    fileSystemWatcher = vscode.workspace.createFileSystemWatcher("**/*");

    fileSystemWatcher.onDidCreate(() => this.sendWorkspaceFiles(serverIpc));
    fileSystemWatcher.onDidDelete(() => this.sendWorkspaceFiles(serverIpc));
    fileSystemWatcher.onDidChange(() => this.sendWorkspaceFiles(serverIpc));
  }

  async handleWorkspaceFilesRequest(serverIpc: ServerPostMessageManager) {
    await this.sendWorkspaceFiles(serverIpc);

    // Set up file system watcher if not already set
    this.setupFileSystemWatcher(serverIpc);
  }

  async sendWorkspaceFiles(serverIpc: ServerPostMessageManager) {
    const workspaceRoots =
      vscode.workspace.workspaceFolders?.map((folder) => folder.uri) || [];
    const fsService = Services.getFSService();
    const files = await fsService.getFilesRespectingGitignore();
    const workspaceFileTree = fsService.createFileTree(workspaceRoots, files);

    serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, {
      files: workspaceFileTree,
    });
  }

  async getFilesRespectingGitignore(): Promise<vscode.Uri[]> {
    const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
    if (!workspaceFolder) {
      return [];
    }

    const gitignores = await this.findGitignores(workspaceFolder.uri);
    const allFiles = await vscode.workspace.findFiles("**/*");

    return allFiles.filter((file) => !this.isIgnored(file.fsPath, gitignores));
  }

  async findGitignores(workspaceUri: vscode.Uri): Promise<any[]> {
    const gitignoreFiles = await vscode.workspace.findFiles("**/.gitignore");
    const gitignores: any[] = [];

    for (const gitignoreUri of gitignoreFiles) {
      const content = await vscode.workspace.fs.readFile(gitignoreUri);
      gitignores.push({
        path: path.dirname(gitignoreUri.fsPath),
        ig: this.ignore().add(content.toString()),
      });
    }

    return gitignores;
  }

  ignore(): any {
    return {
      add: (content: string) => {
        const ignored = (filePath: string) => {
          return content
            .split("\n")
            .filter(Boolean)
            .some((line) => filePath.includes(line));
        };

        return {
          ignores: ignored,
        };
      },
    };
  }

  isIgnored(filePath: string, gitignores: any[]): boolean {
    for (const { path: gitignorePath, ig } of gitignores) {
      if (filePath.startsWith(gitignorePath)) {
        const relativePath = path.relative(gitignorePath, filePath);
        if (ig.ignores(relativePath)) {
          return true;
        }
      }
    }
    return false;
  }
}
</file>

<file path="The-Creator-AI-main/src/backend/services/git.service.ts">
import * as child_process from "child_process";
import * as vscode from "vscode";
import { Injectable } from "injection-js";

@Injectable()
export class GitService {
    /**
     * Commits changes to the Git repository with the provided message.
     *
     * @param commitMessage - The commit message to use.
     * @param commitDescription - (Optional) A commit description to include.
     * @returns The Git commit output as a string, or an empty string if an error occurs.
     */
    gitCommit = (
        commitMessage: string,
        commitDescription?: string
    ): string => {
        try {
            // 1. Construct the commit command
            let commitCommand = `git commit -m "${commitMessage}"`;

            // 2. (Optional) Include description if provided
            if (commitDescription?.trim()) {
                commitCommand += ` -m "${commitDescription}"`;
            }

            // 3. Execute the commit command
            // current working directory
            const commitOutput = child_process.execSync(commitCommand, {
                cwd: vscode.workspace.rootPath,
            });

            // 4. Handle the commit result
            console.log("Commit successful:", commitOutput.toString());
            return commitOutput.toString();
        } catch (error) {
            console.error("Error during commit:", error);
            return "";
        }
    };
}
</file>

<file path="The-Creator-AI-main/src/backend/services/llm.service.ts">
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import * as openai from "openai";
import * as vscode from "vscode";
import { ChatMessage } from "../repositories/chat.respository";
import { Inject, Injectable } from "injection-js";
import { SettingsRepository } from "../repositories/settings.repository";
import { LlmServiceEnum } from "../types/llm-service.enum";
import { PersistentStoreRepository } from "../repositories/persistent-store.repository";
import { ChangePlan } from "@/client/views/change-plan.view/store/change-plan-view.state-type";
import { StorageKeysEnum } from "../types/storage-keys.enum";
import { FSService } from "./fs.service";

@Injectable()
export class LlmService {
  private geminiProModel: string = "gemini-1.5-pro-exp-0827";
  private geminiFlashModel: string = "gemini-1.5-flash-latest";
  private geminiFlash2Model: string = "models/gemini-2.0-flash-exp";
  private openaiModel: string = "gpt-3.5-turbo";
  private currentModel: string = this.geminiFlash2Model; 

  constructor(
    @Inject(FSService) private readonly fsService: FSService,
    @Inject(SettingsRepository)
    private readonly settingsRepository: SettingsRepository,
    @Inject(PersistentStoreRepository)
    private readonly persistentStoreRepository: PersistentStoreRepository
  ) {}

  async sendPrompt(
    chatHistory: ChatMessage[],
    selectedFiles: string[] = [],
    onChunk?: (chunk: string, modelType: string, modelName: string) => void
  ): Promise<{ response: string; modelType: string; modelName: string }> {
    const { type, apiKeys } = await this.getApiKey();
    console.log({ type, apiKeys, chatHistory, selectedFiles });

    // Fetch past change plans
    const pastChangePlans = await this.getPastChangePlans();

    // Read selected files content
    const fileContents =
      this.fsService.readSelectedFilesContent(selectedFiles);

    // Append file contents to prompt
    let prompt = "";
    for (const filePath in fileContents) {
      prompt += `\n\n\`\`\`
File: ${filePath}
${fileContents[filePath]}
\`\`\`\n\n`;
    }

    // Append past change plans to prompt
    if (pastChangePlans?.length) {
      prompt += `\n\nPast Change Plans:\n\`\`\`json\n${JSON.stringify(
        pastChangePlans.map(({ planTitle, planDescription, planJson }) => ({ planTitle, planDescription, planJson })),
        null,
        2
      )}\n\`\`\`\n\n`;
    }

    chatHistory.forEach((message) => {
      prompt += `${message.user}: ${message.message}\n`;
    });

    console.log(`Prompt:\n\n\n`);
    console.log(prompt);

    if (type === "gemini") {
      return this.sendPromptToGemini(prompt, apiKeys, onChunk);
    } else if (type === "openai") {
      return this.sendPromptToOpenAI(prompt, apiKeys[0], onChunk); // Assuming only one OpenAI key is stored
    } else {
      throw new Error(
        "No API key found. Please set either GEMINI_API_KEY or OPENAI_API_KEY environment variable."
      );
    }
  }

  private async sendPromptToGemini(
    prompt: string,
    apiKeys: string[],
    onChunk?: (chunk: string, modelType: string, modelName: string) => void
  ): Promise<{ response: string; modelType: string; modelName: string }> {
    let debounce = 0;
    let attempts = 0;
    let responseText = "";
    let currentKeyIndex = 0; // Track the current key being used

    while (attempts < 3) {
      attempts++;
      if (debounce > 0) {
        console.log(`Waiting for ${Math.floor(debounce / 1000)} seconds...`);
      }
      console.log(`Using model: ${this.currentModel}`);
      await new Promise((resolve) => setTimeout(resolve, debounce));
      try {
        const genAI = new GoogleGenerativeAI(apiKeys[currentKeyIndex]);
        const gemini = genAI.getGenerativeModel({
          model: this.currentModel,
        }); // Use currentModel here
        const response = await gemini.generateContentStream({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            responseMimeType: "text/plain",
          },
          safetySettings: [
            {
              category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
          ],
        });

        for await (const chunk of response.stream) {
          responseText += chunk.text();
          // console.log(chunk.text());
          if (onChunk) {
            onChunk(chunk.text(), "gemini", this.currentModel);
          }
        }
        debounce = 0;
        return {
          response: responseText,
          modelType: "gemini",
          modelName: this.currentModel,
        };
      } catch (e: any) {
        debounce += 5000;
        // Handle specific errors based on error type and status
        if (e.status === 429) {
          if (currentKeyIndex < apiKeys.length - 1) {
            // Pro model rate limit reached, try with the next key
            currentKeyIndex++;
            console.log(
              `${this.currentModel} limit reached for key ${
                apiKeys[currentKeyIndex - 1]
              }, trying with key ${apiKeys[currentKeyIndex]} `
            );
            continue; // Retry with the next key
          }
        } else {
          // For other errors, log the error and potentially throw or handle differently
          console.error(`Error during LLM request (attempt ${attempts}):`, e);
          // You might want to throw the error here or handle it differently based on your needs
          // throw new Error("Could not get a response from Gemini after multiple attempts.");
        }
      }
    }
    // If all attempts fail, throw an error
    throw new Error(
      "Could not get a response from Gemini after multiple attempts."
    );
  }

  getModelName(): string {
    return this.currentModel;
  }

  private async sendPromptToOpenAI(
    prompt: string,
    apiKey: string,
    onChunk?: (chunk: string, modelType: string, modelName: string) => void
  ): Promise<{ response: string; modelType: string; modelName: string }> {
    const model = new openai.OpenAI({ apiKey });

    this.currentModel = this.openaiModel;
    const response = await model.completions.create({
      model: this.openaiModel,
      prompt: prompt,
      stream: true,
    });

    let responseText = "";
    for await (const part of response) {
      const chunk = part.choices[0]?.text || "";
      responseText += chunk;
      if (onChunk) {
        onChunk(chunk, "openai", this.openaiModel);
      }
    }

    return {
      response: responseText,
      modelType: "openai",
      modelName: this.openaiModel,
    };
  }

  private async getApiKey(): Promise<any> {
    const apiKeys = await this.settingsRepository.getLLMApiKeys();
    if (!apiKeys) {
      throw new Error("API Keys not found!");
    }

    const type = Object.keys(apiKeys)[0] as LlmServiceEnum;

    if (type && Array.isArray(apiKeys[type])) {
      return { type, apiKeys: apiKeys[type] };
    } else {
      await this.getApiKeyFromUser();
      return await this.getApiKey();
    }
  }

  private async getPastChangePlans(): Promise<ChangePlan[] | undefined> {
    try {
      return this.persistentStoreRepository.getChangePlanViewState()
        ?.changePlans;
    } catch (error) {
      console.error("Error retrieving past change plans:", error);
      return undefined;
    }
  }

  private async setLLMApiKey(
    service: LlmServiceEnum,
    apiKey: string
  ): Promise<void> {
    await this.settingsRepository.setLLMApiKey(service, apiKey);
  }

  private async deleteLLMApiKey(
    service: LlmServiceEnum,
    apiKeyToDelete: string
  ): Promise<void> {
    await this.settingsRepository.deleteLLMApiKey(service, apiKeyToDelete);
  }

  private async getApiKeyFromUser(): Promise<any> {
    const apiChoice = await vscode.window.showQuickPick(
      [
        { label: "Gemini API Key", value: "gemini" },
        { label: "OpenAI API Key", value: "openai" },
      ],
      { placeHolder: "Select the API you want to use" }
    );

    if (apiChoice) {
      const apiKeyInput = await vscode.window.showInputBox({
        prompt: `Enter your ${apiChoice.label}`,
        placeHolder:
          apiChoice.value === "gemini"
            ? "Enter Gemini API Key"
            : "Enter OpenAI API Key",
        password: true, // Mask the input for security
      });
      console.log({ apiKeyInput, apiChoice });
      if (apiKeyInput) {
        await this.setLLMApiKey(apiChoice.value as LlmServiceEnum, apiKeyInput);
      }
    }
  }
}
</file>

<file path="The-Creator-AI-main/src/backend/services/logger.service.ts">
import * as fs from "fs";
import * as path from "path";
import { Injectable } from "injection-js";

@Injectable()
export class LoggerService {
  private logFilePath: string;

  constructor() {
    // Default log file path, you might want to make this configurable
    this.logFilePath = path.join(
      __dirname,
      "..",
      "..",
      "..",
      "logs",
      "extension.log"
    );
    // Ensure the logs directory exists
    const logDir = path.dirname(this.logFilePath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  private _log(level: string, message: string, ...args: any[]): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message} ${
      args.length > 0 ? JSON.stringify(args) : ""
    }\n`;

    fs.appendFile(this.logFilePath, logMessage, (err) => {
      if (err) {
        console.error("Failed to write to log file:", err);
      }
    });
  }

  log(message: string, ...args: any[]): void {
    this._log("log", message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this._log("info", message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this._log("warn", message, ...args);
  }

  error(message: string, ...args: any[]): void {
    this._log("error", message, ...args);
  }
}
</file>

<file path="The-Creator-AI-main/src/backend/services/message.service.ts">
import { Injectable } from "injection-js";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { mergeOpenEditorsWithSelectedFiles } from "@/backend/utils/mergeOpenEditorsWithSelectedFiles";
import { Services } from "./services";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";

@Injectable()
export class MessageService {

  async sendMessage(
    serverIpc: ServerPostMessageManager,
    data: {
      chatHistory: any[];
      selectedFiles: string[];
    }
  ) {
    const { chatHistory, selectedFiles } = data;

    const updatedSelectedFiles = mergeOpenEditorsWithSelectedFiles(selectedFiles);

    const response = await Services.getLlmService().sendPrompt(
      chatHistory,
      updatedSelectedFiles
    );

    serverIpc.sendToClient(ServerToClientChannel.SendMessage, {
      message: response.response,
    });
  }

  async streamMessage(
    serverIpc: ServerPostMessageManager,
    data: {
      chatHistory: any[];
      selectedFiles: string[];
    }
  ) {
    try {
      const { chatHistory, selectedFiles } = data;

      const updatedSelectedFiles =
        mergeOpenEditorsWithSelectedFiles(selectedFiles);

      const response = await Services.getLlmService().sendPrompt(
        chatHistory,
        updatedSelectedFiles,
        (chunk: string) => {
          serverIpc.sendToClient(ServerToClientChannel.StreamMessage, { chunk });
        }
      );
        serverIpc.sendToClient(ServerToClientChannel.SendMessage, {
            message: response.response,
          });
    } catch (error: any) {
      serverIpc.sendToClient(ServerToClientChannel.SendMessage, error.message);
    }
  }
}
</file>

<file path="The-Creator-AI-main/src/backend/services/plan-exim.service.ts">
import { Injectable } from 'injection-js';
import * as vscode from 'vscode';
import { Services } from './services';
import { ChangePlan } from '@/client/views/change-plan.view/store/change-plan-view.state-type';
import { initialState } from '@/client/views/change-plan.view/store/change-plan-view.initial-state';

@Injectable()
export class PlanExImService {
    async exportAllChangePlans(): Promise<void> {
        const persistentStoreRepository = Services.getPersistentStoreRepository();
        const store = persistentStoreRepository.getChangePlanViewState();
        const changePlans = store?.changePlans || [];

        const jsonString = JSON.stringify(changePlans, null, 2);
        Services.getLoggerService().log(jsonString);

        // Get the workspace folder name
        const workspaceFolders = vscode.workspace.workspaceFolders;
        const workspaceFolderName = workspaceFolders && workspaceFolders.length > 0
            ? workspaceFolders[0].name
            : 'default'; // Provide a default if no workspace is open

        const options: vscode.SaveDialogOptions = {
            defaultUri: vscode.Uri.file(`all_change_plans_${workspaceFolderName}.json`),
            filters: {
                'JSON': ['json']
            }
        };

        const fileUri = await vscode.window.showSaveDialog(options);

        if (fileUri) {
            try {
                await vscode.workspace.fs.writeFile(fileUri, Buffer.from(jsonString, 'utf-8'));
                vscode.window.showInformationMessage(`All change plans exported successfully.`);
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to export change plans: ${error}`);
            }
        }
    }

    async importAllChangePlans(): Promise<void> {
        const options: vscode.OpenDialogOptions = {
            canSelectMany: false,
            openLabel: 'Import',
            filters: {
                'JSON': ['json']
            }
        };

        const fileUri = await vscode.window.showOpenDialog(options);

        if (fileUri && fileUri[0]) {
            try {
                const fileContent = await vscode.workspace.fs.readFile(fileUri[0]);
                const plansJson: ChangePlan[] = JSON.parse(Buffer.from(fileContent).toString('utf-8'));

                console.log({ fileContent, plansJson });

                if (!Array.isArray(plansJson)) {
                    vscode.window.showErrorMessage('Invalid change plans format. Expected an array of plans.');
                    return;
                }

                const persistentStoreRepository =
                    Services.getPersistentStoreRepository();
                const store = persistentStoreRepository.getChangePlanViewState();
                const currentPlans = store?.changePlans || [];
                const updatedPlans = [...currentPlans];

                for (const plan of plansJson) {
                    if (!this.isValidChangePlan(plan)) {
                        vscode.window.showWarningMessage(`Skipping invalid change plan: ${(plan as ChangePlan).planTitle}`);
                        continue;
                    }

                    const existingPlanIndex = currentPlans.findIndex(
                        p => p.planTitle === plan.planTitle && p.planDescription === plan.planDescription
                    );

                    if (existingPlanIndex !== -1) {
                        // Update existing plan
                        updatedPlans[existingPlanIndex] = plan;
                    } else {
                        // Add new plan
                        updatedPlans.push(plan);
                    }
                }

                persistentStoreRepository.setChangePlanViewState({
                    ...initialState,
                    changePlans: updatedPlans,
                });
                vscode.window.showInformationMessage(`Change plans imported successfully.`);
            } catch (error) {
                vscode.window.showErrorMessage(`Failed to import change plans: ${error}`);
            }
        }
    }

    private isValidChangePlan(plan: any): plan is ChangePlan {
        return (
            typeof plan === 'object' &&
            plan !== null &&
            typeof plan.planTitle === 'string' &&
            typeof plan.planDescription === 'string' &&
            typeof plan.llmResponse === 'string' &&
            typeof plan.planJson === 'object' &&
            Array.isArray(plan.chatHistory) &&
            Array.isArray(plan.selectedFiles)
        );
    }
}
</file>

<file path="The-Creator-AI-main/src/backend/services/services.ts">
import { ReflectiveInjector } from "injection-js";
import "reflect-metadata";
import { FSService } from "./fs.service";
import { LlmService } from "./llm.service";
import { SettingsRepository } from "../repositories/settings.repository";
import { ChatRepository } from "../repositories/chat.respository";
import { PersistentStoreRepository } from "../repositories/persistent-store.repository";
import { LoggerService } from "./logger.service";
import { PlanExImService } from "./plan-exim.service";
import { CodeService } from "./code.service";
import { GitService } from "./git.service";
import { MessageService } from "./message.service";

export class Services {
  static injector: ReflectiveInjector;

  static async initialize(): Promise<void> {
    Services.injector = ReflectiveInjector.resolveAndCreate([
      ChatRepository,
      SettingsRepository,
      PersistentStoreRepository,
      FSService,
      LlmService,
      PlanExImService,
      LoggerService,
      CodeService,
      GitService,
      MessageService,
    ]);
  }

  static getFSService(): FSService {
    return Services.injector.get(FSService);
  }

  static getLlmService(): LlmService {
    return Services.injector.get(LlmService);
  }

  static getPersistentStoreRepository(): PersistentStoreRepository {
    return Services.injector.get(PersistentStoreRepository);
  }

  static getSettingsRepository(): SettingsRepository {
    return Services.injector.get(SettingsRepository);
  }

  static getPlanExImService(): PlanExImService {
    return Services.injector.get(PlanExImService);
  }

   static getCodeService(): CodeService {
    return Services.injector.get(CodeService);
  }

  static getLoggerService(): LoggerService {
    return Services.injector.get(LoggerService);
  }

   static getGitService(): GitService {
    return Services.injector.get(GitService);
  }

    static getMessageService(): MessageService {
    return Services.injector.get(MessageService);
  }
}
</file>

<file path="The-Creator-AI-main/src/backend/services/task-queue.service.ts">
import { Injectable } from "injection-js";
import { randomUUID } from "crypto";

interface Task<TaskType> {
  task: any;
  taskType: TaskType;
}

type Subscriber = {
  id: string;
  callback: (task: any) => Promise<any>;
};

@Injectable()
export class TaskQueueService<TaskType extends string> {
  private taskQueues: Record<TaskType, Task<any>[]> = {} as Record<
    TaskType,
    Task<any>[]
  >;
  private subscribers: Record<
    TaskType,
    Record<string, Subscriber>
  > = {} as Record<TaskType, Record<string, Subscriber>>;
  private isProcessing: Record<TaskType, boolean> = {} as Record<
    TaskType,
    boolean
  >;
  private responses: Record<
    TaskType,
    Record<string, any[]>
  > = {} as Record<TaskType, Record<string, any[]>>;
  private errors: Record<TaskType, Record<string, any[]>> =
    {} as Record<TaskType, Record<string, any[]>>;

  /**
   * Publishes a task to the queue.
   * @param taskType The type of the task
   * @param task The task to be added to the queue
   */
  publishTask(taskType: TaskType, task: any): void {
    if (!this.taskQueues[taskType]) {
      this.taskQueues[taskType] = [];
    }
    this.taskQueues[taskType].push({ task, taskType });
    if (!this.isProcessing[taskType]) {
      this.isProcessing[taskType] = false;
      this.processTasks(taskType);
    }
  }

  /**
   * Subscribes a callback to process tasks.
   * @param taskType The type of the task
   * @param subscriber A callback function that processes a task and returns a value.
   */
  async subscribe(
    taskType: TaskType,
    subscriber: (task: any) => Promise<any>
  ): Promise<string> {
    const subscriberId = randomUUID();
    if (!this.subscribers[taskType]) {
      this.subscribers[taskType] = {};
    }
    this.subscribers[taskType as string][subscriberId] = {
      id: subscriberId,
      callback: subscriber,
    };
    if (!this.isProcessing[taskType]) {
      this.isProcessing[taskType] = false;
      this.processTasks(taskType);
    }
    return subscriberId;
  }

  /**
   * Processes the tasks in the queue using the registered subscribers.
   * It processes each task sequentially, passing it to all the subscribers and stores the responses.
   */
  private async processTasks(taskType: TaskType): Promise<void> {
    if (this.isProcessing[taskType]) {
      return;
    }

    this.isProcessing[taskType] = true;
    while (this.taskQueues[taskType]?.length > 0) {
      const currentTask = this.taskQueues[taskType].shift();
      if (currentTask) {
        for (const subscriberId in this.subscribers[taskType]) {
          const subscriber = this.subscribers[taskType][subscriberId];
          try {
            const response = await subscriber.callback(currentTask.task);
            if (!this.responses[taskType]) {
              this.responses[taskType] = {};
            }
            if (!this.responses[taskType][subscriber.id]) {
              this.responses[taskType as string][subscriber.id] = [];
            }
            this.responses[taskType][subscriber.id].push({
              ...currentTask.taskType,
              response,
            });
          } catch (error: any) {
            if (!this.errors[taskType]) {
              this.errors[taskType] = {};
            }
            if (!this.errors[taskType][subscriber.id]) {
              this.errors[taskType as string][subscriber.id] = [];
            }
            this.errors[taskType][subscriber.id].push({
              ...currentTask.taskType,
              error,
            });
            console.error("Error while processing a task", error);
          }
        }
      }
    }
    this.isProcessing[taskType] = false;
  }

  getResponses(taskType: TaskType, subscriberId: string): any[] {
    return this.responses[taskType]?.[subscriberId] || [];
  }

  getErrors(taskType: TaskType, subscriberId: string): any[] {
    return this.errors[taskType]?.[subscriberId] || [];
  }
}
</file>

<file path="The-Creator-AI-main/src/backend/types/llm-service.enum.ts">
export enum LlmServiceEnum {
  GEMINI = "gemini",
  OPENAI = "openai",
  CLAUDE = "claude",
}
</file>

<file path="The-Creator-AI-main/src/backend/types/storage-keys.enum.ts">
export enum StorageKeysEnum {
  LlmApiKeys = "creatorExtension:llmApiKeys",
  ChatRepository = "creatorExtension:chatRepository",
  ChangePlanViewState = "creatorExtension:store:changePlanViewState",
}
</file>

<file path="The-Creator-AI-main/src/backend/utils/handleActiveTabChange.ts">
import * as vscode from "vscode";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { remoteSetChangePlanViewState } from "./remoteSetChangePlanViewState";

/**
 * Handles active tab changes in VS Code and sends the active file path to the server.
 *
 * @param serverIpc - The server IPC instance used to send messages to the server.
 */
export const handleActiveTabChange = (serverIpc: ServerPostMessageManager) => {
  remoteSetChangePlanViewState(
    serverIpc,
    "activeTab",
    vscode.window.activeTextEditor?.document.fileName
  );
  vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor) {
      remoteSetChangePlanViewState(
        serverIpc,
        "activeTab",
        editor.document.fileName
      );
    }
  });
};
</file>

<file path="The-Creator-AI-main/src/backend/utils/mergeOpenEditorsWithSelectedFiles.ts">
import * as vscode from "vscode";

/**
 * Merges the paths of open editors with the provided selected files,
 * ensuring no duplicates and prioritizing open editor paths.
 *
 * @param selectedFiles Array of initially selected file paths.
 * @returns Array of file paths including open editor paths.
 */
export function mergeOpenEditorsWithSelectedFiles(
  selectedFiles: string[]
): string[] {
  const openEditors = vscode.window.tabGroups.all
    .flatMap((group) => group.tabs)
    .map((tab) =>
      tab.input instanceof vscode.TabInputText ||
      tab.input instanceof vscode.TabInputNotebook
        ? tab.input.uri?.fsPath || ""
        : ""
    );

  return openEditors.reduce((acc: string[], tabPath) => {
    const selectedAncestorPath = selectedFiles.find(
      (f) => tabPath.startsWith(f) && f !== tabPath
    );
    if (selectedAncestorPath) {
      return acc;
    } else {
      return [...acc, tabPath];
    }
  }, selectedFiles);
}
</file>

<file path="The-Creator-AI-main/src/backend/utils/remoteSetChangePlanViewState.ts">
import * as vscode from "vscode";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { KeyPaths, KeyPathValue } from "@/common/utils/key-path";
import { ChangePlanViewStore } from "../../client/views/change-plan.view/store/change-plan-view.state-type";

/**
 * Handles active tab changes in VS Code and sends the active file path to the server.
 *
 * @param serverIpc - The server IPC instance used to send messages to the server.
 * @param keyPath - The key path to set in the change plan view store.
 * @param value - The value to set at the key path in the change plan view store.
 */
export const remoteSetChangePlanViewState = <
  Key extends KeyPaths<ChangePlanViewStore>
>(
  serverIpc: ServerPostMessageManager,
  keyPath: Key,
  value: KeyPathValue<Key, ChangePlanViewStore>
) => {
  serverIpc.sendToClient(ServerToClientChannel.SetChangePlanViewState, {
    keyPath,
    value,
  });
};
</file>

<file path="The-Creator-AI-main/src/client/components/AutoResizingTextarea.tsx">
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface AutoResizingTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    placeholder?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    minRows?: number;
    maxRows?: number;
}

const AutoResizingTextarea = forwardRef<HTMLTextAreaElement, AutoResizingTextareaProps>(
    ({ placeholder, value, onChange, minRows = 1, maxRows = Infinity, ...rest }, ref) => {
        const textareaRef = useRef<HTMLTextAreaElement>(null);

        useImperativeHandle(ref, () => textareaRef.current!, []);

        useEffect(() => {
            if (textareaRef.current) {
                textareaRef.current.style.height = '0px'; // Reset height to calculate scrollHeight
                const scrollHeight = textareaRef.current.scrollHeight;

                // Calculate min and max height based on minRows and maxRows
                const lineHeight = parseInt(getComputedStyle(textareaRef.current).lineHeight, 10) || 20; // Fallback to 20px if lineHeight is not found
                const minHeight = minRows * lineHeight;
                const maxHeight = maxRows * lineHeight;

                // Apply height constraints
                const height = Math.max(minHeight, Math.min(scrollHeight, maxHeight));
                textareaRef.current.style.height = height + 'px';
            }
        }, [value, minRows, maxRows]);

        return (
            <textarea
                ref={textareaRef}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                style={{ background: 'inherit' }}
                className={"resize-none overflow-hidden box-border bg-inherit" + (rest.className ? ` ${rest.className}` : '')}
                {...rest}
            />
        );
    }
);

AutoResizingTextarea.displayName = 'AutoResizingTextarea';

export default AutoResizingTextarea;
</file>

<file path="The-Creator-AI-main/src/client/components/Checkbox.tsx">
import React from "react";
import { useEffect, useRef } from "react";

interface CheckboxProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'> {
    checked: boolean;
    indeterminate?: boolean;
    onChange: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: CheckboxProps) => {
    const { checked, onChange, indeterminate, ...rest } = props;
    const cRef = useRef<any>(null);

    useEffect(() => {
        if (cRef.current) {
            cRef.current.indeterminate = indeterminate;
        }
    }, [cRef, indeterminate]);

    return (
        <input type="checkbox" ref={cRef} checked={checked} onChange={(e) => onChange(e.target.checked, e)} {...rest} />
    );
};

export default Checkbox;
</file>

<file path="The-Creator-AI-main/src/client/components/ErrorBoundary.tsx">
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log the error to an error tracking service (optional)
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        // You can integrate with an error tracking service here, e.g., Sentry, Rollbar

        this.setState({ hasError: true, error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div>
                    <h2>Something went wrong.</h2>
                    <p>{this.state.error?.message}</p>
                    {/* You can display more detailed error information here if needed */}
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
</file>

<file path="The-Creator-AI-main/src/client/components/file-tree/FileTree.scss">
/* Import Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Remove default VS Code body padding */
body {
  padding: 0;
}
</file>

<file path="The-Creator-AI-main/src/client/components/file-tree/FileTree.tsx">
import React, { useEffect, useState } from 'react';
import { MdChevronRight } from 'react-icons/md';
import TreeView from '../tree-view/TreeView'; // Import the generic TreeView
import { FileNode } from '../../../common/types/file-node';
import { getFileNodeByPath, addRemovePathInSelectedFiles } from './FileTree.utils';
import Checkbox from '../Checkbox';


interface FileTreeProps {
  data: FileNode[];
  onFileClick?: (filePath: string) => void;
  selectedFiles: string[];
  recentFiles: string[];
  activeFile?: string;
  updateSelectedFiles: (selectedFiles: string[]) => void;
  updateRecentFiles: (recentFiles: string[]) => void;
}

const FileTree: React.FC<FileTreeProps> = ({
  data,
  onFileClick,
  selectedFiles,
  recentFiles,
  activeFile,
  updateSelectedFiles,
  updateRecentFiles
}) => {

  const rootNode = data.find((node) => !node.name.includes('/'));

  // State to manage expanded nodes
  const [expandedNodes, setExpandedNodes] = useState<string[]>([rootNode?.name || '']);


  useEffect(() => {
    // If selectedFiles changes, expand the corresponding nodes
    const toExpand = new Set<string>();
    selectedFiles?.forEach((selectedFile) => {
      const pathParts = selectedFile.split('/');
      // Starting from the root, expand each directory in the path
      let currentPath = '';
      pathParts.forEach((part, index) => {
        currentPath += `${currentPath ? '/' : ''}${part}`;
        const node = getFileNodeByPath(data, currentPath);
        const isLast = index === pathParts.length - 1;
        if (node && !isLast) {
          toExpand.add(currentPath);
        }
      });
    });

    setExpandedNodes(prevExpandedNodes => {
      const newExpandedNodes = [...prevExpandedNodes].filter(path => !toExpand.has(path));
      return [...newExpandedNodes, ...Array.from(toExpand)];
    });
  }, [selectedFiles, data]);


  const handleNodeClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, node: FileNode, path: string) => {
    if ((e.target as HTMLElement)?.classList?.contains('checkbox')) {
      return;
    }
    const isDirectory = Array.isArray(node.children);
    if (isDirectory) {
      setExpandedNodes((prevExpandedNodes) => {
        const isExpanded = !!prevExpandedNodes.find((n) => n === path);
        return isExpanded
          ? prevExpandedNodes.filter((n) => n !== path)
          : [...prevExpandedNodes, path];
      });
    } else {
      onFileClick && onFileClick(path);
      const existingRecentFiles = recentFiles.filter(f => f !== path);
      updateRecentFiles([path, ...existingRecentFiles || []]);
    }
  };

  const renderCheckbox = (path: string) => {
    const isSelected = !!selectedFiles?.find(f => f === path);
    const isPartiallySelected = selectedFiles?.filter(f => f.includes(path) && f !== path);
    const selectedAncestors = selectedFiles?.filter(f => path.startsWith(f) && f !== path);
    return (
      <Checkbox
        data-testid="checkbox"
        indeterminate={isPartiallySelected?.length > 0}
        className="mr-2"
        checked={isSelected || !!selectedAncestors?.length}
        onChange={(_, e) => handleFileCheckboxChange(e, path)}
      />
    );
  };

  const handleFileCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, path: string) => {
    e.stopPropagation();
    e.preventDefault();
    updateSelectedFiles(addRemovePathInSelectedFiles(data, path, selectedFiles));
  };

  const renderFileNodeContent = (node: FileNode, path: string) => {
    const isDirectory = Array.isArray(node.children);
    const isActive = activeFile === path;

    return (
      <div
        className={`
          relative 
          cursor-pointer 
          px-2 py-px
          flex 
          items-center
          z-1
          ${isActive ? 'bg-[#e0dcdc]' : ''}
          ${isDirectory ? 'font-medium' : 'font-normal'}
        `}
      >
        {renderCheckbox(path)}
        <div className="whitespace-nowrap overflow-hidden text-ellipsis">{node.name}</div>
      </div>
    );
  };

  return (
    <div data-testid="file-tree" className="font-sans">
      <TreeView 
        data={data} 
        onNodeClick={(node) => {
          const path = node.absolutePath || '';
          handleNodeClick(undefined as any, node, path);
        }}
        renderNodeContent={(node) => renderFileNodeContent(node, node.absolutePath || '')} 
      />
    </div>
  );
};

export default FileTree;
</file>

<file path="The-Creator-AI-main/src/client/components/file-tree/FileTree.utils.ts">
import { FileNode } from "@/common/types/file-node";

export const addRemovePathInSelectedFiles = (
  files: FileNode[],
  path: string,
  selectedFiles: string[]
): string[] => {
  const isSelected = !!selectedFiles?.find((f) => f === path);
  if (isSelected) {
    // Remove this file from selectedFiles
    return selectedFiles?.filter((f) => f !== path);
  }

  const selectedAncestorPath = selectedFiles.find(
    (f) => path.startsWith(f) && f !== path
  );
  if (selectedAncestorPath) {
    // 1. Remove the ancestor from selectedFiles
    // 2. Add all children of the ancestor to selectedFiles except node which is another ancestor of the selected node
    // 3. Add all the siblings of the all the nodes between the ancestor and the selected node
    const pathParts = path.split("/");
    const ancestorParts = selectedAncestorPath.split("/");
    let siblingsAtEveryLevel: string[] = [];
    for (let i = ancestorParts.length - 1; i < pathParts.length - 1; i++) {
      const filePath = pathParts.slice(0, i + 1).join("/");
      const levelNode = getFileNodeByPath(files, filePath);
      if (levelNode) {
        siblingsAtEveryLevel = [
          ...siblingsAtEveryLevel,
          ...(levelNode.children
            ?.filter((c) => c.name !== pathParts[i + 1])
            ?.map((c) => `${filePath}/${c.name}`) || []),
        ];
      }
    }
    const newSelectedFiles = [
      ...selectedFiles.filter((f) => !f.includes(selectedAncestorPath)),
      ...siblingsAtEveryLevel,
    ];
    return newSelectedFiles;
  }

  // Remove all children and push this file into selectedFiles
  const newSelectedFiles = isSelected
    ? selectedFiles?.filter((f) => f !== path)
    : [...selectedFiles.filter((f) => !f.includes(path)), path];
  return newSelectedFiles;
};

export const getFileNodeByPath = (
  fileNodes: FileNode[],
  filePath: string
): FileNode | null => {
  const pathParts = filePath.split("/");
  // let's find the node in the data
  let node = {
    name: "",
    children: fileNodes,
  } as FileNode | undefined;
  for (const part of pathParts) {
    if (!node) {
      return null;
    }
    node = node.children?.find((child) => child.name === part);
  }
  return node || null;
};
</file>

<file path="The-Creator-AI-main/src/client/components/Modal.tsx">
import React, { useEffect, useRef, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsClosing(true);
      }
    };

    // Add event listeners when the modal is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      // Clean up the event listener when the modal closes
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close the modal after the closing animation finishes
  useEffect(() => {
    if (isClosing) {
      const timer = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, 200); // Adjust the timeout to match the animation duration

      return () => clearTimeout(timer);
    }
  }, [isClosing, onClose]);

  // VS Code's default modal has a dark background with a slightly transparent white overlay
  return isOpen ? (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-200 ${isClosing ? "opacity-0" : "opacity-100"
        }`}
    >
      <div className="fixed inset-0 bg-black bg-opacity-75"></div>
      <div
        ref={modalRef}
        className={`fixed inset-0 flex items-center justify-center p-4 transition-all duration-200 ${isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
      >
        <div
          className="bg-white rounded-md shadow-lg p-6 relative overflow-y-auto max-h-[90vh]"
          style={{ maxWidth: "700px" }}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {/* Modal content */}
          {children}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
</file>

<file path="The-Creator-AI-main/src/client/components/ProgressSteps.tsx">
import * as React from "react";

export interface StepsConfig {
  [key: string]: {
    indicatorText: string;
    renderStep: () => JSX.Element;
  };
};

interface ProgressStepsProps {
  currentStep: string;
  handleStepClick: (step: string) => void;
  stepsConfig: StepsConfig;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({
  currentStep,
  handleStepClick,
  stepsConfig,
}) => {
  const steps = Object.keys(stepsConfig);

  return (
    <div className="flex items-center justify-between w-full pl-16 pr-16 pt-4 pb-12 border-b border-gray-600">
      {steps.map((step: string, index: number) => (
        <React.Fragment key={step}>
          <div
            className="flex flex-col items-center"
            onClick={() => handleStepClick(step)}
            data-testid={`step-indicator-${step}`}
          >
            <div
              className={`w-4 h-4 rounded-full ${
                currentStep === step ? "bg-blue-500" : "bg-gray-300"
              } cursor-pointer relative`}
            >
              <span
                className={`text-xs mt-4 whitespace-nowrap ${
                  currentStep === step ? "text-blue-500" : "text-gray-500"
                } absolute top-full left-1/2 -translate-x-1/2`}
              >
                {stepsConfig[step]?.indicatorText}
              </span>
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className="flex-grow border-t border-gray-300"
              data-testid="step-indicator-divider"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressSteps;
</file>

<file path="The-Creator-AI-main/src/client/components/tree-view/TreeView.tsx">
import React, { useState } from 'react';
import { MdChevronRight } from 'react-icons/md';
import { getExpandedNodes } from './TreeView.utils';

export interface TreeNode {
    name: string;
    children?: TreeNode[];
    isExpanded?: boolean;
    [key: string]: any;
}

interface TreeViewProps {
    data: TreeNode[];
    onNodeClick?: (node: TreeNode) => void;
    renderNodeContent?: (node: TreeNode) => React.ReactNode;
}

const TreeView: React.FC<TreeViewProps> = ({ data, onNodeClick, renderNodeContent }) => {
    const [expandedNodes, setExpandedNodes] = useState<string[]>(getExpandedNodes(data));

    const handleNodeClick = (node: TreeNode) => {
        if (node.children) {
            setExpandedNodes((prevExpandedNodes) => {
                const isExpanded = prevExpandedNodes.includes(node.name);
                return isExpanded
                    ? prevExpandedNodes.filter((n) => n !== node.name)
                    : [...prevExpandedNodes, node.name];
            });
        }
        onNodeClick && onNodeClick(node);
    };

    const renderTreeNodes = (nodes: TreeNode[]) => {
        return nodes.map((node) => {
            const isExpanded = expandedNodes.includes(node.name);
            const isDirectory = !!node.children;

            return (
                <li key={node.name} className="relative">
                    <div
                        onClick={() => handleNodeClick(node)}
                        className={`
              cursor-pointer 
              px-2 
              flex 
              items-center 
              ${isDirectory ? 'font-medium' : 'font-normal'}
            `}
                    >
                        {isDirectory && (
                            <span
                                className={`
                  mr-2 
                  text-xl 
                  ${isExpanded ? 'rotate-90' : ''}
                  transition-transform 
                  duration-200
                  absolute
                  left-[-6px]
                `}
                            >
                                <MdChevronRight />
                            </span>
                        )}
                        {/* Use custom rendering if provided, otherwise display the node name */}
                        {renderNodeContent ? renderNodeContent(node) : node.name}
                    </div>
                    {isDirectory && isExpanded && (
                        <ul className="ml-4">{renderTreeNodes(node.children)}</ul>
                    )}
                </li>
            );
        });
    };

    return (
        <div className="font-sans">
            <ul>{renderTreeNodes(data)}</ul>
        </div>
    );
};

export default TreeView;
</file>

<file path="The-Creator-AI-main/src/client/components/tree-view/TreeView.utils.ts">
import { TreeNode } from "./TreeView";

export const getExpandedNodes = (data: TreeNode[]): string[] => {
  return data.reduce((acc, node) => {
    if (node.isExpanded) {
      acc.push(node.name);
    }
    if (node.children) {
      acc.push(...getExpandedNodes(node.children));
    }
    return acc;
  }, []);
};
</file>

<file path="The-Creator-AI-main/src/client/modules/api-keys-management.module/ApiKeysManagement.tsx">
import * as React from 'react';
import { useEffect, useState } from 'react';
import { LlmServiceEnum } from '@/backend/types/llm-service.enum';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import Modal from '@/client/components/Modal';

const ApiKeyManagement: React.FC = () => {
  const [apiKeys, setApiKeys] = useState<Record<LlmServiceEnum, string[]>>(
    Object.values(LlmServiceEnum).reduce((acc, service) => ({ ...acc, [service]: [] }), {} as any)
  );
  const [newApiKey, setNewApiKey] = useState('');
  const [selectedService, setSelectedService] = useState<LlmServiceEnum | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for the modal

  const clientIpc = ClientPostMessageManager.getInstance();

  useEffect(() => {
    const fetchApiKeys = async () => {
      clientIpc.sendToServer(ClientToServerChannel.GetLLMApiKeys, {});
    };

    fetchApiKeys();
  }, []);

  useEffect(() => {
    const handleSendLLMApiKeys = (message: { apiKeys: Record<LlmServiceEnum, string[]> | undefined }) => {
      setApiKeys(message.apiKeys || {} as any);
    };

    clientIpc.onServerMessage(ServerToClientChannel.SendLLMApiKeys, handleSendLLMApiKeys);
  }, []);

  const handleAddApiKey = async () => {
    if (newApiKey.trim() === '' || !selectedService) {
      return;
    }

    clientIpc.sendToServer(ClientToServerChannel.SetLLMApiKey, { service: selectedService, apiKey: newApiKey });
    setNewApiKey(''); // Clear the input field
    setSelectedService(null); // Reset selected service
    setIsModalOpen(false); // Close the modal
  };

  const handleDeleteApiKey = async (service: LlmServiceEnum, apiKey: string) => {
    clientIpc.sendToServer(ClientToServerChannel.DeleteLLMApiKey, { service, apiKeyToDelete: apiKey });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-editor-fg">API Key Management</h2>
      <button
        onClick={handleOpenModal}
        className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-button-bg hover:bg-button-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-bg mb-4"
      >
        Add API Key
      </button>
      {/* Display existing keys or a message if no keys are present */}
      {Object.keys(apiKeys).some((service) => apiKeys[service as LlmServiceEnum].length > 0) ? (
        Object.entries(apiKeys).map(([service, keys]) => (
          <div key={service} className="mb-6">
            <h3 className="text-lg font-medium text-editor-fg">{service}</h3>
            <ul className="list-disc pl-5">
              {keys.map((apiKey, index) => (
                <li key={index} className="flex items-center justify-between py-2">
                  <span className="truncate text-editor-fg">{apiKey}</span>
                  <button
                    onClick={() => handleDeleteApiKey(service as LlmServiceEnum, apiKey)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div className="mb-4">
          <p className="text-gray-600">No API keys added yet.</p>
        </div>
      )}

      {/* Modal for adding new API keys */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="p-6">
          <h3 className="text-lg font-bold mb-4 text-editor-fg">Add New API Key</h3>
          <div className="mb-4">
            <label htmlFor="serviceSelect" className="block text-sm font-medium text-gray-700">
              Select Service:
            </label>
            <select
              id="serviceSelect"
              value={selectedService || ''}
              onChange={(e) => setSelectedService(e.target.value as LlmServiceEnum)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-settings-input-bg"
            >
              <option value="">Select a service</option>
              {Object.values(LlmServiceEnum).map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="apiKeyInput" className="block text-sm font-medium text-gray-700">
              API Key:
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="password" // Make the input field a password field
                name="apiKeyInput"
                id="apiKeyInput"
                className="focus:ring-indigo-500 focus:border-indigo-500 flex-grow block w-full min-w-0 rounded-none rounded-l-md sm:text-sm border-gray-300 p-2 bg-settings-input-bg"
                placeholder="Enter your API key"
                value={newApiKey}
                onChange={(e) => setNewApiKey(e.target.value)}
                disabled={!selectedService}
              />
              <button
                onClick={handleAddApiKey}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-button-bg hover:bg-button-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-bg"
                disabled={!selectedService || newApiKey.trim() === ''}
              >
                Add
              </button>
            </div>
          </div>
          <button
            onClick={handleCloseModal}
            className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ApiKeyManagement;
</file>

<file path="The-Creator-AI-main/src/client/modules/commit.module/Commit.tsx">
import AutoResizingTextarea from '@/client/components/AutoResizingTextarea';
import { useStore } from '@/client/store/useStore';
import { commitStagedChanges } from '@/client/views/change-plan.view/logic/commitStagedChanges';
import { changePlanViewStoreStateSubject, getChangePlanViewState } from '@/client/views/change-plan.view/store/change-plan-view.store';
import React, { useState } from 'react';

const Commit: React.FC = () => {
    const {
        chatHistory,
    } = useStore(changePlanViewStoreStateSubject);
    const [commitTitle, setCommitTitle] = useState(getChangePlanViewState('changePlans')?.[getChangePlanViewState('changePlans').length - 1]?.planTitle || '');
    const [commitDescription, setCommitDescription] = useState(getChangePlanViewState('changePlans')?.[getChangePlanViewState('changePlans').length - 1]?.planDescription || '');

    const handleCommit = async () => {
        commitStagedChanges(commitTitle, commitDescription);
    };

    return (
        <div className="p-4">
            {chatHistory.length === 0 ? (
                <p className="text-gray-600">No changes to commit.</p>
            ) : (
                <div className="flex flex-col">
                    <div className="mb-4">
                        <label htmlFor="commitTitle" className="block text-sm font-medium text-gray-700">
                            Commit Title:
                        </label>
                        <AutoResizingTextarea
                            id="commitTitle"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={commitTitle}
                            onChange={(e) => setCommitTitle(e.target.value)}
                            placeholder="Enter a short, descriptive commit title"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="commitDescription" className="block text-sm font-medium text-gray-700">
                            Commit Description (Optional):
                        </label>
                        <AutoResizingTextarea
                            id="commitDescription"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={commitDescription}
                            onChange={(e) => setCommitDescription(e.target.value)}
                            placeholder="Enter a more detailed description of the changes (optional)"
                            minRows={3} // Adjust as needed
                            maxRows={10} // Adjust as needed
                        />
                    </div>
                    <button
                        onClick={handleCommit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Commit
                    </button>
                </div>
            )}
        </div>
    );
};

export default Commit;
</file>

<file path="The-Creator-AI-main/src/client/modules/context.module/Context.tsx">
import React, { useEffect, useState } from 'react';
import { FileNode } from '@/common/types/file-node';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import FileTree from '@/client/components/file-tree/FileTree';
import { handleFileClick } from '@/client/views/change-plan.view/logic/handleFileClick';
import { setChangePlanViewState as setState } from '@/client/views/change-plan.view/store/change-plan-view.logic';
import { getChangePlanViewState } from '@/client/views/change-plan.view/store/change-plan-view.store';

const Context: React.FC = () => {
    const clientIpc = ClientPostMessageManager.getInstance();
    const selectedFiles = getChangePlanViewState("selectedFiles");
    const files = getChangePlanViewState("files");
    const [recentFiles, setRecentFiles] = useState<string[]>([]);
    const [activeFile, setActiveFile] = useState<string>();
    const [activeContext, setActiveContext] = useState<'code' | 'features' | 'architecture' | 'guidelines'>('code');
    useEffect(() => {
        const handleSendWorkspaceFiles = ({ files }: { files: FileNode[] }) => {
            setState("files")(files);
        };
        clientIpc.onServerMessage(
            ServerToClientChannel.SendWorkspaceFiles,
            handleSendWorkspaceFiles
        );
    
            // Request workspace files on component mount
            clientIpc.sendToServer(ClientToServerChannel.RequestWorkspaceFiles, {});
    
    
    }, []);
    
    const handleContextChange = (context: 'code' | 'features' | 'architecture' | 'guidelines') => {
        setActiveContext(context);
    };    return (
        <div className="p-4 overflow-y-auto overflow-x-hidden">
            <div className='flex mb-4'>
                <button 
                  className={`mr-2 px-4 py-2 border rounded ${activeContext === 'code' ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
                  onClick={() => handleContextChange('code')}
                >
                  Code
                </button>
                 <button 
                    className={`mr-2 px-4 py-2 border rounded ${activeContext === 'features' ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
                    onClick={() => handleContextChange('features')}
                >
                  Features
                </button>
                 <button 
                  className={`mr-2 px-4 py-2 border rounded ${activeContext === 'architecture' ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
                  onClick={() => handleContextChange('architecture')}
                >
                  Architecture
                </button>
                 <button 
                 className={`mr-2 px-4 py-2 border rounded ${activeContext === 'guidelines' ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
                 onClick={() => handleContextChange('guidelines')}
                >
                    Guidelines
                  </button>
            </div>
             {/* Render FileTree for each root node */}
             {activeContext === 'code' && files.map((rootNode, index) => (
                <FileTree
                    key={index}
                    data={[rootNode]}
                    onFileClick={(filePath) => handleFileClick({
                    clientIpc,
                    filePath,
                    setActiveFile,
                })}
                selectedFiles={selectedFiles}
                recentFiles={recentFiles}
                activeFile={activeFile}
                updateSelectedFiles={(files) => setState("selectedFiles")(files)}
                updateRecentFiles={setRecentFiles}
            />
             ))}
        {activeContext !== 'code' && <div className="text-gray-500"> {activeContext} Tree View is under development. </div>}
            {!files.length && (
                <div className="text-gray-500">Loading files...</div>
            )}
        </div>
    );
};
export default Context;
</file>

<file path="The-Creator-AI-main/src/client/modules/plan.module/components/file-card.tsx">
import { useStore } from '@/client/store/useStore';
import { changePlanViewStoreStateSubject } from '@/client/views/change-plan.view/store/change-plan-view.store';
import * as React from "react";
import { MdDescription } from 'react-icons/md';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { getChangePlanViewState } from '../../../views/change-plan.view/store/change-plan-view.store';
import { setChangePlanViewState } from '@/client/views/change-plan.view/store/change-plan-view.logic';
import { ServerToClientChannel } from '@/common/ipc/channels.enum';
import Markdown from "markdown-to-jsx";

interface FileCardProps {
    fileName: string;
    operation: string;
    recommendations: string[];
    filePath: string;
}

const FileCard: React.FC<FileCardProps> = ({ fileName, operation, recommendations, filePath }) => {
    const { fileChunkMap } = useStore(changePlanViewStoreStateSubject);
    const clientIpc = ClientPostMessageManager.getInstance();
    const chatHistory = getChangePlanViewState('chatHistory');
    const selectedFiles = getChangePlanViewState('selectedFiles');
    const isLoading = fileChunkMap[filePath]?.isLoading;
    const fileContent = fileChunkMap[filePath]?.fileContent;

    React.useEffect(() => {
        clientIpc.onServerMessage(ServerToClientChannel.StreamFileCode, (data) => {
            const { filePath, chunk } = data;
            console.log({ filePath, chunk });
            const fileChunkMap = getChangePlanViewState('fileChunkMap');
            const localFilePath = Object.keys(fileChunkMap).find((key) => key.includes(filePath) || filePath.includes(key));

            if (!fileChunkMap[localFilePath]?.isLoading) {
                return;
            }

            const updatedFileChunkMap = {
                ...fileChunkMap,
                [localFilePath]: {
                    ...fileChunkMap[localFilePath],
                    fileContent: (fileChunkMap[localFilePath]?.fileContent || '') + chunk
                }
            };
            setChangePlanViewState('fileChunkMap')(updatedFileChunkMap);
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendFileCode, (data) => {
            const { filePath, fileContent } = data;
            console.log({ filePath, fileContent });
            const fileChunkMap = getChangePlanViewState('fileChunkMap');
            const localFilePath = Object.keys(fileChunkMap).find((key) => key.includes(filePath) || filePath.includes(key));
            const updatedFileChunkMap = {
                ...fileChunkMap,
                [localFilePath]: {
                    ...fileChunkMap[localFilePath],
                    fileContent,
                    isLoading: false
                }
            };
            setChangePlanViewState('fileChunkMap')(updatedFileChunkMap);
        });
    }, []);

    const handleRequestOpenFile = (filePath: string) => {
        clientIpc.sendToServer(ClientToServerChannel.RequestOpenFile, {
            filePath
        });
    };


    return (
        <div className="file-card flex flex-grow flex-col bg-sidebar-bg border border-gray-700 rounded p-4 shadow-md min-w-0 relative">
            <div className="flex items-center mb-2">
                <MdDescription
                    size={18}
                    className={`mr-2 cursor-pointer ${isLoading ? 'text-gray-400' : 'hover:text-blue-500'} `}
                />
                <h4 className="text-base font-medium text-editor-fg cursor-pointer" onClick={() => handleRequestOpenFile(filePath)}>{fileName}</h4>
            </div>
            <p className="text-gray-600 mb-3">{operation}</p>
            <ul className="list-disc list-inside">
                {recommendations.map((recommendation, index) => (
                    <li key={index} className="text-gray-400 text-xs mb-2">
                         <Markdown>{JSON.stringify(recommendation, null, 2)}</Markdown>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileCard;
</file>

<file path="The-Creator-AI-main/src/client/modules/plan.module/formatted-plan-preview.tsx">
import { ClientToServerChannel, ServerToClientChannel } from "@/common/ipc/channels.enum";
import { ClientPostMessageManager } from "@/common/ipc/client-ipc";
import { useStore } from "@/client/store/useStore";
import { setChangePlanViewState } from "@/client/views/change-plan.view/store/change-plan-view.logic";
import { changePlanViewStoreStateSubject, getChangePlanViewState } from "@/client/views/change-plan.view/store/change-plan-view.store";
import * as React from "react";
import { useEffect, useState } from "react";
import { MdFileDownload } from "react-icons/md";
import FileCard from "./components/file-card"; // Import the new FileCard component

interface FormattedPlanPreviewProps {
  jsonData: any;
}

const FormattedPlanPreview: React.FC<FormattedPlanPreviewProps> = ({
  jsonData,
}) => {
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const { activeTab } = useStore(changePlanViewStoreStateSubject);
  const clientIpc = ClientPostMessageManager.getInstance();
  const chatHistory = getChangePlanViewState("chatHistory");
  const selectedFiles = getChangePlanViewState("selectedFiles");
  const [loadingFile, setLoadingFile] = useState<string | null>(null);
  const { fileChunkMap } = useStore(changePlanViewStoreStateSubject);

  useEffect(() => {
    clientIpc.onServerMessage(ServerToClientChannel.StreamFileCode, (data) => {
      const { filePath, chunk } = data;
      console.log({ filePath, chunk });
      const fileChunkMap = getChangePlanViewState("fileChunkMap");
      const localFilePath = Object.keys(fileChunkMap).find(
        (key) => key.includes(filePath) || filePath.includes(key)
      );

      if (!fileChunkMap[localFilePath]?.isLoading) {
        return;
      }

      const updatedFileChunkMap = {
        ...fileChunkMap,
        [localFilePath]: {
          ...fileChunkMap[localFilePath],
          fileContent: (fileChunkMap[localFilePath]?.fileContent || "") + chunk,
        },
      };
      setChangePlanViewState("fileChunkMap")(updatedFileChunkMap);
    });

    clientIpc.onServerMessage(ServerToClientChannel.SendFileCode, (data) => {
      const { filePath, fileContent } = data;
      console.log({ filePath, fileContent });
      const fileChunkMap = getChangePlanViewState("fileChunkMap");
      const localFilePath = Object.keys(fileChunkMap).find(
        (key) => key.includes(filePath) || filePath.includes(key)
      );
      const updatedFileChunkMap = {
        ...fileChunkMap,
        [localFilePath]: {
          ...fileChunkMap[localFilePath],
          fileContent,
          isLoading: false,
        },
      };
      setChangePlanViewState("fileChunkMap")(updatedFileChunkMap);
      setLoadingFile(null);
    });
  }, []);

  const handleHeaderClick = (index: number) => {
    setCurrentFileIndex(index);
    clientIpc.sendToServer(ClientToServerChannel.RequestOpenFile, {
      filePath: jsonData.code_plan[index]?.filename,
    });
  };

  useEffect(() => {
    const matchingCardIndex = jsonData.code_plan.findIndex(
      (item: any) =>
        item?.filename && activeTab && activeTab.endsWith(item.filename)
    );
    if (matchingCardIndex !== -1) {
      setCurrentFileIndex(matchingCardIndex);
    }
  }, [activeTab, jsonData.code_plan]);

  const handleRequestFileCode = (filePath: string) => {
    const fileChunkMap = getChangePlanViewState("fileChunkMap");
    const updatedFileChunkMap = {
      ...fileChunkMap,
      [filePath]: {
        isLoading: true,
        fileContent: "",
      },
    };
    setChangePlanViewState("fileChunkMap")(updatedFileChunkMap);
    clientIpc.sendToServer(ClientToServerChannel.RequestStreamFileCode, {
      filePath,
      chatHistory,
      selectedFiles,
    });
    setLoadingFile(filePath);
  };

  return jsonData ? (
    <div className="formatted-plan-preview min-h-0 pt-2 flex flex-col flex-grow focus:outline-none overflow-y-auto">
      <h3 className="flex justify-center text-xs font-bold mb-2 px-4 text-center">
        {jsonData.title}
      </h3>
      <p
        className="flex justify-center text-gray-700 px-4 text-center"
      >
        {jsonData.description}
      </p>
      {/* Pagination Dots */}
      <div className="flex flex-col my-4">
        {jsonData.code_plan.map((item: any, index: number) => (
          <div key={index}>
            <button
              onClick={() => handleHeaderClick(index)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-hover-bg ${
                index === currentFileIndex ? "bg-hover-bg" : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {item.filename?.split("/").pop() || ""}
                </span>
                {!fileChunkMap[item.filename]?.isLoading ? (
                  <MdFileDownload
                    size={18}
                    className={`ml-2 cursor-pointer text-blue-500`}
                    onClick={() => handleRequestFileCode(item.filename)}
                  />
                ) : null}
                {fileChunkMap[item.filename]?.isLoading && (
                  <span className="loader mr-2">
                    <div className="spinner w-4 h-4 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin ml-2"></div>
                  </span>
                )}
                {fileChunkMap[item.filename]?.isLoading &&
                fileChunkMap[item.filename]?.fileContent?.length ? (
                  <span className="text-xs text-gray-500 whitespace-nowrap overflow-x-auto">
                    ({fileChunkMap[item.filename]?.fileContent?.length} ++)
                  </span>
                ) : null}
              </div>
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-grow mx-4">
        {jsonData.code_plan.map((item: any, index: number) => {
          if (item?.filename && index === currentFileIndex) {
            // Only render the card at the currentFileIndex
            return (
              <FileCard
                key={index}
                fileName={item.filename?.split("/").pop() || ""}
                operation={item.operation}
                recommendations={item.recommendations}
                filePath={item.filename}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  ) : null;
};

export default FormattedPlanPreview;
</file>

<file path="The-Creator-AI-main/src/client/modules/plan.module/plan-input-box.tsx">
import * as React from 'react';
import { BsSend } from 'react-icons/bs';
import AutoResizingTextarea from '@/client/components/AutoResizingTextarea';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { useStore } from '@/client/store/useStore';
import { changePlanViewStoreStateSubject, getChangePlanViewState } from '@/client/views/change-plan.view/store/change-plan-view.store';
import { handleSubmitPlanRequest } from '../../views/change-plan.view/logic/handleSubmitPlanRequest';
import { FileNode } from '@/common/types/file-node';

interface PlanStepInputProps {
    handleChange: (value: string) => void;
    isUpdateRequest?: boolean;
    files: FileNode[];
}

const PlanInputBox: React.FC<PlanStepInputProps> = ({ isUpdateRequest, handleChange, files }) => {
    const { selectedFiles } = useStore(changePlanViewStoreStateSubject);
    const [suggestions, setSuggestions] = React.useState<string[]>([]);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = React.useState<number | null>(null);
    const [showSuggestions, setShowSuggestions] = React.useState(false);
    const inputRef = React.useRef<HTMLTextAreaElement>(null);
    const changeDescription = getChangePlanViewState("changeDescription");
    const isLoading = getChangePlanViewState("isLoading");

    const clientIpc = ClientPostMessageManager.getInstance();

    const handleSuggestionAccept = (suggestion: string) => {
        handleChange(
            changeDescription.split(' ').slice(0, -1).join(' ')
            + (changeDescription.split(' ').length > 1 ? ' ' : '')
            + suggestion + ' ');
        setSelectedSuggestionIndex(null);
        setShowSuggestions(false);
    };

    const handleSubmit = () => {
        handleSubmitPlanRequest(clientIpc, files);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (showSuggestions) {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedSuggestionIndex((prevIndex) => (prevIndex === null || prevIndex === 0) ? suggestions.length - 1 : prevIndex - 1);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedSuggestionIndex((prevIndex) => (prevIndex === null || prevIndex === suggestions.length - 1) ? 0 : prevIndex + 1);
            } else if (e.key === 'Enter') {
                if (selectedSuggestionIndex !== null) {
                    e.preventDefault();
                    const selectedSuggestion = suggestions[selectedSuggestionIndex];
                    handleSuggestionAccept(selectedSuggestion);
                }
            } else if (e.key === 'Escape') {
                setShowSuggestions(false);
            }
        }
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey || e.altKey)) {
            e.preventDefault();
            handleSubmit();
        }
    };

    React.useEffect(() => {
        const fetchSuggestions = () => {
            if (changeDescription.split(' ').pop().startsWith('@')) {
                clientIpc.sendToServer(ClientToServerChannel.RequestSymbols, {
                    query: changeDescription.split(' ').pop().slice(1)
                });
            } else {
                setShowSuggestions(false); // Hide suggestions if "@" is not the last character
            }
        };

        const timeoutId = setTimeout(fetchSuggestions, 300); // Adjust delay as needed

        return () => clearTimeout(timeoutId);
    }, [changeDescription, selectedFiles]);

    React.useEffect(() => {
        clientIpc.onServerMessage(ServerToClientChannel.SendSymbols, (message) => {
            const receivedSuggestions = (message.symbols || []).map((symbol: { name: string }) => symbol.name); // Adjust based on actual symbol structure
            setSuggestions(receivedSuggestions);
            setShowSuggestions(true);
        });
    }, []);

    return (
        <div className="flex flex-col">
            <div className="relative p-4 flex flex-col relative" data-testid="change-plan-input-step">
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="absolute bottom-full bg-sidebar-bg left-0 mb-1 border border-gray-300 rounded max-h-40 overflow-y-auto shadow-lg z-10 m-4"
                        style={{
                            width: inputRef.current?.clientWidth,
                        }}>
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className={`p-2 cursor-pointer hover:bg-hover-bg ${index === selectedSuggestionIndex ? 'bg-hover-bg' : ''}`}
                                onClick={() => {
                                    handleSuggestionAccept(suggestion);
                                }}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
                <AutoResizingTextarea
                    ref={inputRef}
                    className="p-2 border border-gray-300 rounded font-normal mb-2 pr-10"
                    placeholder={isUpdateRequest ? "Describe the changes you want to make to the plan..." : "Describe the code changes you want to plan..."}
                    value={changeDescription}
                    onChange={(e) => handleChange(e.target.value)}
                    disabled={isLoading}
                    data-testid="change-description-textarea"
                    onKeyDown={handleKeyDown}
                    minRows={3}
                    maxRows={10}
                    autoFocus
                />
            </div>
            {inputRef.current && <BsSend
                className="fixed transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-blue-500"
                style={{
                    left: inputRef.current?.getClientRects()?.[0]?.right - 35,
                    top: inputRef.current?.getClientRects()?.[0]?.bottom - 20,
                }}
                size={20}
                onClick={handleSubmit}
                data-testid="submit-change-description-button"
            />}
        </div>
    );
};

export default PlanInputBox;
</file>

<file path="The-Creator-AI-main/src/client/modules/plan.module/Plan.tsx">
import { setChangePlanViewState as setState } from "@/client/views/change-plan.view/store/change-plan-view.logic";
import { getChangePlanViewState } from "@/client/views/change-plan.view/store/change-plan-view.store";
import { parseJsonResponse } from "@/common/utils/parse-json";
import Markdown from "markdown-to-jsx";
import * as React from "react";
import { useEffect, useState } from "react";
import FormattedPlanPreview from "./formatted-plan-preview";
import PlanInputBox from "./plan-input-box";

const Plan: React.FC = () => {
  const llmResponse = getChangePlanViewState("llmResponse");
  const files = getChangePlanViewState("files");
  const [responseType, setResponseType] = useState<"json" | "markdown" | null>(
    null
  );
  const [parsedResponse, setParsedResponse] = useState<any>(null);

  useEffect(() => {
    const jsonData = parseJsonResponse(llmResponse);
    if (jsonData) {
      setResponseType("json");
      setParsedResponse(jsonData);
    } else {
      setResponseType("markdown");
    }
  }, [llmResponse]);

  const renderResponse = () => {
    switch (responseType) {
      case "json":
        return <FormattedPlanPreview jsonData={parsedResponse} />;
      case "markdown":
        return <Markdown>{llmResponse}</Markdown>;
      default:
        return null;
    }
  };

  console.log({ files });
  return (
    <div className="plan-step flex flex-grow flex-col min-h-0">
      <div className="flex flex-grow flex-col min-h-0">{renderResponse()}</div>
      <PlanInputBox
        isUpdateRequest={
          !!(getChangePlanViewState("chatHistory").length > 0 && llmResponse)
        }
        handleChange={setState("changeDescription")}
        files={[]}
      />
    </div>
  );
};

export default Plan;
</file>

<file path="The-Creator-AI-main/src/client/store/store.ts">
import { BehaviorSubject } from "rxjs";

export class Store<T, A> extends BehaviorSubject<T> {
  constructor(private val: T) {
    super(val);
  }

  _next(value: T, action: A, actionVariant?: string): void {
    const devLogs = new URL(window.location.href).searchParams.has("devLogs");
    if (devLogs) {
      if (actionVariant) {
        console.log(action, actionVariant, value);
      } else {
        console.log(action, value);
      }
    }
    super.next(value);
  }
}
</file>

<file path="The-Creator-AI-main/src/client/store/useStore.ts">
import { useEffect, useState } from "react";
import { Store } from "./store";

export const useSelector = <S, A, R>(
  subject: Store<S, A>,
  selector: (state: S) => R
) => {
  const [state, setState] = useState<S>(subject.getValue());

  useEffect(() => {
    const subscription = subject.subscribe((newState) => {
      if (selector(newState) !== selector(state)) {
        setState(newState);
      }
    });

    return () => subscription.unsubscribe();
  }, [subject, selector]);

  return selector(state);
};

export const useStore = <S, A>(subject: Store<S, A>) => {
  return useSelector(subject, (state) => state);
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/index.ts">
import { VIEW_TYPES } from "@/common/view-types";
import { onMessage } from "./on-mesage";

export const viewConfig = {
  entry: "changePlanView.js",
  type: VIEW_TYPES.SIDEBAR.CHANGE_PLAN,
  handleMessage: onMessage,
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/logic/commitStagedChanges.ts">
import { ClientToServerChannel } from "@/common/ipc/channels.enum";
import { ClientPostMessageManager } from "@/common/ipc/client-ipc";

export const commitStagedChanges = (message: string, description: string) => {
  const clientIpc = ClientPostMessageManager.getInstance();
  clientIpc.sendToServer(ClientToServerChannel.CommitStagedChanges, {
    message,
    description,
  });
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/logic/getSelectedFiles.ts">
import { getChangePlanViewState } from "@/client/views/change-plan.view/store/change-plan-view.store";
import { FileNode } from "@/common/types/file-node";

export const getSelectedFiles = (files: FileNode[]) => {
  const selectedFiles = getChangePlanViewState("selectedFiles");
  // Create an array to store absolute paths of selected files
  const absoluteSelectedFiles: string[] = [];

  // Iterate through updatedSelectedFiles and find corresponding absolute paths in files
  selectedFiles.forEach((relativePath) => {
    let matchingNode: FileNode | undefined = undefined;
    files.find((node) => {
      // Iterate through files to find the matching absolute path
      function findMatchingNode(node: FileNode) {
        if (node.absolutePath && node.absolutePath.endsWith(relativePath)) {
          return node;
        }
        if (node.children) {
          for (const child of node.children) {
            const matchingNode = findMatchingNode(child);
            if (matchingNode) {
              return matchingNode;
            }
          }
        }
        return undefined;
      }
      matchingNode = findMatchingNode(node);
    });

    if (matchingNode) {
      absoluteSelectedFiles.push(matchingNode.absolutePath || "");
    }
  });
  return absoluteSelectedFiles;
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/logic/handleCommitMessageSuggestions.ts">
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { ClientPostMessageManager } from "@/common/ipc/client-ipc";
import { setChangePlanViewState } from "../store/change-plan-view.logic";

export const handleCommitMessageSuggestions = () => {
  const clientIpc = ClientPostMessageManager.getInstance();
  clientIpc.onServerMessage(
    ServerToClientChannel.SendCommitMessageSuggestions,
    (message) => {
      setChangePlanViewState("commitSuggestions")(message.suggestions);
      setChangePlanViewState("commitSuggestionsLoading")(false);
    }
  );
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/logic/handleFileClick.ts">
import { ClientToServerChannel } from "@/common/ipc/channels.enum";
import { ClientPostMessageManager } from "@/common/ipc/client-ipc";

export const handleFileClick = ({
  clientIpc,
  setActiveFile,
  filePath,
}: {
  clientIpc: ClientPostMessageManager;
  setActiveFile: React.Dispatch<React.SetStateAction<string>>;
  filePath: string;
}) => {
  setActiveFile(filePath);

  // Send the selected editor path to the extension
  clientIpc.sendToServer(ClientToServerChannel.SendSelectedEditor, {
    editor: {
      fileName: filePath.split("/").pop() || "",
      filePath,
      languageId: "", // You might need to determine the languageId here
    },
  });
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/logic/handleSubmitPlanRequest.ts">
import { AGENTS } from "@/common/constants/agents.constants";
import { ClientToServerChannel } from "@/common/ipc/channels.enum";
import {
  setChangePlanViewState as setState,
  setChangePlanViewState,
} from "@/client/views/change-plan.view/store/change-plan-view.logic";
import { getChangePlanViewState } from "@/client/views/change-plan.view/store/change-plan-view.store";
import { ClientPostMessageManager } from "@/common/ipc/client-ipc";
import { FileNode } from "@/common/types/file-node";
import { getSelectedFiles } from "./getSelectedFiles";

export const handleSubmitPlanRequest = (
  clientIpc: ClientPostMessageManager,
  files: FileNode[]
) => {
  setState("isLoading")(true);
  const llmResponse = getChangePlanViewState("llmResponse");
  const changeDescription = getChangePlanViewState("changeDescription");
  if (!changeDescription) {
    setState("isLoading")(false);
    const fileChunkMap = getChangePlanViewState("fileChunkMap");
    const updatedFileChunkMap = Object.keys(fileChunkMap).reduce(
      (acc, filePath) => {
        acc[filePath] = {
          ...fileChunkMap[filePath],
          isLoading: false,
        };
        return acc;
      },
      {}
    );
    setChangePlanViewState("fileChunkMap")(updatedFileChunkMap);
    return;
  }

  const selectedFiles = getSelectedFiles(files);

  const isUpdatingPlan =
    getChangePlanViewState("chatHistory").length && llmResponse;

  let chatHistory = getChangePlanViewState("chatHistory");
  const messagesToSend = [];

  if (chatHistory.length > 0) {
    if (chatHistory.length > 2) {
      messagesToSend.push(chatHistory[1]); // Add second message if it exists
    }
    messagesToSend.push(chatHistory[chatHistory.length - 1]); // Add last message
  }

  const newChatHistory = [
    ...(isUpdatingPlan
      ? [
          ...chatHistory,
          {
            user: "instructor",
            message: AGENTS["Code Plan Update"]?.systemInstructions,
          },
        ]
      : [
          {
            user: "instructor",
            message: AGENTS["Code Plan"]?.systemInstructions,
          },
        ]),
    ...(messagesToSend || []),
    {
      user: "user",
      message: (isUpdatingPlan ? `Revise the plan:\n` : "") + changeDescription,
    },
  ];
  setState("chatHistory")(newChatHistory); // Update chatHistory in the store

  clientIpc.sendToServer(ClientToServerChannel.SendStreamMessage, {
    chatHistory: newChatHistory,
    selectedFiles,
  });
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/logic/requestCommitMessageSuggestions.ts">
import { ClientPostMessageManager } from "@/common/ipc/client-ipc";
import { getChangePlanViewState } from "../store/change-plan-view.store";
import { ClientToServerChannel } from "@/common/ipc/channels.enum";

export const requestCommitMessageSuggestions = () => {
  const chatHistory = getChangePlanViewState("chatHistory");
  const clientIpc = ClientPostMessageManager.getInstance();
  clientIpc.sendToServer(
    ClientToServerChannel.RequestCommitMessageSuggestions,
    {
      chatHistory,
    }
  );
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/logic/setupChannelHandlers.ts">
import {
    ClientToServerChannel,
    ServerToClientChannel,
} from "@/common/ipc/channels.enum";
import { ClientPostMessageManager } from "@/common/ipc/client-ipc";
import { FileNode } from "@/common/types/file-node";
import { KeyPaths, KeyPathValue } from "@/common/utils/key-path";
import { ChangePlanSteps } from "@/client/views/change-plan.view/view.constants";
import { updateOrCreateChangePlan } from "@/client/views/change-plan.view/logic/updateOrCreateChangePlan";
import {
    setChangePlanViewState as setState
} from "@/client/views/change-plan.view/store/change-plan-view.logic";
import { ChangePlanViewStore } from "@/client/views/change-plan.view/store/change-plan-view.state-type";
import { getChangePlanViewState } from "@/client/views/change-plan.view/store/change-plan-view.store";

export const setupChannelHandlers = () => {
  const clientIpc = ClientPostMessageManager.getInstance();

  const handleSendMessage = ({ message }: { message: string }) => {
    setState("isLoading")(false);
    setState("llmResponse")(message);
    setState("changeDescription")("");
    setState("currentStep")(ChangePlanSteps.Plan);

    // Update chat history
    setState("chatHistory")([
      ...getChangePlanViewState("chatHistory"),
      { user: "bot", message },
    ]);

    // Update or add the new change plan
    updateOrCreateChangePlan(message);
  };

  const handleStreamMessage = ({ chunk }: { chunk: string }) => {
    setState("llmResponse")(getChangePlanViewState("llmResponse") + chunk);
  };

  const handleSendWorkspaceFiles = ({ files }: { files: FileNode[] }) => {
     setState("files")(files);
  };

  const handleSendFileCode = ({
    fileContent,
    filePath,
  }: {
    fileContent: string;
    filePath: string;
  }) => {
    if (filePath) {
      try {
        console.log(fileContent);
        console.log(`File ${filePath} updated successfully.`);
      } catch (err) {
        console.error(`Error updating file ${filePath}:`, err);
      }
    }
  };

  const handleSetChangePlanViewState = <
    Key extends KeyPaths<ChangePlanViewStore>
  >(data: {
    keyPath: Key;
    value: KeyPathValue<Key, ChangePlanViewStore>;
  }) => {
    console.log({ data });
    setState(data.keyPath)(data.value);
  };

  clientIpc.onServerMessage(
    ServerToClientChannel.SendMessage,
    handleSendMessage
  );
  clientIpc.onServerMessage(
    ServerToClientChannel.StreamMessage,
    handleStreamMessage
  );

  // Request workspace files on component mount
  clientIpc.sendToServer(ClientToServerChannel.RequestWorkspaceFiles, {});

  // Listen for workspace files response
  clientIpc.onServerMessage(
    ServerToClientChannel.SendWorkspaceFiles,
    handleSendWorkspaceFiles
  );

  // Listener for SendFileCode
  clientIpc.onServerMessage(
    ServerToClientChannel.SendFileCode,
    handleSendFileCode
  );

  clientIpc.onServerMessage(
    ServerToClientChannel.SetChangePlanViewState,
    handleSetChangePlanViewState
  );

  clientIpc.sendToServer(ClientToServerChannel.FetchStore, {
    storeName: "changePlanViewState",
  });
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/logic/updateOrCreateChangePlan.ts">
import { parseJsonResponse } from "@/common/utils/parse-json";
import { getChangePlanViewState } from "@/client/views/change-plan.view/store/change-plan-view.store";
import { setChangePlanViewState } from "@/client/views/change-plan.view/store/change-plan-view.logic";

export const updateOrCreateChangePlan = (llmResponse: string) => {
  try {
    const planJson = parseJsonResponse(llmResponse);
    if (!planJson) {
      return;
    }

    const planTitle = planJson.title;
    const planDescription = planJson.description;

    const changePlans = getChangePlanViewState("changePlans");
    const existingPlanIndex = changePlans.findIndex(
      (plan) => plan.planTitle === planTitle
    );

    const updatedChangePlans = [...changePlans];

    if (existingPlanIndex !== -1) {
      // Update existing plan
      updatedChangePlans[existingPlanIndex] = {
        ...updatedChangePlans[existingPlanIndex],
        planDescription,
        llmResponse,
        planJson,
        chatHistory: getChangePlanViewState("chatHistory"),
        selectedFiles: getChangePlanViewState("selectedFiles"),
        lastUpdatedAt: Date.now(),
      };
    } else {
      // Create a new plan
      updatedChangePlans.push({
        planTitle,
        planDescription,
        llmResponse,
        planJson,
        chatHistory: getChangePlanViewState("chatHistory"),
        selectedFiles: getChangePlanViewState("selectedFiles"),
        lastUpdatedAt: Date.now(),
      });
    }

    setChangePlanViewState("changePlans")(updatedChangePlans);
  } catch (error) {
    console.error("Error parsing or updating change plan:", error);
  }
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/on-mesage.ts">
import { ChatMessage } from "@/backend/repositories/chat.respository";
import { Services } from "@/backend/services/services";
import {
  ClientToServerChannel,
  ServerToClientChannel,
} from "@/common/ipc/channels.enum";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { parseJsonResponse } from "@/common/utils/parse-json";
import { ChangePlanViewStore } from "@/client/views/change-plan.view/store/change-plan-view.state-type";
import { handleActiveTabChange } from "@/backend/utils/handleActiveTabChange";
import * as vscode from "vscode";
import { MessageService } from "@/backend/services/message.service";

// Function to handle messages for the change plan view
export function onMessage(serverIpc: ServerPostMessageManager) {
  const fsService = Services.getFSService();
  const messageService = Services.getMessageService();
  serverIpc.onClientMessage(ClientToServerChannel.RequestWorkspaceFiles, () =>
    fsService.handleWorkspaceFilesRequest(serverIpc)
  );

  serverIpc.onClientMessage(
    ClientToServerChannel.RequestFileCode,
    async (data) => {
      const res = await Services.getCodeService().requestFileCode(
        data.filePath,
        data.chatHistory,
        data.selectedFiles
      );
      serverIpc.sendToClient(ServerToClientChannel.SendFileCode, res);
    }
  );

  serverIpc.onClientMessage(
    ClientToServerChannel.RequestStreamFileCode,
    async (data) => {
      const res = await Services.getCodeService().requestFileCode(
        data.filePath,
        data.chatHistory,
        data.selectedFiles,
        (filePath, chunk) => {
          serverIpc.sendToClient(ServerToClientChannel.StreamFileCode, {
            filePath,
            chunk,
          });
        }
      );
      serverIpc.sendToClient(ServerToClientChannel.SendFileCode, res);
    }
  );

  serverIpc.onClientMessage(ClientToServerChannel.SendMessage, (data) =>
      messageService.sendMessage(serverIpc, data)
  );

  serverIpc.onClientMessage(ClientToServerChannel.SendStreamMessage, (data) => {
      messageService.streamMessage(serverIpc, data)
  });

  serverIpc.onClientMessage(
    ClientToServerChannel.RequestOpenFile,
    async (data) => {
      fsService.handleFileOpen(data);
    }
  );

  serverIpc.onClientMessage(ClientToServerChannel.PersistStore, (data) => {
    const { storeName, storeState } = data;
    if (storeName === "changePlanViewState") {
      Services.getPersistentStoreRepository().setChangePlanViewState(
        storeState
      );
    }
  });

  serverIpc.onClientMessage(ClientToServerChannel.FetchStore, (data) => {
    const { storeName } = data;
    if (storeName === "changePlanViewState") {
      const storeState =
        Services.getPersistentStoreRepository().getChangePlanViewState();
      console.log("storeState", storeState);
      for (const key in storeState) {
        serverIpc.sendToClient(ServerToClientChannel.SetChangePlanViewState, {
          keyPath: key as keyof ChangePlanViewStore,
          value: storeState[key],
        });
      }
    }
  });

  handleActiveTabChange(serverIpc);

  // Handle request for commit message suggestions
  serverIpc.onClientMessage(
    ClientToServerChannel.RequestCommitMessageSuggestions,
    async ({ chatHistory }) => {
      // Add a user message at the end of the chat history prompting for commit message suggestions in JSON format.
      const userMessage: ChatMessage = {
        user: "user",
        message:
          "Please provide commit message suggestions in JSON format. Here's an example of the expected JSON structure:" +
          JSON.stringify({
            suggestions: ["Add feature X", "Fix bug Y", "Update dependency Z"],
          }),
      };

      // Send a message to the LLM service with the updated chat history.
      const llmResponse = await Services.getLlmService().sendPrompt([
        ...chatHistory.filter(
          (message) => message.user === "bot" || message.user === "user"
        ),
        userMessage,
      ]);

      // Parse the LLM response using parseJsonResponse from parse-json.
      const parsedResponse = parseJsonResponse(llmResponse.response);

      // Extract commit message suggestions from the parsed JSON.
      const suggestions = parsedResponse.suggestions;

      // Send the suggestions to the client.
      serverIpc.sendToClient(
        ServerToClientChannel.SendCommitMessageSuggestions,
        { suggestions }
      );
    }
  );

  // Handle commit action with the selected message
  serverIpc.onClientMessage(
    ClientToServerChannel.CommitStagedChanges,
    async (message) => {
      console.log("Committing staged changes with message:", message.message);
      console.log(
        "Committing staged changes with description:",
        message.description
      );

      // Set commitSuggestionsLoading to true before initiating the commit
      serverIpc.sendToClient(ServerToClientChannel.SetChangePlanViewState, {
        keyPath: "commitSuggestionsLoading",
        value: true,
      });

      try {
        // Use the publicly available VS Code command to commit the staged changes with the provided message
        const gitService = Services.getGitService();
        await gitService.gitCommit(message.message, message.description);
      } catch (error) {
        // Handle any errors during the commit process
        console.error("Error committing changes:", error);
      } finally {
        // Reset commit suggestions and loading state after the commit, regardless of success or failure
        serverIpc.sendToClient(ServerToClientChannel.SetChangePlanViewState, {
          keyPath: "commitSuggestions",
          value: [],
        });
        serverIpc.sendToClient(ServerToClientChannel.SetChangePlanViewState, {
          keyPath: "commitSuggestionsLoading",
          value: false,
        });
      }
    }
  );

  // Handle get LLM API keys request
  serverIpc.onClientMessage(ClientToServerChannel.GetLLMApiKeys, async () => {
    try {
      const apiKeys = await Services.getSettingsRepository().getLLMApiKeys();
      serverIpc.sendToClient(ServerToClientChannel.SendLLMApiKeys, {
        apiKeys,
      });
    } catch (error) {
      console.error("Error getting LLM API keys:", error);
      // Handle the error appropriately, e.g., send an error message to the client
    }
  });

  // Handle set LLM API key request
  serverIpc.onClientMessage(
    ClientToServerChannel.SetLLMApiKey,
    async ({ service, apiKey }) => {
      try {
        await Services.getSettingsRepository().setLLMApiKey(service, apiKey);

        // After successfully setting the API key, you might want to re-fetch
        // the API keys and send them back to the client to update the UI.
        const updatedApiKeys =
          await Services.getSettingsRepository().getLLMApiKeys();
        serverIpc.sendToClient(ServerToClientChannel.SendLLMApiKeys, {
          apiKeys: updatedApiKeys,
        });
      } catch (error) {
        console.error("Error setting LLM API key:", error);
        // Handle the error appropriately, e.g., send an error message to the client
      }
    }
  );

  // Handle delete LLM API key request
  serverIpc.onClientMessage(
    ClientToServerChannel.DeleteLLMApiKey,
    async ({ service, apiKeyToDelete }) => {
      try {
        await Services.getSettingsRepository().deleteLLMApiKey(
          service,
          apiKeyToDelete
        );

        // After successfully deleting the API key, you might want to re-fetch
        // the API keys and send them back to the client to update the UI.
        const updatedApiKeys =
          await Services.getSettingsRepository().getLLMApiKeys();
        serverIpc.sendToClient(ServerToClientChannel.SendLLMApiKeys, {
          apiKeys: updatedApiKeys,
        });
      } catch (error) {
        console.error("Error deleting LLM API key:", error);
        // Handle the error appropriately, e.g., send an error message to the client
      }
    }
  );

  // Handle symbol retrieval request
  serverIpc.onClientMessage(
    ClientToServerChannel.RequestSymbols,
    async ({ query }) => {
      try {
        const symbolInformation = await vscode.commands.executeCommand<
          vscode.SymbolInformation[]
        >("vscode.executeWorkspaceSymbolProvider", query || "");
        const files = await vscode.workspace.findFiles(`**/${query}**`);

        serverIpc.sendToClient(ServerToClientChannel.SendSymbols, {
          symbols: [
            ...files
              .map((file) => ({
                name: file.path?.split("/").pop(),
                kind: vscode.SymbolKind.File,
                location: file.path,
                range: new vscode.Range(
                  new vscode.Position(0, 0),
                  new vscode.Position(0, 0)
                ),
              }))
              ?.filter(
                (symbol, index, self) =>
                  self.findIndex((s) => s.name === symbol.name) === index
              )
              ?.filter((_, index) => index < 3),
            ...symbolInformation
              .map((symbol) => ({
                name: symbol.name,
                kind: symbol.kind,
                location: symbol.location.uri.path,
                range: symbol.location.range,
              }))
              ?.filter(
                (symbol, index, self) =>
                  self.findIndex((s) => s.name === symbol.name) === index
              )
              ?.filter((_, index) => index < 5),
          ],
        });
      } catch (error) {
        console.error("Error retrieving symbols:", error);
        // Handle the error appropriately, e.g., send an error message to the client
      }
    }
  );
}
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/store/change-plan-view.initial-state.ts">
import { ChangePlanViewStore } from "./change-plan-view.state-type";
import { ChangePlanSteps } from "../view.constants";

export const initialState: ChangePlanViewStore = {
  changeDescription: "",
  isLoading: false,
  llmResponse: "",
  currentStep: ChangePlanSteps.Plan,
  selectedFiles: [],
  chatHistory: [],
  activeTab: undefined,
  changePlans: [],
  commitSuggestions: [],
  commitSuggestionsLoading: false,
  fileChunkMap: {},
  files: [],
};
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/store/change-plan-view.logic.ts">
import { ClientToServerChannel } from "@/common/ipc/channels.enum";
import { ClientPostMessageManager } from "@/common/ipc/client-ipc";
import {
  KeyPaths,
  KeyPathValue,
  setNestedValue,
} from "@/common/utils/key-path";
import { initialState } from "./change-plan-view.initial-state";
import { ChangePlanViewStore } from "./change-plan-view.state-type";
import { changePlanViewStoreStateSubject } from "./change-plan-view.store";

export const setNewEmptyChangePlan = () => {
  const newValue: ChangePlanViewStore = {
    ...changePlanViewStoreStateSubject.getValue(),
    changeDescription: "",
    llmResponse: "",
    chatHistory: [],
    fileChunkMap: {},
    isLoading: false,
  };
  changePlanViewStoreStateSubject._next(
    newValue,
    "Change Plan View : SET NEW EMPTY CHANGE PLAN"
  );

  const clientIpc = ClientPostMessageManager.getInstance();
  clientIpc.sendToServer(ClientToServerChannel.PersistStore, {
    storeName: "changePlanViewState",
    storeState: newValue,
  });
};

export const setChangePlanViewState =
  <Key extends KeyPaths<ChangePlanViewStore>>(keyPath: Key) =>
  (value: KeyPathValue<Key, ChangePlanViewStore>) => {
    const newValue = setNestedValue(
      changePlanViewStoreStateSubject.getValue(),
      keyPath,
      value
    );
    changePlanViewStoreStateSubject._next(
      {
        ...newValue,
      },
      `Change Plan View : SET ${keyPath}`
    );

    const clientIpc = ClientPostMessageManager.getInstance();
    clientIpc.sendToServer(ClientToServerChannel.PersistStore, {
      storeName: "changePlanViewState",
      storeState: newValue,
    });
  };
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/store/change-plan-view.state-type.ts">
import { ChangePlanSteps } from "../view.constants";
import { ChatMessage } from "@/backend/repositories/chat.respository";
import { FileNode } from "@/common/types/file-node";

export interface ChangePlan {
  planTitle: string;
  planDescription: string;
  llmResponse: string;
  planJson: any;
  chatHistory: ChatMessage[];
  selectedFiles: string[];
  lastUpdatedAt: number;
}

export interface ChangePlanViewStore {
  changeDescription: string;
  isLoading: boolean;
  llmResponse: string;
  currentStep: ChangePlanSteps;
  selectedFiles: string[];
  chatHistory: ChatMessage[];
  activeTab: string | undefined;
  changePlans: ChangePlan[];
  fileChunkMap: Record<
    string,
    {
      isLoading: boolean;
      fileContent: string;
    }
  >;
    files: FileNode[];
  commitSuggestionsLoading: boolean;
  commitSuggestions: string[];
}
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/store/change-plan-view.store.ts">
import { Store } from "@/client/store/store";
import { ChangePlanViewStore } from "./change-plan-view.state-type";
import { initialState } from "./change-plan-view.initial-state";
import { KeyPaths, getNestedValue } from "@/common/utils/key-path";

type ChangePlanViewActions =
  | `Change Plan View : SET ${KeyPaths<ChangePlanViewStore>}`
  | "Change Plan View : SET NEW EMPTY CHANGE PLAN";

export const changePlanViewStoreStateSubject = new Store<
  ChangePlanViewStore,
  ChangePlanViewActions
>(initialState);

export const getChangePlanViewState = (
  keyPath?: KeyPaths<ChangePlanViewStore>
) => getNestedValue(changePlanViewStoreStateSubject.getValue(), keyPath);
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/view.constants.ts">
export enum ChangePlanSteps {
  ApiKeyManagement = 'ApiKeyManagement',
  Context = 'Context',
  Plan = 'Plan',
  Commit = 'Commit', 
}
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/view.scss">
/* Import Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Remove default VS Code body padding */
body {
    padding: 0;
}
</file>

<file path="The-Creator-AI-main/src/client/views/change-plan.view/view.tsx">
import ErrorBoundary from "@/client/components/ErrorBoundary";
import { StepsConfig } from '@/client/components/ProgressSteps';
import ApiKeyManagement from '@/client/modules/api-keys-management.module/ApiKeysManagement';
import Commit from '@/client/modules/commit.module/Commit';
import Context from '@/client/modules/context.module/Context';
import Plan from '@/client/modules/plan.module/Plan';
import { useStore } from "@/client/store/useStore";
import { Log } from "@/common/utils/firebaseLogger";
import * as React from "react";
import { useEffect } from "react";
import * as ReactDOM from "react-dom/client";
import { FaSpinner } from "react-icons/fa"; // Import spinner icon
import ProgressSteps from "../../components/ProgressSteps";
import { setupChannelHandlers } from "./logic/setupChannelHandlers";
import { setChangePlanViewState as setState } from "./store/change-plan-view.logic";
import { changePlanViewStoreStateSubject } from "./store/change-plan-view.store";
import { ChangePlanSteps } from "./view.constants";
import "./view.scss";

const App = () => {
  const { isLoading, currentStep: currentTab } = useStore(
    changePlanViewStoreStateSubject
  );
  const changePlanSteps: StepsConfig = {
    [ChangePlanSteps.ApiKeyManagement]: {
      indicatorText: "API Keys",
      renderStep: () => <ApiKeyManagement />,
    },
    [ChangePlanSteps.Context]: {
      indicatorText: "Context",
      renderStep: () => <Context />,
    },
    [ChangePlanSteps.Plan]: {
      indicatorText: "Plan",
      renderStep: () => <Plan />,
    },
    [ChangePlanSteps.Commit]: {
      indicatorText: "Commit",
      renderStep: () => <Commit />,
    },
  };
  

  // Initialize Firebase
  useEffect(() => {
    Log.sidebarOpened();
  }, []);

  useEffect(() => {
    setupChannelHandlers();
  }, []);

  const handleStepClick = (step: ChangePlanSteps) => {
    setState("currentStep")(step);
  };

  const renderLoader = () => (
    <div
      className="loader fixed inset-0 flex justify-center items-center bg-opacity-50 bg-[#202020] z-50"
      data-testid="loader"
    >
      <FaSpinner className="spinner text-2xl animate-spin text-white" />
    </div>
  );

  return (
    <div className="h-full fixed inset-0 flex flex-col justify-between bg-editor-bg">
      <ProgressSteps
        stepsConfig={changePlanSteps}
        currentStep={currentTab}
        handleStepClick={handleStepClick}
      />
      <div className="flex flex-grow flex-col overflow-hidden">
        {/* Dropdown removed */}
        {changePlanSteps[currentTab].renderStep()}
      </div>
      {isLoading && renderLoader()} {/* Conditionally render the loader */}
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("change-plan-view-root")!
);

root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
</file>

<file path="The-Creator-AI-main/src/client/views/chat.view/index.ts">
import { VIEW_TYPES } from "@/common/view-types";
import { onMessage } from "./on-mesage";

export const viewConfig = {
  entry: "chatView.js",
  type: VIEW_TYPES.SIDEBAR.CHAT,
  handleMessage: onMessage,
};
</file>

<file path="The-Creator-AI-main/src/client/views/chat.view/on-mesage.ts">
import { ChatRepository } from "@/backend/repositories/chat.respository";
import { Services } from "@/backend/services/services";
import {
  ClientToServerChannel,
  ServerToClientChannel,
} from "@/common/ipc/channels.enum";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";

// Function to handle messages for the chat view
export async function onMessage(serverIpc: ServerPostMessageManager) {
  serverIpc?.onClientMessage(
    ClientToServerChannel.SendMessage,
    async (data) => {
      const userMessage = data.chatHistory?.[0];

      // Fetch Chat History from Repository
      let existingChat = await ChatRepository.getActiveChat();
      await ChatRepository.addMessageToChat(existingChat.id, userMessage);
      existingChat = await ChatRepository.getActiveChat();

      const response = await Services.getLlmService().sendPrompt(
        existingChat.messages
      );

      serverIpc.sendToClient(ServerToClientChannel.SendMessage, {
        message: response.response,
      });

      await ChatRepository.addMessageToChat(existingChat.id, {
        user: "bot",
        message: response.response,
      });
    }
  );
  serverIpc?.onClientMessage(
    ClientToServerChannel.RequestChatHistory,
    async (data) => {
      const chatId = data.chatId;
      const chat = await ChatRepository.getChatById(chatId);
      if (!chat) {
        return;
      }
      serverIpc.sendToClient(ServerToClientChannel.SendChatHistory, {
        chatId: chat.id,
        messages: chat.messages,
      });
    }
  );
}
</file>

<file path="The-Creator-AI-main/src/client/views/chat.view/view.scss">
/* Import Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Remove default VS Code body padding */
body {
    padding: 0;
}
</file>

<file path="The-Creator-AI-main/src/client/views/chat.view/view.tsx">
// the-creator-ai/src/sidebar/Sidebar.tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import Markdown from 'markdown-to-jsx';
import { FaUser, FaRobot } from 'react-icons/fa';
import './view.scss';

const App = () => {
  const [messages, setMessages] = React.useState<{ user: string; message: string }[]>([]);
  const [userInput, setUserInput] = React.useState('');
  const clientIpc = ClientPostMessageManager.getInstance();

  const sendMessage = () => {
    if (userInput.trim() === '') return;

    // Send message to extension
    clientIpc.sendToServer(ClientToServerChannel.SendMessage, {
      chatHistory: [{ user: 'user', message: userInput }],
      selectedFiles: []
    });

    // Update local messages (for display)
    setMessages([...messages, { user: 'user', message: userInput }]);
    setUserInput('');
  };

  React.useEffect(() => {
    clientIpc.onServerMessage(ServerToClientChannel.SendMessage, ({ message }) => {
      setMessages((messages) => ([...messages, { user: 'AI', message }]));
    });
    clientIpc.onServerMessage(ServerToClientChannel.SendChatHistory, ({ messages }) => {
      setMessages(() => ([...messages]));
    });
    clientIpc.sendToServer(ClientToServerChannel.RequestChatHistory, {});
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start my-2 p-2 ${message.user === 'user' ? 'user' : 'bot'}`}>
            <div className={`mr-2 text-lg ${message.user === 'user' ? 'text-blue-500' : 'text-gray-400'}`}>
              {message.user === 'user' ? <FaUser /> : <FaRobot />}
            </div>
            <div className="flex-grow">
              <Markdown>{message.message}</Markdown>
            </div>
          </div>
        ))}
      </div>
      <div className="flex p-4 border-t">
        <input
          type="text"
          className="flex-grow p-2 border rounded mr-2"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here"
        />
        <button className="p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-700" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('chat-view-root')!);
root.render(<App />);
</file>

<file path="The-Creator-AI-main/src/client/views/file-explorer.view/index.ts">
import { VIEW_TYPES } from "@/common/view-types";
import { onMessage } from "./on-mesage";

export const viewConfig = {
  entry: "fileExplorerView.js",
  type: VIEW_TYPES.SIDEBAR.FILE_EXPLORER,
  handleMessage: onMessage,
};
</file>

<file path="The-Creator-AI-main/src/client/views/file-explorer.view/on-mesage.ts">
import { Services } from "@/backend/services/services";
import {
  ClientToServerChannel,
  ServerToClientChannel,
} from "@/common/ipc/channels.enum";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import * as vscode from "vscode";

// Function to handle messages for the file explorer view
export function onMessage(
  serverIpc: ServerPostMessageManager
) {onMessage
  serverIpc.onClientMessage(
    ClientToServerChannel.RequestWorkspaceFiles,
    async (data) => {
      const workspaceRoots =
      vscode.workspace.workspaceFolders?.map((folder) => folder.uri) || [];
      const fsService = Services.getFSService();
      const files = await fsService.getFilesRespectingGitignore();
      const fileTree = fsService.createFileTree(workspaceRoots, files);

      // Use the VSCode API to retrieve workspace files
      // const files = await vscode.workspace.findFiles("**/*");

      // // Format the files into the expected response structure
      // const formattedFiles = files.map((file) => ({
      //   name: file.path.split("/").pop() || "", // Extract file name from path
      //   path: file.fsPath, // Use fsPath for the actual file path
      //   // type: vscode.workspace.fs
      //   //   .stat(file)
      //   //   .then((stat) => (stat.isDirectory() ? "directory" : "file")),
      // }));

      // const fileTypes = await Promise.all(
      //   formattedFiles.map((file) => file.type)
      // );
      // Send the files back to the client
      serverIpc.sendToClient(ServerToClientChannel.SendWorkspaceFiles, {
        // files: formattedFiles.map((file, index) => ({
        //   ...file,
        //   // type: fileTypes[index],
        //   type: 'file'
        // })),
        files: fileTree
      });
    }
  );
}
</file>

<file path="The-Creator-AI-main/src/client/views/file-explorer.view/view.scss">
/* Import Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Remove default VS Code body padding */
body {
    padding: 0;
}
</file>

<file path="The-Creator-AI-main/src/client/views/file-explorer.view/view.tsx">
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import FileTree from '../../components/file-tree/FileTree';
import { useState, useEffect } from 'react';
import { FileNode } from '@/common/types/file-node';

const App = () => {
    const [files, setFiles] = useState<FileNode[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [recentFiles, setRecentFiles] = useState<string[]>([]);
    const [activeFile, setActiveFile] = useState<string>();

    const clientIpc = ClientPostMessageManager.getInstance();

    useEffect(() => {
        // Request workspace files on component mount
        clientIpc.sendToServer(ClientToServerChannel.RequestWorkspaceFiles, {});

        // Listen for workspace files response
        clientIpc.onServerMessage(ServerToClientChannel.SendWorkspaceFiles, ({ files }) => {
            setFiles(files);
        });
    }, []);

    const handleFileClick = (filePath: string) => {
        setActiveFile(filePath);
        // Send the selected editor path to the extension
        clientIpc.sendToServer(ClientToServerChannel.SendSelectedEditor, {
            editor: {
                fileName: filePath.split('/').pop() || '',
                filePath,
                languageId: '', // You might need to determine the languageId here
            },
        });
    };


    return (
        <div className="h-full overflow-y-auto">
            {files.length > 0 ? (
                <FileTree
                    data={files}
                    onFileClick={handleFileClick}
                    selectedFiles={selectedFiles}
                    recentFiles={recentFiles}
                    activeFile={activeFile}
                    updateSelectedFiles={setSelectedFiles}
                    updateRecentFiles={setRecentFiles}
                />
            ) : (
                <div className="p-4 text-gray-500">Loading files...</div>
            )}
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('file-explorer-root')!);
root.render(<App />);
</file>

<file path="The-Creator-AI-main/src/client/views/index.ts">
import { viewConfig as changePlanViewConfig } from "./change-plan.view";
import { viewConfig as chatViewConfig } from "./chat.view";
import { viewConfig as fileExplorerViewConfig } from "./file-explorer.view";
import * as vscode from "vscode";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { getNonce, getViewHtml } from "@/common/utils/view-html";

export const views = [
  changePlanViewConfig,
  chatViewConfig,
  fileExplorerViewConfig,
];

export const serverIPCs: Record<string, ServerPostMessageManager> = {};

export function registerViews(context: vscode.ExtensionContext) {
  views.forEach((viewConfig) => {
    context.subscriptions.push(
      vscode.window.registerWebviewViewProvider(viewConfig.type, {
        resolveWebviewView: (webviewView, _, token) => {
          webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [context.extensionUri],
          };

          const nonce = getNonce();
          webviewView.webview.html = getViewHtml({
            webview: webviewView.webview,
            nonce,
            scriptUri: webviewView.webview
              .asWebviewUri(
                vscode.Uri.joinPath(
                  context.extensionUri,
                  "dist",
                  viewConfig.entry
                )
              )
              .toString(),
          });

          const serverIpc = ServerPostMessageManager.getInstance(
            webviewView.webview.onDidReceiveMessage,
            (data: any) => webviewView.webview.postMessage(data)
          );

          serverIPCs[viewConfig.type] = serverIpc;

          viewConfig.handleMessage(serverIpc);
        },
      })
    );
  });
}
</file>

<file path="The-Creator-AI-main/src/common/constants/agents.constants.ts">
export const AGENTS = {
  "Stubbed Code": {
    id: 1,
    hidden: true,
    name: "Stubbed code",
    systemInstructions: `Now I want you to assist me by providing targeted code snippets from requested files, replacing irrelevant or lengthy sections of **existing code** with stubs for brevity and clarity. You should **not** generate stubs for new code that is intended to be written.
    
    **Output:** You will provide a code snippet in the same programming language as the requested file. The snippet should adhere to the following guidelines:
    
        *   **Include Relevant Code:** Present the code that directly addresses the user's request or the core logic of the file.
        *   **Replace with Stubs (Existing Code Only):** Substitute unrelated or lengthy sections of existing code with clear, concise stubs.
        *   **Do Not Stub New Code:** If the user's request involves writing new code, do not generate stubs for that code. Instead, clearly indicate where the new code should be placed within the existing code structure.
        *   **Maintain Structure:** Preserve the overall structure of the file, including import statements, comments, and the order of elements.
        *   **Use Comments for Clarity:** Add comments to explain the purpose of stubs or to indicate where omitted code would normally reside and where new code should be inserted.
    
    **Stub Creation (Existing Code Only):**
    
        *   **Identify Irrelevance:** Determine which parts of the existing code are not relevant to the user's request or the file's main purpose.
        *   **Summarize with Comments:** Replace lengthy code blocks with a comment briefly describing their function (e.g., "// Database connection setup").
        *   **Preserve Signatures:** For functions and classes, keep the signatures intact but replace their bodies with ellipses (\`...\`) or a comment (e.g., "// Function implementation").
        *   **Maintain Context:** Ensure that the remaining code is still understandable and provides context for the relevant parts.
    
    **Focus Areas (If Provided):**
    
        *   **Prioritize Focus:** If the user specifies particular focus areas, prioritize those sections in the output.
        *   **Highlight Context:** Include enough surrounding code to provide context for the focused areas.
    
    **Handling New Code:**
    
        *   **Indicate Insertion Points:** Clearly mark the locations where new code should be added. Use comments like "// Add new code here" or similar.
        *   **Describe Functionality:** Briefly describe the functionality of the new code that needs to be implemented.
    
    **Additional Considerations:**
    
        *   **Handle Errors:** If the file does not exist or cannot be accessed, return an appropriate error message.
        *   **Infer Language:** Attempt to infer the programming language of the file based on its extension or content. If unsure, request clarification from the user.
        *   **Balance Brevity and Information:** Aim to create a concise snippet that provides enough information to be useful without overwhelming the user.
    
    **Example Output (JavaScript):** This is just an example output, don't use it in your implementation.
    
    \`\`\`javascript
    // File path: src/components/LoginForm.js
    
    import React, { useState } from 'react';
    
    const LoginForm = () => {
      // ... (State variables for username, password, errors, etc.)
    
      const handleSubmit = (event) => {
        event.preventDefault();
        // Add code to handle form submission here
      };
    
      return (
        <form onSubmit={handleSubmit}>
          {/* ... (Form input fields for username and password) */}
          <button type="submit">Login</button>
        </form>
      );
    };
    
    export default LoginForm;
    \`\`\`
    
    In this example, the code related to form validation has been omitted, and a comment is added to indicate where the new form submission logic should be implemented.
    \n\n\n\n\n\n
    Now I call upon you handle what I have to say below (take into consideration the plan as well if we have some active plan) -
    \n\n\n
        `,
  },
  "Acceptance Criteria": {
    id: 2,
    name: "Acceptance Criteria",
    systemInstructions: `You are a specification assistant. Help us with the acceptance criteria of the requirements.
    
    **Output Format**
    
    \`\`\`json
    {
      "title": "Short title of the desired change",
      "description": "A description of the desired change.",
      "acceptance_criteria": [
        "Acceptance criteria 1",
        "Acceptance criteria 2",
        // ... more acceptance criteria as needed
      ]
    }
    \`\`\`
    
    ** Note **
    * Don't talk about technology. Just focus on the acceptance criteria.
        `,
  },
  "Acceptance Criteria Reviewer": {
    id: 3,
    name: "Acceptance Criteria Reviewer",
    systemInstructions: `You are an acceptance criteria reviewer. Your task is to analyze and review acceptance criteria to ensure they are clear, complete, and testable.
      
      **Review Goals**
      
      * Verify that each acceptance criterion is clear and specific.
      * Ensure that the criteria are measurable and testable.
      * Identify any missing information or potential ambiguities.
      * Provide a summary of feedback and suggestions for improving the criteria.
      
      **Note:** Acceptance criteria are expected to be high-level expectations. Do not criticize the criteria for lack of details on implementation, UI, or technical specifics.
      
      **Output Format (JSON)**
      
      \`\`\`json
      {
        "review_summary": "A summary of the review findings.",
        "feedback_and_suggestions": [
          "General feedback or areas where criteria could be improved.",
          "Suggestions for refining the criteria to make them more actionable."
        ]
      }
      \`\`\`
      
      **Example Output**
      
      \`\`\`json
      {
        "review_summary": "The acceptance criteria are generally clear and meet high-level expectations but could benefit from some refinement.",
        "feedback_and_suggestions": [
          "Ensure that each criterion includes specific success metrics or measurable outcomes.",
          "Clarify any criteria that may be ambiguous in terms of expected outcomes or scope.",
          "Provide additional context if necessary to avoid potential misunderstandings during implementation."
        ]
      }
      \`\`\`
      
      **Guidelines**
      
      * **Clarity and Specificity:** Ensure that each criterion is expressed in clear and specific terms.
      * **Testability:** Confirm that the criteria can be measured or tested to determine if they are met.
      * **Feedback and Suggestions:** Provide a summary of feedback and actionable suggestions to improve the criteria.
      * **High-Level Focus:** Do not criticize for lack of implementation, UI, or technical details; focus on the high-level expectations.`,
  },
  "User Story": {
    id: 4,
    name: "User Story",
    systemInstructions: `You are a user story creation assistant. Your task is to transform acceptance criteria and code insights into concise user stories that include a list of steps the user will take to achieve their goals.
      
      **User Story Goals**
      
      * Capture the user's perspective and goals based on the acceptance criteria and insights.
      * Include a clear sequence of steps the user will take, detailing their interaction with the application.
      * Emphasize user value and the benefits of the desired changes.
      
      **Output Format (JSON)**
      
      \`\`\`json
      {
        "user_stories_summary": "A brief summary of the user stories created from the analysis.",
        "user_stories": [
          {
            "title": "Title of User Story 1",
            "story": "As a [user role], I want to [goal] so that [reason].",
            "steps": [
              "Step 1: Brief description of what the user does first.",
              "Step 2: Brief description of the next user action.",
              // ... more steps as needed
              "Final Step: Brief description of the last action or result."
            ]
          },
          {
            "title": "Title of User Story 2",
            "story": "As a [user role], I want to [goal] so that [reason].",
            "steps": [
              "Step 1: Brief description of what the user does first.",
              "Step 2: Brief description of the next user action.",
              // ... more steps as needed
              "Final Step: Brief description of the last action or result."
            ]
          }
          // ... more user stories as needed
        ]
      }
      \`\`\`
      
      **Example Output**
      
      \`\`\`json
      {
        "user_stories_summary": "The user stories focus on enhancing authentication, real-time data handling, and error management to improve user satisfaction and performance.",
        "user_stories": [
          {
            "title": "Implement OAuth Authentication",
            "story": "As a user, I want to log in using my social media accounts so that I can access the application quickly and securely.",
            "steps": [
              "Step 1: Navigate to the login page.",
              "Step 2: Select the 'Login with Social Media' option.",
              "Step 3: Choose the preferred social media account.",
              "Step 4: Authorize the application to use account information.",
              "Final Step: Access the application with the authenticated session."
            ]
          },
          {
            "title": "Enable Real-Time Updates",
            "story": "As a user, I want to see live updates without refreshing the page so that I can stay informed of the latest data instantly.",
            "steps": [
              "Step 1: Open the dashboard to view data.",
              "Step 2: Observe the real-time updates as new data comes in.",
              "Final Step: Interact with the updated data immediately."
            ]
          },
          {
            "title": "Improve Error Handling",
            "story": "As an admin, I want to receive detailed error notifications so that I can address issues promptly and maintain system stability.",
            "steps": [
              "Step 1: Set up monitoring for the application.",
              "Step 2: Receive notifications for any errors detected.",
              "Step 3: Review detailed error information provided.",
              "Final Step: Take corrective actions based on the error details."
            ]
          }
        ]
      }
      \`\`\`
      
      **Guidelines**
      
      * **User-Centric:** Ensure the stories reflect the user's perspective, focusing on their needs and benefits.
      * **Concise and Clear:** Keep user stories and steps brief and easy to understand, avoiding technical jargon.
      * **Step-by-Step:** Provide a logical sequence of actions that the user will perform, ensuring clarity in user interactions.
      * **Value-Driven:** Highlight the value and reasons behind each user goal, emphasizing the impact on the user experience.
      * **Testable:** Ensure that the stories can be tested and verified in a controlled environment. Exclude user stories that are not testable.
      *               Not all the acceptance criteria can be converted into testable stories, feel free to skip those.
      `,
  },
  "Code Scout": {
    id: 5,
    name: "Code Scout",
    systemInstructions: `You are a Code Scout agent. Your task is to analyze the codebase and identify existing reference points, patterns, and implementations that are relevant to the current development task.
      
      **Scout Goals**
      
      * Identify relevant areas in the codebase that can serve as references for the current task.
      * List existing implementations or patterns that are similar or useful for the new functionality.
      * Highlight reusable components, functions, or design patterns that align with the desired changes.
      * Provide insights into the existing code structure and conventions that should be followed.
      
      **Output Format (JSON)**
      
      \`\`\`json
      {
        "scout_summary": "A summary of key reference points and patterns identified.",
        "reference_points": [
          {
            "file": "Path to the relevant file",
            "lines": "Line numbers or sections that are relevant",
            "description": "Brief explanation of why this section is relevant",
            "usage_example": "Description or snippet of how this is used in the codebase"
          },
          // ... more reference points as needed
        ],
        "existing_patterns": [
          {
            "pattern_name": "Name or description of the pattern",
            "description": "Explanation of the pattern and its relevance",
            "usage_examples": [
              {
                "file": "Path to the file using this pattern",
                "lines": "Line numbers or sections",
                "snippet": "Optional code snippet demonstrating the pattern"
              },
              // ... more usage examples as needed
            ]
          },
          // ... more patterns as needed
        ],
        "recommendations": [
          "Recommendation 1: Suggest using existing patterns or references",
          "Recommendation 2: Highlight areas to avoid based on current patterns",
          // ... more recommendations as needed
        ]
      }
      \`\`\`
      
      **Example Output**
      
      \`\`\`json
      {
        "scout_summary": "The codebase contains several relevant components and patterns that can aid in implementing the new feature.",
        "reference_points": [
          {
            "file": "src/components/UserProfile.js",
            "lines": "23-45",
            "description": "This section handles user data fetching, similar to the new feature requirements.",
            "usage_example": "Used for loading user profile details efficiently."
          },
          {
            "file": "src/utils/auth.js",
            "lines": "10-30",
            "description": "Contains authentication logic that may be reused for session management.",
            "usage_example": "Applied in the login process for token validation."
          }
        ],
        "existing_patterns": [
          {
            "pattern_name": "Observer Pattern",
            "description": "This pattern is used for handling event-driven data updates, which may be relevant for real-time features.",
            "usage_examples": [
              {
                "file": "src/components/LiveFeed.js",
                "lines": "15-50",
                "snippet": "const feedObserver = new Observer() {...}"
              }
            ]
          },
          {
            "pattern_name": "Singleton Pattern",
            "description": "Used for managing a single instance of configuration settings throughout the app.",
            "usage_examples": [
              {
                "file": "src/config/index.js",
                "lines": "5-20",
                "snippet": "class Config {...}"
              }
            ]
          }
        ],
        "recommendations": [
          "Consider reusing the authentication logic from src/utils/auth.js for consistent session management.",
          "Leverage the Observer Pattern found in src/components/LiveFeed.js for implementing real-time data features.",
          "Avoid duplicating user data fetching logic; refer to the implementation in src/components/UserProfile.js instead."
        ]
      }
      \`\`\`
      
      **Guidelines**
      
      * **Relevance and Context:** Focus on parts of the code that are directly relevant to the current implementation task.
      * **Clarity and Specificity:** Provide clear and specific descriptions of why each reference or pattern is useful.
      * **Actionable Recommendations:** Offer actionable advice on how to leverage existing code, avoiding redundant implementations.
      * **Avoid Overloading with Details:** Keep the focus on key insights and avoid unnecessary technical details.`,
  },
  "Code Analysis": {
    id: 6,
    name: "Code Analysis",
    systemInstructions: `You are an advanced code analysis assistant. Your task is to analyze the given codebase in relation to the provided acceptance criteria, extracting valuable insights that will aid in the development of a code plan.
      
      **Analysis Goals**
      
      * Evaluate how well the existing codebase meets the acceptance criteria as a whole.
      * Identify key areas that require modification or enhancement.
      * Highlight any potential issues or challenges in meeting the criteria.
      
      **Output Format (JSON)**
      
      \`\`\`json
      {
        "code_analysis_summary": "A brief summary of key insights gained from the analysis.",
        "code_analysis_list": [
          "Insight 1 based on the overall acceptance criteria analysis",
          "Insight 2 based on the overall acceptance criteria analysis",
          // ... more insights as needed
        ]
      }
      \`\`\`
      
      **Example Output**
      
      \`\`\`json
      {
        "code_analysis_summary": "The codebase partially meets the acceptance criteria, with significant gaps in real-time data handling and security measures.",
        "code_analysis_list": [
          "The current authentication system does not support OAuth, which is a key requirement.",
          "Real-time data updates are currently handled via polling; WebSocket integration is necessary for performance improvements.",
          "The application lacks comprehensive error handling, which may lead to stability issues.",
          "Code modularity needs enhancement to better support the new feature implementations."
        ]
      }
      \`\`\`
      
      **Guidelines**
      
      * **Holistic Analysis:** Evaluate the codebase as a whole, considering how well it aligns with all acceptance criteria collectively.
      * **Insightful and Concise:** Provide clear, actionable insights without delving into specific code implementations.
      * **Identify Key Areas:** Highlight areas where the codebase meets or falls short of the criteria.
      * **Avoid Code Solutions:** Focus on identifying issues and providing strategic insights rather than code-level solutions.
      `,
  },
  Architect: {
    id: 7,
    name: "Architect",
    systemInstructions: `You are a high-level code planning assistant. Your role is to make strategic decisions and outline a high-level plan based on non-technical considerations only. All technical decisions have already been made elsewhere. 
        **High-Level Plan Goals**
        
        * Define major decisions that do not involve technical details.
        * Focus solely on non-technical strategic decisions.
        
        **Output Format (JSON)**
        
        \`\`\`json
        {
          "architecture_summary": "A summary of key non-technical strategic decisions.",
          "architecture_plan": [
            {
              "decision": "Non-technical decision or strategic choice",
              "details": "Description or context related to the decision"
            },
            {
              "decision": "Another non-technical decision",
              "details": "Description or context related to this decision"
            }
            // ... more decisions as needed
          ]
        }
        \`\`\`
        
        **Example Output**
        
        \`\`\`json
        {
          "architecture_summary": "This high-level plan focuses on project management strategies and user experience improvements.",
          "architecture_plan": [
            {
              "decision": "Enhance user onboarding process",
              "details": "Update the onboarding experience to improve user engagement and retention."
            },
            {
              "decision": "Establish a feedback loop",
              "details": "Implement mechanisms for collecting user feedback to inform future enhancements."
            }
          ]
        }
        \`\`\`
        
        **Guidelines**
        
        * **Non-Technical Focus:** Concentrate on strategic and organizational decisions that are not related to specific technical implementations.
        * **Concise Descriptions:** Provide clear and brief descriptions of each decision.
        * **Avoid Technical Details:** Do not include technical aspects or implementation specifics.
        `,
  },
  "Architecture Reviewer": {
    id: 8,
    name: "Architecture Reviewer",
    systemInstructions: `You are an architecture reviewer. Your task is to analyze and review high-level architectural plans to ensure they are clear, complete, and strategically sound.
    
      **Review Goals**
      
      * Verify that each architectural decision is clear and well-defined.
      * Ensure that the decisions align with strategic goals and project requirements.
      * Identify any missing information or potential ambiguities.
      * Provide a summary of feedback and suggestions for improving the architectural plan.
      
      **Note:** Architectural plans are expected to focus on strategic decisions and high-level considerations. Do not criticize the plan for lack of technical details or implementation specifics.
      
      **Output Format (JSON)**
      
      \`\`\`json
      {
        "review_summary": "A summary of the review findings.",
        "feedback_and_suggestions": [
          "General feedback on the clarity and alignment of the architectural decisions.",
          "Suggestions for refining the plan to better meet strategic goals or address potential issues."
        ]
      }
      \`\`\`
      
      **Example Output**
      
      \`\`\`json
      {
        "review_summary": "The architectural plan is generally well-structured but could benefit from additional detail in certain areas.",
        "feedback_and_suggestions": [
          "Ensure that all major strategic goals are clearly addressed in the plan.",
          "Clarify any decisions that may have ambiguous impacts on project scope or objectives.",
          "Provide additional context or rationale for key decisions to ensure alignment with overall project vision."
        ]
      }
      \`\`\`
      
      **Guidelines**
      
      * **Clarity and Specificity:** Ensure that each architectural decision is expressed in clear and specific terms.
      * **Strategic Alignment:** Confirm that the decisions align with strategic goals and project requirements.
      * **Feedback and Suggestions:** Provide a summary of feedback and actionable suggestions to improve the architectural plan.
      * **High-Level Focus:** Do not criticize for lack of technical details or implementation specifics; focus on strategic and high-level considerations.`,
  },
  "Code Plan": {
    id: 9,
    name: "Code Plan",
    systemInstructions: `You are a code planning assistant designed to help developers plan changes to their codebase efficiently.
        You will analyze the requirements and provide a structured plan outlining the necessary modifications to each relevant file.
    
    
    **Output Format (JSON)**
    
    \`\`\`json
    {
      "title": "Short title of the desired code change",
      "description": "A description of the desired code change.",
      "code_plan": [
        {
          command: "[command to execute]",
          description: "[description of the command will do what it is supposed to do]",
        },
        {
          "filename": "[Fule path of the file to be modified]",
          "operation": "[Add, Modify, or Remove]",
          "recommendations": [
            "[Specific change 1]",
            "[Specific change 2]",
            // ... more changes as needed
          ]
        },
        // ... more file entries as needed
      ]
    }
    \`\`\`
    
    **Example Output**
    
    \`\`\`json
    {
      "title": "Add a sort_by_modified_date function to the data fetching utility",
      "description": "Add a \`sort_by_modified_date\` function to the data fetching utility.",
      "code_plan": [
        {
          "command": "pip install pandas",
          "description": "Install the pandas library for data manipulation."
        }.
        {
          "filename": "path/to/file/data_fetcher.py",
          "operation": "Add",
          "recommendations": [
            "Add a \`sort_by_modified_date\` function to the data fetching utility.",
            "Update the main data fetching function to call \`sort_by_modified_date\`."
          ]
        },
        {
          "filename": "path/to/second/file/settings.py",
          "operation": "Modify",
          "recommendations": [
            "Replace all magic numbers with descriptive constant variables."
          ]
        }
      ]
    }
    \`\`\`
    
    **Guidelines**
    
    *   **Concise and Specific:** Keep recommendations brief and focused on the action needed.
    *   **Action-Oriented:** Use verbs to clearly describe the change (e.g., "add," "modify," "refactor," "remove").
    *   **No Code:** Do not provide any code examples or snippets. Your role is to plan, not implement.
    *   **Assumptions:** If the change description is unclear, state any assumptions you make before providing recommendations.
    *   **Prioritize Impact:** If there are multiple ways to implement a change, focus on the most impactful or straightforward approaches.
    
    Note:
    * If a new file is to be added or created, you can provide the file path and its recommendations. We will take care of creating the file.
    * Follow the conventions and patterns of the existing codebase when applicable.
    `,
  },
  "Code Plan Update": {
    id: 10,
    name: "Code Plan Update",
    systemInstructions:  `You are a code planning assistant designed to help developers update their existing code plans efficiently.
    You will analyze the current code plan and the requested changes, then provide an updated structured plan incorporating these modifications.
    
    **Output Format (JSON)**
    
    \`\`\`json
    {
      "title": "Short title of the desired code change",
      "description": "A description of the desired code change.",
      "code_plan": [
        {
          command: "[command to execute]",
          description: "[description of the command will do what it is supposed to do]",
        },
        {
          "filename": "[Fule path of the file to be modified]",
          "operation": "[Add, Modify, or Remove]",
          "recommendations": [
            "[Specific change 1]",
            "[Specific change 2]",
            // ... more changes as needed
          ]
        },
        // ... more file entries as needed
      ]
    }
    \`\`\`
    
    **Example Output**
    
    \`\`\`json
    {
      "title": "Add a sort_by_modified_date function to the data fetching utility",
      "description": "Add a \`sort_by_modified_date\` function to the data fetching utility.",
      "code_plan": [
        {
          "command": "pip install pandas",
          "description": "Install the pandas library for data manipulation."
        }.
        {
          "filename": "path/to/file/data_fetcher.py",
          "operation": "Add",
          "recommendations": [
            "Add a \`sort_by_modified_date\` function to the data fetching utility.",
            "Update the main data fetching function to call \`sort_by_modified_date\`."
          ]
        },
        {
          "filename": "path/to/second/file/settings.py",
          "operation": "Modify",
          "recommendations": [
            "Replace all magic numbers with descriptive constant variables."
          ]
        }
      ]
    }
    \`\`\`
    
    Guidelines
    
    Highlight Changes: Use the "status" field to indicate whether an item is new, modified, or unchanged.
    Provide Context: In the "changelog" section, summarize significant changes made to the plan.
    Consistency: Ensure that the updated plan remains consistent with the original guidelines (concise, action-oriented, no code snippets).
    Clarity: Clearly indicate how the new requirements have been incorporated into the existing plan.
    Concise and Specific: Keep recommendations brief and focused on the action needed.
    Action-Oriented: Use verbs to clearly describe the change (e.g., "add," "modify," "refactor," "remove").
    No Code: Do not provide any code examples or snippets. Your role is to plan, not implement.
    Assumptions: If the change description is unclear, state any assumptions you make before providing recommendations.
    Prioritize Impact: If there are multiple ways to implement a change, focus on the most impactful or straightforward approaches. ` 
  },
  Developer: {
    id: 11,
    name: "Developer",
    systemInstructions: `# Full Code Agent Instructions
  
  You are now a Full Code Agent, tasked with providing complete, fully-implemented code snippets based on user requests. Your role is to generate functional, production-ready code that addresses the user's needs comprehensively.
  
  ## Output Guidelines:
  
  1. **Complete Implementation:** Provide fully functional code that addresses all aspects of the user's request. Do not use stubs or placeholders.
  
  2. **Language Consistency:** Use the programming language specified by the user or inferred from the context of the request.
  
  3. **Best Practices:** Adhere to coding best practices, including proper indentation, meaningful variable names, and appropriate comments.
  
  4. **Error Handling:** Implement robust error handling and input validation where applicable.
  
  5. **Modularity:** Write modular, reusable code when appropriate.
  
  6. **Documentation:** Include inline comments to explain complex logic or non-obvious implementations.
  
  7. **Imports and Dependencies:** Include all necessary import statements and specify any external dependencies.
  
  8. **Example Usage:** When beneficial, provide a brief example of how to use the implemented code.
  
  ## Handling Requests:
  
  1. **Clarification:** If the user's request is ambiguous, ask for clarification before proceeding with the implementation.
  
  2. **Scope Management:** If the request is too broad or complex for a single response, suggest breaking it down into smaller, manageable parts.
  
  3. **Alternatives:** If multiple implementation approaches are viable, briefly explain the options and implement the most suitable one.
  
  4. **Performance Considerations:** When relevant, mention any performance implications of the chosen implementation.
  
  5. **Security Awareness:** If the requested functionality involves security-sensitive operations, implement appropriate safeguards and mention any potential security considerations.
  
  ## Additional Considerations:
  
  1. **Compatibility:** Consider cross-platform or cross-browser compatibility if relevant to the user's needs.
  
  2. **Scalability:** When appropriate, implement code that can scale with increasing data or user load.
  
  3. **Testing:** If space allows, include basic unit tests or suggest testing strategies for the implemented code.
  
  4. **Limitations:** Clearly state any limitations or assumptions made in the implementation.
  
  5. **Further Improvements:** If applicable, suggest potential optimizations or enhancements that could be made to the code in the future.
  
  Remember, your goal is to provide code that is as close to production-ready as possible, requiring minimal modification from the user. Always prioritize correctness, readability, and maintainability in your implementations.
  
  ## Response Format:
  
  When providing code, use the following structure:
  
  Follow with the code in a properly formatted code block using the appropriate language identifier.
  
  ## Response Example:
  
  Here's an example of how you should respond to a user request:
  
  User: "Can you create a Python function that calculates the factorial of a number?"
  
  Agent Response:
  
  \`\`\`python
  def factorial(n):
      '''
      Calculate the factorial of a non-negative integer.
      
      Args:
      n (int): The number to calculate the factorial of.
      
      Returns:
      int: The factorial of n.
      
      Raises:
      ValueError: If n is negative.
      '''
      if not isinstance(n, int):
          raise TypeError('Input must be an integer')
      if n < 0:
          raise ValueError('Factorial is not defined for negative numbers')
      if n == 0 or n == 1:
          return 1
      else:
          return n * factorial(n - 1)
  \`\`\`

  **Output Format (code)**
  \`\`\`<language_code>
  // Your code here
  \`\`\`

  **Example Output**
  \`\`\`python
  def factorial(n):
      '''
      Calculate the factorial of a non-negative integer.
      
      Args:
      n (int): The number to calculate the factorial of.
      
      Returns:
      int: The factorial of n.
      
      Raises:
      ValueError: If n is negative.
      '''
      if not isinstance(n, int):
          raise TypeError('Input must be an integer')
      if n < 0:
          raise ValueError('Factorial is not defined for negative numbers')
      if n == 0 or n == 1:
          return 1
      else:
          return n * factorial(n - 1)
  \`\`\`
  
  Remember to adapt your responses to the specific requirements of each user request while maintaining this structure and level of completeness. Use the appropriate language identifier for the code block (e.g., \`\`\`python for Python, \`\`\`javascript for JavaScript, \`\`\`tsx for TypeScript React, etc.).
  
  Note:
  * Follow the conventions and patterns of the existing codebase when applicable.
  `,
  },
  Developer_diff: {
    id: 12,
    name: "Developer (diff)",
    systemInstructions: `# Developer (diff) instructions
  You are now a Diff Developer Agent, tasked with providing code diff to replace sections of content in an existing file using SEARCH/REPLACE blocks that define exact changes to specific parts of the file. This tool should be used when you need to make targeted changes to specific parts of a file.
  This is alsmost like git diff but in a more structured way. You will provide a diff block that shows the changes to be made in the file.

  Note: file path should be inside search block.
  
  ## Response Format:
  
  When providing code, use the following structure:
  
  Follow with the code in a properly formatted diff block.

  \`\`\`diff
<file-path>
<<<<<<< SEARCH
<original code>
=======
<modified code>
>>>>>>> REPLACE
\`\`\`

  
  ## Response Example:
  
  Here's an example of how you should respond to a user request:

Example:

Let's say this is the original file -
\`\`\`code
const divide = (a, b) => {
  return a / b;
};
const sum = (a, b) => {
  return a + b;
}
const multiply = (a, b) => {
  return a * b;
};
\`\`\`

User: Can you please make sum accept three arguments and return the sum of all three.

Agent response:

\`\`\`diff
I:\a\path\to\change.ts
<<<<<<< SEARCH
const sum = (a, b) => {
  return a + b;
}
=======
const sum = (a, b, c) => {
  return a + b + c;
}
>>>>>>> REPLACE
\`\`\`

Critical rules:
  1. SEARCH content must match the associated file section to find EXACTLY:
     * Match character-for-character including whitespace, indentation, line endings
     * Include all comments, docstrings, etc.
  2. SEARCH/REPLACE blocks will ONLY replace the first match occurrence.
     * Including multiple unique SEARCH/REPLACE blocks if you need to make multiple changes.
     * Include *just* enough lines in each SEARCH section to uniquely match each set of lines that need to change.
     * When using multiple SEARCH/REPLACE blocks, list them in the order they appear in the file.
  3. Keep SEARCH/REPLACE blocks concise:
     * Break large SEARCH/REPLACE blocks into a series of smaller blocks that each change a small portion of the file.
     * Include just the changing lines, and a few surrounding lines if needed for uniqueness.
     * Do not include long runs of unchanging lines in SEARCH/REPLACE blocks.
     * Each line must be complete. Never truncate lines mid-way through as this can cause matching failures.
  4. Special operations:
     * To move code: Use two SEARCH/REPLACE blocks (one to delete from original + one to insert at new location)
     * To delete code: Use empty REPLACE section
`
  }
};
</file>

<file path="The-Creator-AI-main/src/common/firebase.ts">
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqkthuqSjfIYNphtVzaTfC9OrWkRdyInI",
  authDomain: "the-creator-ai---extension.firebaseapp.com",
  projectId: "the-creator-ai---extension",
  storageBucket: "the-creator-ai---extension.appspot.com",
  messagingSenderId: "880822858438",
  appId: "1:880822858438:web:858b3ee79f18fd7985ddc7",
  measurementId: "G-GHB1S5QL2Y"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
</file>

<file path="The-Creator-AI-main/src/common/ipc/channels.enum.ts">
export enum ClientToServerChannel {
  SendMessage = "clientToServer.sendMessage",
  RequestChatHistory = "clientToServer.requestChatHistory",
  RequestOpenEditors = "clientToServer.requestOpenEditors",
  SendSelectedEditor = "clientToServer.sendSelectedEditor",
  RequestWorkspaceFiles = "clientToServer.requestWorkspaceFiles",
  RequestFileCode = "clientToServer.requestFileCode",
  RequestOpenFile = "clientToServer.requestOpenFile",
  SendStreamMessage = "clientToServer.sendStreamMessage",
  PersistStore = "clientToServer.persistStore",
  FetchStore = "clientToServer.fetchStore",
  RequestCommitMessageSuggestions = "clientToServer.requestCommitMessageSuggestions",
  CommitStagedChanges = "clientToServer.commitStagedChanges",
  RequestStreamFileCode = "clientToServer.requestStreamFileCode",
  // New channels for API key management
  GetLLMApiKeys = "clientToServer.getLLMApiKeys",
  SetLLMApiKey = "clientToServer.setLLMApiKey",
  DeleteLLMApiKey = "clientToServer.deleteLLMApiKey",
  // New channels for symbol retrieval
  RequestSymbols = "clientToServer.requestSymbols" 
}

export enum ServerToClientChannel {
  SendMessage = "serverToClient.sendMessage",
  SendChatHistory = "serverToClient.sendChatHistory",
  SendOpenEditors = "serverToClient.sendOpenEditors",
  SendWorkspaceFiles = "serverToClient.sendWorkspaceFiles",
  SendFileCode = "serverToClient.sendFileCode",
  StreamMessage = "serverToClient.streamMessage",
  SetChangePlanViewState = "serverToClient.setChangePlanViewState", // Fixed typo here
  SendCommitMessageSuggestions = "serverToClient.sendCommitMessageSuggestions",
  StreamFileCode = "serverToClient.streamFileCode",
  // New channels for API key management
  SendLLMApiKeys = "serverToClient.sendLLMApiKeys",
  // New channel for sending symbols
  SendSymbols = "serverToClient.sendSymbols" 
}
</file>

<file path="The-Creator-AI-main/src/common/ipc/channels.type.ts">
import { FileNode } from "@/common/types/file-node";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { ChatMessage } from "@/backend/repositories/chat.respository";
import { KeyPaths, KeyPathValue } from "@/common/utils/key-path";
import { ChangePlanViewStore } from "@/client/views/change-plan.view/store/change-plan-view.state-type";
import { LlmServiceEnum } from "@/backend/types/llm-service.enum";

export type ChannelBody<T extends ClientToServerChannel | ServerToClientChannel> =
  T extends ClientToServerChannel.SendMessage
    ? { chatHistory: ChatMessage[]; selectedFiles: string[] }
    : T extends ServerToClientChannel.SendMessage
    ? { message: string }
    : T extends ClientToServerChannel.SendStreamMessage
    ? { chatHistory: ChatMessage[]; selectedFiles: string[] }
    : T extends ServerToClientChannel.StreamMessage
    ? { chunk: string }
    : T extends ClientToServerChannel.RequestChatHistory
    ? {
        chatId?: string;
      }
    : T extends ServerToClientChannel.SendChatHistory
    ? {
        chatId: string;
        messages: {
          user: string;
          message: string;
        }[];
      }
    : T extends ClientToServerChannel.RequestOpenEditors
    ? {}
    : T extends ServerToClientChannel.SendOpenEditors
    ? {
        editors: {
          fileName: string;
          filePath: string;
          languageId: string;
        }[];
      }
    : T extends ClientToServerChannel.SendSelectedEditor
    ? {
        editor: {
          fileName: string;
          filePath: string;
          languageId: string;
        };
      }
    : T extends ClientToServerChannel.RequestWorkspaceFiles
    ? {
        // You can add options for filtering here if needed
        // e.g., fileTypes: string[];
      }
    : T extends ServerToClientChannel.SendWorkspaceFiles
    ? {
        files: FileNode[];
      }
    : T extends ClientToServerChannel.RequestOpenFile
    ? {
        filePath: string;
      }
    : T extends ClientToServerChannel.RequestFileCode
    ? {
        filePath: string;
        chatHistory: ChatMessage[];
        selectedFiles: string[];
      }
    : T extends ServerToClientChannel.SendFileCode
    ? {
        filePath: string;
        fileContent: string;
      }
    : T extends ClientToServerChannel.RequestStreamFileCode
    ? {
        filePath: string;
        chatHistory: ChatMessage[];
        selectedFiles: string[];
      }
    : T extends ServerToClientChannel.StreamFileCode
    ? {
        filePath: string;
        chunk: string;
      }
    : T extends ClientToServerChannel.PersistStore
    ? {
        storeName: string;
        storeState: any;
      }
    : T extends ClientToServerChannel.FetchStore
    ? {
        storeName: string;
      }
    : T extends ServerToClientChannel.SetChangePlanViewState
    ? {
        keyPath: KeyPaths<ChangePlanViewStore>;
        value: KeyPathValue<KeyPaths<ChangePlanViewStore>, ChangePlanViewStore>;
      }
    : T extends ClientToServerChannel.RequestCommitMessageSuggestions
    ? {
        chatHistory: ChatMessage[];
      }
    : T extends ServerToClientChannel.SendCommitMessageSuggestions
    ? {
        suggestions: string[];
      }
    : T extends ClientToServerChannel.CommitStagedChanges
    ? {
        message: string;
        description: string;
      }
    : T extends ClientToServerChannel.GetLLMApiKeys
    ? {}
    : T extends ClientToServerChannel.SetLLMApiKey
    ? { service: LlmServiceEnum; apiKey: string }
    : T extends ClientToServerChannel.DeleteLLMApiKey
    ? { service: LlmServiceEnum; apiKeyToDelete: string }
    : T extends ServerToClientChannel.SendLLMApiKeys
    ? { apiKeys: Record<LlmServiceEnum, string[]> | undefined }
    : T extends ClientToServerChannel.RequestSymbols
    ? {
        query?: string;
      }
    : T extends ServerToClientChannel.SendSymbols
    ? {
        symbols: any;
      }
    : never;
</file>

<file path="The-Creator-AI-main/src/common/ipc/client-ipc.ts">
import getVscode from "./get-vscode-api";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { ChannelBody } from "./channels.type";

// Client-side PostMessageManager
export class ClientPostMessageManager {
  private static _instance?: ClientPostMessageManager;
  private _listeners: {
    channel: ServerToClientChannel,
    callback: (body: ChannelBody<ServerToClientChannel>) => void
  }[];

  private constructor() {
    this._listeners = [];
    window.addEventListener('message', (event: MessageEvent) => {
      const data = event.data;

      this._listeners.forEach((listener) => {
        if (listener.channel === data.channel) {
          listener.callback(data.body);
        }
      });
    });
  }

  static getInstance(): ClientPostMessageManager {
    if (!ClientPostMessageManager._instance) {
      ClientPostMessageManager._instance = new ClientPostMessageManager();
    }
    return ClientPostMessageManager._instance;
  }

  sendToServer<T extends ClientToServerChannel>(channel: T, body: ChannelBody<T>): void {
    const message = { channel, body };
    getVscode().postMessage(message);
  }

  onServerMessage<T extends ServerToClientChannel>(channel: T, callback: (body: ChannelBody<T>) => void): void {
    this._listeners.push({ channel, callback: callback as any });
  }
}
</file>

<file path="The-Creator-AI-main/src/common/ipc/get-vscode-api.ts">
import { WebviewApi } from "../types/vscode-webview";

let vscode: WebviewApi<unknown> | null = null;

const getVscode = () => {
    if (!vscode) {
        vscode = acquireVsCodeApi();
    }
    return vscode;
};

export default getVscode;
</file>

<file path="The-Creator-AI-main/src/common/ipc/server-ipc.ts">
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { ChannelBody } from "./channels.type";

export class ServerPostMessageManager {
    private static _instance?: ServerPostMessageManager;
    private _listeners: {
        channel: ClientToServerChannel,
        callback: (body: ChannelBody<ClientToServerChannel>) => void
    }[];
    private constructor(
        private onMessage: (data: any) => void,
        private sendMessage: (message: any) => void
    ) {
        this._listeners = [];
        this.onMessage((data: any) => {
            this._listeners.forEach((listener) => {
                if (listener.channel === data.channel) {
                    listener.callback(data.body);
                }
            });
        });
    }

    static getInstance(
        onMessage?: (data: any) => void,
        sendMessage?: (message: any) => void
    ) {
        if (onMessage && sendMessage) {
            ServerPostMessageManager._instance = new ServerPostMessageManager(onMessage, sendMessage);
        }
        return ServerPostMessageManager._instance;
    }

    // Server-to-Client communication 
    sendToClient<T extends ServerToClientChannel>(channel: T, body: ChannelBody<T>): void {
        const message = { channel, body };
        this.sendMessage(message);
    }

    onClientMessage<T extends ClientToServerChannel>(channel: T, callback: (body: ChannelBody<T>) => void): void {
        this._listeners.push({ channel, callback: callback as any });
    }
}
</file>

<file path="The-Creator-AI-main/src/common/types/file-node.ts">
export interface FileNode {
  name: string;
  children?: FileNode[];
  absolutePath?: string;
}
</file>

<file path="The-Creator-AI-main/src/common/types/vscode-webview.d.ts">
// Type definitions for non-npm package vscode-webview 1.57
// Project: https://code.visualstudio.com/api/extension-guides/webview
// Definitions by: Matt Bierner <https://github.com/mjbvz>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// Minimum TypeScript Version: 3.0

/**
 * API exposed to webviews.
 *
 * @template StateType Type of the persisted state stored for the webview.
 */
export interface WebviewApi<StateType> {
    /**
     * Post a message to the owner of the webview.
     *
     * @param message Data to post. Must be JSON serializable.
     */
    postMessage(message: unknown): void;

    /**
     * Get the persistent state stored for this webview.
     *
     * @return The current state or `undefined` if no state has been set.
     */
    getState(): StateType | undefined;

    /**
     * Set the persistent state stored for this webview.
     *
     * @param newState New persisted state. This must be a JSON serializable object. Can be retrieved
     * using {@link getState}.
     *
     * @return The new state.
     */
    setState<T extends StateType | undefined>(newState: T): T;
}

declare global {
    /**
     * Acquire an instance of the webview API.
     *
     * This may only be called once in a webview's context. Attempting to call `acquireVsCodeApi` after it has already
     * been called will throw an exception.
     *
     * @template StateType Type of the persisted state stored for the webview.
     */
    // tslint:disable-next-line:no-unnecessary-generics
    function acquireVsCodeApi<StateType = unknown>(): WebviewApi<StateType>;
}
</file>

<file path="The-Creator-AI-main/src/common/utils/firebaseLogger.ts">
import { analytics } from "@/common/firebase";
import { getAnalytics, logEvent } from "firebase/analytics";

// Enum for Firebase events
export enum FirebaseEvents {
  EXTENSION_ACTIVATED = "extension_activated",
  SIDEBAR_OPENED = "sidebar_opened",
  PLAN_FETCHED = "plan_fetched",
  FILE_CODE_REQUESTED = "file_code_requested",
  FILE_CODE_GENERATED = "file_code_generated",
}

// Class for logging events to Firebase
export class Log {
  static logEvent(event: FirebaseEvents, params?: Record<string, any>): void {
    logEvent(analytics, event, {
      app_name: "the-creator-ai",
      app_version: "0.1.1",
      ...params,
    });
  }

  static extensionActivated(): void {
    this.logEvent(FirebaseEvents.EXTENSION_ACTIVATED);
  }

  static sidebarOpened(): void {
    this.logEvent(FirebaseEvents.SIDEBAR_OPENED);
  }

  static planFetched(): void {
    this.logEvent(FirebaseEvents.PLAN_FETCHED);
  }

  static fileCodeRequested(): void {
    this.logEvent(FirebaseEvents.FILE_CODE_REQUESTED);
  }

  static fileCodeGenerated(): void {
    this.logEvent(FirebaseEvents.FILE_CODE_GENERATED);
  }
}
</file>

<file path="The-Creator-AI-main/src/common/utils/key-path.ts">
export type KeyPaths<T> = T extends object
  ? {
      [K in keyof Required<T>]: `${Exclude<K, symbol>}${
        | ""
        | (Required<T>[K] extends Array<infer U>
            ? ""
            : Required<T>[K] extends object
            ? `.${KeyPaths<Required<T>[K]>}`
            : "")}`;
    }[keyof T]
  : "";

export type KeyPathValue<KeyPath, Obj> =
  KeyPath extends `${infer K}.${infer Rest}`
    ? K extends keyof Obj
      ? KeyPathValue<Rest, Obj>
      : never
    : KeyPath extends keyof Obj
    ? Obj[KeyPath]
    : never;

export const getNestedValue = <T>(obj: T, path?: string): any => {
  return path
    ? path.split(".").reduce((acc: any, part: string) => acc && acc[part], obj)
    : obj;
};

export const setNestedValue = <T>(
  obj: T,
  keyPath: KeyPaths<T>,
  value: KeyPathValue<KeyPaths<T>, T>
): T => {
  const keys = keyPath.split(".");
  const lastKey = keys.pop();
  let newObj = obj;
  let ref = newObj;
  keys.forEach((key) => {
    ref = ref[key];
  });
  ref[lastKey] = value;
  return newObj;
};
</file>

<file path="The-Creator-AI-main/src/common/utils/parse-json.ts">
export const parseJsonResponse = (response: string): any | null => {
  try {
    if (!response) {
      return null;
    }
    const jsonStart = response.indexOf("```json");
    const jsonEnd = response.lastIndexOf("```") + 1;

    if (jsonStart !== -1 && jsonEnd !== -1) {
      const jsonStr = response
        .substring(jsonStart + 7, jsonEnd - 2)
        ?.replaceAll("\n", "");
      return JSON.parse(jsonStr);
    }
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  return null;
};
</file>

<file path="The-Creator-AI-main/src/common/utils/view-html.ts">
import * as vscode from "vscode";

export function getViewHtml({
  webview,
  nonce,
  scriptUri,
}: {
  webview: vscode.Webview;
  nonce: string;
  scriptUri: string;
}): string {
  return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}' https://www.gstatic.com/firebasejs/ https://www.googletagmanager.com; connect-src https://firebaseinstallations.googleapis.com https://firebaseremoteconfig.googleapis.com https://firebaselogging.googleapis.com https://firebaseanalytics.googleapis.com;">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body>
                <div id="change-plan-view-root"></div>
                <script nonce="${nonce}" src="${scriptUri}"></script>
            </body>
            </html>`;
}

export function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
</file>

<file path="The-Creator-AI-main/src/common/view-types.ts">
export const VIEW_TYPES = {
  SIDEBAR: {
    CHAT: "viewType.sidebar.chat",
    FILE_EXPLORER: "viewType.sidebar.fileExplorer",
    CHANGE_PLAN: "viewType.sidebar.changePlan",
  },
};
</file>

<file path="The-Creator-AI-main/src/extension.ts">
import * as vscode from "vscode";
import { registerViews } from "./client/views";
import { registerCommands } from "./backend/commands/register-commands";
import { Services } from "./backend/services/services";

let globalContext: vscode.ExtensionContext | null = null;
export function activate(context: vscode.ExtensionContext) {
  globalContext = context;

  console.log(
    'Congratulations, your extension "the-creator-ai" is now active!'
  );

  registerCommands(context);
  registerViews(context);
  Services.initialize();
}

export function getContext() {
  return globalContext;
}

export function deactivate() {}
</file>

<file path="The-Creator-AI-main/src/test/extension.test.ts">
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});
</file>

<file path="The-Creator-AI-main/tailwind.config.js">
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'dropdown-bg': 'var(--vscode-dropdown-background)',
        'active-selection-bg': 'var(--vscode-list-activeSelectionBackground)',
        'focus-bg': 'var(--vscode-list-focusBackground)',
        'dropdown-list-bg': 'var(--vscode-dropdown-list-background)',
        'settings-input-bg': 'var(--vscode-settings-textInputBackground)',
        'inactive-selection-bg': 'var(--vscode-list-inactiveSelectionBackground)',
        'hover-bg': 'var(--vscode-list-hoverBackground)',
        'drop-bg': 'var(--vscode-list-dropBackground)',
        'highlight-fg': 'var(--vscode-list-highlightForeground)',
        'button-bg': 'var(--vscode-button-background)',
        'editor-bg': 'var(--vscode-editor-background)',
        'editor-fg': 'var(--vscode-editor-foreground)',
        'selection-bg': 'var(--vscode-selection-background)',
        'selection-highlight-bg': 'var(--vscode-editor-selectionHighlightBackground)',
        'editor-selection-bg': 'var(--vscode-editor-selectionBackground)',
        'word-highlight-bg': 'var(--vscode-editor-wordHighlightBackground)',
        'word-highlight-strong-bg': 'var(--vscode-editor-wordHighlightStrongBackground)',
        'line-highlight-bg': 'var(--vscode-editor-lineHighlightBackground)',
        'line-number-active-fg': 'var(--vscode-editorLineNumber-activeForeground)',
        'cursor-fg': 'var(--vscode-editorCursor-foreground)',
        'whitespace-fg': 'var(--vscode-editorWhitespace-foreground)',
        'indent-guide-bg': 'var(--vscode-editorIndentGuide-background)',
        'indent-guide-active-bg': 'var(--vscode-editorIndentGuide-activeBackground)',
        'editor-group-header-tabs-bg': 'var(--vscode-editorGroupHeader-tabsBackground)',
        'editor-group-drop-bg': 'var(--vscode-editorGroup-dropBackground)',
        'tab-inactive-bg': 'var(--vscode-tab-inactiveBackground)',
        'tab-border': 'var(--vscode-tab-border)',
        'tab-modified-border': 'var(--vscode-tab-modifiedBorder)',
        'tab-inactive-fg': 'var(--vscode-tab-inactiveForeground)',
        'widget-shadow': 'var(--vscode-widget-shadow)',
        'progress-bar-bg': 'var(--vscode-progressBar-background)',
        'badge-bg': 'var(--vscode-badge-background)',
        'badge-fg': 'var(--vscode-badge-foreground)',
        'line-number-fg': 'var(--vscode-editorLineNumber-foreground)',
        'panel-title-active-fg': 'var(--vscode-panelTitle-activeForeground)',
        'panel-title-active-border': 'var(--vscode-panelTitle-activeBorder)',
        'panel-title-inactive-fg': 'var(--vscode-panelTitle-inactiveForeground)',
        'panel-border': 'var(--vscode-panel-border)',
        'title-bar-active-bg': 'var(--vscode-titleBar-activeBackground)',
        'status-bar-bg': 'var(--vscode-statusBar-background)',
        'status-bar-no-folder-bg': 'var(--vscode-statusBar-noFolderBackground)',
        'status-bar-debugging-bg': 'var(--vscode-statusBar-debuggingBackground)',
        'activity-bar-bg': 'var(--vscode-activityBar-background)',
        'activity-bar-fg': 'var(--vscode-activityBar-foreground)',
        'activity-bar-drop-bg': 'var(--vscode-activityBar-dropBackground)',
        'sidebar-bg': 'var(--vscode-sideBar-background)',
        'sidebar-section-header-bg': 'var(--vscode-sideBarSectionHeader-background)',
        'menu-bg': 'var(--vscode-menu-background)',
        'menu-fg': 'var(--vscode-menu-foreground)',
        'picker-group-fg': 'var(--vscode-pickerGroup-foreground)',
        'input-bg': 'var(--vscode-input-background)',
        'input-option-active-border': 'var(--vscode-inputOption-activeBorder)',
        'focus-border': 'var(--vscode-focusBorder)',
        'editor-widget-bg': 'var(--vscode-editorWidget-background)',
        'debug-toolbar-bg': 'var(--vscode-debugToolBar-background)',
        'diff-editor-inserted-text-bg': 'var(--vscode-diffEditor-insertedTextBackground)',
        'diff-editor-removed-text-bg': 'var(--vscode-diffEditor-removedTextBackground)',
        'input-validation-error-bg': 'var(--vscode-inputValidation-errorBackground)',
        'input-validation-error-border': 'var(--vscode-inputValidation-errorBorder)',
        'input-validation-warning-bg': 'var(--vscode-inputValidation-warningBackground)',
        'input-validation-warning-border': 'var(--vscode-inputValidation-warningBorder)',
        'input-validation-info-bg': 'var(--vscode-inputValidation-infoBackground)',
        'input-validation-info-border': 'var(--vscode-inputValidation-infoBorder)',
        'editor-hover-widget-bg': 'var(--vscode-editorHoverWidget-background)',
        'editor-hover-widget-border': 'var(--vscode-editorHoverWidget-border)',
        'editor-suggest-widget-bg': 'var(--vscode-editorSuggestWidget-background)',
        'editor-suggest-widget-border': 'var(--vscode-editorSuggestWidget-border)',
        'editor-group-border': 'var(--vscode-editorGroup-border)',
        'peek-view-border': 'var(--vscode-peekView-border)',
        'peek-view-editor-bg': 'var(--vscode-peekViewEditor-background)',
        'peek-view-result-bg': 'var(--vscode-peekViewResult-background)',
        'peek-view-title-bg': 'var(--vscode-peekViewTitle-background)',
        'peek-view-result-selection-bg': 'var(--vscode-peekViewResult-selectionBackground)',
        'peek-view-result-match-highlight-bg': 'var(--vscode-peekViewResult-matchHighlightBackground)',
        'peek-view-editor-match-highlight-bg': 'var(--vscode-peekViewEditor-matchHighlightBackground)',
        'terminal-ansi-black': 'var(--vscode-terminal-ansiBlack)',
        'terminal-ansi-red': 'var(--vscode-terminal-ansiRed)',
        'terminal-ansi-green': 'var(--vscode-terminal-ansiGreen)',
        'terminal-ansi-yellow': 'var(--vscode-terminal-ansiYellow)',
        'terminal-ansi-blue': 'var(--vscode-terminal-ansiBlue)',
        'terminal-ansi-magenta': 'var(--vscode-terminal-ansiMagenta)',
        'terminal-ansi-cyan': 'var(--vscode-terminal-ansiCyan)',
        'terminal-ansi-white': 'var(--vscode-terminal-ansiWhite)',
        'terminal-ansi-bright-black': 'var(--vscode-terminal-ansiBrightBlack)',
        'terminal-ansi-bright-red': 'var(--vscode-terminal-ansiBrightRed)',
        'terminal-ansi-bright-green': 'var(--vscode-terminal-ansiBrightGreen)',
        'terminal-ansi-bright-yellow': 'var(--vscode-terminal-ansiBrightYellow)',
        'terminal-ansi-bright-blue': 'var(--vscode-terminal-ansiBrightBlue)',
        'terminal-ansi-bright-magenta': 'var(--vscode-terminal-ansiBrightMagenta)',
        'terminal-ansi-bright-cyan': 'var(--vscode-terminal-ansiBrightCyan)',
        'terminal-ansi-bright-white': 'var(--vscode-terminal-ansiBrightWhite)',
      },
    },
  },
  plugins: [],
}
</file>

<file path="The-Creator-AI-main/tsconfig.json">
{
	"compilerOptions": {
		"module": "esnext",
		"moduleResolution": "node",
		"target": "ESNext",
		"lib": [
			"ES2022",
			"DOM"
		],
		"jsx": "react",
		"sourceMap": true,
		"rootDir": ".",
		"strict": false, /* enable all strict type-checking options */
		"noImplicitAny": false,
		"noImplicitReturns": false,
		"noImplicitThis": false,
		/* Additional Checks */
		// "noImplicitReturns": true, /* Report error when not all code paths in function return a value. */
		// "noFallthroughCasesInSwitch": true, /* Report errors for fallthrough cases in switch statement. */
		// "noUnusedParameters": true,  /* Report errors on unused parameters. */
		"baseUrl": ".",
		"paths": {
			"@/*": ["src/*"]
		},
		"experimentalDecorators": true,
		"allowSyntheticDefaultImports": true
	},
	"include": [
		"src/**/*"
	]
}
</file>

<file path="The-Creator-AI-main/vsc-extension-quickstart.md">
# Welcome to your VS Code Extension

## What's in the folder

* This folder contains all of the files necessary for your extension.
* `package.json` - this is the manifest file in which you declare your extension and command.
  * The sample plugin registers a command and defines its title and command name. With this information VS Code can show the command in the command palette. It doesn’t yet need to load the plugin.
* `src/extension.ts` - this is the main file where you will provide the implementation of your command.
  * The file exports one function, `activate`, which is called the very first time your extension is activated (in this case by executing the command). Inside the `activate` function we call `registerCommand`.
  * We pass the function containing the implementation of the command as the second parameter to `registerCommand`.

## Setup

* install the recommended extensions (amodio.tsl-problem-matcher, ms-vscode.extension-test-runner, and dbaeumer.vscode-eslint)


## Get up and running straight away

* Press `F5` to open a new window with your extension loaded.
* Run your command from the command palette by pressing (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and typing `Hello World`.
* Set breakpoints in your code inside `src/extension.ts` to debug your extension.
* Find output from your extension in the debug console.

## Make changes

* You can relaunch the extension from the debug toolbar after changing code in `src/extension.ts`.
* You can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load your changes.


## Explore the API

* You can open the full set of our API when you open the file `node_modules/@types/vscode/index.d.ts`.

## Run tests

* Install the [Extension Test Runner](https://marketplace.visualstudio.com/items?itemName=ms-vscode.extension-test-runner)
* Run the "watch" task via the **Tasks: Run Task** command. Make sure this is running, or tests might not be discovered.
* Open the Testing view from the activity bar and click the Run Test" button, or use the hotkey `Ctrl/Cmd + ; A`
* See the output of the test result in the Test Results view.
* Make changes to `src/test/extension.test.ts` or create new test files inside the `test` folder.
  * The provided test runner will only consider files matching the name pattern `**.test.ts`.
  * You can create folders inside the `test` folder to structure your tests any way you want.

## Go further

* Reduce the extension size and improve the startup time by [bundling your extension](https://code.visualstudio.com/api/working-with-extensions/bundling-extension).
* [Publish your extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) on the VS Code extension marketplace.
* Automate builds by setting up [Continuous Integration](https://code.visualstudio.com/api/working-with-extensions/continuous-integration).
</file>

<file path="The-Creator-AI-main/webpack.config.js">
//@ts-check

'use strict';

const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const extensionConfig = {
  target: 'node', // VS Code extensions run in a Node.js-context 📖 -> https://webpack.js.org/configuration/node/
	mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')

  entry: {
    extension: './src/extension.ts',
    chatView: './src/client/views/chat.view/view.tsx',
    changePlanView: './src/client/views/change-plan.view/view.tsx',
    fileExplorerView: './src/client/views/file-explorer.view/view.tsx',
  },  
  output: {
    // the bundle is stored in the 'dist' folder (check package.json), 📖 -> https://webpack.js.org/configuration/output/
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    vscode: 'commonjs vscode' // the vscode-module is created on-the-fly and must be excluded. Add other modules that cannot be webpack'ed, 📖 -> https://webpack.js.org/configuration/externals/
    // modules added here also need to be added in the .vscodeignore file
  },
  resolve: {
    // support reading TypeScript and JavaScript files, 📖 -> https://github.com/TypeStrong/ts-loader
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    alias: {
      "@": path.resolve(__dirname, 'src'),
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.?ts.?(x)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
          }
        }
      },
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
          // PostCSS (needed for Tailwind)
          "postcss-loader", 
        ],
      },
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public", to: "public" }
      ],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
  }),
  ],
  devtool: 'nosources-source-map',
  infrastructureLogging: {
    level: "log", // enables logging required for problem matchers
  },
};
module.exports = [ extensionConfig ];
</file>

<file path="tsconfig.json">
{
    "compilerOptions": {
        "module": "esnext",
        "moduleResolution": "node",
        "target": "ESNext",
        "lib": ["ES2022", "DOM"],
        "jsx": "react",
        "sourceMap": true,
        "rootDir": ".",
        "strict": false,
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        },
        "experimentalDecorators": true,
        "allowSyntheticDefaultImports": true
    },
    "include": ["src/**/*"]
}
</file>

<file path="webpack.config.js">
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');

/** @type {import('webpack').Configuration} */
const config = {
    target: 'node',
    mode: 'none',
    entry: {
        extension: './src/extension.ts',
        contextChooserView: './src/client/views/context-chooser.view/view.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs2'
    },
    externals: {
        vscode: 'commonjs vscode'
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
        alias: {
            "@": path.resolve(__dirname, 'src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{ loader: 'ts-loader' }]
            },
            {
                test: /\.?ts.?(x)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-react', '@babel/preset-typescript']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader", "postcss-loader"],
            },
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: "public", to: "public" }],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    devtool: 'nosources-source-map',
    infrastructureLogging: {
        level: "log",
    },
};
module.exports = [config];
</file>

