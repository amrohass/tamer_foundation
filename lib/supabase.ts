import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null | undefined;

/**
 * Returns the shared Supabase client, or `null` when the env vars are not
 * configured — callers must handle `null` and render a graceful fallback
 * instead of throwing (CLAUDE.md §9).
 */
export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  cached = url && anonKey ? createClient(url, anonKey) : null;
  return cached;
}
