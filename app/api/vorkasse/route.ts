import { NextResponse } from "next/server";
import { adminClient } from "@/lib/supabase";
import { getShopProduct, getSettings, istAnfrageOnly, versandCentsFuer, formatCents } from "@/lib/shop";
import { distanzKm } from "@/lib/plz";
import { getColor } from "@/lib/colors";
import { sendeBenachrichtigung } from "@/lib/mail";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  if (body.firma) return NextResponse.json({ ok: true }); // Honeypot

  const slug = String(body.slug ?? "");
  const farbeId = String(body.farbe ?? "");
  const plz = String(body.plz ?? "").trim();
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();

  if (!name || !email.includes("@")) {
    return NextResponse.json(
      { error: "Bitte Name und gültige E-Mail-Adresse angeben." },
      { status: 400 }
    );
  }

  const [product, settings] = await Promise.all([getShopProduct(slug), getSettings()]);
  if (!product || !product.id) {
    return NextResponse.json({ error: "Produkt nicht gefunden." }, { status: 404 });
  }
  if (!settings.zahlungVorkasse && !settings.zahlungPaypal) {
    return NextResponse.json({ error: "Vorkasse ist derzeit nicht verfügbar." }, { status: 400 });
  }
  // Gleiche Logistik-Matrix wie beim Stripe-Checkout — serverseitig durchgesetzt.
  if (istAnfrageOnly(product, settings)) {
    return NextResponse.json(
      { error: "Dieses Möbelstück wird per persönlichem Angebot verkauft." },
      { status: 400 }
    );
  }
  if (product.groesse === "mittel") {
    const distanz = /^\d{5}$/.test(plz) ? distanzKm(settings.plzZentrum, plz) : null;
    if (distanz == null || distanz > settings.radiusKm) {
      return NextResponse.json(
        { error: "Außerhalb des Liefergebiets — bitte Lieferung anfragen." },
        { status: 400 }
      );
    }
  }

  const sb = adminClient();
  if (!sb) {
    return NextResponse.json(
      { error: "Bestellungen sind gerade nicht möglich — bitte per Anfrage." },
      { status: 503 }
    );
  }

  const farbe = product.farbwahl ? getColor(farbeId) : null;
  const versandCents = versandCentsFuer(product, settings);
  const betragCents = Math.round(product.price * 100) + versandCents;

  const { data, error } = await sb
    .from("orders")
    .insert({
      product_id: product.id,
      zahlungsart: "vorkasse",
      status: "offen",
      betrag_cents: betragCents,
      versand_cents: versandCents,
      wunschfarbe: farbe ? `${farbe.name} (${farbe.ral})` : null,
      kunde: {
        name: name.slice(0, 200),
        email: email.slice(0, 320),
        telefon: String(body.telefon ?? "").slice(0, 60) || null,
        adresse: {
          line1: String(body.strasse ?? "").slice(0, 200) || null,
          postal_code: plz || String(body.kundenPlz ?? "").slice(0, 10) || null,
          city: String(body.ort ?? "").slice(0, 120) || null,
        },
      },
    })
    .select("bestellnr")
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Bestellung konnte nicht gespeichert werden — bitte kontaktieren Sie uns." },
      { status: 500 }
    );
  }

  if (settings.mailBeiBestellung) {
    await sendeBenachrichtigung(
      settings.mailEmpfaenger,
      `Neue Vorkasse-Bestellung ${data.bestellnr} — ${product.name}`,
      `Neue Bestellung per Vorkasse über die Website:\n\n` +
        `Bestellnummer: ${data.bestellnr}\n` +
        `Möbelstück: ${product.name}\n` +
        `Wunschfarbe: ${farbe ? `${farbe.name} (${farbe.ral})` : "—"}\n` +
        `Betrag: ${formatCents(betragCents)} (davon Versand ${formatCents(versandCents)})\n\n` +
        `Kunde: ${name}\nE-Mail: ${email}\nTelefon: ${body.telefon ?? "—"}\n\n` +
        `Status: offen — Anfertigung startet nach Zahlungseingang.\n` +
        `Details im Admin: https://living4fans.vercel.app/admin/bestellungen`
    );
  }

  return NextResponse.json({
    ok: true,
    bestellnr: data.bestellnr,
    betragCents,
    zahlungswege: {
      ueberweisung: settings.zahlungVorkasse
        ? { kontoinhaber: settings.bankKontoinhaber, iban: settings.bankIban }
        : null,
      paypal: settings.zahlungPaypal ? settings.paypalEmpfaenger : null,
    },
  });
}
