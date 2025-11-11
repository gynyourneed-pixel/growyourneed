import React from 'react';
import { Flight } from '../types';
import { AirplaneIcon, ArrowUturnLeftIcon } from '../../../../icons';

interface FlightDetailViewProps {
    flight: Flight;
    onBack: () => void;
    onBook: (flight: Flight) => void;
}

const FlightDetailView: React.FC<FlightDetailViewProps> = ({ flight, onBack, onBook }) => {
    return (
        <div className="p-4 md:p-8 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">
            <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold mb-4 hover:text-gyn-accent-light dark:hover:text-gyn-accent-dark">
                <ArrowUturnLeftIcon className="w-5 h-5"/>
                Back to Results
            </button>
            
            <div className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark rounded-lg shadow-lg p-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-gyn-border-primary-light dark:border-gyn-border-primary-dark pb-4 mb-4">
                    <div>
                        <div className="flex items-center gap-4">
                            <img src={`https://www.gstatic.com/flights/airline_logos/70px/${flight.airlineIata}.png`} alt={flight.airline} className="w-12 h-12 bg-white rounded-lg p-1 object-contain" />
                            <h2 className="text-2xl font-bold">{flight.airline}</h2>
                        </div>
                        <p className="text-lg font-semibold mt-2">{flight.from.name} to {flight.to.name}</p>
                    </div>
                    <div className="text-left md:text-right mt-4 md:mt-0">
                        <p className="text-3xl font-bold text-gyn-accent-light dark:text-gyn-accent-dark">${flight.price}</p>
                        <p className="text-sm">per person, round trip</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center my-6">
                    <div className="text-center md:text-left">
                        <p className="text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark">Departure</p>
                        <p className="text-2xl font-bold">{flight.departureTime}</p>
                        <p className="font-semibold">{flight.from.code}</p>
                    </div>
                    <div className="text-center text-sm text-gyn-text-primary-light/80 dark:text-gyn-text-primary-dark/80">
                         <p>{flight.duration}</p>
                         <div className="flex items-center gap-2 text-current my-1">
                            <div className="w-2 h-2 rounded-full border border-current"></div>
                            <div className="flex-1 h-px bg-current"></div>
                            <AirplaneIcon className="w-5 h-5" />
                            <div className="flex-1 h-px bg-current"></div>
                            <div className="w-2 h-2 rounded-full border border-current"></div>
                        </div>
                        <p>{flight.stops > 0 ? `${flight.stops} stop(s)` : 'Non-stop'}</p>
                    </div>
                    <div className="text-center md:text-right">
                        <p className="text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark">Arrival</p>
                        <p className="text-2xl font-bold">{flight.arrivalTime}</p>
                        <p className="font-semibold">{flight.to.code}</p>
                    </div>
                </div>

                <div className="text-center mt-8">
                     <button 
                        onClick={() => onBook(flight)}
                        className="px-8 py-3 bg-gyn-accent-light dark:bg-gyn-accent-dark text-gyn-blue-dark font-bold text-lg rounded-md hover:opacity-90 transition-opacity"
                    >
                        Proceed to Book
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlightDetailView;