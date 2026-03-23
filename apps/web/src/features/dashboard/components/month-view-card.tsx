import {
  formatCurrency,
  getBudgetUsage,
  getBudgetLabel,
  type BudgetPeriod,
  type BudgetTheme
} from "@/features/budget/lib/budget-theme";
import type { DashboardSnapshot } from "../data/dashboard-preview";

type MonthViewCardProps = {
  snapshot: DashboardSnapshot;
  period: BudgetPeriod;
  budget: number;
  theme: BudgetTheme;
};

export function MonthViewCard({
  snapshot,
  period,
  budget,
  theme
}: MonthViewCardProps) {
  const usage = Math.min(getBudgetUsage(snapshot.totalSpent, budget), 1.25);
  const comparisonVerb =
    snapshot.comparisonDirection === "above" ? "above" : "below";

  return (
    <section
      className={`rounded-[30px] border bg-[#060606]/85 p-4 ${theme.subtleBorderClass} ${theme.glowClass}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
            {getBudgetLabel(period)} View
          </p>
          <div
            className={`mt-3 inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium ${theme.accentBorderClass} ${theme.accentBackgroundClass} ${theme.accentTextClass}`}
          >
            Budget {formatCurrency(budget)}
          </div>
        </div>

        <div className="text-right">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
            Total spent
          </p>
          <p className="mt-2 text-3xl font-semibold text-white">
            {formatCurrency(snapshot.totalSpent)}
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-[24px] border border-white/10 bg-black/45 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-white/55">Budget usage</p>
          <p className={`text-sm font-semibold ${theme.accentTextClass}`}>
            {(usage * 100).toFixed(0)}%
          </p>
        </div>

        <div className="mt-3 h-2 rounded-full bg-white/8">
          <div
            className={`h-2 rounded-full ${theme.accentBackgroundClass}`}
            style={{ width: `${Math.min(usage * 100, 100)}%` }}
          />
        </div>

        <p className={`mt-4 text-sm ${theme.accentTextClass}`}>
          {snapshot.comparisonPercent.toFixed(1)}% {comparisonVerb} {snapshot.comparisonReference}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {snapshot.categories.map((category) => (
          <div
            key={category.name}
            className={`rounded-[24px] border bg-white/[0.03] p-4 ${theme.subtleBorderClass}`}
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
              {category.name}
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              {formatCurrency(category.amount)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
