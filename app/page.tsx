import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SceneTile from "@/components/SceneTile";
import ProductCard from "@/components/ProductCard";
import { USM_COLORS, getColor } from "@/lib/colors";
import { PRODUCTS, type Cell } from "@/lib/products";

const CATEGORY_TILES: {
  label: string;
  count: string;
  href: string;
  grid: Cell[][];
  color: string;
  wall: "light" | "mid" | "warm";
  cellH: number;
  scale: number;
}[] = [
  {
    label: "Sideboards",
    count: "ab 2.490 €",
    href: "/shop?kategorie=sideboards",
    grid: [
      ["open", "open"],
      ["flap", "flap"],
    ],
    color: "enzianblau",
    wall: "light",
    cellH: 80,
    scale: 0.72,
  },
  {
    label: "Highboards",
    count: "ab 1.590 €",
    href: "/shop?kategorie=highboards",
    grid: [["open"], ["flap"], ["door"]],
    color: "rubinrot",
    wall: "mid",
    cellH: 90,
    scale: 0.42,
  },
  {
    label: "Container",
    count: "ab 990 €",
    href: "/shop?kategorie=container",
    grid: [["drawer"], ["drawer"], ["drawers"]],
    color: "goldgelb",
    wall: "warm",
    cellH: 70,
    scale: 0.42,
  },
  {
    label: "Regale",
    count: "ab 1.990 €",
    href: "/shop?kategorie=regale",
    grid: [
      ["open", "open"],
      ["open", "open"],
      ["open", "open"],
    ],
    color: "reinweiss",
    wall: "light",
    cellH: 74,
    scale: 0.68,
  },
];

const PROCESS = [
  {
    num: "01",
    title: "Ankauf & Demontage",
    text: "Wir kaufen gebrauchte USM Haller Möbel aus Büroauflösungen und Privathaushalten an. Jedes Möbel wird vollständig in seine Einzelteile zerlegt — bis zur letzten Kugel.",
  },
  {
    num: "02",
    title: "Aufbereitung",
    text: "Chromrohre und Verbindungskugeln werden gereinigt, poliert oder ersetzt. Verschlissene Mechanik — Scharniere, Dämpfer, Auszüge — wird durch Neuteile ersetzt.",
  },
  {
    num: "03",
    title: "Pulverbeschichtung",
    text: "Alle Metallflächen werden entlackt, grundiert und neu pulverbeschichtet: in einer der klassischen USM-Farben oder in Ihrer individuellen RAL-Wunschfarbe.",
  },
  {
    num: "04",
    title: "Montage & Versand",
    text: "Nach der Endmontage prüfen wir jede Funktion. Anschließend liefern wir europaweit — auf Wunsch mit Aufbau und Ausrichtung vor Ort.",
  },
];

export default function Home() {
  const featured = [
    PRODUCTS[0],
    PRODUCTS[2],
    PRODUCTS[3],
  ];

  return (
    <>
      <Hero />

      {/* Versprechen */}
      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Unser Versprechen</span>
            <h2 className="heading-display">
              Jedes Möbel ein Original. Aufbereitet in Handarbeit. Neu
              beschichtet in Ihrer Wunschfarbe.
            </h2>
          </Reveal>
        </div>
      </section>

      <hr className="hairline" />

      {/* Kategorien */}
      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Unsere Kategorien</span>
          </Reveal>
          <div className="category-grid mt-20">
            {CATEGORY_TILES.map((tile, i) => (
              <Reveal key={tile.label} delay={i * 90}>
                <Link href={tile.href} className="category-card">
                  <div className="tile-frame">
                    <SceneTile
                      grid={tile.grid}
                      color={getColor(tile.color).hex}
                      wall={tile.wall}
                      cellH={tile.cellH}
                      scale={tile.scale}
                      casters={tile.label === "Container"}
                    />
                  </div>
                  <div className="caption">
                    <span>{tile.label}</span>
                    <span className="meta">{tile.count}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Editorial Split */}
      <section className="section">
        <div className="container">
          <div className="split">
            <Reveal>
              <div className="split-label">
                Qualität &amp; Nachhaltigkeit statt Neukauf
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="body-copy">
                Ein USM Haller Möbel ist auf Jahrzehnte gebaut. Das verchromte
                Stahlrohrgestell überdauert Moden, Umzüge und Generationen —
                nur die Oberflächen tragen die Spuren der Zeit. Genau dort
                setzen wir an: Statt neu zu produzieren, geben wir originalen
                Möbeln ein zweites Leben.
              </p>
              <p className="body-copy">
                Jedes Stück wird vollständig zerlegt, technisch überholt und
                neu pulverbeschichtet. Das Ergebnis ist von einem Neumöbel
                praktisch nicht zu unterscheiden — nur nachhaltiger, schneller
                lieferbar und in jeder Farbe erhältlich, die Sie sich wünschen.
              </p>
              <div className="mt-40">
                <Link href="/konzept" className="text-link">
                  Unser Konzept im Detail →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Farben */}
      <section className="section" id="farben">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Ihre Wunschfarbe</span>
            <h2 className="heading-display" style={{ maxWidth: "20ch" }}>
              14 Klassiker. Und jede RAL-Farbe dazwischen.
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="body-copy mt-40">
              Die klassische USM-Farbwelt ist der Ausgangspunkt — nicht die
              Grenze. In unserer Pulverbeschichtung realisieren wir jede
              RAL-Farbe: vom zurückhaltenden Kieselgrau bis zum leuchtenden
              Verkehrsrot. Matt, seidenmatt oder feinstrukturiert.
            </p>
          </Reveal>
          <div className="swatch-grid mt-68">
            {USM_COLORS.map((c, i) => (
              <Reveal key={c.id} delay={(i % 5) * 60}>
                <div className="swatch">
                  <div className="swatch-chip" style={{ background: c.hex }} />
                  <div className="label">
                    <span>{c.name}</span>
                    <span className="meta">{c.ral}</span>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={180}>
              <div className="swatch">
                <div
                  className="swatch-chip"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span className="label" style={{ textAlign: "center" }}>
                    Ihre<br />RAL-Farbe
                  </span>
                </div>
                <div className="label">
                  <span>Wunschfarbe</span>
                  <span className="meta">RAL Classic</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Prozess */}
      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Der Weg zum Möbel</span>
            <h2 className="heading-display mb-68" style={{ maxWidth: "18ch" }}>
              Vier Schritte zur Neuauflage
            </h2>
          </Reveal>
          <div className="process-list">
            {PROCESS.map((step, i) => (
              <Reveal key={step.num} delay={i * 80}>
                <div className="process-row">
                  <div className="process-num tabular">{step.num}</div>
                  <div className="process-title">{step.title}</div>
                  <p className="body-copy" style={{ fontSize: 17 }}>
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Ausgewählte Möbel */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                flexWrap: "wrap",
                gap: 20,
              }}
              className="mb-68"
            >
              <div>
                <span className="eyebrow">Aktuell im Atelier</span>
                <h2 className="heading-display">Ausgewählte Möbel</h2>
              </div>
              <Link href="/shop" className="pill">
                Alle Möbel ansehen
              </Link>
            </div>
          </Reveal>
          <div className="product-grid">
            {featured.map((product, i) => (
              <Reveal key={product.slug} delay={i * 100}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* CTA */}
      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Ihr Möbel, Ihre Farbe</span>
            <h2 className="heading-display" style={{ maxWidth: "22ch" }}>
              Sie haben ein USM Haller Möbel — oder wünschen sich eines?
            </h2>
            <p className="body-copy mt-40">
              Wir kaufen gebrauchte Möbel an, bereiten Ihr eigenes Stück in
              Ihrer Wunschfarbe auf oder konfigurieren mit Ihnen eine passende
              Lösung aus unserem Bestand.
            </p>
            <div className="mt-40" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/kontakt" className="btn-filled">
                Unverbindlich anfragen
              </Link>
              <Link href="/shop" className="pill">
                Zum Shop
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
