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

  // --- Clubs : bandeau vert fin, pleine largeur ---
  if (club) {
    return (
      <form onSubmit={submit} className="rounded-xl2 bg-emeraude px-5 py-4 text-sable shadow-card md:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="md:max-w-xs">
            <h3 className="font-display text-base" style={{ fontWeight: 700 }}>{en ? "Clubs newsletter" : "Newsletter Clubs"}</h3>
            <p className="mt-0.5 text-xs text-sable/80">
              {en ? "Receive our monthly club-only offers and new products." : "Recevez chaque mois nos offres et nouveautés dédiées aux clubs"}
            </p>
          </div>
          {state === "done" ? (
            <p className="text-sm font-semibold text-lime">✓ {en ? "You're subscribed. Thank you!" : "Inscription confirmée. Merci !"}</p>
          ) : (
            <div className="flex w-full gap-2 md:w-auto">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder={en ? "Your email" : "Votre e-mail"}
                className="w-full rounded-lg border border-white/20 bg-white/95 px-3 py-2 text-sm text-encre focus:outline-none focus:ring-2 focus:ring-lime md:w-56" />
              <button disabled={state === "loading"} className="shrink-0 rounded-lg bg-lime px-4 py-2 text-sm font-semibold text-encre transition hover:brightness-105 disabled:opacity-60">
                {state === "loading" ? "…" : (en ? "Subscribe" : "S'inscrire")}
              </button>
            </div>
          )}
        </div>
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
