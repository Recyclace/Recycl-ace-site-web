import { NextResponse } from "next/server";
import { checkCode, createSessionToken, SESSION_COOKIE } from "@/lib/adminServer";

const ADMIN_USER = process.env.ADMIN_USER || process.env.NEXT_PUBLIC_ADMIN_USER || "admin";

export async function POST(req: Request) {
  const { user, code, action } = await req.json();
  if (action === "logout") {
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 });
    return res;
  }
  const ok = user === ADMIN_USER && (await checkCode(code));
  const res = NextResponse.json({ ok });
  if (ok) res.cookies.set(SESSION_COOKIE, createSessionToken(), { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 12 });
  return res;
}
