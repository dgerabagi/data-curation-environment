// Updated on: C112 (Add cleanup for trailing code fences)
import { ParsedResponse, ParsedFile } from "@/common/types/pcpp.types";

// Regex to find the summary/plan before any major headers
const SUMMARY_REGEX = /^([\s\S]*?)(?=### Course of Action|### Files Updated This Cycle|<file path=")/;

// Regex to find the course of action
const COURSE_OF_ACTION_REGEX = /### Course of Action\s*([\s\S]*?)(?=### Files Updated This Cycle|<file path=")/m;

// Regex for the "Files Updated" markdown list (as a fallback)
const FILES_UPDATED_LIST_REGEX = /### Files Updated This Cycle\s*([\s\S]*?)(?=<file path="|`{3,})/m;

// Find file tags first, then extract content between them.
const FILE_TAG_REGEX = /<file path="([^"]+)">/g;


export function parseResponse(rawText: string): ParsedResponse {
    const files: ParsedFile[] = [];
    let filesUpdatedList: string[] = [];

    // Stage 1: Find all file tags and their positions
    const tagMatches = [...rawText.matchAll(FILE_TAG_REGEX)];

    // Stage 2: Extract content between tags
    tagMatches.forEach((match, index) => {
        const path = match[1].trim();
        const contentStart = match.index! + match[0].length;
        
        const nextMatch = tagMatches[index + 1];
        const contentEnd = nextMatch ? nextMatch.index! : rawText.length;
        
        let content = rawText.substring(contentStart, contentEnd).trim();

        // C112: Clean up potential closing tags and code fences from the end of the content
        const patternsToRemove = [
            `</file>`,
            `</${path}>`,
            '```xml',
            '```',
        ];

        patternsToRemove.forEach(pattern => {
            // Use a loop to remove multiple occurrences from the end
            while (content.endsWith(pattern)) {
                content = content.slice(0, -pattern.length).trim();
            }
        });

        files.push({ path, content });
    });

    // Extract summary and course of action using the file tags as boundaries
    const summaryMatch = rawText.match(SUMMARY_REGEX);
    const courseOfActionMatch = rawText.match(COURSE_OF_ACTION_REGEX);
    
    const summary = summaryMatch ? summaryMatch[1].trim() : 'Could not parse summary.';
    const courseOfAction = courseOfActionMatch ? courseOfActionMatch[1].trim() : 'Could not parse course of action.';

    // The primary source for filesUpdated is the list of successfully parsed file blocks.
    if (files.length > 0) {
        filesUpdatedList = files.map(f => f.path);
    } else {
        // Fallback for filesUpdated list if no file blocks were found
        const filesUpdatedMatch = rawText.match(FILES_UPDATED_LIST_REGEX);
        if (filesUpdatedMatch && filesUpdatedMatch[1]) {
            filesUpdatedList.push(...filesUpdatedMatch[1]
                .split('\n')
                .map(line => {
                    const backtickMatch = /`([^`]+)`/.exec(line);
                    return backtickMatch ? backtickMatch[1].trim() : '';
                })
                .filter(line => line.length > 0 && line.includes('.'))
            );
        }
    }


    return {
        summary,
        courseOfAction,
        filesUpdated: [...new Set(filesUpdatedList)], // Ensure uniqueness
        files,
    };
}