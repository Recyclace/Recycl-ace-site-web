"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/context/LanguageContext";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !done.current) {
        done.current = true;
        const start = performance.now();
        const dur = 1400;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val.toLocaleString("fr-FR")}{suffix}</span>;
}

export default function KeyFigures() {
  const { lang } = useLang();
  const objectif = lang === "en" ? "2026 target" : "objectif 2026";
  return (
    <section className="container-x py-20">
      <div className="grid gap-6 md:grid-cols-3">
        {/* Carte 1 */}
        <div className="card flex h-full flex-col items-center justify-center p-8 text-center">
          <p className="font-display text-5xl text-foret" style={{ fontWeight: 800 }}><Counter to={200000} /></p>
          <p className="mt-2 text-sm font-semibold text-encre/70">{lang === "en" ? "balls recycled" : "balles recyclées"}</p>
          <span className="mt-1 text-xs text-encre/40">({objectif})</span>
        </div>
        {/* Carte 2 */}
        <div className="card flex h-full flex-col items-center justify-center p-8 text-center">
          <p className="font-display text-5xl text-foret" style={{ fontWeight: 800 }}><Counter to={18} suffix=" t" /></p>
          <p className="mt-2 text-sm font-semibold text-encre/70">{lang === "en" ? "CO₂ eq. avoided" : "éq. CO₂ évitées"}</p>
          <span className="mt-1 text-xs text-encre/40">({objectif})</span>
        </div>
        {/* Carte 3 */}
        <div className="card flex h-full flex-col items-center justify-center p-8 text-center">
          <Image src="/assets/logos/made-in-france.svg" alt="Made in France" width={76} height={76} />
          <p className="mt-3 text-sm font-semibold text-encre/70">{lang === "en" ? "100% Certified Made in France" : "100% Certifié Made in France"}</p>
        </div>
      </div>
    </section>
  );
}
