"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import LangSwitch from "./LangSwitch";

export default function Header() {
  const { t } = useLang();
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

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/nos-equipements", label: t.nav.shop },
    { href: "/notre-procede", label: t.nav.process },
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
          {links.map((l) => (
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
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={`rounded-xl px-3 py-3 text-base font-semibold ${isActive(l.href) ? "bg-foret/5 text-foret" : "text-encre/80"}`}>
                {isActive(l.href) && <span className="mr-2 inline-block h-2 w-2 rounded-full bg-lime align-middle" />}
                {l.label}
              </Link>
            ))}
            <Link href="/clubs" className="mt-1 rounded-xl bg-lime px-3 py-3 text-base font-bold text-encre">{t.nav.clubs}</Link>
            <Link href="/contact" className={`rounded-xl px-3 py-3 text-base font-semibold ${isActive("/contact") ? "bg-foret/5 text-foret" : "text-encre/80"}`}>{t.nav.contact}</Link>
            <div className="mt-3 px-1"><LangSwitch /></div>
          </nav>
        </div>
      )}
    </header>
  );
}
