import type { Express } from "express";
import { createServer, type Server } from "http";

const AVAILABLE_TUNNELS = [
  { id: 'at-brenner', name: 'Brenner Autobahn (A13)', country: 'Austria', route: 'Innsbruck to Italy border' },
  { id: 'at-tauern', name: 'Tauern Tunnel (A10)', country: 'Austria', route: 'Salzburg to Villach on A10 motorway' },
  { id: 'at-karawanken', name: 'Karawanken Tunnel (A11)', country: 'Austria', route: 'Villach to Slovenia border, connects Austria A11 to Slovenia A2' },
  { id: 'at-arlberg', name: 'Arlberg Tunnel (S16)', country: 'Austria', route: 'Tirol to Vorarlberg, western Austria' },
  { id: 'at-bosruck', name: 'Bosruck Tunnel (A9)', country: 'Austria', route: 'A9 Pyhrn Autobahn, between Linz and Graz (northern section)' },
  { id: 'at-gleinalm', name: 'Gleinalm Tunnel (A9)', country: 'Austria', route: 'A9 Pyhrn Autobahn, between Linz and Graz (southern section near Graz)' },
  { id: 'at-felbertauern', name: 'Felbertauern Road', country: 'Austria', route: 'Salzburg to East Tyrol via Mittersill' },
  { id: 'ch-grandstbernard', name: 'Grand St. Bernard Tunnel', country: 'Switzerland', route: 'Switzerland to Italy via Aosta Valley' },
  { id: 'ch-munt', name: 'Munt la Schera Tunnel', country: 'Switzerland', route: 'Engadin to Livigno (Italy)' },
  { id: 'it-montblanc', name: 'Mont Blanc Tunnel', country: 'Italy', route: 'Italy (Aosta) to France (Chamonix)' },
  { id: 'it-frejus', name: 'Frejus Tunnel', country: 'Italy', route: 'Turin area to France' },
  { id: 'it-grandstbernard', name: 'Grand St. Bernard Tunnel', country: 'Italy', route: 'Italy to Switzerland' },
  { id: 'fr-montblanc', name: 'Mont Blanc Tunnel', country: 'France', route: 'France (Chamonix) to Italy (Aosta)' },
  { id: 'fr-frejus', name: 'Frejus Tunnel', country: 'France', route: 'France to Turin area' },
  { id: 'fr-puymorens', name: 'Puymorens Tunnel', country: 'France', route: 'France to Andorra/Spain' },
];

interface TunnelDetectionRequest {
  origin: string;
  destination: string;
  waypoints?: string[];
  countries?: string[];
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/config", (_req, res) => {
    return res.json({
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
    });
  });

  app.post("/api/detect-tunnels", async (req, res) => {
    try {
      const { origin, destination, waypoints = [], countries = [] }: TunnelDetectionRequest = req.body;

      if (!origin || !destination) {
        return res.status(400).json({ error: "Origin and destination are required" });
      }

      const openaiApiKey = process.env.OPENAI_API_KEY;
      if (!openaiApiKey) {
        return res.json({ error: "OpenAI API key not configured", tunnelIds: [] });
      }

      const relevantTunnels = AVAILABLE_TUNNELS.filter(t => {
        const countryMap: Record<string, string> = {
          'Austria': 'AT', 'Switzerland': 'CH', 'Italy': 'IT', 'France': 'FR'
        };
        const tunnelCountryCode = countryMap[t.country];
        return !tunnelCountryCode || countries.length === 0 || countries.includes(tunnelCountryCode);
      });

      const tunnelList = relevantTunnels.map(t =>
        `- ${t.id}: ${t.name} (${t.country}) - ${t.route}`
      ).join('\n');

      const waypointsText = waypoints.length > 0 ? `Via: ${waypoints.join(', ')}` : '';

      const prompt = `You are a European toll road expert. A driver is traveling:
From: ${origin}
To: ${destination}
${waypointsText}
Countries on route: ${countries.join(', ') || 'Unknown'}

Based on the standard driving routes between these locations, which tunnels from this list would they DEFINITELY pass through?

Available tunnels:
${tunnelList}

IMPORTANT RULES:
1. Only include tunnels that are on the MAIN/DEFAULT driving route (what Google Maps or navigation would suggest)
2. For Salzburg to Ljubljana via A10: Tauern Tunnel (at-tauern) AND Karawanken Tunnel (at-karawanken) are BOTH required
3. For Ljubljana to Salzburg via A10: Karawanken Tunnel (at-karawanken) AND Tauern Tunnel (at-tauern) are BOTH required
4. The A10 Tauern Autobahn goes: Salzburg -> Tauern Tunnel -> Villach -> Karawanken Tunnel -> Slovenia
5. If traveling through Graz instead (A9 route), use Bosruck and Gleinalm tunnels, NOT Tauern/Karawanken

Respond with ONLY a JSON array of tunnel IDs, like: ["at-tauern", "at-karawanken"]
If no tunnels are needed, respond with: []`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openaiApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a European toll road expert. Respond only with valid JSON arrays." },
            { role: "user", content: prompt }
          ],
          temperature: 0.1,
          max_tokens: 200,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("OpenAI API error:", errorText);
        return res.json({ error: "OpenAI API error", tunnelIds: [] });
      }

      const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
      const content = data.choices?.[0]?.message?.content || "[]";

      let tunnelIds: string[] = [];
      try {
        const jsonMatch = content.match(/\[.*\]/s);
        if (jsonMatch) {
          tunnelIds = JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        console.error("Failed to parse OpenAI response:", content, e);
      }

      const validTunnelIds = tunnelIds.filter((id: string) =>
        AVAILABLE_TUNNELS.some(t => t.id === id)
      );

      return res.json({ tunnelIds: validTunnelIds });

    } catch (error) {
      console.error("Error:", error);
      return res.json({ error: "Internal server error", tunnelIds: [] });
    }
  });

  app.post("/api/enhance-route", async (req, res) => {
    try {
      const { origin, destination, waypoints = [], routeSummary, totalDistanceKm, countrySegments } = req.body;

      if (!origin || !destination || !Array.isArray(countrySegments)) {
        return res.status(400).json({ enhancedCountries: null, error: "Missing required fields" });
      }

      const openaiApiKey = process.env.OPENAI_API_KEY;
      if (!openaiApiKey) {
        return res.json({ enhancedCountries: null, error: "OpenAI not configured" });
      }

      const detectedList = countrySegments.map((c: { countryCode: string; distance: number; highwayDistance: number }) =>
        `  ${c.countryCode}: ${c.distance} km total, ${c.highwayDistance} km highway (detected by GPS sampling)`
      ).join('\n');

      const waypointsText = waypoints.length > 0 ? `Via: ${waypoints.join(', ')}\n` : '';

      const prompt = `You are a European toll road expert with precise knowledge of motorway networks.

A driver is traveling:
From: ${origin}
To: ${destination}
${waypointsText}Route summary (main roads): ${routeSummary || 'standard route'}
Total distance: ${Math.round(totalDistanceKm)} km

My GPS route analyzer confirmed these countries are on the route:
${detectedList}

YOUR TASK - HIGHWAY RATIOS ONLY:
For each of the GPS-confirmed countries above, estimate the realistic fraction of distance driven on toll motorways / vignette-required roads. Use your knowledge of the actual roads used on this specific route:
- Italy (IT): Autostrade are toll roads — typically 0.85–0.95 on routes between major cities
- France (FR): Autoroutes are toll roads — typically 0.80–0.95 on major routes
- Austria (AT): All motorways need vignette — typically 0.90–0.98 on through-routes
- Switzerland (CH): All motorways need vignette — typically 0.90–0.98
- Slovenia (SI): All motorways need vignette — typically 0.85–0.95
- Croatia (HR): Motorways are tolled — typically 0.80–0.90
- Spain (ES): Some motorways tolled — varies 0.30–0.70
- Portugal (PT): Most motorways tolled — typically 0.70–0.90
- Czech Republic (CZ), Slovakia (SK), Hungary (HU), Romania (RO), Bulgaria (BG): Vignette motorways — typically 0.75–0.90
- Germany (DE): Autobahn, no car toll — use 0.80 for highway distance (relevant for trucks)
- Poland (PL): Some toll sections — typically 0.50–0.70
- Greece (GR): Egnatia and other motorways tolled — typically 0.70–0.85
- Serbia (RS): Some toll sections — typically 0.60–0.80

CRITICAL RULES:
- Return ONLY the countries listed above — do NOT add any new countries
- Do NOT invent or guess additional countries even if you think the route might pass through them
- The GPS detection is authoritative for which countries are crossed
- highwayRatio must be between 0.0 and 1.0

Respond with ONLY valid JSON, no explanation:
{
  "countries": [
    {"countryCode": "SI", "distanceKm": 97, "highwayRatio": 0.90},
    {"countryCode": "IT", "distanceKm": 407, "highwayRatio": 0.88}
  ]
}`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openaiApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a European toll road expert. Respond only with valid JSON, no markdown or explanation." },
            { role: "user", content: prompt }
          ],
          temperature: 0.1,
          max_tokens: 600,
        }),
      });

      if (!response.ok) {
        console.error("OpenAI API error:", await response.text());
        return res.json({ enhancedCountries: null, error: "OpenAI API error" });
      }

      const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
      const content = data.choices?.[0]?.message?.content || "{}";

      let enhancedCountries = null;
      try {
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (Array.isArray(parsed.countries)) {
            enhancedCountries = parsed.countries;
          }
        }
      } catch (e) {
        console.error("Failed to parse OpenAI enhance-route response:", content, e);
      }

      return res.json({ enhancedCountries });

    } catch (error) {
      console.error("Error in enhance-route:", error);
      return res.json({ enhancedCountries: null, error: "Internal server error" });
    }
  });

  app.post("/api/route-summary", async (req, res) => {
    try {
      const { origin, destination, waypoints = [], routeSummary, totalDistanceKm, countries, specialTolls = [], tripType } = req.body;

      if (!origin || !destination || !Array.isArray(countries)) {
        return res.status(400).json({ summary: null, error: "Missing required fields" });
      }

      const openaiApiKey = process.env.OPENAI_API_KEY;
      if (!openaiApiKey) {
        return res.json({ summary: null, error: "OpenAI not configured" });
      }

      const countryLines = countries.map((c: { countryName: string; distance: number; tollSystem: string; vignetteCost: number; tollCost: number }) => {
        const parts: string[] = [`${c.countryName} (${Math.round(c.distance)} km)`];
        if (c.tollSystem === 'vignette' || c.tollSystem === 'mixed') parts.push('needs vignette');
        if (c.tollSystem === 'distance' || c.tollSystem === 'mixed') parts.push('distance-based motorway toll');
        if (c.tollSystem === 'none') parts.push('no motorway toll for cars');
        return `- ${parts.join(', ')}`;
      }).join('\n');

      const specialTollLines = specialTolls.length > 0
        ? `Special tolls (tunnels/bridges): ${specialTolls.join(', ')}`
        : '';

      const waypointsText = waypoints.length > 0 ? `Via: ${waypoints.join(' → ')}\n` : '';
      const tripTypeText = tripType === 'return' ? 'round trip' : 'one-way';

      const prompt = `Write a 2-3 sentence plain English summary for a driver about their upcoming European road trip. Be specific about the roads and motorways they will use. Mention the key toll/vignette requirements they need to prepare.

Trip details:
From: ${origin}
To: ${destination}
${waypointsText}Main roads: ${routeSummary || 'standard motorway route'}
Total distance: ${Math.round(totalDistanceKm)} km (${tripTypeText})

Countries and requirements:
${countryLines}
${specialTollLines}

Instructions:
- Start with "Your route..." 
- Mention the specific road names (e.g. A10, A22, Autostrade) if known from the route summary
- In the next sentence, list what the driver needs to pay or buy (vignettes, tolls, tunnel fees)
- Be concise and practical — this is a pre-trip checklist summary
- Do not invent road names you are not sure about; just say "via motorway" if unsure
- Write in second person ("you", "your")
- Plain text only, no markdown`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openaiApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful European road trip assistant. Write concise, accurate summaries." },
            { role: "user", content: prompt }
          ],
          temperature: 0.4,
          max_tokens: 200,
        }),
      });

      if (!response.ok) {
        console.error("OpenAI API error:", await response.text());
        return res.json({ summary: null, error: "OpenAI API error" });
      }

      const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
      const summary = data.choices?.[0]?.message?.content?.trim() || null;

      return res.json({ summary });

    } catch (error) {
      console.error("Error in route-summary:", error);
      return res.json({ summary: null, error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
