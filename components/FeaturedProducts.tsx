"use client";
import Link from "next/link";
import { useCatalog } from "@/lib/catalog";
import { useLang } from "@/context/LanguageContext";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const { t } = useLang();
  const { list } = useCatalog();
  const featured = list.slice(0, 4);
  return (
    <section className="container-x py-20">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <span className="eyebrow">{t.nav.shop}</span>
          <h2 className="h-display mt-3 text-3xl text-encre md:text-4xl">{t.shop.title}</h2>
        </div>
        <Link href="/nos-equipements" className="btn-outline hidden sm:inline-flex">{t.shop.viewProduct}</Link>
      </div>
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
        {featured.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
