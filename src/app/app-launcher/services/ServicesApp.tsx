import React, { useState, useEffect } from 'react';
import AppSubNavLeft from '../../../components/app-launcher/shared/AppSubNavLeft';
import AppContent from '../../../components/app-launcher/shared/AppContent';
import { SERVICES_HEADER_ITEMS, SERVICES_NAV_MAP } from './constants';
import { AppNavItem } from '../../../types';

interface ServicesAppProps {
  onHeaderItemsChange?: (items: any[], activeTab: string, setActiveTab: (id: string) => void) => void;
}

const ServicesApp: React.FC<ServicesAppProps> = ({ onHeaderItemsChange }) => {
  const [activeTab, setActiveTab] = useState(SERVICES_HEADER_ITEMS[0].id);
  const [activeSubItem, setActiveSubItem] = useState('');

  useEffect(() => {
    const currentNavItems = SERVICES_NAV_MAP[activeTab] || [];
    setActiveSubItem(currentNavItems[0]?.id || '');
  }, [activeTab]);

  useEffect(() => {
    if (onHeaderItemsChange) {
      onHeaderItemsChange(SERVICES_HEADER_ITEMS, activeTab, setActiveTab);
    }
  }, [activeTab, onHeaderItemsChange]);

  const currentNavItems: AppNavItem[] = SERVICES_NAV_MAP[activeTab] || [];
  const activeSubNavData = currentNavItems.find(item => item.id === activeSubItem);
  
  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-row min-h-0 overflow-hidden">
        <AppSubNavLeft 
          items={currentNavItems} 
          activeItem={activeSubItem} 
          setActiveItem={setActiveSubItem} 
          title={SERVICES_HEADER_ITEMS.find(h => h.id === activeTab)?.label || 'Services'}
        />
        <div className="flex-1 overflow-auto">
          <AppContent 
            title={activeSubNavData?.label || 'Welcome to Services'}
            icon={activeSubNavData?.icon}
          />
        </div>
      </div>
    </div>
  );
};

export default ServicesApp;
