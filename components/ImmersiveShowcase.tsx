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
  const [ck, setCk] = useState("terre"); // coloris partagé entre gourde et vibe
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setItem((i) => (i + 1) % ITEMS.length), 6000);
    return () => clearInterval(t);
  }, [paused, item]);

  const cur = ITEMS[item];
  const img = `/assets/sexy/${cur.prefix}-${ck}.jpg`;
  const colName = COLORS.find((c) => c.key === ck);

  return (
    <section className="bg-sable py-12 md:py-16" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container-x mb-6 text-center">
        <span className="eyebrow">{en ? "The Ace range" : "La gamme Ace"}</span>
        <h2 className="h-display mx-auto mt-3 max-w-3xl text-2xl leading-tight text-encre md:text-4xl">
          {en ? "Durable, high-performance gear, made from recycled balls." : "Des équipements durables et performants, fabriqués à partir de balles recyclées."}
        </h2>
      </div>

      {/* Visuel pleine largeur — fond crème identique au site (intégration transparente) */}
      <div className="relative w-full bg-sable">
        <button onClick={() => setItem((i) => (i + ITEMS.length - 1) % ITEMS.length)} aria-label={en ? "Previous" : "Précédent"} className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-foret/20 bg-white/70 text-foret transition hover:bg-foret hover:text-white md:grid lg:left-8">←</button>
        <button onClick={() => setItem((i) => (i + 1) % ITEMS.length)} aria-label={en ? "Next" : "Suivant"} className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-foret/20 bg-white/70 text-foret transition hover:bg-foret hover:text-white md:grid lg:right-8">→</button>
        <div className="relative h-[56vw] max-h-[78vh] w-full">
          <Image key={img} src={img} alt={`${cur.name} — ${en ? colName?.en : colName?.fr}`} fill sizes="100vw" className="animate-fadeUp object-contain" priority />
        </div>
      </div>

      {/* Nom + pastilles (petites) + CTA */}
      <div className="container-x mt-5 flex flex-col items-center gap-3">
        <div className="flex items-center gap-3">
          <span className="font-display text-xl text-encre" style={{ fontWeight: 800 }}>{cur.name}</span>
          <span className="text-sm text-encre/50">{en ? colName?.en : colName?.fr}</span>
        </div>
        <div className="flex items-center gap-2">
          {COLORS.map((c) => (
            <button key={c.key} onClick={() => setCk(c.key)} aria-label={en ? c.en : c.fr} title={en ? c.en : c.fr}
              className={`h-4 w-4 rounded-full border transition-transform ${ck === c.key ? "scale-110 ring-2 ring-foret ring-offset-1 ring-offset-sable" : "border-black/10 hover:scale-105"}`}
              style={{ background: c.hex }} />
          ))}
        </div>
        <Link href={`/nos-equipements/${cur.slug}?c=${ck}`} className="btn-primary mt-1">{en ? "Discover the product" : "Découvrir le produit"}</Link>
        <div className="mt-2 flex justify-center gap-2">
          {ITEMS.map((_, i) => (
            <button key={i} onClick={() => setItem(i)} aria-label={ITEMS[i].name} className={`h-2.5 rounded-full transition-all ${i === item ? "w-7 bg-foret" : "w-2.5 bg-foret/25"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
