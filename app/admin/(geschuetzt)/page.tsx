import Link from "next/link";
import { adminClient } from "@/lib/supabase";
import { stripeConfigured } from "@/lib/stripeClient";
import { formatCents } from "@/lib/shop";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const sb = adminClient();

  if (!sb) {
    return (
      <div>
        <h1 className="heading-lg mb-40">Übersicht</h1>
        <p className="body-copy" style={{ maxWidth: "58ch" }}>
          Die Datenbank ist noch nicht verbunden. Bitte in Vercel die
          Umgebungsvariablen <code>NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> und{" "}
          <code>SUPABASE_SERVICE_ROLE_KEY</code> setzen und neu deployen.
        </p>
      </div>
    );
  }

  const seit30Tagen = new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString();
  const [aktiv, entwurf, neueAnfragen, offeneBestellungen, umsatz, letzteAnfragen, letzteBestellungen] =
    await Promise.all([
      sb.from("products").select("id", { count: "exact", head: true }).eq("status", "aktiv"),
      sb.from("products").select("id", { count: "exact", head: true }).eq("status", "entwurf"),
      sb.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "neu"),
      sb.from("orders").select("id", { count: "exact", head: true }).in("status", ["bezahlt", "in_produktion"]),
      sb.from("orders").select("betrag_cents").gte("created_at", seit30Tagen).neq("status", "storniert"),
      sb.from("inquiries").select("id, typ, name, created_at, status").order("created_at", { ascending: false }).limit(5),
      sb.from("orders").select("id, betrag_cents, wunschfarbe, status, created_at, kunde").order("created_at", { ascending: false }).limit(5),
    ]);

  const umsatzCents = (umsatz.data ?? []).reduce((s, o) => s + (o.betrag_cents ?? 0), 0);

  const stats = [
    { label: "Aktive Produkte", value: String(aktiv.count ?? 0), href: "/admin/produkte" },
    { label: "Entwürfe", value: String(entwurf.count ?? 0), href: "/admin/produkte" },
    { label: "Neue Anfragen", value: String(neueAnfragen.count ?? 0), href: "/admin/anfragen" },
    { label: "Offene Bestellungen", value: String(offeneBestellungen.count ?? 0), href: "/admin/bestellungen" },
    { label: "Umsatz (30 Tage)", value: formatCents(umsatzCents), href: "/admin/bestellungen" },
  ];

  return (
    <div>
      <h1 className="heading-lg mb-40">Übersicht</h1>

      {!stripeConfigured() ? (
        <p className="caption" style={{ marginBottom: 32, textTransform: "none", letterSpacing: 0, color: "#8a5a1d" }}>
          Hinweis: Stripe ist noch nicht verbunden (STRIPE_SECRET_KEY fehlt) —
          Kauf-Buttons zeigen Kunden bis dahin einen Hinweis auf die Anfrage.
        </p>
      ) : null}

      <div className="stat-grid">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="stat-tile">
            <span className="stat-value tabular">{s.value}</span>
            <span className="label">{s.label}</span>
          </Link>
        ))}
      </div>

      <div className="admin-cols">
        <div>
          <h2 className="label" style={{ marginBottom: 16 }}>Letzte Anfragen</h2>
          {(letzteAnfragen.data ?? []).length === 0 ? (
            <p className="caption meta" style={{ textTransform: "none", letterSpacing: 0 }}>Noch keine Anfragen.</p>
          ) : (
            <table className="admin-table">
              <tbody>
                {(letzteAnfragen.data ?? []).map((a) => (
                  <tr key={a.id}>
                    <td>{new Date(a.created_at).toLocaleDateString("de-DE")}</td>
                    <td>{a.typ}</td>
                    <td>{a.name}</td>
                    <td>{a.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div>
          <h2 className="label" style={{ marginBottom: 16 }}>Letzte Bestellungen</h2>
          {(letzteBestellungen.data ?? []).length === 0 ? (
            <p className="caption meta" style={{ textTransform: "none", letterSpacing: 0 }}>Noch keine Bestellungen.</p>
          ) : (
            <table className="admin-table">
              <tbody>
                {(letzteBestellungen.data ?? []).map((o) => (
                  <tr key={o.id}>
                    <td>{new Date(o.created_at).toLocaleDateString("de-DE")}</td>
                    <td>{(o.kunde as { name?: string } | null)?.name ?? "—"}</td>
                    <td className="tabular">{formatCents(o.betrag_cents)}</td>
                    <td>{o.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
