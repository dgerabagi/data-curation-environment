import { FileNode } from "@/common/types/file-node";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { SelectionSet } from "@/backend/services/selection.service";

export type ChannelBody<T extends ClientToServerChannel | ServerToClientChannel> =
    T extends ClientToServerChannel.RequestFlattenContext ? { selectedPaths: string[] } :
    T extends ClientToServerChannel.RequestWorkspaceFiles ? {} :
    T extends ClientToServerChannel.OpenFolderDialog ? {} :
    T extends ServerToClientChannel.SendWorkspaceFiles ? { files: FileNode[] } :

    // Selection Sets
    T extends ClientToServerChannel.RequestSelectionSets ? {} :
    T extends ServerToClientChannel.SendSelectionSets ? { sets: SelectionSet } :
    T extends ClientToServerChannel.LoadSelectionSet ? { name: string } :
    T extends ServerToClientChannel.ApplySelectionSet ? { paths: string[] } :
    T extends ClientToServerChannel.RequestSaveSelectionSet ? { selectedPaths: string[] } :
    T extends ClientToServerChannel.RequestDeleteSelectionSet ? {} :

    never;