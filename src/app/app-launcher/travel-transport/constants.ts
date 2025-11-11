import { AppHeaderItem, AppNavItem } from '../../../types';
import {
    AirplaneIcon, MagnifyingGlassIcon, TicketIcon, ClockIcon, FireIcon,
    BuildingOffice2Icon, KeyIcon, StarIcon, CarIcon, ClipboardDocumentListIcon,
    ArrowsRightLeftIcon, PhoneIcon, SuitcaseIcon, BoatIcon, GiftIcon,
    MapPinIcon, TrainIcon, MapIcon, BusIcon
} from '../../../icons';

export const TRAVEL_HEADER_ITEMS: AppHeaderItem[] = [
    { id: 'flights', label: 'Flights' },
    { id: 'hotels', label: 'Hotels' },
    { id: 'cars', label: 'Cars' },
    { id: 'packages', label: 'Packages' },
    { id: 'transport', label: 'Ground Transport' },
];

export const TRAVEL_NAV_MAP: { [key: string]: AppNavItem[] } = {
    flights: [
        { id: 'search_flights', label: 'Search Flights', icon: MagnifyingGlassIcon },
        { id: 'my_bookings', label: 'My Bookings', icon: TicketIcon },
        { id: 'flight_status', label: 'Flight Status', icon: ClockIcon },
        { id: 'flight_deals', label: 'Flight Deals', icon: FireIcon },
        { id: 'airports', label: 'Airports', icon: AirplaneIcon },
    ],
    hotels: [
        { id: 'search_hotels', label: 'Search Hotels', icon: MagnifyingGlassIcon },
        { id: 'my_stays', label: 'My Stays', icon: KeyIcon },
        { id: 'hotel_deals', label: 'Hotel Deals', icon: FireIcon },
        { id: 'loyalty_program', label: 'Loyalty Program', icon: StarIcon },
        { id: 'top_destinations', label: 'Top Destinations', icon: BuildingOffice2Icon },
    ],
    cars: [
        { id: 'rent_car', label: 'Rent a Car', icon: CarIcon },
        { id: 'my_rentals', label: 'My Rentals', icon: ClipboardDocumentListIcon },
        { id: 'airport_transfers', label: 'Airport Transfers', icon: ArrowsRightLeftIcon },
        { id: 'ride_hailing', label: 'Ride Hailing', icon: PhoneIcon },
    ],
    packages: [
        { id: 'vacation_packages', label: 'Vacation Packages', icon: SuitcaseIcon },
        { id: 'cruise_deals', label: 'Cruise Deals', icon: BoatIcon },
        { id: 'all_inclusive', label: 'All-Inclusive', icon: GiftIcon },
        { id: 'custom_trips', label: 'Build a Custom Trip', icon: MapPinIcon },
    ],
    transport: [
        { id: 'trains', label: 'Trains', icon: TrainIcon },
        { id: 'buses', label: 'Buses', icon: BusIcon },
        { id: 'ferries', label: 'Ferries & Water Taxis', icon: BoatIcon },
        { id: 'local_transit', label: 'Local Transit', icon: MapIcon },
    ],
};