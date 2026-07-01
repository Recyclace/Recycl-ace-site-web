import { supabase } from "@/lib/supabaseClient";

/** Enregistre une demande dans Supabase si configuré, sinon mode démo (succès simulé). */
export async function submitLead(table: "club_requests" | "contacts", payload: Record<string, unknown>) {
  if (!supabase) {
    await new Promise((r) => setTimeout(r, 600)); // simulation
    console.info("[démo] lead non envoyé (Supabase non configuré):", table, payload);
    return { ok: true, demo: true };
  }
  const { error } = await supabase.from(table).insert(payload);
  return { ok: !error, demo: false, error: error?.message };
}
