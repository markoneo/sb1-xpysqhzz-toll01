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
  try {
    const response = await fetch('/api/detect-tunnels', {
      method: 'POST',
      headers: {
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
