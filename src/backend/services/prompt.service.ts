// Updated on: C49 (Add logic to select interaction schema based on connection mode)
import * as vscode from 'vscode';
import * as path from 'path';
import { promises as fs } from 'fs';
import { Services } from './services';
import { parseResponse } from '@/client/utils/response-parser';
import { PcppCycle } from '@/common/types/pcpp.types';
import { truncateCodeForLogging, calculatePromptCost } from '@/common/utils/formatting';
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

    private async _generateCycle0Content(): Promise<string> {
        const allArtifactEntries = await vscode.workspace.fs.readDirectory(vscode.Uri.joinPath(this.extensionUri, 'dist', 'Artifacts'));
        const templateFilenames = allArtifactEntries
            .map(([filename]) => filename)
            .filter(filename => filename.startsWith('T') && filename.endsWith('.md'));

        templateFilenames.sort((a, b) => {
            const numA = parseInt(a.match(/T(\d+)/)?.[1] || '0', 10);
            const numB = parseInt(b.match(/T(\d+)/)?.[1] || '0', 10);
            return numA - numB;
        });

        const priorityArtifacts = ['T14. Template - GitHub Repository Setup Guide.md', 'T7. Template - Development and Testing Guide.md'];
        priorityArtifacts.forEach(pa => {
            const index = templateFilenames.indexOf(pa);
            if (index > -1) {
                templateFilenames.splice(index, 1);
                templateFilenames.unshift(pa);
            }
        });

        let staticContext = '<!-- START: Project Templates -->\n';
        for (const filename of templateFilenames) {
            const content = await this.getArtifactContent(`${filename}`, `<!-- ${filename} not found -->`);
            staticContext += `<${filename}>\n${content}\n</${filename}>\n\n`;
        }
        staticContext += '<!-- END: Project Templates -->';

        const cycleContextInstructions = `Review the user's project scope in M4. Your task is to act as a senior project architect and generate a starter set of planning and documentation artifacts for this new project.

**CRITICAL INSTRUCTIONS:**
1.  You have been provided with a set of best-practice templates for software engineering documentation in the <Static Context> section.
2.  Your primary goal is to **select the most relevant templates** and generate project-specific versions of them.
3.  **PRIORITIZE ESSENTIAL GUIDES:** You **MUST** generate artifacts based on "T14. Template - GitHub Repository Setup Guide.md" and "T7. Template - Development and Testing Guide.md". These are mandatory for the user to begin their project.
4.  Generate a Master Artifact List (A0) and at least two other core planning documents (e.g., Project Vision, Technical Scaffolding Plan).
5.  **DO NOT** generate any code files (e.g., .ts, .tsx, .js) in this initial cycle. The focus is on planning and documentation only.`;

        return `<Cycle 0>
<Cycle Context>
${cycleContextInstructions}
</Cycle Context>
<Static Context>
${staticContext.trim()}
</Static Context>
</Cycle 0>`;
    }

    private async _generateCyclesContent(currentCycleData: PcppCycle, fullHistory: PcppCycle[]): Promise<string> {
        const relevantHistory = fullHistory.filter(c => c.cycleId <= currentCycleData.cycleId);
        const cycleMap = new Map(relevantHistory.map(c => [c.cycleId, c]));
        cycleMap.set(currentCycleData.cycleId, currentCycleData);

        const sortedHistory = [...cycleMap.values()].sort((a, b) => b.cycleId - a.cycleId);
    
        let cyclesContent = '<M6. Cycles>';
    
        for (const cycle of sortedHistory) {
            if (cycle.cycleId === 0) continue;
            cyclesContent += `\n\n<Cycle ${cycle.cycleId}>\n`;
    
            if (cycle.cycleContext && cycle.cycleContext.trim()) {
                cyclesContent += `<Cycle Context>\n${cycle.cycleContext}\n</Cycle Context>\n`;
            }
    
            if (cycle.cycleId === currentCycleData.cycleId && cycle.ephemeralContext && cycle.ephemeralContext.trim()) {
                cyclesContent += `<Ephemeral Context>\n${cycle.ephemeralContext}\n</Ephemeral Context>\n`;
            }
    
            const previousCycleId = cycle.cycleId - 1;
            if (previousCycleId > 0) {
                const previousCycle = cycleMap.get(previousCycleId);
                if (previousCycle) {
                    const summary = this.getPreviousCycleSummary(previousCycle);
                    if (summary.trim()) {
                        cyclesContent += `<Previous Cycle ${previousCycleId} Summary of Actions>\n${summary}\n</Previous Cycle ${previousCycleId} Summary of Actions>\n`;
                    }
                }
            }
            cyclesContent += `</Cycle ${cycle.cycleId}>`;
        }

        const cycle0Content = await this._generateCycle0Content();
        cyclesContent += `\n\n${cycle0Content}`;

        cyclesContent += '\n\n</M6. Cycles>';
        return cyclesContent;
    }

    private async getPromptParts(cycleData: PcppCycle, flattenedRepoContent: string): Promise<{ [key: string]: string }> {
        const rootPath = this.workspaceRoot;
        if (!rootPath) throw new Error("No workspace folder open.");

        const fullHistoryFile = await Services.historyService.getFullHistory();
        const fullHistory: PcppCycle[] = fullHistoryFile.cycles;
        
        const allCycles = fullHistory.filter(c => c.cycleId <= cycleData.cycleId);
        const sortedHistoryForOverview = [...allCycles].sort((a, b) => b.cycleId - a.cycleId);

        let cycleOverview = '<M2. cycle overview>\n';
        cycleOverview += `Current Cycle ${cycleData.cycleId} - ${cycleData.title}\n`;
        for (const cycle of sortedHistoryForOverview) {
            if (cycle.cycleId !== cycleData.cycleId) {
                 cycleOverview += `Cycle ${cycle.cycleId} - ${cycle.title}\n`;
            }
        }
        if (!cycleOverview.includes('Cycle 0')) {
            cycleOverview += 'Cycle 0 - Project Initialization/Template Archive\n';
        }
        cycleOverview += '</M2. cycle overview>';
       
        
        const cyclesContent = await this._generateCyclesContent(cycleData, fullHistory);

        const userA0Files = await vscode.workspace.findFiles('**/*A0*Master*Artifact*List.md', '**/node_modules/**', 1);
        let a0Content = '<!-- Master Artifact List (A0) not found in workspace -->';
        if (userA0Files.length > 0) {
            const contentBuffer = await vscode.workspace.fs.readFile(userA0Files[0]);
            a0Content = Buffer.from(contentBuffer).toString('utf-8');
        }
        
        // C49: Select interaction schema based on connection mode
        const settings = await Services.settingsService.getSettings();
        const schemaArtifact = settings.connectionMode === 'demo' ? 'A52.3 DCE - Harmony Interaction Schema Source.md' : 'A52.2 DCE - Interaction Schema Source.md';
        const schemaError = settings.connectionMode === 'demo' ? '<!-- A52.3 Harmony Schema not found -->' : '<!-- A52.2 Interaction Schema Source not found -->';

        const a52_1_Content = await this.getArtifactContent('A52.1 DCE - Parser Logic and AI Guidance.md', '<!-- A52.1 Parser Logic not found -->');
        const schemaSourceContent = await this.getArtifactContent(schemaArtifact, schemaError);
        const interactionSchemaContent = `<M3. Interaction Schema>\n${schemaSourceContent}\n\n${a52_1_Content}\n</M3. Interaction Schema>`;

        const projectScope = `<M4. current project scope>\n${fullHistoryFile.projectScope || 'No project scope defined.'}\n</M4. current project scope>`;
        const m5Content = `<M5. organized artifacts list>\n${a0Content}\n</M5. organized artifacts list>`;
        const m7Content = `<M7. Flattened Repo>\n${flattenedRepoContent}\n</M7. Flattened Repo>`;

        return {
            "M1 Artifact Schema": this.artifactSchemaTemplate,
            "M2 Cycle Overview": cycleOverview,
            "M3 Interaction Schema": interactionSchemaContent,
            "M4 Project Scope": projectScope,
            "M5 Artifact List": m5Content,
            "M6 Cycles": cyclesContent,
            "M7 Flattened Repo": m7Content
        };
    }

    public async generatePromptString(cycleData: PcppCycle): Promise<string> {
        const lastSelection = await Services.selectionService.getLastSelection();
        let flattenedContent = '<!-- No files selected for flattening -->';
        if (lastSelection.length > 0) {
            flattenedContent = await Services.flattenerService.getFlattenedContent(lastSelection);
        }
        
        const promptParts = await this.getPromptParts(cycleData, flattenedContent);
        const promptContent = Object.values(promptParts).join('\n\n');
        return `<prompt.md>\n\n${promptContent}\n\n</prompt.md>`;
    }

    public async handlePromptCostBreakdownRequest(cycleData: PcppCycle, serverIpc: ServerPostMessageManager) {
        try {
            const selectedFiles = await Services.selectionService.getLastSelection();
            Services.loggerService.log(`[CostCalc] Found ${selectedFiles.length} selected files.`);
            if (selectedFiles.length === 0) {
                serverIpc.sendToClient(ServerToClientChannel.SendPromptCostEstimation, { totalTokens: 0, estimatedCost: 0, breakdown: {} });
                Services.loggerService.log("[CostCalc] No files selected, sending 0 cost.");
                return;
            }
            const flattenedContent = await Services.flattenerService.getFlattenedContent(selectedFiles);
            Services.loggerService.log(`[CostCalc] In-memory flattened content generated (${Math.ceil(flattenedContent.length / 4)} tokens).`);
            
            const promptParts = await this.getPromptParts(cycleData, flattenedContent);
            
            const breakdown: { [key: string]: number } = {};
            let totalTokens = 0;

            Services.loggerService.log("[CostCalc] Calculating breakdown:");
            for (const [key, value] of Object.entries(promptParts)) {
                const partTokens = Math.ceil(value.length / 4);
                breakdown[key] = partTokens;
                totalTokens += partTokens;
                Services.loggerService.log(`  - ${key}: ${partTokens} tokens`);
            }

            const estimatedCost = calculatePromptCost(totalTokens);
            Services.loggerService.log(`[CostCalc] Total Tokens: ${totalTokens}, Estimated Cost: $${estimatedCost}`);
            Services.loggerService.log("[CostCalc] Sending estimation to client.");
            serverIpc.sendToClient(ServerToClientChannel.SendPromptCostEstimation, { totalTokens, estimatedCost, breakdown });
        } catch (error: any) {
            Services.loggerService.error(`[CostCalc] Failed to estimate prompt cost: ${error.message}`);
        }
    }

    public async generateStateLog(currentState: PcppCycle, costState: any, serverIpc: ServerPostMessageManager) {
        Services.loggerService.log("--- GENERATING STATE LOG ---");
        try {
            Services.loggerService.log(`\n========================= FRONTEND STATE DUMP =========================\n${JSON.stringify({ FRONTEND_COST_STATE: costState }, null, 2)}\n======================================================================`);
            await this.handlePromptCostBreakdownRequest(currentState, serverIpc);
            Services.loggerService.show();
            vscode.window.showInformationMessage("State and cost calculation logged to 'Data Curation Environment' output channel.");
        } catch (error: any) {
            Services.loggerService.error(`Failed to generate state log: ${error.message}`);
        }
    }

    private async getArtifactContent(artifactFilename: string, errorMessage: string): Promise<string> {
        try {
            const uri = vscode.Uri.joinPath(this.extensionUri, 'dist', 'Artifacts', artifactFilename);
            const contentBuffer = await vscode.workspace.fs.readFile(uri);
            return Buffer.from(contentBuffer).toString('utf-8');
        } catch (e) {
            Services.loggerService.error(`Could not read ${artifactFilename}. Error: ${e}`);
            return errorMessage;
        }
    }

    public async generatePromptFile(cycleTitle: string, currentCycle: number) {
        if (!this.workspaceRoot) {
            vscode.window.showErrorMessage("Cannot generate prompt: No workspace folder is open.");
            return;
        }
        const rootPath = this.workspaceRoot;
        const promptMdPath = path.join(rootPath, 'prompt.md');

        try {
            Services.loggerService.log(`Generating prompt.md file for cycle ${currentCycle}...`);
            
            const lastSelection = await Services.selectionService.getLastSelection();
            if (lastSelection.length > 0) {
                await Services.flattenerService.flatten(lastSelection);
            } else {
                Services.loggerService.warn("No files selected for flattening. 'flattened_repo.md' may be stale or non-existent.");
            }
            
            const fullHistory = (await Services.historyService.getFullHistory()).cycles;
            const currentCycleDataFromHistory = fullHistory.find(c => c.cycleId === currentCycle);
            if (!currentCycleDataFromHistory) {
                throw new Error(`Could not find data for current cycle (${currentCycle}) in history.`);
            }
            const currentCycleData = { ...currentCycleDataFromHistory, title: cycleTitle };

            const finalPrompt = await this.generatePromptString(currentCycleData);

            await fs.writeFile(promptMdPath, finalPrompt, 'utf-8');
            vscode.window.showInformationMessage(`Successfully generated prompt.md for Cycle ${currentCycle}.`);
            Services.loggerService.log(`Successfully generated prompt.md file for Cycle ${currentCycle}.`);

            await Services.fileOperationService.handleOpenFileRequest(promptMdPath);

        } catch (error: any) {
            let errorMessage = `Failed to generate prompt.md: ${error.message}`;
            vscode.window.showErrorMessage(errorMessage);
            Services.loggerService.error(errorMessage);
        }
    }

    public async generateInitialArtifactsAndResponses(projectScope: string, responseCount: number, serverIpc: ServerPostMessageManager) {
        if (!this.workspaceRoot) {
            vscode.window.showErrorMessage("Cannot generate prompt: No workspace folder is open.");
            return;
        }
        const rootPath = this.workspaceRoot;
        const promptMdPath = path.join(rootPath, 'prompt.md');
        const artifactsDirInWorkspace = path.join(rootPath, 'src', 'Artifacts');
        
        try {
            Services.loggerService.log("Generating Cycle 0 prompt.md file...");
            await Services.historyService.saveProjectScope(projectScope);

            // ... (rest of the prompt generation logic from generateCycle0Prompt)
            const cycle0Content = await this._generateCycle0Content();
            const settings = await Services.settingsService.getSettings();
            const schemaArtifact = settings.connectionMode === 'demo' ? 'A52.3 DCE - Harmony Interaction Schema Source.md' : 'A52.2 DCE - Interaction Schema Source.md';
            const schemaError = settings.connectionMode === 'demo' ? '<!-- A52.3 Harmony Schema not found -->' : '<!-- A52.2 Interaction Schema Source not found -->';
            const a52_1_Content = await this.getArtifactContent('A52.1 DCE - Parser Logic and AI Guidance.md', '<!-- A52.1 Parser Logic not found -->');
            const schemaSourceContent = await this.getArtifactContent(schemaArtifact, schemaError);
            const interactionSchemaContent = `<M3. Interaction Schema>\n${schemaSourceContent}\n\n${a52_1_Content}\n</M3. Interaction Schema>`;
            const projectScopeContent = `<M4. current project scope>\n${projectScope}\n</M4. current project scope>`;
            await vscode.workspace.fs.createDirectory(vscode.Uri.file(artifactsDirInWorkspace));
            const readmeContent = await this.getArtifactContent('A72. DCE - README for Artifacts.md', '# Welcome to the Data Curation Environment!');
            const readmeUri = vscode.Uri.file(path.join(artifactsDirInWorkspace, 'DCE_README.md'));
            await vscode.workspace.fs.writeFile(readmeUri, Buffer.from(readmeContent, 'utf-8'));
            const readmeFileContent = `<file path="src/Artifacts/DCE_README.md">\n${readmeContent}\n</file_artifact>`;
            const flattenedRepoContent = `<M7. Flattened Repo>\n${readmeFileContent}\n</M7. Flattened Repo>`;
            const promptParts = [ this.artifactSchemaTemplate, `<M2. cycle overview>\nCurrent Cycle 0 - Project Initialization\n</M2. cycle overview>`, interactionSchemaContent, projectScopeContent, `<M5. organized artifacts list>\n# No artifacts exist yet.\n</M5. organized artifacts list>`, `<M6. Cycles>\n${cycle0Content}\n</M6. Cycles>`, flattenedRepoContent ];
            const promptContent = promptParts.join('\n\n');
            const finalPrompt = `<prompt.md>\n\n${promptContent}\n\n</prompt.md>`;
            await vscode.workspace.fs.writeFile(vscode.Uri.file(promptMdPath), Buffer.from(finalPrompt, 'utf-8'));
            
            // Now, generate responses
            Services.loggerService.log(`Onboarding complete. Requesting ${responseCount} initial responses from LLM.`);
            const dummyCycleData: PcppCycle = { cycleId: 0, title: 'Initial Artifacts', responses: {}, cycleContext: '', ephemeralContext: '', timestamp: '', tabCount: responseCount };
            const responses = await Services.llmService.generateBatch(finalPrompt, responseCount, dummyCycleData);
            
            // Create Cycle 1 with the new responses
            const { newCycleId, newMaxCycle } = await Services.historyService.createNewCycleWithResponses(responses, responseCount, projectScope);
            
            vscode.window.showInformationMessage(`Successfully generated initial artifacts and received ${responses.length} responses.`);

            // Tell the frontend to navigate to the new cycle
            serverIpc.sendToClient(ServerToClientChannel.SendBatchGenerationComplete, { newCycleId, newMaxCycle });

        } catch (error: any) {
            vscode.window.showErrorMessage(`Failed to generate initial artifacts: ${error.message}`);
            Services.loggerService.error(`Failed to generate initial artifacts: ${error.message}`);
        }
    }
}