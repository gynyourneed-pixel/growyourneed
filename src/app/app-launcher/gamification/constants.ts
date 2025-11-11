import { AppHeaderItem, AppNavItem } from '../../../types';
import {
    ChartBarIcon, TrophyIcon, StarIcon, FireIcon, GiftIcon, CogIcon,
    ClipboardDocumentListIcon, LightBulbIcon, PlusCircleIcon,
    ClockIcon, ShoppingCartIcon, ArrowPathIcon
} from '../../../icons';

export const GAMIFICATION_HEADER_ITEMS: AppHeaderItem[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'leaderboards', label: 'Leaderboards' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'rewards', label: 'Reward Store' },
    { id: 'settings', label: 'Settings' },
];

export const GAMIFICATION_NAV_MAP: { [key: string]: AppNavItem[] } = {
    dashboard: [], // Dashboard has no sub-nav
    achievements: [
        { id: 'all_achievements', label: 'All Achievements', icon: StarIcon },
        { id: 'badge_management', label: 'Badge Management', icon: ClipboardDocumentListIcon },
    ],
    leaderboards: [
        { id: 'global_ranking', label: 'Global Ranking', icon: TrophyIcon },
        { id: 'weekly_ranking', label: 'Weekly Ranking', icon: ClockIcon },
    ],
    challenges: [
        { id: 'active_challenges', label: 'Active Challenges', icon: FireIcon },
        { id: 'create_challenge', label: 'Create Challenge', icon: PlusCircleIcon },
    ],
    rewards: [
        { id: 'browse_rewards', label: 'Browse Rewards', icon: ShoppingCartIcon },
        { id: 'redemption_history', label: 'Redemption History', icon: ArrowPathIcon },
    ],
    settings: [
        { id: 'rules_engine', label: 'Rules Engine', icon: LightBulbIcon },
        { id: 'notification_settings', label: 'Notifications', icon: CogIcon },
    ],
};
