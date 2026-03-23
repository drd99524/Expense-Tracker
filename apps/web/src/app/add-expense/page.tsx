//apps/web/src/app/add-expense/page.tsx

import { redirect } from "next/navigation";
import { getServerSessionUser } from "@/lib/server/session";
import { AddExpenseScreen } from "@/features/expenses/screens/add-expense-screen";

export const dynamic = "force-dynamic";

export default async function AddExpensePage() {
  const user = await getServerSessionUser();

  if (!user) {
    redirect("/login");
  }

  return <AddExpenseScreen />;
}
