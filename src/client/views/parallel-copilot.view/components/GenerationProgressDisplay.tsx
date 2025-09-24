// src/client/views/parallel-copilot.view/components/GenerationProgressDisplay.tsx
// New file in C54
import * as React from 'react';
import { formatLargeNumber } from '../../../../common/utils/formatting';

export interface GenerationProgress {
    responseId: number;
    currentTokens: number;
    totalTokens: number;
}

interface GenerationProgressDisplayProps {
    progressData: GenerationProgress[];
    tps: number;
}

const GenerationProgressDisplay: React.FC<GenerationProgressDisplayProps> = ({ progressData, tps }) => {
    const totalGenerated = progressData.reduce((sum, p) => sum + p.currentTokens, 0);

    return (
        <div className="generation-progress-display">
            <div className="progress-header">
                <span>Generating Responses...</span>
                <span>Tokens/sec: {tps > 0 ? tps : '--'}</span>
            </div>
            <div className="progress-total">Total Tokens: {formatLargeNumber(totalGenerated, 0)}</div>
            
            {progressData.map(p => (
                <div key={p.responseId} className="progress-bar-container">
                    <div className='progress-bar-row'>
                        <span>Resp {p.responseId}:</span>
                        <progress value={p.currentTokens} max={p.totalTokens}></progress>
                        <span>{p.totalTokens > 0 ? ((p.currentTokens / p.totalTokens) * 100).toFixed(0) : 0}%</span>
                    </div>
                    <span className="token-count-text">
                        ({formatLargeNumber(p.currentTokens, 0)} / {formatLargeNumber(p.totalTokens, 0)} tk)
                    </span>
                </div>
            ))}
        </div>
    );
};

export default GenerationProgressDisplay;