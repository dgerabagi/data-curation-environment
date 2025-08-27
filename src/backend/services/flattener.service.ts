// Updated on: C162 (Exclude non-selectable files from flattening)
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs/promises';
import { Services } from './services';
import { VIEW_TYPES } from '@/common/view-types';
import { serverIPCs } from '@/client/views';
import { ServerToClientChannel } from '@/common/ipc/channels.enum';
import { formatBytes } from '@/common/utils/formatting';

interface FileStats {
    filePath: string;
    lines: number;
    characters: number;
    tokens: number;
    content: string;
    error: string | null;
    isBinary: boolean;
    sizeInBytes: number;
}

const BINARY_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp', '.ico', '.exe', '.dll', '.bin', '.zip', '.gz', '.7z', '.mp3', '.wav', '.mov', '.mp4']);
const EXCEL_EXTENSIONS = new Set(['.xlsx', '.xls', '.csv']);
const WORD_EXTENSIONS = new Set(['.docx', '.doc']);
const NON_SELECTABLE_PATTERNS = ['/node_modules', '/.vscode', 'flattened_repo.md', 'prompt.md'];

const normalizePath = (p: string) => p.replace(/\\/g, '/');

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
            const validResults = results.filter(r => !r.error);


            const outputContent = this.generateOutputContent(results, rootPath, outputFilePath);

            await fs.writeFile(outputFilePath, outputContent, 'utf-8');
            vscode.window.showInformationMessage(`Successfully flattened ${validResults.length} files to flattened_repo.md.`);

            Services.loggerService.log(`Opening flattened file: ${outputFilePath}`);
            
            const isFileOpen = vscode.window.visibleTextEditors.some(editor => editor.document.uri.fsPath === outputFilePath);
            if (!isFileOpen) {
                await Services.fileOperationService.handleOpenFileRequest(outputFilePath);
            }

            const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
            if (serverIpc) {
                setTimeout(() => {
                    serverIpc.sendToClient(ServerToClientChannel.FocusFile, { path: outputFilePath });
                }, 500);
            }

        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to flatten context: ${error.message}`);
            console.error(error);
        }
    }

    private async expandDirectories(paths: string[]): Promise<string[]> {
        const uniquePaths = [...new Set(paths)]; 
        const allFiles: string[] = [];
        for (const p of uniquePaths) {
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
                const normalizedFullPath = normalizePath(fullPath);

                // C162 Fix: Exclude non-selectable files/folders from the flattened output.
                if (NON_SELECTABLE_PATTERNS.some(p => normalizedFullPath.includes(p))) {
                    continue;
                }

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

    private async _parseImageMetadata(filePath: string): Promise<any> {
        try {
            const buffer = await fs.readFile(filePath);
            const sizeInBytes = buffer.length;
            const metadata: any = { sizeInBytes };

            if (buffer.length > 24 && buffer.toString('hex', 0, 8) === '89504e470d0a1a0a') { // PNG
                const ihdrIndex = buffer.indexOf('IHDR');
                if (ihdrIndex !== -1) metadata.dimensions = { width: buffer.readUInt32BE(ihdrIndex + 4), height: buffer.readUInt32BE(ihdrIndex + 8) };
            } else if (buffer.length > 10 && buffer.toString('utf8', 0, 3) === 'GIF') { // GIF
                 metadata.dimensions = { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
            } else if (buffer.length > 11 && buffer[0] === 0xff && buffer[1] === 0xd8) { // JPEG
                let pos = 2;
                while (pos < buffer.length - 9) {
                    if (buffer[pos] === 0xff && (buffer[pos + 1] & 0xf0) === 0xc0) {
                        metadata.dimensions = { width: buffer.readUInt16BE(pos + 7), height: buffer.readUInt16BE(pos + 5) };
                        break;
                    }
                    pos += buffer[pos + 2] ? buffer.readUInt16BE(pos + 2) + 2 : 1;
                }
            }
            return metadata;
        } catch (err: any) {
            try { return { sizeInBytes: (await fs.stat(filePath)).size }; } catch { return { sizeInBytes: -1 }; }
        }
    }

    private async getFileStatsAndContent(filePath: string): Promise<FileStats> {
        const extension = path.extname(filePath).toLowerCase();
        
        if (extension === '.pdf') {
            const virtualContent = Services.contentExtractionService.getVirtualPdfContent(filePath);
            if (virtualContent) return { filePath, content: virtualContent.text, lines: virtualContent.text.split('\n').length, characters: virtualContent.text.length, tokens: virtualContent.tokenCount, error: null, isBinary: false, sizeInBytes: 0 };
            return { filePath, lines: 0, characters: 0, tokens: 0, content: '<!-- PDF content not processed or cached -->', error: null, isBinary: false, sizeInBytes: 0 };
        }

        if (EXCEL_EXTENSIONS.has(extension)) {
            const virtualContent = Services.contentExtractionService.getVirtualExcelContent(filePath);
            if (virtualContent) return { filePath, content: virtualContent.markdown, lines: virtualContent.markdown.split('\n').length, characters: virtualContent.markdown.length, tokens: virtualContent.tokenCount, error: null, isBinary: false, sizeInBytes: 0 };
            return { filePath, lines: 0, characters: 0, tokens: 0, content: '<!-- Excel/CSV content not processed or cached -->', error: null, isBinary: false, sizeInBytes: 0 };
        }

        if (WORD_EXTENSIONS.has(extension)) {
            const virtualContent = Services.contentExtractionService.getVirtualWordContent(filePath);
            if (virtualContent) {
                const content = virtualContent.text === "UNSUPPORTED_FORMAT" ? `<!-- Content of .doc file '${path.basename(filePath)}' could not be extracted. Legacy .doc format is not supported. Please convert to .docx. -->` : virtualContent.text;
                return { filePath, content: content, lines: content.split('\n').length, characters: content.length, tokens: virtualContent.tokenCount, error: null, isBinary: false, sizeInBytes: 0 };
            }
            return { filePath, lines: 0, characters: 0, tokens: 0, content: '<!-- Word content not processed or cached -->', error: null, isBinary: false, sizeInBytes: 0 };
        }

        if (BINARY_EXTENSIONS.has(extension)) {
            try {
                const imageMetadata = await this._parseImageMetadata(filePath);
                const metadata = { name: path.basename(filePath), directory: path.dirname(filePath), fileType: extension.substring(1).toUpperCase(), sizeInBytes: imageMetadata.sizeInBytes, ...(imageMetadata.dimensions && { dimensions: imageMetadata.dimensions }) };
                const metadataContent = `<metadata>\n${JSON.stringify(metadata, null, 2)}\n</metadata>`;
                return { filePath, lines: 0, characters: 0, tokens: 0, content: metadataContent, error: null, isBinary: true, sizeInBytes: imageMetadata.sizeInBytes };
            } catch (error: any) {
                 return { filePath, lines: 0, characters: 0, tokens: 0, content: '', error: `Could not get stats for binary file: ${error.message}`, isBinary: true, sizeInBytes: -1 };
            }
        }

        try {
            const content = await fs.readFile(filePath, 'utf-8');
            const stats = await fs.stat(filePath);
            return { filePath, lines: content.split('\n').length, characters: content.length, tokens: Math.ceil(content.length / 4), content, error: null, isBinary: false, sizeInBytes: stats.size };
        } catch (error: any) {
            return { filePath, lines: 0, characters: 0, tokens: 0, content: '', error: error.message, isBinary: false, sizeInBytes: -1 };
        }
    }

    private generateOutputContent(results: FileStats[], rootDir: string, outputFilename: string): string {
        const validResults = results.filter(r => !r.error);
        const totalTokens = validResults.reduce((sum, r) => sum + r.tokens, 0);
        
        let output = `<!--\n  File: ${path.basename(outputFilename)}\n  Source Directory: ${rootDir}\n  Date Generated: ${new Date().toISOString()}\n  ---\n`;
        output += `  Total Files: ${validResults.length}\n  Approx. Tokens: ${totalTokens}\n-->\n\n`;
        
        output += `<!-- Top 10 Text Files by Token Count -->\n`;
        [...validResults].filter(r => r.tokens > 0).sort((a, b) => b.tokens - a.tokens).slice(0, 10)
            .forEach((r, i) => output += `${i + 1}. ${path.relative(rootDir, r.filePath)} (${r.tokens} tokens)\n`);
        output += `\n`;

        output += `<!-- Full File List -->\n`;
        results.forEach((r, i) => {
            const relPath = path.relative(rootDir, r.filePath);
            if (r.error) output += `${i + 1}. ${relPath} - ERROR: ${r.error}\n`;
            else if (r.isBinary) output += `${i + 1}. ${relPath} - [Binary] Size: ${formatBytes(r.sizeInBytes)}\n`;
            else output += `${i + 1}. ${relPath} - Lines: ${r.lines} - Chars: ${r.characters} - Tokens: ${r.tokens}\n`;
        });
        output += `\n`;

        for (const { filePath, content, error } of results) {
            const relativePath = path.relative(rootDir, filePath).replace(/\\/g, '/');
            output += `<file path="${relativePath}">\n`;
            output += error ? `Error reading file: ${error}\n` : content;
            if (content && !content.endsWith('\n')) output += '\n';
            output += `</file>\n\n`;
        }
        return output;
    }
}