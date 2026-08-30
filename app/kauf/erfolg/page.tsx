import Link from "next/link";
import type { Metadata } from "next";
import { getStripe } from "@/lib/stripeClient";
import { adminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bestellung eingegangen",
  robots: { index: false },
};

async function verarbeiteSession(sessionId: string): Promise<{
  ok: boolean;
  betrag?: string;
  produkt?: string;
}> {
  const stripe = getStripe();
  if (!stripe || !sessionId) return { ok: false };
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") return { ok: false };

    const sb = adminClient();
    if (sb) {
      await sb.from("orders").upsert(
        {
          stripe_session_id: session.id,
          product_id: session.metadata?.product_id || null,
          betrag_cents: session.amount_total ?? 0,
          versand_cents: 0,
          wunschfarbe: session.metadata?.farbe || null,
          kunde: {
            name: session.customer_details?.name ?? null,
            email: session.customer_details?.email ?? null,
            telefon: session.customer_details?.phone ?? null,
            adresse: session.collected_information?.shipping_details?.address ?? null,
          },
          status: "bezahlt",
        },
        { onConflict: "stripe_session_id" }
      );
    }
    return {
      ok: true,
      betrag: ((session.amount_total ?? 0) / 100).toLocaleString("de-DE", {
        style: "currency",
        currency: "EUR",
      }),
      produkt: session.metadata?.farbe
        ? `${session.metadata?.slug ?? "Möbelstück"} — ${session.metadata.farbe}`
        : undefined,
    };
  } catch {
    return { ok: false };
  }
}

export default async function KaufErfolgPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const result = await verarbeiteSession(session_id ?? "");

  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Bestellung</span>
        {result.ok ? (
          <>
            <h1 className="heading-display mb-40" style={{ maxWidth: "22ch" }}>
              Vielen Dank — Ihre Bestellung ist eingegangen.
            </h1>
            <div className="body-copy" style={{ maxWidth: "58ch" }}>
              <p>
                Ihre Zahlung {result.betrag ? `über ${result.betrag} ` : ""}wurde
                bestätigt. Ihr Möbelstück wird jetzt für Sie aufbereitet und in
                Ihrer Wunschfarbe neu pulverbeschichtet — die Anfertigung kann
                mehrere Wochen dauern, da wir Aufträge in ihrer Reihenfolge
                bearbeiten.
              </p>
              <p style={{ marginTop: "1.2em" }}>
                Sie erhalten eine Bestellbestätigung per E-Mail. Bei Fragen
                erreichen Sie uns unter{" "}
                <a href="mailto:living4fans@web.de" style={{ textDecoration: "underline" }}>
                  living4fans@web.de
                </a>{" "}
                oder telefonisch/per WhatsApp unter{" "}
                <a href="tel:+491788319818">0178 8319818</a>.
              </p>
            </div>
          </>
        ) : (
          <>
            <h1 className="heading-display mb-40" style={{ maxWidth: "22ch" }}>
              Bestellung konnte nicht bestätigt werden.
            </h1>
            <p className="body-copy" style={{ maxWidth: "58ch" }}>
              Wir konnten Ihre Zahlung nicht zuordnen. Falls Sie gerade bezahlt
              haben, melden Sie sich bitte kurz bei uns unter{" "}
              <a href="mailto:living4fans@web.de" style={{ textDecoration: "underline" }}>
                living4fans@web.de
              </a>{" "}
              — wir klären das sofort.
            </p>
          </>
        )}
        <div style={{ marginTop: 48 }}>
          <Link href="/shop" className="pill">
            Zurück zum Shop
          </Link>
        </div>
      </div>
    </section>
  );
}
