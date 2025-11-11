import React from 'react';
import { AppNavItem } from '../../../types';
import { MagnifyingGlassIcon, BoldIcon, ItalicIcon, UnderlineIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon, OpacityIcon } from '../../../icons';

const ElementsPanel: React.FC = () => {
    const stockImages = Array.from({ length: 10 }, (_, i) => `https://picsum.photos/seed/${i + 1}/200/200`);
    return (
        <div>
            <div className="relative mb-4">
                <input type="text" placeholder="Search elements..." className="w-full p-2 pl-8 rounded-md bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark" />
                <MagnifyingGlassIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gyn-text-primary-light dark:text-gyn-text-primary-dark" />
            </div>
            <div className="grid grid-cols-2 gap-2">
                {stockImages.map((src, i) => (
                    <img key={i} src={src} alt={`Stock photo ${i}`} className="w-full h-auto rounded-md cursor-pointer hover:opacity-80 transition-opacity" />
                ))}
            </div>
        </div>
    );
};

const TextPanel: React.FC = () => (
    <div className="space-y-4">
        <div>
            <label className="text-xs font-semibold mb-1 block">Font Family</label>
            <select className="w-full p-2 rounded-md bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark">
                <option>Inter</option>
                <option>Arial</option>
                <option>Georgia</option>
                <option>Times New Roman</option>
            </select>
        </div>
        <div className="flex items-center gap-2">
            <button className="p-2 rounded-md hover:bg-gyn-bg-tertiary-light dark:hover:bg-gyn-bg-tertiary-dark"><BoldIcon className="w-5 h-5" /></button>
            <button className="p-2 rounded-md hover:bg-gyn-bg-tertiary-light dark:hover:bg-gyn-bg-tertiary-dark"><ItalicIcon className="w-5 h-5" /></button>
            <button className="p-2 rounded-md hover:bg-gyn-bg-tertiary-light dark:hover:bg-gyn-bg-tertiary-dark"><UnderlineIcon className="w-5 h-5" /></button>
        </div>
        <div className="flex items-center gap-2">
            <button className="p-2 rounded-md bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark"><AlignLeftIcon className="w-5 h-5" /></button>
            <button className="p-2 rounded-md hover:bg-gyn-bg-tertiary-light dark:hover:bg-gyn-bg-tertiary-dark"><AlignCenterIcon className="w-5 h-5" /></button>
            <button className="p-2 rounded-md hover:bg-gyn-bg-tertiary-light dark:hover:bg-gyn-bg-tertiary-dark"><AlignRightIcon className="w-5 h-5" /></button>
        </div>
         <div>
            <label className="text-xs font-semibold mb-1 block">Opacity</label>
             <div className="flex items-center gap-2">
                <OpacityIcon className="w-5 h-5" />
                <input type="range" min="0" max="100" defaultValue="100" className="w-full" />
            </div>
        </div>
    </div>
);

interface DesignerRightPanelProps {
    activeNavItem: AppNavItem | undefined;
}

const DesignerRightPanel: React.FC<DesignerRightPanelProps> = ({ activeNavItem }) => {
    
    const renderPanelContent = () => {
        switch (activeNavItem?.id) {
            case 'elements':
                return <ElementsPanel />;
            case 'text':
                return <TextPanel />;
            // Add other cases for 'brand', 'collab', etc.
            default:
                return <p className="text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark">Select an item to see options.</p>;
        }
    };

    return (
        <div className="w-72 bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark p-3 flex-col border-l-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark overflow-y-auto no-scrollbar hidden lg:flex">
            <h3 className="p-2 text-md font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark sticky top-0 bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark">{activeNavItem?.label || 'Properties'}</h3>
            <div className="mt-4">
                {renderPanelContent()}
            </div>
        </div>
    );
};

export default DesignerRightPanel;