import { supabase } from "@/lib/supabaseClient";

export type SubType = "particulier" | "club";

/** Inscription newsletter (particuliers ou clubs). */
export async function subscribeNewsletter(email: string, type: SubType) {
  const clean = email.trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(clean)) return { ok: false, error: "invalid_email" };
  const { error } = await supabase.from("newsletter_subscribers").insert({ email: clean, type });
  // 23505 = doublon (déjà inscrit) → on considère l'inscription comme réussie
  if (error && !String(error.code).includes("23505")) return { ok: false, error: error.message };
  return { ok: true };
}
