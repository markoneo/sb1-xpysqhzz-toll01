import { loadGoogleMapsAPI } from '../utils/googleMapsLoader';
import { countryRules } from '../data/countryRules';
import { CountryDistance } from '../types';

export interface RouteData {
  countries: string[];
  countryDistances: CountryDistance[];
  totalDistance: number;
  totalDuration: number;
  legs: Array<{
    distance: number;
    duration: number;
    startAddress: string;
    endAddress: string;
  }>;
  directionsResult?: google.maps.DirectionsResult;
}

export async function calculateRoute(
  startAddress: string,
  endAddress: string,
  waypoints: string[]
): Promise<RouteData | null> {
  try {
    await loadGoogleMapsAPI();

    const directionsService = new google.maps.DirectionsService();

    const waypointsFormatted = waypoints
      .filter(Boolean)
      .map(location => ({
        location,
        stopover: true
      }));

    const request: google.maps.DirectionsRequest = {
      origin: startAddress,
      destination: endAddress,
      waypoints: waypointsFormatted,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: false
    };

    console.log('=== ROUTE CALCULATION START ===');
    console.log('Origin:', startAddress);
    console.log('Destination:', endAddress);
    console.log('Waypoints:', JSON.stringify(waypoints));
    console.log('Waypoints count:', waypoints.filter(Boolean).length);

    return new Promise((resolve, reject) => {
      directionsService.route(request, async (result, status) => {
        console.log('Directions API status:', status);
        try {
          if (status === google.maps.DirectionsStatus.OK && result) {
            const route = result.routes[0];
            let totalDistance = 0;
            let totalDuration = 0;

            const legs = route.legs.map(leg => {
              const legDistanceMeters = leg.distance?.value || 0;
              const legDurationSeconds = leg.duration?.value || 0;
              totalDistance += legDistanceMeters;
              totalDuration += legDurationSeconds;

              console.log('Leg:', {
                start: leg.start_address,
                end: leg.end_address,
                distanceKm: legDistanceMeters / 1000,
                durationMinutes: legDurationSeconds / 60
              });

              return {
                distance: legDistanceMeters / 1000,
                duration: legDurationSeconds / 60,
                startAddress: leg.start_address,
                endAddress: leg.end_address
              };
            });

            const totalDistanceKm = totalDistance / 1000;
            const totalDurationMinutes = totalDuration / 60;

            console.log('Route totals:', { totalDistanceKm, totalDurationMinutes });
            console.log('Number of legs:', route.legs.length);
            console.log('=== ROUTE CALCULATION DATA ===');

            let countryDistances: CountryDistance[] = [];

            try {
              console.log('Attempting accurate polyline-based country detection...');
              countryDistances = await detectCountriesAlongRoute(route, totalDistanceKm);
              console.log('Polyline detection result:', countryDistances);
            } catch (e) {
              console.error('Route country detection failed:', e);
            }

            if (countryDistances.length === 0) {
              console.log('Polyline detection failed, using fallback...');
              try {
                countryDistances = await fallbackCountryDetection(route, totalDistanceKm);
              } catch (e) {
                console.error('Fallback country detection failed:', e);
              }
            }

            const countries = countryDistances.map(cd => cd.countryCode);

            console.log('Final country distances:', countryDistances);
            console.log('Final countries:', countries);

            resolve({
              countries,
              countryDistances,
              totalDistance: totalDistanceKm,
              totalDuration: totalDurationMinutes,
              legs,
              directionsResult: result
            });
          } else {
            reject(new Error(`Directions request failed: ${status}`));
          }
        } catch (error) {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error calculating route:', error);
    return null;
  }
}

async function detectCountriesAlongRoute(
  route: google.maps.DirectionsRoute,
  totalDistanceKm: number
): Promise<CountryDistance[]> {
  const geocoder = new google.maps.Geocoder();

  let allPoints: google.maps.LatLng[] = [];

  const overviewPolyline = route.overview_polyline;
  if (overviewPolyline) {
    try {
      const polylineString = typeof overviewPolyline === 'string'
        ? overviewPolyline
        : (overviewPolyline as { points?: string }).points;

      if (polylineString) {
        allPoints = google.maps.geometry.encoding.decodePath(polylineString);
        console.log(`Decoded ${allPoints.length} points from overview polyline`);
      }
    } catch (e) {
      console.error('Failed to decode polyline:', e);
    }
  }

  if (allPoints.length === 0) {
    console.log('Overview polyline empty, trying step polylines...');
    for (const leg of route.legs) {
      for (const step of leg.steps) {
        if (step.path && step.path.length > 0) {
          allPoints.push(...step.path);
        } else if (step.polyline?.points) {
          try {
            const stepPoints = google.maps.geometry.encoding.decodePath(step.polyline.points);
            allPoints.push(...stepPoints);
          } catch (e) {
            console.error('Failed to decode step polyline:', e);
          }
        }
      }
    }
    console.log(`Decoded ${allPoints.length} points from step polylines`);
  }

  if (allPoints.length === 0) {
    console.log('No path points found in route');
    return [];
  }

  const pointDistances: number[] = [0];
  for (let i = 1; i < allPoints.length; i++) {
    const segmentDist = google.maps.geometry.spherical.computeDistanceBetween(
      allPoints[i - 1],
      allPoints[i]
    ) / 1000;
    pointDistances.push(pointDistances[i - 1] + segmentDist);
  }

  const totalPathDistance = pointDistances[pointDistances.length - 1] || totalDistanceKm;
  console.log(`Total path distance from polyline: ${totalPathDistance.toFixed(1)} km`);

  const numSamples = Math.min(50, Math.max(15, Math.floor(totalDistanceKm / 10)));
  console.log(`Using ${numSamples} sample points for country detection`);
  
  const sampleIndices: number[] = [];
  for (let i = 0; i < numSamples; i++) {
    const targetDistance = (totalPathDistance * i) / (numSamples - 1);
    let closestIndex = 0;
    let closestDiff = Math.abs(pointDistances[0] - targetDistance);

    for (let j = 1; j < pointDistances.length; j++) {
      const diff = Math.abs(pointDistances[j] - targetDistance);
      if (diff < closestDiff) {
        closestDiff = diff;
        closestIndex = j;
      }
    }

    if (!sampleIndices.includes(closestIndex)) {
      sampleIndices.push(closestIndex);
    }
  }

  console.log(`Sampling ${sampleIndices.length} unique points along route`);

  const sampledCountries: Array<{ countryCode: string; distanceKm: number }> = [];

  for (const idx of sampleIndices) {
    const point = allPoints[idx];
    const distanceKm = pointDistances[idx];

    try {
      const countryCode = await reverseGeocodeToCountry(geocoder, point);
      if (countryCode && countryRules[countryCode]) {
        sampledCountries.push({ countryCode, distanceKm });
        console.log(`Point at ${distanceKm.toFixed(1)}km: ${countryCode}`);
      } else if (countryCode) {
        console.log(`Point at ${distanceKm.toFixed(1)}km: ${countryCode} (not in country rules)`);
      }
    } catch (error) {
      console.error('Geocoding error at point:', error);
    }

    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`Successfully geocoded ${sampledCountries.length} points`);

  if (sampledCountries.length === 0) {
    return [];
  }

  const countrySegments: Array<{ countryCode: string; startKm: number; endKm: number }> = [];
  let currentCountry = sampledCountries[0].countryCode;
  let segmentStart = 0;

  for (let i = 1; i < sampledCountries.length; i++) {
    if (sampledCountries[i].countryCode !== currentCountry) {
      const boundaryKm = (sampledCountries[i - 1].distanceKm + sampledCountries[i].distanceKm) / 2;
      countrySegments.push({
        countryCode: currentCountry,
        startKm: segmentStart,
        endKm: boundaryKm
      });
      console.log(`Border detected at ~${boundaryKm.toFixed(1)}km: ${currentCountry} -> ${sampledCountries[i].countryCode}`);
      segmentStart = boundaryKm;
      currentCountry = sampledCountries[i].countryCode;
    }
  }

  countrySegments.push({
    countryCode: currentCountry,
    startKm: segmentStart,
    endKm: totalDistanceKm
  });

  const countryDistanceMap = new Map<string, number>();
  for (const segment of countrySegments) {
    const distance = segment.endKm - segment.startKm;
    const existing = countryDistanceMap.get(segment.countryCode) || 0;
    countryDistanceMap.set(segment.countryCode, existing + distance);
  }

  const result: CountryDistance[] = [];
  const orderedCountries: string[] = [];

  for (const segment of countrySegments) {
    if (!orderedCountries.includes(segment.countryCode)) {
      orderedCountries.push(segment.countryCode);
    }
  }

  for (const countryCode of orderedCountries) {
    const distance = Math.round((countryDistanceMap.get(countryCode) || 0) * 10) / 10;
    result.push({ countryCode, distance });
    console.log(`Country ${countryCode}: ${distance} km`);
  }

  return result;
}

const countryNameToCode: Record<string, string> = {
  'Austria': 'AT',
  'Belgium': 'BE',
  'Bulgaria': 'BG',
  'Croatia': 'HR',
  'Czech Republic': 'CZ',
  'Czechia': 'CZ',
  'France': 'FR',
  'Germany': 'DE',
  'Greece': 'GR',
  'Hungary': 'HU',
  'Italy': 'IT',
  'Italia': 'IT',
  'Netherlands': 'NL',
  'Poland': 'PL',
  'Portugal': 'PT',
  'Romania': 'RO',
  'Serbia': 'RS',
  'Slovakia': 'SK',
  'Slovenia': 'SI',
  'Slovenija': 'SI',
  'Spain': 'ES',
  'Switzerland': 'CH',
  'Schweiz': 'CH',
  'Suisse': 'CH',
  'Svizzera': 'CH',
  'Deutschland': 'DE',
  'Österreich': 'AT',
  'Polska': 'PL',
  'Hrvatska': 'HR',
  'Magyarország': 'HU',
  'Slovensko': 'SK',
  'Česko': 'CZ',
  'România': 'RO',
  'България': 'BG',
  'Ελλάδα': 'GR',
  'España': 'ES',
  'België': 'BE',
  'Belgique': 'BE',
  'Nederland': 'NL',
  'Србија': 'RS'
};

function extractCountryFromAddress(address: string): string | null {
  console.log('Extracting country from address:', address);
  const parts = address.split(',').map(p => p.trim());
  console.log('Address parts:', parts);

  for (let i = parts.length - 1; i >= 0; i--) {
    const part = parts[i].replace(/\d+/g, '').trim();
    console.log('Checking part:', part);

    for (const [name, code] of Object.entries(countryNameToCode)) {
      if (part.toLowerCase().includes(name.toLowerCase()) ||
          part.toLowerCase() === name.toLowerCase()) {
        console.log('Found match:', name, '->', code);
        return code;
      }
    }
  }

  console.log('No country found in address');
  return null;
}

async function fallbackCountryDetection(
  route: google.maps.DirectionsRoute,
  totalDistanceKm: number
): Promise<CountryDistance[]> {
  const countries: string[] = [];

  for (const leg of route.legs) {
    console.log('Fallback detection - leg start:', leg.start_address);
    console.log('Fallback detection - leg end:', leg.end_address);

    if (leg.start_address) {
      const startCountry = extractCountryFromAddress(leg.start_address);
      console.log('Extracted start country:', startCountry);
      if (startCountry && countryRules[startCountry] && !countries.includes(startCountry)) {
        countries.push(startCountry);
      }
    }

    if (leg.end_address) {
      const endCountry = extractCountryFromAddress(leg.end_address);
      console.log('Extracted end country:', endCountry);
      if (endCountry && countryRules[endCountry] && !countries.includes(endCountry)) {
        countries.push(endCountry);
      }
    }
  }

  console.log('Fallback detected countries:', countries);

  if (countries.length === 0) {
    return [];
  }

  const distancePerCountry = totalDistanceKm / countries.length;
  return countries.map(countryCode => ({
    countryCode,
    distance: Math.round(distancePerCountry * 10) / 10
  }));
}

async function reverseGeocodeToCountry(
  geocoder: google.maps.Geocoder,
  location: google.maps.LatLng
): Promise<string | null> {
  return new Promise((resolve) => {
    geocoder.geocode({ location }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        const countryComponent = results[0].address_components.find(
          component => component.types.includes('country')
        );
        if (countryComponent) {
          resolve(countryComponent.short_name);
          return;
        }
      }
      resolve(null);
    });
  });
}

export async function getCountriesFromAddresses(
  startAddress: string,
  endAddress: string,
  waypoints: string[] = []
): Promise<string[]> {
  try {
    await loadGoogleMapsAPI();
    const geocoder = new google.maps.Geocoder();

    const addresses = [startAddress, ...waypoints.filter(Boolean), endAddress];
    const countries = new Set<string>();

    for (const address of addresses) {
      try {
        const result = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
          geocoder.geocode({ address }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK && results) {
              resolve(results);
            } else {
              reject(new Error(`Geocoding failed: ${status}`));
            }
          });
        });

        if (result && result[0]) {
          const addressComponents = result[0].address_components;
          const countryComponent = addressComponents.find(
            component => component.types.includes('country')
          );

          if (countryComponent) {
            const countryCode = countryComponent.short_name;
            if (countryRules[countryCode]) {
              countries.add(countryCode);
            }
          }
        }
      } catch (error) {
        console.error(`Error geocoding address ${address}:`, error);
      }
    }

    return Array.from(countries);
  } catch (error) {
    console.error('Error getting countries from addresses:', error);
    return [];
  }
}
