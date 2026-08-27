import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
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
            [Vor- und Nachname der Inhaberin / des Inhabers]
            <br />
            Living4Fans
            <br />
            [Straße und Hausnummer]
            <br />
            [PLZ und Ort]
          </p>
          <p style={{ marginTop: "1.2em" }}>
            E-Mail: info@living4fans.de
            <br />
            Telefon: [Telefonnummer]
          </p>
          <p style={{ marginTop: "1.2em" }}>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [USt-IdNr.]
          </p>
          <p style={{ marginTop: "1.2em" }}>
            Plattform der EU-Kommission zur Online-Streitbeilegung:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              style={{ textDecoration: "underline" }}
            >
              ec.europa.eu/consumers/odr
            </a>
          </p>
          <p style={{ marginTop: "1.2em" }}>
            Living4Fans ist ein unabhängiger Anbieter für aufbereitete
            Gebrauchtmöbel und steht in keiner geschäftlichen Verbindung zur
            USM U. Schärer Söhne AG. „USM" und „USM Haller" sind Marken ihrer
            jeweiligen Inhaber und werden ausschließlich zur Beschreibung der
            angebotenen Originalprodukte verwendet.
          </p>
        </div>
      </div>
    </section>
  );
}
