"use client";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export default function HomeEquipements() {
  const { lang } = useLang();
  const en = lang === "en";
  const points = en
    ? ["Performance first", "Gear made from recycled balls", "Iconic designs"]
    : ["La performance avant tout", "Des équipements faits à partir de balles recyclées", "Des designs iconiques"];
  return (
    <section className="container-x py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        {/* Image premium */}
        <div className="relative">
          <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-lime/20 blur-2xl" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-white shadow-soft sm:aspect-square">
            <Image src="/assets/produits/equipements-full.jpg" alt="Gamme Ace" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
        {/* Texte */}
        <div>
          <span className="eyebrow">{en ? "Our gear" : "Nos équipements"}</span>
          <h2 className="h-display mt-3 text-4xl leading-[1.05] text-encre md:text-5xl">
            {en ? <>PERFORMANCE.<br />CIRCULARITY.<br />FRENCH.</> : <>PERFORMANCE.<br />CIRCULARITÉ.<br />FRANÇAIS.</>}
          </h2>
          <p className="mt-5 max-w-md text-lg text-encre/70">
            {en
              ? "We aim to bring circularity to sport by recycling these balls into new, durable and high-performance sports equipment."
              : "Nous cherchons à instaurer une circularité dans le sport en recyclant ces balles en nouveaux équipements sportifs durables et performants."}
          </p>
          <ul className="mt-8 space-y-3">
            {points.map((p, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-foret font-display text-sm text-lime" style={{ fontWeight: 800 }}>{i + 1}</span>
                <span className="font-medium text-encre">{p}</span>
              </li>
            ))}
          </ul>
          <Link href="/nos-equipements" className="btn-primary mt-8 inline-flex">{en ? "Explore the range" : "Découvrir la gamme"}</Link>
        </div>
      </div>
    </section>
  );
}
