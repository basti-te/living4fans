import { NextResponse } from "next/server";
import { publicClient } from "@/lib/supabase";
import { getSettings } from "@/lib/shop";
import { sendeBenachrichtigung } from "@/lib/mail";

const TYPEN = ["anfrage", "angebot", "lieferung", "kontakt"];

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Ungültige Daten." }, { status: 400 });

  // Honeypot gegen Spambots: verstecktes Feld muss leer bleiben.
  if (body.firma) return NextResponse.json({ ok: true });

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const typ = TYPEN.includes(String(body.typ)) ? String(body.typ) : "kontakt";
  if (!name || !email.includes("@")) {
    return NextResponse.json(
      { error: "Bitte Name und gültige E-Mail-Adresse angeben." },
      { status: 400 }
    );
  }

  const sb = publicClient();
  if (!sb) {
    return NextResponse.json(
      { error: "Anfragen sind gerade nicht möglich — bitte per E-Mail an living4fans@web.de." },
      { status: 503 }
    );
  }
  const { error } = await sb.from("inquiries").insert({
    product_id: body.product_id || null,
    typ,
    name: name.slice(0, 200),
    email: email.slice(0, 320),
    telefon: String(body.telefon ?? "").slice(0, 60) || null,
    plz: String(body.plz ?? "").slice(0, 10) || null,
    wunschfarbe: String(body.wunschfarbe ?? "").slice(0, 120) || null,
    nachricht: String(body.nachricht ?? "").slice(0, 4900) || null,
  });
  if (error) {
    return NextResponse.json(
      { error: "Anfrage konnte nicht gespeichert werden — bitte per E-Mail an living4fans@web.de." },
      { status: 500 }
    );
  }

  const settings = await getSettings();
  if (settings.mailBeiAnfrage) {
    await sendeBenachrichtigung(
      settings.mailEmpfaenger,
      `Neue ${typ === "kontakt" ? "Kontaktanfrage" : "Anfrage"} über die Website — ${name}`,
      `Neue Anfrage über living4fans:\n\n` +
        `Typ: ${typ}\nName: ${name}\nE-Mail: ${email}\n` +
        `Telefon: ${body.telefon || "—"}\nPLZ: ${body.plz || "—"}\n` +
        `Wunschfarbe: ${body.wunschfarbe || "—"}\n\n` +
        `Nachricht:\n${body.nachricht || "—"}\n\n` +
        `Alle Anfragen im Admin: https://www.living4fans.com/admin/anfragen`
    );
  }
  return NextResponse.json({ ok: true });
}
