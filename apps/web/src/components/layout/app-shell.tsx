

"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/context/auth-context";
import { AppNavbar } from "@/components/navigation/app-navbar";
import { AppDock } from "@/components/navigation/app-dock";
import { BudgetDialog } from "@/features/budget/components/budget-dialog";
import { useBudget } from "@/features/budget/context/budget-context";
import {
  getBudgetTheme,
  type BudgetPeriod
} from "@/features/budget/lib/budget-theme";
import { useExpenses } from "@/features/expenses/context/expense-context";

type AppShellProps = {
  budgetPeriod: BudgetPeriod;
  spentValue: number;
  children: ReactNode;
};

export function AppShell({
  budgetPeriod,
  spentValue,
  children
}: AppShellProps) {
  const { budgets, isReady: budgetsReady, updateBudget } = useBudget();
  const { isAuthenticated, isReady, signOut, user } = useAuth();
  const { isReady: expensesReady } = useExpenses();
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);
  const router = useRouter();

  const currentBudget = budgets[budgetPeriod];
  const theme = getBudgetTheme(spentValue, currentBudget);

  useEffect(() => {
    if (isReady && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isReady, router]);

  if (!isReady || !budgetsReady || !expensesReady || !isAuthenticated || !user) {
    return <div className="min-h-[100dvh] bg-[#040404]" />;
  }

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#040404] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute -left-8 top-12 h-40 w-40 rounded-full blur-3xl ${theme.accentBackgroundClass}`}
        />
        <div
          className={`absolute bottom-16 right-0 h-48 w-48 rounded-full blur-3xl ${theme.accentBackgroundClass}`}
        />
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-4 pb-6 pt-4">
        <AppNavbar
          username={user.name}
          theme={theme}
          onBudgetClick={() => setIsBudgetOpen(true)}
          onSignOut={async () => {
            await signOut();
            router.replace("/login");
          }}
        />

        <div className="mt-3">{children}</div>

        <div className="mt-3 flex justify-center pb-2">
          <AppDock theme={theme} />
        </div>
      </div>

      <BudgetDialog
        open={isBudgetOpen}
        period={budgetPeriod}
        currentBudget={currentBudget}
        spentValue={spentValue}
        onClose={() => setIsBudgetOpen(false)}
        onSave={async (amount) => {
          const result = await updateBudget(budgetPeriod, amount);

          if (result.ok) {
            setIsBudgetOpen(false);
          }

          return result;
        }}
      />
    </div>
  );
}
