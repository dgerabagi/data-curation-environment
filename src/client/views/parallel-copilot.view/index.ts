// src/client/views/parallel-copilot.view/index.ts
import { onMessage } from "./on-message";

export const viewConfig = {
    entry: "parallelCopilotView.js",
    type: "viewType.sidebar.parallelCopilot",
    handleMessage: onMessage,
};
