"use client";
import Image from "next/image";
import Link from "next/link";
import { useCatalog } from "@/lib/catalog";
import { useLang } from "@/context/LanguageContext";
import { tField } from "@/lib/products";
import CatalogCard from "@/components/CatalogCard";
import CatalogRow from "@/components/CatalogRow";
import Reviews from "@/components/Reviews";

export default function ShopPage() {
  const { t, lang } = useLang();
  const en = lang === "en";
  const { list } = useCatalog();

  const byId = (id: string) => list.find((p) => p.id === id);
  const gourde = byId("ace-gourde");
  const vibe = byId("ace-vibe");
  const lot = byId("ace-vibe-boite-50");
  const duo = byId("ace-gourde-pack-duo");
  const pack = byId("ace-pack");
  const euro = (n: number) => `${en ? "From" : "Dès"} ${n.toFixed(2)} €`;

  return (
    <>
      <div className="container-x py-12 md:py-16">
        <header className="mb-10 max-w-2xl">
          <h1 className="h-display text-4xl text-encre md:text-5xl">{t.shop.title}</h1>
          <p className="mt-4 text-encre/60">
            {en
              ? "The entire Ace range is made locally from recycled materials, for committed players who want to bring circularity to sport."
              : "L'ensemble de la gamme Ace est fabriquée localement à partir de matériaux recyclés, pour les joueurs engagés qui veulent instaurer une circularité dans le sport."}
          </p>
          <p className="mt-2 font-display text-emeraude" style={{ fontWeight: 700 }}>
            {en ? "The ball is in your court!" : "La balle est dans votre camp !"}
          </p>
        </header>

        {/* Ace Gourde */}
        {gourde && (
          <CatalogRow title="Ace Gourde" viewHref="/nos-equipements/ace-gourde" viewLabel={en ? "View" : "Voir"}
            chip={<span className="text-xs font-normal text-encre/50">{en ? "Made from recycled balls" : "Fait à partir de balles"} · 75 cl</span>}>
            {gourde.colors.map((c) => (
              <CatalogCard key={c.key} href={`/nos-equipements/ace-gourde?c=${c.key}`} image={c.images[0]} title={tField(c.name, lang)} price="29,95 €"
                badge={c.badge ? { label: tField(c.badge, lang), bg: c.badgeStyle?.bg || "#A8D05D", text: c.badgeStyle?.text || "#13302A" } : undefined} />
            ))}
          </CatalogRow>
        )}

        {/* Ace Vibe + Lot de 50 */}
        {vibe && (
          <CatalogRow title="Ace Vibe" viewHref="/nos-equipements/ace-vibe" viewLabel={en ? "View" : "Voir"}
            chip={<span className="rounded-full bg-emeraude px-2.5 py-0.5 text-[10px] font-bold text-white">{en ? "New" : "Nouveauté"}</span>}>
            {vibe.colors.map((c) => (
              <CatalogCard key={c.key} href={`/nos-equipements/ace-vibe?c=${c.key}`} image={c.images[0]} title={tField(c.name, lang)} price="9,99 €" />
            ))}
            {lot && (
              <CatalogCard href="/nos-equipements/ace-vibe-boite-de-50" image={lot.colors[0].images[0]} title={en ? "Box of 50" : "Lot de 50"} price={euro(lot.price)}
                badge={{ label: en ? "For clubs" : "Pour les clubs", bg: "#B49AD6", text: "#3A2B57" }} />
            )}
          </CatalogRow>
        )}

        {/* Nos packs */}
        {(duo || pack) && (
          <CatalogRow title={en ? "Our bundles" : "Nos packs"}>
            {duo && (
              <CatalogCard href="/nos-equipements/ace-gourde-pack-duo" image="/assets/produits/duo-hero.jpg" title={en ? "Build your duo" : "Composez votre duo"}
                subtitle={en ? "2 bottles · 2 colours" : "2 gourdes · 2 coloris"} price={euro(duo.price)}
                badge={{ label: en ? "Build it" : "Composez-le", bg: "#B5603A", text: "#FFFFFF" }} />
            )}
            {pack && (
              <CatalogCard href="/nos-equipements/ace-pack" image="/assets/produits/pack-terre-main.jpg" title="Pack Ace"
                subtitle={en ? "Bottle + dampener" : "Gourde + anti-vibrateur"} price={euro(pack.price)} />
            )}
          </CatalogRow>
        )}

        {/* Mise en avant « Composez votre duo » */}
        {duo && (
          <Link href="/nos-equipements/ace-gourde-pack-duo" className="group mt-4 grid items-center gap-6 overflow-hidden rounded-[1.75rem] border border-foret/10 bg-gradient-to-br from-sauge/25 via-sable to-lime/15 p-5 md:grid-cols-[1.05fr_1.1fr] md:p-8">
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-sable">
              <Image src="/assets/produits/duo-hero.jpg" alt={en ? "Build your duo" : "Composez votre duo"} fill sizes="(max-width:768px) 90vw, 45vw" className="object-contain transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute left-3 top-3 rounded-full bg-terre px-3 py-1 text-[11px] font-bold text-white">{en ? "Build it" : "Composez-le"}</span>
            </div>
            <div>
              <span className="eyebrow">{en ? "Make it yours" : "Personnalisez"}</span>
              <h2 className="h-display mt-2 text-3xl text-encre md:text-4xl">{en ? "Build your duo" : "Composez votre duo"}</h2>
              <p className="mt-3 max-w-md text-encre/70">
                {en ? "The perfect gift for your favourite duo! Pick your favourite colours." : "Le cadeau idéal pour votre duo préféré ! Choisissez vos couleurs préférées."}
              </p>
              <div className="mt-4 flex items-center gap-2">
                {duo.colors.map((c) => <span key={c.key} className="h-6 w-6 rounded-full border-2 border-white shadow-sm" style={{ background: c.hex }} />)}
                <span className="ml-1 text-sm font-semibold text-foret">{en ? "4 colours · 2 to pick" : "4 coloris · 2 à choisir"}</span>
              </div>
              <span className="btn-primary mt-6 inline-flex">{en ? "Compose my duo" : "Je compose mon duo"}</span>
            </div>
          </Link>
        )}
      </div>
      <Reviews />
    </>
  );
}
