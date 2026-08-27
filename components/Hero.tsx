"use client";

import { useState } from "react";
import FurnitureSvg from "./FurnitureSvg";
import { getColor } from "@/lib/colors";
import type { Cell } from "@/lib/products";

const HERO_GRID: Cell[][] = [
  ["open", "open", "open"],
  ["flap", "flap", "flap"],
];

const HERO_COLORS = ["enzianblau", "rubinrot", "goldgelb", "graphitschwarz"];

export default function Hero() {
  const [active, setActive] = useState(HERO_COLORS[0]);
  const color = getColor(active);

  return (
    <section className="hero" aria-label="USM Haller Sideboard in Wunschfarbe">
      <div className="hero-scene" style={{ background: "#79684f" }}>
        <div className="hero-floor" style={{ background: "#63543e" }} />
        <div className="hero-furniture">
          <FurnitureSvg grid={HERO_GRID} color={color.hex} cellW={150} cellH={74} />
          <div
            className="scene-shadow"
            style={{ background: "rgba(30, 24, 16, 0.28)" }}
          />
        </div>
      </div>
      <div className="hero-overlay">
        <div className="hero-title-block">
          <span className="eyebrow">
            Aufbereitet &amp; neu pulverbeschichtet — {color.name}
          </span>
          <h1 className="display-hero hero-title">USM Haller</h1>
        </div>
        <div className="hero-thumbs" role="group" aria-label="Farbe wählen">
          {HERO_COLORS.map((id) => {
            const c = getColor(id);
            return (
              <button
                key={id}
                className={`hero-thumb ${active === id ? "is-active" : ""}`}
                onClick={() => setActive(id)}
                aria-label={`Farbe ${c.name}`}
                aria-pressed={active === id}
              >
                <FurnitureSvg grid={[["panel"]]} color={c.hex} cellW={150} cellH={80} />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
