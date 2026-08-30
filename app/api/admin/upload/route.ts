import { NextResponse } from "next/server";
import { apiAdminAuthorized } from "@/lib/adminAuth";
import { adminClient } from "@/lib/supabase";
import { randomUUID } from "crypto";

const ERLAUBT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};
const MAX_BYTES = 10 * 1024 * 1024;

export async function POST(req: Request) {
  if (!(await apiAdminAuthorized())) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }
  const sb = adminClient();
  if (!sb) {
    return NextResponse.json({ error: "Datenbank nicht konfiguriert." }, { status: 503 });
  }
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Keine Datei übermittelt." }, { status: 400 });
  }
  const ext = ERLAUBT[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Nur JPG, PNG, WebP oder AVIF erlaubt." },
      { status: 400 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "Datei größer als 10 MB." }, { status: 400 });
  }
  const path = `produkte/${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await sb.storage
    .from("produkte")
    .upload(path, buffer, { contentType: file.type, upsert: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const { data } = sb.storage.from("produkte").getPublicUrl(path);
  return NextResponse.json({ ok: true, url: data.publicUrl });
}
