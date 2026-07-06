"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product, tField } from "@/lib/products";
import { useLang } from "@/context/LanguageContext";

export default function ProductCard({ product }: { product: Product }) {
  const { t, lang } = useLang();
  const defIdx = Math.max(0, product.colors.findIndex((c) => c.key === product.defaultColorKey));
  const [colorIdx, setColorIdx] = useState(defIdx);
  const color = product.colors[colorIdx];

  return (
    <div className="group flex flex-col">
      <Link href={`/nos-equipements/${product.slug}`} className="relative aspect-square overflow-hidden rounded-xl2 bg-white shadow-card">
        <Image
          src={color.images[0]}
          alt={tField(product.name, lang)}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-sable/90 px-3 py-1 text-[11px] font-semibold text-foret">
          {tField(product.category, lang)}
        </span>
        {product.badge && (
          <span
            className="absolute right-3 top-3 rounded-full px-3 py-1 text-[11px] font-bold"
            style={{ background: product.badgeStyle?.bg || "#A8D05D", color: product.badgeStyle?.text || "#13302A" }}
          >
            {tField(product.badge, lang)}
          </span>
        )}
      </Link>

      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <Link href={`/nos-equipements/${product.slug}`} className="font-semibold text-encre hover:text-foret">
            {tField(product.name, lang)}
          </Link>
          {(() => {
            const d = (product as any).discount || 0;
            const dp = d > 0 ? product.price * (1 - d / 100) : product.price;
            return (
              <p className="mt-0.5 text-sm text-encre/50">
                {t.shop.from}{" "}
                {d > 0 ? (
                  <><span className="font-semibold text-terre">{dp.toFixed(2)} €</span>{" "}<span className="line-through">{product.price.toFixed(2)} €</span></>
                ) : (<>{product.price.toFixed(2)} €</>)}
              </p>
            );
          })()}
        </div>
      </div>

      {!product.noColor && (
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
    </div>
  );
}
