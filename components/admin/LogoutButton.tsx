"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      className="caption meta"
      style={{ background: "none", border: 0, padding: 0, cursor: "pointer", textAlign: "left" }}
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.replace("/admin/login");
        router.refresh();
      }}
    >
      Abmelden
    </button>
  );
}
