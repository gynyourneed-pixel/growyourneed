import React from 'react';
import { AppNavItem } from '../../../types';
import AppSubNavLeft from '../shared/AppSubNavLeft';
import DesignerToolbar from './DesignerToolbar';
import DesignerRightPanel from './DesignerRightPanel';

interface DesignerUIProps {
    navItems: AppNavItem[];
    activeNavItem: AppNavItem | undefined;
    activeItemId: string;
    setActiveItemId: (id: string) => void;
    title: string;
}

const DesignerUI: React.FC<DesignerUIProps> = ({ navItems, activeNavItem, activeItemId, setActiveItemId, title }) => {
    return (
        <div className="flex-1 flex flex-row min-h-0">
            <AppSubNavLeft 
                items={navItems} 
                activeItem={activeItemId} 
                setActiveItem={setActiveItemId} 
                title={title}
            />
            <main className="flex-1 flex flex-col bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark">
                <DesignerToolbar />
                <div className="flex-1 p-4 overflow-auto">
                    {/* Canvas Area */}
                    <div className="w-full h-full max-w-4xl max-h-[80vh] mx-auto bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark shadow-lg rounded-md flex items-center justify-center">
                        <p className="text-gyn-text-primary-light dark:text-gyn-text-primary-dark">Canvas Area</p>
                    </div>
                </div>
            </main>
            <DesignerRightPanel activeNavItem={activeNavItem} />
        </div>
    );
};

export default DesignerUI;