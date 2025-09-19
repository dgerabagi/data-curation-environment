// src/client/views/parallel-copilot.view/OnboardingView.tsx
// Updated on: C21 (Add title and save status indicator)
import * as React from 'react';
import { VscRocket, VscArrowRight, VscLoading, VscCheck, VscWarning } from 'react-icons/vsc';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';
import { logger } from '@/client/utils/logger';

interface OnboardingViewProps {
    projectScope: string;
    onScopeChange: (scope: string) => void;
    onNavigateToCycle: (cycleId: number) => void;
    latestCycleId: number;
    workflowStep: string | null;
    saveStatus: 'saved' | 'saving' | 'unsaved';
}

const SaveStatusIndicator: React.FC<{ saveStatus: 'saved' | 'saving' | 'unsaved' }> = ({ saveStatus }) => {
    let icon;
    let title;
    switch(saveStatus) {
        case 'saving': icon = <VscLoading className="saving"/>; title = "Saving..."; break;
        case 'unsaved': icon = <VscWarning className="unsaved"/>; title = "Unsaved changes"; break;
        case 'saved': icon = <VscCheck className="saved"/>; title = "Saved"; break;
        default: icon = null; title = "";
    }
    return <div className="save-status-indicator" title={title}>{icon}</div>;
};

const OnboardingView: React.FC<OnboardingViewProps> = ({ projectScope, onScopeChange, onNavigateToCycle, latestCycleId, workflowStep, saveStatus }) => {
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [promptGenerated, setPromptGenerated] = React.useState(false);
    const clientIpc = ClientPostMessageManager.getInstance();

    const isNavigatingBack = latestCycleId > 0;

    const handleGenerate = () => {
        if (projectScope.trim()) {
            setIsGenerating(true);
            logger.log("Sending request to generate Cycle 0 prompt and save project scope.");
            clientIpc.sendToServer(ClientToServerChannel.RequestCreateCycle0Prompt, { projectScope });
            setTimeout(() => {
                setIsGenerating(false);
                setPromptGenerated(true);
            }, 1500); 
        }
    };

    const handleReturnToCycles = () => {
        logger.log("Returning to latest cycle from Project Plan view.");
        onNavigateToCycle(latestCycleId);
    };

    return (
        <div className="onboarding-container">
            <h1>{isNavigatingBack ? 'Edit Project Plan' : 'Welcome to the Data Curation Environment!'}</h1>
            <p>
                {isNavigatingBack 
                    ? 'You can view and edit your high-level project scope here. This will be included in all future generated prompts.'
                    : 'To get started, describe the goals and scope of your new project in the text area below. When you\'re ready, we\'ll generate an initial prompt that will instruct an AI to create a set of planning documents to bootstrap your development process.'
                }
            </p>
            <div className="onboarding-textarea-wrapper">
                 <div className="onboarding-header">
                    <h3>Project Scope</h3>
                    <SaveStatusIndicator saveStatus={saveStatus} />
                </div>
                <textarea
                    className={`onboarding-textarea ${workflowStep === 'awaitingProjectScope' ? 'workflow-highlight' : ''}`}
                    placeholder="e.g., I want to build a web application that allows users to track their daily habits. It should have a simple UI, user authentication, and a dashboard to visualize progress..."
                    value={projectScope}
                    onChange={(e) => onScopeChange(e.target.value)}
                    disabled={isGenerating || (promptGenerated && !isNavigatingBack)}
                />
            </div>
            {isNavigatingBack ? (
                <button className="styled-button" onClick={handleReturnToCycles}>
                    <VscArrowRight /> Return to Cycle {latestCycleId}
                </button>
            ) : !promptGenerated ? (
                <button 
                    className={`styled-button ${workflowStep === 'awaitingGenerateInitialPrompt' ? 'workflow-highlight' : ''}`}
                    onClick={handleGenerate} 
                    disabled={!projectScope.trim() || isGenerating}
                >
                    <VscRocket /> {isGenerating ? 'Generating...' : 'Generate Initial Artifacts Prompt'}
                </button>
            ) : (
                <div className="onboarding-success">
                    <p>✅ Initial `prompt.md` and `README.md` have been generated in your workspace!</p>
                    <button className="styled-button" onClick={() => onNavigateToCycle(1)}>
                        Continue to Cycle 1 <VscArrowRight />
                    </button>
                </div>
            )}
        </div>
    );
};

export default OnboardingView;