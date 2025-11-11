import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { AppItem, AppState } from '../types';

interface AppLauncherContextType {
  openApps: AppState[];
  minimizedApps: string[];
  activeAppId: string | null;
  isLauncherOpen: boolean;
  closingApps: string[];
  openApp: (app: AppItem) => void;
  closeApp: (appId: string) => void;
  minimizeApp: (appId: string) => void;
  restoreApp: (appId: string) => void;
  setActiveApp: (appId: string) => void;
  toggleLauncher: () => void;
}

const AppLauncherContext = createContext<AppLauncherContextType | undefined>(undefined);

export const AppLauncherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openApps, setOpenApps] = useState<AppState[]>([]);
  const [minimizedApps, setMinimizedApps] = useState<string[]>([]);
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [closingApps, setClosingApps] = useState<string[]>([]);

  const toggleLauncher = useCallback(() => {
    setIsLauncherOpen(prev => !prev);
  }, []);

  const openApp = useCallback((app: AppItem) => {
    // Ensure the app is in the open list. If not, add it.
    if (!openApps.some(a => a.id === app.id)) {
      const newApp: AppState = { id: app.id, name: app.name, icon: app.icon };
      setOpenApps(prev => [...prev, newApp]);
    }

    // When opening an app, it should be active and not minimized.
    // Remove from minimized list (in case it was there).
    setMinimizedApps(prev => prev.filter(id => id !== app.id));
    
    // Set it as the active app to bring it to the front.
    setActiveAppId(app.id);
    
    // Close the launcher after selection.
    setIsLauncherOpen(false);
  }, [openApps]);

  const closeApp = useCallback((appId: string) => {
    if (closingApps.includes(appId)) return;

    // When an app is closed, go back to the dashboard view.
    if (activeAppId === appId) {
      setActiveAppId(null);
    }
    
    setClosingApps(prev => [...prev, appId]);

    setTimeout(() => {
      setOpenApps(prev => prev.filter(app => app.id !== appId));
      setMinimizedApps(prev => prev.filter(id => id !== appId));
      setClosingApps(prev => prev.filter(id => id !== appId));
    }, 300); // Corresponds to animation duration
  }, [activeAppId, closingApps]);

  const minimizeApp = useCallback((appId: string) => {
    setMinimizedApps(prev => {
        if (prev.includes(appId)) {
            return prev;
        }
        return [...prev, appId];
    });
    // When an app is minimized, go back to the dashboard view.
    if (activeAppId === appId) {
        setActiveAppId(null);
    }
  }, [activeAppId]);

  const restoreApp = useCallback((appId: string) => {
    setMinimizedApps(prev => prev.filter(id => id !== appId));
    setActiveAppId(appId);
  }, []);

  const setActiveApp = useCallback((appId: string) => {
    // Only set active if it's not minimized. This brings an overlay to the front.
    if (!minimizedApps.includes(appId)) {
        setActiveAppId(appId);
    }
  }, [minimizedApps]);

  return (
    <AppLauncherContext.Provider value={{
      openApps,
      minimizedApps,
      activeAppId,
      isLauncherOpen,
      closingApps,
      openApp,
      closeApp,
      minimizeApp,
      restoreApp,
      setActiveApp,
      toggleLauncher,
    }}>
      {children}
    </AppLauncherContext.Provider>
  );
};

export const useAppLauncher = (): AppLauncherContextType => {
  const context = useContext(AppLauncherContext);
  if (context === undefined) {
    throw new Error('useAppLauncher must be used within an AppLauncherProvider');
  }
  return context;
};