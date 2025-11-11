import React, { useState, useEffect } from 'react';
import AppSubNavLeft from '../../../components/app-launcher/shared/AppSubNavLeft';
import { TRAVEL_HEADER_ITEMS, TRAVEL_NAV_MAP } from './constants';
// FIX: Moved BookingItem to local type import
import { AppNavItem } from '../../../types';

// Import all views
import FlightsView from './views/FlightsView';
import HotelsView from './views/HotelsView';
import CarsView from './views/CarsView';
import PackagesView from './views/PackagesView';
import TransportView from './views/TransportView';
import FlightDetailView from './views/FlightDetailView';
import HotelDetailView from './views/HotelDetailView';
import MyBookingsView from './views/MyBookingsView';
import FlightStatusView from './views/FlightStatusView';
import LoyaltyView from './views/LoyaltyView';
import CustomTripView from './views/CustomTripView';
import CheckoutView from './views/CheckoutView';

import { TravelBookingProvider, useTravelBooking } from './context/TravelBookingContext';
// FIX: Added BookingItem to import from local types
import { Flight, Hotel, Room, Car, Deal, Transport, BookingItem } from './types';


type ViewState = 
    | { view: 'list'; type: 'flights' | 'hotels' | 'cars' | 'packages' | 'transport' }
    | { view: 'detail'; type: 'flight'; item: Flight }
    | { view: 'detail'; type: 'hotel'; item: Hotel }
    | { view: 'detail'; type: 'car'; item: Car }
    | { view: 'detail'; type: 'deal'; item: Deal }
    | { view: 'detail'; type: 'transport'; item: Transport }
    | { view: 'checkout'; item: BookingItem }
    | { view: 'my_bookings' }
    | { view: 'flight_status' }
    | { view: 'loyalty' }
    | { view: 'custom_trip' }
    | { view: 'other'; subNavId: string };

// FIX: Added a specific type for detail view item types to fix invalid type access on ViewState union
type DetailViewItemType = 'flight' | 'hotel' | 'car' | 'deal' | 'transport';

interface AppRouterProps {
  onHeaderItemsChange?: (items: any[], activeTab: string, setActiveTab: (id: string) => void) => void;
}

const AppRouter: React.FC<AppRouterProps> = ({ onHeaderItemsChange }) => {
    const [activeTab, setActiveTab] = useState(TRAVEL_HEADER_ITEMS[0].id);
    const [activeSubItem, setActiveSubItem] = useState('');
    const [viewState, setViewState] = useState<ViewState>({ view: 'list', type: 'flights' });
    const { startBooking, clearBooking } = useTravelBooking();

    useEffect(() => {
        if (onHeaderItemsChange) {
            onHeaderItemsChange(TRAVEL_HEADER_ITEMS, activeTab, setActiveTab);
        }
    }, [activeTab, onHeaderItemsChange]);

    // Effect to handle top-level header navigation
    useEffect(() => {
        // FIX: Replaced invalid type assertion `ViewState['type']` with direct usage of `activeTab`.
        const headerId = activeTab;
        const currentNavItems = TRAVEL_NAV_MAP[headerId] || [];
        const defaultSubItem = currentNavItems[0]?.id || '';
        setActiveSubItem(defaultSubItem);
        // Only reset to list view if it's a primary category
        if (['flights', 'hotels', 'cars', 'packages', 'transport'].includes(headerId)) {
            setViewState({ view: 'list', type: headerId as 'flights' | 'hotels' | 'cars' | 'packages' | 'transport' });
        }
    }, [activeTab]);

    // Effect to handle sub-navigation changes
    useEffect(() => {
        if (!activeSubItem) return;
        
        switch (activeSubItem) {
            case 'my_bookings':
            case 'my_stays':
            case 'my_rentals':
                setViewState({ view: 'my_bookings' });
                break;
            case 'flight_status':
                setViewState({ view: 'flight_status' });
                break;
            case 'loyalty_program':
                 setViewState({ view: 'loyalty' });
                break;
            case 'custom_trips':
                setViewState({ view: 'custom_trip' });
                break;
            case 'search_flights':
                setViewState({ view: 'list', type: 'flights' });
                break;
            case 'search_hotels':
                setViewState({ view: 'list', type: 'hotels' });
                break;
            case 'rent_car':
                setViewState({ view: 'list', type: 'cars' });
                break;
            case 'vacation_packages':
                setViewState({ view: 'list', type: 'packages' });
                break;
            case 'trains':
            case 'buses':
            case 'ferries':
                 setViewState({ view: 'list', type: 'transport' });
                 break;
            default:
                 // For other simple views like 'Flight Deals', 'Airports' etc.
                setViewState({ view: 'other', subNavId: activeSubItem });
                break;
        }

    }, [activeSubItem]);

    // FIX: Used the newly defined DetailViewItemType to correctly type the 'type' parameter.
    const handleSelectItem = (item: BookingItem, type: DetailViewItemType) => {
        setViewState({ view: 'detail', item: item as any, type: type as any });
    };
    
    const handleBookNow = (item: BookingItem) => {
        startBooking(item);
        setViewState({ view: 'checkout', item: item });
    };

    const handleHotelBookNow = (hotel: Hotel, room: Room) => {
        const bookingItem = { ...hotel, pricePerNight: room.pricePerNight, name: `${hotel.name} - ${room.name}` };
        startBooking(bookingItem);
        setViewState({ view: 'checkout', item: bookingItem });
    }

    const handleCheckoutComplete = () => {
        clearBooking();
        setViewState({ view: 'my_bookings' });
    }
    
    const renderContent = () => {
        switch (viewState.view) {
            case 'list':
                switch(viewState.type) {
                    case 'flights': return <FlightsView onSelectFlight={(flight) => handleSelectItem(flight, 'flight')} />;
                    case 'hotels': return <HotelsView onSelectHotel={(hotel) => handleSelectItem(hotel, 'hotel')} />;
                    case 'cars': return <CarsView onSelectCar={(car) => handleSelectItem(car, 'car')} />;
                    case 'packages': return <PackagesView onSelectDeal={(deal) => handleSelectItem(deal, 'deal')} />;
                    case 'transport': return <TransportView onSelectTransport={(t) => handleSelectItem(t, 'transport')} activeSubNavItem={activeSubItem} />;
                }
                break;
            case 'detail':
                 if(viewState.type === 'flight') return <FlightDetailView flight={viewState.item} onBack={() => setViewState({ view: 'list', type: 'flights' })} onBook={handleBookNow} />;
                 if(viewState.type === 'hotel') return <HotelDetailView hotel={viewState.item} onBack={() => setViewState({ view: 'list', type: 'hotels' })} onBook={handleHotelBookNow} />;
                 // Add detail views for Car, Deal, etc. later
                return <p>Detail view for {viewState.type} not implemented.</p>;
            case 'checkout':
                return <CheckoutView item={viewState.item} onBack={() => setViewState({ view: 'list', type: activeTab as any})} onComplete={handleCheckoutComplete} />;
            case 'my_bookings':
                return <MyBookingsView />;
            case 'flight_status':
                return <FlightStatusView />;
             case 'loyalty':
                return <LoyaltyView />;
            case 'custom_trip':
                return <CustomTripView />;
            case 'other':
                 // Can add simple placeholder views here for things like "Airports", "Flight Deals", etc.
                return <div className="p-8 text-center">Content for '{viewState.subNavId.replace(/_/g, ' ')}' coming soon.</div>;
            default:
                return <p>Something went wrong.</p>;
        }
    };

    const currentNavItems: AppNavItem[] = TRAVEL_NAV_MAP[activeTab] || [];
    const activeHeaderData = TRAVEL_HEADER_ITEMS.find(h => h.id === activeTab);

    return (
        <div className="h-full w-full flex flex-col overflow-hidden">
            <div className="flex-1 flex flex-row min-h-0 overflow-hidden">
                <AppSubNavLeft 
                    items={currentNavItems} 
                    activeItem={activeSubItem} 
                    setActiveItem={setActiveSubItem} 
                    title={activeHeaderData?.label || 'Travel & Transport'}
                />
                <div className="flex-1 overflow-auto">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};


interface TravelTransportAppProps {
  onHeaderItemsChange?: (items: any[], activeTab: string, setActiveTab: (id: string) => void) => void;
}

const TravelTransportApp: React.FC<TravelTransportAppProps> = ({ onHeaderItemsChange }) => (
    <TravelBookingProvider>
        <AppRouter onHeaderItemsChange={onHeaderItemsChange} />
    </TravelBookingProvider>
);


export default TravelTransportApp;
