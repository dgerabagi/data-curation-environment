// src/common/types/pcpp.types.ts
// Updated on: C157 (Add isSortedByTokens)

// Data structure for the backend history file
export interface PcppResponse {
    content: string;
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
    isSortedByLength?: boolean; // C149: Deprecated in favor of isSortedByTokens
    isSortedByTokens?: boolean; // C157: New property for persistent sorting
    pathOverrides?: { [originalPath: string]: string };
}

export interface PcppHistoryFile {
    version: number;
    projectScope?: string; // The user's master project scope from Cycle 0
    cycles: PcppCycle[];
}


// Data structure for the frontend parsed response
export interface ParsedFile {
    path: string;
    content: string;
    tokenCount: number;
}

export interface ParsedResponse {
    summary: string;
    courseOfAction: string;
    filesUpdated: string[]; // This is now derived from parsed files, not a separate section
    files: ParsedFile[]; // Parsed file blocks with content
    totalTokens: number;
}