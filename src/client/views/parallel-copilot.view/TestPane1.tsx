// src/client/views/parallel-copilot.view/TestPane1.tsx
import * as React from 'react';
import NumberedTextarea from './components/NumberedTextarea';

const TestPane1: React.FC = () => {
    const [value, setValue] = React.useState('Test A: Focus on synchronized scrolling.\n\nType or paste multiple lines here.\n\nThen scroll the textarea to see if the line numbers scroll with it.');
    const [height, setHeight] = React.useState(200);

    return (
        <div className="test-pane-container">
            <h3>Test A: Synchronized Scrolling</h3>
            <p>This test focuses on the `onScroll` event. The line number gutter and the text content should scroll in perfect unison.</p>
            <div style={{ border: '1px solid var(--vscode-focusBorder)', padding: '8px' }}>
                <NumberedTextarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Test Area 1"
                    onKeyDown={() => {}}
                    height={height}
                    onHeightChange={setHeight}
                    id="test-textarea-1"
                />
            </div>
        </div>
    );
};

export default TestPane1;