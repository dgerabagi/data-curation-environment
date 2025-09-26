// src/client/views/parallel-copilot.view/view.tsx
// Updated on: C71 (Add logging to auto-navigation)
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './view.scss';
import { VscWand, VscFileCode, VscBug, VscBook, VscFolder, VscChevronDown, VscLoading, VscCheck, VscVm, VscWarning, VscSync, VscGoToFile } from 'react-icons/vsc';
import { ClientPostMessageManager } from '../../../common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '../../../common/ipc/channels.enum';
import { ParsedResponse, PcppCycle, PcppResponse } from '../../../common/types/pcpp.types';
import { parseResponse } from '../../../client/utils/response-parser';
import { BatchWriteFile, ComparisonMetrics, GenerationProgress } from '../../../common/ipc/channels.type';
import OnboardingView from './OnboardingView';
import { formatLargeNumber } from '../../../common/utils/formatting';
import CycleNavigator from './components/CycleNavigator';
import ContextInputs from './components/ContextInputs';
import ResponseTabs from './components/ResponseTabs';
import ResponsePane from './components/ResponsePane';
import * as path from 'path-browserify';
import WorkflowToolbar from './components/WorkflowToolbar';
import { logger } from '../../utils/logger';
import { ConnectionMode, DceSettings } from '../../../backend/services/settings.service';
import GenerationProgressDisplay from './components/GenerationProgressDisplay';

const MAX_TOKENS_PER_RESPONSE = 16384; // Configurable constant

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    const debouncedFunction = React.useCallback((...args: any[]) => { if (timeoutRef.current) clearTimeout(timeoutRef.current); timeoutRef.current = setTimeout(() => callback(...args), delay); }, [callback, delay]);
    return debouncedFunction;
};

export interface TabState {
    rawContent: string;
    parsedContent: ParsedResponse | null;
    isLoading?: boolean;
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
    // State declarations...
    const [activeTab, setActiveTab] = React.useState(1);
    const [tabCount, setTabCount] = React.useState(4);
    const [currentCycle, setCurrentCycle] = React.useState<PcppCycle | null>(null);
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
    const [comparisonMetrics, setComparisonMetrics] = React.useState<Map<string, ComparisonMetrics | null>>(new Map());
    const [isSortedByTokens, setIsSortedByTokens] = React.useState(false);
    const [pathOverrides, setPathOverrides] = React.useState<Map<string, string>>(new Map());
    const [tempOverridePath, setTempOverridePath] = React.useState('');
    const [cycleContextTokens, setCycleContextTokens] = React.useState(0);
    const [ephemeralContextTokens, setEphemeralContextTokens] = React.useState(0);
    const [totalPromptTokens, setTotalPromptTokens] = React.useState(0);
    const [estimatedPromptCost, setEstimatedPromptCost] = React.useState(0);
    const [costBreakdown, setCostBreakdown] = React.useState<{[key: string]: number} | null>(null);
    const [workflowStep, setWorkflowStep] = React.useState<string | null>(null);
    const [saveStatus, setSaveStatus] = React.useState<'saved' | 'saving' | 'unsaved'>('saved');
    const [associatedFileMenu, setAssociatedFileMenu] = React.useState<{ x: number; y: number; path: string } | null>(null);
    const [connectionMode, setConnectionMode] = React.useState<ConnectionMode>('manual');
    const [responseCount, setResponseCount] = React.useState(4);
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [generationProgress, setGenerationProgress] = React.useState<GenerationProgress[]>([]);
    const [tps, setTps] = React.useState(0);
    const [isGenerationComplete, setIsGenerationComplete] = React.useState(false);
    const [startTime, setStartTime] = React.useState<number | null>(null);
    
    const clientIpc = ClientPostMessageManager.getInstance();
    
    const stateRef = React.useRef({ currentCycle, cycleTitle, cycleContext, ephemeralContext, tabs, tabCount, activeTab, isParsedMode, leftPaneWidth, selectedResponseId, selectedFilesForReplacement, isSortedByTokens, pathOverrides, fileExistenceMap, workflowStep, totalPromptTokens, estimatedPromptCost, costBreakdown, connectionMode, responseCount });

    React.useEffect(() => { stateRef.current = { currentCycle, cycleTitle, cycleContext, ephemeralContext, tabs, tabCount, activeTab, isParsedMode, leftPaneWidth, selectedResponseId, selectedFilesForReplacement, isSortedByTokens, pathOverrides, fileExistenceMap, workflowStep, totalPromptTokens, estimatedPromptCost, costBreakdown, connectionMode, responseCount }; }, [currentCycle, cycleTitle, cycleContext, ephemeralContext, tabs, tabCount, activeTab, isParsedMode, leftPaneWidth, selectedResponseId, selectedFilesForReplacement, isSortedByTokens, pathOverrides, fileExistenceMap, workflowStep, totalPromptTokens, estimatedPromptCost, costBreakdown, connectionMode, responseCount]);

    const saveCurrentCycleState = React.useCallback(() => {
        const { currentCycle, cycleTitle, cycleContext, ephemeralContext, tabs, tabCount, activeTab, isParsedMode, leftPaneWidth, selectedResponseId, selectedFilesForReplacement, isSortedByTokens, pathOverrides, workflowStep } = stateRef.current;
        if (currentCycle === null) return;
        setSaveStatus('saving');
        const responses: { [key: string]: PcppResponse } = {};
        for (let i = 1; i <= tabCount; i++) { responses[i.toString()] = { content: tabs[i.toString()]?.rawContent || '', isLoading: tabs[i.toString()]?.isLoading || false }; }
        const cycleData: PcppCycle = { ...currentCycle, title: cycleTitle, cycleContext, ephemeralContext, responses, isParsedMode, leftPaneWidth, selectedResponseId, selectedFilesForReplacement: Array.from(selectedFilesForReplacement), tabCount, activeTab, isSortedByTokens, pathOverrides: Object.fromEntries(pathOverrides), activeWorkflowStep: workflowStep || undefined };
        clientIpc.sendToServer(ClientToServerChannel.SaveCycleData, { cycleData });
    }, [clientIpc]);
    const handleRawContentChange = (newContent: string, tabIndex: number) => { setTabs(prev => ({ ...prev, [tabIndex.toString()]: { rawContent: newContent, parsedContent: null }})); setSaveStatus('unsaved'); };
    const handlePaste = (e: React.ClipboardEvent, tabIndex: number) => { const pastedText = e.clipboardData.getData('text'); const currentContent = tabs[tabIndex.toString()]?.rawContent || ''; const tokenCount = Math.ceil(pastedText.length / 4); if (tokenCount > 1000 && currentContent.trim() === '' && tabIndex < tabCount) { handleRawContentChange(pastedText, tabIndex); setActiveTab(tabIndex + 1); } else { handleRawContentChange(pastedText, tabIndex); } };
    const handleAssociatedFileContextMenu = (event: React.MouseEvent, path: string) => { event.preventDefault(); event.stopPropagation(); setAssociatedFileMenu({ x: event.clientX, y: event.clientY, path }); };
    const debouncedSave = useDebounce(saveCurrentCycleState, 1500);
    const getCurrentCycleData = React.useCallback(() => stateRef.current.currentCycle, []);
    const requestCostEstimation = React.useCallback(() => { const cycleData = getCurrentCycleData(); if (cycleData?.cycleId) { clientIpc.sendToServer(ClientToServerChannel.RequestPromptCostBreakdown, { cycleData }); } }, [clientIpc, getCurrentCycleData]);
    const debouncedCostRequest = useDebounce(requestCostEstimation, 500);

    React.useEffect(() => { if (saveStatus === 'unsaved') debouncedSave(); }, [saveStatus, debouncedSave]);
    React.useEffect(() => { const handleVisibilityChange = () => { if (document.visibilityState === 'hidden' && stateRef.current.currentCycle !== null) { clientIpc.sendToServer(ClientToServerChannel.SaveLastViewedCycle, { cycleId: stateRef.current.currentCycle.cycleId }); saveCurrentCycleState(); } }; document.addEventListener('visibilitychange', handleVisibilityChange); return () => document.removeEventListener('visibilitychange', handleVisibilityChange); }, [clientIpc, saveCurrentCycleState]);
    
    const requestAllMetrics = React.useCallback((parsedResponse: ParsedResponse) => { if (!parsedResponse) return; parsedResponse.filesUpdated.forEach(filePath => { const file = parsedResponse.files.find(f => f.path === filePath); if (file) { const pathForComparison = pathOverrides.get(filePath) || filePath; clientIpc.sendToServer(ClientToServerChannel.RequestFileComparison, { filePath: pathForComparison, modifiedContent: file.content }); } }); }, [clientIpc, pathOverrides]);
    
    const parseAllTabs: () => void = React.useCallback((): void => { interface TabMap { [key: string]: TabState } interface ParsedFile { path: string; content: string } setTabs((prevTabs: TabMap) => { const allFilePaths: Set<string> = new Set<string>(); const updatedTabs: TabMap = { ...prevTabs }; let needsUpdate: boolean = false; Object.values(updatedTabs).forEach((tabState: TabState) => { if (tabState.rawContent && !tabState.parsedContent) { needsUpdate = true; const parsed: ParsedResponse = parseResponse(tabState.rawContent); tabState.parsedContent = parsed; parsed.filesUpdated.forEach((filePath: string) => allFilePaths.add(filePath)); requestAllMetrics(parsed); parsed.files.forEach((file: ParsedFile) => { const lang: string = path.extname(file.path).substring(1) || 'plaintext'; const id: string = `${file.path}::${file.content}`; clientIpc.sendToServer(ClientToServerChannel.RequestSyntaxHighlight, { code: file.content, lang, id }); }); } else if (tabState.parsedContent) { tabState.parsedContent.filesUpdated.forEach((filePath: string) => allFilePaths.add(filePath)); } }); if (allFilePaths.size > 0) clientIpc.sendToServer(ClientToServerChannel.RequestFileExistence, { paths: Array.from(allFilePaths) }); return needsUpdate ? updatedTabs : prevTabs; }); }, [clientIpc, requestAllMetrics]);
    
    const isReadyForNextCycle = React.useMemo(() => { const hasTitle = cycleTitle && cycleTitle.trim() !== 'New Cycle' && cycleTitle.trim() !== ''; const hasContext = cycleContext.trim() !== ''; const hasSelectedResponse = selectedResponseId !== null; return hasTitle && hasContext && hasSelectedResponse; }, [cycleTitle, cycleContext, selectedResponseId]);
    const newCycleButtonDisabledReason = React.useMemo(() => { const reasons: string[] = []; if (!cycleTitle || cycleTitle.trim() === 'New Cycle' || cycleTitle.trim() === '') reasons.push("- A cycle title is required."); if (!cycleContext || cycleContext.trim() === '') reasons.push("- Cycle context cannot be empty."); if (!selectedResponseId) reasons.push("- A response must be selected."); return reasons.join('\n'); }, [cycleTitle, cycleContext, selectedResponseId]);

    React.useEffect(() => { if (workflowStep === null) return; if (workflowStep === 'readyForNewCycle') return; if (workflowStep === 'awaitingGeneratePrompt') { if (isReadyForNextCycle) setWorkflowStep('awaitingGeneratePrompt'); return; } if (workflowStep === 'awaitingCycleTitle') { if (cycleTitle.trim() && cycleTitle.trim() !== 'New Cycle') { setWorkflowStep('awaitingGeneratePrompt'); } return; } if (workflowStep === 'awaitingCycleContext') { if (cycleContext.trim()) { setWorkflowStep('awaitingCycleTitle'); } return; } if (workflowStep === 'awaitingAccept') { return; } if (workflowStep === 'awaitingBaseline') { clientIpc.sendToServer(ClientToServerChannel.RequestGitStatus, {}); return; } if (workflowStep === 'awaitingFileSelect') { if (selectedFilesForReplacement.size > 0) { setWorkflowStep('awaitingAccept'); } return; } if (workflowStep === 'awaitingResponseSelect') { if (selectedResponseId) { setWorkflowStep('awaitingBaseline'); } return; } if (workflowStep === 'awaitingSort') { if (isSortedByTokens) { setWorkflowStep('awaitingResponseSelect'); } return; } if (workflowStep === 'awaitingParse') { if (isParsedMode) { setWorkflowStep(isSortedByTokens ? 'awaitingResponseSelect' : 'awaitingSort'); } return; } const waitingForPaste = workflowStep?.startsWith('awaitingResponsePaste'); if (waitingForPaste) { for (let i = 1; i <= tabCount; i++) { if (!tabs[i.toString()]?.rawContent?.trim()) { setWorkflowStep(`awaitingResponsePaste_${i}`); return; } } setWorkflowStep('awaitingParse'); } }, [workflowStep, selectedFilesForReplacement, selectedResponseId, isSortedByTokens, isParsedMode, tabs, cycleContext, cycleTitle, tabCount, isReadyForNextCycle, clientIpc]);
    const handleCycleChange = (e: React.MouseEvent | null, newCycleId: number) => { e?.stopPropagation(); if (saveStatus !== 'saved') return; if (newCycleId >= 0 && newCycleId <= maxCycle) { setSelectedFilesForReplacement(new Set()); clientIpc.sendToServer(ClientToServerChannel.RequestCycleData, { cycleId: newCycleId }); clientIpc.sendToServer(ClientToServerChannel.SaveLastViewedCycle, { cycleId: newCycleId }); setWorkflowStep(null); } };
    
    React.useEffect(() => { const loadCycleData = (cycleData: PcppCycle, scope?: string) => { setCurrentCycle(cycleData); setProjectScope(scope); setCycleTitle(cycleData.title); setCycleContext(cycleData.cycleContext); setEphemeralContext(cycleData.ephemeralContext); setCycleContextTokens(Math.ceil((cycleData.cycleContext || '').length / 4)); setEphemeralContextTokens(Math.ceil((cycleData.ephemeralContext || '').length / 4)); const newTabs: { [key: string]: TabState } = {}; Object.entries(cycleData.responses).forEach(([tabId, response]) => { newTabs[tabId] = { rawContent: response.content, parsedContent: null, isLoading: response.isLoading }; }); setTabs(newTabs); setTabCount(cycleData.tabCount || 4); setActiveTab(cycleData.activeTab || 1); setIsParsedMode(cycleData.isParsedMode || false); setLeftPaneWidth(cycleData.leftPaneWidth || 33); setSelectedResponseId(cycleData.selectedResponseId || null); setSelectedFilesForReplacement(new Set(cycleData.selectedFilesForReplacement || [])); setIsSortedByTokens(cycleData.isSortedByTokens || false); setPathOverrides(new Map(Object.entries(cycleData.pathOverrides || {}))); setWorkflowStep(cycleData.activeWorkflowStep || null); setSaveStatus('saved'); requestCostEstimation(); if (cycleData.status === 'generating') { setIsGenerating(true); setStartTime(Date.now()); } else { setIsGenerating(false); } }; clientIpc.onServerMessage(ServerToClientChannel.SendInitialCycleData, ({ cycleData, projectScope }) => { loadCycleData(cycleData, projectScope); setMaxCycle(cycleData.cycleId); if (cycleData.cycleId === 0) setWorkflowStep('awaitingProjectScope'); else if (cycleData.cycleId === 1 && !cycleData.cycleContext) setWorkflowStep('awaitingResponsePaste_1'); }); clientIpc.onServerMessage(ServerToClientChannel.SendCycleData, ({ cycleData, projectScope }) => { if (cycleData) loadCycleData(cycleData, projectScope); }); clientIpc.onServerMessage(ServerToClientChannel.SendSyntaxHighlight, ({ highlightedHtml, id }) => setHighlightedCodeBlocks(prev => new Map(prev).set(id, highlightedHtml))); clientIpc.onServerMessage(ServerToClientChannel.SendFileExistence, ({ existenceMap }) => setFileExistenceMap(new Map(Object.entries(existenceMap)))); clientIpc.onServerMessage(ServerToClientChannel.ForceRefresh, ({ reason }) => { if (reason === 'history') clientIpc.sendToServer(ClientToServerChannel.RequestInitialCycleData, {}); }); clientIpc.onServerMessage(ServerToClientChannel.FilesWritten, ({ paths }) => { setFileExistenceMap(prevMap => { const newMap = new Map(prevMap); paths.forEach(p => newMap.set(p, true)); return newMap; }); }); clientIpc.onServerMessage(ServerToClientChannel.SendFileComparison, (metrics) => { setComparisonMetrics(prev => new Map(prev).set(metrics.filePath, metrics)); }); clientIpc.onServerMessage(ServerToClientChannel.SendPromptCostEstimation, ({ totalTokens, estimatedCost, breakdown }) => { logger.log(`[COST_ESTIMATION_RECEIVED] Tokens: ${totalTokens}, Cost: ${estimatedCost}`); setTotalPromptTokens(totalTokens); setEstimatedPromptCost(estimatedCost); setCostBreakdown(breakdown); }); clientIpc.onServerMessage(ServerToClientChannel.NotifyGitOperationResult, (result) => { if (result.success) { setWorkflowStep(prevStep => { if (prevStep === 'awaitingBaseline') { clientIpc.sendToServer(ClientToServerChannel.RequestShowInformationMessage, { message: result.message }); return 'awaitingFileSelect'; } return prevStep; }); } }); clientIpc.onServerMessage(ServerToClientChannel.SendGitStatus, ({ isClean }) => { if (isClean && workflowStep === 'awaitingBaseline') { setWorkflowStep('awaitingFileSelect'); } }); clientIpc.onServerMessage(ServerToClientChannel.NotifySaveComplete, ({ cycleId }) => { if (cycleId === stateRef.current.currentCycle?.cycleId) setSaveStatus('saved'); }); clientIpc.onServerMessage(ServerToClientChannel.SendSettings, ({ settings }) => { setConnectionMode(settings.connectionMode) }); clientIpc.onServerMessage(ServerToClientChannel.UpdateGenerationProgress, ({ progress, tps, chunks }) => { setGenerationProgress(progress); setTps(tps); setTabs(prevTabs => { const newTabs = { ...prevTabs }; Object.entries(chunks).forEach(([responseId, chunk]) => { const tabIndex = parseInt(responseId, 10); newTabs[tabIndex] = { ...(newTabs[tabIndex] || { rawContent: '', parsedContent: null }), rawContent: chunk }; }); return newTabs; }); }); 
        clientIpc.onServerMessage(ServerToClientChannel.SendBatchGenerationComplete, ({ newCycleId, newMaxCycle }) => {
            logger.log(`[Auto-Nav] Received SendBatchGenerationComplete. New cycle: ${newCycleId}, Max cycle: ${newMaxCycle}`);
            setIsGenerationComplete(true); 
            setMaxCycle(newMaxCycle);
            // C71 Fix: This is where the auto-navigation should happen.
            if (newCycleId) {
                logger.log(`[Auto-Nav] Navigating to new cycle ${newCycleId}.`);
                handleCycleChange(null, newCycleId);
            }
        });
        clientIpc.onServerMessage(ServerToClientChannel.StartGenerationUI, ({ newCycleId }) => { handleCycleChange(null, newCycleId); setIsGenerating(true); setStartTime(Date.now()); setIsGenerationComplete(false); setGenerationProgress([]); });
        clientIpc.sendToServer(ClientToServerChannel.RequestInitialCycleData, {}); clientIpc.sendToServer(ClientToServerChannel.RequestSettings, {});
    }, [clientIpc, requestCostEstimation]);
    React.useEffect(() => { if (isParsedMode) parseAllTabs(); }, [isParsedMode, tabs, parseAllTabs]);
    React.useEffect(() => { if (!selectedFilePath) return; const currentTabData = tabs[activeTab.toString()]; if (currentTabData?.parsedContent) { const fileExistsInTab = currentTabData.parsedContent.files.some(f => f.path === selectedFilePath); if (!fileExistsInTab) setSelectedFilePath(null); } }, [activeTab, tabs, selectedFilePath]);

    const isGenerateResponsesDisabled = React.useMemo(() => { if (currentCycle?.cycleId === 0) return true; return !isReadyForNextCycle; }, [currentCycle, isReadyForNextCycle]);

    const handleGeneratePrompt = () => { if (currentCycle === null) return; const selectedResponseData = selectedResponseId ? tabs[selectedResponseId] : null; const selectedFiles = selectedResponseData?.parsedContent?.files.map(f => f.path) || []; clientIpc.sendToServer(ClientToServerChannel.RequestCreatePromptFile, { cycleTitle, currentCycle: currentCycle.cycleId, selectedFiles }); setWorkflowStep('readyForNewCycle'); };
    const handleGenerateResponses = () => { const cycleData = getCurrentCycleData(); if (cycleData) { clientIpc.sendToServer(ClientToServerChannel.RequestNewCycleAndGenerate, { cycleData, count: responseCount }); } };
    const handleStartGeneration = (projectScope: string, responseCount: number) => { clientIpc.sendToServer(ClientToServerChannel.RequestInitialArtifactsAndGeneration, { projectScope, responseCount }); };
    const handleViewResponses = () => { if (currentCycle) { setIsGenerating(false); handleCycleChange(null, currentCycle.cycleId); } };
    const handleRegenerateTab = (responseId: number) => { if (currentCycle === null) return; const tabId = responseId.toString(); setTabs(prev => ({ ...prev, [tabId]: { ...prev[tabId], isLoading: true, parsedContent: null } })); clientIpc.sendToServer(ClientToServerChannel.RequestSingleRegeneration, { cycleId: currentCycle.cycleId, tabId }); setSaveStatus('unsaved'); };
    const handleSelectForViewing = (filePath: string) => { const newPath = selectedFilePath === filePath ? null : filePath; setSelectedFilePath(newPath); };
    const handleAcceptSelectedFiles = () => { if (selectedFilesForReplacement.size === 0) return; const filesToWrite: BatchWriteFile[] = []; selectedFilesForReplacement.forEach(compositeKey => { const [responseId, filePath] = compositeKey.split(':::'); const responseData = tabs[responseId]; if (responseData?.parsedContent) { const file = responseData.parsedContent.files.find(f => f.path === filePath); if (file) { const finalPath = pathOverrides.get(file.path) || file.path; filesToWrite.push({ path: finalPath, content: file.content }); } } }); if (filesToWrite.length > 0) { clientIpc.sendToServer(ClientToServerChannel.RequestBatchFileWrite, { files: filesToWrite }); } setWorkflowStep('awaitingCycleContext'); };
    const handleLinkFile = (originalPath: string) => { if (tempOverridePath.trim()) { setPathOverrides(prev => new Map(prev).set(originalPath, tempOverridePath.trim())); setFileExistenceMap(prev => new Map(prev).set(originalPath, true)); setTempOverridePath(''); handleSelectForViewing(originalPath); } };
    const handleUnlinkFile = (originalPath: string) => { setPathOverrides(prev => { const newMap = new Map(prev); newMap.delete(originalPath); return newMap; }); setFileExistenceMap(prev => new Map(prev).set(originalPath, false)); };
    const onCycleContextChange = React.useCallback((value: string) => { setCycleContext(value); setCycleContextTokens(Math.ceil(value.length / 4)); setSaveStatus('unsaved'); }, []);
    const onEphemeralContextChange = React.useCallback((value: string) => { setEphemeralContext(value); setEphemeralContextTokens(Math.ceil(value.length / 4)); setSaveStatus('unsaved'); }, []);
    const activeTabData = tabs[activeTab.toString()];
    const sortedTabIds = React.useMemo(() => { const tabIds = [...Array(tabCount)].map((_, i) => i + 1); if (isParsedMode && isSortedByTokens) tabIds.sort((a, b) => { const tokensA = tabs[a.toString()]?.parsedContent?.totalTokens ?? -1; const tokensB = tabs[b.toString()]?.parsedContent?.totalTokens ?? -1; return tokensB - tokensA; }); return tabIds; }, [tabs, isParsedMode, isSortedByTokens, tabCount]);
    const viewableContent = React.useMemo(() => { if (!selectedFilePath || !activeTabData?.parsedContent) return undefined; const file = activeTabData.parsedContent.files.find(f => f.path === selectedFilePath); if (!file) return '<div>Error: File data not found in parsed response.</div>'; const id = `${file.path}::${file.content}`; return highlightedCodeBlocks.get(id); }, [selectedFilePath, activeTabData?.parsedContent, highlightedCodeBlocks]);
    const handleContextKeyDown = React.useCallback(() => {}, []);
    const handleGlobalParseToggle = () => { const newParseMode = !isParsedMode; setIsParsedMode(newParseMode); setSelectedFilePath(null); if (!newParseMode) setTabs(prev => { const newTabs = {...prev}; Object.keys(newTabs).forEach(key => { newTabs[key].parsedContent = null; }); return newTabs; }); setSaveStatus('unsaved'); };
    const handleNewCycle = (e: React.MouseEvent) => { e.stopPropagation(); if (saveStatus !== 'saved') return; const newCycleId = maxCycle + 1; const newTabs: { [key: string]: TabState } = {}; for (let i = 1; i <= tabCount; i++) newTabs[i.toString()] = { rawContent: '', parsedContent: null }; setMaxCycle(newCycleId); const newCycle: PcppCycle = { cycleId: newCycleId, title: 'New Cycle', cycleContext: '', ephemeralContext: '', responses: {}, tabCount: tabCount, timestamp: new Date().toISOString(), status: 'complete' }; setCurrentCycle(newCycle); setCycleTitle('New Cycle'); setCycleContext(''); setEphemeralContext(''); setTabs(newTabs); setIsParsedMode(false); setSelectedResponseId(null); setSelectedFilesForReplacement(new Set()); setWorkflowStep('awaitingResponsePaste_1'); clientIpc.sendToServer(ClientToServerChannel.SaveLastViewedCycle, { cycleId: newCycleId }); setSaveStatus('unsaved'); };
    const handleDeleteCycle = () => { if(currentCycle !== null) clientIpc.sendToServer(ClientToServerChannel.RequestDeleteCycle, { cycleId: currentCycle.cycleId }); };
    const handleResetHistory = () => { clientIpc.sendToServer(ClientToServerChannel.RequestResetHistory, {}); };
    const handleExportHistory = () => clientIpc.sendToServer(ClientToServerChannel.RequestExportHistory, {});
    const handleImportHistory = () => clientIpc.sendToServer(ClientToServerChannel.RequestImportHistory, {});
    const handleGitBaseline = () => { const commitMessage = `DCE Baseline: Cycle ${currentCycle?.cycleId} - ${cycleTitle || 'New Cycle'}`; clientIpc.sendToServer(ClientToServerChannel.RequestGitBaseline, { commitMessage }); };
    const onGitRestore = () => { const { selectedFilesForReplacement, fileExistenceMap } = stateRef.current; const filesToDelete = Array.from(selectedFilesForReplacement).map(key => key.split(':::')).filter(fileParts => fileParts && fileParts[1] && !fileExistenceMap.get(fileParts[1])).map(fileParts => fileParts[1]); clientIpc.sendToServer(ClientToServerChannel.RequestGitRestore, { filesToDelete }); };
    const handleFileSelectionToggle = (filePath: string) => { const currentTabId = activeTab.toString(); const compositeKeyForCurrent = `${currentTabId}:::${filePath}`; setSelectedFilesForReplacement(prev => { const newSet = new Set(prev); let existingKey: string | undefined; for (const key of newSet) if (key.endsWith(`:::${filePath}`)) { existingKey = key; break; } if (existingKey) { if (existingKey === compositeKeyForCurrent) newSet.delete(existingKey); else { newSet.delete(existingKey); newSet.add(compositeKeyForCurrent); } } else newSet.add(compositeKeyForCurrent); return newSet; }); setSaveStatus('unsaved'); };
    const handleSelectAllAssociatedFiles = () => { if (!activeTabData?.parsedContent) return; const allFilesForTab = activeTabData.parsedContent.filesUpdated; setSelectedFilesForReplacement(prev => { const newSet = new Set(prev); allFilesForTab.forEach(filePath => { for (const key of newSet) { if (key.endsWith(`:::${filePath}`)) { newSet.delete(key); } } }); allFilesForTab.forEach(filePath => newSet.add(`${activeTab}:::${filePath}`)); return newSet; }); setSaveStatus('unsaved'); };
    const isAllFilesSelected = React.useMemo(() => { if (!activeTabData?.parsedContent) return false; const allFiles = activeTabData.parsedContent.filesUpdated; if (allFiles.length === 0) return false; return allFiles.every(file => selectedFilesForReplacement.has(`${activeTab}:::${file}`)); }, [selectedFilesForReplacement, activeTabData, activeTab]);
    const handleLogState = () => { const currentState = getCurrentCycleData(); if (currentState) clientIpc.sendToServer(ClientToServerChannel.RequestLogState, { currentState: currentState as any, costState: { totalPromptTokens, estimatedPromptCost, costBreakdown } }); };
    const handleCopyContent = () => { if (!selectedFilePath || !activeTabData?.parsedContent) return; const file = activeTabData.parsedContent.files.find(f => f.path === selectedFilePath); if (file) clientIpc.sendToServer(ClientToServerChannel.RequestCopyTextToClipboard, { text: file.content }); };
    const costBreakdownTooltip = React.useMemo(() => { if (!costBreakdown) return "Calculating..."; return Object.entries(costBreakdown).map(([key, value]) => `${key}: ${formatLargeNumber(value, 1)} tk`).join('\n'); }, [costBreakdown]);
    const onScopeChange = (scope: string) => { if (currentCycle?.cycleId === 0) { setProjectScope(scope); onCycleContextChange(scope); } };

    if (currentCycle === null) return <div>Loading...</div>;
    if (currentCycle.cycleId === -1) return <div className="onboarding-container"><h1>No Folder Opened</h1><p>You have not yet opened a folder for the Data Curation Environment to manage.</p><button className="dce-button-primary" onClick={() => clientIpc.sendToServer(ClientToServerChannel.RequestOpenFolder, {})}><VscFolder /> Open Folder</button></div>;
    if (isGenerating || currentCycle.status === 'generating') { return <GenerationProgressDisplay progressData={generationProgress} tps={tps} tabs={tabs} onStop={(id) => clientIpc.sendToServer(ClientToServerChannel.RequestStopGeneration, { cycleId: id })} onRegenerate={handleRegenerateTab} isGenerationComplete={isGenerationComplete} onViewResponses={handleViewResponses} startTime={startTime} cycleId={currentCycle.cycleId} />; }
    if (currentCycle.cycleId === 0) { return <OnboardingView projectScope={projectScope || ''} onScopeChange={onScopeChange} onNavigateToCycle={(id) => handleCycleChange(null, id)} latestCycleId={maxCycle} workflowStep={workflowStep} saveStatus={saveStatus} connectionMode={connectionMode} onStartGeneration={handleStartGeneration} />; }
    
    const collapsedNavigator = <div className="collapsed-navigator"><button onClick={(e) => handleCycleChange(e, currentCycle.cycleId - 1)} disabled={currentCycle.cycleId <= 0 || saveStatus !== 'saved'}>&lt;</button><span className="cycle-display">C{currentCycle.cycleId}</span><button onClick={(e) => handleCycleChange(e, currentCycle.cycleId + 1)} disabled={currentCycle.cycleId >= maxCycle || saveStatus !== 'saved'}>&gt;</button></div>;
    const totalPromptCostDisplay = ( <span className="total-prompt-cost" title={costBreakdownTooltip}> Total Est: ({formatLargeNumber(totalPromptTokens, 1)} tk) ~ ${estimatedPromptCost.toFixed(4)} {tabCount > 1 && ` x ${responseCount} = $${(estimatedPromptCost * responseCount).toFixed(4)}`} </span> );
    const SaveStatusIndicator = () => { let icon; let title; switch(saveStatus) { case 'saving': icon = <VscLoading className="saving"/>; title = "Saving..."; break; case 'unsaved': icon = <VscWarning className="unsaved"/>; title = "Unsaved changes"; break; case 'saved': icon = <VscCheck className="saved"/>; title = "Saved"; break; default: icon = null; title = ""; } return <div className="save-status-indicator" title={title}>{icon}</div>; };
    const renderHeaderButtons = () => {
        const generationInProgress = currentCycle?.status === 'generating';
        if (generationInProgress) {
            return <button onClick={() => setIsGenerating(true)} title="View Generation Progress"><VscVm /> View Generation Progress</button>;
        }
        if (connectionMode === 'demo' && isGenerating) {
            return <button onClick={() => handleCycleChange(null, maxCycle)} title="Return to Generation Progress"><VscGoToFile /> Return to Generation Progress</button>;
        }
        if (connectionMode === 'manual') {
            return <button onClick={handleGeneratePrompt} title="Generate prompt.md" className={workflowStep === 'awaitingGeneratePrompt' ? 'workflow-highlight' : ''}><VscFileCode /> Generate prompt.md</button>;
        } else {
            return <button onClick={handleGenerateResponses} disabled={isGenerateResponsesDisabled} title={isGenerateResponsesDisabled ? `Cannot generate responses:\n${newCycleButtonDisabledReason}` : "Generate responses from local LLM"}><VscWand /> Generate responses</button>;
        }
    };

    return <div className="pc-view-container">
        <div className="pc-header"><div className="pc-toolbar"><button onClick={(e) => handleCycleChange(e, 0)} title="Project Plan"><VscBook /> Project Plan</button>{renderHeaderButtons()}<button onClick={handleLogState} title="For developer use only. Logs internal state to the output channel."><VscBug/></button></div><div className="tab-count-input"><label htmlFor="tab-count">Responses:</label><input type="number" id="tab-count" min="1" max="20" value={responseCount} onChange={e => {setResponseCount(parseInt(e.target.value, 10) || 1); setSaveStatus('unsaved');}} /></div></div>
        <CollapsibleSection title="Cycle & Context" isCollapsed={isCycleCollapsed} onToggle={() => setIsCycleCollapsed(p => !p)} collapsedContent={collapsedNavigator} className={isReadyForNextCycle ? 'selected' : ''} extraHeaderContent={<div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><SaveStatusIndicator /> {totalPromptCostDisplay}</div>}>
            <CycleNavigator currentCycle={currentCycle.cycleId} maxCycle={maxCycle} cycleTitle={cycleTitle} isNewCycleButtonDisabled={!isReadyForNextCycle} onCycleChange={handleCycleChange} onNewCycle={handleNewCycle} onTitleChange={(title) => { setCycleTitle(title); setSaveStatus('unsaved'); }} onDeleteCycle={handleDeleteCycle} onResetHistory={handleResetHistory} onExportHistory={handleExportHistory} onImportHistory={handleImportHistory} workflowStep={workflowStep} disabledReason={newCycleButtonDisabledReason} saveStatus={saveStatus} />
            <ContextInputs cycleContext={cycleContext} ephemeralContext={ephemeralContext} cycleContextTokens={cycleContextTokens} ephemeralContextTokens={ephemeralContextTokens} onCycleContextChange={onCycleContextChange} onEphemeralContextChange={onEphemeralContextChange} workflowStep={workflowStep} />
        </CollapsibleSection>
        <ResponseTabs sortedTabIds={sortedTabIds} tabs={tabs} activeTab={activeTab} selectedResponseId={selectedResponseId} isParsedMode={isParsedMode} isSortedByTokens={isSortedByTokens} onTabSelect={setActiveTab} workflowStep={workflowStep} onSortToggle={()=>{setIsSortedByTokens(prev => { const newState = !prev; setSaveStatus('unsaved'); return newState; });}} onRegenerateTab={handleRegenerateTab} />
        <WorkflowToolbar isParsedMode={isParsedMode} onParseToggle={handleGlobalParseToggle} onSelectResponse={() => { setSelectedResponseId(prev => prev === activeTab.toString() ? null : activeTab.toString()); setWorkflowStep('awaitingResponseSelect'); setSaveStatus('unsaved'); }} selectedResponseId={selectedResponseId} activeTab={activeTab} onBaseline={handleGitBaseline} onRestore={onGitRestore} onAcceptSelected={handleAcceptSelectedFiles} selectedFilesForReplacementCount={selectedFilesForReplacement.size} workflowStep={workflowStep} onSelectAll={handleSelectAllAssociatedFiles} onDeselectAll={() => setSelectedFilesForReplacement(new Set())} />
        <div className="tab-content"><ResponsePane isParsedMode={isParsedMode} activeTabData={activeTabData} onRawContentChange={(content) => handleRawContentChange(content, activeTab)} onContextKeyDown={handleContextKeyDown} onPaste={(e) => handlePaste(e, activeTab)} fileExistenceMap={fileExistenceMap} selectedFilePath={selectedFilePath} onSelectForViewing={handleSelectForViewing} selectedFilesForReplacement={selectedFilesForReplacement} onFileSelectionToggle={handleFileSelectionToggle} activeTab={activeTab} pathOverrides={pathOverrides} tempOverridePath={tempOverridePath} onTempOverridePathChange={setTempOverridePath} onLinkFile={handleLinkFile} onUnlinkFile={handleUnlinkFile} comparisonMetrics={comparisonMetrics} viewableContent={viewableContent} onCopyContent={handleCopyContent} selectedResponseId={selectedResponseId} onSelectResponse={(id) => { setSelectedResponseId(prev => prev === id ? null : id); setWorkflowStep('awaitingResponseSelect'); setSaveStatus('unsaved'); }} onSelectAllFiles={handleSelectAllAssociatedFiles} onDeselectAllFiles={() => {setSelectedFilesForReplacement(new Set()); setSaveStatus('unsaved');}} isAllFilesSelected={isAllFilesSelected} onAcceptSelected={handleAcceptSelectedFiles} leftPaneWidth={leftPaneWidth} onBaseline={handleGitBaseline} onRestore={onGitRestore} workflowStep={workflowStep} /></div>
        {associatedFileMenu && <div className="context-menu" style={{ top: associatedFileMenu.y, left: associatedFileMenu.x }}><ul onMouseLeave={() => setAssociatedFileMenu(null)}><li onClick={() => { clientIpc.sendToServer(ClientToServerChannel.RequestCopyPath, { path: associatedFileMenu.path, relative: true }); setAssociatedFileMenu(null); }}>Copy Relative Path</li></ul></div>}
    </div>;
};

try {
    const root = createRoot(document.getElementById('root') as HTMLElement);
    root.render(<App />);
} catch (error) {
    //
}