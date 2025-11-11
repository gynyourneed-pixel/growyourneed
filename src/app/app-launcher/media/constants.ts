import { AppHeaderItem, AppNavItem } from '../../../types';
// FIX: Added UserGroupIcon and HandRaisedIcon to imports to resolve missing component errors.
import {
    PlayIcon, BookmarkIcon, FireIcon, SparklesIcon, UserIcon, ClockIcon, FilmIcon, BoltIcon,
    FaceSmileIcon, HeartIcon, ExclamationTriangleIcon, RocketLaunchIcon, GlobeAltIcon,
    TvIcon, MagnifyingGlassIcon, CameraIcon, ListBulletIcon, DocumentTextIcon, TreePineIcon,
    BuildingLibraryIcon, BeakerIcon, ExclamationCircleIcon, UserCircleIcon, WandIcon,
    NewspaperIcon, TrophyIcon, MusicalNoteIcon, AcademicCapIcon, CrownIcon, Squares2x2Icon,
    CalendarIcon, MapIcon, StarIcon, EyeIcon, ArrowDownTrayIcon, UsersIcon, CreditCardIcon, CogIcon, BellIcon, UserGroupIcon, HandRaisedIcon
} from '../../../icons';

export const MEDIA_HEADER_ITEMS: AppHeaderItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'movies', label: 'Movies' },
    { id: 'tv', label: 'TV Series' },
    { id: 'documentaries', label: 'Documentaries' },
    { id: 'anime', label: 'Anime' },
    { id: 'live', label: 'Live TV' },
    { id: 'search', label: 'Search & Browse' },
    { id: 'account', label: 'My Account' },
];

export const MEDIA_NAV_MAP: { [key: string]: AppNavItem[] } = {
    home: [
        { id: 'continue', label: 'Continue Watching', icon: PlayIcon },
        { id: 'my_list', label: 'My List', icon: BookmarkIcon },
        { id: 'trending', label: 'Trending Now', icon: FireIcon },
        { id: 'new', label: 'New Releases', icon: SparklesIcon },
        { id: 'for_you', label: 'For You', icon: UserIcon },
        { id: 'recent', label: 'Recently Added', icon: ClockIcon },
    ],
    movies: [
        { id: 'all', label: 'All Movies', icon: FilmIcon },
        { id: 'action', label: 'Action & Adventure', icon: BoltIcon },
        { id: 'comedy', label: 'Comedy', icon: FaceSmileIcon },
        { id: 'drama', label: 'Drama', icon: HeartIcon },
        { id: 'horror', label: 'Horror & Thriller', icon: ExclamationTriangleIcon },
        { id: 'scifi', label: 'Sci-Fi & Fantasy', icon: RocketLaunchIcon },
        { id: 'international', label: 'International', icon: GlobeAltIcon },
    ],
    tv: [
        { id: 'all', label: 'All Series', icon: TvIcon },
        { id: 'drama', label: 'Drama Series', icon: HeartIcon },
        { id: 'comedy', label: 'Comedy Series', icon: FaceSmileIcon },
        { id: 'crime', label: 'Crime & Mystery', icon: MagnifyingGlassIcon },
        { id: 'reality', label: 'Reality TV', icon: CameraIcon },
        { id: 'kids', label: 'Kids & Family', icon: UserGroupIcon },
        { id: 'mini', label: 'Mini-Series', icon: ListBulletIcon },
    ],
    documentaries: [
        { id: 'all', label: 'All Documentaries', icon: DocumentTextIcon },
        { id: 'nature', label: 'Nature & Wildlife', icon: TreePineIcon },
        { id: 'history', label: 'History', icon: BuildingLibraryIcon },
        { id: 'science', label: 'Science & Technology', icon: BeakerIcon },
        { id: 'crime', label: 'True Crime', icon: ExclamationCircleIcon },
        { id: 'bio', label: 'Biography', icon: UserCircleIcon },
        { id: 'social', label: 'Social Issues', icon: HandRaisedIcon },
    ],
    anime: [
        { id: 'all', label: 'All Anime', icon: SparklesIcon },
        { id: 'action', label: 'Action Anime', icon: BoltIcon },
        { id: 'romance', label: 'Romance Anime', icon: HeartIcon },
        { id: 'fantasy', label: 'Fantasy Anime', icon: WandIcon },
        { id: 'comedy', label: 'Comedy Anime', icon: FaceSmileIcon },
        { id: 'thriller', label: 'Thriller Anime', icon: ExclamationTriangleIcon },
        { id: 'movies', label: 'Movies Anime', icon: FilmIcon },
    ],
    live: [
        { id: 'news', label: 'News Channels', icon: NewspaperIcon },
        { id: 'sports', label: 'Sports Channels', icon: TrophyIcon },
        { id: 'entertainment', label: 'Entertainment', icon: MusicalNoteIcon },
        { id: 'kids', label: 'Kids Channels', icon: AcademicCapIcon },
        { id: 'music', label: 'Music Channels', icon: MusicalNoteIcon },
        { id: 'international', label: 'International', icon: GlobeAltIcon },
        { id: 'premium', label: 'Premium Channels', icon: CrownIcon },
    ],
    search: [
        { id: 'all', label: 'Search All', icon: MagnifyingGlassIcon },
        { id: 'genre', label: 'Browse by Genre', icon: Squares2x2Icon },
        { id: 'year', label: 'Browse by Year', icon: CalendarIcon },
        { id: 'country', label: 'Browse by Country', icon: MapIcon },
        { id: 'rated', label: 'Top Rated', icon: StarIcon },
        { id: 'watched', label: 'Most Watched', icon: EyeIcon },
    ],
    account: [
        { id: 'history', label: 'Watch History', icon: ClockIcon },
        { id: 'downloads', label: 'Downloaded Content', icon: ArrowDownTrayIcon },
        { id: 'profiles', label: 'Profiles', icon: UsersIcon },
        { id: 'subscription', label: 'Subscription', icon: CreditCardIcon },
        { id: 'settings', label: 'Settings', icon: CogIcon },
        { id: 'notifications', label: 'Notifications', icon: BellIcon },
    ],
};