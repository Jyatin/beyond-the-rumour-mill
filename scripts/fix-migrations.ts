import { config } from "dotenv";
config({ path: ".env" });
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL!;
const sql = postgres(connectionString);

async function main() {
  await sql`UPDATE drizzle.__drizzle_migrations SET id = 4 WHERE id = 5`;
  console.log("Updated ID");
  process.exit(0);
}
main();
