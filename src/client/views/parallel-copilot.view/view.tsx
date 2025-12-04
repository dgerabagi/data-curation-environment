// src/client/views/parallel-copilot.view/view.tsx
// Updated on: C138 (Force synchronous save of hasGeneratedPrompt in handleGeneratePrompt)
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './view.scss';
import { VscWand, VscFileCode, VscBug, VscBook, VscFolder, VscChevronDown, VscLoading, VscCheck, VscWarning } from 'react-icons/vsc';
import { ClientPostMessageManager } from '../../../common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '../../../common/ipc/channels.enum';
import { PcppCycle } from '../../../common/types/pcpp.types';
import OnboardingView from './OnboardingView';
import CycleNavigator from './components/CycleNavigator';
import ContextInputs from './components/ContextInputs';
import ResponseTabs from './components/ResponseTabs';
import ResponsePane from './components/ResponsePane';
import WorkflowToolbar from './components/WorkflowToolbar';
import GenerationProgressDisplay from './components/GenerationProgressDisplay';

import { useCycleManagement } from './hooks/useCycleManagement';
import { useTabManagement } from './hooks/useTabManagement';
import { useFileManagement } from './hooks/useFileManagement';
import { useGeneration } from './hooks/useGeneration';
import { useWorkflow } from './hooks/useWorkflow';
import { usePcppIpc } from './hooks/usePcppIpc';
import { logger } from '@/client/utils/logger';

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
    const clientIpc = ClientPostMessageManager.getInstance();
    
    const [initialData, setInitialData] = React.useState<{cycle: PcppCycle | null, scope: string | undefined, maxCycle: number}>({cycle: null, scope: '', maxCycle: 0});
    const saveStateRef = React.useRef<() => void>(() => {});
    const [forceShowResponseView, setForceShowResponseView] = React.useState(false);
    const [leftPaneWidth, setLeftPaneWidth] = React.useState(initialData.cycle?.leftPaneWidth || 33);
    const [responseCount, setResponseCount] = React.useState(4); 

    const cycleManagement = useCycleManagement(initialData.cycle, initialData.scope, initialData.maxCycle);
    
    const requestAllMetrics = React.useCallback((parsedResponse: any, tabId: number) => {
         parsedResponse.filesUpdated.forEach((filePath: string) => {
             const file = parsedResponse.files.find((f: any) => f.path === filePath);
             if (file) {
                 clientIpc.sendToServer(ClientToServerChannel.RequestFileComparison, {
                     filePath,
                     modifiedContent: file.content,
                     tabId: tabId.toString()
                 });
             }
         });
    }, [clientIpc]);

    const tabManagement = useTabManagement(initialData.cycle?.responses || {}, responseCount, initialData.cycle?.activeTab || 1, initialData.cycle?.isParsedMode || false, initialData.cycle?.isSortedByTokens || false, cycleManagement.setSaveStatus, requestAllMetrics);
    const fileManagement = useFileManagement(tabManagement.activeTab, tabManagement.tabs, cycleManagement.setSaveStatus);
    
    const generationManagement = useGeneration(cycleManagement.currentCycle, () => stateRef.current.cycleManagement.currentCycle, tabManagement.setTabs, cycleManagement.setSaveStatus, responseCount); 

    const isReadyForNextCycle = React.useMemo(() => {
        const basicReqs = !!(
            cycleManagement.cycleTitle && 
            cycleManagement.cycleTitle.trim() !== 'New Cycle' &&
            cycleManagement.cycleContext && 
            cycleManagement.selectedResponseId
        );

        if (generationManagement.connectionMode === 'manual') {
            return basicReqs && cycleManagement.hasGeneratedPrompt;
        }
        return basicReqs;
    }, [cycleManagement.cycleTitle, cycleManagement.cycleContext, cycleManagement.selectedResponseId, cycleManagement.hasGeneratedPrompt, generationManagement.connectionMode]);

    const newCycleButtonDisabledReason = React.useMemo(() => {
        if (cycleManagement.currentCycle?.cycleId === 0) return "Onboarding incomplete.";
        
        const reasons: string[] = [];
        if (!cycleManagement.cycleTitle || cycleManagement.cycleTitle.trim() === 'New Cycle') reasons.push("Cycle Title");
        if (!cycleManagement.cycleContext) reasons.push("Cycle Context");
        if (!cycleManagement.selectedResponseId) reasons.push("Selected Response");
        
        if (generationManagement.connectionMode === 'manual' && !cycleManagement.hasGeneratedPrompt) reasons.push("Generate prompt.md");

        if (reasons.length > 0) return `Missing: ${reasons.join(', ')}`;
        return "";
    }, [cycleManagement.currentCycle, cycleManagement.cycleTitle, cycleManagement.cycleContext, cycleManagement.selectedResponseId, cycleManagement.hasGeneratedPrompt, generationManagement.connectionMode]);


    const { workflowStep, setWorkflowStep } = useWorkflow(
        null, 
        isReadyForNextCycle, 
        cycleManagement.cycleTitle, 
        cycleManagement.cycleContext, 
        fileManagement.selectedFilesForReplacement, 
        cycleManagement.selectedResponseId, 
        tabManagement.isSortedByTokens, 
        tabManagement.isParsedMode, 
        tabManagement.tabs, 
        tabManagement.tabCount, 
        cycleManagement.hasGeneratedPrompt,
        cycleManagement.currentCycle?.cycleId || -1
    );
    
    usePcppIpc(
        cycleManagement,
        tabManagement,
        fileManagement,
        generationManagement,
        setWorkflowStep
    );

    const stateRef = React.useRef({ cycleManagement, tabManagement, fileManagement, workflowStep, responseCount, leftPaneWidth });
    stateRef.current = { cycleManagement, tabManagement, fileManagement, workflowStep, responseCount, leftPaneWidth };

    const getCurrentCycleState = React.useCallback((): PcppCycle | null => {
        const { cycleManagement, tabManagement, fileManagement, workflowStep, responseCount, leftPaneWidth } = stateRef.current;
        const { currentCycle, cycleTitle, cycleContext, ephemeralContext, isEphemeralContextCollapsed, selectedResponseId, isCycleCollapsed, hasGeneratedPrompt } = cycleManagement;
        const { tabs, activeTab, isParsedMode, isSortedByTokens } = tabManagement;
        const { selectedFilesForReplacement, pathOverrides } = fileManagement;
        
        if (currentCycle === null) return null;

        return {
            ...currentCycle,
            title: cycleTitle,
            cycleContext,
            ephemeralContext,
            responses: tabs,
            isParsedMode,
            selectedResponseId,
            selectedFilesForReplacement: Array.from(selectedFilesForReplacement),
            tabCount: responseCount, 
            activeTab,
            isSortedByTokens,
            pathOverrides: Object.fromEntries(pathOverrides),
            activeWorkflowStep: workflowStep || undefined,
            isEphemeralContextCollapsed,
            isCycleCollapsed,
            leftPaneWidth,
            hasGeneratedPrompt,
        };
    }, []);

    saveStateRef.current = React.useCallback(() => {
        const cycleData = getCurrentCycleState();
        if (cycleData) {
            cycleManagement.setSaveStatus('saving');
            clientIpc.sendToServer(ClientToServerChannel.SaveCycleData, { cycleData });
        }
    }, [clientIpc, getCurrentCycleState]);

    React.useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                logger.log('[View] Webview hidden, forcing save.');
                saveStateRef.current();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            const cycleData = getCurrentCycleState();
            if (cycleData) {
                clientIpc.sendToServer(ClientToServerChannel.RequestPromptCostBreakdown, { cycleData });
            }
        }, 1000);
        return () => clearTimeout(handler);
    }, [cycleManagement.cycleContext, cycleManagement.ephemeralContext, cycleManagement.cycleTitle, fileManagement.selectedFilesForReplacement, cycleManagement.selectedResponseId]);

    React.useEffect(() => {
        if (cycleManagement.saveStatus === 'unsaved') {
            const handler = setTimeout(() => {
                saveStateRef.current();
            }, 1500);
    
            return () => {
                clearTimeout(handler);
            };
        }
    }, [cycleManagement.saveStatus]);

    const viewableContent = React.useMemo(() => {
        if (!fileManagement.selectedFilePath) return null;
        const activeTabData = tabManagement.tabs[tabManagement.activeTab.toString()];
        const file = activeTabData?.parsedContent?.files.find(f => f.path === fileManagement.selectedFilePath);
        if (!file) return '// File content not found in parsed response.';
        const id = `${file.path}::${file.content}`;
        return fileManagement.highlightedCodeBlocks.get(id) || file.content;
    }, [fileManagement.selectedFilePath, tabManagement.tabs, tabManagement.activeTab, fileManagement.highlightedCodeBlocks]);


    React.useEffect(() => {
        const handleLoadedCycle = (cycleData: PcppCycle) => {
            setForceShowResponseView(false);
            if(cycleData.tabCount) setResponseCount(cycleData.tabCount);
            if(cycleData.leftPaneWidth) setLeftPaneWidth(cycleData.leftPaneWidth);
            
            if (cycleData.selectedFilesForReplacement) {
                fileManagement.setSelectedFilesForReplacement(new Set(cycleData.selectedFilesForReplacement));
            } else {
                fileManagement.setSelectedFilesForReplacement(new Set());
            }
        };

        clientIpc.onServerMessage(ServerToClientChannel.SendInitialCycleData as any, ({ cycleData, projectScope }: { cycleData: PcppCycle, projectScope: string }) => {
            setInitialData({cycle: cycleData, scope: projectScope, maxCycle: cycleData.cycleId });
            handleLoadedCycle(cycleData);
        });
        clientIpc.onServerMessage(ServerToClientChannel.SendCycleData as any, ({ cycleData }: { cycleData: PcppCycle | null }) => {
            if (cycleData) {
                handleLoadedCycle(cycleData);
            }
        });
        clientIpc.onServerMessage(ServerToClientChannel.NavigateToNewGeneratingCycle as any, () => {
            setForceShowResponseView(false);
            fileManagement.setSelectedFilesForReplacement(new Set());
        });
    }, [clientIpc, fileManagement.setSelectedFilesForReplacement]);

    if (cycleManagement.currentCycle === null) return <div>Loading...</div>;
    if (cycleManagement.currentCycle.cycleId === -1) return <div className="onboarding-container"><h1>No Folder Opened</h1><p>You have not yet opened a folder.</p><button className="dce-button-primary" onClick={() => clientIpc.sendToServer(ClientToServerChannel.RequestOpenFolder, {})}><VscFolder /> Open Folder</button></div>;
    
    const onScopeChange = (scope: string) => { if (cycleManagement.currentCycle?.cycleId === 0) { cycleManagement.onCycleContextChange(scope); } };

    if (cycleManagement.currentCycle.cycleId === 0) { 
        return <OnboardingView 
            projectScope={cycleManagement.cycleContext || ''} 
            onScopeChange={onScopeChange} 
            onNavigateToCycle={(id) => cycleManagement.handleCycleChange(null, id)} 
            latestCycleId={cycleManagement.maxCycle} 
            workflowStep={workflowStep} 
            saveStatus={cycleManagement.saveStatus} 
            connectionMode={generationManagement.connectionMode} 
            onStartGeneration={generationManagement.handleStartGeneration} 
            responseCount={responseCount}
            onResponseCountChange={setResponseCount}
        />; 
    }
    
    const collapsedNavigator = <div>...</div>;
    
    const costTooltipText = Object.entries(cycleManagement.costBreakdown)
        .map(([key, tokens]) => `${key}: ${tokens} tokens`)
        .join('\n');
    const finalCostTooltip = `${cycleManagement.totalTokens} total tokens\n\n${costTooltipText}`;

    const totalPromptCostDisplay = <span className="total-prompt-cost" title={finalCostTooltip}>${cycleManagement.estimatedCost.toFixed(4)}</span>;
    
    const SaveStatusIndicator = () => {
        let icon;
        let title;
        switch(cycleManagement.saveStatus) {
            case 'saving': icon = <VscLoading className="saving"/>; title = "Saving..."; break;
            case 'unsaved': icon = <VscWarning className="unsaved"/>; title = "Unsaved changes"; break;
            case 'saved': icon = <VscCheck className="saved"/>; title = "Saved"; break;
            default: icon = null; title = "";
        }
        return <div className="save-status-indicator" title={title}>{icon}</div>;
    };

    const handleGeneratePrompt = () => {
        // C138 FIX: Synchronously construct the updated state and save it IMMEDIATELY.
        // This bypasses the React state update cycle which is too slow before the view is destroyed.
        const currentState = getCurrentCycleState();
        if (currentState) {
            const updatedCycleData = {
                ...currentState,
                hasGeneratedPrompt: true // Force this to true
            };

            logger.log(`[View] Requesting prompt generation for Cycle ${updatedCycleData.cycleId} (Synchronous Save)`);
            
            // 1. Trigger file generation
            clientIpc.sendToServer(ClientToServerChannel.RequestCreatePromptFile, { cycleData: updatedCycleData });
            
            // 2. Force immediate persistence of the updated state
            clientIpc.sendToServer(ClientToServerChannel.SaveCycleData, { cycleData: updatedCycleData });
            
            // 3. Update local React state for UI consistency (though view might unload)
            cycleManagement.setHasGeneratedPrompt(true);
            cycleManagement.setSaveStatus('saved'); 
        }
    };

    const renderHeaderButtons = () => {
        const isGeneratePromptHighlighted = workflowStep === 'awaitingGeneratePrompt';
        
        if (generationManagement.connectionMode === 'manual') {
            return <button onClick={handleGeneratePrompt} className={isGeneratePromptHighlighted ? 'workflow-highlight' : ''}><VscFileCode /> Generate prompt.md</button>;
        } else {
            return <button onClick={generationManagement.handleGenerateResponses} disabled={!isReadyForNextCycle}><VscWand /> Generate responses</button>;
        }
    };
    
    const showProgressView = cycleManagement.currentCycle.status === 'generating' && !forceShowResponseView;

    const handleSelectAll = () => {
        const currentTabId = tabManagement.activeTab.toString();
        const activeTabData = tabManagement.tabs[currentTabId];
        if (activeTabData?.parsedContent) {
            const newSelection = new Set(fileManagement.selectedFilesForReplacement);
            activeTabData.parsedContent.filesUpdated.forEach(filePath => {
                newSelection.add(`${currentTabId}:::${filePath}`);
            });
            fileManagement.setSelectedFilesForReplacement(newSelection);
            cycleManagement.setSaveStatus('unsaved');
        }
    };

    const handleAcceptSelected = () => {
        const filesToWrite = [];
        for (const compositeKey of fileManagement.selectedFilesForReplacement) {
            const [tabId, filePath] = compositeKey.split(':::');
            const tabData = tabManagement.tabs[tabId];
            if (tabData && tabData.parsedContent) {
                const file = tabData.parsedContent.files.find(f => f.path === filePath);
                if (file) {
                    filesToWrite.push({ path: file.path, content: file.content });
                }
            }
        }
        
        if (filesToWrite.length > 0) {
            clientIpc.sendToServer(ClientToServerChannel.RequestBatchFileWrite, { files: filesToWrite });
        }
    };

    const handleBaseline = () => {
        const { currentCycle, cycleTitle } = cycleManagement;
        if (!currentCycle) return;
        logger.log(`[view.tsx] handleBaseline clicked. Title: ${cycleTitle}`);
        const commitMessage = `DCE Baseline: Cycle ${currentCycle.cycleId} - ${cycleTitle}`;
        clientIpc.sendToServer(ClientToServerChannel.RequestGitBaseline, { commitMessage });
    };

    const handleRestore = () => {
        const filesToDelete: string[] = [];
        // Logic to determine newly created files would go here if we were tracking them more granularly
        // For now, we rely on the backend's git clean
        clientIpc.sendToServer(ClientToServerChannel.RequestGitRestore, { filesToDelete });
    };

    const handleNewCycleWrapper = (e: React.MouseEvent) => {
        cycleManagement.handleNewCycle(e);
        tabManagement.resetAndLoadTabs({}, false);
        fileManagement.setSelectedFilesForReplacement(new Set());
    };

    return <div className="pc-view-container">
        <div className="pc-header">
            <div className="pc-toolbar">
                <button onClick={(e) => cycleManagement.handleCycleChange(e, 0)} title="Project Plan"><VscBook /> Project Plan</button>
                {renderHeaderButtons()}
                <button title="Log State"><VscBug/></button>
            </div>
            <div className="tab-count-input">
                <label htmlFor="tab-count">Responses:</label>
                <input type="number" id="tab-count" min="1" max="20" value={responseCount} onChange={e => setResponseCount(parseInt(e.target.value, 10) || 1)} />
            </div>
        </div>
        <CollapsibleSection 
            title="Cycle & Context" 
            isCollapsed={cycleManagement.isCycleCollapsed} 
            onToggle={() => { cycleManagement.setIsCycleCollapsed(p => !p); cycleManagement.setSaveStatus('unsaved'); }} 
            collapsedContent={collapsedNavigator} 
            extraHeaderContent={<div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><SaveStatusIndicator /> {totalPromptCostDisplay}</div>}
            className={isReadyForNextCycle ? 'selected' : ''}
        >
            <CycleNavigator 
                currentCycle={cycleManagement.currentCycle.cycleId} 
                maxCycle={cycleManagement.maxCycle} 
                cycleTitle={cycleManagement.cycleTitle} 
                isNewCycleButtonDisabled={!isReadyForNextCycle} 
                onCycleChange={cycleManagement.handleCycleChange} 
                onNewCycle={handleNewCycleWrapper} 
                onTitleChange={cycleManagement.onTitleChange} 
                onDeleteCycle={cycleManagement.handleDeleteCycle} 
                onResetHistory={cycleManagement.handleResetHistory} 
                onExportHistory={cycleManagement.handleExportHistory} 
                onImportHistory={cycleManagement.handleImportHistory} 
                workflowStep={workflowStep} 
                disabledReason={newCycleButtonDisabledReason} 
                saveStatus={cycleManagement.saveStatus} 
            />
            <ContextInputs 
                cycleContext={cycleManagement.cycleContext} 
                ephemeralContext={cycleManagement.ephemeralContext} 
                onCycleContextChange={cycleManagement.onCycleContextChange} 
                onEphemeralContextChange={cycleManagement.onEphemeralContextChange} 
                workflowStep={workflowStep} 
                isEphemeralContextCollapsed={cycleManagement.isEphemeralContextCollapsed} 
                onToggleEphemeralContext={() => { cycleManagement.setIsEphemeralContextCollapsed(p => !p); cycleManagement.setSaveStatus('unsaved'); }} 
            />
        </CollapsibleSection>
        <div className="main-content-area" style={{display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: 0}}>
            <ResponseTabs 
                sortedTabIds={tabManagement.sortedTabIds} 
                tabs={tabManagement.tabs} 
                activeTab={tabManagement.activeTab} 
                selectedResponseId={cycleManagement.selectedResponseId}
                isParsedMode={tabManagement.isParsedMode} 
                isSortedByTokens={tabManagement.isSortedByTokens} 
                onTabSelect={tabManagement.handleTabSelect} 
                workflowStep={workflowStep} 
                onRegenerateTab={generationManagement.handleRegenerateTab} 
                onSortToggle={tabManagement.handleSortToggle} 
                isGenerating={cycleManagement.currentCycle.status === 'generating'}
                forceShowResponseView={forceShowResponseView}
                onToggleForceResponseView={() => setForceShowResponseView(p => !p)}
                connectionMode={generationManagement.connectionMode}
            />
            {showProgressView ? (
                <GenerationProgressDisplay 
                    progressData={generationManagement.generationProgress} 
                    tps={generationManagement.tps} 
                    tabs={tabManagement.tabs} 
                    onStop={generationManagement.handleStopGeneration} 
                    onRegenerate={generationManagement.handleRegenerateTab} 
                    isGenerationComplete={generationManagement.isGenerationComplete} 
                    onViewResponses={() => {}} 
                    cycleId={cycleManagement.currentCycle.cycleId} 
                />
            ) : (
                <>
                    <WorkflowToolbar 
                        isParsedMode={tabManagement.isParsedMode}
                        onParseToggle={tabManagement.handleGlobalParseToggle}
                        selectedResponseId={cycleManagement.selectedResponseId}
                        activeTab={tabManagement.activeTab}
                        onSelectResponse={cycleManagement.handleSelectResponse}
                        onBaseline={handleBaseline}
                        onRestore={handleRestore}
                        onAcceptSelected={handleAcceptSelected}
                        onSelectAll={handleSelectAll}
                        onDeselectAll={() => { fileManagement.setSelectedFilesForReplacement(new Set()); cycleManagement.setSaveStatus('unsaved'); }}
                        selectedFilesForReplacementCount={fileManagement.selectedFilesForReplacement.size}
                        workflowStep={workflowStep}
                    />
                    <div className="tab-content">
                        <ResponsePane 
                            isParsedMode={tabManagement.isParsedMode} 
                            activeTabData={tabManagement.tabs[tabManagement.activeTab.toString()]} 
                            onContentChange={(content) => tabManagement.handleContentChange(content, tabManagement.activeTab)} 
                            onContextKeyDown={() => {}} 
                            onPaste={(e) => tabManagement.handlePaste(e, tabManagement.activeTab)}
                            fileExistenceMap={fileManagement.fileExistenceMap}
                            selectedFilePath={fileManagement.selectedFilePath}
                            onSelectForViewing={fileManagement.handleSelectForViewing}
                            selectedFilesForReplacement={fileManagement.selectedFilesForReplacement}
                            onFileSelectionToggle={fileManagement.handleFileSelectionToggle}
                            activeTab={tabManagement.activeTab}
                            pathOverrides={fileManagement.pathOverrides}
                            tempOverridePath={fileManagement.tempOverridePath}
                            onTempOverridePathChange={fileManagement.setTempOverridePath}
                            onLinkFile={fileManagement.handleLinkFile}
                            onUnlinkFile={fileManagement.handleUnlinkFile}
                            comparisonMetrics={fileManagement.comparisonMetrics}
                            viewableContent={viewableContent}
                            onCopyContent={fileManagement.handleCopyContent}
                            leftPaneWidth={leftPaneWidth} 
                            onPaneResize={(width) => { setLeftPaneWidth(width); cycleManagement.setSaveStatus('unsaved'); }}
                            workflowStep={workflowStep}
                        />
                    </div>
                </>
            )}
        </div>
    </div>;
};

try {
    const root = createRoot(document.getElementById('root') as HTMLElement);
    root.render(<App />);
} catch (error) {
    //
}