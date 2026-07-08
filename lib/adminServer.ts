import { createClient, SupabaseClient } from "@supabase/supabase-js";
import crypto from "crypto";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://efugddifeqyvhbrtefid.supabase.co";
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ENV_CODE = process.env.ADMIN_CODE || process.env.NEXT_PUBLIC_ADMIN_CODE || "recyclace2026";
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || SERVICE || "ra-change-me-secret";
const SESSION_MS = 1000 * 60 * 60 * 12; // 12 h

export const hasService = Boolean(SERVICE);
export function adminDb(): SupabaseClient | null {
  return SERVICE ? createClient(URL, SERVICE) : null;
}

/** Vérifie le code admin contre la base (si dispo), sinon la variable d'env / défaut. */
export async function checkCode(code: string | null): Promise<boolean> {
  if (!code) return false;
  const db = adminDb();
  if (db) {
    const { data } = await db.from("admin_config").select("admin_code").eq("id", 1).maybeSingle();
    if (data?.admin_code) return code === data.admin_code;
  }
  return code === ENV_CODE;
}

/** Jeton de session signé (HMAC) — stocké dans un cookie httpOnly. */
export function createSessionToken(): string {
  const exp = String(Date.now() + SESSION_MS);
  const sig = crypto.createHmac("sha256", SESSION_SECRET).update(exp).digest("hex");
  return `${exp}.${sig}`;
}
function verifyToken(token?: string | null): boolean {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  const expected = crypto.createHmac("sha256", SESSION_SECRET).update(exp).digest("hex");
  try {
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  } catch { return false; }
  return Number(exp) > Date.now();
}

export const SESSION_COOKIE = "ra_session";
/** Autorise l'accès admin : cookie de session valide (prioritaire), sinon code admin (compat). */
export async function checkSession(req: Request): Promise<boolean> {
  const cookie = req.headers.get("cookie") || "";
  const m = /(?:^|;\s*)ra_session=([^;]+)/.exec(cookie);
  if (verifyToken(m?.[1])) return true;
  return checkCode(req.headers.get("x-admin-code"));
}
