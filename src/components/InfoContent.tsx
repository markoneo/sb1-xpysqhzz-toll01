import { Route, MapPin, CreditCard, Mountain, Compass, Map } from 'lucide-react';

export function InfoContent() {
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-8 sm:py-12 space-y-10 text-gray-700 leading-relaxed">
      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Route className="w-6 h-6 text-blue-600 shrink-0" />
          How Road Tolls Work in Europe
        </h2>
        <p className="mb-3">
          Road tolls across Europe vary significantly from country to country. There is no single unified system, so drivers crossing multiple borders will encounter different payment methods, pricing models, and rules depending on their route.
        </p>
        <p className="mb-3">
          In countries like Italy, France, Spain, Portugal, Croatia, Greece, and Poland, tolls are typically distance-based. Drivers take a ticket when entering a motorway and pay at the exit based on how far they have traveled. Rates differ by vehicle category, with larger vehicles generally paying more. Some motorways use electronic tolling, where cameras or transponders record entry and exit points.
        </p>
        <p>
          Barrier toll systems are also common, where drivers stop at toll plazas at fixed points along a route. These are found on specific stretches of motorway, bridges, or tunnels. Payment is usually accepted in cash, by card, or via electronic transponders such as Telepass in Italy or Liber-t in France.
        </p>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-blue-600 shrink-0" />
          What Is a Vignette?
        </h2>
        <p className="mb-3">
          A vignette is a time-based road usage fee that grants access to a country's motorway network for a set period. Unlike distance-based tolls, a vignette covers unlimited motorway travel within the validity period, whether that is 10 days, one month, or a full year.
        </p>
        <p className="mb-3">
          Countries that use vignette systems include Austria, Switzerland, Slovenia, Czechia, Slovakia, Hungary, Romania, and Bulgaria. Each country sets its own pricing and validity periods. For example, Austria offers 1-day, 10-day, 2-month, and annual digital vignettes, while Switzerland requires an annual vignette that is valid for the calendar year plus December of the previous year and January of the following year.
        </p>
        <p>
          In recent years, many countries have transitioned from physical sticker vignettes to digital versions. Digital vignettes are linked to the vehicle's license plate and can be purchased online before a trip. Slovenia, Austria, and Hungary all offer digital vignettes, making it easier for travelers to prepare in advance. Some countries, like Switzerland, still use physical sticker vignettes that must be displayed on the windshield.
        </p>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Mountain className="w-6 h-6 text-blue-600 shrink-0" />
          Tunnel and Mountain Pass Fees
        </h2>
        <p className="mb-3">
          Many Alpine routes include tunnels and mountain passes that charge separate fees on top of regular tolls or vignettes. These structures are expensive to build and maintain, so they carry their own pricing, which can be significant for longer tunnels.
        </p>
        <p className="mb-3">
          Well-known examples include the Brenner Pass tunnel between Austria and Italy, the Mont Blanc Tunnel connecting France and Italy, the Frejus Tunnel between France and Italy, the Arlberg Tunnel in Austria, the Tauern Tunnel in Austria, and the Great St. Bernard Tunnel between Switzerland and Italy. Prices depend on the vehicle size and whether the trip is one-way or return.
        </p>
        <p>
          Some tunnel operators offer discounted return tickets if purchased at the time of the first crossing. It is worth checking availability before your trip, as these savings can be meaningful on routes that cross the Alps multiple times.
        </p>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Compass className="w-6 h-6 text-blue-600 shrink-0" />
          How This Calculator Works
        </h2>
        <p className="mb-3">
          This calculator analyzes your planned route using mapping data to determine which countries you will pass through and how many kilometers you will drive in each. Based on that information, it applies the relevant toll rules for each country, including distance-based tolls, vignette requirements, and known tunnel or bridge fees.
        </p>
        <p className="mb-3">
          The tool detects whether your route uses toll motorways and calculates the distance driven on those roads specifically, rather than applying tolls to the entire journey distance. For countries with vignette systems, the calculator checks whether a vignette is required and selects the most cost-effective option based on your trip duration.
        </p>
        <p>
          Please note that all results are estimates. Actual costs may vary depending on the exact route taken, current toll rates, currency exchange rates, and any discounts or surcharges that apply at the time of travel. Road operators may adjust their prices without notice, and detours or route changes during a trip can affect the final cost.
        </p>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Map className="w-6 h-6 text-blue-600 shrink-0" />
          Example Routes
        </h2>
        <div className="space-y-4">
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
      </section>
    </div>
  );
}
