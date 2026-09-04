"use client";

import { useState } from "react";
import SceneTile from "./SceneTile";
import AnfrageForm from "./AnfrageForm";
import VorkasseKauf from "./VorkasseKauf";
import { USM_COLORS, getColor } from "@/lib/colors";
import { formatPrice } from "@/lib/products";
import {
  istAnfrageOnly,
  versandCentsFuer,
  formatCents,
  type ShopProduct,
  type ShopSettings,
} from "@/lib/shop";

type PlzErgebnis = {
  imRadius: boolean;
  distanzKm: number;
  radiusKm: number;
  lieferpauschaleCents: number;
} | null;

export default function ProductConfigurator({
  product,
  settings,
}: {
  product: ShopProduct;
  settings: ShopSettings;
}) {
  const [colorId, setColorId] = useState(product.defaultColor);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [plz, setPlz] = useState("");
  const [plzErgebnis, setPlzErgebnis] = useState<PlzErgebnis>(null);
  const [plzError, setPlzError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [kaufError, setKaufError] = useState<string | null>(null);

  const color = getColor(colorId);
  const anfrageOnly = istAnfrageOnly(product, settings);
  const versandCents = versandCentsFuer(product, settings);
  const hatFotos = product.photos.length > 0;
  const hatRender = product.grid.length > 0;
  const stripeAktiv = settings.zahlungStripe;
  const vorkasseAktiv = settings.zahlungVorkasse || settings.zahlungPaypal;
  const gesamtCents = Math.round(product.price * 100) + versandCents;
  const grossAnfrage =
    product.groesse === "gross" ||
    Math.round(product.price * 100) >= settings.grossSchwelleCents;

  const pruefePlz = async () => {
    setPlzError(null);
    setPlzErgebnis(null);
    try {
      const res = await fetch("/api/plz-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plz }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Prüfung fehlgeschlagen.");
      setPlzErgebnis(data);
    } catch (err) {
      setPlzError(err instanceof Error ? err.message : "Prüfung fehlgeschlagen.");
    }
  };

  const kaufen = async () => {
    setBusy(true);
    setKaufError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: product.slug, farbe: colorId, plz }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout nicht möglich.");
      window.location.href = data.url;
    } catch (err) {
      setKaufError(err instanceof Error ? err.message : "Checkout nicht möglich.");
      setBusy(false);
    }
  };

  const versandZeile =
    product.groesse === "klein"
      ? "Paketversand fertig montiert (Hermes), deutschlandweit — auf Kosten und Risiko des Käufers"
      : product.groesse === "mittel"
        ? `Auslieferung durch Living4Fans im Umkreis von ${settings.radiusKm} km ab Steinfeld — darüber hinaus auf Anfrage`
        : "Lieferung und Aufbau vor Ort durch Living4Fans — Termin nach persönlicher Absprache";

  return (
    <div className="pdp">
      <div className="pdp-stage">
        <div className="tile-frame">
          {hatFotos ? (
            <div className="media-tile" style={{ aspectRatio: "4 / 3" }}>
              <img
                src={product.photos[photoIndex]}
                alt={`${product.name} — Foto ${photoIndex + 1}`}
              />
            </div>
          ) : hatRender ? (
            <SceneTile
              grid={product.grid}
              color={color.hex}
              wall={product.wall}
              cellW={product.cellW}
              cellH={product.cellH}
              casters={product.slug === "haller-rollcontainer"}
              scale={product.grid[0].length >= 4 ? 0.86 : product.grid[0].length >= 3 ? 0.8 : 0.52}
              aspect="4 / 3"
            />
          ) : (
            <div className="media-tile" style={{ aspectRatio: "4 / 3", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="label meta">Fotos folgen</span>
            </div>
          )}
        </div>
        {hatFotos && product.photos.length > 1 ? (
          <div className="pdp-thumbs">
            {product.photos.map((url, i) => (
              <button
                key={url}
                className={`pdp-thumb ${i === photoIndex ? "is-active" : ""}`}
                onClick={() => setPhotoIndex(i)}
                aria-label={`Foto ${i + 1} anzeigen`}
              >
                <img src={url} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        ) : null}
        <div
          className="caption meta"
          style={{ marginTop: 14, display: "flex", justifyContent: "space-between", gap: 12 }}
        >
          <span>
            {hatFotos ? "Basisvariante — Beispielfotos" : `Illustration — Konfiguration ${color.name}`}
          </span>
          {product.farbwahl ? <span>{color.ral}</span> : null}
        </div>
      </div>

      <div className="pdp-info">
        <div>
          <span className="eyebrow" style={{ marginBottom: 12 }}>
            {product.categoryLabel} · Aufbereitet
          </span>
          <h1 className="heading-lg">{product.name}</h1>
        </div>

        <div className="pdp-price tabular">
          {product.aufAnfrage ? "Preis auf Anfrage" : formatPrice(product.price)}
          <span className="meta">
            {product.aufAnfrage
              ? "je nach Konfiguration — inkl. MwSt., mit Rechnung"
              : grossAnfrage
                ? "inkl. MwSt., mit Rechnung — Lieferung & Aufbau nach Absprache"
                : anfrageOnly
                  ? "inkl. MwSt., mit Rechnung — Verkauf auf Anfrage"
                  : `inkl. MwSt., mit Rechnung — zzgl. ${formatCents(versandCents)} ${product.groesse === "klein" ? "Paketversand" : "Lieferpauschale"}`}
          </span>
        </div>

        <p className="body-copy">{product.description}</p>

        {product.farbwahl ? (
          <div>
            <span className="label" style={{ display: "block", marginBottom: 14 }}>
              Wunschfarbe — {color.name} ({color.ral})
            </span>
            <div className="config-swatches">
              {USM_COLORS.map((c) => (
                <button
                  key={c.id}
                  className={`config-swatch ${colorId === c.id ? "is-active" : ""}`}
                  style={{ background: c.hex }}
                  onClick={() => setColorId(c.id)}
                  aria-label={`${c.name} (${c.ral})`}
                  aria-pressed={colorId === c.id}
                  title={`${c.name} · ${c.ral}`}
                />
              ))}
            </div>
            <p className="caption meta" style={{ marginTop: 14, maxWidth: "44ch", textTransform: "none", letterSpacing: 0, fontSize: 14, lineHeight: 1.5 }}>
              Ihre Farbe ist nicht dabei? Wir beschichten in jeder RAL-Farbe —
              nennen Sie uns einfach den Farbton in Ihrer Anfrage.
            </p>
          </div>
        ) : null}

        <table className="spec-table">
          <tbody>
            {product.dimensions ? (
              <tr>
                <td>Maße</td>
                <td className="tabular">{product.dimensions}</td>
              </tr>
            ) : null}
            <tr>
              <td>Zustand</td>
              <td>Preloved, vollständig aufbereitet, neu pulverbeschichtet</td>
            </tr>
            <tr>
              <td>Anfertigung</td>
              <td>Nach Bestellung und Zahlungseingang — mehrere Wochen, in Auftragsreihenfolge</td>
            </tr>
            <tr>
              <td>Versand</td>
              <td>{versandZeile}</td>
            </tr>
          </tbody>
        </table>

        {anfrageOnly ? (
          <div>
            <span className="label" style={{ display: "block", marginBottom: 14 }}>
              Persönliches Angebot
            </span>
            <AnfrageForm
              typ="angebot"
              productId={product.id}
              productName={product.name}
              wunschfarbe={product.farbwahl ? `${color.name} (${color.ral})` : undefined}
              hinweis={
                product.groesse === "gross" || Math.round(product.price * 100) >= settings.grossSchwelleCents
                  ? "Dieses Möbelstück liefern wir selbst aus und montieren es bei Ihnen vor Ort. Liefertermin, Aufbau und Konfiguration stimmen wir persönlich mit Ihnen ab."
                  : "Farbe, Maße und Ausstattung besprechen wir persönlich — Sie erhalten ein verbindliches Angebot."
              }
            />
          </div>
        ) : product.groesse === "mittel" ? (
          <div>
            <span className="label" style={{ display: "block", marginBottom: 14 }}>
              Liefergebiet prüfen
            </span>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <input
                value={plz}
                onChange={(e) => {
                  setPlz(e.target.value);
                  setPlzErgebnis(null);
                }}
                placeholder="Ihre Postleitzahl"
                inputMode="numeric"
                maxLength={5}
                style={{ maxWidth: 180 }}
                aria-label="Postleitzahl"
              />
              <button className="pill" onClick={pruefePlz} type="button">
                Prüfen
              </button>
            </div>
            {plzError ? (
              <p className="caption" style={{ marginTop: 12, color: "#8a2b1d", textTransform: "none", letterSpacing: 0 }}>
                {plzError}
              </p>
            ) : null}
            {plzErgebnis?.imRadius ? (
              <div style={{ marginTop: 18 }}>
                <p className="caption meta" style={{ textTransform: "none", letterSpacing: 0, fontSize: 14, lineHeight: 1.5 }}>
                  Wir liefern zu Ihnen ({plzErgebnis.distanzKm} km) — Lieferpauschale{" "}
                  {formatCents(versandCents)}.
                </p>
                <div className="pdp-actions" style={{ marginTop: 16 }}>
                  {stripeAktiv ? (
                    <button className="btn-filled" onClick={kaufen} disabled={busy}>
                      {busy ? "Einen Moment …" : `Jetzt kaufen — ${formatPrice(product.price + versandCents / 100)}`}
                    </button>
                  ) : null}
                  {vorkasseAktiv ? (
                    <VorkasseKauf slug={product.slug} farbe={colorId} plz={plz} betragCents={gesamtCents} />
                  ) : null}
                </div>
                {kaufError ? (
                  <p className="caption" style={{ marginTop: 12, color: "#8a2b1d", textTransform: "none", letterSpacing: 0 }} role="alert">
                    {kaufError}
                  </p>
                ) : null}
              </div>
            ) : plzErgebnis ? (
              <div style={{ marginTop: 18 }}>
                <AnfrageForm
                  typ="lieferung"
                  productId={product.id}
                  productName={product.name}
                  wunschfarbe={product.farbwahl ? `${color.name} (${color.ral})` : undefined}
                  plz={plz}
                  hinweis={`Ihre PLZ liegt ${plzErgebnis.distanzKm} km entfernt — außerhalb unseres Standard-Liefergebiets von ${plzErgebnis.radiusKm} km. Fragen Sie die Lieferung an, wir machen Ihnen ein faires Angebot.`}
                  cta="Lieferung anfragen"
                />
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            <div className="pdp-actions">
              {stripeAktiv ? (
                <button className="btn-filled" onClick={kaufen} disabled={busy}>
                  {busy ? "Einen Moment …" : `Jetzt kaufen — ${formatPrice(product.price + versandCents / 100)}`}
                </button>
              ) : null}
              {vorkasseAktiv ? (
                <VorkasseKauf slug={product.slug} farbe={colorId} betragCents={gesamtCents} />
              ) : null}
              <a href="/kontakt" className="pill">
                Frage stellen
              </a>
            </div>
            <p className="caption meta" style={{ marginTop: 14, maxWidth: "48ch", textTransform: "none", letterSpacing: 0, fontSize: 13, lineHeight: 1.5 }}>
              Versand fertig montiert per Paketdienst innerhalb Deutschlands,
              auf Kosten und Risiko des Käufers. Besichtigung und Abholung in
              Steinfeld (Oldb.) sind ebenfalls möglich.
            </p>
            {kaufError ? (
              <p className="caption" style={{ marginTop: 12, color: "#8a2b1d", textTransform: "none", letterSpacing: 0 }} role="alert">
                {kaufError}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
