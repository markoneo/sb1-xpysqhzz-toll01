import { useEffect, useRef, useState, useCallback } from 'react';
import { loadGoogleMapsAPI } from '../utils/googleMapsLoader';
import { MapPin } from 'lucide-react';

interface RoutePreviewMapProps {
  startAddress: string;
  endAddress: string;
  waypointAddresses: string[];
  onRouteCalculated?: (result: google.maps.DirectionsResult | null) => void;
}

export function RoutePreviewMap({ startAddress, endAddress, waypointAddresses, onRouteCalculated }: RoutePreviewMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      try {
        await loadGoogleMapsAPI();
        if (isMounted) {
          setIsLoaded(true);
        }
      } catch {
        console.error('Failed to load Google Maps');
      }
    }

    initMap();

    return () => {
      isMounted = false;
    };
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
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      geocoderRef.current = new google.maps.Geocoder();

      directionsRendererRef.current = new google.maps.DirectionsRenderer({
        map: mapInstanceRef.current,
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: '#2563eb',
          strokeWeight: 4,
          strokeOpacity: 0.7
        }
      });
    }
  }, [isLoaded]);

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
          travelMode: google.maps.TravelMode.DRIVING
        });

        directionsRendererRef.current.setDirections(result);
        clearMarkers();
        onRouteCalculated?.(result);
      } catch {
        directionsRendererRef.current.setDirections({ routes: [] } as google.maps.DirectionsResult);
        showMarkersOnly();
        onRouteCalculated?.(null);
      }
    } else {
      directionsRendererRef.current.setDirections({ routes: [] } as google.maps.DirectionsResult);
      showMarkersOnly();
      onRouteCalculated?.(null);
    }
  }, [isLoaded, startAddress, endAddress, waypointAddresses, clearMarkers, onRouteCalculated]);

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
            if (status === google.maps.GeocoderStatus.OK && results) {
              resolve(results);
            } else {
              reject(new Error(status));
            }
          });
        });

        if (result[0]) {
          const location = result[0].geometry.location;
          bounds.extend(location);
          hasValidLocation = true;

          const marker = new google.maps.Marker({
            position: location,
            map: mapInstanceRef.current,
            label: {
              text: label,
              color: '#ffffff',
              fontWeight: 'bold'
            },
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
      if (markersRef.current.length === 1) {
        mapInstanceRef.current.setZoom(12);
      }
    }
  }, [startAddress, endAddress, waypointAddresses, clearMarkers]);

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      updateRoute();
    }, 500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
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

  return (
    <div className="w-full rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm">
      <div
        ref={mapRef}
        className="w-full h-64"
        style={{ minHeight: '256px' }}
      />
    </div>
  );
}
