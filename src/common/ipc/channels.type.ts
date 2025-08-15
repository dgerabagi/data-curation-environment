import { FileNode } from "@/common/types/file-node";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";

export type ChannelBody<T extends ClientToServerChannel | ServerToClientChannel> =
    T extends ClientToServerChannel.RequestFlattenContext ? { selectedPaths: string[] } :
    T extends ClientToServerChannel.RequestWorkspaceFiles ? {} :
    T extends ClientToServerChannel.OpenFolderDialog ? {} :
    T extends ServerToClientChannel.SendWorkspaceFiles ? { files: FileNode[] } :
    never;