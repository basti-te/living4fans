import plzData from "@/data/plz.json";

const PLZ = plzData as unknown as Record<string, [number, number]>;

/** Großkreis-Distanz in km (Haversine). */
function haversineKm(a: [number, number], b: [number, number]): number {
  const R = 6371;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLon = ((b[1] - a[1]) * Math.PI) / 180;
  const la1 = (a[0] * Math.PI) / 180;
  const la2 = (b[0] * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function plzBekannt(plz: string): boolean {
  return Boolean(PLZ[plz]);
}

/**
 * Luftlinien-Distanz zwischen zwei deutschen PLZ in km.
 * null, wenn eine PLZ unbekannt ist.
 */
export function distanzKm(vonPlz: string, nachPlz: string): number | null {
  const a = PLZ[vonPlz];
  const b = PLZ[nachPlz];
  if (!a || !b) return null;
  return Math.round(haversineKm(a, b));
}
