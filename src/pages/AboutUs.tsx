import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../components/Footer';

export function AboutUs() {
  useEffect(() => { document.title = 'About Us | TollCalculator.eu'; }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        <Link href="/" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm mb-6" data-testid="link-back-home">
          <ArrowLeft className="w-4 h-4" /> Back to Calculator
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">About Us</h1>
        <div className="bg-white rounded-xl shadow p-5 sm:p-8 space-y-5 text-gray-700 text-sm sm:text-base leading-relaxed">

          <h2 className="text-lg font-semibold text-gray-900 pt-2">Our Mission</h2>
          <p>TollCalculator.eu was created to help travelers plan the costs of driving across Europe. With different toll systems, vignette requirements, and tunnel fees varying from country to country, planning a road trip budget can be confusing and time-consuming. Our goal is to provide a simple, straightforward tool that gives you a clear estimate of what to expect.</p>

          <h2 className="text-lg font-semibold text-gray-900 pt-2">What We Do</h2>
          <p>Our calculator analyzes your planned route and identifies the countries you will pass through. It then applies the relevant toll rules for each country, whether that involves distance-based motorway tolls, time-based vignettes, or separate tunnel and mountain pass fees. The result is a detailed cost breakdown that helps you understand what your trip will cost before you set off.</p>

          <h2 className="text-lg font-semibold text-gray-900 pt-2">How It Works</h2>
          <p>The calculator uses Google Maps to determine your route and calculate distances across different countries. Combined with our database of European toll rates and vignette prices, it produces an estimate that covers motorway tolls, required vignettes, and known tunnel or bridge fees along your route.</p>

          <h2 className="text-lg font-semibold text-gray-900 pt-2">Important Note</h2>
          <p>All results are estimates intended for trip planning purposes. Actual costs may differ due to route variations, toll rate changes by road operators, currency fluctuations, or seasonal adjustments. We recommend checking official toll operator websites for the latest pricing information before and during your journey.</p>

          <h2 className="text-lg font-semibold text-gray-900 pt-2">Coverage</h2>
          <p>We currently cover toll and vignette systems across most of Western and Central Europe, including Austria, Switzerland, Slovenia, Italy, France, Spain, Portugal, Croatia, Greece, Poland, Czechia, Slovakia, Hungary, Romania, Bulgaria, Serbia, Germany, and more. We regularly review and update our data to reflect changes in toll rates and regulations.</p>

          <h2 className="text-lg font-semibold text-gray-900 pt-2">Contact</h2>
          <p>If you have feedback, corrections, or questions, please visit our <Link href="/contact" className="text-blue-600 underline">Contact</Link> page. We value input from travelers who use European roads regularly, as it helps us improve the accuracy and coverage of the calculator.</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
