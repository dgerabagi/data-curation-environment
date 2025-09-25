// src/client/views/parallel-copilot.view/components/GenerationProgressDisplay.tsx
// Updated on: C60 (Implement 3-color progress bar and status indicator)
import * as React from 'react';
import { formatLargeNumber } from '../../../../common/utils/formatting';
import { TabState } from '../view';
import { GenerationProgress } from '@/common/ipc/channels.type';
import { VscLoading, VscCheck } from 'react-icons/vsc';

interface GenerationProgressDisplayProps {
    progressData: GenerationProgress[];
    tps: number;
    tabs: { [key: string]: TabState };
}

const GenerationProgressDisplay: React.FC<GenerationProgressDisplayProps> = ({ progressData, tps, tabs }) => {
    const totalGenerated = progressData.reduce((sum, p) => sum + p.currentTokens, 0);

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
                <span>Generating Responses...</span>
                <span title="Calculated based on all incoming response chunks per second.">Tokens/sec: {tps > 0 ? tps : '--'}</span>
            </div>
            <div className="progress-total">Total Tokens Generated: {formatLargeNumber(totalGenerated, 0)}</div>
            
            {progressData.map(p => {
                const promptPct = (p.promptTokens / p.totalTokens) * 100;
                const generatedPct = (p.currentTokens / p.totalTokens) * 100;
                const remainingPct = 100 - promptPct - generatedPct;
                const isComplete = p.status === 'complete';

                return (
                    <div key={p.responseId} className="progress-item-container">
                        <div className='progress-item-header'>
                            <span>Resp {p.responseId}</span>
                            <span className={`status-indicator status-${p.status}`}>
                                {getStatusIndicator(p.status)}
                            </span>
                        </div>
                        <div className={`stacked-progress-bar ${isComplete ? 'completed' : ''}`}>
                            <div className="progress-segment thinking" style={{ width: `${promptPct}%` }} title={`Thinking: ${p.promptTokens} tk`}></div>
                            <div className="progress-segment generated" style={{ width: `${generatedPct}%` }} title={`Response: ${p.currentTokens} tk`}></div>
                            <div className="progress-segment unused" style={{ width: `${remainingPct}%` }} title="Unused"></div>
                        </div>
                        <span className="token-count-text">
                            ({formatLargeNumber(p.promptTokens, 0)} + {formatLargeNumber(p.currentTokens, 0)} / {formatLargeNumber(p.totalTokens, 0)} tk)
                        </span>
                        <div className="partial-text-preview">
                            <pre><code>{tabs[p.responseId.toString()]?.rawContent || ''}</code></pre>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default GenerationProgressDisplay;