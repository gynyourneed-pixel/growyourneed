import { AppHeaderItem, AppNavItem } from '../../../types';
import {
    PaintBrushIcon, DocumentTextIcon, UsersIcon, KeyIcon, CodeBracketSquareIcon,
    ShoppingCartIcon, CalendarDaysIcon, SparklesIcon, ChatBubbleLeftRightIcon,
    FilmIcon, PuzzlePieceIcon, MoonIcon, TrophyIcon, CalendarIcon,
    WrenchScrewdriverIcon, QuestionMarkCircleIcon,
} from '../../../icons';

export const SETTINGS_HEADER_ITEMS: AppHeaderItem[] = [
    { id: 'platform', label: 'Platform' },
    { id: 'backend', label: 'Backend' },
    { id: 'integrations', label: 'Integrations' },
];

export const SETTINGS_NAV_MAP: { [key: string]: AppNavItem[] } = {
    platform: [
        { id: 'theme', label: 'Theme', icon: PaintBrushIcon },
        { id: 'content', label: 'Content', icon: DocumentTextIcon },
        { id: 'assets', label: 'Assets', icon: FilmIcon },
        { id: 'permissions', label: 'Permissions', icon: UsersIcon },
        { id: 'api_keys', label: 'API Keys', icon: KeyIcon },
        { id: 'versions', label: 'Versions', icon: CodeBracketSquareIcon },
    ],
    backend: [
        { id: 'marketplace', label: 'Marketplace', icon: ShoppingCartIcon },
        { id: 'calendar', label: 'Calendar', icon: CalendarDaysIcon },
        { id: 'studio', label: 'Studio', icon: SparklesIcon },
        { id: 'messaging', label: 'Messaging', icon: ChatBubbleLeftRightIcon },
        { id: 'media', label: 'Media', icon: FilmIcon },
        { id: 'hobbies', label: 'Hobbies', icon: SparklesIcon },
        { id: 'religion', label: 'Religion', icon: MoonIcon },
        { id: 'sport', label: 'Sport', icon: TrophyIcon },
        { id: 'events', label: 'Events', icon: CalendarIcon },
        { id: 'services', label: 'Services', icon: WrenchScrewdriverIcon },
        { id: 'gamification', label: 'Gamification', icon: PuzzlePieceIcon },
        { id: 'help', label: 'Help', icon: QuestionMarkCircleIcon },
    ],
    integrations: [
        { id: 'available', label: 'Available', icon: PuzzlePieceIcon },
    ],
};
