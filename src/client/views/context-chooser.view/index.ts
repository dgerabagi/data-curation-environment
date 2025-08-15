import { onMessage } from "./on-message";

export const viewConfig = {
    entry: "contextChooserView.js",
    type: "viewType.sidebar.contextChooser",
    handleMessage: onMessage,
};