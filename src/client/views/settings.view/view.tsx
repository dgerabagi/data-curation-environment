// src/client/views/settings.view/view.tsx
// Updated on: C65 (Refine static model card details)
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import ReactMarkdown from 'react-markdown';
import { VscChevronDown, VscVm } from 'react-icons/vsc';
import { ConnectionMode, DceSettings } from '@/backend/services/settings.service';

const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode; initialCollapsed?: boolean; extraHeaderContent?: React.ReactNode }> = ({ title, children, initialCollapsed = false, extraHeaderContent }) => {
    const [isCollapsed, setIsCollapsed] = React.useState(initialCollapsed);
    return (
        <div className="collapsible-section">
            <div className="collapsible-header" onClick={() => setIsCollapsed(!isCollapsed)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><VscChevronDown className={`chevron ${isCollapsed ? 'collapsed' : ''}`} /><span>{title}</span></div>
                {extraHeaderContent}
            </div>
            {!isCollapsed && <div className="collapsible-content">{children}</div>}
        </div>
    );
};

const App = () => {
    const [readmeContent, setReadmeContent] = React.useState('Loading...');
    const [changelogContent, setChangelogContent] = React.useState('Loading...');
    const [settings, setSettings] = React.useState<DceSettings>({ connectionMode: 'manual' });
    const clientIpc = ClientPostMessageManager.getInstance();

    React.useEffect(() => {
        clientIpc.onServerMessage(ServerToClientChannel.SendReadmeContent, ({ content }) => {
            setReadmeContent(content);
        });
        clientIpc.onServerMessage(ServerToClientChannel.SendChangelogContent, ({ content }) => {
            setChangelogContent(content);
        });
        clientIpc.onServerMessage(ServerToClientChannel.SendSettings, ({ settings: receivedSettings }) => {
            setSettings(receivedSettings);
        });

        clientIpc.sendToServer(ClientToServerChannel.RequestReadmeContent, {});
        clientIpc.sendToServer(ClientToServerChannel.RequestChangelogContent, {});
        clientIpc.sendToServer(ClientToServerChannel.RequestSettings, {});
    }, [clientIpc]);

    const handleSettingsChange = (newSettings: Partial<DceSettings>) => {
        const updatedSettings = { ...settings, ...newSettings };
        setSettings(updatedSettings);
        clientIpc.sendToServer(ClientToServerChannel.SaveSettings, { settings: updatedSettings });
    };

    const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleSettingsChange({ connectionMode: event.target.value as ConnectionMode });
    };
    
    const handleApiUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleSettingsChange({ apiUrl: event.target.value });
    };

    const DemoModelCard = () => (
        <div className="model-card">
            <h3><VscVm /> Demo Model Details</h3>
            <p><strong>Model:</strong> unsloth/gpt-oss-20b</p>
            <p><strong>Total Context Window:</strong> 131,072 tokens</p>
            <p><strong>Max Output Tokens:</strong> 16,384 tokens</p>
            <p><strong>Reasoning Effort:</strong> Medium</p>
            <p><strong>GPU:</strong> NVIDIA RTX 3090 (24GB VRAM)</p>
            <p className="description">This model is hosted locally for demonstration purposes.</p>
        </div>
    );

    return (
        <div className="settings-view-container">
            <h1>DCE Settings & Help</h1>
            
            <CollapsibleSection title="Settings">
                <div className="settings-group">
                    <label>LLM Connection Mode</label>
                    <div className="mode-selection-group">
                        
                        <div className="radio-option">
                            <input type="radio" id="mode-manual" name="mode" value="manual" checked={settings.connectionMode === 'manual'} onChange={handleModeChange} />
                            <label htmlFor="mode-manual">Free Mode (Manual Copy/Paste)</label>
                            <span className="description">Use the extension by manually copying and pasting responses. No setup required.</span>
                        </div>

                        <div className="radio-option">
                            <input type="radio" id="mode-demo" name="mode" value="demo" checked={settings.connectionMode === 'demo'} onChange={handleModeChange} />
                            <label htmlFor="mode-demo">Demo Mode (Local vLLM via `aiascent.game`)</label>
                            <span className="description">Connect to a pre-configured local vLLM instance via a proxy.</span>
                        </div>

                        {settings.connectionMode === 'demo' && <DemoModelCard />}

                        <div className="radio-option">
                            <input type="radio" id="mode-url" name="mode" value="url" checked={settings.connectionMode === 'url'} onChange={handleModeChange} />
                            <label htmlFor="mode-url">API (URL)</label>
                            <span className="description">Connect to your own self-hosted OpenAI-compatible endpoint.</span>
                            {settings.connectionMode === 'url' && (
                                <div className="config-inputs">
                                    <input type="text" id="api-url" placeholder="http://localhost:8000/v1" value={settings.apiUrl || ''} onChange={handleApiUrlChange} />
                                </div>
                            )}
                        </div>

                        <div className="radio-option">
                            <input type="radio" id="mode-key" name="mode" value="key" checked={settings.connectionMode === 'key'} onChange={handleModeChange} />
                            <label htmlFor="mode-key">API (KEY)</label>
                            <span className="description">Connect to a cloud provider using an API key. (Coming soon)</span>
                            {settings.connectionMode === 'key' && (
                                <div className="config-inputs">
                                    <input type="password" id="api-key" placeholder="sk-..." disabled />
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