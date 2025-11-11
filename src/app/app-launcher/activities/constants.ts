import { AppHeaderItem, AppNavItem } from '../../../types';
import {
    CalendarDaysIcon, AcademicCapIcon, UserGroupIcon, HandRaisedIcon, TreePineIcon,
    BuildingLibraryIcon, SunIcon, UsersIcon, BriefcaseIcon, HeartIcon, ArrowsRightLeftIcon,
    ChatBubbleLeftRightIcon, HomeIcon, PlusCircleIcon, CalendarIcon, CheckCircleIcon,
    LightBulbIcon, ArrowPathIcon, LockClosedIcon, MapPinIcon, ClipboardDocumentListIcon,
    ShieldCheckIcon, ShoppingBagIcon, StarIcon, MagnifyingGlassIcon, CarIcon,
    BookOpenIcon, CameraIcon, PaintBrushIcon, MusicalNoteIcon, PuzzlePieceIcon, UserIcon
} from '../../../icons';

export const ACTIVITIES_HEADER_ITEMS: AppHeaderItem[] = [
    { id: 'events', label: 'Local Events' },
    { id: 'groups', label: 'Social Groups' },
    { id: 'planning', label: 'Activity Planning' },
    { id: 'neighborhood', label: 'Neighborhood' },
    { id: 'interests', label: 'Special Interest' },
    { id: 'family', label: 'Family Activities' },
];

export const ACTIVITIES_NAV_MAP: { [key: string]: AppNavItem[] } = {
    events: [
        { id: 'community', label: 'Community Events', icon: CalendarDaysIcon },
        { id: 'workshops', label: 'Workshops & Classes', icon: AcademicCapIcon },
        { id: 'meetups', label: 'Meetups & Groups', icon: UserGroupIcon },
        { id: 'volunteer', label: 'Volunteer Activities', icon: HandRaisedIcon },
        { id: 'outdoor', label: 'Outdoor Activities', icon: TreePineIcon },
        { id: 'cultural', label: 'Cultural Activities', icon: BuildingLibraryIcon },
        { id: 'seasonal', label: 'Seasonal Events', icon: SunIcon },
    ],
    groups: [
        { id: 'interest', label: 'Interest Groups', icon: UserGroupIcon },
        { id: 'age', label: 'Age-Based Groups', icon: UsersIcon },
        { id: 'professional', label: 'Professional Networks', icon: BriefcaseIcon },
        { id: 'support', label: 'Support Groups', icon: HeartIcon },
        { id: 'skill', label: 'Skill Exchanges', icon: ArrowsRightLeftIcon },
        { id: 'language', label: 'Language Practice', icon: ChatBubbleLeftRightIcon },
        { id: 'residents', label: 'New Residents', icon: HomeIcon },
    ],
    planning: [
        { id: 'create', label: 'Create Event', icon: PlusCircleIcon },
        { id: 'my', label: 'My Activities', icon: CalendarIcon },
        { id: 'calendar', label: 'Activity Calendar', icon: CalendarDaysIcon },
        { id: 'rsvp', label: 'RSVP Management', icon: CheckCircleIcon },
        { id: 'suggestions', label: 'Activity Suggestions', icon: LightBulbIcon },
        { id: 'recurring', label: 'Recurring Activities', icon: ArrowPathIcon },
        { id: 'private', label: 'Private Groups', icon: LockClosedIcon },
    ],
    neighborhood: [
        { id: 'directory', label: 'Local Directory', icon: MapPinIcon },
        { id: 'board', label: 'Community Board', icon: ClipboardDocumentListIcon },
        { id: 'safety', label: 'Safety & Security', icon: ShieldCheckIcon },
        { id: 'marketplace', label: 'Local Marketplace', icon: ShoppingBagIcon },
        { id: 'recommendations', label: 'Recommendations', icon: StarIcon },
        { id: 'lost', label: 'Lost & Found', icon: MagnifyingGlassIcon },
        { id: 'carpool', label: 'Carpool & Rideshare', icon: CarIcon },
    ],
    interests: [
        { id: 'books', label: 'Book Clubs', icon: BookOpenIcon },
        { id: 'photo', label: 'Photography Groups', icon: CameraIcon },
        { id: 'gardening', label: 'Gardening Circles', icon: SunIcon },
        { id: 'cooking', label: 'Cooking Classes', icon: AcademicCapIcon },
        { id: 'art', label: 'Art & Craft Groups', icon: PaintBrushIcon },
        { id: 'music', label: 'Music Groups', icon: MusicalNoteIcon },
        { id: 'games', label: 'Game Nights', icon: PuzzlePieceIcon },
    ],
    family: [
        { id: 'kids', label: 'Kids Activities', icon: AcademicCapIcon },
        { id: 'parents', label: 'Parent Groups', icon: UsersIcon },
        { id: 'school', label: 'School Events', icon: BuildingLibraryIcon },
        { id: 'youth', label: 'Youth Programs', icon: UserIcon },
        { id: 'senior', label: 'Senior Activities', icon: HeartIcon },
        { id: 'pet', label: 'Pet Activities', icon: HeartIcon },
        { id: 'multigen', label: 'Multi-generational', icon: UserGroupIcon },
    ],
};
