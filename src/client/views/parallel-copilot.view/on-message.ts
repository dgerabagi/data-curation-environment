// src/client/views/parallel-copilot.view/on-message.ts
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { Services } from "@/backend/services/services";
import { ClientToServerChannel } from "@/common/ipc/channels.enum";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const loggerService = Services.loggerService;
    loggerService.log("Parallel Co-Pilot view message handler initialized.");

    serverIpc.onClientMessage(ClientToServerChannel.RequestCreatePromptFile, (data) => {
        Services.promptService.generatePromptFile(data.cycleTitle, data.currentCycle);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestFileExistence, (data) => {
        Services.fsService.handleFileExistenceRequest(data.paths, serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestSyntaxHighlight, (data) => {
        Services.fsService.handleSyntaxHighlightRequest(data.code, data.lang, data.id, serverIpc);
    });
}