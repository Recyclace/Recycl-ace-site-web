import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { checkCode } from "@/lib/adminServer";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://efugddifeqyvhbrtefid.supabase.co";
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY;

const admin = () => (SERVICE ? createClient(URL, SERVICE) : null);

export async function GET(req: Request) {
  if (!(await checkCode(req.headers.get("x-admin-code")))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = admin();
  if (!db) return NextResponse.json({ error: "service_role_missing", overrides: [] }, { status: 200 });
  const { data, error } = await db.from("product_overrides").select("*");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ overrides: data });
}

export async function POST(req: Request) {
  if (!(await checkCode(req.headers.get("x-admin-code")))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = admin();
  if (!db) return NextResponse.json({ error: "service_role_missing" }, { status: 400 });
  const body = await req.json();
  if (body.action === "reset") {
    const { error } = await db.from("product_overrides").delete().eq("id", body.id);
    return NextResponse.json({ ok: !error, error: error?.message });
  }
  // action === "save"
  const o = body.override || {};
  const row = {
    id: o.id,
    price: o.price === "" || o.price === undefined ? null : Number(o.price),
    name_fr: o.name_fr || null, name_en: o.name_en || null,
    description_fr: o.description_fr || null, description_en: o.description_en || null,
    badge_fr: o.badge_fr || null, badge_en: o.badge_en || null,
    image_url: o.image_url || null,
    colors: Array.isArray(o.colors) && o.colors.length ? o.colors : null,
    discount: Number(o.discount) || 0,
    active: o.active === false ? false : true,
    sort: Number(o.sort) || 0,
    updated_at: new Date().toISOString(),
  };
  const { error } = await db.from("product_overrides").upsert(row, { onConflict: "id" });
  return NextResponse.json({ ok: !error, error: error?.message });
}
