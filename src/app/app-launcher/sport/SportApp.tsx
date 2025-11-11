import React, { useState, useEffect } from 'react';
import AppSubNavLeft from '../../../components/app-launcher/shared/AppSubNavLeft';
import AppContent from '../../../components/app-launcher/shared/AppContent';
import { SPORT_HEADER_ITEMS, SPORT_NAV_MAP } from './constants';
import { AppNavItem } from '../../../types';

interface SportAppProps {
  onHeaderItemsChange?: (items: any[], activeTab: string, setActiveTab: (id: string) => void) => void;
}

const SportApp: React.FC<SportAppProps> = ({ onHeaderItemsChange }) => {
  const [activeTab, setActiveTab] = useState(SPORT_HEADER_ITEMS[0].id);
  const [activeSubItem, setActiveSubItem] = useState('');

  useEffect(() => {
    const currentNavItems = SPORT_NAV_MAP[activeTab] || [];
    setActiveSubItem(currentNavItems[0]?.id || '');
  }, [activeTab]);

  useEffect(() => {
    if (onHeaderItemsChange) {
      onHeaderItemsChange(SPORT_HEADER_ITEMS, activeTab, setActiveTab);
    }
  }, [activeTab, onHeaderItemsChange]);

  const currentNavItems: AppNavItem[] = SPORT_NAV_MAP[activeTab] || [];
  const activeSubNavData = currentNavItems.find(item => item.id === activeSubItem);
  
  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-row min-h-0 overflow-hidden">
        <AppSubNavLeft 
          items={currentNavItems} 
          activeItem={activeSubItem} 
          setActiveItem={setActiveSubItem} 
          title={SPORT_HEADER_ITEMS.find(h => h.id === activeTab)?.label || 'Sport'}
        />
        <div className="flex-1 overflow-auto">
          <AppContent 
            title={activeSubNavData?.label || 'Welcome to Sport'}
            icon={activeSubNavData?.icon}
          />
        </div>
      </div>
    </div>
  );
};

export default SportApp;
