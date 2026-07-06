"use client";
import Link from "next/link";
import { useLang } from "@/context/LanguageContext";

export default function HeroVideo() {
  const { lang } = useLang();
  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden bg-encre">
      {/* Bannière : la vidéo joue dès que /assets/videos/hero.mp4 est présent. */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/videos/court-hero-poster.jpg"
      >
        <source src="/assets/videos/hero.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-encre via-encre/55 to-encre/20" />

      <div className="container-x relative flex h-full flex-col justify-end pb-16 md:justify-center md:pb-0">
        <div className="max-w-3xl animate-fadeUp">
          <span className="eyebrow text-lime">
            {lang === "en" ? "Let's bring circularity to sport" : "Instaurons une circularité dans le sport"}
          </span>
          <h1 className="h-display mt-4 text-4xl text-sable sm:text-5xl md:text-6xl">
            {lang === "en" ? (
              <>Instead of throwing them away,<br />what if we gave balls a second life?</>
            ) : (
              <>Et si au lieu de les jeter,<br />on donnait une seconde vie aux balles ?</>
            )}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-sable/80">
            {lang === "en"
              ? "Premium, durable and high-performance sports gear — made in France from recycled tennis balls."
              : "Des équipements de sport premium, durables et performants — fabriqués en France à partir de balles de tennis recyclées."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/nos-equipements" className="btn-accent">
              {lang === "en" ? "Explore our gear" : "Découvrir nos équipements"}
            </Link>
            <Link href="/clubs" className="btn-outline border-sable/40 text-sable hover:bg-sable hover:text-encre">
              {lang === "en" ? "Are you a club?" : "Vous êtes un club ?"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
