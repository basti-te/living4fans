"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ShopProduct } from "@/lib/shop";

const KATEGORIEN: { id: string; label: string }[] = [
  { id: "sideboards", label: "Sideboard" },
  { id: "highboards", label: "Highboard" },
  { id: "lowboards", label: "Lowboard" },
  { id: "regale", label: "Regal" },
  { id: "container", label: "Container" },
  { id: "tische", label: "Tisch" },
  { id: "nachttische", label: "Nachttisch" },
  { id: "servierwagen", label: "Servierwagen / Bar" },
  { id: "flur", label: "Flur / Garderobe" },
  { id: "kuechen", label: "Küche / Bad" },
  { id: "accessoires", label: "Accessoire" },
  { id: "individuell", label: "Individuell" },
];

const GROESSEN = [
  {
    id: "klein",
    label: "Klein",
    hilfe: "Paketversand (Hermes), fertig montiert, deutschlandweit — direkt bestellbar. Versand auf Kosten und Risiko des Käufers.",
  },
  {
    id: "mittel",
    label: "Mittel",
    hilfe: "Auslieferung per Anhänger im Umkreis (PLZ-Prüfung im Shop). Außerhalb des Radius: „Lieferung anfragen“.",
  },
  {
    id: "gross",
    label: "Groß",
    hilfe: "Immer „Angebot anfragen“ — Lieferung und Aufbau vor Ort in persönlicher Absprache.",
  },
];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProduktForm({ product }: { product?: ShopProduct }) {
  const router = useRouter();
  const bearbeiten = Boolean(product?.id);

  const [name, setName] = useState(product?.name ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(bearbeiten);
  const [kategorie, setKategorie] = useState(product?.category ?? "sideboards");
  const [teaser, setTeaser] = useState(product?.teaser ?? "");
  const [beschreibung, setBeschreibung] = useState(product?.description ?? "");
  const [masse, setMasse] = useState(product?.dimensions ?? "");
  const [details, setDetails] = useState((product?.details ?? []).join("\n"));
  const [preis, setPreis] = useState(
    product && !product.aufAnfrage ? String(product.price) : ""
  );
  const [groesse, setGroesse] = useState<string>(product?.groesse ?? "mittel");
  const [versandkosten, setVersandkosten] = useState(
    product?.versandkosten != null ? String(product.versandkosten / 100) : ""
  );
  const [farbwahl, setFarbwahl] = useState(product?.farbwahl ?? true);
  const [nurAnfrage, setNurAnfrage] = useState(product?.nurAnfrage ?? false);
  const [kiBilder, setKiBilder] = useState(product?.kiBilder ?? false);
  const [status, setStatus] = useState(product?.status ?? "entwurf");
  const [photos, setPhotos] = useState<string[]>(product?.photos ?? []);
  const [uploading, setUploading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    setError(null);
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? "Upload fehlgeschlagen.");
        setPhotos((prev) => [...prev, data.url]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload fehlgeschlagen.");
    } finally {
      setUploading(false);
    }
  };

  const verschiebe = (i: number, richtung: -1 | 1) => {
    setPhotos((prev) => {
      const next = [...prev];
      const j = i + richtung;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  const speichern = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const kat = KATEGORIEN.find((k) => k.id === kategorie);
    const body = {
      name,
      slug: slug || slugify(name),
      kategorie,
      kategorie_label: kat?.label ?? "Sideboard",
      teaser,
      beschreibung,
      masse,
      details: details.split("\n").map((d) => d.trim()).filter(Boolean),
      preis_cents: preis.trim() === "" ? null : Math.round(parseFloat(preis.replace(",", ".")) * 100),
      groesse,
      versandkosten_cents:
        versandkosten.trim() === ""
          ? null
          : Math.round(parseFloat(versandkosten.replace(",", ".")) * 100),
      farbwahl,
      nur_anfrage: nurAnfrage,
      ki_bilder: kiBilder,
      status,
      photos,
    };
    try {
      const res = await fetch(
        bearbeiten ? `/api/admin/products/${product!.id}` : "/api/admin/products",
        {
          method: bearbeiten ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Speichern fehlgeschlagen.");
      router.push("/admin/produkte");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Speichern fehlgeschlagen.");
      setBusy(false);
    }
  };

  const loeschen = async () => {
    if (!bearbeiten) return;
    if (!window.confirm(`„${name}" wirklich löschen? Das kann nicht rückgängig gemacht werden.`)) return;
    setBusy(true);
    const res = await fetch(`/api/admin/products/${product!.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/produkte");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Löschen fehlgeschlagen.");
      setBusy(false);
    }
  };

  return (
    <form className="form-grid" onSubmit={speichern} style={{ maxWidth: 720 }}>
      <div className="form-field">
        <label className="label" htmlFor="pf-name">Name</label>
        <input
          id="pf-name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          placeholder="z. B. USM Haller Sideboard"
          required
        />
      </div>
      <div className="form-field">
        <label className="label" htmlFor="pf-slug">URL-Slug</label>
        <input
          id="pf-slug"
          value={slug}
          onChange={(e) => {
            setSlug(slugify(e.target.value));
            setSlugTouched(true);
          }}
          placeholder="wird-automatisch-erzeugt"
        />
      </div>
      <div className="form-field">
        <label className="label" htmlFor="pf-kat">Kategorie</label>
        <select id="pf-kat" value={kategorie} onChange={(e) => setKategorie(e.target.value)}>
          {KATEGORIEN.map((k) => (
            <option key={k.id} value={k.id}>{k.label}</option>
          ))}
        </select>
      </div>
      <div className="form-field">
        <label className="label" htmlFor="pf-teaser">Teaser (eine Zeile für die Shop-Kachel)</label>
        <input id="pf-teaser" value={teaser} onChange={(e) => setTeaser(e.target.value)} />
      </div>
      <div className="form-field">
        <label className="label" htmlFor="pf-beschreibung">Beschreibung</label>
        <textarea
          id="pf-beschreibung"
          value={beschreibung}
          onChange={(e) => setBeschreibung(e.target.value)}
          rows={8}
        />
      </div>
      <div className="form-field">
        <label className="label" htmlFor="pf-masse">Maße</label>
        <input id="pf-masse" value={masse} onChange={(e) => setMasse(e.target.value)} placeholder="z. B. 77 × 79 × 27 cm (B×H×T)" />
      </div>
      <div className="form-field">
        <label className="label" htmlFor="pf-details">Details (eine Zeile pro Punkt)</label>
        <textarea id="pf-details" value={details} onChange={(e) => setDetails(e.target.value)} rows={4} />
      </div>

      <div className="form-field">
        <label className="label" htmlFor="pf-preis">Preis in € (leer = „Preis auf Anfrage")</label>
        <input id="pf-preis" value={preis} onChange={(e) => setPreis(e.target.value)} inputMode="decimal" placeholder="z. B. 1450" />
      </div>

      <div className="form-field">
        <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer" }}>
          <input type="checkbox" checked={nurAnfrage} onChange={(e) => setNurAnfrage(e.target.checked)} style={{ marginTop: 3 }} />
          <span>
            <span className="label" style={{ marginBottom: 0 }}>Nur auf Anfrage verkaufen</span>
            <br />
            <span className="caption meta" style={{ textTransform: "none", letterSpacing: 0 }}>
              Preis bleibt sichtbar, aber statt Kaufen-Button erscheint das
              Angebotsformular — für Stücke, die im persönlichen Gespräch
              verkauft werden sollen.
            </span>
          </span>
        </label>
      </div>

      <div className="form-field">
        <span className="label">Größenkategorie (Logistik)</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {GROESSEN.map((g) => (
            <label key={g.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}>
              <input
                type="radio"
                name="groesse"
                value={g.id}
                checked={groesse === g.id}
                onChange={() => setGroesse(g.id)}
                style={{ marginTop: 4 }}
              />
              <span>
                <strong>{g.label}</strong>
                <br />
                <span className="caption meta" style={{ textTransform: "none", letterSpacing: 0 }}>
                  {g.hilfe}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-field">
        <label className="label" htmlFor="pf-versand">
          {groesse === "klein" ? "Versandkosten" : "Lieferpauschale"} in € (leer = Standardwert aus „Versand & Preise")
        </label>
        <input id="pf-versand" value={versandkosten} onChange={(e) => setVersandkosten(e.target.value)} inputMode="decimal" placeholder="Standard verwenden" />
      </div>

      <div className="form-field">
        <label style={{ display: "flex", gap: 10, alignItems: "center", cursor: "pointer" }}>
          <input type="checkbox" checked={farbwahl} onChange={(e) => setFarbwahl(e.target.checked)} />
          <span className="label" style={{ marginBottom: 0 }}>Farbkonfigurator anzeigen (Wunschfarbe wählbar)</span>
        </label>
      </div>

      <div className="form-field">
        <span className="label">Fotos (erstes Foto = Shop-Kachel)</span>
        {photos.length > 0 ? (
          <div className="admin-photo-list">
            {photos.map((url, i) => (
              <div key={url} className="admin-photo">
                <img src={url} alt={`Foto ${i + 1}`} />
                <div className="admin-photo-actions">
                  <button type="button" onClick={() => verschiebe(i, -1)} aria-label="Nach vorne">←</button>
                  <button type="button" onClick={() => verschiebe(i, 1)} aria-label="Nach hinten">→</button>
                  <button type="button" onClick={() => setPhotos((p) => p.filter((_, j) => j !== i))} aria-label="Entfernen">✕</button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          multiple
          onChange={(e) => upload(e.target.files)}
          disabled={uploading}
        />
        <label style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer", marginTop: 12 }}>
          <input type="checkbox" checked={kiBilder} onChange={(e) => setKiBilder(e.target.checked)} style={{ marginTop: 3 }} />
          <span>
            <span className="label" style={{ marginBottom: 0 }}>Bilder sind KI-generiert / KI-inszeniert</span>
            <br />
            <span className="caption meta" style={{ textTransform: "none", letterSpacing: 0 }}>
              Blendet die gesetzlich vorgeschriebene Kennzeichnung (EU AI Act)
              als kleines Label in der Bildecke ein. Bei echten Fotos
              abwählen.
            </span>
          </span>
        </label>
        {uploading ? (
          <p className="caption meta" style={{ textTransform: "none", letterSpacing: 0 }}>Lädt hoch …</p>
        ) : null}
      </div>

      <div className="form-field">
        <label className="label" htmlFor="pf-status">Status</label>
        <select id="pf-status" value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
          <option value="entwurf">Entwurf (nicht im Shop sichtbar)</option>
          <option value="aktiv">Aktiv (im Shop sichtbar)</option>
          <option value="verkauft">Verkauft (nicht im Shop sichtbar)</option>
        </select>
      </div>

      {error ? (
        <p className="caption" style={{ color: "#8a2b1d", textTransform: "none", letterSpacing: 0 }} role="alert">
          {error}
        </p>
      ) : null}

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <button type="submit" className="btn-filled" disabled={busy || uploading}>
          {busy ? "Speichert …" : bearbeiten ? "Änderungen speichern" : "Möbelstück anlegen"}
        </button>
        {bearbeiten ? (
          <button type="button" className="pill" onClick={loeschen} disabled={busy}>
            Löschen
          </button>
        ) : null}
      </div>
    </form>
  );
}
