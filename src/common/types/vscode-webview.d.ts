// Updated on: C72 (Add pcppActiveView to ViewState)
export interface WebviewApi<StateType> {
    postMessage(message: unknown): void;
    getState(): StateType | undefined;
    setState<T extends StateType | undefined>(newState: T): T;
}

export interface ViewState {
    selectedFiles?: string[];
    pcppLeftPaneWidth?: number;
    pcppActiveView?: 'main' | 'progress';
}

declare global {
    function acquireVsCodeApi<StateType = ViewState>(): WebviewApi<StateType>;
}