import React, { useState, useEffect } from 'react';
import AppSubNavLeft from '../../../components/app-launcher/shared/AppSubNavLeft';
import AppContent from '../../../components/app-launcher/shared/AppContent';
import { SETTINGS_HEADER_ITEMS, SETTINGS_NAV_MAP } from './constants';
import { AppNavItem } from '../../../types';

// Import all the new backend setting views
import MarketplaceSettingsView from './views/backend/MarketplaceSettingsView';
import CalendarSettingsView from './views/backend/CalendarSettingsView';
import StudioSettingsView from './views/backend/StudioSettingsView';
import MessagingSettingsView from './views/backend/MessagingSettingsView';
import MediaSettingsView from './views/backend/MediaSettingsView';
import HobbiesSettingsView from './views/backend/HobbiesSettingsView';
import ReligionSettingsView from './views/backend/ReligionSettingsView';
import SportSettingsView from './views/backend/SportSettingsView';
import EventsSettingsView from './views/backend/EventsSettingsView';
import ServicesSettingsView from './views/backend/ServicesSettingsView';
import GamificationSettingsView from './views/backend/GamificationSettingsView';
import HelpSettingsView from './views/backend/HelpSettingsView';

// Map sub-navigation IDs to their corresponding view components
const backendViews: { [key: string]: React.ComponentType } = {
    marketplace: MarketplaceSettingsView,
    calendar: CalendarSettingsView,
    studio: StudioSettingsView,
    messaging: MessagingSettingsView,
    media: MediaSettingsView,
    hobbies: HobbiesSettingsView,
    religion: ReligionSettingsView,
    sport: SportSettingsView,
    events: EventsSettingsView,
    services: ServicesSettingsView,
    gamification: GamificationSettingsView,
    help: HelpSettingsView,
};

interface SettingsAppProps {
  onHeaderItemsChange?: (items: any[], activeTab: string, setActiveTab: (id: string) => void) => void;
}

const SettingsApp: React.FC<SettingsAppProps> = ({ onHeaderItemsChange }) => {
  const [activeTab, setActiveTab] = useState(SETTINGS_HEADER_ITEMS[0].id);
  const [activeSubItem, setActiveSubItem] = useState('');

  useEffect(() => {
    const currentNavItems = SETTINGS_NAV_MAP[activeTab] || [];
    setActiveSubItem(currentNavItems[0]?.id || '');
  }, [activeTab]);

  useEffect(() => {
    if (onHeaderItemsChange) {
      onHeaderItemsChange(SETTINGS_HEADER_ITEMS, activeTab, setActiveTab);
    }
  }, [activeTab, onHeaderItemsChange]);

  const currentNavItems: AppNavItem[] = SETTINGS_NAV_MAP[activeTab] || [];
  const activeSubNavData = currentNavItems.find(item => item.id === activeSubItem);

  const renderContent = () => {
    if (activeTab === 'backend') {
      const ViewComponent = backendViews[activeSubItem];
      if (ViewComponent) {
        return <ViewComponent />;
      }
    }
    
    // Fallback to the generic content view
    return (
       <AppContent 
            title={activeSubNavData?.label || 'Welcome to Settings'}
            description={`Manage ${activeSubNavData?.label.toLowerCase()} here.`}
            icon={activeSubNavData?.icon}
        />
    );
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-row min-h-0 overflow-hidden">
        <AppSubNavLeft 
          items={currentNavItems} 
          activeItem={activeSubItem} 
          setActiveItem={setActiveSubItem} 
          title={SETTINGS_HEADER_ITEMS.find(h => h.id === activeTab)?.label || 'Settings'}
        />
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;
