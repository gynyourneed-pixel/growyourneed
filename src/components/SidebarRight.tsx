import React from 'react';
import { ToggleIcon } from '../icons';
import { RIGHT_NAV_ITEMS } from '../lib/constants';
import { RightNavItemId, UserData } from '../types';
import { useAppLauncher } from '../context/AppLauncherContext';

interface SidebarRightProps {
    activeItem: RightNavItemId;
    setActiveItem: (id: RightNavItemId) => void;
    isCollapsed: boolean;
    toggleSidebar: () => void;
    isMobile: boolean;
    user: UserData;
}

const Divider: React.FC = () => (
    <div className="w-full h-px bg-gyn-sidebar-interactive-light/50 dark:bg-gyn-sidebar-interactive-dark/50 relative my-2">
        <div className="absolute left-1/2 -translate-x-1/2 -top-1 w-2 h-2 rounded-full bg-gyn-sidebar-interactive-light dark:bg-gyn-sidebar-interactive-dark" style={{boxShadow: '0 0 5px rgb(var(--gyn-accent))'}}></div>
    </div>
);

const DiamondDividerSVG: React.FC<{
    lineClassName?: string;
    diamondFillClassName?: string;
    diamondStrokeClassName?: string;
    className?: string;
}> = ({ lineClassName, diamondFillClassName, diamondStrokeClassName, className }) => (
    <svg width="50" height="7" viewBox="0 0 50 7" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M2 3.5H18.5" className={lineClassName} />
        <path d="M48 3.5H31.5" className={lineClassName} />
        <path d="M25 0.5L20.5 3.5L25 6.5L29.5 3.5L25 0.5Z" className={`${diamondFillClassName} ${diamondStrokeClassName}`} />
    </svg>
);


const SidebarRight: React.FC<SidebarRightProps> = ({ activeItem, setActiveItem, isCollapsed, toggleSidebar, isMobile, user }) => {
  const { openApps, minimizedApps } = useAppLauncher();
  const isAppVisible = openApps.some(app => !minimizedApps.includes(app.id));

  if (isAppVisible) {
    return null;
  }

  if (isMobile && isCollapsed) {
    return null; // Don't render anything if collapsed on mobile, controlled by footer toggle
  }

  const handleItemClick = (id: RightNavItemId) => {
    setActiveItem(id);
    if (isMobile) {
        // Auto-close overlay on selection in mobile view
        toggleSidebar();
    }
  }

  const divider = <DiamondDividerSVG
      className="my-1"
      lineClassName="stroke-gyn-sidebar-interactive-light/50 dark:stroke-gyn-sidebar-interactive-dark/50"
      diamondFillClassName="fill-gyn-accent-light dark:fill-gyn-accent-dark"
      diamondStrokeClassName="stroke-gyn-border-primary-light/50 dark:stroke-gyn-border-primary-dark/50"
    />;

  // Mobile Overlay View
  if (isMobile) {
    return (
        <aside className="fixed w-20 rounded-md bottom-20 right-5 flex flex-col bg-gyn-sidebar-light/80 dark:bg-gyn-sidebar-dark/80 backdrop-blur-md text-gyn-sidebar-text-light dark:text-gyn-sidebar-text-dark transition-all duration-300 ease-in-out z-40 shadow-2xl border border-gyn-sidebar-interactive-light/50 dark:border-gyn-sidebar-interactive-dark/50">
            <nav className="flex flex-col items-center py-2">
                {RIGHT_NAV_ITEMS.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <button 
                            onClick={() => handleItemClick(item.id)}
                            className={`w-16 h-16 flex flex-col items-center justify-center gap-1 rounded-lg transition-all duration-300 p-1 relative overflow-hidden ${
                                activeItem === item.id 
                                ? 'bg-gradient-to-br from-gyn-tan to-gyn-accent-light dark:to-gyn-accent-dark shadow-[0_0_15px_2px_rgba(251,191,36,0.6)] border border-gyn-accent-light/50 dark:border-gyn-accent-dark/50'
                                : 'hover:bg-gyn-sidebar-interactive-light/50 dark:hover:bg-gyn-sidebar-interactive-dark/50'
                            }`}
                            title={item.label}
                        >
                            <item.icon className={`w-6 h-6 transition-colors duration-300 ${activeItem === item.id ? 'text-gyn-blue-dark' : 'text-gyn-accent-light dark:text-gyn-accent-dark'}`} />
                            <span className={`text-[10px] font-bold text-center ${activeItem === item.id ? 'text-gyn-blue-dark' : 'text-gyn-sidebar-text-light dark:text-gyn-sidebar-text-dark'}`}>{item.label}</span>
                        </button>
                        {index < RIGHT_NAV_ITEMS.length - 1 && divider}
                    </React.Fragment>
                ))}
            </nav>
        </aside>
    );
  }

  // Desktop View
  return (
      <aside className={`shrink-0 rounded-r-md flex flex-col bg-gyn-sidebar-light/80 dark:bg-gyn-sidebar-dark/80 backdrop-blur-md text-gyn-sidebar-text-light dark:text-gyn-sidebar-text-dark transition-all duration-300 ease-in-out z-40 ${isCollapsed ? 'w-24' : 'w-64'}`}>
        <div className={`flex items-center gap-3 p-3 border-b border-gyn-sidebar-interactive-light dark:border-gyn-sidebar-interactive-dark transition-all duration-300 justify-center ${isCollapsed ? 'opacity-0 h-0 p-0 border-none' : 'opacity-100'}`}>
            <img src={user.avatarUrl.large} alt={user.name} className="w-12 h-12 rounded-full border-2 border-gyn-accent-light dark:border-gyn-accent-dark" />
            {!isCollapsed && (
              <div>
                  <p className="font-bold whitespace-nowrap">{user.name}</p>
                  <p className="text-xs text-gyn-sidebar-text-light/70 dark:text-gyn-sidebar-text-dark/70 whitespace-nowrap">{user.role}</p>
              </div>
            )}
        </div>

        <div className="flex-1 flex flex-col pt-4 overflow-hidden">
             <div className={`px-3 pb-4 transition-opacity duration-300 text-center ${isCollapsed ? 'opacity-0 h-0 p-0' : 'opacity-100'}`}>
                <p className="text-xs font-bold tracking-wider text-gyn-sidebar-text-light/50 dark:text-gyn-sidebar-text-dark/50 whitespace-nowrap">MAIN MENU</p>
             </div>

             <nav className={`flex flex-col px-2 ${isCollapsed ? 'items-center mt-4' : 'gap-1'}`}>
                {RIGHT_NAV_ITEMS.map((item, index) => (
                    <React.Fragment key={item.id}>
                        {isCollapsed ? (
                            <>
                                <button
                                    onClick={() => handleItemClick(item.id)}
                                    className={`w-20 h-20 flex flex-col items-center justify-center gap-1 p-1 rounded-lg transition-colors ${
                                        activeItem === item.id 
                                        ? 'bg-gyn-sidebar-interactive-light dark:bg-gyn-sidebar-interactive-dark'
                                        : 'hover:bg-gyn-sidebar-interactive-light/50 dark:hover:bg-gyn-sidebar-interactive-dark/50'
                                    }`}
                                    title={item.label}
                                >
                                    <item.icon className="w-8 h-8 text-gyn-accent-light dark:text-gyn-accent-dark" />
                                    <span className="text-xs font-semibold text-center text-gyn-sidebar-text-light dark:text-gyn-sidebar-text-dark">{item.label}</span>
                                </button>
                                {index < RIGHT_NAV_ITEMS.length - 1 && divider}
                            </>
                        ) : (
                            <>
                                <button 
                                    onClick={() => handleItemClick(item.id)}
                                    className={`w-full flex items-center p-3 rounded-md transition-colors justify-between ${
                                        activeItem === item.id 
                                        ? 'bg-gyn-sidebar-interactive-light dark:bg-gyn-sidebar-interactive-dark'
                                        : 'hover:bg-gyn-sidebar-interactive-light/50 dark:hover:bg-gyn-sidebar-interactive-dark/50'
                                    }`}
                                    title={item.label}
                                >
                                    <span className="font-semibold">{item.label}</span>
                                    <div className="flex items-center gap-2">
                                        {activeItem === item.id && <div aria-hidden="true" className="w-5 h-5 rounded-md bg-white/20 text-gyn-accent-light dark:text-gyn-accent-dark flex items-center justify-center text-xs font-bold">X</div>}
                                        <item.icon className="w-6 h-6 text-gyn-accent-light dark:text-gyn-accent-dark" />
                                    </div>
                                </button>
                                <Divider />
                            </>
                        )}
                    </React.Fragment>
                ))}
             </nav>
        </div>
        
        <div className="shrink-0 flex items-center justify-center py-2">
            <button onClick={toggleSidebar}>
                <ToggleIcon className={`w-10 h-auto transition-transform duration-300 ${!isCollapsed ? 'rotate-180' : ''}`} />
            </button>
        </div>
      </aside>
  );
};

export default SidebarRight;