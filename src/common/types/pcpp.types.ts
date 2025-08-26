// src/common/types/pcpp.types.ts
// Updated on: C153 (Add projectScope to history file)

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
    filesUpdated: string[]; // List of file paths from the "Files Updated This Cycle" section
    files: ParsedFile[]; // Parsed file blocks with content
    totalTokens: number;
}