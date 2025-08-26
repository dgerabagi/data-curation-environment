// src/client/views/parallel-copilot.view/view.tsx
// Updated on: C154 (Fix resizer bug, add path override UI, fix nav bug)
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { VscChevronLeft, VscChevronRight, VscWand, VscChevronDown, VscCheck, VscError, VscAdd, VscFileCode, VscDiff, VscArrowSwap, VscTrash, VscSync, VscClose, VscSave, VscBug, VscCheckAll, VscListOrdered, VscListUnordered, VscSymbolNumeric, VscClippy, VscLink } from 'react-icons/vsc';
import { logger } from '@/client/utils/logger';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { ParsedResponse, PcppCycle, PcppResponse } from '@/common/types/pcpp.types';
import { parseResponse } from '@/client/utils/response-parser';
import ReactMarkdown from 'react-markdown';
import * as path from 'path-browserify';
import { BatchWriteFile } from '@/common/ipc/channels.type';
import OnboardingView from './OnboardingView';
import { formatLargeNumber } from '@/common/utils/formatting';

// ... (imports and interfaces remain the same) ...
interface ComparisonMetrics {
    originalTokens: number;
    modifiedTokens: number;
    similarity: number;
}

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const debouncedFunction = React.useCallback((...args: any[]) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);

    return debouncedFunction;
};

const CodeViewer: React.FC<{ htmlContent: string | undefined | null }> = ({ htmlContent }) => {
    if (htmlContent === undefined || htmlContent === null) {
        return <div style={{ padding: '8px' }}>Select a file to view its content.</div>;
    }
    if (htmlContent.startsWith('// Error:')) {
         return <div style={{ padding: '8px', color: 'var(--vscode-errorForeground)' }}>{htmlContent}</div>;
    }

    const codeContentMatch = /<pre><code>([\s\S]*)<\/code><\/pre>/s.exec(htmlContent || '');
    const code = codeContentMatch?.[1] ?? (htmlContent || '');

    const lines = code.split('\n');
    if (lines.length > 1 && lines[lines.length - 1] === '') {
        lines.pop();
    }

    return (
        <div className="code-viewer-wrapper">
            <div className="file-content-viewer">
                <div className="line-numbers">
                    {lines.map((_, i) => <span key={i}>{i + 1}</span>)}
                </div>
                <div className="code-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
        </div>
    );
};

interface TabState {
    rawContent: string;
    parsedContent: ParsedResponse | null;
}

const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode; isCollapsed: boolean; onToggle: () => void; collapsedContent?: React.ReactNode; className?: string; }> = ({ title, children, isCollapsed, onToggle, collapsedContent, className }) => (
    <div className="collapsible-section">
        <div className={`collapsible-header ${className || ''}`} onClick={onToggle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <VscChevronDown className={`chevron ${isCollapsed ? 'collapsed' : ''}`} />
                <span>{title}</span>
            </div>
            {isCollapsed && collapsedContent}
        </div>
        {!isCollapsed && <div className="collapsible-content">{children}</div>}
    </div>
);


const App = () => {
    // ... (most state declarations are the same)
    const [activeTab, setActiveTab] = React.useState(1);
    const [tabCount, setTabCount] = React.useState(4);
    const [currentCycle, setCurrentCycle] = React.useState<number | null>(null);
    const [projectScope, setProjectScope] = React.useState<string | undefined>('');
    const [maxCycle, setMaxCycle] = React.useState(1);
    const [cycleTitle, setCycleTitle] = React.useState('');
    const [cycleContext, setCycleContext] = React.useState('');
    const [ephemeralContext, setEphemeralContext] = React.useState('');
    const [tabs, setTabs] = React.useState<{ [key: string]: TabState }>({});
    const [highlightedCodeBlocks, setHighlightedCodeBlocks] = React.useState<Map<string, string>>(new Map());
    const [fileExistenceMap, setFileExistenceMap] = React.useState<Map<string, boolean>>(new Map());
    const [isParsedMode, setIsParsedMode] = React.useState(false);
    const [selectedFilePath, setSelectedFilePath] = React.useState<string | null>(null);
    const [isCycleCollapsed, setIsCycleCollapsed] = React.useState(false);
    const [leftPaneWidth, setLeftPaneWidth] = React.useState(33);
    const isResizing = React.useRef(false);
    const [selectedFilesForReplacement, setSelectedFilesForReplacement] = React.useState<Set<string>>(new Set());
    const [selectedResponseId, setSelectedResponseId] = React.useState<string | null>(null);
    const [comparisonMetrics, setComparisonMetrics] = React.useState<Map<string, ComparisonMetrics>>(new Map());
    const [isSortedByLength, setIsSortedByLength] = React.useState(false);
    const [pathOverrides, setPathOverrides] = React.useState<Map<string, string>>(new Map());
    const [tempOverridePath, setTempOverridePath] = React.useState('');

    const [isAssociatedFilesCollapsed, setAssociatedFilesCollapsed] = React.useState(false);
    const [isThoughtsCollapsed, setThoughtsCollapsed] = React.useState(false);
    const [isActionCollapsed, setActionCollapsed] = React.useState(false);

    const clientIpc = ClientPostMessageManager.getInstance();

    const saveCurrentCycleState = React.useCallback(() => {
        if (currentCycle === null || currentCycle === 0) return;
        const responses: { [key: string]: PcppResponse } = {};
        for (let i = 1; i <= tabCount; i++) {
            responses[i.toString()] = { content: tabs[i.toString()]?.rawContent || '' };
        }
        const cycleData: PcppCycle = {
            cycleId: currentCycle,
            timestamp: new Date().toISOString(),
            title: cycleTitle,
            cycleContext,
            ephemeralContext,
            responses,
            isParsedMode,
            leftPaneWidth,
            selectedResponseId,
            selectedFilesForReplacement: Array.from(selectedFilesForReplacement),
            tabCount,
            isSortedByLength,
            pathOverrides: Object.fromEntries(pathOverrides),
        };
        clientIpc.sendToServer(ClientToServerChannel.SaveCycleData, { cycleData });
    }, [currentCycle, cycleTitle, cycleContext, ephemeralContext, tabs, tabCount, isParsedMode, leftPaneWidth, selectedResponseId, selectedFilesForReplacement, isSortedByLength, pathOverrides, clientIpc]);

    // ... (useDebounce hook is the same) ...
    const debouncedSave = useDebounce(saveCurrentCycleState, 1000);

    React.useEffect(() => {
        debouncedSave();
    }, [cycleTitle, cycleContext, ephemeralContext, tabs, isParsedMode, leftPaneWidth, selectedResponseId, selectedFilesForReplacement, tabCount, isSortedByLength, pathOverrides, debouncedSave]);
    
    // ... (parseAllTabs is the same) ...
    const parseAllTabs = React.useCallback(() => {
        setTabs(prevTabs => {
            const allFilePaths = new Set<string>();
            const updatedTabs = { ...prevTabs };
            let needsUpdate = false;
    
            Object.values(updatedTabs).forEach(tabState => {
                if (tabState.rawContent && !tabState.parsedContent) {
                    needsUpdate = true;
                    const parsed = parseResponse(tabState.rawContent);
                    tabState.parsedContent = parsed;
                    parsed.filesUpdated.forEach(file => allFilePaths.add(file));
                    parsed.files.forEach(file => {
                        const lang = path.extname(file.path).substring(1) || 'plaintext';
                        const id = `${file.path}::${file.content}`;
                        clientIpc.sendToServer(ClientToServerChannel.RequestSyntaxHighlight, { code: file.content, lang, id });
                    });
                } else if (tabState.parsedContent) {
                    tabState.parsedContent.filesUpdated.forEach(file => allFilePaths.add(file));
                }
            });
    
            if (allFilePaths.size > 0) {
                clientIpc.sendToServer(ClientToServerChannel.RequestFileExistence, { paths: Array.from(allFilePaths) });
            }
    
            return needsUpdate ? updatedTabs : prevTabs;
        });
    }, [clientIpc]);
    
    React.useEffect(() => {
        const loadCycleData = (cycleData: PcppCycle, scope?: string) => {
            setCurrentCycle(cycleData.cycleId);
            setProjectScope(scope);
            setCycleTitle(cycleData.title);
            setCycleContext(cycleData.cycleContext);
            setEphemeralContext(cycleData.ephemeralContext);
            const newTabs: { [key: string]: TabState } = {};
            Object.entries(cycleData.responses).forEach(([tabId, response]) => {
                newTabs[tabId] = { rawContent: response.content, parsedContent: null };
            });
            setTabs(newTabs);
            setTabCount(cycleData.tabCount || 4);
            setIsParsedMode(cycleData.isParsedMode || false);
            setLeftPaneWidth(cycleData.leftPaneWidth || 33);
            setSelectedResponseId(cycleData.selectedResponseId || null);
            setSelectedFilesForReplacement(new Set(cycleData.selectedFilesForReplacement || []));
            setIsSortedByLength(cycleData.isSortedByLength || false);
            setPathOverrides(new Map(Object.entries(cycleData.pathOverrides || {})));
        };

        clientIpc.onServerMessage(ServerToClientChannel.SendLatestCycleData, ({ cycleData, projectScope }) => { loadCycleData(cycleData, projectScope); setMaxCycle(cycleData.cycleId); });
        clientIpc.onServerMessage(ServerToClientChannel.SendCycleData, ({ cycleData, projectScope }) => { if (cycleData) loadCycleData(cycleData, projectScope); });
        clientIpc.onServerMessage(ServerToClientChannel.SendSyntaxHighlight, ({ highlightedHtml, id }) => setHighlightedCodeBlocks(prev => new Map(prev).set(id, highlightedHtml)));
        clientIpc.onServerMessage(ServerToClientChannel.SendFileExistence, ({ existenceMap }) => setFileExistenceMap(new Map(Object.entries(existenceMap))));
        clientIpc.onServerMessage(ServerToClientChannel.ForceRefresh, ({ reason }) => { if (reason === 'history') clientIpc.sendToServer(ClientToServerChannel.RequestLatestCycleData, {}); });
        clientIpc.onServerMessage(ServerToClientChannel.FilesWritten, ({ paths }) => { logger.log(`Received FilesWritten event for: ${paths.join(', ')}`); setFileExistenceMap(prevMap => { const newMap = new Map(prevMap); paths.forEach(p => newMap.set(p, true)); return newMap; }); });
        clientIpc.onServerMessage(ServerToClientChannel.SendFileComparison, ({ filePath, originalTokens, modifiedTokens, similarity }) => {
            setComparisonMetrics(prev => new Map(prev).set(filePath, { originalTokens, modifiedTokens, similarity }));
        });
        
        clientIpc.sendToServer(ClientToServerChannel.RequestLatestCycleData, {});
    }, [clientIpc]);

    React.useEffect(() => { if (isParsedMode) parseAllTabs(); }, [isParsedMode, tabs, parseAllTabs]);
    
    // ... (useEffect for cleaning selectedFilePath is the same) ...
    React.useEffect(() => {
        if (!selectedFilePath) return;
    
        const currentTabData = tabs[activeTab.toString()];
        if (currentTabData?.parsedContent) {
            const fileExistsInTab = currentTabData.parsedContent.files.some(f => f.path === selectedFilePath);
            if (!fileExistsInTab) {
                logger.log(`[State Cleanup] Selected file '${selectedFilePath}' not found in new tab '${activeTab}'. Clearing selection.`);
                setSelectedFilePath(null);
            }
        }
    }, [activeTab, tabs, selectedFilePath]);

    const handleCycleChange = (e: React.MouseEvent | null, newCycle: number) => { 
        e?.stopPropagation(); 
        if (newCycle >= 0 && newCycle <= maxCycle) { 
            if (currentCycle !== 0) saveCurrentCycleState(); 
            setSelectedFilesForReplacement(new Set()); 
            setCurrentCycle(newCycle); 
            clientIpc.sendToServer(ClientToServerChannel.RequestCycleData, { cycleId: newCycle }); 
        } 
    };

    const handleMouseDown = React.useCallback((e: React.MouseEvent) => { e.preventDefault(); isResizing.current = true; }, []);
    const handleMouseMove = React.useCallback((e: MouseEvent) => { if (!isResizing.current) return; const newWidth = (e.clientX / window.innerWidth) * 100; if (newWidth > 10 && newWidth < 90) setLeftPaneWidth(newWidth); }, []);
    const handleMouseUp = React.useCallback(() => { if (isResizing.current) { isResizing.current = false; saveCurrentCycleState(); } }, [saveCurrentCycleState]);

    React.useEffect(() => {
        const mm = (e: MouseEvent) => handleMouseMove(e);
        const mu = () => handleMouseUp();
        if (isParsedMode) { window.addEventListener('mousemove', mm); window.addEventListener('mouseup', mu); }
        return () => { window.removeEventListener('mousemove', mm); window.removeEventListener('mouseup', mu); };
    }, [isParsedMode, handleMouseMove, handleMouseUp]);
    
    const handleSelectForViewing = (filePath: string) => {
        const newPath = selectedFilePath === filePath ? null : filePath;
        setSelectedFilePath(newPath);
        if (newPath) {
            const file = activeTabData?.parsedContent?.files.find(f => f.path === newPath);
            const pathForComparison = pathOverrides.get(newPath) || newPath;
            if (file) {
                clientIpc.sendToServer(ClientToServerChannel.RequestFileComparison, { filePath: pathForComparison, modifiedContent: file.content });
            }
        }
    };

    const handleAcceptSelectedFiles = () => {
        if (selectedFilesForReplacement.size === 0) return;
        const filesToWrite: BatchWriteFile[] = [];
        selectedFilesForReplacement.forEach(compositeKey => {
            const [responseId, filePath] = compositeKey.split(':::');
            const responseData = tabs[responseId];
            if (responseData?.parsedContent) {
                const file = responseData.parsedContent.files.find(f => f.path === filePath);
                if (file) {
                    const finalPath = pathOverrides.get(file.path) || file.path;
                    filesToWrite.push({ path: finalPath, content: file.content });
                }
            }
        });
        if (filesToWrite.length > 0) {
            clientIpc.sendToServer(ClientToServerChannel.RequestBatchFileWrite, { files: filesToWrite });
        }
    };
    
    const handleLinkFile = (originalPath: string) => {
        if (tempOverridePath.trim()) {
            setPathOverrides(prev => new Map(prev).set(originalPath, tempOverridePath.trim()));
            setFileExistenceMap(prev => new Map(prev).set(originalPath, true)); // Assume user is correct for now
            setTempOverridePath('');
            // Trigger a new comparison with the correct file
            handleSelectForViewing(originalPath);
        }
    };

    // ... (other handlers and memos are mostly the same)
    const activeTabData = tabs[activeTab.toString()];

    const sortedTabIds = React.useMemo(() => {
        const tabIds = [...Array(tabCount)].map((_, i) => i + 1);
        if (isParsedMode && isSortedByLength) {
            tabIds.sort((a, b) => {
                const tokensA = tabs[a.toString()]?.parsedContent?.totalTokens ?? -1;
                const tokensB = tabs[b.toString()]?.parsedContent?.totalTokens ?? -1;
                return tokensB - tokensA;
            });
        }
        return tabIds;
    }, [tabs, isParsedMode, isSortedByLength, tabCount]);

    const viewableContent = React.useMemo(() => {
        if (!selectedFilePath || !activeTabData?.parsedContent) return undefined;
        const file = activeTabData.parsedContent.files.find(f => f.path === selectedFilePath);
        if (!file) return '<div>Error: File data not found in parsed response.</div>';
        const id = `${file.path}::${file.content}`;
        return highlightedCodeBlocks.get(id);
    }, [selectedFilePath, activeTabData?.parsedContent, highlightedCodeBlocks]);

    const handleRawContentChange = (newContent: string, tabIndex: number) => setTabs(prev => ({ ...prev, [tabIndex.toString()]: { rawContent: newContent, parsedContent: null }}));
    const handleGlobalParseToggle = () => {
        const newParseMode = !isParsedMode;
        setIsParsedMode(newParseMode);
        setSelectedFilePath(null);
        if (!newParseMode) setTabs(prev => { const newTabs = {...prev}; Object.keys(newTabs).forEach(key => { newTabs[key].parsedContent = null; }); return newTabs; });
    };

    const handleNewCycle = (e: React.MouseEvent) => {
        e.stopPropagation();
        saveCurrentCycleState();
    
        const newCycleId = maxCycle + 1;
        setMaxCycle(newCycleId);
        setCurrentCycle(newCycleId);
        
        setCycleTitle('New Cycle');
        setCycleContext('');
        setEphemeralContext('');
        setTabs({});
        setIsParsedMode(false);
        setSelectedResponseId(null);
        setSelectedFilesForReplacement(new Set());
    };

    const handleGeneratePrompt = () => {
        if (currentCycle === null) return;
        clientIpc.sendToServer(ClientToServerChannel.RequestCreatePromptFile, { cycleTitle, currentCycle });
    }
    
    const handleDeleteCycle = () => { if(currentCycle !== null) clientIpc.sendToServer(ClientToServerChannel.RequestDeleteCycle, { cycleId: currentCycle }); };
    const handleResetHistory = () => clientIpc.sendToServer(ClientToServerChannel.RequestResetHistory, {});
    
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
    };
    
    const handleSelectAllFilesToggle = () => {
        if (!activeTabData?.parsedContent) return;
        
        const allFilesForTab = activeTabData.parsedContent.filesUpdated.map(fp => `${activeTab}:::${fp}`);
        const isAllSelected = allFilesForTab.every(key => selectedFilesForReplacement.has(key));

        setSelectedFilesForReplacement(prev => {
            const newSet = new Set(prev);
            if (isAllSelected) {
                allFilesForTab.forEach(key => newSet.delete(key));
            } else {
                allFilesForTab.forEach(key => newSet.add(key));
            }
            return newSet;
        });
    };

    const isAllFilesSelected = React.useMemo(() => {
        if (!activeTabData?.parsedContent) return false;
        const allFiles = activeTabData.parsedContent.filesUpdated;
        if (allFiles.length === 0) return false;
        return allFiles.every(file => selectedFilesForReplacement.has(`${activeTab}:::${file}`));
    }, [selectedFilesForReplacement, activeTabData, activeTab]);

    const isNewCycleButtonDisabled = React.useMemo(() => {
        const hasTitle = cycleTitle && cycleTitle.trim() !== 'New Cycle' && cycleTitle.trim() !== '';
        const hasContext = cycleContext.trim() !== '';
        const hasSelectedResponse = selectedResponseId !== null;
        return !hasTitle || !hasContext || !hasSelectedResponse;
    }, [cycleTitle, cycleContext, selectedResponseId]);
    
    const handleLogState = () => {
        if (currentCycle === null) return;
        const responses: { [key: string]: PcppResponse } = {};
        for (let i = 1; i <= tabCount; i++) {
            responses[i.toString()] = { content: tabs[i.toString()]?.rawContent || '' };
        }
        const currentState: PcppCycle = { cycleId: currentCycle, timestamp: new Date().toISOString(), title: cycleTitle, cycleContext, ephemeralContext, responses, isParsedMode, leftPaneWidth, selectedResponseId, selectedFilesForReplacement: Array.from(selectedFilesForReplacement), tabCount, isSortedByLength };
        clientIpc.sendToServer(ClientToServerChannel.RequestLogState, { currentState });
    };

    const handleCopyContent = () => {
        if (!selectedFilePath || !activeTabData?.parsedContent) return;
        const file = activeTabData.parsedContent.files.find(f => f.path === selectedFilePath);
        if (file) {
            clientIpc.sendToServer(ClientToServerChannel.RequestCopyTextToClipboard, { text: file.content });
        }
    };

    const isReadyForNextCycle = !isNewCycleButtonDisabled;

    if (currentCycle === null) {
        return <div>Loading...</div>;
    }

    if (currentCycle === 0) {
        return <OnboardingView initialProjectScope={projectScope} onNavigateToCycle={(id) => handleCycleChange(null, id)} />;
    }

    const collapsedNavigator = <div className="collapsed-navigator"><button onClick={(e) => handleCycleChange(e, currentCycle - 1)} disabled={currentCycle <= 1}><VscChevronLeft /></button><span className="cycle-display">C{currentCycle}</span><button onClick={(e) => handleCycleChange(e, currentCycle + 1)} disabled={currentCycle >= maxCycle}><VscChevronRight /></button></div>;
    const currentComparisonMetrics = selectedFilePath ? comparisonMetrics.get(pathOverrides.get(selectedFilePath) || selectedFilePath) : null;
    
    const renderContent = () => {
        if (!isParsedMode || !activeTabData?.parsedContent) {
            return <textarea className="response-textarea" placeholder={`Paste AI response for tab ${activeTab} here...`} value={activeTabData?.rawContent || ''} onChange={(e) => handleRawContentChange(e.target.value, activeTab)} />;
        }
        return <div className="parsed-view-grid">
            <div className="parsed-view-left" style={{ flexBasis: `${leftPaneWidth}%` }}>
                <CollapsibleSection title="Associated Files" isCollapsed={isAssociatedFilesCollapsed} onToggle={() => setAssociatedFilesCollapsed(p => !p)}>
                    <ul className="associated-files-list">{activeTabData.parsedContent.filesUpdated.map(file => {
                        const fileExists = fileExistenceMap.get(file);
                        return <li key={file} className={selectedFilePath === file ? 'selected' : ''} onClick={() => handleSelectForViewing(file)} title={file}>
                            <input type="checkbox" checked={selectedFilesForReplacement.has(`${activeTab}:::${file}`)} onChange={() => handleFileSelectionToggle(file)} onClick={e => e.stopPropagation()} />
                            {fileExists ? <VscCheck className="status-icon exists" /> : <VscError className="status-icon not-exists" />}
                            <span>{file}</span>
                            {!fileExists && selectedFilePath === file && (
                                <div className="path-override-container">
                                    <input type="text" placeholder="Enter correct relative path..." value={tempOverridePath} onChange={e => setTempOverridePath(e.target.value)} onKeyDown={e => {if(e.key === 'Enter') handleLinkFile(file)}} />
                                    <button className="styled-button" onClick={() => handleLinkFile(file)}><VscLink /></button>
                                </div>
                            )}
                        </li>
                    })}</ul>
                </CollapsibleSection>
                <CollapsibleSection title="Summary" isCollapsed={isThoughtsCollapsed} onToggle={() => setThoughtsCollapsed(p => !p)}><ReactMarkdown>{activeTabData.parsedContent.summary}</ReactMarkdown></CollapsibleSection>
                <CollapsibleSection title="Course of Action" isCollapsed={isActionCollapsed} onToggle={() => setActionCollapsed(p => !p)}><ReactMarkdown>{activeTabData.parsedContent.courseOfAction}</ReactMarkdown></CollapsibleSection>
            </div>
            <div className="resizer" onMouseDown={handleMouseDown} />
            <div className="parsed-view-right">
                <div className="response-acceptance-header"><button className={`styled-button ${selectedResponseId === activeTab.toString() ? 'toggled' : ''}`} onClick={() => setSelectedResponseId(prev => prev === activeTab.toString() ? null : activeTab.toString())}>{selectedResponseId === activeTab.toString() ? 'Response Selected' : 'Select This Response'}</button><button className="styled-button" onClick={handleSelectAllFilesToggle}><VscCheckAll/> {isAllFilesSelected ? 'Deselect All' : 'Select All'}</button><button className="styled-button" onClick={handleAcceptSelectedFiles} disabled={selectedFilesForReplacement.size === 0}><VscSave/> Accept Selected</button></div>
                <div className="file-content-viewer-header">
                    <span className="file-path" title={selectedFilePath || ''}>{selectedFilePath ? path.basename(selectedFilePath) : 'No file selected'}</span>
                    <div className="file-actions">
                        <div className="file-metadata">
                            {currentComparisonMetrics && currentComparisonMetrics.originalTokens !== -1 && (
                                <>
                                    <span>Original: {formatLargeNumber(currentComparisonMetrics.originalTokens, 1)} tk</span>
                                    <span>New: {formatLargeNumber(currentComparisonMetrics.modifiedTokens, 1)} tk</span>
                                    <span>Similarity: {(currentComparisonMetrics.similarity * 100).toFixed(0)}%</span>
                                </>
                            )}
                             {currentComparisonMetrics && currentComparisonMetrics.originalTokens === -1 && (
                                <span style={{color: 'var(--vscode-errorForeground)'}}>Original file not found</span>
                             )}
                        </div>
                        <button onClick={handleCopyContent} title="Copy file content" disabled={!selectedFilePath}><VscClippy /></button>
                    </div>
                </div>
                <CodeViewer htmlContent={viewableContent} />
            </div>
        </div>;
    };

    return <div className="pc-view-container">
        <div className="pc-header"><div className="pc-toolbar"><button onClick={handleGeneratePrompt} title="Generate prompt.md"><VscFileCode /> Generate prompt.md</button><button onClick={handleLogState} title="Log Current State"><VscBug/></button><button onClick={handleGlobalParseToggle}><VscWand /> {isParsedMode ? 'Un-Parse All' : 'Parse All'}</button></div><div className="tab-count-input"><label htmlFor="tab-count">Responses:</label><input type="number" id="tab-count" min="1" max="20" value={tabCount} onChange={e => setTabCount(parseInt(e.target.value, 10) || 1)} /></div></div>
        <CollapsibleSection title="Cycle & Context" isCollapsed={isCycleCollapsed} onToggle={() => setIsCycleCollapsed(p => !p)} collapsedContent={collapsedNavigator} className={isReadyForNextCycle ? 'selected' : ''}><div className="cycle-navigator"><span>Cycle:</span><button onClick={(e) => handleCycleChange(e, currentCycle - 1)} disabled={currentCycle <= 1}><VscChevronLeft /></button><input type="number" value={currentCycle} onChange={e => setCurrentCycle(parseInt(e.target.value, 10) || 0)} className="cycle-input" /><button onClick={(e) => handleCycleChange(e, currentCycle + 1)} disabled={currentCycle >= maxCycle}><VscChevronRight /></button><button onClick={handleNewCycle} title="New Cycle" disabled={isNewCycleButtonDisabled}><VscAdd /></button><input type="text" className="cycle-title-input" placeholder="Cycle Title..." value={cycleTitle} onChange={e => setCycleTitle(e.target.value)} /><button onClick={handleDeleteCycle} title="Delete Current Cycle"><VscTrash /></button><button onClick={handleResetHistory} title="Reset All History"><VscSync /></button></div><div className="context-inputs"><textarea className="context-textarea" placeholder="Cycle Context (notes for this cycle)..." value={cycleContext} onChange={e => setCycleContext(e.target.value)} /><textarea className="context-textarea" placeholder="Ephemeral Context (for this cycle's prompt only)..." value={ephemeralContext} onChange={e => setEphemeralContext(e.target.value)} /></div></CollapsibleSection>
        <div className="tab-bar-container">
            <div className="tab-bar">{sortedTabIds.map((tabIndex) => {
                const tabData = tabs[tabIndex.toString()];
                const parsedData = tabData?.parsedContent;
                return <div key={tabIndex} className={`tab ${activeTab === tabIndex ? 'active' : ''} ${selectedResponseId === tabIndex.toString() ? 'selected' : ''}`} onClick={() => setActiveTab(tabIndex)}><div className="tab-title">Resp {tabIndex}</div>{isParsedMode && parsedData && (<div className="tab-metadata"><span><VscFileCode /> {parsedData.files.length}</span><span><VscSymbolNumeric /> {formatLargeNumber(parsedData.totalTokens, 1)}</span></div>)}</div>;
            })}</div>
            {isParsedMode && <button onClick={() => setIsSortedByLength(p => !p)} className="sort-button" title="Sort responses by token count">{isSortedByLength ? <VscListOrdered/> : <VscListUnordered/>} Sort</button>}
        </div>
        <div className="tab-content">{activeTab !== null && <div className="tab-pane">{renderContent()}</div>}</div>
    </div>;
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);