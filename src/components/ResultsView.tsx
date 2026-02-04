import { Euro, Route, Clock, Info, ArrowLeft, MapPin } from 'lucide-react';
import { CalculationResult, TripData } from '../types';
import { RouteMap } from './RouteMap';

interface ResultsViewProps {
  result: CalculationResult;
  tripData: TripData;
  onBack: () => void;
}

export function ResultsView({ result, tripData, onBack }: ResultsViewProps) {
  const isReturnTrip = tripData.tripType === 'return';
  const displayDistance = isReturnTrip ? result.totalDistance * 2 : result.totalDistance;
  const displayDrivingTime = isReturnTrip ? result.estimatedDrivingTime * 2 : result.estimatedDrivingTime;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Cost Estimate</h2>
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg border-2 border-gray-300 hover:bg-gray-50 flex items-center gap-2 transition-colors"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Euro className="w-6 h-6" />
          <span className="text-lg font-medium">Total Estimated Cost</span>
        </div>
        <div className="text-5xl font-bold mb-2" data-testid="text-total-cost">€{result.totalCost.toFixed(2)}</div>
        <div className="text-blue-100">
          {isReturnTrip ? 'Round trip' : 'One-way'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-xl bg-gray-50 border-2 border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <Route className="w-5 h-5" />
            <span className="text-sm font-medium">Total Distance</span>
          </div>
          <div className="text-3xl font-bold text-gray-900" data-testid="text-total-distance">{Math.round(displayDistance)} km</div>
          {isReturnTrip && (
            <div className="text-xs text-gray-500 mt-1">{result.totalDistance} km each way</div>
          )}
        </div>

        <div className="p-6 rounded-xl bg-gray-50 border-2 border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium">Estimated Driving</span>
          </div>
          <div className="text-3xl font-bold text-gray-900" data-testid="text-driving-time">
            {Math.floor(displayDrivingTime)}h {Math.round((displayDrivingTime % 1) * 60)}m
          </div>
          {isReturnTrip && (
            <div className="text-xs text-gray-500 mt-1">
              {Math.floor(result.estimatedDrivingTime)}h {Math.round((result.estimatedDrivingTime % 1) * 60)}m each way
            </div>
          )}
        </div>

        <div className="p-6 rounded-xl bg-gray-50 border-2 border-gray-200">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <MapPin className="w-5 h-5" />
            <span className="text-sm font-medium">Countries</span>
          </div>
          <div className="text-3xl font-bold text-gray-900" data-testid="text-countries-count">{result.countryCosts.length}</div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Route</h3>
        <RouteMap directionsResult={tripData.routeData?.directionsResult} />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Cost Breakdown by Country</h3>
        <div className="space-y-3">
          {result.countryCosts.map((country) => {
            const countryDisplayDistance = isReturnTrip ? country.estimatedDistance * 2 : country.estimatedDistance;
            const countryTotalCost = country.tollCost + country.vignetteCost + country.specialTollsCost;
            
            return (
            <div
              key={country.countryCode}
              className="p-6 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-colors bg-white"
              data-testid={`card-country-${country.countryCode}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{country.flag}</span>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{country.countryName}</h4>
                    <p className="text-sm text-gray-500">
                      {Math.round(countryDisplayDistance)} km
                      {isReturnTrip && <span className="text-xs text-gray-400 ml-1">({country.estimatedDistance} km each way)</span>}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {countryTotalCost.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                {country.tollCost > 0 && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="text-sm text-gray-600">Distance Toll</span>
                    <span className="font-semibold text-gray-900">{country.tollCost.toFixed(2)}</span>
                  </div>
                )}

                {country.vignetteCost > 0 && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50">
                    <span className="text-sm text-blue-900">
                      Vignette ({country.vignetteOption})
                    </span>
                    <span className="font-semibold text-blue-900">{country.vignetteCost.toFixed(2)}</span>
                  </div>
                )}

                {country.vignetteOwned && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                    <span className="text-sm text-emerald-800">Vignette (Already owned)</span>
                    <span className="font-semibold text-emerald-700">0.00</span>
                  </div>
                )}

                {country.specialTollsSelected.map((toll) => (
                  <div key={toll.name} className="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-200">
                    <span className="text-sm text-amber-900 truncate pr-2">{toll.name}</span>
                    <span className="font-semibold text-amber-700">{toll.price.toFixed(2)}</span>
                  </div>
                ))}

                {country.tollCost === 0 && country.vignetteCost === 0 && !country.vignetteOwned && country.specialTollsCost === 0 && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 col-span-2">
                    <span className="text-sm text-green-900">No tolls or vignettes required</span>
                    <span className="font-semibold text-green-900">0.00</span>
                  </div>
                )}
              </div>

              {country.notes && (
                <div className="flex gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
                  <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-amber-900">{country.notes}</p>
                </div>
              )}
            </div>
          );
          })}
        </div>
      </div>

      {tripData.tripType === 'return' && (
        <div className="p-6 rounded-xl bg-blue-50 border-2 border-blue-200">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Return Trip</h4>
              <p className="text-sm text-blue-800">
                Costs are doubled for round trip. For vignette countries, you may be able to use the same vignette for the return journey depending on its validity period.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 rounded-xl bg-amber-50 border-2 border-amber-200">
        <div className="flex gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h4 className="font-semibold text-amber-900 mb-2">Important Disclaimer</h4>
            <p className="text-sm text-amber-800 mb-2">
              <strong>Prices are estimates only.</strong> Actual toll and vignette costs may vary based on:
            </p>
            <ul className="text-sm text-amber-800 space-y-1 ml-4 list-disc">
              <li>Exact route taken and highways used</li>
              <li>Specific vehicle classification and emission class</li>
              <li>Time of day and seasonal pricing variations</li>
              <li>Local regulations and recent price updates</li>
              <li>Special tunnel or bridge tolls not included in standard rates</li>
            </ul>
            <p className="text-sm text-amber-800 mt-2">
              <strong>Always verify current prices</strong> with official sources before travel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
