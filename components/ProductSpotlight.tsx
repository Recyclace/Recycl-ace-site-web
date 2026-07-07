"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useLang } from "@/context/LanguageContext";

type Feat = { icon: string; fill?: boolean; perf?: boolean; fr: string; en: string };
type Slide = { slug: string; img: string; eyebrowFr: string; eyebrowEn: string; titleFr: string; titleEn: string; feats: Feat[] };

const IC = {
  leaf: "M11 20A7 7 0 0 1 4 13C4 8 8 4 20 4c0 12-4 16-9 16Z M8 16c2-4 5-6 9-7",
  shield: "M12 3l7 3v5c0 4.6-3.1 7.7-7 9-3.9-1.3-7-4.4-7-9V6z M9.5 12l1.8 1.8L15 10",
  comfort: "M4 11V8.5A2.5 2.5 0 0 1 6.5 6h11A2.5 2.5 0 0 1 20 8.5V11 M3 11a2 2 0 0 1 2 2v3h14v-3a2 2 0 0 1 2-2 M6 16v2 M18 16v2",
  bolt: "M13 3 4 14h6l-1 7 9-11h-6z",
  target: "M20 4 13 11 M20 9.5V4h-5.5 M12 3.2a8.8 8.8 0 1 0 8.8 8.8 M12 7.5a4.5 4.5 0 1 0 4.5 4.5",
};

const slides: Slide[] = [
  {
    slug: "ace-gourde", img: "/assets/produits/gourde-terre-1.jpg",
    eyebrowFr: "Ace Gourde", eyebrowEn: "Ace Gourde",
    titleFr: "La première gourde faite à partir de balles de tennis !",
    titleEn: "The first bottle made from tennis balls!",
    feats: [
      { icon: IC.leaf, fr: "100 % éco-conçue, fabriquée localement en France.", en: "100% eco-designed, made locally in France." },
      { icon: IC.shield, perf: true, fr: "Revêtement anti-choc fabriqué à partir de balles recyclées, qui augmente drastiquement la durée de vie de la gourde.", en: "Shock-absorbing coating made from recycled balls, drastically extending the bottle's lifespan." },
      { icon: IC.comfort, fr: "Forme de grip qui assure une meilleure prise en main et un vrai confort d'utilisation, notamment pendant l'effort sportif.", en: "Grip-shaped design for a better hold and real comfort of use, especially during intense effort." },
    ],
  },
  {
    slug: "ace-vibe", img: "/assets/produits/vibe-lavande-5.jpg",
    eyebrowFr: "Ace Vibe", eyebrowEn: "Ace Vibe",
    titleFr: "Anti-vibrations et anti-émissions",
    titleEn: "Anti-vibration and anti-emission",
    feats: [
      { icon: IC.bolt, fill: true, perf: true, fr: "Absorbe efficacement les vibrations de haute fréquence et diminue le risque de blessure.", en: "Effectively absorbs high-frequency vibrations and lowers the risk of injury." },
      { icon: IC.target, perf: true, fr: "Plus de précision et de confort à chaque frappe, avec une sensation de jeu naturelle.", en: "More precision and comfort on every shot, with a natural playing feel." },
      { icon: IC.leaf, fr: "Conception durable : fabriqué en France à partir de balles de tennis et de padel recyclées.", en: "Durable design: made in France from recycled tennis and padel balls." },
    ],
  },
];

function Icon({ d, fill }: { d: string; fill?: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={fill ? "#1F4A38" : "none"} stroke="#1F4A38" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d={d} /></svg>
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
  const onScroll = () => { const track = trackRef.current; if (track) setIdx(Math.round(track.scrollLeft / track.clientWidth)); };

  return (
    <section className="bg-sable/70 py-16 md:py-24">
      <div className="container-x">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="eyebrow">{en ? "Performance & eco-design" : "Performance & éco-conception"}</span>
            <h2 className="h-display mt-3 text-2xl leading-tight text-encre md:text-4xl">
              {en ? "The first high-performance gear made from tennis balls" : "Les premiers équipements performants fabriqués à partir de balles de tennis"}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => goTo(idx - 1)} aria-label="Précédent" className="grid h-11 w-11 place-items-center rounded-full border border-foret/20 text-foret transition hover:bg-foret hover:text-white">←</button>
            <button onClick={() => goTo(idx + 1)} aria-label="Suivant" className="grid h-11 w-11 place-items-center rounded-full border border-foret/20 text-foret transition hover:bg-foret hover:text-white">→</button>
          </div>
        </div>

        <div ref={trackRef} onScroll={onScroll} className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {slides.map((s) => (
            <div key={s.slug} className="w-full shrink-0 snap-center px-0.5">
              <div className="grid items-stretch gap-4 rounded-[1.75rem] bg-white p-4 shadow-card md:grid-cols-2 md:gap-6 md:p-6">
                {/* Image produit — mise en avant, fond clair distinct du texte */}
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-sable">
                  <Image src={s.img} alt={en ? s.eyebrowEn : s.eyebrowFr} fill sizes="(max-width:768px) 90vw, 45vw" className="object-contain p-1" priority />
                </div>
                {/* Texte — fond vert sauge */}
                <div className="flex flex-col justify-center rounded-2xl bg-sauge p-6 md:p-8">
                  <span className="text-xs font-semibold uppercase tracking-[.18em] text-foret">{en ? s.eyebrowEn : s.eyebrowFr}</span>
                  <h3 className="h-display mt-3 text-2xl leading-tight text-encre md:text-3xl">{en ? s.titleEn : s.titleFr}</h3>
                  <ul className="mt-6 space-y-4">
                    {s.feats.map((f, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/80">{<Icon d={f.icon} fill={f.fill} />}</span>
                        <span className="text-sm leading-relaxed text-encre/90">
                          {f.perf && <span className="mr-1.5 rounded bg-foret/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-foret">Performance</span>}
                          {en ? f.en : f.fr}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/nos-equipements/${s.slug}`} className="btn-primary mt-8 inline-flex self-start">{en ? "Discover the product" : "Découvrir le produit"}</Link>
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
