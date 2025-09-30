// src/client/views/parallel-copilot.view/hooks/useFileManagement.ts
import * as React from 'react';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';
import { ComparisonMetrics } from '@/common/ipc/channels.type';

export const useFileManagement = (
    activeTab: number,
    tabs: any,
    setSaveStatus: (status: 'unsaved' | 'saving' | 'saved') => void
) => {
    const [highlightedCodeBlocks, setHighlightedCodeBlocks] = React.useState<Map<string, string>>(new Map());
    const [fileExistenceMap, setFileExistenceMap] = React.useState<Map<string, boolean>>(new Map());
    const [selectedFilePath, setSelectedFilePath] = React.useState<string | null>(null);
    const [selectedFilesForReplacement, setSelectedFilesForReplacement] = React.useState<Set<string>>(new Set());
    const [comparisonMetrics, setComparisonMetrics] = React.useState<Map<string, ComparisonMetrics | null>>(new Map());
    const [pathOverrides, setPathOverrides] = React.useState<Map<string, string>>(new Map());
    const [tempOverridePath, setTempOverridePath] = React.useState('');

    const clientIpc = ClientPostMessageManager.getInstance();

    const handleSelectForViewing = (filePath: string) => {
        const newPath = selectedFilePath === filePath ? null : filePath;
        setSelectedFilePath(newPath);
    };

    const handleFileSelectionToggle = (filePath: string) => {
        const currentTabId = activeTab.toString();
        const compositeKeyForCurrent = `${currentTabId}:::${filePath}`;
        setSelectedFilesForReplacement(prev => {
            const newSet = new Set(prev);
            let existingKey: string | undefined;
            for (const key of newSet) {
                if (key.endsWith(`:::${filePath}`)) {
                    existingKey = key;
                    break;
                }
            }
            if (existingKey) {
                if (existingKey === compositeKeyForCurrent) {
                    newSet.delete(existingKey);
                } else {
                    newSet.delete(existingKey);
                    newSet.add(compositeKeyForCurrent);
                }
            } else {
                newSet.add(compositeKeyForCurrent);
            }
            return newSet;
        });
        setSaveStatus('unsaved');
    };

    const handleLinkFile = (originalPath: string) => {
        if (tempOverridePath.trim()) {
            setPathOverrides(prev => new Map(prev).set(originalPath, tempOverridePath.trim()));
            setFileExistenceMap(prev => new Map(prev).set(originalPath, true));
            setTempOverridePath('');
            handleSelectForViewing(originalPath);
        }
    };
    
    const handleUnlinkFile = (originalPath: string) => {
        setPathOverrides(prev => {
            const newMap = new Map(prev);
            newMap.delete(originalPath);
            return newMap;
        });
        setFileExistenceMap(prev => new Map(prev).set(originalPath, false));
    };

    const handleCopyContent = () => {
        if (!selectedFilePath || !tabs[activeTab.toString()]?.parsedContent) return;
        const file = tabs[activeTab.toString()].parsedContent.files.find((f: any) => f.path === selectedFilePath);
        if (file) {
            clientIpc.sendToServer(ClientToServerChannel.RequestCopyTextToClipboard, { text: file.content });
        }
    };

    return {
        highlightedCodeBlocks,
        setHighlightedCodeBlocks,
        fileExistenceMap,
        setFileExistenceMap,
        selectedFilePath,
        setSelectedFilePath,
        selectedFilesForReplacement,
        setSelectedFilesForReplacement,
        comparisonMetrics,
        setComparisonMetrics,
        pathOverrides,
        setPathOverrides,
        tempOverridePath,
        setTempOverridePath,
        handleSelectForViewing,
        handleFileSelectionToggle,
        handleLinkFile,
        handleUnlinkFile,
        handleCopyContent,
    };
};