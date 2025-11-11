import React, { useState } from 'react';
import { XMarkIcon, Cog6ToothIcon } from '../../../../icons';

interface SettingsModalProps {
    currentUrl: string;
    onSave: (newUrl: string) => void;
    onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ currentUrl, onSave, onClose }) => {
    const [url, setUrl] = useState(currentUrl);

    const handleSave = () => {
        onSave(url);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="bg-gyn-bg-tertiary-dark w-full max-w-lg rounded-lg shadow-2xl flex flex-col animate-scaleIn border border-gyn-border-primary-dark"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-gyn-border-primary-dark shrink-0">
                    <div className="flex items-center gap-2">
                         <Cog6ToothIcon className="w-6 h-6 text-gyn-text-secondary-dark" />
                        <h2 className="text-lg font-bold text-gyn-text-secondary-dark">C2 Server Settings</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gyn-bg-secondary-dark">
                        <XMarkIcon className="w-6 h-6 text-gyn-text-primary-dark" />
                    </button>
                </header>
                <div className="p-6 text-gyn-text-primary-dark">
                    <p className="text-sm mb-4">
                        Configure the WebSocket URL for your Command & Control server. Payloads will be generated to connect to this address.
                    </p>
                    <div>
                        <label htmlFor="c2-url" className="block text-sm font-medium text-gyn-text-primary-dark mb-1">
                            Server URL
                        </label>
                        <input
                            id="c2-url"
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="e.g., wss://your-c2-server.com/ws"
                            className="w-full px-3 py-2 rounded-md border-2 border-gyn-border-secondary-dark bg-gyn-bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-gyn-accent-dark focus:border-gyn-accent-dark text-gyn-text-secondary-dark placeholder-gyn-text-primary-dark/70"
                        />
                    </div>
                </div>
                <footer className="flex justify-end gap-3 p-4 bg-gyn-bg-secondary-dark/50 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gyn-bg-tertiary-dark text-gyn-text-primary-dark rounded-md hover:bg-gyn-border-secondary-dark"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-gyn-accent-dark text-gyn-sidebar-dark font-bold rounded-md hover:bg-opacity-80 transition-colors"
                    >
                        Save Settings
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default SettingsModal;