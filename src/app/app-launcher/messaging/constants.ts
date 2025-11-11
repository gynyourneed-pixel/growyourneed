import { AppHeaderItem, AppNavItem } from '../../../types';
import { DocumentReportIcon, UserGroupIcon } from '../../../icons';

export const MESSAGING_HEADER_ITEMS: AppHeaderItem[] = [
    { id: 'main', label: 'Main' },
];

export const MESSAGING_NAV_MAP: { [key: string]: AppNavItem[] } = {
    main: [
        { id: 'inbox', label: 'Inbox', icon: DocumentReportIcon },
        { id: 'channels', label: 'Channels', icon: UserGroupIcon },
    ],
};
