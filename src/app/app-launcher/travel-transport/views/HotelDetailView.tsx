import React from 'react';
import { Hotel, Room } from '../types';
import { ArrowUturnLeftIcon, MapPinIcon } from '../../../../icons';
import ImageGallery from '../../../../components/app-launcher/travel-transport/ImageGallery';
import RoomSelector from '../../../../components/app-launcher/travel-transport/RoomSelector';
import ReviewsSection from '../../../../components/app-launcher/travel-transport/ReviewsSection';

interface HotelDetailViewProps {
    hotel: Hotel;
    onBack: () => void;
    onBook: (hotel: Hotel, room: Room) => void;
}

const HotelDetailView: React.FC<HotelDetailViewProps> = ({ hotel, onBack, onBook }) => {
    
    const handleSelectRoom = (room: Room) => {
        // Here we can combine the hotel and room info to proceed to booking
        console.log("Selected Room:", room);
        onBook(hotel, room);
    };

    return (
        <div className="p-4 md:p-8">
             <button onClick={onBack} className="flex items-center gap-2 text-sm font-semibold mb-4 text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark hover:text-gyn-accent-light dark:hover:text-gyn-accent-dark">
                <ArrowUturnLeftIcon className="w-5 h-5"/>
                Back to Results
            </button>
            
            <div className="bg-gyn-bg-secondary-light dark:bg-gyn-bg-secondary-dark rounded-lg shadow-lg p-4 sm:p-6 space-y-6">
                <ImageGallery images={hotel.gallery} mainImage={hotel.imageUrl} />

                <div>
                    <h2 className="text-3xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">{hotel.name}</h2>
                    <div className="flex items-center gap-2 mt-1 text-gyn-text-primary-light dark:text-gyn-text-primary-dark">
                        <MapPinIcon className="w-5 h-5" />
                        <span>{hotel.location}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map(amenity => (
                        <span key={amenity} className="text-xs font-semibold bg-gyn-bg-tertiary-light dark:bg-gyn-bg-tertiary-dark text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark px-2 py-1 rounded-full">
                            {amenity}
                        </span>
                    ))}
                </div>

                <div className="border-t border-gyn-border-primary-light dark:border-gyn-border-primary-dark pt-6">
                    <RoomSelector rooms={hotel.rooms} onSelectRoom={handleSelectRoom} />
                </div>
                
                 <div className="border-t border-gyn-border-primary-light dark:border-gyn-border-primary-dark pt-6">
                   <ReviewsSection reviews={hotel.reviews} averageRating={hotel.rating} />
                </div>
            </div>
        </div>
    );
};

export default HotelDetailView;