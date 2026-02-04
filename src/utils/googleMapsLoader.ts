declare global {
  interface Window {
    google: typeof google;
    GOOGLE_MAPS_API_KEY: string;
    googleMapsLoading?: Promise<void>;
  }
}

export function loadGoogleMapsAPI(): Promise<void> {
  if (typeof window.google !== 'undefined' && window.google.maps) {
    console.log('Google Maps already loaded');
    return Promise.resolve();
  }

  if (window.googleMapsLoading) {
    console.log('Google Maps already loading...');
    return window.googleMapsLoading;
  }

  window.googleMapsLoading = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const apiKey = window.GOOGLE_MAPS_API_KEY || import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    console.log('API Key found:', apiKey ? 'Yes (length: ' + apiKey.length + ')' : 'No');

    if (!apiKey) {
      const error = new Error('Google Maps API key is not configured in environment variables');
      console.error(error);
      reject(error);
      return;
    }

    const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&callback=initGoogleMaps`;
    console.log('Loading Google Maps from:', url.substring(0, 80) + '...');

    script.src = url;
    script.async = true;
    script.defer = true;

    (window as any).initGoogleMaps = () => {
      console.log('Google Maps initialized successfully');
      resolve();
      delete (window as any).initGoogleMaps;
    };

    script.onerror = (error) => {
      console.error('Google Maps script loading error:', error);
      console.error('Script src:', script.src);

      const errorMsg = 'Failed to load Google Maps API. Possible issues:\n' +
        '1. Check API key is valid\n' +
        '2. Ensure Places API is enabled in Google Cloud Console\n' +
        '3. Check API key restrictions (HTTP referrers)\n' +
        '4. Verify billing is enabled on your Google Cloud account';

      reject(new Error(errorMsg));
    };

    document.head.appendChild(script);
  });

  return window.googleMapsLoading;
}
