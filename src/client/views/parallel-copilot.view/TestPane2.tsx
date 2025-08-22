// Updated on: C106 (Fix click handler and add separate state for content)
import * as React from 'react';
import { VscCheck, VscError } from 'react-icons/vsc';
import { ParsedResponse, ParsedFile } from '@/common/types/pcpp.types';
import { logger } from '@/client/utils/logger';

interface TestPane2Props {
    parsedContent: ParsedResponse | null;
    fileExistenceMap: Map<string, boolean>;
}

const TestPane2: React.FC<TestPane2Props> = ({ parsedContent, fileExistenceMap }) => {
    const [lastClickedFile, setLastClickedFile] = React.useState<string | null>(null);
    const [selectedFileContent, setSelectedFileContent] = React.useState<string | null>(null);

    if (!parsedContent) {
        return <div className="test-pane-container">Go to the main input, paste a response, and click "Parse for Tests" to populate data.</div>;
    }

    const handleFileClick = (filePath: string) => {
        logger.log(`[TEST PANE B] CLICKED: ${filePath}.`);
        setLastClickedFile(filePath); // First, simple state update

        const file = parsedContent.files.find(f => f.path === filePath);
        if (file) {
            logger.log(`[TEST PANE B] Found file content. Setting content state.`);
            setSelectedFileContent(file.content); // Second, update content
        } else {
            logger.error(`[TEST PANE B] Could not find file object for path: ${filePath}`);
            setSelectedFileContent(`Error: Could not find content for ${filePath}`);
        }
    };

    return (
        <div className="test-pane-container">
            <h3>Test Pane B: Local State Update</h3>
            <p>This test uses local `useState` to manage the selected file. Clicking a file should update the content displayed below.</p>
            <p><strong>Last Clicked:</strong> {lastClickedFile || 'None'}</p>
            <hr style={{ margin: '8px 0', borderColor: 'var(--vscode-panel-border)' }} />
            <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ flex: 1 }}>
                    <h4>Files</h4>
                    <ul className="associated-files-list">
                        {parsedContent.filesUpdated.map(filePath => (
                            <li 
                                key={filePath} 
                                onClick={() => handleFileClick(filePath)}
                                className={lastClickedFile === filePath ? 'selected' : ''}
                            >
                                {fileExistenceMap.get(filePath) ? <VscCheck className="status-icon exists" /> : <VscError className="status-icon not-exists" />}
                                <span>{filePath}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ flex: 2, borderLeft: '1px solid var(--vscode-panel-border)', paddingLeft: '8px' }}>
                    <h4>Content</h4>
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

export default TestPane2;