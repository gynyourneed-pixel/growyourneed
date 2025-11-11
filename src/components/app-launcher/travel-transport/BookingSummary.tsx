import React from 'react';
import { BookingItem } from '../../../app/app-launcher/travel-transport/types';

interface BookingSummaryProps {
    item: BookingItem;
    passengersCount: number;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({ item, passengersCount }) => {
    let basePrice = 0;
    let priceLabel = '';
    
    if ('price' in item) {
        basePrice = item.price;
        priceLabel = 'Ticket Price';
    } else if ('pricePerNight' in item) {
        basePrice = item.pricePerNight;
        priceLabel = 'Price per Night';
    } else if ('pricePerDay' in item) {
        basePrice = item.pricePerDay;
        priceLabel = 'Price per Day';
    }
    
    const taxes = basePrice * passengersCount * 0.1;
    const total = (basePrice * passengersCount) + taxes;

    const getItemTitle = () => {
        if ('airline' in item) return `${item.airline} Flight`;
        if ('name' in item) return item.name;
        if ('make' in item) return `${item.make} ${item.model}`;
        if ('title' in item) return item.title;
        if ('company' in item) return `${item.company} ${item.type}`;
        return 'Booking';
    };
    
    return (
        <div className="space-y-4 p-4 rounded-lg bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark border border-gyn-border-primary-light dark:border-gyn-border-primary-dark">
             <h2 className="text-xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Booking Summary</h2>
            <div className="border-b border-gyn-border-primary-light dark:border-gyn-border-primary-dark pb-2">
                <p className="font-semibold">{getItemTitle()}</p>
                {/* FIX: Safely access 'name' property by checking if 'from'/'to' is an object. */}
                {'from' in item && 'to' in item && <p className="text-sm">{(typeof item.from === 'object' ? item.from.name : item.from)} to {(typeof item.to === 'object' ? item.to.name : item.to)}</p>}
            </div>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>{priceLabel} x {passengersCount}</span>
                    <span>${(basePrice * passengersCount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>${taxes.toFixed(2)}</span>
                </div>
            </div>
            <div className="border-t border-gyn-border-primary-light dark:border-gyn-border-primary-dark pt-2 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
            </div>
        </div>
    );
};

export default BookingSummary;
