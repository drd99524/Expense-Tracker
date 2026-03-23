"use client";

import { useEffect, useMemo, useState } from "react";
import {
  formatCurrency,
  getBudgetLabel,
  getBudgetTheme,
  type BudgetPeriod
} from "../lib/budget-theme";

type BudgetDialogProps = {
  open: boolean;
  period: BudgetPeriod;
  currentBudget: number;
  spentValue: number;
  onClose: () => void;
  onSave: (
    amount: number
  ) => Promise<{ ok: boolean; error?: string }> | { ok: boolean; error?: string };
};

function sanitizeBudgetInput(value: string) {
  return value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
}

export function BudgetDialog({
  open,
  period,
  currentBudget,
  spentValue,
  onClose,
  onSave
}: BudgetDialogProps) {
  const [draftBudget, setDraftBudget] = useState(String(currentBudget));
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!open) return;

    setDraftBudget(String(currentBudget));
    setErrorMessage("");
  }, [currentBudget, open]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  const previewBudget = Number(draftBudget || 0);
  const theme = getBudgetTheme(spentValue, previewBudget);
  const remainingAmount = previewBudget - spentValue;
  const isValidBudget = Number.isFinite(previewBudget) && previewBudget > 0;

  const remainingLabel = useMemo(() => {
    if (!Number.isFinite(previewBudget) || previewBudget <= 0) {
      return "Enter a budget amount";
    }

    if (remainingAmount >= 0) {
      return `${formatCurrency(remainingAmount)} left`;
    }

    return `${formatCurrency(Math.abs(remainingAmount))} over`;
  }, [previewBudget, remainingAmount]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-6 backdrop-blur-md">
      <button
        type="button"
        aria-label="Close budget dialog"
        className="absolute inset-0"
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-md rounded-[30px] border bg-[#060606]/95 p-5 ${theme.subtleBorderClass} ${theme.glowClass}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
              {getBudgetLabel(period)}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Budget</h2>
          </div>

          <span
            className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em] ${theme.accentBorderClass} ${theme.accentBackgroundClass} ${theme.accentTextClass}`}
          >
            {theme.label}
          </span>
        </div>

        <label className="mt-5 block">
          <span className="text-[11px] uppercase tracking-[0.18em] text-white/35">
            Amount
          </span>

          <div
            className={`mt-2 flex items-center rounded-[24px] border bg-white/[0.03] px-4 py-4 ${theme.subtleBorderClass}`}
          >
            <span className={`text-2xl font-semibold ${theme.accentTextClass}`}>
              $
            </span>
            <input
              autoFocus
              type="text"
              inputMode="decimal"
              pattern="[0-9]*[.]?[0-9]*"
              autoComplete="off"
              value={draftBudget}
              onChange={(event) => {
                setDraftBudget(sanitizeBudgetInput(event.target.value));
                setErrorMessage("");
              }}
              placeholder="0"
              className="w-full border-0 bg-transparent pl-3 text-3xl font-semibold text-white outline-none placeholder:text-white/20"
            />
          </div>
        </label>

        <div className="mt-4 rounded-[24px] border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm text-white/55">Spent so far</p>
            <p className="text-sm font-semibold text-white">
              {formatCurrency(spentValue)}
            </p>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-sm text-white/55">Status</p>
            <p className={`text-sm font-semibold ${theme.accentTextClass}`}>
              {remainingLabel}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[20px] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-medium text-white/75"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={async () => {
              if (!isValidBudget) {
                setErrorMessage("Enter a valid budget amount greater than zero.");
                return;
              }

              const result = await onSave(Math.round(previewBudget));

              if (!result.ok) {
                setErrorMessage(result.error ?? "Unable to save your budget.");
              }
            }}
            className={`rounded-[20px] border px-4 py-3 text-sm font-medium ${theme.accentBorderClass} ${theme.accentBackgroundClass} ${theme.accentTextClass}`}
          >
            Save Budget
          </button>
        </div>

        {errorMessage ? (
          <p className="mt-3 text-sm text-red-300">{errorMessage}</p>
        ) : null}
      </div>
    </div>
  );
}
