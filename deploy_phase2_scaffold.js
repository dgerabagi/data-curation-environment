const fs = require('fs').promises;
const path = require('path');

// --- File Content Definitions ---

const filesToCreate = [
    {
        path: 'src/backend/services/history.service.ts',
        content: `// src/backend/services/history.service.ts
import * as vscode from 'vscode';
import { Services } from './services';

// Basic structure for history data
interface CycleResponse {
    responseId: string;
    model: string;
    content: string;
}

interface Cycle {
    cycleId: string;
    timestamp: string;
    prompt: string;
    responses: CycleResponse[];
}

interface HistoryFile {
    version: number;
    cycles: Cycle[];
}

export class HistoryService {
    private historyFilePath: string | undefined;

    constructor() {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (workspaceFolders && workspaceFolders.length > 0) {
            this.historyFilePath = path.join(workspaceFolders.uri.fsPath, '.vscode', 'dce_history.json');
        }
    }

    private async _readHistoryFile(): Promise<HistoryFile> {
        if (!this.historyFilePath) return { version: 1, cycles: [] };
        try {
            const content = await vscode.workspace.fs.readFile(vscode.Uri.file(this.historyFilePath));
            return JSON.parse(Buffer.from(content).toString('utf-8'));
        } catch (error) {
            Services.loggerService.warn("dce_history.json not found or is invalid. A new one will be created.");
            return { version: 1, cycles: [] };
        }
    }

    private async _writeHistoryFile(data: HistoryFile): Promise<void> {
        if (!this.historyFilePath) return;
        const dir = path.dirname(this.historyFilePath);
        try {
            await vscode.workspace.fs.createDirectory(vscode.Uri.file(dir));
            const content = Buffer.from(JSON.stringify(data, null, 2), 'utf-8');
            await vscode.workspace.fs.writeFile(vscode.Uri.file(this.historyFilePath), content);
        } catch (error) {
            Services.loggerService.error(\`Failed to write to dce_history.json: \${error}\`);
        }
    }

    public async getCycleHistory() {
        Services.loggerService.log("HistoryService: getCycleHistory called.");
        const history = await this._readHistoryFile();
        return history.cycles.map(c => c.cycleId).sort(); // Return sorted list of cycle IDs
    }
}
`
    },
    {
        path: 'src/client/views/parallel-copilot.view/index.ts',
        content: `// src/client/views/parallel-copilot.view/index.ts
import { onMessage } from "./on-message";

export const viewConfig = {
    entry: "parallelCopilotView.js",
    type: "viewType.sidebar.parallelCopilot",
    handleMessage: onMessage,
};
`
    },
    {
        path: 'src/client/views/parallel-copilot.view/on-message.ts',
        content: `// src/client/views/parallel-copilot.view/on-message.ts
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { Services } from "@/backend/services/services";

export function onMessage(serverIpc: ServerPostMessageManager) {
    const loggerService = Services.loggerService;
    loggerService.log("Parallel Co-Pilot view message handler initialized.");

    // TODO: Add message handlers for Phase 2 features
    // e.g., serverIpc.onClientMessage(ClientToServerChannel.RequestSwapFileContent, ...)
}
`
    },
    {
        path: 'src/client/views/parallel-copilot.view/view.scss',
        content: `/* Styles for Parallel Co-Pilot View */
body {
    padding: 0;
    font-family: var(--vscode-font-family);
    font-size: var(--vscode-font-size);
    color: var(--vscode-editor-foreground);
    background-color: var(--vscode-sideBar-background);
}

.pc-view-container {
    padding: 8px;
    display: flex;
    flex-direction: column;
    height: 100vh;
    gap: 8px;
}

.cycle-navigator {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--vscode-panel-border);
}

.tab-bar {
    display: flex;
    border-bottom: 1px solid var(--vscode-panel-border);
}

.tab {
    padding: 6px 12px;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    color: var(--vscode-tab-inactiveForeground);
}

.tab.active {
    color: var(--vscode-tab-activeForeground);
    border-bottom-color: var(--vscode-tab-activeBorder);
}

.tab-content {
    padding-top: 8px;
}
`
    },
    {
        path: 'src/client/views/parallel-copilot.view/view.tsx',
        content: `// src/client/views/parallel-copilot.view/view.tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

const App = () => {
    const [activeTab, setActiveTab] = React.useState(1);
    const tabCount = 4; // Example tab count

    return (
        <div className="pc-view-container">
            <div className="cycle-navigator">
                <span>Cycle:</span>
                <button><VscChevronLeft /></button>
                <span>C73</span>
                <button><VscChevronRight /></button>
            </div>
            
            <div className="tab-bar">
                {[...Array(tabCount)].map((_, i) => (
                    <div 
                        key={i} 
                        className={\`tab \${activeTab === i + 1 ? 'active' : ''}\`}
                        onClick={() => setActiveTab(i + 1)}
                    >
                        Response {i + 1}
                    </div>
                ))}
            </div>

            <div className="tab-content">
                {[...Array(tabCount)].map((_, i) => (
                    activeTab === i + 1 && <div key={i}>Content for Response {i + 1}</div>
                ))}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
`
    },
];

// --- Main Execution ---

async function deployScaffold() {
    console.log('Starting Phase 2 scaffold deployment...');
    const rootDir = process.cwd();

    for (const file of filesToCreate) {
        const fullPath = path.join(rootDir, file.path);
        const dir = path.dirname(fullPath);

        try {
            await fs.mkdir(dir, { recursive: true });
            await fs.writeFile(fullPath, file.content, 'utf-8');
            console.log(`✅ Created: ${file.path}`);
        } catch (error) {
            console.error(`❌ Failed to create ${file.path}: ${error.message}`);
        }
    }

    console.log('\\n🚀 Phase 2 scaffold deployment complete! 🚀');
    console.log('Next steps:');
    console.log('1. Review and apply changes to package.json, webpack.config.js, src/client/views/index.ts, and src/common/view-types.ts.');
    console.log('2. Update services.ts to instantiate and provide the new HistoryService.');
}

deployScaffold();