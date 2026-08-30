import { adminClient } from "@/lib/supabase";
import StatusSelect from "@/components/admin/StatusSelect";

export const dynamic = "force-dynamic";

const STATUS_OPTIONEN = [
  { value: "neu", label: "Neu" },
  { value: "in_bearbeitung", label: "In Bearbeitung" },
  { value: "erledigt", label: "Erledigt" },
];

const TYP_LABEL: Record<string, string> = {
  anfrage: "Anfrage",
  angebot: "Angebot",
  lieferung: "Lieferung",
  kontakt: "Kontakt",
};

export default async function AdminAnfragen() {
  const sb = adminClient();
  if (!sb) {
    return (
      <div>
        <h1 className="heading-lg mb-40">Anfragen</h1>
        <p className="body-copy">Datenbank nicht verbunden.</p>
      </div>
    );
  }

  const { data: inquiries } = await sb
    .from("inquiries")
    .select("*, products(name)")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div>
      <h1 className="heading-lg mb-40">Anfragen</h1>
      {(inquiries ?? []).length === 0 ? (
        <p className="body-copy">
          Noch keine Anfragen. Anfragen über die Produktseiten und das
          Kontaktformular erscheinen hier.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {(inquiries ?? []).map((a) => (
            <details key={a.id} className="admin-inquiry">
              <summary>
                <span className="tabular caption meta">
                  {new Date(a.created_at).toLocaleDateString("de-DE")}
                </span>
                <span className="label" style={{ marginBottom: 0 }}>
                  {TYP_LABEL[a.typ] ?? a.typ}
                </span>
                <span>{a.name}</span>
                <span className="caption meta">
                  {(a.products as { name?: string } | null)?.name ?? "Allgemein"}
                </span>
                <span className={`status-pill status-${a.status}`}>{a.status}</span>
              </summary>
              <div className="admin-inquiry-body">
                <p className="body-copy" style={{ whiteSpace: "pre-wrap", fontSize: 16 }}>
                  {a.nachricht ?? "—"}
                </p>
                <table className="spec-table" style={{ marginTop: 16 }}>
                  <tbody>
                    <tr>
                      <td>E-Mail</td>
                      <td>
                        <a href={`mailto:${a.email}`}>{a.email}</a>
                      </td>
                    </tr>
                    {a.telefon ? (
                      <tr>
                        <td>Telefon</td>
                        <td>{a.telefon}</td>
                      </tr>
                    ) : null}
                    {a.plz ? (
                      <tr>
                        <td>PLZ</td>
                        <td>{a.plz}</td>
                      </tr>
                    ) : null}
                    {a.wunschfarbe ? (
                      <tr>
                        <td>Wunschfarbe</td>
                        <td>{a.wunschfarbe}</td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
                <div style={{ marginTop: 16 }}>
                  <StatusSelect endpoint="inquiries" id={a.id} value={a.status} options={STATUS_OPTIONEN} />
                </div>
              </div>
            </details>
          ))}
        </div>
      )}
    </div>
  );
}
