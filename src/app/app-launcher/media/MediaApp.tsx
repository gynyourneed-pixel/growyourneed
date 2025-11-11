import React, { useState, useEffect } from 'react';
import AppSubNavLeft from '../../../components/app-launcher/shared/AppSubNavLeft';
import AppContent from '../../../components/app-launcher/shared/AppContent';
import { MEDIA_HEADER_ITEMS, MEDIA_NAV_MAP } from './constants';
import { AppNavItem } from '../../../types';

interface MediaAppProps {
  onHeaderItemsChange?: (items: any[], activeTab: string, setActiveTab: (id: string) => void) => void;
}

const MediaApp: React.FC<MediaAppProps> = ({ onHeaderItemsChange }) => {
  const [activeTab, setActiveTab] = useState(MEDIA_HEADER_ITEMS[0].id);
  const [activeSubItem, setActiveSubItem] = useState('');

  useEffect(() => {
    const currentNavItems = MEDIA_NAV_MAP[activeTab] || [];
    setActiveSubItem(currentNavItems[0]?.id || '');
  }, [activeTab]);

  useEffect(() => {
    if (onHeaderItemsChange) {
      onHeaderItemsChange(MEDIA_HEADER_ITEMS, activeTab, setActiveTab);
    }
  }, [activeTab, onHeaderItemsChange]);

  const currentNavItems: AppNavItem[] = MEDIA_NAV_MAP[activeTab] || [];
  const activeSubNavData = currentNavItems.find(item => item.id === activeSubItem);
  
  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-row min-h-0 overflow-hidden">
        <AppSubNavLeft 
          items={currentNavItems} 
          activeItem={activeSubItem} 
          setActiveItem={setActiveSubItem} 
          title={MEDIA_HEADER_ITEMS.find(h => h.id === activeTab)?.label || 'Media'}
        />
        <div className="flex-1 overflow-auto">
          <AppContent 
              title={activeSubNavData?.label || 'Welcome to Media'}
              icon={activeSubNavData?.icon}
          />
        </div>
      </div>
    </div>
  );
};

export default MediaApp;
