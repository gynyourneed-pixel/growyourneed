import React, { createContext, useState, useContext, ReactNode } from 'react';
import { BookingItem } from '../types';

interface Passenger {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

interface TravelBookingContextType {
    itemToBook: BookingItem | null;
    passengers: Passenger[];
    startBooking: (item: BookingItem) => void;
    updatePassengers: (passengers: Passenger[]) => void;
    clearBooking: () => void;
}

const TravelBookingContext = createContext<TravelBookingContextType | undefined>(undefined);

export const TravelBookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [itemToBook, setItemToBook] = useState<BookingItem | null>(null);
    const [passengers, setPassengers] = useState<Passenger[]>([
        { id: 1, firstName: '', lastName: '', email: '' }
    ]);

    const startBooking = (item: BookingItem) => {
        setItemToBook(item);
    };

    const updatePassengers = (newPassengers: Passenger[]) => {
        setPassengers(newPassengers);
    };
    
    const clearBooking = () => {
        setItemToBook(null);
        setPassengers([{ id: 1, firstName: '', lastName: '', email: '' }]);
    };

    return (
        <TravelBookingContext.Provider value={{
            itemToBook,
            passengers,
            startBooking,
            updatePassengers,
            clearBooking,
        }}>
            {children}
        </TravelBookingContext.Provider>
    );
};

export const useTravelBooking = (): TravelBookingContextType => {
    const context = useContext(TravelBookingContext);
    if (!context) {
        throw new Error('useTravelBooking must be used within a TravelBookingProvider');
    }
    return context;
};
