import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { checkCode } from "@/lib/adminServer";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://efugddifeqyvhbrtefid.supabase.co";
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY;

const admin = () => (SERVICE ? createClient(URL, SERVICE) : null);

export async function GET(req: Request) {
  if (!(await checkCode(req.headers.get("x-admin-code")))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = admin();
  if (!db) return NextResponse.json({ error: "service_role_missing", subscribers: [] }, { status: 200 });
  const { data, error } = await db.from("newsletter_subscribers").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ subscribers: data });
}
