"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product, tField } from "@/lib/products";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useProductOverride, discounted } from "@/lib/catalog";

function Lines({ text }: { text: string }) {
  const lines = text.split("\n").filter(Boolean);
  const bullets = lines.filter((l) => l.startsWith("- "));
  if (bullets.length === lines.length) {
    return (
      <ul className="list-disc space-y-1.5 pl-5 text-encre/70">
        {lines.map((l, i) => <li key={i}>{l.replace(/^- /, "")}</li>)}
      </ul>
    );
  }
  return <div className="space-y-2 text-encre/70">{lines.map((l, i) => <p key={i}>{l}</p>)}</div>;
}

function ValueIcon({ type }: { type: "ball" | "flag" | "leaf" }) {
  if (type === "flag")
    return <Image src="/assets/logos/flag-fr.svg" alt="France" width={30} height={20} className="h-6 w-auto" />;
  if (type === "ball")
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="10" fill="#A8D05D" stroke="#0F6B5B" strokeWidth="1.6" />
        <path d="M4 7 Q10 12 6 19" fill="none" stroke="#FBF8F0" strokeWidth="1.5" />
        <path d="M20 7 Q14 12 18 19" fill="none" stroke="#FBF8F0" strokeWidth="1.5" />
      </svg>
    );
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0F6B5B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M11 20A7 7 0 0 1 4 13C4 8 8 4 20 4c0 12-4 16-9 16Z" />
      <path d="M8 16c2-4 5-6 9-7" />
    </svg>
  );
}

export default function ProductDetail({ product }: { product: Product }) {
  const { t, lang } = useLang();
  const { add } = useCart();
  const en = lang === "en";
  const ov = useProductOverride(product);
  const finalPrice = discounted(ov.price, ov.discount);
  const defIdx = Math.max(0, product.colors.findIndex((c) => c.key === product.defaultColorKey));
  const [colorIdx, setColorIdx] = useState(defIdx);
  const [colorIdx2, setColorIdx2] = useState((defIdx + 1) % product.colors.length);
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState<number | null>(0);
  const [justAdded, setJustAdded] = useState(false);

  const color = ov.colors[colorIdx] || product.colors[colorIdx];
  const color2 = ov.colors[colorIdx2] || ov.colors[0] || product.colors[0];
  const selectColor = (i: number) => { setColorIdx(i); setImgIdx(0); };

  const handleAdd = () => {
    const colorLabel = product.dualColor
      ? `${tField(color.name, lang)} + ${tField(color2.name, lang)}`
      : product.noColor ? "" : tField(color.name, lang);
    add({ productId: product.id, slug: product.slug, name: tField(ov.name, lang), price: finalPrice, color: colorLabel, colorHex: color.hex, image: color.images[0] }, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const values: { type: "ball" | "flag" | "leaf"; label: string }[] = [
    { type: "ball", label: en ? "Made from recycled balls" : "Fait à partir de balles recyclées" },
    { type: "flag", label: en ? "Made in France" : "Fabrication en France" },
    { type: "leaf", label: en ? "Strongly reduced carbon footprint" : "Empreinte carbone fortement réduite" },
  ];

  return (
    <div className="container-x py-10 md:py-16">
      <Link href="/nos-equipements" className="link-underline mb-8 inline-flex items-center gap-1 text-sm font-semibold text-foret">← {t.shop.back}</Link>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Galerie */}
        <div>
          {product.dualColor ? (
            <div className="grid grid-cols-2 gap-3">
              {[color, color2].map((c, k) => (
                <div key={k} className="relative aspect-square overflow-hidden rounded-xl2 bg-white shadow-card">
                  <Image src={c.images[0]} alt={tField(c.name, lang)} fill sizes="25vw" className="object-contain p-4" />
                  <span className="absolute bottom-2 left-2 rounded-full bg-sable/90 px-2 py-0.5 text-[10px] font-semibold text-foret">{tField(c.name, lang)}</span>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="relative aspect-square overflow-hidden rounded-xl2 bg-white shadow-card">
                <Image key={color.images[imgIdx]} src={color.images[imgIdx]} alt={tField(product.name, lang)} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-contain p-6 animate-fadeUp" priority />
              </div>
              {color.images.length > 1 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {color.images.map((src, i) => (
                    <button key={src} onClick={() => setImgIdx(i)} className={`relative h-16 w-16 overflow-hidden rounded-lg bg-white ${i === imgIdx ? "ring-2 ring-foret" : "ring-1 ring-black/5"}`}>
                      <Image src={src} alt="" fill sizes="64px" className="object-contain p-1.5" />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Infos */}
        <div className="lg:pt-4">
          <span className="eyebrow">{tField(product.category, lang)}</span>
          <h1 className="h-display mt-2 text-3xl text-encre md:text-4xl">{tField(ov.name, lang)}</h1>
          <p className="mt-4 font-display text-2xl text-foret" style={{ fontWeight: 800 }}>{ov.discount > 0 ? (<>{finalPrice.toFixed(2)} € <span className="ml-2 align-middle text-lg text-encre/40 line-through">{ov.price.toFixed(2)} €</span> <span className="ml-1 align-middle rounded bg-terre/15 px-2 py-0.5 text-sm font-bold text-terre">-{ov.discount}%</span></>) : (<>{finalPrice.toFixed(2)} €</>)}</p>
          <p className="mt-6 text-encre/70">{tField(ov.description, lang)}</p>

          {!product.noColor && !product.dualColor && (
            <div className="mt-8">
              <p className="mb-2 text-sm font-semibold text-encre">{t.shop.color} : <span className="font-normal text-encre/60">{tField(color.name, lang)}</span></p>
              <div className="flex items-center gap-3">
                {product.colors.map((c, i) => (
                  <button key={c.key} onClick={() => selectColor(i)} aria-label={tField(c.name, lang)} title={tField(c.name, lang)} className={`h-9 w-9 rounded-full border transition-transform ${i === colorIdx ? "scale-110 ring-2 ring-foret ring-offset-2" : "border-black/10 hover:scale-105"}`} style={{ background: c.hex }} />
                ))}
              </div>
            </div>
          )}

          {product.dualColor && (
            <div className="mt-8 space-y-4">
              {[{ label: en ? "Bottle 1" : "Gourde 1", idx: colorIdx, set: selectColor },
                { label: en ? "Bottle 2" : "Gourde 2", idx: colorIdx2, set: (i: number) => setColorIdx2(i) }].map((row, r) => (
                <div key={r}>
                  <p className="mb-2 text-sm font-semibold text-encre">{row.label} : <span className="font-normal text-encre/60">{tField(product.colors[row.idx].name, lang)}</span></p>
                  <div className="flex items-center gap-3">
                    {product.colors.map((c, i) => (
                      <button key={c.key} onClick={() => row.set(i)} aria-label={tField(c.name, lang)} title={tField(c.name, lang)} className={`h-9 w-9 rounded-full border transition-transform ${i === row.idx ? "scale-110 ring-2 ring-foret ring-offset-2" : "border-black/10 hover:scale-105"}`} style={{ background: c.hex }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-foret/20">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="moins" className="px-4 py-2.5 text-lg text-foret">−</button>
              <span className="min-w-8 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} aria-label="plus" className="px-4 py-2.5 text-lg text-foret">+</button>
            </div>
            <button onClick={handleAdd} className="btn-primary flex-1 sm:flex-none">{justAdded ? `✓ ${t.shop.added}` : t.shop.addToCart}</button>
          </div>

          {/* 3 valeurs avec icônes percutantes */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            {values.map((v) => (
              <div key={v.label} className="flex flex-col items-center rounded-xl bg-foret/5 p-3 text-center">
                <ValueIcon type={v.type} />
                <p className="mt-2 text-[11px] font-medium leading-tight text-encre/70">{v.label}</p>
              </div>
            ))}
          </div>

          {/* Accordéons */}
          <div className="mt-10 divide-y divide-foret/10 border-t border-foret/10">
            {product.accordions.map((a, i) => (
              <div key={i}>
                <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-3 py-4 text-left">
                  <span className="text-sm font-bold uppercase tracking-wide text-emeraude">{tField(a.title, lang)}</span>
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-foret/20 text-foret">{open === i ? "−" : "+"}</span>
                </button>
                {open === i && <div className="pb-5 text-sm"><Lines text={tField(a.body, lang)} /></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
