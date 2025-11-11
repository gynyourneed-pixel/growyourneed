export interface Flight {
    id: string;
    airline: string;
    airlineIata: string;
    from: { code: string; name: string };
    to: { code: string; name: string };
    departureTime: string;
    arrivalTime: string;
    duration: string;
    price: number;
    stops: number;
}

export interface Room {
    id: string;
    name: string;
    description: string;
    pricePerNight: number;
    beds: number;
    guests: number;
}

export interface Review {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Hotel {
    id: string;
    name: string;
    location: string;
    rating: number;
    pricePerNight: number;
    imageUrl: string;
    amenities: string[];
    deal?: string;
    gallery: string[];
    rooms: Room[];
    reviews: Review[];
}

export interface Car {
    id: string;
    make: string;
    model: string;
    year: number;
    pricePerDay: number;
    imageUrl: string;
    type: 'Sedan' | 'SUV' | 'Truck' | 'Van' | 'Convertible';
    seats: number;
    company: string;
    features: string[];
}

export interface Deal {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    type: 'Package' | 'Cruise' | 'All-Inclusive';
}

export interface Transport {
    id: string;
    type: 'Train' | 'Bus' | 'Ferry';
    company: string;
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
}

export type BookingItem = Flight | Hotel | Car | Deal | Transport;

export interface Booking {
    id: string;
    bookingDate: string;
    item: BookingItem;
    itemType: 'flight' | 'hotel' | 'car' | 'deal' | 'transport';
    totalPrice: number;
    status: 'Confirmed' | 'Pending' | 'Cancelled';
}
