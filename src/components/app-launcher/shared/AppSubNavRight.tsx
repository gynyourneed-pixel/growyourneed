import React from 'react';
import { AppNavItem } from '../../../types';

interface AppSubNavRightProps {
    items?: AppNavItem[];
    parentLabel: string;
}

const AppSubNavRight: React.FC<AppSubNavRightProps> = ({ items, parentLabel }) => {
    if (!items || items.length === 0) {
        return <div className="w-64 bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark p-2 border-l-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark hidden lg:block"></div>;
    }

    return (
        <div className="w-64 bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark p-2 flex-col border-l-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark overflow-y-auto no-scrollbar hidden lg:flex">
            <h3 className="p-2 text-md font-bold text-gyn-text-primary-light dark:text-gyn-text-primary-dark sticky top-0 bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark">{parentLabel}</h3>
            <div className="flex flex-col gap-1 mt-2">
                {items.map(item => (
                    <button key={item.id} className="w-full flex items-center gap-3 p-2 rounded-md text-left transition-colors hover:bg-gyn-bg-tertiary-light/50 dark:hover:bg-gyn-bg-tertiary-dark/50">
                        {item.icon && <item.icon className="w-4 h-4 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark flex-shrink-0" />}
                       <span className="font-semibold text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark truncate">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AppSubNavRight;
