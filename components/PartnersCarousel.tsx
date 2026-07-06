"use client";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";

const logos = ["01","02","03","04","05","06","07","08","09","10","11"].map((n) => `/assets/partners/partner-${n}.png`);

export default function PartnersCarousel() {
  const { lang } = useLang();
  const doubled = [...logos, ...logos];
  return (
    <section className="py-16">
      <div className="container-x mb-8 text-center">
        <span className="eyebrow">{lang === "en" ? "Our partners" : "Nos partenaires"}</span>
      </div>
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track animate-marquee gap-6 pr-6">
          {doubled.map((src, i) => (
            <div key={i} className="flex h-24 w-52 shrink-0 items-center justify-center rounded-xl2 bg-white p-4 shadow-card">
              <Image src={src} alt="Partenaire Recycl'ace" width={200} height={80} className="max-h-14 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
