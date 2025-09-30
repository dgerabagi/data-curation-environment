// src/client/views/parallel-copilot.view/view.tsx
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './view.scss';
import { VscWand, VscFileCode, VscBug, VscBook, VscFolder, VscChevronDown, VscLoading, VscCheck, VscWarning } from 'react-icons/vsc';
import { ClientPostMessageManager } from '../../../common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '../../../common/ipc/channels.enum';
import { PcppCycle, TabState } from '../../../common/types/pcpp.types';
import OnboardingView from './OnboardingView';
import { formatLargeNumber } from '../../../common/utils/formatting';
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
import { useWorkflow } from './hooks/useWorkflow';
import { useGeneration } from './hooks/useGeneration';
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

    React.useEffect(() => {
        clientIpc.onServerMessage(ServerToClientChannel.SendInitialCycleData as any, ({ cycleData, projectScope }: { cycleData: PcppCycle, projectScope: string }) => {
            setInitialData({cycle: cycleData, scope: projectScope, maxCycle: cycleData.cycleId });
        });
        clientIpc.sendToServer(ClientToServerChannel.RequestInitialCycleData, {});
    }, [clientIpc]);

    const saveState = () => { /* Logic to be defined/passed to useCycleManagement */ };

    const cycleManagement = useCycleManagement(initialData.cycle, initialData.scope, initialData.maxCycle, saveState);
    const tabManagement = useTabManagement({}, 4, 1, false, false, cycleManagement.setSaveStatus, () => {});
    const fileManagement = useFileManagement(tabManagement.activeTab, tabManagement.tabs, cycleManagement.setSaveStatus);
    const generationManagement = useGeneration(cycleManagement.currentCycle, () => cycleManagement.currentCycle, true, '', tabManagement.setTabs, cycleManagement.setSaveStatus);
    const { workflowStep, setWorkflowStep } = useWorkflow(null, true, cycleManagement.cycleTitle, cycleManagement.cycleContext, fileManagement.selectedFilesForReplacement, null, tabManagement.isSortedByTokens, tabManagement.isParsedMode, tabManagement.tabs, tabManagement.tabCount);
    
    usePcppIpc(
        cycleManagement.loadCycleData,
        fileManagement.setHighlightedCodeBlocks,
        fileManagement.setFileExistenceMap,
        fileManagement.setComparisonMetrics,
        () => {}, // setTotalPromptTokens
        () => {}, // setEstimatedPromptCost
        () => {}, // setCostBreakdown
        setWorkflowStep,
        cycleManagement.setSaveStatus,
        generationManagement.setConnectionMode,
        generationManagement.setGenerationProgress,
        generationManagement.setTps,
        tabManagement.setTabs,
        generationManagement.setIsGenerationComplete,
        cycleManagement.setMaxCycle,
        cycleManagement.handleCycleChange,
        cycleManagement.currentCycle?.cycleId || null
    );

    if (cycleManagement.currentCycle === null) return <div>Loading...</div>;
    if (cycleManagement.currentCycle.cycleId === -1) return <div className="onboarding-container"><h1>No Folder Opened</h1><p>You have not yet opened a folder for the Data Curation Environment to manage.</p><button className="dce-button-primary" onClick={() => clientIpc.sendToServer(ClientToServerChannel.RequestOpenFolder, {})}><VscFolder /> Open Folder</button></div>;
    
    const onScopeChange = (scope: string) => { if (cycleManagement.currentCycle?.cycleId === 0) { cycleManagement.onCycleContextChange(scope); } };

    if (cycleManagement.currentCycle.cycleId === 0) { 
        return <OnboardingView 
            projectScope={cycleManagement.projectScope || ''} 
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
    const SaveStatusIndicator = () => <span>...</span>;
    const renderHeaderButtons = () => {
        if (generationManagement.connectionMode === 'manual') {
            return <button><VscFileCode /> Generate prompt.md</button>;
        } else {
            return <button onClick={generationManagement.handleGenerateResponses} disabled={generationManagement.isGenerateResponsesDisabled}><VscWand /> Generate responses</button>;
        }
    };
    
    const showProgressView = cycleManagement.currentCycle.status === 'generating';

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
        <div className="main-content-area">
            <ResponseTabs 
                sortedTabIds={tabManagement.sortedTabIds} 
                tabs={tabManagement.tabs} 
                activeTab={tabManagement.activeTab} 
                selectedResponseId={null} 
                isParsedMode={tabManagement.isParsedMode} 
                isSortedByTokens={tabManagement.isSortedByTokens} 
                onTabSelect={tabManagement.handleTabSelect} 
                workflowStep={workflowStep} 
                onRegenerateTab={generationManagement.handleRegenerateTab} 
                isGenerating={showProgressView} 
                onSortToggle={tabManagement.handleSortToggle} 
            />
            {showProgressView ? (
                <GenerationProgressDisplay 
                    progressData={generationManagement.generationProgress} 
                    tps={generationManagement.tps} 
                    tabs={tabManagement.tabs} 
                    onStop={() => {}} 
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
                        selectedResponseId={null}
                        activeTab={tabManagement.activeTab}
                        onSelectResponse={() => {}}
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
                            onRawContentChange={(content) => tabManagement.handleRawContentChange(content, tabManagement.activeTab)} 
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