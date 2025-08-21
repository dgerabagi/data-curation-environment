// src/common/types/pcpp.types.ts

export interface ParsedFile {
    path: string;
    content: string;
}

export interface ParsedResponse {
    summary: string;
    courseOfAction: string;
    filesUpdated: string[]; // List of file paths from the "Files Updated This Cycle" section
    files: ParsedFile[]; // Parsed file blocks with content
}