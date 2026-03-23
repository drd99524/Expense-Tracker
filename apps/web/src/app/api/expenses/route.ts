import { NextResponse } from "next/server";
import { expenseFieldLimits } from "@/lib/server/constants";
import { readJsonObject } from "@/lib/server/request";
import { buildExpenseState } from "@/features/expenses/lib/expense-state";
import {
  expenseCategories,
  parseIsoDate,
  type ExpenseCategory,
} from "@/features/expenses/lib/expense-data";
import { getServerSessionUser } from "@/lib/server/session";
import { addExpenseForUser, getExpensesForUser } from "@/lib/server/store";

function unauthorized() {
  return NextResponse.json(
    {
      error: "Unauthorized.",
    },
    { status: 401 },
  );
}

export async function GET() {
  const user = await getServerSessionUser();

  if (!user) {
    return unauthorized();
  }

  try {
    const expenses = await getExpensesForUser(user.id);

    return NextResponse.json(buildExpenseState(expenses));
  } catch {
    return NextResponse.json(
      {
        error: "Unable to load expenses right now.",
      },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const user = await getServerSessionUser();

  if (!user) {
    return unauthorized();
  }

  const body = await readJsonObject(request);

  if (!body) {
    return NextResponse.json(
      {
        error: "Enter a valid expense amount, category, and date.",
      },
      { status: 400 },
    );
  }

  const amount = Number(body.amount);
  const category =
    typeof body.category === "string"
      ? (body.category as ExpenseCategory)
      : undefined;
  const date = typeof body.date === "string" ? body.date.trim() : "";
  const note = typeof body.note === "string" ? body.note.trim() : "";

  if (
    !Number.isFinite(amount) ||
    amount <= 0 ||
    amount > expenseFieldLimits.amount ||
    !category ||
    !expenseCategories.includes(category) ||
    !parseIsoDate(date) ||
    note.length > expenseFieldLimits.note
  ) {
    return NextResponse.json(
      {
        error: "Enter a valid expense amount, category, and date.",
      },
      { status: 400 },
    );
  }

  try {
    const expenses = await addExpenseForUser(user.id, {
      title: note || `${category} expense`,
      category,
      amount,
      date,
      note,
    });

    return NextResponse.json(buildExpenseState(expenses));
  } catch {
    return NextResponse.json(
      {
        error: "Unable to save your expense right now.",
      },
      { status: 500 },
    );
  }
}
