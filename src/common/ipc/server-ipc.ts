import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { ChannelBody } from "./channels.type";

export class ServerPostMessageManager {
    private static _instance?: ServerPostMessageManager;
    private _listeners: {
        channel: ClientToServerChannel,
        callback: (body: ChannelBody<ClientToServerChannel>) => void
    }[];

    private constructor(
        private onMessage: (data: any) => void,
        private sendMessage: (message: any) => void
    ) {
        this._listeners = [];
        this.onMessage((data: any) => {
            this._listeners.forEach((listener) => {
                if (listener.channel === data.channel) {
                    listener.callback(data.body);
                }
            });
        });
    }

    static getInstance(onMessage?: (data: any) => void, sendMessage?: (message: any) => void) {
        if (onMessage && sendMessage) {
            ServerPostMessageManager._instance = new ServerPostMessageManager(onMessage, sendMessage);
        }
        if (!ServerPostMessageManager._instance) {
            throw new Error("ServerPostMessageManager not initialized");
        }
        return ServerPostMessageManager._instance;
    }

    sendToClient<T extends ServerToClientChannel>(channel: T, body: ChannelBody<T>): void {
        this.sendMessage({ channel, body });
    }

    onClientMessage<T extends ClientToServerChannel>(channel: T, callback: (body: ChannelBody<T>) => void): void {
        this._listeners.push({ channel, callback: callback as any });
    }
}