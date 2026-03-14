import { useEffect } from 'react';
import { Link } from 'wouter';
import { Footer } from '../../components/Footer';

export function GuideSwitzerland() {
  useEffect(() => {
    document.title = 'Switzerland Motorway Vignette Guide 2025 | TollCalculator.eu';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Calculator</Link>
          <span className="text-gray-400">›</span>
          <Link href="/guides" className="text-blue-600 hover:text-blue-800">Guides</Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-600">Switzerland</span>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🇨🇭</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Switzerland Motorway Vignette Guide</h1>
        </div>
        <p className="text-gray-500 text-sm mb-8">Last updated: March 2025</p>

        <div className="bg-white rounded-xl shadow p-5 sm:p-8 space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">The Swiss Motorway Vignette</h2>
            <p>Switzerland uses an annual motorway vignette (Autobahnvignette) that is mandatory for all vehicles using the national motorway and expressway network. Unlike Austria, Switzerland has not yet moved to a fully digital system — the vignette is a <strong>physical adhesive sticker</strong> that must be attached to the inside of your windscreen. A digital option is available but not yet universally enforced at all entry points.</p>
            <p className="mt-3">The vignette costs a flat <strong>CHF 40 (approximately €42)</strong> and is valid from <strong>1 December of the previous year to 31 January of the following year</strong> — effectively about 14 months. There are no shorter duration options for the Swiss motorway network itself. If you are only making a brief transit, you still pay the full CHF 40.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">What the Vignette Covers</h2>
            <p>The Swiss vignette covers driving on all motorways (Autobahn/autoroute/autostrada) and semi-motorways designated with a green vignette sign. It does not cover:</p>
            <ul className="list-disc pl-5 space-y-1 mt-3">
              <li>Certain mountain passes and tunnels that charge separately (e.g. Great St Bernard Tunnel)</li>
              <li>Some cantonal roads and mountain toll roads</li>
              <li>The Gotthard Road Tunnel is free with the vignette</li>
            </ul>
            <p className="mt-3">Switzerland's motorway network is well-maintained and provides fast connections through the Alps. Most major routes — including the N1 from Geneva to St Gallen, and the N2 from Basel through the Gotthard to Lugano — are included.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Vignette Price 2025</h2>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Duration</th>
                    <th className="text-left p-3 font-semibold">Price</th>
                    <th className="text-left p-3 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="p-3">Annual (only option)</td>
                    <td className="p-3 font-medium">CHF 40 / ~€42</td>
                    <td className="p-3">Valid ~14 months (Dec–Jan)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-gray-500 text-xs">Price applies to cars, campervans under 3.5t, and motorcycles. Trailers require an additional CHF 40 vignette.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Where to Buy the Swiss Vignette</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Swiss border crossings:</strong> Available at staffed border posts and vending machines. Most major crossings from France, Germany, Austria and Italy have purchase options.</li>
              <li><strong>Online (digital vignette):</strong> Purchase at <em>via.admin.ch</em>. The digital version is linked to your number plate.</li>
              <li><strong>Petrol stations in neighbouring countries:</strong> Available at many OMV, Shell and independent stations near the Swiss border.</li>
              <li><strong>Swiss post offices and tourist offices</strong> within Switzerland.</li>
              <li><strong>Automobile clubs:</strong> TCS (Swiss), ADAC (Germany), ÖAMTC (Austria) all sell the Swiss vignette.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Special Tunnel Tolls</h2>
            <p>Two tunnels in Switzerland have tolls in addition to the motorway vignette:</p>
            <div className="space-y-3 mt-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">Great St Bernard Tunnel — CHF 34 (~€36)</h3>
                <p className="text-sm mt-1">Connects the canton of Valais in Switzerland with the Aosta Valley in Italy. At 5.8 km, it is one of the most important transalpine connections. The tunnel is open year-round, unlike the pass road which closes in winter. Both the Swiss and Italian sides charge separately.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">Munt la Schera Tunnel — CHF 26 (~€27)</h3>
                <p className="text-sm mt-1">A small tunnel in the Engadin that provides access to Livigno in Italy — a duty-free enclave. Mainly used by those visiting Livigno for skiing or shopping.</p>
              </div>
            </div>
            <p className="mt-3">Note: The <strong>Gotthard Road Tunnel</strong> (A2, 17 km) is included in the motorway vignette and does not charge an additional toll. It can have very long queues in summer — the parallel Gotthard Rail Tunnel carries vehicles on car-carrying trains as an alternative.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Applying the Vignette Correctly</h2>
            <p>The physical Swiss vignette must be:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Stuck directly to the windscreen (not on a holder or removable surface)</li>
              <li>Applied from the inside of the windscreen in the lower-left or lower-right corner</li>
              <li>Not transferred from another vehicle — the vignette is destroyed if removed</li>
            </ul>
            <p className="mt-3">Driving without a valid vignette results in a fine of <strong>CHF 200</strong> plus the cost of the vignette. Checks are carried out at border crossings and on the road.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Tips for Driving in Switzerland</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Buy the vignette before entering Switzerland — queues at border kiosks can be long in summer.</li>
              <li>Even a brief motorway transit (e.g. Basel to Zurich airport) requires a valid vignette.</li>
              <li>Using cantonal roads to avoid motorways is technically possible but very slow through the Alps.</li>
              <li>Petrol prices in Switzerland are high — consider filling up before entering from France or Germany.</li>
              <li>Speed limits: 120 km/h on motorways, 80 km/h on other main roads, 50 km/h in built-up areas.</li>
              <li>Winter tyres are strongly recommended from October to April, especially in the Alps.</li>
            </ul>
          </section>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="font-medium text-gray-900 mb-2">Calculate your Switzerland toll costs</p>
            <p className="text-sm text-gray-600 mb-3">Enter your route to get a full cost breakdown including the Swiss vignette and any tunnel fees.</p>
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
