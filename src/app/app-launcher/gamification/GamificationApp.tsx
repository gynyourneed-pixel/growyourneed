import React, { useState, useEffect } from 'react';
import AppSubNavLeft from '../../../components/app-launcher/shared/AppSubNavLeft';
import { GAMIFICATION_HEADER_ITEMS, GAMIFICATION_NAV_MAP } from './constants';
import { AppNavItem } from '../../../types';

// Import all views
import DashboardView from './views/DashboardView';
import AchievementsView from './views/AchievementsView';
import LeaderboardsView from './views/LeaderboardsView';
import ChallengesView from './views/ChallengesView';
import RewardStoreView from './views/RewardStoreView';
import SettingsView from './views/SettingsView';

interface GamificationAppProps {
  onHeaderItemsChange?: (items: any[], activeTab: string, setActiveTab: (id: string) => void) => void;
}

const GamificationApp: React.FC<GamificationAppProps> = ({ onHeaderItemsChange }) => {
    const [activeTab, setActiveTab] = useState(GAMIFICATION_HEADER_ITEMS[0].id);
    const [activeSubItem, setActiveSubItem] = useState('');

    useEffect(() => {
        const currentNavItems = GAMIFICATION_NAV_MAP[activeTab] || [];
        setActiveSubItem(currentNavItems[0]?.id || '');
    }, [activeTab]);

    useEffect(() => {
        if (onHeaderItemsChange) {
            onHeaderItemsChange(GAMIFICATION_HEADER_ITEMS, activeTab, setActiveTab);
        }
    }, [activeTab, onHeaderItemsChange]);

    const renderContent = () => {
        // The sub-nav drives the content for most tabs
        const primaryContentId = activeTab === 'dashboard' ? 'dashboard' : activeSubItem;
        
        switch (primaryContentId) {
            case 'dashboard':
                return <DashboardView />;
            case 'all_achievements':
            case 'badge_management':
                return <AchievementsView />;
            case 'global_ranking':
            case 'weekly_ranking':
                return <LeaderboardsView />;
            case 'active_challenges':
            case 'create_challenge':
                return <ChallengesView />;
            case 'browse_rewards':
            case 'redemption_history':
                return <RewardStoreView />;
            case 'rules_engine':
            case 'notification_settings':
                return <SettingsView />;
            default:
                return (
                    <div className="p-8 text-center">
                        <h2 className="text-2xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Coming Soon</h2>
                        <p className="text-gyn-text-primary-light dark:text-gyn-text-primary-dark">This section is under construction.</p>
                    </div>
                );
        }
    };

    const currentNavItems: AppNavItem[] = GAMIFICATION_NAV_MAP[activeTab] || [];
    const activeHeaderData = GAMIFICATION_HEADER_ITEMS.find(h => h.id === activeTab);

    return (
        <div className="h-full w-full flex flex-col overflow-hidden">
            <div className="flex-1 flex flex-row min-h-0 overflow-hidden">
                {currentNavItems.length > 0 && (
                     <AppSubNavLeft 
                        items={currentNavItems} 
                        activeItem={activeSubItem} 
                        setActiveItem={setActiveSubItem} 
                        title={activeHeaderData?.label || 'Gamification'}
                    />
                )}
                <div className="flex-1 overflow-auto">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default GamificationApp;
