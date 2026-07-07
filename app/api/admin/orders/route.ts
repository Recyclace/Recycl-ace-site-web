import { NextResponse } from "next/server";
import { adminDb, checkCode } from "@/lib/adminServer";

export async function GET(req: Request) {
  if (!(await checkCode(req.headers.get("x-admin-code")))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = adminDb();
  if (!db) return NextResponse.json({ error: "service_role_missing", orders: [] });
  const { data, error } = await db.from("orders").select("*").order("created_at", { ascending: false });
  return NextResponse.json({ orders: data || [], error: error?.message });
}

export async function POST(req: Request) {
  if (!(await checkCode(req.headers.get("x-admin-code")))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = adminDb();
  if (!db) return NextResponse.json({ error: "service_role_missing" }, { status: 400 });
  const b = await req.json();
  if (b.action === "delete") { const { error } = await db.from("orders").delete().eq("id", b.id); return NextResponse.json({ ok: !error, error: error?.message }); }
  if (b.action === "status") { const { error } = await db.from("orders").update({ status: b.status }).eq("id", b.id); return NextResponse.json({ ok: !error, error: error?.message }); }
  return NextResponse.json({ error: "bad action" }, { status: 400 });
}
