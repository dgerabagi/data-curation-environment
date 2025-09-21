// src/client/views/settings.view/on-message.ts
// Updated on: C37 (Add settings handlers)
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { Services } from "@/backend/services/services";
import { ClientToServerChannel } from "@/common/ipc/channels.enum";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const { loggerService, fileOperationService, settingsService } = Services;
    loggerService.log("Settings view message handler initialized.");

    serverIpc.onClientMessage(ClientToServerChannel.RequestReadmeContent, () => {
        fileOperationService.handleReadmeContentRequest(serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestChangelogContent, () => {
        fileOperationService.handleChangelogContentRequest(serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestSettings, async () => {
        const settings = await settingsService.getSettings();
        serverIpc.sendToClient(ServerToClientChannel.SendSettings, { settings });
    });
    
    serverIpc.onClientMessage(ClientToServerChannel.SaveSettings, (data) => {
        settingsService.saveSettings(data.settings);
    });
}