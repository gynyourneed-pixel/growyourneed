import { AppHeaderItem, AppNavItem } from '../../../types';
import { 
  CalendarDaysIcon, 
  ListBulletIcon,
  PlusCircleIcon,
  ClockIcon,
  MapPinIcon,
  TicketIcon,
  UserGroupIcon,
  ChartBarIcon
} from '../../../icons';

export const EVENTS_HEADER_ITEMS: AppHeaderItem[] = [
  { id: 'calendar', label: 'Calendar' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'create', label: 'Create Event' },
  { id: 'analytics', label: 'Analytics' },
];

export const EVENTS_NAV_MAP: { [key: string]: AppNavItem[] } = {
  calendar: [
    { id: 'month_view', label: 'Month View', icon: CalendarDaysIcon },
    { id: 'week_view', label: 'Week View', icon: ListBulletIcon },
    { id: 'day_view', label: 'Day View', icon: ClockIcon },
  ],
  upcoming: [
    { id: 'all_events', label: 'All Events', icon: ListBulletIcon },
    { id: 'my_events', label: 'My Events', icon: UserGroupIcon },
    { id: 'registered', label: 'Registered', icon: TicketIcon },
  ],
  create: [
    { id: 'event_details', label: 'Event Details', icon: CalendarDaysIcon },
    { id: 'location', label: 'Location', icon: MapPinIcon },
    { id: 'attendees', label: 'Attendees', icon: UserGroupIcon },
    { id: 'tickets', label: 'Tickets', icon: TicketIcon },
  ],
  analytics: [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'attendance', label: 'Attendance', icon: UserGroupIcon },
    { id: 'revenue', label: 'Revenue', icon: TicketIcon },
  ],
};
