import { useState, useEffect, useRef, useCallback } from 'react';
import { Plus, X } from 'lucide-react';
import { AddressAutocomplete } from './AddressAutocomplete';
import { RoutePreviewMap } from './RoutePreviewMap';
import { SpecialTollSelector } from './SpecialTollSelector';
import { SelectedSpecialToll } from '../types';
import { detectTunnelsWithAI } from '../services/tunnelDetectionService';

const countryNameToCode: Record<string, string> = {
  'Austria': 'AT', 'Belgium': 'BE', 'Bulgaria': 'BG', 'Croatia': 'HR',
  'Czech Republic': 'CZ', 'Czechia': 'CZ', 'France': 'FR', 'Germany': 'DE',
  'Greece': 'GR', 'Hungary': 'HU', 'Italy': 'IT', 'Italia': 'IT',
  'Netherlands': 'NL', 'Poland': 'PL', 'Portugal': 'PT', 'Romania': 'RO',
  'Serbia': 'RS', 'Slovakia': 'SK', 'Slovenia': 'SI', 'Slovenija': 'SI',
  'Spain': 'ES', 'Switzerland': 'CH', 'Schweiz': 'CH', 'Suisse': 'CH',
  'Svizzera': 'CH', 'Deutschland': 'DE', 'Österreich': 'AT'
};

function extractCountryFromAddress(address: string): string | null {
  const parts = address.split(',').map(p => p.trim());
  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i].replace(/\d+/g, '').trim();
    for (const [name, code] of Object.entries(countryNameToCode)) {
      if (part.toLowerCase().includes(name.toLowerCase())) {
        return code;
      }
    }
  }
  return null;
}

interface RouteStepProps {
  startAddress: string;
  endAddress: string;
  waypointAddresses: string[];
  tripType: 'one-way' | 'return';
  selectedSpecialTolls: SelectedSpecialToll[];
  directionsResult?: google.maps.DirectionsResult;
  onChange: (field: string, value: string | string[] | 'one-way' | 'return' | SelectedSpecialToll[]) => void;
  onRoutePreviewCalculated?: (result: google.maps.DirectionsResult | null) => void;
}

export function RouteStep({
  startAddress,
  endAddress,
  waypointAddresses,
  tripType,
  selectedSpecialTolls,
  directionsResult,
  onChange,
  onRoutePreviewCalculated
}: RouteStepProps) {
  const [aiDetectedTunnelIds, setAiDetectedTunnelIds] = useState<string[]>([]);
  const [isDetectingTunnels, setIsDetectingTunnels] = useState(false);
  const [routeCountries, setRouteCountries] = useState<string[]>([]);
  const lastDetectionKey = useRef<string>('');

  const extractCountriesFromRoute = useCallback((result: google.maps.DirectionsResult | null) => {
    if (!result || !result.routes[0]) {
      setRouteCountries([]);
      return;
    }

    const countries = new Set<string>();
    const route = result.routes[0];
    
    for (const leg of route.legs) {
      if (leg.start_address) {
        const code = extractCountryFromAddress(leg.start_address);
        if (code) countries.add(code);
      }
      if (leg.end_address) {
        const code = extractCountryFromAddress(leg.end_address);
        if (code) countries.add(code);
      }
    }

    setRouteCountries(Array.from(countries));
  }, []);

  const handleRouteCalculated = useCallback((result: google.maps.DirectionsResult | null) => {
    extractCountriesFromRoute(result);
    onRoutePreviewCalculated?.(result);
  }, [extractCountriesFromRoute, onRoutePreviewCalculated]);

  useEffect(() => {
    if (!startAddress || !endAddress) {
      setAiDetectedTunnelIds([]);
      return;
    }

    const detectionKey = `${startAddress}|${endAddress}|${waypointAddresses.join('|')}|${routeCountries.join(',')}`;
    if (detectionKey === lastDetectionKey.current) {
      return;
    }

    const detectTunnels = async () => {
      setIsDetectingTunnels(true);
      try {
        const tunnelIds = await detectTunnelsWithAI({
          origin: startAddress,
          destination: endAddress,
          waypoints: waypointAddresses.filter(Boolean),
          countries: routeCountries,
        });
        lastDetectionKey.current = detectionKey;
        setAiDetectedTunnelIds(tunnelIds);
      } catch (error) {
        console.error('AI tunnel detection failed:', error);
      } finally {
        setIsDetectingTunnels(false);
      }
    };

    const timeoutId = setTimeout(detectTunnels, 1000);
    return () => clearTimeout(timeoutId);
  }, [startAddress, endAddress, waypointAddresses, routeCountries]);

  const addWaypoint = () => {
    onChange('waypointAddresses', [...waypointAddresses, '']);
  };

  const removeWaypoint = (index: number) => {
    const newWaypoints = waypointAddresses.filter((_, i) => i !== index);
    onChange('waypointAddresses', newWaypoints);
  };

  const updateWaypoint = (index: number, value: string) => {
    const newWaypoints = [...waypointAddresses];
    newWaypoints[index] = value;
    onChange('waypointAddresses', newWaypoints);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">Route Details</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Enter your start and end addresses</p>

        <div className="space-y-4 sm:space-y-6">
          <AddressAutocomplete
            value={startAddress}
            onChange={(value) => onChange('startAddress', value)}
            placeholder="Enter starting address or city"
            label="Starting Location"
            icon="start"
          />

          {waypointAddresses.map((waypoint, index) => (
            <div key={index} className="relative">
              <div className="flex gap-2">
                <div className="flex-1">
                  <AddressAutocomplete
                    value={waypoint}
                    onChange={(value) => updateWaypoint(index, value)}
                    placeholder="Enter waypoint address"
                    label={`Waypoint #${index + 1}`}
                    icon="transit"
                  />
                </div>
                <button
                  onClick={() => removeWaypoint(index)}
                  className="px-4 py-3 rounded-lg border-2 border-red-200 bg-red-50 hover:bg-red-100 text-red-600 transition-colors self-end"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addWaypoint}
            className="w-full px-4 py-3.5 sm:py-3 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center gap-2 active:scale-98 text-sm sm:text-base"
            data-testid="button-add-waypoint"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Add Waypoint (Optional)</span>
            <span className="sm:hidden">Add Stop</span>
          </button>

          <AddressAutocomplete
            value={endAddress}
            onChange={(value) => onChange('endAddress', value)}
            placeholder="Enter destination address or city"
            label="Destination"
            icon="end"
          />

          <RoutePreviewMap
            startAddress={startAddress}
            endAddress={endAddress}
            waypointAddresses={waypointAddresses}
            onRouteCalculated={handleRouteCalculated}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">Trip Type</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Will you be returning?</p>

        <div className="grid grid-cols-2 gap-2 sm:gap-4">
          <button
            onClick={() => onChange('tripType', 'one-way')}
            className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-200 active:scale-95 ${
              tripType === 'one-way'
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 active:bg-gray-50'
            }`}
            data-testid="button-trip-oneway"
          >
            <div className="text-base sm:text-lg font-medium text-gray-900">One-Way</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">Single journey</div>
          </button>

          <button
            onClick={() => onChange('tripType', 'return')}
            className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-200 active:scale-95 ${
              tripType === 'return'
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 active:bg-gray-50'
            }`}
            data-testid="button-trip-return"
          >
            <div className="text-base sm:text-lg font-medium text-gray-900">Return</div>
            <div className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1">Round trip</div>
          </button>
        </div>
      </div>

      <SpecialTollSelector
        selectedSpecialTolls={selectedSpecialTolls}
        onChange={(tolls) => onChange('selectedSpecialTolls', tolls)}
        directionsResult={directionsResult}
        aiDetectedTunnelIds={aiDetectedTunnelIds}
        isDetectingTunnels={isDetectingTunnels}
      />
    </div>
  );
}
