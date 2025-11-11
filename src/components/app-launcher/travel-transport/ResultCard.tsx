import React from 'react';
import { Flight, Hotel, Car, Transport } from '../../../app/app-launcher/travel-transport/types';
import { AirplaneIcon, TrainIcon, BusIcon, BoatIcon } from '../../../icons';

type ItemType = Flight | Hotel | Car | Transport;
type ResultType = 'flight' | 'hotel' | 'car' | 'transport';

interface ResultCardProps {
    item: ItemType;
    type: ResultType;
    onBook: () => void;
}

const FlightDetails: React.FC<{item: Flight}> = ({item}) => (
    <>
        <div className="flex items-center gap-4">
            <img src={`https://www.gstatic.com/flights/airline_logos/70px/${item.airlineIata}.png`} alt={item.airline} className="w-10 h-10 bg-white rounded-md p-1 object-contain" />
            <div>
                <p className="font-bold">{item.airline}</p>
                <p className="text-xs">{item.stops > 0 ? `${item.stops} stop(s)` : 'Non-stop'}</p>
            </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm">
            <div className="text-right">
                <p className="font-bold">{item.departureTime}</p>
                <p title={item.from.name} className="truncate max-w-24">{item.from.code}</p>
            </div>
            <div className="text-center text-xs text-gyn-text-primary-light/70 dark:text-gyn-text-primary-dark/70">
                <p>{item.duration}</p>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full border border-current"></div>
                    <div className="flex-1 h-px bg-current"></div>
                    <AirplaneIcon className="w-4 h-4" />
                </div>
            </div>
            <div className="text-left">
                <p className="font-bold">{item.arrivalTime}</p>
                <p title={item.to.name} className="truncate max-w-24">{item.to.code}</p>
            </div>
        </div>
        <div>
            <p className="text-2xl font-bold text-gyn-accent-light dark:text-gyn-accent-dark">${item.price}</p>
            <p className="text-xs">per person</p>
        </div>
    </>
);

const HotelDetails: React.FC<{item: Hotel}> = ({item}) => (
    <>
        <img src={item.imageUrl} alt={item.name} className="w-40 h-full object-cover rounded-l-lg hidden sm:block" />
        <div className="flex-1 p-4">
            <h3 className="font-bold text-lg">{item.name}</h3>
            <p className="text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark">{item.location}</p>
            <p className="text-xs mt-2 text-amber-500">{'⭐'.repeat(Math.round(item.rating))}{'☆'.repeat(5 - Math.round(item.rating))}</p>
            <div className="text-xs mt-2 space-x-2">
                {item.amenities.slice(0, 3).map(amenity => <span key={amenity} className="bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark px-2 py-1 rounded-full">{amenity}</span>)}
            </div>
        </div>
        <div className="p-4 text-right">
            {item.deal && <p className="text-xs font-bold text-green-500 bg-green-100 dark:bg-green-900/50 px-2 py-1 rounded-md mb-2">{item.deal}</p>}
            <p className="text-2xl font-bold text-gyn-accent-light dark:text-gyn-accent-dark">${item.pricePerNight}</p>
            <p className="text-xs">per night</p>
        </div>
    </>
);

const CarDetails: React.FC<{item: Car}> = ({item}) => (
     <>
        <img src={item.imageUrl} alt={item.make} className="w-40 h-full object-cover rounded-l-lg hidden sm:block" />
        <div className="flex-1 p-4">
            <h3 className="font-bold text-lg">{`${item.make} ${item.model} (${item.year})`}</h3>
            <p className="text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark">{item.company}</p>
            <p className="text-xs mt-2 font-semibold">{`${item.type} • ${item.seats} seats`}</p>
        </div>
        <div className="p-4 text-right">
            <p className="text-2xl font-bold text-gyn-accent-light dark:text-gyn-accent-dark">${item.pricePerDay}</p>
            <p className="text-xs">per day</p>
        </div>
    </>
);

const TransportDetails: React.FC<{item: Transport}> = ({item}) => (
     <>
        <div className="flex items-center gap-4 p-4">
            {item.type === 'Train' ? <TrainIcon className="w-8 h-8"/> : 
             item.type === 'Bus' ? <BusIcon className="w-8 h-8"/> : 
             <BoatIcon className="w-8 h-8"/>}
            <div>
                <p className="font-bold">{item.company}</p>
                <p className="text-xs">{item.type}</p>
            </div>
        </div>
        <div className="flex-1 p-4">
            <p className="font-semibold">{item.from} → {item.to}</p>
            <p className="text-sm">{item.departureTime} - {item.arrivalTime}</p>
        </div>
        <div className="p-4 text-right">
            <p className="text-2xl font-bold text-gyn-accent-light dark:text-gyn-accent-dark">${item.price}</p>
            <p className="text-xs">one way</p>
        </div>
    </>
);

const ResultCard: React.FC<ResultCardProps> = ({ item, type, onBook }) => {
    
    const renderContent = () => {
        switch(type) {
            case 'flight': return <FlightDetails item={item as Flight} />;
            case 'hotel': return <HotelDetails item={item as Hotel} />;
            case 'car': return <CarDetails item={item as Car} />;
            case 'transport': return <TransportDetails item={item as Transport} />;
            default: return null;
        }
    };

    return (
        <div className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark rounded-lg shadow-md flex items-center text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">
            <div className={`flex-1 flex items-center ${type === 'flight' || type === 'transport' ? 'flex-wrap sm:flex-nowrap justify-between p-4' : ''}`}>
                {renderContent()}
            </div>
            <div className="p-4 border-l border-gyn-border-primary-light dark:border-gyn-border-primary-dark">
                <button 
                    onClick={onBook}
                    className="px-6 py-2 bg-gyn-sidebar-light dark:bg-gyn-sidebar-dark text-gyn-sidebar-text-light dark:text-gyn-sidebar-text-dark font-bold rounded-md hover:bg-gyn-sidebar-interactive-light dark:hover:bg-gyn-sidebar-interactive-dark transition-colors"
                >
                    Book
                </button>
            </div>
        </div>
    );
};

export default ResultCard;