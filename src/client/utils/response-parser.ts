// src/client/utils/response-parser.ts
import { ParsedResponse, ParsedFile } from "@/common/types/pcpp.types";

const SUMMARY_REGEX = /^([\s\S]*?)(?=### Course of Action)/;
const COURSE_OF_ACTION_REGEX = /### Course of Action\s*([\s\S]*?)(?=### Files Updated This Cycle|(?=^\s*`{3,}))/m;
const FILES_UPDATED_REGEX = /### Files Updated This Cycle\s*([\s\S]*?)(?=^\s*`{3,})/m;
const FILE_BLOCK_REGEX = /<file path="([^"]+)">([\s\S]*?)<\/file>/g;

export function parseResponse(rawText: string): ParsedResponse {
    const summaryMatch = rawText.match(SUMMARY_REGEX);
    const courseOfActionMatch = rawText.match(COURSE_OF_ACTION_REGEX);
    const filesUpdatedMatch = rawText.match(FILES_UPDATED_REGEX);

    const files: ParsedFile[] = [];
    const fileMatches = rawText.matchAll(FILE_BLOCK_REGEX);
    for (const match of fileMatches) {
        files.push({
            path: match[1].trim(),
            content: match[2].trim(),
        });
    }
    
    // Fallback for files updated list if the dedicated section is missing
    let filesUpdatedList: string[] = [];
    if (filesUpdatedMatch && filesUpdatedMatch[1]) {
        filesUpdatedList = filesUpdatedMatch[1]
            .split('\n')
            .map(line => line.replace(/[-\*]\s*/, '').trim())
            .filter(line => line.trim().length > 0); // C92 Fix: Filter out empty lines
    } else {
        filesUpdatedList = files.map(f => f.path);
    }

    return {
        summary: summaryMatch ? summaryMatch[1].trim() : 'Could not parse summary.',
        courseOfAction: courseOfActionMatch ? courseOfActionMatch[1].trim() : 'Could not parse course of action.',
        filesUpdated: filesUpdatedList,
        files: files,
    };
}