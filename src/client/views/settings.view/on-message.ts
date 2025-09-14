// src/client/views/settings.view/on-message.ts
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { Services } from "@/backend/services/services";
import { ClientToServerChannel } from "@/common/ipc/channels.enum";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const { loggerService, fileOperationService } = Services;
    loggerService.log("Settings view message handler initialized.");

    serverIpc.onClientMessage(ClientToServerChannel.RequestReadmeContent, () => {
        fileOperationService.handleReadmeContentRequest(serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestChangelogContent, () => {
        fileOperationService.handleChangelogContentRequest(serverIpc);
    });
}