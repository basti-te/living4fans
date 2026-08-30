"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ShopSettings } from "@/lib/shop";

export default function EinstellungenForm({ settings }: { settings: ShopSettings }) {
  const router = useRouter();
  const [paketversand, setPaketversand] = useState(String(settings.paketversandCents / 100));
  const [lieferpauschale, setLieferpauschale] = useState(String(settings.lieferpauschaleCents / 100));
  const [radius, setRadius] = useState(String(settings.radiusKm));
  const [schwelle, setSchwelle] = useState(String(settings.grossSchwelleCents / 100));
  const [plz, setPlz] = useState(settings.plzZentrum);
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
          paketversand_cents: Math.round(parseFloat(paketversand.replace(",", ".")) * 100),
          lieferpauschale_cents: Math.round(parseFloat(lieferpauschale.replace(",", ".")) * 100),
          radius_km: Math.round(parseFloat(radius.replace(",", "."))),
          gross_schwelle_cents: Math.round(parseFloat(schwelle.replace(",", ".")) * 100),
          plz_zentrum: plz.trim(),
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

  return (
    <form className="form-grid" onSubmit={submit} style={{ maxWidth: 520 }}>
      <div className="form-field">
        <label className="label" htmlFor="ef-paket">Paketversand (klein) in €</label>
        <input id="ef-paket" value={paketversand} onChange={(e) => setPaketversand(e.target.value)} inputMode="decimal" />
      </div>
      <div className="form-field">
        <label className="label" htmlFor="ef-liefer">Lieferpauschale (mittel, im Radius) in €</label>
        <input id="ef-liefer" value={lieferpauschale} onChange={(e) => setLieferpauschale(e.target.value)} inputMode="decimal" />
      </div>
      <div className="form-field">
        <label className="label" htmlFor="ef-radius">Lieferradius in km (Luftlinie)</label>
        <input id="ef-radius" value={radius} onChange={(e) => setRadius(e.target.value)} inputMode="numeric" />
      </div>
      <div className="form-field">
        <label className="label" htmlFor="ef-schwelle">
          „Groß"-Schwelle in € (ab diesem Warenwert immer „Angebot anfragen")
        </label>
        <input id="ef-schwelle" value={schwelle} onChange={(e) => setSchwelle(e.target.value)} inputMode="decimal" />
      </div>
      <div className="form-field">
        <label className="label" htmlFor="ef-plz">PLZ des Standorts (Zentrum des Lieferradius)</label>
        <input id="ef-plz" value={plz} onChange={(e) => setPlz(e.target.value)} inputMode="numeric" maxLength={5} />
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
