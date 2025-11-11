import React from 'react';
import { ToolbarItem } from '../../../types';
import { TextIcon, ShapesIcon, LayersIcon, ArrowUturnDownIcon, ArrowUturnUpIcon, ShareIcon } from '../../../icons';

const TOOLBAR_ITEMS: ToolbarItem[] = [
    { id: 'add_text', label: 'Add Text', icon: TextIcon, type: 'button' },
    { id: 'add_shape', label: 'Add Shape', icon: ShapesIcon, type: 'button' },
    { id: 'divider1', label: '', icon: () => <></>, type: 'divider' },
    { id: 'layers', label: 'Layers', icon: LayersIcon, type: 'button' },
    { id: 'undo', label: 'Undo', icon: ArrowUturnDownIcon, type: 'button' },
    { id: 'redo', label: 'Redo', icon: ArrowUturnUpIcon, type: 'button' },
    { id: 'divider2', label: '', icon: () => <></>, type: 'divider' },
    { id: 'export', label: 'Export', icon: ShareIcon, type: 'button' },
];

const DesignerToolbar: React.FC = () => {
    return (
        <div className="h-14 shrink-0 bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark border-b-2 border-gyn-border-primary-light dark:border-gyn-border-primary-dark flex items-center justify-center px-4">
            <div className="flex items-center gap-2">
                {TOOLBAR_ITEMS.map(item => {
                    if (item.type === 'divider') {
                        return <div key={item.id} className="w-px h-8 bg-gyn-border-primary-light dark:border-gyn-border-primary-dark mx-2"></div>;
                    }
                    return (
                        <button 
                            key={item.id} 
                            title={item.label}
                            className="p-2 rounded-md hover:bg-gyn-bg-tertiary-light dark:hover:bg-gyn-bg-tertiary-dark text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark"
                        >
                            <item.icon className="w-6 h-6" />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default DesignerToolbar;