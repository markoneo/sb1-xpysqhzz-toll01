import { useState, useEffect, useRef } from 'react';
import { Plus, X } from 'lucide-react';
import { AddressAutocomplete } from './AddressAutocomplete';
import { RoutePreviewMap } from './RoutePreviewMap';
import { SpecialTollSelector } from './SpecialTollSelector';
import { SelectedSpecialToll } from '../types';
import { detectTunnelsWithAI } from '../services/tunnelDetectionService';

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
  const lastDetectionKey = useRef<string>('');

  useEffect(() => {
    if (!startAddress || !endAddress) {
      setAiDetectedTunnelIds([]);
      return;
    }

    const detectionKey = `${startAddress}|${endAddress}|${waypointAddresses.join('|')}`;
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
  }, [startAddress, endAddress, waypointAddresses]);

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
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Route Details</h2>
        <p className="text-gray-600 mb-6">Enter your start and end addresses</p>

        <div className="space-y-6">
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
            className="w-full px-4 py-3 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Waypoint (Optional)
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
            onRouteCalculated={onRoutePreviewCalculated}
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Trip Type</h2>
        <p className="text-gray-600 mb-6">Will you be returning?</p>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onChange('tripType', 'one-way')}
            className={`p-6 rounded-xl border-2 transition-all ${
              tripType === 'one-way'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-lg font-medium text-gray-900">One-Way</div>
            <div className="text-sm text-gray-500 mt-1">Single journey</div>
          </button>

          <button
            onClick={() => onChange('tripType', 'return')}
            className={`p-6 rounded-xl border-2 transition-all ${
              tripType === 'return'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-lg font-medium text-gray-900">Return</div>
            <div className="text-sm text-gray-500 mt-1">Round trip</div>
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
