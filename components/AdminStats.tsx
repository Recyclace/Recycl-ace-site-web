"use client";
import { useEffect, useMemo, useState } from "react";

type Order = { created_at: string; total: number; subtotal: number; items: any; status: string; country: string };
type View = { path: string; created_at: string };

export default function AdminStats() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [views, setViews] = useState<View[]>([]);
  const [note, setNote] = useState("");
  const [period, setPeriod] = useState<number>(30); // 7 / 30 / 365

  useEffect(() => {
    (async () => {
      try { const d = await (await fetch("/api/admin/stats")).json(); setNote(d.error === "service_role_missing" ? "Ajoutez SUPABASE_SERVICE_ROLE_KEY dans Vercel pour les statistiques." : ""); setOrders(d.orders || []); setViews(d.views || []); } catch { setNote("Erreur de chargement."); }
    })();
  }, []);

  const stats = useMemo(() => {
    const since = Date.now() - period * 24 * 3600 * 1000;
    const o = orders.filter((x) => new Date(x.created_at).getTime() >= since && x.status !== "abandon");
    const v = views.filter((x) => new Date(x.created_at).getTime() >= since);
    const valid = o.filter((x) => x.status !== "remboursee");
    const ca = valid.reduce((s, x) => s + Number(x.total || 0), 0);
    const nbOrders = valid.length;
    const nbVisits = v.length;
    const panier = nbOrders ? ca / nbOrders : 0;
    const nbArticles = valid.reduce((s, x) => s + (Array.isArray(x.items) ? x.items.reduce((a: number, it: any) => a + (it.qty || 0), 0) : 0), 0);

    // Buckets (jour si <=31 j, sinon mois)
    const byMonth = period > 31;
    const buckets: { key: string; label: string; sales: number; visits: number }[] = [];
    const now = new Date();
    if (byMonth) {
      for (let i = 11; i >= 0; i--) { const d = new Date(now.getFullYear(), now.getMonth() - i, 1); buckets.push({ key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`, label: d.toLocaleDateString("fr-FR", { month: "short" }), sales: 0, visits: 0 }); }
    } else {
      for (let i = period - 1; i >= 0; i--) { const d = new Date(now); d.setDate(d.getDate() - i); buckets.push({ key: d.toISOString().slice(0, 10), label: `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`, sales: 0, visits: 0 }); }
    }
    const keyOf = (dt: string) => { const d = new Date(dt); return byMonth ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}` : d.toISOString().slice(0, 10); };
    const map = new Map(buckets.map((b) => [b.key, b]));
    valid.forEach((x) => { const b = map.get(keyOf(x.created_at)); if (b) b.sales += Number(x.total || 0); });
    v.forEach((x) => { const b = map.get(keyOf(x.created_at)); if (b) b.visits += 1; });

    const pageCount = new Map<string, number>();
    v.forEach((x) => pageCount.set(x.path, (pageCount.get(x.path) || 0) + 1));
    const topPages = [...pageCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);

    return { ca, nbOrders, nbVisits, panier, nbArticles, buckets, topPages };
  }, [orders, views, period]);

  const maxSales = Math.max(1, ...stats.buckets.map((b) => b.sales));
  const maxVisits = Math.max(1, ...stats.buckets.map((b) => b.visits));

  const exportXLS = () => {
    const rows = [["Période", "Ventes (€)", "Visites"], ...stats.buckets.map((b) => [b.label, b.sales.toFixed(2), b.visits]), [], ["Top pages", "Visites"], ...stats.topPages.map((p) => [p[0], p[1]])];
    const esc = (v: any) => String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;");
    const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office"><head><meta charset="utf-8"></head><body><table>${rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table></body></html>`;
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([html], { type: "application/vnd.ms-excel" })); a.download = `stats-${period}j.xls`; a.click();
  };

  const kpi = (label: string, value: string, sub?: string) => (
    <div className="card p-5"><p className="text-xs font-semibold uppercase tracking-wide text-encre/50">{label}</p><p className="mt-1 font-display text-2xl text-foret" style={{ fontWeight: 800 }}>{value}</p>{sub && <p className="text-xs text-encre/50">{sub}</p>}</div>
  );

  return (
    <div>
      {note && <p className="mb-4 rounded-xl bg-terre/10 p-3 text-sm text-terre">{note}</p>}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-foret/15 p-1">
          {[[7, "7 jours"], [30, "30 jours"], [365, "12 mois"]].map(([v, l]) => (
            <button key={v as number} onClick={() => setPeriod(v as number)} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${period === v ? "bg-foret text-white" : "text-foret"}`}>{l as string}</button>
          ))}
        </div>
        <button onClick={exportXLS} className="btn-outline">Exporter Excel</button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {kpi("Chiffre d'affaires", `${stats.ca.toFixed(2)} €`, `${stats.nbArticles} articles vendus`)}
        {kpi("Commandes", String(stats.nbOrders))}
        {kpi("Visites", String(stats.nbVisits))}
        {kpi("Panier moyen", `${stats.panier.toFixed(2)} €`)}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <p className="mb-4 font-semibold text-encre">Ventes {period > 31 ? "par mois" : "par jour"}</p>
          <div className="flex h-40 items-end gap-1">
            {stats.buckets.map((b, i) => (
              <div key={i} className="group relative flex flex-1 flex-col items-center justify-end">
                <div className="w-full rounded-t bg-foret/80 transition-all group-hover:bg-foret" style={{ height: `${(b.sales / maxSales) * 100}%`, minHeight: b.sales > 0 ? 3 : 0 }} title={`${b.label} : ${b.sales.toFixed(2)} €`} />
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-1 text-[9px] text-encre/40">{stats.buckets.map((b, i) => <span key={i} className="flex-1 text-center">{period <= 7 || period > 31 ? b.label : (i % 5 === 0 ? b.label : "")}</span>)}</div>
        </div>
        <div className="card p-6">
          <p className="mb-4 font-semibold text-encre">Visites {period > 31 ? "par mois" : "par jour"}</p>
          <div className="flex h-40 items-end gap-1">
            {stats.buckets.map((b, i) => (
              <div key={i} className="group relative flex flex-1 flex-col items-center justify-end">
                <div className="w-full rounded-t bg-emeraude/70 transition-all group-hover:bg-emeraude" style={{ height: `${(b.visits / maxVisits) * 100}%`, minHeight: b.visits > 0 ? 3 : 0 }} title={`${b.label} : ${b.visits} visites`} />
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-1 text-[9px] text-encre/40">{stats.buckets.map((b, i) => <span key={i} className="flex-1 text-center">{period <= 7 || period > 31 ? b.label : (i % 5 === 0 ? b.label : "")}</span>)}</div>
        </div>
      </div>

      <div className="mt-6 card p-6">
        <p className="mb-4 font-semibold text-encre">Pages les plus consultées</p>
        {stats.topPages.length === 0 && <p className="text-sm text-encre/50">Aucune visite sur la période (les stats se remplissent quand des visiteurs arrivent).</p>}
        <div className="space-y-2">
          {stats.topPages.map(([path, n]) => {
            const max = stats.topPages[0][1] || 1;
            return (<div key={path} className="flex items-center gap-3 text-sm"><span className="w-56 shrink-0 truncate text-encre/70">{path || "/"}</span><div className="h-3 flex-1 overflow-hidden rounded-full bg-foret/5"><div className="h-full rounded-full bg-lime" style={{ width: `${(n / max) * 100}%` }} /></div><span className="w-12 shrink-0 text-right font-semibold text-encre">{n}</span></div>);
          })}
        </div>
      </div>
    </div>
  );
}
