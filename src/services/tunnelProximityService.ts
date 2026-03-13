import { countryRules } from '../data/countryRules';

function decodePolyline(encoded: string): Array<{ lat: number; lng: number }> {
  const points: Array<{ lat: number; lng: number }> = [];
  let index = 0;
  let lat = 0;
  let lng = 0;

  while (index < encoded.length) {
    let result = 0;
    let shift = 0;
    let b: number;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    lat += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;

    result = 0;
    shift = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    lng += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;

    points.push({ lat: lat / 1e5, lng: lng / 1e5 });
  }

  return points;
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const COUNTRY_NAME_TO_CODE: Record<string, string> = {
  'Austria': 'AT', 'Switzerland': 'CH', 'Italy': 'IT', 'France': 'FR',
  'Germany': 'DE', 'Slovenia': 'SI', 'Croatia': 'HR', 'Spain': 'ES',
  'Portugal': 'PT', 'Czech Republic': 'CZ', 'Czechia': 'CZ', 'Hungary': 'HU',
  'Slovakia': 'SK', 'Romania': 'RO', 'Bulgaria': 'BG', 'Poland': 'PL',
  'Serbia': 'RS', 'Greece': 'GR',
};

const CROSS_BORDER_GROUPS: string[][] = [
  ['fr-montblanc', 'it-montblanc'],
  ['fr-frejus', 'it-frejus'],
  ['ch-grandstbernard', 'it-grandstbernard'],
];

const PROXIMITY_THRESHOLD_KM = 12;

export function detectTunnelsByProximity(
  directionsResult: google.maps.DirectionsResult,
  routeIndex: number
): string[] {
  const route = directionsResult.routes[routeIndex];
  if (!route?.overview_polyline?.points) return [];

  const routePoints = decodePolyline(route.overview_polyline.points);
  if (routePoints.length === 0) return [];

  const allTolls: Array<{ id: string; lat: number; lng: number; countryCode: string }> = [];
  for (const [countryCode, rule] of Object.entries(countryRules)) {
    for (const toll of rule.specialTolls ?? []) {
      allTolls.push({ id: toll.id, lat: toll.lat, lng: toll.lng, countryCode });
    }
  }

  const detected = new Set<string>();
  for (const toll of allTolls) {
    for (const pt of routePoints) {
      if (haversineKm(pt.lat, pt.lng, toll.lat, toll.lng) <= PROXIMITY_THRESHOLD_KM) {
        detected.add(toll.id);
        break;
      }
    }
  }

  if (detected.size === 0) return [];

  const routeCountryOrder: string[] = [];
  for (const leg of route.legs) {
    for (const addr of [leg.start_address, leg.end_address]) {
      const parts = addr.split(',').map((p: string) => p.trim()).reverse();
      for (const part of parts) {
        for (const [name, code] of Object.entries(COUNTRY_NAME_TO_CODE)) {
          if (part.toLowerCase().includes(name.toLowerCase()) && !routeCountryOrder.includes(code)) {
            routeCountryOrder.push(code);
          }
        }
      }
    }
  }

  const result = Array.from(detected);

  for (const group of CROSS_BORDER_GROUPS) {
    const inGroup = group.filter(id => detected.has(id));
    if (inGroup.length <= 1) continue;

    const best = inGroup.reduce((bestId, id) => {
      const tollA = allTolls.find(t => t.id === id);
      const tollB = allTolls.find(t => t.id === bestId);
      const idxA = tollA ? routeCountryOrder.indexOf(tollA.countryCode) : Infinity;
      const idxB = tollB ? routeCountryOrder.indexOf(tollB.countryCode) : Infinity;
      const effectiveA = idxA === -1 ? Infinity : idxA;
      const effectiveB = idxB === -1 ? Infinity : idxB;
      return effectiveA < effectiveB ? id : bestId;
    });

    for (const id of inGroup) {
      if (id !== best) {
        const idx = result.indexOf(id);
        if (idx !== -1) result.splice(idx, 1);
      }
    }
  }

  console.log('Proximity tunnel detection result:', result);
  return result;
}
