import React from 'react';
import { Squares2x2Icon, XMarkIcon, ToggleIcon } from '../icons';
import { useAppLauncher } from '../context/AppLauncherContext';
import { AppState, AppItem } from '../types';
import { LAUNCHER_APPS } from '../lib/constants';

interface FooterProps {
    isMobile: boolean;
    isRightSidebarCollapsed: boolean;
    toggleRightSidebar: () => void;
}

// Helper component for a single minimized app icon
const MinimizedAppIcon: React.FC<{ app: AppState, index: number, restoreApp: (id: string) => void, closeApp: (id: string) => void }> = ({ app, index, restoreApp, closeApp }) => (
    <div 
        className="relative group animate-fadeInUp"
        style={{ animationDelay: `${index * 50}ms`, opacity: 0, animationFillMode: 'forwards' }}
    >
        <button
            onClick={() => restoreApp(app.id)}
            title={`Restore ${app.name}`}
            className="w-10 h-10 rounded-lg bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark flex items-center justify-center transition-transform hover:scale-110"
        >
            <app.icon className="w-6 h-6 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" />
        </button>
        <button
            onClick={(e) => {
                e.stopPropagation();
                closeApp(app.id);
            }}
            title={`Close ${app.name}`}
            aria-label={`Close ${app.name}`}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gyn-bg-error-light dark:bg-gyn-bg-error-dark text-gyn-text-error-light dark:text-gyn-text-error-dark rounded-full flex items-center justify-center border-2 border-gyn-bg-secondary-light dark:border-gyn-bg-secondary-dark opacity-0 group-hover:opacity-100 hover:!opacity-100 hover:scale-125 transition-all duration-200 z-10"
        >
            <XMarkIcon className="w-3 h-3 stroke-2" />
        </button>
    </div>
);


const Footer: React.FC<FooterProps> = ({ isMobile, isRightSidebarCollapsed, toggleRightSidebar }) => {
  const { isLauncherOpen, toggleLauncher, openApp, openApps, minimizedApps, restoreApp, closeApp } = useAppLauncher();

  const appsForLauncher = LAUNCHER_APPS.slice(0, 12);
  const leftLauncherApps = appsForLauncher.slice(0, 6);
  const rightLauncherApps = appsForLauncher.slice(6, 12);
  
  const minimizedAppStates = openApps.filter(app => minimizedApps.includes(app.id));

  const LauncherAppIcon: React.FC<{app: AppItem, index: number}> = ({ app, index }) => (
    <button
        onClick={() => openApp(app)}
        title={app.name}
        className="w-10 h-10 rounded-lg bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark flex items-center justify-center transition-transform hover:scale-110 animate-fadeInUp"
        style={{ animationDelay: `${index * 30}ms`, animationDuration: '200ms', animationFillMode: 'forwards', opacity: 0 }}
    >
        <app.icon className="w-6 h-6 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark" />
    </button>
  );

  const launcherButton = (
    <button 
        onClick={toggleLauncher}
        className={`w-12 h-12 flex items-center justify-center rounded-md bg-gyn-sidebar-light dark:bg-gyn-sidebar-dark text-gyn-sidebar-text-light dark:text-gyn-sidebar-text-dark shadow-lg hover:bg-gyn-sidebar-interactive-light dark:hover:bg-gyn-sidebar-interactive-dark transition-all duration-300 z-10 ${isLauncherOpen ? 'rotate-45' : ''}`}
        aria-label={isLauncherOpen ? "Close app launcher" : "Open app launcher"}
    >
        {isLauncherOpen ? <XMarkIcon className="w-8 h-8"/> : <Squares2x2Icon className="w-8 h-8"/>}
    </button>
  );
  
  return (
    <footer className="h-16 shrink-0 bg-gyn-bg-secondary-light/50 dark:bg-gyn-bg-secondary-dark/30 backdrop-blur-lg flex items-center justify-between px-6 rounded-b-md">
        <div className="flex-1 flex justify-start">
            {/* Future left-aligned content can go here */}
        </div>

        {/* --- CENTRAL LAUNCHER --- */}
        <div className="flex-none flex items-center justify-center gap-2">
            {isLauncherOpen && (
                <div className="flex items-center gap-2 flex-row-reverse">
                    {leftLauncherApps.map((app, i) => <LauncherAppIcon key={app.id} app={app} index={i} />)}
                </div>
            )}
            {launcherButton}
            {isLauncherOpen && (
                <div className="flex items-center gap-2">
                    {rightLauncherApps.map((app, i) => <LauncherAppIcon key={app.id} app={app} index={i} />)}
                </div>
            )}
        </div>
        
        {/* --- RIGHT-ALIGNED CONTENT (MINIMIZED APPS & TOGGLE) --- */}
        <div className="flex-1 flex justify-end items-center gap-2">
             {!isLauncherOpen && minimizedAppStates.length > 0 && (
                <div className="flex items-center gap-2">
                    {minimizedAppStates.map((app, i) => (
                        <MinimizedAppIcon key={app.id} app={app} index={i} restoreApp={restoreApp} closeApp={closeApp} />
                    ))}
                </div>
            )}

            {isMobile && (
                <button onClick={toggleRightSidebar}>
                    <ToggleIcon className={`w-10 h-auto transition-transform duration-300 ${!isRightSidebarCollapsed ? 'rotate-180' : ''}`} />
                </button>
            )}
        </div>
    </footer>
  );
};

export default Footer;