// src/client/views/parallel-copilot.view/components/GenerationProgressDisplay.tsx
// Updated on: C74 (Fix timer stale state bug)
import * as React from 'react';
import { formatLargeNumber } from '../../../../common/utils/formatting';
import { TabState } from '../view';
import { GenerationProgress } from '@/common/ipc/channels.type';
import { VscLoading, VscCheck, VscStopCircle, VscSync, VscListOrdered, VscListUnordered, VscArrowRight } from 'react-icons/vsc';

interface GenerationProgressDisplayProps {
    progressData: GenerationProgress[];
    tps: number;
    tabs: { [key: string]: TabState };
    onStop: (cycleId: number) => void;
    onRegenerate: (responseId: number) => void;
    isGenerationComplete: boolean;
    onViewResponses: () => void;
    startTime: number | null;
    cycleId: number;
}

type SortMode = 'default' | 'total' | 'response';

const GenerationProgressDisplay: React.FC<GenerationProgressDisplayProps> = ({ progressData, tps, tabs, onStop, onRegenerate, isGenerationComplete, onViewResponses, startTime, cycleId }) => {
    const [sortMode, setSortMode] = React.useState<SortMode>('default');
    const [elapsedTime, setElapsedTime] = React.useState('00:00.0');
    
    React.useEffect(() => {
        if (!startTime || isGenerationComplete) {
            return;
        }

        const interval = setInterval(() => {
            const currentStartTime = startTime; // Capture startTime at the time of effect execution
            if (currentStartTime) {
                const elapsed = (Date.now() - currentStartTime) / 1000;
                const minutes = Math.floor(elapsed / 60);
                const seconds = (elapsed % 60).toFixed(1);
                setElapsedTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(4, '0')}`);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [startTime, isGenerationComplete]);

    const completedCount = progressData.filter(p => p.status === 'complete').length;

    const sortedProgressData = React.useMemo(() => {
        const data = [...progressData];
        if (sortMode === 'default') {
            return data.sort((a,b) => a.responseId - b.responseId);
        }
        if (sortMode === 'total') {
            return data.sort((a, b) => (b.thinkingTokens + b.currentTokens) - (a.thinkingTokens + a.currentTokens));
        }
        if (sortMode === 'response') {
            return data.sort((a, b) => b.currentTokens - a.currentTokens);
        }
        return data;
    }, [progressData, sortMode]);

    const handleSortToggle = () => {
        setSortMode(current => {
            if (current === 'default') return 'total';
            if (current === 'total') return 'response';
            return 'default';
        });
    };

    const getSortButtonText = () => {
        if (sortMode === 'total') return 'Sort by Response Tk';
        if (sortMode === 'response') return 'Default Sort';
        return 'Sort by Total Tk';
    };

    const getStatusIndicator = (status: GenerationProgress['status']) => {
        switch (status) {
            case 'thinking':
                return <><VscLoading className="spinner" /> Thinking...</>;
            case 'generating':
                return <><VscLoading className="spinner" /> Generating...</>;
            case 'complete':
                return <><VscCheck className="complete-check" /> Complete</>;
            case 'error':
                return <>Error</>;
            default:
                return <>Pending...</>;
        }
    };

    return (
        <div className="generation-progress-display">
            <div className="progress-header">
                <span className="progress-title">{isGenerationComplete ? 'Generation Complete' : 'Generating Responses...'}</span>
                <div className="header-controls">
                    <button onClick={handleSortToggle} className="sort-button" title={getSortButtonText()}>
                        <VscListOrdered/> {getSortButtonText()}
                    </button>
                    <span title="Calculated based on all incoming response chunks per second.">Tokens/sec: {tps > 0 ? tps : '--'}</span>
                    <span className="elapsed-timer">{elapsedTime}</span>
                </div>
            </div>
            
            {sortedProgressData.map(p => {
                const thinkingPct = (p.thinkingTokens / p.totalTokens) * 100;
                const generatedPct = (p.currentTokens / p.totalTokens) * 100;
                const remainingPct = 100 - thinkingPct - generatedPct;
                const isComplete = p.status === 'complete';
                const unusedTokens = p.totalTokens - p.thinkingTokens - p.currentTokens;
                const totalOutputTokens = p.thinkingTokens + p.currentTokens;

                return (
                    <div key={p.responseId} className="progress-item-container">
                        <div className='progress-item-header'>
                            <span>Resp {p.responseId}</span>
                            <div className="status-indicator-wrapper">
                                <span className={`status-indicator status-${p.status}`}>
                                    {getStatusIndicator(p.status)}
                                </span>
                                <button onClick={() => onStop(cycleId)} disabled={isComplete} title="Stop Generation" className="styled-button"><VscStopCircle /> Stop</button>
                                <button onClick={() => onRegenerate(p.responseId)} disabled={p.status === 'thinking' || p.status === 'generating'} title="Regenerate this response" className="styled-button"><VscSync /> Re-generate</button>
                            </div>
                        </div>
                        <div className={`stacked-progress-bar ${isComplete ? 'completed' : ''}`}>
                            <div className="progress-segment thinking" style={{ width: `${thinkingPct}%` }} title={`Thinking: ${p.thinkingTokens} tk`}></div>
                            <div className="progress-segment generated" style={{ width: `${generatedPct}%` }} title={`Response: ${p.currentTokens} tk`}></div>
                            <div className="progress-segment unused" style={{ width: `${remainingPct}%` }} title="Unused"></div>
                        </div>
                        <div className="token-count-footer">
                            <span className="token-count-text">
                                (<span className="token-thinking">{formatLargeNumber(p.thinkingTokens, 0)}</span> + 
                                <span className="token-response">{formatLargeNumber(p.currentTokens, 0)}</span> = {formatLargeNumber(totalOutputTokens, 0)} / 
                                {formatLargeNumber(p.totalTokens, 0)} tk)
                            </span>
                            {isComplete && (
                                <span className="unused-tokens-display token-unused">
                                    Unused: {formatLargeNumber(unusedTokens, 0)} tk
                                </span>
                            )}
                        </div>
                        <div className="partial-text-preview">
                            <pre><code>{tabs[p.responseId.toString()]?.rawContent || ''}</code></pre>
                        </div>
                    </div>
                );
            })}

            {isGenerationComplete && (
                <div className="progress-footer">
                    <span>{completedCount}/{progressData.length} Responses Complete</span>
                    {/* The "View Responses" button is now effectively managed by the main view's state change */}
                </div>
            )}
        </div>
    );
};

export default GenerationProgressDisplay;