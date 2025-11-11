import React from 'react';
import { NavItem } from '../types';

interface HeaderProps {
    items: NavItem[];
    activeTab: string;
    setActiveTab: (id: string) => void;
    isMobile?: boolean;
    isInTopBar?: boolean;
}

const Header: React.FC<HeaderProps> = ({ items, activeTab, setActiveTab, isMobile, isInTopBar }) => {
    if (items.length === 0) {
        return isInTopBar ? null : <div className="h-12 shrink-0"></div>;
    }

    // --- MOBILE VIEW ---
    if (isMobile && !isInTopBar) {
        return (
            <header className="h-12 shrink-0 flex items-center relative overflow-hidden bg-gyn-bg-secondary-light/30 dark:bg-gyn-bg-secondary-dark/30 backdrop-blur-sm">
                <div className="flex-1 w-full h-full overflow-x-auto no-scrollbar">
                    {/* nav is relative so we can place an absolute centered background behind the buttons */}
                    <nav className="inline-flex items-center h-full gap-2 px-3 relative">
                        {/* Single white background wrapper around the buttons (keeps buttons markup unchanged) */}
                        <div className="inline-flex items-center bg-white rounded-xl p-1 dark:bg-white/5 relative z-20 shadow-md">
                            {items.map(tab => (
                                <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={
                                    `h-8 px-4 rounded-md transition-all duration-300 font-bold text-xs whitespace-nowrap relative
                                    ${activeTab === tab.id
                                        ? 'bg-gyn-sidebar-light dark:bg-gyn-sidebar-dark text-gyn-sidebar-text-light dark:text-gyn-sidebar-text-dark shadow-md'
                                        : 'bg-gyn-bg-secondary-light/50 dark:bg-gyn-bg-secondary-dark/50 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark hover:bg-gyn-bg-secondary-light/80 dark:hover:bg-gyn-bg-secondary-dark/80'
                                    }`
                                }
                            >
                                {tab.label.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    </nav>
                </div>

                {/* Right fade effect */}
                <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-gyn-bg-primary-light dark:from-gyn-bg-primary-dark to-transparent pointer-events-none" />
            </header>
        );
    }

    // --- DESKTOP VIEW (in Top Bar or standalone) ---
    const navContent = (
        // make nav relative so background can be absolutely positioned behind the buttons
        <nav className={`relative flex items-center ${isInTopBar ? 'gap-2' : 'gap-1 p-2'}`} aria-label="Main navigation">
            <div className="inline-flex items-center bg-white rounded-xl p-1 dark:bg-white relative z-20 shadow-md">
            {items.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 rounded-md font-bold transition-all duration-300 whitespace-nowrap relative ${isInTopBar ? 'px-4 text-sm' : 'px-2 text-xs'} ${
                        activeTab === tab.id
                            ? 'text-gyn-sidebar-text-light dark:text-gyn-sidebar-text-dark bg-gradient-to-r from-gyn-sidebar-interactive-light to-gyn-sidebar-light dark:from-gyn-sidebar-interactive-dark dark:to-gyn-sidebar-dark shadow-lg'
                            : 'text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark hover:bg-gyn-bg-tertiary-light/50 dark:hover:bg-gyn-bg-tertiary-dark/50'
                    }`}
                >
                    {tab.label.toUpperCase()}
                    {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gyn-accent-light dark:bg-gyn-accent-dark rounded-full" />
                    )}
                </button>
            ))}
            </div>
        </nav>
    );

    if (isInTopBar) {
        // return navContent directly; background is part of nav via absolute element
        return navContent;
    }

    return (
        <header className={`h-12 shrink-0 flex items-center pl-6`}>
            {navContent}
        </header>
    );
};

export default Header;