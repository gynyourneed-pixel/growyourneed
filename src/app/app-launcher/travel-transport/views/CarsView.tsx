import React from 'react';
import { mockCars } from '../data';
import SearchForm from '../../../../components/app-launcher/travel-transport/SearchForm';
import ResultsList from '../../../../components/app-launcher/travel-transport/ResultsList';
import { Car } from '../types';

interface CarsViewProps {
    onSelectCar: (car: Car) => void;
}

const CarsView: React.FC<CarsViewProps> = ({ onSelectCar }) => {
    return (
        <div className="p-4 space-y-4">
            <SearchForm 
                fields={['location', 'date']}
                onSearch={() => console.log("Searching cars...")}
            />
            <ResultsList<Car>
                items={mockCars}
                type="car"
                onSelect={onSelectCar}
            />
        </div>
    );
};

export default CarsView;
