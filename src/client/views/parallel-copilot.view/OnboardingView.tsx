// src/client/views/parallel-copilot.view/OnboardingView.tsx
import * as React from 'react';
import { VscRocket } from 'react-icons/vsc';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';
import { logger } from '@/client/utils/logger';

interface OnboardingViewProps {
    initialProjectScope?: string;
}

const OnboardingView: React.FC<OnboardingViewProps> = ({ initialProjectScope }) => {
    const [projectScope, setProjectScope] = React.useState(initialProjectScope || '');
    const [isGenerating, setIsGenerating] = React.useState(false);
    const clientIpc = ClientPostMessageManager.getInstance();

    React.useEffect(() => {
        setProjectScope(initialProjectScope || '');
    }, [initialProjectScope]);

    const handleGenerate = () => {
        if (projectScope.trim()) {
            setIsGenerating(true);
            logger.log("Sending request to generate Cycle 0 prompt.");
            clientIpc.sendToServer(ClientToServerChannel.RequestCreateCycle0Prompt, { projectScope });
        }
    };

    return (
        <div className="onboarding-container">
            <h1>Welcome to the Data Curation Environment!</h1>
            <p>
                To get started, describe the goals and scope of your new project in the text area below.
                When you're ready, we'll generate an initial prompt that will instruct an AI to create a set of
                planning documents to bootstrap your development process.
            </p>
            <textarea
                className="onboarding-textarea"
                placeholder="e.g., I want to build a web application that allows users to track their daily habits. It should have a simple UI, user authentication, and a dashboard to visualize progress..."
                value={projectScope}
                onChange={(e) => setProjectScope(e.target.value)}
                disabled={isGenerating}
            />
            <button className="styled-button" onClick={handleGenerate} disabled={!projectScope.trim() || isGenerating}>
                <VscRocket /> {isGenerating ? 'Generating...' : 'Generate Initial Artifacts Prompt'}
            </button>
        </div>
    );
};

export default OnboardingView;