import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminCookieOptions, createSessionToken, verifyAdminCredentials } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { username = "", password = "" } = await request.json().catch(() => ({}));

  if (!verifyAdminCredentials(String(username), String(password))) {
    return NextResponse.json({ message: "Invalid username or password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createSessionToken(String(username)), adminCookieOptions);
  return response;
}
