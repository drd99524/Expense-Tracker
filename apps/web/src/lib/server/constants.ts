export const sessionMaxAgeSeconds = 60 * 60 * 24 * 30;

export const authFieldLimits = {
  identifier: 160,
  name: 80,
  email: 160,
  password: 128,
  resetCode: 6
} as const;

export const expenseFieldLimits = {
  note: 160,
  amount: 1_000_000
} as const;

export const budgetFieldLimits = {
  amount: 100_000_000
} as const;

export const passwordResetCodeExpiresMinutes = 10;
