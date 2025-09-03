// src/client/views/parallel-copilot.view/components/HighlightedTextarea.tsx
// New in C3
import * as React from 'react';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel, ServerToClientChannel } from '@/common/ipc/channels.enum';
import { logger } from '@/client/utils/logger';

const useDebounce = (callback: (...args: any[]) => void, delay: number) => {
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
    return React.useCallback((...args: any[]) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => callback(...args), delay);
    }, [callback, delay]);
};

interface HighlightedTextareaProps {
    id: string;
    initialValue: string;
    onChange: (value: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    className?: string;
}

const HighlightedTextarea: React.FC<HighlightedTextareaProps> = ({ id, initialValue, onChange, onKeyDown, placeholder, className }) => {
    const [value, setValue] = React.useState(initialValue);
    const [highlightedHtml, setHighlightedHtml] = React.useState(initialValue);
    const clientIpc = ClientPostMessageManager.getInstance();
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const highlightDivRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const requestHighlighting = React.useCallback((text: string) => {
        logger.log(`Requesting highlight for ${id}`);
        clientIpc.sendToServer(ClientToServerChannel.RequestHighlightContext, { context: text, id });
    }, [clientIpc, id]);

    const debouncedRequestHighlighting = useDebounce(requestHighlighting, 300);

    React.useEffect(() => {
        const handleHighlightResponse = ({ highlightedHtml: html, id: responseId }: { highlightedHtml: string, id: string }) => {
            if (responseId === id) {
                setHighlightedHtml(html);
            }
        };
        clientIpc.onServerMessage(ServerToClientChannel.SendHighlightContext, handleHighlightResponse);
        // Initial highlight
        requestHighlighting(value);
    }, [clientIpc, id, value, requestHighlighting]);


    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
        onChange(e.target.value);
        debouncedRequestHighlighting(e.target.value);
    };

    const handleScroll = () => {
        if (textareaRef.current && highlightDivRef.current) {
            highlightDivRef.current.scrollTop = textareaRef.current.scrollTop;
            highlightDivRef.current.scrollLeft = textareaRef.current.scrollLeft;
        }
    };
    
    return (
        <div className={`highlighted-textarea-wrapper ${className || ''}`}>
            <div
                ref={highlightDivRef}
                className="highlighted-content"
                dangerouslySetInnerHTML={{ __html: highlightedHtml + '\n' }} // Add newline to prevent final line cutoff
            />
            <textarea
                ref={textareaRef}
                value={value}
                onChange={handleChange}
                onKeyDown={onKeyDown}
                onScroll={handleScroll}
                placeholder={placeholder}
                spellCheck={false}
                className="highlight-textarea"
            />
        </div>
    );
};

export default HighlightedTextarea;