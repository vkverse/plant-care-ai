import { readFile } from "node:fs/promises";
import { Pool } from "pg";
import nextEnv from "@next/env";

nextEnv.loadEnvConfig(process.cwd());
if (!process.env.DATABASE_URL)
  throw new Error("Set DATABASE_URL in .env.local first");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5000,
});
try {
  const sql = await readFile(
    new URL("../database/migrations/001_initial.sql", import.meta.url),
    "utf8",
  );
  await pool.query(sql);
  console.log("PostgreSQL schema is ready.");
} finally {
  await pool.end();
}
