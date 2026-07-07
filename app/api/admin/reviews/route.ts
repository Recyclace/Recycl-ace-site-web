import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { checkCode } from "@/lib/adminServer";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://efugddifeqyvhbrtefid.supabase.co";
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY;

function admin() {
  if (!SERVICE) return null;
  return createClient(URL, SERVICE);
}

export async function GET(req: Request) {
  if (!(await checkCode(req.headers.get("x-admin-code")))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = admin();
  if (!db) return NextResponse.json({ error: "service_role_missing", reviews: [] }, { status: 200 });
  const { data, error } = await db.from("reviews").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ reviews: data });
}

export async function POST(req: Request) {
  if (!(await checkCode(req.headers.get("x-admin-code")))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = admin();
  if (!db) return NextResponse.json({ error: "service_role_missing" }, { status: 400 });
  const { action, id, approved } = await req.json();
  if (action === "delete") {
    const { error } = await db.from("reviews").delete().eq("id", id);
    return NextResponse.json({ ok: !error, error: error?.message });
  }
  if (action === "approve") {
    const { error } = await db.from("reviews").update({ approved }).eq("id", id);
    return NextResponse.json({ ok: !error, error: error?.message });
  }
  return NextResponse.json({ error: "bad action" }, { status: 400 });
}
