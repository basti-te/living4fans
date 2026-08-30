"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ShopSettings } from "@/lib/shop";

export default function BenachrichtigungenForm({
  settings,
  mailBereit,
}: {
  settings: ShopSettings;
  mailBereit: boolean;
}) {
  const router = useRouter();
  const [empfaenger, setEmpfaenger] = useState(settings.mailEmpfaenger);
  const [beiBestellung, setBeiBestellung] = useState(settings.mailBeiBestellung);
  const [beiAnfrage, setBeiAnfrage] = useState(settings.mailBeiAnfrage);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [testStatus, setTestStatus] = useState<string | null>(null);
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
          mail_empfaenger: empfaenger.trim(),
          mail_bei_bestellung: beiBestellung,
          mail_bei_anfrage: beiAnfrage,
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

  const testMail = async () => {
    setTestStatus("Sendet …");
    try {
      const res = await fetch("/api/admin/testmail", { method: "POST" });
      const data = await res.json();
      setTestStatus(res.ok ? `Test-Mail an ${data.an} gesendet.` : data.error ?? "Fehlgeschlagen.");
    } catch {
      setTestStatus("Fehlgeschlagen.");
    }
  };

  return (
    <form className="form-grid" onSubmit={submit} style={{ maxWidth: 560 }}>
      <div className="form-field">
        <label className="label" htmlFor="bf-empfaenger">Empfänger-Adresse</label>
        <input
          id="bf-empfaenger"
          type="email"
          value={empfaenger}
          onChange={(e) => setEmpfaenger(e.target.value)}
        />
      </div>
      <div className="form-field">
        <span className="label">Benachrichtigen bei</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <label style={{ display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }}>
            <input type="checkbox" checked={beiBestellung} onChange={(e) => setBeiBestellung(e.target.checked)} />
            <span><strong>Neuer Bestellung</strong> — Stripe-Zahlung oder Vorkasse-Bestellung</span>
          </label>
          <label style={{ display: "flex", gap: 12, alignItems: "center", cursor: "pointer" }}>
            <input type="checkbox" checked={beiAnfrage} onChange={(e) => setBeiAnfrage(e.target.checked)} />
            <span><strong>Neuer Anfrage</strong> — Produkt-, Angebots-, Liefer- und Kontaktanfragen</span>
          </label>
        </div>
      </div>

      {error ? (
        <p className="caption" style={{ color: "#8a2b1d", textTransform: "none", letterSpacing: 0 }} role="alert">{error}</p>
      ) : null}
      {saved ? (
        <p className="caption meta" style={{ textTransform: "none", letterSpacing: 0 }} role="status">Gespeichert.</p>
      ) : null}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <button type="submit" className="btn-filled" disabled={busy}>
          {busy ? "Speichert …" : "Speichern"}
        </button>
        {mailBereit ? (
          <button type="button" className="pill" onClick={testMail}>
            Test-Mail senden
          </button>
        ) : null}
        {testStatus ? (
          <span className="caption meta" style={{ textTransform: "none", letterSpacing: 0 }}>{testStatus}</span>
        ) : null}
      </div>
    </form>
  );
}
