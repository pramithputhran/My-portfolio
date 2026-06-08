import { promises as fs } from "fs";
import path from "path";
import type { PortfolioData } from "./portfolio-types";

// Create KV client with custom environment variable names
let kv: any = null;

function initializeKV() {
  if (kv) return kv;
  
  const url = process.env.pramit_portfolio_KV_REST_API_URL;
  const token = process.env.pramit_portfolio_KV_REST_API_TOKEN;
  
  if (!url || !token) {
    console.warn("Vercel KV not configured. Using local storage only.");
    return null;
  }
  
  const { createClient } = require("@vercel/kv");
  kv = createClient({ url, token });
  return kv;
}

const DATA_PATH = path.join(process.cwd(), "data", "portfolio-data.json");
const KV_KEY = "portfolio-data";

export async function getPortfolioData(): Promise<PortfolioData> {
  const kvClient = initializeKV();
  
  if (kvClient) {
    try {
      const data = await kvClient.get<PortfolioData>(KV_KEY);
      if (data) {
        return data;
      }
    } catch (error) {
      console.error("Failed to read from Vercel KV, falling back to local file:", error);
    }
  }

  // Fallback to local file if KV is empty or fails
  const raw = await fs.readFile(DATA_PATH, "utf8");
  return JSON.parse(raw) as PortfolioData;
}

export async function savePortfolioData(data: PortfolioData) {
  const kvClient = initializeKV();
  let kvSuccess = false;
  let fsSuccess = false;

  if (kvClient) {
    try {
      // Attempt to save to KV
      await kvClient.set(KV_KEY, data);
      kvSuccess = true;
    } catch (error) {
      console.error("Failed to write to Vercel KV:", error);
    }
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
