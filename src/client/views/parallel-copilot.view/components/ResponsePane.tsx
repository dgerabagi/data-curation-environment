// src/client/views/parallel-copilot.view/components/ResponsePane.tsx
// Updated on: C117 (Add onPaneResize prop)
import * as React from 'react';
import ParsedView from './ParsedView';
import { ComparisonMetrics } from '@/common/ipc/channels.type';
import { PcppResponse } from '@/common/types/pcpp.types';

interface ResponsePaneProps {
    isParsedMode: boolean;
    activeTabData: PcppResponse | undefined;
    onContentChange: (content: string) => void;
    onContextKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onPaste: (e: React.ClipboardEvent) => void;
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
    comparisonMetrics: Map<string, ComparisonMetrics | null>;
    viewableContent: string | undefined | null;
    onCopyContent: () => void;
    leftPaneWidth: number;
    onPaneResize: (width: number) => void; // Added this prop
    workflowStep: string | null;
}

const ResponsePane: React.FC<ResponsePaneProps> = (props) => {
    if (!props.isParsedMode || !props.activeTabData?.parsedContent) {
        return (
            <textarea
                className="response-textarea"
                placeholder={`Paste AI response here...`}
                value={props.activeTabData?.content || ''}
                onChange={(e) => props.onContentChange(e.target.value)}
                onKeyDown={props.onContextKeyDown}
                onPaste={props.onPaste}
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
            leftPaneWidth={props.leftPaneWidth}
            workflowStep={props.workflowStep}
            onPaneResize={props.onPaneResize} // Pass the prop down
        />
    );
};

export default ResponsePane;