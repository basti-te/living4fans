import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Anfrage, Beratung oder Ankauf: Kontaktieren Sie Living4Fans — Ihre Werkstatt für aufbereitete USM Haller Möbel in Wunschfarbe.",
};

export default function KontaktPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <span className="eyebrow">Kontakt</span>
          <h1 className="heading-display" style={{ maxWidth: "20ch" }}>
            Sprechen wir über Ihr Möbelstück.
          </h1>
          <p className="body-copy mt-40">
            Ob Anfrage zu einem Möbelstück aus dem Shop, Aufbereitung Ihres eigenen
            Stücks oder Ankauf — schreiben Sie uns. Wir melden uns in der
            Regel innerhalb eines Werktags.
          </p>
        </div>
      </section>

      <hr className="hairline" />

      <section className="section">
        <div className="container">
          <div className="split">
            <Reveal>
              <div>
                <div className="split-label" style={{ marginBottom: 40 }}>
                  Direkt erreichen
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 20, textAlign: "right" }}>
                  <div>
                    <span className="label meta" style={{ display: "block", marginBottom: 4 }}>
                      E-Mail
                    </span>
                    <a href="mailto:info@living4fans.de" style={{ fontSize: 19 }}>
                      info@living4fans.de
                    </a>
                  </div>
                  <div>
                    <span className="label meta" style={{ display: "block", marginBottom: 4 }}>
                      Reaktionszeit
                    </span>
                    <span style={{ fontSize: 19 }}>Innerhalb eines Werktags</span>
                  </div>
                  <div>
                    <span className="label meta" style={{ display: "block", marginBottom: 4 }}>
                      Versand
                    </span>
                    <span style={{ fontSize: 19 }}>Europaweit</span>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
