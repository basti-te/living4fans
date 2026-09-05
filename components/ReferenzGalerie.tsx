"use client";

import { useState } from "react";
import type { Referenz } from "@/lib/referenzen";

export default function ReferenzGalerie({ referenz }: { referenz: Referenz }) {
  const [index, setIndex] = useState(0);
  const bild = referenz.bilder[index];

  return (
    <div className="referenz">
      <div className="referenz-stage">
        <div className="tile-frame">
          <img
            src={bild.src}
            alt={bild.alt}
            style={{ display: "block", width: "100%", aspectRatio: "4 / 3", objectFit: "cover" }}
          />
        </div>
        <div className="referenz-thumbs">
          {referenz.bilder.map((b, i) => (
            <button
              key={b.src}
              className={`referenz-thumb ${i === index ? "is-active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Bild ${i + 1} anzeigen: ${b.alt}`}
              aria-pressed={i === index}
            >
              <img src={b.src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
      <div className="referenz-text">
        <p className="referenz-zitat">{referenz.text}</p>
        <div className="referenz-attribution">
          <span className="label">{referenz.kunde}</span>
          <span className="caption meta">{referenz.kontext}</span>
        </div>
      </div>
    </div>
  );
}
