// src/backend/services/git.service.ts
// Updated on: C135 (Remove DCE-specific dev folders from default gitignore)
import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';
import * as fs from 'fs/promises';
import { Services } from './services';
import { ServerPostMessageManager } from '@/common/ipc/server-ipc';
import { ServerToClientChannel } from '@/common/ipc/channels.enum';

export class GitService {
    private getWorkspaceRoot(): string | undefined {
        return vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    }

    private async execGitCommand(command: string): Promise<{ stdout: string; stderr: string }> {
        const workspaceRoot = this.getWorkspaceRoot();
        if (!workspaceRoot) {
            throw new Error("No workspace folder open.");
        }

        return new Promise((resolve, reject) => {
            exec(command, { cwd: workspaceRoot }, (error, stdout, stderr) => {
                if (error) {
                    Services.loggerService.error(`Git command error: ${error.message}`);
                    reject(error);
                    return;
                }
                if (stderr) {
                    Services.loggerService.warn(`Git command stderr: ${stderr}`);
                }
                resolve({ stdout, stderr });
            });
        });
    }

    public async handleGitInitRequest() {
        Services.loggerService.log("Executing Git Init.");
        const workspaceRoot = this.getWorkspaceRoot();
        if (!workspaceRoot) {
             vscode.window.showErrorMessage("No workspace open.");
             return;
        }

        try {
            await this.execGitCommand('git init');
            
            // C134: Enhanced .gitignore creation
            const gitignorePath = path.join(workspaceRoot, '.gitignore');
            let gitignoreContent = '';
            try {
                gitignoreContent = await fs.readFile(gitignorePath, 'utf-8');
            } catch (e) {
                // File doesn't exist, start fresh
            }

            const entriesToAdd = [
                'node_modules',
                'package-lock.json',
                'dist',
                'out',
                '*.vsix',
                '.vscode-test/',
                '.vscode/',
                // 'The-Creator-AI-main/', // C135: Removed project-specific exclusion
                'prompt.md',
                '.vscode/dce_cache/'
            ];

            let updated = false;
            for (const entry of entriesToAdd) {
                if (!gitignoreContent.includes(entry)) {
                    gitignoreContent += `\n${entry}\n`;
                    updated = true;
                }
            }

            if (updated) {
                await fs.writeFile(gitignorePath, gitignoreContent.trim() + '\n', 'utf-8');
                Services.loggerService.log(".gitignore created/updated with comprehensive exclusions.");
            }

            vscode.window.showInformationMessage("Successfully initialized Git repository and configured .gitignore.");
        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to initialize Git repository: ${error.message}`);
        }
    }

    public async handleGitStatusRequest(serverIpc: ServerPostMessageManager) {
        Services.loggerService.log("Executing Git Status check.");
        try {
            const { stdout } = await this.execGitCommand('git status --porcelain');
            const isClean = stdout.trim() === '';
            serverIpc.sendToClient(ServerToClientChannel.SendGitStatus, { isClean });
        } catch (error) {
            serverIpc.sendToClient(ServerToClientChannel.SendGitStatus, { isClean: false });
        }
    }

    public async handleGitBaselineRequest(commitMessage: string, serverIpc: ServerPostMessageManager) {
        Services.loggerService.log(`Executing Git Baseline with message: "${commitMessage}"`);
        let result = { success: false, message: 'An unknown error occurred.' };
        try {
            const { stdout: statusOutput } = await this.execGitCommand('git status --porcelain');
            if (statusOutput.trim() === '') {
                result = { success: true, message: 'Workspace is already clean. No baseline needed.' };
            } else {
                await this.execGitCommand('git add .');
                const { stderr } = await this.execGitCommand(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`);
                if (stderr && stderr.includes('nothing to commit')) {
                    result = { success: true, message: 'You are already baselined.' };
                } else {
                    result = { success: true, message: 'Successfully created baseline commit.' };
                }
            }
        } catch (error: any) {
            if (error.message.includes('fatal: not a git repository')) {
                const openReadme = 'Open README Guide';
                const initRepo = 'Initialize Repository';
                vscode.window.showErrorMessage(
                    'This is not a Git repository. Please initialize it first to use the baseline feature.',
                    openReadme,
                    initRepo
                ).then(selection => {
                    if (selection === openReadme) {
                        const workspaceRoot = this.getWorkspaceRoot();
                        if (workspaceRoot) {
                            const readmePath = path.join(workspaceRoot, 'src', 'Artifacts', 'DCE_README.md');
                            vscode.workspace.openTextDocument(vscode.Uri.file(readmePath)).then(doc => {
                                vscode.window.showTextDocument(doc);
                            });
                        }
                    } else if (selection === initRepo) {
                        vscode.commands.executeCommand('dce.gitInit');
                    }
                });
                return; 
            }
            result = { success: false, message: `Git Baseline failed: ${error.message}` };
        }
        Services.loggerService.log(`[GIT_SERVICE] Sending NotifyGitOperationResult: ${JSON.stringify(result)}`);
        serverIpc.sendToClient(ServerToClientChannel.NotifyGitOperationResult, result);
    }

    public async handleGitRestoreRequest(filesToDelete: string[], serverIpc: ServerPostMessageManager) {
        Services.loggerService.log("Executing Git Restore.");
        let result = { success: false, message: 'An unknown error occurred.' };
        const workspaceRoot = this.getWorkspaceRoot();
        if (!workspaceRoot) {
            result = { success: false, message: 'No workspace open.'};
            serverIpc.sendToClient(ServerToClientChannel.NotifyGitOperationResult, result);
            return;
        }

        try {
            // 1. Revert changes to all tracked files, excluding the history file
            const restoreCommand = `git restore -- . ":(exclude).vscode/dce_history.json"`;
            await this.execGitCommand(restoreCommand);

            // 2. Surgically delete only the newly created files from the accepted response
            for (const file of filesToDelete) {
                const absolutePath = path.resolve(workspaceRoot, file);
                Services.loggerService.log(`[Restore] Deleting newly created file: ${absolutePath}`);
                await vscode.workspace.fs.delete(vscode.Uri.file(absolutePath), { recursive: true });
            }

            result = { success: true, message: 'Successfully restored workspace to baseline.' };
        } catch (error: any) {
            result = { success: false, message: `Git Restore failed: ${error.message}` };
        }
        serverIpc.sendToClient(ServerToClientChannel.NotifyGitOperationResult, result);
    }
}