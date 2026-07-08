import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { path, referrer } = await req.json();
    if (path) await supabase.from("page_views").insert({ path: String(path).slice(0, 300), referrer: referrer ? String(referrer).slice(0, 300) : null });
  } catch {}
  return NextResponse.json({ ok: true });
}
