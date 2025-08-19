import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs/promises';
import { ServerPostMessageManager } from '@/common/ipc/server-ipc';
import { Services } from './services';
import { VIEW_TYPES } from '@/common/view-types';
import { serverIPCs } from '@/client/views';
import { ServerToClientChannel } from '@/common/ipc/channels.enum';

interface FileStats {
    filePath: string;
    lines: number;
    characters: number;
    tokens: number;
    content: string;
    error: string | null;
}

const BINARY_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.svg', '.webp', '.ico', '.exe', '.dll', '.bin', '.pdf', '.zip', '.gz', '.7z', '.mp3', '.wav', '.mov', '.mp4']);

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

            const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
            if (serverIpc) {
                Services.loggerService.log("Triggering file focus after flattening.");
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
                    if (entry.name.toLowerCase() === 'node_modules') continue;
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
        const extension = path.extname(filePath).toLowerCase();
        if (BINARY_EXTENSIONS.has(extension)) {
            try {
                const stats = await fs.stat(filePath);
                const metadataContent = `<metadata format="${extension.substring(1).toUpperCase()}" sizeInBytes="${stats.size}" />`;
                return { filePath, lines: 0, characters: 0, tokens: 0, content: metadataContent, error: null };
            } catch (error: any) {
                 return { filePath, lines: 0, characters: 0, tokens: 0, content: '', error: `Could not get stats for binary file: ${error.message}` };
            }
        }

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

        const top10 = [...validResults].filter(r => r.tokens > 0).sort((a, b) => b.tokens - a.tokens).slice(0, 10);

        output += `<!-- Top 10 Text Files by Token Count -->\n`;
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