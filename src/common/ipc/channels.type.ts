import { FileNode } from "@/common/types/file-node";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";

export type SelectionSet = { [name: string]: string[] };
export type ProblemCountsMap = { [path: string]: { error: number; warning: number; } };

export type ChannelBody<T extends ClientToServerChannel | ServerToClientChannel> =
    T extends ClientToServerChannel.RequestInitialData ? {} :
    T extends ClientToServerChannel.RequestFlattenContext ? { selectedPaths: string[] } :
    T extends ClientToServerChannel.RequestWorkspaceFiles ? { force?: boolean } :
    T extends ClientToServerChannel.LogMessage ? { level: 'info' | 'warn' | 'error', message: string } :
    T extends ClientToServerChannel.RequestNewFile ? { parentDirectory: string } :
    T extends ClientToServerChannel.RequestNewFolder ? { parentDirectory: string } :
    T extends ClientToServerChannel.RequestFileRename ? { oldPath: string, newName: string } :
    T extends ClientToServerChannel.RequestFileDelete ? { path: string } :
    T extends ClientToServerChannel.RequestRevealInExplorer ? { path: string } :
    T extends ClientToServerChannel.RequestCopyPath ? { path: string, relative: boolean } :
    T extends ClientToServerChannel.RequestOpenFile ? { path: string } :
    T extends ClientToServerChannel.RequestMoveFile ? { oldPath: string, newPath: string } :
    T extends ClientToServerChannel.RequestUndo ? {} :
    T extends ClientToServerChannel.RequestRedo ? {} :
    T extends ClientToServerChannel.RequestAddFileFromBuffer ? { targetPath: string, data: Uint8Array } :
    T extends ClientToServerChannel.RequestCopyFileFromUri ? { sourceUri: string, targetDir: string } :
    T extends ClientToServerChannel.RequestPdfToText ? { path: string } :
    T extends ClientToServerChannel.RequestExcelToText ? { path: string } :
    T extends ClientToServerChannel.SaveCurrentSelection ? { paths: string[] } :
    T extends ClientToServerChannel.RequestLastSelection ? {} :
    T extends ClientToServerChannel.SaveAutoAddState ? { enabled: boolean } :
    T extends ClientToServerChannel.VSCodeCommand ? { command: string, args?: any[] } :
    
    T extends ServerToClientChannel.SendWorkspaceFiles ? { files: FileNode[] } :
    T extends ServerToClientChannel.SendWorkspaceTrustState ? { isTrusted: boolean } :
    T extends ServerToClientChannel.ApplySelectionSet ? { paths: string[] } :
    T extends ServerToClientChannel.SendSelectionSets ? { sets: SelectionSet } :
    T extends ServerToClientChannel.ForceRefresh ? { reason?: 'fileOp' | 'manual' } :
    T extends ServerToClientChannel.SetActiveFile ? { path: string } :
    T extends ServerToClientChannel.FocusFile ? { path: string } :
    T extends ServerToClientChannel.SendAutoAddState ? { enabled: boolean } :
    T extends ServerToClientChannel.UpdateProblemCounts ? { problemMap: ProblemCountsMap } :
    T extends ServerToClientChannel.UpdateNodeStats ? { path: string, tokenCount: number, error?: string } :
    never;