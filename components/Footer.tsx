"use client";
import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";

export default function Footer() {
  const { t, lang } = useLang();
  const en = lang === "en";
  const year = new Date().getFullYear();
  const nav = [
    { href: "/nos-equipements", label: t.nav.shop },
    { href: "/notre-procede", label: t.nav.process },
    { href: "/notre-histoire", label: t.nav.story },
    { href: "/clubs", label: t.nav.clubs },
    { href: "/contact", label: t.nav.contact },
  ];
  const legal = [
    { href: "/legal/mentions-legales", label: en ? "Legal notice" : "Mentions légales" },
    { href: "/legal/cgv", label: en ? "Terms of sale" : "CGV" },
    { href: "/legal/politique-de-confidentialite", label: en ? "Privacy policy" : "Politique de confidentialité" },
    { href: "/legal/politique-de-cookies", label: en ? "Cookie policy" : "Gestion des cookies" },
  ];
  return (
    <footer className="mt-24 bg-encre text-sable">
      <div className="container-x flex flex-col items-center gap-8 py-14 text-center">
        <Image src="/assets/logos/logo-recyclace-white.png" alt="Recycl'ace" width={190} height={42} />
        <p className="font-display text-xl text-lime" style={{ fontWeight: 800 }}>
          {en ? "The ball is in your court!" : "La balle est dans votre camp !"}
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm font-medium text-sable/80">
          {nav.map((l) => <Link key={l.href} href={l.href} className="hover:text-lime">{l.label}</Link>)}
        </nav>
        <div className="flex items-center gap-4">
          <a href="https://www.instagram.com/recycl_ace/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="grid h-10 w-10 place-items-center rounded-full border border-sable/20 transition-colors hover:border-lime hover:text-lime">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
          </a>
          <a href="https://www.linkedin.com/company/recyclace" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
            className="grid h-10 w-10 place-items-center rounded-full border border-sable/20 transition-colors hover:border-lime hover:text-lime">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05C20.4 8.65 22 10.6 22 14.1V21h-4v-6.1c0-1.46-.03-3.34-2.04-3.34-2.04 0-2.36 1.6-2.36 3.24V21H9z" /></svg>
          </a>
        </div>
      </div>
      <div className="border-t border-sable/10">
        <div className="container-x flex flex-col items-center gap-3 py-5 text-xs text-sable/50">
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            {legal.map((l) => <Link key={l.href} href={l.href} className="hover:text-lime">{l.label}</Link>)}
          </nav>
          <p>© {year} Recycl'ace. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
