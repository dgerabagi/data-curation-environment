// src/client/views/parallel-copilot.view/components/ResponseTabs.tsx
// Updated on: C172 (Implement component)
import * as React from 'react';
import { VscFileCode, VscSymbolNumeric, VscListOrdered, VscListUnordered } from 'react-icons/vsc';
import { TabState } from '../view';
import { formatLargeNumber } from '@/common/utils/formatting';

interface ResponseTabsProps {
    sortedTabIds: number[];
    tabs: { [key: string]: TabState };
    activeTab: number;
    selectedResponseId: string | null;
    isParsedMode: boolean;
    isSortedByTokens: boolean;
    onTabSelect: (tabIndex: number) => void;
    onSortToggle: () => void;
}

const ResponseTabs: React.FC<ResponseTabsProps> = ({
    sortedTabIds,
    tabs,
    activeTab,
    selectedResponseId,
    isParsedMode,
    isSortedByTokens,
    onTabSelect,
    onSortToggle
}) => {
    return (
        <div className="tab-bar-container">
            <div className="tab-bar">
                {sortedTabIds.map((tabIndex) => {
                    const tabData = tabs[tabIndex.toString()];
                    const parsedData = tabData?.parsedContent;
                    return (
                        <div
                            key={tabIndex}
                            className={`tab ${activeTab === tabIndex ? 'active' : ''} ${selectedResponseId === tabIndex.toString() ? 'selected' : ''}`}
                            onClick={() => onTabSelect(tabIndex)}
                        >
                            <div className="tab-title">Resp {tabIndex}</div>
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
            {isParsedMode && (
                <button
                    onClick={onSortToggle}
                    className={`sort-button ${isSortedByTokens ? 'active' : ''}`}
                    title="Sort responses by token count"
                >
                    {isSortedByTokens ? <VscListOrdered /> : <VscListUnordered />} Sort
                </button>
            )}
        </div>
    );
};

export default ResponseTabs;