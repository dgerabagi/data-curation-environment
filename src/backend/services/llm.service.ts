// src/backend/services/llm.service.ts
// Updated on: C58 (Correct SSE index parsing)
import { Services } from './services';
import fetch from 'node-fetch';
import { PcppCycle } from '@/common/types/pcpp.types';
import { ServerPostMessageManager } from '@/common/ipc/server-ipc';
import { serverIPCs } from '@/client/views';
import { VIEW_TYPES } from '@/common/view-types';
import { ServerToClientChannel } from '@/common/ipc/channels.enum';
import { GenerationProgress } from '@/common/ipc/channels.type';
import { logger } from '@/client/utils/logger';

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
            const responseContents: string[] = Array(count).fill('');
            const finishedResponses: boolean[] = Array(count).fill(false);
            let totalFinished = 0;

            const sendProgressUpdate = () => {
                const now = Date.now();
                const elapsed = (now - lastTpsUpdateTime) / 1000;
                if (elapsed > 0) {
                    const tps = tokensSinceLastUpdate / elapsed;
                    const chunks: { [key: number]: string } = {};
                    responseContents.forEach((content, i) => {
                        chunks[i + 1] = content;
                    });

                    serverIpc.sendToClient(ServerToClientChannel.UpdateGenerationProgress, {
                        progress: progressData,
                        tps: Math.round(tps),
                        chunks,
                    });
                    tokensSinceLastUpdate = 0;
                    lastTpsUpdateTime = now;
                }
            };
            const throttledSendProgress = this.throttle(sendProgressUpdate, 200);

            stream.on('data', (chunk) => {
                buffer += chunk.toString();
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const dataStr = line.substring(6);
                        if (dataStr.trim() === '[DONE]') {
                            continue;
                        }
                        
                        try {
                            const data = JSON.parse(dataStr);
                            // FIX C58: Correctly access the nested index property
                            const choices = data.choices;
                            if (Array.isArray(choices)) {
                                for (const choice of choices) {
                                    const responseIndex = choice.index;
                                    
                                    if (responseIndex === undefined || responseIndex >= count) {
                                        Services.loggerService.warn(`Received chunk with invalid index: ${responseIndex}`);
                                        continue;
                                    }

                                    if (choice.finish_reason !== null) {
                                        if (!finishedResponses[responseIndex]) {
                                            Services.loggerService.log(`[STREAM] Response ${responseIndex + 1} finished.`);
                                            finishedResponses[responseIndex] = true;
                                            totalFinished++;
                                        }
                                    } else if (choice.delta && choice.delta.content) {
                                        const contentChunk = choice.delta.content;
                                        responseContents[responseIndex] += contentChunk;
                                        tokensSinceLastUpdate++;
                                        progressData[responseIndex].currentTokens++;
                                    }
                                }
                            }
                        } catch (e) {
                            Services.loggerService.warn(`Could not parse SSE chunk: ${dataStr}`);
                        }
                    }
                }
                throttledSendProgress();
            });

            stream.on('end', async () => {
                Services.loggerService.log(`LLM stream ended. Total finished responses: ${totalFinished}/${count}`);
                
                sendProgressUpdate(); // Final update

                if (totalFinished < count) {
                    Services.loggerService.warn(`Stream ended but only ${totalFinished}/${count} responses were marked as finished.`);
                }

                const { newCycleId, newMaxCycle } = await Services.historyService.createNewCycleWithResponses(responseContents, cycleData.tabCount || 4, cycleData.cycleContext);
                serverIpc.sendToClient(ServerToClientChannel.SendBatchGenerationComplete, { newCycleId, newMaxCycle });
            });

        } catch (error: any) {
            Services.loggerService.error(`Failed to generate batch responses via stream: ${error.message}`);
        }
    }

    private throttle(func: (...args: any[]) => void, limit: number) {
        let inThrottle: boolean;
        let lastFunc: NodeJS.Timeout;
        let lastRan: number;
        return function(this: any, ...args: any[]) {
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                lastRan = Date.now();
                inThrottle = true;
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        };
    }
}