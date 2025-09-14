// src/backend/services/git.service.ts
// Updated on: C11 (Add git clean to restore)
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

    public async handleGitInitRequest() {
        Services.loggerService.log("Executing Git Init.");
        try {
            await this.execGitCommand('git init');
            vscode.window.showInformationMessage("Successfully initialized Git repository. You can now create a baseline.");
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
                            const readmePath = path.join(workspaceRoot, 'src', 'Artifacts', 'README.md');
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

    public async handleGitRestoreRequest(serverIpc: ServerPostMessageManager) {
        Services.loggerService.log("Executing Git Restore.");
        let result = { success: false, message: 'An unknown error occurred.' };
        try {
            const restoreCommand = `git restore -- . ":(exclude).vscode/dce_history.json"`;
            await this.execGitCommand(restoreCommand);

            const cleanCommand = `git clean -fdx --exclude=.vscode/dce_history.json`;
            await this.execGitCommand(cleanCommand);

            result = { success: true, message: 'Successfully restored workspace to baseline. Modified and new files have been reverted.' };
        } catch (error: any) {
            result = { success: false, message: `Git Restore failed: ${error.message}` };
        }
        serverIpc.sendToClient(ServerToClientChannel.NotifyGitOperationResult, result);
    }
}