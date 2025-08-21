// src/client/views/parallel-copilot.view/on-message.ts
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { Services } from "@/backend/services/services";
import { ClientToServerChannel, ServerToClientChannel } from "@/common/ipc/channels.enum";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const { loggerService, promptService, fsService, historyService } = Services;
    loggerService.log("Parallel Co-Pilot view message handler initialized.");

    serverIpc.onClientMessage(ClientToServerChannel.RequestCreatePromptFile, (data) => {
        promptService.generatePromptFile(data.cycleTitle, data.currentCycle);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestFileExistence, (data) => {
        fsService.handleFileExistenceRequest(data.paths, serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestSyntaxHighlight, (data) => {
        fsService.handleSyntaxHighlightRequest(data.code, data.lang, data.id, serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestCycleHistoryList, async () => {
        const cycleIds = await historyService.getCycleHistoryList();
        serverIpc.sendToClient(ServerToClientChannel.SendCycleHistoryList, { cycleIds });
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestCycleData, async (data) => {
        const cycleData = await historyService.getCycleData(data.cycleId);
        serverIpc.sendToClient(ServerToClientChannel.SendCycleData, { cycleData });
    });

    serverIpc.onClientMessage(ClientToServerChannel.SaveCycleData, (data) => {
        historyService.saveCycleData(data.cycleData);
    });
    
    serverIpc.onClientMessage(ClientToServerChannel.RequestFileContent, (data) => {
        fsService.handleFileContentRequest(data.path, serverIpc);
    });
}