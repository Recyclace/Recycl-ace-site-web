/**
 * Envoie les formulaires (contact / clubs) : enregistrement Supabase + e-mail via Resend,
 * le tout dans la route serveur /api/contact (la clé Resend est secrète, donc côté serveur).
 */
export async function sendForm(
  table: "club_requests" | "contacts",
  fields: Record<string, string>,
  subject: string
) {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table, fields, subject }),
    });
    const data = await res.json();
    return { ok: data.ok !== false, demo: Boolean(data.demo) };
  } catch {
    return { ok: false, demo: false };
  }
}
