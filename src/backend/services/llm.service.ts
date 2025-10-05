// src/backend/services/llm.service.ts
// Updated on: C109 (Implement robust concatenated JSON parser)
import { Services } from './services';
import fetch from 'node-fetch';
import { PcppCycle, PcppResponse } from '@/common/types/pcpp.types';
import { ServerPostMessageManager } from '@/common/ipc/server-ipc';
import { serverIPCs } from '@/client/views';
import { VIEW_TYPES } from '@/common/view-types';
import { ServerToClientChannel } from '@/common/ipc/channels.enum';
import { GenerationProgress } from '@/common/ipc/channels.type';
import { Readable } from 'stream';

const MAX_TOKENS_PER_RESPONSE = 16384;
const generationControllers = new Map<string, AbortController>();

export class LlmService {

    public stopSingleGeneration(cycleId: number, responseId: number) {
        const controllerKey = `${cycleId}_${responseId}`;
        if (generationControllers.has(controllerKey)) {
            Services.loggerService.log(`[LLM Service] Aborting generation for cycle ${cycleId}, response ${responseId}.`);
            generationControllers.get(controllerKey)?.abort();
        }
    }

    public stopBatchGeneration(cycleId: number) {
        Services.loggerService.log(`[LLM Service] Aborting all generations for cycle ${cycleId}.`);
        for (const [key, controller] of generationControllers.entries()) {
            if (key.startsWith(`${cycleId}_`)) {
                controller.abort();
            }
        }
    }
    
    public async generateSingle(prompt: string, cycleId: number, tabId: string) {
        Services.loggerService.log(`[LLM Service] Starting single regeneration for cycle ${cycleId}, tab ${tabId}.`);
        await Services.historyService.updateSingleResponseInCycle(cycleId, tabId, null);

        const settings = await Services.settingsService.getSettings();
        const serverIpc = serverIPCs[VIEW_TYPES.PANEL.PARALLEL_COPILOT];
        if (!serverIpc) return;

        let endpointUrl = '';
        let requestBodyBase: any = {};
        const reasoningEffort = 'medium';

        switch (settings.connectionMode) {
            case 'demo':
                endpointUrl = 'https://aiascent.game/api/dce/proxy';
                requestBodyBase = { model: "unsloth/gpt-oss-20b", messages: [{ role: "user", content: prompt }], max_tokens: MAX_TOKENS_PER_RESPONSE, stream: true, reasoning_effort: reasoningEffort };
                break;
            case 'url':
                endpointUrl = settings.apiUrl || '';
                requestBodyBase = { model: "local-model", messages: [{ role: "user", content: prompt }], max_tokens: MAX_TOKENS_PER_RESPONSE, stream: true, reasoning_effort: reasoningEffort };
                break;
            default: return;
        }

        const controller = new AbortController();
        const responseId = parseInt(tabId, 10);
        const controllerKey = `${cycleId}_${responseId}`;
        generationControllers.set(controllerKey, controller);

        const finalResponse = await this._generateSingleStream(endpointUrl, { ...requestBodyBase, n: 1 }, controller, cycleId, responseId, serverIpc);
        
        await Services.historyService.updateSingleResponseInCycle(cycleId, tabId, finalResponse);
        serverIpc.sendToClient(ServerToClientChannel.NotifySingleResponseComplete, { responseId: parseInt(tabId), content: finalResponse.content });
        Services.loggerService.log(`[LLM Service] Single regeneration for C${cycleId}/T${tabId} complete.`);
    }

    private _generateSingleStream(url: string, body: any, controller: AbortController, cycleId: number, responseId: number, serverIpc: ServerPostMessageManager): Promise<PcppResponse> {
        const controllerKey = `${cycleId}_${responseId}`;
        
        return new Promise(async (resolve) => {
            let responseContent = '';
            const richResponse: PcppResponse = { content: '', status: 'pending', startTime: Date.now() };
            const progress: GenerationProgress = { responseId, promptTokens: 0, thinkingTokens: 0, currentTokens: 0, totalTokens: MAX_TOKENS_PER_RESPONSE, status: 'pending', startTime: Date.now() };

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body),
                    signal: controller.signal,
                });

                if (!response.ok || !response.body) { throw new Error(`API request failed: ${response.status} ${await response.text()}`); }
                
                const stream = response.body;
                let buffer = '';

                stream.on('data', (chunk) => {
                    buffer += chunk.toString();
                    const lines = buffer.split('\n');
                    buffer = lines.pop() || '';

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            let dataStr = line.substring(6).trim();
                            if (dataStr === '[DONE]') continue;

                            let braceCount = 0;
                            let lastSlice = 0;
                            for (let i = 0; i < dataStr.length; i++) {
                                if (dataStr[i] === '{') {
                                    braceCount++;
                                } else if (dataStr[i] === '}') {
                                    braceCount--;
                                    if (braceCount === 0) {
                                        const jsonObjectStr = dataStr.substring(lastSlice, i + 1);
                                        lastSlice = i + 1;
                                        try {
                                            const data = JSON.parse(jsonObjectStr);
                                            if (data.choices?.[0]?.finish_reason !== null) {
                                                richResponse.status = 'complete';
                                                richResponse.endTime = Date.now();
                                                progress.status = 'complete';
                                            } else if (data.choices?.[0]?.delta) {
                                                const delta = data.choices[0].delta;
                                                if (delta.reasoning_content) {
                                                    if (richResponse.status !== 'thinking') { richResponse.status = 'thinking'; progress.status = 'thinking'; }
                                                    const contentChunk = delta.reasoning_content;
                                                    const chunkTokens = Math.ceil(contentChunk.length / 4);
                                                    richResponse.thinkingTokens = (richResponse.thinkingTokens || 0) + chunkTokens;
                                                    progress.thinkingTokens += chunkTokens;
                                                }
                                                if (delta.content) {
                                                    if (richResponse.status !== 'generating') { richResponse.status = 'generating'; progress.status = 'generating'; richResponse.thinkingEndTime = Date.now(); }
                                                    const contentChunk = delta.content;
                                                    responseContent += contentChunk;
                                                    const chunkTokens = Math.ceil(contentChunk.length / 4);
                                                    richResponse.responseTokens = (richResponse.responseTokens || 0) + chunkTokens;
                                                    progress.currentTokens += chunkTokens;
                                                }
                                            }
                                        } catch (e) {
                                            Services.loggerService.warn(`Could not parse JSON object from stream: ${jsonObjectStr}`);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    serverIpc.sendToClient(ServerToClientChannel.UpdateSingleGenerationProgress, { progress, content: responseContent });
                });

                stream.on('end', () => {
                    generationControllers.delete(controllerKey);
                    richResponse.content = responseContent;
                    progress.status = 'complete';
                    serverIpc.sendToClient(ServerToClientChannel.UpdateSingleGenerationProgress, { progress, content: responseContent });
                    resolve(richResponse);
                });

                stream.on('error', (err: any) => {
                    if (err.name === 'AbortError') {
                        Services.loggerService.log(`[LLM Stream] Stream for C${cycleId}/R${responseId} was aborted.`);
                        generationControllers.delete(controllerKey);
                        richResponse.content = responseContent;
                        richResponse.status = 'stopped';
                        progress.status = 'stopped';
                        serverIpc.sendToClient(ServerToClientChannel.UpdateSingleGenerationProgress, { progress, content: responseContent });
                        resolve(richResponse);
                    } else {
                        throw err;
                    }
                });

            } catch (error: any) {
                generationControllers.delete(controllerKey);
                if (error.name === 'AbortError') {
                    Services.loggerService.log(`[LLM Fetch] Fetch for C${cycleId}/R${responseId} was aborted.`);
                    richResponse.content = responseContent;
                    richResponse.status = 'stopped';
                    progress.status = 'stopped';
                } else {
                    Services.loggerService.error(`Failed to generate single stream for C${cycleId}/R${responseId}: ${error.message}`);
                    richResponse.status = 'error';
                    progress.status = 'error';
                }
                serverIpc.sendToClient(ServerToClientChannel.UpdateSingleGenerationProgress, { progress, content: responseContent });
                resolve(richResponse);
            }
        });
    }

    public async generateBatch(prompt: string, count: number, cycleData: PcppCycle): Promise<PcppResponse[]> {
        const settings = await Services.settingsService.getSettings();
        const serverIpc = serverIPCs[VIEW_TYPES.PANEL.PARALLEL_COPILOT];
        if (!serverIpc) return [];

        let endpointUrl = '';
        let requestBodyBase: any = {};
        const reasoningEffort = 'medium';

        switch (settings.connectionMode) {
            case 'demo':
                endpointUrl = 'https://aiascent.game/api/dce/proxy';
                requestBodyBase = { model: "unsloth/gpt-oss-20b", messages: [{ role: "user", content: prompt }], max_tokens: MAX_TOKENS_PER_RESPONSE, stream: true, reasoning_effort: reasoningEffort };
                break;
            case 'url':
                endpointUrl = settings.apiUrl || '';
                requestBodyBase = { model: "local-model", messages: [{ role: "user", content: prompt }], max_tokens: MAX_TOKENS_PER_RESPONSE, stream: true, reasoning_effort: reasoningEffort };
                break;
            default: return [];
        }

        if (!endpointUrl) {
            Services.loggerService.error("LLM endpoint URL is not configured.");
            return [];
        }

        const promises = Array.from({ length: count }, (_, i) => {
            const responseId = i + 1;
            const controllerKey = `${cycleData.cycleId}_${responseId}`;
            const controller = new AbortController();
            generationControllers.set(controllerKey, controller);

            return this._generateSingleStream(
                endpointUrl,
                { ...requestBodyBase, n: 1 },
                controller,
                cycleData.cycleId,
                responseId,
                serverIpc
            ).catch(error => {
                Services.loggerService.error(`Error in stream for C${cycleData.cycleId}/R${responseId}: ${error.message}`);
                // Return an error response object to avoid Promise.all from rejecting early
                return {
                    content: `Error generating response: ${error.message}`,
                    status: 'error' as 'error',
                    startTime: Date.now(),
                    endTime: Date.now()
                };
            });
        });

        const richResponses = await Promise.all(promises);
        
        let allFinished = true;
        for (const key of generationControllers.keys()) {
            if (key.startsWith(`${cycleData.cycleId}_`)) {
                allFinished = false;
                break;
            }
        }
        
        if (allFinished) {
            Services.loggerService.log(`All streams for cycle ${cycleData.cycleId} are complete.`);
        }

        return richResponses;
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