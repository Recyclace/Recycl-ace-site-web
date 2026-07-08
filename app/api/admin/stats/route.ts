import { NextResponse } from "next/server";
import { adminDb, checkSession } from "@/lib/adminServer";

export async function GET(req: Request) {
  if (!(await checkSession(req))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = adminDb();
  if (!db) return NextResponse.json({ error: "service_role_missing", orders: [], views: [] });
  const since = new Date(Date.now() - 366 * 24 * 3600 * 1000).toISOString();
  const o = await db.from("orders").select("created_at,total,subtotal,items,status,country").order("created_at", { ascending: false });
  const v = await db.from("page_views").select("path,created_at").gte("created_at", since).order("created_at", { ascending: false }).limit(50000);
  return NextResponse.json({ orders: o.data || [], views: v.data || [] });
}
