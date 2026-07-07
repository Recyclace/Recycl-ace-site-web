import { NextResponse } from "next/server";
import { adminDb, checkCode, hasService } from "@/lib/adminServer";

export async function GET(req: Request) {
  if (!(await checkCode(req.headers.get("x-admin-code")))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = adminDb();
  if (!db) return NextResponse.json({ error: "service_role_missing" }, { status: 200 });
  const pub = await db.from("public_config").select("*").eq("id", 1).maybeSingle();
  const adm = await db.from("admin_config").select("invoice").eq("id", 1).maybeSingle();
  return NextResponse.json({ public: pub.data, invoice: adm.data?.invoice });
}

export async function POST(req: Request) {
  if (!(await checkCode(req.headers.get("x-admin-code")))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = adminDb();
  if (!db) return NextResponse.json({ error: "service_role_missing" }, { status: 400 });
  const b = await req.json();
  if (b.section === "shipping") {
    const { error } = await db.from("public_config").update({ shipping: b.shipping, sale_countries: b.sale_countries, updated_at: new Date().toISOString() }).eq("id", 1);
    return NextResponse.json({ ok: !error, error: error?.message });
  }
  if (b.section === "invoice") {
    const { error } = await db.from("admin_config").update({ invoice: b.invoice, updated_at: new Date().toISOString() }).eq("id", 1);
    return NextResponse.json({ ok: !error, error: error?.message });
  }
  if (b.section === "password") {
    if (!b.newCode || String(b.newCode).length < 6) return NextResponse.json({ ok: false, error: "code_too_short" });
    const { error } = await db.from("admin_config").update({ admin_code: b.newCode, updated_at: new Date().toISOString() }).eq("id", 1);
    return NextResponse.json({ ok: !error, error: error?.message });
  }
  return NextResponse.json({ error: "bad section" }, { status: 400 });
}
