"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";
import { loadShopConfig, COUNTRY_NAMES } from "@/lib/shopConfig";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const { lang } = useLang();
  const en = lang === "en";
  const [cfg, setCfg] = useState<{ shipping: Record<string, number>; saleCountries: string[] }>({ shipping: { FR: 3.99, BE: 14.99 }, saleCountries: ["FR", "BE"] });
  const [f, setF] = useState({ first_name: "", last_name: "", email: "", phone: "", address: "", postal_code: "", city: "", country: "FR", promo: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => { loadShopConfig().then((c) => { setCfg(c); setF((p) => ({ ...p, country: c.saleCountries[0] || "FR" })); }); }, []);

  const shipping = cfg.shipping[f.country] ?? 0;
  const total = subtotal + shipping;
  const set = (k: string, v: string) => setF({ ...f, [k]: v });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(""); setLoading(true);
    try {
      const res = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items, customer: f, promo: f.promo, lang }) });
      const d = await res.json();
      if (d.url) { window.location.href = d.url; return; }
      const msgs: Record<string, string> = {
        stripe_not_configured: en ? "Payment is not enabled yet (Stripe keys missing)." : "Le paiement n'est pas encore activé (clés Stripe manquantes).",
        country_not_allowed: en ? "We don't deliver to this country yet." : "Nous ne livrons pas encore dans ce pays.",
        missing_fields: en ? "Please fill in all required fields." : "Merci de remplir tous les champs obligatoires.",
        empty_cart: en ? "Your cart is empty." : "Votre panier est vide.",
      };
      setErr(msgs[d.error] || (en ? "Payment error." : "Erreur de paiement."));
    } catch { setErr(en ? "Payment error." : "Erreur de paiement."); }
    finally { setLoading(false); }
  };

  if (!items.length) return (
    <div className="container-x py-20 text-center"><p className="text-lg text-encre/60">{en ? "Your cart is empty." : "Votre panier est vide."}</p><Link href="/nos-equipements" className="btn-primary mt-6 inline-flex">{en ? "Explore our gear" : "Découvrir nos équipements"}</Link></div>
  );

  const inp = "w-full rounded-xl border border-foret/15 bg-white px-4 py-3 text-encre focus:border-emeraude focus:outline-none focus:ring-2 focus:ring-emeraude/20";
  const lab = "mb-1.5 block text-sm font-semibold text-encre";

  return (
    <div className="container-x py-12 md:py-16">
      <h1 className="h-display text-3xl text-encre md:text-4xl">{en ? "Checkout" : "Paiement"}</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={submit} className="card space-y-4 p-6 md:p-8">
          <h2 className="font-display text-lg text-encre">{en ? "Delivery details" : "Coordonnées de livraison"}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block"><span className={lab}>{en ? "First name" : "Prénom"} *</span><input required value={f.first_name} onChange={(e) => set("first_name", e.target.value)} className={inp} /></label>
            <label className="block"><span className={lab}>{en ? "Last name" : "Nom"} *</span><input required value={f.last_name} onChange={(e) => set("last_name", e.target.value)} className={inp} /></label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block"><span className={lab}>Email *</span><input required type="email" value={f.email} onChange={(e) => set("email", e.target.value)} className={inp} /></label>
            <label className="block"><span className={lab}>{en ? "Phone" : "Téléphone"} *</span><input required type="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} className={inp} /></label>
          </div>
          <label className="block"><span className={lab}>{en ? "Address (street & number)" : "Adresse (rue et numéro)"} *</span><input required value={f.address} onChange={(e) => set("address", e.target.value)} className={inp} /></label>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block"><span className={lab}>{en ? "Postal code" : "Code postal"} *</span><input required value={f.postal_code} onChange={(e) => set("postal_code", e.target.value)} className={inp} /></label>
            <label className="block"><span className={lab}>{en ? "City" : "Ville"} *</span><input required value={f.city} onChange={(e) => set("city", e.target.value)} className={inp} /></label>
            <label className="block"><span className={lab}>{en ? "Country" : "Pays"} *</span><select required value={f.country} onChange={(e) => set("country", e.target.value)} className={inp}>{cfg.saleCountries.map((c) => <option key={c} value={c}>{COUNTRY_NAMES[c] || c}</option>)}</select></label>
          </div>
          <label className="block"><span className={lab}>{en ? "Promo code (optional)" : "Code promo (facultatif)"}</span><input value={f.promo} onChange={(e) => set("promo", e.target.value.toUpperCase())} className={inp + " uppercase"} /></label>
          {err && <p className="rounded-xl bg-terre/10 p-3 text-sm text-terre">{err}</p>}
          <button disabled={loading} className="btn-primary w-full disabled:opacity-60">{loading ? "…" : (en ? "Proceed to secure payment" : "Payer en toute sécurité")}</button>
          <p className="text-center text-xs text-encre/50">{en ? "Card payment secured by Stripe. We never store your card details." : "Paiement par carte sécurisé par Stripe. Vos données bancaires ne sont jamais conservées par nos soins."}</p>
        </form>

        <div className="card h-fit space-y-4 p-6">
          <h2 className="font-display text-lg text-encre">{en ? "Your order" : "Votre commande"}</h2>
          <div className="space-y-3">{items.map((it) => (
            <div key={it.key} className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-sable"><Image src={it.image} alt={it.name} fill sizes="56px" className="object-contain p-1" /></div>
              <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-encre">{it.name}</p><p className="text-xs text-encre/50">{it.color} · ×{it.qty}</p></div>
              <p className="text-sm font-semibold text-encre">{(it.price * it.qty).toFixed(2)} €</p>
            </div>
          ))}</div>
          <div className="border-t border-foret/10 pt-4 text-sm">
            <div className="flex justify-between text-encre/70"><span>{en ? "Subtotal" : "Sous-total"}</span><span>{subtotal.toFixed(2)} €</span></div>
            <div className="mt-1 flex justify-between text-encre/70"><span>{en ? "Shipping" : "Livraison"} ({f.country})</span><span>{shipping.toFixed(2)} €</span></div>
            <div className="mt-2 flex justify-between font-display text-lg text-foret" style={{ fontWeight: 800 }}><span>Total</span><span>{total.toFixed(2)} €</span></div>
            <p className="mt-1 text-[11px] text-encre/40">{en ? "Promo code applied at payment." : "Code promo appliqué au moment du paiement."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
