// src/client/views/settings.view/view.tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import ReactMarkdown from 'react-markdown';

const App = () => {
    const [activeTab, setActiveTab] = React.useState('changelog');
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
            <div className="tab-bar">
                <div className={`tab ${activeTab === 'changelog' ? 'active' : ''}`} onClick={() => setActiveTab('changelog')}>Changelog</div>
                <div className={`tab ${activeTab === 'readme' ? 'active' : ''}`} onClick={() => setActiveTab('readme')}>About</div>
            </div>
            <div className="tab-content">
                {activeTab === 'changelog' && <ReactMarkdown>{changelogContent}</ReactMarkdown>}
                {activeTab === 'readme' && <ReactMarkdown>{readmeContent}</ReactMarkdown>}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);