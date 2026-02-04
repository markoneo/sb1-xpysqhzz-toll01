import { useState } from 'react';
import { ChevronRight, ChevronLeft, Calculator } from 'lucide-react';
import { VehicleStep } from './components/VehicleStep';
import { RouteStep } from './components/RouteStep';
import { DatesStep } from './components/DatesStep';
import { ResultsView } from './components/ResultsView';
import { TripData, VehicleType, FuelType, CalculationResult, SelectedSpecialToll } from './types';
import { calculateTollCosts } from './utils/calculator';
import { calculateRoute, getCountriesFromAddresses } from './services/routeService';

type Step = 'vehicle' | 'route' | 'dates' | 'results';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('vehicle');
  const [tripData, setTripData] = useState<TripData>({
    vehicleType: 'car',
    axles: 2,
    fuelType: 'petrol',
    startAddress: '',
    endAddress: '',
    waypointAddresses: [],
    tripType: 'one-way',
    startDate: '',
    endDate: '',
    tripDurationDays: 1,
    ownedVignettes: [],
    selectedSpecialTolls: []
  });
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [previewDirectionsResult, setPreviewDirectionsResult] = useState<google.maps.DirectionsResult | null>(null);

  const handleChange = (field: string, value: string | string[] | VehicleType | FuelType | number | 'one-way' | 'return' | SelectedSpecialToll[]) => {
    setTripData((prev) => {
      const updated = { ...prev, [field]: value };

      if (field === 'startDate' || field === 'endDate') {
        if (updated.startDate && updated.endDate) {
          const start = new Date(updated.startDate);
          const end = new Date(updated.endDate);
          const diffTime = Math.abs(end.getTime() - start.getTime());
          updated.tripDurationDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
        }
      }

      return updated;
    });
  };

  const steps: { id: Step; label: string; number: number }[] = [
    { id: 'vehicle', label: 'Vehicle', number: 1 },
    { id: 'route', label: 'Route', number: 2 },
    { id: 'dates', label: 'Dates', number: 3 }
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const canProceed = () => {
    if (currentStep === 'vehicle') {
      return tripData.vehicleType && tripData.axles && tripData.fuelType;
    }
    if (currentStep === 'route') {
      return tripData.startAddress && tripData.endAddress;
    }
    if (currentStep === 'dates') {
      return tripData.startDate && tripData.endDate;
    }
    return false;
  };

  const handleNext = async () => {
    if (isLastStep) {
      setIsCalculating(true);
      try {
        const routeData = await calculateRoute(
          tripData.startAddress,
          tripData.endAddress,
          tripData.waypointAddresses
        );

        if (routeData) {
          const updatedTripData = {
            ...tripData,
            routeData: {
              countries: routeData.countries,
              countryDistances: routeData.countryDistances,
              totalDistance: routeData.totalDistance,
              totalDuration: routeData.totalDuration,
              directionsResult: routeData.directionsResult
            }
          };

          setTripData(updatedTripData);
          const calculationResult = calculateTollCosts(updatedTripData);
          setResult(calculationResult);
          setCurrentStep('results');
        } else {
          const countries = await getCountriesFromAddresses(
            tripData.startAddress,
            tripData.endAddress,
            tripData.waypointAddresses
          );

          const updatedTripData = {
            ...tripData,
            routeData: {
              countries,
              countryDistances: countries.map(code => ({ countryCode: code, distance: 150 })),
              totalDistance: 300,
              totalDuration: 240
            }
          };

          const calculationResult = calculateTollCosts(updatedTripData);
          setResult(calculationResult);
          setCurrentStep('results');
        }
      } catch (error) {
        console.error('Error calculating route:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        if (errorMessage.includes('NOT_FOUND')) {
          alert('Could not find a driving route between these locations. Please check the addresses are correct and reachable by road.');
        } else if (errorMessage.includes('ZERO_RESULTS')) {
          alert('No route found between these locations. They may not be connected by road.');
        } else if (errorMessage.includes('REQUEST_DENIED')) {
          alert('Google Maps API access denied. Please check the API key configuration.');
        } else {
          alert('Error calculating route. Please try again.');
        }
      } finally {
        setIsCalculating(false);
      }
    } else {
      const nextStep = steps[currentStepIndex + 1];
      setCurrentStep(nextStep.id);
    }
  };

  const handleBack = () => {
    if (currentStep === 'results') {
      setCurrentStep('dates');
      setResult(null);
    } else if (!isFirstStep) {
      const prevStep = steps[currentStepIndex - 1];
      setCurrentStep(prevStep.id);
    }
  };

  const handleReset = () => {
    setCurrentStep('vehicle');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 safe-top">
      <div className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-8 md:py-12">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <Calculator className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              European Road Trip Cost Calculator
            </h1>
          </div>
          <p className="text-sm sm:text-lg text-gray-600 px-2">
            Tolls • Vignettes • Tunnels
          </p>
        </div>

        {currentStep !== 'results' && (
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between max-w-md sm:max-w-2xl mx-auto px-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg transition-all duration-300 ${
                        currentStepIndex >= index
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                    >
                      {step.number}
                    </div>
                    <div
                      className={`mt-1.5 sm:mt-2 text-xs sm:text-sm font-medium transition-colors duration-300 ${
                        currentStepIndex >= index ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-1 sm:mx-2 rounded-full transition-all duration-500 ${
                        currentStepIndex > index ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 md:p-12 transition-all duration-300">
          {currentStep === 'vehicle' && (
            <VehicleStep
              vehicleType={tripData.vehicleType}
              axles={tripData.axles}
              fuelType={tripData.fuelType}
              ownedVignettes={tripData.ownedVignettes}
              onChange={handleChange}
            />
          )}

          {currentStep === 'route' && (
            <RouteStep
              startAddress={tripData.startAddress}
              endAddress={tripData.endAddress}
              waypointAddresses={tripData.waypointAddresses}
              tripType={tripData.tripType}
              selectedSpecialTolls={tripData.selectedSpecialTolls}
              directionsResult={previewDirectionsResult || undefined}
              onChange={handleChange}
              onRoutePreviewCalculated={setPreviewDirectionsResult}
            />
          )}

          {currentStep === 'dates' && (
            <DatesStep
              startDate={tripData.startDate}
              endDate={tripData.endDate}
              onChange={handleChange}
            />
          )}

          {currentStep === 'results' && result && (
            <ResultsView result={result} tripData={tripData} onBack={handleReset} />
          )}

          {currentStep !== 'results' && (
            <div className="flex items-center justify-between mt-6 sm:mt-8 pt-6 sm:pt-8 border-t-2 border-gray-100 gap-3">
              <button
                onClick={handleBack}
                disabled={isFirstStep}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-3.5 sm:py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 ${
                  isFirstStep
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300'
                }`}
                data-testid="button-back-step"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back</span>
              </button>

              <button
                onClick={handleNext}
                disabled={!canProceed() || isCalculating}
                className={`flex-1 sm:flex-none px-6 sm:px-8 py-3.5 sm:py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 ${
                  canProceed() && !isCalculating
                    ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-lg shadow-blue-200'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
                data-testid="button-next-step"
              >
                {isCalculating ? (
                  <>
                    <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    <span className="hidden sm:inline">Calculating...</span>
                  </>
                ) : (
                  <>
                    {isLastStep ? 'Calculate' : 'Next'}
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500 px-4 pb-4 safe-bottom">
          <p>
            Built for European road travelers • Data updated 2026
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
