// src/client/views/parallel-copilot.view/components/ResponsePane.tsx
// Updated on: C178 (Add workflowStep prop)
import * as React from 'react';
import { TabState } from '../view';
import ParsedView from './ParsedView';
import { ComparisonMetrics } from '@/common/ipc/channels.type';

interface ResponsePaneProps {
    isParsedMode: boolean;
    activeTabData: TabState | undefined;
    onRawContentChange: (content: string) => void;
    onContextKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    // Props for ParsedView
    fileExistenceMap: Map<string, boolean>;
    selectedFilePath: string | null;
    onSelectForViewing: (path: string) => void;
    selectedFilesForReplacement: Set<string>;
    onFileSelectionToggle: (path: string) => void;
    activeTab: number;
    pathOverrides: Map<string, string>;
    tempOverridePath: string;
    onTempOverridePathChange: (path: string) => void;
    onLinkFile: (originalPath: string) => void;
    onUnlinkFile: (originalPath: string) => void;
    comparisonMetrics: ComparisonMetrics | null;
    viewableContent: string | undefined | null;
    onCopyContent: () => void;
    selectedResponseId: string | null;
    onSelectResponse: (id: string) => void;
    onSelectAllFiles: () => void;
    onDeselectAllFiles: () => void;
    isAllFilesSelected: boolean;
    onAcceptSelected: () => void;
    leftPaneWidth: number;
    onBaseline: () => void;
    onRestore: () => void;
    workflowStep: string | null;
}

const ResponsePane: React.FC<ResponsePaneProps> = (props) => {
    if (!props.isParsedMode || !props.activeTabData?.parsedContent) {
        return (
            <textarea
                className="response-textarea"
                placeholder={`Paste AI response here...`}
                value={props.activeTabData?.rawContent || ''}
                onChange={(e) => props.onRawContentChange(e.target.value)}
                onKeyDown={props.onContextKeyDown}
            />
        );
    }

    return (
        <ParsedView
            parsedContent={props.activeTabData.parsedContent}
            fileExistenceMap={props.fileExistenceMap}
            selectedFilePath={props.selectedFilePath}
            onSelectForViewing={props.onSelectForViewing}
            selectedFilesForReplacement={props.selectedFilesForReplacement}
            onFileSelectionToggle={props.onFileSelectionToggle}
            activeTab={props.activeTab}
            pathOverrides={props.pathOverrides}
            tempOverridePath={props.tempOverridePath}
            onTempOverridePathChange={props.onTempOverridePathChange}
            onLinkFile={props.onLinkFile}
            onUnlinkFile={props.onUnlinkFile}
            comparisonMetrics={props.comparisonMetrics}
            viewableContent={props.viewableContent}
            onCopyContent={props.onCopyContent}
            selectedResponseId={props.selectedResponseId}
            onSelectResponse={props.onSelectResponse}
            onSelectAllFiles={props.onSelectAllFiles}
            onDeselectAllFiles={props.onDeselectAllFiles}
            isAllFilesSelected={props.isAllFilesSelected}
            onAcceptSelected={props.onAcceptSelected}
            leftPaneWidth={props.leftPaneWidth}
            onBaseline={props.onBaseline}
            onRestore={props.onRestore}
            workflowStep={props.workflowStep}
        />
    );
};

export default ResponsePane;