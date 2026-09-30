"use client";

import { usePathname } from "next/navigation";

/** Site-weiter Hinweis-Banner (nicht im Admin-Bereich). */
export default function HinweisBanner() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="hinweis-banner" role="status">
      <strong>Betriebsferien bis zum 13.10.</strong>
      <span className="hinweis-banner-detail">
        Ihre Anfragen erreichen uns weiterhin und werden ab dem 13. Oktober
        wieder bearbeitet.
      </span>
    </div>
  );
}
