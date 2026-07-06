"use client";
import { useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { subscribeNewsletter, SubType } from "@/lib/newsletter";

export default function Newsletter({ variant = "particulier" }: { variant?: SubType }) {
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

  const title = club
    ? (en ? "Clubs newsletter" : "Newsletter Clubs")
    : (en ? "Newsletter" : "Newsletter");
  const desc = club
    ? (en ? "Receive our monthly club offers, new products and CSR tips — reserved for clubs." : "Recevez chaque mois nos offres dédiées aux clubs, les nouveautés et nos conseils RSE — réservé aux clubs.")
    : (en ? "Get our latest news and offers straight to your inbox." : "Recevez nos nouveautés et nos dernières offres directement par e-mail.");

  return (
    <form onSubmit={submit} className={club ? "rounded-xl2 bg-white p-6 shadow-card md:p-8" : "w-full max-w-md"}>
      {club && <h3 className="h-display text-xl text-encre">{title}</h3>}
      <p className={club ? "mt-2 text-sm text-encre/70" : "mb-3 text-sm text-sable/70"}>{desc}</p>
      {state === "done" ? (
        <p className={`mt-3 text-sm font-semibold ${club ? "text-foret" : "text-lime"}`}>✓ {en ? "You're subscribed. Thank you!" : "Inscription confirmée. Merci !"}</p>
      ) : (
        <div className="mt-1 flex gap-2">
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder={en ? "Your email" : "Votre e-mail"}
            className={club
              ? "w-full rounded-xl border border-foret/15 px-4 py-3 text-encre focus:border-emeraude focus:outline-none"
              : "w-full rounded-xl border border-sable/25 bg-white/10 px-4 py-2.5 text-sable placeholder:text-sable/50 focus:border-lime focus:outline-none"} />
          <button disabled={state === "loading"} className="btn-primary shrink-0 disabled:opacity-60">
            {state === "loading" ? "…" : (en ? "Subscribe" : "S'inscrire")}
          </button>
        </div>
      )}
      {state === "error" && <p className="mt-2 text-xs text-terre">{en ? "Please check your email address." : "Vérifiez votre adresse e-mail."}</p>}
    </form>
  );
}
