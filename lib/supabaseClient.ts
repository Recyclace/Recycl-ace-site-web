import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase (côté navigateur, clé anonyme).
 * Renvoie null si les variables d'environnement ne sont pas configurées,
 * afin que le site fonctionne en mode démo (données locales) sans Supabase.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = url && anon ? createClient(url, anon) : null;
export const hasSupabase = Boolean(url && anon);
