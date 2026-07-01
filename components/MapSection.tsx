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
        <span className="eyebrow">{en ? "Our partner clubs" : "Nos clubs partenaires"}</span>
        <h2 className="h-display mt-3 text-3xl text-encre md:text-4xl">{en ? "Join the movement!" : "Rejoignez le mouvement !"}</h2>
        <p className="mt-3 text-encre/60">{en ? "They already trust us — what about you?" : "Ils nous font déjà confiance, et vous ?"}</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="h-[460px] overflow-hidden rounded-xl2 shadow-card">
          <PartnersMap />
        </div>
        <div className="card flex flex-col justify-center gap-3 p-8">
          <p className="font-display text-5xl text-foret" style={{ fontWeight: 800 }}>+30</p>
          <p className="text-lg text-encre/70">
            {en ? "clubs have already deployed the Ace range!" : "Clubs ont déployé des équipements de la gamme Ace !"}
          </p>
          <a href="/clubs" className="btn-primary mt-2 self-start">{t.clubs.cta}</a>
        </div>
      </div>
    </section>
  );
}
