import { AppHeaderItem, AppNavItem } from '../../../types';
import { 
  TrophyIcon,
  ListBulletIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  StarIcon,
  MapPinIcon
} from '../../../icons';

export const SPORT_HEADER_ITEMS: AppHeaderItem[] = [
  { id: 'activities', label: 'Activities' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'teams', label: 'Teams' },
  { id: 'analytics', label: 'Analytics' },
];

export const SPORT_NAV_MAP: { [key: string]: AppNavItem[] } = {
  activities: [
    { id: 'all_sports', label: 'All Sports', icon: ListBulletIcon },
    { id: 'my_activities', label: 'My Activities', icon: TrophyIcon },
    { id: 'join_activity', label: 'Join Activity', icon: UserGroupIcon },
    { id: 'facilities', label: 'Facilities', icon: MapPinIcon },
  ],
  schedule: [
    { id: 'upcoming', label: 'Upcoming', icon: ClockIcon },
    { id: 'calendar', label: 'Calendar', icon: CalendarDaysIcon },
    { id: 'past_events', label: 'Past Events', icon: ListBulletIcon },
  ],
  teams: [
    { id: 'my_teams', label: 'My Teams', icon: UserGroupIcon },
    { id: 'leaderboard', label: 'Leaderboard', icon: TrophyIcon },
    { id: 'achievements', label: 'Achievements', icon: StarIcon },
  ],
  analytics: [
    { id: 'performance', label: 'Performance', icon: ChartBarIcon },
    { id: 'statistics', label: 'Statistics', icon: ListBulletIcon },
    { id: 'progress', label: 'Progress', icon: TrophyIcon },
  ],
};
