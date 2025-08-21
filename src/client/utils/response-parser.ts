// src/client/utils/response-parser.ts
import { ParsedResponse, ParsedFile } from "@/common/types/pcpp.types";
import { logger } from "./logger";

const SUMMARY_REGEX = /^([\s\S]*?)(?=### Course of Action|### Files Updated This Cycle|<file path=")/;
const COURSE_OF_ACTION_REGEX = /### Course of Action\s*([\s\S]*?)(?=### Files Updated This Cycle|<file path=|`{3,})/m;
const FILES_UPDATED_REGEX = /### Files Updated This Cycle\s*([\s\S]*?)(?=<file path=|`{3,})/m;
const FILE_BLOCK_REGEX = /<src\/(?:Artifacts|.+?)>([\s\S]*?)<\/src\/(?:Artifacts|.+?)>/g;
const XML_TAG_REGEX = /<src\/(?:Artifacts|.+?)>([\s\S]*?)<\/src\/(?:Artifacts|.+?)>/; // For path extraction from tag

export function parseResponse(rawText: string): ParsedResponse {
    logger.log(`[Parser] Starting to parse raw text of length ${rawText.length}`);
    
    const summaryMatch = rawText.match(SUMMARY_REGEX);
    const courseOfActionMatch = rawText.match(COURSE_OF_ACTION_REGEX);
    const filesUpdatedMatch = rawText.match(FILES_UPDATED_REGEX);

    const files: ParsedFile[] = [];
    const fileMatches = rawText.matchAll(FILE_BLOCK_REGEX);
    for (const match of fileMatches) {
        // Extract path from the full tag itself
        const fullTagMatch = match[0].match(XML_TAG_REGEX);
        const path = fullTagMatch ? `src/${fullTagMatch[1].split('>')[0]}` : 'unknown/path.ts';

        files.push({
            path: path.trim(),
            content: match[1].trim(),
        });
    }
    
    // Fallback for files updated list if the dedicated section is missing
    let filesUpdatedList: string[] = [];
    if (filesUpdatedMatch && filesUpdatedMatch[1]) {
        filesUpdatedList = filesUpdatedMatch[1]
            .split('\n')
            .map(line => line.replace(/[-\*]\s*`?/, '').replace(/`?\s*\(.*?\)/, '').trim())
            .filter(line => line.length > 0 && line.includes('/'));
    } else {
        filesUpdatedList = files.map(f => f.path);
    }

    const parsed: ParsedResponse = {
        summary: summaryMatch ? summaryMatch[1].trim() : 'Could not parse summary.',
        courseOfAction: courseOfActionMatch ? courseOfActionMatch[1].trim() : 'Could not parse course of action.',
        filesUpdated: filesUpdatedList,
        files: files,
    };

    logger.log(`[Parser] Parsing complete. Summary found: ${!!summaryMatch}, Action found: ${!!courseOfActionMatch}, Files found: ${files.length}`);
    return parsed;
}