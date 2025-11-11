import React from 'react';
import { AppHeaderItem } from '../../../types';

interface AppHeaderProps {
    items: AppHeaderItem[];
    activeTab: string;
    setActiveTab: (id: string) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ items, activeTab, setActiveTab }) => (
    <nav className="flex items-center gap-1 p-2 bg-gyn-bg-secondary-light/30 dark:bg-gyn-bg-secondary-dark/20 backdrop-blur-md rounded-md">
        {items.map(tab => (
            <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-1.5 px-4 rounded-md font-bold text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id 
                    ? 'bg-gyn-sidebar-light dark:bg-gyn-sidebar-dark text-gyn-sidebar-text-light dark:text-gyn-sidebar-text-dark' 
                    : 'text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark hover:bg-gyn-bg-tertiary-light/50 dark:hover:bg-gyn-bg-tertiary-dark/50'
                }`}
            >
                {tab.label}
            </button>
        ))}
    </nav>
);

export default AppHeader;