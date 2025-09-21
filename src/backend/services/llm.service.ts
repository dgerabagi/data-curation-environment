// src/backend/services/llm.service.ts
// New file in C37
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
            
            // This is a simplified example. A real implementation would need to
            // construct a proper OpenAI-compatible request body.
            const response = await fetch(endpointUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    // Assuming the endpoint supports a similar structure to OpenAI completions
                    model: "local-model", // This might need to be configurable
                    prompt: prompt,
                    n: count,
                    max_tokens: 4096, // A reasonable default
                    stream: false // For this cycle, we are not streaming
                }),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`API request failed with status ${response.status}: ${errorBody}`);
            }

            const responseData = await response.json() as any;
            
            // Assuming OpenAI-like response structure
            if (responseData.choices && Array.isArray(responseData.choices)) {
                const results = responseData.choices.map((choice: any) => choice.text || '');
                Services.loggerService.log(`Received ${results.length} responses from LLM.`);
                return results;
            } else {
                throw new Error("Invalid response structure from LLM endpoint.");
            }

        } catch (error: any) {
            Services.loggerService.error(`Failed to generate batch responses: ${error.message}`);
            return [];
        }
    }
}