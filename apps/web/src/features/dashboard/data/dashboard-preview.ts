import {
  type BudgetPeriod
} from "@/features/budget/lib/budget-theme";

export type CategorySnapshot = {
  name: string;
  amount: number;
};

export type DashboardSnapshot = {
  totalSpent: number;
  chartPoints: readonly number[];
  categories: readonly CategorySnapshot[];
  comparisonPercent: number;
  comparisonDirection: "above" | "below";
  comparisonReference: string;
};

export const dashboardPreviewByPeriod: Record<BudgetPeriod, DashboardSnapshot> =
  {
    "7days": {
      totalSpent: 286,
      chartPoints: [18, 24, 17, 33, 29, 41, 35, 44, 32, 50, 46, 57],
      categories: [
        { name: "Food", amount: 104 },
        { name: "Gas", amount: 62 },
        { name: "Groceries", amount: 71 },
        { name: "Shopping", amount: 49 }
      ],
      comparisonPercent: 8.2,
      comparisonDirection: "above",
      comparisonReference: "through Mar 8, 2026"
    },
    month: {
      totalSpent: 1248,
      chartPoints: [88, 112, 94, 138, 122, 156, 168, 149, 191, 208, 197, 238],
      categories: [
        { name: "Food", amount: 402 },
        { name: "Gas", amount: 168 },
        { name: "Groceries", amount: 318 },
        { name: "Shopping", amount: 214 }
      ],
      comparisonPercent: 12.4,
      comparisonDirection: "above",
      comparisonReference: "through Feb 15, 2026"
    },
    year: {
      totalSpent: 9840,
      chartPoints: [520, 610, 568, 694, 748, 730, 812, 884, 856, 930, 978, 1058],
      categories: [
        { name: "Food", amount: 3320 },
        { name: "Gas", amount: 1240 },
        { name: "Groceries", amount: 2380 },
        { name: "Shopping", amount: 1900 }
      ],
      comparisonPercent: 6.8,
      comparisonDirection: "below",
      comparisonReference: "through Mar 15, 2025"
    }
  };
