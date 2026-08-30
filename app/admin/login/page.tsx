"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Anmeldung fehlgeschlagen.");
      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Anmeldung fehlgeschlagen.");
      setBusy(false);
    }
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 480 }}>
        <span className="eyebrow">Living4Fans</span>
        <h1 className="heading-display mb-68">Admin</h1>
        <form className="form-grid" onSubmit={submit}>
          <div className="form-field">
            <label className="label" htmlFor="admin-pw">
              Passwort
            </label>
            <input
              id="admin-pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
            />
          </div>
          {error ? (
            <p className="caption" style={{ color: "#8a2b1d", textTransform: "none", letterSpacing: 0 }} role="alert">
              {error}
            </p>
          ) : null}
          <div>
            <button type="submit" className="btn-filled" disabled={busy}>
              {busy ? "Wird geprüft …" : "Anmelden"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
