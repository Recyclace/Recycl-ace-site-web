"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { products as seed, Product, tField } from "@/lib/products";

type Row = {
  id: string; name: string; category: string; price: number; weight: string;
  origin: string; discount: number; discountUntil: string; colors: string; images: string;
};
type Rev = { id: string; name: string; rating: number; text: string; approved: boolean };

const emptyDraft: Row = { id: "", name: "", category: "", price: 0, weight: "", origin: "Made in France", discount: 0, discountUntil: "", colors: "", images: "" };

export default function AdminPage() {
  const { t, lang } = useLang();
  const [unlocked, setUnlocked] = useState(false);
  const [user, setUser] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [tab, setTab] = useState<"products" | "reviews">("products");
  const [rows, setRows] = useState<Row[]>([]);
  const [draft, setDraft] = useState<Row>(emptyDraft);
  const [reviews, setReviews] = useState<Rev[]>([]);
  const [revNote, setRevNote] = useState("");

  const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER || "admin";
  const ADMIN_CODE = process.env.NEXT_PUBLIC_ADMIN_CODE || "recyclace2026";

  useEffect(() => {
    const savedCode = sessionStorage.getItem("ra_admin_code");
    if (sessionStorage.getItem("ra_admin") === "1" && savedCode) { setUnlocked(true); setCode(savedCode); }
    let stored: Row[] | null = null;
    try { stored = JSON.parse(localStorage.getItem("ra_products") || "null"); } catch {}
    setRows(stored || seed.map((p: Product) => ({
      id: p.id, name: tField(p.name, lang), category: tField(p.category, lang), price: p.price,
      weight: "", origin: "Made in France", discount: 0, discountUntil: "",
      colors: p.colors.map((c) => tField(c.name, lang)).join(", "),
      images: p.colors[0].images.join(", "),
    })));
  }, [lang]);

  const persist = (list: Row[]) => { setRows(list); try { localStorage.setItem("ra_products", JSON.stringify(list)); } catch {} };

  const fetchReviews = async (c: string) => {
    try {
      const res = await fetch("/api/admin/reviews", { headers: { "x-admin-code": c } });
      const data = await res.json();
      if (data.error === "service_role_missing") setRevNote(lang === "en" ? "Add SUPABASE_SERVICE_ROLE_KEY in Vercel to moderate reviews here." : "Ajoutez SUPABASE_SERVICE_ROLE_KEY dans Vercel pour modérer les avis ici.");
      else setRevNote("");
      setReviews(data.reviews || []);
    } catch { setRevNote("Erreur de chargement."); }
  };
  const moderate = async (id: string, action: "approve" | "delete", approved?: boolean) => {
    await fetch("/api/admin/reviews", { method: "POST", headers: { "Content-Type": "application/json", "x-admin-code": code }, body: JSON.stringify({ action, id, approved }) });
    fetchReviews(code);
  };

  const tryUnlock = () => {
    if (user === ADMIN_USER && code === ADMIN_CODE) {
      setUnlocked(true); sessionStorage.setItem("ra_admin", "1"); sessionStorage.setItem("ra_admin_code", code); fetchReviews(code);
    } else setError(true);
  };
  useEffect(() => { if (unlocked && tab === "reviews") fetchReviews(code); }, [tab, unlocked]);

  const save = () => {
    if (!draft.name) return;
    const exists = rows.find((r) => r.id === draft.id);
    persist(exists ? rows.map((r) => (r.id === draft.id ? draft : r)) : [...rows, { ...draft, id: `new-${Date.now()}` }]);
    setDraft(emptyDraft);
  };

  if (!unlocked) {
    return (
      <div className="container-x flex min-h-[60vh] items-center justify-center py-20">
        <div className="card w-full max-w-sm p-8 text-center">
          <h1 className="h-display text-2xl text-encre">{t.admin.title}</h1>
          <p className="mt-2 text-sm text-encre/60">{lang === "en" ? "Restricted access" : "Accès réservé"}</p>
          <input value={user} onChange={(e) => { setUser(e.target.value); setError(false); }} placeholder={lang === "en" ? "Username" : "Identifiant"} className="mt-5 w-full rounded-xl border border-foret/15 px-4 py-3 text-center focus:border-emeraude focus:outline-none" />
          <input type="password" value={code} onChange={(e) => { setCode(e.target.value); setError(false); }} onKeyDown={(e) => e.key === "Enter" && tryUnlock()} placeholder={t.admin.codePlaceholder} className="mt-3 w-full rounded-xl border border-foret/15 px-4 py-3 text-center focus:border-emeraude focus:outline-none" />
          {error && <p className="mt-2 text-sm text-terre">{t.admin.wrong}</p>}
          <button onClick={tryUnlock} className="btn-primary mt-4 w-full">{t.admin.enter}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-x py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="h-display text-3xl text-encre">{t.admin.title}</h1>
        <button onClick={() => { sessionStorage.removeItem("ra_admin"); sessionStorage.removeItem("ra_admin_code"); setUnlocked(false); }} className="btn-outline">{t.admin.logout}</button>
      </div>

      <div className="mb-8 inline-flex rounded-full border border-foret/15 p-1">
        {(["products", "reviews"] as const).map((k) => (
          <button key={k} onClick={() => setTab(k)} className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === k ? "bg-foret text-white" : "text-foret"}`}>
            {k === "products" ? (lang === "en" ? "Products" : "Produits") : (lang === "en" ? "Reviews" : "Avis")}
          </button>
        ))}
      </div>

      {tab === "products" ? (
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-foret/5 text-left text-encre/60"><tr><th className="px-4 py-3">{t.admin.name}</th><th className="px-4 py-3">{t.admin.price}</th><th className="px-4 py-3">Promo</th><th className="px-4 py-3"></th></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t border-foret/5">
                    <td className="px-4 py-3 font-medium text-encre">{r.name}</td>
                    <td className="px-4 py-3 text-encre/70">{r.price.toFixed(2)} €</td>
                    <td className="px-4 py-3 text-encre/70">{r.discount ? `-${r.discount}%` : "—"}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => setDraft(r)} className="mr-3 text-emeraude hover:underline">{t.admin.edit}</button>
                      <button onClick={() => persist(rows.filter((x) => x.id !== r.id))} className="text-terre hover:underline">{t.admin.delete}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card h-fit space-y-3 p-6">
            <h2 className="font-display text-lg text-encre">{draft.id ? t.admin.edit : t.admin.add}</h2>
            {([
              ["name", t.admin.name, "text"], ["category", "Catégorie", "text"], ["price", t.admin.price, "number"],
              ["weight", "Poids", "text"], ["origin", "Lieu de fabrication", "text"],
              ["discount", "Réduction (%)", "number"], ["discountUntil", "Promo jusqu'au", "date"],
              ["colors", "Couleurs (séparées par ,)", "text"], ["images", "URLs images (séparées par ,)", "text"],
            ] as const).map(([key, label, type]) => (
              <label key={key} className="block">
                <span className="mb-1 block text-xs font-semibold text-encre/60">{label}</span>
                <input type={type} value={(draft as any)[key]}
                  onChange={(e) => setDraft({ ...draft, [key]: type === "number" ? parseFloat(e.target.value) || 0 : e.target.value })}
                  className="w-full rounded-xl border border-foret/15 px-3 py-2 text-sm" />
              </label>
            ))}
            <div className="flex gap-2 pt-1">
              <button onClick={save} className="btn-primary flex-1">{t.admin.save}</button>
              {draft.id && <button onClick={() => setDraft(emptyDraft)} className="btn-ghost">×</button>}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {revNote && <p className="mb-4 rounded-xl bg-terre/10 p-3 text-sm text-terre">{revNote}</p>}
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-foret/5 text-left text-encre/60"><tr><th className="px-4 py-3">Avis</th><th className="px-4 py-3">Note</th><th className="px-4 py-3">Statut</th><th className="px-4 py-3"></th></tr></thead>
              <tbody>
                {reviews.length === 0 && <tr><td colSpan={4} className="px-4 py-6 text-center text-encre/50">Aucun avis soumis. (Les avis de référence restent affichés sur le site.)</td></tr>}
                {reviews.map((r) => (
                  <tr key={r.id} className="border-t border-foret/5">
                    <td className="px-4 py-3"><span className="font-medium text-encre">{r.name}</span><br /><span className="text-encre/60">{r.text}</span></td>
                    <td className="px-4 py-3 text-encre/70">{r.rating}/5</td>
                    <td className="px-4 py-3">{r.approved ? <span className="text-emeraude">Publié</span> : <span className="text-terre">En attente</span>}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => moderate(r.id, "approve", !r.approved)} className="mr-3 text-emeraude hover:underline">{r.approved ? "Masquer" : "Publier"}</button>
                      <button onClick={() => moderate(r.id, "delete")} className="text-terre hover:underline">{t.admin.delete}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
