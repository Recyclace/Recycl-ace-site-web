"use client";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";
import { useCatalog } from "@/lib/catalog";
import { tField } from "@/lib/products";

// Ordre de recommandation par produit consulté (le lot de 50 n'est jamais recommandé).
const RECO: Record<string, string[]> = {
  "ace-gourde": ["ace-vibe", "ace-pack", "ace-gourde-pack-duo"],
  "ace-vibe": ["ace-gourde", "ace-pack", "ace-gourde-pack-duo"],
  "ace-pack": ["ace-gourde", "ace-vibe", "ace-gourde-pack-duo"],
  "ace-gourde-pack-duo": ["ace-gourde", "ace-vibe", "ace-pack"],
  "ace-vibe-boite-50": ["ace-vibe", "ace-gourde", "ace-pack"],
};

export default function RelatedProducts({ currentId }: { currentId: string }) {
  const { lang } = useLang();
  const en = lang === "en";
  const { list } = useCatalog();

  const order = RECO[currentId] || ["ace-gourde", "ace-vibe", "ace-pack"];
  const byId = new Map(list.map((p) => [p.id, p]));
  let recos = order.map((id) => byId.get(id)).filter(Boolean) as typeof list;
  // Compléter si besoin (hors produit courant et hors lot de 50)
  if (recos.length < 3) {
    for (const p of list) {
      if (recos.length >= 3) break;
      if (p.id === currentId || p.id === "ace-vibe-boite-50" || recos.includes(p)) continue;
      recos.push(p);
    }
  }
  recos = recos.slice(0, 3);
  if (!recos.length) return null;

  return (
    <section className="mt-14 border-t border-foret/10 pt-10">
      <h2 className="h-display mb-6 text-xl text-encre md:text-2xl">{en ? "You may also like" : "Vous aimerez aussi"}</h2>
      <div className="grid grid-cols-3 gap-3 md:gap-5">
        {recos.map((p) => {
          const img = p.cardImage || p.colors[0].images[0];
          return (
            <Link key={p.id} href={`/nos-equipements/${p.slug}`} className="group flex flex-col">
              <div className="relative aspect-square overflow-hidden rounded-xl2 bg-sable shadow-card">
                <Image src={img} alt={tField(p.name, lang)} fill sizes="(max-width:768px) 30vw, 18vw" className="object-contain p-3 transition-transform duration-500 group-hover:scale-105" />
              </div>
              <p className="mt-2 line-clamp-1 text-xs font-semibold text-encre md:text-sm">{tField(p.name, lang)}</p>
              <p className="text-xs text-encre/60">{en ? "From" : "Dès"} {p.price.toFixed(2)} €</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
