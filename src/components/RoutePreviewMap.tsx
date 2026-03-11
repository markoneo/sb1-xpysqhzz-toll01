import { useEffect, useRef, useState, useCallback } from 'react';
import { loadGoogleMapsAPI } from '../utils/googleMapsLoader';
import { MapPin, Navigation } from 'lucide-react';

interface RoutePreviewMapProps {
  startAddress: string;
  endAddress: string;
  waypointAddresses: string[];
  selectedRouteIndex: number;
  onRouteCalculated?: (result: google.maps.DirectionsResult | null) => void;
  onRouteSelected?: (index: number) => void;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} h`;
  return `${hours} h ${minutes} min`;
}

function getTotalSeconds(result: google.maps.DirectionsResult, routeIndex: number): number {
  const route = result.routes[routeIndex];
  if (!route) return 0;
  return route.legs.reduce((sum: number, leg: google.maps.DirectionsLeg) => sum + (leg.duration?.value || 0), 0);
}

function getTotalMeters(result: google.maps.DirectionsResult, routeIndex: number): number {
  const route = result.routes[routeIndex];
  if (!route) return 0;
  return route.legs.reduce((sum: number, leg: google.maps.DirectionsLeg) => sum + (leg.distance?.value || 0), 0);
}

function getRouteLabel(route: google.maps.DirectionsRoute): string {
  if (route.summary) return `via ${route.summary}`;
  return 'Route';
}

function decodePolyline(route: google.maps.DirectionsRoute): google.maps.LatLng[] {
  const polyline = route.overview_polyline;
  if (!polyline) return [];
  const points = typeof polyline === 'string' ? polyline : (polyline as { points?: string }).points;
  if (!points) return [];
  try {
    return google.maps.geometry.encoding.decodePath(points);
  } catch {
    return [];
  }
}

export function RoutePreviewMap({
  startAddress,
  endAddress,
  waypointAddresses,
  selectedRouteIndex,
  onRouteCalculated,
  onRouteSelected
}: RoutePreviewMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const altPolylinesRef = useRef<google.maps.Polyline[]>([]);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [directionsResult, setDirectionsResult] = useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function initMap() {
      try {
        await loadGoogleMapsAPI();
        if (isMounted) setIsLoaded(true);
      } catch {
        console.error('Failed to load Google Maps');
      }
    }
    initMap();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        zoom: 5,
        center: { lat: 46.8, lng: 8.2 },
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: true,
        styles: [
          { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
          { featureType: 'transit', elementType: 'labels', stylers: [{ visibility: 'off' }] }
        ]
      });
      geocoderRef.current = new google.maps.Geocoder();
      directionsRendererRef.current = new google.maps.DirectionsRenderer({
        map: mapInstanceRef.current,
        suppressMarkers: false,
        routeIndex: selectedRouteIndex,
        polylineOptions: {
          strokeColor: '#2563eb',
          strokeWeight: 5,
          strokeOpacity: 0.9,
          zIndex: 10
        }
      });
    }
  }, [isLoaded]);

  const clearAltPolylines = useCallback(() => {
    altPolylinesRef.current.forEach(p => p.setMap(null));
    altPolylinesRef.current = [];
  }, []);

  const drawAltPolylines = useCallback((result: google.maps.DirectionsResult, selectedIdx: number) => {
    clearAltPolylines();
    if (!mapInstanceRef.current) return;
    result.routes.forEach((route, idx) => {
      if (idx === selectedIdx) return;
      const path = decodePolyline(route);
      if (path.length === 0) return;
      const polyline = new google.maps.Polyline({
        path,
        map: mapInstanceRef.current!,
        strokeColor: '#6b7280',
        strokeWeight: 4,
        strokeOpacity: 0.5,
        clickable: true,
        zIndex: 1
      });
      polyline.addListener('click', () => {
        onRouteSelected?.(idx);
      });
      altPolylinesRef.current.push(polyline);
    });
  }, [clearAltPolylines, onRouteSelected]);

  useEffect(() => {
    if (!directionsResult || !directionsRendererRef.current || !mapInstanceRef.current) return;
    directionsRendererRef.current.setRouteIndex(selectedRouteIndex);
    drawAltPolylines(directionsResult, selectedRouteIndex);
  }, [selectedRouteIndex, directionsResult, drawAltPolylines]);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
  }, []);

  const updateRoute = useCallback(async () => {
    if (!isLoaded || !mapInstanceRef.current || !directionsRendererRef.current) return;

    const hasStart = startAddress.trim().length > 3;
    const hasEnd = endAddress.trim().length > 3;

    if (!hasStart && !hasEnd) {
      directionsRendererRef.current.setDirections({ routes: [] } as google.maps.DirectionsResult);
      clearMarkers();
      clearAltPolylines();
      setDirectionsResult(null);
      onRouteCalculated?.(null);
      return;
    }

    if (hasStart && hasEnd) {
      const directionsService = new google.maps.DirectionsService();
      const waypointsFormatted = waypointAddresses
        .filter(wp => wp.trim().length > 3)
        .map(location => ({ location, stopover: true }));

      try {
        const result = await directionsService.route({
          origin: startAddress,
          destination: endAddress,
          waypoints: waypointsFormatted,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: waypointsFormatted.length === 0
        });

        directionsRendererRef.current.setRouteIndex(0);
        directionsRendererRef.current.setDirections(result);
        clearMarkers();
        setDirectionsResult(result);
        drawAltPolylines(result, 0);
        onRouteCalculated?.(result);
      } catch {
        directionsRendererRef.current.setDirections({ routes: [] } as google.maps.DirectionsResult);
        setDirectionsResult(null);
        clearAltPolylines();
        showMarkersOnly();
        onRouteCalculated?.(null);
      }
    } else {
      directionsRendererRef.current.setDirections({ routes: [] } as google.maps.DirectionsResult);
      setDirectionsResult(null);
      clearAltPolylines();
      showMarkersOnly();
      onRouteCalculated?.(null);
    }
  }, [isLoaded, startAddress, endAddress, waypointAddresses, clearMarkers, clearAltPolylines, drawAltPolylines, onRouteCalculated]);

  const showMarkersOnly = useCallback(async () => {
    if (!geocoderRef.current || !mapInstanceRef.current) return;
    clearMarkers();
    const bounds = new google.maps.LatLngBounds();
    let hasValidLocation = false;
    const addresses = [
      { address: startAddress, label: 'A', color: '#16a34a' },
      ...waypointAddresses.map((addr, i) => ({ address: addr, label: String(i + 1), color: '#2563eb' })),
      { address: endAddress, label: 'B', color: '#dc2626' }
    ];
    for (const { address, label, color } of addresses) {
      if (address.trim().length < 3) continue;
      try {
        const result = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
          geocoderRef.current!.geocode({ address }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results) resolve(results);
            else reject(new Error(status));
          });
        });
        if (result[0]) {
          const location = result[0].geometry.location;
          bounds.extend(location);
          hasValidLocation = true;
          const marker = new google.maps.Marker({
            position: location,
            map: mapInstanceRef.current,
            label: { text: label, color: '#ffffff', fontWeight: 'bold' },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 12,
              fillColor: color,
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2
            }
          });
          markersRef.current.push(marker);
        }
      } catch {
        // Skip invalid addresses
      }
    }
    if (hasValidLocation) {
      mapInstanceRef.current.fitBounds(bounds, 50);
      if (markersRef.current.length === 1) mapInstanceRef.current.setZoom(12);
    }
  }, [startAddress, endAddress, waypointAddresses, clearMarkers]);

  useEffect(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => { updateRoute(); }, 500);
    return () => { if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current); };
  }, [updateRoute]);

  if (!isLoaded) {
    return (
      <div className="w-full h-64 rounded-xl bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <MapPin className="w-8 h-8 mx-auto mb-2 animate-pulse" />
          <p className="text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  const hasMultipleRoutes = directionsResult && directionsResult.routes.length > 1;

  return (
    <div className="w-full rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm">
      <div ref={mapRef} className="w-full h-64" style={{ minHeight: '256px' }} />

      {hasMultipleRoutes && (
        <div className="bg-white border-t-2 border-gray-100">
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5" />
              Choose a route
            </p>
          </div>
          <div className="divide-y divide-gray-100">
            {directionsResult.routes.map((route, idx) => {
              const totalSeconds = getTotalSeconds(directionsResult, idx);
              const totalMeters = getTotalMeters(directionsResult, idx);
              const isSelected = idx === selectedRouteIndex;
              return (
                <button
                  key={idx}
                  onClick={() => onRouteSelected?.(idx)}
                  data-testid={`button-route-option-${idx}`}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-all duration-150 hover:bg-gray-50 active:bg-gray-100 ${
                    isSelected ? 'bg-blue-50' : ''
                  }`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                      isSelected ? 'bg-blue-600' : 'bg-gray-400'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium truncate ${isSelected ? 'text-blue-700' : 'text-gray-800'}`}>
                      {getRouteLabel(route)}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {Math.round(totalMeters / 1000)} km
                    </div>
                  </div>
                  <div className={`text-sm font-semibold flex-shrink-0 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}>
                    {formatDuration(totalSeconds)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
