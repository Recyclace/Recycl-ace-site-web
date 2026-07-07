import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

const LABELS: Record<string, string> = { name: "Nom", email: "E-mail", subject: "Sujet", message: "Message", club: "Club", contact: "Contact", phone: "Téléphone" };

export async function POST(req: Request) {
  try {
    const { table, fields, subject } = (await req.json()) as { table: string; fields: Record<string, string>; subject: string };
    if (!["contacts", "club_requests"].includes(table)) return NextResponse.json({ error: "bad_table" }, { status: 400 });

    // 1) Enregistrement en base (toujours)
    const { error: dbErr } = await supabase.from(table).insert(fields);

    // 2) E-mail de notification via Resend (vers recyclace@gmail.com)
    const key = process.env.RESEND_API_KEY;
    if (key) {
      const from = process.env.RESEND_FROM || "Recycl'ace <onboarding@resend.dev>";
      const rows = Object.entries(fields)
        .map(([k, v]) => `<tr><td style="padding:6px 10px;border-bottom:1px solid #eee;font-weight:600">${LABELS[k] || k}</td><td style="padding:6px 10px;border-bottom:1px solid #eee">${String(v || "").replace(/</g, "&lt;")}</td></tr>`)
        .join("");
      const html = `<div style="font-family:Arial,sans-serif;max-width:600px;color:#13302A"><h2 style="color:#1F4A38">${subject}</h2><table style="width:100%;border-collapse:collapse">${rows}</table><p style="font-size:12px;color:#888;margin-top:16px">Message reçu depuis le site recyclace.com</p></div>`;
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
          body: JSON.stringify({ from, to: ["recyclace@gmail.com"], reply_to: fields.email || undefined, subject, html }),
        });
      } catch (e) { console.error("[contact] resend échec", e); }
    }
    return NextResponse.json({ ok: !dbErr, demo: !key });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "error" }, { status: 500 });
  }
}
