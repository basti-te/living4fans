import { PRODUCTS, type Product } from "./products";
import { publicClient, adminClient, supabaseConfigured } from "./supabase";

export type Groesse = "klein" | "mittel" | "gross";

/**
 * Ein Shop-Produkt: das bestehende Render-Modell (SVG-Illustration) plus die
 * Handels-Felder aus der Datenbank (Logistik-Matrix, Fotos, Status).
 */
export type ShopProduct = Product & {
  id: string | null;
  groesse: Groesse;
  /** true = kein Festpreis, nur „Angebot anfragen" (VB / individuelle Konfiguration) */
  aufAnfrage: boolean;
  /** true = Preis wird angezeigt, aber Verkauf läuft ausschließlich über Anfrage (kein Kaufen-Button) */
  nurAnfrage: boolean;
  /** true = Produktbilder sind KI-generiert/-inszeniert → Kennzeichnung (Art. 50 EU AI Act) */
  kiBilder: boolean;
  /** Versandkosten-Override in Cent (klein) bzw. Lieferpauschale (mittel); null = Standard aus Einstellungen */
  versandkosten: number | null;
  farbwahl: boolean;
  photos: string[];
  status: "aktiv" | "entwurf" | "verkauft";
};

export type ShopSettings = {
  paketversandCents: number;
  lieferpauschaleCents: number;
  radiusKm: number;
  grossSchwelleCents: number;
  plzZentrum: string;
  zahlungStripe: boolean;
  zahlungVorkasse: boolean;
  zahlungPaypal: boolean;
  bankKontoinhaber: string;
  bankIban: string;
  paypalEmpfaenger: string;
  mailEmpfaenger: string;
  mailBeiBestellung: boolean;
  mailBeiAnfrage: boolean;
};

export const DEFAULT_SETTINGS: ShopSettings = {
  paketversandCents: 4900,
  lieferpauschaleCents: 14900,
  radiusKm: 100,
  grossSchwelleCents: 250000,
  plzZentrum: "49439",
  zahlungStripe: true,
  zahlungVorkasse: true,
  zahlungPaypal: true,
  bankKontoinhaber: "Alesja Schonhöft",
  bankIban: "",
  paypalEmpfaenger: "living4fans@web.de",
  mailEmpfaenger: "living4fans@web.de",
  mailBeiBestellung: true,
  mailBeiAnfrage: true,
};

export const GROESSE_LABELS: Record<Groesse, string> = {
  klein: "Klein — Paketversand (Hermes), fertig montiert, deutschlandweit",
  mittel: "Mittel — Auslieferung per Anhänger im Umkreis, sonst auf Anfrage",
  gross: "Groß — Lieferung + Aufbau vor Ort, immer auf Anfrage",
};

/** Entscheidet serverseitig wie clientseitig einheitlich, ob ein Stück nur auf Anfrage geht. */
export function istAnfrageOnly(p: ShopProduct, s: ShopSettings): boolean {
  return (
    p.aufAnfrage ||
    p.nurAnfrage ||
    p.groesse === "gross" ||
    Math.round(p.price * 100) >= s.grossSchwelleCents
  );
}

export function versandCentsFuer(p: ShopProduct, s: ShopSettings): number {
  if (p.versandkosten != null) return p.versandkosten;
  return p.groesse === "klein" ? s.paketversandCents : s.lieferpauschaleCents;
}

/* ——— Mapping DB-Zeile → ShopProduct ——— */

type Row = {
  id: string;
  slug: string;
  name: string;
  kategorie: string;
  kategorie_label: string;
  teaser: string | null;
  beschreibung: string | null;
  masse: string | null;
  details: string[] | null;
  render: Record<string, unknown> | null;
  preis_cents: number | null;
  groesse: Groesse;
  versandkosten_cents: number | null;
  farbwahl: boolean;
  nur_anfrage?: boolean;
  ki_bilder?: boolean;
  status: "aktiv" | "entwurf" | "verkauft";
  sort: number;
  product_images?: { url: string; sort: number }[];
};

function mapRow(r: Row): ShopProduct {
  const render = (r.render ?? {}) as Partial<Product>;
  const photos = (r.product_images ?? [])
    .slice()
    .sort((a, b) => a.sort - b.sort)
    .map((i) => i.url);
  return {
    slug: r.slug,
    name: r.name,
    signature: render.signature,
    ort: render.ort,
    image: render.image ?? photos[0],
    category: r.kategorie,
    categoryLabel: r.kategorie_label,
    grid: render.grid ?? [],
    cellW: render.cellW ?? 150,
    cellH: render.cellH ?? 74,
    dimensions: r.masse ?? "",
    price: (r.preis_cents ?? 0) / 100,
    defaultColor: render.defaultColor ?? "enzianblau",
    wall: render.wall ?? "light",
    teaser: r.teaser ?? "",
    description: r.beschreibung ?? "",
    details: r.details ?? [],
    id: r.id,
    groesse: r.groesse,
    aufAnfrage: r.preis_cents == null,
    nurAnfrage: Boolean(r.nur_anfrage),
    kiBilder: Boolean(r.ki_bilder),
    versandkosten: r.versandkosten_cents,
    farbwahl: r.farbwahl,
    photos,
    status: r.status,
  };
}

/* ——— Statischer Fallback (solange keine Datenbank verbunden ist) ——— */

function fallbackGroesse(p: Product): Groesse {
  if (p.price >= 2500) return "gross";
  if (p.price >= 1000) return "mittel";
  return "klein";
}

function mapStatic(p: Product): ShopProduct {
  return {
    ...p,
    id: null,
    groesse: fallbackGroesse(p),
    aufAnfrage: false,
    nurAnfrage: false,
    kiBilder: false,
    versandkosten: null,
    farbwahl: true,
    photos: [],
    status: "aktiv",
  };
}

/* ——— Abfragen ——— */

const SELECT = "*, product_images(url, sort)";

export async function getShopProducts(): Promise<ShopProduct[]> {
  if (!supabaseConfigured) return PRODUCTS.map(mapStatic);
  const sb = publicClient();
  if (!sb) return PRODUCTS.map(mapStatic);
  const { data, error } = await sb
    .from("products")
    .select(SELECT)
    .eq("status", "aktiv")
    .order("sort", { ascending: true })
    .order("created_at", { ascending: false });
  if (error || !data) return PRODUCTS.map(mapStatic);
  return (data as Row[]).map(mapRow);
}

export async function getShopProduct(slug: string): Promise<ShopProduct | null> {
  if (!supabaseConfigured) {
    const p = PRODUCTS.find((x) => x.slug === slug);
    return p ? mapStatic(p) : null;
  }
  const sb = publicClient();
  if (!sb) return null;
  const { data } = await sb
    .from("products")
    .select(SELECT)
    .eq("slug", slug)
    .eq("status", "aktiv")
    .maybeSingle();
  return data ? mapRow(data as Row) : null;
}

/** Alle Produkte inkl. Entwürfe — nur für den Admin-Bereich (Service-Role). */
export async function getAllProductsAdmin(): Promise<ShopProduct[]> {
  const sb = adminClient();
  if (!sb) return [];
  const { data } = await sb
    .from("products")
    .select(SELECT)
    .order("status", { ascending: true })
    .order("sort", { ascending: true })
    .order("created_at", { ascending: false });
  return ((data as Row[]) ?? []).map(mapRow);
}

export async function getProductAdmin(id: string): Promise<ShopProduct | null> {
  const sb = adminClient();
  if (!sb) return null;
  const { data } = await sb.from("products").select(SELECT).eq("id", id).maybeSingle();
  return data ? mapRow(data as Row) : null;
}

export async function getSettings(): Promise<ShopSettings> {
  const sb = publicClient();
  if (!sb) return DEFAULT_SETTINGS;
  const { data } = await sb.from("settings").select("key, value");
  if (!data) return DEFAULT_SETTINGS;
  const map = Object.fromEntries(data.map((r) => [r.key, r.value]));
  const bool = (v: unknown, fallback: boolean) =>
    v === undefined || v === null ? fallback : v === true || v === "true";
  return {
    paketversandCents: Number(map.paketversand_cents ?? DEFAULT_SETTINGS.paketversandCents),
    lieferpauschaleCents: Number(map.lieferpauschale_cents ?? DEFAULT_SETTINGS.lieferpauschaleCents),
    radiusKm: Number(map.radius_km ?? DEFAULT_SETTINGS.radiusKm),
    grossSchwelleCents: Number(map.gross_schwelle_cents ?? DEFAULT_SETTINGS.grossSchwelleCents),
    plzZentrum: String(map.plz_zentrum ?? DEFAULT_SETTINGS.plzZentrum),
    zahlungStripe: bool(map.zahlung_stripe, DEFAULT_SETTINGS.zahlungStripe),
    zahlungVorkasse: bool(map.zahlung_vorkasse, DEFAULT_SETTINGS.zahlungVorkasse),
    zahlungPaypal: bool(map.zahlung_paypal, DEFAULT_SETTINGS.zahlungPaypal),
    bankKontoinhaber: String(map.bank_kontoinhaber ?? DEFAULT_SETTINGS.bankKontoinhaber),
    bankIban: String(map.bank_iban ?? DEFAULT_SETTINGS.bankIban),
    paypalEmpfaenger: String(map.paypal_empfaenger ?? DEFAULT_SETTINGS.paypalEmpfaenger),
    mailEmpfaenger: String(map.mail_empfaenger ?? DEFAULT_SETTINGS.mailEmpfaenger),
    mailBeiBestellung: bool(map.mail_bei_bestellung, DEFAULT_SETTINGS.mailBeiBestellung),
    mailBeiAnfrage: bool(map.mail_bei_anfrage, DEFAULT_SETTINGS.mailBeiAnfrage),
  };
}

export function formatCents(cents: number): string {
  return `${(cents / 100).toLocaleString("de-DE", { minimumFractionDigits: 0 })} €`;
}
