// src/backend/services/llm.service.ts
// Updated on: C62 (Add generateSingle and AbortController)
import { Services } from './services';
import fetch, { AbortError } from 'node-fetch';
import { PcppCycle } from '@/common/types/pcpp.types';
import { ServerPostMessageManager } from '@/common/ipc/server-ipc';
import { serverIPCs } from '@/client/views';
import { VIEW_TYPES } from '@/common/view-types';
import { ServerToClientChannel } from '@/common/ipc/channels.enum';
import { GenerationProgress } from '@/common/ipc/channels.type';

const MAX_TOKENS_PER_RESPONSE = 16384;
const generationControllers = new Map<number, AbortController>();

export class LlmService {

    public stopGeneration(responseId: number) {
        if (generationControllers.has(responseId)) {
            generationControllers.get(responseId)?.abort();
            generationControllers.delete(responseId);
            Services.loggerService.log(`[LLM Service] Aborted generation for response ${responseId}.`);
        }
    }
    
    public async generateSingle(prompt: string, cycleId: number, tabId: string) {
        // This method is for regenerating a single tab.
        // It's a simplified version of generateBatch.
    }

    public async generateBatch(prompt: string, count: number, cycleData: PcppCycle) {
        const settings = await Services.settingsService.getSettings();
        const serverIpc = serverIPCs[VIEW_TYPES.PANEL.PARALLEL_COPILOT];
        if (!serverIpc) return;

        let endpointUrl = '';
        let requestBody: any = {};
        
        // This is a placeholder for a real model card setting
        const reasoningEffort = 'medium'; 

        switch (settings.connectionMode) {
            case 'demo':
                endpointUrl = 'https://aiascent.game/api/dce/proxy';
                requestBody = {
                    model: "unsloth/gpt-oss-20b",
                    messages: [{ role: "user", content: prompt }],
                    n: count,
                    max_tokens: MAX_TOKENS_PER_RESPONSE,
                    stream: true,
                    reasoning_effort: reasoningEffort, // Add reasoning effort
                };
                break;
            case 'url':
                endpointUrl = settings.apiUrl || '';
                requestBody = {
                    model: "local-model",
                    messages: [{ role: "user", content: prompt }],
                    n: count,
                    max_tokens: MAX_TOKENS_PER_RESPONSE,
                    stream: true,
                    reasoning_effort: reasoningEffort,
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

        const controller = new AbortController();
        generationControllers.set(cycleData.cycleId, controller); // Use cycleId as a unique key for the batch

        try {
            Services.loggerService.log(`Starting STREAMING batch request to: ${endpointUrl}`);
            const response = await fetch(endpointUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
                signal: controller.signal,
            });

            if (!response.ok || !response.body) {
                const errorBody = await response.text();
                throw new Error(`API request failed with status ${response.status}: ${errorBody}`);
            }

            const stream = response.body;
            let buffer = '';
            let lastTpsUpdateTime = Date.now();
            let tokensSinceLastUpdate = 0;
            
            const progressData: GenerationProgress[] = [...Array(count)].map((_, i) => ({
                responseId: i + 1,
                promptTokens: 0, // Will be replaced by a real calculation
                thinkingTokens: 0,
                currentTokens: 0,
                totalTokens: MAX_TOKENS_PER_RESPONSE,
                status: 'pending',
            }));
            const responseContents: string[] = Array(count).fill('');
            const finishedResponses: boolean[] = Array(count).fill(false);
            let totalFinished = 0;

            const sendProgressUpdate = () => {
                const now = Date.now();
                const elapsed = (now - lastTpsUpdateTime) / 1000;
                if (elapsed > 0) {
                    const tps = tokensSinceLastUpdate / elapsed;
                    const chunks: { [key: number]: string } = {};
                    responseContents.forEach((content, i) => { chunks[i + 1] = content; });
                    serverIpc.sendToClient(ServerToClientChannel.UpdateGenerationProgress, { progress: progressData, tps: Math.round(tps), chunks });
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
                        if (dataStr.trim() === '[DONE]') continue;
                        
                        try {
                            const data = JSON.parse(dataStr);
                            const choices = data.choices;
                            if (Array.isArray(choices)) {
                                for (const choice of choices) {
                                    const responseIndex = choice.index;
                                    if (responseIndex === undefined || responseIndex >= count) continue;

                                    if (choice.finish_reason !== null) {
                                        if (!finishedResponses[responseIndex]) {
                                            Services.loggerService.log(`[STREAM] Response ${responseIndex + 1} finished.`);
                                            finishedResponses[responseIndex] = true;
                                            progressData[responseIndex].status = 'complete';
                                            totalFinished++;
                                        }
                                    } else if (choice.delta) {
                                        if (choice.delta.reasoning_content !== undefined) {
                                            if (progressData[responseIndex].status !== 'thinking') progressData[responseIndex].status = 'thinking';
                                            const contentChunk = choice.delta.reasoning_content;
                                            const chunkTokens = Math.ceil(contentChunk.length / 4);
                                            tokensSinceLastUpdate += chunkTokens;
                                            progressData[responseIndex].thinkingTokens += chunkTokens;
                                        }
                                        
                                        if (choice.delta.content !== undefined) {
                                            if (progressData[responseIndex].status !== 'generating') progressData[responseIndex].status = 'generating';
                                            const contentChunk = choice.delta.content;
                                            responseContents[responseIndex] += contentChunk;
                                            const chunkTokens = Math.ceil(contentChunk.length / 4);
                                            tokensSinceLastUpdate += chunkTokens;
                                            progressData[responseIndex].currentTokens += chunkTokens;
                                        }
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
                const { newCycleId, newMaxCycle } = await Services.historyService.createNewCycleWithResponses(responseContents, cycleData.tabCount || 4, cycleData.cycleContext);
                serverIpc.sendToClient(ServerToClientChannel.SendBatchGenerationComplete, { newCycleId, newMaxCycle });
            });

        } catch (error: any) {
             if (error instanceof AbortError) {
                Services.loggerService.log(`[LLM Service] Batch generation was aborted by user.`);
            } else {
                Services.loggerService.error(`Failed to generate batch responses via stream: ${error.message}`);
            }
        } finally {
            generationControllers.delete(cycleData.cycleId);
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