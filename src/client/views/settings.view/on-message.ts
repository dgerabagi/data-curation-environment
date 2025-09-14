// src/client/views/settings.view/on-message.ts
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { Services } from "@/backend/services/services";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const { loggerService } = Services;
    loggerService.log("Settings view message handler initialized.");

    // Add message handlers for settings view here
}