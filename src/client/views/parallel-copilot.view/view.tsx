// Updated on: C77 (Re-supply from C76 as it was not testable)
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
    const tabCount = 4; // Example tab count
    const clientIpc = ClientPostMessageManager.getInstance();

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>, tabIndex: number) => {
        const pastedText = e.clipboardData.getData('text');
        
        setTabContent(prev => ({...prev, [tabIndex]: pastedText}));

        logger.log(`Pasted content into tab ${tabIndex}. Parsing for file paths...`);

        const fileRegex = /<file path="([^"]+)">/g;
        const matches = pastedText.matchAll(fileRegex);
        const paths = Array.from(matches, m => m[1]);

        if (paths.length > 0) {
            logger.log(`Detected file paths: ${paths.join(', ')}`);
        } else {
            logger.log('No file paths detected in pasted content.');
        }
    };

    const handlePopOut = () => {
        logger.log("Pop-out button clicked. Executing command...");
        clientIpc.sendToServer(ClientToServerChannel.VSCodeCommand, { command: 'dce.popOutCopilot' });
    };

    return (
        <div className="pc-view-container">
            <div className="pc-header">
                <div className="cycle-navigator">
                    <span>Cycle:</span>
                    <button><VscChevronLeft /></button>
                    <span>C77</span>
                    <button><VscChevronRight /></button>
                </div>
                <div className="pc-toolbar">
                    <button title="Pop-out into new window" onClick={handlePopOut}><VscWindow /></button>
                </div>
            </div>
            
            <div className="tab-bar">
                {[...Array(tabCount)].map((_, i) => (
                    <div 
                        key={i} 
                        className={`tab ${activeTab === i + 1 ? 'active' : ''}`}
                        onClick={() => setActiveTab(i + 1)}
                    >
                        Response {i + 1}
                    </div>
                ))}
            </div>

            <div className="tab-content">
                {activeTab !== null && (
                    <div className="tab-pane">
                        <div className="tab-actions">
                            <button onClick={() => logger.log('Accept Response clicked')}><VscGoToFile/> Accept Response</button>
                            <button onClick={() => logger.log('Swap clicked')}><VscReplaceAll/> Swap with Source</button>
                            <button onClick={() => logger.log('Thumbs up clicked')}><VscThumbsup/></button>
                            <button onClick={() => logger.log('Thumbs down clicked')}><VscThumbsdown/></button>
                            <button onClick={() => logger.log('Add Comment clicked')}><VscComment/> Add Comment</button>
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