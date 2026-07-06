"use client";
import { useLang } from "@/context/LanguageContext";

export default function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <div
      role="group"
      aria-label="Language"
      className={`inline-flex items-center rounded-full border border-foret/20 bg-white/70 p-0.5 text-xs font-semibold ${className}`}
    >
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            lang === l ? "bg-foret text-white" : "text-foret/70 hover:text-foret"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
