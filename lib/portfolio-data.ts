import { promises as fs } from "fs";
import path from "path";
import { createClient } from "@vercel/kv";
import type { PortfolioData } from "./portfolio-types";

const kv = createClient({
  url: process.env.pramit_portfolio_KV_REST_API_URL,
  token: process.env.pramit_portfolio_KV_REST_API_TOKEN,
});

const DATA_PATH = path.join(process.cwd(), "data", "portfolio-data.json");
const KV_KEY = "portfolio-data";

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    // Try to get from KV first
    const data = await kv.get<PortfolioData>(KV_KEY);
    if (data) {
      return data;
    }
  } catch (error) {
    console.error("Failed to read from Vercel KV, falling back to local file:", error);
  }

  // Fallback to local file if KV is empty or fails (e.g., not configured yet)
  const raw = await fs.readFile(DATA_PATH, "utf8");
  return JSON.parse(raw) as PortfolioData;
}

export async function savePortfolioData(data: PortfolioData) {
  let kvSuccess = false;
  let fsSuccess = false;

  try {
    // Attempt to save to KV
    await kv.set(KV_KEY, data);
    kvSuccess = true;
  } catch (error) {
    console.error("Failed to write to Vercel KV:", error);
  }

  // Still save to local file for local development convenience
  // (This will fail on Vercel production but works locally)
  try {
    const formatted = `${JSON.stringify(data, null, 2)}\n`;
    await fs.writeFile(DATA_PATH, formatted, "utf8");
    fsSuccess = true;
  } catch (err) {
    // Ignore error (expected on Vercel production)
  }

  if (!kvSuccess && !fsSuccess) {
    throw new Error("Failed to save data to both Vercel KV and local filesystem");
  }
}
