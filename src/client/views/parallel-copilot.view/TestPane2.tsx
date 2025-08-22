// src/client/views/parallel-copilot.view/TestPane2.tsx
import * as React from 'react';
import { VscCheck, VscError } from 'react-icons/vsc';
import { ParsedResponse, ParsedFile } from '@/common/types/pcpp.types';
import { logger } from '@/client/utils/logger';

interface TestPane2Props {
    parsedContent: ParsedResponse | null;
    fileExistenceMap: Map<string, boolean>;
}

const TestPane2: React.FC<TestPane2Props> = ({ parsedContent, fileExistenceMap }) => {
    const [selectedFile, setSelectedFile] = React.useState<ParsedFile | null>(null);

    if (!parsedContent || parsedContent.files.length === 0) {
        return <div className="test-pane-container">Go to the "Original" tab, paste a response, and click "Parse All" to populate test data.</div>;
    }

    const handleFileClick = (file: ParsedFile) => {
        logger.log(`[TEST PANE B] CLICKED: ${file.path}. Setting local state.`);
        setSelectedFile(file);
    };

    return (
        <div className="test-pane-container">
            <h3>Test Pane B: Local State Update</h3>
            <p>This test uses local `useState` to manage the selected file. Clicking a file should highlight it and update the content displayed below.</p>
            <hr style={{ margin: '8px 0', borderColor: 'var(--vscode-panel-border)' }} />
            <div style={{ display: 'flex', gap: '8px', height: '100%' }}>
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    <h4>Files</h4>
                    <ul className="associated-files-list">
                        {parsedContent.files.map(file => (
                            <li 
                                key={file.path} 
                                className={selectedFile?.path === file.path ? 'selected' : ''}
                                onClick={() => handleFileClick(file)}
                            >
                                {fileExistenceMap.get(file.path) ? <VscCheck className="status-icon exists" /> : <VscError className="status-icon not-exists" />}
                                <span>{file.path}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ flex: 2, borderLeft: '1px solid var(--vscode-panel-border)', paddingLeft: '8px', overflowY: 'auto' }}>
                    <h4>Content</h4>
                    {selectedFile ? (
                        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                            <code>{selectedFile.content}</code>
                        </pre>
                    ) : (
                        <div>Select a file to see its content.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestPane2;