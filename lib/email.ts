/**
 * Envoie les formulaires (contact / clubs) : enregistrement Supabase + e-mail via Resend,
 * dans la route serveur /api/contact. `guard` transporte les protections anti-robots.
 */
export async function sendForm(
  table: "club_requests" | "contacts",
  fields: Record<string, string>,
  subject: string,
  guard?: { hp: string; ts: number }
) {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table, fields, subject, guard }),
    });
    const data = await res.json();
    return { ok: data.ok !== false, demo: Boolean(data.demo) };
  } catch {
    return { ok: false, demo: false };
  }
}
