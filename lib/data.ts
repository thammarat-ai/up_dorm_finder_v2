export interface Dormitory {
  id: number;
  name: string;
  zone: 'Front of UP' | 'Mae Ka' | 'In-Town';
  price: number;
  status: 'Available' | 'Full';
  image: string;
  description: string;
  amenities: string[];
  contact: string;
  location: { lat: number; lng: number };
  govElectricity: boolean;
  noMaintenanceFee: boolean;
  purpleBus: boolean;
  distanceToGate: number; // in km
  petFriendly: boolean;
  highSpeedInternet: boolean;
  hasParking: boolean;
}

export const DORM_DATA: Dormitory[] = [
  {
    id: 1,
    name: 'Phayao Grand Dorm',
    zone: 'Front of UP',
    price: 3500,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800',
    description: 'A premium living experience located right in front of the University of Phayao.',
    amenities: ['Free WiFi', 'Air Conditioning', 'CCTV', 'Parking', 'Gym'],
    contact: '081-234-5678',
    location: { lat: 19.0286, lng: 99.8962 },
    govElectricity: true,
    noMaintenanceFee: false,
    purpleBus: true,
    distanceToGate: 0.2,
    petFriendly: false,
    highSpeedInternet: true,
    hasParking: true,
  },
  {
    id: 2,
    name: 'Mae Ka Resident',
    zone: 'Mae Ka',
    price: 2800,
    status: 'Full',
    image: 'https://images.unsplash.com/photo-1590274853856-f22d5ee3d228?auto=format&fit=crop&q=80&w=800',
    description: 'Affordable and cozy rooms in the Mae Ka area.',
    amenities: ['WiFi', 'Fan/AC', 'Laundry Service', 'Keycard Access'],
    contact: '082-345-6789',
    location: { lat: 19.0250, lng: 99.9000 },
    govElectricity: false,
    noMaintenanceFee: true,
    purpleBus: false,
    distanceToGate: 1.5,
    petFriendly: true,
    highSpeedInternet: false,
    hasParking: true,
  },
  {
    id: 3,
    name: 'City Center Living',
    zone: 'In-Town',
    price: 4500,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
    description: 'Located in the heart of Phayao town.',
    amenities: ['WiFi', 'Air Conditioning', 'Elevator', 'Kitchenette', 'Parking'],
    contact: '083-456-7890',
    location: { lat: 19.1667, lng: 99.9000 },
    govElectricity: true,
    noMaintenanceFee: true,
    purpleBus: false,
    distanceToGate: 5.0,
    petFriendly: false,
    highSpeedInternet: true,
    hasParking: true,
  },
  {
    id: 4,
    name: 'Green View Dorm',
    zone: 'Front of UP',
    price: 3200,
    status: 'Available',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800',
    description: 'Environmentally friendly dormitory with lots of green space.',
    amenities: ['WiFi', 'AC', 'Security Guard', 'Bicycle Parking', 'Common Area'],
    contact: '084-567-8901',
    location: { lat: 19.0290, lng: 99.8970 },
    govElectricity: true,
    noMaintenanceFee: true,
    purpleBus: true,
    distanceToGate: 0.5,
    petFriendly: true,
    highSpeedInternet: true,
    hasParking: false,
  },
];
