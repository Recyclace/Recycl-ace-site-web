"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import LangSwitch from "./LangSwitch";

export default function Header() {
  const { t, lang } = useLang();
  const en = lang === "en";
  const { count, open } = useCart();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setMobileOpen(false), [pathname]);

  // Les 4 lignes du catalogue
  const lines = [
    { href: "/nos-equipements/ace-gourde", fr: "Gourdes Ace", en: "Ace bottles" },
    { href: "/nos-equipements/ace-vibe", fr: "Ace Vibe", en: "Ace Vibe" },
    { href: "/nos-equipements/ace-pack", fr: "Pack Ace", en: "Ace Pack" },
    { href: "/nos-equipements/ace-gourde-pack-duo", fr: "Composez votre duo", en: "Build your duo" },
  ];
  const links = [
    { href: "/", label: t.nav.home },
    { href: "/notre-histoire", label: t.nav.story },
  ];
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={`sticky top-0 z-40 w-full transition-all ${scrolled ? "bg-sable/90 shadow-sm backdrop-blur" : "bg-sable"}`}>
      <div className="container-x flex h-16 items-center justify-between gap-3 md:h-20">
        <Link href="/" aria-label="Recycl'ace" className="shrink-0">
          <Image src="/assets/logos/logo-recyclace.png" alt="Recycl'ace" width={210} height={36} priority className="h-7 w-auto sm:h-9" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <Link href="/" className={`relative pb-1 text-sm font-semibold transition-colors ${isActive("/") ? "text-foret" : "text-encre/70 hover:text-foret"}`}>
            {t.nav.home}
            {isActive("/") && <span className="absolute -bottom-0.5 left-0 h-[2px] w-full rounded-full bg-lime" />}
          </Link>

          {/* Nos équipements — menu déroulant des 4 lignes */}
          <div className="group relative">
            <Link href="/nos-equipements" className={`relative inline-flex items-center gap-1 pb-1 text-sm font-semibold transition-colors ${isActive("/nos-equipements") ? "text-foret" : "text-encre/70 hover:text-foret"}`}>
              {t.nav.shop}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="transition-transform group-hover:rotate-180"><path d="M6 9l6 6 6-6" /></svg>
              {isActive("/nos-equipements") && <span className="absolute -bottom-0.5 left-0 h-[2px] w-[72%] rounded-full bg-lime" />}
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="overflow-hidden rounded-2xl border border-foret/10 bg-white p-1.5 shadow-soft">
                {lines.map((l) => (
                  <Link key={l.href} href={l.href} className={`block rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors hover:bg-foret/5 ${l.href.includes("duo") ? "text-terre" : "text-encre/80 hover:text-foret"}`}>
                    {en ? l.en : l.fr}
                    {l.href.includes("duo") && <span className="ml-1.5 align-middle text-[10px] font-bold uppercase tracking-wide text-terre/70">★</span>}
                  </Link>
                ))}
                <Link href="/nos-equipements" className="mt-1 block rounded-xl bg-foret/5 px-3.5 py-2 text-center text-xs font-bold text-foret hover:bg-foret/10">
                  {en ? "See all the range" : "Voir toute la gamme"}
                </Link>
              </div>
            </div>
          </div>

          {links.slice(1).map((l) => (
            <Link key={l.href} href={l.href} className={`relative pb-1 text-sm font-semibold transition-colors ${isActive(l.href) ? "text-foret" : "text-encre/70 hover:text-foret"}`}>
              {l.label}
              {isActive(l.href) && <span className="absolute -bottom-0.5 left-0 h-[2px] w-full rounded-full bg-lime" />}
            </Link>
          ))}
          <Link href="/clubs" className={`rounded-full px-4 py-2 text-sm font-bold text-encre shadow-sm transition-transform hover:-translate-y-0.5 ${isActive("/clubs") ? "bg-lime ring-2 ring-foret ring-offset-2 ring-offset-sable" : "bg-lime"}`}>
            {t.nav.clubs}
          </Link>
          <Link href="/contact" className={`relative pb-1 text-sm font-semibold transition-colors ${isActive("/contact") ? "text-foret" : "text-encre/70 hover:text-foret"}`}>
            {t.nav.contact}
            {isActive("/contact") && <span className="absolute -bottom-0.5 left-0 h-[2px] w-full rounded-full bg-lime" />}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <LangSwitch className="hidden sm:inline-flex" />
          <button onClick={open} aria-label={t.nav.cartAria} className="relative rounded-full p-2 text-foret transition-colors hover:bg-foret/5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18M16 10a4 4 0 0 1-8 0" /></svg>
            {count > 0 && <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-terre px-1 text-[11px] font-bold text-white">{count}</span>}
          </button>
          <button onClick={() => setMobileOpen((v) => !v)} aria-label="Menu" aria-expanded={mobileOpen} className="rounded-full p-2 text-foret transition-colors hover:bg-foret/5 lg:hidden">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">{mobileOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>}</svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-foret/10 bg-sable lg:hidden">
          <nav className="container-x flex flex-col gap-1 py-4">
            <Link href="/" className={`rounded-xl px-3 py-3 text-base font-semibold ${isActive("/") ? "bg-foret/5 text-foret" : "text-encre/80"}`}>{t.nav.home}</Link>
            <Link href="/nos-equipements" className={`rounded-xl px-3 pb-1 pt-3 text-base font-semibold ${isActive("/nos-equipements") ? "text-foret" : "text-encre/80"}`}>{t.nav.shop}</Link>
            <div className="mb-1 ml-3 flex flex-col gap-0.5 border-l-2 border-foret/10 pl-3">
              {lines.map((l) => (
                <Link key={l.href} href={l.href} className={`rounded-lg px-2 py-2 text-sm font-medium ${l.href.includes("duo") ? "text-terre" : "text-encre/70"}`}>{en ? l.en : l.fr}</Link>
              ))}
            </div>
            <Link href="/notre-histoire" className={`rounded-xl px-3 py-3 text-base font-semibold ${isActive("/notre-histoire") ? "bg-foret/5 text-foret" : "text-encre/80"}`}>{t.nav.story}</Link>
            <Link href="/clubs" className="mt-1 rounded-xl bg-lime px-3 py-3 text-base font-bold text-encre">{t.nav.clubs}</Link>
            <Link href="/contact" className={`rounded-xl px-3 py-3 text-base font-semibold ${isActive("/contact") ? "bg-foret/5 text-foret" : "text-encre/80"}`}>{t.nav.contact}</Link>
            <div className="mt-3 px-1"><LangSwitch /></div>
          </nav>
        </div>
      )}
    </header>
  );
}
