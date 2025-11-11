import React, { useState, useEffect } from 'react';
import AppSubNavLeft from '../../../components/app-launcher/shared/AppSubNavLeft';
import AppContent from '../../../components/app-launcher/shared/AppContent';
import { ACTIVITIES_HEADER_ITEMS, ACTIVITIES_NAV_MAP } from './constants';
import { AppNavItem } from '../../../types';
import ActivitiesListView from './views/ActivitiesListView';

interface ActivitiesAppProps {
  onHeaderItemsChange?: (items: any[], activeTab: string, setActiveTab: (id: string) => void) => void;
}

const ActivitiesApp: React.FC<ActivitiesAppProps> = ({ onHeaderItemsChange }) => {
  const [activeTab, setActiveTab] = useState(ACTIVITIES_HEADER_ITEMS[0].id);
  const [activeSubItem, setActiveSubItem] = useState('');

  useEffect(() => {
    const currentNavItems = ACTIVITIES_NAV_MAP[activeTab] || [];
    setActiveSubItem(currentNavItems[0]?.id || '');
  }, [activeTab]);

  useEffect(() => {
    if (onHeaderItemsChange) {
      onHeaderItemsChange(ACTIVITIES_HEADER_ITEMS, activeTab, setActiveTab);
    }
  }, [activeTab, onHeaderItemsChange]);

  const currentNavItems: AppNavItem[] = ACTIVITIES_NAV_MAP[activeTab] || [];
  
  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-row min-h-0 overflow-hidden">
        <AppSubNavLeft 
          items={currentNavItems} 
          activeItem={activeSubItem} 
          setActiveItem={setActiveSubItem} 
          title={ACTIVITIES_HEADER_ITEMS.find(h => h.id === activeTab)?.label || 'Activities'}
        />
        <div className="flex-1 overflow-auto">
          <ActivitiesListView 
              key={activeSubItem} /* Add key to force re-render and fetch on sub-item change */
              category={activeSubItem}
              categoryLabel={currentNavItems.find(item => item.id === activeSubItem)?.label || 'Activities'}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivitiesApp;
