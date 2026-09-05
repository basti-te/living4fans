import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description:
    "Impressum von Living4Fans — Alesja Schonhöft, Steinfeld. Aufbereitung und Verkauf originaler USM Haller Möbelstücke.",
};

export default function ImpressumPage() {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Rechtliches</span>
        <h1 className="heading-display mb-68">Impressum</h1>
        <div className="body-copy">
          <p>
            <strong>Angaben gemäß § 5 DDG</strong>
          </p>
          <p style={{ marginTop: "1.2em" }}>
            Firma Alesja Schonhöft — Living4Fans
            <br />
            Inhaberin: Alesja Schonhöft
            <br />
            Im Bülten 10
            <br />
            49439 Steinfeld
            <br />
            Deutschland
          </p>
          <p style={{ marginTop: "1.2em" }}>
            E-Mail:{" "}
            <a
              href="mailto:living4fans@web.de"
              style={{ textDecoration: "underline" }}
            >
              living4fans@web.de
            </a>
            <br />
            Telefon: <a href="tel:+491788319818">0178 8319818</a>
          </p>
          <p style={{ marginTop: "1.2em" }}>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: DE430963026
          </p>
          <p style={{ marginTop: "1.2em" }}>
            Plattform der EU-Kommission zur Online-Streitbeilegung:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              style={{ textDecoration: "underline" }}
            >
              ec.europa.eu/consumers/odr
            </a>
            <br />
            Zur Teilnahme an einem Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle sind wir weder verpflichtet noch
            bereit.
          </p>
          <p style={{ marginTop: "1.2em" }}>
            Living4Fans ist ein unabhängiger Anbieter für aufbereitete
            Gebrauchtmöbel und steht in keiner geschäftlichen Verbindung zur
            USM U. Schärer Söhne AG. „USM" und „USM Haller" sind Marken ihrer
            jeweiligen Inhaber und werden ausschließlich zur Beschreibung der
            angebotenen Originalprodukte verwendet.
          </p>
          <p style={{ marginTop: "1.2em" }}>
            <strong>Hinweis zu KI-generierten Inhalten:</strong> Einige Bilder
            und Videos auf dieser Website wurden mit Unterstützung künstlicher
            Intelligenz erstellt oder bearbeitet (z.&nbsp;B. Raumszenen und
            Visualisierungen). Diese Inhalte sind am jeweiligen Bild bzw.
            Video entsprechend gekennzeichnet. Die dargestellten Möbelstücke
            entsprechen den tatsächlich angebotenen, aufbereiteten
            Originalen; Angaben zu Ausstattung und Maßen finden Sie in der
            jeweiligen Produktbeschreibung.
          </p>
        </div>
      </div>
    </section>
  );
}
