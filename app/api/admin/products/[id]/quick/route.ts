import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { apiAdminAuthorized } from "@/lib/adminAuth";
import { adminClient } from "@/lib/supabase";

const STATI = ["aktiv", "entwurf", "verkauft"];

/** Schnell-Änderungen aus der Produktliste: Status und „Nur auf Anfrage". */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await apiAdminAuthorized())) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }
  const sb = adminClient();
  if (!sb) {
    return NextResponse.json({ error: "Datenbank nicht konfiguriert." }, { status: 503 });
  }
  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  const update: Record<string, unknown> = {};
  if (body.status !== undefined) {
    if (!STATI.includes(String(body.status))) {
      return NextResponse.json({ error: "Ungültiger Status." }, { status: 400 });
    }
    update.status = String(body.status);
  }
  if (body.nur_anfrage !== undefined) {
    update.nur_anfrage = Boolean(body.nur_anfrage);
  }
  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "Nichts zu ändern." }, { status: 400 });
  }

  const { data, error } = await sb
    .from("products")
    .update(update)
    .eq("id", id)
    .select("slug")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  revalidatePath("/shop");
  revalidatePath("/");
  if (data?.slug) revalidatePath(`/shop/${data.slug}`);
  return NextResponse.json({ ok: true });
}
