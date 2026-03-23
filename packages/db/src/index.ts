import { execFile } from "node:child_process";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const sqliteBinary = process.env.SQLITE3_BINARY ?? "sqlite3";
const sqliteSetupArgs = ["-cmd", "PRAGMA foreign_keys = ON", "-cmd", ".timeout 5000"];

export type SqlValue = string | number | boolean | null | undefined;
export type SqlRow = Record<string, string | number | null>;

function normalizeStatement(statement: string) {
  const trimmed = statement.trim();

  if (!trimmed) {
    return "";
  }

  return trimmed.endsWith(";") ? trimmed : `${trimmed};`;
}

function escapeSqlValue(value: SqlValue) {
  if (value === null || value === undefined) {
    return "NULL";
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new Error("Cannot serialize a non-finite number to SQL.");
    }

    return String(value);
  }

  if (typeof value === "boolean") {
    return value ? "1" : "0";
  }

  return `'${value.replace(/'/g, "''")}'`;
}

async function runSqlite(filePath: string, statement: string, jsonMode: boolean) {
  await mkdir(path.dirname(filePath), { recursive: true });

  const args = [
    ...(jsonMode ? ["-json"] : []),
    ...sqliteSetupArgs,
    filePath,
    statement
  ];

  const { stdout } = await execFileAsync(sqliteBinary, args, {
    maxBuffer: 10 * 1024 * 1024
  });

  return stdout.trim();
}

export function sql(
  strings: TemplateStringsArray,
  ...values: SqlValue[]
) {
  let output = "";

  strings.forEach((part, index) => {
    output += part;

    if (index < values.length) {
      output += escapeSqlValue(values[index]);
    }
  });

  return output;
}

export function joinStatements(statements: string[]) {
  return statements
    .map((statement) => normalizeStatement(statement))
    .filter(Boolean)
    .join("\n");
}

export function createSqliteDatabase(filePath: string) {
  const database = {
    filePath,
    async exec(statement: string) {
      const normalized = normalizeStatement(statement);

      if (!normalized) {
        return;
      }

      await runSqlite(filePath, normalized, false);
    },
    async query<T = SqlRow>(statement: string) {
      const normalized = normalizeStatement(statement);

      if (!normalized) {
        return [] as T[];
      }

      const output = await runSqlite(filePath, normalized, true);

      if (!output) {
        return [] as T[];
      }

      return JSON.parse(output) as T[];
    },
    async first<T = SqlRow>(statement: string) {
      const rows = await database.query<T>(statement);

      return rows[0] ?? null;
    },
    async transaction(statements: string[]) {
      const body = joinStatements(statements);

      if (!body) {
        return;
      }

      await database.exec(`BEGIN IMMEDIATE;\n${body}\nCOMMIT;`);
    }
  };

  return database;
}
