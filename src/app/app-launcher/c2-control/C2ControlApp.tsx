import React, { useState, useEffect } from 'react';
import { Agent } from '../../../types';
import useC2Simulator from './hooks/useC2Simulator';
import DashboardView from './components/DashboardView';
import TerminalView from './components/TerminalView';
import PayloadGeneratorModal from './components/PayloadGeneratorModal';
import SettingsModal from './components/SettingsModal';
import { PlusCircleIcon, Cog6ToothIcon } from '../../../icons';

const C2_URL_STORAGE_KEY = 'c2_server_url';
const DEFAULT_C2_URL = "wss://your-c2-server.com/ws";

const C2ControlApp: React.FC = () => {
    const { agents, executeCommand } = useC2Simulator();
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    const [isPayloadModalOpen, setIsPayloadModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [c2Url, setC2Url] = useState(() => {
        return localStorage.getItem(C2_URL_STORAGE_KEY) || DEFAULT_C2_URL;
    });

    // Effect to save URL to local storage
    useEffect(() => {
        localStorage.setItem(C2_URL_STORAGE_KEY, c2Url);
    }, [c2Url]);


    if (selectedAgent) {
        return (
            <TerminalView 
                agent={selectedAgent}
                onExecuteCommand={(cmd) => executeCommand(selectedAgent.id, cmd)}
                onExit={() => setSelectedAgent(null)}
            />
        );
    }

    return (
        <div className="h-full flex flex-col bg-gyn-bg-primary-dark text-gyn-text-primary-dark p-4">
            <header className="flex justify-between items-center mb-4 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-gyn-text-secondary-dark">C2 Control Panel</h1>
                    <p className="text-sm text-gyn-text-primary-dark/70">Live agent monitoring and interaction</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsSettingsModalOpen(true)}
                        className="flex items-center justify-center w-10 h-10 bg-gyn-bg-tertiary-dark text-gyn-text-secondary-dark rounded-md hover:bg-gyn-border-secondary-dark transition-all duration-300"
                        title="Settings"
                    >
                        <Cog6ToothIcon className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => setIsPayloadModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-gyn-accent-dark text-gyn-sidebar-dark font-bold rounded-md hover:bg-opacity-80 transition-all duration-300"
                    >
                        <PlusCircleIcon className="w-5 h-5" />
                        Generate Payload
                    </button>
                </div>
            </header>
            <DashboardView 
                agents={agents}
                onSelectAgent={setSelectedAgent}
            />
            {isPayloadModalOpen && (
                <PayloadGeneratorModal 
                    c2Url={c2Url} 
                    onClose={() => setIsPayloadModalOpen(false)} 
                />
            )}
            {isSettingsModalOpen && (
                <SettingsModal 
                    currentUrl={c2Url}
                    onSave={setC2Url}
                    onClose={() => setIsSettingsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default C2ControlApp;