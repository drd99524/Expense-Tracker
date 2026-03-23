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
import {
  defaultBudgets,
  type BudgetPeriod
} from "../lib/budget-theme";

type BudgetMap = Record<BudgetPeriod, number>;

type BudgetContextValue = {
  isReady: boolean;
  budgets: BudgetMap;
  updateBudget: (
    period: BudgetPeriod,
    amount: number
  ) => Promise<{ ok: boolean; error?: string }>;
};

const BudgetContext = createContext<BudgetContextValue | null>(null);

export function BudgetProvider({ children }: { children: ReactNode }) {
  const [budgets, setBudgets] = useState<BudgetMap>(defaultBudgets);
  const [isReady, setIsReady] = useState(false);
  const { isAuthenticated, isReady: authReady } = useAuth();

  useEffect(() => {
    if (!authReady) {
      setIsReady(false);
      return;
    }

    if (!isAuthenticated) {
      setBudgets(defaultBudgets);
      setIsReady(true);
      return;
    }

    let isCancelled = false;

    async function loadBudgets() {
      setIsReady(false);

      try {
        const response = await fetch("/api/budgets", {
          cache: "no-store"
        });

        if (!response.ok) {
          throw new Error("Unable to load budgets.");
        }

        const body = (await response.json()) as { budgets: BudgetMap };

        if (!isCancelled) {
          setBudgets(body.budgets);
        }
      } catch {
        if (!isCancelled) {
          setBudgets(defaultBudgets);
        }
      } finally {
        if (!isCancelled) {
          setIsReady(true);
        }
      }
    }

    void loadBudgets();

    return () => {
      isCancelled = true;
    };
  }, [authReady, isAuthenticated]);

  const value = useMemo(
    () => ({
      isReady,
      budgets,
      async updateBudget(period: BudgetPeriod, amount: number) {
        try {
          const response = await fetch("/api/budgets", {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              period,
              amount
            })
          });

          const body = (await response.json()) as {
            budgets?: BudgetMap;
            error?: string;
          };

          if (!response.ok || !body.budgets) {
            return {
              ok: false,
              error: body.error ?? "Unable to save your budget."
            };
          }

          setBudgets(body.budgets);

          return {
            ok: true
          };
        } catch {
          return {
            ok: false,
            error: "Unable to save your budget right now."
          };
        }
      }
    }),
    [budgets, isReady]
  );

  return (
    <BudgetContext.Provider value={value}>{children}</BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);

  if (!context) {
    throw new Error("useBudget must be used inside BudgetProvider");
  }

  return context;
}
