"use client";

import { cn } from "@/lib/cn";
import type { BudgetTheme } from "@/features/budget/lib/budget-theme";

type AppNavbarProps = {
  username: string;
  theme: BudgetTheme;
  onBudgetClick: () => void;
  onSignOut: () => void | Promise<void>;
};

function BudgetIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <rect
        x="4.5"
        y="6.5"
        width="15"
        height="11"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="15.5" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function AppNavbar({
  username,
  theme,
  onBudgetClick,
  onSignOut
}: AppNavbarProps) {
  return (
    <header className="sticky top-0 z-30">
      <div className="rounded-[28px] border border-white/10 bg-black/65 px-4 py-3 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">
              User
            </p>
            <h1 className="truncate text-lg font-semibold text-white">
              {username}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Open budget dialog"
              onClick={onBudgetClick}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-white/[0.03] text-white transition-transform duration-200 active:scale-[0.98]",
                theme.subtleBorderClass,
                theme.accentTextClass
              )}
            >
              <BudgetIcon />
            </button>

            <button
              type="button"
              onClick={onSignOut}
              className="inline-flex h-11 items-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm font-medium text-white/75 transition-transform duration-200 active:scale-[0.98]"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
