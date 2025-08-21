// Updated on: C88 (Add metadata bar and conditional diff view)
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { VscChevronLeft, VscChevronRight, VscCheck, VscError, VscSymbolNumeric } from 'react-icons/vsc';
import { logger } from '@/client/utils/logger';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { PcppCycle } from '@/backend/services/history.service';
import DiffViewer from '@/client/components/DiffViewer';

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

const App = () => {
    // State
    const [activeTab, setActiveTab] = React.useState(1);
    const [tabCount, setTabCount] = React.useState(4);
    const [currentCycle, setCurrentCycle] = React.useState(88);
    const [maxCycle, setMaxCycle] = React.useState(88);
    const [cycleTitle, setCycleTitle] = React.useState('1 ts error, continue delivering phase 2');
    const [cycleContext, setCycleContext] = React.useState('');
    const [ephemeralContext, setEphemeralContext] = React.useState('');
    const [tabContent, setTabContent] = React.useState<{ [key: number]: string }>({});
    const [detectedFiles, setDetectedFiles] = React.useState<{ [key: number]: string[] }>({});
    const [fileExistence, setFileExistence] = React.useState<{ [path: string]: boolean }>({});
    const [diffData, setDiffData] = React.useState<{ original: string; modified: string; path: string } | null>(null);

    const clientIpc = ClientPostMessageManager.getInstance();

    // --- Data Saving ---
    const saveCurrentCycleState = React.useCallback(() => {
        const responses: { [key: number]: { content: string } } = {};
        for (let i = 1; i <= tabCount; i++) {
            responses[i] = { content: tabContent[i] || '' };
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
    }, [currentCycle, cycleTitle, cycleContext, ephemeralContext, tabContent, tabCount, clientIpc]);

    const debouncedSave = useDebounce(saveCurrentCycleState, 1000);

    // Trigger save on any state change
    React.useEffect(() => {
        debouncedSave();
    }, [cycleTitle, cycleContext, ephemeralContext, tabContent, debouncedSave]);


    // --- Data Loading & IPC Handlers ---
    React.useEffect(() => {
        clientIpc.onServerMessage(ServerToClientChannel.SendFileExistence, ({ existenceMap }) => {
            setFileExistence(prev => ({ ...prev, ...existenceMap }));
        });

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
                const newTabContent: { [key: number]: string } = {};
                Object.entries(cycleData.responses).forEach(([tabId, response]) => {
                    newTabContent[Number(tabId)] = response.content;
                });
                setTabContent(newTabContent);
                // Trigger parsing for loaded content
                Object.entries(newTabContent).forEach(([tabId, content]) => {
                    parseResponseForFiles(content, Number(tabId));
                });
            } else {
                logger.warn(`No data found for cycle. Clearing fields.`);
                // Clear fields for a new/empty cycle
                setCycleTitle('');
                setCycleContext('');
                setEphemeralContext('');
                setTabContent({});
                setDetectedFiles({});
            }
        });
        
        clientIpc.onServerMessage(ServerToClientChannel.SendFileContent, ({ path, content }) => {
            if (content !== null) {
                const responseContent = tabContent[activeTab] || '';
                const fileRegex = new RegExp(`<file path="${path.replace(/\\/g, '\\\\')}">([\\s\\S]*?)<\\/file>`, 's');
                const match = responseContent.match(fileRegex);
                const modified = match ? match[1].trim() : `<!-- Could not find content for ${path} in response -->`;
                setDiffData({ original: content, modified, path });
            }
        });

        // Initial data load
        clientIpc.sendToServer(ClientToServerChannel.RequestCycleHistoryList, {});
        clientIpc.sendToServer(ClientToServerChannel.RequestCycleData, { cycleId: currentCycle });

    }, [clientIpc]);

    const parseResponseForFiles = (text: string, tabIndex: number) => {
        const fileRegex = /<file path="([^"]+)">/g;
        const matches = text.matchAll(fileRegex);
        const paths = Array.from(matches, m => m[1]).filter(Boolean);

        if (paths.length > 0) {
            setDetectedFiles(prev => ({...prev, [tabIndex]: paths}));
            clientIpc.sendToServer(ClientToServerChannel.RequestFileExistence, { paths });
        } else {
            setDetectedFiles(prev => ({...prev, [tabIndex]: []}));
        }
    };

    const handleContentChange = (newContent: string, tabIndex: number) => {
        setTabContent(prev => ({ ...prev, [tabIndex]: newContent }));
        parseResponseForFiles(newContent, tabIndex);
    };

    const handleCycleChange = (newCycle: number) => {
        if (newCycle > 0 && newCycle <= maxCycle) {
            setCurrentCycle(newCycle);
            clientIpc.sendToServer(ClientToServerChannel.RequestCycleData, { cycleId: newCycle });
        }
    };

    const handleDiffRequest = (filePath: string) => {
        setDiffData(null); // Clear previous diff
        clientIpc.sendToServer(ClientToServerChannel.RequestFileContent, { path: filePath });
    };

    const currentTokenCount = Math.ceil((tabContent[activeTab] || '').length / 4);
    const matchedFileCount = (detectedFiles[activeTab] || []).filter(path => fileExistence[path]).length;

    return (
        <div className="pc-view-container">
            <div className="pc-header">
                <div className="cycle-navigator">
                    <span>Cycle:</span>
                    <button onClick={() => handleCycleChange(currentCycle - 1)} disabled={currentCycle <= 1}><VscChevronLeft /></button>
                    <input type="number" value={currentCycle} onChange={e => setCurrentCycle(parseInt(e.target.value, 10) || 1)} className="cycle-input" />
                    <button onClick={() => handleCycleChange(currentCycle + 1)} disabled={currentCycle >= maxCycle}><VscChevronRight /></button>
                    <input type="text" className="cycle-title-input" placeholder="Cycle Title..." value={cycleTitle} onChange={e => setCycleTitle(e.target.value)} />
                </div>
            </div>
            
            <div className="context-inputs">
                 <textarea className="context-textarea" placeholder="Cycle Context (notes for this cycle)..." value={cycleContext} onChange={e => setCycleContext(e.target.value)} />
                 <textarea className="context-textarea" placeholder="Ephemeral Context (for this cycle's prompt only)..." value={ephemeralContext} onChange={e => setEphemeralContext(e.target.value)} />
            </div>

            <div className="tab-bar">
                {[...Array(tabCount)].map((_, i) => (
                    <div key={i} className={`tab ${activeTab === i + 1 ? 'active' : ''}`} onClick={() => setActiveTab(i + 1)}>
                        Resp {i + 1}
                    </div>
                ))}
            </div>

            <div className="metadata-bar">
                <span><VscSymbolNumeric/> Tokens: {currentTokenCount.toLocaleString()}</span>
                <span>Similarity: TBD</span>
                <span>Files: {(detectedFiles[activeTab] || []).length} ({matchedFileCount} matched ✓)</span>
            </div>

            <div className="tab-content">
                {activeTab !== null && (
                    <div className="tab-pane">
                         {detectedFiles[activeTab] && detectedFiles[activeTab].length > 0 && (
                            <div className="associated-files-container">
                                <div className="associated-files-list">
                                    {detectedFiles[activeTab].map(path => (
                                        <div key={path} className="associated-file" onClick={() => handleDiffRequest(path)} title={`Click to diff ${path}`}>
                                            {fileExistence[path] ? <span className="icon-success"><VscCheck/></span> : <span className="icon-error"><VscError/></span>}
                                            <span className="file-path">{path.split('/').pop()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {diffData ? (
                             <DiffViewer original={diffData.original} modified={diffData.modified} filePath={diffData.path} onClose={() => setDiffData(null)} />
                        ) : (
                            <textarea 
                                className="response-textarea"
                                style={{ flexGrow: 1 }}
                                placeholder={`Paste AI response for tab ${activeTab} here...`}
                                value={tabContent[activeTab] || ''}
                                onChange={(e) => handleContentChange(e.target.value, activeTab)}
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