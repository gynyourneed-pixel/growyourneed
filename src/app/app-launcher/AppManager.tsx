
import React from 'react';
import { useAppLauncher } from '../../context/AppLauncherContext';
import AppOverlay from '../../components/app-launcher/AppOverlay';
import CreativeStudioApp from './creative-studio/CreativeStudioApp';
import ActivitiesApp from './activities/ActivitiesApp';
import EventsApp from './events/EventsApp';
import GamificationApp from './gamification/GamificationApp';
import HelpCenterApp from './help-center/HelpCenterApp';
import IslamApp from './islam/IslamApp';
import MarketApp from './market/MarketApp';
import MediaApp from './media/MediaApp';
import MessagingApp from './messaging/MessagingApp';
import ServicesApp from './services/ServicesApp';
import SettingsApp from './settings/SettingsApp';
import SportApp from './sport/SportApp';
import TravelTransportApp from './travel-transport/TravelTransportApp';
import C2ControlApp from './c2-control/C2ControlApp';

const appComponents: { [key: string]: React.ComponentType } = {
  'creator-studio': CreativeStudioApp,
  'settings': SettingsApp,
  'messaging': MessagingApp,
  'media': MediaApp,
  'help-center': HelpCenterApp,
  'activities': ActivitiesApp,
  'islam': IslamApp,
  'sport': SportApp,
  'events': EventsApp,
  'market': MarketApp,
  'services': ServicesApp,
  'gamification': GamificationApp,
  'travel-transport': TravelTransportApp,
  'c2-control': C2ControlApp,
};

const AppManager: React.FC = () => {
    const { 
        openApps, 
        minimizedApps, 
        activeAppId, 
        closeApp, 
        minimizeApp,
        setActiveApp,
        closingApps
    } = useAppLauncher();

    const [appHeaderStates, setAppHeaderStates] = React.useState<{ [key: string]: { items: any[], activeTab: string, setActiveTab: (id: string) => void } }>({});

    const handleHeaderItemsChange = React.useCallback((appId: string) => {
        return (items: any[], activeTab: string, setActiveTab: (id: string) => void) => {
            setAppHeaderStates(prev => ({
                ...prev,
                [appId]: { items, activeTab, setActiveTab }
            }));
        };
    }, []);

    return (
        <>
            {/* Render non-minimized, open apps. The active one will have a higher z-index. */}
            {openApps.filter(app => !minimizedApps.includes(app.id)).map(app => {
                 const AppToRender = appComponents[app.id];
                 if (!AppToRender) return null;

                 const isClosing = closingApps.includes(app.id);
                 const headerState = appHeaderStates[app.id];
                 
                 return (
                    <div 
                        key={app.id} 
                        onMouseDown={() => {
                            if (!isClosing) setActiveApp(app.id);
                        }} 
                        className={`absolute inset-0 ${isClosing ? 'animate-scaleOut' : 'animate-scaleIn'}`}
                        style={{ animationDuration: '300ms', pointerEvents: isClosing ? 'none' : 'auto' }}
                    >
                         <AppOverlay
                            app={app}
                            isActive={app.id === activeAppId && !isClosing}
                            onClose={() => closeApp(app.id)}
                            onMinimize={() => minimizeApp(app.id)}
                            headerItems={headerState?.items}
                            activeHeaderTab={headerState?.activeTab}
                            onHeaderTabChange={headerState?.setActiveTab}
                        >
                           <AppToRender onHeaderItemsChange={handleHeaderItemsChange(app.id)} />
                        </AppOverlay>
                    </div>
                 )
            })}
        </>
    )
}

export default AppManager;
