import { useEffect } from 'react';
import { Link } from 'wouter';
import { Footer } from '../../components/Footer';

export function GuideSpain() {
  useEffect(() => {
    document.title = 'Spain Motorway Tolls Guide 2025 — AP Roads | TollCalculator.eu';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Calculator</Link>
          <span className="text-gray-400">›</span>
          <Link href="/guides" className="text-blue-600 hover:text-blue-800">Guides</Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-600">Spain</span>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🇪🇸</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Spain Motorway Tolls Guide</h1>
        </div>
        <p className="text-gray-500 text-sm mb-8">Last updated: March 2025</p>

        <div className="bg-white rounded-xl shadow p-5 sm:p-8 space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Spain's Mixed Toll System — Major Changes Since 2020</h2>
            <p>Spain has undergone significant changes to its motorway toll system in recent years. As of 2020–2023, the Spanish government took back control of several formerly tolled motorways whose concessions expired, making them <strong>free to use</strong>. This includes major sections of the AP-7 Mediterranean motorway and the AP-4 between Seville and Cadiz.</p>
            <p className="mt-3">Today, Spain operates a <strong>mixed system</strong>: some motorways (designated AP for <em>autopista de peaje</em>) still charge tolls, while others (designated A for <em>autovía</em>) are free. The distinction is not always obvious from a map — you need to check the specific route.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Currently Tolled Motorways</h2>
            <div className="space-y-3 mt-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">AP-7 Catalonia section (Barcelona to French border)</h3>
                <p className="text-sm mt-1">The section of the AP-7 north of Barcelona toward the French border at La Jonquera remains tolled. Barcelona to La Jonquera costs approximately €12–15. The section south of Barcelona (toward Valencia) is now free.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">AP-2 / AP-7 — Zaragoza to Valencia</h3>
                <p className="text-sm mt-1">Parts of this route remain tolled. Rates vary by section and time of day.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">Madrid area radial motorways (R-2, R-3, R-4, R-5)</h3>
                <p className="text-sm mt-1">Several radial motorways around Madrid built under PPP concessions are tolled. Often less used as free alternatives (A-roads) exist parallel to them.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">Basque Country motorways (AP-1, AP-8)</h3>
                <p className="text-sm mt-1">Several motorways in the Basque Country (País Vasco) and Navarre remain under toll concessions operated by regional governments.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Free Alternatives (Autovías)</h2>
            <p>Spain's autovía (A-road) network is extensive and entirely free for all vehicles. For most routes there is a free alternative to any tolled autopista, though the autovías typically pass through more towns and may be slower:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li><strong>A-7:</strong> Free Mediterranean coastal route (former AP-7 sections now toll-free)</li>
              <li><strong>A-2:</strong> Free route through Zaragoza toward Madrid/Barcelona</li>
              <li><strong>A-4:</strong> Free route from Madrid to Cadiz (the former AP-4 concession expired)</li>
              <li><strong>N-340:</strong> The old national road along the coast, scenic but much slower</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Payment Methods</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Cash:</strong> Accepted at staffed toll lanes on all Spanish autopistas.</li>
              <li><strong>Credit/debit card:</strong> Accepted at most Spanish toll plazas, including contactless for smaller amounts.</li>
              <li><strong>Via-T transponder:</strong> Spain's electronic toll device. Compatible with Portuguese Via Verde and accepted at most Spanish toll plazas. Gives access to faster lanes and sometimes discounts.</li>
              <li><strong>OBE (On-Board Equipment):</strong> Some new-generation plazas use free-flow technology where no stopping is required — your plate is read and you receive a bill or the charge is applied to a linked account.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Toll Rates</h2>
            <p>Spanish toll rates vary significantly between concessionaires and routes. For comparison:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>AP-7 Barcelona to French border (~145 km): approximately €12–15 for a car</li>
              <li>Tunnels in Catalonia (e.g. Cadi Tunnel): approximately €12 each way</li>
              <li>Basque Country motorways (A-8 Bilbao to San Sebastián): approximately €5–8</li>
            </ul>
            <p className="mt-3">Overall, Spanish tolls are generally <strong>lower than France or Italy</strong> for equivalent distances, and much of the Spanish motorway network is now toll-free.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Tips for Driving in Spain</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Check whether your specific route uses tolled AP roads or free A-roads — the difference can be significant for cost and journey time.</li>
              <li>Google Maps and Waze both allow you to filter out toll roads — useful if you want the free route.</li>
              <li>Speed limits: 120 km/h on motorways (raised to 130 km/h on some sections), 90 km/h on national roads, 50 km/h in urban areas.</li>
              <li>Low emission zones (ZBE) in Barcelona and Madrid restrict older vehicles — check compliance before entering city centres.</li>
              <li>In summer, the coast roads (especially in Catalonia and Levante) are extremely busy. Using the autopista rather than the coast road saves significant time.</li>
              <li>Fuel prices in Spain are among the lower in Western Europe, especially diesel.</li>
            </ul>
          </section>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="font-medium text-gray-900 mb-2">Calculate your Spain toll costs</p>
            <p className="text-sm text-gray-600 mb-3">Get an estimate for your route through Spain, accounting for which sections are tolled and which are free.</p>
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
