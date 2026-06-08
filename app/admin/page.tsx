import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { getAdminSession } from "@/lib/admin-auth";
import { getPortfolioData } from "@/lib/portfolio-data";

export default async function AdminPage() {
  const session = getAdminSession();
  if (!session) redirect("/admin/login");

  const data = await getPortfolioData();
  return <AdminDashboard initialData={data} username={session.username} />;
}
