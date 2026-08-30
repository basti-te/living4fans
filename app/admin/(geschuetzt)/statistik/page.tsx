import { adminClient } from "@/lib/supabase";
import { formatCents } from "@/lib/shop";

export const dynamic = "force-dynamic";

const MONATE = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];

const ORDER_STATUS_LABEL: Record<string, string> = {
  offen: "Offen (Vorkasse erwartet)",
  bezahlt: "Bezahlt",
  in_produktion: "In Produktion",
  versendet: "Versendet / geliefert",
  abgeschlossen: "Abgeschlossen",
  storniert: "Storniert",
};

const TYP_LABEL: Record<string, string> = {
  anfrage: "Produkt-Anfragen",
  angebot: "Angebots-Anfragen",
  lieferung: "Liefer-Anfragen",
  kontakt: "Kontaktformular",
};

function RowBars({ rows }: { rows: { label: string; count: number }[] }) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <div className="stat-rows">
      {rows.map((r) => (
        <div key={r.label} className="stat-row">
          <span className="stat-row-label">{r.label}</span>
          <span className="stat-row-track">
            <span className="stat-row-bar" style={{ width: `${(r.count / max) * 100}%` }} />
          </span>
          <span className="tabular stat-row-count">{r.count}</span>
        </div>
      ))}
    </div>
  );
}

export default async function AdminStatistik() {
  const sb = adminClient();
  if (!sb) {
    return (
      <div>
        <h1 className="heading-lg mb-40">Statistik</h1>
        <p className="body-copy">Datenbank nicht verbunden.</p>
      </div>
    );
  }

  const seit180 = new Date();
  seit180.setMonth(seit180.getMonth() - 5);
  seit180.setDate(1);
  const seit90 = new Date(Date.now() - 90 * 24 * 3600 * 1000).toISOString();

  const [orders, inquiries, produkte] = await Promise.all([
    sb.from("orders").select("betrag_cents, status, created_at, product_id"),
    sb.from("inquiries").select("typ, created_at, product_id").gte("created_at", seit90),
    sb.from("products").select("id, name"),
  ]);

  const alleOrders = orders.data ?? [];
  const alleAnfragen = inquiries.data ?? [];
  const produktName = new Map((produkte.data ?? []).map((p) => [p.id, p.name]));

  // ——— Bestellwert pro Monat (letzte 6 Monate, ohne stornierte) ———
  const monate: { key: string; label: string; cents: number; anzahl: number }[] = [];
  const cursor = new Date(seit180);
  for (let i = 0; i < 6; i++) {
    monate.push({
      key: `${cursor.getFullYear()}-${cursor.getMonth()}`,
      label: `${MONATE[cursor.getMonth()]} ${String(cursor.getFullYear()).slice(2)}`,
      cents: 0,
      anzahl: 0,
    });
    cursor.setMonth(cursor.getMonth() + 1);
  }
  for (const o of alleOrders) {
    if (o.status === "storniert") continue;
    const d = new Date(o.created_at);
    const eintrag = monate.find((m) => m.key === `${d.getFullYear()}-${d.getMonth()}`);
    if (eintrag) {
      eintrag.cents += o.betrag_cents ?? 0;
      eintrag.anzahl += 1;
    }
  }
  const maxCents = Math.max(1, ...monate.map((m) => m.cents));
  const hatUmsatz = monate.some((m) => m.cents > 0);

  // ——— Bestellungen nach Status ———
  const statusRows = Object.entries(ORDER_STATUS_LABEL)
    .map(([status, label]) => ({
      label,
      count: alleOrders.filter((o) => o.status === status).length,
    }))
    .filter((r) => r.count > 0);

  // ——— Anfragen nach Typ (90 Tage) ———
  const typRows = Object.entries(TYP_LABEL)
    .map(([typ, label]) => ({
      label,
      count: alleAnfragen.filter((a) => a.typ === typ).length,
    }))
    .filter((r) => r.count > 0);

  // ——— Gefragteste Möbelstücke (Bestellungen + Anfragen) ———
  const interesse = new Map<string, number>();
  for (const o of alleOrders) {
    if (o.product_id) interesse.set(o.product_id, (interesse.get(o.product_id) ?? 0) + 1);
  }
  for (const a of alleAnfragen) {
    if (a.product_id) interesse.set(a.product_id, (interesse.get(a.product_id) ?? 0) + 1);
  }
  const topRows = [...interesse.entries()]
    .map(([id, count]) => ({ label: produktName.get(id) ?? "Gelöschtes Produkt", count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  // ——— SVG-Balkendiagramm: Bestellwert pro Monat ———
  const W = 640;
  const H = 240;
  const padX = 8;
  const padTop = 34;
  const padBottom = 32;
  const bandW = (W - padX * 2) / monate.length;
  const barW = Math.min(72, bandW - 24);

  return (
    <div>
      <h1 className="heading-lg mb-40">Statistik</h1>

      <div className="stat-block">
        <h2 className="label" style={{ marginBottom: 18 }}>
          Bestellwert pro Monat — letzte 6 Monate (ohne stornierte)
        </h2>
        {hatUmsatz ? (
          <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label="Balkendiagramm: Bestellwert pro Monat der letzten sechs Monate"
            style={{ width: "100%", maxWidth: 760, display: "block" }}
          >
            {monate.map((m, i) => {
              const h = Math.round(((H - padTop - padBottom) * m.cents) / maxCents);
              const x = padX + i * bandW + (bandW - barW) / 2;
              const y = H - padBottom - h;
              return (
                <g key={m.key}>
                  <rect x={x} y={y} width={barW} height={h} fill="#26231D">
                    <title>{`${m.label}: ${formatCents(m.cents)} aus ${m.anzahl} Bestellung(en)`}</title>
                  </rect>
                  {m.cents > 0 ? (
                    <text
                      x={x + barW / 2}
                      y={y - 8}
                      textAnchor="middle"
                      fontSize="12"
                      fill="#3B3831"
                      fontFamily="inherit"
                    >
                      {formatCents(m.cents)}
                    </text>
                  ) : null}
                  <text
                    x={x + barW / 2}
                    y={H - padBottom + 20}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#5C574C"
                    fontFamily="inherit"
                  >
                    {m.label}
                  </text>
                </g>
              );
            })}
            <line x1={padX} y1={H - padBottom} x2={W - padX} y2={H - padBottom} stroke="#26231D" strokeWidth="1" />
          </svg>
        ) : (
          <p className="caption meta" style={{ textTransform: "none", letterSpacing: 0 }}>
            Noch keine Bestellungen in den letzten 6 Monaten.
          </p>
        )}
      </div>

      <div className="admin-cols" style={{ marginTop: 56 }}>
        <div className="stat-block">
          <h2 className="label" style={{ marginBottom: 18 }}>Bestellungen nach Status</h2>
          {statusRows.length ? (
            <RowBars rows={statusRows} />
          ) : (
            <p className="caption meta" style={{ textTransform: "none", letterSpacing: 0 }}>Noch keine Bestellungen.</p>
          )}
        </div>
        <div className="stat-block">
          <h2 className="label" style={{ marginBottom: 18 }}>Anfragen nach Art — letzte 90 Tage</h2>
          {typRows.length ? (
            <RowBars rows={typRows} />
          ) : (
            <p className="caption meta" style={{ textTransform: "none", letterSpacing: 0 }}>Noch keine Anfragen.</p>
          )}
        </div>
      </div>

      <div className="stat-block" style={{ marginTop: 56, maxWidth: 640 }}>
        <h2 className="label" style={{ marginBottom: 18 }}>
          Gefragteste Möbelstücke (Bestellungen + Anfragen)
        </h2>
        {topRows.length ? (
          <RowBars rows={topRows} />
        ) : (
          <p className="caption meta" style={{ textTransform: "none", letterSpacing: 0 }}>
            Sobald Bestellungen und Anfragen eingehen, erscheint hier die Rangliste.
          </p>
        )}
      </div>
    </div>
  );
}
