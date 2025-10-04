// src/common/types/pcpp.types.ts
// Updated on: C97 (Unify TabState into PcppResponse)
export interface PcppResponse {
    content: string;
    // The single source of truth for the response's state
    status: 'pending' | 'thinking' | 'generating' | 'complete' | 'error';
    
    // Parsed content, formerly in TabState
    parsedContent?: ParsedResponse | null;

    // Persisted Metrics for the Response UI
    startTime?: number;         // Timestamp (Date.now()) when generation for this response started
    thinkingEndTime?: number;   // Timestamp when the 'thinking' phase ended and 'generating' began
    endTime?: number;           // Timestamp when the response was fully received
    thinkingTokens?: number;    // Total tokens from the 'thinking' phase
    responseTokens?: number;    // Total tokens from the 'response' phase (the actual content)
}

// DEPRECATED: This has been merged into PcppResponse to create a single source of truth.
// export interface TabState {
//     rawContent: string;
//     parsedContent: ParsedResponse | null;
//     status?: 'pending' | 'thinking' | 'generating' | 'complete' | 'error';
// }

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