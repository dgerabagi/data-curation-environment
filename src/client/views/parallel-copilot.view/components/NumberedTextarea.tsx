// src/client/views/parallel-copilot.view/components/NumberedTextarea.tsx
// Updated on: C169 (Refactor to include syntax highlighting)
import * as React from 'react';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { logger } from '@/client/utils/logger';

interface NumberedTextareaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    height: number;
    onHeightChange: (height: number) => void;
    id: string; // Unique ID for this textarea instance
}

const NumberedTextarea: React.FC<NumberedTextareaProps> = ({ value, onChange, placeholder, onKeyDown, height, onHeightChange, id }) => {
    const [lineCount, setLineCount] = React.useState(1);
    const [highlightedHtml, setHighlightedHtml] = React.useState('');
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const highlightRef = React.useRef<HTMLDivElement>(null);
    const clientIpc = ClientPostMessageManager.getInstance();

    React.useEffect(() => {
        const handleHighlightResponse = ({ highlightedHtml: html, id: responseId }: { highlightedHtml: string, id: string }) => {
            if (responseId === id) {
                setHighlightedHtml(html);
            }
        };
        clientIpc.onServerMessage(ServerToClientChannel.SendHighlightContext, handleHighlightResponse);
    }, [id, clientIpc]);
    
    React.useEffect(() => {
        const lines = value.split('\n').length;
        setLineCount(lines);
        clientIpc.sendToServer(ClientToServerChannel.RequestHighlightContext, { context: value, id });
    }, [value, id, clientIpc]);

    const handleScroll = () => {
        if (highlightRef.current && textareaRef.current) {
            highlightRef.current.scrollTop = textareaRef.current.scrollTop;
            highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (textareaRef.current) {
            const newHeight = e.clientY - textareaRef.current.getBoundingClientRect().top;
            onHeightChange(Math.max(50, newHeight)); // min height 50px
        }
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className="numbered-textarea-container" style={{ height: `${height}px` }}>
            <div className="line-numbers-gutter">
                {Array.from({ length: lineCount }, (_, i) => (
                    <div key={i}>{i + 1}</div>
                ))}
            </div>
            <div className="highlight-container">
                <div 
                    ref={highlightRef} 
                    className="highlight-content"
                    dangerouslySetInnerHTML={{ __html: highlightedHtml }}
                />
            </div>
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
            <div
                className="textarea-resizer"
                onMouseDown={handleMouseDown}
            />
        </div>
    );
};

export default NumberedTextarea;