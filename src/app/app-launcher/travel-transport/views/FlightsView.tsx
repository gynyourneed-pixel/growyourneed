import React from 'react';
import { mockFlights } from '../data';
import SearchForm from '../../../../components/app-launcher/travel-transport/SearchForm';
import ResultsList from '../../../../components/app-launcher/travel-transport/ResultsList';
import { Flight } from '../types';

interface FlightsViewProps {
    onSelectFlight: (flight: Flight) => void;
}

const FlightsView: React.FC<FlightsViewProps> = ({ onSelectFlight }) => {
    return (
        <div className="p-4 space-y-4">
            <SearchForm 
                fields={['from', 'to', 'date', 'passengers']}
                onSearch={() => console.log("Searching flights...")}
            />
            <ResultsList<Flight>
                items={mockFlights}
                type="flight"
                onSelect={onSelectFlight}
            />
        </div>
    );
};

export default FlightsView;
