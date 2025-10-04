// src/client/views/parallel-copilot.view/hooks/useTabManagement.ts
// Updated on: C96 (Initialize from PcppResponse)
import * as React from 'react';
import { TabState, ParsedResponse, PcppResponse } from '@/common/types/pcpp.types';
import { parseResponse } from '@/client/utils/response-parser';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';
import * as path from 'path-browserify';

export const useTabManagement = (
    initialResponses: { [key: string]: PcppResponse },
    initialTabCount: number,
    initialActiveTab: number,
    initialIsParsedMode: boolean,
    initialIsSorted: boolean,
    setSaveStatus: (status: 'unsaved' | 'saving' | 'saved') => void,
    requestAllMetrics: (parsedResponse: ParsedResponse) => void
) => {
    const [tabs, setTabs] = React.useState<{ [key: string]: TabState }>({});
    const [activeTab, setActiveTab] = React.useState(initialActiveTab);
    const [tabCount, setTabCount] = React.useState(initialTabCount);
    const [isParsedMode, setIsParsedMode] = React.useState(initialIsParsedMode);
    const [isSortedByTokens, setIsSortedByTokens] = React.useState(initialIsSorted);
    const clientIpc = ClientPostMessageManager.getInstance();

    React.useEffect(() => {
        const newTabs: { [key: string]: TabState } = {};
        for (let i = 1; i <= initialTabCount; i++) {
            const key = i.toString();
            const response = initialResponses[key];
            newTabs[key] = {
                rawContent: response?.content || '',
                parsedContent: response?.content ? parseResponse(response.content) : null,
                status: response?.status || 'complete',
            };
        }
        setTabs(newTabs);
        setTabCount(initialTabCount);
        setActiveTab(initialActiveTab);
        setIsParsedMode(initialIsParsedMode);
        setIsSortedByTokens(initialIsSorted);
    }, [initialResponses, initialTabCount, initialActiveTab, initialIsParsedMode, initialIsSorted]);


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
                    newTabs[i.toString()] = { rawContent: '', parsedContent: null, status: 'complete' };
                }
            }
            return newTabs;
        });
        setSaveStatus('unsaved');
    }, [setSaveStatus]);

    const handleRawContentChange = React.useCallback((newContent: string, tabIndex: number) => {
        setTabs(prev => ({ ...prev, [tabIndex.toString()]: { rawContent: newContent, parsedContent: null, status: 'complete' } }));
        setSaveStatus('unsaved');
    }, [setSaveStatus]);

    const handlePaste = React.useCallback((e: React.ClipboardEvent, tabIndex: number) => {
        const pastedText = e.clipboardData.getData('text');
        const currentContent = tabs[tabIndex.toString()]?.rawContent || '';
        const tokenCount = Math.ceil(pastedText.length / 4);
        if (tokenCount > 1000 && currentContent.trim() === '' && tabIndex < tabCount) {
            handleRawContentChange(pastedText, tabIndex);
            setActiveTab(tabIndex + 1);
        } else {
            handleRawContentChange(pastedText, tabIndex);
        }
    }, [tabs, tabCount, handleRawContentChange]);
    
    const parseAllTabs = React.useCallback(() => {
        setTabs(prevTabs => {
            const allFilePaths = new Set<string>();
            const updatedTabs = { ...prevTabs };
            Object.values(updatedTabs).forEach(tabState => {
                if (tabState.rawContent && !tabState.parsedContent) {
                    const parsed = parseResponse(tabState.rawContent);
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
        if (!newParseMode) {
            setTabs(prev => {
                const newTabs = { ...prev };
                Object.keys(newTabs).forEach(key => {
                    newTabs[key].parsedContent = null;
                });
                return newTabs;
            });
        }
        setSaveStatus('unsaved');
    }, [isParsedMode, setSaveStatus]);

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
        handleRawContentChange,
        handlePaste,
        parseAllTabs,
        handleGlobalParseToggle,
        handleSortToggle,
        sortedTabIds,
    };
};