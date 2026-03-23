"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { useAuth } from "@/features/auth/context/auth-context";
import { type BudgetPeriod } from "@/features/budget/lib/budget-theme";
import { type DashboardSnapshot } from "@/features/dashboard/data/dashboard-preview";
import {
  type ExpenseCategory,
  type ExpenseEntry
} from "../lib/expense-data";
import {
  getDefaultExpenseState,
  type ExpenseState
} from "../lib/expense-state";

type AddExpenseInput = {
  amount: number;
  category: ExpenseCategory;
  date: string;
  note: string;
};

type ExpenseContextValue = {
  isReady: boolean;
  historyItems: ExpenseEntry[];
  dashboardSnapshots: Record<BudgetPeriod, DashboardSnapshot>;
  addExpense: (
    input: AddExpenseInput
  ) => Promise<{ ok: boolean; error?: string }>;
};

const ExpenseContext = createContext<ExpenseContextValue | null>(null);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const defaultState = useMemo(() => getDefaultExpenseState(), []);
  const [historyItems, setHistoryItems] = useState<ExpenseEntry[]>(
    defaultState.historyItems
  );
  const [dashboardSnapshots, setDashboardSnapshots] = useState<
    Record<BudgetPeriod, DashboardSnapshot>
  >(defaultState.dashboardSnapshots);
  const [isReady, setIsReady] = useState(false);
  const { isAuthenticated, isReady: authReady } = useAuth();

  useEffect(() => {
    if (!authReady) {
      setIsReady(false);
      return;
    }

    if (!isAuthenticated) {
      setHistoryItems(defaultState.historyItems);
      setDashboardSnapshots(defaultState.dashboardSnapshots);
      setIsReady(true);
      return;
    }

    let isCancelled = false;

    async function loadExpenseState() {
      setIsReady(false);

      try {
        const response = await fetch("/api/expenses", {
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error("Unable to load expenses.");
        }

        const body = (await response.json()) as ExpenseState;

        if (!isCancelled) {
          setHistoryItems(body.historyItems);
          setDashboardSnapshots(body.dashboardSnapshots);
        }
      } catch {
        if (!isCancelled) {
          setHistoryItems(defaultState.historyItems);
          setDashboardSnapshots(defaultState.dashboardSnapshots);
        }
      } finally {
        if (!isCancelled) {
          setIsReady(true);
        }
      }
    }

    void loadExpenseState();

    return () => {
      isCancelled = true;
    };
  }, [authReady, defaultState.dashboardSnapshots, defaultState.historyItems, isAuthenticated]);

  const value = useMemo<ExpenseContextValue>(
    () => ({
      isReady,
      historyItems,
      dashboardSnapshots,
      async addExpense(input) {
        try {
          const response = await fetch("/api/expenses", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(input)
          });

          const body = (await response.json()) as ExpenseState & {
            error?: string;
          };

          if (!response.ok) {
            return {
              ok: false,
              error: body.error ?? "Unable to save your expense."
            };
          }

          setHistoryItems(body.historyItems);
          setDashboardSnapshots(body.dashboardSnapshots);

          return {
            ok: true
          };
        } catch {
          return {
            ok: false,
            error: "Unable to save your expense right now."
          };
        }
      }
    }),
    [dashboardSnapshots, historyItems, isReady]
  );

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error("useExpenses must be used inside ExpenseProvider");
  }

  return context;
}
