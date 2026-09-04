import type { SupabaseClient } from "@supabase/supabase-js";

const GROESSEN = ["klein", "mittel", "gross"];
const STATI = ["aktiv", "entwurf", "verkauft"];

/** Validiert den Form-Body und baut die products-Zeile. */
export function productPayload(body: Record<string, unknown>): {
  row?: Record<string, unknown>;
  photos: string[];
  error?: string;
} {
  const name = String(body.name ?? "").trim();
  const slug = String(body.slug ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (!name) return { photos: [], error: "Name fehlt." };
  if (!slug) return { photos: [], error: "Slug fehlt." };
  const groesse = String(body.groesse ?? "mittel");
  const status = String(body.status ?? "entwurf");
  if (!GROESSEN.includes(groesse)) return { photos: [], error: "Ungültige Größenkategorie." };
  if (!STATI.includes(status)) return { photos: [], error: "Ungültiger Status." };

  const preis = body.preis_cents;
  const versand = body.versandkosten_cents;
  const details = Array.isArray(body.details)
    ? body.details.map((d) => String(d)).filter(Boolean)
    : [];
  const photos = Array.isArray(body.photos)
    ? body.photos.map((p) => String(p)).filter(Boolean)
    : [];

  return {
    photos,
    row: {
      slug,
      name,
      kategorie: String(body.kategorie ?? "sideboards"),
      kategorie_label: String(body.kategorie_label ?? "Sideboard"),
      teaser: String(body.teaser ?? ""),
      beschreibung: String(body.beschreibung ?? ""),
      masse: String(body.masse ?? ""),
      details,
      preis_cents:
        preis === null || preis === "" || preis === undefined
          ? null
          : Math.round(Number(preis)),
      groesse,
      versandkosten_cents:
        versand === null || versand === "" || versand === undefined
          ? null
          : Math.round(Number(versand)),
      farbwahl: Boolean(body.farbwahl ?? true),
      nur_anfrage: Boolean(body.nur_anfrage ?? false),
      status,
      sort: Number.isFinite(Number(body.sort)) ? Number(body.sort) : 100,
    },
  };
}

/** Ersetzt die Bilderliste eines Produkts (Reihenfolge = sort). */
export async function syncImages(
  sb: SupabaseClient,
  productId: string,
  photos: string[]
): Promise<void> {
  await sb.from("product_images").delete().eq("product_id", productId);
  if (photos.length) {
    await sb.from("product_images").insert(
      photos.map((url, i) => ({ product_id: productId, url, sort: i }))
    );
  }
}

export function revalidateShop(
  revalidatePath: (path: string) => void,
  slug?: string
): void {
  revalidatePath("/shop");
  revalidatePath("/");
  if (slug) revalidatePath(`/shop/${slug}`);
}
