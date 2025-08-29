// src/client/views/parallel-copilot.view/view.tsx
// Updated on: C171 (Refactor to use CycleNavigator component and add prompt cost estimation)
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { VscWand, VscCheck, VscError, VscFileCode, VscDiff, VscSave, VscBug, VscCheckAll, VscListOrdered, VscListUnordered, VscSymbolNumeric, VscClippy, VscLink, VscDebugDisconnect, VscBook, VscFolder, VscClearAll, VscChevronDown, VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import { logger } from '@/client/utils/logger';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { ParsedResponse, PcppCycle, PcppResponse } from '@/common/types/pcpp.types';
import { parseResponse } from '@/client/utils/response-parser';
import ReactMarkdown from 'react-markdown';
import * as path from 'path-browserify';
import { BatchWriteFile, ComparisonMetrics } from '@/common/ipc/channels.type';
import OnboardingView from './OnboardingView';
import { formatLargeNumber } from '@/common/utils/formatting';
import NumberedTextarea from './components/NumberedTextarea';
import CycleNavigator from './components/CycleNavigator';
import CodeViewer from './components/CodeViewer';

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

interface TabState {
    rawContent: string;
    parsedContent: ParsedResponse | null;
}

const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode; isCollapsed: boolean; onToggle: () => void; collapsedContent?: React.ReactNode; className?: string; extraHeaderContent?: React.ReactNode; }> = ({ title, children, isCollapsed, onToggle, collapsedContent, className, extraHeaderContent }) => (
    <div className="collapsible-section">
        <div className={`collapsible-header ${className || ''}`} onClick={onToggle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <VscChevronDown className={`chevron ${isCollapsed ? 'collapsed' : ''}`} />
                <span>{title}</span>
            </div>
            {isCollapsed ? collapsedContent : extraHeaderContent}
        </div>
        {!isCollapsed && <div className="collapsible-content">{children}</div>}
    </div>
);


const App = () => {
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
    const [highlightedContexts, setHighlightedContexts] = React.useState<Map<string, string>>(new Map());
    const [fileExistenceMap, setFileExistenceMap] = React.useState<Map<string, boolean>>(new Map());
    const [isParsedMode, setIsParsedMode] = React.useState(false);
    const [selectedFilePath, setSelectedFilePath] = React.useState<string | null>(null);
    const [isCycleCollapsed, setIsCycleCollapsed] = React.useState(false);
    const [leftPaneWidth, setLeftPaneWidth] = React.useState(33);
    const [selectedFilesForReplacement, setSelectedFilesForReplacement] = React.useState<Set<string>>(new Set());
    const [selectedResponseId, setSelectedResponseId] = React.useState<string | null>(null);
    const [comparisonMetrics, setComparisonMetrics] = React.useState<Map<string, ComparisonMetrics>>(new Map());
    const [isSortedByTokens, setIsSortedByTokens] = React.useState(false);
    const [pathOverrides, setPathOverrides] = React.useState<Map<string, string>>(new Map());
    const [tempOverridePath, setTempOverridePath] = React.useState('');
    const [cycleContextHeight, setCycleContextHeight] = React.useState(100);
    const [ephemeralContextHeight, setEphemeralContextHeight] = React.useState(100);
    const [cycleContextTokens, setCycleContextTokens] = React.useState(0);
    const [ephemeralContextTokens, setEphemeralContextTokens] = React.useState(0);
    const [totalPromptTokens, setTotalPromptTokens] = React.useState(0);
    const [estimatedPromptCost, setEstimatedPromptCost] = React.useState(0);

    const [isAssociatedFilesCollapsed, setAssociatedFilesCollapsed] = React.useState(false);
    const [isThoughtsCollapsed, setThoughtsCollapsed] = React.useState(false);
    const [isActionCollapsed, setActionCollapsed] = React.useState(false);

    const clientIpc = ClientPostMessageManager.getInstance();

    const getCurrentCycleData = React.useCallback((): PcppCycle | null => {
        if (currentCycle === null) return null;
        const responses: { [key: string]: PcppResponse } = {};
        for (let i = 1; i <= tabCount; i++) {
            responses[i.toString()] = { content: tabs[i.toString()]?.rawContent || '' };
        }
        if (currentCycle === 0) {
            return { cycleId: 0, cycleContext, ephemeralContext: '', responses: {}, timestamp: new Date().toISOString(), title: 'Project Setup' };
        }
        return {
            cycleId: currentCycle, timestamp: new Date().toISOString(), title: cycleTitle, cycleContext, ephemeralContext, responses, isParsedMode, leftPaneWidth, selectedResponseId, selectedFilesForReplacement: Array.from(selectedFilesForReplacement), tabCount, isSortedByTokens, pathOverrides: Object.fromEntries(pathOverrides), cycleContextHeight, ephemeralContextHeight,
        };
    }, [currentCycle, cycleTitle, cycleContext, ephemeralContext, tabs, tabCount, isParsedMode, leftPaneWidth, selectedResponseId, selectedFilesForReplacement, isSortedByTokens, pathOverrides, cycleContextHeight, ephemeralContextHeight]);

    const saveCurrentCycleState = React.useCallback(() => {
        const cycleData = getCurrentCycleData();
        if (cycleData) {
            clientIpc.sendToServer(ClientToServerChannel.SaveCycleData, { cycleData });
        }
    }, [clientIpc, getCurrentCycleData]);
    
    const requestCostEstimation = React.useCallback(() => {
        const cycleData = getCurrentCycleData();
        if (cycleData) {
            clientIpc.sendToServer(ClientToServerChannel.RequestPromptCostEstimation, { cycleData });
        }
    }, [clientIpc, getCurrentCycleData]);

    const debouncedSave = useDebounce(saveCurrentCycleState, 1000);
    const debouncedCostRequest = useDebounce(requestCostEstimation, 500);

    React.useEffect(() => { debouncedSave(); debouncedCostRequest(); }, [cycleTitle, cycleContext, ephemeralContext, tabs, isParsedMode, leftPaneWidth, selectedResponseId, selectedFilesForReplacement, tabCount, isSortedByTokens, pathOverrides, debouncedSave, debouncedCostRequest, cycleContextHeight, ephemeralContextHeight]);
    
    React.useEffect(() => { const handleVisibilityChange = () => { if (document.visibilityState === 'hidden') saveCurrentCycleState(); }; document.addEventListener('visibilitychange', handleVisibilityChange); return () => document.removeEventListener('visibilitychange', handleVisibilityChange); }, [saveCurrentCycleState]);

    const parseAllTabs = React.useCallback(() => { setTabs(prevTabs => { const allFilePaths = new Set<string>(); const updatedTabs = { ...prevTabs }; let needsUpdate = false; Object.values(updatedTabs).forEach(tabState => { if (tabState.rawContent && !tabState.parsedContent) { needsUpdate = true; const parsed = parseResponse(tabState.rawContent); tabState.parsedContent = parsed; parsed.filesUpdated.forEach(file => allFilePaths.add(file)); parsed.files.forEach(file => { const lang = path.extname(file.path).substring(1) || 'plaintext'; const id = `${file.path}::${file.content}`; clientIpc.sendToServer(ClientToServerChannel.RequestSyntaxHighlight, { code: file.content, lang, id }); }); } else if (tabState.parsedContent) { tabState.parsedContent.filesUpdated.forEach(file => allFilePaths.add(file)); } }); if (allFilePaths.size > 0) clientIpc.sendToServer(ClientToServerChannel.RequestFileExistence, { paths: Array.from(allFilePaths) }); return needsUpdate ? updatedTabs : prevTabs; }); }, [clientIpc]);
    
    React.useEffect(() => { const loadCycleData = (cycleData: PcppCycle, scope?: string) => { setCurrentCycle(cycleData.cycleId); setProjectScope(scope); setCycleTitle(cycleData.title); setCycleContext(cycleData.cycleContext); setEphemeralContext(cycleData.ephemeralContext); setCycleContextTokens(Math.ceil((cycleData.cycleContext || '').length / 4)); setEphemeralContextTokens(Math.ceil((cycleData.ephemeralContext || '').length / 4)); const newTabs: { [key: string]: TabState } = {}; Object.entries(cycleData.responses).forEach(([tabId, response]) => { newTabs[tabId] = { rawContent: response.content, parsedContent: null }; }); setTabs(newTabs); setTabCount(cycleData.tabCount || 4); setIsParsedMode(cycleData.isParsedMode || false); setLeftPaneWidth(cycleData.leftPaneWidth || 33); setSelectedResponseId(cycleData.selectedResponseId || null); setSelectedFilesForReplacement(new Set(cycleData.selectedFilesForReplacement || [])); setIsSortedByTokens(cycleData.isSortedByTokens || false); setPathOverrides(new Map(Object.entries(cycleData.pathOverrides || {}))); setCycleContextHeight(cycleData.cycleContextHeight || 100); setEphemeralContextHeight(cycleData.ephemeralContextHeight || 100); }; clientIpc.onServerMessage(ServerToClientChannel.SendLatestCycleData, ({ cycleData, projectScope }) => { loadCycleData(cycleData, projectScope); setMaxCycle(cycleData.cycleId); }); clientIpc.onServerMessage(ServerToClientChannel.SendCycleData, ({ cycleData, projectScope }) => { if (cycleData) loadCycleData(cycleData, projectScope); }); clientIpc.onServerMessage(ServerToClientChannel.SendSyntaxHighlight, ({ highlightedHtml, id }) => setHighlightedCodeBlocks(prev => new Map(prev).set(id, highlightedHtml))); clientIpc.onServerMessage(ServerToClientChannel.SendHighlightContext, ({ highlightedHtml, id }) => setHighlightedContexts(prev => new Map(prev).set(id, highlightedHtml))); clientIpc.onServerMessage(ServerToClientChannel.SendFileExistence, ({ existenceMap }) => setFileExistenceMap(new Map(Object.entries(existenceMap)))); clientIpc.onServerMessage(ServerToClientChannel.ForceRefresh, ({ reason }) => { if (reason === 'history') clientIpc.sendToServer(ClientToServerChannel.RequestLatestCycleData, {}); }); clientIpc.onServerMessage(ServerToClientChannel.FilesWritten, ({ paths }) => { logger.log(`Received FilesWritten event for: ${paths.join(', ')}`); setFileExistenceMap(prevMap => { const newMap = new Map(prevMap); paths.forEach(p => newMap.set(p, true)); return newMap; }); }); clientIpc.onServerMessage(ServerToClientChannel.SendFileComparison, ({ filePath, originalTokens, modifiedTokens, similarity }) => { setComparisonMetrics(prev => new Map(prev).set(filePath, { originalTokens, modifiedTokens, similarity })); }); clientIpc.onServerMessage(ServerToClientChannel.SendPromptCostEstimation, ({ totalTokens, estimatedCost }) => { setTotalPromptTokens(totalTokens); setEstimatedPromptCost(estimatedCost); }); clientIpc.sendToServer(ClientToServerChannel.RequestLatestCycleData, {}); }, [clientIpc]);

    React.useEffect(() => { if (isParsedMode) parseAllTabs(); }, [isParsedMode, tabs, parseAllTabs]);
    React.useEffect(() => { if (!selectedFilePath) return; const currentTabData = tabs[activeTab.toString()]; if (currentTabData?.parsedContent) { const fileExistsInTab = currentTabData.parsedContent.files.some(f => f.path === selectedFilePath); if (!fileExistsInTab) { setSelectedFilePath(null); } } }, [activeTab, tabs, selectedFilePath]);

    const handleCycleChange = (e: React.MouseEvent | null, newCycle: number) => { e?.stopPropagation(); if (newCycle >= 0 && newCycle <= maxCycle) { if (currentCycle !== 0) saveCurrentCycleState(); setSelectedFilesForReplacement(new Set()); setCurrentCycle(newCycle); clientIpc.sendToServer(ClientToServerChannel.RequestCycleData, { cycleId: newCycle }); } };
    const handleSelectForViewing = (filePath: string) => { const newPath = selectedFilePath === filePath ? null : filePath; setSelectedFilePath(newPath); if (newPath) { const file = activeTabData?.parsedContent?.files.find(f => f.path === newPath); const pathForComparison = pathOverrides.get(newPath) || newPath; if (file) clientIpc.sendToServer(ClientToServerChannel.RequestFileComparison, { filePath: pathForComparison, modifiedContent: file.content }); } };
    const handleAcceptSelectedFiles = () => { if (selectedFilesForReplacement.size === 0) return; const filesToWrite: BatchWriteFile[] = []; selectedFilesForReplacement.forEach(compositeKey => { const [responseId, filePath] = compositeKey.split(':::'); const responseData = tabs[responseId]; if (responseData?.parsedContent) { const file = responseData.parsedContent.files.find(f => f.path === filePath); if (file) { const finalPath = pathOverrides.get(file.path) || file.path; filesToWrite.push({ path: finalPath, content: file.content }); } } }); if (filesToWrite.length > 0) clientIpc.sendToServer(ClientToServerChannel.RequestBatchFileWrite, { files: filesToWrite }); };
    const handleLinkFile = (originalPath: string) => { if (tempOverridePath.trim()) { setPathOverrides(prev => new Map(prev).set(originalPath, tempOverridePath.trim())); setFileExistenceMap(prev => new Map(prev).set(originalPath, true)); setTempOverridePath(''); handleSelectForViewing(originalPath); } };
    const handleUnlinkFile = (originalPath: string) => { setPathOverrides(prev => { const newMap = new Map(prev); newMap.delete(originalPath); return newMap; }); setFileExistenceMap(prev => new Map(prev).set(originalPath, false)); };
    const handleContextKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => { if ((e.ctrlKey || e.metaKey) && e.key === 'z') return; if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) return; };

    const activeTabData = tabs[activeTab.toString()];
    const sortedTabIds = React.useMemo(() => { const tabIds = [...Array(tabCount)].map((_, i) => i + 1); if (isParsedMode && isSortedByTokens) tabIds.sort((a, b) => { const tokensA = tabs[a.toString()]?.parsedContent?.totalTokens ?? -1; const tokensB = tabs[b.toString()]?.parsedContent?.totalTokens ?? -1; return tokensB - tokensA; }); return tabIds; }, [tabs, isParsedMode, isSortedByTokens, tabCount]);
    const viewableContent = React.useMemo(() => { if (!selectedFilePath || !activeTabData?.parsedContent) return undefined; const file = activeTabData.parsedContent.files.find(f => f.path === selectedFilePath); if (!file) return '<div>Error: File data not found in parsed response.</div>'; const id = `${file.path}::${file.content}`; return highlightedCodeBlocks.get(id); }, [selectedFilePath, activeTabData?.parsedContent, highlightedCodeBlocks]);
    const handleRawContentChange = (newContent: string, tabIndex: number) => setTabs(prev => ({ ...prev, [tabIndex.toString()]: { rawContent: newContent, parsedContent: null }}));
    const handleGlobalParseToggle = () => { const newParseMode = !isParsedMode; setIsParsedMode(newParseMode); setSelectedFilePath(null); if (!newParseMode) setTabs(prev => { const newTabs = {...prev}; Object.keys(newTabs).forEach(key => { newTabs[key].parsedContent = null; }); return newTabs; }); };
    const handleNewCycle = (e: React.MouseEvent) => { e.stopPropagation(); saveCurrentCycleState(); const newCycleId = maxCycle + 1; setMaxCycle(newCycleId); setCurrentCycle(newCycleId); setCycleTitle('New Cycle'); setCycleContext(''); setEphemeralContext(''); setTabs({}); setIsParsedMode(false); setSelectedResponseId(null); setSelectedFilesForReplacement(new Set()); };
    const handleGeneratePrompt = () => { if (currentCycle === null) return; clientIpc.sendToServer(ClientToServerChannel.RequestCreatePromptFile, { cycleTitle, currentCycle }); }
    const handleDeleteCycle = () => { if(currentCycle !== null) clientIpc.sendToServer(ClientToServerChannel.RequestDeleteCycle, { cycleId: currentCycle }); };
    const handleResetHistory = () => { if (window.confirm("Are you sure you want to delete ALL cycle history? This action cannot be undone.")) clientIpc.sendToServer(ClientToServerChannel.RequestResetHistory, {}); };
    const handleExportHistory = () => clientIpc.sendToServer(ClientToServerChannel.RequestExportHistory, {});
    const handleImportHistory = () => clientIpc.sendToServer(ClientToServerChannel.RequestImportHistory, {});
    const handleFileSelectionToggle = (filePath: string) => { const currentTabId = activeTab.toString(); const compositeKeyForCurrent = `${currentTabId}:::${filePath}`; setSelectedFilesForReplacement(prev => { const newSet = new Set(prev); let existingKey: string | undefined; for (const key of newSet) if (key.endsWith(`:::${filePath}`)) { existingKey = key; break; } if (existingKey) { if (existingKey === compositeKeyForCurrent) newSet.delete(existingKey); else { newSet.delete(existingKey); newSet.add(compositeKeyForCurrent); } } else newSet.add(compositeKeyForCurrent); return newSet; }); };
    const handleSelectAllFilesToggle = () => { if (!activeTabData?.parsedContent) return; const allFilesForTab = activeTabData.parsedContent.filesUpdated.map(fp => `${activeTab}:::${fp}`); const isAllSelected = allFilesForTab.every(key => selectedFilesForReplacement.has(key)); setSelectedFilesForReplacement(prev => { const newSet = new Set(prev); if (isAllSelected) allFilesForTab.forEach(key => newSet.delete(key)); else allFilesForTab.forEach(key => newSet.add(key)); return newSet; }); };
    const isAllFilesSelected = React.useMemo(() => { if (!activeTabData?.parsedContent) return false; const allFiles = activeTabData.parsedContent.filesUpdated; if (allFiles.length === 0) return false; return allFiles.every(file => selectedFilesForReplacement.has(`${activeTab}:::${file}`)); }, [selectedFilesForReplacement, activeTabData, activeTab]);
    const isNewCycleButtonDisabled = React.useMemo(() => { const hasTitle = cycleTitle && cycleTitle.trim() !== 'New Cycle' && cycleTitle.trim() !== ''; const hasContext = cycleContext.trim() !== ''; const hasSelectedResponse = selectedResponseId !== null; return !hasTitle || !hasContext || !hasSelectedResponse; }, [cycleTitle, cycleContext, selectedResponseId]);
    const handleLogState = () => { const currentState = getCurrentCycleData(); if (currentState) clientIpc.sendToServer(ClientToServerChannel.RequestLogState, { currentState }); };
    const handleCopyContent = () => { if (!selectedFilePath || !activeTabData?.parsedContent) return; const file = activeTabData.parsedContent.files.find(f => f.path === selectedFilePath); if (file) clientIpc.sendToServer(ClientToServerChannel.RequestCopyTextToClipboard, { text: file.content }); };
    const isReadyForNextCycle = !isNewCycleButtonDisabled;

    if (currentCycle === null) return <div>Loading...</div>;
    if (currentCycle === -1) return <div className="onboarding-container"><h1>No Folder Opened</h1><p>You have not yet opened a folder for the Data Curation Environment to manage.</p><button className="dce-button-primary" onClick={() => clientIpc.sendToServer(ClientToServerChannel.RequestOpenFolder, {})}><VscFolder /> Open Folder</button></div>;
    if (currentCycle === 0) return <OnboardingView initialProjectScope={projectScope} onNavigateToCycle={(id) => handleCycleChange(null, id)} latestCycleId={maxCycle} onScopeChange={setCycleContext} />;

    const collapsedNavigator = <div className="collapsed-navigator"><button onClick={(e) => handleCycleChange(e, currentCycle - 1)} disabled={currentCycle <= 0}><VscChevronLeft /></button><span className="cycle-display">C{currentCycle}</span><button onClick={(e) => handleCycleChange(e, currentCycle + 1)} disabled={currentCycle >= maxCycle}><VscChevronRight /></button></div>;
    const currentComparisonMetrics = selectedFilePath ? comparisonMetrics.get(pathOverrides.get(selectedFilePath) || selectedFilePath) : null;
    const totalPromptCostDisplay = <span className="total-prompt-cost" title="Estimated cost for the next prompt.md generation based on Gemini 2.5 Pro pricing.">Total Est: ({formatLargeNumber(totalPromptTokens, 1)} tk) ~ ${estimatedPromptCost.toFixed(4)}</span>;

    const renderContent = () => { if (!isParsedMode || !activeTabData?.parsedContent) { return <textarea className="response-textarea" placeholder={`Paste AI response for tab ${activeTab} here...`} value={activeTabData?.rawContent || ''} onChange={(e) => handleRawContentChange(e.target.value, activeTab)} onKeyDown={handleContextKeyDown} />; } return <div className="parsed-view-grid"><div className="parsed-view-left" style={{ flexBasis: `${leftPaneWidth}%` }}><CollapsibleSection title="Associated Files" isCollapsed={isAssociatedFilesCollapsed} onToggle={() => setAssociatedFilesCollapsed(p => !p)}><ul className="associated-files-list">{activeTabData.parsedContent.filesUpdated.map(file => { const fileExists = fileExistenceMap.get(file); const hasOverride = pathOverrides.has(file); return <li key={file} className={selectedFilePath === file ? 'selected' : ''} onClick={() => handleSelectForViewing(file)} title={file}><div className="file-row"><input type="checkbox" checked={selectedFilesForReplacement.has(`${activeTab}:::${file}`)} onChange={() => handleFileSelectionToggle(file)} onClick={e => e.stopPropagation()} />{fileExists ? <VscCheck className="status-icon exists" /> : <VscError className="status-icon not-exists" />}<span>{file}</span></div>{!fileExists && selectedFilePath === file && (<div className="path-override-container" onClick={e => e.stopPropagation()}>{hasOverride ? (<><span>Linked to: {pathOverrides.get(file)}</span><button className="styled-button" onClick={() => handleUnlinkFile(file)}><VscDebugDisconnect /> Unlink</button></>) : (<><input type="text" placeholder="Enter correct relative path..." value={tempOverridePath} onChange={e => setTempOverridePath(e.target.value)} onKeyDown={e => {if(e.key === 'Enter') handleLinkFile(file)}} /><button className="styled-button" onClick={() => handleLinkFile(file)}><VscLink /> Link</button></>)}</div>)}</li> })}</ul></CollapsibleSection><CollapsibleSection title="Summary" isCollapsed={isThoughtsCollapsed} onToggle={() => setThoughtsCollapsed(p => !p)}><ReactMarkdown>{activeTabData.parsedContent.summary}</ReactMarkdown></CollapsibleSection><CollapsibleSection title="Course of Action" isCollapsed={isActionCollapsed} onToggle={() => setActionCollapsed(p => !p)}><ReactMarkdown>{activeTabData.parsedContent.courseOfAction}</ReactMarkdown></CollapsibleSection></div><div className="resizer" /><div className="parsed-view-right"><div className="response-acceptance-header"><button className={`styled-button ${selectedResponseId === activeTab.toString() ? 'toggled' : ''}`} onClick={() => setSelectedResponseId(prev => prev === activeTab.toString() ? null : activeTab.toString())}>{selectedResponseId === activeTab.toString() ? 'Response Selected' : 'Select This Response'}</button><button className="styled-button" onClick={handleSelectAllFilesToggle}><VscCheckAll/> {isAllFilesSelected ? 'Deselect All' : 'Select All'}</button><button className="styled-button" onClick={() => setSelectedFilesForReplacement(new Set())} title="Deselect All Files Across All Responses"><VscClearAll /></button><button className="styled-button" onClick={handleAcceptSelectedFiles} disabled={selectedFilesForReplacement.size === 0}><VscSave/> Accept Selected</button></div><div className="file-content-viewer-header"><span className="file-path" title={selectedFilePath || ''}>{selectedFilePath ? path.basename(selectedFilePath) : 'No file selected'}</span><div className="file-actions"><div className="file-metadata">{currentComparisonMetrics && currentComparisonMetrics.originalTokens !== -1 && (<><span>Original: {formatLargeNumber(currentComparisonMetrics.originalTokens, 1)} tk</span><span>New: {formatLargeNumber(currentComparisonMetrics.modifiedTokens, 1)} tk</span><span>Similarity: {(currentComparisonMetrics.similarity * 100).toFixed(0)}%</span></>)}{currentComparisonMetrics && currentComparisonMetrics.originalTokens === -1 && (<span style={{color: 'var(--vscode-errorForeground)'}}>Original file not found</span>)}</div><button onClick={handleCopyContent} title="Copy file content" disabled={!selectedFilePath}><VscClippy /></button></div></div><CodeViewer htmlContent={viewableContent} /></div></div>; };

    return <div className="pc-view-container">
        <div className="pc-header"><div className="pc-toolbar"><button onClick={(e) => handleCycleChange(e, 0)} title="Project Plan"><VscBook /> Project Plan</button><button onClick={handleGeneratePrompt} title="Generate prompt.md"><VscFileCode /> Generate prompt.md</button><button onClick={handleLogState} title="Log Current State"><VscBug/></button><button onClick={handleGlobalParseToggle} className={isParsedMode ? 'active' : ''}><VscWand /> {isParsedMode ? 'Un-Parse All' : 'Parse All'}</button></div><div className="tab-count-input"><label htmlFor="tab-count">Responses:</label><input type="number" id="tab-count" min="1" max="20" value={tabCount} onChange={e => setTabCount(parseInt(e.target.value, 10) || 1)} /></div></div>
        <CollapsibleSection title="Cycle & Context" isCollapsed={isCycleCollapsed} onToggle={() => setIsCycleCollapsed(p => !p)} collapsedContent={collapsedNavigator} className={isReadyForNextCycle ? 'selected' : ''} extraHeaderContent={totalPromptCostDisplay}>
            <CycleNavigator currentCycle={currentCycle} maxCycle={maxCycle} cycleTitle={cycleTitle} isNewCycleButtonDisabled={isNewCycleButtonDisabled} onCycleChange={handleCycleChange} onNewCycle={handleNewCycle} onTitleChange={setCycleTitle} onDeleteCycle={handleDeleteCycle} onResetHistory={handleResetHistory} onExportHistory={handleExportHistory} onImportHistory={handleImportHistory}/>
            <div className="context-inputs"><div className="context-input-wrapper"><div className="context-label"><span>Cycle Context</span><span>({formatLargeNumber(cycleContextTokens, 1)} tk)</span></div><NumberedTextarea value={cycleContext} onChange={(e) => { setCycleContext(e.target.value); setCycleContextTokens(Math.ceil(e.target.value.length / 4)); }} placeholder="Cycle Context (notes for this cycle)..." onKeyDown={handleContextKeyDown} height={cycleContextHeight} onHeightChange={setCycleContextHeight} id={`cycle-context-${currentCycle}`} /></div><div className="context-input-wrapper"><div className="context-label"><span>Ephemeral Context</span><span>({formatLargeNumber(ephemeralContextTokens, 1)} tk)</span></div><NumberedTextarea value={ephemeralContext} onChange={(e) => { setEphemeralContext(e.target.value); setEphemeralContextTokens(Math.ceil(e.target.value.length / 4)); }} placeholder="Ephemeral Context (for this cycle's prompt only)..." onKeyDown={handleContextKeyDown} height={ephemeralContextHeight} onHeightChange={setEphemeralContextHeight} id={`ephemeral-context-${currentCycle}`} /></div></div>
        </CollapsibleSection>
        <div className="tab-bar-container"><div className="tab-bar">{sortedTabIds.map((tabIndex) => { const tabData = tabs[tabIndex.toString()]; const parsedData = tabData?.parsedContent; return <div key={tabIndex} className={`tab ${activeTab === tabIndex ? 'active' : ''} ${selectedResponseId === tabIndex.toString() ? 'selected' : ''}`} onClick={() => setActiveTab(tabIndex)}><div className="tab-title">Resp {tabIndex}</div>{isParsedMode && parsedData && (<div className="tab-metadata"><span><VscFileCode /> {parsedData.files.length}</span><span><VscSymbolNumeric /> {formatLargeNumber(parsedData.totalTokens, 1)}</span></div>)}</div>; })}</div>{isParsedMode && <button onClick={() => setIsSortedByTokens(p => !p)} className={`sort-button ${isSortedByTokens ? 'active' : ''}`} title="Sort responses by token count">{isSortedByTokens ? <VscListOrdered/> : <VscListUnordered/>} Sort</button>}</div>
        <div className="tab-content">{activeTab !== null && <div className="tab-pane">{renderContent()}</div>}</div>
    </div>;
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);