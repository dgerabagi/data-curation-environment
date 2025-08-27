// src/client/views/parallel-copilot.view/OnboardingView.tsx
import * as React from 'react';
import { VscRocket, VscArrowRight } from 'react-icons/vsc';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';
import { logger } from '@/client/utils/logger';

interface OnboardingViewProps {
    initialProjectScope?: string;
    onNavigateToCycle: (cycleId: number) => void;
    latestCycleId: number;
}

const OnboardingView: React.FC<OnboardingViewProps> = ({ initialProjectScope, onNavigateToCycle, latestCycleId }) => {
    const [projectScope, setProjectScope] = React.useState(initialProjectScope || '');
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [promptGenerated, setPromptGenerated] = React.useState(false);
    const clientIpc = ClientPostMessageManager.getInstance();

    const isNavigatingBack = latestCycleId > 0;

    React.useEffect(() => {
        setProjectScope(initialProjectScope || '');
    }, [initialProjectScope]);

    const handleGenerate = () => {
        if (projectScope.trim()) {
            setIsGenerating(true);
            logger.log("Sending request to generate Cycle 0 prompt and save project scope.");
            clientIpc.sendToServer(ClientToServerChannel.RequestCreateCycle0Prompt, { projectScope });
            // The backend will now send a SendLatestCycleData message which triggers the view switch
            // We can set a local flag to change the UI here after a delay.
            setTimeout(() => {
                setIsGenerating(false);
                setPromptGenerated(true);
            }, 1500); // Assume generation takes a moment
        }
    };

    const handleSaveScope = () => {
        if (projectScope.trim()) {
            logger.log("Saving updated project scope.");
            // This will be handled by the debounced save in the main view,
            // which is triggered by the onNavigateToCycle call.
            onNavigateToCycle(latestCycleId);
        }
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
            <textarea
                className="onboarding-textarea"
                placeholder="e.g., I want to build a web application that allows users to track their daily habits. It should have a simple UI, user authentication, and a dashboard to visualize progress..."
                value={projectScope}
                onChange={(e) => setProjectScope(e.target.value)}
                disabled={isGenerating || (promptGenerated && !isNavigatingBack)}
            />
            {isNavigatingBack ? (
                <button className="styled-button" onClick={handleSaveScope}>
                    <VscArrowRight /> Return to Cycle {latestCycleId}
                </button>
            ) : !promptGenerated ? (
                <button className="styled-button" onClick={handleGenerate} disabled={!projectScope.trim() || isGenerating}>
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