import { useMemo, useEffect, useRef } from 'react';
import { Check, Mountain, Navigation, Loader2, Sparkles } from 'lucide-react';
import { countryRules, SpecialToll } from '../data/countryRules';
import { SelectedSpecialToll } from '../types';

interface SpecialTollSelectorProps {
  selectedSpecialTolls: SelectedSpecialToll[];
  onChange: (tolls: SelectedSpecialToll[]) => void;
  directionsResult?: google.maps.DirectionsResult;
  aiDetectedTunnelIds?: string[];
  isDetectingTunnels?: boolean;
}

const DETECTION_RADIUS_KM = 8;

function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getRoutePoints(directionsResult: google.maps.DirectionsResult): { lat: number; lng: number }[] {
  const points: { lat: number; lng: number }[] = [];
  const route = directionsResult.routes[0];
  if (!route) return points;

  const overviewPolyline = route.overview_polyline;
  if (overviewPolyline && google.maps.geometry?.encoding) {
    try {
      const polylineString = typeof overviewPolyline === 'string'
        ? overviewPolyline
        : (overviewPolyline as { points?: string }).points;

      if (polylineString) {
        const decodedPoints = google.maps.geometry.encoding.decodePath(polylineString);
        decodedPoints.forEach(point => {
          points.push({ lat: point.lat(), lng: point.lng() });
        });
      }
    } catch (e) {
      console.error('Failed to decode overview polyline:', e);
    }
  }

  if (points.length === 0) {
    route.legs.forEach(leg => {
      leg.steps.forEach(step => {
        if (step.polyline?.points && google.maps.geometry?.encoding) {
          try {
            const stepPoints = google.maps.geometry.encoding.decodePath(step.polyline.points);
            stepPoints.forEach(point => {
              points.push({ lat: point.lat(), lng: point.lng() });
            });
          } catch (e) {
            console.error('Failed to decode step polyline:', e);
          }
        } else if (step.path) {
          step.path.forEach(point => {
            points.push({ lat: point.lat(), lng: point.lng() });
          });
        }
        if (step.start_location) {
          points.push({ lat: step.start_location.lat(), lng: step.start_location.lng() });
        }
        if (step.end_location) {
          points.push({ lat: step.end_location.lat(), lng: step.end_location.lng() });
        }
      });
    });
  }

  return points;
}

function isTollOnRoute(toll: SpecialToll, routePoints: { lat: number; lng: number }[]): boolean {
  const step = Math.max(1, Math.floor(routePoints.length / 500));
  for (let i = 0; i < routePoints.length; i += step) {
    const point = routePoints[i];
    const distance = haversineDistance(toll.lat, toll.lng, point.lat, point.lng);
    if (distance <= DETECTION_RADIUS_KM) {
      return true;
    }
  }
  return false;
}

const countriesWithSpecialTolls = Object.values(countryRules)
  .filter(rule => rule.specialTolls && rule.specialTolls.length > 0)
  .sort((a, b) => a.name.localeCompare(b.name));

export function SpecialTollSelector({
  selectedSpecialTolls,
  onChange,
  directionsResult,
  aiDetectedTunnelIds = [],
  isDetectingTunnels = false
}: SpecialTollSelectorProps) {
  const lastAppliedDetection = useRef<string>('');

  const coordinateDetectedTollIds = useMemo(() => {
    if (!directionsResult) return new Set<string>();

    const routePoints = getRoutePoints(directionsResult);
    if (routePoints.length === 0) return new Set<string>();

    const detected = new Set<string>();

    countriesWithSpecialTolls.forEach(country => {
      country.specialTolls?.forEach(toll => {
        if (isTollOnRoute(toll, routePoints)) {
          detected.add(toll.id);
        }
      });
    });

    return detected;
  }, [directionsResult]);

  const detectedTollIds = useMemo(() => {
    if (aiDetectedTunnelIds.length > 0) {
      return new Set(aiDetectedTunnelIds);
    }
    return coordinateDetectedTollIds;
  }, [aiDetectedTunnelIds, coordinateDetectedTollIds]);

  const isAiDetection = aiDetectedTunnelIds.length > 0;

  useEffect(() => {
    if (isDetectingTunnels) return;
    if (detectedTollIds.size === 0) return;

    const detectionKey = Array.from(detectedTollIds).sort().join(',');
    if (detectionKey === lastAppliedDetection.current) return;

    const tollsToSelect: SelectedSpecialToll[] = [];

    countriesWithSpecialTolls.forEach(country => {
      country.specialTolls?.forEach(toll => {
        if (detectedTollIds.has(toll.id)) {
          tollsToSelect.push({
            id: toll.id,
            countryCode: country.code,
            name: toll.name,
            price: toll.price
          });
        }
      });
    });

    if (tollsToSelect.length > 0) {
      lastAppliedDetection.current = detectionKey;
      onChange(tollsToSelect);
    }
  }, [detectedTollIds, isDetectingTunnels, onChange]);

  const toggleToll = (countryCode: string, toll: { id: string; name: string; price: number }) => {
    const isSelected = selectedSpecialTolls.some(t => t.id === toll.id);

    if (isSelected) {
      onChange(selectedSpecialTolls.filter(t => t.id !== toll.id));
    } else {
      onChange([...selectedSpecialTolls, {
        id: toll.id,
        countryCode,
        name: toll.name,
        price: toll.price
      }]);
    }
  };

  const totalSpecialTolls = selectedSpecialTolls.reduce((sum, t) => sum + t.price, 0);
  const hasDetectedTolls = detectedTollIds.size > 0 || isDetectingTunnels;

  const sortedCountries = useMemo(() => {
    if (!hasDetectedTolls) return countriesWithSpecialTolls;

    return [...countriesWithSpecialTolls].sort((a, b) => {
      const aHasDetected = a.specialTolls?.some(t => detectedTollIds.has(t.id)) || false;
      const bHasDetected = b.specialTolls?.some(t => detectedTollIds.has(t.id)) || false;

      if (aHasDetected && !bHasDetected) return -1;
      if (!aHasDetected && bHasDetected) return 1;
      return a.name.localeCompare(b.name);
    });
  }, [hasDetectedTolls, detectedTollIds]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-amber-100">
          <Mountain className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Tunnels & Special Tolls</h3>
          <p className="text-sm text-gray-500">
            {hasDetectedTolls
              ? 'We detected tunnels on your route (auto-selected). Adjust if needed.'
              : 'Select tunnels or mountain passes on your route (charged separately)'}
          </p>
        </div>
      </div>

      {isDetectingTunnels && (
        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 flex items-center gap-2">
          <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
          <span className="text-sm text-blue-800">
            Analyzing route for tunnels...
          </span>
        </div>
      )}

      {!isDetectingTunnels && detectedTollIds.size > 0 && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center gap-2">
          {isAiDetection ? (
            <Sparkles className="w-4 h-4 text-emerald-600" />
          ) : (
            <Navigation className="w-4 h-4 text-emerald-600" />
          )}
          <span className="text-sm text-emerald-800">
            {detectedTollIds.size} tunnel{detectedTollIds.size !== 1 ? 's' : ''} detected on your route
            {isAiDetection && ' (AI-assisted)'}
          </span>
        </div>
      )}

      <div className="space-y-6">
        {sortedCountries.map((country) => {
          const countryHasDetected = country.specialTolls?.some(t => detectedTollIds.has(t.id)) || false;

          return (
            <div key={country.code} className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{country.flag}</span>
                <h4 className="font-medium text-gray-900">{country.name}</h4>
                {countryHasDetected && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                    On route
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-7">
                {country.specialTolls?.map((toll) => {
                  const isSelected = selectedSpecialTolls.some(t => t.id === toll.id);
                  const isDetected = detectedTollIds.has(toll.id);

                  return (
                    <button
                      key={toll.id}
                      onClick={() => toggleToll(country.code, toll)}
                      className={`p-3 rounded-lg border-2 transition-all text-left relative ${
                        isSelected
                          ? isDetected
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-amber-500 bg-amber-50'
                          : isDetected
                            ? 'border-emerald-300 hover:border-emerald-400 hover:bg-emerald-50'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {isDetected && (
                        <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-white text-xs font-medium flex items-center gap-1">
                          <Navigation className="w-3 h-3" />
                          On route
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isSelected
                            ? isDetected ? 'bg-emerald-500' : 'bg-amber-500'
                            : 'border-2 border-gray-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-medium text-gray-900 truncate">{toll.name}</span>
                            <span className={`text-sm font-semibold whitespace-nowrap ${
                              isDetected ? 'text-emerald-600' : 'text-amber-600'
                            }`}>
                              {toll.price.toFixed(2)}
                            </span>
                          </div>
                          {toll.route && (
                            <p className="text-xs text-gray-500 mt-0.5">{toll.route}</p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {selectedSpecialTolls.length > 0 && (
        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-amber-900">
              {selectedSpecialTolls.length} special toll{selectedSpecialTolls.length !== 1 ? 's' : ''} selected
            </span>
            <span className="text-lg font-bold text-amber-700">+{totalSpecialTolls.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
