// src/client/views/parallel-copilot.view/view.tsx
// Updated on: C105 (Add view toggle state and pass to ResponseTabs)
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

// Import custom hooks
import { useCycleManagement } from './hooks/useCycleManagement';
import { useTabManagement } from './hooks/useTabManagement';
import { useFileManagement } from './hooks/useFileManagement';
import { useGeneration } from './hooks/useGeneration';
import { useWorkflow } from './hooks/useWorkflow';
import { usePcppIpc } from './hooks/usePcppIpc';

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

    // --- State & Hooks Initialization ---
    const cycleManagement = useCycleManagement(initialData.cycle, initialData.scope, initialData.maxCycle);
    const tabManagement = useTabManagement(initialData.cycle?.responses || {}, initialData.cycle?.tabCount || 4, initialData.cycle?.activeTab || 1, initialData.cycle?.isParsedMode || false, initialData.cycle?.isSortedByTokens || false, cycleManagement.setSaveStatus, () => {});
    const fileManagement = useFileManagement(tabManagement.activeTab, tabManagement.tabs, cycleManagement.setSaveStatus);
    const generationManagement = useGeneration(cycleManagement.currentCycle, () => stateRef.current.cycleManagement.currentCycle, true, '', tabManagement.setTabs, cycleManagement.setSaveStatus);
    const { workflowStep, setWorkflowStep } = useWorkflow(null, true, cycleManagement.cycleTitle, cycleManagement.cycleContext, fileManagement.selectedFilesForReplacement, cycleManagement.selectedResponseId, tabManagement.isSortedByTokens, tabManagement.isParsedMode, tabManagement.tabs, tabManagement.tabCount);
    
    // --- IPC Message Handling ---
    usePcppIpc(
        cycleManagement,
        tabManagement,
        fileManagement,
        generationManagement,
        setWorkflowStep
    );

    // --- Core Save Logic ---
    const stateRef = React.useRef({ cycleManagement, tabManagement, fileManagement, workflowStep });
    stateRef.current = { cycleManagement, tabManagement, fileManagement, workflowStep };

    saveStateRef.current = React.useCallback(() => {
        const { cycleManagement, tabManagement, fileManagement, workflowStep } = stateRef.current;
        const { currentCycle, cycleTitle, cycleContext, ephemeralContext, isEphemeralContextCollapsed, selectedResponseId } = cycleManagement;
        const { tabs, tabCount, activeTab, isParsedMode, isSortedByTokens } = tabManagement;
        const { selectedFilesForReplacement, pathOverrides } = fileManagement;
        
        if (currentCycle === null) return;
        
        cycleManagement.setSaveStatus('saving');
        
        const cycleData: PcppCycle = {
            ...currentCycle,
            title: cycleTitle,
            cycleContext,
            ephemeralContext,
            responses: tabs,
            isParsedMode,
            selectedResponseId,
            selectedFilesForReplacement: Array.from(selectedFilesForReplacement),
            tabCount,
            activeTab,
            isSortedByTokens,
            pathOverrides: Object.fromEntries(pathOverrides),
            activeWorkflowStep: workflowStep || undefined,
            isEphemeralContextCollapsed
        };
        clientIpc.sendToServer(ClientToServerChannel.SaveCycleData, { cycleData });
    }, [clientIpc]);

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

    // --- Component Logic & Rendering ---
    React.useEffect(() => {
        clientIpc.onServerMessage(ServerToClientChannel.SendInitialCycleData as any, ({ cycleData, projectScope }: { cycleData: PcppCycle, projectScope: string }) => {
            setInitialData({cycle: cycleData, scope: projectScope, maxCycle: cycleData.cycleId });
            setForceShowResponseView(false);
        });
        clientIpc.onServerMessage(ServerToClientChannel.SendCycleData as any, ({ cycleData }: { cycleData: PcppCycle | null }) => {
            if (cycleData) setForceShowResponseView(false);
        });
        clientIpc.onServerMessage(ServerToClientChannel.NavigateToNewGeneratingCycle as any, () => {
            setForceShowResponseView(false);
        });
        clientIpc.sendToServer(ClientToServerChannel.RequestInitialCycleData, {});
    }, [clientIpc]);

    if (cycleManagement.currentCycle === null) return <div>Loading...</div>;
    if (cycleManagement.currentCycle.cycleId === -1) return <div className="onboarding-container"><h1>No Folder Opened</h1><p>You have not yet opened a folder for the Data Curation Environment to manage.</p><button className="dce-button-primary" onClick={() => clientIpc.sendToServer(ClientToServerChannel.RequestOpenFolder, {})}><VscFolder /> Open Folder</button></div>;
    
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
        />; 
    }
    
    const collapsedNavigator = <div>...</div>;
    const totalPromptCostDisplay = <span>...</span>;
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
    const renderHeaderButtons = () => {
        if (generationManagement.connectionMode === 'manual') {
            return <button><VscFileCode /> Generate prompt.md</button>;
        } else {
            return <button onClick={generationManagement.handleGenerateResponses} disabled={generationManagement.isGenerateResponsesDisabled}><VscWand /> Generate responses</button>;
        }
    };
    
    const showProgressView = cycleManagement.currentCycle.status === 'generating' && !forceShowResponseView;

    return <div className="pc-view-container">
        <div className="pc-header">
            <div className="pc-toolbar">
                <button onClick={(e) => cycleManagement.handleCycleChange(e, 0)} title="Project Plan"><VscBook /> Project Plan</button>
                {renderHeaderButtons()}
                <button title="Log State"><VscBug/></button>
            </div>
            <div className="tab-count-input">
                <label htmlFor="tab-count">Responses:</label>
                <input type="number" id="tab-count" min="1" max="20" value={tabManagement.tabCount} onChange={e => tabManagement.setTabCount(parseInt(e.target.value, 10) || 1)} />
            </div>
        </div>
        <CollapsibleSection title="Cycle & Context" isCollapsed={cycleManagement.isCycleCollapsed} onToggle={() => cycleManagement.setIsCycleCollapsed(p => !p)} collapsedContent={collapsedNavigator} extraHeaderContent={<div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><SaveStatusIndicator /> {totalPromptCostDisplay}</div>}>
            <CycleNavigator 
                currentCycle={cycleManagement.currentCycle.cycleId} 
                maxCycle={cycleManagement.maxCycle} 
                cycleTitle={cycleManagement.cycleTitle} 
                isNewCycleButtonDisabled={!true} 
                onCycleChange={cycleManagement.handleCycleChange} 
                onNewCycle={cycleManagement.handleNewCycle} 
                onTitleChange={cycleManagement.onTitleChange} 
                onDeleteCycle={cycleManagement.handleDeleteCycle} 
                onResetHistory={cycleManagement.handleResetHistory} 
                onExportHistory={cycleManagement.handleExportHistory} 
                onImportHistory={cycleManagement.handleImportHistory} 
                workflowStep={workflowStep} 
                disabledReason={generationManagement.newCycleButtonDisabledReason} 
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
                        onBaseline={() => {}}
                        onRestore={() => {}}
                        onAcceptSelected={() => {}}
                        onSelectAll={() => {}}
                        onDeselectAll={() => fileManagement.setSelectedFilesForReplacement(new Set())}
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
                            viewableContent={""}
                            onCopyContent={fileManagement.handleCopyContent}
                            leftPaneWidth={0} // Placeholder
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