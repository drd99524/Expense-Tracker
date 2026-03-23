import { redirect } from "next/navigation";
import { getServerSessionUser } from "@/lib/server/session";
import { HistoryScreen } from "@/features/history/screens/history-screen";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
  const user = await getServerSessionUser();

  if (!user) {
    redirect("/login");
  }

  return <HistoryScreen />;
}
