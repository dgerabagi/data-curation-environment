// src/client/utils/response-parser.ts
import { ParsedResponse, ParsedFile } from "@/common/types/pcpp.types";

const SUMMARY_REGEX = /^([\s\S]*?)(?=### Course of Action)/;
const COURSE_OF_ACTION_REGEX = /### Course of Action\s*([\s\S]*?)(?=### Files Updated This Cycle|(?=^\s*`{3,}|<file path="))/m;
const FILES_UPDATED_REGEX = /### Files Updated This Cycle\s*([\s\S]*?)(?=^\s*`{3,}|<file path=")/m;
const FILE_BLOCK_REGEX = /<file path="([^"]+)">([\s\S]*?)<\/file>/g;
const ANGLE_BRACKET_PATH_REGEX = /<([a-zA-Z0-9\.\/_-]+)>/g; // New regex for <path/to/file.ts>

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
    
    let filesUpdatedList: string[] = [];
    
    // 1. Prioritize files from <xml> tags
    if (files.length > 0) {
        filesUpdatedList = files.map(f => f.path);
    }
    
    // 2. Fallback to parsing "Files Updated This Cycle" list
    else if (filesUpdatedMatch && filesUpdatedMatch[1]) {
        filesUpdatedList = filesUpdatedMatch[1]
            .split('\n')
            .map(line => {
                const trimmedLine = line.trim();
                const backtickMatch = /`([^`]+)`/.exec(trimmedLine);
                if (backtickMatch && backtickMatch[1]) {
                    return backtickMatch[1].trim();
                }
                return trimmedLine
                    .replace(/^\[.\]\s*/, '')
                    .replace(/^[-*]\s*/, '')
                    .replace(/\(Updated\)/ig, '')
                    .replace(/`/g, '')
                    .trim();
            })
            .filter(line => line.length > 0 && line !== ':');
    }
    
    // 3. Final fallback: check for simple angle bracket paths
    else {
        const angleBracketMatches = rawText.matchAll(ANGLE_BRACKET_PATH_REGEX);
        for (const match of angleBracketMatches) {
            filesUpdatedList.push(match[1].trim());
        }
    }

    return {
        summary: summaryMatch ? summaryMatch[1].trim() : 'Could not parse summary.',
        courseOfAction: courseOfActionMatch ? courseOfActionMatch[1].trim() : 'Could not parse course of action.',
        filesUpdated: [...new Set(filesUpdatedList)], // Ensure uniqueness
        files: files,
    };
}