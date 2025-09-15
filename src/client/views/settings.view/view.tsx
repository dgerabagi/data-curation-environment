// src/client/views/settings.view/view.tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import ReactMarkdown from 'react-markdown';
import { VscChevronDown } from 'react-icons/vsc';

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

    return (
        <div className="settings-view-container">
            <h1>DCE Settings & Help</h1>
            
            <CollapsibleSection title="Settings">
                <div className="settings-group">
                    <label htmlFor="api-url">Local API URL</label>
                    <input type="text" id="api-url" placeholder="http://localhost:1234/v1/chat/completions" />
                </div>
                <div className="settings-group">
                    <label>Mode</label>
                    <div className="radio-group">
                        <input type="radio" id="free-mode" name="mode" value="free" defaultChecked />
                        <label htmlFor="free-mode">Free Mode (Manual Copy/Paste)</label>
                    </div>
                    <div className="radio-group">
                        <input type="radio" id="local-mode" name="mode" value="local" />
                        <label htmlFor="local-mode">Local LLM Mode</label>
                    </div>
                </div>
            </CollapsibleSection>

            <CollapsibleSection title="Changelog">
                <ReactMarkdown>{changelogContent}</ReactMarkdown>
            </CollapsibleSection>

            <CollapsibleSection title="About (README)">
                <ReactMarkdown>{readmeContent}</ReactMarkdown>
            </CollapsibleSection>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);