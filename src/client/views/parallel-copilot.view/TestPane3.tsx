// src/client/views/parallel-copilot.view/TestPane3.tsx
import * as React from 'react';
import { VscCheck, VscError } from 'react-icons/vsc';
import { ParsedResponse, ParsedFile } from '@/common/types/pcpp.types';
import { logger } from '@/client/utils/logger';

// Child component to test prop drilling
const FileList = ({ files, fileExistenceMap, onFileSelect }: { files: string[], fileExistenceMap: Map<string, boolean>, onFileSelect: (filePath: string) => void }) => (
    <ul className="associated-files-list">
        {files.map(filePath => (
            <li key={filePath} onClick={() => onFileSelect(filePath)}>
                {fileExistenceMap.get(filePath) ? <VscCheck className="status-icon exists" /> : <VscError className="status-icon not-exists" />}
                <span>{filePath}</span>
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
        return <div className="test-pane-container">Go to the "Original" tab, paste a response, and click "Parse All" to populate test data.</div>;
    }

    const handleFileSelect = (filePath: string) => {
        const file = parsedContent.files.find(f => f.path === filePath);
        if (file) {
            logger.log(`[TEST PANE C] Child component called onFileSelect prop for: ${file.path}.`);
            setSelectedFile(file);
        } else {
             logger.error(`[TEST PANE C] Could not find file object for path: ${filePath}`);
        }
    };

    return (
        <div className="test-pane-container">
            <h3>Test Pane C: Prop-Driven Update</h3>
            <p>This test uses a child component for the list, passing the click handler down as a prop. This tests for issues with prop drilling.</p>
            <hr style={{ margin: '8px 0', borderColor: 'var(--vscode-panel-border)' }} />
             <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ flex: 1 }}>
                    <h4>Files (Child Component)</h4>
                    <FileList files={parsedContent.filesUpdated} fileExistenceMap={fileExistenceMap} onFileSelect={handleFileSelect} />
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