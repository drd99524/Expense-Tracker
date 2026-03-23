import { type BudgetPeriod } from "@/features/budget/lib/budget-theme";
import { type DashboardSnapshot } from "@/features/dashboard/data/dashboard-preview";
import {
  expenseCategories,
  parseIsoDate,
  type ExpenseCategory,
  type ExpenseEntry,
} from "./expense-data";

export type ExpenseState = {
  historyItems: ExpenseEntry[];
  dashboardSnapshots: Record<BudgetPeriod, DashboardSnapshot>;
};

const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});
const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
});

function roundCurrency(value: number) {
  return Math.round(value * 100) / 100;
}

function getStartOfDay(value: Date) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

function getReferenceDate() {
  return getStartOfDay(new Date());
}

function isWithinPeriod(
  value: Date,
  period: BudgetPeriod,
  referenceDate: Date,
) {
  if (period === "year") {
    return value.getFullYear() === referenceDate.getFullYear();
  }

  if (period === "month") {
    return (
      value.getFullYear() === referenceDate.getFullYear() &&
      value.getMonth() === referenceDate.getMonth()
    );
  }

  const start = getStartOfDay(referenceDate);
  start.setDate(start.getDate() - 6);

  return value >= start && value <= referenceDate;
}

function getBucketIndex(
  value: Date,
  period: BudgetPeriod,
  size: number,
  referenceDate: Date,
) {
  if (period === "year") {
    return Math.min(size - 1, Math.max(0, value.getMonth()));
  }

  if (period === "month") {
    const daysInMonth = new Date(
      value.getFullYear(),
      value.getMonth() + 1,
      0,
    ).getDate();

    return Math.min(
      size - 1,
      Math.floor(((value.getDate() - 1) / daysInMonth) * size),
    );
  }

  const referenceStart = getStartOfDay(referenceDate);
  referenceStart.setDate(referenceStart.getDate() - 6);
  const diffDays = Math.round(
    (getStartOfDay(value).getTime() - referenceStart.getTime()) / 86400000,
  );

  return Math.min(size - 1, Math.max(0, Math.floor((diffDays / 7) * size)));
}

function compareEntries(a: ExpenseEntry, b: ExpenseEntry) {
  const left = parseIsoDate(a.date)?.getTime() ?? 0;
  const right = parseIsoDate(b.date)?.getTime() ?? 0;

  if (left !== right) {
    return right - left;
  }

  return b.id.localeCompare(a.id);
}

function createEmptySnapshot(
  period: BudgetPeriod,
  referenceDate: Date,
): DashboardSnapshot {
  return {
    totalSpent: 0,
    chartPoints: Array.from({ length: 12 }, () => 0),
    categories: expenseCategories.map((name) => ({
      name,
      amount: 0,
    })),
    comparisonPercent: 0,
    comparisonDirection: "below",
    comparisonReference:
      period === "year"
        ? `through ${monthFormatter.format(referenceDate)}`
        : `through ${fullDateFormatter.format(referenceDate)}`,
  };
}

function buildSnapshot(
  period: BudgetPeriod,
  userExpenses: ExpenseEntry[],
  referenceDate: Date,
): DashboardSnapshot {
  const baseSnapshot = createEmptySnapshot(period, referenceDate);
  const nextChart = Array.from(baseSnapshot.chartPoints);
  const categoryTotals = new Map<string, number>(
    baseSnapshot.categories.map((category) => [category.name, category.amount]),
  );

  let nextTotal = baseSnapshot.totalSpent;

  userExpenses.forEach((expense) => {
    const parsedDate = parseIsoDate(expense.date);

    if (!parsedDate || !isWithinPeriod(parsedDate, period, referenceDate)) {
      return;
    }

    nextTotal += expense.amount;
    categoryTotals.set(
      expense.category,
      roundCurrency(
        (categoryTotals.get(expense.category) ?? 0) + expense.amount,
      ),
    );

    const bucketIndex = getBucketIndex(
      parsedDate,
      period,
      nextChart.length,
      referenceDate,
    );
    nextChart[bucketIndex] = roundCurrency(
      nextChart[bucketIndex] + expense.amount,
    );
  });

  const categories = Array.from(categoryTotals, ([name, amount]) => ({
    name,
    amount: roundCurrency(amount),
  })).sort((left, right) => {
    const leftIndex = expenseCategories.indexOf(left.name as ExpenseCategory);
    const rightIndex = expenseCategories.indexOf(right.name as ExpenseCategory);

    return (
      (leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex) -
      (rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex)
    );
  });

  return {
    ...baseSnapshot,
    totalSpent: roundCurrency(nextTotal),
    chartPoints: nextChart,
    categories,
  };
}

export function buildExpenseState(userExpenses: ExpenseEntry[]): ExpenseState {
  const referenceDate = getReferenceDate();

  return {
    historyItems: [...userExpenses].sort(compareEntries),
    dashboardSnapshots: {
      "7days": buildSnapshot("7days", userExpenses, referenceDate),
      month: buildSnapshot("month", userExpenses, referenceDate),
      year: buildSnapshot("year", userExpenses, referenceDate),
    },
  };
}

export function getDefaultExpenseState(): ExpenseState {
  return buildExpenseState([]);
}
