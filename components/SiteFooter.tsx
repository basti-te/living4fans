import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-wordmark" aria-hidden="true">
          <div className="display-xl">Living4Fans</div>
        </div>
        <div className="footer-cols">
          <div className="footer-col">
            <span className="label">Atelier</span>
            <p className="body-copy" style={{ fontSize: 15 }}>
              Aufbereitung und Neubeschichtung originaler USM Haller Möbel.
              Ankauf, Verkauf und individuelle Konfiguration — mit Versand in
              ganz Europa.
            </p>
          </div>
          <div className="footer-col">
            <span className="label">Navigation</span>
            <Link href="/shop">Shop</Link>
            <Link href="/konzept">Konzept</Link>
            <Link href="/#farben">Farben</Link>
            <Link href="/kontakt">Kontakt</Link>
          </div>
          <div className="footer-col">
            <span className="label">Kontakt</span>
            <a href="mailto:info@living4fans.de">info@living4fans.de</a>
            <Link href="/kontakt">Rückruf vereinbaren</Link>
          </div>
          <div className="footer-col">
            <span className="label">Rechtliches</span>
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
          </div>
        </div>
        <div className="footer-note">
          <p>
            Living4Fans ist ein unabhängiger Anbieter für aufbereitete
            Gebrauchtmöbel und steht in keiner geschäftlichen Verbindung zur
            USM U. Schärer Söhne AG. „USM" und „USM Haller" sind Marken ihrer
            jeweiligen Inhaber.
          </p>
          <p>© {new Date().getFullYear()} Living4Fans</p>
        </div>
      </div>
    </footer>
  );
}
