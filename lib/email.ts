import { submitLead } from "@/lib/leads";

/**
 * Envoie le formulaire par e-mail via Web3Forms (vers recyclace@gmail.com),
 * et l'enregistre dans Supabase si configuré. Sans clé, mode démo (succès simulé).
 * Clé à renseigner : NEXT_PUBLIC_WEB3FORMS_KEY (gratuite sur web3forms.com).
 */
export async function sendForm(
  table: "club_requests" | "contacts",
  fields: Record<string, string>,
  subject: string
) {
  // 1) stockage Supabase (best-effort)
  submitLead(table, fields).catch(() => {});

  // 2) e-mail Web3Forms
  const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!key) {
    await new Promise((r) => setTimeout(r, 500));
    console.info("[démo] e-mail non envoyé (NEXT_PUBLIC_WEB3FORMS_KEY manquante)", subject, fields);
    return { ok: true, demo: true };
  }
  const fd = new FormData();
  fd.append("access_key", key);
  fd.append("subject", subject);
  fd.append("from_name", "Site Recycl'ace");
  if (fields.email) fd.append("replyto", fields.email);
  Object.entries(fields).forEach(([k, v]) => fd.append(k, v));
  try {
    const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: fd });
    const data = await res.json();
    return { ok: Boolean(data.success), demo: false };
  } catch {
    return { ok: false, demo: false };
  }
}
