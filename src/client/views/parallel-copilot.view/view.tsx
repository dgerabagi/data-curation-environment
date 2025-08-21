// Updated on: C78 (Implement Cycle Navigator, Context Inputs, and Paste Parsing)
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { VscChevronLeft, VscChevronRight, VscComment, VscGoToFile, VscReplaceAll, VscThumbsdown, VscThumbsup, VscWindow } from 'react-icons/vsc';
import { logger } from '@/client/utils/logger';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';

const App = () => {
    const [activeTab, setActiveTab] = React.useState(1);
    const [tabContent, setTabContent] = React.useState<{ [key: number]: string }>({});
    const [tabCount, setTabCount] = React.useState(4);
    const [cycle, setCycle] = React.useState(1);
    const [cycleContext, setCycleContext] = React.useState('');
    const [ephemeralContext, setEphemeralContext] = React.useState('');

    const clientIpc = ClientPostMessageManager.getInstance();

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>, tabIndex: number) => {
        const pastedText = e.clipboardData.getData('text');
        
        setTabContent(prev => ({...prev, [tabIndex]: pastedText}));

        logger.log(`[PCPP PARSE] Pasted content into tab ${tabIndex}. Parsing for file paths...`);
        logger.log(`[PCPP PARSE] Content: ${pastedText.substring(0, 500)}...`);


        const fileRegex = /<file path="([^"]+)">/g;
        const matches = pastedText.matchAll(fileRegex);
        const paths = Array.from(matches, m => m[1]);

        if (paths.length > 0) {
            logger.log(`[PCPP PARSE] Detected file paths: ${paths.join(', ')}`);
        } else {
            logger.log('[PCPP PARSE] No file paths detected in pasted content.');
        }
    };

    return (
        <div className="pc-view-container">
            <div className="pc-header">
                <div className="cycle-navigator">
                    <span>Cycle:</span>
                    <button onClick={() => setCycle(c => Math.max(1, c - 1))} disabled={cycle <= 1}><VscChevronLeft /></button>
                    <input type="number" value={cycle} onChange={e => setCycle(parseInt(e.target.value, 10) || 1)} className="cycle-input" />
                    <button onClick={() => setCycle(c => c + 1)}><VscChevronRight /></button>
                </div>
            </div>
            
            <div className="context-inputs">
                <textarea 
                    className="context-textarea"
                    placeholder="Cycle Context (persists with cycle)..."
                    value={cycleContext}
                    onChange={e => setCycleContext(e.target.value)}
                />
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
                        <textarea 
                            className="response-textarea"
                            placeholder={`Paste AI response for tab ${activeTab} here...`}
                            value={tabContent[activeTab] || ''}
                            onChange={(e) => setTabContent(prev => ({...prev, [activeTab]: e.target.value}))}
                            onPaste={(e) => handlePaste(e, activeTab)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);