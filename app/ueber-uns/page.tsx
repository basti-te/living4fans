import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import KundenGalerie from "@/components/KundenGalerie";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Living4Fans ist ein Familienunternehmen aus Steinfeld (Oldb.): Alesja Schonhöft bereitet mit ihrem Mann Stephan USM Haller Möbelstücke auf — bis zur Maßanfertigung.",
};

export default function UeberUnsPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <span className="eyebrow">Über uns</span>
          <h1 className="heading-display mb-68" style={{ maxWidth: "22ch" }}>
            Hinter Living4Fans.
          </h1>

          <div className="ueber-grid">
            <Reveal>
              <figure>
                <div className="tile-frame">
                  <img
                    src="/media/alesja-lager.jpg"
                    alt="Alesja Schonhöft im Living4Fans Lager zwischen USM Haller Möbelstücken"
                    style={{ display: "block", width: "100%" }}
                  />
                </div>
                <figcaption className="caption meta" style={{ marginTop: 14 }}>
                  Alesja Schonhöft im Lager — Steinfeld (Oldb.)
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={100}>
              <div>
                <p className="body-copy">
                  Living4Fans ist ein Familienunternehmen aus Steinfeld
                  (Oldenburg) — und die Idee von Alesja Schonhöft. Gemeinsam
                  mit ihrem Mann Stephan hat sie das Konzept entwickelt:
                  gebrauchte USM Haller Möbelstücke finden, vollständig
                  zerlegen, professionell aufbereiten und in der Wunschfarbe
                  neu pulverbeschichten. Aus der Überzeugung, dass ein so
                  gutes System kein zweites Mal gebaut werden muss — sondern
                  ein zweites Leben verdient.
                </p>
                <p className="body-copy" style={{ marginTop: "1.2em" }}>
                  Seit dem Start im Frühjahr 2025 führt Alesja das
                  Unternehmen. Stephan steht ihr neben seinem eigentlichen
                  Beruf von der ersten Stunde an zur Seite — beim Zerlegen und
                  Montieren, beim Ausliefern und bei jeder neuen Idee.
                </p>
                <p className="body-copy" style={{ marginTop: "1.2em" }}>
                  Am liebsten werden die beiden bei Maßanfertigungen kreativ:
                  Zu den Stücken, die sie für Kunden konzipiert und umgesetzt
                  haben, gehört eine fast vier Meter hohe Wohnwand — mit
                  Fächern für Gitarre, Pflanzen und alles, was dort ein
                  Zuhause finden sollte. Was Sie sich vorstellen können,
                  bauen wir. So einfach ist der Anspruch.
                </p>
                <div style={{ marginTop: 40, display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <Link href="/kontakt" className="btn-filled">
                    Ihr Projekt besprechen
                  </Link>
                  <Link href="/shop" className="pill">
                    Zum Shop
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="fakten-row">
            <div className="fakten-cell">
              <span className="label">Gegründet</span>
              <span>Frühjahr 2025, Steinfeld (Oldb.)</span>
            </div>
            <div className="fakten-cell">
              <span className="label">Handarbeit</span>
              <span>Jedes Möbelstück von Hand zerlegt, aufbereitet, neu beschichtet</span>
            </div>
            <div className="fakten-cell">
              <span className="label">Maßanfertigung</span>
              <span>Vom Nachttisch bis zur vier Meter hohen Wohnwand</span>
            </div>
          </div>
        </div>
      </section>

      <hr className="hairline" />

      <section className="section" id="kundenbilder">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Kundenbilder</span>
            <h2 className="heading-display mb-40" style={{ maxWidth: "20ch" }}>
              Angekommen — bei unseren Kunden.
            </h2>
            <p className="body-copy mb-68">
              Aus Wohnzimmern, Fluren, Praxen und Büros: So leben unsere
              aufbereiteten Originale weiter. Vielen Dank an alle, die uns
              ihre Bilder schicken.
            </p>
          </Reveal>
          <KundenGalerie />
        </div>
      </section>
    </>
  );
}
