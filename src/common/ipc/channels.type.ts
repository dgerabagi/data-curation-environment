import { FileNode } from "@/common/types/file-node";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";

// C18: Added type for saved selection sets
export type SelectionSet = { [name: string]: string[] };

export type ChannelBody<T extends ClientToServerChannel | ServerToClientChannel> =
    T extends ClientToServerChannel.RequestFlattenContext ? { selectedPaths: string[] } :
    T extends ClientToServerChannel.RequestWorkspaceFiles ? {} :
    T extends ClientToServerChannel.RequestRefresh ? {} :
    T extends ServerToClientChannel.SendWorkspaceFiles ? { files: FileNode[] } :
    // C18: Re-added types to fix TS errors
    T extends ServerToClientChannel.ApplySelectionSet ? { paths: string[] } :
    T extends ServerToClientChannel.SendSelectionSets ? { sets: SelectionSet } :
    never;