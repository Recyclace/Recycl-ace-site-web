import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.recyclace.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/nos-equipements", "/notre-procede", "/notre-histoire", "/clubs", "/contact"].map((r) => ({
    url: `${base}${r}`, lastModified: now, changeFrequency: "weekly" as const, priority: r === "" ? 1 : 0.8,
  }));
  const prods = products.map((p) => ({
    url: `${base}/nos-equipements/${p.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7,
  }));
  const legal = ["cgv", "mentions-legales", "politique-de-confidentialite", "politique-de-cookies"].map((d) => ({
    url: `${base}/legal/${d}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.3,
  }));
  return [...pages, ...prods, ...legal];
}
