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

    if (!parsedContent) {
        return <div className="test-pane-container">Paste a response and click "Parse All" to begin.</div>;
    }

    const handleFileClick = (file: ParsedFile) => {
        logger.log(`[TEST PANE 2] CLICKED: ${file.path}. Setting local state.`);
        setSelectedFile(file);
    };

    return (
        <div className="test-pane-container">
            <h3>Test Pane 2: Local State Update</h3>
            <p>This test uses local `useState` to manage the selected file. Clicking a file should update the content displayed below.</p>
            <hr style={{ margin: '8px 0', borderColor: 'var(--vscode-panel-border)' }} />
            <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ flex: 1 }}>
                    <h4>Files</h4>
                    <ul className="associated-files-list">
                        {parsedContent.files.map(file => (
                            <li key={file.path} onClick={() => handleFileClick(file)}>
                                {fileExistenceMap.get(file.path) ? <VscCheck className="status-icon exists" /> : <VscError className="status-icon not-exists" />}
                                <span>{file.path}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ flex: 2, borderLeft: '1px solid var(--vscode-panel-border)', paddingLeft: '8px' }}>
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