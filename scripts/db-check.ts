import "dotenv/config";
import { db } from "../src/server/db";
import { sql } from "drizzle-orm";

async function main() {
  console.log("Checking Neon PostgreSQL connection...");
  const tables = await db.execute(sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`);
  console.log("Found tables:", tables.map((t: any) => t.table_name));

  const counts = await db.execute(sql`
    SELECT 'companies' as tbl, count(*)::int as count FROM companies
    UNION ALL SELECT 'experiences', count(*)::int FROM experiences
    UNION ALL SELECT 'user', count(*)::int FROM "user"
    UNION ALL SELECT 'questions', count(*)::int FROM questions
    UNION ALL SELECT 'placement_drives', count(*)::int FROM placement_drives
    UNION ALL SELECT 'preparation_items', count(*)::int FROM preparation_items
    UNION ALL SELECT 'alumni_profiles', count(*)::int FROM alumni_profiles
  `);
  console.log("Record counts in production database:");
  for (const row of counts) {
    console.log(`- ${(row as any).tbl}: ${(row as any).count}`);
  }
  process.exit(0);
}

main().catch((err) => {
  console.error("Database connection error:", err);
  process.exit(1);
});
