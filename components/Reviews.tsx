"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { seedReviews, loadApprovedReviews, submitReview, Review } from "@/lib/reviews";

const STAR = "M12 2l2.4 7.4H22l-6 4.4 2.3 7.2L12 16.6 5.7 21l2.3-7.2-6-4.4h7.6z";

export function Stars({ n, size = 16 }: { n: number; size?: number }) {
  const pct = Math.max(0, Math.min(100, (n / 5) * 100));
  const Row = ({ fill }: { fill: boolean }) => (
    <span className="flex">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={fill ? "#F2B705" : "none"} stroke="#F2B705" strokeWidth="1.5"><path d={STAR} /></svg>
      ))}
    </span>
  );
  return (
    <span className="relative inline-flex" aria-label={`${n}/5`}>
      <Row fill={false} />
      <span className="absolute left-0 top-0 overflow-hidden" style={{ width: `${pct}%` }}><Row fill /></span>
    </span>
  );
}

const PAGE = 3;

export default function Reviews() {
  const { lang } = useLang();
  const en = lang === "en";
  const [dbReviews, setDbReviews] = useState<Review[]>([]);
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadApprovedReviews().then(setDbReviews).catch(() => {}); }, []);

  const all = [...seedReviews, ...dbReviews];
  const avg = all.length ? (all.reduce((s, r) => s + r.rating, 0) / all.length).toFixed(1) : "5.0";
  const pages = Math.max(1, Math.ceil(all.length / PAGE));
  const go = (d: number) => setPage((p) => (p + d + pages) % pages);
  const shown = all.slice(page * PAGE, page * PAGE + PAGE);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    setLoading(true);
    await submitReview(name.trim(), rating, text.trim());
    setLoading(false);
    setSent(true); setName(""); setText(""); setRating(5);
  };

  return (
    <section className="bg-sable/60 py-16 md:py-20">
      <div className="container-x">
        <div className="mb-8 text-center">
          <span className="eyebrow">{en ? "Reviews" : "Avis clients"}</span>
          <h2 className="h-display mt-3 text-3xl text-encre md:text-4xl">{en ? "They play sustainable" : "Ils jouent durable"}</h2>
          <div className="mt-3 flex items-center justify-center gap-2">
            <Stars n={parseFloat(avg)} size={20} />
            <span className="font-semibold text-encre">{avg}/5</span>
            <span className="text-sm text-encre/50">· {all.length} {en ? "reviews" : "avis"}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => go(-1)} aria-label="Précédent" className="hidden h-11 w-11 shrink-0 place-items-center rounded-full border border-foret/20 text-foret transition hover:bg-foret hover:text-white sm:grid">←</button>
          <div className="grid flex-1 gap-5 md:grid-cols-3">
            {shown.map((r) => (
              <div key={r.id} className="card flex flex-col p-6">
                <Stars n={r.rating} />
                <p className="mt-3 flex-1 text-sm text-encre/75">« {r.text} »</p>
                <p className="mt-4 text-sm font-semibold text-foret">{r.name}</p>
              </div>
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Suivant" className="hidden h-11 w-11 shrink-0 place-items-center rounded-full border border-foret/20 text-foret transition hover:bg-foret hover:text-white sm:grid">→</button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button onClick={() => go(-1)} aria-label="Précédent" className="grid h-10 w-10 place-items-center rounded-full border border-foret/20 text-foret sm:hidden">←</button>
          <div className="flex gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i)} aria-label={`Page ${i + 1}`} className={`h-2.5 rounded-full transition-all ${i === page ? "w-7 bg-foret" : "w-2.5 bg-foret/25"}`} />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Suivant" className="grid h-10 w-10 place-items-center rounded-full border border-foret/20 text-foret sm:hidden">→</button>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          {sent ? (
            <div className="card p-6 text-center">
              <p className="font-semibold text-foret">✓ {en ? "Thank you! Your review will be published after moderation." : "Merci ! Votre avis sera publié après modération."}</p>
            </div>
          ) : (
            <form onSubmit={submit} className="card space-y-4 p-6">
              <h3 className="h-display text-lg text-encre">{en ? "Leave a review" : "Laissez votre avis"}</h3>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button key={i} type="button" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(0)} onClick={() => setRating(i)} aria-label={`${i}/5`}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill={i <= (hover || rating) ? "#F2B705" : "none"} stroke="#F2B705" strokeWidth="1.5"><path d={STAR} /></svg>
                  </button>
                ))}
              </div>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder={en ? "Your name" : "Votre nom"} required className="w-full rounded-xl border border-foret/15 px-4 py-2.5 focus:border-emeraude focus:outline-none" />
              <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={en ? "Your review" : "Votre avis"} required rows={3} className="w-full rounded-xl border border-foret/15 px-4 py-2.5 focus:border-emeraude focus:outline-none" />
              <button disabled={loading} className="btn-primary w-full disabled:opacity-60">{loading ? "…" : (en ? "Submit my review" : "Envoyer mon avis")}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
