// Updated on: C109 (Implement robust two-stage parsing)
import { ParsedResponse, ParsedFile } from "@/common/types/pcpp.types";

// Regex to find the summary/plan before any major headers
const SUMMARY_REGEX = /^([\s\S]*?)(?=### Course of Action|### Files Updated This Cycle|<file path=")/;

// Regex to find the course of action
const COURSE_OF_ACTION_REGEX = /### Course of Action\s*([\s\S]*?)(?=### Files Updated This Cycle|<file path=")/m;

// Regex for the "Files Updated" markdown list (as a fallback)
const FILES_UPDATED_LIST_REGEX = /### Files Updated This Cycle\s*([\s\S]*?)(?=<file path="|`{3,})/m;

// C109: New approach - Find file tags first, then extract content between them.
const FILE_TAG_REGEX = /<file path="([^"]+)">/g;


export function parseResponse(rawText: string): ParsedResponse {
    const files: ParsedFile[] = [];
    const filesUpdatedList: string[] = [];

    // Stage 1: Find all file tags and their positions
    const tagMatches = [...rawText.matchAll(FILE_TAG_REGEX)];

    // Stage 2: Extract content between tags
    tagMatches.forEach((match, index) => {
        const path = match[1].trim();
        const contentStart = match.index! + match[0].length;
        
        const nextMatch = tagMatches[index + 1];
        const contentEnd = nextMatch ? nextMatch.index! : rawText.length;
        
        let content = rawText.substring(contentStart, contentEnd).trim();

        // Clean up potential closing tags from the end of the content
        const closingTagSimple = `</file>`;
        const closingTagWithPath = `</${path}>`;
        if (content.endsWith(closingTagSimple)) {
            content = content.slice(0, -closingTagSimple.length).trim();
        } else if (content.endsWith(closingTagWithPath)) {
            content = content.slice(0, -closingTagWithPath.length).trim();
        }

        files.push({ path, content });
        filesUpdatedList.push(path);
    });

    // Extract summary and course of action using the file tags as boundaries
    const summaryMatch = rawText.match(SUMMARY_REGEX);
    const courseOfActionMatch = rawText.match(COURSE_OF_ACTION_REGEX);
    
    const summary = summaryMatch ? summaryMatch[1].trim() : 'Could not parse summary.';
    const courseOfAction = courseOfActionMatch ? courseOfActionMatch[1].trim() : 'Could not parse course of action.';

    // Fallback for filesUpdated list if no file blocks were found
    if (filesUpdatedList.length === 0) {
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