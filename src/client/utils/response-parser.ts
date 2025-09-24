// src/client/utils/response-parser.ts
// Updated on: C51 (Implement JSON-first parsing with regex fallback)
import { ParsedResponse, ParsedFile } from '@/common/types/pcpp.types';

const SUMMARY_REGEX = /<summary>([\s\S]*?)<\/summary>/;
const COURSE_OF_ACTION_REGEX = /<course_of_action>([\s\S]*?)<\/course_of_action>/;
const CURATOR_ACTIVITY_REGEX = /<curator_activity>([\s\S]*?)<\/curator_activity>/;
const FILE_TAG_REGEX = /<file path="([^"]+)">([\s\S]*?)(?:<\/file_path>|<\/file>|<\/filepath>|<\/file_artifact>)/g;
const CODE_FENCE_START_REGEX = /^\s*```[a-zA-Z]*\n/;

export function parseResponse(rawText: string): ParsedResponse {
    // Attempt to parse as JSON first for Harmony structured output
        try {
        const jsonResponse = JSON.parse(rawText);
            if (jsonResponse.summary && jsonResponse.course_of_action && Array.isArray(jsonResponse.files)) {
                const files: ParsedFile[] = jsonResponse.files.map((f: any) => ({
                    path: f.path || '',
                    content: f.content || '',
                    tokenCount: Math.ceil((f.content || '').length / 4),
                }));

                const courseOfAction = Array.isArray(jsonResponse.course_of_action)
                    ? jsonResponse.course_of_action
                        .map((step: any) => `* **Step ${step.step}:** ${step.description}`)
                        .join('\n')
                : jsonResponse.course_of_action; // Handle if it's already a string

                return {
                    summary: jsonResponse.summary,
                    courseOfAction: courseOfAction,
                    curatorActivity: jsonResponse.curator_activity || '',
                    filesUpdated: files.map(f => f.path),
                    files: files,
                    totalTokens: files.reduce((sum, file) => sum + file.tokenCount, 0),
                };
            }
    } catch (e) {
        // Not a valid JSON object that matches our schema, proceed with regex parsing
    }

    // Fallback to existing regex-based parsing
    const fileMap = new Map<string, ParsedFile>();
    let totalTokens = 0;

    let processedText = rawText.replace(/</g, '<').replace(/>/g, '>').replace(/_/g, '_');

    const finalResponseMarker = 'assistantfinal';
    const markerIndex = processedText.indexOf(finalResponseMarker);
    if (markerIndex !== -1) {
        processedText = processedText.substring(markerIndex + finalResponseMarker.length);
        processedText = processedText.replace(/^.>/, '').trim();
    }

    const tagMatches = [...processedText.matchAll(FILE_TAG_REGEX)];

    if (tagMatches.length === 0 && (processedText.includes('<file path') || !processedText.match(SUMMARY_REGEX))) {
        const summary = `**PARSING FAILED:** Could not find valid \`<file path="...">...</file_artifact>\` tags or a valid JSON object. The response may be malformed or incomplete. Displaying raw response below.\n\n---\n\n${processedText}`;
        return { summary, courseOfAction: '', filesUpdated: [], files: [], totalTokens: Math.ceil(processedText.length / 4) };
    }

    for (const match of tagMatches) {
        const path = (match?.[1] ?? '').trim();
        let content = (match?.[2] ?? '');

        if (path) {
            content = content.replace(CODE_FENCE_START_REGEX, '');
            const patternsToRemove = [`</file_artifact>`, `</file_path>`, `</filepath>`, `</file>`, `</${path}>`, '```', '***'];
            let changed = true;
            while(changed) {
                const originalContent = content;
                for (const pattern of patternsToRemove) {
                    if (content.trim().endsWith(pattern)) {
                        content = content.trim().slice(0, -pattern.length);
                    }
                }
                if (content === originalContent) { changed = false; }
            }
            content = content.trim();
            const tokenCount = Math.ceil(content.length / 4);
            fileMap.set(path, { path, content, tokenCount });
        }
    }

    const finalFiles = Array.from(fileMap.values());
    totalTokens = finalFiles.reduce((sum, file) => sum + file.tokenCount, 0);

    const summaryMatch = processedText.match(SUMMARY_REGEX);
    const courseOfActionMatch = processedText.match(COURSE_OF_ACTION_REGEX);
    const curatorActivityMatch = processedText.match(CURATOR_ACTIVITY_REGEX);

    const summary = (summaryMatch?.[1] ?? 'Could not parse summary.').trim();
    const courseOfAction = (courseOfActionMatch?.[1] ?? 'Could not parse course of action.').trim();
    const curatorActivity = (curatorActivityMatch?.[1] ?? '').trim();
    
    const filesUpdatedList = finalFiles.map(f => f.path);

    if (finalFiles.length === 0 && !summaryMatch && !courseOfActionMatch && !curatorActivityMatch) {
        return { summary: processedText, courseOfAction: '', filesUpdated: [], files: [], totalTokens: Math.ceil(processedText.length / 4) };
    }

    return {
        summary,
        courseOfAction,
        curatorActivity,
        filesUpdated: [...new Set(filesUpdatedList)],
        files: finalFiles,
        totalTokens,
    };
}