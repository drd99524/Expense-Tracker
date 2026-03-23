"use client";

import { AppShell } from "@/components/layout/app-shell";
import { useBudget } from "@/features/budget/context/budget-context";
import {
  formatCurrency,
  getBudgetTheme
} from "@/features/budget/lib/budget-theme";
import { useExpenses } from "@/features/expenses/context/expense-context";
import { formatExpenseDate } from "@/features/expenses/lib/expense-data";

export function HistoryScreen() {
  const { budgets } = useBudget();
  const { dashboardSnapshots, historyItems } = useExpenses();
  const spentValue = dashboardSnapshots.month.totalSpent;
  const theme = getBudgetTheme(spentValue, budgets.month);

  return (
    <AppShell budgetPeriod="month" spentValue={spentValue}>
      <section
        className={`flex h-[min(32rem,calc(100dvh-13rem))] flex-col rounded-[30px] border bg-[#060606]/85 p-4 ${theme.subtleBorderClass} ${theme.glowClass}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
              View History
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Recent expenses
            </h2>
          </div>

          <div
            className={`inline-flex rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${theme.accentBorderClass} ${theme.accentBackgroundClass} ${theme.accentTextClass}`}
          >
            This month
          </div>
        </div>

        <div className="mt-4 min-h-0 flex-1 space-y-2.5 overflow-y-auto pr-1">
          {historyItems.length > 0 ? (
            historyItems.map((item) => (
              <div
                key={item.id}
                className={`rounded-[24px] border bg-black/45 px-4 py-3.5 ${theme.subtleBorderClass}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-xs text-white/50">
                      {item.category} • {formatExpenseDate(item.date)}
                    </p>
                  </div>

                  <p
                    className={`shrink-0 pt-0.5 text-base font-semibold ${theme.accentTextClass}`}
                  >
                    -{formatCurrency(item.amount)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-full items-center justify-center rounded-[24px] border border-dashed border-white/10 bg-black/35 px-4 text-center text-sm text-white/45">
              No expenses yet. Add your first entry to start building history.
            </div>
          )}
        </div>
      </section>
    </AppShell>
  );
}
