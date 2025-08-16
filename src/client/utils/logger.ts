import { ClientPostMessageManager } from "@/common/ipc/client-ipc";
import { ClientToServerChannel } from "@/common/ipc/channels.enum";

const clientIpc = ClientPostMessageManager.getInstance();

export const logger = {
    log: (message: string) => {
        console.log(message); // Also log to dev console
        clientIpc.sendToServer(ClientToServerChannel.LogMessage, { level: 'info', message });
    },
    warn: (message: string) => {
        console.warn(message);
        clientIpc.sendToServer(ClientToServerChannel.LogMessage, { level: 'warn', message });
    },
    error: (message: string) => {
        console.error(message);
        clientIpc.sendToServer(ClientToServerChannel.LogMessage, { level: 'error', message });
    }
};