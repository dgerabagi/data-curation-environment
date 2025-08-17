import * as vscode from 'vscode';
import { Services } from '../services/services';
import { serverIPCs } from '@/client/views';
import { ServerToClientChannel } from '@/common/ipc/channels.enum';
import { VIEW_TYPES } from '@/common/view-types';

export const commands = [
    {
        commandId: 'dce.saveCurrentSelection',
        callback: async (selectedPaths: string[]) => {
            if (!selectedPaths || selectedPaths.length === 0) {
                vscode.window.showWarningMessage("No files are selected to save.");
                return;
            }
            const name = await vscode.window.showInputBox({
                prompt: 'Enter a name for the selection set',
                placeHolder: 'e.g., "API Feature" or "Frontend Refactor"'
            });
            if (name) {
                await Services.selectionService.saveSelectionSet(name, selectedPaths);
                const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
                if(serverIpc) {
                    serverIpc.sendToClient(ServerToClientChannel.SendSelectionSets, { sets: Services.selectionService.getSelectionSets() });
                }
            }
        }
    },
    {
        commandId: 'dce.loadSelectionSet',
        callback: async () => {
            const sets = Services.selectionService.getSelectionSets();
            const setNames = Object.keys(sets);
             if (setNames.length === 0) {
                vscode.window.showInformationMessage("No saved selection sets.");
                return;
            }
            const name = await vscode.window.showQuickPick(setNames, {
                placeHolder: 'Select a selection set to load'
            });

            if (name) {
                const paths = sets[name];
                if (paths) {
                    const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
                    if(serverIpc) {
                        serverIpc.sendToClient(ServerToClientChannel.ApplySelectionSet, { paths });
                        Services.loggerService.log(`Command: Loaded selection set '${name}'.`);
                        vscode.window.showInformationMessage(`Loaded selection set '${name}'.`);
                    }
                }
            }
        }
    },
    {
        commandId: 'dce.manageSelectionSets',
        callback: async () => {
            const sets = Services.selectionService.getSelectionSets();
            const setNames = Object.keys(sets);
            if (setNames.length === 0) {
                vscode.window.showInformationMessage("No selection sets to manage.");
                return;
            }
            const setToDelete = await vscode.window.showQuickPick(setNames, {
                placeHolder: 'Select a selection set to delete'
            });

            if (setToDelete) {
                await Services.selectionService.deleteSelectionSet(setToDelete);
                 const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
                 if(serverIpc) {
                     serverIpc.sendToClient(ServerToClientChannel.SendSelectionSets, { sets: Services.selectionService.getSelectionSets() });
                 }
            }
        }
    },
    {
        commandId: 'dce.refreshTree',
        callback: () => {
            const serverIpc = serverIPCs[VIEW_TYPES.SIDEBAR.CONTEXT_CHOOSER];
            if (serverIpc) {
                Services.loggerService.log("Executing dce.refreshTree command.");
                Services.fsService.handleWorkspaceFilesRequest(serverIpc, true);
            } else {
                Services.loggerService.warn("Could not refresh tree: serverIpc not found.");
            }
        }
    }
];