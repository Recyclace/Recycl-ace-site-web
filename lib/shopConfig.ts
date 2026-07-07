"use client";
import { supabase } from "@/lib/supabaseClient";

export const COUNTRY_NAMES: Record<string, string> = { FR: "France", BE: "Belgique", LU: "Luxembourg", CH: "Suisse", DE: "Allemagne", ES: "Espagne", IT: "Italie", NL: "Pays-Bas", PT: "Portugal" };

export async function loadShopConfig(): Promise<{ shipping: Record<string, number>; saleCountries: string[] }> {
  try {
    const { data } = await supabase.from("public_config").select("shipping, sale_countries").eq("id", 1).maybeSingle();
    return { shipping: (data?.shipping as any) || { FR: 3.99, BE: 14.99 }, saleCountries: (data?.sale_countries as any) || ["FR", "BE"] };
  } catch { return { shipping: { FR: 3.99, BE: 14.99 }, saleCountries: ["FR", "BE"] }; }
}
