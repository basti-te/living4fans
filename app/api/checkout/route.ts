import { NextResponse } from "next/server";
import { getStripe, siteUrl } from "@/lib/stripeClient";
import { getShopProduct, getSettings, istAnfrageOnly, versandCentsFuer } from "@/lib/shop";
import { distanzKm } from "@/lib/plz";
import { getColor } from "@/lib/colors";

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Online-Zahlung ist noch nicht freigeschaltet — bitte nutzen Sie die Anfrage." },
      { status: 503 }
    );
  }
  const body = await req.json().catch(() => ({}));
  const slug = String(body.slug ?? "");
  const farbeId = String(body.farbe ?? "");
  const plz = String(body.plz ?? "").trim();

  const [product, settings] = await Promise.all([getShopProduct(slug), getSettings()]);
  if (!product || !product.id) {
    return NextResponse.json({ error: "Produkt nicht gefunden." }, { status: 404 });
  }
  if (!settings.zahlungStripe) {
    return NextResponse.json(
      { error: "Kartenzahlung ist derzeit deaktiviert — bitte per Vorkasse bestellen oder anfragen." },
      { status: 503 }
    );
  }
  // Serverseitige Durchsetzung der Logistik-Matrix — unabhängig vom Client.
  if (istAnfrageOnly(product, settings)) {
    return NextResponse.json(
      { error: "Dieses Möbelstück wird per persönlichem Angebot verkauft." },
      { status: 400 }
    );
  }
  if (product.groesse === "mittel") {
    if (!/^\d{5}$/.test(plz)) {
      return NextResponse.json({ error: "Bitte zuerst die Postleitzahl prüfen." }, { status: 400 });
    }
    const distanz = distanzKm(settings.plzZentrum, plz);
    if (distanz == null || distanz > settings.radiusKm) {
      return NextResponse.json(
        { error: "Außerhalb des Liefergebiets — bitte Lieferung anfragen." },
        { status: 400 }
      );
    }
  }

  const farbe = product.farbwahl ? getColor(farbeId) : null;
  const versandCents = versandCentsFuer(product, settings);
  const preisCents = Math.round(product.price * 100);
  const base = siteUrl();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "de",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: preisCents,
          product_data: {
            name: farbe ? `${product.name} — ${farbe.name} (${farbe.ral})` : product.name,
            description: "Aufbereitetes USM Haller Original, Anfertigung nach Zahlungseingang",
          },
        },
      },
      {
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: versandCents,
          product_data: {
            name:
              product.groesse === "klein"
                ? "Paketversand (fertig montiert)"
                : "Lieferpauschale (Auslieferung durch Living4Fans)",
          },
        },
      },
    ],
    shipping_address_collection: { allowed_countries: ["DE"] },
    phone_number_collection: { enabled: true },
    metadata: {
      product_id: product.id,
      slug: product.slug,
      farbe: farbe ? `${farbe.name} (${farbe.ral})` : "ohne Farbwahl",
      groesse: product.groesse,
      plz,
    },
    success_url: `${base}/kauf/erfolg?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/shop/${product.slug}`,
  });

  return NextResponse.json({ ok: true, url: session.url });
}
