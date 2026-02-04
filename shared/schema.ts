export interface TunnelDetectionRequest {
  origin: string;
  destination: string;
  waypoints?: string[];
  countries?: string[];
}

export interface TunnelDetectionResponse {
  tunnelIds: string[];
  error?: string;
}
