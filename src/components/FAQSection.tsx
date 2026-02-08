import { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Do I need a vignette for every country I drive through?",
    answer: "Not every European country requires a vignette. Countries like Austria, Switzerland, Slovenia, Czechia, Slovakia, Hungary, Romania, and Bulgaria use vignette systems. Others, like Italy, France, and Spain, use distance-based toll systems instead. If your route passes through a vignette country, you will need one for that specific country, even if you are only driving a short distance on their motorways."
  },
  {
    question: "Are tunnel fees included in regular tolls or vignettes?",
    answer: "In most cases, no. Major tunnels and mountain passes charge separate fees that are not covered by vignettes or standard motorway tolls. For example, the Brenner Pass, Mont Blanc Tunnel, and Tauern Tunnel all have their own pricing. This calculator identifies known tunnel and pass fees along your route and includes them as separate line items in the cost breakdown."
  },
  {
    question: "Why do results change when I use a different route?",
    answer: "Different routes may pass through different countries, use varying amounts of toll motorway, or include tunnels that carry additional fees. For example, driving from Germany to Italy via Austria and the Brenner Pass produces different costs than going through Switzerland and over the Gotthard Pass. The calculator estimates costs based on the specific route analyzed, including which roads are toll roads and which are free."
  },
  {
    question: "Is this calculator free to use?",
    answer: "Yes, this calculator is completely free. You can plan as many routes as you like and compare different options to find the most cost-effective path for your trip. No registration or account is required."
  },
  {
    question: "Are the results always exact?",
    answer: "The results are estimates based on current toll rates and route analysis. Actual costs may differ due to route variations during travel, currency exchange fluctuations, seasonal pricing changes, or toll rate updates by road operators. We recommend using the results as a planning guide and checking official toll operator websites for the latest pricing before your trip."
  },
  {
    question: "Can I use this calculator for vans, campers, or larger vehicles?",
    answer: "Yes, the calculator supports different vehicle types including cars, vans, and trucks. Toll rates often vary by vehicle category, with larger and heavier vehicles typically paying more. Select the appropriate vehicle type and number of axles in the first step to get a more accurate estimate for your specific vehicle."
  },
  {
    question: "How are vignette costs calculated for short trips?",
    answer: "The calculator selects the most cost-effective vignette option based on your trip duration. For example, if you are driving through Austria for a weekend trip, it would recommend a 1-day or 10-day vignette rather than a monthly or annual one. If you already own a valid vignette for a country, you can mark it in the vehicle step to exclude that cost from the calculation."
  },
  {
    question: "What countries does this calculator cover?",
    answer: "The calculator covers most European countries with toll roads or vignette requirements, including Austria, Switzerland, Slovenia, Italy, France, Spain, Portugal, Croatia, Greece, Poland, Czechia, Slovakia, Hungary, Romania, Bulgaria, Serbia, and Germany (truck tolls). Coverage is continually being reviewed and updated."
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <HelpCircle className="w-6 h-6 text-blue-600 shrink-0" />
        Frequently Asked Questions
      </h2>
      <div className="space-y-2" data-testid="faq-section">
        {faqItems.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full text-left px-4 sm:px-5 py-3 sm:py-4 flex items-center justify-between gap-3 bg-white hover:bg-gray-50 transition-colors"
              data-testid={`button-faq-${index}`}
            >
              <span className="font-medium text-gray-900 text-sm sm:text-base">{item.question}</span>
              <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === index && (
              <div className="px-4 sm:px-5 pb-4 text-sm sm:text-base text-gray-600 leading-relaxed bg-gray-50 border-t border-gray-100">
                <p className="pt-3">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
