import PageContent from "@/components/PageContent";
import { getPortfolioData } from "@/lib/portfolio-data";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const data = await getPortfolioData();
  return {
    title: data.site.title,
    description: data.site.description
  };
}

export default async function Home() {
  const data = await getPortfolioData();
  return <PageContent data={data} />;
}
