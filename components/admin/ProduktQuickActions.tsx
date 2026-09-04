"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProduktQuickActions({
  id,
  status,
  nurAnfrage,
}: {
  id: string;
  status: string;
  nurAnfrage: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const patch = async (body: Record<string, unknown>) => {
    setBusy(true);
    await fetch(`/api/admin/products/${id}/quick`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    router.refresh();
    setBusy(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <select
        value={status}
        disabled={busy}
        onChange={(e) => patch({ status: e.target.value })}
        aria-label="Produktstatus"
      >
        <option value="aktiv">Aktiv</option>
        <option value="entwurf">Entwurf</option>
        <option value="verkauft">Verkauft</option>
      </select>
      <label
        className="caption meta"
        style={{ display: "flex", gap: 6, alignItems: "center", cursor: "pointer", textTransform: "none", letterSpacing: 0, whiteSpace: "nowrap" }}
      >
        <input
          type="checkbox"
          checked={nurAnfrage}
          disabled={busy}
          onChange={(e) => patch({ nur_anfrage: e.target.checked })}
        />
        Nur auf Anfrage
      </label>
    </div>
  );
}
