import React from 'react';
import { Agent } from '../../../../types';
import { ComputerDesktopIcon, WindowIcon } from '../../../../icons';

const getOSIcon = (os: Agent['os']) => {
    switch (os) {
        case 'windows':
            return <WindowIcon className="w-5 h-5 text-sky-400" />;
        case 'linux':
            return <ComputerDesktopIcon className="w-5 h-5 text-amber-400" />;
        case 'macos':
            return <ComputerDesktopIcon className="w-5 h-5 text-gray-400" />;
        default:
            return <ComputerDesktopIcon className="w-5 h-5" />;
    }
};

const TimeAgo: React.FC<{ timestamp: number }> = ({ timestamp }) => {
    const [timeString, setTimeString] = React.useState('');
    
    React.useEffect(() => {
        const update = () => {
            const seconds = Math.floor((Date.now() - timestamp) / 1000);
            let interval = seconds / 31536000;
            if (interval > 1) {
                setTimeString(`${Math.floor(interval)} years ago`);
                return;
            }
            interval = seconds / 2592000;
            if (interval > 1) {
                setTimeString(`${Math.floor(interval)} months ago`);
                 return;
            }
            interval = seconds / 86400;
            if (interval > 1) {
                setTimeString(`${Math.floor(interval)} days ago`);
                 return;
            }
            interval = seconds / 3600;
            if (interval > 1) {
                setTimeString(`${Math.floor(interval)} hours ago`);
                 return;
            }
            interval = seconds / 60;
            if (interval > 1) {
                setTimeString(`${Math.floor(interval)} minutes ago`);
                 return;
            }
            setTimeString(`${Math.floor(seconds)} seconds ago`);
        }
        update();
        const timer = setInterval(update, 5000); // update every 5 seconds
        return () => clearInterval(timer);
    }, [timestamp]);

    return <span>{timeString}</span>;
}


interface DashboardViewProps {
    agents: Agent[];
    onSelectAgent: (agent: Agent) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ agents, onSelectAgent }) => {
    return (
        <div className="flex-1 overflow-y-auto no-scrollbar rounded-lg bg-gyn-bg-secondary-dark/50 border border-gyn-border-primary-dark">
            <table className="w-full text-left text-sm text-gyn-text-primary-dark">
                <thead className="text-xs uppercase bg-gyn-bg-tertiary-dark/30 text-gyn-text-primary-dark/80 sticky top-0">
                    <tr>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">OS</th>
                        <th scope="col" className="px-6 py-3">Hostname</th>
                        <th scope="col" className="px-6 py-3">IP Address</th>
                        <th scope="col" className="px-6 py-3">Last Seen</th>
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {agents.map(agent => (
                        <tr key={agent.id} className="border-b border-gyn-border-primary-dark hover:bg-gyn-bg-tertiary-dark/20">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <span className={`h-2 w-2 rounded-full ${agent.status === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                                    <span>{agent.status}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div title={agent.os} className="flex items-center">
                                    {getOSIcon(agent.os)}
                                    <span className="ml-2 capitalize">{agent.os}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-mono">{agent.hostname}</td>
                            <td className="px-6 py-4 font-mono">{agent.ip}</td>
                            <td className="px-6 py-4"><TimeAgo timestamp={agent.lastSeen} /></td>
                            <td className="px-6 py-4 text-right">
                                {agent.status === 'online' && (
                                     <button 
                                        onClick={() => onSelectAgent(agent)}
                                        className="font-medium text-gyn-accent-dark hover:underline"
                                    >
                                        Interact
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DashboardView;
