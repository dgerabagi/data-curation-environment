// src/client/views/parallel-copilot.view/TestPane1.tsx
import * as React from 'react';
import { VscCheck, VscError } from 'react-icons/vsc';
import { ParsedResponse } from '@/common/types/pcpp.types';
import { logger } from '@/client/utils/logger';

interface TestPane1Props {
    parsedContent: ParsedResponse | null;
    fileExistenceMap: Map<string, boolean>;
}

const TestPane1: React.FC<TestPane1Props> = ({ parsedContent, fileExistenceMap }) => {
    const [lastClicked, setLastClicked] = React.useState<string | null>(null);

    if (!parsedContent) {
        return <div className="test-pane-container">Go to the "Original" tab, paste a response, and click "Parse All" to populate test data.</div>;
    }

    return (
        <div className="test-pane-container">
            <h3>Test Pane A: Barebones Click Logger</h3>
            <p>This test uses a raw list with a simple `onClick`. If clicks are logged and the text below updates, the fundamental event capture is working.</p>
            <p><strong>Last Clicked:</strong> {lastClicked || 'None'}</p>
            <hr style={{ margin: '8px 0', borderColor: 'var(--vscode-panel-border)' }} />
            <ul className="associated-files-list">
                {parsedContent.filesUpdated.map(file => (
                    <li 
                        key={file} 
                        onClick={() => {
                            logger.log(`[TEST PANE A] CLICKED: ${file}`);
                            setLastClicked(file);
                        }}
                    >
                        {fileExistenceMap.get(file) ? <VscCheck className="status-icon exists" /> : <VscError className="status-icon not-exists" />}
                        <span>{file}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TestPane1;