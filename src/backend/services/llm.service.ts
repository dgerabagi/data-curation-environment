// src/backend/services/llm.service.ts
// Updated on: C48 (Remove hardcoded max_tokens)
import { Services } from './services';
import fetch from 'node-fetch';
import { PcppCycle } from '@/common/types/pcpp.types';

export class LlmService {
    public async generateBatch(prompt: string, count: number, cycleData: PcppCycle): Promise<string[]> {
        const settings = await Services.settingsService.getSettings();
        let endpointUrl = '';

        switch (settings.connectionMode) {
            case 'demo':
                endpointUrl = 'https://aiascent.game/api/dce/proxy'; // Pre-configured
                break;
            case 'url':
                endpointUrl = settings.apiUrl || '';
                break;
            default:
                Services.loggerService.error("Attempted to call LLM in manual mode.");
                return [];
        }

        if (!endpointUrl) {
            Services.loggerService.error("LLM endpoint URL is not configured.");
            return [];
        }

        try {
            Services.loggerService.log(`Sending batch request for ${count} responses to: ${endpointUrl}`);
            
            const response = await fetch(endpointUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: "unsloth/gpt-oss-20b",
                    prompt: prompt,
                    n: count,
                    // max_tokens is removed to let the server use its default.
                    // This prevents errors where prompt_tokens + max_tokens > context_window.
                    stream: false
                }),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`API request failed with status ${response.status}: ${errorBody}`);
            }

            const responseData = await response.json() as any;
            
            if (responseData.responses && Array.isArray(responseData.responses)) {
                const results = responseData.responses;
                Services.loggerService.log(`Received ${results.length} responses from LLM.`);
                return results;
            } else {
                throw new Error("Invalid response structure from LLM endpoint.");
            }

        } catch (error: any) {
            Services.loggerService.error(`Failed to generate batch responses: ${error.message}`);
            // Return an empty array of the correct size to create an empty cycle for inspection
            return Array(count).fill('');
        }
    }
}