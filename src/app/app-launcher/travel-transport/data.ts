import { Flight, Hotel, Car, Deal, Transport, Room, Review, Booking } from './types';

export const mockRooms: Room[] = [
    { id: 'room1', name: 'Deluxe Queen', description: 'A spacious room with two queen beds.', pricePerNight: 250, beds: 2, guests: 4 },
    { id: 'room2', name: 'King Suite', description: 'Luxurious suite with a king bed and separate living area.', pricePerNight: 450, beds: 1, guests: 2 },
    { id: 'room3', name: 'Standard King', description: 'Comfortable room with a king bed.', pricePerNight: 180, beds: 1, guests: 2 },
];

export const mockReviews: Review[] = [
    { id: 'rev1', author: 'John Doe', rating: 5, comment: 'Absolutely fantastic hotel! The service was impeccable and the views were breathtaking. Highly recommend.', date: '2024-05-15' },
    { id: 'rev2', author: 'Jane Smith', rating: 4, comment: 'Great location and very clean rooms. The pool area was a bit crowded, but otherwise a wonderful stay.', date: '2024-04-22' },
    { id: 'rev3', author: 'Peter Jones', rating: 4.5, comment: 'Excellent amenities and the staff were very helpful. Would definitely come back.', date: '2024-03-10' },
];


export const mockFlights: Flight[] = [
  { id: 'fl1', airline: 'American Airlines', airlineIata: 'AA', from: { code: 'JFK', name: 'John F. Kennedy Intl' }, to: { code: 'LAX', name: 'Los Angeles Intl' }, departureTime: '08:00', arrivalTime: '11:30', duration: '5h 30m', price: 350, stops: 0 },
  { id: 'fl2', airline: 'Delta Air Lines', airlineIata: 'DL', from: { code: 'SFO', name: 'San Francisco Intl' }, to: { code: 'MIA', name: 'Miami Intl' }, departureTime: '10:15', arrivalTime: '18:45', duration: '5h 30m', price: 420, stops: 1 },
  { id: 'fl3', airline: 'United Airlines', airlineIata: 'UA', from: { code: 'ORD', name: 'O\'Hare Intl' }, to: { code: 'DFW', name: 'Dallas/Fort Worth Intl' }, departureTime: '14:00', arrivalTime: '16:30', duration: '2h 30m', price: 180, stops: 0 },
  { id: 'fl4', airline: 'Southwest Airlines', airlineIata: 'WN', from: { code: 'ATL', name: 'Hartsfield-Jackson Intl' }, to: { code: 'DEN', name: 'Denver Intl' }, departureTime: '09:30', arrivalTime: '11:00', duration: '3h 30m', price: 250, stops: 0 },
  { id: 'fl5', airline: 'British Airways', airlineIata: 'BA', from: { code: 'LHR', name: 'London Heathrow' }, to: { code: 'JFK', name: 'John F. Kennedy Intl' }, departureTime: '11:00', arrivalTime: '14:00', duration: '8h 00m', price: 890, stops: 0 },
  { id: 'fl6', airline: 'Emirates', airlineIata: 'EK', from: { code: 'DXB', name: 'Dubai Intl' }, to: { code: 'LHR', name: 'London Heathrow' }, departureTime: '02:30', arrivalTime: '07:00', duration: '7h 30m', price: 1100, stops: 0 },
];

export const mockHotels: Hotel[] = [
  { id: 'ht1', name: 'The Plaza', location: 'New York, NY', rating: 5, pricePerNight: 850, imageUrl: 'https://picsum.photos/seed/hotel_plaza/400/300', amenities: ['Pool', 'Spa', 'Gym', 'Concierge'], deal: '4th Night Free', gallery: ['https://picsum.photos/seed/plaza_gal1/800/600', 'https://picsum.photos/seed/plaza_gal2/800/600', 'https://picsum.photos/seed/plaza_gal3/800/600'], rooms: mockRooms, reviews: mockReviews },
  { id: 'ht2', name: 'Beverly Hills Hotel', location: 'Los Angeles, CA', rating: 5, pricePerNight: 920, imageUrl: 'https://picsum.photos/seed/hotel_beverly/400/300', amenities: ['Pool', 'Spa', 'Valet', 'Restaurant'], deal: 'Free Breakfast', gallery: ['https://picsum.photos/seed/beverly_gal1/800/600', 'https://picsum.photos/seed/beverly_gal2/800/600'], rooms: mockRooms, reviews: mockReviews },
  { id: 'ht3', name: 'Fairmont San Francisco', location: 'San Francisco, CA', rating: 4.5, pricePerNight: 520, imageUrl: 'https://picsum.photos/seed/hotel_fairmont/400/300', amenities: ['Business Center', 'Gym', 'Restaurant'], deal: '20% Off', gallery: ['https://picsum.photos/seed/fairmont_gal1/800/600'], rooms: mockRooms.slice(0, 2), reviews: mockReviews.slice(0, 1) },
  { id: 'ht4', name: 'The Ritz-Carlton, Tokyo', location: 'Tokyo, Japan', rating: 5, pricePerNight: 1150, imageUrl: 'https://picsum.photos/seed/hotel_ritz/400/300', amenities: ['Pool', 'Spa', 'Michelin Star Restaurant', 'Sky View'], deal: 'Suite Upgrade', gallery: ['https://picsum.photos/seed/ritz_gal1/800/600', 'https://picsum.photos/seed/ritz_gal2/800/600'], rooms: mockRooms, reviews: mockReviews },
  { id: 'ht5', name: 'W Chicago - Lakeshore', location: 'Chicago, IL', rating: 4, pricePerNight: 320, imageUrl: 'https://picsum.photos/seed/hotel_w_chicago/400/300', amenities: ['Gym', 'Bar', 'Pet Friendly'], gallery: [], rooms: [], reviews: [] },
  { id: 'ht6', name: 'The Langham, New York', location: 'New York, NY', rating: 4.8, pricePerNight: 780, imageUrl: 'https://picsum.photos/seed/hotel_langham_ny/400/300', amenities: ['Spa', 'Restaurant', 'Concierge'], deal: 'Complimentary Spa Access', gallery: ['https://picsum.photos/seed/langham_gal1/800/600'], rooms: mockRooms.slice(1, 3), reviews: mockReviews.slice(1, 3) },
];

export const mockCars: Car[] = [
  { id: 'car1', make: 'Toyota', model: 'Camry', year: 2023, pricePerDay: 55, imageUrl: 'https://picsum.photos/seed/car_camry/400/300', type: 'Sedan', seats: 5, company: 'Hertz', features: ['Automatic', 'GPS', 'Bluetooth'] },
  { id: 'car2', make: 'Ford', model: 'Explorer', year: 2023, pricePerDay: 75, imageUrl: 'https://picsum.photos/seed/car_explorer/400/300', type: 'SUV', seats: 7, company: 'Avis', features: ['4WD', 'Sunroof', 'Apple CarPlay'] },
  { id: 'car3', make: 'Honda', model: 'Odyssey', year: 2023, pricePerDay: 80, imageUrl: 'https://picsum.photos/seed/car_odyssey/400/300', type: 'Van', seats: 8, company: 'Enterprise', features: ['Rear Entertainment', 'Automatic Doors'] },
  { id: 'car4', make: 'Ford', model: 'Mustang', year: 2024, pricePerDay: 120, imageUrl: 'https://picsum.photos/seed/car_mustang/400/300', type: 'Convertible', seats: 4, company: 'Hertz', features: ['V8 Engine', 'Premium Sound', 'Leather Seats'] },
];

export const mockDeals: Deal[] = [
  { id: 'deal1', title: 'Caribbean Cruise', description: '7 nights in paradise on Royal Caribbean.', price: 1200, imageUrl: 'https://picsum.photos/seed/deal_cruise/400/300', type: 'Cruise' },
  { id: 'deal2', title: 'Hawaiian Getaway', description: 'All-inclusive at the Grand Wailea.', price: 2500, imageUrl: 'https://picsum.photos/seed/deal_hawaii/400/300', type: 'All-Inclusive' },
  { id: 'deal3', title: 'European Tour', description: 'Visit Paris, Rome, and London in 10 days.', price: 3000, imageUrl: 'https://picsum.photos/seed/deal_europe/400/300', type: 'Package' },
];

export const mockTransports: Transport[] = [
    { id: 'tr1', type: 'Train', company: 'Amtrak', from: 'Washington D.C.', to: 'New York, NY', departureTime: '10:00', arrivalTime: '13:30', price: 85 },
    { id: 'tr2', type: 'Bus', company: 'Greyhound', from: 'Boston, MA', to: 'New York, NY', departureTime: '09:30', arrivalTime: '14:00', price: 30 },
    { id: 'tr3', type: 'Ferry', company: 'Staten Island Ferry', from: 'Manhattan', to: 'Staten Island', departureTime: '11:00', arrivalTime: '11:25', price: 0 },
];

export const mockBookings: Booking[] = [
    { id: 'bk1', bookingDate: '2024-05-01', item: mockFlights[0], itemType: 'flight', totalPrice: 350, status: 'Confirmed' },
    { id: 'bk2', bookingDate: '2024-04-20', item: mockHotels[1], itemType: 'hotel', totalPrice: 1840, status: 'Confirmed' },
    { id: 'bk3', bookingDate: '2024-03-15', item: mockCars[2], itemType: 'car', totalPrice: 240, status: 'Cancelled' },
];
