import { useEffect } from 'react';
import { Link } from 'wouter';
import { Footer } from '../../components/Footer';

export function GuideItaly() {
  useEffect(() => {
    document.title = 'Italy Motorway Tolls Guide 2025 — Autostrade | TollCalculator.eu';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Calculator</Link>
          <span className="text-gray-400">›</span>
          <Link href="/guides" className="text-blue-600 hover:text-blue-800">Guides</Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-600">Italy</span>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🇮🇹</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Italy Motorway Tolls Guide — Autostrade</h1>
        </div>
        <p className="text-gray-500 text-sm mb-8">Last updated: March 2025</p>

        <div className="bg-white rounded-xl shadow p-5 sm:p-8 space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">How Italian Motorway Tolls Work</h2>
            <p>Italy operates a <strong>distance-based toll system</strong> on its Autostrade network — the most extensive tolled motorway network in Europe. You pay based on how far you drive on each toll road, collected at entry and exit points called <em>caselli</em> (toll plazas). The system is operated by multiple concession companies, the largest being Autostrade per l'Italia (ASPI), which manages approximately 3,000 km of the network.</p>
            <p className="mt-3">Unlike vignette countries, there is no single annual pass for Italian motorways. Every journey is charged based on distance, vehicle class, and the specific road operator's rates. For a car (vehicle class A), the average rate is approximately <strong>€0.07–0.10 per km</strong>, but this varies significantly between operators and route sections.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Vehicle Classification</h2>
            <p>Italian tolls are classified by vehicle height and number of axles:</p>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Class</th>
                    <th className="text-left p-3 font-semibold">Vehicle Type</th>
                    <th className="text-left p-3 font-semibold">Approx. Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="p-3">A</td>
                    <td className="p-3">Cars &lt;1.3m height, motorcycles</td>
                    <td className="p-3">€0.07–0.10/km</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50">
                    <td className="p-3">B</td>
                    <td className="p-3">Cars with trailer or &gt;1.3m height, 2-axle vans</td>
                    <td className="p-3">€0.10–0.15/km</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="p-3">3–5</td>
                    <td className="p-3">Trucks with 3–5+ axles</td>
                    <td className="p-3">€0.15–0.30+/km</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">How to Pay at Italian Toll Plazas</h2>
            <p>Italian toll plazas offer several payment lanes. Look for signs to choose the right lane:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li><strong>Contanti (Cash):</strong> Staffed lanes accepting euro banknotes and coins. Change given.</li>
              <li><strong>Carte di credito (Credit/Debit card):</strong> Most plazas accept Visa, Mastercard and sometimes Amex. Contactless is increasingly available.</li>
              <li><strong>Telepass:</strong> Italy's electronic toll collection system. Subscribers with a Telepass device (mounted on the windscreen) can drive through dedicated lanes at full speed. Visitors can rent a Telepass device or use compatible European transponders.</li>
              <li><strong>Viacard:</strong> Prepaid toll cards available at Autogrill service areas and toll booths. Useful for tourists.</li>
            </ul>
            <p className="mt-3">At automated cash lanes (blue signs), you insert the entry ticket received at the motorway entry, and the display shows the amount due. Insert coins or notes, take your receipt and change.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Key Italian Motorway Routes and Approximate Costs</h2>
            <div className="space-y-3 mt-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">A1 — Milan to Rome (572 km) — approx. €45–50</h3>
                <p className="text-sm mt-1">The <em>Autostrada del Sole</em> (Motorway of the Sun) is Italy's main north-south artery, running from Milan through Florence and Rome. Expect multiple toll plazas along the route.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">A4 — Turin to Venice (290 km) — approx. €23–28</h3>
                <p className="text-sm mt-1">The east-west corridor across the Po Valley, linking Turin, Milan, Verona, Venice and Trieste. Very heavy traffic, especially around Milan.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">A22 — Brenner to Modena (314 km) — approx. €24–30</h3>
                <p className="text-sm mt-1">The Brenner Motorway from the Austrian border at Innsbruck/Brenner down through Bolzano and Trento to the Po Valley. Key route for Alpine crossings from Germany and Austria.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">A10/A8/A26 — Genoa to Milan — approx. €13–18</h3>
                <p className="text-sm mt-1">The route from the French Riviera and Liguria through Genoa to Milan passes through several different concessionaire sections with varying rates.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Major Alpine Tunnel Tolls</h2>
            <p>Italy shares several high-traffic Alpine tunnels with France and Switzerland, each with a significant separate toll:</p>
            <div className="space-y-3 mt-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">Mont Blanc Tunnel — approx. €51–58 one way</h3>
                <p className="text-sm mt-1">Connects Courmayeur (Italy) with Chamonix (France). At 11.6 km, it is one of the most famous mountain tunnels in the world. Toll is collected on both the Italian and French sides — you pay the full round-trip amount at the Italian entry if returning.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">Frejus Tunnel — approx. €53–60 one way</h3>
                <p className="text-sm mt-1">Connects Bardonecchia (Italy) with Modane (France) through the Cottian Alps. An important freight route between Italy and France's Rhône-Alpes region.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">Great St Bernard Tunnel — approx. €32 one way</h3>
                <p className="text-sm mt-1">Links the Aosta Valley (Italy) with the canton of Valais (Switzerland). Open year-round, unlike the mountain pass road which closes in winter.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Tips for Driving on Italian Motorways</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Keep your entry ticket safe — you need it at the exit plaza. Losing it means paying the maximum fare for that section.</li>
              <li>In peak summer months (July–August), the A1 south of Florence and the A14 along the Adriatic coast experience extreme congestion. Consider travelling early morning or at night.</li>
              <li>Telepass lanes (marked with orange T signs) move much faster — consider renting a compatible transponder if making multiple trips.</li>
              <li>Free motorway sections exist in some areas — notably parts of southern Italy (Calabria, Sicily) and some Sardinian roads.</li>
              <li>Speed limits: 130 km/h on motorways (reduced to 110 km/h in rain), 90 km/h on single-carriageway roads.</li>
              <li>Italian service areas (Autogrill) are frequent and often have good food — worth stopping at for a coffee and break.</li>
            </ul>
          </section>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="font-medium text-gray-900 mb-2">Calculate your Italy toll costs</p>
            <p className="text-sm text-gray-600 mb-3">Enter your route to get a full breakdown of Italian Autostrade tolls for your journey.</p>
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
