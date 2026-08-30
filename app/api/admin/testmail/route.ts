import { NextResponse } from "next/server";
import { apiAdminAuthorized } from "@/lib/adminAuth";
import { getSettings } from "@/lib/shop";
import { mailConfigured, sendeBenachrichtigung } from "@/lib/mail";

export async function POST() {
  if (!(await apiAdminAuthorized())) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }
  if (!mailConfigured()) {
    return NextResponse.json(
      { error: "RESEND_API_KEY ist nicht hinterlegt." },
      { status: 503 }
    );
  }
  const settings = await getSettings();
  const ok = await sendeBenachrichtigung(
    settings.mailEmpfaenger,
    "Test — Living4Fans Shop-Benachrichtigungen",
    "Diese Test-Mail bestätigt: Die Benachrichtigungen des Living4Fans-Shops sind korrekt eingerichtet.\n\nAdmin: https://living4fans.vercel.app/admin"
  );
  if (!ok) {
    return NextResponse.json(
      { error: "Versand fehlgeschlagen — API-Key oder Absender prüfen (bei unverifizierter Domain erlaubt Resend nur die eigene Kontoadresse als Empfänger)." },
      { status: 500 }
    );
  }
  return NextResponse.json({ ok: true, an: settings.mailEmpfaenger });
}
