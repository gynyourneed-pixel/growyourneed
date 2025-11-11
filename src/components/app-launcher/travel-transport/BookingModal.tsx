import React from 'react';
import { Flight, Hotel, Car, Deal, Transport } from '../../../app/app-launcher/travel-transport/types';
import { XMarkIcon } from '../../../icons';

type ItemType = Flight | Hotel | Car | Deal | Transport;

interface BookingModalProps {
    item: ItemType;
    type: 'flight' | 'hotel' | 'car' | 'deal' | 'transport';
    onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ item, type, onClose }) => {
    const getTitle = () => {
        if ('airline' in item) return `your ${item.airline} flight to ${item.to.code}`;
        if ('name' in item) return `your stay at ${item.name}`;
        if ('make' in item) return `your ${item.make} ${item.model} rental`;
        if ('title' in item) return `the "${item.title}" package`;
        if ('company' in item) return `your trip with ${item.company}`;
        return 'your booking';
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark w-full max-w-md rounded-lg shadow-2xl flex flex-col animate-scaleIn"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-gyn-border-primary-light dark:border-gyn-border-primary-dark">
                    <h2 className="text-lg font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Confirm Booking (Simulation)</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gyn-bg-tertiary-light dark:hover:bg-gyn-bg-tertiary-dark">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </header>
                <div className="p-6 text-center">
                    <p className="text-gyn-text-primary-light dark:text-gyn-text-primary-dark">
                        This is a placeholder to confirm {getTitle()}.
                    </p>
                    <p className="mt-2 text-sm text-gyn-text-primary-light/70 dark:text-gyn-text-primary-dark/70">
                        Full booking functionality is not yet implemented in this demonstration.
                    </p>
                </div>
                 <footer className="flex justify-end gap-3 p-4 bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gyn-sidebar-light dark:bg-gyn-sidebar-dark text-gyn-sidebar-text-light dark:text-gyn-sidebar-text-dark font-bold rounded-md hover:bg-gyn-sidebar-interactive-light dark:hover:bg-gyn-sidebar-interactive-dark transition-colors"
                    >
                        Close
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default BookingModal;