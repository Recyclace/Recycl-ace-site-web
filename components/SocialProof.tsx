"use client";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";

type Photo = { type: "photo"; src: string; tag: string; tagEn: string };
type Quote = { type: "quote"; text: string; author: string; rating: number };
type Item = Photo | Quote;

const items: Item[] = [
  { type: "photo", src: "/assets/produits/gourde-turquoise-3.jpg", tag: "Ace Gourde", tagEn: "Ace Gourde" },
  { type: "quote", text: "Le concept et le produit nous ont tapé dans l'œil.", author: "AOBUC Tennis Club", rating: 5 },
  { type: "photo", src: "/assets/produits/vibe-turquoise-1.jpg", tag: "Ace Vibe", tagEn: "Ace Vibe" },
  { type: "quote", text: "La gourde tient parfaitement au frais toute la journée et la prise en main avec le revêtement grip est vraiment agréable. Je la prends partout avec moi !", author: "Marina D.", rating: 4.5 },
  { type: "photo", src: "/assets/produits/gourde-bleu-3.jpg", tag: "Ace Gourde", tagEn: "Ace Gourde" },
  { type: "quote", text: "Très bonnes sensations au toucher avec l'anti-vibrateur, malgré un premier a priori qui s'est très vite effacé !", author: "JP", rating: 4.5 },
  { type: "photo", src: "/assets/produits/vibe-lavande-4.jpg", tag: "Ace Vibe", tagEn: "Ace Vibe" },
  { type: "quote", text: "Concept malin et bien exécuté. Enfin une marque de sport qui prend le sujet écolo au sérieux sans rien lâcher sur la qualité.", author: "Louis", rating: 5 },
  { type: "photo", src: "/assets/produits/duo-turquoise-3.jpg", tag: "Ace Gourde", tagEn: "Ace Gourde" },
  { type: "quote", text: "Des valeurs fortes autour du développement durable.", author: "Jean T.", rating: 4.5 },
  { type: "photo", src: "/assets/produits/gourde-terre-3.jpg", tag: "Ace Gourde", tagEn: "Ace Gourde" },
];

const STAR = "M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.6 5.7 21l2.3-7.2-6-4.4h7.6z";
function MiniStars({ n }: { n: number }) {
  const pct = Math.max(0, Math.min(100, (n / 5) * 100));
  const Row = ({ f }: { f: boolean }) => (
    <span className="flex">{[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={f ? "#F2B705" : "none"} stroke="#F2B705" strokeWidth="1.6"><path d={STAR} /></svg>
    ))}</span>
  );
  return <span className="relative inline-flex"><Row f={false} /><span className="absolute left-0 top-0 overflow-hidden" style={{ width: `${pct}%` }}><Row f /></span></span>;
}

function Card({ it, en }: { it: Item; en: boolean }) {
  if (it.type === "photo")
    return (
      <div className="relative h-64 w-52 shrink-0 overflow-hidden rounded-xl2 shadow-card">
        <Image src={it.src} alt={it.tag} fill sizes="208px" className="object-cover" />
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-foret shadow-card">{en ? it.tagEn : it.tag}</span>
      </div>
    );
  return (
    <div className="flex h-64 w-72 shrink-0 flex-col justify-center rounded-xl2 bg-white p-6 shadow-card">
      <MiniStars n={it.rating} />
      <p className="mt-3 text-sm leading-relaxed text-encre/80">« {it.text} »</p>
      <p className="mt-3 text-sm font-semibold text-foret">{it.author}</p>
    </div>
  );
}

export default function SocialProof() {
  const { lang } = useLang();
  const en = lang === "en";
  const doubled = [...items, ...items];
  return (
    <section className="overflow-hidden py-16 md:py-20">
      <div className="container-x mb-8 text-center">
        <span className="eyebrow">{en ? "On the field" : "Sur le terrain"}</span>
        <h2 className="h-display mt-3 text-3xl text-encre md:text-4xl">{en ? "They've adopted the Ace range" : "Ils ont adopté la gamme Ace"}</h2>
      </div>
      <div className="group relative [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="marquee-track gap-5 pr-5 group-hover:[animation-play-state:paused]" style={{ animation: "marquee 55s linear infinite" }}>
          {doubled.map((it, i) => <Card key={i} it={it} en={en} />)}
        </div>
      </div>
    </section>
  );
}
