import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="header-cell">
          <Link href="/" className="wordmark">
            living4fans
          </Link>
        </div>
        <div className="header-cell grow" aria-hidden="true" />
        <nav className="site-nav" aria-label="Hauptnavigation">
          <Link href="/shop">Shop</Link>
          <Link href="/konzept">Konzept</Link>
          <Link href="/#farben">Farben</Link>
          <Link href="/kontakt">Kontakt</Link>
          <Link href="/kontakt">Anfrage</Link>
        </nav>
      </div>
    </header>
  );
}
