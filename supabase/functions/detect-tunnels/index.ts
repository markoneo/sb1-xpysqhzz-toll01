import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

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

interface RequestPayload {
  origin: string;
  destination: string;
  waypoints?: string[];
  countries?: string[];
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { origin, destination, waypoints = [], countries = [] }: RequestPayload = await req.json();

    if (!origin || !destination) {
      return new Response(
        JSON.stringify({ error: "Origin and destination are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key not configured", tunnelIds: [] }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
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
      return new Response(
        JSON.stringify({ error: "OpenAI API error", tunnelIds: [] }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
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

    return new Response(
      JSON.stringify({ tunnelIds: validTunnelIds }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", tunnelIds: [] }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
