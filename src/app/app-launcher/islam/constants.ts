import { AppHeaderItem, AppNavItem } from '../../../types';
import {
    BookOpenIcon, ChatBubbleLeftRightIcon, AcademicCapIcon, SpeakerWaveIcon,
    ClockIcon, CompassIcon, CheckCircleIcon, HandRaisedIcon, DocumentTextIcon,
    UserIcon, ScaleIcon, BuildingLibraryIcon, BuildingOffice2Icon, UserGroupIcon,
    CalendarDaysIcon, MoonIcon, MapIcon, CalculatorIcon, CalendarIcon
} from '../../../icons';

export const ISLAM_HEADER_ITEMS: AppHeaderItem[] = [
    { id: 'quran', label: 'Quran' },
    { id: 'prayer', label: 'Prayer' },
    { id: 'knowledge', label: 'Islamic Knowledge' },
    { id: 'community', label: 'Community' },
    { id: 'ramadan_hajj', label: 'Ramadan & Hajj' },
];

export const ISLAM_NAV_MAP: { [key: string]: AppNavItem[] } = {
    quran: [
        { id: 'read', label: 'Read Quran', icon: BookOpenIcon },
        { id: 'tafsir', label: 'Tafsir', icon: ChatBubbleLeftRightIcon },
        { id: 'memorization', label: 'Memorization', icon: AcademicCapIcon },
        { id: 'audio', label: 'Audio Recitations', icon: SpeakerWaveIcon },
    ],
    prayer: [
        { id: 'times', label: 'Prayer Times', icon: ClockIcon },
        { id: 'qibla', label: 'Qibla Direction', icon: CompassIcon },
        { id: 'tracker', label: 'Prayer Tracker', icon: CheckCircleIcon },
        { id: 'duas', label: 'Duas', icon: HandRaisedIcon },
    ],
    knowledge: [
        { id: 'hadith', label: 'Hadith', icon: DocumentTextIcon },
        { id: 'seerah', label: 'Seerah', icon: UserIcon },
        { id: 'fiqh', label: 'Fiqh', icon: ScaleIcon },
        { id: 'history', label: 'Islamic History', icon: BuildingLibraryIcon },
    ],
    community: [
        { id: 'mosque', label: 'Local Mosque', icon: BuildingOffice2Icon },
        { id: 'groups', label: 'Islamic Groups', icon: UserGroupIcon },
        { id: 'events', label: 'Events', icon: CalendarDaysIcon },
        { id: 'scholars', label: 'Scholars', icon: AcademicCapIcon },
    ],
    ramadan_hajj: [
        { id: 'ramadan', label: 'Ramadan Tracker', icon: MoonIcon },
        { id: 'hajj', label: 'Hajj Guide', icon: MapIcon },
        { id: 'zakat', label: 'Zakat Calculator', icon: CalculatorIcon },
        { id: 'calendar', label: 'Islamic Calendar', icon: CalendarIcon },
    ],
};
