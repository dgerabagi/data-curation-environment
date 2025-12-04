/**
 * SCRIPT: fix-shared-imports.js
 * PURPOSE: Fixes circular dependency issues in @ag/shared where internal files import from '@ag/shared'
 *          instead of relative paths. This resolves TS5055 "Overwrite input file" errors.
 */

const fs = require('fs');
const path = require('path');

const sharedDataDir = path.resolve(__dirname, '../packages/ag-shared/src/data/items');

function processDirectory(dir) {
    if (!fs.existsSync(dir)) {
        console.warn(`Directory not found: ${dir}`);
        return;
    }

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            processDirectory(fullPath);
        } else if (entry.name.endsWith('.ts')) {
            fixImport(fullPath);
        }
    }
}

function fixImport(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    let changed = false;

    // Calculate relative path to 'src/types/item.types'
    // We assume the structure packages/ag-shared/src/data/items/...
    // and types are in packages/ag-shared/src/types/item.types.ts
    
    // Logic:
    // 1. Get dir of current file.
    // 2. Find relative path from dir to 'packages/ag-shared/src/types/item.types'
    
    const typesPath = path.resolve(__dirname, '../packages/ag-shared/src/types/item.types');
    const fileDir = path.dirname(filePath);
    
    // Get relative path, remove extension for import
    let relativePath = path.relative(fileDir, typesPath).replace(/\\/g, '/');
    if (!relativePath.startsWith('.')) relativePath = './' + relativePath;

    // Regex to find: import { ... } from '@ag/shared';
    const regex = /from\s+['"]@ag\/shared['"];/g;

    if (regex.test(content)) {
        content = content.replace(regex, `from '${relativePath}';`);
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Fixed imports in: ${filePath}`);
    }
}

console.log('Starting Shared Import Fix...');
processDirectory(sharedDataDir);
console.log('Finished.');