import React, { useState, useEffect } from 'react';
import AppSubNavLeft from '../../../components/app-launcher/shared/AppSubNavLeft';
import AppContent from '../../../components/app-launcher/shared/AppContent';
import { CREATIVE_STUDIO_HEADER_ITEMS, CREATIVE_STUDIO_NAV_MAP } from './constants';
import DesignerUI from '../../../components/app-launcher/creative-studio/DesignerUI';

interface CreativeStudioAppProps {
  onHeaderItemsChange?: (items: any[], activeTab: string, setActiveTab: (id: string) => void) => void;
}

const CreativeStudioApp: React.FC<CreativeStudioAppProps> = ({ onHeaderItemsChange }) => {
    const [activeTab, setActiveTab] = useState(CREATIVE_STUDIO_HEADER_ITEMS[0].id);
    const [activeSubItem, setActiveSubItem] = useState('');

    useEffect(() => {
        const currentNavItems = CREATIVE_STUDIO_NAV_MAP[activeTab] || [];
        setActiveSubItem(currentNavItems[0]?.id || '');
    }, [activeTab]);

    useEffect(() => {
        if (onHeaderItemsChange) {
            onHeaderItemsChange(CREATIVE_STUDIO_HEADER_ITEMS, activeTab, setActiveTab);
        }
    }, [activeTab, onHeaderItemsChange]);
    
    const currentNavItems = CREATIVE_STUDIO_NAV_MAP[activeTab] || [];
    const activeSubNavData = currentNavItems.find(item => item.id === activeSubItem);
    const tabData = CREATIVE_STUDIO_HEADER_ITEMS.find(h => h.id === activeTab);

    return (
        <div className="h-full w-full flex flex-col overflow-hidden">
            {activeTab === 'designer' ? (
                <DesignerUI 
                    navItems={currentNavItems}
                    activeNavItem={activeSubNavData}
                    activeItemId={activeSubItem}
                    setActiveItemId={setActiveSubItem}
                    title={tabData?.label || ''}
                />
            ) : (
                 <div className="flex-1 flex flex-row min-h-0 overflow-hidden">
                    <AppSubNavLeft 
                        items={currentNavItems} 
                        activeItem={activeSubItem} 
                        setActiveItem={setActiveSubItem} 
                        title={tabData?.label || ''}
                    />
                    <div className="flex-1 overflow-auto">
                        <AppContent 
                            title={activeSubNavData?.label || 'Coming Soon'}
                            description={`Full functionality for ${activeSubNavData?.label} will be implemented here.`}
                            icon={activeSubNavData?.icon}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreativeStudioApp;