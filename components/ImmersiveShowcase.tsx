"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/context/LanguageContext";

type Slide = { img: string; slug: string; line: string; colorFr: string; colorEn: string; hex: string };

const slides: Slide[] = [
  { img: "/assets/sexy/gourde-terre.jpg", slug: "ace-gourde", line: "Ace Gourde", colorFr: "Ocre Terre Battue", colorEn: "Clay Ochre", hex: "#B5603A" },
  { img: "/assets/sexy/gourde-turquoise.jpg", slug: "ace-gourde", line: "Ace Gourde", colorFr: "Turquoise", colorEn: "Turquoise", hex: "#19A7A0" },
  { img: "/assets/sexy/gourde-bleu.jpg", slug: "ace-gourde", line: "Ace Gourde", colorFr: "Bleu Nuit", colorEn: "Night Blue", hex: "#0D1B3D" },
  { img: "/assets/sexy/gourde-lavande.jpg", slug: "ace-gourde", line: "Ace Gourde", colorFr: "Lavande", colorEn: "Lavender", hex: "#B9A6D6" },
  { img: "/assets/sexy/vibe-lavande.jpg", slug: "ace-vibe", line: "Ace Vibe", colorFr: "Lavande", colorEn: "Lavender", hex: "#B9A6D6" },
  { img: "/assets/sexy/vibe-terre.jpg", slug: "ace-vibe", line: "Ace Vibe", colorFr: "Ocre Terre Battue", colorEn: "Clay Ochre", hex: "#B5603A" },
  { img: "/assets/sexy/vibe-turquoise.jpg", slug: "ace-vibe", line: "Ace Vibe", colorFr: "Turquoise", colorEn: "Turquoise", hex: "#19A7A0" },
  { img: "/assets/sexy/vibe-bleu.jpg", slug: "ace-vibe", line: "Ace Vibe", colorFr: "Bleu Nuit", colorEn: "Night Blue", hex: "#0D1B3D" },
];

export default function ImmersiveShowcase() {
  const { lang } = useLang();
  const en = lang === "en";
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = (i: number, smooth = true) => {
    const n = (i + slides.length) % slides.length;
    const track = trackRef.current;
    if (track) track.scrollTo({ left: track.clientWidth * n, behavior: smooth ? "smooth" : "auto" });
    setIdx(n);
  };
  const onScroll = () => { const track = trackRef.current; if (track) setIdx(Math.round(track.scrollLeft / track.clientWidth)); };

  // Défilement automatique toutes les 6 secondes
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => goTo(idx + 1), 6000);
    return () => clearInterval(t);
  }, [idx, paused]);

  return (
    <section className="bg-encre py-16 text-sable md:py-24">
      <div className="container-x">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="eyebrow text-lime">{en ? "The Ace range" : "La gamme Ace"}</span>
            <h2 className="h-display mt-3 text-3xl leading-tight md:text-4xl">
              {en ? "Premium gear, born from recycled balls" : "Des équipements premium, nés de balles recyclées"}
            </h2>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button onClick={() => goTo(idx - 1)} aria-label={en ? "Previous" : "Précédent"} className="grid h-11 w-11 place-items-center rounded-full border border-sable/25 text-sable transition hover:bg-sable hover:text-encre">←</button>
            <button onClick={() => goTo(idx + 1)} aria-label={en ? "Next" : "Suivant"} className="grid h-11 w-11 place-items-center rounded-full border border-sable/25 text-sable transition hover:bg-sable hover:text-encre">→</button>
          </div>
        </div>

        <div
          ref={trackRef}
          onScroll={onScroll}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((s, i) => (
            <div key={i} className="w-full shrink-0 snap-center px-0.5">
              <div className="overflow-hidden rounded-[1.75rem] bg-sable shadow-soft">
                <div className="relative aspect-[16/10] w-full md:aspect-[16/8]">
                  <Image src={s.img} alt={`${s.line} — ${en ? s.colorEn : s.colorFr}`} fill sizes="(max-width:768px) 100vw, 1100px" className="object-contain" priority={i === 0} />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-encre/10 bg-white/60 px-5 py-3.5 md:px-7">
                  <div className="flex items-center gap-2.5">
                    <span className="h-5 w-5 rounded-full border border-black/10" style={{ background: s.hex }} />
                    <span className="font-display text-base text-encre md:text-lg" style={{ fontWeight: 800 }}>{s.line}</span>
                    <span className="text-sm text-encre/50">{en ? s.colorEn : s.colorFr}</span>
                  </div>
                  <Link href={`/nos-equipements/${s.slug}`} className="btn-primary px-5 py-2 text-sm">{en ? "Discover" : "Découvrir"}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`${en ? "Slide" : "Visuel"} ${i + 1}`} className={`h-2.5 rounded-full transition-all ${i === idx ? "w-7 bg-lime" : "w-2.5 bg-sable/30"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
