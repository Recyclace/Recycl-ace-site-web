import { NextResponse } from "next/server";
import { checkCode } from "@/lib/adminServer";

const ADMIN_USER = process.env.ADMIN_USER || process.env.NEXT_PUBLIC_ADMIN_USER || "admin";

export async function POST(req: Request) {
  const { user, code } = await req.json();
  const ok = user === ADMIN_USER && (await checkCode(code));
  return NextResponse.json({ ok });
}
