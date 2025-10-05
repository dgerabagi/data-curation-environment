// src/backend/services/llm.service.ts
// Updated on: C99 (Implement generateSingle method)
import { Services } from './services';
import fetch, { AbortError } from 'node-fetch';
import { PcppCycle, PcppResponse } from '@/common/types/pcpp.types';
import { ServerPostMessageManager } from '@/common/ipc/server-ipc';
import { serverIPCs } from '@/client/views';
import { VIEW_TYPES } from '@/common/view-types';
import { ServerToClientChannel } from '@/common/ipc/channels.enum';
import { GenerationProgress } from '@/common/ipc/channels.type';

const MAX_TOKENS_PER_RESPONSE = 16384;
const generationControllers = new Map<number, AbortController>();

export class LlmService {

    public stopGeneration(cycleId: number) {
        if (generationControllers.has(cycleId)) {
            Services.loggerService.log(`[LLM Service] Aborting generation for cycle ${cycleId}.`);
            generationControllers.get(cycleId)?.abort();
            generationControllers.delete(cycleId);
        }
    }
    
    public async generateSingle(prompt: string, cycleId: number, tabId: string) {
        Services.loggerService.log(`[LLM Service] Starting single regeneration for cycle ${cycleId}, tab ${tabId}.`);
        await Services.historyService.updateSingleResponseInCycle(cycleId, tabId, null); // Set status to 'generating'

        const settings = await Services.settingsService.getSettings();
        const serverIpc = serverIPCs[VIEW_TYPES.PANEL.PARALLEL_COPILOT];
        if (!serverIpc) return;

        let endpointUrl = '';
        let requestBody: any = {};
        const reasoningEffort = 'medium';

        switch (settings.connectionMode) {
            case 'demo':
                endpointUrl = 'https://aiascent.game/api/dce/proxy';
                requestBody = { model: "unsloth/gpt-oss-20b", messages: [{ role: "user", content: prompt }], n: 1, max_tokens: MAX_TOKENS_PER_RESPONSE, stream: true, reasoning_effort: reasoningEffort };
                break;
            case 'url':
                endpointUrl = settings.apiUrl || '';
                requestBody = { model: "local-model", messages: [{ role: "user", content: prompt }], n: 1, max_tokens: MAX_TOKENS_PER_RESPONSE, stream: true, reasoning_effort: reasoningEffort };
                break;
            default: return;
        }

        const controller = new AbortController();
        generationControllers.set(cycleId, controller); // Note: This might need a more granular key for concurrent single-gens

        try {
            const response = await fetch(endpointUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody),
                signal: controller.signal,
            });

            if (!response.ok || !response.body) {
                const errorBody = await response.text();
                throw new Error(`API request failed: ${response.status} ${errorBody}`);
            }

            const stream = response.body;
            let buffer = '';
            let responseContent = '';
            const richResponse: PcppResponse = { content: '', status: 'pending', startTime: Date.now() };
            const progress: GenerationProgress = { responseId: parseInt(tabId, 10), promptTokens: 0, thinkingTokens: 0, currentTokens: 0, totalTokens: MAX_TOKENS_PER_RESPONSE, status: 'pending', startTime: Date.now() };

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
                            if (data.choices?.finish_reason !== null) {
                                richResponse.status = 'complete';
                                richResponse.endTime = Date.now();
                                progress.status = 'complete';
                            } else if (data.choices?.delta) {
                                if (data.choices.delta.reasoning_content) {
                                    if (richResponse.status !== 'thinking') { richResponse.status = 'thinking'; progress.status = 'thinking'; }
                                    const contentChunk = data.choices.delta.reasoning_content;
                                    const chunkTokens = Math.ceil(contentChunk.length / 4);
                                    richResponse.thinkingTokens = (richResponse.thinkingTokens || 0) + chunkTokens;
                                    progress.thinkingTokens += chunkTokens;
                                }
                                if (data.choices.delta.content) {
                                    if (richResponse.status !== 'generating') { richResponse.status = 'generating'; progress.status = 'generating'; richResponse.thinkingEndTime = Date.now(); }
                                    const contentChunk = data.choices.delta.content;
                                    responseContent += contentChunk;
                                    const chunkTokens = Math.ceil(contentChunk.length / 4);
                                    richResponse.responseTokens = (richResponse.responseTokens || 0) + chunkTokens;
                                    progress.currentTokens += chunkTokens;
                                }
                            }
                        } catch (e) { Services.loggerService.warn(`Could not parse SSE chunk for single regen: ${dataStr}`); }
                    }
                }
                serverIpc.sendToClient(ServerToClientChannel.UpdateSingleGenerationProgress, { progress });
            });

            stream.on('end', async () => {
                richResponse.content = responseContent;
                await Services.historyService.updateSingleResponseInCycle(cycleId, tabId, richResponse);
                serverIpc.sendToClient(ServerToClientChannel.NotifySingleResponseComplete, { responseId: parseInt(tabId, 10), content: responseContent });
                Services.loggerService.log(`[LLM Service] Single regeneration for C${cycleId}/T${tabId} complete.`);
            });

            stream.on('error', (err) => {
                if (!(err instanceof AbortError)) throw err;
            });

        } catch (error: any) {
            if (error instanceof AbortError) {
                Services.loggerService.log(`[LLM Service] Single regeneration was aborted.`);
            } else {
                Services.loggerService.error(`Failed to generate single response: ${error.message}`);
            }
        } finally {
            generationControllers.delete(cycleId);
        }
    }

    public async generateBatch(prompt: string, count: number, cycleData: PcppCycle): Promise<PcppResponse[]> {
        const settings = await Services.settingsService.getSettings();
        const serverIpc = serverIPCs[VIEW_TYPES.PANEL.PARALLEL_COPILOT];
        if (!serverIpc) return [];

        let endpointUrl = '';
        let requestBody: any = {};
        
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
                    reasoning_effort: reasoningEffort,
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
                return [];
        }

        if (!endpointUrl) {
            Services.loggerService.error("LLM endpoint URL is not configured.");
            return [];
        }

        const controller = new AbortController();
        generationControllers.set(cycleData.cycleId, controller);
        
        return new Promise(async (resolve, reject) => {
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
                    promptTokens: 0,
                    thinkingTokens: 0,
                    currentTokens: 0,
                    totalTokens: MAX_TOKENS_PER_RESPONSE,
                    status: 'pending',
                    startTime: Date.now(),
                }));
                const responseContents: string[] = Array(count).fill('');
                const richResponses: PcppResponse[] = [...Array(count)].map(() => ({ content: '', status: 'pending', startTime: Date.now() }));
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

                                        const richResponse = richResponses[responseIndex];

                                        if (choice.finish_reason !== null) {
                                            if (!finishedResponses[responseIndex]) {
                                                Services.loggerService.log(`[STREAM] Response ${responseIndex + 1} finished.`);
                                                finishedResponses[responseIndex] = true;
                                                richResponse.status = 'complete';
                                                richResponse.endTime = Date.now();
                                                progressData[responseIndex].status = 'complete';
                                                totalFinished++;
                                                serverIpc.sendToClient(ServerToClientChannel.NotifySingleResponseComplete, { responseId: responseIndex + 1, content: responseContents[responseIndex] });
                                                if (totalFinished === count) {
                                                    Services.historyService.finalizeCycleStatus(cycleData.cycleId);
                                                }
                                            }
                                        } else if (choice.delta) {
                                            if (choice.delta.reasoning_content !== undefined) {
                                                if (richResponse.status !== 'thinking') {
                                                    richResponse.status = 'thinking';
                                                    progressData[responseIndex].status = 'thinking';
                                                }
                                                const contentChunk = choice.delta.reasoning_content;
                                                const chunkTokens = Math.ceil(contentChunk.length / 4);
                                                tokensSinceLastUpdate += chunkTokens;
                                                richResponse.thinkingTokens = (richResponse.thinkingTokens || 0) + chunkTokens;
                                                progressData[responseIndex].thinkingTokens += chunkTokens;
                                            }
                                            
                                            if (choice.delta.content !== undefined) {
                                                if (richResponse.status !== 'generating') {
                                                    richResponse.status = 'generating';
                                                    richResponse.thinkingEndTime = Date.now();
                                                    progressData[responseIndex].status = 'generating';
                                                }
                                                const contentChunk = choice.delta.content;
                                                responseContents[responseIndex] += contentChunk;
                                                const chunkTokens = Math.ceil(contentChunk.length / 4);
                                                tokensSinceLastUpdate += chunkTokens;
                                                richResponse.responseTokens = (richResponse.responseTokens || 0) + chunkTokens;
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
                    sendProgressUpdate();
                    richResponses.forEach((rr, i) => {
                        rr.content = responseContents[i];
                    });
                    resolve(richResponses);
                });
                
                stream.on('error', (err) => {
                    if (!(err instanceof AbortError)) {
                        reject(err);
                    }
                });

            } catch (error: any) {
                 if (error instanceof AbortError) {
                    Services.loggerService.log(`[LLM Service] Batch generation was aborted by user.`);
                    resolve(Array(count).fill({ content: '', status: 'error' }));
                } else {
                    Services.loggerService.error(`Failed to generate batch responses via stream: ${error.message}`);
                    reject(error);
                }
            } finally {
                generationControllers.delete(cycleData.cycleId);
            }
        });
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