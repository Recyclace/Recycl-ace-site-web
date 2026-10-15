import { NextResponse } from "next/server";
import { adminDb, checkSession } from "@/lib/adminServer";
import { sendTrackingEmail } from "@/lib/orderEmail";

export async function GET(req: Request) {
  if (!(await checkSession(req))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = adminDb();
  if (!db) return NextResponse.json({ error: "service_role_missing", orders: [] });
  const { data, error } = await db.from("orders").select("*").order("created_at", { ascending: false });
  return NextResponse.json({ orders: data || [], error: error?.message });
}

export async function POST(req: Request) {
  if (!(await checkSession(req))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = adminDb();
  if (!db) return NextResponse.json({ error: "service_role_missing" }, { status: 400 });
  const b = await req.json();
  if (b.action === "delete") { const { error } = await db.from("orders").delete().eq("id", b.id); return NextResponse.json({ ok: !error, error: error?.message }); }
  if (b.action === "status") { const { error } = await db.from("orders").update({ status: b.status }).eq("id", b.id); return NextResponse.json({ ok: !error, error: error?.message }); }

  if (b.action === "tracking") {
    const tracking = (b.tracking_number || "").toString().trim();
    const carrier = (b.carrier || "").toString().trim();
    // Garde-fou : jamais d'envoi de notification de suivi vide.
    if (b.notify && !tracking) return NextResponse.json({ ok: false, error: "tracking_empty" }, { status: 400 });

    // Enregistrement durable du numéro de suivi (indépendant du statut).
    const { error: upErr } = await db.from("orders").update({ tracking_number: tracking || null, carrier: carrier || null }).eq("id", b.id);
    if (upErr) return NextResponse.json({ ok: false, error: upErr.message }, { status: 400 });

    // Récupère la commande à jour (adresse, e-mail, tracking_sent_at…)
    const { data: order } = await db.from("orders").select("*").eq("id", b.id).maybeSingle();
    let emailed = false;
    if (b.notify && order && tracking) {
      // Anti-doublon : on n'envoie qu'une fois, sauf renvoi explicite (b.resend).
      if (order.tracking_sent_at && !b.resend) {
        return NextResponse.json({ ok: true, already_sent: true, order });
      }
      emailed = await sendTrackingEmail(order);
      if (emailed) {
        await db.from("orders").update({ tracking_sent_at: new Date().toISOString() }).eq("id", b.id);
        const { data: fresh } = await db.from("orders").select("*").eq("id", b.id).maybeSingle();
        return NextResponse.json({ ok: true, emailed: true, order: fresh });
      }
      return NextResponse.json({ ok: true, emailed: false, email_error: true, order });
    }
    return NextResponse.json({ ok: true, order });
  }

  return NextResponse.json({ error: "bad action" }, { status: 400 });
}
