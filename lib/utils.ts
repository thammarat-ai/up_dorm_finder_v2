/**
 * Calculates the distance between two points in kilometers using the Haversine formula.
 * @param lat1 Latitude of the first point
 * @param lon1 Longitude of the first point
 * @param lat2 Latitude of the second point
 * @param lon2 Longitude of the second point
 * @returns Distance in kilometers
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const UP_MAIN_GATE = {
  lat: 19.023,
  lng: 99.897,
};

/**
 * Formats the distance to the UP Main Gate for display.
 * @param lat Latitude of the dormitory
 * @param lng Longitude of the dormitory
 * @returns Formatted string (e.g., "0.5 km from Gate")
 */
export function getDistanceFromGate(lat: number, lng: number): string {
  const distance = calculateHaversineDistance(
    lat,
    lng,
    UP_MAIN_GATE.lat,
    UP_MAIN_GATE.lng
  );
  
  if (distance < 1) {
    return `${(distance * 1000).toFixed(0)}m from Gate`;
  }
  return `${distance.toFixed(1)} km from Gate`;
}
