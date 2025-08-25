// src/common/types/pcpp.types.ts
// Updated on: C137 (Add selectedFilesForReplacement to PcppCycle)

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
    selectedFilesForReplacement?: string[]; // New: To track which files are checked for replacement
}

export interface PcppHistoryFile {
    version: number;
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
    filesUpdated: string[]; // List of file paths from the "Files Updated This Cycle" section
    files: ParsedFile[]; // Parsed file blocks with content
    totalTokens: number;
}