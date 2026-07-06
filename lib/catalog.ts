"use client";
import { useEffect, useState } from "react";
import { products as seed, Product } from "@/lib/products";
import { supabase } from "@/lib/supabaseClient";

export type Override = {
  id: string;
  price?: number | null;
  name_fr?: string | null; name_en?: string | null;
  description_fr?: string | null; description_en?: string | null;
  badge_fr?: string | null; badge_en?: string | null;
  discount?: number | null; active?: boolean | null; sort?: number | null;
};

export type CatalogProduct = Product & { active: boolean; sort: number; discount: number };

const nz = (v: any) => v !== null && v !== undefined && v !== "";

export function mergeCatalog(overrides: Override[]): CatalogProduct[] {
  const map = new Map(overrides.map((o) => [o.id, o]));
  return seed.map((p, idx) => {
    const o = map.get(p.id);
    if (!o) return { ...p, active: true, sort: idx, discount: 0 };
    return {
      ...p,
      price: nz(o.price) ? Number(o.price) : p.price,
      name: { fr: nz(o.name_fr) ? o.name_fr! : p.name.fr, en: nz(o.name_en) ? o.name_en! : p.name.en },
      description: { fr: nz(o.description_fr) ? o.description_fr! : p.description.fr, en: nz(o.description_en) ? o.description_en! : p.description.en },
      badge: nz(o.badge_fr) || nz(o.badge_en)
        ? { fr: nz(o.badge_fr) ? o.badge_fr! : (p.badge?.fr || ""), en: nz(o.badge_en) ? o.badge_en! : (p.badge?.en || "") }
        : p.badge,
      active: o.active === null || o.active === undefined ? true : o.active,
      sort: nz(o.sort) ? Number(o.sort) : idx,
      discount: nz(o.discount) ? Number(o.discount) : 0,
    };
  });
}

async function loadOverrides(): Promise<Override[]> {
  try {
    const { data, error } = await supabase.from("product_overrides").select("*");
    if (error || !data) return [];
    return data as Override[];
  } catch { return []; }
}

/** Catalogue public : fusionne le catalogue de base avec les réglages de l'admin (Supabase).
 *  Toujours un fallback sûr sur le catalogue de base si Supabase est indisponible. */
export function useCatalog(publicOnly = true): { list: CatalogProduct[]; loading: boolean } {
  const [list, setList] = useState<CatalogProduct[]>(() => mergeCatalog([]));
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let on = true;
    loadOverrides().then((ov) => {
      if (!on) return;
      let merged = mergeCatalog(ov);
      if (publicOnly) merged = merged.filter((p) => p.active);
      merged.sort((a, b) => a.sort - b.sort);
      setList(merged);
      setLoading(false);
    });
    return () => { on = false; };
  }, [publicOnly]);
  return { list, loading };
}

/** Applique l'override d'un produit unique (page produit). */
export function useProductOverride(base: Product): CatalogProduct {
  const [p, setP] = useState<CatalogProduct>(() => ({ ...base, active: true, sort: 0, discount: 0 }));
  useEffect(() => {
    let on = true;
    loadOverrides().then((ov) => {
      if (!on) return;
      const merged = mergeCatalog(ov).find((x) => x.id === base.id);
      if (merged) setP(merged);
    });
    return () => { on = false; };
  }, [base.id]);
  return p;
}

export const discounted = (price: number, discount: number) =>
  discount > 0 ? Math.round(price * (1 - discount / 100) * 100) / 100 : price;
