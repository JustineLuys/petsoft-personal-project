import AdminDashboardContent from "@/components/dashboard-admin/AdminDashboardContent";
import DashboardMenu from "@/components/dashboard-admin/DashboardMenu";
import { checkAdminAuth } from "@/lib/server-utils";

export default async function AdminDashboardPage() {
  await checkAdminAuth();
  return (
    <main className="flex justify-between">
      <DashboardMenu />
      <AdminDashboardContent />
    </main>
  );
}
