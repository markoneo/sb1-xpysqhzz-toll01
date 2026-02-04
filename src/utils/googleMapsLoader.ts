declare global {
  interface Window {
    google: typeof google;
    GOOGLE_MAPS_API_KEY: string;
    googleMapsLoading?: Promise<void>;
  }
}

let cachedApiKey: string | null = null;

async function fetchApiKey(): Promise<string> {
  if (cachedApiKey) return cachedApiKey;
  
  try {
    const response = await fetch('/api/config');
    const config = await response.json();
    cachedApiKey = config.googleMapsApiKey || '';
    return cachedApiKey;
  } catch (error) {
    console.error('Failed to fetch config:', error);
    return '';
  }
}

export async function loadGoogleMapsAPI(): Promise<void> {
  if (typeof window.google !== 'undefined' && window.google.maps) {
    console.log('Google Maps already loaded');
    return Promise.resolve();
  }

  if (window.googleMapsLoading) {
    console.log('Google Maps already loading...');
    return window.googleMapsLoading;
  }

  window.googleMapsLoading = new Promise(async (resolve, reject) => {
    const script = document.createElement('script');
    
    const apiKey = window.GOOGLE_MAPS_API_KEY || await fetchApiKey();

    console.log('API Key found:', apiKey ? 'Yes (length: ' + apiKey.length + ')' : 'No');

    if (!apiKey) {
      const error = new Error('Google Maps API key is not configured. Please set GOOGLE_MAPS_API_KEY in your environment.');
      console.error(error);
      reject(error);
      return;
    }

    const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry&callback=initGoogleMaps`;
    console.log('Loading Google Maps from:', url.substring(0, 80) + '...');

    script.src = url;
    script.async = true;
    script.defer = true;

    (window as unknown as Record<string, unknown>).initGoogleMaps = () => {
      console.log('Google Maps initialized successfully');
      resolve();
      delete (window as unknown as Record<string, unknown>).initGoogleMaps;
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
