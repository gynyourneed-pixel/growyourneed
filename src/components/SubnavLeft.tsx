
import React, { useState } from 'react';
import { ToggleIcon } from '../icons';
import { NavItem } from '../types';

interface SidebarLeftProps {
    items: NavItem[];
    activeItem: string;
    setActiveItem: (id: string) => void;
    isCollapsed: boolean;
    toggleSidebar: () => void;
    isMobile?: boolean;
}

const SidebarLeft: React.FC<SidebarLeftProps> = ({ items, activeItem, setActiveItem, isCollapsed, toggleSidebar, isMobile }) => {
  if (items.length === 0) {
    return null;
  }
  
  const [pulsingItemId, setPulsingItemId] = useState<string | null>(null);

  const handleItemClick = (id: string) => {
    if (id === activeItem) return;

    setPulsingItemId(id);

    setTimeout(() => {
        setActiveItem(id);
        setPulsingItemId(null);
    }, 300);
  };
    
  const expandedWidth = isMobile ? 'w-20' : 'w-24';
  const buttonSize = isMobile ? 'w-16 h-16' : 'w-20 h-20';
  const iconSize = isMobile ? 'w-6 h-6' : 'w-8 h-8';
  const textSize = isMobile ? 'text-[10px]' : 'text-xs';


  return (
    <aside className={`shrink-0 bg-gyn-bg-secondary-light/30 dark:bg-gyn-bg-secondary-dark/20 backdrop-blur-md rounded-bl-md ${isMobile ? 'rounded-tr-md' : ''} flex flex-col justify-between relative transition-all duration-300 border-r border-gyn-border-primary-light/50 dark:border-gyn-border-primary-dark/50 ${isCollapsed ? 'w-10' : expandedWidth} ${!isMobile ? 'mr-4' : ''}`}>
        
        <div className="flex flex-col items-center justify-start gap-4 pt-4 pb-4">
            {items.map(item => (
                <div key={item.id} className="relative w-full flex justify-center">
                    {item.icon && (
                        <button
                            onClick={() => handleItemClick(item.id)}
                            title={isCollapsed ? item.label : undefined}
                            className={`flex flex-col items-center justify-center gap-1 rounded-lg transition-all duration-200 relative group
                              ${isCollapsed ? `w-10 h-10` : buttonSize} 
                              ${activeItem === item.id
                                ? `bg-gyn-accent-light/10 dark:bg-gyn-accent-dark/10`
                                : `bg-transparent hover:bg-gyn-bg-secondary-light/50 dark:hover:bg-gyn-bg-secondary-dark/50`
                              } 
                              ${pulsingItemId === item.id ? 'animate-click-pulse' : ''}`
                            }
                        >
                            {/* Active/Hover Indicator */}
                            <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-3/4 w-1 bg-gyn-accent-light dark:bg-gyn-accent-dark rounded-r-full transition-all duration-300 shadow-[0_0_8px_var(--tw-shadow-color)] shadow-gyn-accent-light dark:shadow-gyn-accent-dark ${activeItem === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}></div>

                            <item.icon className={`transition-all duration-200 ${isCollapsed ? 'w-6 h-6' : iconSize} ${activeItem === item.id ? 'text-gyn-accent-light dark:text-gyn-accent-dark' : 'text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark'}`} />
                            {!isCollapsed && (
                                <span className={`${textSize} font-bold text-center px-1 ${activeItem === item.id ? 'text-gyn-accent-light dark:text-gyn-accent-dark' : 'text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark'}`}>{item.label}</span>
                            )}
                        </button>
                    )}
                </div>
            ))}
        </div>
        
        {/* Bottom container for toggle button */}
        <div className={`shrink-0 flex items-center justify-center py-4 ${isCollapsed ? 'border-none' : 'border-t-2 border-gyn-tan'}`}>
            <button onClick={toggleSidebar}>
                <ToggleIcon className={`w-10 h-auto transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
            </button>
        </div>
    </aside>
  );
};

export default SidebarLeft;