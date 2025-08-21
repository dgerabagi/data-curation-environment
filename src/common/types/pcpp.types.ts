// src/common/types/pcpp.types.ts

export interface ParsedFile {
    path: string;
    content: string;
}

export interface ParsedResponse {
    summary: string;
    courseOfAction: string;
    filesUpdated: string[];
    files: ParsedFile[];
}