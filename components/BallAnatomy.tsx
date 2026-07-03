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
        ? "The felt is the textile cover over the rubber core of the tennis ball. It improves control, grip and aerodynamics, while influencing its speed, spin and durability."
        : "La feutrine est l'enveloppe textile qui recouvre le noyau en caoutchouc de la balle de tennis. Elle améliore le contrôle, l'adhérence et l'aérodynamisme de la balle, tout en influençant sa vitesse, ses effets et sa durabilité.",
    },
    core: {
      label: en ? "RUBBER CORE" : "NOYAU EN CAOUTCHOUC",
      desc: en
        ? "The rubber core is the heart of the tennis ball, beneath the felt. It is responsible for the bounce, elasticity and energy return on impact, ensuring performance and playing feel."
        : "Le noyau en caoutchouc est le cœur de la balle de tennis, situé sous la feutrine. Il est responsable du rebond, de l'élasticité et de la restitution d'énergie lors de l'impact, ce qui garantit les performances et les sensations de jeu.",
    },
  };

  const zone = (key: "felt" | "core") => ({
    onMouseEnter: () => setActive(key),
    onMouseLeave: () => setActive((a) => (a === key ? null : a)),
    onClick: () => setActive((a) => (a === key ? null : key)),
    style: { cursor: "pointer" as const },
  });

  return (
    <div className="relative select-none">
      <svg viewBox="0 0 860 440" className="h-auto w-full">
        <defs>
          <radialGradient id="felt" cx="36%" cy="30%" r="82%">
            <stop offset="0%" stopColor="#D3EE7A" /><stop offset="70%" stopColor="#A8D05D" /><stop offset="100%" stopColor="#8FBF3E" />
          </radialGradient>
          <radialGradient id="core" cx="40%" cy="36%" r="72%">
            <stop offset="0%" stopColor="#5a5a52" /><stop offset="55%" stopColor="#26261F" /><stop offset="100%" stopColor="#0d0d0a" />
          </radialGradient>
        </defs>

        {/* Balle */}
        <circle cx="340" cy="220" r="165" fill="url(#felt)" />
        {/* Coutures réalistes (courbes qui se croisent) */}
        <path d="M188 165 Q340 285 492 165" fill="none" stroke="#FBF8F0" strokeWidth="6" strokeLinecap="round" />
        <path d="M188 275 Q340 155 492 275" fill="none" stroke="#FBF8F0" strokeWidth="6" strokeLinecap="round" />
        {/* Ouverture : noyau caoutchouc */}
        <ellipse cx="388" cy="216" rx="112" ry="132" fill="#7BAF33" />
        <ellipse cx="396" cy="216" rx="92" ry="112" fill="url(#core)" />
        <ellipse cx="370" cy="188" rx="28" ry="38" fill="#7a7a70" opacity="0.35" />
        <circle cx="340" cy="220" r="165" fill="none" stroke="#0F6B5B" strokeWidth="2" opacity="0.3" />

        {/* Repère FEUTRINE */}
        <g {...zone("felt")}>
          <path d="M222 130 L120 104" fill="none" stroke="#E9F5CE" strokeWidth="2.5" />
          <circle cx="256" cy="130" r="34" fill="#ffffff" fillOpacity={active === "felt" ? 0.18 : 0.001} stroke="#E9F5CE" strokeWidth="2.5" />
          <text x="112" y="100" textAnchor="end" fontSize="24" fontWeight="800" fill="#E9F5CE">{txt.felt.label}</text>
        </g>
        {/* Repère NOYAU CAOUTCHOUC */}
        <g {...zone("core")}>
          <path d="M506 216 L612 190" fill="none" stroke="#E9F5CE" strokeWidth="2.5" />
          <circle cx="470" cy="216" r="36" fill="#ffffff" fillOpacity={active === "core" ? 0.18 : 0.001} stroke="#E9F5CE" strokeWidth="2.5" />
          <text x="620" y="184" fontSize="24" fontWeight="800" fill="#E9F5CE">{en ? "RUBBER" : "NOYAU EN"}</text>
          <text x="620" y="212" fontSize="24" fontWeight="800" fill="#E9F5CE">{en ? "CORE" : "CAOUTCHOUC"}</text>
        </g>
      </svg>

      {/* Pop-up descriptif (survol / clic) */}
      {active && (
        <div className={`pointer-events-none absolute z-10 max-w-xs rounded-xl2 bg-sable/95 p-4 text-sm leading-relaxed text-encre shadow-soft backdrop-blur ${active === "felt" ? "left-2 top-2 md:left-8" : "bottom-2 right-2 md:right-8"}`}>
          <p className="mb-1 font-bold text-foret">{txt[active].label}</p>
          <p className="text-encre/75">{txt[active].desc}</p>
        </div>
      )}
    </div>
  );
}
