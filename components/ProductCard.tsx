"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product, tField } from "@/lib/products";
import { useLang } from "@/context/LanguageContext";

export default function ProductCard({ product }: { product: Product }) {
  const { t, lang } = useLang();
  const en = lang === "en";
  const defIdx = Math.max(0, product.colors.findIndex((c) => c.key === product.defaultColorKey));
  const [colorIdx, setColorIdx] = useState(defIdx);
  const color = product.colors[colorIdx];

  // Visuel de carte : image dédiée (ex. duo = 2 gourdes), sinon le coloris sélectionné
  const cardImg = product.cardImage || color.images[0];
  const interactiveColors = !product.noColor && !product.cardImage && product.colors.length > 1;

  // Badge : priorité au badge du coloris (ex. Best seller ocre), sinon badge produit
  const badge = color.badge || product.badge;
  const badgeStyle = color.badge ? color.badgeStyle : product.badgeStyle;

  const href = `/nos-equipements/${product.slug}`;

  return (
    <div className={`group flex flex-col ${product.highlight ? "rounded-[1.6rem] bg-gradient-to-b from-lime/15 to-transparent p-2 ring-1 ring-lime/40" : ""}`}>
      <Link href={href} className="relative aspect-square overflow-hidden rounded-xl2 bg-sable shadow-card">
        <Image
          src={cardImg}
          alt={tField(product.name, lang)}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
        {product.madeInFrance && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-encre shadow-sm">
            <Image src="/assets/logos/flag-fr.svg" alt="" width={16} height={11} className="h-3 w-auto" />
            Made in France
          </span>
        )}
        {badge && (
          <span
            className="absolute right-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold shadow-sm"
            style={{ background: badgeStyle?.bg || "#A8D05D", color: badgeStyle?.text || "#13302A" }}
          >
            {tField(badge, lang)}
          </span>
        )}
      </Link>

      <div className="mt-4">
        <Link href={href} className="font-semibold text-encre hover:text-foret">
          {tField(product.name, lang)}
        </Link>

        {/* Ligne secondaire discrète — style Décathlon */}
        {(product.tagline || product.volume) && (
          <p className="mt-0.5 text-xs font-normal text-encre/50">
            {product.tagline ? tField(product.tagline, lang) : ""}
            {product.tagline && product.volume ? " · " : ""}
            {product.volume || ""}
          </p>
        )}

        {(() => {
          const d = (product as any).discount || 0;
          const dp = d > 0 ? product.price * (1 - d / 100) : product.price;
          return (
            <p className="mt-1 text-sm text-encre/60">
              {t.shop.from}{" "}
              {d > 0 ? (
                <><span className="font-semibold text-terre">{dp.toFixed(2)} €</span>{" "}<span className="line-through">{product.price.toFixed(2)} €</span></>
              ) : (<span className="font-semibold text-encre">{product.price.toFixed(2)} €</span>)}
            </p>
          );
        })()}
      </div>

      {/* Les 4 coloris, directement sur la ligne produit */}
      {interactiveColors && (
        <div className="mt-3 flex items-center gap-2">
          {product.colors.map((c, i) => (
            <button
              key={c.key}
              onClick={() => setColorIdx(i)}
              aria-label={tField(c.name, lang)}
              title={tField(c.name, lang)}
              className={`h-5 w-5 rounded-full border transition-transform ${i === colorIdx ? "scale-110 ring-2 ring-foret ring-offset-1" : "border-black/10"}`}
              style={{ background: c.hex }}
            />
          ))}
        </div>
      )}

      {/* Duo : teaser coloris + incitation à personnaliser */}
      {product.cardImage && !product.noColor && (
        <Link href={href} className="mt-3 flex items-center gap-2">
          <span className="flex items-center gap-1">
            {product.colors.map((c) => (
              <span key={c.key} className="h-4 w-4 rounded-full border border-black/10" style={{ background: c.hex }} />
            ))}
          </span>
          <span className="text-xs font-semibold text-emeraude">{en ? "2 colours to choose" : "2 coloris au choix"}</span>
        </Link>
      )}
    </div>
  );
}
