import { useEffect } from 'react';
import { Link } from 'wouter';
import { Footer } from '../../components/Footer';

export function GuideGermany() {
  useEffect(() => {
    document.title = 'Germany Autobahn Guide — Tolls for Cars & Trucks 2025 | TollCalculator.eu';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Calculator</Link>
          <span className="text-gray-400">›</span>
          <Link href="/guides" className="text-blue-600 hover:text-blue-800">Guides</Link>
          <span className="text-gray-400">›</span>
          <span className="text-gray-600">Germany</span>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">🇩🇪</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Germany Autobahn Guide — No Car Tolls</h1>
        </div>
        <p className="text-gray-500 text-sm mb-8">Last updated: March 2025</p>

        <div className="bg-white rounded-xl shadow p-5 sm:p-8 space-y-6 text-gray-700 text-sm sm:text-base leading-relaxed">

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">No Motorway Tolls for Cars in Germany</h2>
            <p>Germany is one of the few countries in Europe where <strong>passenger cars drive on motorways for free</strong>. The famous Autobahn network — over 13,000 km of motorway — does not charge private cars any toll or require a vignette. This makes Germany an unusually cost-efficient country for road trips, even though fuel prices and vehicle costs are otherwise high.</p>
            <p className="mt-3">A proposed car vignette (Pkw-Maut) was planned by the German government around 2019 but was ruled unconstitutional by the EU Court of Justice before it came into force. As of 2025, there are no plans to reintroduce it.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Truck Tolls — LKW-Maut</h2>
            <p>While cars are free, <strong>heavy goods vehicles (HGVs) over 7.5 tonnes</strong> pay a distance-based toll on all German motorways and many federal roads (Bundesstraßen). This is known as the <em>LKW-Maut</em> (lorry toll) and is administered by the Toll Collect system.</p>
            <p className="mt-3">Since 2023, the threshold was reduced to include vehicles over 3.5 tonnes for certain road categories. The rate varies based on emissions class, number of axles, and road category — typically between <strong>€0.12 and €0.35 per km</strong> for an average truck.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">The Autobahn Network</h2>
            <p>Germany's Autobahn is one of the world's most famous road networks. Key facts:</p>
            <ul className="list-disc pl-5 space-y-2 mt-3">
              <li>Over 13,000 km of motorway — the fourth-longest in the world</li>
              <li>Sections with no permanent speed limit (<em>Richtgeschwindigkeit</em> advisory limit of 130 km/h)</li>
              <li>Well-maintained with frequent service areas (<em>Raststätten</em>)</li>
              <li>Major routes designated A1–A99 and BAB (Bundesautobahn)</li>
              <li>Roadwork sections common, especially in summer — check current restrictions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Key German Motorway Routes</h2>
            <div className="space-y-3 mt-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">A1 — Flensburg to Saarbrücken</h3>
                <p className="text-sm mt-1">Runs north-south from the Danish border through Hamburg, Dortmund and Cologne to the French border. One of the most heavily used routes for freight.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">A3 — Frankfurt to Passau (Austrian border)</h3>
                <p className="text-sm mt-1">Key route for traffic heading towards Austria, Hungary and the Balkans. Connects Frankfurt with Würzburg, Nuremberg and Regensburg.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">A8 — Stuttgart to Salzburg</h3>
                <p className="text-sm mt-1">Southern motorway connecting Stuttgart, Munich, and the Austrian border near Salzburg. Important for Austria, Italy and Balkans-bound traffic.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900">A9 — Berlin to Munich</h3>
                <p className="text-sm mt-1">The north-south spine through central Germany, connecting Berlin and Munich in approximately 6 hours. Includes sections with no speed limit in Bavaria.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Urban Low Emission Zones</h2>
            <p>While motorways are free, German cities have <strong>Umweltzonen</strong> (environmental zones) that restrict access based on emissions stickers. If you plan to drive into a German city centre, check whether your vehicle needs a green, yellow, or red emissions badge (<em>Plakette</em>).</p>
            <p className="mt-3">The Umweltplakette can be purchased at German vehicle inspection stations, most petrol stations and post offices, or in advance online. Without the correct sticker, you face a fine of <strong>€80</strong> for entering a restricted zone. Most modern Euro 4 and higher vehicles qualify for the green sticker.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Speed Limits on the Autobahn</h2>
            <p>The Autobahn is famous for sections without a mandatory speed limit, but this does not mean the entire network is unrestricted:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>No speed limit sections: advisory limit of 130 km/h, but no legal maximum for cars</li>
              <li>Restricted sections: 100, 120, or 130 km/h depending on the section</li>
              <li>Roadwork zones: typically 60–80 km/h, strictly enforced</li>
              <li>In wet conditions, insurers may not cover accidents above 130 km/h even on unrestricted sections</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Tips for Driving in Germany</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>No toll costs for your car — but budget carefully for fuel and any neighbouring country tolls.</li>
              <li>Keep right except to overtake — this is strictly observed and expected on the Autobahn.</li>
              <li>Emergency lane (Rettungsgasse): in traffic jams you must form a clear lane in the middle for emergency vehicles.</li>
              <li>Fuel is generally cheaper than in Switzerland, Austria or France — good country to fill the tank.</li>
              <li>Germany borders 9 countries — most routes to eastern or southern Europe pass through Germany at zero toll cost for cars.</li>
            </ul>
          </section>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="font-medium text-gray-900 mb-2">Planning a trip through Germany?</p>
            <p className="text-sm text-gray-600 mb-3">While Germany itself is toll-free for cars, your route may pass through other countries with tolls or vignettes. Use our calculator for a full cost breakdown.</p>
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
