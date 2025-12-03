// src/client/views/parallel-copilot.view/hooks/useTabManagement.ts
// Updated on: C120 (Fix tab count initialization logic)
import * as React from 'react';
import { ParsedResponse, PcppResponse } from '@/common/types/pcpp.types';
import { parseResponse } from '@/client/utils/response-parser';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';
import * as path from 'path-browserify';
import { logger } from '@/client/utils/logger';

export const useTabManagement = (
    initialResponses: { [key: string]: PcppResponse },
    initialTabCount: number,
    initialActiveTab: number,
    initialIsParsedMode: boolean,
    initialIsSorted: boolean,
    setSaveStatus: (status: 'unsaved' | 'saving' | 'saved') => void,
    requestAllMetrics: (parsedResponse: ParsedResponse) => void
) => {
    const [tabs, setTabs] = React.useState<{ [key: string]: PcppResponse }>({});
    const [activeTab, setActiveTab] = React.useState(initialActiveTab);
    const [tabCount, setTabCount] = React.useState(initialTabCount);
    const [isParsedMode, setIsParsedMode] = React.useState(initialIsParsedMode);
    const [isSortedByTokens, setIsSortedByTokens] = React.useState(initialIsSorted);
    const clientIpc = ClientPostMessageManager.getInstance();

    const resetAndLoadTabs = React.useCallback((responses: { [key: string]: PcppResponse }) => {
        logger.log('[useTabManagement] Resetting and loading tabs from new cycle data.');
        const newTabs: { [key: string]: PcppResponse } = {};
        // C120 FIX: Use Math.max to ensure we respect the requested tab count even if responses are empty/fewer
        const count = Math.max(Object.keys(responses).length, initialTabCount);
        
        for (let i = 1; i <= count; i++) {
            const key = i.toString();
            const response = responses[key];
            newTabs[key] = {
                content: response?.content || '',
                parsedContent: response?.content ? parseResponse(response.content) : null,
                status: response?.status || 'complete',
                ...response
            };
        }
        setTabs(newTabs);
        setTabCount(count);
    }, [initialTabCount]);

    React.useEffect(() => {
        resetAndLoadTabs(initialResponses);
        setActiveTab(initialActiveTab);
        setIsParsedMode(initialIsParsedMode);
        setIsSortedByTokens(initialIsSorted);
    }, [initialResponses, initialActiveTab, initialIsParsedMode, initialIsSorted, resetAndLoadTabs]);


    const handleTabSelect = React.useCallback((tabIndex: number) => {
        setActiveTab(tabIndex);
        setSaveStatus('unsaved');
    }, [setSaveStatus]);

    const handleTabCountChange = React.useCallback((count: number) => {
        setTabCount(count);
        setTabs(prev => {
            const newTabs = { ...prev };
            for (let i = 1; i <= count; i++) {
                if (!newTabs[i.toString()]) {
                    newTabs[i.toString()] = { content: '', status: 'complete' };
                }
            }
            return newTabs;
        });
        setSaveStatus('unsaved');
    }, [setSaveStatus]);

    const handleContentChange = React.useCallback((newContent: string, tabIndex: number) => {
        setTabs(prev => ({ 
            ...prev, 
            [tabIndex.toString()]: { 
                ...(prev[tabIndex.toString()] || { content: '', status: 'complete' }),
                content: newContent, 
                parsedContent: null 
            } 
        }));
        setSaveStatus('unsaved');
    }, [setSaveStatus]);

    const handlePaste = React.useCallback((e: React.ClipboardEvent, tabIndex: number) => {
        const pastedText = e.clipboardData.getData('text');
        const currentContent = tabs[tabIndex.toString()]?.content || '';
        const tokenCount = Math.ceil(pastedText.length / 4);
        if (tokenCount > 1000 && currentContent.trim() === '' && tabIndex < tabCount) {
            handleContentChange(pastedText, tabIndex);
            setActiveTab(tabIndex + 1);
        } else {
            handleContentChange(pastedText, tabIndex);
        }
    }, [tabs, tabCount, handleContentChange]);
    
    const parseAllTabs = React.useCallback(() => {
        setTabs(prevTabs => {
            const allFilePaths = new Set<string>();
            const updatedTabs = { ...prevTabs };
            Object.values(updatedTabs).forEach(tabState => {
                if (tabState.content && !tabState.parsedContent) {
                    const parsed = parseResponse(tabState.content);
                    tabState.parsedContent = parsed;
                    tabState.status = 'complete';
                    parsed.filesUpdated.forEach(filePath => allFilePaths.add(filePath));
                    requestAllMetrics(parsed);
                    parsed.files.forEach(file => {
                        const lang = path.extname(file.path).substring(1) || 'plaintext';
                        const id = `${file.path}::${file.content}`;
                        clientIpc.sendToServer(ClientToServerChannel.RequestSyntaxHighlight, { code: file.content, lang, id });
                    });
                } else if (tabState.parsedContent) {
                    tabState.parsedContent.filesUpdated.forEach(filePath => allFilePaths.add(filePath));
                }
            });
            if (allFilePaths.size > 0) {
                clientIpc.sendToServer(ClientToServerChannel.RequestFileExistence, { paths: Array.from(allFilePaths) });
            }
            return updatedTabs;
        });
    }, [clientIpc, requestAllMetrics]);

    const handleGlobalParseToggle = React.useCallback(() => {
        const newParseMode = !isParsedMode;
        setIsParsedMode(newParseMode);
        if (newParseMode) {
            parseAllTabs();
        } else {
            // Un-parse: clear parsed content
            setTabs(prev => {
                const newTabs = { ...prev };
                Object.keys(newTabs).forEach(key => {
                    newTabs[key].parsedContent = null;
                });
                return newTabs;
            });
        }
        setSaveStatus('unsaved');
    }, [isParsedMode, setSaveStatus, parseAllTabs]);

    const handleSortToggle = React.useCallback(() => {
        setIsSortedByTokens(p => !p);
        setSaveStatus('unsaved');
    }, [setSaveStatus]);

    const sortedTabIds = React.useMemo(() => {
        const tabIds = [...Array(tabCount)].map((_, i) => i + 1);
        if (isParsedMode && isSortedByTokens) {
            tabIds.sort((a, b) => {
                const tokensA = tabs[a.toString()]?.parsedContent?.totalTokens ?? -1;
                const tokensB = tabs[b.toString()]?.parsedContent?.totalTokens ?? -1;
                return tokensB - tokensA;
            });
        }
        return tabIds;
    }, [tabs, isParsedMode, isSortedByTokens, tabCount]);


    return {
        tabs,
        setTabs,
        activeTab,
        setActiveTab,
        tabCount,
        setTabCount: handleTabCountChange,
        isParsedMode,
        setIsParsedMode,
        isSortedByTokens,
        handleTabSelect,
        handleContentChange,
        handlePaste,
        parseAllTabs,
        handleGlobalParseToggle,
        handleSortToggle,
        sortedTabIds,
        resetAndLoadTabs,
    };
};