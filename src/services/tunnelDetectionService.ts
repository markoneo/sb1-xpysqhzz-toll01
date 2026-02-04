const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

interface TunnelDetectionRequest {
  origin: string;
  destination: string;
  waypoints?: string[];
  countries?: string[];
}

interface TunnelDetectionResponse {
  tunnelIds: string[];
  error?: string;
}

export async function detectTunnelsWithAI(
  request: TunnelDetectionRequest
): Promise<string[]> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('Supabase not configured, skipping AI tunnel detection');
    return [];
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/detect-tunnels`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      console.error('AI tunnel detection failed:', response.status);
      return [];
    }

    const data: TunnelDetectionResponse = await response.json();

    if (data.error) {
      console.warn('AI tunnel detection error:', data.error);
      return [];
    }

    return data.tunnelIds || [];
  } catch (error) {
    console.error('AI tunnel detection error:', error);
    return [];
  }
}
