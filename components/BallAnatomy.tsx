"use client";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";

export default function BallAnatomy() {
  const { lang } = useLang();
  const en = lang === "en";
  const [active, setActive] = useState<null | "felt" | "core">(null);

  const txt = {
    felt: {
      label: en ? "FELT" : "FEUTRINE",
      desc: en
        ? "The felt is the textile cover over the rubber core. It improves control, grip and aerodynamics, and influences speed, spin and durability."
        : "La feutrine est l'enveloppe textile qui recouvre le noyau en caoutchouc. Elle améliore le contrôle, l'adhérence et l'aérodynamisme, et influence la vitesse, les effets et la durabilité.",
    },
    core: {
      label: en ? "RUBBER CORE" : "NOYAU EN CAOUTCHOUC",
      desc: en
        ? "The rubber core is the heart of the ball. It drives the bounce, elasticity and energy return on impact — and it's exactly what we recycle."
        : "Le noyau en caoutchouc est le cœur de la balle. Il assure le rebond, l'élasticité et la restitution d'énergie à l'impact — et c'est précisément ce que l'on recycle.",
    },
  };

  const zone = (key: "felt" | "core") => ({
    onMouseEnter: () => setActive(key),
    onMouseLeave: () => setActive((a) => (a === key ? null : a)),
    onClick: () => setActive((a) => (a === key ? null : key)),
    style: { cursor: "pointer" as const },
  });

  const on = (k: "felt" | "core") => active === k;

  return (
    <div className="relative select-none">
      <svg viewBox="0 0 720 440" className="h-auto w-full" role="img" aria-label={en ? "Tennis ball anatomy" : "Anatomie d'une balle de tennis"}>
        <defs>
          <radialGradient id="ba-felt" cx="38%" cy="32%" r="80%">
            <stop offset="0%" stopColor="#CDEA73" /><stop offset="68%" stopColor="#A8D05D" /><stop offset="100%" stopColor="#86B23C" />
          </radialGradient>
          <radialGradient id="ba-core" cx="42%" cy="38%" r="70%">
            <stop offset="0%" stopColor="#6a6a60" /><stop offset="55%" stopColor="#30302a" /><stop offset="100%" stopColor="#141410" />
          </radialGradient>
          <clipPath id="ba-ballclip"><circle cx="300" cy="220" r="160" /></clipPath>
        </defs>

        {/* Ombre douce */}
        <ellipse cx="300" cy="402" rx="140" ry="18" fill="#000" opacity="0.12" />

        {/* Balle */}
        <circle cx="300" cy="220" r="160" fill="url(#ba-felt)" />

        {/* Découpe : quartier retiré révélant le noyau (en haut à droite) */}
        <g clipPath="url(#ba-ballclip)">
          <path d="M300 220 L300 60 A160 160 0 0 1 452 168 Z" fill="#7FAE39" />
          <path d="M300 220 L300 86 A134 134 0 0 1 430 176 Z" fill="url(#ba-core)" />
          <path d="M300 220 L300 60 A160 160 0 0 1 452 168" fill="none" stroke="#5E8A2A" strokeWidth="2" />
        </g>

        {/* Coutures incurvées (taille de guêpe) */}
        <path d="M152 178 Q300 70 448 178" fill="none" stroke="#FBF8F0" strokeWidth="5" strokeLinecap="round" opacity="0.95" />
        <path d="M152 262 Q300 370 448 262" fill="none" stroke="#FBF8F0" strokeWidth="5" strokeLinecap="round" opacity="0.95" />
        <circle cx="300" cy="220" r="160" fill="none" stroke="#5E8A2A" strokeWidth="1.5" opacity="0.5" />

        {/* Repère FEUTRINE (bas-gauche de la balle) */}
        <g {...zone("felt")}>
          <circle cx="212" cy="300" r="30" fill="#ffffff" fillOpacity={on("felt") ? 0.2 : 0.001} stroke="#E9F5CE" strokeWidth="2" />
          <line x1="190" y1="322" x2="120" y2="372" stroke="#E9F5CE" strokeWidth="2" />
          <circle cx="120" cy="372" r="3" fill="#E9F5CE" />
          <text x="112" y="392" textAnchor="start" fontSize="22" fontWeight="800" fill="#E9F5CE">{txt.felt.label}</text>
        </g>

        {/* Repère NOYAU (dans la découpe) */}
        <g {...zone("core")}>
          <circle cx="360" cy="150" r="24" fill="#ffffff" fillOpacity={on("core") ? 0.18 : 0.001} stroke="#E9F5CE" strokeWidth="2" />
          <line x1="382" y1="138" x2="540" y2="110" stroke="#E9F5CE" strokeWidth="2" />
          <circle cx="540" cy="110" r="3" fill="#E9F5CE" />
          <text x="552" y="104" fontSize="22" fontWeight="800" fill="#E9F5CE">{en ? "RUBBER" : "NOYAU"}</text>
          <text x="552" y="130" fontSize="22" fontWeight="800" fill="#E9F5CE">{en ? "CORE" : "CAOUTCHOUC"}</text>
          <text x="552" y="158" fontSize="12" fontWeight="600" fill="#A8D05D">{en ? "↳ what we recycle" : "↳ ce qu'on recycle"}</text>
        </g>
      </svg>

      {active && (
        <div className={`pointer-events-none absolute z-10 max-w-xs rounded-xl2 bg-sable/95 p-4 text-sm leading-relaxed text-encre shadow-soft backdrop-blur ${active === "felt" ? "bottom-2 left-2" : "right-2 top-2"}`}>
          <p className="mb-1 font-bold text-foret">{txt[active].label}</p>
          <p className="text-encre/75">{txt[active].desc}</p>
        </div>
      )}
      <p className="mt-2 text-center text-xs text-sable/60">{en ? "Hover / tap the circles" : "Survolez / touchez les cercles"}</p>
    </div>
  );
}
