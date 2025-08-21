// Updated on: C91 (Implement global parse toggle and Associated Files list)
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { VscChevronLeft, VscChevronRight, VscWand, VscChevronDown, VscCheck, VscError } from 'react-icons/vsc';
import { logger } from '@/client/utils/logger';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { PcppCycle } from '@/backend/services/history.service';
import { ParsedResponse } from '@/common/types/pcpp.types';
import { parseResponse } from '@/client/utils/response-parser';
import ReactMarkdown from 'react-markdown';

// Debounce hook
const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    return (...args: any[]) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
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

const AssociatedFilesList: React.FC<{ files: string[], existenceMap: Map<string, boolean> }> = ({ files, existenceMap }) => (
    <ul className="associated-files-list">
        {files.map(file => (
            <li key={file}>
                {existenceMap.get(file) ? (
                    <VscCheck className="status-icon exists" title="File exists in workspace" />
                ) : (
                    <VscError className="status-icon not-exists" title="File not found in workspace" />
                )}
                <span>{file}</span>
            </li>
        ))}
    </ul>
);


const App = () => {
    // State
    const [activeTab, setActiveTab] = React.useState(1);
    const [tabCount, setTabCount] = React.useState(4);
    const [currentCycle, setCurrentCycle] = React.useState(91);
    const [maxCycle, setMaxCycle] = React.useState(91);
    const [cycleTitle, setCycleTitle] = React.useState('implement feedback');
    const [cycleContext, setCycleContext] = React.useState('');
    const [ephemeralContext, setEphemeralContext] = React.useState('');
    const [tabs, setTabs] = React.useState<{ [key: number]: TabState }>({});
    const [highlightedCodeBlocks, setHighlightedCodeBlocks] = React.useState<Map<string, string>>(new Map());
    const [fileExistenceMap, setFileExistenceMap] = React.useState<Map<string, boolean>>(new Map());
    const [isParsedMode, setIsParsedMode] = React.useState(false);

    // Collapsible sections state
    const [isCycleCollapsed, setIsCycleCollapsed] = React.useState(false);

    const clientIpc = ClientPostMessageManager.getInstance();

    // --- Data Saving ---
    const saveCurrentCycleState = React.useCallback(() => {
        const responses: { [key: number]: { content: string } } = {};
        for (let i = 1; i <= tabCount; i++) {
            responses[i] = { content: tabs[i]?.rawContent || '' };
        }

        const cycleData: PcppCycle = {
            cycleId: currentCycle,
            timestamp: new Date().toISOString(),
            title: cycleTitle,
            cycleContext,
            ephemeralContext,
            responses,
        };
        logger.log(`Saving state for cycle ${currentCycle}`);
        clientIpc.sendToServer(ClientToServerChannel.SaveCycleData, { cycleData });
    }, [currentCycle, cycleTitle, cycleContext, ephemeralContext, tabs, tabCount, clientIpc]);

    const debouncedSave = useDebounce(saveCurrentCycleState, 1000);

    React.useEffect(() => {
        debouncedSave();
    }, [cycleTitle, cycleContext, ephemeralContext, tabs, debouncedSave]);


    // --- Data Loading & IPC Handlers ---
    React.useEffect(() => {
        clientIpc.onServerMessage(ServerToClientChannel.SendCycleHistoryList, ({ cycleIds }) => {
            const max = Math.max(...cycleIds, 0);
            setMaxCycle(max > 0 ? max : currentCycle);
        });

        clientIpc.onServerMessage(ServerToClientChannel.SendCycleData, ({ cycleData }) => {
            if (cycleData) {
                logger.log(`Loading state for cycle ${cycleData.cycleId}`);
                setCycleTitle(cycleData.title);
                setCycleContext(cycleData.cycleContext);
                setEphemeralContext(cycleData.ephemeralContext);
                const newTabs: { [key: number]: TabState } = {};
                Object.entries(cycleData.responses).forEach(([tabId, response]) => {
                    newTabs[Number(tabId)] = { rawContent: response.content, parsedContent: null };
                });
                setTabs(newTabs);
            } else {
                logger.warn(`No data found for cycle. Clearing fields.`);
                setCycleTitle('');
                setCycleContext('');
                setEphemeralContext('');
                setTabs({});
            }
        });
        
        clientIpc.onServerMessage(ServerToClientChannel.SendSyntaxHighlight, ({ highlightedHtml, id }) => {
            setHighlightedCodeBlocks(prev => new Map(prev).set(id, highlightedHtml));
        });
        
        clientIpc.onServerMessage(ServerToClientChannel.SendFileExistence, ({ existenceMap }) => {
            setFileExistenceMap(new Map(Object.entries(existenceMap)));
        });

        clientIpc.sendToServer(ClientToServerChannel.RequestCycleHistoryList, {});
        clientIpc.sendToServer(ClientToServerChannel.RequestCycleData, { cycleId: currentCycle });

    }, [clientIpc]);

    const handleRawContentChange = (newContent: string, tabIndex: number) => {
        setTabs(prev => ({
            ...prev,
            [tabIndex]: { ...prev[tabIndex], rawContent: newContent, parsedContent: null }
        }));
    };

    const handleGlobalParseToggle = () => {
        const newParseMode = !isParsedMode;
        setIsParsedMode(newParseMode);

        if (newParseMode) {
            const allFilePaths = new Set<string>();
            const updatedTabs = { ...tabs };

            Object.entries(updatedTabs).forEach(([tabId, tabState]) => {
                if (tabState.rawContent && !tabState.parsedContent) {
                    const parsed = parseResponse(tabState.rawContent);
                    updatedTabs[Number(tabId)].parsedContent = parsed;
                    
                    parsed.files.forEach(file => {
                        allFilePaths.add(file.path);
                        const lang = file.path.split('.').pop() || 'plaintext';
                        const id = `${file.path}::${file.content}`;
                        if (!highlightedCodeBlocks.has(id)) {
                             clientIpc.sendToServer(ClientToServerChannel.RequestSyntaxHighlight, { code: file.content, lang, id });
                        }
                    });
                } else if (tabState.parsedContent) {
                    tabState.parsedContent.files.forEach(file => allFilePaths.add(file.path));
                }
            });
            setTabs(updatedTabs);
            if (allFilePaths.size > 0) {
                clientIpc.sendToServer(ClientToServerChannel.RequestFileExistence, { paths: Array.from(allFilePaths) });
            }
        }
    };

    const handleCycleChange = (newCycle: number) => {
        if (newCycle > 0 && newCycle <= maxCycle) {
            setCurrentCycle(newCycle);
            clientIpc.sendToServer(ClientToServerChannel.RequestCycleData, { cycleId: newCycle });
        }
    };

    const activeTabData = tabs[activeTab];

    return (
        <div className="pc-view-container">
            <div className="pc-header">
                <div className="pc-toolbar">
                    <button onClick={handleGlobalParseToggle}>
                        <VscWand /> {isParsedMode ? 'Un-Parse All' : 'Parse All'}
                    </button>
                </div>
            </div>

            <CollapsibleSection title="Cycle & Context" isCollapsed={isCycleCollapsed} onToggle={() => setIsCycleCollapsed(p => !p)}>
                <div className="cycle-navigator">
                    <span>Cycle:</span>
                    <button onClick={() => handleCycleChange(currentCycle - 1)} disabled={currentCycle <= 1}><VscChevronLeft /></button>
                    <input type="number" value={currentCycle} onChange={e => setCurrentCycle(parseInt(e.target.value, 10) || 1)} className="cycle-input" />
                    <button onClick={() => handleCycleChange(currentCycle + 1)} disabled={currentCycle >= maxCycle}><VscChevronRight /></button>
                    <input type="text" className="cycle-title-input" placeholder="Cycle Title..." value={cycleTitle} onChange={e => setCycleTitle(e.target.value)} />
                </div>
                <div className="context-inputs">
                    <textarea className="context-textarea" placeholder="Cycle Context (notes for this cycle)..." value={cycleContext} onChange={e => setCycleContext(e.target.value)} />
                    <textarea className="context-textarea" placeholder="Ephemeral Context (for this cycle's prompt only)..." value={ephemeralContext} onChange={e => setEphemeralContext(e.target.value)} />
                </div>
            </CollapsibleSection>

            <div className="tab-bar">
                {[...Array(tabCount)].map((_, i) => (
                    <div key={i} className={`tab ${activeTab === i + 1 ? 'active' : ''}`} onClick={() => setActiveTab(i + 1)}>
                        Resp {i + 1}
                    </div>
                ))}
            </div>

            <div className="tab-content">
                {activeTab !== null && (
                    <div className="tab-pane">
                        {isParsedMode && activeTabData?.parsedContent ? (
                            <div className="parsed-view">
                                <CollapsibleSection title="Summary & Plan" isCollapsed={false} onToggle={() => {}}>
                                    <ReactMarkdown>{activeTabData.parsedContent.summary}</ReactMarkdown>
                                </CollapsibleSection>
                                <CollapsibleSection title="Course of Action" isCollapsed={false} onToggle={() => {}}>
                                     <ReactMarkdown>{activeTabData.parsedContent.courseOfAction}</ReactMarkdown>
                                </CollapsibleSection>
                                <CollapsibleSection title="Associated Files" isCollapsed={false} onToggle={() => {}}>
                                    <AssociatedFilesList files={activeTabData.parsedContent.filesUpdated} existenceMap={fileExistenceMap} />
                                </CollapsibleSection>

                                {activeTabData.parsedContent.files.map(file => {
                                    const id = `${file.path}::${file.content}`;
                                    const highlightedHtml = highlightedCodeBlocks.get(id);
                                    return (
                                        <div key={file.path} className="file-block">
                                            <div className="file-header"><span className="file-path">{file.path}</span></div>
                                            <div className="file-content-viewer" dangerouslySetInnerHTML={{ __html: highlightedHtml || `<pre><code>${file.content}</code></pre>` }} />
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <textarea 
                                className="response-textarea"
                                placeholder={`Paste AI response for tab ${activeTab} here...`}
                                value={activeTabData?.rawContent || ''}
                                onChange={(e) => handleRawContentChange(e.target.value, activeTab)}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);