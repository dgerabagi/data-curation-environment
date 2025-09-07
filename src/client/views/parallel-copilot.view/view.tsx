// src/client/views/parallel-copilot.view/view.tsx
// Updated on: C188 (Add diagnostic logging and error handling)
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './view.scss';
import { VscWand, VscFileCode, VscBug, VscBook, VscFolder, VscChevronDown } from 'react-icons/vsc';
import { ClientPostMessageManager } from '../../../common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '../../../common/ipc/channels.enum';
import { ParsedResponse, PcppCycle, PcppResponse } from '../../../common/types/pcpp.types';
import { parseResponse } from '../../../client/utils/response-parser';
import { BatchWriteFile, ComparisonMetrics } from '../../../common/ipc/channels.type';
import OnboardingView from './OnboardingView';
import { formatLargeNumber } from '../../../common/utils/formatting';
import CycleNavigator from './components/CycleNavigator';
import ContextInputs from './components/ContextInputs';
import ResponseTabs from './components/ResponseTabs';
import ResponsePane from './components/ResponsePane';
import * as path from 'path-browserify';

console.log('[PCPP View] view.tsx module loaded');

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const debouncedFunction = React.useCallback((...args: any[]) => { if (timeoutRef.current) clearTimeout(timeoutRef.current); timeoutRef.current = setTimeout(() => callback(...args), delay); }, [callback, delay]);
    return debouncedFunction;
};

export interface TabState {
    rawContent: string;
    parsedContent: ParsedResponse | null;
}

const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode; isCollapsed: boolean; onToggle: () => void; collapsedContent?: React.ReactNode; className?: string; extraHeaderContent?: React.ReactNode; }> = ({ title, children, isCollapsed, onToggle, collapsedContent, className, extraHeaderContent }) => (
    <div className="collapsible-section">
        <div className={`collapsible-header ${className || ''}`} onClick={onToggle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><VscChevronDown className={`chevron ${isCollapsed ? 'collapsed' : ''}`} /><span>{title}</span></div>
            {isCollapsed ? collapsedContent : extraHeaderContent}
        </div>
        {!isCollapsed && <div className="collapsible-content">{children}</div>}
    </div>
);

const App = () => {
    console.log('[PCPP View] App component rendering...');
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
    const [selectedFilesForReplacement, setSelectedFilesForReplacement] = React.useState<Set<string>>(new Set());
    const [selectedResponseId, setSelectedResponseId] = React.useState<string | null>(null);
    const [comparisonMetrics, setComparisonMetrics] = React.useState<Map<string, ComparisonMetrics>>(new Map());
    const [isSortedByTokens, setIsSortedByTokens] = React.useState(false);
    const [pathOverrides, setPathOverrides] = React.useState<Map<string, string>>(new Map());
    const [tempOverridePath, setTempOverridePath] = React.useState('');
    const [cycleContextTokens, setCycleContextTokens] = React.useState(0);
    const [ephemeralContextTokens, setEphemeralContextTokens] = React.useState(0);
    const [totalPromptTokens, setTotalPromptTokens] = React.useState(0);
    const [estimatedPromptCost, setEstimatedPromptCost] = React.useState(0);
    const [costBreakdown, setCostBreakdown] = React.useState<{[key: string]: number} | null>(null);
    const [workflowStep, setWorkflowStep] = React.useState<string | null>(null);

    const clientIpc = ClientPostMessageManager.getInstance();
    
    const stateRef = React.useRef({
        currentCycle, cycleTitle, cycleContext, ephemeralContext, tabs, tabCount, isParsedMode, leftPaneWidth, selectedResponseId, selectedFilesForReplacement, isSortedByTokens, pathOverrides
    });

    React.useEffect(() => {
        stateRef.current = {
            currentCycle, cycleTitle, cycleContext, ephemeralContext, tabs, tabCount, isParsedMode, leftPaneWidth, selectedResponseId, selectedFilesForReplacement, isSortedByTokens, pathOverrides
        };
    }, [currentCycle, cycleTitle, cycleContext, ephemeralContext, tabs, tabCount, isParsedMode, leftPaneWidth, selectedResponseId, selectedFilesForReplacement, isSortedByTokens, pathOverrides]);

    const saveCurrentCycleState = React.useCallback((immediate = false) => {
        const { currentCycle, cycleTitle, cycleContext, ephemeralContext, tabs, tabCount, isParsedMode, leftPaneWidth, selectedResponseId, selectedFilesForReplacement, isSortedByTokens, pathOverrides } = stateRef.current;

        if (currentCycle === null) return;
        const responses: { [key: string]: PcppResponse } = {};
        for (let i = 1; i <= tabCount; i++) {
            responses[i.toString()] = { content: tabs[i.toString()]?.rawContent || '' };
        }
        if (currentCycle === 0) {
            clientIpc.sendToServer(ClientToServerChannel.SaveCycleData, { cycleData: { cycleId: 0, cycleContext, ephemeralContext: '', responses: {}, timestamp: new Date().toISOString(), title: 'Project Setup' } });
            return;
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
            isSortedByTokens,
            pathOverrides: Object.fromEntries(pathOverrides)
        };
        clientIpc.sendToServer(ClientToServerChannel.SaveCycleData, { cycleData });
    }, [clientIpc]);
    
    const debouncedSave = useDebounce(saveCurrentCycleState, 1000);
    const getCurrentCycleData = React.useCallback(() => stateRef.current, []);
    const requestCostEstimation = React.useCallback(() => { const cycleData = getCurrentCycleData(); if (cycleData.currentCycle) clientIpc.sendToServer(ClientToServerChannel.RequestPromptCostBreakdown, { cycleData: cycleData as any }); }, [clientIpc, getCurrentCycleData]);
    const debouncedCostRequest = useDebounce(requestCostEstimation, 500);

    React.useEffect(() => { debouncedSave(); debouncedCostRequest(); }, [cycleTitle, cycleContext, ephemeralContext, tabs, isParsedMode, leftPaneWidth, selectedResponseId, selectedFilesForReplacement, tabCount, isSortedByTokens, pathOverrides, debouncedSave, debouncedCostRequest]);
    React.useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                saveCurrentCycleState(true);
                if (stateRef.current.currentCycle !== null) {
                    clientIpc.sendToServer(ClientToServerChannel.SaveLastViewedCycle, { cycleId: stateRef.current.currentCycle });
                }
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (stateRef.current.currentCycle !== null) {
                clientIpc.sendToServer(ClientToServerChannel.SaveLastViewedCycle, { cycleId: stateRef.current.currentCycle });
            }
        };
    }, [saveCurrentCycleState, clientIpc]);
    const parseAllTabs = React.useCallback(() => { setTabs(prevTabs => { const allFilePaths = new Set<string>(); const updatedTabs = { ...prevTabs }; let needsUpdate = false; Object.values(updatedTabs).forEach(tabState => { if (tabState.rawContent && !tabState.parsedContent) { needsUpdate = true; const parsed = parseResponse(tabState.rawContent); tabState.parsedContent = parsed; parsed.filesUpdated.forEach(file => allFilePaths.add(file)); parsed.files.forEach(file => { const lang = path.extname(file.path).substring(1) || 'plaintext'; const id = `${file.path}::${file.content}`; clientIpc.sendToServer(ClientToServerChannel.RequestSyntaxHighlight, { code: file.content, lang, id }); }); } else if (tabState.parsedContent) { tabState.parsedContent.filesUpdated.forEach(file => allFilePaths.add(file)); } }); if (allFilePaths.size > 0) clientIpc.sendToServer(ClientToServerChannel.RequestFileExistence, { paths: Array.from(allFilePaths) }); return needsUpdate ? updatedTabs : prevTabs; }); }, [clientIpc]);
    
    React.useEffect(() => { console.log(`[PCPP WORKFLOW] Step changed to: ${workflowStep}`); }, [workflowStep]);

    const isReadyForNextCycle = React.useMemo(() => { const hasTitle = cycleTitle && cycleTitle.trim() !== 'New Cycle' && cycleTitle.trim() !== ''; const hasContext = cycleContext.trim() !== ''; const hasSelectedResponse = selectedResponseId !== null; return hasTitle && hasContext && hasSelectedResponse; }, [cycleTitle, cycleContext, selectedResponseId]);

    React.useEffect(() => { if (workflowStep === null) return; if (workflowStep === 'readyForNewCycle') return; if (workflowStep === 'awaitingGeneratePrompt') { if (isReadyForNextCycle) setWorkflowStep('awaitingGeneratePrompt'); return; } if (workflowStep === 'awaitingCycleTitle') { if (cycleTitle.trim() && cycleTitle.trim() !== 'New Cycle') { setWorkflowStep('awaitingGeneratePrompt'); } return; } if (workflowStep === 'awaitingCycleContext') { if (cycleContext.trim()) { setWorkflowStep('awaitingCycleTitle'); } return; } if (workflowStep === 'awaitingAccept') { return; } if (workflowStep === 'awaitingBaseline') { clientIpc.sendToServer(ClientToServerChannel.RequestGitStatus, {}); return; } if (workflowStep === 'awaitingFileSelect') { if (selectedFilesForReplacement.size > 0) { setWorkflowStep('awaitingAccept'); } return; } if (workflowStep === 'awaitingResponseSelect') { if (selectedResponseId) { setWorkflowStep('awaitingBaseline'); } return; } if (workflowStep === 'awaitingSort') { if (isSortedByTokens) { setWorkflowStep('awaitingResponseSelect'); } return; } if (workflowStep === 'awaitingParse') { if (isParsedMode) { setWorkflowStep(isSortedByTokens ? 'awaitingResponseSelect' : 'awaitingSort'); } return; } const waitingForPaste = workflowStep?.startsWith('awaitingResponsePaste'); if (waitingForPaste) { for (let i = 1; i <= tabCount; i++) { if (!tabs[i.toString()]?.rawContent?.trim()) { setWorkflowStep(`awaitingResponsePaste_${i}`); return; } } setWorkflowStep('awaitingParse'); } }, [workflowStep, selectedFilesForReplacement, selectedResponseId, isSortedByTokens, isParsedMode, tabs, cycleContext, cycleTitle, tabCount, isReadyForNextCycle, clientIpc]);
    React.useEffect(() => { const loadCycleData = (cycleData: PcppCycle, scope?: string) => { console.log(`[PCPP View] Loading cycle data for cycle ${cycleData.cycleId}`); setCurrentCycle(cycleData.cycleId); setProjectScope(scope); setCycleTitle(cycleData.title); setCycleContext(cycleData.cycleContext); setEphemeralContext(cycleData.ephemeralContext); setCycleContextTokens(Math.ceil((cycleData.cycleContext || '').length / 4)); setEphemeralContextTokens(Math.ceil((cycleData.ephemeralContext || '').length / 4)); const newTabs: { [key: string]: TabState } = {}; Object.entries(cycleData.responses).forEach(([tabId, response]) => { newTabs[tabId] = { rawContent: response.content, parsedContent: null }; }); setTabs(newTabs); setTabCount(cycleData.tabCount || 4); setIsParsedMode(cycleData.isParsedMode || false); setLeftPaneWidth(cycleData.leftPaneWidth || 33); setSelectedResponseId(cycleData.selectedResponseId || null); setSelectedFilesForReplacement(new Set(cycleData.selectedFilesForReplacement || [])); setIsSortedByTokens(cycleData.isSortedByTokens || false); setPathOverrides(new Map(Object.entries(cycleData.pathOverrides || {}))); }; clientIpc.onServerMessage(ServerToClientChannel.SendInitialCycleData, ({ cycleData, projectScope }) => { loadCycleData(cycleData, projectScope); setMaxCycle(cycleData.cycleId); if (cycleData.cycleId === 0) setWorkflowStep('awaitingProjectScope'); else if (cycleData.cycleId === 1 && !cycleData.cycleContext) setWorkflowStep('awaitingResponsePaste_1'); }); clientIpc.onServerMessage(ServerToClientChannel.SendCycleData, ({ cycleData, projectScope }) => { if (cycleData) loadCycleData(cycleData, projectScope); }); clientIpc.onServerMessage(ServerToClientChannel.SendSyntaxHighlight, ({ highlightedHtml, id }) => setHighlightedCodeBlocks(prev => new Map(prev).set(id, highlightedHtml))); clientIpc.onServerMessage(ServerToClientChannel.SendFileExistence, ({ existenceMap }) => setFileExistenceMap(new Map(Object.entries(existenceMap)))); clientIpc.onServerMessage(ServerToClientChannel.ForceRefresh, ({ reason }) => { if (reason === 'history') clientIpc.sendToServer(ClientToServerChannel.RequestInitialCycleData, {}); }); clientIpc.onServerMessage(ServerToClientChannel.FilesWritten, ({ paths }) => { setFileExistenceMap(prevMap => { const newMap = new Map(prevMap); paths.forEach(p => newMap.set(p, true)); return newMap; }); }); clientIpc.onServerMessage(ServerToClientChannel.SendFileComparison, ({ filePath, originalTokens, modifiedTokens, similarity }) => { setComparisonMetrics(prev => new Map(prev).set(filePath, { originalTokens, modifiedTokens, similarity })); }); clientIpc.onServerMessage(ServerToClientChannel.SendPromptCostEstimation, ({ totalTokens, estimatedCost, breakdown }) => { setTotalPromptTokens(totalTokens); setEstimatedPromptCost(estimatedCost); setCostBreakdown(breakdown); }); clientIpc.onServerMessage(ServerToClientChannel.NotifyGitOperationResult, (result) => { console.log(`[PCPP VIEW] Received NotifyGitOperationResult: ${JSON.stringify(result)}`); if (result.success) { setWorkflowStep(prevStep => { console.log(`[PCPP WORKFLOW] Functional update. Prev step: ${prevStep}.`); if (prevStep === 'awaitingBaseline') { console.log(`[PCPP WORKFLOW] Advancing from 'awaitingBaseline' to 'awaitingFileSelect'.`); clientIpc.sendToServer(ClientToServerChannel.RequestShowInformationMessage, { message: result.message }); return 'awaitingFileSelect'; } return prevStep; }); } else { console.error(`[PCPP VIEW] Git operation failed: ${result.message}`); } }); clientIpc.onServerMessage(ServerToClientChannel.SendGitStatus, ({ isClean }) => { if (isClean && workflowStep === 'awaitingBaseline') { setWorkflowStep('awaitingFileSelect'); } }); clientIpc.sendToServer(ClientToServerChannel.RequestInitialCycleData, {}); }, [clientIpc]);
    React.useEffect(() => { if (isParsedMode) parseAllTabs(); }, [isParsedMode, tabs, parseAllTabs]);
    React.useEffect(() => { if (!selectedFilePath) return; const currentTabData = tabs[activeTab.toString()]; if (currentTabData?.parsedContent) { const fileExistsInTab = currentTabData.parsedContent.files.some(f => f.path === selectedFilePath); if (!fileExistsInTab) setSelectedFilePath(null); } }, [activeTab, tabs, selectedFilePath]);

    const isNewCycleButtonDisabled = React.useMemo(() => { if (currentCycle === 0) return true; if (currentCycle !== maxCycle) return true; return !isReadyForNextCycle; }, [currentCycle, maxCycle, isReadyForNextCycle]);

    const handleCycleChange = (e: React.MouseEvent | null, newCycle: number) => { e?.stopPropagation(); if (newCycle >= 0 && newCycle <= maxCycle) { saveCurrentCycleState(true); if (currentCycle !== null) clientIpc.sendToServer(ClientToServerChannel.SaveLastViewedCycle, { cycleId: currentCycle }); setSelectedFilesForReplacement(new Set()); setCurrentCycle(newCycle); clientIpc.sendToServer(ClientToServerChannel.RequestCycleData, { cycleId: newCycle }); setWorkflowStep(null); } };
    const handleSelectForViewing = (filePath: string) => { const newPath = selectedFilePath === filePath ? null : filePath; setSelectedFilePath(newPath); if (newPath) { const file = activeTabData?.parsedContent?.files.find(f => f.path === newPath); const pathForComparison = pathOverrides.get(newPath) || newPath; if (file) clientIpc.sendToServer(ClientToServerChannel.RequestFileComparison, { filePath: pathForComparison, modifiedContent: file.content }); } };
    const handleAcceptSelectedFiles = () => { if (selectedFilesForReplacement.size === 0) return; const filesToWrite: BatchWriteFile[] = []; selectedFilesForReplacement.forEach(compositeKey => { const [responseId, filePath] = compositeKey.split(':::'); const responseData = tabs[responseId]; if (responseData?.parsedContent) { const file = responseData.parsedContent.files.find(f => f.path === filePath); if (file) { const finalPath = pathOverrides.get(file.path) || file.path; filesToWrite.push({ path: finalPath, content: file.content }); } } }); if (filesToWrite.length > 0) clientIpc.sendToServer(ClientToServerChannel.RequestBatchFileWrite, { files: filesToWrite }); setWorkflowStep('awaitingCycleContext'); };
    const handleLinkFile = (originalPath: string) => { if (tempOverridePath.trim()) { setPathOverrides(prev => new Map(prev).set(originalPath, tempOverridePath.trim())); setFileExistenceMap(prev => new Map(prev).set(originalPath, true)); setTempOverridePath(''); handleSelectForViewing(originalPath); } };
    const handleUnlinkFile = (originalPath: string) => { setPathOverrides(prev => { const newMap = new Map(prev); newMap.delete(originalPath); return newMap; }); setFileExistenceMap(prev => new Map(prev).set(originalPath, false)); };
    const onCycleContextChange = React.useCallback((value: string) => { setCycleContext(value); setCycleContextTokens(Math.ceil(value.length / 4)); }, []);
    const onEphemeralContextChange = React.useCallback((value: string) => { setEphemeralContext(value); setEphemeralContextTokens(Math.ceil(value.length / 4)); }, []);
    const activeTabData = tabs[activeTab.toString()];
    const sortedTabIds = React.useMemo(() => { const tabIds = [...Array(tabCount)].map((_, i) => i + 1); if (isParsedMode && isSortedByTokens) tabIds.sort((a, b) => { const tokensA = tabs[a.toString()]?.parsedContent?.totalTokens ?? -1; const tokensB = tabs[b.toString()]?.parsedContent?.totalTokens ?? -1; return tokensB - tokensA; }); return tabIds; }, [tabs, isParsedMode, isSortedByTokens, tabCount]);
    const viewableContent = React.useMemo(() => { if (!selectedFilePath || !activeTabData?.parsedContent) return undefined; const file = activeTabData.parsedContent.files.find(f => f.path === selectedFilePath); if (!file) return '<div>Error: File data not found in parsed response.</div>'; const id = `${file.path}::${file.content}`; return highlightedCodeBlocks.get(id); }, [selectedFilePath, activeTabData?.parsedContent, highlightedCodeBlocks]);
    const handleRawContentChange = (newContent: string, tabIndex: number) => setTabs(prev => ({ ...prev, [tabIndex.toString()]: { rawContent: newContent, parsedContent: null }}));
    const handleContextKeyDown = React.useCallback(() => { /* Placeholder for potential future use */ }, []);
    
    const handleSortToggle = () => { if (workflowStep === 'awaitingSort') { setIsSortedByTokens(true); } else { setIsSortedByTokens(p => !p); } };
    const handleGlobalParseToggle = () => { const newParseMode = !isParsedMode; setIsParsedMode(newParseMode); setSelectedFilePath(null); if (!newParseMode) setTabs(prev => { const newTabs = {...prev}; Object.keys(newTabs).forEach(key => { newTabs[key].parsedContent = null; }); return newTabs; }); };
    const handleNewCycle = (e: React.MouseEvent) => { e.stopPropagation(); saveCurrentCycleState(true); const newCycleId = maxCycle + 1; setMaxCycle(newCycleId); setCurrentCycle(newCycleId); setCycleTitle('New Cycle'); setCycleContext(''); setEphemeralContext(''); setTabs({}); setIsParsedMode(false); setSelectedResponseId(null); setSelectedFilesForReplacement(new Set()); setWorkflowStep('awaitingResponsePaste_1'); };
    const handleGeneratePrompt = () => { if (currentCycle === null) return; clientIpc.sendToServer(ClientToServerChannel.RequestCreatePromptFile, { cycleTitle, currentCycle }); setWorkflowStep('readyForNewCycle'); }
    const handleDeleteCycle = () => { if(currentCycle !== null) clientIpc.sendToServer(ClientToServerChannel.RequestDeleteCycle, { cycleId: currentCycle }); };
    const handleResetHistory = () => { clientIpc.sendToServer(ClientToServerChannel.RequestResetHistory, {}); };
    const handleExportHistory = () => clientIpc.sendToServer(ClientToServerChannel.RequestExportHistory, {});
    const handleImportHistory = () => clientIpc.sendToServer(ClientToServerChannel.RequestImportHistory, {});
    const handleGitBaseline = () => { const commitMessage = `DCE Baseline: Cycle ${currentCycle} - ${cycleTitle || 'New Cycle'}`; clientIpc.sendToServer(ClientToServerChannel.RequestGitBaseline, { commitMessage }); };
    const handleGitRestore = () => { clientIpc.sendToServer(ClientToServerChannel.RequestGitRestore, {}); };
    const handleFileSelectionToggle = (filePath: string) => { const currentTabId = activeTab.toString(); const compositeKeyForCurrent = `${currentTabId}:::${filePath}`; setSelectedFilesForReplacement(prev => { const newSet = new Set(prev); let existingKey: string | undefined; for (const key of newSet) if (key.endsWith(`:::${filePath}`)) { existingKey = key; break; } if (existingKey) { if (existingKey === compositeKeyForCurrent) newSet.delete(existingKey); else { newSet.delete(existingKey); newSet.add(compositeKeyForCurrent); } } else newSet.add(compositeKeyForCurrent); return newSet; }); };
    const handleSelectAllFilesToggle = () => { if (!activeTabData?.parsedContent) return; const allFilesForTab = activeTabData.parsedContent.filesUpdated.map(fp => `${activeTab}:::${fp}`); const isAllSelected = allFilesForTab.every(key => selectedFilesForReplacement.has(key)); setSelectedFilesForReplacement(prev => { const newSet = new Set(prev); if (isAllSelected) allFilesForTab.forEach(key => newSet.delete(key)); else allFilesForTab.forEach(key => newSet.add(key)); return newSet; }); };
    const isAllFilesSelected = React.useMemo(() => { if (!activeTabData?.parsedContent) return false; const allFiles = activeTabData.parsedContent.filesUpdated; if (allFiles.length === 0) return false; return allFiles.every(file => selectedFilesForReplacement.has(`${activeTab}:::${file}`)); }, [selectedFilesForReplacement, activeTabData, activeTab]);
    const handleLogState = () => { const currentState = getCurrentCycleData(); if (currentState) clientIpc.sendToServer(ClientToServerChannel.RequestLogState, { currentState: currentState as any }); };
    const handleCopyContent = () => { if (!selectedFilePath || !activeTabData?.parsedContent) return; const file = activeTabData.parsedContent.files.find(f => f.path === selectedFilePath); if (file) clientIpc.sendToServer(ClientToServerChannel.RequestCopyTextToClipboard, { text: file.content }); };
    const costBreakdownTooltip = React.useMemo(() => { if (!costBreakdown) return "Calculating..."; return Object.entries(costBreakdown).map(([key, value]) => `${key}: ${formatLargeNumber(value, 1)} tk`).join('\n'); }, [costBreakdown]);

    if (currentCycle === null) return <div>Loading...</div>;
    if (currentCycle === -1) return <div className="onboarding-container"><h1>No Folder Opened</h1><p>You have not yet opened a folder for the Data Curation Environment to manage.</p><button className="dce-button-primary" onClick={() => clientIpc.sendToServer(ClientToServerChannel.RequestOpenFolder, {})}><VscFolder /> Open Folder</button></div>;
    if (currentCycle === 0) return <OnboardingView initialProjectScope={projectScope} onNavigateToCycle={(id) => handleCycleChange(null, id)} latestCycleId={maxCycle} onScopeChange={setCycleContext} workflowStep={workflowStep} />;
    
    const collapsedNavigator = <div className="collapsed-navigator"><button onClick={(e) => handleCycleChange(e, currentCycle - 1)} disabled={currentCycle <= 0}>&lt;</button><span className="cycle-display">C{currentCycle}</span><button onClick={(e) => handleCycleChange(e, currentCycle + 1)} disabled={currentCycle >= maxCycle}>&gt;</button></div>;
    const currentComparisonMetrics = selectedFilePath ? comparisonMetrics.get(pathOverrides.get(selectedFilePath) || selectedFilePath) : null;
    const totalPromptCostDisplay = ( <span className="total-prompt-cost" title={costBreakdownTooltip}> Total Est: ({formatLargeNumber(totalPromptTokens, 1)} tk) ~ ${estimatedPromptCost.toFixed(4)} {tabCount > 1 && ` x ${tabCount} = $${(estimatedPromptCost * tabCount).toFixed(4)}`} </span> );

    return <div className="pc-view-container">
        <div className="pc-header"><div className="pc-toolbar"><button onClick={(e) => handleCycleChange(e, 0)} title="Project Plan"><VscBook /> Project Plan</button><button onClick={handleGeneratePrompt} title="Generate prompt.md" className={workflowStep === 'awaitingGeneratePrompt' ? 'workflow-highlight' : ''}><VscFileCode /> Generate prompt.md</button><button onClick={handleLogState} title="Log Current State"><VscBug/></button><button onClick={handleGlobalParseToggle} className={`${isParsedMode ? 'active' : ''} ${workflowStep === 'awaitingParse' ? 'workflow-highlight' : ''}`}><VscWand /> {isParsedMode ? 'Un-Parse All' : 'Parse All'}</button></div><div className="tab-count-input"><label htmlFor="tab-count">Responses:</label><input type="number" id="tab-count" min="1" max="20" value={tabCount} onChange={e => setTabCount(parseInt(e.target.value, 10) || 1)} /></div></div>
        <CollapsibleSection title="Cycle & Context" isCollapsed={isCycleCollapsed} onToggle={() => setIsCycleCollapsed(p => !p)} collapsedContent={collapsedNavigator} className={isReadyForNextCycle ? 'selected' : ''} extraHeaderContent={totalPromptCostDisplay}>
            <CycleNavigator currentCycle={currentCycle} maxCycle={maxCycle} cycleTitle={cycleTitle} isNewCycleButtonDisabled={isNewCycleButtonDisabled} onCycleChange={handleCycleChange} onNewCycle={handleNewCycle} onTitleChange={(title) => { setCycleTitle(title); }} onDeleteCycle={handleDeleteCycle} onResetHistory={handleResetHistory} onExportHistory={handleExportHistory} onImportHistory={handleImportHistory} onGitBaseline={handleGitBaseline} onGitRestore={handleGitRestore} workflowStep={workflowStep} />
            <ContextInputs cycleContext={cycleContext} ephemeralContext={ephemeralContext} cycleContextTokens={cycleContextTokens} ephemeralContextTokens={ephemeralContextTokens} onCycleContextChange={onCycleContextChange} onEphemeralContextChange={onEphemeralContextChange} workflowStep={workflowStep} />
        </CollapsibleSection>
        <ResponseTabs sortedTabIds={sortedTabIds} tabs={tabs} activeTab={activeTab} selectedResponseId={selectedResponseId} isParsedMode={isParsedMode} isSortedByTokens={isSortedByTokens} onTabSelect={setActiveTab} onSortToggle={handleSortToggle} workflowStep={workflowStep} />
        <div className="tab-content">
            <ResponsePane isParsedMode={isParsedMode} activeTabData={activeTabData} onRawContentChange={(content) => handleRawContentChange(content, activeTab)} onContextKeyDown={handleContextKeyDown} fileExistenceMap={fileExistenceMap} selectedFilePath={selectedFilePath} onSelectForViewing={handleSelectForViewing} selectedFilesForReplacement={selectedFilesForReplacement} onFileSelectionToggle={handleFileSelectionToggle} activeTab={activeTab} pathOverrides={pathOverrides} tempOverridePath={tempOverridePath} onTempOverridePathChange={setTempOverridePath} onLinkFile={handleLinkFile} onUnlinkFile={handleUnlinkFile} comparisonMetrics={currentComparisonMetrics} viewableContent={viewableContent} onCopyContent={handleCopyContent} selectedResponseId={selectedResponseId} onSelectResponse={(id) => { setSelectedResponseId(prev => prev === id ? null : id); setWorkflowStep('awaitingResponseSelect'); }} onSelectAllFiles={handleSelectAllFilesToggle} onDeselectAllFiles={() => setSelectedFilesForReplacement(new Set())} isAllFilesSelected={isAllFilesSelected} onAcceptSelected={handleAcceptSelectedFiles} leftPaneWidth={leftPaneWidth} onBaseline={handleGitBaseline} onRestore={handleGitRestore} workflowStep={workflowStep} />
        </div>
    </div>;
};

try {
    const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
    root.render(<App />);
} catch (error) {
    console.error('[PCPP View] CRITICAL: Failed to render React root.', error);
}