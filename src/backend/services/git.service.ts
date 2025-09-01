// src/backend/services/git.service.ts
// Updated on: C182 (Add status check and improve error messages)
import * as vscode from 'vscode';
import { exec } from 'child_process';
import * as path from 'path';
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

    private notifyFrontend(serverIpc: ServerPostMessageManager, success: boolean, message: string) {
        serverIpc.sendToClient(ServerToClientChannel.NotifyGitOperationResult, { success, message });
        if (success) {
            vscode.window.showInformationMessage(message);
        } else {
            vscode.window.showErrorMessage(message, "Open README Guide").then(selection => {
                if (selection === "Open README Guide") {
                    const workspaceRoot = this.getWorkspaceRoot();
                    if (workspaceRoot) {
                        const readmePath = vscode.Uri.file(path.join(workspaceRoot, 'src', 'Artifacts', 'README.md'));
                        vscode.commands.executeCommand('vscode.open', readmePath);
                    }
                }
            });
        }
    }

    public async handleGitStatusRequest(serverIpc: ServerPostMessageManager) {
        Services.loggerService.log("Executing Git Status check.");
        try {
            const { stdout } = await this.execGitCommand('git status --porcelain');
            const isClean = stdout.trim() === '';
            serverIpc.sendToClient(ServerToClientChannel.SendGitStatus, { isClean });
        } catch (error) {
            // Not a git repo, treat as not clean for workflow purposes
            serverIpc.sendToClient(ServerToClientChannel.SendGitStatus, { isClean: false });
        }
    }

    public async handleGitBaselineRequest(commitMessage: string, serverIpc: ServerPostMessageManager) {
        Services.loggerService.log(`Executing Git Baseline with message: "${commitMessage}"`);
        try {
            const { stdout: statusOutput } = await this.execGitCommand('git status --porcelain');
            if (statusOutput.trim() === '') {
                this.notifyFrontend(serverIpc, true, 'Workspace is already clean. No baseline needed.');
                return;
            }

            await this.execGitCommand('git add .');
            const { stderr } = await this.execGitCommand(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`);

            if (stderr && stderr.includes('nothing to commit')) {
                 this.notifyFrontend(serverIpc, true, 'You are already baselined.');
            } else {
                this.notifyFrontend(serverIpc, true, 'Successfully created baseline commit.');
            }
        } catch (error: any) {
            let errorMessage = `Git Baseline failed: ${error.message}`;
            if (error.message.includes('fatal: not a git repository')) {
                errorMessage = 'This is not a Git repository. Please initialize it first. Refer to the README for guidance.';
            }
            this.notifyFrontend(serverIpc, false, errorMessage);
        }
    }

    public async handleGitRestoreRequest(serverIpc: ServerPostMessageManager) {
        Services.loggerService.log("Executing Git Restore.");
        try {
            const command = `git restore -- . ":(exclude).vscode/dce_history.json"`;
            await this.execGitCommand(command);
            this.notifyFrontend(serverIpc, true, 'Successfully restored workspace to baseline.');
        } catch (error: any) {
            this.notifyFrontend(serverIpc, false, `Git Restore failed: ${error.message}`);
        }
    }
}