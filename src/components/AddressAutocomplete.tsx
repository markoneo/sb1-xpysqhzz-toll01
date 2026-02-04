import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { loadGoogleMapsAPI } from '../utils/googleMapsLoader';

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string, placeDetails?: google.maps.places.PlaceResult) => void;
  placeholder: string;
  label: string;
  icon?: 'start' | 'end' | 'transit';
}

export function AddressAutocomplete({
  value,
  onChange,
  placeholder,
  label,
  icon = 'start'
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const iconColor = icon === 'start' ? 'text-green-600' : icon === 'end' ? 'text-red-600' : 'text-yellow-600';

  useEffect(() => {
    let isMounted = true;

    const initAutocomplete = async () => {
      try {
        console.log('Loading Google Maps API...');
        await loadGoogleMapsAPI();
        console.log('Google Maps API loaded successfully');

        if (!isMounted || !inputRef.current) return;

        console.log('Initializing Autocomplete...');
        autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
          fields: ['formatted_address', 'geometry', 'name', 'address_components', 'types']
        });

        autocompleteRef.current.addListener('place_changed', () => {
          const place = autocompleteRef.current?.getPlace();

          if (!place || !place.formatted_address) return;

          const placeTypes = place.types || [];
          const acceptedTypes = [
            'locality', 'administrative_area_level_1', 'administrative_area_level_2',
            'country', 'postal_code', 'street_address', 'route', 'premise',
            'airport', 'train_station', 'transit_station', 'bus_station',
            'sublocality', 'neighborhood', 'political'
          ];

          const rejectedTypes = [
            'lodging', 'real_estate_agency', 'travel_agency', 'store',
            'restaurant', 'cafe', 'bar', 'night_club', 'gym', 'spa'
          ];

          const hasRejectedType = placeTypes.some(type => rejectedTypes.includes(type));
          const hasAcceptedType = placeTypes.some(type => acceptedTypes.includes(type));

          if (hasRejectedType && !hasAcceptedType) {
            console.log('Rejected place type:', placeTypes);
            if (inputRef.current) {
              inputRef.current.value = '';
            }
            return;
          }

          onChange(place.formatted_address, place);
        });

        console.log('Autocomplete initialized successfully');
        setIsLoading(false);
        setError(null);
      } catch (err) {
        console.error('Error initializing autocomplete:', err);
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to load address autocomplete';
          setError(errorMessage);
          setIsLoading(false);
        }
      }
    };

    initAutocomplete();

    return () => {
      isMounted = false;
      if (autocompleteRef.current && typeof google !== 'undefined') {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onChange]);

  return (
    <div>
      <label className="flex items-center text-sm font-medium text-gray-700 mb-3">
        <MapPin className={`w-4 h-4 mr-2 ${iconColor}`} />
        {label}
      </label>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={isLoading ? 'Loading...' : placeholder}
        disabled={isLoading || !!error}
        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-0 text-lg disabled:bg-gray-100"
      />
      {error && (
        <div className="mt-3 p-4 rounded-lg bg-red-50 border border-red-200">
          <p className="text-sm font-semibold text-red-900 mb-2">Google Maps API Configuration Required</p>
          <p className="text-sm text-red-800 mb-2">
            The Google Maps API key needs to be properly configured. Please follow these steps:
          </p>
          <ol className="text-sm text-red-800 list-decimal ml-5 space-y-1">
            <li>Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
            <li>Enable the <strong>Places API</strong> and <strong>Maps JavaScript API</strong></li>
            <li>Enable billing (required by Google, even for free tier)</li>
            <li>Check that API restrictions allow your domain or remove restrictions for testing</li>
          </ol>
        </div>
      )}
    </div>
  );
}
