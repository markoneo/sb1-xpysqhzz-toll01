import { useEffect, useRef, useState } from 'react';
import { loadGoogleMapsAPI } from '../utils/googleMapsLoader';
import { Map, AlertCircle } from 'lucide-react';

interface RouteMapProps {
  directionsResult?: google.maps.DirectionsResult;
}

export function RouteMap({ directionsResult }: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const rendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      try {
        await loadGoogleMapsAPI();
        if (isMounted) {
          setIsLoaded(true);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load map');
        }
      }
    }

    initMap();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !mapRef.current || !directionsResult) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        zoom: 7,
        center: { lat: 46.0, lng: 14.5 },
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
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

      rendererRef.current = new google.maps.DirectionsRenderer({
        map: mapInstanceRef.current,
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: '#2563eb',
          strokeWeight: 5,
          strokeOpacity: 0.8
        }
      });
    }

    if (rendererRef.current && directionsResult) {
      rendererRef.current.setDirections(directionsResult);
    }
  }, [isLoaded, directionsResult]);

  if (error) {
    return (
      <div className="w-full h-80 rounded-xl bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <AlertCircle className="w-10 h-10 mx-auto mb-2" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!directionsResult) {
    return (
      <div className="w-full h-80 rounded-xl bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Map className="w-10 h-10 mx-auto mb-2" />
          <p>No route data available</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-80 md:h-96 rounded-xl bg-gray-100 flex items-center justify-center border-2 border-gray-200">
        <div className="text-center text-gray-500">
          <Map className="w-10 h-10 mx-auto mb-2 animate-pulse" />
          <p>Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm">
      <div
        ref={mapRef}
        className="w-full h-80 md:h-96"
        style={{ minHeight: '320px' }}
      />
    </div>
  );
}
