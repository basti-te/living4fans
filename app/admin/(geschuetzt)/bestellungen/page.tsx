import { adminClient } from "@/lib/supabase";
import { formatCents } from "@/lib/shop";
import StatusSelect from "@/components/admin/StatusSelect";

export const dynamic = "force-dynamic";

const STATUS_OPTIONEN = [
  { value: "offen", label: "Offen (Vorkasse erwartet)" },
  { value: "bezahlt", label: "Bezahlt" },
  { value: "in_produktion", label: "In Produktion" },
  { value: "versendet", label: "Versendet / geliefert" },
  { value: "abgeschlossen", label: "Abgeschlossen" },
  { value: "storniert", label: "Storniert" },
];

type Kunde = {
  name?: string | null;
  email?: string | null;
  telefon?: string | null;
  adresse?: { city?: string | null; postal_code?: string | null } | null;
};

export default async function AdminBestellungen() {
  const sb = adminClient();
  if (!sb) {
    return (
      <div>
        <h1 className="heading-lg mb-40">Bestellungen</h1>
        <p className="body-copy">Datenbank nicht verbunden.</p>
      </div>
    );
  }

  const { data: orders } = await sb
    .from("orders")
    .select("*, products(name)")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div>
      <h1 className="heading-lg mb-40">Bestellungen</h1>
      {(orders ?? []).length === 0 ? (
        <p className="body-copy">
          Noch keine Bestellungen. Bezahlte Stripe-Käufe erscheinen hier
          automatisch.
        </p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nr.</th>
              <th>Datum</th>
              <th>Möbelstück</th>
              <th>Wunschfarbe</th>
              <th>Betrag</th>
              <th>Zahlung</th>
              <th>Kunde</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {(orders ?? []).map((o) => {
              const kunde = (o.kunde ?? {}) as Kunde;
              return (
                <tr key={o.id}>
                  <td className="tabular">{o.bestellnr ?? "—"}</td>
                  <td>{new Date(o.created_at).toLocaleDateString("de-DE")}</td>
                  <td>{(o.products as { name?: string } | null)?.name ?? "—"}</td>
                  <td>{o.wunschfarbe ?? "—"}</td>
                  <td className="tabular">{formatCents(o.betrag_cents)}</td>
                  <td>{o.zahlungsart === "vorkasse" ? "Vorkasse" : "Stripe"}</td>
                  <td>
                    {kunde.name ?? "—"}
                    {kunde.email ? (
                      <>
                        <br />
                        <a href={`mailto:${kunde.email}`} className="caption">{kunde.email}</a>
                      </>
                    ) : null}
                    {kunde.telefon ? (
                      <>
                        <br />
                        <span className="caption meta">{kunde.telefon}</span>
                      </>
                    ) : null}
                    {kunde.adresse?.postal_code ? (
                      <>
                        <br />
                        <span className="caption meta">
                          {kunde.adresse.postal_code} {kunde.adresse.city ?? ""}
                        </span>
                      </>
                    ) : null}
                  </td>
                  <td>
                    <StatusSelect endpoint="orders" id={o.id} value={o.status} options={STATUS_OPTIONEN} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
