import { promises as fs } from "fs";
import path from "path";
import type { PortfolioData } from "./portfolio-types";

const DATA_PATH = path.join(process.cwd(), "data", "portfolio-data.json");

export async function getPortfolioData(): Promise<PortfolioData> {
  const raw = await fs.readFile(DATA_PATH, "utf8");
  return JSON.parse(raw) as PortfolioData;
}

export async function savePortfolioData(data: PortfolioData) {
  const formatted = `${JSON.stringify(data, null, 2)}\n`;
  await fs.writeFile(DATA_PATH, formatted, "utf8");
}
