export interface VignetteOption {
  duration: string;
  price: number;
  durationDays: number;
}

export interface SpecialToll {
  id: string;
  name: string;
  type: 'tunnel' | 'bridge' | 'pass';
  price: number;
  priceReturn?: number;
  route?: string;
  lat: number;
  lng: number;
}

export interface CountryRule {
  code: string;
  name: string;
  flag: string;
  tollSystem: 'distance' | 'vignette' | 'mixed' | 'none';
  currency: string;

  distanceToll?: {
    pricePerKm: {
      car: number;
      van: number;
      truck: number;
    };
    averageDistance?: number;
  };

  vignette?: {
    required: boolean;
    options: VignetteOption[];
  };

  specialTolls?: SpecialToll[];

  notes?: string;
}

export const countryRules: Record<string, CountryRule> = {
  AT: {
    code: 'AT',
    name: 'Austria',
    flag: '🇦🇹',
    tollSystem: 'vignette',
    currency: 'EUR',
    vignette: {
      required: true,
      options: [
        { duration: '10 days', price: 11.50, durationDays: 10 },
        { duration: '2 months', price: 29.00, durationDays: 60 },
        { duration: '1 year', price: 96.40, durationDays: 365 }
      ]
    },
    specialTolls: [
      { id: 'at-brenner', name: 'Brenner Autobahn (A13)', type: 'pass', price: 11.50, route: 'Innsbruck to Italy', lat: 47.0408, lng: 11.5064 },
      { id: 'at-tauern', name: 'Tauern Tunnel (A10)', type: 'tunnel', price: 14.00, route: 'Salzburg to Villach', lat: 47.0667, lng: 13.4833 },
      { id: 'at-karawanken', name: 'Karawanken Tunnel (A11)', type: 'tunnel', price: 7.90, route: 'Villach to Slovenia', lat: 46.4575, lng: 14.0750 },
      { id: 'at-arlberg', name: 'Arlberg Tunnel (S16)', type: 'tunnel', price: 11.50, route: 'Tirol to Vorarlberg', lat: 47.1333, lng: 10.2167 },
      { id: 'at-bosruck', name: 'Bosruck Tunnel (A9)', type: 'tunnel', price: 6.50, route: 'Linz to Graz (north)', lat: 47.5833, lng: 14.4333 },
      { id: 'at-gleinalm', name: 'Gleinalm Tunnel (A9)', type: 'tunnel', price: 9.50, route: 'Linz to Graz (south)', lat: 47.1333, lng: 15.0667 },
      { id: 'at-felbertauern', name: 'Felbertauern Road', type: 'tunnel', price: 12.00, route: 'Salzburg to East Tyrol', lat: 47.1167, lng: 12.5333 }
    ],
    notes: 'Digital vignette (GO-Maut) required. Major tunnels and Alpine passes have separate tolls.'
  },

  SI: {
    code: 'SI',
    name: 'Slovenia',
    flag: '🇸🇮',
    tollSystem: 'vignette',
    currency: 'EUR',
    vignette: {
      required: true,
      options: [
        { duration: '7 days', price: 16.00, durationDays: 7 },
        { duration: '1 month', price: 32.00, durationDays: 30 },
        { duration: '1 year', price: 117.50, durationDays: 365 }
      ]
    },
    notes: 'E-vignette mandatory for motorways.'
  },

  HU: {
    code: 'HU',
    name: 'Hungary',
    flag: '🇭🇺',
    tollSystem: 'vignette',
    currency: 'EUR',
    vignette: {
      required: true,
      options: [
        { duration: '10 days', price: 12.00, durationDays: 10 },
        { duration: '1 month', price: 18.00, durationDays: 30 },
        { duration: '1 year', price: 150.00, durationDays: 365 }
      ]
    },
    notes: 'E-vignette system. Valid from purchase time.'
  },

  CZ: {
    code: 'CZ',
    name: 'Czech Republic',
    flag: '🇨🇿',
    tollSystem: 'vignette',
    currency: 'EUR',
    vignette: {
      required: true,
      options: [
        { duration: '10 days', price: 14.00, durationDays: 10 },
        { duration: '1 month', price: 20.00, durationDays: 30 },
        { duration: '1 year', price: 60.00, durationDays: 365 }
      ]
    },
    notes: 'E-vignette for highways and expressways.'
  },

  SK: {
    code: 'SK',
    name: 'Slovakia',
    flag: '🇸🇰',
    tollSystem: 'vignette',
    currency: 'EUR',
    vignette: {
      required: true,
      options: [
        { duration: '10 days', price: 12.00, durationDays: 10 },
        { duration: '1 month', price: 18.00, durationDays: 30 },
        { duration: '1 year', price: 60.00, durationDays: 365 }
      ]
    },
    notes: 'E-vignette mandatory for motorways.'
  },

  CH: {
    code: 'CH',
    name: 'Switzerland',
    flag: '🇨🇭',
    tollSystem: 'vignette',
    currency: 'CHF',
    vignette: {
      required: true,
      options: [
        { duration: '1 year', price: 40.00, durationDays: 365 }
      ]
    },
    specialTolls: [
      { id: 'ch-grandstbernard', name: 'Grand St. Bernard Tunnel', type: 'tunnel', price: 32.00, route: 'Switzerland to Italy', lat: 45.8689, lng: 7.1708 },
      { id: 'ch-munt', name: 'Munt la Schera Tunnel', type: 'tunnel', price: 26.00, route: 'Engadin to Livigno', lat: 46.5167, lng: 10.0833 }
    ],
    notes: 'Annual vignette only. Valid calendar year + January/February of next year. Some tunnels have separate tolls.'
  },

  IT: {
    code: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    tollSystem: 'distance',
    currency: 'EUR',
    distanceToll: {
      pricePerKm: {
        car: 0.08,
        van: 0.10,
        truck: 0.16
      },
      averageDistance: 450
    },
    specialTolls: [
      { id: 'it-montblanc', name: 'Mont Blanc Tunnel', type: 'tunnel', price: 51.40, route: 'Italy to France', lat: 45.8442, lng: 6.9331 },
      { id: 'it-frejus', name: 'Frejus Tunnel', type: 'tunnel', price: 53.70, route: 'Italy to France', lat: 45.1333, lng: 6.6667 },
      { id: 'it-grandstbernard', name: 'Grand St. Bernard Tunnel', type: 'tunnel', price: 32.00, route: 'Italy to Switzerland', lat: 45.8689, lng: 7.1708 }
    ],
    notes: 'Pay-per-distance at toll booths. Major Alpine tunnels have separate high tolls.'
  },

  FR: {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    tollSystem: 'distance',
    currency: 'EUR',
    distanceToll: {
      pricePerKm: {
        car: 0.09,
        van: 0.11,
        truck: 0.18
      },
      averageDistance: 550
    },
    specialTolls: [
      { id: 'fr-montblanc', name: 'Mont Blanc Tunnel', type: 'tunnel', price: 51.40, route: 'France to Italy', lat: 45.8442, lng: 6.9331 },
      { id: 'fr-frejus', name: 'Frejus Tunnel', type: 'tunnel', price: 53.70, route: 'France to Italy', lat: 45.1333, lng: 6.6667 },
      { id: 'fr-puymorens', name: 'Puymorens Tunnel', type: 'tunnel', price: 7.30, route: 'France to Andorra/Spain', lat: 42.5500, lng: 1.8167 }
    ],
    notes: 'Autoroutes have toll stations. Major Alpine tunnels have separate high tolls.'
  },

  ES: {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸',
    tollSystem: 'distance',
    currency: 'EUR',
    distanceToll: {
      pricePerKm: {
        car: 0.08,
        van: 0.10,
        truck: 0.16
      },
      averageDistance: 500
    },
    notes: 'Toll roads (autopistas) charged per distance. Many free alternatives exist.'
  },

  HR: {
    code: 'HR',
    name: 'Croatia',
    flag: '🇭🇷',
    tollSystem: 'distance',
    currency: 'EUR',
    distanceToll: {
      pricePerKm: {
        car: 0.05,
        van: 0.07,
        truck: 0.12
      },
      averageDistance: 350
    },
    notes: 'Toll stations on motorways. Cash and card accepted.'
  },

  DE: {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    tollSystem: 'none',
    currency: 'EUR',
    notes: 'No tolls for cars and vans. Truck tolls apply (HGV only).'
  },

  PL: {
    code: 'PL',
    name: 'Poland',
    flag: '🇵🇱',
    tollSystem: 'distance',
    currency: 'EUR',
    distanceToll: {
      pricePerKm: {
        car: 0.04,
        van: 0.06,
        truck: 0.10
      },
      averageDistance: 400
    },
    notes: 'Toll roads mostly on A1, A2, A4. Cash and card accepted.'
  },

  RO: {
    code: 'RO',
    name: 'Romania',
    flag: '🇷🇴',
    tollSystem: 'vignette',
    currency: 'EUR',
    vignette: {
      required: true,
      options: [
        { duration: '7 days', price: 3.00, durationDays: 7 },
        { duration: '30 days', price: 7.00, durationDays: 30 },
        { duration: '90 days', price: 13.00, durationDays: 90 },
        { duration: '1 year', price: 28.00, durationDays: 365 }
      ]
    },
    notes: 'Rovigneta (e-vignette) for national roads.'
  },

  BG: {
    code: 'BG',
    name: 'Bulgaria',
    flag: '🇧🇬',
    tollSystem: 'vignette',
    currency: 'EUR',
    vignette: {
      required: true,
      options: [
        { duration: '7 days', price: 10.00, durationDays: 7 },
        { duration: '1 month', price: 20.00, durationDays: 30 },
        { duration: '3 months', price: 35.00, durationDays: 90 },
        { duration: '1 year', price: 70.00, durationDays: 365 }
      ]
    },
    notes: 'E-vignette for all motorways and main roads.'
  },

  NL: {
    code: 'NL',
    name: 'Netherlands',
    flag: '🇳🇱',
    tollSystem: 'none',
    currency: 'EUR',
    notes: 'No toll roads for cars. Tunnel tolls may apply in some cases.'
  },

  BE: {
    code: 'BE',
    name: 'Belgium',
    flag: '🇧🇪',
    tollSystem: 'none',
    currency: 'EUR',
    notes: 'No toll roads for cars and vans.'
  },

  PT: {
    code: 'PT',
    name: 'Portugal',
    flag: '🇵🇹',
    tollSystem: 'distance',
    currency: 'EUR',
    distanceToll: {
      pricePerKm: {
        car: 0.06,
        van: 0.08,
        truck: 0.14
      },
      averageDistance: 400
    },
    notes: 'Electronic toll system on major highways.'
  },

  GR: {
    code: 'GR',
    name: 'Greece',
    flag: '🇬🇷',
    tollSystem: 'distance',
    currency: 'EUR',
    distanceToll: {
      pricePerKm: {
        car: 0.05,
        van: 0.07,
        truck: 0.12
      },
      averageDistance: 350
    },
    notes: 'Toll stations on national highways.'
  },

  RS: {
    code: 'RS',
    name: 'Serbia',
    flag: '🇷🇸',
    tollSystem: 'distance',
    currency: 'EUR',
    distanceToll: {
      pricePerKm: {
        car: 0.03,
        van: 0.05,
        truck: 0.09
      },
      averageDistance: 300
    },
    notes: 'Toll stations on motorways. Cash (RSD/EUR) and card accepted.'
  }
};

export const countryList = Object.values(countryRules).sort((a, b) =>
  a.name.localeCompare(b.name)
);
