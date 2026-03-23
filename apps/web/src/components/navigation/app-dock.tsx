"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import type { BudgetTheme } from "@/features/budget/lib/budget-theme";

type AppDockProps = {
  theme: BudgetTheme;
};

type NavItem = {
  href: string;
  label: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  featured?: boolean;
};

function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4.75 10.25L12 4.75L19.25 10.25V18a1.25 1.25 0 0 1-1.25 1.25H6A1.25 1.25 0 0 1 4.75 18V10.25Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.25 19.25V12.5H14.75V19.25"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AddIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle
        cx="12"
        cy="12"
        r="8"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M12 8.5V15.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M8.5 12H15.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HistoryIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6 6.75H18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M6 12H18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M6 17.25H14"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="17.5" cy="17.25" r="1.25" fill="currentColor" />
    </svg>
  );
}

const navItems: readonly NavItem[] = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/add-expense", label: "Add expense", icon: AddIcon, featured: true },
  { href: "/history", label: "View history", icon: HistoryIcon }
];

export function AppDock({ theme }: AppDockProps) {
  const pathname = usePathname();

  return (
    <div className="pointer-events-auto rounded-[30px] border border-white/10 bg-black/70 p-2 shadow-[0_18px_48px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
      <div className="flex items-end gap-2">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href === "/history" && pathname === "/transactions");

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={cn(
                "group flex h-14 w-14 items-center justify-center rounded-[22px] border transition-all duration-200 hover:-translate-y-1 hover:scale-105",
                item.featured
                  ? `${theme.accentBorderClass} ${theme.accentBackgroundClass} ${theme.glowClass}`
                  : active
                    ? `${theme.subtleBorderClass} bg-white/[0.06]`
                    : "border-transparent bg-transparent",
                active ? theme.accentTextClass : "text-white/55"
              )}
            >
              <item.icon className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
