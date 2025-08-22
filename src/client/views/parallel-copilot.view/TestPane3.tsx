// src/client/views/parallel-copilot.view/TestPane3.tsx
import * as React from 'react';
import { VscCheck, VscError } from 'react-icons/vsc';
import { ParsedResponse, ParsedFile } from '@/common/types/pcpp.types';
import { logger } from '@/client/utils/logger';

// Child component to test prop drilling
const FileList = ({ files, fileExistenceMap, onFileSelect }: { files: ParsedFile[], fileExistenceMap: Map<string, boolean>, onFileSelect: (file: ParsedFile) => void }) => (
    <ul className="associated-files-list">
        {files.map(file => (
            <li key={file.path} onClick={() => onFileSelect(file)}>
                {fileExistenceMap.get(file.path) ? <VscCheck className="status-icon exists" /> : <VscError className="status-icon not-exists" />}
                <span>{file.path}</span>
            </li>
        ))}
    </ul>
);

interface TestPane3Props {
    parsedContent: ParsedResponse | null;
    fileExistenceMap: Map<string, boolean>;
}

const TestPane3: React.FC<TestPane3Props> = ({ parsedContent, fileExistenceMap }) => {
    const [selectedFile, setSelectedFile] = React.useState<ParsedFile | null>(null);

    if (!parsedContent) {
        return <div className="test-pane-container">Paste a response and click "Parse All" to begin.</div>;
    }

    const handleFileSelect = (file: ParsedFile) => {
        logger.log(`[TEST PANE 3] Child component called onFileSelect prop for: ${file.path}.`);
        setSelectedFile(file);
    };

    return (
        <div className="test-pane-container">
            <h3>Test Pane 3: Prop-Driven Update</h3>
            <p>This test uses a child component for the list, passing the click handler down as a prop. This tests for issues with prop drilling.</p>
            <hr style={{ margin: '8px 0', borderColor: 'var(--vscode-panel-border)' }} />
             <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ flex: 1 }}>
                    <h4>Files (Child Component)</h4>
                    <FileList files={parsedContent.files} fileExistenceMap={fileExistenceMap} onFileSelect={handleFileSelect} />
                </div>
                <div style={{ flex: 2, borderLeft: '1px solid var(--vscode-panel-border)', paddingLeft: '8px' }}>
                    <h4>Content (Parent Component)</h4>
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

export default TestPane3;