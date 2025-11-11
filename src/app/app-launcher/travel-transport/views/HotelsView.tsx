import React, { useState } from 'react';
import { mockHotels } from '../data';
import SearchForm from '../../../../components/app-launcher/travel-transport/SearchForm';
import ResultsList from '../../../../components/app-launcher/travel-transport/ResultsList';
import { Hotel } from '../types';

interface HotelsViewProps {
    onSelectHotel: (hotel: Hotel) => void;
}

const HotelsView: React.FC<HotelsViewProps> = ({ onSelectHotel }) => {
    const [displayedHotels, setDisplayedHotels] = useState<Hotel[]>(mockHotels);

    const handleSearch = (params: any) => {
        const { location } = params;
        if (!location) {
            setDisplayedHotels(mockHotels);
            return;
        }

        const filtered = mockHotels.filter(hotel => 
            hotel.location.toLowerCase().includes(location.toLowerCase())
        );
        setDisplayedHotels(filtered);
    };

    return (
        <div className="p-4 space-y-4">
            <SearchForm 
                fields={['location', 'date', 'guests']}
                onSearch={handleSearch}
            />
            <ResultsList<Hotel>
                items={displayedHotels}
                type="hotel"
                onSelect={onSelectHotel}
            />
        </div>
    );
};

export default HotelsView;
