// src/client/views/settings.view/view.tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './view.scss';

const App = () => {
    return (
        <div className="settings-view-container">
            <h1>DCE Settings & Help</h1>
            <p>This panel will contain the changelog and future settings.</p>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);