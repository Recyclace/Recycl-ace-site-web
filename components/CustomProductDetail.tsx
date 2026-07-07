"use client";
import Image from "next/image";
import Link from "next/link";
import { useCustomProduct, discounted } from "@/lib/catalog";
import { tField } from "@/lib/products";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CustomProductDetail({ slug }: { slug: string }) {
  const { t, lang } = useLang();
  const { add } = useCart();
  const { product, loading } = useCustomProduct(slug);
  const [ci, setCi] = useState(0);
  const [added, setAdded] = useState(false);

  if (loading) return <div className="container-x py-20 text-center text-encre/40">…</div>;
  if (!product) return <div className="container-x py-20 text-center"><p className="text-encre/60">{lang === "en" ? "Product not found." : "Produit introuvable."}</p><Link href="/nos-equipements" className="btn-primary mt-6 inline-flex">{t.shop.back}</Link></div>;

  const c = product.colors[ci] || product.colors[0];
  const handleAdd = () => { add({ productId: product.id, slug: product.slug, name: tField(product.name, lang), price: product.price, color: product.noColor ? "" : tField(c.name, lang), colorHex: c.hex, image: c.images[0] }, 1); setAdded(true); setTimeout(() => setAdded(false), 1600); };

  return (
    <div className="container-x py-10 md:py-16">
      <Link href="/nos-equipements" className="link-underline mb-8 inline-flex items-center gap-1 text-sm font-semibold text-foret">← {t.shop.back}</Link>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-xl2 bg-white shadow-card">
          <Image src={c.images[0]} alt={tField(product.name, lang)} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-contain p-6" priority />
        </div>
        <div className="lg:pt-4">
          {product.category.fr && <span className="eyebrow">{tField(product.category, lang)}</span>}
          <h1 className="h-display mt-2 text-3xl text-encre md:text-4xl">{tField(product.name, lang)}</h1>
          <p className="mt-4 font-display text-2xl text-foret" style={{ fontWeight: 800 }}>{product.price.toFixed(2)} €</p>
          <p className="mt-6 whitespace-pre-line text-encre/70">{tField(product.description, lang)}</p>
          {!product.noColor && product.colors.length > 1 && (
            <div className="mt-8 flex items-center gap-3">
              {product.colors.map((col, i) => (
                <button key={i} onClick={() => setCi(i)} aria-label={tField(col.name, lang)} title={tField(col.name, lang)} className={`h-9 w-9 rounded-full border transition-transform ${i === ci ? "scale-110 ring-2 ring-foret ring-offset-2" : "border-black/10 hover:scale-105"}`} style={{ background: col.hex }} />
              ))}
            </div>
          )}
          <button onClick={handleAdd} className="btn-primary mt-8">{added ? `✓ ${t.shop.added}` : t.shop.addToCart}</button>
        </div>
      </div>
    </div>
  );
}
