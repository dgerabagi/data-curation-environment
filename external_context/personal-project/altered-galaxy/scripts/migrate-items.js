const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const clientItemsDir = path.join(projectRoot, 'packages', 'ag-client', 'src', 'data', 'items');
const serverItemsDir = path.join(projectRoot, 'packages', 'ag-server', 'src', 'data', 'items');
const sharedDataDir = path.join(projectRoot, 'packages', 'ag-shared', 'src', 'data');
const sharedItemsDir = path.join(sharedDataDir, 'items');

function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();

    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        if (!fs.existsSync(path.dirname(dest))) {
            fs.mkdirSync(path.dirname(dest), { recursive: true });
        }
        fs.copyFileSync(src, dest);
    }
}

console.log('Starting Item Data Migration...');

// 1. Create Shared Directory
if (!fs.existsSync(sharedItemsDir)) {
    console.log(`Creating ${sharedItemsDir}...`);
    fs.mkdirSync(sharedItemsDir, { recursive: true });
}

// 2. Copy from Client (Source of Truth for most files)
if (fs.existsSync(clientItemsDir)) {
    console.log(`Copying items from Client to Shared...`);
    copyRecursiveSync(clientItemsDir, sharedItemsDir);
} else {
    console.warn(`Client items directory not found: ${clientItemsDir}`);
}

// 3. Update Shared index.ts to export data
const sharedIndex = path.join(projectRoot, 'packages', 'ag-shared', 'src', 'index.ts');
let indexContent = fs.readFileSync(sharedIndex, 'utf-8');
if (!indexContent.includes("export * from './data/items'")) {
    console.log(`Updating Shared index.ts...`);
    indexContent += "\nexport * from './data/items';\n";
    fs.writeFileSync(sharedIndex, indexContent);
}

console.log('Migration of files complete.');
console.log('ACTION REQUIRED: Please update client and server imports to use @ag/shared and delete old data directories manually to ensure safety.');