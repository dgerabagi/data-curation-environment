// src/common/types/pcpp.types.ts
// Updated on: C170 (Fix TS error on ComparisonMetrics)
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
    isSortedByTokens?: boolean;
    pathOverrides?: { [originalPath: string]: string };
    cycleContextHeight?: number;
    ephemeralContextHeight?: number;
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
    filesUpdated: string[];
    files: ParsedFile[];
    totalTokens: number;
}

// This type was moved to channels.type.ts to resolve build errors
// export interface ComparisonMetrics {
//     originalTokens: number;
//     modifiedTokens: number;
//     similarity: number;
// }