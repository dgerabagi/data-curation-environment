// src/client/views/parallel-copilot.view/TestPane2.tsx
import * as React from 'react';
import NumberedTextarea from './components/NumberedTextarea';

const TestPane2: React.FC = () => {
    const [value, setValue] = React.useState('Test B: Focus on pixel-perfect alignment.\n\nType here and check if the cursor position, text wrapping, and selection highlighting perfectly match the line numbers and the visible text.');
    const [height, setHeight] = React.useState(200);

    return (
        <div className="test-pane-container">
            <h3>Test B: Pixel-Perfect Alignment</h3>
            <p>This test focuses on CSS properties. The cursor, selection, and text should align perfectly with the line numbers, especially with long, wrapped lines.</p>
            <div style={{ border: '1px solid var(--vscode-focusBorder)', padding: '8px' }}>
                 <NumberedTextarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Test Area 2"
                    onKeyDown={() => {}}
                    height={height}
                    onHeightChange={setHeight}
                    id="test-textarea-2"
                />
            </div>
        </div>
    );
};

export default TestPane2;