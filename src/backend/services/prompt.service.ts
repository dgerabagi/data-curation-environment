import * as vscode from 'vscode';
import * as path from 'path';
import { promises as fs } from 'fs';
import { Services } from './services';
import { parseResponse } from '@/client/utils/response-parser';
import { PcppCycle } from '@/common/types/pcpp.types';
import { truncateCodeForLogging } from '@/common/utils/formatting';
import { ServerPostMessageManager } from '@/common/ipc/server-ipc';
import { ServerToClientChannel } from '@/common/ipc/channels.enum';

export class PromptService {
    private extensionUri: vscode.Uri;
    private workspaceRoot: string | undefined;

    constructor(extensionUri: vscode.Uri) {
        this.extensionUri = extensionUri;
        this.workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    }

    private artifactSchemaTemplate = `<M1. artifact schema>
M1. artifact schema
M2. cycle overview
M3. interaction schema
M4. current project scope
M5. organized artifacts list
M6. cycles
M7. Flattened Repo
</M1. artifact schema>`;

    private getPreviousCycleSummary(cycle: PcppCycle | undefined): string {
        if (!cycle) return '';
        
        const selectedResponseId = cycle.selectedResponseId;
        if (!selectedResponseId || !cycle.responses[selectedResponseId]) {
            Services.loggerService.warn(`Could not find selected response content for cycle ${cycle.cycleId}`);
            return `<!-- No response was selected for cycle ${cycle.cycleId} -->`;
        }

        const previousResponseContent = cycle.responses[selectedResponseId].content;
        if (!previousResponseContent.trim()) {
            return `<!-- Selected response for cycle ${cycle.cycleId} was empty -->`;
        }

        const parsed = parseResponse(previousResponseContent);
        
        return `${parsed.summary}\n\n${parsed.courseOfAction}`;
    }

    private async _generateCyclesContent(currentCycleData: PcppCycle, fullHistory: PcppCycle[]): Promise<string> {
        const allCycles = [...fullHistory];
        const cycleMap = new Map(allCycles.map(c => [c.cycleId, c]));
        cycleMap.set(currentCycleData.cycleId, currentCycleData);

        const sortedHistory = [...cycleMap.values()].sort((a, b) => b.cycleId - a.cycleId);
    
        let cyclesContent = '<M6. Cycles>';
    
        for (const cycle of sortedHistory) {
            cyclesContent += `\n\n<Cycle ${cycle.cycleId}>\n`;
    
            if (cycle.cycleContext && cycle.cycleContext.trim()) {
                cyclesContent += `<Cycle Context>\n${cycle.cycleContext}\n</Cycle Context>\n`;
            }
    
            if (cycle.cycleId === currentCycleData.cycleId && cycle.ephemeralContext && cycle.ephemeralContext.trim()) {
                cyclesContent += `<Ephemeral Context>\n${cycle.ephemeralContext}\n</Ephemeral Context>\n`;
            }
    
            const previousCycleId = cycle.cycleId - 1;
            const previousCycle = cycleMap.get(previousCycleId);
            if (previousCycle) {
                const summary = this.getPreviousCycleSummary(previousCycle);
                if (summary.trim()) {
                    cyclesContent += `<Previous Cycle ${previousCycleId} Summary of Actions>\n${summary}\n</Previous Cycle ${previousCycleId} Summary of Actions>\n`;
                }
            }
            cyclesContent += `</Cycle ${cycle.cycleId}>`;
        }
        cyclesContent += '\n\n</M6. Cycles>';
        return cyclesContent;
    }

    public async generateStateLog(currentState: PcppCycle) {
        Services.loggerService.log("--- GENERATING STATE LOG ---");
        try {
            const fullHistory = (await Services.historyService.getFullHistory()).cycles;
            
            const truncatedHistory = JSON.parse(JSON.stringify(fullHistory));
            const truncatedCurrentState = JSON.parse(JSON.stringify(currentState));

            const truncateCycleResponses = (cycle: PcppCycle) => {
                Object.values(cycle.responses).forEach(response => {
                    response.content = truncateCodeForLogging(response.content);
                });
            };

            truncatedHistory.forEach(truncateCycleResponses);
            truncateCycleResponses(truncatedCurrentState);
            
            const cyclesContent = await this._generateCyclesContent(currentState, fullHistory);
            
            const stateDump = {
                "CURRENT_FRONTEND_STATE": truncatedCurrentState,
                "FULL_HISTORY_FROM_BACKEND": truncatedHistory
            };

            const logMessage = `
========================= CURRENT STATE DUMP =========================
${JSON.stringify(stateDump, null, 2)}
======================================================================

==================== GENERATED <M6. Cycles> BLOCK ====================
${cyclesContent}
======================================================================
`;
            Services.loggerService.log(logMessage);
            Services.loggerService.show();
            vscode.window.showInformationMessage("State logged to 'Data Curation Environment' output channel.");
        } catch (error: any) {
            Services.loggerService.error(`Failed to generate state log: ${error.message}`);
        }
    }

    public async generatePromptFile(cycleTitle: string, currentCycle: number) {
        if (!this.workspaceRoot) {
            vscode.window.showErrorMessage("Cannot generate prompt: No workspace folder is open.");
            return;
        }
        const rootPath = this.workspaceRoot;
        const flattenedRepoPath = path.join(rootPath, 'flattened_repo.md');
        const promptMdPath = path.join(rootPath, 'prompt.md');

        try {
            Services.loggerService.log("Generating prompt.md file...");
            
            const lastSelection = await Services.selectionService.getLastSelection();
            if (lastSelection.length > 0) {
                await Services.flattenerService.flatten(lastSelection);
            } else {
                Services.loggerService.warn("No files selected for flattening. 'flattened_repo.md' may be stale.");
            }

            const flattenedContent = await fs.readFile(flattenedRepoPath, 'utf-8');
            const fullHistoryFile = await Services.historyService.getFullHistory();
            const fullHistory: PcppCycle[] = fullHistoryFile.cycles;
            
            const currentCycleDataFromHistory = fullHistory.find(c => c.cycleId === currentCycle);
            if (!currentCycleDataFromHistory) {
                throw new Error(`Could not find data for current cycle (${currentCycle}) in history.`);
            }
            const currentCycleData = { ...currentCycleDataFromHistory, title: cycleTitle };

            const allCycles = [...fullHistory.filter(c => c.cycleId !== currentCycle), currentCycleData];
            const sortedHistory = allCycles.sort((a, b) => b.cycleId - a.cycleId);

            let cycleOverview = '<M2. cycle overview>\n';
            cycleOverview += `Current Cycle ${currentCycle} - ${cycleTitle}\n`;
            for (const cycle of sortedHistory) {
                if (cycle.cycleId !== currentCycle) {
                     cycleOverview += `Cycle ${cycle.cycleId} - ${cycle.title}\n`;
                }
            }
            cycleOverview += '</M2. cycle overview>';
            
            const cyclesContent = await this._generateCyclesContent(currentCycleData, fullHistory);

            let masterArtifactListContent = '<!-- Master Artifact List (A0) not found -->';
            try {
                const a0Path = path.join(rootPath, 'src', 'Artifacts', 'A0. DCE Master Artifact List.md');
                masterArtifactListContent = await fs.readFile(a0Path, 'utf-8');
            } catch (e) {
                Services.loggerService.warn("Could not read A0. DCE Master Artifact List.md");
            }

            // C156: Read Interaction Schema from file
            let interactionSchemaContent = '<!-- A52.2 Interaction Schema Source.md not found -->';
            try {
                const a522Path = path.join(this.workspaceRoot, 'src', 'Artifacts', 'A52.2 DCE - Interaction Schema Source.md');
                const schemaFileContent = await fs.readFile(a522Path, 'utf-8');
                // Extract the content from the markdown file, assuming it's after a specific header
                const schemaText = schemaFileContent.split('## Interaction Schema Text')[1];
                if (schemaText) {
                    interactionSchemaContent = `<M3. Interaction Schema>\n${schemaText.trim()}\n</M3. Interaction Schema>`;
                }
            } catch (e) {
                Services.loggerService.error("Could not read A52.2 for prompt context. Using fallback.");
            }

            const projectScope = `<M4. current project scope>\n${fullHistoryFile.projectScope || 'No project scope defined.'}\n</M4. current project scope>`;

            const promptParts = [
                `<prompt.md>`,
                this.artifactSchemaTemplate,
                cycleOverview,
                interactionSchemaContent,
                projectScope,
                `<M5. organized artifacts list>\n${masterArtifactListContent}\n</M5. organized artifacts list>`,
                cyclesContent,
                `<M7. Flattened Repo>\n${flattenedContent}\n</M7. Flattened Repo>`,
                `</prompt.md>`
            ];

            const finalPrompt = promptParts.join('\n\n');

            await fs.writeFile(promptMdPath, finalPrompt, 'utf-8');
            vscode.window.showInformationMessage(`Successfully generated prompt.md.`);
            Services.loggerService.log("Successfully generated prompt.md file.");

        } catch (error: any) {
            let errorMessage = `Failed to generate prompt.md: ${error.message}`;
            if (error.code === 'ENOENT' && error.path?.includes('flattened_repo.md')) {
                errorMessage = "Failed to generate prompt.md: 'flattened_repo.md' not found. Please flatten context first.";
            }
            vscode.window.showErrorMessage(errorMessage);
            Services.loggerService.error(errorMessage);
        }
    }

    public async generateCycle0Prompt(projectScope: string, serverIpc: ServerPostMessageManager) {
        if (!this.workspaceRoot) {
            vscode.window.showErrorMessage("Cannot generate prompt: No workspace folder is open.");
            return;
        }
        const rootPath = this.workspaceRoot;
        const promptMdPath = path.join(rootPath, 'prompt.md');
        const artifactsDirInWorkspace = path.join(rootPath, 'src', 'Artifacts');
        const artifactsDirInExtension = vscode.Uri.joinPath(this.extensionUri, 'src', 'Artifacts');

        try {
            Services.loggerService.log("Generating Cycle 0 prompt.md file...");
            await Services.historyService.saveProjectScope(projectScope);

            const allArtifactEntries = await vscode.workspace.fs.readDirectory(artifactsDirInExtension);
            const templateFilenames = allArtifactEntries
                .map(([filename]) => filename)
                .filter(filename => filename.startsWith('T') && filename.endsWith('.md'));

            // C156: Fix sorting of template artifacts
            templateFilenames.sort((a, b) => {
                const numA = parseInt(a.match(/T(\d+)/)?.[1] || '0', 10);
                const numB = parseInt(b.match(/T(\d+)/)?.[1] || '0', 10);
                return numA - numB;
            });

            let staticContext = '<!-- START: Project Templates -->\n';
            for (const filename of templateFilenames) {
                const artifactUri = vscode.Uri.joinPath(artifactsDirInExtension, filename);
                const contentBuffer = await vscode.workspace.fs.readFile(artifactUri);
                const content = Buffer.from(contentBuffer).toString('utf-8');
                staticContext += `<${filename}>\n${content}\n</${filename}>\n\n`;
            }
            staticContext += '<!-- END: Project Templates -->\n\n';
            
            let interactionSchemaContent = '<!-- A52.2 Interaction Schema Source.md not found -->';
            try {
                const a522Path = path.join(this.workspaceRoot, 'src', 'Artifacts', 'A52.2 DCE - Interaction Schema Source.md');
                const schemaFileContent = await fs.readFile(a522Path, 'utf-8');
                const schemaText = schemaFileContent.split('## Interaction Schema Text')[1];
                if (schemaText) {
                    interactionSchemaContent = `<M3. Interaction Schema>\n${schemaText.trim()}\n</M3. Interaction Schema>`;
                }
            } catch (e) {
                 Services.loggerService.error("Could not read A52.2 for Cycle 0 prompt context. Using fallback.");
            }

            const cycle0Context = `<Cycle 0>
<Cycle Context>
You are a senior project architect. Your task is to establish the necessary documentation to achieve the user's goals, which are outlined in M4.

**CRITICAL INSTRUCTIONS:**
1.  Review the documentation templates provided in the static context as **best-practice examples**.
2.  Your primary goal is to generate **planning and documentation artifacts** (e.g., Project Vision, Requirements) for the user's project, using the templates as a guide.
3.  You **MUST NOT** generate code files (e.g., \`package.json\`, \`src/main.ts\`) in this initial cycle.
4.  Every artifact you generate **MUST** be enclosed in the strict XML format: \`<file path="path/to/artifact.md">...</file>\`.
</Cycle Context>
<Static Context>
${staticContext.trim()}
</Static Context>
</Cycle 0>`;

            const projectScopeContent = `<M4. current project scope>\n${projectScope}\n</M4. current project scope>`;

            const promptParts = [
                `<prompt.md>`, this.artifactSchemaTemplate, `<M2. cycle overview>\nCurrent Cycle 0 - Project Initialization\n</M2. cycle overview>`, interactionSchemaContent, projectScopeContent, `<M5. organized artifacts list>\n# No artifacts exist yet.\n</M5. organized artifacts list>`, `<M6. Cycles>\n${cycle0Context}\n</M6. Cycles>`, `<M7. Flattened Repo>\n<!-- No files selected for initial prompt -->\n</M7. Flattened Repo>`, `</prompt.md>`
            ];

            const finalPrompt = promptParts.join('\n\n');
            await vscode.workspace.fs.writeFile(vscode.Uri.file(promptMdPath), Buffer.from(finalPrompt, 'utf-8'));
            Services.loggerService.log("Successfully generated Cycle 0 prompt.md file.");

            await vscode.workspace.fs.createDirectory(vscode.Uri.file(artifactsDirInWorkspace));
            const a0Uri = vscode.Uri.file(path.join(artifactsDirInWorkspace, 'A0. Master Artifact List.md'));
            const a0InitialContent = `# Artifact A0: [Your Project Name] Master Artifact List\n# Date Created: C0\n\n## 1. Purpose\n\n# This file serves as the definitive, parseable list of all documentation artifacts for your project.`;
            await vscode.workspace.fs.writeFile(a0Uri, Buffer.from(a0InitialContent, 'utf-8'));
            Services.loggerService.log("Created empty A0 Master Artifact List.");
            
            vscode.window.showInformationMessage(`Successfully generated initial prompt.md and created src/Artifacts/A0...`);

            const cycle1Data: PcppCycle = {
                cycleId: 1,
                timestamp: new Date().toISOString(),
                title: 'New Cycle',
                cycleContext: '',
                ephemeralContext: '',
                responses: { "1": { content: "" } },
                isParsedMode: false,
                leftPaneWidth: 33,
                selectedResponseId: null,
                selectedFilesForReplacement: [],
                tabCount: 4
            };

            await Services.historyService.saveCycleData(cycle1Data);
            serverIpc.sendToClient(ServerToClientChannel.SendLatestCycleData, { cycleData: cycle1Data, projectScope });

        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to generate Cycle 0 prompt: ${error.message}`);
            Services.loggerService.error(`Failed to generate Cycle 0 prompt: ${error.message}`);
        }
    }
}