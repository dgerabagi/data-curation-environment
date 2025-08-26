// src/client/utils/response-parser.ts
// Updated on: C154 (Switch to XML tags for summary and course of action)
import { ParsedResponse, ParsedFile } from '@/common/types/pcpp.types';

const SUMMARY_REGEX = /<summary>([\s\S]*?)<\/summary>/;
const COURSE_OF_ACTION_REGEX = /<course_of_action>([\s\S]*?)<\/course_of_action>/;
const FILE_TAG_REGEX = /<file path="([^"]+)">([\s\S]*?)<\/file>/g;
const CODE_FENCE_START_REGEX = /^\s*```[a-zA-Z]*\n/;

export function parseResponse(rawText: string): ParsedResponse {
    const files: ParsedFile[] = [];
    let totalTokens = 0;

    const tagMatches = [...rawText.matchAll(FILE_TAG_REGEX)];

    if (tagMatches.length === 0 && rawText.includes('<file path')) {
        const summary = `**PARSING FAILED:** Could not find valid \`<file path="...">\` tags. The response may be malformed or incomplete. Displaying raw response below.\n\n---\n\n${rawText}`;
        return {
            summary: summary,
            courseOfAction: '',
            filesUpdated: [],
            files: [],
            totalTokens: Math.ceil(rawText.length / 4),
        };
    }

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
    const courseOfActionMatch = rawText.match(COURSE_OF_ACTION_REGEX);

    const summary = (summaryMatch?.[1] ?? 'Could not parse summary.').trim();
    const courseOfAction = (courseOfActionMatch?.[1] ?? 'Could not parse course of action.').trim();
    
    const filesUpdatedList = files.map(f => f.path);

    // Fallback if no file tags are found at all
    if (files.length === 0 && !summaryMatch && !courseOfActionMatch) {
        return {
            summary: rawText,
            courseOfAction: '',
            filesUpdated: [],
            files: [],
            totalTokens: Math.ceil(rawText.length / 4),
        };
    }

    return {
        summary,
        courseOfAction,
        filesUpdated: [...new Set(filesUpdatedList)],
        files,
        totalTokens,
    };
}