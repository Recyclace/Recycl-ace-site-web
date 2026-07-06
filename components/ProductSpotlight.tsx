"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useLang } from "@/context/LanguageContext";

type Feat = { perf?: boolean; fr: string; en: string };
type Slide = {
  slug: string; img: string; eyebrowFr: string; eyebrowEn: string;
  titleFr: string; titleEn: string; feats: Feat[];
};

const slides: Slide[] = [
  {
    slug: "ace-gourde",
    img: "/assets/produits/gourde-turquoise-3.jpg",
    eyebrowFr: "Ace Gourde", eyebrowEn: "Ace Gourde",
    titleFr: "La première gourde faite à partir de balles de tennis !",
    titleEn: "The first bottle made from tennis balls!",
    feats: [
      { fr: "100 % éco-conçue, fabriquée localement en France.", en: "100% eco-designed, made locally in France." },
      { perf: true, fr: "Revêtement anti-choc fabriqué à partir de balles recyclées, qui augmente drastiquement la durée de vie de la gourde.", en: "Shock-absorbing coating made from recycled balls, drastically extending the bottle's lifespan." },
      { perf: true, fr: "Forme de grip qui assure une meilleure prise en main et une adhérence accrue, notamment pendant l'effort sportif.", en: "Grip-shaped design for a better hold and enhanced adherence, especially during intense effort." },
      { fr: "Fabrication locale et circuits courts.", en: "Local manufacturing and short supply chains." },
    ],
  },
  {
    slug: "ace-vibe",
    img: "/assets/produits/vibe-turquoise-1.jpg",
    eyebrowFr: "Ace Vibe", eyebrowEn: "Ace Vibe",
    titleFr: "Anti-vibrations et anti-émissions",
    titleEn: "Anti-vibration and anti-emission",
    feats: [
      { perf: true, fr: "Absorbe efficacement les vibrations de haute fréquence et diminue le risque de blessure.", en: "Effectively absorbs high-frequency vibrations and lowers the risk of injury." },
      { perf: true, fr: "Plus de confort et de précision à chaque frappe, avec une sensation de jeu naturelle.", en: "More comfort and precision on every shot, with a natural playing feel." },
      { fr: "Conception durable : fabriqué en France à partir de balles de tennis et de padel recyclées.", en: "Durable design: made in France from recycled tennis and padel balls." },
    ],
  },
  {
    slug: "ace-pack",
    img: "/assets/photos/gourde-box.jpg",
    eyebrowFr: "Ace Pack", eyebrowEn: "Ace Pack",
    titleFr: "L'équipement complet du joueur éco-responsable",
    titleEn: "The complete kit for the eco-responsible player",
    feats: [
      { perf: true, fr: "La Ace Gourde et une boîte d'Ace Vibe réunies : performance et confort de jeu.", en: "The Ace Gourde and a box of Ace Vibe together: performance and playing comfort." },
      { fr: "Matières issues de balles recyclées, Made in France.", en: "Materials from recycled balls, Made in France." },
    ],
  },
];

function Icon({ perf }: { perf?: boolean }) {
  return perf ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F6B5B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M13 2 3 14h7l-1 8 10-12h-7z" /></svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F6B5B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M11 20A7 7 0 0 1 4 13C4 8 8 4 20 4c0 12-4 16-9 16Z" /><path d="M8 16c2-4 5-6 9-7" /></svg>
  );
}

export default function ProductSpotlight() {
  const { lang } = useLang();
  const en = lang === "en";
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  const goTo = (i: number) => {
    const n = (i + slides.length) % slides.length;
    setIdx(n);
    const track = trackRef.current;
    if (track) track.scrollTo({ left: track.clientWidth * n, behavior: "smooth" });
  };
  const onScroll = () => {
    const track = trackRef.current;
    if (track) setIdx(Math.round(track.scrollLeft / track.clientWidth));
  };

  return (
    <section className="bg-sable/70 py-16 md:py-24">
      <div className="container-x">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="eyebrow">{en ? "Performance & eco-design" : "Performance & éco-conception"}</span>
            <h2 className="h-display mt-3 text-3xl text-encre md:text-4xl">{en ? "Product by product" : "Produit par produit"}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => goTo(idx - 1)} aria-label="Précédent" className="grid h-11 w-11 place-items-center rounded-full border border-foret/20 text-foret transition hover:bg-foret hover:text-white">←</button>
            <button onClick={() => goTo(idx + 1)} aria-label="Suivant" className="grid h-11 w-11 place-items-center rounded-full border border-foret/20 text-foret transition hover:bg-foret hover:text-white">→</button>
          </div>
        </div>

        <div ref={trackRef} onScroll={onScroll} className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {slides.map((s) => (
            <div key={s.slug} className="w-full shrink-0 snap-center px-0.5">
              <div className="grid items-center gap-8 rounded-[1.75rem] bg-white p-6 shadow-card md:grid-cols-2 md:p-10">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl2 bg-sable sm:aspect-square">
                  <Image src={s.img} alt={en ? s.eyebrowEn : s.eyebrowFr} fill sizes="(max-width:768px) 100vw, 45vw" className="object-cover" />
                </div>
                <div>
                  <span className="eyebrow">{en ? s.eyebrowEn : s.eyebrowFr}</span>
                  <h3 className="h-display mt-3 text-2xl leading-tight text-encre md:text-3xl">{en ? s.titleEn : s.titleFr}</h3>
                  <ul className="mt-6 space-y-4">
                    {s.feats.map((f, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-foret/8">{<Icon perf={f.perf} />}</span>
                        <span className="text-sm leading-relaxed text-encre/80">
                          {f.perf && <span className="mr-1.5 rounded bg-emeraude/12 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emeraude">{en ? "Performance" : "Performance"}</span>}
                          {en ? f.en : f.fr}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/nos-equipements/${s.slug}`} className="btn-primary mt-8 inline-flex">{en ? "Discover the product" : "Découvrir le produit"}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} className={`h-2.5 rounded-full transition-all ${i === idx ? "w-7 bg-foret" : "w-2.5 bg-foret/25"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
