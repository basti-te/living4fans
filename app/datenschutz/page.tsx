import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Rechtliches</span>
        <h1 className="heading-display mb-68">Datenschutzerklärung</h1>
        <div className="body-copy">
          <p>
            <strong>1. Verantwortliche Stelle</strong>
          </p>
          <p style={{ marginTop: "0.6em" }}>
            [Vor- und Nachname der Inhaberin / des Inhabers], Living4Fans,
            [Adresse], E-Mail: info@living4fans.de
          </p>
          <p style={{ marginTop: "1.4em" }}>
            <strong>2. Hosting</strong>
          </p>
          <p style={{ marginTop: "0.6em" }}>
            Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133,
            Covina, CA 91723, USA gehostet. Beim Aufruf der Seiten verarbeitet
            Vercel technisch notwendige Daten (u.a. IP-Adresse, Datum und
            Uhrzeit des Zugriffs, aufgerufene Seite) in Server-Logfiles.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
            Interesse am sicheren Betrieb der Website).
          </p>
          <p style={{ marginTop: "1.4em" }}>
            <strong>3. Kontaktaufnahme</strong>
          </p>
          <p style={{ marginTop: "0.6em" }}>
            Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre Angaben
            zur Bearbeitung der Anfrage (Art. 6 Abs. 1 lit. b DSGVO). Die
            Daten werden gelöscht, sobald sie für die Bearbeitung nicht mehr
            erforderlich sind und keine gesetzlichen Aufbewahrungspflichten
            bestehen.
          </p>
          <p style={{ marginTop: "1.4em" }}>
            <strong>4. Cookies und Tracking</strong>
          </p>
          <p style={{ marginTop: "0.6em" }}>
            Diese Website setzt keine Cookies zu Analyse- oder Marketingzwecken
            ein und verwendet keine Tracking-Dienste.
          </p>
          <p style={{ marginTop: "1.4em" }}>
            <strong>5. Ihre Rechte</strong>
          </p>
          <p style={{ marginTop: "0.6em" }}>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung, Datenübertragbarkeit sowie
            Widerspruch (Art. 15–21 DSGVO). Zudem besteht ein Beschwerderecht
            bei einer Datenschutzaufsichtsbehörde.
          </p>
          <p style={{ marginTop: "1.4em" }}>
            Hinweis: Diese Erklärung ist eine Vorlage und muss vor
            Veröffentlichung durch die Betreiberin / den Betreiber geprüft und
            vervollständigt werden.
          </p>
        </div>
      </div>
    </section>
  );
}
