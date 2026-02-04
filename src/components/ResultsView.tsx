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

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Cost Estimate</h2>
        <button
          onClick={onBack}
          className="px-3 sm:px-4 py-2 rounded-xl border-2 border-gray-300 hover:bg-gray-50 active:bg-gray-100 flex items-center gap-1.5 sm:gap-2 transition-all duration-200 active:scale-95 text-sm sm:text-base"
          data-testid="button-back"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </button>
      </div>

      <div className="p-5 sm:p-8 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200">
        <div className="flex items-center gap-2 mb-1 sm:mb-2">
          <Euro className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-sm sm:text-lg font-medium">Total Estimated Cost</span>
        </div>
        <div className="text-4xl sm:text-5xl font-bold mb-1 sm:mb-2" data-testid="text-total-cost">€{result.totalCost.toFixed(2)}</div>
        <div className="text-blue-100 text-sm sm:text-base">
          {isReturnTrip ? 'Round trip' : 'One-way'}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5 sm:gap-4">
        <div className="p-3 sm:p-6 rounded-xl bg-gray-50 border-2 border-gray-200">
          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 mb-1 sm:mb-2">
            <Route className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-medium hidden sm:inline">Total Distance</span>
            <span className="text-xs font-medium sm:hidden">Distance</span>
          </div>
          <div className="text-lg sm:text-3xl font-bold text-gray-900" data-testid="text-total-distance">{result.totalDistance} <span className="text-sm sm:text-xl">km</span></div>
        </div>

        <div className="p-3 sm:p-6 rounded-xl bg-gray-50 border-2 border-gray-200">
          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 mb-1 sm:mb-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-medium hidden sm:inline">Estimated Driving</span>
            <span className="text-xs font-medium sm:hidden">Time</span>
          </div>
          <div className="text-lg sm:text-3xl font-bold text-gray-900" data-testid="text-driving-time">
            {Math.floor(result.estimatedDrivingTime)}h {Math.round((result.estimatedDrivingTime % 1) * 60)}m
          </div>
        </div>

        <div className="p-3 sm:p-6 rounded-xl bg-gray-50 border-2 border-gray-200">
          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600 mb-1 sm:mb-2">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-medium">Countries</span>
          </div>
          <div className="text-lg sm:text-3xl font-bold text-gray-900" data-testid="text-countries-count">{result.countryCosts.length}</div>
        </div>
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Your Route</h3>
        <RouteMap directionsResult={tripData.routeData?.directionsResult} />
      </div>

      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Cost Breakdown by Country</h3>
        <div className="space-y-3">
          {result.countryCosts.map((country) => {
            // Backend stores one-way toll values, but totalCost includes doubled tolls for return trips
            // So country.tollCost is already the one-way value
            const oneWayTollCost = country.tollCost;
            // For return trips, the country total should include doubled toll and special tolls
            const countryTotalCost = isReturnTrip 
              ? (country.tollCost * 2) + country.vignetteCost + (country.specialTollsCost * 2)
              : country.tollCost + country.vignetteCost + country.specialTollsCost;
            
            return (
            <div
              key={country.countryCode}
              className="p-4 sm:p-6 rounded-xl border-2 border-gray-200 bg-white"
              data-testid={`card-country-${country.countryCode}`}
            >
              <div className="flex items-start justify-between mb-3 gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-2xl sm:text-3xl">{country.flag}</span>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900">{country.countryName}</h4>
                    <p className="text-xs sm:text-sm text-gray-500">{country.estimatedDistance} km</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">
                    {countryTotalCost.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-3">
                {country.tollCost > 0 && isReturnTrip && (
                  <>
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-gray-50">
                      <span className="text-xs sm:text-sm text-gray-600">Toll (outbound)</span>
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">{oneWayTollCost.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-gray-50">
                      <span className="text-xs sm:text-sm text-gray-600">Toll (return)</span>
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">{oneWayTollCost.toFixed(2)}</span>
                    </div>
                  </>
                )}
                {country.tollCost > 0 && !isReturnTrip && (
                  <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-gray-50">
                    <span className="text-xs sm:text-sm text-gray-600">Distance Toll</span>
                    <span className="font-semibold text-gray-900 text-sm sm:text-base">{country.tollCost.toFixed(2)}</span>
                  </div>
                )}

                {country.vignetteCost > 0 && (
                  <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-blue-50">
                    <span className="text-xs sm:text-sm text-blue-900">
                      Vignette ({country.vignetteOption})
                    </span>
                    <span className="font-semibold text-blue-900 text-sm sm:text-base">{country.vignetteCost.toFixed(2)}</span>
                  </div>
                )}

                {country.vignetteOwned && (
                  <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                    <span className="text-xs sm:text-sm text-emerald-800">Vignette (Owned)</span>
                    <span className="font-semibold text-emerald-700 text-sm sm:text-base">0.00</span>
                  </div>
                )}

                {country.specialTollsSelected.map((toll) => (
                  isReturnTrip ? (
                    <div key={toll.name} className="col-span-2 grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-200">
                        <span className="text-sm text-amber-900 truncate pr-2">{toll.name} (outbound)</span>
                        <span className="font-semibold text-amber-700">{toll.price.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-200">
                        <span className="text-sm text-amber-900 truncate pr-2">{toll.name} (return)</span>
                        <span className="font-semibold text-amber-700">{toll.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ) : (
                    <div key={toll.name} className="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-200">
                      <span className="text-sm text-amber-900 truncate pr-2">{toll.name}</span>
                      <span className="font-semibold text-amber-700">{toll.price.toFixed(2)}</span>
                    </div>
                  )
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
