// Updated on: C96 (Fix all reported UI bugs and add features)
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { VscChevronLeft, VscChevronRight, VscWand, VscChevronDown, VscCheck, VscError, VscAdd, VscFileCode } from 'react-icons/vsc';
import { logger } from '@/client/utils/logger';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { PcppCycle, PcppResponse } from '@/backend/services/history.service';
import { ParsedResponse, ParsedFile } from '@/common/types/pcpp.types';
import { parseResponse } from '@/client/utils/response-parser';
import ReactMarkdown from 'react-markdown';
import DiffViewer from '@/client/components/DiffViewer';

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    return (...args: any[]) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => callback(...args), delay);
    };
};

interface TabState {
    rawContent: string;
    parsedContent: ParsedResponse | null;
}

const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode; isCollapsed: boolean; onToggle: () => void; }> = ({ title, children, isCollapsed, onToggle }) => (
    <div className="collapsible-section">
        <div className="collapsible-header" onClick={onToggle}>
            <VscChevronDown className={`chevron ${isCollapsed ? 'collapsed' : ''}`} />
            <span>{title}</span>
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
    const [diffTarget, setDiffTarget] = React.useState<ParsedFile | null>(null);
    const [originalFileContent, setOriginalFileContent] = React.useState<string | null>(null);

    const [isCycleCollapsed, setIsCycleCollapsed] = React.useState(false);
    const [isSummaryCollapsed, setIsSummaryCollapsed] = React.useState(false);
    const [isCourseOfActionCollapsed, setIsCourseOfActionCollapsed] = React.useState(false);
    const [isAssociatedFilesCollapsed, setIsAssociatedFilesCollapsed] = React.useState(false);
    
    const clientIpc = ClientPostMessageManager.getInstance();

    const saveCurrentCycleState = React.useCallback(() => {
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
        };
        clientIpc.sendToServer(ClientToServerChannel.SaveCycleData, { cycleData });
    }, [currentCycle, cycleTitle, cycleContext, ephemeralContext, tabs, tabCount, isParsedMode, clientIpc]);

    const debouncedSave = useDebounce(saveCurrentCycleState, 1000);

    React.useEffect(() => {
        debouncedSave();
    }, [cycleTitle, cycleContext, ephemeralContext, tabs, isParsedMode, debouncedSave]);
    
    const parseAllTabs = React.useCallback((tabsToParse: { [key: string]: TabState }) => {
        const allFilePaths = new Set<string>();
        const updatedTabs = { ...tabsToParse };
        Object.entries(updatedTabs).forEach(([tabId, tabState]) => {
            if (tabState.rawContent) {
                const parsed = parseResponse(tabState.rawContent);
                updatedTabs[Number(tabId)].parsedContent = parsed;
                parsed.filesUpdated.forEach(file => allFilePaths.add(file));
                parsed.files.forEach(file => {
                    const lang = file.path.split('.').pop() || 'plaintext';
                    const id = `${file.path}::${file.content}`;
                    if (!highlightedCodeBlocks.has(id)) {
                         clientIpc.sendToServer(ClientToServerChannel.RequestSyntaxHighlight, { code: file.content, lang, id });
                    }
                });
            }
        });
        setTabs(updatedTabs);
        if (allFilePaths.size > 0) {
            clientIpc.sendToServer(ClientToServerChannel.RequestFileExistence, { paths: Array.from(allFilePaths) });
        }
    }, [clientIpc, highlightedCodeBlocks]);


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
            const loadedParseMode = cycleData.isParsedMode || false;
            setIsParsedMode(loadedParseMode);
            if (loadedParseMode) {
                parseAllTabs(newTabs);
            }
        };

        clientIpc.onServerMessage(ServerToClientChannel.SendLatestCycleData, ({ cycleData }) => {
            loadCycleData(cycleData);
            setMaxCycle(cycleData.cycleId);
        });
        clientIpc.onServerMessage(ServerToClientChannel.SendCycleData, ({ cycleData }) => {
            if (cycleData) loadCycleData(cycleData);
        });
        clientIpc.onServerMessage(ServerToClientChannel.SendSyntaxHighlight, ({ highlightedHtml, id }) => {
            setHighlightedCodeBlocks(prev => new Map(prev).set(id, highlightedHtml));
        });
        clientIpc.onServerMessage(ServerToClientChannel.SendFileExistence, ({ existenceMap }) => {
            setFileExistenceMap(new Map(Object.entries(existenceMap)));
        });
        clientIpc.onServerMessage(ServerToClientChannel.SendFileContent, ({ path, content }) => {
            logger.log(`[WebView] Received file content for ${path}`);
            if (diffTarget?.path === path) {
                setOriginalFileContent(content);
            }
        });
        clientIpc.sendToServer(ClientToServerChannel.RequestLatestCycleData, {});
    }, [clientIpc, diffTarget, parseAllTabs]);

    const handleRawContentChange = (newContent: string, tabIndex: number) => {
        setTabs(prev => ({ ...prev, [tabIndex.toString()]: { ...(prev[tabIndex.toString()] || { parsedContent: null }), rawContent: newContent }}));
    };

    const handleGlobalParseToggle = () => {
        const newParseMode = !isParsedMode;
        setIsParsedMode(newParseMode);
        setDiffTarget(null);
        setOriginalFileContent(null);
        if (newParseMode) {
            parseAllTabs(tabs);
        }
    };

    const handleCycleChange = (newCycle: number) => {
        if (newCycle > 0 && newCycle <= maxCycle) {
            setCurrentCycle(newCycle);
            clientIpc.sendToServer(ClientToServerChannel.RequestCycleData, { cycleId: newCycle });
        }
    };

    const handleNewCycle = () => {
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

    const handleSelectForDiff = (file: ParsedFile) => {
        logger.log(`[Diff Click] Clicked on file: ${file.path}`);
        setDiffTarget(file);
        setOriginalFileContent(null);
        logger.log(`[Diff Click] Sending IPC RequestFileContent for: ${file.path}`);
        clientIpc.sendToServer(ClientToServerChannel.RequestFileContent, { path: file.path });
    };

    const activeTabData = tabs[activeTab.toString()];
    const isNewCycleButtonDisabled = React.useMemo(() => {
        const hasTitle = cycleTitle && cycleTitle.trim() !== 'New Cycle' && cycleTitle.trim() !== '';
        const hasContext = cycleContext.trim() || ephemeralContext.trim();
        const hasResponseContent = Object.values(tabs).some(t => t.rawContent.trim());
        return !hasTitle && !hasContext && !hasResponseContent;
    }, [cycleTitle, cycleContext, ephemeralContext, tabs]);

    return (
        <div className="pc-view-container">
            <div className="pc-header">
                <div className="pc-toolbar">
                    <button onClick={handleGeneratePrompt} title="Generate prompt.md"><VscFileCode /> Generate prompt.md</button>
                    <button onClick={handleGlobalParseToggle}><VscWand /> {isParsedMode ? 'Un-Parse All' : 'Parse All'}</button>
                </div>
            </div>

            <CollapsibleSection title="Cycle & Context" isCollapsed={isCycleCollapsed} onToggle={() => setIsCycleCollapsed(p => !p)}>
                <div className="cycle-navigator">
                    <span>Cycle:</span>
                    <button onClick={() => handleCycleChange(currentCycle - 1)} disabled={currentCycle <= 1}><VscChevronLeft /></button>
                    <input type="number" value={currentCycle} onChange={e => setCurrentCycle(parseInt(e.target.value, 10) || 1)} className="cycle-input" />
                    <button onClick={() => handleCycleChange(currentCycle + 1)} disabled={currentCycle >= maxCycle}><VscChevronRight /></button>
                    <button onClick={handleNewCycle} title="New Cycle" disabled={isNewCycleButtonDisabled}><VscAdd /></button>
                    <input type="text" className="cycle-title-input" placeholder="Cycle Title..." value={cycleTitle} onChange={e => setCycleTitle(e.target.value)} />
                </div>
                <div className="context-inputs">
                    <textarea className="context-textarea" placeholder="Cycle Context (notes for this cycle)..." value={cycleContext} onChange={e => setCycleContext(e.target.value)} />
                    <textarea className="context-textarea" placeholder="Ephemeral Context (for this cycle's prompt only)..." value={ephemeralContext} onChange={e => setEphemeralContext(e.target.value)} />
                </div>
                <div className="tab-count-input">
                    <label htmlFor="tab-count">Number of Responses:</label>
                    <input type="number" id="tab-count" min="1" max="20" value={tabCount} onChange={e => setTabCount(parseInt(e.target.value, 10) || 1)} />
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
                                <div className="parsed-view-left">
                                    <CollapsibleSection title="Thoughts / Response" isCollapsed={isSummaryCollapsed} onToggle={() => setIsSummaryCollapsed(p => !p)}>
                                        <ReactMarkdown>{activeTabData.parsedContent.summary}</ReactMarkdown>
                                    </CollapsibleSection>
                                    <CollapsibleSection title="Course of Action" isCollapsed={isCourseOfActionCollapsed} onToggle={() => setIsCourseOfActionCollapsed(p => !p)}>
                                        <ReactMarkdown>{activeTabData.parsedContent.courseOfAction}</ReactMarkdown>
                                    </CollapsibleSection>
                                    <CollapsibleSection title="Associated Files" isCollapsed={isAssociatedFilesCollapsed} onToggle={() => setIsAssociatedFilesCollapsed(p => !p)}>
                                        <ul className="associated-files-list">
                                            {activeTabData.parsedContent.filesUpdated.map(file => (
                                                <li key={file} onClick={() => {
                                                    const parsedFile = activeTabData.parsedContent?.files.find(f => f.path === file);
                                                    if (parsedFile && fileExistenceMap.get(file)) {
                                                        handleSelectForDiff(parsedFile);
                                                    } else {
                                                        logger.warn(`Cannot diff: File '${file}' not found in parsed content or does not exist.`);
                                                    }
                                                }}>
                                                    {fileExistenceMap.get(file) ? <VscCheck className="status-icon exists" /> : <VscError className="status-icon not-exists" />}
                                                    <span>{file}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CollapsibleSection>
                                </div>
                                <div className="parsed-view-right">
                                    {diffTarget && originalFileContent !== null ? (
                                        <DiffViewer original={originalFileContent} modified={diffTarget.content} filePath={diffTarget.path} onClose={() => setDiffTarget(null)} />
                                    ) : diffTarget ? (
                                        <div>Loading original file...</div>
                                    ) : (
                                        <div>Select a file to view diff.</div>
                                    )}
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