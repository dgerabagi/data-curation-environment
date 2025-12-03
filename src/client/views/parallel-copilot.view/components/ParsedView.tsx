// src/client/views/parallel-copilot.view/components/ParsedView.tsx
// Updated on: C124 (Update metrics key to use tabId, add Markdown preview)
import * as React from 'react';
import { VscCheck, VscError, VscDebugDisconnect, VscLink, VscClippy, VscChevronDown, VscDiff, VscPreview } from 'react-icons/vsc';
import ReactMarkdown from 'react-markdown';
import * as path from 'path-browserify';
import { ParsedResponse } from '@/common/types/pcpp.types';
import { ComparisonMetrics } from '@/common/ipc/channels.type';
import { formatLargeNumber } from '@/common/utils/formatting';
import CodeViewer from './CodeViewer';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';

const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode; isCollapsed: boolean; onToggle: () => void; className?: string; }> = ({ title, children, isCollapsed, onToggle, className }) => (
    <div className={`collapsible-section-inner ${className || ''}`}>
        <div className="collapsible-header-inner" onClick={onToggle}>
            <VscChevronDown className={`chevron ${isCollapsed ? 'collapsed' : ''}`} />
            <span>{title}</span>
        </div>
        {!isCollapsed && <div className="collapsible-content-inner">{children}</div>}
    </div>
);

const getSimilarityColor = (similarity: number): string => {
    const hue = (similarity * 120).toString(10); // 0 (red) -> 120 (green)
    return `hsl(${hue}, 70%, 50%, 0.15)`;
};

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
    comparisonMetrics: Map<string, ComparisonMetrics | null>;
    viewableContent: string | undefined | null;
    onCopyContent: () => void;
    workflowStep: string | null;
    leftPaneWidth: number;
    onPaneResize: (width: number) => void;
}

const ParsedView: React.FC<ParsedViewProps> = (props) => {
    const [isAssociatedFilesCollapsed, setAssociatedFilesCollapsed] = React.useState(false);
    const [isThoughtsCollapsed, setThoughtsCollapsed] = React.useState(false);
    const [isActionCollapsed, setActionCollapsed] = React.useState(false);
    const [isCuratorActivityCollapsed, setCuratorActivityCollapsed] = React.useState(false);
    const [contextMenu, setContextMenu] = React.useState<{ x: number, y: number, path: string } | null>(null);
    const clientIpc = ClientPostMessageManager.getInstance();
    const menuRef = React.useRef<HTMLDivElement>(null);
    const resizerRef = React.useRef<HTMLDivElement>(null);
    const leftPaneRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setContextMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        const handleMouseMove = (moveEvent: MouseEvent) => {
            if (leftPaneRef.current) {
                const containerWidth = leftPaneRef.current.parentElement?.clientWidth || window.innerWidth;
                const newLeftWidth = moveEvent.clientX - (leftPaneRef.current.parentElement?.getBoundingClientRect().left || 0);
                const newWidthPercent = Math.max(15, Math.min(85, (newLeftWidth / containerWidth) * 100));
                props.onPaneResize(newWidthPercent);
            }
        };
        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }, [props.onPaneResize]);

    const handleContextMenu = (event: React.MouseEvent, path: string) => {
        event.preventDefault();
        event.stopPropagation();
        setContextMenu({ x: event.clientX, y: event.clientY, path });
    };

    const handleCopyPath = () => {
        if (contextMenu) {
            clientIpc.sendToServer(ClientToServerChannel.RequestCopyPath, { path: contextMenu.path, relative: true });
            setContextMenu(null);
        }
    };

    const handleNativeDiff = (e: React.MouseEvent, filePath: string) => {
        e.stopPropagation();
        const fileData = props.parsedContent.files.find(f => f.path === filePath);
        if (fileData) {
            const title = `${path.basename(filePath)} (Workspace) ↔ (AI Response)`;
            clientIpc.sendToServer(ClientToServerChannel.RequestNativeDiff, {
                originalPath: filePath,
                modifiedContent: fileData.content,
                title: title
            });
        }
    };
    
    const handleMarkdownPreview = (e: React.MouseEvent, filePath: string) => {
        e.stopPropagation();
        clientIpc.sendToServer(ClientToServerChannel.RequestMarkdownPreview, { filePath });
    };

    // C124 FIX: Use composite key for metrics lookup
    const getMetricsKey = (filePath: string) => `${props.activeTab}:::${props.pathOverrides.get(filePath) || filePath}`;

    const currentComparisonMetrics = props.selectedFilePath ? props.comparisonMetrics.get(getMetricsKey(props.selectedFilePath)) : null;

    return (
        <div className="parsed-view-grid">
            <div className="parsed-view-left" ref={leftPaneRef} style={{ flexBasis: `${props.leftPaneWidth}%` }}>
                <CollapsibleSection title="Associated Files" isCollapsed={isAssociatedFilesCollapsed} onToggle={() => setAssociatedFilesCollapsed(p => !p)} className={props.workflowStep === 'awaitingFileSelect' ? 'workflow-highlight' : ''}>
                    <ul className="associated-files-list">{props.parsedContent.filesUpdated.map(file => {
                        const fileExists = props.fileExistenceMap.get(file);
                        const hasOverride = props.pathOverrides.has(file);
                        const metrics = props.comparisonMetrics.get(getMetricsKey(file));
                        const similarity = metrics?.similarity ?? 0;
                        const bgColor = (metrics && fileExists) ? getSimilarityColor(similarity) : 'transparent';
                        const isMarkdown = file.toLowerCase().endsWith('.md');
                        
                        return <li key={file} className={props.selectedFilePath === file ? 'selected' : ''} onClick={() => props.onSelectForViewing(file)} onContextMenu={(e) => handleContextMenu(e, file)} title={file} style={{ backgroundColor: bgColor }}>
                            <div className="file-row">
                                <input type="checkbox" checked={props.selectedFilesForReplacement.has(`${props.activeTab}:::${file}`)} onChange={() => props.onFileSelectionToggle(file)} onClick={e => e.stopPropagation()} />
                                {fileExists ? <VscCheck className="status-icon exists" /> : <VscError className="status-icon not-exists" />}
                                <span className="file-path-text" title={file}>{file}</span>
                                {metrics && fileExists && <span className="similarity-score">{ (similarity * 100).toFixed(0) }%</span>}
                                <div className="file-actions-container">
                                    {fileExists && isMarkdown && <button className="native-diff-button styled-button" title="Open Preview" onClick={(e) => handleMarkdownPreview(e, file)}><VscPreview /></button>}
                                    {fileExists && <button className="native-diff-button styled-button" title="Open Changes" onClick={(e) => handleNativeDiff(e, file)}><VscDiff /></button>}
                                </div>
                            </div>
                            {!fileExists && props.selectedFilePath === file && (
                                <div className="path-override-container" onClick={e => e.stopPropagation()}>{hasOverride ? (<><span>Linked to: {props.pathOverrides.get(file)}</span><button className="styled-button" onClick={() => props.onUnlinkFile(file)}><VscDebugDisconnect /> Unlink</button></>) : (<><input type="text" placeholder="Enter correct relative path..." value={props.tempOverridePath} onChange={e => props.onTempOverridePathChange(e.target.value)} onKeyDown={e => {if(e.key === 'Enter') props.onLinkFile(file)}} /><button className="styled-button" onClick={() => props.onLinkFile(file)}><VscLink /> Link</button></>)}</div>
                            )}
                        </li>
                    })}</ul>
                </CollapsibleSection>
                <CollapsibleSection title="Summary" isCollapsed={isThoughtsCollapsed} onToggle={() => setThoughtsCollapsed(p => !p)}><ReactMarkdown>{props.parsedContent.summary}</ReactMarkdown></CollapsibleSection>
                <CollapsibleSection title="Course of Action" isCollapsed={isActionCollapsed} onToggle={() => setActionCollapsed(p => !p)}><ReactMarkdown>{props.parsedContent.courseOfAction}</ReactMarkdown></CollapsibleSection>
                {props.parsedContent.curatorActivity && (
                    <CollapsibleSection title="Curator Activity" isCollapsed={isCuratorActivityCollapsed} onToggle={() => setCuratorActivityCollapsed(p => !p)}>
                        <ReactMarkdown>{props.parsedContent.curatorActivity}</ReactMarkdown>
                    </CollapsibleSection>
                )}
            </div>
            <div className="resizer" ref={resizerRef} onMouseDown={handleMouseDown} />
            <div className="parsed-view-right">
                <div className="file-content-viewer-header">
                    <span className="file-path" title={props.selectedFilePath || ''}>{props.selectedFilePath ? path.basename(props.selectedFilePath) : 'No file selected'}</span>
                    <div className="file-actions"><div className="file-metadata">{currentComparisonMetrics && currentComparisonMetrics.originalTokens !== -1 && (<><span>Original: {formatLargeNumber(currentComparisonMetrics.originalTokens, 1)} tk</span><span>New: {formatLargeNumber(currentComparisonMetrics.modifiedTokens, 1)} tk</span><span>Similarity: {(currentComparisonMetrics.similarity * 100).toFixed(0)}%</span></>)}{currentComparisonMetrics && currentComparisonMetrics.originalTokens === -1 && (<span style={{color: 'var(--vscode-errorForeground)'}}>Original file not found</span>)}</div><button onClick={props.onCopyContent} title="Copy file content" disabled={!props.selectedFilePath}><VscClippy /></button></div>
                </div>
                <CodeViewer htmlContent={props.viewableContent} />
            </div>
            {contextMenu && (
                <>
                    <div className="context-menu-overlay" onClick={() => setContextMenu(null)}></div>
                    <div ref={menuRef} className="context-menu" style={{ top: contextMenu.y, left: contextMenu.x }}>
                        <ul>
                            <li onClick={handleCopyPath}>Copy Relative Path</li>
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default ParsedView;