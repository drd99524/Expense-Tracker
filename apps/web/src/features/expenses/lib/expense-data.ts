export const expenseCategories = [
  "Food",
  "Gas",
  "Groceries",
  "Shopping",
  "Bills",
  "Health",
] as const;

export type ExpenseCategory = (typeof expenseCategories)[number];

export type ExpenseEntry = {
  id: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  note: string;
};

export const seedExpenseEntries: ExpenseEntry[] = [
  {
    id: "seed-trader-joes",
    title: "Trader Joe's",
    category: "Groceries",
    amount: 86.42,
    date: "2026-03-15",
    note: "Trader Joe's",
  },
  {
    id: "seed-shell",
    title: "Shell",
    category: "Gas",
    amount: 54.18,
    date: "2026-03-14",
    note: "Shell",
  },
  {
    id: "seed-sweetgreen",
    title: "Sweetgreen",
    category: "Food",
    amount: 18.9,
    date: "2026-03-14",
    note: "Sweetgreen",
  },
  {
    id: "seed-target",
    title: "Target",
    category: "Shopping",
    amount: 47.33,
    date: "2026-03-13",
    note: "Target",
  },
  {
    id: "seed-whole-foods",
    title: "Whole Foods",
    category: "Groceries",
    amount: 63.55,
    date: "2026-03-12",
    note: "Whole Foods",
  },
  {
    id: "seed-starbucks",
    title: "Starbucks",
    category: "Food",
    amount: 9.15,
    date: "2026-03-12",
    note: "Starbucks",
  },
];

export function getTodayIsoDate() {
  const now = new Date();

  return toIsoDate(now);
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function parseIsoDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return null;

  const parsed = new Date(year, month - 1, day);

  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return null;
  }

  return parsed;
}

export function toIsoDate(value: Date) {
  return `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`;
}

export function isoDateToDigits(value: string) {
  const date = parseIsoDate(value);

  if (!date) return "";

  return `${pad(date.getDate())}${pad(date.getMonth() + 1)}${date.getFullYear()}`;
}

export function parseExpenseDigits(value: string) {
  if (value.length !== 8) return null;

  const day = Number(value.slice(0, 2));
  const month = Number(value.slice(2, 4));
  const year = Number(value.slice(4, 8));

  const parsed = new Date(year, month - 1, day);

  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    return null;
  }

  return {
    date: parsed,
    isoDate: toIsoDate(parsed),
  };
}

export function formatExpenseDate(value: string) {
  const date = parseIsoDate(value);

  if (!date) return value;

  const parts = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).formatToParts(date);

  const day = parts.find((part) => part.type === "day")?.value ?? "";
  const month = parts.find((part) => part.type === "month")?.value ?? "";
  const year = parts.find((part) => part.type === "year")?.value ?? "";

  return `${day} ${month} ${year}`.trim();
}
