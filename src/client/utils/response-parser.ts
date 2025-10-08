// src/client/utils/response-parser.ts
// Updated on: C114 (Final review of newline logic)
import { ParsedResponse, ParsedFile } from '@/common/types/pcpp.types';

const SUMMARY_REGEX = /<summary>([\s\S]*?)<\/summary>/;
const COURSE_OF_ACTION_REGEX = /<course_of_action>([\s\S]*?)<\/course_of_action>/;
const CURATOR_ACTIVITY_REGEX = /<curator_activity>([\s\S]*?)<\/curator_activity>/;
const FILE_TAG_REGEX = /<file path="([^"]+)">([\s\S]*?)(?:<\/file_path>|<\/file>|<\/filepath>|<\/file_artifact>)/g;
const CODE_FENCE_START_REGEX = /^\s*```[a-zA-Z]*\n/;

// Hybrid parsing regexes
const HYBRID_SUMMARY_REGEX = /"summary"\s*:\s*"((?:\\"|[^"])*)"/;
const HYBRID_COA_REGEX = /"course_of_action"\s*:\s*(\[[\s\S]*?\])/;
const HYBRID_CURATOR_REGEX = /"curator_activity"\s*:\s*"((?:\\"|[^"])*)"/;
const HYBRID_FILE_OBJ_REGEX = /\{\s*"path"\s*:\s*"((?:\\"|[^"])*)"\s*,\s*"content"\s*:\s*"((?:\\"|[^"])*)"\s*\}/g;


export function parseResponse(rawText: string): ParsedResponse {
    let textToParse = rawText.trim();
    
    if (textToParse.startsWith('```json')) {
        textToParse = textToParse.substring(7);
        if (textToParse.endsWith('```')) {
            textToParse = textToParse.slice(0, -3);
        }
        textToParse = textToParse.trim();
    }

    // Stage 1: Attempt to parse as a single, valid JSON object
    try {
        const jsonResponse = JSON.parse(textToParse);
        if (jsonResponse.summary && jsonResponse.course_of_action && Array.isArray(jsonResponse.files)) {
            const files: ParsedFile[] = jsonResponse.files.map((f: any) => {
                // This correctly un-escapes newlines and quotes from the JSON string value.
                const content = (f.content || '').replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\'/g, "'");
                return {
                    path: f.path || '',
                    content: content,
                    tokenCount: Math.ceil(content.length / 4),
                };
            });

            const courseOfAction = Array.isArray(jsonResponse.course_of_action)
                ? jsonResponse.course_of_action
                    .map((step: any) => `* **Step ${step.step}:** ${step.description}`)
                    .join('\n')
                : jsonResponse.course_of_action;

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
        // JSON parsing failed, proceed to hybrid/XML parsing
    }

    // Stage 2: Hybrid JSON/Regex parsing for malformed JSON
    const summaryMatchHybrid = textToParse.match(HYBRID_SUMMARY_REGEX);
    const coaMatchHybrid = textToParse.match(HYBRID_COA_REGEX);
    const curatorMatchHybrid = textToParse.match(HYBRID_CURATOR_REGEX);
    const fileMatchesHybrid = [...textToParse.matchAll(HYBRID_FILE_OBJ_REGEX)];

    if (summaryMatchHybrid && fileMatchesHybrid.length > 0) {
        const files: ParsedFile[] = fileMatchesHybrid.map(match => {
            const content = (match[2] || '').replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\'/g, "'");
            return {
                path: match[1] || '',
                content: content,
                tokenCount: Math.ceil(content.length / 4)
            };
        });

        let courseOfAction = "Could not parse course of action.";
        if (coaMatchHybrid?.[1]) {
            try {
                const coaArray = JSON.parse(coaMatchHybrid[1]);
                courseOfAction = coaArray.map((step: any) => `* **Step ${step.step}:** ${step.description}`).join('\n');
            } catch { /* ignore parse error */ }
        }

        return {
            summary: (summaryMatchHybrid[1] || '').replace(/\\"/g, '"'),
            courseOfAction,
            curatorActivity: (curatorMatchHybrid?.[1] || '').replace(/\\"/g, '"'),
            filesUpdated: files.map(f => f.path),
            files,
            totalTokens: files.reduce((sum, file) => sum + file.tokenCount, 0),
        };
    }

    // Stage 3: Fallback to existing XML regex-based parsing
    const fileMap = new Map<string, ParsedFile>();
    let totalTokens = 0;
    let processedText = textToParse;
    const finalResponseMarker = 'assistantfinal';
    const markerIndex = processedText.indexOf(finalResponseMarker);
    if (markerIndex !== -1) {
        processedText = processedText.substring(markerIndex + finalResponseMarker.length);
        processedText = processedText.replace(/^.>/, '').trim();
    }

    const tagMatches = [...processedText.matchAll(FILE_TAG_REGEX)];
    if (tagMatches.length === 0 && (processedText.includes('<file path') || !processedText.match(SUMMARY_REGEX))) {
        const summary = `**PARSING FAILED:** Could not find a valid JSON object or XML tags. The response may be malformed or incomplete. Displaying raw response below.\n\n---\n\n${processedText}`;
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