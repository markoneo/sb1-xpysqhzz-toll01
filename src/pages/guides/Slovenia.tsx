import { useEffect } from 'react';
import { Link } from 'wouter';
import { Footer } from '../../components/Footer';

export function GuideSlovenia() {
  useEffect(() => {
    document.title = 'Slovenia Motorway Vignette Guide 2025 | TollCalculator.eu';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Calculator</Link>
          <span className="text-gray-400">›</span>
          <Link href="/guides" className="text-blue-600 hover:text-blue-800">Guides</Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-600">Slovenia</span>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🇸🇮</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Slovenia Motorway Vignette Guide</h1>
        </div>
        <p className="text-gray-500 text-sm mb-8">Last updated: March 2025</p>

        <div className="bg-white rounded-xl shadow p-5 sm:p-8 space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">The Slovenian E-Vignette System</h2>
            <p>Slovenia operates an <strong>electronic vignette system</strong> (e-vinjeta) for all vehicles using the national motorway network. Since 2022, the vignette is entirely digital — your vehicle's number plate is registered in the system, and cameras at motorway entries verify your payment automatically. There is no physical sticker to purchase or display.</p>
            <p className="mt-3">The vignette is mandatory on all Slovenian motorways (avtocesta) and expressways (hitra cesta). Unlike Austria, there are no major additional tunnel tolls on the Slovenian motorway network — the vignette covers the entire system, including the Karavanke Tunnel (on the Austrian side, Austria charges its separate toll; on the Slovenian side, the vignette covers it).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Vignette Prices 2025</h2>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Duration</th>
                    <th className="text-left p-3 font-semibold">Car Price</th>
                    <th className="text-left p-3 font-semibold">Motorcycle Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="p-3">7 days</td>
                    <td className="p-3 font-medium">€16.00</td>
                    <td className="p-3">€8.00</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50">
                    <td className="p-3">1 month</td>
                    <td className="p-3 font-medium">€32.00</td>
                    <td className="p-3">€16.00</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="p-3">1 year</td>
                    <td className="p-3 font-medium">€117.50</td>
                    <td className="p-3">€58.75</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-gray-500 text-xs">Prices are for 2-axle vehicles under 3.5 tonnes. Larger vehicles have different rates. The annual vignette runs from 1 December of the previous year.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Where to Buy the Slovenian Vignette</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Online:</strong> Purchase at <em>evinjeta.dars.si</em>. The digital vignette is immediate and linked to your plate number. Can be purchased for a future start date.</li>
              <li><strong>Petrol stations:</strong> Available at DARS petrol stations and many others across Slovenia and at major border crossings.</li>
              <li><strong>Border kiosks:</strong> Self-service machines at major Slovenian border crossings with Austria, Italy, Hungary and Croatia.</li>
              <li><strong>DHL service points and some banks</strong> within Slovenia.</li>
            </ul>
            <p className="mt-3">The vignette is activated immediately upon purchase if you select today as the start date. You can purchase up to 30 days in advance for a future date.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Slovenian Motorway Network</h2>
            <p>Despite its small size, Slovenia has a well-developed motorway network covering the main transit corridors:</p>
            <div className="space-y-3 mt-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">A1 — Koper to Šentilj (Austrian border)</h3>
                <p className="text-sm mt-1">Slovenia's main north-south motorway, running from the Adriatic port of Koper through Ljubljana to the Austrian border at Šentilj (near Maribor). Key route for traffic between the Adriatic and Central Europe.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">A2 — Karavanke (Austria) to Ljubljana to Croatia</h3>
                <p className="text-sm mt-1">The east-west corridor passing through Ljubljana, connecting Austria via the Karavanke Tunnel with Croatia and the Adriatic coast. This is the main route for traffic between Central Europe and the Croatian coast.</p>
              </div>
            </div>
            <p className="mt-3">Most transit traffic through Slovenia passes through Ljubljana. The motorway ring around the city can be congested in peak hours. The full transit from the Austrian border to the Croatian border takes approximately 2 hours.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Combined Austria-Slovenia Toll Costs</h2>
            <p>A very common route for European road trips is <strong>Salzburg → Ljubljana → Zagreb</strong> or similar, which crosses both Austria and Slovenia. For this route, you need to budget for:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Austrian vignette (e.g. 10-day: €11.50)</li>
              <li>Tauern Tunnel toll on the A10: €14.00 (if travelling via Salzburg–Villach)</li>
              <li>Karawanken Tunnel toll on the A11 (Austrian side): €7.90</li>
              <li>Slovenian vignette: €16.00 (7-day)</li>
            </ul>
            <p className="mt-3">Total for a car crossing from Salzburg to Ljubljana via this route: approximately <strong>€49.40</strong> in tolls and vignettes.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Tips for Driving in Slovenia</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Buy the vignette online before reaching Slovenia — it's the most convenient method and avoids border queues.</li>
              <li>The Karavanke Tunnel (connecting Austria to Slovenia) can have very long queues in summer — up to 2 hours at peak times. Arrive early or travel outside peak hours.</li>
              <li>Speed limits: 130 km/h on motorways, 110 km/h on expressways, 90 km/h on other roads, 50 km/h in built-up areas.</li>
              <li>Winter equipment (winter tyres or snow chains) is mandatory from 15 November to 15 March, or in winter conditions outside these dates.</li>
              <li>Headlights are mandatory at all times year-round.</li>
            </ul>
          </section>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="font-medium text-gray-900 mb-2">Calculate your Slovenia toll costs</p>
            <p className="text-sm text-gray-600 mb-3">Get a precise estimate for your route through Slovenia, including the vignette and any cross-border tunnel fees.</p>
            <Link href="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Open Calculator →
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
