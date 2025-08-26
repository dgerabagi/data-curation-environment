// src/common/types/pcpp.types.ts
// Updated on: C154 (Add pathOverrides to PcppCycle)

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
    isSortedByLength?: boolean;
    pathOverrides?: { [originalPath: string]: string }; // New: To store user-corrected file paths
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