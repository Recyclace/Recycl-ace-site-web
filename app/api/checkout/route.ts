import { NextResponse } from "next/server";
import Stripe from "stripe";
import { adminDb } from "@/lib/adminServer";

type Item = { name: string; price: number; qty: number; color: string; image?: string };
type Customer = { first_name: string; last_name: string; email: string; phone: string; address: string; postal_code: string; city: string; country: string };

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: "stripe_not_configured" }, { status: 200 });

  try {
    const { items, customer, promo, lang } = (await req.json()) as { items: Item[]; customer: Customer; promo?: string; lang?: string };
    if (!items?.length) return NextResponse.json({ error: "empty_cart" }, { status: 400 });
    const req_fields: (keyof Customer)[] = ["first_name", "last_name", "email", "phone", "address", "postal_code", "city", "country"];
    for (const f of req_fields) if (!customer?.[f]?.trim()) return NextResponse.json({ error: "missing_fields" }, { status: 400 });

    // Config boutique (frais de port + pays de vente)
    const db = adminDb();
    let shippingMap: Record<string, number> = { FR: 3.99, BE: 14.99 };
    let saleCountries = ["FR", "BE"];
    if (db) { const { data } = await db.from("public_config").select("shipping, sale_countries").eq("id", 1).maybeSingle(); if (data) { shippingMap = (data.shipping as any) || shippingMap; saleCountries = (data.sale_countries as any) || saleCountries; } }
    const country = customer.country.toUpperCase();
    if (!saleCountries.includes(country)) return NextResponse.json({ error: "country_not_allowed" }, { status: 400 });

    const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
    let shipping = shippingMap[country] ?? 0;

    // Validation code promo (serveur)
    let discount = 0; let freeShip = false; let promoCode: string | null = null;
    if (promo && db) {
      const { data: pc } = await db.from("promo_codes").select("*").eq("code", promo.trim().toUpperCase()).maybeSingle();
      if (pc && pc.active && (!pc.expires_at || new Date(pc.expires_at) >= new Date()) && (!pc.max_uses || pc.uses < pc.max_uses)) {
        promoCode = pc.code;
        if (pc.kind === "percent") discount = Math.round(subtotal * pc.value) / 100;
        else if (pc.kind === "amount") discount = Math.min(pc.value, subtotal);
        else if (pc.kind === "free_shipping") freeShip = true;
      }
    }
    if (freeShip) shipping = 0;
    const total = Math.max(0, subtotal - discount + shipping);

    const stripe = new Stripe(key);
    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
    const discounts: any[] = [];
    if (discount > 0) { const coupon = await stripe.coupons.create({ amount_off: Math.round(discount * 100), currency: "eur", duration: "once", name: promoCode || "Réduction" }); discounts.push({ coupon: coupon.id }); }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: lang === "en" ? "en" : "fr",
      customer_email: customer.email,
      line_items: items.map((it) => ({ quantity: it.qty, price_data: { currency: "eur", unit_amount: Math.round(it.price * 100), product_data: { name: `${it.name}${it.color ? " — " + it.color : ""}`, images: it.image?.startsWith("http") ? [it.image] : [] } } })),
      shipping_options: shipping > 0 ? [{ shipping_rate_data: { type: "fixed_amount", fixed_amount: { amount: Math.round(shipping * 100), currency: "eur" }, display_name: "Livraison" } }] : [],
      discounts,
      metadata: {
        first_name: customer.first_name, last_name: customer.last_name, email: customer.email, phone: customer.phone,
        address: customer.address, postal_code: customer.postal_code, city: customer.city, country,
        subtotal: subtotal.toFixed(2), shipping: shipping.toFixed(2), discount: discount.toFixed(2), total: total.toFixed(2),
        promo: promoCode || "", items: JSON.stringify(items.map((it) => ({ name: it.name, color: it.color, qty: it.qty, price: it.price }))).slice(0, 490),
      },
      success_url: `${origin}/checkout/success?sid={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?annule=1`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "stripe_error" }, { status: 500 });
  }
}
