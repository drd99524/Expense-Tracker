import { redirect } from "next/navigation";
import { DashboardScreen } from "@/features/dashboard/screens/dashboard-screen";
import { getServerSessionUser } from "@/lib/server/session";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getServerSessionUser();

  if (!user) {
    redirect("/login");
  }

  return <DashboardScreen />;
}
