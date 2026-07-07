"use client";
import { useEffect, useState } from "react";
import { products as seed, Product } from "@/lib/products";
import { supabase } from "@/lib/supabaseClient";

export type Override = {
  id: string; price?: number | null; image_url?: string | null;
  name_fr?: string | null; name_en?: string | null;
  description_fr?: string | null; description_en?: string | null;
  badge_fr?: string | null; badge_en?: string | null; colors?: any[] | null;
  discount?: number | null; active?: boolean | null; sort?: number | null;
};
export type CatalogProduct = Product & { active: boolean; sort: number; discount: number };

const nz = (v: any) => v !== null && v !== undefined && v !== "";

export function mergeCatalog(overrides: Override[]): CatalogProduct[] {
  const map = new Map(overrides.map((o) => [o.id, o]));
  return seed.map((p, idx) => {
    const o = map.get(p.id);
    if (!o) return { ...p, active: true, sort: idx, discount: 0 };
    let colors = p.colors;
    if (Array.isArray(o.colors) && o.colors.length) {
      colors = o.colors.map((c: any, i: number) => ({ key: c.hex || `c${i}`, name: { fr: c.name_fr || "", en: c.name_en || c.name_fr || "" }, hex: c.hex || "#0F6B5B", images: [c.image_url || "/assets/produits/equipements-full.jpg"] }));
    } else if (nz(o.image_url)) {
      const di = Math.max(0, p.colors.findIndex((c) => c.key === p.defaultColorKey));
      colors = p.colors.map((c, i) => (i === di ? { ...c, images: [o.image_url!, ...c.images.slice(1)] } : c));
    }
    return {
      ...p, colors,
      price: nz(o.price) ? Number(o.price) : p.price,
      name: { fr: nz(o.name_fr) ? o.name_fr! : p.name.fr, en: nz(o.name_en) ? o.name_en! : p.name.en },
      description: { fr: nz(o.description_fr) ? o.description_fr! : p.description.fr, en: nz(o.description_en) ? o.description_en! : p.description.en },
      badge: nz(o.badge_fr) || nz(o.badge_en) ? { fr: nz(o.badge_fr) ? o.badge_fr! : (p.badge?.fr || ""), en: nz(o.badge_en) ? o.badge_en! : (p.badge?.en || "") } : p.badge,
      active: o.active === null || o.active === undefined ? true : o.active,
      sort: nz(o.sort) ? Number(o.sort) : idx,
      discount: nz(o.discount) ? Number(o.discount) : 0,
    };
  });
}

// Produit créé depuis l'admin -> objet Product
export function customToProduct(cp: any): CatalogProduct {
  const colorsArr: any[] = Array.isArray(cp.colors) ? cp.colors : [];
  const colors = colorsArr.length
    ? colorsArr.map((c: any, i: number) => ({ key: c.hex || `c${i}`, name: { fr: c.name_fr || "", en: c.name_en || c.name_fr || "" }, hex: c.hex || "#0F6B5B", images: [c.image_url || cp.image_url || "/assets/produits/equipements-full.jpg"] }))
    : [{ key: "default", name: { fr: "", en: "" }, hex: "#0F6B5B", images: [cp.image_url || "/assets/produits/equipements-full.jpg"] }];
  return {
    id: cp.id, slug: cp.slug,
    name: { fr: cp.name_fr || "", en: cp.name_en || cp.name_fr || "" },
    price: Number(cp.price) || 0,
    category: { fr: cp.category_fr || "", en: cp.category_en || cp.category_fr || "" },
    description: { fr: cp.description_fr || "", en: cp.description_en || cp.description_fr || "" },
    colors, accordions: [],
    badge: cp.badge_fr ? { fr: cp.badge_fr, en: cp.badge_en || cp.badge_fr } : undefined,
    noColor: colorsArr.length === 0,
    active: cp.active !== false, sort: Number(cp.sort) || 100, discount: 0,
  } as CatalogProduct;
}

async function loadOverrides(): Promise<Override[]> {
  try { const { data } = await supabase.from("product_overrides").select("*"); return (data as Override[]) || []; } catch { return []; }
}
async function loadCustom(): Promise<CatalogProduct[]> {
  try { const { data } = await supabase.from("custom_products").select("*"); return (data || []).map(customToProduct); } catch { return []; }
}

export function useCatalog(publicOnly = true): { list: CatalogProduct[]; loading: boolean } {
  const [list, setList] = useState<CatalogProduct[]>(() => mergeCatalog([]));
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let on = true;
    Promise.all([loadOverrides(), loadCustom()]).then(([ov, custom]) => {
      if (!on) return;
      let merged = [...mergeCatalog(ov), ...custom];
      if (publicOnly) merged = merged.filter((p) => p.active);
      merged.sort((a, b) => a.sort - b.sort);
      setList(merged);
      setLoading(false);
    });
    return () => { on = false; };
  }, [publicOnly]);
  return { list, loading };
}

export function useProductOverride(base: Product): CatalogProduct {
  const [p, setP] = useState<CatalogProduct>(() => ({ ...base, active: true, sort: 0, discount: 0 }));
  useEffect(() => {
    let on = true;
    loadOverrides().then((ov) => { if (!on) return; const m = mergeCatalog(ov).find((x) => x.id === base.id); if (m) setP(m); });
    return () => { on = false; };
  }, [base.id]);
  return p;
}

// Chargement d'un produit personnalisé par slug (page produit)
export function useCustomProduct(slug: string): { product: CatalogProduct | null; loading: boolean } {
  const [product, setProduct] = useState<CatalogProduct | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let on = true;
    supabase.from("custom_products").select("*").eq("slug", slug).maybeSingle().then(({ data }) => {
      if (!on) return; setProduct(data ? customToProduct(data) : null); setLoading(false);
    });
    return () => { on = false; };
  }, [slug]);
  return { product, loading };
}

export const discounted = (price: number, discount: number) =>
  discount > 0 ? Math.round(price * (1 - discount / 100) * 100) / 100 : price;
