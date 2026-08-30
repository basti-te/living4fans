import Link from "next/link";
import { requireAdmin } from "@/lib/adminAuth";
import LogoutButton from "@/components/admin/LogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="admin-shell">
      <aside className="admin-nav">
        <span className="label" style={{ display: "block", marginBottom: 24 }}>
          Living4Fans — Admin
        </span>
        <nav>
          <Link href="/admin">Übersicht</Link>
          <Link href="/admin/statistik">Statistik</Link>
          <Link href="/admin/produkte">Produkte</Link>
          <Link href="/admin/bestellungen">Bestellungen</Link>
          <Link href="/admin/anfragen">Anfragen</Link>
          <Link href="/admin/einstellungen">Versand &amp; Preise</Link>
          <Link href="/admin/zahlungen">Zahlungsmethoden</Link>
          <Link href="/admin/benachrichtigungen">Benachrichtigungen</Link>
        </nav>
        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 10 }}>
          <Link href="/" className="caption meta">
            → Zur Website
          </Link>
          <LogoutButton />
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
