// src/common/types/pcpp.types.ts
// Updated on: C76 (Consolidate TabState)
export interface PcppResponse {
    content: string;
    isLoading?: boolean;
}

export interface TabState {
    rawContent: string;
    parsedContent: ParsedResponse | null;
    isLoading?: boolean;
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