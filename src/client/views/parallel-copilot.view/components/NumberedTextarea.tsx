// src/client/views/parallel-copilot.view/components/NumberedTextarea.tsx
// New file in C167
import * as React from 'react';

interface NumberedTextareaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    height: number;
    onHeightChange: (height: number) => void;
}

const NumberedTextarea: React.FC<NumberedTextareaProps> = ({ value, onChange, placeholder, onKeyDown, height, onHeightChange }) => {
    const [lineCount, setLineCount] = React.useState(1);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const lineNumbersRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const lines = value.split('\n').length;
        setLineCount(lines);
    }, [value]);

    const handleScroll = () => {
        if (lineNumbersRef.current && textareaRef.current) {
            lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
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
            <div className="line-numbers-gutter" ref={lineNumbersRef}>
                {Array.from({ length: lineCount }, (_, i) => (
                    <div key={i}>{i + 1}</div>
                ))}
            </div>
            <textarea
                ref={textareaRef}
                className="context-textarea"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onScroll={handleScroll}
                style={{ resize: 'none' }}
            />
            <div
                className="textarea-resizer"
                onMouseDown={handleMouseDown}
            />
        </div>
    );
};

export default NumberedTextarea;