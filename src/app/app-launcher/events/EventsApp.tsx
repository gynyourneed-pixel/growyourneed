import React, { useState, useEffect } from 'react';
import AppSubNavLeft from '../../../components/app-launcher/shared/AppSubNavLeft';
import AppContent from '../../../components/app-launcher/shared/AppContent';
import { EVENTS_HEADER_ITEMS, EVENTS_NAV_MAP } from './constants';
import { AppNavItem } from '../../../types';

interface EventsAppProps {
  onHeaderItemsChange?: (items: any[], activeTab: string, setActiveTab: (id: string) => void) => void;
}

const EventsApp: React.FC<EventsAppProps> = ({ onHeaderItemsChange }) => {
  const [activeTab, setActiveTab] = useState(EVENTS_HEADER_ITEMS[0].id);
  const [activeSubItem, setActiveSubItem] = useState('');

  useEffect(() => {
    const currentNavItems = EVENTS_NAV_MAP[activeTab] || [];
    setActiveSubItem(currentNavItems[0]?.id || '');
  }, [activeTab]);

  useEffect(() => {
    if (onHeaderItemsChange) {
      onHeaderItemsChange(EVENTS_HEADER_ITEMS, activeTab, setActiveTab);
    }
  }, [activeTab, onHeaderItemsChange]);

  const currentNavItems: AppNavItem[] = EVENTS_NAV_MAP[activeTab] || [];
  const activeSubNavData = currentNavItems.find(item => item.id === activeSubItem);
  
  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-row min-h-0 overflow-hidden">
        <AppSubNavLeft 
          items={currentNavItems} 
          activeItem={activeSubItem} 
          setActiveItem={setActiveSubItem} 
          title={EVENTS_HEADER_ITEMS.find(h => h.id === activeTab)?.label || 'Events'}
        />
        <div className="flex-1 overflow-auto">
          <AppContent 
            title={activeSubNavData?.label || 'Welcome to Events'}
            icon={activeSubNavData?.icon}
          />
        </div>
      </div>
    </div>
  );
};

export default EventsApp;
