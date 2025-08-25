// Updated on: C128 (Add more aggressive cleanup for parser artifacts)
import { ParsedResponse, ParsedFile } from "@/common/types/pcpp.types";

const SUMMARY_REGEX = /^([\s\S]*?)(?=### Course of [Aa]ction|### Files Updated This Cycle|<file path=")/;
const COURSE_OF_ACTION_REGEX = /### Course of [Aa]ction\s*([\s\S]*?)(?=### Files Updated This Cycle|<file path=")/im;
const FILES_UPDATED_LIST_REGEX = /### Files Updated This Cycle\s*([\s\S]*?)(?=<file path="|`{3,})/m;
const FILE_TAG_REGEX = /<file path="([^"]+)">/g;
const CODE_FENCE_START_REGEX = /^\s*```[a-zA-Z]*\n/;


export function parseResponse(rawText: string): ParsedResponse {
    const files: ParsedFile[] = [];
    let filesUpdatedList: string[] = [];

    const tagMatches = [...rawText.matchAll(FILE_TAG_REGEX)];

    tagMatches.forEach((match, index) => {
        const path = (match[1] ?? '').trim();
        const contentStart = match.index! + match[0].length;
        
        const nextMatch = tagMatches[index + 1];
        const contentEnd = nextMatch ? nextMatch.index! : rawText.length;
        
        let content = rawText.substring(contentStart, contentEnd);

        // C128: Aggressive multi-pass cleanup
        content = content.trim();

        // 1. Remove starting code fence (e.g., ```typescript)
        content = content.replace(CODE_FENCE_START_REGEX, '');

        // 2. Repeatedly remove known trailing artifacts until no more changes occur.
        const patternsToRemove = [
            `</file>`,
            `</${path}>`,
            '```',
            '***'
        ];

        let changed = true;
        while(changed) {
            const originalContent = content;
            for (const pattern of patternsToRemove) {
                if (content.trim().endsWith(pattern)) {
                    content = content.trim().slice(0, -pattern.length).trim();
                }
            }
            // If no pattern was removed in a full pass, exit the loop
            if (content === originalContent) {
                changed = false;
            }
        }
        
        files.push({ path, content });
    });

    const summaryMatch = rawText.match(SUMMARY_REGEX);
    const courseOfActionMatch = rawText.match(COURSE_OF_ACTION_REGEX);
    
    const summary = summaryMatch && summaryMatch[1] ? summaryMatch[1].trim() : 'Could not parse summary.';
    const courseOfAction = courseOfActionMatch && courseOfActionMatch[1] ? courseOfActionMatch[1].trim() : 'Could not parse course of action.';

    if (files.length > 0) {
        filesUpdatedList = files.map(f => f.path);
    } else {
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
        filesUpdated: [...new Set(filesUpdatedList)],
        files,
    };
}