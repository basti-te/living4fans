"use client";

import { useState } from "react";
import { formatCents } from "@/lib/shop";

type Ergebnis = {
  bestellnr: string;
  betragCents: number;
  zahlungswege: {
    ueberweisung: { kontoinhaber: string; iban: string } | null;
    paypal: string | null;
  };
};

export default function VorkasseKauf({
  slug,
  farbe,
  plz,
  betragCents,
}: {
  slug: string;
  farbe: string;
  plz?: string;
  betragCents: number;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [strasse, setStrasse] = useState("");
  const [kundenPlz, setKundenPlz] = useState(plz ?? "");
  const [ort, setOrt] = useState("");
  const [firma, setFirma] = useState(""); // Honeypot
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ergebnis, setErgebnis] = useState<Ergebnis | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/vorkasse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          farbe,
          plz,
          name,
          email,
          telefon,
          strasse,
          kundenPlz,
          ort,
          firma,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Bestellung fehlgeschlagen.");
      setErgebnis(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bestellung fehlgeschlagen.");
    } finally {
      setBusy(false);
    }
  };

  if (ergebnis) {
    return (
      <div className="vorkasse-bestaetigung" role="status" style={{ flexBasis: "100%" }}>
        <span className="label" style={{ display: "block", marginBottom: 14 }}>
          Bestellung {ergebnis.bestellnr} — eingegangen
        </span>
        <p className="body-copy" style={{ fontSize: 16 }}>
          Vielen Dank! Bitte überweisen Sie{" "}
          <strong className="tabular">{formatCents(ergebnis.betragCents)}</strong>{" "}
          mit dem Verwendungszweck{" "}
          <strong>{ergebnis.bestellnr}</strong>. Die Anfertigung Ihres
          Möbelstücks beginnt nach Zahlungseingang. Sie erhalten außerdem eine
          Bestätigung per E-Mail.
        </p>
        <table className="spec-table" style={{ marginTop: 18 }}>
          <tbody>
            {ergebnis.zahlungswege.ueberweisung ? (
              <>
                <tr>
                  <td>Kontoinhaber</td>
                  <td>{ergebnis.zahlungswege.ueberweisung.kontoinhaber}</td>
                </tr>
                <tr>
                  <td>IBAN</td>
                  <td className="tabular">{ergebnis.zahlungswege.ueberweisung.iban}</td>
                </tr>
              </>
            ) : null}
            {ergebnis.zahlungswege.paypal ? (
              <tr>
                <td>PayPal</td>
                <td>{ergebnis.zahlungswege.paypal}</td>
              </tr>
            ) : null}
            <tr>
              <td>Verwendungszweck</td>
              <td className="tabular">{ergebnis.bestellnr}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (!open) {
    return (
      <button className="pill" type="button" onClick={() => setOpen(true)}>
        Per Überweisung / PayPal bestellen
      </button>
    );
  }

  return (
    <form className="form-grid" onSubmit={submit} style={{ marginTop: 8, flexBasis: "100%" }}>
      <p className="caption meta" style={{ textTransform: "none", letterSpacing: 0, fontSize: 14, lineHeight: 1.5, maxWidth: "48ch" }}>
        Bestellung auf Vorkasse: Sie erhalten unsere Bankverbindung (und
        PayPal) mit Bestellnummer — die Anfertigung startet nach
        Zahlungseingang.
      </p>
      <div className="form-field">
        <label className="label" htmlFor="vk-name">Name</label>
        <input id="vk-name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="form-field">
        <label className="label" htmlFor="vk-email">E-Mail</label>
        <input id="vk-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-field">
        <label className="label" htmlFor="vk-telefon">Telefon (optional)</label>
        <input id="vk-telefon" value={telefon} onChange={(e) => setTelefon(e.target.value)} />
      </div>
      <div className="form-field">
        <label className="label" htmlFor="vk-strasse">Straße und Hausnummer</label>
        <input id="vk-strasse" value={strasse} onChange={(e) => setStrasse(e.target.value)} required />
      </div>
      <div className="form-field" style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 12 }}>
        <div>
          <label className="label" htmlFor="vk-plz" style={{ display: "block", marginBottom: 10 }}>PLZ</label>
          <input id="vk-plz" value={kundenPlz} onChange={(e) => setKundenPlz(e.target.value)} inputMode="numeric" maxLength={5} required style={{ width: "100%" }} />
        </div>
        <div>
          <label className="label" htmlFor="vk-ort" style={{ display: "block", marginBottom: 10 }}>Ort</label>
          <input id="vk-ort" value={ort} onChange={(e) => setOrt(e.target.value)} required style={{ width: "100%" }} />
        </div>
      </div>
      <input
        type="text"
        value={firma}
        onChange={(e) => setFirma(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", height: 0, width: 0, opacity: 0 }}
      />
      {error ? (
        <p className="caption" style={{ color: "#8a2b1d", textTransform: "none", letterSpacing: 0 }} role="alert">
          {error}
        </p>
      ) : null}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button type="submit" className="btn-filled" disabled={busy}>
          {busy ? "Wird gesendet …" : `Zahlungspflichtig bestellen — ${formatCents(betragCents)}`}
        </button>
        <button type="button" className="pill" onClick={() => setOpen(false)}>
          Abbrechen
        </button>
      </div>
    </form>
  );
}
