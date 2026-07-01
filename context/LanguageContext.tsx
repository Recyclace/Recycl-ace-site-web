"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { dictionary, Lang, Dict } from "@/lib/i18n/dictionary";

type LangCtx = { lang: Lang; t: Dict; setLang: (l: Lang) => void; toggle: () => void };

const LanguageContext = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("ra_lang")) as Lang | null;
    if (saved === "fr" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      localStorage.setItem("ra_lang", l);
      document.documentElement.lang = l;
    }
  };
  const toggle = () => setLang(lang === "fr" ? "en" : "fr");

  return (
    <LanguageContext.Provider value={{ lang, t: dictionary[lang], setLang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang doit être utilisé dans <LanguageProvider>");
  return ctx;
}
