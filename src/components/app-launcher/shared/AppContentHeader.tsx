import React from 'react';

interface Tab {
    id: string;
    label: string;
}

interface AppContentHeaderProps {
    tabs: Tab[];
    activeTab: string;
    setActiveTab: (id: string) => void;
}

const AppContentHeader: React.FC<AppContentHeaderProps> = ({ tabs, activeTab, setActiveTab }) => {
    if (!tabs || tabs.length === 0) {
        return null;
    }

    return (
        <div className="border-b-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark">
            <nav className="flex items-center -mb-0.5" aria-label="Tabs">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`py-3 px-4 text-sm font-semibold whitespace-nowrap border-b-4 transition-colors ${
                            activeTab === tab.id
                                ? 'border-gyn-accent-light dark:border-gyn-accent-dark text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark'
                                : 'border-transparent text-gyn-text-primary-light/70 dark:text-gyn-text-primary-dark/70 hover:text-gyn-text-secondary-light dark:hover:text-gyn-text-secondary-dark hover:border-gyn-border-secondary-light dark:hover:border-gyn-border-secondary-dark'
                        }`}
                        aria-current={activeTab === tab.id ? 'page' : undefined}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default AppContentHeader;
