import { AppHeaderItem, AppNavItem } from '../../../types';
import { 
  WrenchScrewdriverIcon,
  ListBulletIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  BuildingOffice2Icon,
  ChartBarIcon,
  ClockIcon,
  StarIcon
} from '../../../icons';

export const SERVICES_HEADER_ITEMS: AppHeaderItem[] = [
  { id: 'browse', label: 'Browse Services' },
  { id: 'bookings', label: 'My Bookings' },
  { id: 'provide', label: 'Provide Service' },
  { id: 'analytics', label: 'Analytics' },
];

export const SERVICES_NAV_MAP: { [key: string]: AppNavItem[] } = {
  browse: [
    { id: 'all_services', label: 'All Services', icon: ListBulletIcon },
    { id: 'categories', label: 'Categories', icon: WrenchScrewdriverIcon },
    { id: 'top_rated', label: 'Top Rated', icon: StarIcon },
    { id: 'near_me', label: 'Near Me', icon: BuildingOffice2Icon },
  ],
  bookings: [
    { id: 'upcoming', label: 'Upcoming', icon: ClockIcon },
    { id: 'completed', label: 'Completed', icon: ListBulletIcon },
    { id: 'cancelled', label: 'Cancelled', icon: ListBulletIcon },
  ],
  provide: [
    { id: 'my_services', label: 'My Services', icon: WrenchScrewdriverIcon },
    { id: 'appointments', label: 'Appointments', icon: CalendarDaysIcon },
    { id: 'clients', label: 'Clients', icon: UserGroupIcon },
  ],
  analytics: [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'revenue', label: 'Revenue', icon: ChartBarIcon },
    { id: 'reviews', label: 'Reviews', icon: StarIcon },
  ],
};
