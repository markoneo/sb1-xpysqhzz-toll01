import { Car, Truck, Zap, Fuel, Settings2 } from 'lucide-react';
import { VehicleType, FuelType } from '../types';
import { VignetteSelector } from './VignetteSelector';

interface VehicleStepProps {
  vehicleType: VehicleType;
  axles: number;
  fuelType: FuelType;
  ownedVignettes: string[];
  onChange: (field: string, value: VehicleType | FuelType | number | string[]) => void;
}

export function VehicleStep({ vehicleType, axles, fuelType, ownedVignettes, onChange }: VehicleStepProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">Vehicle Type</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Select your vehicle type</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <button
            onClick={() => onChange('vehicleType', 'car')}
            className={`p-3 sm:p-6 rounded-xl border-2 transition-all duration-200 active:scale-95 ${
              vehicleType === 'car'
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 active:bg-gray-50'
            }`}
            data-testid="button-vehicle-car"
          >
            <Car className={`w-8 h-8 sm:w-12 sm:h-12 mb-2 sm:mb-3 mx-auto transition-colors ${
              vehicleType === 'car' ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <div className="text-sm sm:text-lg font-medium text-gray-900">Car</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 hidden sm:block">Standard passenger car</div>
          </button>

          <button
            onClick={() => onChange('vehicleType', 'van')}
            className={`p-3 sm:p-6 rounded-xl border-2 transition-all duration-200 active:scale-95 ${
              vehicleType === 'van'
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 active:bg-gray-50'
            }`}
            data-testid="button-vehicle-van"
          >
            <Truck className={`w-8 h-8 sm:w-12 sm:h-12 mb-2 sm:mb-3 mx-auto transition-colors ${
              vehicleType === 'van' ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <div className="text-sm sm:text-lg font-medium text-gray-900">Van</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 hidden sm:block">Light commercial vehicle</div>
          </button>

          <button
            disabled
            className="p-3 sm:p-6 rounded-xl border-2 border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
          >
            <Truck className="w-8 h-8 sm:w-12 sm:h-12 mb-2 sm:mb-3 mx-auto text-gray-300" />
            <div className="text-sm sm:text-lg font-medium text-gray-400">Truck</div>
            <div className="text-xs sm:text-sm text-gray-400 mt-0.5 sm:mt-1 hidden sm:block">Coming soon</div>
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">Vehicle Details</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Provide additional vehicle information</p>

        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2 sm:mb-3">
              <Settings2 className="w-4 h-4 mr-2" />
              Number of Axles
            </label>
            <select
              value={axles}
              onChange={(e) => onChange('axles', parseInt(e.target.value))}
              className="w-full px-4 py-3.5 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 text-base bg-white appearance-none"
              data-testid="select-axles"
            >
              <option value={2}>2 Axles (Standard)</option>
              <option value={3}>3 Axles</option>
              <option value={4}>4 Axles</option>
            </select>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2 sm:mb-3">
              <Fuel className="w-4 h-4 mr-2" />
              Fuel Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onChange('fuelType', 'petrol')}
                className={`px-3 sm:px-4 py-3.5 sm:py-3 rounded-xl border-2 transition-all duration-200 active:scale-95 text-sm sm:text-base ${
                  fuelType === 'petrol'
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium shadow-md'
                    : 'border-gray-200 hover:border-gray-300 active:bg-gray-50'
                }`}
                data-testid="button-fuel-petrol"
              >
                Petrol
              </button>
              <button
                onClick={() => onChange('fuelType', 'diesel')}
                className={`px-3 sm:px-4 py-3.5 sm:py-3 rounded-xl border-2 transition-all duration-200 active:scale-95 text-sm sm:text-base ${
                  fuelType === 'diesel'
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium shadow-md'
                    : 'border-gray-200 hover:border-gray-300 active:bg-gray-50'
                }`}
                data-testid="button-fuel-diesel"
              >
                Diesel
              </button>
              <button
                onClick={() => onChange('fuelType', 'electric')}
                className={`px-3 sm:px-4 py-3.5 sm:py-3 rounded-xl border-2 transition-all duration-200 active:scale-95 flex items-center justify-center gap-1 text-sm sm:text-base ${
                  fuelType === 'electric'
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium shadow-md'
                    : 'border-gray-200 hover:border-gray-300 active:bg-gray-50'
                }`}
                data-testid="button-fuel-electric"
              >
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">Electric</span>
                <span className="sm:hidden">EV</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <VignetteSelector
        ownedVignettes={ownedVignettes}
        onChange={(vignettes) => onChange('ownedVignettes', vignettes)}
      />
    </div>
  );
}
