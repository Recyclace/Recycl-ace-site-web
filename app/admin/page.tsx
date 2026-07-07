"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { products as seed, tField } from "@/lib/products";

type Override = { id: string; price?: number | null; name_fr?: string; name_en?: string; description_fr?: string; description_en?: string; badge_fr?: string; badge_en?: string; discount?: number; active?: boolean; sort?: number };
type Rev = { id: string; name: string; rating: number; text: string; approved: boolean };
type Sub = { id: string; email: string; type: string; created_at: string };
type Promo = { id: string; code: string; kind: string; value: number; expires_at: string | null; max_uses: number | null; uses: number; active: boolean };
type Point = { id: string; kind: string; city: string; lat: number; lng: number };
type Tab = "products" | "reviews" | "newsletter" | "shipping" | "promos" | "map" | "settings";

export default function AdminPage() {
  const { t, lang } = useLang();
  const en = lang === "en";
  const [unlocked, setUnlocked] = useState(false);
  const [user, setUser] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [tab, setTab] = useState<Tab>("products");

  const [overrides, setOverrides] = useState<Record<string, Override>>({});
  const [editId, setEditId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Override>({ id: "" });
  const [prodNote, setProdNote] = useState("");
  const [saved, setSaved] = useState("");

  const [reviews, setReviews] = useState<Rev[]>([]);
  const [revNote, setRevNote] = useState("");
  const [subs, setSubs] = useState<Sub[]>([]);
  const [subNote, setSubNote] = useState("");

  const [ship, setShip] = useState<{ country: string; price: number }[]>([]);
  const [saleC, setSaleC] = useState<string[]>([]);
  const [shipNote, setShipNote] = useState("");

  const [promos, setPromos] = useState<Promo[]>([]);
  const [promoDraft, setPromoDraft] = useState({ code: "", kind: "percent", value: 10, expires_at: "", max_uses: "" });
  const [promoNote, setPromoNote] = useState("");

  const [points, setPoints] = useState<Point[]>([]);
  const [pointDraft, setPointDraft] = useState({ kind: "club", city: "", lat: "", lng: "" });
  const [mapNote, setMapNote] = useState("");

  const [invoice, setInvoice] = useState<Record<string, string>>({});
  const [newCode, setNewCode] = useState("");
  const [setNoteMsg, setSetNoteMsg] = useState("");

  const H = (c: string) => ({ "x-admin-code": c });
  const noteFrom = (d: any) => (d.error === "service_role_missing" ? (en ? "Add SUPABASE_SERVICE_ROLE_KEY in Vercel to save here." : "Ajoutez SUPABASE_SERVICE_ROLE_KEY dans Vercel pour enregistrer ici.") : "");

  const fetchProducts = async (c: string) => { try { const d = await (await fetch("/api/admin/products", { headers: H(c) })).json(); setProdNote(noteFrom(d)); const m: Record<string, Override> = {}; (d.overrides || []).forEach((o: Override) => (m[o.id] = o)); setOverrides(m); } catch { setProdNote("Erreur."); } };
  const fetchReviews = async (c: string) => { try { const d = await (await fetch("/api/admin/reviews", { headers: H(c) })).json(); setRevNote(noteFrom(d)); setReviews(d.reviews || []); } catch { setRevNote("Erreur."); } };
  const fetchSubs = async (c: string) => { try { const d = await (await fetch("/api/admin/newsletter", { headers: H(c) })).json(); setSubNote(noteFrom(d)); setSubs(d.subscribers || []); } catch { setSubNote("Erreur."); } };
  const fetchSettings = async (c: string) => {
    try { const d = await (await fetch("/api/admin/settings", { headers: H(c) })).json();
      setShipNote(noteFrom(d));
      if (d.public) { setShip(Object.entries(d.public.shipping || {}).map(([country, price]) => ({ country, price: Number(price) }))); setSaleC(d.public.sale_countries || []); }
      if (d.invoice) setInvoice(d.invoice);
    } catch { setShipNote("Erreur."); }
  };
  const fetchPromos = async (c: string) => { try { const d = await (await fetch("/api/admin/promos", { headers: H(c) })).json(); setPromoNote(noteFrom(d)); setPromos(d.promos || []); } catch { setPromoNote("Erreur."); } };
  const fetchPoints = async (c: string) => { try { const d = await (await fetch("/api/admin/mappoints", { headers: H(c) })).json(); setMapNote(noteFrom(d)); setPoints(d.points || []); } catch { setMapNote("Erreur."); } };

  useEffect(() => { const sc = sessionStorage.getItem("ra_admin_code"); if (sessionStorage.getItem("ra_admin") === "1" && sc) { setUnlocked(true); setCode(sc); } }, []);
  useEffect(() => {
    if (!unlocked) return;
    ({ products: fetchProducts, reviews: fetchReviews, newsletter: fetchSubs, shipping: fetchSettings, promos: fetchPromos, map: fetchPoints, settings: fetchSettings }[tab])(code);
  }, [tab, unlocked]);

  const tryUnlock = async () => {
    try { const d = await (await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user, code }) })).json();
      if (d.ok) { setUnlocked(true); sessionStorage.setItem("ra_admin", "1"); sessionStorage.setItem("ra_admin_code", code); fetchProducts(code); } else setError(true);
    } catch { setError(true); }
  };

  // Produits
  const startEdit = (id: string) => { const o = overrides[id] || {}; setEditId(id); setDraft({ id, price: o.price ?? undefined, name_fr: o.name_fr || "", name_en: o.name_en || "", description_fr: o.description_fr || "", description_en: o.description_en || "", badge_fr: o.badge_fr || "", badge_en: o.badge_en || "", discount: o.discount ?? 0, active: o.active === false ? false : true, sort: o.sort ?? 0 }); setSaved(""); };
  const saveDraft = async () => { await fetch("/api/admin/products", { method: "POST", headers: { "Content-Type": "application/json", ...H(code) }, body: JSON.stringify({ action: "save", override: draft }) }); setSaved(en ? "Saved ✓" : "Enregistré ✓"); fetchProducts(code); };
  const resetDraft = async (id: string) => { await fetch("/api/admin/products", { method: "POST", headers: { "Content-Type": "application/json", ...H(code) }, body: JSON.stringify({ action: "reset", id }) }); setEditId(null); fetchProducts(code); };
  const moderate = async (id: string, action: "approve" | "delete", approved?: boolean) => { await fetch("/api/admin/reviews", { method: "POST", headers: { "Content-Type": "application/json", ...H(code) }, body: JSON.stringify({ action, id, approved }) }); fetchReviews(code); };

  // Livraison
  const toggleSale = (c: string) => setSaleC((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));
  const saveShipping = async () => { const shipping: Record<string, number> = {}; ship.forEach((r) => { if (r.country.trim()) shipping[r.country.trim().toUpperCase()] = Number(r.price) || 0; }); await fetch("/api/admin/settings", { method: "POST", headers: { "Content-Type": "application/json", ...H(code) }, body: JSON.stringify({ section: "shipping", shipping, sale_countries: saleC.map((c) => c.toUpperCase()) }) }); setSaved(en ? "Saved ✓" : "Enregistré ✓"); fetchSettings(code); };

  // Promos
  const savePromo = async () => { await fetch("/api/admin/promos", { method: "POST", headers: { "Content-Type": "application/json", ...H(code) }, body: JSON.stringify(promoDraft) }); setPromoDraft({ code: "", kind: "percent", value: 10, expires_at: "", max_uses: "" }); fetchPromos(code); };
  const delPromo = async (id: string) => { await fetch("/api/admin/promos", { method: "POST", headers: { "Content-Type": "application/json", ...H(code) }, body: JSON.stringify({ action: "delete", id }) }); fetchPromos(code); };

  // Carte
  const addPoint = async () => { await fetch("/api/admin/mappoints", { method: "POST", headers: { "Content-Type": "application/json", ...H(code) }, body: JSON.stringify(pointDraft) }); setPointDraft({ kind: "club", city: "", lat: "", lng: "" }); fetchPoints(code); };
  const delPoint = async (id: string) => { await fetch("/api/admin/mappoints", { method: "POST", headers: { "Content-Type": "application/json", ...H(code) }, body: JSON.stringify({ action: "delete", id }) }); fetchPoints(code); };

  // Paramètres
  const saveInvoice = async () => { await fetch("/api/admin/settings", { method: "POST", headers: { "Content-Type": "application/json", ...H(code) }, body: JSON.stringify({ section: "invoice", invoice }) }); setSetNoteMsg(en ? "Saved ✓" : "Enregistré ✓"); };
  const savePassword = async () => { const d = await (await fetch("/api/admin/settings", { method: "POST", headers: { "Content-Type": "application/json", ...H(code) }, body: JSON.stringify({ section: "password", newCode }) })).json(); if (d.ok) { setSetNoteMsg(en ? "Password changed ✓" : "Mot de passe modifié ✓"); sessionStorage.setItem("ra_admin_code", newCode); setCode(newCode); setNewCode(""); } else setSetNoteMsg(d.error === "code_too_short" ? (en ? "Min 6 characters." : "6 caractères minimum.") : "Erreur."); };

  const input = "w-full rounded-xl border border-foret/15 px-3 py-2 text-sm";
  const field = (label: string, key: keyof Override, type: "text" | "number" = "text") => (
    <label className="block"><span className="mb-1 block text-xs font-semibold text-encre/60">{label}</span>
      <input type={type} value={(draft as any)[key] ?? ""} onChange={(e) => setDraft({ ...draft, [key]: type === "number" ? (e.target.value === "" ? undefined : parseFloat(e.target.value)) : e.target.value })} className={input} /></label>
  );

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

  const tabs: [Tab, string][] = [["products", en ? "Products" : "Produits"], ["reviews", en ? "Reviews" : "Avis"], ["newsletter", "Newsletter"], ["shipping", en ? "Shipping" : "Livraison"], ["promos", en ? "Promo codes" : "Codes promo"], ["map", en ? "Map" : "Carte"], ["settings", en ? "Settings" : "Paramètres"]];

  return (
    <div className="container-x py-12">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="h-display text-3xl text-encre">{t.admin.title}</h1>
        <button onClick={() => { sessionStorage.removeItem("ra_admin"); sessionStorage.removeItem("ra_admin_code"); setUnlocked(false); }} className="btn-outline">{t.admin.logout}</button>
      </div>

      <div className="mb-8 flex flex-wrap gap-1 rounded-2xl border border-foret/15 p-1">
        {tabs.map(([k, label]) => (
          <button key={k} onClick={() => setTab(k)} className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === k ? "bg-foret text-white" : "text-foret"}`}>{label}</button>
        ))}
      </div>

      {tab === "products" && (
        <>
          {prodNote && <p className="mb-4 rounded-xl bg-terre/10 p-3 text-sm text-terre">{prodNote}</p>}
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <div className="card overflow-x-auto">
              <table className="w-full text-sm"><thead className="bg-foret/5 text-left text-encre/60"><tr><th className="px-4 py-3">{t.admin.name}</th><th className="px-4 py-3">{t.admin.price}</th><th className="px-4 py-3">Promo</th><th className="px-4 py-3">Visible</th><th className="px-4 py-3"></th></tr></thead>
                <tbody>{seed.map((p) => { const o = overrides[p.id] || {}; const price = o.price ?? p.price; const active = o.active === false ? false : true; return (
                  <tr key={p.id} className="border-t border-foret/5"><td className="px-4 py-3 font-medium text-encre">{o.name_fr || tField(p.name, lang)}</td><td className="px-4 py-3 text-encre/70">{Number(price).toFixed(2)} €</td><td className="px-4 py-3 text-encre/70">{o.discount ? `-${o.discount}%` : "—"}</td><td className="px-4 py-3">{active ? <span className="text-emeraude">✓</span> : <span className="text-terre">✕</span>}</td><td className="px-4 py-3 text-right"><button onClick={() => startEdit(p.id)} className="text-emeraude hover:underline">{t.admin.edit}</button></td></tr>); })}</tbody></table>
            </div>
            <div className="card h-fit space-y-3 p-6">
              {editId ? (<>
                <h2 className="font-display text-lg text-encre">{en ? "Edit" : "Modifier"} — {tField(seed.find((p) => p.id === editId)!.name, lang)}</h2>
                <p className="text-xs text-encre/50">{en ? "Leave a field empty to keep the default." : "Laissez un champ vide pour garder la valeur par défaut."}</p>
                <div className="grid grid-cols-2 gap-3">{field(en ? "Price (€)" : "Prix (€)", "price", "number")}{field(en ? "Discount (%)" : "Réduction (%)", "discount", "number")}</div>
                <label className="flex items-center gap-2 text-sm text-encre"><input type="checkbox" checked={draft.active !== false} onChange={(e) => setDraft({ ...draft, active: e.target.checked })} />{en ? "Visible on the site" : "Visible sur le site"}</label>
                {field(en ? "Order" : "Ordre", "sort", "number")}{field(en ? "Name (FR)" : "Nom (FR)", "name_fr")}{field(en ? "Name (EN)" : "Nom (EN)", "name_en")}{field("Description (FR)", "description_fr")}{field("Description (EN)", "description_en")}
                <div className="grid grid-cols-2 gap-3">{field("Badge (FR)", "badge_fr")}{field("Badge (EN)", "badge_en")}</div>
                <div className="flex items-center gap-2 pt-1"><button onClick={saveDraft} className="btn-primary flex-1">{t.admin.save}</button><button onClick={() => resetDraft(editId)} className="btn-outline">{en ? "Reset" : "Réinit."}</button><button onClick={() => setEditId(null)} className="btn-ghost">×</button></div>
                {saved && <p className="text-sm font-semibold text-emeraude">{saved}</p>}
                <p className="mt-2 rounded-lg bg-foret/5 p-2 text-[11px] text-encre/50">{en ? "Editing product images, colour variants and creating new products will arrive with the store update." : "L'édition des images, des variantes de couleur et la création de produits arriveront avec la mise à jour boutique."}</p>
              </>) : <p className="text-sm text-encre/60">{en ? "Select a product to edit." : "Sélectionnez un produit à modifier."}</p>}
            </div>
          </div>
        </>
      )}

      {tab === "reviews" && (
        <div>{revNote && <p className="mb-4 rounded-xl bg-terre/10 p-3 text-sm text-terre">{revNote}</p>}
          <div className="card overflow-x-auto"><table className="w-full text-sm"><thead className="bg-foret/5 text-left text-encre/60"><tr><th className="px-4 py-3">Avis</th><th className="px-4 py-3">Note</th><th className="px-4 py-3">Statut</th><th className="px-4 py-3"></th></tr></thead>
            <tbody>{reviews.length === 0 && <tr><td colSpan={4} className="px-4 py-6 text-center text-encre/50">{en ? "No submitted reviews." : "Aucun avis soumis."}</td></tr>}
              {reviews.map((r) => (<tr key={r.id} className="border-t border-foret/5"><td className="px-4 py-3"><span className="font-medium text-encre">{r.name}</span><br /><span className="text-encre/60">{r.text}</span></td><td className="px-4 py-3 text-encre/70">{r.rating}/5</td><td className="px-4 py-3">{r.approved ? <span className="text-emeraude">{en ? "Published" : "Publié"}</span> : <span className="text-terre">{en ? "Pending" : "En attente"}</span>}</td><td className="px-4 py-3 text-right"><button onClick={() => moderate(r.id, "approve", !r.approved)} className="mr-3 text-emeraude hover:underline">{r.approved ? (en ? "Hide" : "Masquer") : (en ? "Publish" : "Publier")}</button><button onClick={() => moderate(r.id, "delete")} className="text-terre hover:underline">{t.admin.delete}</button></td></tr>))}</tbody></table></div>
        </div>
      )}

      {tab === "newsletter" && (
        <div>{subNote && <p className="mb-4 rounded-xl bg-terre/10 p-3 text-sm text-terre">{subNote}</p>}
          <div className="mb-4 flex gap-4 text-sm text-encre/70"><span className="rounded-full bg-foret/8 px-3 py-1">{en ? "Individuals" : "Particuliers"} : {subs.filter((s) => s.type === "particulier").length}</span><span className="rounded-full bg-terre/10 px-3 py-1">Clubs : {subs.filter((s) => s.type === "club").length}</span></div>
          <div className="card overflow-x-auto"><table className="w-full text-sm"><thead className="bg-foret/5 text-left text-encre/60"><tr><th className="px-4 py-3">E-mail</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Date</th></tr></thead>
            <tbody>{subs.length === 0 && <tr><td colSpan={3} className="px-4 py-6 text-center text-encre/50">{en ? "No subscribers yet." : "Aucun inscrit."}</td></tr>}{subs.map((s) => (<tr key={s.id} className="border-t border-foret/5"><td className="px-4 py-3 text-encre">{s.email}</td><td className="px-4 py-3 text-encre/70">{s.type}</td><td className="px-4 py-3 text-encre/60">{new Date(s.created_at).toLocaleDateString()}</td></tr>))}</tbody></table></div>
        </div>
      )}

      {tab === "shipping" && (
        <div className="max-w-2xl">{shipNote && <p className="mb-4 rounded-xl bg-terre/10 p-3 text-sm text-terre">{shipNote}</p>}
          <div className="card space-y-4 p-6">
            <h2 className="font-display text-lg text-encre">{en ? "Shipping fees & sale countries" : "Frais de port & pays de vente"}</h2>
            <p className="text-xs text-encre/50">{en ? "Uncheck a country to disable purchases from there." : "Décochez un pays pour désactiver l'achat depuis ce pays."}</p>
            <div className="space-y-2">
              {ship.map((r, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input value={r.country} onChange={(e) => setShip(ship.map((x, j) => j === i ? { ...x, country: e.target.value } : x))} placeholder={en ? "Country (e.g. FR)" : "Pays (ex. FR)"} className="w-28 rounded-xl border border-foret/15 px-3 py-2 text-sm uppercase" />
                  <input type="number" step="0.01" value={r.price} onChange={(e) => setShip(ship.map((x, j) => j === i ? { ...x, price: parseFloat(e.target.value) || 0 } : x))} className="w-28 rounded-xl border border-foret/15 px-3 py-2 text-sm" /> <span className="text-sm text-encre/50">€</span>
                  <label className="ml-2 flex items-center gap-1 text-sm text-encre"><input type="checkbox" checked={saleC.includes(r.country.toUpperCase())} onChange={() => toggleSale(r.country.toUpperCase())} />{en ? "on sale" : "vente"}</label>
                  <button onClick={() => setShip(ship.filter((_, j) => j !== i))} className="ml-auto text-terre hover:underline">×</button>
                </div>
              ))}
            </div>
            <button onClick={() => setShip([...ship, { country: "", price: 0 }])} className="text-sm font-semibold text-emeraude hover:underline">+ {en ? "Add a country" : "Ajouter un pays"}</button>
            <div className="flex items-center gap-3 pt-2"><button onClick={saveShipping} className="btn-primary">{t.admin.save}</button>{saved && <span className="text-sm font-semibold text-emeraude">{saved}</span>}</div>
          </div>
        </div>
      )}

      {tab === "promos" && (
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">{promoNote && <p className="lg:col-span-2 rounded-xl bg-terre/10 p-3 text-sm text-terre">{promoNote}</p>}
          <div className="card h-fit space-y-3 p-6">
            <h2 className="font-display text-lg text-encre">{en ? "New promo code" : "Nouveau code promo"}</h2>
            <label className="block"><span className="mb-1 block text-xs font-semibold text-encre/60">{en ? "Code" : "Code"}</span><input value={promoDraft.code} onChange={(e) => setPromoDraft({ ...promoDraft, code: e.target.value.toUpperCase() })} placeholder="BIENVENUE10" className={input + " uppercase"} /></label>
            <label className="block"><span className="mb-1 block text-xs font-semibold text-encre/60">Type</span>
              <select value={promoDraft.kind} onChange={(e) => setPromoDraft({ ...promoDraft, kind: e.target.value })} className={input}>
                <option value="percent">{en ? "% off price" : "% sur le prix"}</option>
                <option value="amount">{en ? "€ off price" : "€ sur le prix"}</option>
                <option value="free_shipping">{en ? "Free shipping" : "Livraison offerte"}</option>
              </select></label>
            {promoDraft.kind !== "free_shipping" && <label className="block"><span className="mb-1 block text-xs font-semibold text-encre/60">{en ? "Value" : "Valeur"}</span><input type="number" value={promoDraft.value} onChange={(e) => setPromoDraft({ ...promoDraft, value: parseFloat(e.target.value) || 0 })} className={input} /></label>}
            <div className="grid grid-cols-2 gap-3">
              <label className="block"><span className="mb-1 block text-xs font-semibold text-encre/60">{en ? "Expires on" : "Expire le"}</span><input type="date" value={promoDraft.expires_at} onChange={(e) => setPromoDraft({ ...promoDraft, expires_at: e.target.value })} className={input} /></label>
              <label className="block"><span className="mb-1 block text-xs font-semibold text-encre/60">{en ? "Max uses" : "Nb d'utilisations"}</span><input type="number" value={promoDraft.max_uses} onChange={(e) => setPromoDraft({ ...promoDraft, max_uses: e.target.value })} placeholder="∞" className={input} /></label>
            </div>
            <button onClick={savePromo} className="btn-primary w-full">{en ? "Create" : "Créer"}</button>
          </div>
          <div className="card overflow-x-auto"><table className="w-full text-sm"><thead className="bg-foret/5 text-left text-encre/60"><tr><th className="px-3 py-3">Code</th><th className="px-3 py-3">{en ? "Reduction" : "Réduction"}</th><th className="px-3 py-3">{en ? "Limit" : "Limite"}</th><th className="px-3 py-3"></th></tr></thead>
            <tbody>{promos.length === 0 && <tr><td colSpan={4} className="px-3 py-6 text-center text-encre/50">{en ? "No promo codes." : "Aucun code."}</td></tr>}
              {promos.map((p) => (<tr key={p.id} className="border-t border-foret/5"><td className="px-3 py-3 font-mono font-semibold text-encre">{p.code}</td><td className="px-3 py-3 text-encre/70">{p.kind === "free_shipping" ? (en ? "Free shipping" : "Livraison offerte") : p.kind === "percent" ? `-${p.value}%` : `-${p.value}€`}</td><td className="px-3 py-3 text-encre/60">{p.expires_at || "∞"}{p.max_uses ? ` · ${p.uses}/${p.max_uses}` : ""}</td><td className="px-3 py-3 text-right"><button onClick={() => delPromo(p.id)} className="text-terre hover:underline">{t.admin.delete}</button></td></tr>))}</tbody></table></div>
        </div>
      )}

      {tab === "map" && (
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">{mapNote && <p className="lg:col-span-2 rounded-xl bg-terre/10 p-3 text-sm text-terre">{mapNote}</p>}
          <div className="card h-fit space-y-3 p-6">
            <h2 className="font-display text-lg text-encre">{en ? "Add a point" : "Ajouter un point"}</h2>
            <label className="block"><span className="mb-1 block text-xs font-semibold text-encre/60">Type</span><select value={pointDraft.kind} onChange={(e) => setPointDraft({ ...pointDraft, kind: e.target.value })} className={input}><option value="club">Club</option><option value="shop">{en ? "Store" : "Magasin"}</option></select></label>
            <label className="block"><span className="mb-1 block text-xs font-semibold text-encre/60">{en ? "City" : "Ville"}</span><input value={pointDraft.city} onChange={(e) => setPointDraft({ ...pointDraft, city: e.target.value })} className={input} /></label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block"><span className="mb-1 block text-xs font-semibold text-encre/60">Latitude</span><input value={pointDraft.lat} onChange={(e) => setPointDraft({ ...pointDraft, lat: e.target.value })} placeholder="48.85" className={input} /></label>
              <label className="block"><span className="mb-1 block text-xs font-semibold text-encre/60">Longitude</span><input value={pointDraft.lng} onChange={(e) => setPointDraft({ ...pointDraft, lng: e.target.value })} placeholder="2.35" className={input} /></label>
            </div>
            <p className="text-[11px] text-encre/50">{en ? "Tip: get coordinates from Google Maps (right-click → the numbers)." : "Astuce : récupérez les coordonnées sur Google Maps (clic droit → les chiffres)."}</p>
            <button onClick={addPoint} className="btn-primary w-full">{en ? "Add" : "Ajouter"}</button>
          </div>
          <div className="card overflow-x-auto"><table className="w-full text-sm"><thead className="bg-foret/5 text-left text-encre/60"><tr><th className="px-3 py-3">Type</th><th className="px-3 py-3">{en ? "City" : "Ville"}</th><th className="px-3 py-3">Lat</th><th className="px-3 py-3">Lng</th><th className="px-3 py-3"></th></tr></thead>
            <tbody>{points.map((p) => (<tr key={p.id} className="border-t border-foret/5"><td className="px-3 py-3">{p.kind === "shop" ? (en ? "Store" : "Magasin") : "Club"}</td><td className="px-3 py-3 text-encre">{p.city}</td><td className="px-3 py-3 text-encre/60">{Number(p.lat).toFixed(3)}</td><td className="px-3 py-3 text-encre/60">{Number(p.lng).toFixed(3)}</td><td className="px-3 py-3 text-right"><button onClick={() => delPoint(p.id)} className="text-terre hover:underline">{t.admin.delete}</button></td></tr>))}</tbody></table></div>
        </div>
      )}

      {tab === "settings" && (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="card h-fit space-y-3 p-6">
            <h2 className="font-display text-lg text-encre">{en ? "Change admin password" : "Changer le mot de passe admin"}</h2>
            <input type="password" value={newCode} onChange={(e) => setNewCode(e.target.value)} placeholder={en ? "New code (min 6)" : "Nouveau code (6 min)"} className={input} />
            <button onClick={savePassword} className="btn-primary w-full">{t.admin.save}</button>
            {setNoteMsg && <p className="text-sm font-semibold text-emeraude">{setNoteMsg}</p>}
          </div>
          <div className="card h-fit space-y-3 p-6">
            <h2 className="font-display text-lg text-encre">{en ? "Invoice details" : "Informations de facturation"}</h2>
            <p className="text-xs text-encre/50">{en ? "Used on invoices (store update)." : "Utilisées sur les factures (mise à jour boutique)."}</p>
            {["raison_sociale", "siren", "tva", "email", "phone", "address", "mentions"].map((k) => (
              <label key={k} className="block"><span className="mb-1 block text-xs font-semibold text-encre/60">{k}</span><input value={invoice[k] || ""} onChange={(e) => setInvoice({ ...invoice, [k]: e.target.value })} className={input} /></label>
            ))}
            <button onClick={saveInvoice} className="btn-primary w-full">{t.admin.save}</button>
          </div>
        </div>
      )}
    </div>
  );
}
