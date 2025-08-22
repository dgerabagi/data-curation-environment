// Updated on: C104 (Fix infinite loop in test harness)
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
import TestPane1 from './TestPane1';
import TestPane2 from './TestPane2';
import TestPane3 from './TestPane3';

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

// Encapsulates the original, complex view logic
const OriginalView: React.FC<{ onDataParsed: (parsed: ParsedResponse) => void }> = ({ onDataParsed }) => {
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
    const [selectedFile, setSelectedFile] = React.useState<ParsedFile | null>(null);
    const [isCycleCollapsed, setIsCycleCollapsed] = React.useState(false);
    const [isSummaryCollapsed, setIsSummaryCollapsed] = React.useState(false);
    const [isCourseOfActionCollapsed, setIsCourseOfActionCollapsed] = React.useState(false);
    const [isAssociatedFilesCollapsed, setIsAssociatedFilesCollapsed] = React.useState(false);
    const autoSelectedForCycle = React.useRef<number | null>(null);
    
    const clientIpc = ClientPostMessageManager.getInstance();

    const saveCurrentCycleState = React.useCallback(() => {
        const responses: { [key: string]: PcppResponse } = {};
        for (let i = 1; i <= tabCount; i++) {
            responses[i.toString()] = { content: tabs[i.toString()]?.rawContent || '' };
        }
        const cycleData: PcppCycle = { cycleId: currentCycle, timestamp: new Date().toISOString(), title: cycleTitle, cycleContext, ephemeralContext, responses, isParsedMode };
        clientIpc.sendToServer(ClientToServerChannel.SaveCycleData, { cycleData });
    }, [currentCycle, cycleTitle, cycleContext, ephemeralContext, tabs, tabCount, isParsedMode, clientIpc]);

    const debouncedSave = useDebounce(saveCurrentCycleState, 1000);

    React.useEffect(() => { debouncedSave(); }, [cycleTitle, cycleContext, ephemeralContext, tabs, isParsedMode, debouncedSave]);
    
    const parseAllTabs = React.useCallback(() => {
        const allFilePaths = new Set<string>();
        const updatedTabs = { ...tabs };
        let firstParsed: ParsedResponse | null = null;

        Object.entries(updatedTabs).forEach(([tabId, tabState]) => {
            if (tabState.rawContent) {
                const parsed = parseResponse(tabState.rawContent);
                if (!firstParsed) firstParsed = parsed;
                updatedTabs[Number(tabId)].parsedContent = parsed;
                parsed.filesUpdated.forEach(file => allFilePaths.add(file));
                parsed.files.forEach(file => {
                    const lang = file.path.split('.').pop() || 'plaintext';
                    const id = `${file.path}::${file.content}`; // Unique ID
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
        if(firstParsed) {
            onDataParsed(firstParsed); // Lift the first parsed content up
        }
    }, [clientIpc, highlightedCodeBlocks, tabs, onDataParsed]);


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
                // We call parseAllTabs from here now, but it needs the `tabs` state
                // This will be handled by the parse button logic instead for simplicity on load
            }
        };

        clientIpc.onServerMessage(ServerToClientChannel.SendLatestCycleData, ({ cycleData }) => { loadCycleData(cycleData); setMaxCycle(cycleData.cycleId); });
        clientIpc.onServerMessage(ServerToClientChannel.SendCycleData, ({ cycleData }) => { if (cycleData) { loadCycleData(cycleData); autoSelectedForCycle.current = null; } });
        clientIpc.onServerMessage(ServerToClientChannel.SendSyntaxHighlight, ({ highlightedHtml, id }) => setHighlightedCodeBlocks(prev => new Map(prev).set(id, highlightedHtml)));
        clientIpc.onServerMessage(ServerToClientChannel.SendFileExistence, ({ existenceMap }) => {
            const newMap = new Map(Object.entries(existenceMap));
            setFileExistenceMap(newMap);
        });
        
        clientIpc.sendToServer(ClientToServerChannel.RequestLatestCycleData, {});
    }, [clientIpc]);

    const handleRawContentChange = (newContent: string, tabIndex: number) => setTabs(prev => ({ ...prev, [tabIndex.toString()]: { ...(prev[tabIndex.toString()] || { parsedContent: null }), rawContent: newContent }}));
    const handleGlobalParseToggle = () => {
        const newParseMode = !isParsedMode;
        setIsParsedMode(newParseMode);
        setSelectedFile(null);
        autoSelectedForCycle.current = null;
        if (newParseMode) { parseAllTabs(); } else {
            // Un-parse: clear parsed content
            const clearedTabs = {...tabs};
            Object.keys(clearedTabs).forEach(key => {
                clearedTabs[key].parsedContent = null;
            });
            setTabs(clearedTabs);
        }
    };
    const handleCycleChange = (e: React.MouseEvent, newCycle: number) => { e.stopPropagation(); if (newCycle > 0 && newCycle <= maxCycle) { setCurrentCycle(newCycle); clientIpc.sendToServer(ClientToServerChannel.RequestCycleData, { cycleId: newCycle }); } };
    const handleNewCycle = (e: React.MouseEvent) => { e.stopPropagation(); const newCycleId = maxCycle + 1; setMaxCycle(newCycleId); setCurrentCycle(newCycleId); setCycleTitle('New Cycle'); setCycleContext(''); setEphemeralContext(''); setTabs({}); setIsParsedMode(false); };
    const handleGeneratePrompt = () => clientIpc.sendToServer(ClientToServerChannel.RequestCreatePromptFile, { cycleTitle, currentCycle });
    const activeTabData = tabs[activeTab.toString()];
    const isNewCycleButtonDisabled = React.useMemo(() => !((cycleTitle && cycleTitle.trim() !== 'New Cycle' && cycleTitle.trim() !== '') || cycleContext.trim() || ephemeralContext.trim() || Object.values(tabs).some(t => t.rawContent.trim())), [cycleTitle, cycleContext, ephemeralContext, tabs]);
    
    React.useEffect(() => {
        if (isParsedMode && activeTabData?.parsedContent && fileExistenceMap.size > 0 && autoSelectedForCycle.current !== currentCycle) {
            const firstExistingFile = activeTabData.parsedContent.filesUpdated.find(file => fileExistenceMap.get(file) === true);
            if (firstExistingFile) {
                const parsedFileObject = activeTabData.parsedContent.files.find(f => f.path === firstExistingFile);
                if (parsedFileObject) { setSelectedFile(parsedFileObject); autoSelectedForCycle.current = currentCycle; }
            }
        }
    }, [isParsedMode, activeTabData, fileExistenceMap, currentCycle]);

    const getHighlightedHtml = (file: ParsedFile | null) => file ? (highlightedCodeBlocks.get(`${file.path}::${file.content}`) || `<pre><code>${file.content}</code></pre>`) : '';

    return (
        <>
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
            <CollapsibleSection title="Cycle & Context" isCollapsed={isCycleCollapsed} onToggle={() => setIsCycleCollapsed(p => !p)} collapsedContent={ <div className="collapsed-navigator"> <button onClick={(e) => handleCycleChange(e, currentCycle - 1)} disabled={currentCycle <= 1}><VscChevronLeft /></button> <span className="cycle-display">C{currentCycle}</span> <button onClick={(e) => handleCycleChange(e, currentCycle + 1)} disabled={currentCycle >= maxCycle}><VscChevronRight /></button> </div> }>
                <div className="cycle-navigator">
                    <span>Cycle:</span>
                    <button onClick={(e) => handleCycleChange(e, currentCycle - 1)} disabled={currentCycle <= 1}><VscChevronLeft /></button>
                    <input type="number" value={currentCycle} onChange={e => setCurrentCycle(parseInt(e.target.value, 10) || 1)} className="cycle-input" />
                    <button onClick={(e) => handleCycleChange(e, currentCycle + 1)} disabled={currentCycle >= maxCycle}><VscChevronRight /></button>
                    <button onClick={handleNewCycle} title="New Cycle" disabled={isNewCycleButtonDisabled}><VscAdd /></button>
                    <input type="text" className="cycle-title-input" placeholder="Cycle Title..." value={cycleTitle} onChange={e => setCycleTitle(e.target.value)} />
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
                                <div className="parsed-view-left">
                                    <CollapsibleSection title="Thoughts / Response" isCollapsed={isSummaryCollapsed} onToggle={() => setIsSummaryCollapsed(p => !p)}> <ReactMarkdown>{activeTabData.parsedContent.summary}</ReactMarkdown> </CollapsibleSection>
                                    <CollapsibleSection title="Course of Action" isCollapsed={isCourseOfActionCollapsed} onToggle={() => setIsCourseOfActionCollapsed(p => !p)}> <ReactMarkdown>{activeTabData.parsedContent.courseOfAction}</ReactMarkdown> </CollapsibleSection>
                                    <CollapsibleSection title="Associated Files" isCollapsed={isAssociatedFilesCollapsed} onToggle={() => setIsAssociatedFilesCollapsed(p => !p)}>
                                        <ul className="associated-files-list">
                                            {activeTabData.parsedContent.filesUpdated.map(file => {
                                                const parsedFile = activeTabData.parsedContent?.files.find(f => f.path === file);
                                                return (
                                                    <li key={file} onClick={() => { if (parsedFile) { setSelectedFile(parsedFile); } else { logger.warn(`Could not find parsed file object for path: ${file}`); } }}>
                                                        {fileExistenceMap.get(file) ? <VscCheck className="status-icon exists" /> : <VscError className="status-icon not-exists" />}
                                                        <span>{file}</span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </CollapsibleSection>
                                </div>
                                <div className="parsed-view-right">
                                    {selectedFile ? ( <div className="file-block"> <div className="file-header"> <span className="file-path">{selectedFile.path}</span> </div> <div className="file-content-viewer" dangerouslySetInnerHTML={{ __html: getHighlightedHtml(selectedFile) }} /> </div> ) : ( <div>Select a file to view its content.</div> )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

// Main App component acting as the test harness
const App = () => {
    type View = 'Original' | 'TestA' | 'TestB' | 'TestC';
    const [activeView, setActiveView] = React.useState<View>('Original');

    // State lifted from OriginalView to be shared with Test Panes
    const [sharedParsedContent, setSharedParsedContent] = React.useState<ParsedResponse | null>(null);
    const [sharedFileExistenceMap, setSharedFileExistenceMap] = React.useState<Map<string, boolean>>(new Map());

    const clientIpc = ClientPostMessageManager.getInstance();

    // Fix: This effect was causing the infinite loop. Now it only sets up the listener once.
    React.useEffect(() => {
        const handleFileExistence = ({ existenceMap }: { existenceMap: { [path: string]: boolean } }) => {
            const newMap = new Map(Object.entries(existenceMap));
            setSharedFileExistenceMap(newMap);
        };
        clientIpc.onServerMessage(ServerToClientChannel.SendFileExistence, handleFileExistence);
    }, [clientIpc]);

    const handleDataParsed = React.useCallback((parsed: ParsedResponse) => {
        setSharedParsedContent(parsed);
        // Request file existence check when data is parsed
        const allFilePaths = parsed.filesUpdated;
        if (allFilePaths.length > 0) {
            clientIpc.sendToServer(ClientToServerChannel.RequestFileExistence, { paths: Array.from(allFilePaths) });
        }
    }, [clientIpc]);

    const views: View[] = ['Original', 'TestA', 'TestB', 'TestC'];

    return (
        <div className="pc-view-container">
            <div className="test-harness-tabs">
                {views.map(view => (
                    <div 
                        key={view}
                        className={`harness-tab ${activeView === view ? 'active' : ''}`}
                        onClick={() => setActiveView(view)}
                    >
                        {view === 'Original' ? 'Original' : `Test ${view.replace('Test', '')}`}
                    </div>
                ))}
            </div>
            <div className="test-harness-content">
                {activeView === 'Original' && <OriginalView onDataParsed={handleDataParsed} />}
                {activeView === 'TestA' && <TestPane1 parsedContent={sharedParsedContent} fileExistenceMap={sharedFileExistenceMap} />}
                {activeView === 'TestB' && <TestPane2 parsedContent={sharedParsedContent} fileExistenceMap={sharedFileExistenceMap} />}
                {activeView === 'TestC' && <TestPane3 parsedContent={sharedParsedContent} fileExistenceMap={sharedFileExistenceMap} />}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);