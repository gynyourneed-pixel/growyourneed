import React from 'react';
import { mockTransports } from '../data';
import SearchForm from '../../../../components/app-launcher/travel-transport/SearchForm';
import ResultsList from '../../../../components/app-launcher/travel-transport/ResultsList';
import { Transport } from '../types';

interface TransportViewProps {
    activeSubNavItem: string;
    onSelectTransport: (transport: Transport) => void;
}

const TransportView: React.FC<TransportViewProps> = ({ activeSubNavItem, onSelectTransport }) => {
    const getFilteredTransport = () => {
        if (!activeSubNavItem || !['trains', 'buses', 'ferries'].includes(activeSubNavItem)) return mockTransports;
        
        const filterType = activeSubNavItem.slice(0, -1); // 'trains' -> 'train'
        return mockTransports.filter(t => t.type.toLowerCase() === filterType);
    };

    return (
        <div className="p-4 space-y-4">
            <SearchForm 
                fields={['from', 'to', 'date']}
                onSearch={() => console.log("Searching transport...")}
            />
            <ResultsList<Transport>
                items={getFilteredTransport()}
                type="transport"
                onSelect={onSelectTransport}
            />
        </div>
    );
};

export default TransportView;
