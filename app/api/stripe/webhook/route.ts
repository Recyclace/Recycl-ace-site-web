import { NextResponse } from "next/server";
import Stripe from "stripe";
import { adminDb } from "@/lib/adminServer";
import { sendOrderEmail } from "@/lib/orderEmail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  const whsec = process.env.STRIPE_WEBHOOK_SECRET;
  if (!key || !whsec) return NextResponse.json({ error: "stripe_not_configured" }, { status: 200 });
  const stripe = new Stripe(key);
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") || "";
  let event: Stripe.Event;
  try { event = stripe.webhooks.constructEvent(body, sig, whsec); } catch (e: any) { return NextResponse.json({ error: `webhook_signature: ${e.message}` }, { status: 400 }); }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object as Stripe.Checkout.Session;
    const m = (s.metadata || {}) as Record<string, string>;
    const db = adminDb();
    if (db) {
      let items: any[] = []; try { items = JSON.parse(m.items || "[]"); } catch {}
      const row = {
        first_name: m.first_name, last_name: m.last_name, email: m.email, phone: m.phone,
        address: m.address, postal_code: m.postal_code, city: m.city, country: m.country,
        items, subtotal: Number(m.subtotal), shipping: Number(m.shipping), discount: Number(m.discount), total: Number(m.total),
        promo_code: m.promo || null, status: "a_livrer", stripe_session: s.id,
      };
      const { data: inserted } = await db.from("orders").insert(row).select().maybeSingle();
      if (inserted) { try { await sendOrderEmail(inserted); } catch {} }
      if (m.promo) { const { data: pc } = await db.from("promo_codes").select("id, uses").eq("code", m.promo).maybeSingle(); if (pc) await db.from("promo_codes").update({ uses: (pc.uses || 0) + 1 }).eq("id", pc.id); }
    }
  }
  return NextResponse.json({ received: true });
}
