import { Calendar } from 'lucide-react';

interface DatesStepProps {
  startDate: string;
  endDate: string;
  onChange: (field: string, value: string) => void;
}

export function DatesStep({ startDate, endDate, onChange }: DatesStepProps) {
  const today = new Date().toISOString().split('T')[0];

  const calculateDuration = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const duration = calculateDuration();

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2">Travel Dates</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">When are you planning to travel?</p>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2 sm:mb-3">
              <Calendar className="w-4 h-4 mr-2 text-green-600" />
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              min={today}
              onChange={(e) => onChange('startDate', e.target.value)}
              className="w-full px-4 py-3.5 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 text-base bg-white"
              data-testid="input-start-date"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2 sm:mb-3">
              <Calendar className="w-4 h-4 mr-2 text-red-600" />
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              min={startDate || today}
              onChange={(e) => onChange('endDate', e.target.value)}
              className="w-full px-4 py-3.5 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 text-base bg-white"
              data-testid="input-end-date"
            />
            <p className="mt-2 text-xs sm:text-sm text-gray-500">
              This helps determine the best vignette duration for your trip
            </p>
          </div>

          {duration > 0 && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <div className="font-medium text-blue-900">Trip Duration</div>
                  <div className="text-sm text-blue-700">
                    {duration} day{duration !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6 rounded-xl bg-amber-50 border-2 border-amber-200">
        <div className="flex gap-3">
          <div className="text-xl sm:text-2xl flex-shrink-0">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-amber-900 mb-1 text-sm sm:text-base">Tip</h3>
            <p className="text-xs sm:text-sm text-amber-800">
              For vignette-based countries, we'll recommend the most cost-effective duration based on your trip length.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
