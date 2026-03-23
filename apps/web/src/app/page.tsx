import { redirect } from "next/navigation";
import { getServerSessionUser } from "@/lib/server/session";
import { DashboardScreen } from "@/features/dashboard/screens/dashboard-screen";

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await getServerSessionUser();

  if (!user) {
    redirect("/login");
  }

  return <DashboardScreen />;
}
