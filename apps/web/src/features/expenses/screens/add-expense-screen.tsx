"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { useBudget } from "@/features/budget/context/budget-context";
import { getBudgetTheme } from "@/features/budget/lib/budget-theme";
import { useExpenses } from "@/features/expenses/context/expense-context";
import {
  expenseCategories,
  getTodayIsoDate,
  isoDateToDigits,
  parseExpenseDigits,
  type ExpenseCategory,
} from "@/features/expenses/lib/expense-data";
import { MaskedDateField } from "../components/masked-date-field";

function sanitizeAmountInput(value: string) {
  return value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
}

export function AddExpenseScreen() {
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ExpenseCategory>("Food");
  const [expenseDate, setExpenseDate] = useState(() =>
    isoDateToDigits(getTodayIsoDate()),
  );
  const [note, setNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const { budgets } = useBudget();
  const { addExpense, dashboardSnapshots } = useExpenses();
  const spentValue = dashboardSnapshots.month.totalSpent;
  const theme = getBudgetTheme(spentValue, budgets.month);
  const router = useRouter();

  async function handleSave() {
    setErrorMessage("");

    const parsedAmount = Number(amount);

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage("Enter a valid amount greater than zero.");
      return;
    }

    const parsedDate = parseExpenseDigits(expenseDate);

    if (!parsedDate) {
      setErrorMessage("Enter a valid date in DD/MM/YYYY format.");
      return;
    }

    const result = await addExpense({
      amount: parsedAmount,
      category: selectedCategory,
      date: parsedDate.isoDate,
      note,
    });

    if (!result.ok) {
      setErrorMessage(result.error ?? "Unable to save your expense.");
      return;
    }

    startTransition(() => {
      router.replace("/dashboard");
    });
  }

  return (
    <AppShell budgetPeriod="month" spentValue={spentValue}>
      <div className="space-y-4">
        <section
          className={`rounded-[30px] border bg-[#060606]/85 p-4 ${theme.subtleBorderClass} ${theme.glowClass}`}
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
            Add Expense
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white">New entry</h2>

          <div
            className={`mt-4 rounded-[26px] border bg-black/45 p-4 ${theme.subtleBorderClass}`}
          >
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
              Amount
            </p>

            <div className="mt-3 flex items-end gap-3">
              <span
                className={`text-3xl font-semibold ${theme.accentTextClass}`}
              >
                $
              </span>
              <input
                type="text"
                inputMode="decimal"
                pattern="[0-9]*[.]?[0-9]*"
                autoComplete="off"
                value={amount}
                onChange={(event) => {
                  setAmount(sanitizeAmountInput(event.target.value));
                  setErrorMessage("");
                }}
                placeholder="0.00"
                className="w-full border-0 bg-transparent text-4xl font-semibold text-white outline-none placeholder:text-white/20"
              />
            </div>
          </div>

          <div className="mt-5 space-y-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                Category
              </p>

              <div className="mt-3 grid grid-cols-3 gap-2">
                {expenseCategories.map((category) => {
                  const active = selectedCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={
                        active
                          ? `w-full rounded-[18px] border px-3 py-3 text-center text-sm font-medium ${theme.accentBorderClass} ${theme.accentBackgroundClass} ${theme.accentTextClass}`
                          : "w-full rounded-[18px] border border-white/10 bg-white/[0.03] px-3 py-3 text-center text-sm font-medium text-white/65"
                      }
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                Date
              </p>

              <MaskedDateField
                digits={expenseDate}
                onChange={(nextDigits) => {
                  setExpenseDate(nextDigits);
                  setErrorMessage("");
                }}
                className="mt-3"
                borderClassName={theme.subtleBorderClass}
                activeTextClassName={theme.accentTextClass}
                activeBackgroundClassName={theme.accentBackgroundClass}
              />
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/35">
                Note
              </p>

              <textarea
                value={note}
                onChange={(event) => {
                  setNote(event.target.value);
                  setErrorMessage("");
                }}
                placeholder="Add a note"
                rows={4}
                className={`mt-3 w-full resize-none rounded-[24px] border bg-white/[0.03] px-4 py-4 text-sm text-white outline-none placeholder:text-white/20 ${theme.subtleBorderClass}`}
              />
            </div>
          </div>
        </section>

        {errorMessage ? (
          <p className="px-1 text-sm text-red-300">{errorMessage}</p>
        ) : null}

        <button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className={`w-full rounded-[26px] border px-4 py-4 text-base font-semibold ${theme.accentBorderClass} ${theme.accentBackgroundClass} ${theme.accentTextClass} disabled:opacity-60`}
        >
          {isPending ? "Saving..." : "Save Expense"}
        </button>
      </div>
    </AppShell>
  );
}
