import { createClient, SupabaseClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://efugddifeqyvhbrtefid.supabase.co";
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ENV_CODE = process.env.ADMIN_CODE || process.env.NEXT_PUBLIC_ADMIN_CODE || "recyclace2026";

export const hasService = Boolean(SERVICE);
export function adminDb(): SupabaseClient | null {
  return SERVICE ? createClient(URL, SERVICE) : null;
}

/** Vérifie le code admin contre la base (si dispo), sinon contre la variable d'env / défaut. */
export async function checkCode(code: string | null): Promise<boolean> {
  if (!code) return false;
  const db = adminDb();
  if (db) {
    const { data } = await db.from("admin_config").select("admin_code").eq("id", 1).maybeSingle();
    if (data?.admin_code) return code === data.admin_code;
  }
  return code === ENV_CODE;
}
