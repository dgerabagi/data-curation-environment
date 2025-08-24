// Updated on: C126 (Fix state management bug causing parse mode to revert)
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { VscChevronLeft, VscChevronRight, VscWand, VscChevronDown, VscCheck, VscError, VscAdd, VscFileCode, VscDiff, VscArrowSwap, VscTrash, VscSync } from 'react-icons/vsc';
import { logger } from '@/client/utils/logger';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { ParsedResponse } from '@/common/types/pcpp.types';
import { parseResponse } from '@/client/utils/response-parser';
import ReactMarkdown from 'react-markdown';
import DiffViewer from '@/client/components/DiffViewer';
import { PcppCycle, PcppResponse } from '@/common/types/pcpp.types';
import * as path from 'path-browserify';

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    const debouncedFunction = React.useCallback((...args: any[]) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]);

    return debouncedFunction;
};

const CodeViewer: React.FC<{ htmlContent: string | undefined | null }> = ({ htmlContent }) => {
    if (htmlContent === undefined || htmlContent === null) {
        return <div style={{ padding: '8px' }}>Select a file to view its content.</div>;
    }
    if (htmlContent.startsWith('// Error:')) {
         return <div style={{ padding: '8px', color: 'var(--vscode-errorForeground)' }}>{htmlContent}</div>;
    }

    const codeContentMatch = /<pre><code>([\s\S]*)<\/code><\/pre>/s.exec(htmlContent);
    const code = codeContentMatch ? codeContentMatch[1] : `<code>${htmlContent}</code>`; 

    const lines = code.split('\n');
    if (lines.length > 0 && lines[lines.length - 1] === '') {
        lines.pop();
    }

    return (
        <div className="file-content-viewer">
            <div className="line-numbers">
                {lines.map((_, i) => <span key={i}>{i + 1}</span>)}
            </div>
            <div className="code-content" dangerouslySetInnerHTML={{ __html: code }} />
        </div>
    );
};

interface TabState {
    rawContent: string;
    parsedContent: ParsedResponse | null;
}

const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode; isCollapsed: boolean; onToggle: () => void; collapsedContent?: React.ReactNode; }> = ({ title, children, isCollapsed, onToggle, collapsedContent }) => (
    <div className="collapsible-section">
        <div className="collapsible-header" onClick={onToggle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <VscChevronDown className={`chevron ${isCollapsed ? 'collapsed' : ''}`} />
                <span>{title}</span>
            </div>
            {isCollapsed && collapsedContent}
        </div>
        {!isCollapsed && <div className="collapsible-content">{children}</div>}
    </div>
);

const App = () => {
    const [activeTab, setActiveTab] = React.useState(1);
    const [tabCount, setTabCount] = React.useState(4);
    const [currentCycle, setCurrentCycle] = React.useState(1);
    const [maxCycle, setMaxCycle] = React.useState(1);
    const [cycleTitle, setCycleTitle] = React.useState('');
    const [cycleContext, setCycleContext] = React.useState('');
    const [ephemeralContext, setEphemeralContext] = React.useState('');
    const [tabs, setTabs] = React.useState<{ [key: string]: TabState }>({});
    const [highlightedCodeBlocks, setHighlightedCodeBlocks] = React.useState<Map<string, string>>(new Map());
    const [fileExistenceMap, setFileExistenceMap] = React.useState<Map<string, boolean>>(new Map());
    const [isParsedMode, setIsParsedMode] = React.useState(false);
    const [selectedFilePath, setSelectedFilePath] = React.useState<string | null>(null);
    const [isCycleCollapsed, setIsCycleCollapsed] = React.useState(false);
    const [leftPaneWidth, setLeftPaneWidth] = React.useState(33);
    const [isDiffMode, setIsDiffMode] = React.useState(false);
    const [originalFileContent, setOriginalFileContent] = React.useState<string | null>(null);
    const isResizing = React.useRef(false);

    const clientIpc = ClientPostMessageManager.getInstance();

    const saveCurrentCycleState = React.useCallback((force = false) => {
        const responses: { [key: string]: PcppResponse } = {};
        for (let i = 1; i <= tabCount; i++) {
            responses[i.toString()] = { content: tabs[i.toString()]?.rawContent || '' };
        }
        const cycleData: PcppCycle = {
            cycleId: currentCycle,
            timestamp: new Date().toISOString(),
            title: cycleTitle,
            cycleContext,
            ephemeralContext,
            responses,
            isParsedMode,
            leftPaneWidth,
        };
        clientIpc.sendToServer(ClientToServerChannel.SaveCycleData, { cycleData });
    }, [currentCycle, cycleTitle, cycleContext, ephemeralContext, tabs, tabCount, isParsedMode, leftPaneWidth, clientIpc]);

    const debouncedSave = useDebounce(saveCurrentCycleState, 1000);

    React.useEffect(() => {
        debouncedSave();
    }, [cycleTitle, cycleContext, ephemeralContext, tabs, isParsedMode, leftPaneWidth, debouncedSave]);
    
    const parseAllTabs = React.useCallback(() => {
        const allFilePaths = new Set<string>();
        const updatedTabs = { ...tabs };
        Object.values(updatedTabs).forEach(tabState => {
            if (tabState.rawContent && !tabState.parsedContent) {
                const parsed = parseResponse(tabState.rawContent);
                tabState.parsedContent = parsed;
                parsed.filesUpdated.forEach(file => allFilePaths.add(file));
                parsed.files.forEach(file => {
                    const lang = path.extname(file.path).substring(1) || 'plaintext';
                    const id = `${file.path}::${file.content}`;
                     clientIpc.sendToServer(ClientToServerChannel.RequestSyntaxHighlight, { code: file.content, lang, id });
                });
            }
        });
        setTabs(updatedTabs);
        if (allFilePaths.size > 0) {
            clientIpc.sendToServer(ClientToServerChannel.RequestFileExistence, { paths: Array.from(allFilePaths) });
        }
    }, [clientIpc, tabs]);
    
    // C126 Fix: Setup listeners only once to prevent re-renders from causing state resets.
    React.useEffect(() => {
        const loadCycleData = (cycleData: PcppCycle) => {
            setCurrentCycle(cycleData.cycleId);
            setCycleTitle(cycleData.title);
            setCycleContext(cycleData.cycleContext);
            setEphemeralContext(cycleData.ephemeralContext);
            const newTabs: { [key: string]: TabState } = {};
            Object.entries(cycleData.responses).forEach(([tabId, response]) => {
                newTabs[tabId] = { rawContent: response.content, parsedContent: null };
            });
            setTabs(newTabs);
            setIsParsedMode(cycleData.isParsedMode || false);
            setLeftPaneWidth(cycleData.leftPaneWidth || 33);
        };

        clientIpc.onServerMessage(ServerToClientChannel.SendLatestCycleData, ({ cycleData }) => {
            loadCycleData(cycleData);
            setMaxCycle(cycleData.cycleId);
        });
        clientIpc.onServerMessage(ServerToClientChannel.SendCycleData, ({ cycleData }) => {
            if (cycleData) {
                loadCycleData(cycleData);
            }
        });
        clientIpc.onServerMessage(ServerToClientChannel.SendSyntaxHighlight, ({ highlightedHtml, id }) => {
            setHighlightedCodeBlocks(prev => new Map(prev).set(id, highlightedHtml));
        });
        clientIpc.onServerMessage(ServerToClientChannel.SendFileExistence, ({ existenceMap }) => {
            setFileExistenceMap(new Map(Object.entries(existenceMap)));
        });
        clientIpc.onServerMessage(ServerToClientChannel.SendFileContent, ({ path: filePath, content }) => {
            // Only update if the content is for the currently selected file for diffing
            setSelectedFilePath(currentSelectedPath => {
                if (filePath === currentSelectedPath) {
                    setOriginalFileContent(content);
                }
                return currentSelectedPath;
            });
        });
        clientIpc.onServerMessage(ServerToClientChannel.ForceRefresh, ({ reason }) => {
            if (reason === 'history') {
                logger.log("History change detected, requesting latest cycle data.");
                clientIpc.sendToServer(ClientToServerChannel.RequestLatestCycleData, {});
            }
        });
        
        clientIpc.sendToServer(ClientToServerChannel.RequestLatestCycleData, {});
    }, [clientIpc]);

    React.useEffect(() => {
        if (isParsedMode) {
            parseAllTabs();
        }
    }, [isParsedMode, tabs, parseAllTabs]);
    
    const activeTabData = tabs[activeTab.toString()];

    const viewableContent = React.useMemo(() => {
        if (!selectedFilePath || !activeTabData?.parsedContent) return undefined;
        const file = activeTabData.parsedContent.files.find(f => f.path === selectedFilePath);
        if (!file) return '<div>Error: File data not found in parsed response.</div>';
        const id = `${file.path}::${file.content}`;
        return highlightedCodeBlocks.get(id);
    }, [selectedFilePath, activeTabData?.parsedContent, highlightedCodeBlocks]);


    const handleRawContentChange = (newContent: string, tabIndex: number) => {
        setTabs(prev => ({ ...prev, [tabIndex.toString()]: { rawContent: newContent, parsedContent: null }}));
    };

    const handleGlobalParseToggle = () => {
        const newParseMode = !isParsedMode;
        setIsParsedMode(newParseMode);
        setSelectedFilePath(null);
        setIsDiffMode(false);
        if (!newParseMode) {
            setTabs(prev => {
                const newTabs = {...prev};
                Object.keys(newTabs).forEach(key => {
                    newTabs[key].parsedContent = null;
                });
                return newTabs;
            });
        }
    };

    const handleCycleChange = (e: React.MouseEvent, newCycle: number) => {
        e.stopPropagation();
        if (newCycle > 0 && newCycle <= maxCycle) {
            saveCurrentCycleState(true);
            setCurrentCycle(newCycle);
            clientIpc.sendToServer(ClientToServerChannel.RequestCycleData, { cycleId: newCycle });
        }
    };

    const handleNewCycle = (e: React.MouseEvent) => {
        e.stopPropagation();
        const newCycleId = maxCycle + 1;
        setMaxCycle(newCycleId);
        setCurrentCycle(newCycleId);
        setCycleTitle('New Cycle');
        setCycleContext('');
        setEphemeralContext('');
        setTabs({});
        setIsParsedMode(false);
    };
    
    const handleGeneratePrompt = () => {
        clientIpc.sendToServer(ClientToServerChannel.RequestCreatePromptFile, { cycleTitle, currentCycle });
    };

    const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        isResizing.current = true;
    }, []);

    const handleMouseMove = React.useCallback((e: MouseEvent) => {
        if (!isResizing.current) return;
        const newWidth = (e.clientX / window.innerWidth) * 100;
        if (newWidth > 10 && newWidth < 90) {
            setLeftPaneWidth(newWidth);
        }
    }, []);

    const handleMouseUp = React.useCallback(() => {
        isResizing.current = false;
    }, []);

    React.useEffect(() => {
        const mm = (e: MouseEvent) => handleMouseMove(e);
        const mu = () => handleMouseUp();
        window.addEventListener('mousemove', mm);
        window.addEventListener('mouseup', mu);
        
        return () => {
            window.removeEventListener('mousemove', mm);
            window.removeEventListener('mouseup', mu);
        };
    }, [handleMouseMove, handleMouseUp]);
    
    const handleDiffClick = () => {
        const newDiffMode = !isDiffMode;
        setIsDiffMode(newDiffMode);
        if (newDiffMode && selectedFilePath) {
            clientIpc.sendToServer(ClientToServerChannel.RequestFileContent, { path: selectedFilePath });
        } else {
            setOriginalFileContent(null);
        }
    };

    const handleDeleteCycle = () => {
        clientIpc.sendToServer(ClientToServerChannel.RequestDeleteCycle, { cycleId: currentCycle });
    };

    const handleResetHistory = () => {
        clientIpc.sendToServer(ClientToServerChannel.RequestResetHistory, {});
    };

    const isNewCycleButtonDisabled = React.useMemo(() => {
        const hasTitle = cycleTitle && cycleTitle.trim() !== 'New Cycle' && cycleTitle.trim() !== '';
        const hasContext = cycleContext.trim() || ephemeralContext.trim();
        const hasResponseContent = Object.values(tabs).some(t => t.rawContent.trim());
        return !hasTitle && !hasContext && !hasResponseContent;
    }, [cycleTitle, cycleContext, ephemeralContext, tabs]);

    const collapsedNavigator = (
        <div className="collapsed-navigator">
            <button onClick={(e) => handleCycleChange(e, currentCycle - 1)} disabled={currentCycle <= 1}><VscChevronLeft /></button>
            <span className="cycle-display">C{currentCycle}</span>
            <button onClick={(e) => handleCycleChange(e, currentCycle + 1)} disabled={currentCycle >= maxCycle}><VscChevronRight /></button>
        </div>
    );

    const renderDiffHeader = () => {
        if (!isDiffMode || !selectedFilePath) return null;
        return (
             <div className="file-content-viewer-header diff-header">
                <span className="file-path left" title={selectedFilePath}>Original: {selectedFilePath}</span>
                <div className="file-actions">
                    <button onClick={() => setIsDiffMode(false)}>Back to Summary</button>
                </div>
                <span className="file-path right" title={selectedFilePath}>Response {activeTab}: {path.basename(selectedFilePath)}</span>
            </div>
        );
    };

    return (
        <div className="pc-view-container">
            <div className="pc-header">
                <div className="pc-toolbar">
                    <button onClick={handleGeneratePrompt} title="Generate prompt.md"><VscFileCode /> Generate prompt.md</button>
                    <button onClick={handleGlobalParseToggle}><VscWand /> {isParsedMode ? 'Un-Parse All' : 'Parse All'}</button>
                </div>
                <div className="tab-count-input">
                    <label htmlFor="tab-count">Responses:</label>
                    <input type="number" id="tab-count" min="1" max="20" value={tabCount} onChange={e => setTabCount(parseInt(e.target.value, 10) || 1)} />
                </div>
            </div>

            <CollapsibleSection title="Cycle & Context" isCollapsed={isCycleCollapsed} onToggle={() => setIsCycleCollapsed(p => !p)} collapsedContent={collapsedNavigator}>
                <div className="cycle-navigator">
                    <span>Cycle:</span>
                    <button onClick={(e) => handleCycleChange(e, currentCycle - 1)} disabled={currentCycle <= 1}><VscChevronLeft /></button>
                    <input type="number" value={currentCycle} onChange={e => setCurrentCycle(parseInt(e.target.value, 10) || 1)} className="cycle-input" />
                    <button onClick={(e) => handleCycleChange(e, currentCycle + 1)} disabled={currentCycle >= maxCycle}><VscChevronRight /></button>
                    <button onClick={handleNewCycle} title="New Cycle" disabled={isNewCycleButtonDisabled}><VscAdd /></button>
                    <input type="text" className="cycle-title-input" placeholder="Cycle Title..." value={cycleTitle} onChange={e => setCycleTitle(e.target.value)} />
                    <button onClick={handleDeleteCycle} title="Delete Current Cycle"><VscTrash /></button>
                    <button onClick={handleResetHistory} title="Reset All History"><VscSync /></button>
                </div>
                <div className="context-inputs">
                    <textarea className="context-textarea" placeholder="Cycle Context (notes for this cycle)..." value={cycleContext} onChange={e => setCycleContext(e.target.value)} />
                    <textarea className="context-textarea" placeholder="Ephemeral Context (for this cycle's prompt only)..." value={ephemeralContext} onChange={e => setEphemeralContext(e.target.value)} />
                </div>
            </CollapsibleSection>

            <div className="tab-bar">
                {[...Array(tabCount)].map((_, i) => <div key={i} className={`tab ${activeTab === i + 1 ? 'active' : ''}`} onClick={() => setActiveTab(i + 1)}>Resp {i + 1}</div>)}
            </div>

            <div className="tab-content">
                {activeTab !== null && (
                    <div className="tab-pane">
                        {!isParsedMode || !activeTabData?.parsedContent ? (
                            <textarea className="response-textarea" placeholder={`Paste AI response for tab ${activeTab} here...`} value={activeTabData?.rawContent || ''} onChange={(e) => handleRawContentChange(e.target.value, activeTab)} />
                        ) : (
                            <div className="parsed-view-grid">
                                <div className={`parsed-view-left ${isDiffMode ? 'collapsed' : ''}`} style={!isDiffMode ? { flexBasis: `${leftPaneWidth}%` } : {}}>
                                     <CollapsibleSection title="Associated Files" isCollapsed={false} onToggle={() => {}}>
                                        <ul className="associated-files-list">
                                            {activeTabData.parsedContent.filesUpdated.map(file => (
                                                <li 
                                                    key={file} 
                                                    className={selectedFilePath === file ? 'selected' : ''}
                                                    onClick={() => {setSelectedFilePath(prev => prev === file ? null : file); setIsDiffMode(false);}}
                                                    title={file}
                                                >
                                                    {fileExistenceMap.get(file) ? <VscCheck className="status-icon exists" /> : <VscError className="status-icon not-exists" />}
                                                    <span>{file}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CollapsibleSection>
                                    <CollapsibleSection title="Thoughts / Response" isCollapsed={false} onToggle={() => {}}>
                                        <ReactMarkdown>{activeTabData.parsedContent.summary}</ReactMarkdown>
                                    </CollapsibleSection>
                                    <CollapsibleSection title="Course of Action" isCollapsed={false} onToggle={() => {}}>
                                        <ReactMarkdown>{activeTabData.parsedContent.courseOfAction}</ReactMarkdown>
                                    </CollapsibleSection>
                                </div>
                                {!isDiffMode && <div className="resizer" onMouseDown={handleMouseDown} />}
                                <div className="parsed-view-right">
                                    {isDiffMode ? renderDiffHeader() : (
                                        <div className="file-content-viewer-header">
                                            <span className="file-path" title={selectedFilePath || ''}>{selectedFilePath ? `Response ${activeTab}: ${selectedFilePath}` : 'No file selected'}</span>
                                            <div className="file-actions">
                                                <button onClick={handleDiffClick} disabled={!selectedFilePath} title="Toggle Diff View"><VscDiff /></button>
                                                <button disabled={!selectedFilePath} title="Swap with Workspace File"><VscArrowSwap /></button>
                                            </div>
                                        </div>
                                    )}
                                    <div className="code-viewer-wrapper">
                                        {isDiffMode && activeTabData.parsedContent && selectedFilePath && originalFileContent ? (
                                            <DiffViewer 
                                                original={originalFileContent}
                                                modified={activeTabData.parsedContent.files.find(f => f.path === selectedFilePath)?.content || ''}
                                            />
                                        ) : (
                                            <CodeViewer htmlContent={viewableContent} />
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);