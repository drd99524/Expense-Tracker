"use client";

import { startTransition, useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { useBudget } from "@/features/budget/context/budget-context";
import {
  getBudgetTheme,
  type BudgetPeriod
} from "@/features/budget/lib/budget-theme";
import { useExpenses } from "@/features/expenses/context/expense-context";
import { MonthViewCard } from "../components/month-view-card";
import { SpendingGraphCard } from "../components/spending-graph-card";

export function DashboardScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState<BudgetPeriod>("month");
  const { budgets } = useBudget();
  const { dashboardSnapshots } = useExpenses();
  const snapshot = dashboardSnapshots[selectedPeriod];
  const currentBudget = budgets[selectedPeriod];
  const theme = getBudgetTheme(snapshot.totalSpent, currentBudget);

  return (
    <AppShell budgetPeriod={selectedPeriod} spentValue={snapshot.totalSpent}>
      <div className="space-y-4">
        <SpendingGraphCard
          snapshot={snapshot}
          selectedPeriod={selectedPeriod}
          onPeriodChange={(period) => {
            startTransition(() => setSelectedPeriod(period));
          }}
          theme={theme}
        />

        <MonthViewCard
          snapshot={snapshot}
          period={selectedPeriod}
          budget={currentBudget}
          theme={theme}
        />
      </div>
    </AppShell>
  );
}
