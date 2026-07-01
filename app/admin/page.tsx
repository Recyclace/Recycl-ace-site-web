"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useLang } from "@/context/LanguageContext";
import { products as seed, Product, tField } from "@/lib/products";
import { hasSupabase } from "@/lib/supabaseClient";

type Row = { id: string; name: string; price: number; category: string; image: string };

export default function AdminPage() {
  const { t, lang } = useLang();
  const [unlocked, setUnlocked] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [draft, setDraft] = useState<Row>({ id: "", name: "", price: 0, category: "", image: "" });

  const ADMIN_CODE = process.env.NEXT_PUBLIC_ADMIN_CODE || "recyclace2026";

  useEffect(() => {
    if (sessionStorage.getItem("ra_admin") === "1") setUnlocked(true);
    setRows(
      seed.map((p: Product) => ({
        id: p.id,
        name: tField(p.name, lang),
        price: p.price,
        category: tField(p.category, lang),
        image: p.colors[0].images[0],
      }))
    );
  }, [lang]);

  const tryUnlock = () => {
    if (code === ADMIN_CODE) {
      setUnlocked(true);
      sessionStorage.setItem("ra_admin", "1");
    } else setError(true);
  };

  const save = () => {
    if (!draft.name) return;
    setRows((r) => {
      const exists = r.find((x) => x.id === draft.id);
      if (exists) return r.map((x) => (x.id === draft.id ? draft : x));
      return [...r, { ...draft, id: `new-${Date.now()}` }];
    });
    setDraft({ id: "", name: "", price: 0, category: "", image: "" });
  };

  if (!unlocked) {
    return (
      <div className="container-x flex min-h-[60vh] items-center justify-center py-20">
        <div className="card w-full max-w-sm p-8 text-center">
          <h1 className="h-display text-2xl text-encre">{t.admin.title}</h1>
          <p className="mt-2 text-sm text-encre/60">{t.admin.codePrompt}</p>
          <input
            type="password"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(false); }}
            onKeyDown={(e) => e.key === "Enter" && tryUnlock()}
            placeholder={t.admin.codePlaceholder}
            className="mt-5 w-full rounded-xl border border-foret/15 bg-white px-4 py-3 text-center focus:border-emeraude focus:outline-none"
          />
          {error && <p className="mt-2 text-sm text-terre">{t.admin.wrong}</p>}
          <button onClick={tryUnlock} className="btn-primary mt-4 w-full">{t.admin.enter}</button>
          <p className="mt-4 text-xs text-encre/40">Code par défaut : recyclace2026</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="h-display text-3xl text-encre">{t.admin.title}</h1>
          <p className="mt-1 text-sm text-encre/55">
            {hasSupabase ? "Connecté à Supabase." : "Mode démo (en mémoire) — connectez Supabase pour la persistance."}
          </p>
        </div>
        <button
          onClick={() => { sessionStorage.removeItem("ra_admin"); setUnlocked(false); }}
          className="btn-outline"
        >
          {t.admin.logout}
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* Liste produits */}
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-foret/5 text-left text-encre/60">
              <tr>
                <th className="px-4 py-3">{t.admin.name}</th>
                <th className="px-4 py-3">{t.admin.price}</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-foret/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-sable">
                        {r.image && <Image src={r.image} alt="" fill className="object-contain p-1" sizes="40px" />}
                      </div>
                      <span className="font-medium text-encre">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-encre/70">{r.price.toFixed(2)} €</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => setDraft(r)} className="mr-3 text-emeraude hover:underline">{t.admin.edit}</button>
                    <button onClick={() => setRows((x) => x.filter((y) => y.id !== r.id))} className="text-terre hover:underline">{t.admin.delete}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Formulaire add/edit */}
        <div className="card h-fit p-6">
          <h2 className="mb-4 font-display text-lg text-encre">{draft.id ? t.admin.edit : t.admin.add}</h2>
          <div className="space-y-3">
            <input className="w-full rounded-xl border border-foret/15 px-4 py-2.5" placeholder={t.admin.name}
              value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            <input type="number" step="0.01" className="w-full rounded-xl border border-foret/15 px-4 py-2.5" placeholder={t.admin.price}
              value={draft.price || ""} onChange={(e) => setDraft({ ...draft, price: parseFloat(e.target.value) || 0 })} />
            <input className="w-full rounded-xl border border-foret/15 px-4 py-2.5" placeholder="Catégorie"
              value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} />
            <input className="w-full rounded-xl border border-foret/15 px-4 py-2.5" placeholder="URL image"
              value={draft.image} onChange={(e) => setDraft({ ...draft, image: e.target.value })} />
            <div className="flex gap-2 pt-1">
              <button onClick={save} className="btn-primary flex-1">{t.admin.save}</button>
              {draft.id && <button onClick={() => setDraft({ id: "", name: "", price: 0, category: "", image: "" })} className="btn-ghost">×</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
