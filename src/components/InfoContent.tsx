import { useState } from 'react';
import { Route, MapPin, CreditCard, Mountain, Compass, Map, ChevronDown } from 'lucide-react';

interface AccordionSectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function AccordionSection({ icon, title, children }: AccordionSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <section className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="w-full flex items-center justify-between gap-3 px-4 sm:px-6 py-4 sm:py-5 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold text-gray-900">
          {icon}
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="px-4 sm:px-6 pb-5 pt-1 bg-white border-t border-gray-100 text-gray-700 leading-relaxed space-y-3">
          {children}
        </div>
      )}
    </section>
  );
}

export function InfoContent() {
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-8 sm:py-12 space-y-3">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-500 uppercase tracking-wide mb-4 px-1">
        Learn More
      </h2>

      <AccordionSection
        icon={<Route className="w-5 h-5 text-blue-600 shrink-0" />}
        title="How Road Tolls Work in Europe"
      >
        <p>
          Road tolls across Europe vary significantly from country to country. There is no single unified system, so drivers crossing multiple borders will encounter different payment methods, pricing models, and rules depending on their route.
        </p>
        <p>
          In countries like Italy, France, Spain, Portugal, Croatia, Greece, and Poland, tolls are typically distance-based. Drivers take a ticket when entering a motorway and pay at the exit based on how far they have traveled. Rates differ by vehicle category, with larger vehicles generally paying more. Some motorways use electronic tolling, where cameras or transponders record entry and exit points.
        </p>
        <p>
          Barrier toll systems are also common, where drivers stop at toll plazas at fixed points along a route. These are found on specific stretches of motorway, bridges, or tunnels. Payment is usually accepted in cash, by card, or via electronic transponders such as Telepass in Italy or Liber-t in France.
        </p>
      </AccordionSection>

      <AccordionSection
        icon={<CreditCard className="w-5 h-5 text-blue-600 shrink-0" />}
        title="What Is a Vignette?"
      >
        <p>
          A vignette is a time-based road usage fee that grants access to a country's motorway network for a set period. Unlike distance-based tolls, a vignette covers unlimited motorway travel within the validity period, whether that is 10 days, one month, or a full year.
        </p>
        <p>
          Countries that use vignette systems include Austria, Switzerland, Slovenia, Czechia, Slovakia, Hungary, Romania, and Bulgaria. Each country sets its own pricing and validity periods. For example, Austria offers 1-day, 10-day, 2-month, and annual digital vignettes, while Switzerland requires an annual vignette that is valid for the calendar year plus December of the previous year and January of the following year.
        </p>
        <p>
          In recent years, many countries have transitioned from physical sticker vignettes to digital versions. Digital vignettes are linked to the vehicle's license plate and can be purchased online before a trip. Slovenia, Austria, and Hungary all offer digital vignettes, making it easier for travelers to prepare in advance. Some countries, like Switzerland, still use physical sticker vignettes that must be displayed on the windshield.
        </p>
      </AccordionSection>

      <AccordionSection
        icon={<Mountain className="w-5 h-5 text-blue-600 shrink-0" />}
        title="Tunnel and Mountain Pass Fees"
      >
        <p>
          Many Alpine routes include tunnels and mountain passes that charge separate fees on top of regular tolls or vignettes. These structures are expensive to build and maintain, so they carry their own pricing, which can be significant for longer tunnels.
        </p>
        <p>
          Well-known examples include the Brenner Pass tunnel between Austria and Italy, the Mont Blanc Tunnel connecting France and Italy, the Frejus Tunnel between France and Italy, the Arlberg Tunnel in Austria, the Tauern Tunnel in Austria, and the Great St. Bernard Tunnel between Switzerland and Italy. Prices depend on the vehicle size and whether the trip is one-way or return.
        </p>
        <p>
          Some tunnel operators offer discounted return tickets if purchased at the time of the first crossing. It is worth checking availability before your trip, as these savings can be meaningful on routes that cross the Alps multiple times.
        </p>
      </AccordionSection>

      <AccordionSection
        icon={<Compass className="w-5 h-5 text-blue-600 shrink-0" />}
        title="How This Calculator Works"
      >
        <p>
          This calculator analyzes your planned route using mapping data to determine which countries you will pass through and how many kilometers you will drive in each. Based on that information, it applies the relevant toll rules for each country, including distance-based tolls, vignette requirements, and known tunnel or bridge fees.
        </p>
        <p>
          The tool detects whether your route uses toll motorways and calculates the distance driven on those roads specifically, rather than applying tolls to the entire journey distance. For countries with vignette systems, the calculator checks whether a vignette is required and selects the most cost-effective option based on your trip duration.
        </p>
        <p>
          Please note that all results are estimates. Actual costs may vary depending on the exact route taken, current toll rates, currency exchange rates, and any discounts or surcharges that apply at the time of travel. Road operators may adjust their prices without notice, and detours or route changes during a trip can affect the final cost.
        </p>
      </AccordionSection>

      <AccordionSection
        icon={<Map className="w-5 h-5 text-blue-600 shrink-0" />}
        title="Example Routes"
      >
        <div className="space-y-4 pt-1">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600 shrink-0" />
              Munich, Germany to Rome, Italy
            </h3>
            <p className="text-sm sm:text-base">
              This popular route crosses Austria and enters Italy via the Brenner Pass. Drivers will need an Austrian vignette for the short stretch through Austria and will pay distance-based tolls on Italian motorways. The Brenner Pass tunnel carries a separate toll. Total motorway distance in Italy is typically several hundred kilometers.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600 shrink-0" />
              Paris, France to Barcelona, Spain
            </h3>
            <p className="text-sm sm:text-base">
              Traveling from France to Spain involves French motorway tolls, which are distance-based and collected at toll plazas. After crossing the border, Spanish motorways (autopistas) also charge distance-based tolls, though some stretches are toll-free. The route does not require any vignettes.
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600 shrink-0" />
              Vienna, Austria to Ljubljana, Slovenia
            </h3>
            <p className="text-sm sm:text-base">
              A shorter route connecting two capital cities. Both Austria and Slovenia use vignette systems, so drivers need valid vignettes for each country. There are no distance-based tolls on this route, but the Karawanken Tunnel at the Austrian-Slovenian border carries a separate toll. Digital vignettes can be purchased online for both countries before departure.
            </p>
          </div>
        </div>
      </AccordionSection>
    </div>
  );
}
