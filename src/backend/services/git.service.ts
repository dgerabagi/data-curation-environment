// src/backend/services/git.service.ts
// Updated on: C179 (Add check for 'not a git repository' error)
import * as vscode from 'vscode';
import { exec } from 'child_process';
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
                if (stderr && !stderr.includes('nothing to commit, working tree clean')) {
                    Services.loggerService.warn(`Git command stderr: ${stderr}`);
                }
                resolve({ stdout, stderr });
            });
        });
    }

    private notifyFrontend(serverIpc: ServerPostMessageManager, success: boolean, message: string) {
        serverIpc.sendToClient(ServerToClientChannel.NotifyGitOperationResult, { success, message });
        if (success) {
            vscode.window.showInformationMessage(message);
        } else {
            vscode.window.showErrorMessage(message, "Open Git Setup Guide").then(selection => {
                if (selection === "Open Git Setup Guide") {
                    // This is a placeholder for opening the artifact. A more robust solution
                    // would involve a command to open a specific file.
                    vscode.window.showInformationMessage("Please refer to the 'A9. DCE - GitHub Repository Setup Guide.md' artifact in your project.");
                }
            });
        }
    }

    public async handleGitBaselineRequest(commitMessage: string, serverIpc: ServerPostMessageManager) {
        Services.loggerService.log(`Executing Git Baseline with message: "${commitMessage}"`);
        try {
            await this.execGitCommand('git add .');
            await this.execGitCommand(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`);
            this.notifyFrontend(serverIpc, true, 'Successfully created baseline commit.');
        } catch (error: any) {
            let errorMessage = `Git Baseline failed: ${error.message}`;
            if (error.message.includes('fatal: not a git repository')) {
                errorMessage = 'Git Baseline failed: This is not a Git repository. Please run `git init` in your terminal. See A9 for guidance.';
            }
            this.notifyFrontend(serverIpc, false, errorMessage);
        }
    }

    public async handleGitRestoreRequest(serverIpc: ServerPostMessageManager) {
        Services.loggerService.log("Executing Git Restore.");
        try {
            // C178 Fix: Use double quotes around the pathspec to avoid shell parsing issues.
            const command = `git restore -- . ":(exclude).vscode/dce_history.json"`;
            await this.execGitCommand(command);
            this.notifyFrontend(serverIpc, true, 'Successfully restored workspace to baseline.');
        } catch (error: any) {
            this.notifyFrontend(serverIpc, false, `Git Restore failed: ${error.message}`);
        }
    }
}