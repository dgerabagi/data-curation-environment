// src/client/views/parallel-copilot.view/components/NumberedTextarea.tsx
// Updated on: C179 (Fix scrolling synchronization and alignment issues)
import * as React from 'react';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';

interface NumberedTextareaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    height: number;
    onHeightChange: (height: number) => void;
    id: string; // Unique ID for this textarea instance
    className?: string; // For workflow highlighting
}

const NumberedTextarea: React.FC<NumberedTextareaProps> = ({ value, onChange, placeholder, onKeyDown, height, onHeightChange, id, className }) => {
    const [lineCount, setLineCount] = React.useState(1);
    const [highlightedHtml, setHighlightedHtml] = React.useState('');
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const highlightRef = React.useRef<HTMLDivElement>(null);
    const lineNumbersRef = React.useRef<HTMLDivElement>(null);
    const clientIpc = ClientPostMessageManager.getInstance();

    React.useEffect(() => {
        const handleHighlightResponse = ({ highlightedHtml: html, id: responseId }: { highlightedHtml: string, id: string }) => {
            if (responseId === id) {
                setHighlightedHtml(html);
            }
        };
        const subscription = clientIpc.onServerMessage(ServerToClientChannel.SendHighlightContext, handleHighlightResponse);
        // Assuming onServerMessage returns a function to unsubscribe, or similar mechanism.
        // If not, this might need adjustment based on actual implementation of ClientPostMessageManager.
    }, [id, clientIpc]);
    
    React.useEffect(() => {
        const lines = value.split('\n').length;
        setLineCount(lines);
        clientIpc.sendToServer(ClientToServerChannel.RequestHighlightContext, { context: value, id });
    }, [value, id, clientIpc]);

    const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
        if (highlightRef.current && lineNumbersRef.current) {
            const scrollTop = e.currentTarget.scrollTop;
            highlightRef.current.scrollTop = scrollTop;
            lineNumbersRef.current.scrollTop = scrollTop;
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = React.useCallback((e: MouseEvent) => {
        if (textareaRef.current) {
            const containerTop = textareaRef.current.getBoundingClientRect().top;
            const newHeight = e.clientY - containerTop;
            onHeightChange(Math.max(50, newHeight)); // min height 50px
        }
    }, [textareaRef, onHeightChange]);

    const handleMouseUp = React.useCallback(() => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);

    return (
        <div className={`numbered-textarea-container ${className || ''}`} style={{ height: `${height}px` }}>
            <div className="line-numbers-gutter" ref={lineNumbersRef}>
                {Array.from({ length: lineCount }, (_, i) => (
                    <div key={i}>{i + 1}</div>
                ))}
            </div>
            <div className="content-wrapper">
                <div 
                    ref={highlightRef} 
                    className="highlight-content"
                    dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                />
                <textarea
                    ref={textareaRef}
                    className="context-textarea"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    onScroll={handleScroll}
                    spellCheck={false}
                />
            </div>
            <div
                className="textarea-resizer"
                onMouseDown={handleMouseDown}
            />
        </div>
    );
};

export default NumberedTextarea;