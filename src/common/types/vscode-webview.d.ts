export interface WebviewApi<StateType> {
    postMessage(message: unknown): void;
    getState(): StateType | undefined;
    setState<T extends StateType | undefined>(newState: T): T;
}

export interface ViewState {
    selectedFiles: string[];
}

declare global {
    function acquireVsCodeApi<StateType = ViewState>(): WebviewApi<StateType>;
}