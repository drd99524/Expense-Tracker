import { NextResponse } from "next/server";
import { budgetFieldLimits } from "@/lib/server/constants";
import { readJsonObject } from "@/lib/server/request";
import {
  budgetPeriods,
  type BudgetPeriod,
} from "@/features/budget/lib/budget-theme";
import { getServerSessionUser } from "@/lib/server/session";
import { getBudgetsForUser, updateBudgetForUser } from "@/lib/server/store";

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
    const budgets = await getBudgetsForUser(user.id);

    return NextResponse.json({
      budgets,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Unable to load budgets right now.",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  const user = await getServerSessionUser();

  if (!user) {
    return unauthorized();
  }

  const body = await readJsonObject(request);

  if (!body) {
    return NextResponse.json(
      {
        error: "Enter a valid budget amount.",
      },
      { status: 400 },
    );
  }

  const period =
    typeof body.period === "string" ? (body.period as BudgetPeriod) : undefined;
  const amount = Number(body.amount);
  const validPeriods = budgetPeriods.map((period) => period.id);

  if (
    !period ||
    !validPeriods.includes(period) ||
    !Number.isFinite(amount) ||
    amount <= 0 ||
    amount > budgetFieldLimits.amount
  ) {
    return NextResponse.json(
      {
        error: "Enter a valid budget amount.",
      },
      { status: 400 },
    );
  }

  try {
    const budgets = await updateBudgetForUser(
      user.id,
      period,
      Math.round(amount),
    );

    return NextResponse.json({
      budgets,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Unable to save your budget right now.",
      },
      { status: 500 },
    );
  }
}
