import Link from "next/link";
import { getAllProductsAdmin, formatCents } from "@/lib/shop";

export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, string> = {
  aktiv: "Aktiv",
  entwurf: "Entwurf",
  verkauft: "Verkauft",
};

const GROESSE_KURZ: Record<string, string> = {
  klein: "Klein · Paketversand",
  mittel: "Mittel · Lieferung im Umkreis",
  gross: "Groß · Nur auf Anfrage",
};

export default async function AdminProdukte() {
  const products = await getAllProductsAdmin();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, flexWrap: "wrap" }} className="mb-40">
        <h1 className="heading-lg">Produkte</h1>
        <Link href="/admin/produkte/neu" className="btn-filled">
          Neues Möbelstück
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="body-copy">
          Noch keine Produkte in der Datenbank (oder Datenbank nicht verbunden).
        </p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Kategorie</th>
              <th>Preis</th>
              <th>Logistik</th>
              <th>Fotos</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.slug}>
                <td>{p.name}</td>
                <td>{p.categoryLabel}</td>
                <td className="tabular">
                  {p.aufAnfrage ? "Auf Anfrage" : formatCents(Math.round(p.price * 100))}
                </td>
                <td>{GROESSE_KURZ[p.groesse]}</td>
                <td className="tabular">{p.photos.length}</td>
                <td>
                  <span className={`status-pill status-${p.status}`}>
                    {STATUS_LABEL[p.status]}
                  </span>
                </td>
                <td>
                  {p.id ? (
                    <Link href={`/admin/produkte/${p.id}`} className="caption">
                      Bearbeiten →
                    </Link>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
