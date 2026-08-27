import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="wordmark">
          living4fans
        </Link>
        <nav className="site-nav" aria-label="Hauptnavigation">
          <Link href="/shop">Shop</Link>
          <Link href="/konzept">Konzept</Link>
          <Link href="/#farben">Farben</Link>
          <Link href="/kontakt">Kontakt</Link>
          <Link href="/kontakt" className="pill">
            Anfrage
          </Link>
        </nav>
      </div>
    </header>
  );
}
