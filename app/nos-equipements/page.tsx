"use client";
import Image from "next/image";
import Link from "next/link";
import { useCatalog } from "@/lib/catalog";
import { useLang } from "@/context/LanguageContext";
import ProductCard from "@/components/ProductCard";
import Reviews from "@/components/Reviews";

export default function ShopPage() {
  const { t, lang } = useLang();
  const en = lang === "en";
  const { list } = useCatalog();
  const duo = list.find((p) => p.id === "ace-gourde-pack-duo");

  return (
    <>
      <div className="container-x py-14 md:py-20">
        <header className="mb-10 max-w-2xl">
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
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>

        {/* Mise en avant — Composez votre duo */}
        {duo && (
          <Link
            href={`/nos-equipements/${duo.slug}`}
            className="group mt-16 grid items-center gap-6 overflow-hidden rounded-[1.75rem] bg-foret p-6 text-sable shadow-soft md:grid-cols-[1fr_1.1fr] md:p-10"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sable md:aspect-[5/4]">
              <Image src="/assets/produits/duo-hero.jpg" alt={en ? "Build your duo" : "Composez votre duo"} fill sizes="(max-width:768px) 90vw, 45vw" className="object-contain transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded-full bg-terre px-3 py-1 text-[11px] font-bold text-white">{en ? "Build it" : "Composez-le"}</span>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[.18em] text-lime">{en ? "Make it yours" : "Personnalisez"}</span>
              <h2 className="h-display mt-2 text-3xl md:text-4xl">{en ? "Build your duo" : "Composez votre duo"}</h2>
              <p className="mt-3 max-w-md text-sable/80">
                {en
                  ? "Two Ace bottles, two colours chosen freely. Treat yourself and a partner — or offer the perfect eco gift."
                  : "Deux gourdes Ace, deux coloris choisis librement. Faites-vous plaisir à deux — ou offrez le cadeau éco idéal."}
              </p>
              <div className="mt-4 flex items-center gap-2">
                {duo.colors.map((c) => <span key={c.key} className="h-6 w-6 rounded-full border-2 border-sable/40" style={{ background: c.hex }} />)}
                <span className="ml-1 text-sm font-semibold text-lime">{en ? "4 colours · 2 to pick" : "4 coloris · 2 à choisir"}</span>
              </div>
              <span className="btn-accent mt-6 inline-flex">{en ? "Compose my duo" : "Je compose mon duo"}</span>
            </div>
          </Link>
        )}
      </div>
      <Reviews />
    </>
  );
}
