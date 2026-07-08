import { NextResponse } from "next/server";
import { adminDb, checkSession } from "@/lib/adminServer";

export async function GET(req: Request) {
  if (!(await checkSession(req))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = adminDb();
  if (!db) return NextResponse.json({ error: "service_role_missing", points: [] });
  const { data, error } = await db.from("map_points").select("*").order("city");
  return NextResponse.json({ points: data || [], error: error?.message });
}

export async function POST(req: Request) {
  if (!(await checkSession(req))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = adminDb();
  if (!db) return NextResponse.json({ error: "service_role_missing" }, { status: 400 });
  const b = await req.json();
  if (b.action === "delete") {
    const { error } = await db.from("map_points").delete().eq("id", b.id);
    return NextResponse.json({ ok: !error, error: error?.message });
  }
  const row = { kind: b.kind === "shop" ? "shop" : "club", city: String(b.city || "").trim(), lat: Number(b.lat), lng: Number(b.lng) };
  if (!row.city || Number.isNaN(row.lat) || Number.isNaN(row.lng)) return NextResponse.json({ ok: false, error: "invalid" });
  const { error } = await db.from("map_points").insert(row);
  return NextResponse.json({ ok: !error, error: error?.message });
}
