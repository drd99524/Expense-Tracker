export const budgetPeriods = [
  { id: "7days", label: "7 Days" },
  { id: "month", label: "Month" },
  { id: "year", label: "Year" }
] as const;

export type BudgetPeriod = (typeof budgetPeriods)[number]["id"];
export type BudgetTone = "safe" | "warning" | "over";

export type BudgetTheme = {
  tone: BudgetTone;
  label: string;
  accentTextClass: string;
  accentBorderClass: string;
  accentBackgroundClass: string;
  subtleBorderClass: string;
  glowClass: string;
  graphStart: string;
  graphEnd: string;
  graphFill: string;
};

export const defaultBudgets: Record<BudgetPeriod, number> = {
  "7days": 420,
  month: 1800,
  year: 22000
};

const budgetThemes: Record<BudgetTone, BudgetTheme> = {
  safe: {
    tone: "safe",
    label: "On Track",
    accentTextClass: "text-[#39FF14]",
    accentBorderClass: "border-[rgba(57,255,20,0.55)]",
    accentBackgroundClass: "bg-[rgba(57,255,20,0.09)]",
    subtleBorderClass: "border-[rgba(57,255,20,0.28)]",
    glowClass: "shadow-[0_0_34px_rgba(57,255,20,0.18)]",
    graphStart: "#b4ff9f",
    graphEnd: "#39FF14",
    graphFill: "rgba(57,255,20,0.18)"
  },
  warning: {
    tone: "warning",
    label: "Near Limit",
    accentTextClass: "text-amber-300",
    accentBorderClass: "border-amber-400/55",
    accentBackgroundClass: "bg-amber-400/[0.09]",
    subtleBorderClass: "border-amber-400/28",
    glowClass: "shadow-[0_0_34px_rgba(251,191,36,0.18)]",
    graphStart: "#fde68a",
    graphEnd: "#f59e0b",
    graphFill: "rgba(245,158,11,0.18)"
  },
  over: {
    tone: "over",
    label: "Over Budget",
    accentTextClass: "text-red-300",
    accentBorderClass: "border-red-400/55",
    accentBackgroundClass: "bg-red-400/[0.09]",
    subtleBorderClass: "border-red-400/28",
    glowClass: "shadow-[0_0_34px_rgba(248,113,113,0.18)]",
    graphStart: "#fca5a5",
    graphEnd: "#ef4444",
    graphFill: "rgba(239,68,68,0.18)"
  }
};

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2
  }).format(value);
}

export function getBudgetTone(spent: number, budget: number): BudgetTone {
  if (budget <= 0) return "over";

  const usage = spent / budget;

  if (usage >= 1) return "over";
  if (usage >= 0.7) return "warning";

  return "safe";
}

export function getBudgetTheme(spent: number, budget: number) {
  return budgetThemes[getBudgetTone(spent, budget)];
}

export function getBudgetUsage(spent: number, budget: number) {
  if (budget <= 0) return 1;

  return spent / budget;
}

export function getBudgetLabel(period: BudgetPeriod) {
  return budgetPeriods.find((item) => item.id === period)?.label ?? "Month";
}
