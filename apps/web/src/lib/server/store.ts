import { createClient } from "@/lib/supabase/server";
import {
  budgetPeriods,
  defaultBudgets,
  type BudgetPeriod,
} from "@/features/budget/lib/budget-theme";
import {
  expenseCategories,
  type ExpenseEntry,
} from "@/features/expenses/lib/expense-data";

type BudgetMap = Record<BudgetPeriod, number>;

type BudgetRow = {
  period: BudgetPeriod;
  amount: number;
  updated_at?: string;
};

type ExpenseRow = {
  id: string;
  user_id?: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  note: string;
  created_at?: string;
};

function toExpenseEntry(row: ExpenseRow): ExpenseEntry {
  return {
    id: row.id,
    title: row.title,
    category: row.category as ExpenseEntry["category"],
    amount: Number(row.amount),
    date: row.date,
    note: row.note,
  };
}

function createBudgetMap(overrides?: Partial<BudgetMap>): BudgetMap {
  return {
    ...defaultBudgets,
    ...overrides,
  };
}

function toBudgetPeriod(value: string): BudgetPeriod | null {
  return budgetPeriods.some((period) => period.id === value)
    ? (value as BudgetPeriod)
    : null;
}

async function readUserBudgets(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("budgets")
    .select("period, amount")
    .eq("user_id", userId);

  if (error) {
    throw new Error("Unable to load budgets.");
  }

  return (data ?? []).reduce<BudgetMap>((result, row) => {
    const period = toBudgetPeriod((row as BudgetRow).period);

    if (period) {
      result[period] = Number((row as BudgetRow).amount);
    }

    return result;
  }, createBudgetMap());
}

async function readUserExpenses(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("expenses")
    .select("id, title, category, amount, date, note, created_at")
    .eq("user_id", userId)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false })
    .order("id", { ascending: false });

  if (error) {
    throw new Error("Unable to load expenses.");
  }

  return (data ?? []).map((row) => toExpenseEntry(row as ExpenseRow));
}

export async function getBudgetsForUser(userId: string) {
  return readUserBudgets(userId);
}

export async function updateBudgetForUser(
  userId: string,
  period: BudgetPeriod,
  amount: number,
) {
  const supabase = await createClient();
  const { error } = await supabase.from("budgets").upsert(
    {
      user_id: userId,
      period,
      amount,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "user_id,period",
    },
  );

  if (error) {
    throw new Error("Unable to save your budget.");
  }

  return readUserBudgets(userId);
}

export async function getExpensesForUser(userId: string) {
  return readUserExpenses(userId);
}

export async function addExpenseForUser(
  userId: string,
  expense: Omit<ExpenseEntry, "id">,
) {
  if (!expenseCategories.includes(expense.category)) {
    throw new Error("Unable to save your expense.");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("expenses").insert({
    user_id: userId,
    title: expense.title,
    category: expense.category,
    amount: expense.amount,
    date: expense.date,
    note: expense.note,
  });

  if (error) {
    throw new Error("Unable to save your expense.");
  }

  return readUserExpenses(userId);
}
