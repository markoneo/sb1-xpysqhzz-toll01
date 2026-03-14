import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { Footer } from '../../components/Footer';

export function GuideAustria() {
  useEffect(() => {
    document.title = 'Austria Motorway Tolls & Vignette Guide 2025 | TollCalculator.eu';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Calculator</Link>
          <span className="text-gray-400">›</span>
          <Link href="/guides" className="text-blue-600 hover:text-blue-800">Guides</Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-600">Austria</span>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🇦🇹</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Austria Motorway Tolls & Vignette Guide</h1>
        </div>
        <p className="text-gray-500 text-sm mb-8">Last updated: March 2025</p>

        <div className="bg-white rounded-xl shadow p-5 sm:p-8 space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">How the Austrian Toll System Works</h2>
            <p>Austria operates a <strong>digital vignette system</strong> (GO-Maut) for all motorways and expressways. Unlike older sticker vignettes, Austria's system is entirely electronic since 2023 — you register your vehicle's licence plate number and pay online, at a border crossing kiosk, or at a petrol station. There is no physical sticker to display. Instead, cameras at border crossings and on motorways automatically read your plate and check it against the database.</p>
            <p className="mt-3">The vignette covers the entire Austrian motorway network, but several major routes — particularly Alpine tunnels and mountain passes — require an <strong>additional separate toll</strong> on top of the vignette. These are collected at dedicated toll plazas or included in the annual GO-Maut system for certain sections.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Vignette Prices 2025</h2>
            <p>The Austrian vignette is available in three durations:</p>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold">Duration</th>
                    <th className="text-left p-3 font-semibold">Price (Car)</th>
                    <th className="text-left p-3 font-semibold">Valid From</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-100">
                    <td className="p-3">10 days</td>
                    <td className="p-3 font-medium">€11.50</td>
                    <td className="p-3">Purchase date</td>
                  </tr>
                  <tr className="border-t border-gray-100 bg-gray-50">
                    <td className="p-3">2 months</td>
                    <td className="p-3 font-medium">€29.00</td>
                    <td className="p-3">Purchase date</td>
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="p-3">1 year</td>
                    <td className="p-3 font-medium">€96.40</td>
                    <td className="p-3">1 Dec previous year</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-gray-500 text-xs">Prices are for passenger cars. Motorcycles pay approximately half. Vehicles over 3.5t use a different system (GO-Box).</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Where to Buy the Austrian Vignette</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Online:</strong> The easiest option — buy at <em>asfinag.at</em> before your trip. Valid from the day you choose, minimum 18 days in advance.</li>
              <li><strong>Border crossing kiosks:</strong> Self-service machines are available at major Austrian border crossings. Accept card payment.</li>
              <li><strong>Petrol stations and post offices:</strong> Available at OMV, BP, Shell, and other chains in Austria and neighbouring countries.</li>
              <li><strong>ÖAMTC/ADAC offices:</strong> Available at Austrian and German automobile club offices.</li>
            </ul>
            <p className="mt-3">The digital vignette is linked to your licence plate. You can start using the motorway <strong>18 days after purchase</strong> if buying online in advance (or immediately if you set the start date to today). There is an 18-day overlap when buying for the next year at year-end.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Major Austrian Tunnel and Pass Tolls</h2>
            <p>Several important routes carry separate tolls in addition to the vignette. These are charged at physical toll plazas or included in the electronic system depending on the route:</p>

            <div className="space-y-4 mt-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">Brenner Autobahn (A13) — €11.50</h3>
                <p className="text-sm mt-1">The most-used Alpine crossing for traffic between Germany/Austria and Italy. The A13 runs from Innsbruck to the Italian border at Brenner Pass. There is a separate section toll in addition to the vignette. This is one of the busiest freight corridors in Europe.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">Tauern Tunnel (A10) — €14.00</h3>
                <p className="text-sm mt-1">Located on the A10 Tauern Autobahn between Salzburg and Villach, this 6.4 km tunnel passes through the main Alpine ridge. Essential for routes between Salzburg and Carinthia or Slovenia. Collected at the Flachau/Rennweg toll plaza.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">Karawanken Tunnel (A11) — €7.90</h3>
                <p className="text-sm mt-1">Connects Villach (Austria) with Jesenice (Slovenia) through the Karawanken mountain range. If traveling from Salzburg to Ljubljana via the A10/A11, you will pass both the Tauern Tunnel and the Karawanken Tunnel, paying tolls at both.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">Arlberg Tunnel (S16) — €11.50</h3>
                <p className="text-sm mt-1">Connects the Tyrol with Vorarlberg in western Austria. At 14 km, it is one of the longest road tunnels in Europe. The alternative Arlberg Pass road is free but only open seasonally.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">Bosruck &amp; Gleinalm Tunnels (A9) — €6.50 / €9.50</h3>
                <p className="text-sm mt-1">Both located on the A9 Pyhrn Autobahn between Linz and Graz. Travelers using this route will pass through both tunnels and pay separate tolls at each.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Driving Without a Vignette — Fines</h2>
            <p>Driving on Austrian motorways without a valid vignette is a serious offence. Enforcement cameras and spot checks are common. If caught without a vignette, you face a fine of up to <strong>€240 on the spot</strong> (reduced rate). Refusing to pay immediately results in a formal fine of up to <strong>€3,000</strong>. There is no grace period — the vignette must be valid for the entire motorway section you are driving.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Tips for Driving in Austria</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Buy the vignette before reaching the Austrian border to avoid delays at kiosks.</li>
              <li>If your route goes through the Brenner, budget for both the motorway vignette and the A13 section toll.</li>
              <li>For a Salzburg–Ljubljana route, remember you will need both the Tauern Tunnel toll and the Karawanken Tunnel toll.</li>
              <li>Avoid the A13 toll by using free alternative roads via Seefeld (longer and slower).</li>
              <li>Petrol in Austria is generally cheaper than Switzerland but more expensive than Germany.</li>
              <li>Speed limits: 130 km/h on motorways, 100 km/h on expressways, 50 km/h in towns unless signed otherwise.</li>
            </ul>
          </section>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="font-medium text-gray-900 mb-2">Calculate your Austria toll costs</p>
            <p className="text-sm text-gray-600 mb-3">Use our free calculator to get a full cost estimate for your route through Austria, including the vignette, any tunnel fees, and costs for neighbouring countries.</p>
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
