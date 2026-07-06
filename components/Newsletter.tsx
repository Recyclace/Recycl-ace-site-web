"use client";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { subscribeNewsletter, SubType } from "@/lib/newsletter";

export default function Newsletter({ variant = "particulier", compact = false }: { variant?: SubType; compact?: boolean }) {
  const { lang } = useLang();
  const en = lang === "en";
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const club = variant === "club";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    const res = await subscribeNewsletter(email, variant);
    setState(res.ok ? "done" : "error");
    if (res.ok) setEmail("");
  };

  // --- Footer particuliers : version compacte et discrète ---
  if (compact) {
    return (
      <form onSubmit={submit} className="flex items-center gap-2">
        <label className="whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-sable/60">
          {en ? "Newsletter" : "Newsletter"}
        </label>
        {state === "done" ? (
          <span className="text-xs font-semibold text-lime">✓ {en ? "Subscribed!" : "Inscrit !"}</span>
        ) : (
          <div className="flex items-center gap-2">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder={en ? "Your email" : "Votre e-mail"}
              className="w-44 rounded-full border border-sable/20 bg-white/5 px-3 py-1.5 text-xs text-sable placeholder:text-sable/40 focus:border-lime focus:outline-none" />
            <button disabled={state === "loading"} aria-label={en ? "Subscribe" : "S'inscrire"}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lime text-encre transition hover:brightness-105 disabled:opacity-60">→</button>
          </div>
        )}
      </form>
    );
  }

  // --- Clubs : encart vert, pleine largeur ---
  if (club) {
    return (
      <form onSubmit={submit} className="rounded-xl2 bg-emeraude p-6 text-sable shadow-soft md:p-8">
        <h3 className="h-display text-xl">{en ? "Clubs newsletter" : "Newsletter Clubs"}</h3>
        <p className="mt-2 text-sm text-sable/85">
          {en ? "Receive our monthly club-only offers and new products." : "Recevez chaque mois nos offres et nouveautés dédiées aux clubs"}
        </p>
        {state === "done" ? (
          <p className="mt-3 text-sm font-semibold text-lime">✓ {en ? "You're subscribed. Thank you!" : "Inscription confirmée. Merci !"}</p>
        ) : (
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder={en ? "Your email" : "Votre e-mail"}
              className="w-full rounded-xl border border-white/20 bg-white/95 px-4 py-3 text-encre focus:outline-none focus:ring-2 focus:ring-lime" />
            <button disabled={state === "loading"} className="shrink-0 rounded-xl bg-lime px-6 py-3 font-semibold text-encre transition hover:brightness-105 disabled:opacity-60">
              {state === "loading" ? "…" : (en ? "Subscribe" : "S'inscrire")}
            </button>
          </div>
        )}
        {state === "error" && <p className="mt-2 text-xs text-sable/70">{en ? "Please check your email address." : "Vérifiez votre adresse e-mail."}</p>}
      </form>
    );
  }

  // --- Particuliers (par défaut, non compact) ---
  return (
    <form onSubmit={submit} className="w-full max-w-md">
      <p className="mb-3 text-sm text-sable/70">{en ? "Get our latest news and offers." : "Recevez nos nouveautés et nos dernières offres."}</p>
      {state === "done" ? (
        <p className="text-sm font-semibold text-lime">✓ {en ? "You're subscribed. Thank you!" : "Inscription confirmée. Merci !"}</p>
      ) : (
        <div className="flex gap-2">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder={en ? "Your email" : "Votre e-mail"}
            className="w-full rounded-xl border border-sable/25 bg-white/10 px-4 py-2.5 text-sable placeholder:text-sable/50 focus:border-lime focus:outline-none" />
          <button disabled={state === "loading"} className="btn-primary shrink-0 disabled:opacity-60">{state === "loading" ? "…" : (en ? "Subscribe" : "S'inscrire")}</button>
        </div>
      )}
    </form>
  );
}
