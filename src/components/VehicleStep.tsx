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
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Vehicle Type</h2>
        <p className="text-gray-600 mb-6">Select your vehicle type</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => onChange('vehicleType', 'car')}
            className={`p-6 rounded-xl border-2 transition-all ${
              vehicleType === 'car'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Car className={`w-12 h-12 mb-3 mx-auto ${
              vehicleType === 'car' ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <div className="text-lg font-medium text-gray-900">Car</div>
            <div className="text-sm text-gray-500 mt-1">Standard passenger car</div>
          </button>

          <button
            onClick={() => onChange('vehicleType', 'van')}
            className={`p-6 rounded-xl border-2 transition-all ${
              vehicleType === 'van'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Truck className={`w-12 h-12 mb-3 mx-auto ${
              vehicleType === 'van' ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <div className="text-lg font-medium text-gray-900">Van / Minivan</div>
            <div className="text-sm text-gray-500 mt-1">Light commercial vehicle</div>
          </button>

          <button
            disabled
            className="p-6 rounded-xl border-2 border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
          >
            <Truck className="w-12 h-12 mb-3 mx-auto text-gray-300" />
            <div className="text-lg font-medium text-gray-400">Truck</div>
            <div className="text-sm text-gray-400 mt-1">Coming soon</div>
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Vehicle Details</h2>
        <p className="text-gray-600 mb-6">Provide additional vehicle information</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <Settings2 className="w-4 h-4 mr-2" />
              Number of Axles
            </label>
            <select
              value={axles}
              onChange={(e) => onChange('axles', parseInt(e.target.value))}
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-0 text-lg"
            >
              <option value={2}>2 Axles (Standard)</option>
              <option value={3}>3 Axles</option>
              <option value={4}>4 Axles</option>
            </select>
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
              <Fuel className="w-4 h-4 mr-2" />
              Fuel Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onChange('fuelType', 'petrol')}
                className={`px-4 py-3 rounded-lg border-2 transition-all ${
                  fuelType === 'petrol'
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                Petrol
              </button>
              <button
                onClick={() => onChange('fuelType', 'diesel')}
                className={`px-4 py-3 rounded-lg border-2 transition-all ${
                  fuelType === 'diesel'
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                Diesel
              </button>
              <button
                onClick={() => onChange('fuelType', 'electric')}
                className={`px-4 py-3 rounded-lg border-2 transition-all flex items-center justify-center gap-1 ${
                  fuelType === 'electric'
                    ? 'border-blue-500 bg-blue-50 text-blue-700 font-medium'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Zap className="w-4 h-4" />
                Electric
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
