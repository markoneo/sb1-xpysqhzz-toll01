import { useEffect } from 'react';
import { Link } from 'wouter';
import { Footer } from '../../components/Footer';

export function GuideFrance() {
  useEffect(() => {
    document.title = 'France Motorway Tolls Guide 2025 — Péage | TollCalculator.eu';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Calculator</Link>
          <span className="text-gray-400">›</span>
          <Link href="/guides" className="text-blue-600 hover:text-blue-800">Guides</Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-600">France</span>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🇫🇷</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">France Motorway Tolls Guide — Péage</h1>
        </div>
        <p className="text-gray-500 text-sm mb-8">Last updated: March 2025</p>

        <div className="bg-white rounded-xl shadow p-5 sm:p-8 space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">How French Motorway Tolls Work</h2>
            <p>France has one of the most extensive toll motorway networks in Europe, with over 9,000 km of tolled roads operated by private concessionaires. The system is <strong>distance-based</strong> — you pay based on the motorway section you use, with charges varying between operators. Tolls are collected at <em>péage</em> barriers (toll plazas) located at motorway entries, exits, and at intervals along longer sections.</p>
            <p className="mt-3">French toll rates average around <strong>€0.08–0.10 per km</strong> for a standard car on most routes, making it one of the pricier European countries for motorway travel. A full crossing from the Channel to the Mediterranean — roughly 900 km — typically costs €60–80 in tolls alone.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Major Motorway Operators</h2>
            <p>France's motorways are operated by several competing companies, each with slightly different rates:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li><strong>Vinci Autoroutes</strong> — operates ASF, Escota, and Cofiroute networks, covering southern France and the A11 corridor</li>
              <li><strong>Sanef</strong> — operates A1, A2, A4, A26 (Paris to north and east)</li>
              <li><strong>APRR / AREA</strong> — operates routes in Burgundy, Alsace, and the Alps</li>
              <li><strong>ATMB</strong> — operates the Mont Blanc tunnel approach and A40 in the Alps</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Toll Rates and Key Routes</h2>
            <div className="space-y-3 mt-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">A6/A7 — Paris to Marseille (775 km) — approx. €68</h3>
                <p className="text-sm mt-1">The <em>Autoroute du Soleil</em>, one of the busiest routes in Europe. Extremely congested on holiday weekends, especially around Valence and Orange.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">A1 — Paris to Calais (290 km) — approx. €20</h3>
                <p className="text-sm mt-1">Main route to the Channel Tunnel and ferry ports. Very busy with commercial traffic. The Paris ring road (Périphérique) is free.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">A9 — Orange to Spain border (240 km) — approx. €20</h3>
                <p className="text-sm mt-1">Key route from the Rhône Valley to the Spanish border at Le Perthus. Major transit route for traffic between France and Spain.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">A40 — Mâcon to Chamonix (180 km) — approx. €20</h3>
                <p className="text-sm mt-1">The route to the Mont Blanc Tunnel and Swiss Geneva. Spectacular mountain scenery through the Jura and Alps.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Payment Methods at French Péage</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Cash:</strong> Accepted at staffed lanes (green arrow sign). Exact change preferred but not required.</li>
              <li><strong>Bank card / contactless:</strong> Most French toll plazas accept chip-and-PIN and contactless cards. Look for the card symbol on lane signs.</li>
              <li><strong>Liber-t / Télépéage:</strong> France's electronic toll system. Badge (transponder) mounted on windscreen allows passage through dedicated free-flow lanes at speed. Compatible with European systems.</li>
              <li><strong>Automated coin/card machines:</strong> Unmanned lanes with coin machines and card readers. Common on secondary routes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Alpine Tunnel Tolls from France</h2>
            <div className="space-y-3 mt-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">Mont Blanc Tunnel — approx. €51–58 one way</h3>
                <p className="text-sm mt-1">The 11.6 km tunnel connects Chamonix (France) with Courmayeur (Italy). One of the most iconic Alpine crossings. Prices are for a standard car, one-way. Return tickets purchased at the French side offer a discount if used within 7 days.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">Frejus Tunnel — approx. €53–60 one way</h3>
                <p className="text-sm mt-1">Connects Modane (France) with Bardonecchia (Italy). Alternative to the Mont Blanc Tunnel for traffic between Lyon/Grenoble and Turin.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">Puymorens Tunnel — approx. €7 one way</h3>
                <p className="text-sm mt-1">A short tunnel through the Pyrenees connecting France with Andorra. Much cheaper than the Alpine tunnels. Alternative to crossing the Puymorens Pass road.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Free Motorway Alternatives</h2>
            <p>Not all French motorways are tolled. Some useful free sections include:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Parts of the A20 (Brive to Montauban) — free dual carriageway through the Lot and Corrèze</li>
              <li>Sections of the A75 (Clermont-Ferrand to Montpellier) — mostly free, with one short tolled section at the Millau Viaduct</li>
              <li>Urban ring roads around Paris, Lyon, Marseille — generally free</li>
            </ul>
            <p className="mt-3">The <strong>Millau Viaduct</strong> on the A75 charges a small separate toll (approximately €6–10 for a car) but is part of an otherwise largely free motorway — and it's one of the most spectacular structures in Europe.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Tips for Driving in France</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Plan your toll costs in advance using viamichelin.com or our calculator — costs add up quickly on long routes.</li>
              <li>Avoid major French holiday periods: July 14th, first and last weekends of August, and Easter create severe congestion on the A6, A7, A9, and A10.</li>
              <li>France requires by law: a breathalyser kit, high-visibility vest (in the car, not the boot), and warning triangle.</li>
              <li>Low emission zones (ZFE) are in force in many major French cities — check if your vehicle is compliant before driving through Paris, Lyon or Marseille.</li>
              <li>Speed limits: 130 km/h on motorways (110 km/h in rain), 80 km/h on single-carriageway roads, 50 km/h in towns.</li>
            </ul>
          </section>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="font-medium text-gray-900 mb-2">Calculate your France toll costs</p>
            <p className="text-sm text-gray-600 mb-3">Get a detailed breakdown of French péage costs for your specific route.</p>
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
