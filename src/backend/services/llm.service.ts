// src/backend/services/llm.service.ts
// Updated on: C54 (Implement streaming client)
import { Services } from './services';
import fetch from 'node-fetch';
import { PcppCycle } from '@/common/types/pcpp.types';
import { ServerPostMessageManager } from '@/common/ipc/server-ipc';
import { serverIPCs } from '@/client/views';
import { VIEW_TYPES } from '@/common/view-types';
import { ServerToClientChannel } from '@/common/ipc/channels.enum';
import { GenerationProgress } from '@/common/ipc/channels.type';

const MAX_TOKENS_PER_RESPONSE = 8192;

export class LlmService {
    public async generateBatch(prompt: string, count: number, cycleData: PcppCycle) {
        const settings = await Services.settingsService.getSettings();
        const serverIpc = serverIPCs[VIEW_TYPES.PANEL.PARALLEL_COPILOT];
        if (!serverIpc) return;

        let endpointUrl = '';
        let requestBody: any = {};

        switch (settings.connectionMode) {
            case 'demo':
                endpointUrl = 'https://aiascent.game/api/dce/proxy';
                requestBody = {
                    model: "unsloth/gpt-oss-20b",
                    messages: [{ role: "user", content: prompt }],
                    n: count,
                    max_tokens: MAX_TOKENS_PER_RESPONSE,
                    stream: true,
                    response_format: { "type": "json_object" }
                };
                break;
            case 'url':
                endpointUrl = settings.apiUrl || '';
                requestBody = {
                    model: "local-model",
                    messages: [{ role: "user", content: prompt }],
                    n: count,
                    max_tokens: MAX_TOKENS_PER_RESPONSE,
                    stream: true
                };
                break;
            default:
                Services.loggerService.error("Attempted to call LLM in manual mode.");
                return;
        }

        if (!endpointUrl) {
            Services.loggerService.error("LLM endpoint URL is not configured.");
            return;
        }

        try {
            Services.loggerService.log(`Starting STREAMING batch request to: ${endpointUrl}`);
            const response = await fetch(endpointUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok || !response.body) {
                const errorBody = await response.text();
                throw new Error(`API request failed with status ${response.status}: ${errorBody}`);
            }

            const stream = response.body;
            let buffer = '';
            let lastTpsUpdateTime = Date.now();
            let tokensSinceLastUpdate = 0;
            const progressData: GenerationProgress[] = [...Array(count)].map((_, i) => ({ responseId: i + 1, currentTokens: 0, totalTokens: MAX_TOKENS_PER_RESPONSE }));
            const responseContents: { [key: number]: string } = {};

            stream.on('data', (chunk) => {
                buffer += chunk.toString();
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const dataStr = line.substring(6);
                        if (dataStr === '[DONE]') continue;
                        
                        try {
                            const data = JSON.parse(dataStr);
                            const choice = data.choices;
                            if (choice && choice.delta && choice.delta.content) {
                                const responseId = choice.index + 1;
                                const contentChunk = choice.delta.content;
                                
                                responseContents[responseId] = (responseContents[responseId] || '') + contentChunk;
                                tokensSinceLastUpdate += 1; // Approx 1 token per chunk
                                progressData[choice.index].currentTokens += 1; // Rough approximation
                            }
                        } catch (e) {
                            Services.loggerService.warn(`Could not parse SSE chunk: ${dataStr}`);
                        }
                    }
                }

                const now = Date.now();
                const elapsed = (now - lastTpsUpdateTime) / 1000;
                if (elapsed >= 0.2) { // Update 5 times per second
                    const tps = tokensSinceLastUpdate / elapsed;
                    serverIpc.sendToClient(ServerToClientChannel.UpdateGenerationProgress, {
                        progress: progressData,
                        tps: Math.round(tps),
                        chunks: responseContents,
                    });
                    tokensSinceLastUpdate = 0;
                    lastTpsUpdateTime = now;
                }
            });

            stream.on('end', async () => {
                Services.loggerService.log('LLM stream ended.');
                const finalResponses = Object.values(responseContents);
                const { newCycleId, newMaxCycle } = await Services.historyService.createNewCycleWithResponses(finalResponses, cycleData.tabCount || 4, cycleData.cycleContext);
                serverIpc.sendToClient(ServerToClientChannel.SendBatchGenerationComplete, { newCycleId, newMaxCycle });
            });

        } catch (error: any) {
            Services.loggerService.error(`Failed to generate batch responses via stream: ${error.message}`);
        }
    }
}