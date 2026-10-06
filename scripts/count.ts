import { config } from "dotenv";
config({ path: ".env" });
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { sql } from "drizzle-orm";
import * as schema from "../src/server/db/schema";

async function count() {
  const connection = postgres(process.env.DATABASE_URL!, { max: 1 });
  const db = drizzle(connection, { schema });

  const c = await db.select({ count: sql`count(*)` }).from(schema.companies);
  const e = await db.select({ count: sql`count(*)` }).from(schema.experiences);
  const q = await db.select({ count: sql`count(*)` }).from(schema.interviewQuestions);
  const a = await db.select({ count: sql`count(*)` }).from(schema.alumniProfiles);

  console.log("companies:", c[0].count);
  console.log("experiences:", e[0].count);
  console.log("interview_questions:", q[0].count);
  console.log("alumni_profiles:", a[0].count);
  
  await connection.end();
}
count();
