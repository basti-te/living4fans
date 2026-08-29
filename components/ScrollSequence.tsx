"use client";

import { useEffect, useRef, useState } from "react";

type Phase = {
  image: string;
  label: string;
  text: string;
};

const BEATS: { label: string; text: string; frames: number }[] = [
  {
    label: "Das Original",
    text: "Ein aufbereitetes Möbelstück — doch wie kommt es dazu?",
    frames: 1,
  },
  {
    label: "Die Demontage",
    text: "Unsere Monteure zerlegen das Möbelstück Tablar für Tablar.",
    frames: 4,
  },
  {
    label: "Die Einzelteile",
    text: "Rohre, Kugeln, Tablare — vollständig zerlegt, gereinigt und neu beschichtet.",
    frames: 3,
  },
  {
    label: "Der Wiederaufbau",
    text: "Frisch pulverbeschichtet wächst alles wieder zusammen.",
    frames: 5,
  },
  {
    label: "Das Original",
    text: "Fertig montiert und geprüft — bereit für sein zweites Leben.",
    frames: 2,
  },
];

const PHASES: Phase[] = BEATS.flatMap((beat, b) =>
  Array.from({ length: beat.frames }, () => ({
    image: "",
    label: beat.label,
    text: beat.text,
  }))
).map((p, i) => ({
  ...p,
  image: `/media/film-${String(i + 1).padStart(2, "0")}.jpg`,
}));

export default function ScrollSequence() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) return;

    PHASES.forEach((p) => {
      const img = new Image();
      img.src = p.image;
    });

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        if (total <= 0) return;
        const progress = Math.min(1, Math.max(0, -rect.top / total));
        const i = Math.min(
          PHASES.length - 1,
          Math.floor(progress * PHASES.length)
        );
        setIndex(i);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const shown = reduced ? PHASES.length - 1 : index;
  const phase = PHASES[shown];

  return (
    <div
      ref={wrapRef}
      className="seq-wrap"
      style={reduced ? undefined : { height: `${100 + PHASES.length * 5}vh` }}
      aria-label="Die Aufbereitung eines USM Haller Möbelstücks, Schritt für Schritt"
    >
      <div className={reduced ? "seq-sticky seq-static" : "seq-sticky"}>
        <div className="seq-stage">
          {PHASES.map((p, i) => (
            <img
              key={p.image}
              src={p.image}
              alt={i === shown ? `${p.label}: ${p.text}` : ""}
              className={i === shown ? "is-shown" : ""}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>
        <div className="seq-caption">
          <span className="label tabular">
            {String(shown + 1).padStart(2, "0")} — {phase.label}
          </span>
          <p>{phase.text}</p>
        </div>
      </div>
    </div>
  );
}
