// src/client/views/settings.view/view.tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import ReactMarkdown from 'react-markdown';
import { VscChevronDown } from 'react-icons/vsc';

type ConnectionMode = 'manual' | 'demo' | 'url' | 'key';

const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode; initialCollapsed?: boolean }> = ({ title, children, initialCollapsed = false }) => {
    const [isCollapsed, setIsCollapsed] = React.useState(initialCollapsed);
    return (
        <div className="collapsible-section">
            <div className="collapsible-header" onClick={() => setIsCollapsed(!isCollapsed)}>
                <VscChevronDown className={`chevron ${isCollapsed ? 'collapsed' : ''}`} />
                <span>{title}</span>
            </div>
            {!isCollapsed && <div className="collapsible-content">{children}</div>}
        </div>
    );
};

const App = () => {
    const [readmeContent, setReadmeContent] = React.useState('Loading...');
    const [changelogContent, setChangelogContent] = React.useState('Loading...');
    const [connectionMode, setConnectionMode] = React.useState<ConnectionMode>('manual');
    const clientIpc = ClientPostMessageManager.getInstance();

    React.useEffect(() => {
        clientIpc.onServerMessage(ServerToClientChannel.SendReadmeContent, ({ content }) => {
            setReadmeContent(content);
        });
        clientIpc.onServerMessage(ServerToClientChannel.SendChangelogContent, ({ content }) => {
            setChangelogContent(content);
        });

        clientIpc.sendToServer(ClientToServerChannel.RequestReadmeContent, {});
        clientIpc.sendToServer(ClientToServerChannel.RequestChangelogContent, {});
    }, [clientIpc]);

    const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConnectionMode(event.target.value as ConnectionMode);
        // TODO: Send IPC message to save the new setting
    };

    return (
        <div className="settings-view-container">
            <h1>DCE Settings & Help</h1>
            
            <CollapsibleSection title="Settings">
                <div className="settings-group">
                    <label>LLM Connection Mode</label>
                    <div className="mode-selection-group">
                        
                        <div className="radio-option">
                            <input type="radio" id="mode-manual" name="mode" value="manual" checked={connectionMode === 'manual'} onChange={handleModeChange} />
                            <label htmlFor="mode-manual">Free Mode (Manual Copy/Paste)</label>
                            <span className="description">Use the extension by manually copying and pasting responses. No setup required.</span>
                        </div>

                        <div className="radio-option">
                            <input type="radio" id="mode-demo" name="mode" value="demo" checked={connectionMode === 'demo'} onChange={handleModeChange} />
                            <label htmlFor="mode-demo">Demo Mode (Local vLLM via `aiascent.game`)</label>
                            <span className="description">Connect to a pre-configured local vLLM instance via a proxy. Requires setup from A92.</span>
                        </div>

                        <div className="radio-option">
                            <input type="radio" id="mode-url" name="mode" value="url" checked={connectionMode === 'url'} onChange={handleModeChange} />
                            <label htmlFor="mode-url">API (URL)</label>
                            <span className="description">Connect to your own self-hosted OpenAI-compatible endpoint.</span>
                            {connectionMode === 'url' && (
                                <div className="config-inputs">
                                    <input type="text" id="api-url" placeholder="http://localhost:8000/v1" />
                                </div>
                            )}
                        </div>

                        <div className="radio-option">
                            <input type="radio" id="mode-key" name="mode" value="key" checked={connectionMode === 'key'} onChange={handleModeChange} />
                            <label htmlFor="mode-key">API (KEY)</label>
                            <span className="description">Connect to a cloud provider using an API key.</span>
                            {connectionMode === 'key' && (
                                <div className="config-inputs">
                                    <input type="password" id="api-key" placeholder="sk-..." />
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="Changelog" initialCollapsed={true}>
                <ReactMarkdown>{changelogContent}</ReactMarkdown>
            </CollapsibleSection>

            <CollapsibleSection title="About (README)" initialCollapsed={true}>
                <ReactMarkdown>{readmeContent}</ReactMarkdown>
            </CollapsibleSection>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);