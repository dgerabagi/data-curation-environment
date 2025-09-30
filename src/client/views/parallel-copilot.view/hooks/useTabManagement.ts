// src/client/views/parallel-copilot.view/hooks/useTabManagement.ts
import * as React from 'react';
import { TabState, ParsedResponse } from '@/common/types/pcpp.types';
import { parseResponse } from '@/client/utils/response-parser';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';
import * as path from 'path-browserify';

export const useTabManagement = (
    initialTabs: { [key: string]: TabState },
    initialTabCount: number,
    initialActiveTab: number,
    initialIsParsedMode: boolean,
    initialIsSorted: boolean,
    setSaveStatus: (status: 'unsaved' | 'saving' | 'saved') => void,
    requestAllMetrics: (parsedResponse: ParsedResponse) => void
) => {
    const [tabs, setTabs] = React.useState<{ [key: string]: TabState }>(initialTabs);
    const [activeTab, setActiveTab] = React.useState(initialActiveTab);
    const [tabCount, setTabCount] = React.useState(initialTabCount);
    const [isParsedMode, setIsParsedMode] = React.useState(initialIsParsedMode);
    const [isSortedByTokens, setIsSortedByTokens] = React.useState(initialIsSorted);
    const clientIpc = ClientPostMessageManager.getInstance();

    const handleTabSelect = (tabIndex: number) => {
        setActiveTab(tabIndex);
        setSaveStatus('unsaved');
    };

    const handleTabCountChange = (count: number) => {
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
    };

    const handleRawContentChange = (newContent: string, tabIndex: number) => {
        setTabs(prev => ({ ...prev, [tabIndex.toString()]: { rawContent: newContent, parsedContent: null, status: 'complete' } }));
        setSaveStatus('unsaved');
    };

    const handlePaste = (e: React.ClipboardEvent, tabIndex: number) => {
        const pastedText = e.clipboardData.getData('text');
        const currentContent = tabs[tabIndex.toString()]?.rawContent || '';
        const tokenCount = Math.ceil(pastedText.length / 4);
        if (tokenCount > 1000 && currentContent.trim() === '' && tabIndex < tabCount) {
            handleRawContentChange(pastedText, tabIndex);
            setActiveTab(tabIndex + 1);
        } else {
            handleRawContentChange(pastedText, tabIndex);
        }
    };
    
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

    const handleGlobalParseToggle = () => {
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
    };

    const handleSortToggle = () => {
        setIsSortedByTokens(p => !p);
        setSaveStatus('unsaved');
    };

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