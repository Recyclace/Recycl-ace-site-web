"use client";
import Link from "next/link";
import { ReactNode, useEffect, useRef, useState } from "react";

export default function CatalogRow({
  title, chip, viewHref, viewLabel, children,
}: {
  title: string; chip?: ReactNode; viewHref?: string; viewLabel?: string; children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  const update = () => {
    const el = ref.current;
    if (!el) return;
    const overflow = el.scrollWidth - el.clientWidth > 4;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(!overflow || el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  };
  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  const scrollBy = (dir: number) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * Math.max(240, el.clientWidth * 0.8), behavior: "smooth" });
  };
  const showArrows = !(atStart && atEnd);

  return (
    <section className="mb-12">
      <div className="mb-4 flex items-end justify-between gap-3 border-b border-foret/10 pb-3">
        <div className="flex items-center gap-2.5">
          <h2 className="h-display text-2xl text-encre">{title}</h2>
          {chip}
        </div>
        <div className="flex items-center gap-2">
          {showArrows && (
            <div className="hidden items-center gap-1.5 sm:flex">
              <button onClick={() => scrollBy(-1)} disabled={atStart} aria-label="Précédent" className="grid h-9 w-9 place-items-center rounded-full border border-foret/20 text-foret transition hover:bg-foret hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-foret">←</button>
              <button onClick={() => scrollBy(1)} disabled={atEnd} aria-label="Suivant" className="grid h-9 w-9 place-items-center rounded-full border border-foret/20 text-foret transition hover:bg-foret hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-foret">→</button>
            </div>
          )}
          {viewHref && <Link href={viewHref} className="shrink-0 text-sm font-semibold text-emeraude hover:underline">{viewLabel || "Voir"} →</Link>}
        </div>
      </div>
      <div ref={ref} className="-mx-1 flex snap-x gap-4 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </section>
  );
}
