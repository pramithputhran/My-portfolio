import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import { getPortfolioData, savePortfolioData } from "@/lib/portfolio-data";
import type { PortfolioData } from "@/lib/portfolio-types";

export const runtime = "nodejs";

export async function GET() {
  if (!getAdminSession()) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(await getPortfolioData());
}

export async function PUT(request: Request) {
  if (!getAdminSession()) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = (await request.json().catch(() => null)) as PortfolioData | null;
  if (!data?.site?.ownerName || !data?.hero?.name || !Array.isArray(data.projects?.items)) {
    return NextResponse.json({ message: "Invalid portfolio data" }, { status: 400 });
  }

  await savePortfolioData(data);
  return NextResponse.json({ ok: true, updatedAt: new Date().toISOString() });
}
