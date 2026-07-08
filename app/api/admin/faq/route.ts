import { NextResponse } from "next/server";
import { adminDb, checkSession } from "@/lib/adminServer";

export async function GET(req: Request) {
  if (!(await checkSession(req))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = adminDb();
  if (!db) return NextResponse.json({ error: "service_role_missing", faqs: [] });
  const { data } = await db.from("faq").select("*").order("sort");
  return NextResponse.json({ faqs: data || [] });
}

export async function POST(req: Request) {
  if (!(await checkSession(req))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = adminDb();
  if (!db) return NextResponse.json({ error: "service_role_missing" }, { status: 400 });
  const b = await req.json();
  if (b.action === "delete") { const { error } = await db.from("faq").delete().eq("id", b.id); return NextResponse.json({ ok: !error, error: error?.message }); }
  const row: any = { question: String(b.question || "").trim(), answer: String(b.answer || "").trim(), sort: Number(b.sort) || 0, active: b.active === false ? false : true };
  if (!row.question || !row.answer) return NextResponse.json({ ok: false, error: "missing" });
  if (b.id) row.id = b.id;
  const { error } = await db.from("faq").upsert(row);
  return NextResponse.json({ ok: !error, error: error?.message });
}
