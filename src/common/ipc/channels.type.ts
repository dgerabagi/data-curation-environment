import { FileNode } from "@/common/types/file-node";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";

export type SelectionSet = { [name: string]: string[] };

export type ChannelBody<T extends ClientToServerChannel | ServerToClientChannel> =
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
    T extends ClientToServerChannel.SaveCurrentSelection ? { paths: string[] } :
    T extends ClientToServerChannel.RequestLastSelection ? {} :
    T extends ClientToServerChannel.VSCodeCommand ? { command: string, args?: any[] } :
    
    T extends ServerToClientChannel.SendWorkspaceFiles ? { files: FileNode[] } :
    T extends ServerToClientChannel.ApplySelectionSet ? { paths: string[] } :
    T extends ServerToClientChannel.SendSelectionSets ? { sets: SelectionSet } :
    T extends ServerToClientChannel.ForceRefresh ? {} :
    T extends ServerToClientChannel.SetActiveFile ? { path: string } :
    never;