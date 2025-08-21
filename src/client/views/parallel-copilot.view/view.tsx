// Updated on: C86 (Fix all TS errors from C85)
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { VscChevronLeft, VscChevronRight, VscComment, VscGoToFile, VscReplaceAll, VscThumbsdown, VscThumbsup, VscFileCode, VscCheck, VscError } from 'react-icons/vsc';
import { logger } from '@/client/utils/logger';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';

const AssociatedFile: React.FC<{ path: string, exists: boolean }> = ({ path, exists }) => {
    return (
        <div className="associated-file" title={path}>
            {exists ? <span className="icon-success"><VscCheck/></span> : <span className="icon-error"><VscError/></span>}
            <span className="file-path">{path.split('/').pop()}</span>
        </div>
    );
};

const HighlightedCodeViewer = ({ content, highlightedBlocks }: { content: string; highlightedBlocks: Map<string, string> }) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return (
        <div className="response-markdown-preview">
            {parts.map((part, index) => {
                if (part.startsWith('```')) {
                    const highlightedHtml = highlightedBlocks.get(part);
                    if (highlightedHtml) {
                        return <div key={index} dangerouslySetInnerHTML={{ __html: highlightedHtml }} />;
                    }
                    // Fallback for un-highlighted code
                    return <pre key={index}><code>{part.replace(/```(\w+)?\n|```/g, '')}</code></pre>;
                }
                // Naive markdown for non-code parts
                return <span key={index}>{part}</span>;
            })}
        </div>
    );
};

const App = () => {
    const [activeTab, setActiveTab] = React.useState(1);
    const [tabContent, setTabContent] = React.useState<{ [key: number]: string }>({});
    const [detectedFiles, setDetectedFiles] = React.useState<{ [key: number]: string[] }>({});
    const [fileExistence, setFileExistence] = React.useState<{ [path: string]: boolean }>({});
    const [highlightedBlocks, setHighlightedBlocks] = React.useState<Map<string, string>>(new Map());
    const [tabCount, setTabCount] = React.useState(4);
    const [cycle, setCycle] = React.useState(86);
    const [cycleTitle, setCycleTitle] = React.useState('ts errors');
    const [ephemeralContext, setEphemeralContext] = React.useState('');

    const clientIpc = ClientPostMessageManager.getInstance();

    React.useEffect(() => {
        clientIpc.onServerMessage(ServerToClientChannel.SendFileExistence, ({ existenceMap }) => {
            logger.log(`[PCPP] Received file existence map.`);
            setFileExistence(prev => ({ ...prev, ...existenceMap }));
        });
        clientIpc.onServerMessage(ServerToClientChannel.SendSyntaxHighlight, ({ highlightedHtml, id }) => {
            setHighlightedBlocks(prev => new Map(prev).set(id, highlightedHtml));
        });
    }, [clientIpc]);

    const handleContentChange = (newContent: string, tabIndex: number) => {
        setTabContent(prev => ({ ...prev, [tabIndex]: newContent }));

        const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
        const matches = newContent.matchAll(codeBlockRegex);

        for (const match of matches) {
            const fullBlock = match[0];
            const lang = match[1] || 'plaintext';
            const code = match[2] || '';

            if (fullBlock && !highlightedBlocks.has(fullBlock)) {
                clientIpc.sendToServer(ClientToServerChannel.RequestSyntaxHighlight, { code, lang, id: fullBlock });
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>, tabIndex: number) => {
        const pastedText = e.clipboardData.getData('text');
        handleContentChange(pastedText, tabIndex);

        logger.log(`[PCPP PARSE] Pasted content into tab ${tabIndex}. Parsing for file paths...`);
        const fileRegex = /<file path="([^"]+)">/g;
        const matches = pastedText.matchAll(fileRegex);
        
        const paths = Array.from(matches, m => m[1]).filter(Boolean);

        if (paths.length > 0) {
            logger.log(`[PCPP PARSE] Detected file paths: ${paths.join(', ')}`);
            setDetectedFiles(prev => ({...prev, [tabIndex]: paths}));
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
                                onChange={(e) => handleContentChange(e.target.value, activeTab)}
                                onPaste={(e) => handlePaste(e, activeTab)}
                            />
                            <HighlightedCodeViewer content={tabContent[activeTab] || '*Paste or type in the text area to see a preview.*'} highlightedBlocks={highlightedBlocks} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);