"use client";
import { useEffect, useState } from "react";

type F = { id?: string; question: string; answer: string; sort?: number };
export default function AdminFaq() {
  const [faqs, setFaqs] = useState<F[]>([]);
  const [draft, setDraft] = useState<F>({ question: "", answer: "", sort: 0 });
  const [note, setNote] = useState("");
  const load = async () => {
    try { const d = await (await fetch("/api/admin/faq")).json(); setNote(d.error === "service_role_missing" ? "Ajoutez SUPABASE_SERVICE_ROLE_KEY dans Vercel pour gérer la FAQ." : ""); setFaqs(d.faqs || []); } catch {}
  };
  useEffect(() => { load(); }, []);
  const save = async () => { if (!draft.question.trim() || !draft.answer.trim()) return; await fetch("/api/admin/faq", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(draft) }); setDraft({ question: "", answer: "", sort: 0 }); load(); };
  const del = async (id?: string) => { if (!id) return; await fetch("/api/admin/faq", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "delete", id }) }); load(); };
  const inp = "w-full rounded-xl border border-foret/15 px-3 py-2 text-sm";

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      {note && <p className="lg:col-span-2 rounded-xl bg-terre/10 p-3 text-sm text-terre">{note}</p>}
      <div className="card h-fit space-y-3 p-6">
        <h2 className="font-display text-lg text-encre">{draft.id ? "Modifier la question" : "Nouvelle question"}</h2>
        <label className="block"><span className="mb-1 block text-xs font-semibold text-encre/60">Question</span><input value={draft.question} onChange={(e) => setDraft({ ...draft, question: e.target.value })} className={inp} /></label>
        <label className="block"><span className="mb-1 block text-xs font-semibold text-encre/60">Réponse</span><textarea rows={5} value={draft.answer} onChange={(e) => setDraft({ ...draft, answer: e.target.value })} className={inp} /></label>
        <label className="block"><span className="mb-1 block text-xs font-semibold text-encre/60">Ordre (0 = en premier)</span><input type="number" value={draft.sort} onChange={(e) => setDraft({ ...draft, sort: parseInt(e.target.value) || 0 })} className={inp} /></label>
        <div className="flex gap-2"><button onClick={save} className="btn-primary flex-1">Enregistrer</button>{draft.id && <button onClick={() => setDraft({ question: "", answer: "", sort: 0 })} className="btn-ghost">×</button>}</div>
      </div>
      <div className="card divide-y divide-foret/10">
        {faqs.length === 0 && <p className="p-6 text-center text-sm text-encre/50">Aucune question.</p>}
        {faqs.map((f) => (
          <div key={f.id} className="flex items-start justify-between gap-3 p-4">
            <div><p className="font-medium text-encre">{f.question}</p><p className="mt-1 text-sm text-encre/60">{f.answer}</p></div>
            <div className="flex shrink-0 gap-2"><button onClick={() => setDraft({ id: f.id, question: f.question, answer: f.answer, sort: f.sort || 0 })} className="text-emeraude hover:underline">Modifier</button><button onClick={() => del(f.id)} className="text-terre hover:underline">Suppr.</button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
