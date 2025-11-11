import React, { useState } from 'react';
import { AppNavItem } from '../../../types';
import useMediaQuery from '../../../hooks/useMediaQuery';

interface AppSubNavLeftProps {
    items: AppNavItem[];
    activeItem: string;
    setActiveItem: (id: string) => void;
    title: string;
}

const AppSubNavLeft: React.FC<AppSubNavLeftProps> = ({ items, activeItem, setActiveItem, title }) => {
    const isMobile = useMediaQuery('(max-width: 767px)');
    const [pulsingItemId, setPulsingItemId] = useState<string | null>(null);

    const handleItemClick = (id: string) => {
        if (id === activeItem) return;

        setPulsingItemId(id);

        setTimeout(() => {
            setActiveItem(id);
            setPulsingItemId(null);
        }, 300);
    };

    const sidebarWidth = isMobile ? 'w-20' : 'w-24';
    const buttonSize = isMobile ? 'w-16 h-16' : 'w-20 h-20';
    const iconSize = isMobile ? 'w-6 h-6' : 'w-8 h-8';
    const textSize = isMobile ? 'text-[10px]' : 'text-xs';

    return (
        <aside className={`shrink-0 bg-gyn-bg-secondary-light/30 dark:bg-gyn-bg-secondary-dark/20 backdrop-blur-md flex flex-col justify-start relative transition-all duration-300 border border-gyn-border-primary-light/50 dark:border-gyn-border-primary-dark/50 rounded-lg mt-3 ml-3 mb-3 ${sidebarWidth}`}>
            {/* Navigation Items */}
            <div className="flex-1 flex flex-col items-center justify-start gap-4 pt-4 pb-4 overflow-y-auto no-scrollbar">
                {items.map(item => (
                    <div key={item.id} className="relative w-full flex justify-center">
                        <button
                            onClick={() => handleItemClick(item.id)}
                            className={`flex flex-col items-center justify-center gap-1 rounded-lg transition-all duration-200 relative group ${buttonSize}
                              ${activeItem === item.id
                                    ? 'bg-gyn-accent-light/10 dark:bg-gyn-accent-dark/10'
                                    : 'bg-transparent hover:bg-gyn-bg-secondary-light/50 dark:hover:bg-gyn-bg-secondary-dark/50'
                                } 
                              ${pulsingItemId === item.id ? 'animate-click-pulse' : ''}`
                            }
                        >
                            {/* Active/Hover Indicator */}
                            <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-3/4 w-1 bg-gyn-accent-light dark:bg-gyn-accent-dark rounded-r-full transition-all duration-300 shadow-[0_0_8px_var(--tw-shadow-color)] shadow-gyn-accent-light dark:shadow-gyn-accent-dark ${activeItem === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                                }`}></div>

                            <item.icon className={`transition-all duration-200 ${iconSize} ${activeItem === item.id ? 'text-gyn-accent-light dark:text-gyn-accent-dark' : 'text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark'}`} />
                            <span className={`${textSize} font-bold text-center px-1 leading-tight ${activeItem === item.id ? 'text-gyn-accent-light dark:text-gyn-accent-dark' : 'text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark'}`}>
                                {item.label}
                            </span>
                        </button>
                    </div>
                ))}
            </div>
        </aside>
    );
};

export default AppSubNavLeft;