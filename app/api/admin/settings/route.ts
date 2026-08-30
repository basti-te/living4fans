import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { apiAdminAuthorized } from "@/lib/adminAuth";
import { adminClient } from "@/lib/supabase";

const KEY_TYPES: Record<string, "number" | "string" | "boolean"> = {
  paketversand_cents: "number",
  lieferpauschale_cents: "number",
  radius_km: "number",
  gross_schwelle_cents: "number",
  plz_zentrum: "string",
  zahlung_stripe: "boolean",
  zahlung_vorkasse: "boolean",
  zahlung_paypal: "boolean",
  bank_kontoinhaber: "string",
  bank_iban: "string",
  paypal_empfaenger: "string",
  mail_empfaenger: "string",
  mail_bei_bestellung: "boolean",
  mail_bei_anfrage: "boolean",
};

export async function PATCH(req: Request) {
  if (!(await apiAdminAuthorized())) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }
  const sb = adminClient();
  if (!sb) {
    return NextResponse.json({ error: "Datenbank nicht konfiguriert." }, { status: 503 });
  }
  const body = await req.json().catch(() => ({}));
  for (const [key, typ] of Object.entries(KEY_TYPES)) {
    if (body[key] === undefined) continue;
    let value: number | string | boolean;
    if (typ === "number") {
      value = Math.round(Number(body[key]));
      if (!Number.isFinite(value)) {
        return NextResponse.json({ error: `Ungültiger Wert für ${key}.` }, { status: 400 });
      }
    } else if (typ === "boolean") {
      value = Boolean(body[key]);
    } else {
      value = String(body[key]).slice(0, 320);
    }
    const { error } = await sb.from("settings").upsert({ key, value });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  }
  revalidatePath("/shop");
  return NextResponse.json({ ok: true });
}
