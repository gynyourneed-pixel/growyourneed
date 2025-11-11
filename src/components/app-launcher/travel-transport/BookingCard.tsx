import React from 'react';
import { Booking } from '../../../app/app-launcher/travel-transport/types';
import { AirplaneIcon, BuildingOffice2Icon, CarIcon, TicketIcon } from '../../../icons';

interface BookingCardProps {
    booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {

    const getIcon = () => {
        switch(booking.itemType) {
            case 'flight': return <AirplaneIcon className="w-6 h-6" />;
            case 'hotel': return <BuildingOffice2Icon className="w-6 h-6" />;
            case 'car': return <CarIcon className="w-6 h-6" />;
            default: return <TicketIcon className="w-6 h-6" />;
        }
    };

    const getTitle = () => {
        const { item } = booking;
        if ('airline' in item) return `${item.airline} Flight`;
        if ('name' in item) return item.name;
        if ('make' in item) return `${item.make} ${item.model}`;
        if ('title' in item) return item.title;
        return 'Reservation';
    };

    const getDetails = () => {
        const { item } = booking;
        if ('from' in item && 'to' in item) return `${(item.from as any).code || item.from} → ${(item.to as any).code || item.to}`;
        if ('location' in item) return item.location;
        return `Booked on ${new Date(booking.bookingDate).toLocaleDateString()}`;
    };

    const statusClasses = {
        'Confirmed': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
        'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        'Cancelled': 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    }

    return (
        <div className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark p-4 rounded-lg shadow-md flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark flex-shrink-0">
                {getIcon()}
            </div>
            <div className="flex-1">
                <p className="font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">{getTitle()}</p>
                <p className="text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark">{getDetails()}</p>
                 <p className="text-xs text-gyn-text-primary-light/70 dark:text-gyn-text-primary-dark/70 mt-1">
                    Booked: {new Date(booking.bookingDate).toLocaleDateString()}
                 </p>
            </div>
            <div className="text-right">
                <p className="font-bold text-lg text-gyn-accent-light dark:text-gyn-accent-dark">${booking.totalPrice.toFixed(2)}</p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusClasses[booking.status]}`}>{booking.status}</span>
            </div>
        </div>
    );
};

export default BookingCard;
