// Updated on: C82 (Add prompt generation, markdown rendering, and file association)
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { VscChevronLeft, VscChevronRight, VscComment, VscGoToFile, VscReplaceAll, VscThumbsdown, VscThumbsup, VscFileCode, VscCheck, VscError } from 'react-icons/vsc';
import { logger } from '@/client/utils/logger';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import ReactMarkdown from 'react-markdown';

const AssociatedFile = ({ path, exists }: { path: string, exists: boolean }) => {
    return (
        <div className="associated-file" title={path}>
            {exists ? <VscCheck className="icon-success" /> : <VscError className="icon-error" />}
            <span className="file-path">{path.split('/').pop()}</span>
        </div>
    );
};

const App = () => {
    const [activeTab, setActiveTab] = React.useState(1);
    const [tabContent, setTabContent] = React.useState<{ [key: number]: string }>({});
    const [detectedFiles, setDetectedFiles] = React.useState<{ [key: number]: string[] }>({});
    const [fileExistence, setFileExistence] = React.useState<{ [path: string]: boolean }>({});
    const [tabCount, setTabCount] = React.useState(4);
    const [cycle, setCycle] = React.useState(82);
    const [cycleTitle, setCycleTitle] = React.useState('Continue refinement/delivery of pcpp');
    const [ephemeralContext, setEphemeralContext] = React.useState('');

    const clientIpc = ClientPostMessageManager.getInstance();

    React.useEffect(() => {
        clientIpc.onServerMessage(ServerToClientChannel.SendFileExistence, ({ existenceMap }) => {
            logger.log(`[PCPP] Received file existence map.`);
            setFileExistence(prev => ({ ...prev, ...existenceMap }));
        });
    }, [clientIpc]);

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>, tabIndex: number) => {
        const pastedText = e.clipboardData.getData('text');
        
        setTabContent(prev => ({...prev, [tabIndex]: pastedText}));

        logger.log(`[PCPP PARSE] Pasted content into tab ${tabIndex}. Parsing for file paths...`);
        
        const fileRegex = /<file path="([^"]+)">/g;
        const matches = pastedText.matchAll(fileRegex);
        const paths = Array.from(matches, m => m[1]);

        if (paths.length > 0) {
            logger.log(`[PCPP PARSE] Detected file paths: ${paths.join(', ')}`);
            setDetectedFiles(prev => ({...prev, [tabIndex]: paths}));
            // Request existence check from backend
            clientIpc.sendToServer(ClientToServerChannel.RequestFileExistence, { paths });
        } else {
            logger.log('[PCPP PARSE] No file paths detected in pasted content.');
            setDetectedFiles(prev => ({...prev, [tabIndex]: []}));
        }
    };

    const handleGeneratePrompt = () => {
        logger.log(`Requesting prompt.md generation for cycle C${cycle} with title: ${cycleTitle}`);
        clientIpc.sendToServer(ClientToServerChannel.RequestCreatePromptFile, {
            currentCycle: cycle,
            cycleTitle: cycleTitle,
        });
    };

    return (
        <div className="pc-view-container">
            <div className="pc-header">
                <div className="cycle-navigator">
                    <span>Cycle:</span>
                    <button onClick={() => setCycle(c => Math.max(1, c - 1))} disabled={cycle <= 1}><VscChevronLeft /></button>
                    <input type="number" value={cycle} onChange={e => setCycle(parseInt(e.target.value, 10) || 1)} className="cycle-input" />
                    <button onClick={() => setCycle(c => c + 1)}><VscChevronRight /></button>
                    <input 
                        type="text"
                        className="cycle-title-input"
                        placeholder="Cycle Title..."
                        value={cycleTitle}
                        onChange={e => setCycleTitle(e.target.value)}
                    />
                </div>
                 <div className="pc-toolbar">
                    <button onClick={handleGeneratePrompt} title="Generate prompt.md"><VscFileCode/> Generate Prompt</button>
                </div>
            </div>
            
            <div className="context-inputs">
                <textarea 
                    className="context-textarea"
                    placeholder="Ephemeral Context (for this cycle only, e.g., error logs)..."
                    value={ephemeralContext}
                    onChange={e => setEphemeralContext(e.target.value)}
                />
            </div>

            <div className="tab-config">
                <label htmlFor="tab-count-slider">Responses: {tabCount}</label>
                <input 
                    type="range" 
                    id="tab-count-slider"
                    min="1" 
                    max="20" 
                    value={tabCount} 
                    onChange={e => setTabCount(parseInt(e.target.value, 10))}
                />
            </div>
            
            <div className="tab-bar">
                {[...Array(tabCount)].map((_, i) => (
                    <div 
                        key={i} 
                        className={`tab ${activeTab === i + 1 ? 'active' : ''}`}
                        onClick={() => setActiveTab(i + 1)}
                    >
                        Resp {i + 1}
                    </div>
                ))}
            </div>

            <div className="tab-content">
                {activeTab !== null && (
                    <div className="tab-pane">
                        <div className="tab-actions">
                            <button onClick={() => logger.log('Accept Response clicked')}><VscGoToFile/> Accept</button>
                            <button onClick={() => logger.log('Swap clicked')}><VscReplaceAll/> Swap</button>
                            <button onClick={() => logger.log('Thumbs up clicked')}><VscThumbsup/></button>
                            <button onClick={() => logger.log('Thumbs down clicked')}><VscThumbsdown/></button>
                            <button onClick={() => logger.log('Add Comment clicked')}><VscComment/> Comment</button>
                        </div>
                        {detectedFiles[activeTab] && detectedFiles[activeTab].length > 0 && (
                            <div className="associated-files-container">
                                <span className="associated-files-title">Associated Files:</span>
                                <div className="associated-files-list">
                                    {detectedFiles[activeTab].map(path => (
                                        <AssociatedFile key={path} path={path} exists={fileExistence[path]} />
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="response-editor-container">
                             <textarea 
                                className="response-textarea"
                                placeholder={`Paste AI response for tab ${activeTab} here...`}
                                value={tabContent[activeTab] || ''}
                                onChange={(e) => setTabContent(prev => ({...prev, [activeTab]: e.target.value}))}
                                onPaste={(e) => handlePaste(e, activeTab)}
                            />
                            <div className="response-markdown-preview">
                                <ReactMarkdown>{tabContent[activeTab] || '*Paste or type in the text area to see a preview.*'}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);