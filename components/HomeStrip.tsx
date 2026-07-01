"use client";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export default function HomeStrip() {
  const { lang } = useLang();
  const steps = lang === "en"
    ? [
        { t: "Ball collection", d: "Recycl'ace relies on the existing collection network to recover used balls." },
        { t: "Equipment design", d: "Recycl'ace designs its gear in-house, aiming for iconic pieces inspired by the shapes of the sport." },
        { t: "Production", d: "Recycl'ace chose local, responsible production with a French manufacturer with unique know-how." },
        { t: "Distribution", d: "Recycl'ace puts the gear back into players' hands, closing a complete loop of circularity in sport." },
      ]
    : [
        { t: "Collecte des balles", d: "Recycl'ace s'appuie sur le réseau de collecte existant pour récupérer les balles usées." },
        { t: "Design des équipements", d: "Recycl'ace design ses équipements en interne et cherche à ce qu'ils soient iconiques, inspirés des formes qu'on retrouve dans le milieu du sport." },
        { t: "Production", d: "Recycl'ace a fait le choix d'une production locale et raisonnée avec un industriel français bénéficiant d'un savoir-faire unique." },
        { t: "Distribution", d: "Recycl'ace remet les équipements dans les mains des joueurs, ce qui permet d'instaurer une boucle de circularité complète dans le sport." },
      ];
  return (
    <section className="bg-foret py-20 text-sable">
      <div className="container-x">
        <div className="mb-12 max-w-2xl">
          <span className="eyebrow text-lime">{lang === "en" ? "How it works" : "Notre démarche"}</span>
          <h2 className="h-display mt-3 text-3xl md:text-4xl">{lang === "en" ? "Our process" : "Notre processus"}</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((it, i) => (
            <div key={i} className="border-t border-lime/30 pt-5">
              <span className="font-display text-lime" style={{ fontWeight: 800 }}>0{i + 1}</span>
              <h3 className="mt-2 text-xl font-semibold">{it.t}</h3>
              <p className="mt-2 text-sm text-sable/70">{it.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link href="/notre-procede" className="btn-accent">{lang === "en" ? "Our know-how" : "Notre savoir-faire"}</Link>
        </div>
      </div>
    </section>
  );
}
