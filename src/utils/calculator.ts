import { TripData, CalculationResult, CountryCost, CountryDistance } from '../types';
import { countryRules } from '../data/countryRules';

export function calculateTollCosts(tripData: TripData): CalculationResult {
  const useRouteData = tripData.routeData && tripData.routeData.countries.length > 0;
  const countryDistances: CountryDistance[] = useRouteData
    ? tripData.routeData!.countryDistances || []
    : [];

  const countryCosts: CountryCost[] = [];
  let totalCost = 0;
  let totalDistance = useRouteData ? tripData.routeData!.totalDistance : 0;
  const durationMinutes = useRouteData ? tripData.routeData!.totalDuration : 0;
  const hours = Math.floor(durationMinutes / 60);
  const minutes = Math.round(durationMinutes % 60);
  let estimatedDrivingTime = hours + (minutes / 60);

  const ownedVignettes = tripData.ownedVignettes || [];
  const selectedSpecialTolls = tripData.selectedSpecialTolls || [];

  countryDistances.forEach(({ countryCode, distance }) => {
    const rule = countryRules[countryCode];
    if (!rule) return;

    let tollCost = 0;
    let vignetteCost = 0;
    let vignetteRequired = false;
    let vignetteOwned = false;
    let vignetteOption = '';
    const estimatedDistance = distance;

    if (rule.tollSystem === 'distance' && rule.distanceToll) {
      const pricePerKm =
        tripData.vehicleType === 'car'
          ? rule.distanceToll.pricePerKm.car
          : rule.distanceToll.pricePerKm.van;

      tollCost = estimatedDistance * pricePerKm;
    }

    if ((rule.tollSystem === 'vignette' || rule.tollSystem === 'mixed') && rule.vignette?.required) {
      vignetteRequired = true;
      vignetteOwned = ownedVignettes.includes(countryCode);

      if (!vignetteOwned) {
        const bestVignette = selectBestVignette(
          rule.vignette.options,
          tripData.tripDurationDays
        );

        if (bestVignette) {
          vignetteCost = bestVignette.price;
          vignetteOption = bestVignette.duration;
        }
      } else {
        vignetteOption = 'Already owned';
      }
    }

    const countrySpecialTolls = selectedSpecialTolls.filter(t => t.countryCode === countryCode);
    const specialTollsCost = countrySpecialTolls.reduce((sum, t) => sum + t.price, 0);
    const specialTollsSelected = countrySpecialTolls.map(t => ({ name: t.name, price: t.price }));

    const countryCost: CountryCost = {
      countryCode: rule.code,
      countryName: rule.name,
      flag: rule.flag,
      tollCost: Math.round(tollCost * 100) / 100,
      vignetteCost,
      specialTollsCost,
      specialTollsSelected,
      vignetteRequired,
      vignetteOwned,
      vignetteOption,
      estimatedDistance: Math.round(estimatedDistance),
      notes: rule.notes || ''
    };

    countryCosts.push(countryCost);
    totalCost += tollCost + vignetteCost + specialTollsCost;
  });

  if (tripData.tripType === 'return') {
    const oneWayTollCosts = countryCosts.reduce((sum, c) => sum + c.tollCost, 0);
    const oneWaySpecialTolls = countryCosts.reduce((sum, c) => sum + c.specialTollsCost, 0);
    totalCost = totalCost + oneWayTollCosts + oneWaySpecialTolls;
    totalDistance *= 2;
    estimatedDrivingTime *= 2;
  }

  return {
    totalCost: Math.round(totalCost * 100) / 100,
    countryCosts,
    totalDistance: Math.round(totalDistance),
    estimatedDrivingTime,
    currency: 'EUR'
  };
}

function selectBestVignette(
  options: Array<{ duration: string; price: number; durationDays: number }>,
  tripDurationDays: number
) {
  const validOptions = options.filter((opt) => opt.durationDays >= tripDurationDays);

  if (validOptions.length === 0) {
    return options[options.length - 1];
  }

  validOptions.sort((a, b) => a.price - b.price);
  return validOptions[0];
}
