import "server-only";
import { Pool } from "pg";

const shared = globalThis as typeof globalThis & { sproutPool?: Pool };
export function database() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
  shared.sproutPool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 30000,
  });
  return shared.sproutPool;
}
