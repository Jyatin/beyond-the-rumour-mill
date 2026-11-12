import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

const globalForDb = globalThis as unknown as {
  __pgClient?: ReturnType<typeof postgres>;
};

// Disable prefetch as it is not supported for "Transaction" pool mode.
// 15s connect timeout accommodates Neon Serverless Postgres cold-starts.
const client =
  globalForDb.__pgClient ??
  postgres(connectionString, {
    prepare: false,
    connect_timeout: 15,
    idle_timeout: 30,
    max: 10,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__pgClient = client;
}

export const db = drizzle(client, { schema });
