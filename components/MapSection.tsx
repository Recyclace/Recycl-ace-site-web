"use client";
import dynamic from "next/dynamic";
import { useLang } from "@/context/LanguageContext";

const PartnersMap = dynamic(() => import("./PartnersMap"), {
  ssr: false,
  loading: () => <div className="grid h-full w-full place-items-center text-encre/40">…</div>,
});

export default function MapSection() {
  const { t, lang } = useLang();
  const en = lang === "en";
  return (
    <section className="container-x py-20">
      <div className="mb-10 text-center">
        <span className="eyebrow">{en ? "Our partner clubs & stores" : "Nos clubs & points de vente partenaires"}</span>
        <h2 className="h-display mt-3 text-3xl text-encre md:text-4xl">{en ? "Join the movement!" : "Rejoignez le mouvement !"}</h2>
        <p className="mt-3 text-encre/60">{en ? "They already trust us — what about you?" : "Ils nous font déjà confiance, et vous ?"}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="relative h-[460px] overflow-hidden rounded-xl2 shadow-card">
          <PartnersMap />
          {/* Légende */}
          <div className="absolute bottom-3 left-3 z-[500] flex flex-col gap-1 rounded-xl bg-white/90 px-3 py-2 text-xs font-medium text-encre shadow-card backdrop-blur">
            <span className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full bg-lime ring-1 ring-emeraude" />{en ? "Partner clubs" : "Clubs partenaires"}</span>
            <span className="flex items-center gap-2"><span className="inline-block h-3 w-3 rounded-full bg-terre ring-1 ring-terre" />{en ? "Partner stores" : "Magasins partenaires"}</span>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="card flex flex-col justify-center gap-2 p-8">
            <p className="font-display text-5xl text-foret" style={{ fontWeight: 800 }}>+30</p>
            <p className="text-lg text-encre/70">
              {en ? "clubs have already deployed the Ace range!" : "Clubs ont déployé des équipements de la gamme Ace !"}
            </p>
          </div>
          <div className="card flex flex-col justify-center gap-2 border-l-4 border-terre p-8">
            <p className="font-display text-5xl text-terre" style={{ fontWeight: 800 }}>+6</p>
            <p className="text-lg text-encre/70">
              {en ? "specialised stores now carry our Ace range gear!" : "magasins spécialisés référencent nos équipements de la gamme Ace !"}
            </p>
          </div>
          <a href="/clubs" className="btn-primary self-start">{t.clubs.cta}</a>
        </div>
      </div>
    </section>
  );
}
