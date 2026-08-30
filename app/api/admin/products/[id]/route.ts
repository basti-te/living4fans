import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { apiAdminAuthorized } from "@/lib/adminAuth";
import { adminClient } from "@/lib/supabase";
import { productPayload, syncImages, revalidateShop } from "../../produktHelfer";

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
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Ungültige Daten." }, { status: 400 });

  const { row, photos, error } = productPayload(body);
  if (error) return NextResponse.json({ error }, { status: 400 });

  const { data, error: dbError } = await sb
    .from("products")
    .update(row!)
    .eq("id", id)
    .select("id, slug")
    .single();
  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 400 });
  }
  await syncImages(sb, id, photos);
  revalidateShop(revalidatePath, data.slug);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: Request,
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
  const { error } = await sb.from("products").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  revalidateShop(revalidatePath);
  return NextResponse.json({ ok: true });
}
