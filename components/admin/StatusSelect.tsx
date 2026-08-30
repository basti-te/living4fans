"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StatusSelect({
  endpoint,
  id,
  value,
  options,
}: {
  endpoint: "orders" | "inquiries";
  id: string;
  value: string;
  options: { value: string; label: string }[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  return (
    <select
      value={value}
      disabled={busy}
      onChange={async (e) => {
        setBusy(true);
        await fetch(`/api/admin/${endpoint}/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: e.target.value }),
        });
        router.refresh();
        setBusy(false);
      }}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
