// src/client/views/parallel-copilot.view/view.tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './view.scss';
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';

const App = () => {
    const [activeTab, setActiveTab] = React.useState(1);
    const tabCount = 4; // Example tab count

    return (
        <div className="pc-view-container">
            <div className="cycle-navigator">
                <span>Cycle:</span>
                <button><VscChevronLeft /></button>
                <span>C73</span>
                <button><VscChevronRight /></button>
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
                {[...Array(tabCount)].map((_, i) => (
                    activeTab === i + 1 && <div key={i}>Content for Response {i + 1}</div>
                ))}
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
