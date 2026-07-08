import { NextResponse } from "next/server";
import { adminDb, checkSession } from "@/lib/adminServer";

export async function GET(req: Request) {
  if (!(await checkSession(req))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = adminDb();
  if (!db) return NextResponse.json({ error: "service_role_missing", promos: [] });
  const { data, error } = await db.from("promo_codes").select("*").order("created_at", { ascending: false });
  return NextResponse.json({ promos: data || [], error: error?.message });
}

export async function POST(req: Request) {
  if (!(await checkSession(req))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = adminDb();
  if (!db) return NextResponse.json({ error: "service_role_missing" }, { status: 400 });
  const b = await req.json();
  if (b.action === "delete") {
    const { error } = await db.from("promo_codes").delete().eq("id", b.id);
    return NextResponse.json({ ok: !error, error: error?.message });
  }
  const row = {
    code: String(b.code || "").trim().toUpperCase(),
    kind: b.kind || "percent",
    value: Number(b.value) || 0,
    expires_at: b.expires_at || null,
    max_uses: b.max_uses ? Number(b.max_uses) : null,
    active: b.active === false ? false : true,
  };
  if (!row.code) return NextResponse.json({ ok: false, error: "code_required" });
  const { error } = await db.from("promo_codes").upsert(row, { onConflict: "code" });
  return NextResponse.json({ ok: !error, error: error?.message });
}
