import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET() {
  const session = getAdminSession();
  return NextResponse.json({ authenticated: Boolean(session), username: session?.username || null });
}
