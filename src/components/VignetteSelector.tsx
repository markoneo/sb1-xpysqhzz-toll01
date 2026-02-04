import { Check, Ticket } from 'lucide-react';
import { countryRules } from '../data/countryRules';

interface VignetteSelectorProps {
  ownedVignettes: string[];
  onChange: (vignettes: string[]) => void;
}

const vignetteCountries = Object.values(countryRules)
  .filter(rule => rule.vignette?.required)
  .sort((a, b) => a.name.localeCompare(b.name));

export function VignetteSelector({ ownedVignettes, onChange }: VignetteSelectorProps) {
  const toggleVignette = (countryCode: string) => {
    if (ownedVignettes.includes(countryCode)) {
      onChange(ownedVignettes.filter(c => c !== countryCode));
    } else {
      onChange([...ownedVignettes, countryCode]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-emerald-100">
          <Ticket className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Existing Vignettes</h3>
          <p className="text-sm text-gray-500">Select countries where you already have a valid yearly vignette</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {vignetteCountries.map((country) => {
          const isSelected = ownedVignettes.includes(country.code);
          return (
            <button
              key={country.code}
              onClick={() => toggleVignette(country.code)}
              className={`p-3 rounded-xl border-2 transition-all text-left flex items-center gap-3 ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${
                isSelected ? 'bg-emerald-500' : 'border-2 border-gray-300'
              }`}>
                {isSelected && <Check className="w-3 h-3 text-white" />}
              </div>
              <span className="text-xl">{country.flag}</span>
              <span className="text-sm font-medium text-gray-900 truncate">{country.name}</span>
            </button>
          );
        })}
      </div>

      {ownedVignettes.length > 0 && (
        <p className="text-sm text-emerald-600 font-medium">
          {ownedVignettes.length} vignette{ownedVignettes.length !== 1 ? 's' : ''} marked as owned - costs will be excluded
        </p>
      )}
    </div>
  );
}
