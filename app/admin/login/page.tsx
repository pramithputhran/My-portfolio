import { redirect } from "next/navigation";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  if (isAdminAuthenticated()) redirect("/admin");

  return <AdminLoginForm />;
}
