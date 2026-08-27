import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SceneTile from "@/components/SceneTile";
import { getColor } from "@/lib/colors";

export const metadata: Metadata = {
  title: "Konzept",
  description:
    "Warum aufbereitete USM Haller Möbel die bessere Wahl sind: Handwerk, Nachhaltigkeit und individuelle Pulverbeschichtung bei Living4Fans.",
};

export default function KonzeptPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <span className="eyebrow">Unser Konzept</span>
          <h1 className="heading-display" style={{ maxWidth: "24ch" }}>
            Wir bauen keine Möbel. Wir geben Originalen ihr zweites Leben.
          </h1>
        </div>
      </section>

      <hr className="hairline" />

      <section className="section">
        <div className="container">
          <div className="split">
            <Reveal>
              <div className="split-label">Das System hinter dem Möbel</div>
            </Reveal>
            <Reveal delay={100}>
              <p className="body-copy">
                1963 entwickelte Fritz Haller für die Firma USM ein modulares
                Baukastensystem aus verchromten Stahlrohren, Verbindungskugeln
                und pulverbeschichteten Metallflächen. Sechzig Jahre später
                steht es in Museen — und in Millionen Büros und Wohnungen.
              </p>
              <p className="body-copy">
                Das Besondere: Jedes Element lässt sich zerstörungsfrei
                zerlegen, umbauen und neu beschichten. Ein USM Haller Möbel
                ist damit das vielleicht nachhaltigste Möbel, das je gebaut
                wurde — vorausgesetzt, jemand kümmert sich darum. Das ist
                unsere Arbeit.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "var(--gap)",
            }}
          >
            <Reveal>
              <div className="tile-frame">
                <SceneTile
                  grid={[["flap", "flap"], ["door", "door"]]}
                  color={getColor("usmgruen").hex}
                  wall="mid"
                  cellH={78}
                  scale={0.7}
                />
              </div>
              <div className="caption mt-20">Vor der Aufbereitung: Bestand aus einer Büroauflösung</div>
            </Reveal>
            <Reveal delay={100}>
              <div className="tile-frame">
                <SceneTile
                  grid={[["open", "open"], ["flap", "flap"]]}
                  color={getColor("reinorange").hex}
                  wall="light"
                  cellH={78}
                  scale={0.7}
                />
              </div>
              <div className="caption mt-20">Nach der Neubeschichtung: Reinorange nach Kundenwunsch</div>
            </Reveal>
            <Reveal delay={200}>
              <div className="tile-frame">
                <SceneTile
                  grid={[["open"], ["flap"], ["door"]]}
                  color={getColor("stahlblau").hex}
                  wall="warm"
                  cellH={88}
                  scale={0.42}
                />
              </div>
              <div className="caption mt-20">Konfiguriert: Highboard in Stahlblau</div>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      <section className="section">
        <div className="container">
          <div className="split">
            <Reveal>
              <div className="split-label">Handwerk in jeder Schicht</div>
            </Reveal>
            <Reveal delay={100}>
              <p className="body-copy">
                Pulverbeschichtung ist kein Anstrich, sondern ein technischer
                Prozess: Die alten Flächen werden chemisch entlackt,
                phosphatiert und elektrostatisch neu beschichtet, dann bei
                rund 180 °C eingebrannt. Das Ergebnis ist eine Oberfläche, die
                härter und langlebiger ist als jede Lackierung — und exakt den
                Farbton trägt, den Sie gewählt haben.
              </p>
              <p className="body-copy">
                Die Mechanik überholen wir mit Originalersatzteilen: neue
                Dämpfer für Klapptüren, neue Auszugsschienen, neue Gleiter.
                Was Sie erhalten, funktioniert wie am ersten Tag — mit der
                Patina von null und der Geschichte von Jahrzehnten.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      <section className="section">
        <div className="container">
          <div className="split">
            <Reveal>
              <div className="split-label">Warum nicht einfach neu kaufen?</div>
            </Reveal>
            <Reveal delay={100}>
              <p className="body-copy">
                Drei Gründe. Erstens: Nachhaltigkeit — ein aufbereitetes Möbel
                spart den Großteil der Ressourcen, die eine Neuproduktion
                benötigt. Zweitens: Verfügbarkeit — unsere Möbel sind in 4 bis
                6 Wochen bei Ihnen, individuell beschichtet. Drittens: Die
                Farbe. Bei uns ist die Wunschfarbe kein Aufpreis-Extra,
                sondern der Kern des Angebots — auch Farbtöne, die es ab Werk
                nie gab.
              </p>
              <div className="mt-40" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <Link href="/shop" className="btn-filled">
                  Möbel entdecken
                </Link>
                <Link href="/kontakt" className="pill">
                  Beratung anfragen
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
