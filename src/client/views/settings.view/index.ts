// src/client/views/settings.view/index.ts
import { onMessage } from "./on-message";

export const viewConfig = {
    entry: "settingsView.js",
    type: "viewType.panel.settings", // Note: This type is for internal reference, not a registered view
    handleMessage: onMessage,
};