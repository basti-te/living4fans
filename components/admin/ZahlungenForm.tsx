"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ShopSettings } from "@/lib/shop";

export default function ZahlungenForm({
  settings,
  stripeBereit,
}: {
  settings: ShopSettings;
  stripeBereit: boolean;
}) {
  const router = useRouter();
  const [stripe, setStripe] = useState(settings.zahlungStripe);
  const [vorkasse, setVorkasse] = useState(settings.zahlungVorkasse);
  const [paypal, setPaypal] = useState(settings.zahlungPaypal);
  const [kontoinhaber, setKontoinhaber] = useState(settings.bankKontoinhaber);
  const [iban, setIban] = useState(settings.bankIban);
  const [paypalEmpfaenger, setPaypalEmpfaenger] = useState(settings.paypalEmpfaenger);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zahlung_stripe: stripe,
          zahlung_vorkasse: vorkasse,
          zahlung_paypal: paypal,
          bank_kontoinhaber: kontoinhaber.trim(),
          bank_iban: iban.trim(),
          paypal_empfaenger: paypalEmpfaenger.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Speichern fehlgeschlagen.");
      setSaved(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Speichern fehlgeschlagen.");
    } finally {
      setBusy(false);
    }
  };

  const toggleStil = { display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" } as const;

  return (
    <form className="form-grid" onSubmit={submit} style={{ maxWidth: 560 }}>
      <div className="form-field">
        <span className="label">Aktive Zahlungswege im Shop</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <label style={toggleStil}>
            <input type="checkbox" checked={stripe} onChange={(e) => setStripe(e.target.checked)} style={{ marginTop: 4 }} />
            <span>
              <strong>Stripe</strong> — Kreditkarte, Apple Pay, Google Pay (Sofort-Zahlung)
              <br />
              <span className="caption meta" style={{ textTransform: "none", letterSpacing: 0 }}>
                {stripeBereit
                  ? "Stripe-Schlüssel ist hinterlegt — Zahlungen funktionieren."
                  : "Noch kein STRIPE_SECRET_KEY hinterlegt — der Kaufen-Button zeigt Kunden bis dahin einen Hinweis."}
              </span>
            </span>
          </label>
          <label style={toggleStil}>
            <input type="checkbox" checked={vorkasse} onChange={(e) => setVorkasse(e.target.checked)} style={{ marginTop: 4 }} />
            <span>
              <strong>Vorkasse per Überweisung</strong> — Kunde bestellt, erhält
              Bankverbindung + Bestellnummer, Anfertigung nach Zahlungseingang
            </span>
          </label>
          <label style={toggleStil}>
            <input type="checkbox" checked={paypal} onChange={(e) => setPaypal(e.target.checked)} style={{ marginTop: 4 }} />
            <span>
              <strong>PayPal</strong> — wird bei Vorkasse-Bestellungen als
              zusätzlicher Zahlungsweg angezeigt
            </span>
          </label>
        </div>
      </div>

      <div className="form-field">
        <label className="label" htmlFor="zf-inhaber">Kontoinhaber (für Überweisungen)</label>
        <input id="zf-inhaber" value={kontoinhaber} onChange={(e) => setKontoinhaber(e.target.value)} />
      </div>
      <div className="form-field">
        <label className="label" htmlFor="zf-iban">IBAN</label>
        <input id="zf-iban" value={iban} onChange={(e) => setIban(e.target.value)} placeholder="DE.." />
      </div>
      <div className="form-field">
        <label className="label" htmlFor="zf-paypal">PayPal-Empfänger (E-Mail)</label>
        <input id="zf-paypal" value={paypalEmpfaenger} onChange={(e) => setPaypalEmpfaenger(e.target.value)} />
      </div>

      {error ? (
        <p className="caption" style={{ color: "#8a2b1d", textTransform: "none", letterSpacing: 0 }} role="alert">{error}</p>
      ) : null}
      {saved ? (
        <p className="caption meta" style={{ textTransform: "none", letterSpacing: 0 }} role="status">Gespeichert.</p>
      ) : null}
      <div>
        <button type="submit" className="btn-filled" disabled={busy}>
          {busy ? "Speichert …" : "Speichern"}
        </button>
      </div>
    </form>
  );
}
