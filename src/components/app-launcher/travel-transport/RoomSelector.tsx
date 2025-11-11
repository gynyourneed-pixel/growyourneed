import React from 'react';
import { Room } from '../../../app/app-launcher/travel-transport/types';
import { UserGroupIcon } from '../../../icons';

interface RoomSelectorProps {
    rooms: Room[];
    onSelectRoom: (room: Room) => void;
}

const RoomSelector: React.FC<RoomSelectorProps> = ({ rooms, onSelectRoom }) => {
    if (!rooms || rooms.length === 0) {
        return <p className="text-gyn-text-primary-light dark:text-gyn-text-primary-dark">No room information available.</p>;
    }

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">Select a Room</h3>
            {rooms.map(room => (
                <div key={room.id} className="bg-gyn-bg-primary-light dark:bg-gyn-bg-primary-dark p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-gyn-border-primary-light dark:border-gyn-border-primary-dark">
                    <div className="flex-1">
                        <h4 className="font-bold text-gyn-text-secondary-light dark:text-gyn-text-secondary-dark">{room.name}</h4>
                        <p className="text-sm text-gyn-text-primary-light dark:text-gyn-text-primary-dark mt-1">{room.description}</p>
                        <div className="flex items-center gap-2 text-xs mt-2 text-gyn-text-primary-light/80 dark:text-gyn-text-primary-dark/80">
                           <UserGroupIcon className="w-4 h-4" />
                           <span>Sleeps {room.guests}</span>
                        </div>
                    </div>
                    <div className="text-right shrink-0">
                        <p className="text-lg font-bold text-gyn-accent-light dark:text-gyn-accent-dark">${room.pricePerNight}</p>
                        <p className="text-xs text-gyn-text-primary-light dark:text-gyn-text-primary-dark">per night</p>
                        <button 
                            onClick={() => onSelectRoom(room)}
                            className="mt-2 px-4 py-1 bg-gyn-sidebar-light dark:bg-gyn-sidebar-dark text-gyn-sidebar-text-light dark:text-gyn-sidebar-text-dark text-sm font-bold rounded-md hover:bg-gyn-sidebar-interactive-light dark:hover:bg-gyn-sidebar-interactive-dark transition-colors"
                        >
                            Select
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RoomSelector;
