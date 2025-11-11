
import { NavItem, AppItem, RightNavItem } from '../types';
import {
  BookOpenIcon,
  UsersIcon,
  BriefcaseIcon,
  CompassIcon,
  GraduationCapIcon,
  UserGroupIcon,
  CubeIcon,
  BanknotesIcon,
  StudioIcon,
  SettingsIcon,
  MessagingIcon,
  MediaIcon,
  HelpIcon,
  ActivitiesIcon,
  ReligionIcon,
  SportIcon,
  EventsIcon,
  MarketIcon,
  ServicesIcon,
  GamificationIcon,
  TravelIcon,
  CpuChipIcon,
} from '../icons';


export const RIGHT_NAV_ITEMS: RightNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: CompassIcon },
  { id: 'students', label: 'Students', icon: GraduationCapIcon },
  { id: 'staff', label: 'Staff', icon: UserGroupIcon },
  { id: 'academics', label: 'Academics', icon: CubeIcon },
  { id: 'finance', label: 'Finance', icon: BanknotesIcon },
];

export const NAVIGATION_MAP: Record<string, { header: NavItem[], subnav?: Record<string, NavItem[]> }> = {
  dashboard: {
    header: [
      { id: 'overview', label: 'Overview' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'reports', label: 'Reports' },
    ],
  },
  students: {
    header: [
      { id: 'all_students', label: 'All Students' },
      { id: 'admissions', label: 'Admissions' },
      { id: 'records', label: 'Records' },
    ],
    subnav: {
      all_students: [
        { id: 'grade_9', label: 'Grade 9', icon: UsersIcon },
        { id: 'grade_10', label: 'Grade 10', icon: UsersIcon },
        { id: 'grade_11', label: 'Grade 11', icon: UsersIcon },
      ],
      admissions: [
        { id: 'applications', label: 'Applications', icon: BookOpenIcon },
        { id: 'interviews', label: 'Interviews', icon: BriefcaseIcon },
      ],
    }
  },
  staff: {
    header: [
      { id: 'teaching', label: 'Teaching' },
      { id: 'administrative', label: 'Admin' },
      { id: 'support', label: 'Support' },
    ],
    subnav: {
       teaching: [
         {id: 'mathematics', label: 'Maths', icon: BriefcaseIcon},
         {id: 'science', label: 'Science', icon: BriefcaseIcon},
         {id: 'humanities', label: 'Humanities', icon: BriefcaseIcon},
       ],
       administrative: [
        { id: 'front_office', label: 'Front Office', icon: UserGroupIcon },
        { id: 'accounts', label: 'Accounts', icon: BanknotesIcon },
       ]
    }
  },
  academics: {
      header: [
          {id: 'curriculum', label: 'Curriculum'},
          {id: 'examinations', label: 'Exams'},
          {id: 'library', label: 'Library'}
      ],
  },
  finance: {
      header: [
          {id: 'fees', label: 'Fee Collection'},
          {id: 'payroll', label: 'Payroll'},
          {id: 'expenses', label: 'Expenses'}
      ]
  }
};

export const LAUNCHER_APPS: AppItem[] = [
    { id: 'creator-studio', name: 'Creator Studio', icon: StudioIcon, description: 'Creative tools for design, video, code, and documents.' },
    { id: 'c2-control', name: 'C2 Control', icon: CpuChipIcon, description: 'Manage and interact with connected agents.' },
    { id: 'settings', name: 'Settings', icon: SettingsIcon, description: 'Master control panel for the entire platform.' },
    { id: 'messaging', name: 'Messaging', icon: MessagingIcon, description: 'Comprehensive communication hub for internal messaging.' },
    { id: 'media', name: 'Media', icon: MediaIcon, description: 'Streaming platform for movies, TV series, and live TV.' },
    { id: 'help-center', name: 'Help Center', icon: HelpIcon, description: 'Access to documentation, support tickets, and FAQs.' },
    { id: 'activities', name: 'Activities', icon: ActivitiesIcon, description: 'Discover, join, and organize local activities and events.' },
    { id: 'islam', name: 'Islam', icon: ReligionIcon, description: 'Spiritual guidance and religious resources for Muslims.' },
    { id: 'sport', name: 'Sport', icon: SportIcon, description: 'Sports and fitness platform for tracking and community.' },
    { id: 'events', name: 'Events', icon: EventsIcon, description: 'Tool for discovering, creating, and managing events.' },
    { id: 'market', name: 'Market', icon: MarketIcon, description: 'E-commerce marketplace with AI recommendations.' },
    { id: 'services', name: 'Services', icon: ServicesIcon, description: 'Marketplace for booking personal and professional services.' },
    { id: 'gamification', name: 'Gamification', icon: GamificationIcon, description: 'Manage achievements, leaderboards, and rewards.' },
    { id: 'travel-transport', name: 'Travel & Transport', icon: TravelIcon, description: 'Travel planning and transportation booking platform.' },
];