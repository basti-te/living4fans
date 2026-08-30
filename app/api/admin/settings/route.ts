import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { apiAdminAuthorized } from "@/lib/adminAuth";
import { adminClient } from "@/lib/supabase";

const KEYS = [
  "paketversand_cents",
  "lieferpauschale_cents",
  "radius_km",
  "gross_schwelle_cents",
  "plz_zentrum",
];

export async function PATCH(req: Request) {
  if (!(await apiAdminAuthorized())) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }
  const sb = adminClient();
  if (!sb) {
    return NextResponse.json({ error: "Datenbank nicht konfiguriert." }, { status: 503 });
  }
  const body = await req.json().catch(() => ({}));
  for (const key of KEYS) {
    if (body[key] === undefined) continue;
    const value =
      key === "plz_zentrum" ? String(body[key]) : Math.round(Number(body[key]));
    if (key !== "plz_zentrum" && !Number.isFinite(value as number)) {
      return NextResponse.json({ error: `Ungültiger Wert für ${key}.` }, { status: 400 });
    }
    const { error } = await sb.from("settings").upsert({ key, value });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  }
  revalidatePath("/shop");
  return NextResponse.json({ ok: true });
}
