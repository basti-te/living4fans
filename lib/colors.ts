export type UsmColor = {
  id: string;
  name: string;
  ral: string;
  hex: string;
};

/**
 * Klassische USM-Haller-Farbwelt (Näherungswerte für die Darstellung am
 * Bildschirm) plus individuelle RAL-Beschichtung.
 */
export const USM_COLORS: UsmColor[] = [
  { id: "reinweiss", name: "Reinweiß", ral: "RAL 9010", hex: "#EDEAE0" },
  { id: "lichtgrau", name: "Lichtgrau", ral: "RAL 7035", hex: "#C3C4BC" },
  { id: "mittelgrau", name: "Mittelgrau", ral: "USM 30", hex: "#8F9491" },
  { id: "anthrazit", name: "Anthrazitgrau", ral: "RAL 7016", hex: "#464A4D" },
  { id: "graphitschwarz", name: "Graphitschwarz", ral: "USM 41", hex: "#2C2C2E" },
  { id: "goldgelb", name: "Goldgelb", ral: "RAL 1004", hex: "#E5A82E" },
  { id: "reinorange", name: "Reinorange", ral: "RAL 2004", hex: "#DE6A28" },
  { id: "rubinrot", name: "Rubinrot", ral: "USM 22", hex: "#8F2A3C" },
  { id: "usmgruen", name: "USM Grün", ral: "USM 55", hex: "#48684E" },
  { id: "enzianblau", name: "Enzianblau", ral: "RAL 5010", hex: "#2E5E9E" },
  { id: "stahlblau", name: "Stahlblau", ral: "USM 39", hex: "#46586A" },
  { id: "braun", name: "Braun", ral: "USM 12", hex: "#4C3E33" },
  { id: "beige", name: "Beige", ral: "USM 13", hex: "#CBBFA3" },
];

export function getColor(id: string): UsmColor {
  return USM_COLORS.find((c) => c.id === id) ?? USM_COLORS[9];
}

/** Mischt eine Hexfarbe mit Schwarz (t < 0) oder Weiß (t > 0). */
export function shade(hex: string, t: number): string {
  const n = hex.replace("#", "");
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  const target = t < 0 ? 0 : 255;
  const amt = Math.abs(t);
  const mix = (c: number) => Math.round(c + (target - c) * amt);
  const to = (c: number) => mix(c).toString(16).padStart(2, "0");
  return `#${to(r)}${to(g)}${to(b)}`;
}
