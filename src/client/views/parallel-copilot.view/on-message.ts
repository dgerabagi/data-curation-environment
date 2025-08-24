// Updated on: C125 (Add cycle management handlers)
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { Services } from "@/backend/services/services";
import { ClientToServerChannel, ServerToClientChannel } from "@/common/ipc/channels.enum";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const { loggerService, promptService, fileOperationService, highlightingService, historyService } = Services;
    loggerService.log("Parallel Co-Pilot view message handler initialized.");

    serverIpc.onClientMessage(ClientToServerChannel.RequestCreatePromptFile, (data) => {
        promptService.generatePromptFile(data.cycleTitle, data.currentCycle);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestFileExistence, (data) => {
        fileOperationService.handleFileExistenceRequest(data.paths, serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestSyntaxHighlight, (data) => {
        highlightingService.handleSyntaxHighlightRequest(data.code, data.lang, data.id, serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestLatestCycleData, async () => {
        const cycleData = await historyService.getLatestCycle();
        serverIpc.sendToClient(ServerToClientChannel.SendLatestCycleData, { cycleData });
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestCycleData, async (data) => {
        const cycleData = await historyService.getCycleData(data.cycleId);
        serverIpc.sendToClient(ServerToClientChannel.SendCycleData, { cycleData });
    });

    serverIpc.onClientMessage(ClientToServerChannel.SaveCycleData, (data) => {
        historyService.saveCycleData(data.cycleData);
    });
    
    serverIpc.onClientMessage(ClientToServerChannel.RequestFileContent, (data) => {
        fileOperationService.handleFileContentRequest(data.path, serverIpc);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestDeleteCycle, (data) => {
        historyService.deleteCycle(data.cycleId);
    });

    serverIpc.onClientMessage(ClientToServerChannel.RequestResetHistory, () => {
        historyService.resetHistory();
    });
}