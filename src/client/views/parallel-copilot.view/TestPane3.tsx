// Updated on: C106 (Fix click handler and add separate state for content)
import * as React from 'react';
import { VscCheck, VscError } from 'react-icons/vsc';
import { ParsedResponse, ParsedFile } from '@/common/types/pcpp.types';
import { logger } from '@/client/utils/logger';

// Child component to test prop drilling
const FileList = ({ files, fileExistenceMap, onFileSelect, lastClickedFile }: { files: string[], fileExistenceMap: Map<string, boolean>, onFileSelect: (filePath: string) => void, lastClickedFile: string | null }) => (
    <ul className="associated-files-list">
        {files.map(filePath => (
            <li 
                key={filePath} 
                onClick={() => onFileSelect(filePath)}
                className={lastClickedFile === filePath ? 'selected' : ''}
            >
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
    const [lastClickedFile, setLastClickedFile] = React.useState<string | null>(null);
    const [selectedFileContent, setSelectedFileContent] = React.useState<string | null>(null);

    if (!parsedContent) {
        return <div className="test-pane-container">Go to the main input, paste a response, and click "Parse for Tests" to populate data.</div>;
    }

    const handleFileSelect = (filePath: string) => {
        logger.log(`[TEST PANE C] Child component called onFileSelect prop for: ${filePath}.`);
        setLastClickedFile(filePath);

        const file = parsedContent.files.find(f => f.path === filePath);
        if (file) {
             logger.log(`[TEST PANE C] Found file content. Setting content state.`);
            setSelectedFileContent(file.content);
        } else {
             logger.error(`[TEST PANE C] Could not find file object for path: ${filePath}`);
             setSelectedFileContent(`Error: Could not find content for ${filePath}`);
        }
    };

    return (
        <div className="test-pane-container">
            <h3>Test Pane C: Prop-Driven Update</h3>
            <p>This test uses a child component for the list, passing the click handler down as a prop. This tests for issues with prop drilling.</p>
            <p><strong>Last Clicked:</strong> {lastClickedFile || 'None'}</p>
            <hr style={{ margin: '8px 0', borderColor: 'var(--vscode-panel-border)' }} />
             <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ flex: 1 }}>
                    <h4>Files (Child Component)</h4>
                    <FileList 
                        files={parsedContent.filesUpdated} 
                        fileExistenceMap={fileExistenceMap} 
                        onFileSelect={handleFileSelect}
                        lastClickedFile={lastClickedFile}
                    />
                </div>
                <div style={{ flex: 2, borderLeft: '1px solid var(--vscode-panel-border)', paddingLeft: '8px' }}>
                    <h4>Content (Parent Component)</h4>
                    {selectedFileContent !== null ? (
                        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                            <code>{selectedFileContent}</code>
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