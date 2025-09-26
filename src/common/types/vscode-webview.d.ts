// Updated on: C73 (Remove pcppActiveView)
export interface WebviewApi<StateType> {
    postMessage(message: unknown): void;
    getState(): StateType | undefined;
    setState<T extends StateType | undefined>(newState: T): T;
}

export interface ViewState {
    selectedFiles?: string[];
    pcppLeftPaneWidth?: number;
}

declare global {
    function acquireVsCodeApi<StateType = ViewState>(): WebviewApi<StateType>;
}