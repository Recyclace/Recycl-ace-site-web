"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { products as seed, tField } from "@/lib/products";

type Override = {
  id: string; price?: number | null; name_fr?: string; name_en?: string;
  description_fr?: string; description_en?: string; badge_fr?: string; badge_en?: string;
  discount?: number; active?: boolean; sort?: number;
};
type Rev = { id: string; name: string; rating: number; text: string; approved: boolean };
type Sub = { id: string; email: string; type: string; created_at: string };

export default function AdminPage() {
  const { t, lang } = useLang();
  const en = lang === "en";
  const [unlocked, setUnlocked] = useState(false);
  const [user, setUser] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [tab, setTab] = useState<"products" | "reviews" | "newsletter">("products");

  const [overrides, setOverrides] = useState<Record<string, Override>>({});
  const [editId, setEditId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Override>({ id: "" });
  const [prodNote, setProdNote] = useState("");
  const [saved, setSaved] = useState("");

  const [reviews, setReviews] = useState<Rev[]>([]);
  const [revNote, setRevNote] = useState("");
  const [subs, setSubs] = useState<Sub[]>([]);
  const [subNote, setSubNote] = useState("");

  const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER || "admin";
  const ADMIN_CODE = process.env.NEXT_PUBLIC_ADMIN_CODE || "recyclace2026";

  useEffect(() => {
    const savedCode = sessionStorage.getItem("ra_admin_code");
    if (sessionStorage.getItem("ra_admin") === "1" && savedCode) { setUnlocked(true); setCode(savedCode); }
  }, []);

  const H = (c: string) => ({ "x-admin-code": c });

  const fetchProducts = async (c: string) => {
    try {
      const res = await fetch("/api/admin/products", { headers: H(c) });
      const data = await res.json();
      setProdNote(data.error === "service_role_missing"
        ? (en ? "Add SUPABASE_SERVICE_ROLE_KEY in Vercel to save product changes." : "Ajoutez SUPABASE_SERVICE_ROLE_KEY dans Vercel pour enregistrer les modifications produits.")
        : "");
      const map: Record<string, Override> = {};
      (data.overrides || []).forEach((o: Override) => (map[o.id] = o));
      setOverrides(map);
    } catch { setProdNote("Erreur de chargement."); }
  };
  const fetchReviews = async (c: string) => {
    try {
      const res = await fetch("/api/admin/reviews", { headers: H(c) });
      const data = await res.json();
      setRevNote(data.error === "service_role_missing" ? (en ? "Add SUPABASE_SERVICE_ROLE_KEY in Vercel to moderate reviews here." : "Ajoutez SUPABASE_SERVICE_ROLE_KEY dans Vercel pour modérer les avis ici.") : "");
      setReviews(data.reviews || []);
    } catch { setRevNote("Erreur de chargement."); }
  };
  const fetchSubs = async (c: string) => {
    try {
      const res = await fetch("/api/admin/newsletter", { headers: H(c) });
      const data = await res.json();
      setSubNote(data.error === "service_role_missing" ? (en ? "Add SUPABASE_SERVICE_ROLE_KEY in Vercel to view subscribers." : "Ajoutez SUPABASE_SERVICE_ROLE_KEY dans Vercel pour voir les inscrits.") : "");
      setSubs(data.subscribers || []);
    } catch { setSubNote("Erreur de chargement."); }
  };

  useEffect(() => {
    if (!unlocked) return;
    if (tab === "products") fetchProducts(code);
    if (tab === "reviews") fetchReviews(code);
    if (tab === "newsletter") fetchSubs(code);
  }, [tab, unlocked]);

  const tryUnlock = () => {
    if (user === ADMIN_USER && code === ADMIN_CODE) {
      setUnlocked(true); sessionStorage.setItem("ra_admin", "1"); sessionStorage.setItem("ra_admin_code", code); fetchProducts(code);
    } else setError(true);
  };

  const startEdit = (id: string) => {
    const o = overrides[id] || {};
    setEditId(id);
    setDraft({ id, price: o.price ?? undefined, name_fr: o.name_fr || "", name_en: o.name_en || "", description_fr: o.description_fr || "", description_en: o.description_en || "", badge_fr: o.badge_fr || "", badge_en: o.badge_en || "", discount: o.discount ?? 0, active: o.active === false ? false : true, sort: o.sort ?? 0 });
    setSaved("");
  };
  const saveDraft = async () => {
    await fetch("/api/admin/products", { method: "POST", headers: { "Content-Type": "application/json", ...H(code) }, body: JSON.stringify({ action: "save", override: draft }) });
    setSaved(en ? "Saved ✓" : "Enregistré ✓");
    fetchProducts(code);
  };
  const resetDraft = async (id: string) => {
    await fetch("/api/admin/products", { method: "POST", headers: { "Content-Type": "application/json", ...H(code) }, body: JSON.stringify({ action: "reset", id }) });
    setEditId(null); fetchProducts(code);
  };
  const moderate = async (id: string, action: "approve" | "delete", approved?: boolean) => {
    await fetch("/api/admin/reviews", { method: "POST", headers: { "Content-Type": "application/json", ...H(code) }, body: JSON.stringify({ action, id, approved }) });
    fetchReviews(code);
  };

  if (!unlocked) {
    return (
      <div className="container-x flex min-h-[60vh] items-center justify-center py-20">
        <div className="card w-full max-w-sm p-8 text-center">
          <h1 className="h-display text-2xl text-encre">{t.admin.title}</h1>
          <p className="mt-2 text-sm text-encre/60">{en ? "Restricted access" : "Accès réservé"}</p>
          <input value={user} onChange={(e) => { setUser(e.target.value); setError(false); }} placeholder={en ? "Username" : "Identifiant"} className="mt-5 w-full rounded-xl border border-foret/15 px-4 py-3 text-center focus:border-emeraude focus:outline-none" />
          <input type="password" value={code} onChange={(e) => { setCode(e.target.value); setError(false); }} onKeyDown={(e) => e.key === "Enter" && tryUnlock()} placeholder={t.admin.codePlaceholder} className="mt-3 w-full rounded-xl border border-foret/15 px-4 py-3 text-center focus:border-emeraude focus:outline-none" />
          {error && <p className="mt-2 text-sm text-terre">{t.admin.wrong}</p>}
          <button onClick={tryUnlock} className="btn-primary mt-4 w-full">{t.admin.enter}</button>
        </div>
      </div>
    );
  }

  const field = (label: string, key: keyof Override, type: "text" | "number" = "text") => (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-encre/60">{label}</span>
      <input type={type} value={(draft as any)[key] ?? ""} onChange={(e) => setDraft({ ...draft, [key]: type === "number" ? (e.target.value === "" ? undefined : parseFloat(e.target.value)) : e.target.value })} className="w-full rounded-xl border border-foret/15 px-3 py-2 text-sm" />
    </label>
  );

  return (
    <div className="container-x py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="h-display text-3xl text-encre">{t.admin.title}</h1>
        <button onClick={() => { sessionStorage.removeItem("ra_admin"); sessionStorage.removeItem("ra_admin_code"); setUnlocked(false); }} className="btn-outline">{t.admin.logout}</button>
      </div>

      <div className="mb-8 inline-flex rounded-full border border-foret/15 p-1">
        {(["products", "reviews", "newsletter"] as const).map((k) => (
          <button key={k} onClick={() => setTab(k)} className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === k ? "bg-foret text-white" : "text-foret"}`}>
            {k === "products" ? (en ? "Products" : "Produits") : k === "reviews" ? (en ? "Reviews" : "Avis") : (en ? "Newsletter" : "Newsletter")}
          </button>
        ))}
      </div>

      {tab === "products" && (
        <>
          {prodNote && <p className="mb-4 rounded-xl bg-terre/10 p-3 text-sm text-terre">{prodNote}</p>}
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="card overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-foret/5 text-left text-encre/60"><tr><th className="px-4 py-3">{t.admin.name}</th><th className="px-4 py-3">{t.admin.price}</th><th className="px-4 py-3">Promo</th><th className="px-4 py-3">{en ? "Visible" : "Visible"}</th><th className="px-4 py-3"></th></tr></thead>
                <tbody>
                  {seed.map((p) => {
                    const o = overrides[p.id] || {};
                    const price = o.price ?? p.price;
                    const active = o.active === false ? false : true;
                    return (
                      <tr key={p.id} className="border-t border-foret/5">
                        <td className="px-4 py-3 font-medium text-encre">{o.name_fr || tField(p.name, lang)}</td>
                        <td className="px-4 py-3 text-encre/70">{Number(price).toFixed(2)} €</td>
                        <td className="px-4 py-3 text-encre/70">{o.discount ? `-${o.discount}%` : "—"}</td>
                        <td className="px-4 py-3">{active ? <span className="text-emeraude">✓</span> : <span className="text-terre">✕</span>}</td>
                        <td className="px-4 py-3 text-right"><button onClick={() => startEdit(p.id)} className="text-emeraude hover:underline">{t.admin.edit}</button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="card h-fit space-y-3 p-6">
              {editId ? (
                <>
                  <h2 className="font-display text-lg text-encre">{en ? "Edit" : "Modifier"} — {tField(seed.find((p) => p.id === editId)!.name, lang)}</h2>
                  <p className="text-xs text-encre/50">{en ? "Leave a field empty to keep the default value." : "Laissez un champ vide pour conserver la valeur par défaut."}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {field(en ? "Price (€)" : "Prix (€)", "price", "number")}
                    {field(en ? "Discount (%)" : "Réduction (%)", "discount", "number")}
                  </div>
                  <label className="flex items-center gap-2 text-sm text-encre">
                    <input type="checkbox" checked={draft.active !== false} onChange={(e) => setDraft({ ...draft, active: e.target.checked })} />
                    {en ? "Visible on the site" : "Visible sur le site"}
                  </label>
                  {field(en ? "Order (0 = first)" : "Ordre (0 = en premier)", "sort", "number")}
                  {field(en ? "Name (FR)" : "Nom (FR)", "name_fr")}
                  {field(en ? "Name (EN)" : "Nom (EN)", "name_en")}
                  {field("Description (FR)", "description_fr")}
                  {field("Description (EN)", "description_en")}
                  <div className="grid grid-cols-2 gap-3">
                    {field(en ? "Badge (FR)" : "Badge (FR)", "badge_fr")}
                    {field(en ? "Badge (EN)" : "Badge (EN)", "badge_en")}
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <button onClick={saveDraft} className="btn-primary flex-1">{t.admin.save}</button>
                    <button onClick={() => resetDraft(editId)} className="btn-outline">{en ? "Reset" : "Réinitialiser"}</button>
                    <button onClick={() => setEditId(null)} className="btn-ghost">×</button>
                  </div>
                  {saved && <p className="text-sm font-semibold text-emeraude">{saved}</p>}
                </>
              ) : (
                <p className="text-sm text-encre/60">{en ? "Select a product to edit its price, promo, visibility or texts." : "Sélectionnez un produit pour modifier son prix, sa promo, sa visibilité ou ses textes."}</p>
              )}
            </div>
          </div>
        </>
      )}

      {tab === "reviews" && (
        <div>
          {revNote && <p className="mb-4 rounded-xl bg-terre/10 p-3 text-sm text-terre">{revNote}</p>}
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-foret/5 text-left text-encre/60"><tr><th className="px-4 py-3">Avis</th><th className="px-4 py-3">Note</th><th className="px-4 py-3">Statut</th><th className="px-4 py-3"></th></tr></thead>
              <tbody>
                {reviews.length === 0 && <tr><td colSpan={4} className="px-4 py-6 text-center text-encre/50">{en ? "No submitted reviews. (Reference reviews stay visible on the site.)" : "Aucun avis soumis. (Les avis de référence restent affichés sur le site.)"}</td></tr>}
                {reviews.map((r) => (
                  <tr key={r.id} className="border-t border-foret/5">
                    <td className="px-4 py-3"><span className="font-medium text-encre">{r.name}</span><br /><span className="text-encre/60">{r.text}</span></td>
                    <td className="px-4 py-3 text-encre/70">{r.rating}/5</td>
                    <td className="px-4 py-3">{r.approved ? <span className="text-emeraude">{en ? "Published" : "Publié"}</span> : <span className="text-terre">{en ? "Pending" : "En attente"}</span>}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => moderate(r.id, "approve", !r.approved)} className="mr-3 text-emeraude hover:underline">{r.approved ? (en ? "Hide" : "Masquer") : (en ? "Publish" : "Publier")}</button>
                      <button onClick={() => moderate(r.id, "delete")} className="text-terre hover:underline">{t.admin.delete}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "newsletter" && (
        <div>
          {subNote && <p className="mb-4 rounded-xl bg-terre/10 p-3 text-sm text-terre">{subNote}</p>}
          <div className="mb-4 flex gap-4 text-sm text-encre/70">
            <span className="rounded-full bg-foret/8 px-3 py-1">{en ? "Individuals" : "Particuliers"} : {subs.filter((s) => s.type === "particulier").length}</span>
            <span className="rounded-full bg-terre/10 px-3 py-1">Clubs : {subs.filter((s) => s.type === "club").length}</span>
          </div>
          <div className="card overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-foret/5 text-left text-encre/60"><tr><th className="px-4 py-3">E-mail</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">{en ? "Date" : "Date"}</th></tr></thead>
              <tbody>
                {subs.length === 0 && <tr><td colSpan={3} className="px-4 py-6 text-center text-encre/50">{en ? "No subscribers yet." : "Aucun inscrit pour le moment."}</td></tr>}
                {subs.map((s) => (
                  <tr key={s.id} className="border-t border-foret/5">
                    <td className="px-4 py-3 text-encre">{s.email}</td>
                    <td className="px-4 py-3 text-encre/70">{s.type}</td>
                    <td className="px-4 py-3 text-encre/60">{new Date(s.created_at).toLocaleDateString()}</td>
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
