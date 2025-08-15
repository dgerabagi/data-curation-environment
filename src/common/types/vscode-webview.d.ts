export interface WebviewApi<StateType> {
    postMessage(message: unknown): void;
    getState(): StateType | undefined;
    setState<T extends StateType | undefined>(newState: T): T;
}

declare global {
    function acquireVsCodeApi<StateType = unknown>(): WebviewApi<StateType>;
}