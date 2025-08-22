// src/client/utils/response-parser.ts
import { ParsedResponse, ParsedFile } from "@/common/types/pcpp.types";

// Regex to find the summary/plan before any major headers
const SUMMARY_REGEX = /^([\s\S]*?)(?=### Course of Action|### Files Updated This Cycle|<[a-zA-Z0-9\.\/_-]+\.[a-zA-Z]{2,}>)/;

// Regex to find the course of action
const COURSE_OF_ACTION_REGEX = /### Course of Action\s*([\s\S]*?)(?=### Files Updated This Cycle|<[a-zA-Z0-9\.\/_-]+\.[a-zA-Z]{2,}>)/m;

// Regex for the "Files Updated" markdown list (as a fallback)
const FILES_UPDATED_LIST_REGEX = /### Files Updated This Cycle\s*([\s\S]*?)(?=<[a-zA-Z0-9\.\/_-]+\.[a-zA-Z]{2,}>|`{3,})/m;

// C108: More robust regex to handle <path>...</file> and <path>...</path>
const FILE_BLOCK_REGEX = /<([a-zA-Z0-9\.\/_-]+\.[a-zA-Z]{2,})>([\s\S]*?)<\/(?:file|\1)>/g;


export function parseResponse(rawText: string): ParsedResponse {
    // 1. Extract file blocks first, as they are the most reliable source of data.
    const files: ParsedFile[] = [];
    const fileMatches = rawText.matchAll(FILE_BLOCK_REGEX);
    for (const match of fileMatches) {
        files.push({
            path: match[1].trim(),
            content: match[2].trim(),
        });
    }

    // 2. Extract summary and course of action
    const summaryMatch = rawText.match(SUMMARY_REGEX);
    const courseOfActionMatch = rawText.match(COURSE_OF_ACTION_REGEX);
    
    const summary = summaryMatch ? summaryMatch[1].trim() : 'Could not parse summary.';
    const courseOfAction = courseOfActionMatch ? courseOfActionMatch[1].trim() : 'Could not parse course of action.';

    // 3. Determine the list of updated files
    let filesUpdatedList: string[] = [];
    if (files.length > 0) {
        // Primary method: Use the paths from the file blocks we found.
        filesUpdatedList = files.map(f => f.path);
    } else {
        // Fallback method: Parse the markdown list
        const filesUpdatedMatch = rawText.match(FILES_UPDATED_LIST_REGEX);
        if (filesUpdatedMatch && filesUpdatedMatch[1]) {
            filesUpdatedList = filesUpdatedMatch[1]
                .split('\n')
                .map(line => {
                    const backtickMatch = /`([^`]+)`/.exec(line);
                    if (backtickMatch && backtickMatch[1]) {
                        return backtickMatch[1].trim();
                    }
                    return line
                        .replace(/^\[.\]\s*/, '')
                        .replace(/^[-*]\s*/, '')
                        .replace(/\((?:Updated|New|Re-supplied|Deleted)\)/ig, '')
                        .replace(/`/g, '')
                        .trim();
                })
                .filter(line => line.length > 0 && line.includes('.')); // Basic validation
        }
    }


    return {
        summary,
        courseOfAction,
        filesUpdated: [...new Set(filesUpdatedList)], // Ensure uniqueness
        files,
    };
}