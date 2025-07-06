
export interface Parameter {
  id: string;
  name: string;
  description: string;
  category: 'platform' | 'facilities';
}

export interface ParameterScore {
  parameterId: string;
  score: number;
  remarks?: string;
}

export interface FormData {
  stationName: string;
  inspectionDate: string;
  inspectorName: string;
  scores: Record<string, number>;
  remarks: Record<string, string>;
  totalScore: number;
}

export const inspectionParameters: Parameter[] = [
  // Platform Areas
  {
    id: 'platform-cleanliness',
    name: 'Platform Cleanliness',
    description: 'Overall cleanliness of platform surfaces, absence of litter and debris',
    category: 'platform'
  },
  {
    id: 'platform-sweeping',
    name: 'Platform Sweeping',
    description: 'Evidence of regular sweeping, dust-free surfaces',
    category: 'platform'
  },
  {
    id: 'platform-mopping',
    name: 'Platform Mopping',
    description: 'Wet cleaning status, stain-free surfaces',
    category: 'platform'
  },
  {
    id: 'platform-washing',
    name: 'Platform Washing',
    description: 'Deep cleaning evidence, absence of accumulated dirt',
    category: 'platform'
  },
  {
    id: 'circulating-area',
    name: 'Circulating Area',
    description: 'Passenger circulation areas, concourse cleanliness',
    category: 'platform'
  },
  {
    id: 'waiting-hall',
    name: 'Waiting Hall',
    description: 'Waiting area cleanliness, seating areas condition',
    category: 'platform'
  },
  {
    id: 'reservation-counter',
    name: 'Reservation Counter Area',
    description: 'Ticketing area cleanliness, counter surfaces',
    category: 'platform'
  },
  {
    id: 'enquiry-counter',
    name: 'Enquiry Counter Area',
    description: 'Information desk area, help counter surroundings',
    category: 'platform'
  },

  // Facilities & Amenities
  {
    id: 'toilets-gents',
    name: 'Toilets - Gents',
    description: 'Male restroom cleanliness, hygiene standards',
    category: 'facilities'
  },
  {
    id: 'toilets-ladies',
    name: 'Toilets - Ladies',
    description: 'Female restroom cleanliness, hygiene standards',
    category: 'facilities'
  },
  {
    id: 'urinals',
    name: 'Urinals',
    description: 'Urinal cleanliness, odor control, maintenance',
    category: 'facilities'
  },
  {
    id: 'wash-basins',
    name: 'Wash Basins',
    description: 'Hand washing facilities, soap availability, drainage',
    category: 'facilities'
  },
  {
    id: 'water-cooler',
    name: 'Water Cooler',
    description: 'Drinking water facility cleanliness, water quality',
    category: 'facilities'
  },
  {
    id: 'water-booths',
    name: 'Water Booths/Taps',
    description: 'Water dispensing points, tap cleanliness',
    category: 'facilities'
  },
  {
    id: 'dustbins',
    name: 'Dustbins',
    description: 'Waste bins condition, regular emptying, lid functionality',
    category: 'facilities'
  },
  {
    id: 'spittoons',
    name: 'Spittoons',
    description: 'Spitting containers cleanliness, maintenance',
    category: 'facilities'
  },
  {
    id: 'drains-platform',
    name: 'Drains - Platform',
    description: 'Platform drainage system, blockage-free condition',
    category: 'facilities'
  },
  {
    id: 'drains-toilet',
    name: 'Drains - Toilet',
    description: 'Restroom drainage, odor control, proper flow',
    category: 'facilities'
  },
  {
    id: 'retiring-rooms',
    name: 'Retiring Rooms',
    description: 'Guest accommodation cleanliness, bedding, facilities',
    category: 'facilities'
  },
  {
    id: 'dormitory',
    name: 'Dormitory',
    description: 'Shared accommodation areas, common facilities',
    category: 'facilities'
  }
];
