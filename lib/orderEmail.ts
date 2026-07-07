import { adminDb } from "@/lib/adminServer";

const COUNTRY: Record<string, string> = { FR: "France", BE: "Belgique", LU: "Luxembourg", CH: "Suisse", DE: "Allemagne", ES: "Espagne", IT: "Italie" };

// Envoi de l'e-mail de confirmation + facture simple via Resend (API REST, pas de dépendance).
export async function sendOrderEmail(order: any) {
  const key = process.env.RESEND_API_KEY;
  if (!key) { console.info("[email] RESEND_API_KEY manquante, e-mail non envoyé"); return; }
  const from = process.env.RESEND_FROM || "Recycl'ace <onboarding@resend.dev>";

  let inv: any = {};
  try { const db = adminDb(); if (db) { const { data } = await db.from("admin_config").select("invoice").eq("id", 1).maybeSingle(); inv = data?.invoice || {}; } } catch {}

  const items: any[] = Array.isArray(order.items) ? order.items : [];
  const rows = items.map((it) => `<tr><td style="padding:6px 10px;border-bottom:1px solid #eee">${it.name}${it.color ? " — " + it.color : ""}</td><td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:center">${it.qty}</td><td style="padding:6px 10px;border-bottom:1px solid #eee;text-align:right">${(it.price * it.qty).toFixed(2)} €</td></tr>`).join("");
  const d1 = new Date(); d1.setDate(d1.getDate() + 7); const d2 = new Date(); d2.setDate(d2.getDate() + 10);
  const fmt = (d: Date) => d.toLocaleDateString("fr-FR");
  const addr = [order.address, `${order.postal_code || ""} ${order.city || ""}`.trim(), COUNTRY[order.country] || order.country].filter(Boolean).join(", ");

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#13302A">
    <h2 style="color:#1F4A38">Merci pour votre commande ${order.first_name || ""} !</h2>
    <p>Votre commande <strong>${order.order_number}</strong> a bien été confirmée.</p>
    <h3 style="color:#0F6B5B;margin-bottom:4px">Récapitulatif</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <thead><tr style="background:#f4f7f2"><th style="padding:6px 10px;text-align:left">Équipement</th><th style="padding:6px 10px">Qté</th><th style="padding:6px 10px;text-align:right">Total</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <p style="text-align:right;margin:6px 0">Sous-total : ${Number(order.subtotal).toFixed(2)} €<br/>
    Livraison : ${Number(order.shipping).toFixed(2)} €${Number(order.discount) > 0 ? `<br/>Réduction : -${Number(order.discount).toFixed(2)} €` : ""}<br/>
    <strong style="font-size:16px">Total : ${Number(order.total).toFixed(2)} €</strong></p>
    <h3 style="color:#0F6B5B;margin-bottom:4px">Facture</h3>
    <p style="font-size:13px;color:#555">
      ${inv.raison_sociale || "Recycl'ace & Sports"} — ${inv.address || "8 rue Jadin, 75017 Paris"}<br/>
      SIREN ${inv.siren || "933 433 989"} · TVA ${inv.tva || "FR55933433989"}<br/>
      N° de commande : ${order.order_number} · Date : ${fmt(new Date(order.created_at || Date.now()))}<br/>
      Livré à : ${addr}
    </p>
    <p><strong>Livraison estimée : entre le ${fmt(d1)} et le ${fmt(d2)}.</strong></p>
    <p>Toute l'équipe Recycl'ace vous remercie chaleureusement pour votre achat et votre engagement 🌱</p>
    <p style="font-size:13px;color:#555">Une question ? Écrivez-nous à <a href="mailto:${inv.email || "recyclace@gmail.com"}">${inv.email || "recyclace@gmail.com"}</a>.</p>
  </div>`;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [order.email], bcc: ["recyclace@gmail.com"], subject: `Recycl'ace — Confirmation de commande ${order.order_number}`, html }),
    });
  } catch (e) { console.error("[email] échec envoi", e); }
}
