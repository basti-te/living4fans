import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Öffentliche Supabase-Zugangsdaten (URL + anon key sind per Design öffentlich
 * und werden ohnehin an den Browser ausgeliefert). Werden nach Anlage des
 * Projekts hier bzw. über Vercel-Env gesetzt. Solange leer, läuft der Shop im
 * statischen Fallback-Modus (lib/products.ts).
 */
const FALLBACK_URL = "https://yeobzgukligagxwogyqb.supabase.co";
const FALLBACK_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inllb2J6Z3VrbGlnYWd4d29neXFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxMDAxMTMsImV4cCI6MjEwMzY3NjExM30.boz79mTp5E0IwfsOzziawSGdGcBAE8WvFIWmtGJ8MTU";

export const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL;
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_ANON_KEY;

export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/** Client mit anon key — unterliegt Row Level Security (nur aktive Produkte lesbar, Anfragen einfügbar). */
export function publicClient(): SupabaseClient | null {
  if (!supabaseConfigured) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });
}

/** Server-Client mit Service-Role-Key (umgeht RLS) — nur in API-Routen/Server-Komponenten verwenden. */
export function adminClient(): SupabaseClient | null {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !key) return null;
  return createClient(SUPABASE_URL, key, { auth: { persistSession: false } });
}
