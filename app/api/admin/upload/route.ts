import { NextResponse } from "next/server";
import { adminDb, checkCode } from "@/lib/adminServer";

export async function POST(req: Request) {
  if (!(await checkCode(req.headers.get("x-admin-code")))) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const db = adminDb();
  if (!db) return NextResponse.json({ error: "service_role_missing" }, { status: 400 });
  const { name, dataUrl } = await req.json();
  const m = /^data:(.+?);base64,(.*)$/.exec(dataUrl || "");
  if (!m) return NextResponse.json({ ok: false, error: "bad_data" });
  const contentType = m[1];
  const buffer = Buffer.from(m[2], "base64");
  const ext = (contentType.split("/")[1] || "jpg").replace("jpeg", "jpg");
  const path = `${Date.now()}-${(name || "img").replace(/[^a-z0-9.]/gi, "_")}.${ext}`;
  const { error } = await db.storage.from("product-images").upload(path, buffer, { contentType, upsert: true });
  if (error) return NextResponse.json({ ok: false, error: error.message });
  const { data } = db.storage.from("product-images").getPublicUrl(path);
  return NextResponse.json({ ok: true, url: data.publicUrl });
}
