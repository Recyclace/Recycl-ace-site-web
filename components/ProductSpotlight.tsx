"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useLang } from "@/context/LanguageContext";

type Feat = { icon: string; perf?: boolean; fr: string; en: string };
type Slide = {
  slug: string; img: string; eyebrowFr: string; eyebrowEn: string;
  titleFr: string; titleEn: string; feats: Feat[];
};

// Jeu d'icônes distinctes
const IC = {
  leaf: "M11 20A7 7 0 0 1 4 13C4 8 8 4 20 4c0 12-4 16-9 16Z M8 16c2-4 5-6 9-7",
  shield: "M12 3l7 3v5c0 4.6-3.1 7.7-7 9-3.9-1.3-7-4.4-7-9V6z M9.5 12l1.8 1.8L15 10",
  grip: "M12 2v6 M9 4.5v4 M15 4.5v4 M6 9a3 3 0 0 0-1 5l3 4a5 5 0 0 0 4 2 6 6 0 0 0 6-6V8a1.6 1.6 0 0 0-3 0",
  waves: "M12 3v18 M7 7c-2.5 2.5-2.5 7.5 0 10 M17 7c2.5 2.5 2.5 7.5 0 10 M3 9.5c-1.4 1.4-1.4 3.6 0 5 M21 9.5c1.4 1.4 1.4 3.6 0 5",
  target: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z M12 12h.01",
  cycle: "M3 12a9 9 0 0 1 15-6.7L21 8 M21 3v5h-5 M21 12a9 9 0 0 1-15 6.7L3 16 M3 21v-5h5",
};

const slides: Slide[] = [
  {
    slug: "ace-gourde",
    img: "/assets/produits/gourde-bleu-1.jpg",
    eyebrowFr: "Ace Gourde", eyebrowEn: "Ace Gourde",
    titleFr: "La première gourde faite à partir de balles de tennis !",
    titleEn: "The first bottle made from tennis balls!",
    feats: [
      { icon: IC.leaf, fr: "100 % éco-conçue, fabriquée localement en France.", en: "100% eco-designed, made locally in France." },
      { icon: IC.shield, perf: true, fr: "Revêtement anti-choc fabriqué à partir de balles recyclées, qui augmente drastiquement la durée de vie de la gourde.", en: "Shock-absorbing coating made from recycled balls, drastically extending the bottle's lifespan." },
      { icon: IC.grip, perf: true, fr: "Forme de grip qui assure une meilleure prise en main et une adhérence accrue, notamment pendant l'effort sportif.", en: "Grip-shaped design for a better hold and enhanced adherence, especially during intense effort." },
    ],
  },
  {
    slug: "ace-vibe",
    img: "/assets/produits/vibe-bleu-5.jpg",
    eyebrowFr: "Ace Vibe", eyebrowEn: "Ace Vibe",
    titleFr: "Anti-vibrations et anti-émissions",
    titleEn: "Anti-vibration and anti-emission",
    feats: [
      { icon: IC.waves, perf: true, fr: "Absorbe efficacement les vibrations de haute fréquence et diminue le risque de blessure.", en: "Effectively absorbs high-frequency vibrations and lowers the risk of injury." },
      { icon: IC.target, perf: true, fr: "Plus de confort et de précision à chaque frappe, avec une sensation de jeu naturelle.", en: "More comfort and precision on every shot, with a natural playing feel." },
      { icon: IC.cycle, fr: "Conception durable : fabriqué en France à partir de balles de tennis et de padel recyclées.", en: "Durable design: made in France from recycled tennis and padel balls." },
    ],
  },
];

function Icon({ d }: { d: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F6B5B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
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
          <div className="max-w-2xl">
            <span className="eyebrow">{en ? "Performance & eco-design" : "Performance & éco-conception"}</span>
            <h2 className="h-display mt-3 text-2xl leading-tight text-encre md:text-4xl">
              {en ? "The only high-performance gear made from tennis balls" : "Les seuls équipements performants fabriqués à partir de balles de tennis"}
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
              <div className="grid items-center gap-8 rounded-[1.75rem] bg-white p-6 shadow-card md:grid-cols-2 md:p-10">
                {/* Image ronde */}
                <div className="mx-auto w-full max-w-sm">
                  <div className="relative">
                    <div className="absolute -inset-3 -z-10 rounded-full bg-lime/25 blur-2xl" />
                    <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-full bg-sable ring-1 ring-foret/10">
                      <Image src={s.img} alt={en ? s.eyebrowEn : s.eyebrowFr} fill sizes="(max-width:768px) 80vw, 40vw" className="object-cover" />
                    </div>
                  </div>
                </div>
                <div>
                  <span className="eyebrow">{en ? s.eyebrowEn : s.eyebrowFr}</span>
                  <h3 className="h-display mt-3 text-2xl leading-tight text-encre md:text-3xl">{en ? s.titleEn : s.titleFr}</h3>
                  <ul className="mt-6 space-y-4">
                    {s.feats.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-foret/8">{<Icon d={f.icon} />}</span>
                        <span className="pt-1 text-sm leading-relaxed text-encre/80">
                          {f.perf && <span className="mr-1.5 rounded bg-emeraude/12 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emeraude">Performance</span>}
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
