"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";

const COLORS = [
  { key: "terre", fr: "Terre Battue", en: "Clay", hex: "#B5603A" },
  { key: "turquoise", fr: "Turquoise", en: "Turquoise", hex: "#19A7A0" },
  { key: "bleu", fr: "Bleu Nuit", en: "Night Blue", hex: "#0D1B3D" },
  { key: "lavande", fr: "Lavande", en: "Lavender", hex: "#B9A6D6" },
];

const ITEMS = [
  { id: "gourde", slug: "ace-gourde", name: "Ace Gourde", prefix: "gourde" },
  { id: "vibe", slug: "ace-vibe", name: "Ace Vibe", prefix: "vibe" },
];

export default function ImmersiveShowcase() {
  const { lang } = useLang();
  const en = lang === "en";
  const [item, setItem] = useState(0);
  const [colorKey, setColorKey] = useState<Record<number, string>>({ 0: "terre", 1: "terre" });
  const [paused, setPaused] = useState(false);

  // Défilement automatique toutes les 6 s entre les 2 produits
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setItem((i) => (i + 1) % ITEMS.length), 6000);
    return () => clearInterval(t);
  }, [paused, item]);

  const cur = ITEMS[item];
  const ck = colorKey[item] || "terre";
  const img = `/assets/sexy/${cur.prefix}-${ck}.jpg`;

  return (
    <section
      className="bg-sable py-14 md:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-x">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <span className="eyebrow">{en ? "The Ace range" : "La gamme Ace"}</span>
          <h2 className="h-display mt-3 text-2xl leading-tight text-encre md:text-4xl">
            {en ? "Durable, high-performance gear, made from recycled balls" : "Des équipements durables et performants, faits à partir de balles recyclées"}
          </h2>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* flèches */}
          <button onClick={() => setItem((i) => (i + ITEMS.length - 1) % ITEMS.length)} aria-label={en ? "Previous" : "Précédent"} className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-foret/20 bg-white/70 text-foret transition hover:bg-foret hover:text-white md:grid">←</button>
          <button onClick={() => setItem((i) => (i + 1) % ITEMS.length)} aria-label={en ? "Next" : "Suivant"} className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-foret/20 bg-white/70 text-foret transition hover:bg-foret hover:text-white md:grid">→</button>

          {/* visuel immersif (fond crème identique à l'image -> intégration transparente) */}
          <div className="relative mx-auto aspect-[16/10] w-full max-w-3xl overflow-hidden rounded-[1.75rem] md:aspect-[16/8]">
            <Image key={img} src={img} alt={`${cur.name} — ${en ? COLORS.find((c) => c.key === ck)?.en : COLORS.find((c) => c.key === ck)?.fr}`} fill sizes="(max-width:768px) 100vw, 900px" className="animate-fadeUp object-contain" priority />
          </div>

          {/* nom + pastilles + CTA */}
          <div className="mt-5 flex flex-col items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="font-display text-xl text-encre" style={{ fontWeight: 800 }}>{cur.name}</span>
              <span className="text-sm text-encre/50">{en ? COLORS.find((c) => c.key === ck)?.en : COLORS.find((c) => c.key === ck)?.fr}</span>
            </div>
            <div className="flex items-center gap-2.5">
              {COLORS.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setColorKey((p) => ({ ...p, [item]: c.key }))}
                  aria-label={en ? c.en : c.fr}
                  title={en ? c.en : c.fr}
                  className={`h-7 w-7 rounded-full border transition-transform ${ck === c.key ? "scale-110 ring-2 ring-foret ring-offset-2 ring-offset-sable" : "border-black/10 hover:scale-105"}`}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
            <Link href={`/nos-equipements/${cur.slug}?c=${ck}`} className="btn-primary mt-1">{en ? "Discover the product" : "Découvrir le produit"}</Link>
          </div>

          {/* puces produit */}
          <div className="mt-6 flex justify-center gap-2">
            {ITEMS.map((_, i) => (
              <button key={i} onClick={() => setItem(i)} aria-label={ITEMS[i].name} className={`h-2.5 rounded-full transition-all ${i === item ? "w-7 bg-foret" : "w-2.5 bg-foret/25"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
