// src/client/views/parallel-copilot.view/components/ResponseTabs.tsx
// Updated on: C62 (Add per-tab regenerate button)
import * as React from 'react';
import { VscFileCode, VscSymbolNumeric, VscListOrdered, VscListUnordered, VscSync, VscLoading } from 'react-icons/vsc';
import { TabState as OriginalTabState } from '../view';
import { formatLargeNumber } from '@/common/utils/formatting';

type TabState = OriginalTabState & { isLoading?: boolean };

interface ResponseTabsProps {
    sortedTabIds: number[];
    tabs: { [key: string]: TabState };
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
    const nextPasteTab = workflowStep?.startsWith('awaitingResponsePaste') ? parseInt(workflowStep.split('_')[1], 10) : -1;

    return (
        <div className="tab-bar-container">
            <div className={`tab-bar ${workflowStep === 'awaitingResponseSelect' ? 'workflow-highlight' : ''}`}>
                {sortedTabIds.map((tabIndex) => {
                    const tabData = tabs[tabIndex.toString()];
                    const parsedData = tabData?.parsedContent;
                    const isLoading = tabData?.isLoading || false;
                    return (
                        <div
                            key={tabIndex}
                            className={`tab ${activeTab === tabIndex ? 'active' : ''} ${selectedResponseId === tabIndex.toString() ? 'selected' : ''} ${tabIndex === nextPasteTab ? 'workflow-highlight' : ''}`}
                            onClick={() => onTabSelect(tabIndex)}
                        >
                            <div className="tab-title">
                                Resp {tabIndex}
                                {isLoading && <VscLoading className="spinner" />}
                            </div>
                            {isParsedMode && parsedData && (
                                <div className="tab-metadata">
                                    <span><VscFileCode /> {parsedData.files.length}</span>
                                    <span><VscSymbolNumeric /> {formatLargeNumber(parsedData.totalTokens, 1)}</span>
                                </div>
                            )}
                             <button className="regenerate-tab-button" onClick={(e) => { e.stopPropagation(); onRegenerateTab(tabIndex); }} title="Regenerate this response">
                                <VscSync />
                            </button>
                        </div>
                    );
                })}
            </div>
            {isParsedMode && (
                <button
                    onClick={onSortToggle}
                    className={`sort-button ${isSortedByTokens ? 'active' : ''} ${workflowStep === 'awaitingSort' ? 'workflow-highlight' : ''}`}
                    title="Sort responses by token count"
                >
                    {isSortedByTokens ? <VscListOrdered /> : <VscListUnordered />} Sort
                </button>
            )}
        </div>
    );
};

export default ResponseTabs;