// src/client/views/parallel-copilot.view/hooks/useCycleManagement.ts
import * as React from 'react';
import { PcppCycle } from '@/common/types/pcpp.types';
import { ClientPostMessageManager } from '@/common/ipc/client-ipc';
import { ClientToServerChannel } from '@/common/ipc/channels.enum';

export const useCycleManagement = (
    initialCycle: PcppCycle | null,
    initialProjectScope: string | undefined,
    initialMaxCycle: number,
    saveState: () => void
) => {
    const [currentCycle, setCurrentCycle] = React.useState<PcppCycle | null>(initialCycle);
    const [projectScope, setProjectScope] = React.useState<string | undefined>(initialProjectScope);
    const [maxCycle, setMaxCycle] = React.useState(initialMaxCycle);
    const [cycleTitle, setCycleTitle] = React.useState(initialCycle?.title || '');
    const [cycleContext, setCycleContext] = React.useState(initialCycle?.cycleContext || '');
    const [ephemeralContext, setEphemeralContext] = React.useState(initialCycle?.ephemeralContext || '');
    const [isCycleCollapsed, setIsCycleCollapsed] = React.useState(false);
    const [isEphemeralContextCollapsed, setIsEphemeralContextCollapsed] = React.useState(initialCycle?.isEphemeralContextCollapsed ?? true);
    const [saveStatus, setSaveStatus] = React.useState<'saved' | 'saving' | 'unsaved'>('saved');
    const [selectedResponseId, setSelectedResponseId] = React.useState<string | null>(initialCycle?.selectedResponseId || null);

    const clientIpc = ClientPostMessageManager.getInstance();

    const loadCycleData = React.useCallback((cycleData: PcppCycle, scope?: string) => {
        setCurrentCycle(cycleData);
        setProjectScope(scope);
        setCycleTitle(cycleData.title);
        setCycleContext(cycleData.cycleContext);
        setEphemeralContext(cycleData.ephemeralContext);
        setIsEphemeralContextCollapsed(cycleData.isEphemeralContextCollapsed ?? true);
        setSelectedResponseId(cycleData.selectedResponseId || null);
        setSaveStatus('saved');
    }, []);

    const handleCycleChange = React.useCallback((e: React.MouseEvent | null, newCycleId: number) => {
        e?.stopPropagation();
        if (saveStatus !== 'saved' && currentCycle?.cycleId !== newCycleId) return;
        if (newCycleId >= 0 && newCycleId <= maxCycle) {
            clientIpc.sendToServer(ClientToServerChannel.RequestCycleData, { cycleId: newCycleId });
            clientIpc.sendToServer(ClientToServerChannel.SaveLastViewedCycle, { cycleId: newCycleId });
        }
    }, [saveStatus, currentCycle, maxCycle, clientIpc]);

    const handleNewCycle = React.useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (saveStatus !== 'saved') return;
        const newCycleId = maxCycle + 1;
        setMaxCycle(newCycleId);
        const newCycle: PcppCycle = {
            cycleId: newCycleId,
            title: 'New Cycle',
            cycleContext: '',
            ephemeralContext: '',
            responses: {},
            tabCount: currentCycle?.tabCount || 4,
            timestamp: new Date().toISOString(),
            status: 'complete',
            isEphemeralContextCollapsed: true,
        };
        loadCycleData(newCycle);
        clientIpc.sendToServer(ClientToServerChannel.SaveLastViewedCycle, { cycleId: newCycleId });
        setSaveStatus('unsaved');
    }, [saveStatus, maxCycle, currentCycle, loadCycleData, clientIpc]);
    
    const onCycleContextChange = React.useCallback((value: string) => {
        setCycleContext(value);
        setSaveStatus('unsaved');
    }, []);

    const onEphemeralContextChange = React.useCallback((value: string) => {
        setEphemeralContext(value);
        setSaveStatus('unsaved');
    }, []);

    const onTitleChange = React.useCallback((title: string) => {
        setCycleTitle(title);
        setSaveStatus('unsaved');
    }, []);

    const handleDeleteCycle = React.useCallback(() => {
        if (currentCycle !== null) {
            clientIpc.sendToServer(ClientToServerChannel.RequestDeleteCycle, { cycleId: currentCycle.cycleId });
        }
    }, [currentCycle, clientIpc]);

    const handleResetHistory = React.useCallback(() => {
        clientIpc.sendToServer(ClientToServerChannel.RequestResetHistory, {});
    }, [clientIpc]);

    const handleExportHistory = React.useCallback(() => clientIpc.sendToServer(ClientToServerChannel.RequestExportHistory, {}), [clientIpc]);
    const handleImportHistory = React.useCallback(() => clientIpc.sendToServer(ClientToServerChannel.RequestImportHistory, {}), [clientIpc]);

    const handleSelectResponse = React.useCallback((id: string) => {
        setSelectedResponseId(prev => prev === id ? null : id);
        setSaveStatus('unsaved');
    }, []);

    React.useEffect(() => {
        if (saveStatus === 'unsaved') {
            saveState();
        }
    }, [saveStatus, saveState]);

    return {
        currentCycle,
        setCurrentCycle,
        projectScope,
        setProjectScope,
        maxCycle,
        setMaxCycle,
        cycleTitle,
        cycleContext,
        ephemeralContext,
        isCycleCollapsed,
        setIsCycleCollapsed,
        isEphemeralContextCollapsed,
        setIsEphemeralContextCollapsed,
        saveStatus,
        setSaveStatus,
        selectedResponseId,
        loadCycleData,
        handleCycleChange,
        handleNewCycle,
        onCycleContextChange,
        onEphemeralContextChange,
        onTitleChange,
        handleDeleteCycle,
        handleResetHistory,
        handleExportHistory,
        handleImportHistory,
        handleSelectResponse,
    };
};