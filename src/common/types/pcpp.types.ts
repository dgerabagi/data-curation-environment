// src/common/types/pcpp.types.ts
// Updated on: C126 (Add isCycleCollapsed)
export interface PcppResponse {
    content: string;
    status: 'pending' | 'thinking' | 'generating' | 'complete' | 'error' | 'stopped';
    parsedContent?: ParsedResponse | null;
    startTime?: number;
    thinkingEndTime?: number;
    endTime?: number;
    thinkingTokens?: number;
    responseTokens?: number;
}

export interface PcppCycle {
    cycleId: number;
    timestamp: string;
    title: string;
    cycleContext: string;
    ephemeralContext: string;
    responses: { [tabId: string]: PcppResponse };
    isParsedMode?: boolean;
    leftPaneWidth?: number;
    selectedResponseId?: string | null;
    selectedFilesForReplacement?: string[];
    tabCount?: number;
    activeTab?: number;
    isSortedByTokens?: boolean;
    pathOverrides?: { [originalPath: string]: string };
    cycleContextHeight?: number;
    ephemeralContextHeight?: number;
    activeWorkflowStep?: string;
    status?: 'complete' | 'generating';
    isEphemeralContextCollapsed?: boolean;
    isCycleCollapsed?: boolean; // C126: New field for persisting cycle section collapse state
    connectionMode?: string;
}

export interface PcppHistoryFile {
    version: number;
    projectScope?: string; 
    cycles: PcppCycle[];
}

export interface ParsedFile {
    path: string;
    content: string;
    tokenCount: number;
}

export interface ParsedResponse {
    summary: string;
    courseOfAction: string;
    curatorActivity?: string;
    filesUpdated: string[];
    files: ParsedFile[];
    totalTokens: number;
}