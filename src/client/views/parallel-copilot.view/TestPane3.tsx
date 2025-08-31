// src/client/views/parallel-copilot.view/TestPane3.tsx
import * as React from 'react';
import NumberedTextarea from './components/NumberedTextarea';

const TestPane3: React.FC = () => {
    const [value, setValue] = React.useState('Test C: Combined Solution.\n\nThis is a clean implementation combining fixes for both scrolling and alignment. It should be fully functional.');
    const [height, setHeight] = React.useState(200);

    return (
        <div className="test-pane-container">
            <h3>Test C: Combined & Cleaned Solution</h3>
            <p>This test combines the fixes from A and B. It should exhibit no scrolling or alignment bugs.</p>
            <div style={{ border: '1px solid var(--vscode-focusBorder)', padding: '8px' }}>
                 <NumberedTextarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Test Area 3"
                    onKeyDown={() => {}}
                    height={height}
                    onHeightChange={setHeight}
                    id="test-textarea-3"
                />
            </div>
        </div>
    );
};

export default TestPane3;