// src/client/views/parallel-copilot.view/view.tsx
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './view.scss';
import { VscWand, VscFileCode, VscBug, VscBook, VscFolder, VscChevronDown, VscLoading, VscCheck, VscWarning } from 'react-icons/vsc';
import { ClientPostMessageManager } from '../../../common/ipc/client-ipc';
import { ClientToServerChannel } from '../../../common/ipc/channels.enum';
import { PcppCycle } from '../../../common/types/pcpp.types';
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
    
    // This is a placeholder until the initial data comes from IPC
    const [initialData, setInitialData] = React.useState<{cycle: PcppCycle | null, scope: string | undefined, maxCycle: number}>({cycle: null, scope: '', maxCycle: 0});

    // A simple effect to get the very first payload
    React.useEffect(() => {
        clientIpc.onServerMessage(ClientToServerChannel.RequestInitialCycleData as any, ({ cycleData, projectScope }) => {
            setInitialData({cycle: cycleData, scope: projectScope, maxCycle: cycleData.cycleId });
        });
        clientIpc.sendToServer(ClientToServerChannel.RequestInitialCycleData, {});
    }, [clientIpc]);


    const {
        currentCycle, projectScope, maxCycle, cycleTitle, cycleContext, ephemeralContext, isCycleCollapsed,
        isEphemeralContextCollapsed, saveStatus, loadCycleData, handleCycleChange, handleNewCycle, onCycleContextChange,
        onEphemeralContextChange, onTitleChange, handleDeleteCycle, handleResetHistory, handleExportHistory, handleImportHistory,
        setIsCycleCollapsed, setIsEphemeralContextCollapsed, setSaveStatus, setMaxCycle,
    } = useCycleManagement(initialData.cycle, initialData.scope, initialData.maxCycle, () => {});

    // This is complex, will be filled by IPC hook
    const requestAllMetrics = React.useCallback(() => {}, []);

    const {
        tabs, activeTab, tabCount, isParsedMode, isSortedByTokens, sortedTabIds, handleTabSelect,
        handleTabCountChange, handleRawContentChange, handlePaste, handleGlobalParseToggle, handleSortToggle, setTabs,
    } = useTabManagement(
        {}, 1, 1, false, false, setSaveStatus, requestAllMetrics
    );

    const {
        highlightedCodeBlocks, fileExistenceMap, selectedFilePath, selectedFilesForReplacement,
        comparisonMetrics, pathOverrides, tempOverridePath, handleSelectForViewing, handleFileSelectionToggle,
        handleLinkFile, handleUnlinkFile, handleCopyContent, setTempOverridePath, setSelectedFilesForReplacement,
    } = useFileManagement(activeTab, tabs, setSaveStatus);
    
    // In a real implementation, `isReadyForNextCycle` would be derived in a memo inside the container
    const isReadyForNextCycle = true; 

    const { workflowStep, setWorkflowStep } = useWorkflow(
        null, isReadyForNextCycle, cycleTitle, cycleContext, selectedFilesForReplacement, null, isSortedByTokens, isParsedMode, tabs, tabCount
    );

    const {
        connectionMode, responseCount, generationProgress, tps, isGenerationComplete, handleGenerateResponses,
        handleStartGeneration, handleRegenerateTab, isGenerateResponsesDisabled, newCycleButtonDisabledReason,
    } = useGeneration(currentCycle, () => null, isReadyForNextCycle, '', setTabs, setSaveStatus);

    // The IPC hook would now take all the setters it needs
    // usePcppIpc(loadCycleData, setHighlightedCodeBlocks, ... all other setters);

    if (currentCycle === null) return <div>Loading...</div>;
    if (currentCycle.cycleId === -1) return <div className="onboarding-container"><h1>No Folder Opened</h1><p>You have not yet opened a folder.</p><button className="dce-button-primary" onClick={() => clientIpc.sendToServer(ClientToServerChannel.RequestOpenFolder, {})}><VscFolder /> Open Folder</button></div>;
    
    const onScopeChange = (scope: string) => { if (currentCycle?.cycleId === 0) { onCycleContextChange(scope); } };

    if (currentCycle.cycleId === 0) { 
        return <OnboardingView 
            projectScope={projectScope || ''} 
            onScopeChange={onScopeChange} 
            onNavigateToCycle={(id) => handleCycleChange(null, id)} 
            latestCycleId={maxCycle} 
            workflowStep={workflowStep} 
            saveStatus={saveStatus} 
            connectionMode={connectionMode} 
            onStartGeneration={handleStartGeneration} 
        />; 
    }
    
    const collapsedNavigator = <div>...</div>; // Simplified for brevity
    const totalPromptCostDisplay = <span>...</span>;
    const SaveStatusIndicator = () => <span>...</span>;
    const renderHeaderButtons = () => {
        if (connectionMode === 'manual') {
            return <button><VscFileCode /> Generate prompt.md</button>;
        } else {
            return <button onClick={handleGenerateResponses} disabled={isGenerateResponsesDisabled}><VscWand /> Generate responses</button>;
        }
    };
    
    const showProgressView = currentCycle.status === 'generating';

    return <div className="pc-view-container">
        <div className="pc-header">
            <div className="pc-toolbar">
                <button onClick={(e) => handleCycleChange(e, 0)} title="Project Plan"><VscBook /> Project Plan</button>
                {renderHeaderButtons()}
                <button title="Log State"><VscBug/></button>
            </div>
            <div className="tab-count-input">
                <label htmlFor="tab-count">Responses:</label>
                <input type="number" id="tab-count" min="1" max="20" value={responseCount} onChange={e => handleTabCountChange(parseInt(e.target.value, 10) || 1)} />
            </div>
        </div>
        <CollapsibleSection title="Cycle & Context" isCollapsed={isCycleCollapsed} onToggle={() => setIsCycleCollapsed(p => !p)} collapsedContent={collapsedNavigator} extraHeaderContent={<div style={{display: 'flex', alignItems: 'center', gap: '8px'}}><SaveStatusIndicator /> {totalPromptCostDisplay}</div>}>
            <CycleNavigator 
                currentCycle={currentCycle.cycleId} 
                maxCycle={maxCycle} 
                cycleTitle={cycleTitle} 
                isNewCycleButtonDisabled={!isReadyForNextCycle} 
                onCycleChange={handleCycleChange} 
                onNewCycle={handleNewCycle} 
                onTitleChange={onTitleChange} 
                onDeleteCycle={handleDeleteCycle} 
                onResetHistory={handleResetHistory} 
                onExportHistory={handleExportHistory} 
                onImportHistory={handleImportHistory} 
                workflowStep={workflowStep} 
                disabledReason={newCycleButtonDisabledReason} 
                saveStatus={saveStatus} 
            />
            <ContextInputs 
                cycleContext={cycleContext} 
                ephemeralContext={ephemeralContext} 
                cycleContextTokens={0} 
                ephemeralContextTokens={0}
                onCycleContextChange={onCycleContextChange} 
                onEphemeralContextChange={onEphemeralContextChange} 
                workflowStep={workflowStep} 
                isEphemeralContextCollapsed={isEphemeralContextCollapsed} 
                onToggleEphemeralContext={() => { setIsEphemeralContextCollapsed(p => !p); setSaveStatus('unsaved'); }} 
            />
        </CollapsibleSection>
        <div className="main-content-area">
            <ResponseTabs 
                sortedTabIds={sortedTabIds} 
                tabs={tabs} 
                activeTab={activeTab} 
                selectedResponseId={null} 
                isParsedMode={isParsedMode} 
                isSortedByTokens={isSortedByTokens} 
                onTabSelect={handleTabSelect} 
                workflowStep={workflowStep} 
                onRegenerateTab={handleRegenerateTab} 
                isGenerating={showProgressView} 
                generationProgress={generationProgress} 
                onSortToggle={handleSortToggle} 
            />
            {showProgressView ? (
                <GenerationProgressDisplay 
                    progressData={generationProgress} 
                    tps={tps} 
                    tabs={tabs} 
                    onStop={() => {}} 
                    onRegenerate={handleRegenerateTab} 
                    isGenerationComplete={isGenerationComplete} 
                    onViewResponses={() => {}} 
                    cycleId={currentCycle.cycleId} 
                />
            ) : (
                <>
                    <WorkflowToolbar 
                        isParsedMode={isParsedMode}
                        onParseToggle={handleGlobalParseToggle}
                        selectedResponseId={null}
                        activeTab={activeTab}
                        onSelectResponse={() => {}}
                        onBaseline={() => {}}
                        onRestore={() => {}}
                        onAcceptSelected={() => {}}
                        onSelectAll={() => {}}
                        onDeselectAll={() => setSelectedFilesForReplacement(new Set())}
                        selectedFilesForReplacementCount={selectedFilesForReplacement.size}
                        workflowStep={workflowStep}
                    />
                    <div className="tab-content">
                        <ResponsePane 
                            isParsedMode={isParsedMode} 
                            activeTabData={tabs[activeTab.toString()]} 
                            onRawContentChange={(content) => handleRawContentChange(content, activeTab)} 
                            onContextKeyDown={() => {}} 
                            onPaste={(e) => handlePaste(e, activeTab)}
                            fileExistenceMap={fileExistenceMap}
                            selectedFilePath={selectedFilePath}
                            onSelectForViewing={handleSelectForViewing}
                            selectedFilesForReplacement={selectedFilesForReplacement}
                            onFileSelectionToggle={handleFileSelectionToggle}
                            activeTab={activeTab}
                            pathOverrides={new Map()}
                            tempOverridePath={tempOverridePath}
                            onTempOverridePathChange={setTempOverridePath}
                            onLinkFile={handleLinkFile}
                            onUnlinkFile={handleUnlinkFile}
                            comparisonMetrics={comparisonMetrics}
                            viewableContent={""}
                            onCopyContent={handleCopyContent}
                            selectedResponseId={null}
                            onSelectResponse={() => {}}
                            onSelectAllFiles={() => {}}
                            onDeselectAllFiles={() => {}}
                            isAllFilesSelected={false}
                            onAcceptSelected={() => {}}
                            leftPaneWidth={leftPaneWidth}
                            onBaseline={() => {}}
                            onRestore={() => {}}
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