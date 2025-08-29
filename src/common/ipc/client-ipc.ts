// Updated on: C1 (Add getVscodeApi method)
import getVscode from "./get-vscode-api";
import { ClientToServerChannel, ServerToClientChannel } from "./channels.enum";
import { ChannelBody } from "./channels.type";
import { WebviewApi, ViewState } from "../types/vscode-webview";

export class ClientPostMessageManager {
    private static _instance?: ClientPostMessageManager;
    private _listeners: {
        channel: ServerToClientChannel,
        callback: (body: ChannelBody<ServerToClientChannel>) => void
    }[];

    private constructor() {
        this._listeners = [];
        window.addEventListener('message', (event: MessageEvent) => {
            const data = event.data;
            this._listeners.forEach((listener) => {
                if (listener.channel === data.channel) {
                    listener.callback(data.body);
                }
            });
        });
    }

    static getInstance(): ClientPostMessageManager {
        if (!ClientPostMessageManager._instance) {
            ClientPostMessageManager._instance = new ClientPostMessageManager();
        }
        return ClientPostMessageManager._instance;
    }

    public getVscodeApi(): WebviewApi<ViewState> {
        return getVscode();
    }

    sendToServer<T extends ClientToServerChannel>(channel: T, body: ChannelBody<T>): void {
        this.getVscodeApi().postMessage({ channel, body });
    }

    onServerMessage<T extends ServerToClientChannel>(channel: T, callback: (body: ChannelBody<T>) => void): void {
        this._listeners.push({ channel, callback: callback as any });
    }
}