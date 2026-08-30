import { NextResponse } from "next/server";
import { adminConfigured, checkPassword, createSession } from "@/lib/adminAuth";

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: "Admin-Login ist noch nicht eingerichtet (ADMIN_PASSWORD fehlt in den Umgebungsvariablen)." },
      { status: 503 }
    );
  }
  const body = await req.json().catch(() => ({}));
  const password = typeof body.password === "string" ? body.password : "";
  if (!checkPassword(password)) {
    return NextResponse.json({ error: "Falsches Passwort." }, { status: 401 });
  }
  await createSession();
  return NextResponse.json({ ok: true });
}
