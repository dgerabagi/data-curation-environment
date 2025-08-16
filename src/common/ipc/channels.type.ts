import { FileNode } from "@/common/types/file-node";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";

export type SelectionSet = { [name: string]: string[] };

export type ChannelBody<T extends ClientToServerChannel | ServerToClientChannel> =
    T extends ClientToServerChannel.RequestFlattenContext ? { selectedPaths: string[] } :
    T extends ClientToServerChannel.RequestWorkspaceFiles ? { force?: boolean } :
    T extends ClientToServerChannel.RequestRefresh ? {} :
    T extends ClientToServerChannel.LogMessage ? { level: 'info' | 'warn' | 'error', message: string } :
    T extends ServerToClientChannel.SendWorkspaceFiles ? { files: FileNode[] } :
    T extends ServerToClientChannel.ApplySelectionSet ? { paths: string[] } :
    T extends ServerToClientChannel.SendSelectionSets ? { sets: SelectionSet } :
    T extends ServerToClientChannel.ForceRefresh ? {} :
    never;