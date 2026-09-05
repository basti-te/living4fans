import Link from "next/link";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import RoomTour from "@/components/RoomTour";
import KundenGalerie from "@/components/KundenGalerie";
import ReferenzGalerie from "@/components/ReferenzGalerie";
import { REFERENZEN } from "@/lib/referenzen";
import ProductCard from "@/components/ProductCard";
import KiBadge from "@/components/KiBadge";
import { USM_COLORS } from "@/lib/colors";
import { getShopProducts } from "@/lib/shop";

const PROCESS = [
  {
    num: "01",
    title: "Demontage",
    text: "Jedes Möbelstück wird vollständig in seine Einzelteile zerlegt — Rohre, Kugeln, Tablare, bis zur letzten Schraube.",
    image: "/media/prozess-1.jpg",
    alt: "Demontierte Chromrohre und Verbindungskugeln auf der Werkbank",
  },
  {
    num: "02",
    title: "Entlackung",
    text: "Alle Metallflächen werden chemisch entlackt und phosphatiert. Zurück bleibt blankes Stahlblech — bereit für die neue Haut.",
    image: "/media/prozess-2.jpg",
    alt: "Entlackte Stahltablare hängen am Gestell der Beschichtungshalle",
  },
  {
    num: "03",
    title: "Pulverbeschichtung",
    text: "Elektrostatisch aufgetragen, in Ihrer Wunschfarbe: eine der klassischen USM-Farben oder jeder RAL-Ton.",
    image: "/media/prozess-3.jpg",
    alt: "Feiner enzianblauer Pulvernebel legt sich auf ein Stahltablar",
  },
  {
    num: "04",
    title: "Einbrennen & Montage",
    text: "Bei rund 180 °C eingebrannt, wird die Oberfläche härter als jeder Lack. Danach: Endmontage und Funktionsprüfung.",
    image: "/media/prozess-4.jpg",
    alt: "Frisch beschichtete enzianblaue Tablare kühlen vor dem Einbrennofen aus",
  },
];

const CATEGORY_LINKS = [
  { label: "Sideboards", href: "/shop?kategorie=sideboards" },
  { label: "Highboards", href: "/shop?kategorie=highboards" },
  { label: "Lowboards", href: "/shop?kategorie=lowboards" },
  { label: "Tische", href: "/shop?kategorie=tische" },
  { label: "Servierwagen & Bars", href: "/shop?kategorie=servierwagen" },
  { label: "Küche & Bad", href: "/shop?kategorie=kuechen" },
];

export const revalidate = 60;

export default async function Home() {
  const bestand = (await getShopProducts())
    .filter((p) => p.photos.length > 0)
    .slice(0, 6);

  return (
    <>
      <Hero />

      {/* Versprechen */}
      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Unser Versprechen</span>
            <h2 className="heading-display">
              Jedes Möbelstück ein Original. Aufbereitet in Handarbeit. Neu
              beschichtet in Ihrer Wunschfarbe.
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Rundgang: vier Räume morphen ineinander */}
      <RoomTour />

      {/* Aus dem Bestand */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="display-deco-wrap" aria-hidden="true">
          <div className="display-deco">Originale</div>
        </div>
        <div className="container" style={{ marginTop: 56 }}>
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
                <span className="eyebrow">Aus dem Bestand</span>
                <h2 className="heading-display" style={{ maxWidth: "18ch" }}>
                  Aktuelle Stücke, bereit für Ihre Farbe.
                </h2>
              </div>
              <Link href="/shop" className="pill">
                Alle Möbel ansehen
              </Link>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="body-copy mb-68">
              Vom Beistelltisch bis zur Kücheninsel: Diese Möbelstücke stehen
              aufbereitet bei uns in Steinfeld — jedes ein Original, jedes in
              jeder USM- oder RAL-Farbe bestellbar.
            </p>
          </Reveal>
          <div className="product-grid">
            {bestand.map((product, i) => (
              <Reveal key={product.slug} delay={(i % 3) * 100}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Kategorien als Schriftwand */}
      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Das Sortiment</span>
            <p className="category-wall">
              {CATEGORY_LINKS.map((c, i) => (
                <span key={c.href}>
                  <Link href={c.href}>{c.label}</Link>
                  {i < CATEGORY_LINKS.length - 1 ? ", " : " — "}
                </span>
              ))}
              <span className="meta">
                aufbereitet und beschichtet in Ihrer Farbe.
              </span>
            </p>
          </Reveal>
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
                Ein USM Haller Möbelstück ist auf Jahrzehnte gebaut. Das verchromte
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

      {/* Interlude — volle Breite, ohne Text */}
      <div className="interlude" style={{ position: "relative" }}>
        <img
          src="/media/interlude-tanne.jpg"
          alt="Tannengrünes USM Haller Sideboard in einer verlassenen Galerie"
          loading="lazy"
          className="focus-right"
        />
        <KiBadge text="KI-generierte Visualisierung" position="links" />
      </div>

      {/* Prozess */}
      <section className="section" style={{ paddingTop: 40 }}>
        <div className="display-deco-wrap" aria-hidden="true">
          <div className="display-deco">Neuauflage</div>
        </div>
        <div className="container" style={{ marginTop: 56 }}>
          <Reveal>
            <span className="eyebrow">Die Neuauflage</span>
            <h2 className="heading-display mb-68" style={{ maxWidth: "18ch" }}>
              Vier Schritte, ein Versprechen
            </h2>
          </Reveal>
          <div className="process-grid">
            {PROCESS.map((step, i) => (
              <Reveal key={step.num} delay={i * 90}>
                <div>
                  <div className="tile-frame">
                    <div className="media-tile ratio-32">
                      <img src={step.image} alt={step.alt} loading="lazy" />
                      <KiBadge text="KI-generiert" />
                    </div>
                  </div>
                  <div className="process-step-num tabular">{step.num}</div>
                  <div className="process-step-title">{step.title}</div>
                  <p className="process-step-text">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Farben */}
      <section className="section" id="farben" style={{ paddingTop: 40 }}>
        <div className="display-deco-wrap" aria-hidden="true">
          <div className="display-deco">Wunschfarbe</div>
        </div>
        <div className="container" style={{ marginTop: 56 }}>
          <Reveal>
            <span className="eyebrow">Ihre Wunschfarbe</span>
            <h2 className="heading-display" style={{ maxWidth: "20ch" }}>
              13 Klassiker. Und jede RAL-Farbe dazwischen.
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

      {/* Kundenbilder — Ausschnitt */}
      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Kundenbilder</span>
            <h2 className="heading-display" style={{ maxWidth: "20ch" }}>
              Angekommen — bei unseren Kunden.
            </h2>
          </Reveal>
          <div className="mt-68">
            <KundenGalerie anzahl={4} />
          </div>
          <div className="mt-40">
            <Link href="/ueber-uns#kundenbilder" className="text-link">
              Alle Kundenbilder ansehen →
            </Link>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      {/* Kundenstimmen — Referenzprojekte mit Fotostrecke */}
      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Kundenstimmen</span>
            <h2 className="heading-display mb-68" style={{ maxWidth: "18ch" }}>
              Das sagen unsere Kunden.
            </h2>
          </Reveal>
          {REFERENZEN.map((referenz) => (
            <Reveal key={referenz.id}>
              <ReferenzGalerie referenz={referenz} />
            </Reveal>
          ))}
        </div>
      </section>

      <hr className="hairline" />

      {/* CTA */}
      <section className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Ihr Möbelstück, Ihre Farbe</span>
            <h2 className="heading-display" style={{ maxWidth: "22ch" }}>
              Sie haben ein USM Haller Möbelstück — oder wünschen sich eines?
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
