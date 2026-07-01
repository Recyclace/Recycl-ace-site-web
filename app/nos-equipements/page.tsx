"use client";
import { products } from "@/lib/products";
import { useLang } from "@/context/LanguageContext";
import ProductCard from "@/components/ProductCard";

export default function ShopPage() {
  const { t, lang } = useLang();
  const en = lang === "en";
  return (
    <div className="container-x py-14 md:py-20">
      <header className="mb-12 max-w-2xl">
        <h1 className="h-display text-4xl text-encre md:text-5xl">{t.shop.title}</h1>
        <p className="mt-4 text-lg text-encre/60">
          {en
            ? "The entire Ace range is made locally from recycled materials, and designed for committed players who want to bring circularity to sport."
            : "L'ensemble de la gamme Ace est fabriquée localement à partir de matériaux recyclés, et pensée pour les joueurs engagés qui veulent instaurer une circularité dans le sport."}
        </p>
        <p className="mt-3 font-display text-lg text-emeraude" style={{ fontWeight: 700 }}>
          {en ? "The ball is in your court!" : "La balle est dans votre camp !"}
        </p>
      </header>
      <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
