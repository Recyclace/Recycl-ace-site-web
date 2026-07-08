import { NextResponse } from "next/server";
import { adminDb, checkSession } from "@/lib/adminServer";

export async function GET(req: Request) {
  if (!(await checkSession(req))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = adminDb();
  if (!db) return NextResponse.json({ error: "service_role_missing", products: [] });
  const { data, error } = await db.from("custom_products").select("*").order("created_at", { ascending: false });
  return NextResponse.json({ products: data || [], error: error?.message });
}

export async function POST(req: Request) {
  if (!(await checkSession(req))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = adminDb();
  if (!db) return NextResponse.json({ error: "service_role_missing" }, { status: 400 });
  const b = await req.json();
  if (b.action === "delete") { const { error } = await db.from("custom_products").delete().eq("id", b.id); return NextResponse.json({ ok: !error, error: error?.message }); }
  const p = b.product || {};
  const slug = String(p.slug || p.name_fr || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (!slug) return NextResponse.json({ ok: false, error: "name_required" });
  const row: any = {
    slug, name_fr: p.name_fr || "", name_en: p.name_en || p.name_fr || "",
    category_fr: p.category_fr || "", category_en: p.category_en || p.category_fr || "",
    description_fr: p.description_fr || "", description_en: p.description_en || p.description_fr || "",
    price: Number(p.price) || 0, badge_fr: p.badge_fr || null, badge_en: p.badge_en || null,
    image_url: p.image_url || null, colors: p.colors || [], active: p.active === false ? false : true, sort: Number(p.sort) || 100,
  };
  if (p.id) row.id = p.id;
  const { error } = await db.from("custom_products").upsert(row, { onConflict: "slug" });
  return NextResponse.json({ ok: !error, error: error?.message });
}
