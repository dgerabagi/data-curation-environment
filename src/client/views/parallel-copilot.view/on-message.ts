// src/client/views/parallel-copilot.view/on-message.ts
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { Services } from "@/backend/services/services";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const loggerService = Services.loggerService;
    loggerService.log("Parallel Co-Pilot view message handler initialized.");

    // TODO: Add message handlers for Phase 2 features
    // e.g., serverIpc.onClientMessage(ClientToServerChannel.RequestSwapFileContent, ...)
}
