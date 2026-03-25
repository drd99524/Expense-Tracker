//apps/web/src/app/layout.tsx

import type { Metadata } from "next";
import { AuthProvider } from "@/features/auth/context/auth-context";
import { BudgetProvider } from "@/features/budget/context/budget-context";
import { ExpenseProvider } from "@/features/expenses/context/expense-context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description:
    "Expense Tracker is a secure budgeting and expense tracking web app with private accounts, public policy pages, and persistent user dashboards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <BudgetProvider>
            <ExpenseProvider>{children}</ExpenseProvider>
          </BudgetProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
