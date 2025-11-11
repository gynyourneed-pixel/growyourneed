import React from 'react';

interface DealsCardProps {
    title: string;
    description: string;
    imageUrl: string;
    onBook: () => void;
}

const DealsCard: React.FC<DealsCardProps> = ({ title, description, imageUrl, onBook }) => {
    return (
        <div className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark rounded-lg shadow-lg overflow-hidden group flex flex-col">
            <div className="relative">
                <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-white text-xl font-bold drop-shadow-md">{title}</h3>
                    <p className="text-white/90 text-sm drop-shadow-md">{description}</p>
                </div>
            </div>
            <div className="flex-1 p-4 flex flex-col">
                <div className="flex-1"></div>
                <button
                    onClick={onBook}
                    className="w-full mt-auto p-3 bg-gyn-sidebar-light dark:bg-gyn-sidebar-dark text-gyn-sidebar-text-light dark:text-gyn-sidebar-text-dark font-bold hover:bg-gyn-sidebar-interactive-light dark:hover:bg-gyn-sidebar-interactive-dark transition-colors rounded-md"
                >
                    View Deal
                </button>
            </div>
        </div>
    );
};

export default DealsCard;