import { NextResponse } from "next/server";
import { distanzKm, plzBekannt } from "@/lib/plz";
import { getSettings } from "@/lib/shop";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const plz = String(body.plz ?? "").trim();
  if (!/^\d{5}$/.test(plz) || !plzBekannt(plz)) {
    return NextResponse.json(
      { ok: false, error: "Bitte eine gültige deutsche Postleitzahl eingeben." },
      { status: 400 }
    );
  }
  const settings = await getSettings();
  const distanz = distanzKm(settings.plzZentrum, plz);
  if (distanz == null) {
    return NextResponse.json(
      { ok: false, error: "Postleitzahl konnte nicht geprüft werden." },
      { status: 400 }
    );
  }
  const imRadius = distanz <= settings.radiusKm;
  return NextResponse.json({
    ok: true,
    imRadius,
    distanzKm: distanz,
    radiusKm: settings.radiusKm,
    lieferpauschaleCents: settings.lieferpauschaleCents,
  });
}
