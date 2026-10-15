"use client";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";

// Schéma d'une balle de tennis (couture en S réaliste) + cœur caoutchouc révélé.
export default function BallAnatomy() {
  const { lang } = useLang();
  const en = lang === "en";
  const [active, setActive] = useState<null | "felt" | "core">(null);

  const txt = {
    felt: {
      label: en ? "FELT" : "FEUTRINE",
      desc: en
        ? "The felt is the textile cover over the rubber core. It improves control, grip and aerodynamics."
        : "La feutrine est l'enveloppe textile qui recouvre le noyau. Elle améliore le contrôle, l'adhérence et l'aérodynamisme.",
    },
    core: {
      label: en ? "RUBBER CORE" : "NOYAU EN CAOUTCHOUC",
      desc: en
        ? "The rubber core drives the bounce and energy return on impact."
        : "Le noyau en caoutchouc assure le rebond et la restitution d'énergie à l'impact.",
    },
  };
  const z = (k: "felt" | "core") => ({
    onMouseEnter: () => setActive(k),
    onMouseLeave: () => setActive((a) => (a === k ? null : a)),
    onClick: () => setActive((a) => (a === k ? null : k)),
    style: { cursor: "pointer" as const },
  });

  return (
    <div className="relative select-none">
      <svg viewBox="0 0 760 420" className="h-auto w-full" fontFamily="Poppins,Arial,sans-serif" role="img" aria-label={en ? "Tennis ball anatomy" : "Anatomie d'une balle de tennis"}>
        <defs>
          <radialGradient id="ba-felt" cx="36%" cy="30%" r="82%">
            <stop offset="0%" stopColor="#D3EE7A" /><stop offset="70%" stopColor="#A8D05D" /><stop offset="100%" stopColor="#8FBF3E" />
          </radialGradient>
          <radialGradient id="ba-core" cx="42%" cy="36%" r="72%">
            <stop offset="0%" stopColor="#5a5a52" /><stop offset="55%" stopColor="#26261F" /><stop offset="100%" stopColor="#0d0d0a" />
          </radialGradient>
        </defs>

        {/* Balle + couture en S */}
        <circle cx="320" cy="210" r="165" fill="url(#ba-felt)" {...z("felt")} />
        <path d="M320,47 C452,128 188,292 320,373" fill="none" stroke="#FBF8F0" strokeWidth="7" />
        {/* Cœur caoutchouc révélé (hublot) */}
        <circle cx="410" cy="268" r="52" fill="#7BAF33" {...z("core")} />
        <circle cx="410" cy="268" r="40" fill="url(#ba-core)" {...z("core")} />
        <circle cx="320" cy="210" r="165" fill="none" stroke="#0F6B5B" strokeWidth="2" opacity="0.3" />

        {/* Repères */}
        <g fill="none" stroke="#E9F5CE" strokeWidth="2.5">
          <circle cx="250" cy="110" r="30" {...z("felt")} /><path d="M224,96 L120,74" />
          <circle cx="410" cy="268" r="60" {...z("core")} /><path d="M470,280 L600,300" />
        </g>
        <g fontWeight="800" fontSize="22" fill="#E9F5CE">
          <text x="112" y="70" textAnchor="end" {...z("felt")}>{en ? "FELT" : "FEUTRINE"}</text>
          <text x="610" y="296" {...z("core")}>{en ? "RUBBER" : "NOYAU EN"}</text>
          <text x="610" y="320" {...z("core")}>{en ? "CORE" : "CAOUTCHOUC"}</text>
        </g>
      </svg>

      {active && (
        <div className={`pointer-events-none absolute z-10 max-w-xs rounded-xl2 bg-sable/95 p-4 text-sm leading-relaxed text-encre shadow-soft backdrop-blur ${active === "felt" ? "left-2 top-2" : "bottom-2 right-2"}`}>
          <p className="mb-1 font-bold text-foret">{txt[active].label}</p>
          <p className="text-encre/75">{txt[active].desc}</p>
        </div>
      )}
    </div>
  );
}
