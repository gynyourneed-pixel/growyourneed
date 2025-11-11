import React from 'react';
import { mockDeals } from '../data';
import DealsCard from '../../../../components/app-launcher/travel-transport/DealsCard';
import { Deal } from '../types';

interface PackagesViewProps {
    onSelectDeal: (deal: Deal) => void;
}

const PackagesView: React.FC<PackagesViewProps> = ({ onSelectDeal }) => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark mb-4">Featured Packages &amp; Deals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               {mockDeals.map(deal => (
                   <DealsCard 
                        key={deal.id}
                        title={deal.title}
                        description={deal.description}
                        imageUrl={deal.imageUrl}
                        onBook={() => onSelectDeal(deal)}
                   />
               ))}
            </div>
        </div>
    );
};

export default PackagesView;
