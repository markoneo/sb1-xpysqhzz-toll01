export type VehicleType = 'car' | 'van' | 'truck';
export type FuelType = 'petrol' | 'diesel' | 'electric';
export type TripType = 'one-way' | 'return';

export interface CountryDistance {
  countryCode: string;
  distance: number;
  highwayDistance: number;
}

export interface SelectedSpecialToll {
  id: string;
  countryCode: string;
  name: string;
  price: number;
}

export interface TripData {
  vehicleType: VehicleType;
  axles: number;
  fuelType: FuelType;
  startAddress: string;
  endAddress: string;
  waypointAddresses: string[];
  tripType: TripType;
  startDate: string;
  endDate: string;
  tripDurationDays: number;
  ownedVignettes: string[];
  selectedSpecialTolls: SelectedSpecialToll[];
  routeData?: {
    countries: string[];
    countryDistances: CountryDistance[];
    totalDistance: number;
    totalDuration: number;
    directionsResult?: google.maps.DirectionsResult;
  };
}

export interface CountryCost {
  countryCode: string;
  countryName: string;
  flag: string;
  tollCost: number;
  vignetteCost: number;
  specialTollsCost: number;
  specialTollsSelected: { name: string; price: number }[];
  vignetteRequired: boolean;
  vignetteOwned: boolean;
  vignetteOption?: string;
  estimatedDistance: number;
  highwayDistance: number;
  notes: string;
}

export interface CalculationResult {
  totalCost: number;
  countryCosts: CountryCost[];
  totalDistance: number;
  estimatedDrivingTime: number;
  currency: string;
}
