import { NextResponse } from "next/server";
import Stripe from "stripe";

type Item = { name: string; price: number; qty: number; color: string; image: string };

export async function POST(req: Request) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Stripe non configuré. Ajoutez STRIPE_SECRET_KEY dans .env.local." },
      { status: 200 }
    );
  }

  try {
    const { items, lang } = (await req.json()) as { items: Item[]; lang?: string };
    if (!items?.length) return NextResponse.json({ error: "Panier vide" }, { status: 400 });

    const stripe = new Stripe(key);
    const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: lang === "en" ? "en" : "fr",
      line_items: items.map((it) => ({
        quantity: it.qty,
        price_data: {
          currency: "eur",
          unit_amount: Math.round(it.price * 100),
          product_data: {
            name: `${it.name} — ${it.color}`,
            images: it.image?.startsWith("http") ? [it.image] : [],
          },
        },
      })),
      shipping_address_collection: { allowed_countries: ["FR", "BE", "CH", "LU", "DE", "ES", "IT"] },
      success_url: `${origin}/?paiement=succes`,
      cancel_url: `${origin}/nos-equipements?paiement=annule`,
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Erreur Stripe" }, { status: 500 });
  }
}
