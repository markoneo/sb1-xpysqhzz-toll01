import { useEffect } from 'react';
import { Link } from 'wouter';
import { Footer } from '../../components/Footer';

export function GuideCroatia() {
  useEffect(() => {
    document.title = 'Croatia Motorway Tolls Guide 2025 | TollCalculator.eu';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Calculator</Link>
          <span className="text-gray-400">›</span>
          <Link href="/guides" className="text-blue-600 hover:text-blue-800">Guides</Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-600">Croatia</span>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🇭🇷</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Croatia Motorway Tolls Guide</h1>
        </div>
        <p className="text-gray-500 text-sm mb-8">Last updated: March 2025</p>

        <div className="bg-white rounded-xl shadow p-5 sm:p-8 space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Croatian Motorway Toll System</h2>
            <p>Croatia operates a <strong>distance-based toll system</strong> on its motorway network, managed primarily by HAC (Croatian Motorways) and ARZ (Zagreb Motorways). You pay at toll booths located at motorway entries, exits, and at intervals on longer sections. There is no vignette for Croatia — payment is per journey.</p>
            <p className="mt-3">Croatian motorway tolls are generally reasonable compared to Italy or France. A standard car traveling the full length of the A1 (Zagreb to Split, 477 km) pays approximately <strong>€20–25</strong> in tolls. The network is modern and well-maintained, with service areas and rest stops at regular intervals.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Key Croatian Motorway Routes</h2>
            <div className="space-y-3 mt-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">A1 — Zagreb to Split (and Dubrovnik direction)</h3>
                <p className="text-sm mt-1">Croatia's main motorway, running from the capital Zagreb south along the Dalmatian coast to Split, with branches extending toward Dubrovnik. This is the route used by the majority of summer tourists heading for the Adriatic coast. Expect toll plazas approximately every 50–80 km.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">A3 — Bregana (Slovenia) to Lipovac (Serbia)</h3>
                <p className="text-sm mt-1">The east-west Pan-European corridor (former E70) crossing the entire width of Croatia from Slovenia to Serbia. Key route for traffic between Western Europe and the Balkans.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">A6 — Rijeka to Zagreb</h3>
                <p className="text-sm mt-1">Connects the Adriatic port city of Rijeka with Zagreb. Important for traffic arriving by ferry from Italy or coming via Slovenia's Istrian peninsula.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">A7 — Rupa (Slovenia border) to Rijeka</h3>
                <p className="text-sm mt-1">Short motorway connecting the Slovenian border with Rijeka. Part of the main route from Central Europe to the Croatian coast.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Toll Rates and Vehicle Classes</h2>
            <p>Croatian tolls are calculated based on distance and vehicle category:</p>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Category</th>
                    <th className="text-left p-3 font-semibold">Vehicle Type</th>
                    <th className="text-left p-3 font-semibold">Approx. Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="p-3">I</td>
                    <td className="p-3">Motorcycles</td>
                    <td className="p-3">€0.03/km</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50">
                    <td className="p-3">II</td>
                    <td className="p-3">Cars &lt;1.3m height</td>
                    <td className="p-3">€0.05/km</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="p-3">III</td>
                    <td className="p-3">Cars with caravan/trailer, height &gt;1.3m</td>
                    <td className="p-3">€0.07/km</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50">
                    <td className="p-3">IV–VII</td>
                    <td className="p-3">Trucks and buses</td>
                    <td className="p-3">€0.10–0.25/km</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Payment Methods</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Cash (Euro or Croatian kuna):</strong> Croatia adopted the Euro in January 2023. Kuna is no longer accepted.</li>
              <li><strong>Credit/debit card:</strong> Accepted at all major toll plazas.</li>
              <li><strong>ENC / Elektronička naplata cestarine:</strong> Croatia's electronic toll transponder system. Available for purchase at HAC offices and some petrol stations. Gives a small discount and allows use of faster lanes.</li>
              <li><strong>Foreign transponders:</strong> Some European systems work on Croatian motorways — check compatibility before travelling.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Istria — Separate System</h2>
            <p>The Istrian peninsula in the northwest of Croatia (the triangular peninsula bordering Slovenia and Italy) has its own motorway system operated by <strong>BINA-ISTRA</strong>. The main route is the Y-shaped Istrian Motorway (known as the <em>Istrian Y</em>), connecting Pula, Rovinj/Poreč, and Pula to Trieste/Slovenia.</p>
            <p className="mt-3">Tolls in Istria are collected separately from the main Croatian network and are slightly higher per km. If your route includes the Istrian peninsula (e.g. driving from Trieste to Rijeka via Pula), factor in approximately €10–15 for the Istrian motorway section.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Tips for Driving in Croatia</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>In peak summer (July–August), the A1 around Split and Zadar becomes extremely congested on Saturdays. Travel early morning or overnight.</li>
              <li>The Pelješac Bridge (opened 2022) connects the Croatian mainland to the Dubrovnik area without crossing through Bosnia — a huge improvement for south-bound tourists.</li>
              <li>Speed limits: 130 km/h on motorways, 110 km/h on expressways, 90 km/h on roads outside towns, 50 km/h in urban areas.</li>
              <li>Headlights are mandatory at all times outside built-up areas.</li>
              <li>Vignettes from neighbouring Slovenia and Austria are not valid in Croatia.</li>
            </ul>
          </section>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="font-medium text-gray-900 mb-2">Calculate your Croatia toll costs</p>
            <p className="text-sm text-gray-600 mb-3">Get a full cost breakdown for your route through Croatia including all toll plazas.</p>
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
