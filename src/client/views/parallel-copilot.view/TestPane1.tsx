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
    const [selectedFile, setSelectedFile] = React.useState<string | null>(null);
    
    if (!parsedContent || parsedContent.filesUpdated.length === 0) {
        return <div className="test-pane-container">Go to the "Original" tab, paste a response, and click "Parse All" to populate test data.</div>;
    }

    return (
        <div className="test-pane-container">
            <h3>Test Pane A: Barebones Click Logger</h3>
            <p>This test uses a raw list with a simple `onClick` that only calls `logger.log()` and sets a local state for highlighting. If clicks are logged and items highlight, the fundamental event capture is working.</p>
            <hr style={{ margin: '8px 0', borderColor: 'var(--vscode-panel-border)' }} />
            <ul className="associated-files-list">
                {parsedContent.filesUpdated.map(file => (
                    <li 
                        key={file}
                        className={selectedFile === file ? 'selected' : ''}
                        onClick={() => {
                            logger.log(`[TEST PANE A] CLICKED: ${file}`);
                            setSelectedFile(file);
                        }}
                        onMouseEnter={() => logger.log(`[TEST PANE A] Mouse ENTER on: ${file}`)}
                        onMouseLeave={() => logger.log(`[TEST PANE A] Mouse LEAVE from: ${file}`)}
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