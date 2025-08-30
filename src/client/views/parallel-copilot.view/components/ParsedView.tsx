// src/client/views/parallel-copilot.view/components/ParsedView.tsx
// Updated on: C176 (Update props interface to accept Git functions)
import * as React from 'react';
import { VscCheck, VscError, VscDebugDisconnect, VscLink, VscSave, VscCheckAll, VscClearAll, VscClippy, VscChevronDown, VscSourceControl, VscDiscard } from 'react-icons/vsc';
import ReactMarkdown from 'react-markdown';
import * as path from 'path-browserify';
import { ParsedResponse } from '@/common/types/pcpp.types';
import { ComparisonMetrics } from '@/common/ipc/channels.type';
import { formatLargeNumber } from '@/common/utils/formatting';
import CodeViewer from './CodeViewer';

const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode; isCollapsed: boolean; onToggle: () => void; }> = ({ title, children, isCollapsed, onToggle }) => (
    <div className="collapsible-section-inner">
        <div className="collapsible-header-inner" onClick={onToggle}>
            <VscChevronDown className={`chevron ${isCollapsed ? 'collapsed' : ''}`} />
            <span>{title}</span>
        </div>
        {!isCollapsed && <div className="collapsible-content-inner">{children}</div>}
    </div>
);

interface ParsedViewProps {
    parsedContent: ParsedResponse;
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
}

const ParsedView: React.FC<ParsedViewProps> = (props) => {
    const [isAssociatedFilesCollapsed, setAssociatedFilesCollapsed] = React.useState(false);
    const [isThoughtsCollapsed, setThoughtsCollapsed] = React.useState(false);
    const [isActionCollapsed, setActionCollapsed] = React.useState(false);

    return (
        <div className="parsed-view-grid">
            <div className="parsed-view-left" style={{ flexBasis: `${props.leftPaneWidth}%` }}>
                <CollapsibleSection title="Associated Files" isCollapsed={isAssociatedFilesCollapsed} onToggle={() => setAssociatedFilesCollapsed(p => !p)}>
                    <ul className="associated-files-list">{props.parsedContent.filesUpdated.map(file => {
                        const fileExists = props.fileExistenceMap.get(file);
                        const hasOverride = props.pathOverrides.has(file);
                        return <li key={file} className={props.selectedFilePath === file ? 'selected' : ''} onClick={() => props.onSelectForViewing(file)} title={file}>
                            <div className="file-row">
                                <input type="checkbox" checked={props.selectedFilesForReplacement.has(`${props.activeTab}:::${file}`)} onChange={() => props.onFileSelectionToggle(file)} onClick={e => e.stopPropagation()} />
                                {fileExists ? <VscCheck className="status-icon exists" /> : <VscError className="status-icon not-exists" />}
                                <span>{file}</span>
                            </div>
                            {!fileExists && props.selectedFilePath === file && (
                                <div className="path-override-container" onClick={e => e.stopPropagation()}>{hasOverride ? (<><span>Linked to: {props.pathOverrides.get(file)}</span><button className="styled-button" onClick={() => props.onUnlinkFile(file)}><VscDebugDisconnect /> Unlink</button></>) : (<><input type="text" placeholder="Enter correct relative path..." value={props.tempOverridePath} onChange={e => props.onTempOverridePathChange(e.target.value)} onKeyDown={e => {if(e.key === 'Enter') props.onLinkFile(file)}} /><button className="styled-button" onClick={() => props.onLinkFile(file)}><VscLink /> Link</button></>)}</div>
                            )}
                        </li>
                    })}</ul>
                </CollapsibleSection>
                <CollapsibleSection title="Summary" isCollapsed={isThoughtsCollapsed} onToggle={() => setThoughtsCollapsed(p => !p)}><ReactMarkdown>{props.parsedContent.summary}</ReactMarkdown></CollapsibleSection>
                <CollapsibleSection title="Course of Action" isCollapsed={isActionCollapsed} onToggle={() => setActionCollapsed(p => !p)}><ReactMarkdown>{props.parsedContent.courseOfAction}</ReactMarkdown></CollapsibleSection>
            </div>
            <div className="resizer" />
            <div className="parsed-view-right">
                <div className="response-acceptance-header">
                    <button className={`styled-button ${props.selectedResponseId === props.activeTab.toString() ? 'toggled' : ''}`} onClick={() => props.onSelectResponse(props.activeTab.toString())}>{props.selectedResponseId === props.activeTab.toString() ? 'Response Selected' : 'Select This Response'}</button>
                    <button className="styled-button" onClick={props.onSelectAllFiles}><VscCheckAll/> {props.isAllFilesSelected ? 'Deselect All' : 'Select All'}</button>
                    <button className="styled-button" onClick={props.onDeselectAllFiles} title="Deselect All Files Across All Responses"><VscClearAll /></button>
                    <button className="styled-button" onClick={props.onAcceptSelected} disabled={props.selectedFilesForReplacement.size === 0}><VscSave/> Accept Selected</button>
                </div>
                <div className="file-content-viewer-header">
                    <span className="file-path" title={props.selectedFilePath || ''}>{props.selectedFilePath ? path.basename(props.selectedFilePath) : 'No file selected'}</span>
                    <div className="file-actions"><div className="file-metadata">{props.comparisonMetrics && props.comparisonMetrics.originalTokens !== -1 && (<><span>Original: {formatLargeNumber(props.comparisonMetrics.originalTokens, 1)} tk</span><span>New: {formatLargeNumber(props.comparisonMetrics.modifiedTokens, 1)} tk</span><span>Similarity: {(props.comparisonMetrics.similarity * 100).toFixed(0)}%</span></>)}{props.comparisonMetrics && props.comparisonMetrics.originalTokens === -1 && (<span style={{color: 'var(--vscode-errorForeground)'}}>Original file not found</span>)}</div><button onClick={props.onCopyContent} title="Copy file content" disabled={!props.selectedFilePath}><VscClippy /></button></div>
                </div>
                <CodeViewer htmlContent={props.viewableContent} />
            </div>
        </div>
    );
};

export default ParsedView;