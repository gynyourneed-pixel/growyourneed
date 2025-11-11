import React from 'react';
import { mockBookings } from '../data';
import BookingCard from '../../../../components/app-launcher/travel-transport/BookingCard';

const MyBookingsView: React.FC = () => {
    const confirmedBookings = mockBookings.filter(b => b.status === 'Confirmed');
    const otherBookings = mockBookings.filter(b => b.status !== 'Confirmed');

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark mb-6">My Bookings</h2>

            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark mb-4">Upcoming Trips</h3>
                    {confirmedBookings.length > 0 ? (
                        <div className="space-y-4">
                            {confirmedBookings.map(booking => <BookingCard key={booking.id} booking={booking} />)}
                        </div>
                    ) : (
                        <p className="text-gyn-text-primary-light dark:text-gyn-text-primary-dark">You have no upcoming trips.</p>
                    )}
                </div>
                
                <div>
                    <h3 className="text-xl font-semibold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark mb-4">Past & Cancelled</h3>
                    {otherBookings.length > 0 ? (
                        <div className="space-y-4">
                            {otherBookings.map(booking => <BookingCard key={booking.id} booking={booking} />)}
                        </div>
                    ) : (
                         <p className="text-gyn-text-primary-light dark:text-gyn-text-primary-dark">No past or cancelled bookings.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyBookingsView;
