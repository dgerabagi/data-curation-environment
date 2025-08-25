// Updated on: C130 (Fix TypeScript errors with RegExp results)
import { ParsedResponse } from '@/common/types/pcpp.types';

const SUMMARY_REGEX = /^([\s\S]*?)(?=### Course of [Aa]ction|### Files Updated This Cycle|<file path=")/;
const COURSE_OF_ACTION_REGEX = /### Course of [Aa]ction\s*([\s\S]*?)(?=### Files Updated This Cycle|<file path=")/im;
const FILES_UPDATED_LIST_REGEX = /### Files Updated This Cycle\s*([\s\S]*?)(?=<file path="|`{3,})/m;
const FILE_TAG_REGEX = /<file path="([^"]+)">([\s\S]*?)<\/file>/g;
const CODE_FENCE_START_REGEX = /^\s*```[a-zA-Z]*\n/;


export function parseResponse(rawText: string): ParsedResponse {
    const files = [];
    let filesUpdatedList: string[] = [];

    const tagMatches = [...rawText.matchAll(FILE_TAG_REGEX)];

    for (const match of tagMatches) {
        const path = (match?.[1] ?? '').trim();
        let content = (match?.[2] ?? '').trim();

        if (path) {
            // C129: Aggressive multi-pass cleanup
            content = content.replace(CODE_FENCE_START_REGEX, '');

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
                if (content === originalContent) {
                    changed = false;
                }
            }
            
            files.push({ path, content });
        }
    }

    const summaryMatch = rawText.match(SUMMARY_REGEX);
    const courseOfActionMatch = rawText.match(COURSE_OF_ACTION_REGEX);
    
    const summary = (summaryMatch?.[1] ?? 'Could not parse summary.').trim();
    const courseOfAction = (courseOfActionMatch?.[1] ?? 'Could not parse course of action.').trim();

    if (files.length > 0) {
        filesUpdatedList = files.map(f => f.path);
    } else {
        const filesUpdatedMatch = rawText.match(FILES_UPDATED_LIST_REGEX);
        if (filesUpdatedMatch?.[1]) {
            filesUpdatedList.push(...(filesUpdatedMatch[1] ?? '')
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