"use client";

import { useState } from "react";
import SceneTile from "./SceneTile";
import { USM_COLORS, getColor } from "@/lib/colors";
import { formatPrice, type Product } from "@/lib/products";

export default function ProductConfigurator({ product }: { product: Product }) {
  const [colorId, setColorId] = useState(product.defaultColor);
  const color = getColor(colorId);

  const mailSubject = encodeURIComponent(
    `Anfrage: ${product.name} in ${color.name}`
  );
  const mailBody = encodeURIComponent(
    `Guten Tag,\n\nich interessiere mich für folgendes Möbel:\n\n` +
      `Modell: ${product.name}\nMaße: ${product.dimensions}\n` +
      `Wunschfarbe: ${color.name} (${color.ral})\nPreis: ${formatPrice(product.price)}\n\n` +
      `Bitte senden Sie mir ein Angebot.\n\nMit freundlichen Grüßen`
  );

  return (
    <div className="pdp">
      <div className="pdp-stage">
        <div className="tile-frame">
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
        </div>
        <div
          className="caption meta"
          style={{ marginTop: 14, display: "flex", justifyContent: "space-between", gap: 12 }}
        >
          <span>Illustration — Konfiguration {color.name}</span>
          <span>{color.ral}</span>
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
          {formatPrice(product.price)}
          <span className="meta">
            inkl. Aufbereitung &amp; Neubeschichtung · zzgl. Versand
          </span>
        </div>

        <p className="body-copy">{product.description}</p>

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

        <table className="spec-table">
          <tbody>
            <tr>
              <td>Maße</td>
              <td className="tabular">{product.dimensions}</td>
            </tr>
            <tr>
              <td>Zustand</td>
              <td>Vollständig aufbereitet, neu pulverbeschichtet</td>
            </tr>
            <tr>
              <td>Lieferzeit</td>
              <td>4–6 Wochen ab Farbfreigabe</td>
            </tr>
            <tr>
              <td>Versand</td>
              <td>Europaweit, auf Wunsch mit Aufbau</td>
            </tr>
          </tbody>
        </table>

        <div className="pdp-actions">
          <a
            href={`mailto:info@living4fans.de?subject=${mailSubject}&body=${mailBody}`}
            className="btn-filled"
          >
            Unverbindlich anfragen
          </a>
          <a href="/kontakt" className="pill">
            Rückruf vereinbaren
          </a>
        </div>
      </div>
    </div>
  );
}
