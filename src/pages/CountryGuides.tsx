import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Footer } from '../components/Footer';

const GUIDES = [
  { slug: 'austria', flag: '🇦🇹', name: 'Austria', summary: 'Digital vignette system with separate tunnel tolls on the A10, A11, A13 and other Alpine routes.' },
  { slug: 'switzerland', flag: '🇨🇭', name: 'Switzerland', summary: 'Annual or short-term vignette required for all motorways. One of the most straightforward systems in Europe.' },
  { slug: 'italy', flag: '🇮🇹', name: 'Italy', summary: 'Distance-based toll booths on the Autostrade network. Pay as you go at staffed or automated plazas.' },
  { slug: 'france', flag: '🇫🇷', name: 'France', summary: 'Péage toll plazas on most Autoroutes. Contactless and badge payment widely accepted.' },
  { slug: 'germany', flag: '🇩🇪', name: 'Germany', summary: 'No tolls for cars on the Autobahn. Trucks pay a distance-based HGV toll.' },
  { slug: 'croatia', flag: '🇭🇷', name: 'Croatia', summary: 'Distance-based toll plazas across the motorway network including the A1 to Dubrovnik.' },
  { slug: 'slovenia', flag: '🇸🇮', name: 'Slovenia', summary: 'E-vignette required for all motorways. Available for 7 days, 1 month or 1 year.' },
  { slug: 'spain', flag: '🇪🇸', name: 'Spain', summary: 'Mixed system — some motorways (AP roads) have tolls, others are free. Varies significantly by region.' },
];

export function CountryGuides() {
  useEffect(() => {
    document.title = 'European Toll Road Guides by Country | TollCalculator.eu';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        <Link href="/" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm mb-6" data-testid="link-back-home">
          <ArrowLeft className="w-4 h-4" /> Back to Calculator
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">European Toll Road Guides</h1>
        <p className="text-gray-600 mb-8 text-sm sm:text-base">
          Detailed guides to motorway tolls, vignettes, and tunnel fees for every major European country.
          Each guide explains how the local system works, what you need to buy before you travel, and how much to budget.
        </p>

        <div className="grid sm:grid-cols-2 gap-4">
          {GUIDES.map(g => (
            <Link key={g.slug} href={`/guide/${g.slug}`} data-testid={`link-guide-${g.slug}`}>
              <div className="bg-white rounded-xl border-2 border-gray-200 p-5 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer h-full">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{g.flag}</span>
                  <h2 className="text-lg font-semibold text-gray-900">{g.name}</h2>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{g.summary}</p>
                <div className="mt-3 text-blue-600 text-sm font-medium flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> Read the guide →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 p-5 bg-blue-50 rounded-xl border border-blue-100">
          <h2 className="font-semibold text-gray-900 mb-2">Ready to plan your trip?</h2>
          <p className="text-sm text-gray-600 mb-3">Use our free calculator to get a full cost breakdown for your specific route — including tolls, vignettes, and tunnel fees.</p>
          <Link href="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Calculate Toll Costs →
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
