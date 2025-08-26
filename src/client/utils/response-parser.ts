// Updated on: C148 (Fix Course of Action regex)
import { ParsedResponse, ParsedFile } from '@/common/types/pcpp.types';

const SUMMARY_REGEX = /^([\s\S]*?)(?=### Course of [Aa]ction|### Files Updated This Cycle|<file path=")/;
// C148: Updated regex to anchor terminators to the start of a line to prevent premature matching.
const COURSE_OF_ACTION_REGEX = /### Course of [Aa]ction\s*([\s\S]+?)(?=^\s*### Files Updated This Cycle|^\s*<file path=")/gim;
const FILES_UPDATED_LIST_REGEX = /### Files Updated This Cycle\s*([\s\S]*?)(?=<file path="|`{3,}|$)/m;
const FILE_TAG_REGEX = /<file path="([^"]+)">([\s\S]*?)<\/file>/g;
const CODE_FENCE_START_REGEX = /^\s*```[a-zA-Z]*\n/;

export function parseResponse(rawText: string): ParsedResponse {
    const files: ParsedFile[] = [];
    let filesUpdatedList: string[] = [];
    let totalTokens = 0;

    const tagMatches = [...rawText.matchAll(FILE_TAG_REGEX)];

    for (const match of tagMatches) {
        const path = (match?.[1] ?? '').trim();
        let content = (match?.[2] ?? '');

        if (path) {
            content = content.replace(CODE_FENCE_START_REGEX, '');
            const patternsToRemove = [`</file>`, `</${path}>`, '```', '***'];
            let changed = true;
            while(changed) {
                const originalContent = content;
                for (const pattern of patternsToRemove) {
                    if (content.trim().endsWith(pattern)) {
                        content = content.trim().slice(0, -pattern.length);
                    }
                }
                if (content === originalContent) {
                    changed = false;
                }
            }
            content = content.trim();
            const tokenCount = Math.ceil(content.length / 4);
            totalTokens += tokenCount;
            files.push({ path, content, tokenCount });
        }
    }

    const summaryMatch = rawText.match(SUMMARY_REGEX);
    
    // Handle duplicate sections by taking the last match
    const coaMatches = [...rawText.matchAll(COURSE_OF_ACTION_REGEX)];
    const lastCoaMatch = coaMatches.length > 0 ? coaMatches[coaMatches.length - 1] : null;

    const summary = (summaryMatch?.[1] ?? 'Could not parse summary.').trim();
    const courseOfAction = (lastCoaMatch?.[1] ?? 'Could not parse course of action.').trim();

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
        totalTokens,
    };
}