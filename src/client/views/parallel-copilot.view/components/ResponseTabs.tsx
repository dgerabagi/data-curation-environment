// src/client/views/parallel-copilot.view/components/ResponseTabs.tsx
// Updated on: C98 (Fix TabState to PcppResponse refactor)
import * as React from 'react';
import { VscFileCode, VscSymbolNumeric, VscListOrdered, VscListUnordered, VscSync, VscLoading, VscCheck } from 'react-icons/vsc';
import { PcppResponse } from '@/common/types/pcpp.types';
import { formatLargeNumber } from '@/common/utils/formatting';

interface ResponseTabsProps {
    sortedTabIds: number[];
    tabs: { [key: string]: PcppResponse };
    activeTab: number;
    selectedResponseId: string | null;
    isParsedMode: boolean;
    isSortedByTokens: boolean;
    onTabSelect: (tabIndex: number) => void;
    onSortToggle: () => void;
    workflowStep: string | null;
    onRegenerateTab: (tabId: number) => void;
}

const ResponseTabs: React.FC<ResponseTabsProps> = ({
    sortedTabIds,
    tabs,
    activeTab,
    selectedResponseId,
    isParsedMode,
    isSortedByTokens,
    onTabSelect,
    onSortToggle,
    workflowStep,
    onRegenerateTab,
}) => {
    const [regenConfirmTabId, setRegenConfirmTabId] = React.useState<number | null>(null);
    const confirmTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const handleRegenerateClick = (e: React.MouseEvent, tabId: number) => {
        e.stopPropagation();
        if (confirmTimeoutRef.current) {
            clearTimeout(confirmTimeoutRef.current);
            confirmTimeoutRef.current = null;
        }

        if (regenConfirmTabId === tabId) {
            onRegenerateTab(tabId);
            setRegenConfirmTabId(null);
        } else {
            setRegenConfirmTabId(tabId);
            confirmTimeoutRef.current = setTimeout(() => {
                setRegenConfirmTabId(null);
                confirmTimeoutRef.current = null;
            }, 3000);
        }
    };

    const nextPasteTab = workflowStep?.startsWith('awaitingResponsePaste') ? parseInt(workflowStep.split('_')[1], 10) : -1;

    return (
        <div className="tab-bar-container">
            <div className={`tab-bar ${workflowStep === 'awaitingResponseSelect' ? 'workflow-highlight' : ''}`}>
                {sortedTabIds.map((tabIndex) => {
                    const tabData = tabs[tabIndex.toString()];
                    const parsedData = tabData?.parsedContent;
                    const isLoading = tabData?.status === 'generating' || tabData?.status === 'thinking';
                    const isConfirmingRegen = regenConfirmTabId === tabIndex;

                    return (
                        <div
                            key={tabIndex}
                            className={`tab ${activeTab === tabIndex ? 'active' : ''} ${selectedResponseId === tabIndex.toString() ? 'selected' : ''} ${tabIndex === nextPasteTab ? 'workflow-highlight' : ''}`}
                            onClick={() => onTabSelect(tabIndex)}
                        >
                            <div className="tab-title">
                                Resp {tabIndex}
                                {isLoading && <VscLoading className="spinner" />}
                                <button className="regenerate-tab-button" onClick={(e) => handleRegenerateClick(e, tabIndex)} title={isConfirmingRegen ? "Click again to confirm" : "Regenerate this response"}>
                                    {isConfirmingRegen ? <VscCheck /> : <VscSync />}
                                </button>
                            </div>
                            {isParsedMode && parsedData && (
                                <div className="tab-metadata">
                                    <span><VscFileCode /> {parsedData.files.length}</span>
                                    <span><VscSymbolNumeric /> {formatLargeNumber(parsedData.totalTokens, 1)}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <button onClick={onSortToggle} className={`sort-button ${isSortedByTokens ? 'active' : ''}`} title="Sort responses by token count">
                {isSortedByTokens ? <VscListOrdered/> : <VscListUnordered />} Sort
            </button>
        </div>
    );
};

export default ResponseTabs;