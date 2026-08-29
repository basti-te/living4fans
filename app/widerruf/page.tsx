import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Widerrufsbelehrung",
  robots: { index: false },
};

const formLine = {
  display: "block" as const,
  borderBottom: "1px solid var(--walnut)",
  height: "1.8em",
};

export default function WiderrufPage() {
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Rechtliches</span>
        <h1 className="heading-display mb-68">Widerrufsbelehrung</h1>
        <div className="body-copy">
          <p>
            <strong>1. Widerrufsrecht</strong>
          </p>
          <p style={{ marginTop: "0.6em" }}>
            Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
            diesen Vertrag zu widerrufen.
          </p>
          <p style={{ marginTop: "0.6em" }}>
            Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie
            oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist,
            die letzte Ware in Besitz genommen haben bzw. hat.
          </p>
          <p style={{ marginTop: "0.6em" }}>
            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Alesja Schonhöft,
            Im Bülten 10, 49439 Steinfeld, Deutschland, E-Mail:{" "}
            <a
              href="mailto:living4fans@web.de"
              style={{ textDecoration: "underline" }}
            >
              living4fans@web.de
            </a>
            ) mittels einer eindeutigen Erklärung (z. B. einer E-Mail) über
            Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie
            können dafür das unten stehende Muster-Widerrufsformular verwenden,
            das jedoch nicht vorgeschrieben ist.
          </p>
          <p style={{ marginTop: "0.6em" }}>
            Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die
            Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der
            Widerrufsfrist absenden.
          </p>
          <p style={{ marginTop: "0.6em" }}>
            Bitte beachten Sie: Alle Möbel mit USM Haller Bauteilen werden
            individuell einschließlich Farbwahl auf Kundenbestellung/
            Kundenwunsch in unserer Werkstatt oder vor Ort beim Kunden
            montiert. Wir weisen ausdrücklich darauf hin, dass die Möbel denen
            bereits eine Artikelnummer zugeordnet wurde nicht physisch in
            unserer Ausstellung oder im Lager vorhanden sind. Bei Artikeln die
            speziell auf Kundenwunsch montiert werden entfällt das Recht auf
            einen Widerruf.
          </p>
          <p style={{ marginTop: "1.4em" }}>
            <strong>2. Folgen des Widerrufs</strong>
          </p>
          <p style={{ marginTop: "0.6em" }}>
            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen,
            die wir von Ihnen erhalten haben, einschließlich der Lieferkosten
            (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben,
            dass Sie eine andere Art der Lieferung als die von uns angebotene,
            günstigste Standardlieferung gewählt haben), unverzüglich und
            spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem
            die Mitteilung über Ihren Widerruf dieses Vertrags bei uns
            eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe
            Zahlungsmittel, das Sie bei der ursprünglichen Transaktion
            eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas
            anderes vereinbart; in keinem Fall werden Ihnen wegen dieser
            Rückzahlung Entgelte berechnet. Wir können die Rückzahlung
            verweigern, bis wir die Waren wieder zurückerhalten haben oder bis
            Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt
            haben, je nachdem, welches der frühere Zeitpunkt ist.
          </p>
          <p style={{ marginTop: "0.6em" }}>
            Sie haben die Waren unverzüglich und in jedem Fall spätestens
            binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf
            dieses Vertrags unterrichten, an uns zurückzusenden oder zu
            übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der
            Frist von vierzehn Tagen absenden. Sie tragen die unmittelbaren
            Kosten der Rücksendung der Waren. Die unmittelbaren Kosten der
            Rücksendung werden hinsichtlich solcher Waren, die aufgrund ihrer
            Beschaffenheit nicht normal mit der Post an uns zurückgesandt
            werden können (Speditionsware), für jede derartige Ware auf
            höchstens etwa 150 Euro geschätzt. Sie müssen für einen etwaigen
            Wertverlust der Waren aufkommen, wenn dieser Wertverlust auf einen
            zur Prüfung der Beschaffenheit, die Eigenschaften und
            Funktionsweise der Waren nicht notwendigen Umgang mit ihnen
            zurückzuführen ist.
          </p>
          <p style={{ marginTop: "1.4em" }}>
            <strong>3. Allgemeine Hinweise</strong>
          </p>
          <ul style={{ marginTop: "0.6em", paddingLeft: "1.2em" }}>
            <li>
              Bitte vermeiden Sie Beschädigungen und Verunreinigungen der Ware.
              Senden Sie die Ware bitte in Originalverpackung mit sämtlichem
              Zubehör und mit allen Verpackungsbestandteilen an uns zurück.
              Verwenden Sie ggf. eine schützende Umverpackung. Wenn Sie die
              Originalverpackung nicht mehr besitzen, sorgen Sie bitte mit
              einer geeigneten Verpackung für einen ausreichenden Schutz vor
              Transportschäden.
            </li>
            <li>Senden Sie die Ware bitte nicht unfrei an uns zurück.</li>
          </ul>
          <p style={{ marginTop: "1.4em" }}>
            <strong>4. Muster-Widerrufsformular</strong>
          </p>
          <p style={{ marginTop: "0.6em" }}>
            Wenn Sie den Vertrag widerrufen wollen, dann können Sie dieses
            Formular ausfüllen und an uns zurücksenden. Es ist jedoch für die
            Ausübung Ihres Widerrufsrechts nicht erforderlich, dieses Formular
            zu verwenden.
          </p>
          <div
            style={{
              marginTop: "1.4em",
              border: "1px solid var(--walnut)",
              padding: "28px 24px",
            }}
          >
            <p>
              An Living4Fans
              <br />
              Alesja Schonhöft
              <br />
              Im Bülten 10
              <br />
              49439 Steinfeld
              <br />
              Deutschland
              <br />
              E-Mail: living4fans@web.de
            </p>
            <p style={{ marginTop: "1.2em" }}>
              Hiermit widerrufe ich den von mir abgeschlossenen Vertrag über
              den Kauf der folgenden Waren/die Erbringung der folgenden
              Dienstleistung:
            </p>
            <span style={formLine} aria-hidden="true" />
            <span style={formLine} aria-hidden="true" />
            <p style={{ marginTop: "1.2em" }}>
              Bestellt am ____________ / erhalten am ____________
            </p>
            <p style={{ marginTop: "1.2em" }}>Name des Kunden:</p>
            <span style={formLine} aria-hidden="true" />
            <p style={{ marginTop: "1.2em" }}>Anschrift des Kunden:</p>
            <span style={formLine} aria-hidden="true" />
            <p style={{ marginTop: "1.2em" }}>
              Unterschrift des Kunden (nur bei Mitteilung auf Papier):
            </p>
            <span style={formLine} aria-hidden="true" />
            <p style={{ marginTop: "1.2em" }}>Datum:</p>
            <span style={formLine} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
