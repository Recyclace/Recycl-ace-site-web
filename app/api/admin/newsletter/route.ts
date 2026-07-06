import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://efugddifeqyvhbrtefid.supabase.co";
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_CODE = process.env.ADMIN_CODE || process.env.NEXT_PUBLIC_ADMIN_CODE || "recyclace2026";

const auth = (req: Request) => req.headers.get("x-admin-code") === ADMIN_CODE;
const admin = () => (SERVICE ? createClient(URL, SERVICE) : null);

export async function GET(req: Request) {
  if (!auth(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = admin();
  if (!db) return NextResponse.json({ error: "service_role_missing", subscribers: [] }, { status: 200 });
  const { data, error } = await db.from("newsletter_subscribers").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ subscribers: data });
}
