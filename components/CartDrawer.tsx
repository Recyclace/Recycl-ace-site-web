"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";
import { FREE_SHIPPING_THRESHOLD, remainingForFreeShipping } from "@/lib/shipping";

export default function CartDrawer() {
  const { items, isOpen, close, subtotal, remove, setQty, count } = useCart();
  const { t, lang } = useLang();
  const en = lang === "en";
  const remaining = remainingForFreeShipping(subtotal);
  const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const freeReached = remaining <= 0;


  return (
    <>
      {/* Overlay */}
      <div
        onClick={close}
        className={`fixed inset-0 z-50 bg-encre/40 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!isOpen}
      />
      {/* Drawer */}
      <aside
        role="dialog"
        aria-label={t.cart.title}
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-sable shadow-soft transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-foret/10 px-5 py-4">
          <h2 className="font-display text-lg text-encre" style={{ fontWeight: 800 }}>
            {t.cart.title} {count > 0 && <span className="text-emeraude">({count})</span>}
          </h2>
          <button onClick={close} aria-label="Fermer" className="rounded-full p-2 hover:bg-foret/5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-encre/60">{t.cart.empty}</p>
            <Link href="/nos-equipements" onClick={close} className="btn-accent">
              {t.cart.emptyCta}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {items.map((it) => (
                <div key={it.key} className="flex gap-3 rounded-xl2 bg-white p-3 shadow-card">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-sable">
                    <Image src={it.image} alt={it.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-encre">{it.name}</p>
                      <button onClick={() => remove(it.key)} aria-label={t.cart.remove} className="text-encre/40 hover:text-terre">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" /></svg>
                      </button>
                    </div>
                    <span className="mt-0.5 flex items-center gap-1.5 text-xs text-encre/50">
                      {it.colorHex && <span className="inline-block h-3 w-3 rounded-full border border-black/10" style={{ background: it.colorHex }} />}
                      {it.color}
                      {it.productId === "ace-gourde-pack-duo" && <span className="rounded bg-foret/10 px-1.5 py-0.5 text-[10px] font-bold text-foret">×2 {en ? "bottles" : "gourdes"}</span>}
                    </span>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-foret/15">
                        <button onClick={() => setQty(it.key, it.qty - 1)} className="px-2.5 py-1 text-foret">−</button>
                        <span className="min-w-6 text-center text-sm">{it.qty}</span>
                        <button onClick={() => setQty(it.key, it.qty + 1)} className="px-2.5 py-1 text-foret">+</button>
                      </div>
                      <span className="text-sm font-bold text-encre">{(it.price * it.qty).toFixed(2)} €</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-foret/10 px-5 py-5">
              {/* Jauge livraison offerte */}
              <div className="mb-4 rounded-xl bg-foret/[0.05] p-3">
                <div className="flex items-center justify-between gap-2 text-xs font-medium text-encre/70">
                  <span>
                    {freeReached
                      ? (en ? "🎉 You've unlocked free shipping!" : "🎉 Livraison offerte débloquée !")
                      : (en ? <>Add <b className="text-foret">{remaining.toFixed(2)} €</b> for free shipping</> : <>Plus que <b className="text-foret">{remaining.toFixed(2)} €</b> pour la livraison offerte</>)}
                  </span>
                  <span className={`shrink-0 ${freeReached ? "text-emeraude" : "text-encre/40"}`} aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4h13v11H1z" /><path d="M14 8h4l3 3v4h-7" /><circle cx="6" cy="18" r="2" /><circle cx="17.5" cy="18" r="2" /></svg>
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-foret/10">
                  <div className={`h-full rounded-full transition-all duration-500 ${freeReached ? "bg-emeraude" : "bg-lime"}`} style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-encre/60">{t.cart.subtotal}</span>
                <span className="font-display text-xl text-encre" style={{ fontWeight: 800 }}>{subtotal.toFixed(2)} €</span>
              </div>
              <Link href="/checkout" onClick={close} className="btn-primary block w-full text-center">{t.cart.checkout}</Link>
              <button onClick={close} className="btn-ghost mt-2 w-full">{t.cart.continue}</button>
              <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-encre/45">
                <span className="inline-flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                  {en ? "Secure payment" : "Paiement sécurisé"}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M1 4h13v11H1z" /><path d="M14 8h4l3 3v4h-7" /><circle cx="6" cy="18" r="2" /><circle cx="17.5" cy="18" r="2" /></svg>
                  {en ? "Delivery across France" : "Livraison partout en France"}
                </span>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
