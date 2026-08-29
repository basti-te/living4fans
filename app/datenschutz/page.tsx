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
        <h1 className="heading-display mb-68">
          Informationen zum Datenschutz
        </h1>
        <div className="body-copy">
          <p>
            <strong>
              1. Information über die Erhebung personenbezogener Daten und
              Kontaktdaten des Verantwortlichen
            </strong>
          </p>
          <p style={{ marginTop: "0.6em" }}>
            1.1 Im Folgenden informieren wir Sie über den Umgang mit Ihren
            personenbezogenen Daten, hierbei sind personenbezogene Daten alle
            Daten, mit denen Sie persönlich identifiziert werden können.
          </p>
          <p style={{ marginTop: "0.6em" }}>
            1.2 Verantwortlicher für die Datenverarbeitung im Sinne der
            Datenschutz-Grundverordnung (DSGVO) ist Alesja Schonhöft, Im Bülten
            10, 49439 Steinfeld, Deutschland, E-Mail:{" "}
            <a
              href="mailto:living4fans@web.de"
              style={{ textDecoration: "underline" }}
            >
              living4fans@web.de
            </a>
            . Der für die Verarbeitung von personenbezogenen Daten
            Verantwortliche ist diejenige natürliche oder juristische Person,
            die allein oder gemeinsam mit anderen über die Zwecke und Mittel
            der Verarbeitung von personenbezogenen Daten entscheidet.
          </p>
          <p style={{ marginTop: "1.4em" }}>
            <strong>2. Kontaktaufnahme</strong>
          </p>
          <p style={{ marginTop: "0.6em" }}>
            Im Rahmen der Kontaktaufnahme mit uns (z.B. per E-Mail) werden
            personenbezogene Daten erhoben und zwar im Umfang der Notwendigkeit
            einer umgekehrten Kontaktaufnahme von Verkäufer zu Kunde. Diese
            Daten werden ausschließlich zum Zweck der Beantwortung Ihres
            Anliegens bzw. für die Kontaktaufnahme und die damit verbundene
            technische Administration gespeichert und verwendet.
            Rechtsgrundlage für die Verarbeitung der Daten ist unser
            berechtigtes Interesse an der Beantwortung Ihres Anliegens gemäß
            Art. 6 Abs. 1 lit. f DSGVO. Zielt Ihre Kontaktierung auf den
            Abschluss eines Vertrages ab, so ist zusätzliche Rechtsgrundlage
            für die Verarbeitung Art. 6 Abs. 1 lit. b DSGVO. Ihre Daten werden
            nach abschließender Bearbeitung Ihrer Anfrage gelöscht, dies ist
            der Fall, wenn sich aus den Umständen entnehmen lässt, dass der
            betroffene Sachverhalt abschließend geklärt ist und sofern keine
            gesetzlichen Aufbewahrungspflichten entgegenstehen.
          </p>
          <p style={{ marginTop: "1.4em" }}>
            <strong>3. Datenverarbeitung zur Bestellabwicklung</strong>
          </p>
          <p style={{ marginTop: "0.6em" }}>
            Die von uns erhobenen personenbezogenen Daten werden im Rahmen der
            Vertragsabwicklung an das mit der Lieferung beauftragte
            Transportunternehmen weitergegeben, soweit dies zur Lieferung der
            Ware erforderlich ist. Ihre Zahlungsdaten geben wir im Rahmen der
            Zahlungsabwicklung an das beauftragte Kreditinstitut weiter, sofern
            dies für die Zahlungsabwicklung erforderlich ist. Sofern
            Zahlungsdienstleister eingesetzt werden, informieren wir hierüber
            nachstehend explizit. Die Rechtsgrundlage für die Weitergabe der
            Daten ist hierbei Art. 6 Abs. 1 lit. b DSGVO.
          </p>
          <p style={{ marginTop: "1.4em" }}>
            <strong>4. Rechte des Betroffenen</strong>
          </p>
          <p style={{ marginTop: "0.6em" }}>
            4.1 Das geltende Datenschutzrecht gewährt Ihnen gegenüber dem
            Verantwortlichen hinsichtlich der Verarbeitung Ihrer
            personenbezogenen Daten umfassende Betroffenenrechte (Auskunfts-
            und Interventionsrechte), über die wir Sie nachstehend informieren:
          </p>
          <ul style={{ marginTop: "0.6em", paddingLeft: "1.2em" }}>
            <li>Auskunftsrecht gemäß Art. 15 DSGVO</li>
            <li>Recht auf Berichtigung gemäß Art. 16 DSGVO</li>
            <li>Recht auf Löschung gemäß Art. 17 DSGVO</li>
            <li>Recht auf Einschränkung der Verarbeitung gemäß Art. 18 DSGVO</li>
            <li>Recht auf Unterrichtung gemäß Art. 19 DSGVO</li>
            <li>Recht auf Datenübertragbarkeit gemäß Art. 20 DSGVO</li>
            <li>
              Recht auf Widerruf erteilter Einwilligungen gemäß Art. 7 Abs. 3
              DSGVO
            </li>
            <li>Recht auf Beschwerde gemäß Art. 77 DSGVO</li>
          </ul>
          <p style={{ marginTop: "0.6em" }}>
            4.2 Widerspruchsrecht: Wenn wir im Rahmen einer Interessenabwägung
            ihre personenbezogenen Daten aufgrund unseres überwiegend
            berechtigten Interesses verarbeiten, haben sie das jederzeitige
            Recht gegen diese Verarbeitung Widerspruch mit Wirkung für die
            Zukunft einzulegen. Machen sie von diesem Widerspruchsrecht
            gebrauch, beenden wir die Verarbeitung der betroffenen Daten. Eine
            Weiterverarbeitung bleibt jedoch vorbehalten, wenn zwingende
            schutzwürdige Gründe hierfür nachgewiesen werden können, z.B. wenn
            Gründe hierfür ihre Grundrechte und Grundfreiheiten überwiegen oder
            wenn die Verarbeitung der Geltendmachung, Ausübung oder
            Verteidigung von Rechtsansprüchen dient. Ihre personenbezogenen
            Daten werden von uns nie verarbeitet, um Direktwerbung zu
            betreiben. Um dieses Widerspruchsrecht auszuüben genügt es eine
            eindeutig formulierte Nachricht per E-Mail an uns zu schreiben.
          </p>
          <p style={{ marginTop: "1.4em" }}>
            <strong>5. Dauer der Speicherung personenbezogener Daten</strong>
          </p>
          <p style={{ marginTop: "0.6em" }}>
            Die Dauer der Speicherung von personenbezogenen Daten bemisst sich
            anhand der jeweiligen Rechtsgrundlage, am Verarbeitungszweck und —
            sofern einschlägig — zusätzlich anhand der jeweiligen gesetzlichen
            Aufbewahrungsfrist (z.B. handels- und steuerrechtliche
            Aufbewahrungsfristen). Bei der Verarbeitung von personenbezogenen
            Daten auf Grundlage einer ausdrücklichen Einwilligung gemäß Art. 6
            Abs. 1 lit. a DSGVO werden diese Daten so lange gespeichert, bis
            der Betroffene seine Einwilligung widerruft. Existieren gesetzliche
            Aufbewahrungsfristen für Daten, die im Rahmen rechtsgeschäftlicher
            bzw. rechtsgeschäftsähnlicher Verpflichtungen auf der Grundlage von
            Art. 6 Abs. 1 lit. b DSGVO verarbeitet werden, werden diese Daten
            nach Ablauf der Aufbewahrungsfristen routinemäßig gelöscht, sofern
            sie nicht mehr zur Vertragserfüllung oder Vertragsanbahnung
            erforderlich sind und/oder unsererseits kein berechtigtes Interesse
            an der Weiterspeicherung fortbesteht. Bei der Verarbeitung von
            personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. f
            DSGVO werden diese Daten so lange gespeichert, bis der Betroffene
            sein Widerspruchsrecht nach Art. 21 Abs. 1 DSGVO ausübt, es sei
            denn, wir können zwingende schutzwürdige Gründe für die
            Verarbeitung nachweisen, die die Interessen, Rechte und Freiheiten
            der betroffenen Person überwiegen, oder die Verarbeitung dient der
            Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen.
          </p>
          <p style={{ marginTop: "0.6em" }}>
            Sofern sich aus den sonstigen Informationen dieser Erklärung über
            spezifische Verarbeitungssituationen nichts anderes ergibt, werden
            gespeicherte personenbezogene Daten im Übrigen dann gelöscht, wenn
            sie für die Zwecke, für die sie erhoben oder auf sonstige Weise
            verarbeitet wurden, nicht mehr notwendig sind.
          </p>
          <p style={{ marginTop: "1.4em" }}>
            <strong>6. Hosting</strong>
          </p>
          <p style={{ marginTop: "0.6em" }}>
            Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133,
            Covina, CA 91723, USA gehostet. Beim Aufruf der Seiten verarbeitet
            Vercel technisch notwendige Daten (u.a. IP-Adresse, Datum und
            Uhrzeit des Zugriffs, aufgerufene Seite) in Server-Logfiles.
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
            Interesse am sicheren Betrieb der Website). Diese Website setzt
            keine Cookies zu Analyse- oder Marketingzwecken ein und verwendet
            keine Tracking-Dienste.
          </p>
        </div>
      </div>
    </section>
  );
}
