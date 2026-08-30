"use client";

import { useState } from "react";

type Props = {
  typ: "anfrage" | "angebot" | "lieferung" | "kontakt";
  productId?: string | null;
  productName?: string;
  wunschfarbe?: string;
  plz?: string;
  hinweis?: string;
  cta?: string;
};

export default function AnfrageForm({
  typ,
  productId,
  productName,
  wunschfarbe,
  plz: plzVorgabe,
  hinweis,
  cta = "Angebot anfragen",
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefon, setTelefon] = useState("");
  const [plz, setPlz] = useState(plzVorgabe ?? "");
  const [nachricht, setNachricht] = useState("");
  const [firma, setFirma] = useState(""); // Honeypot
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          typ,
          product_id: productId ?? null,
          name,
          email,
          telefon,
          plz,
          wunschfarbe,
          nachricht: productName ? `[${productName}] ${nachricht}` : nachricht,
          firma,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Fehler beim Senden.");
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler beim Senden.");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <p className="body-copy" role="status">
        Vielen Dank — Ihre Anfrage ist bei uns eingegangen. Wir melden uns in
        der Regel innerhalb eines Werktags.
      </p>
    );
  }

  return (
    <form className="form-grid" onSubmit={submit}>
      {hinweis ? (
        <p className="caption meta" style={{ textTransform: "none", letterSpacing: 0, fontSize: 14, lineHeight: 1.5, maxWidth: "48ch" }}>
          {hinweis}
        </p>
      ) : null}
      <div className="form-field">
        <label className="label" htmlFor={`af-name-${typ}`}>Name</label>
        <input id={`af-name-${typ}`} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ihr Name" required />
      </div>
      <div className="form-field">
        <label className="label" htmlFor={`af-email-${typ}`}>E-Mail</label>
        <input id={`af-email-${typ}`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ihre@adresse.de" required />
      </div>
      <div className="form-field">
        <label className="label" htmlFor={`af-tel-${typ}`}>Telefon (optional)</label>
        <input id={`af-tel-${typ}`} value={telefon} onChange={(e) => setTelefon(e.target.value)} placeholder="Für schnelle Rückfragen" />
      </div>
      <div className="form-field">
        <label className="label" htmlFor={`af-plz-${typ}`}>Postleitzahl (optional)</label>
        <input id={`af-plz-${typ}`} value={plz} onChange={(e) => setPlz(e.target.value)} placeholder="Für Liefer- und Montageplanung" inputMode="numeric" />
      </div>
      <div className="form-field">
        <label className="label" htmlFor={`af-msg-${typ}`}>Ihre Wünsche</label>
        <textarea
          id={`af-msg-${typ}`}
          value={nachricht}
          onChange={(e) => setNachricht(e.target.value)}
          placeholder="Wunschfarbe, Maße, Konfiguration, Fragen zu Lieferung und Montage …"
          required
        />
      </div>
      {/* Honeypot — bleibt für Menschen unsichtbar */}
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
      <div>
        <button type="submit" className="btn-filled" disabled={busy}>
          {busy ? "Wird gesendet …" : cta}
        </button>
      </div>
    </form>
  );
}
