import { config } from "dotenv";
config({ path: ".env" });
import postgres from "postgres";
import fs from "fs";

const connectionString = process.env.DATABASE_URL!;
const sql = postgres(connectionString);

async function main() {
  const sqlContent = fs.readFileSync("drizzle/0004_opposite_scarlet_witch.sql", "utf-8");
  
  // Drizzle output has `--> statement-breakpoint` that postgres might choke on
  const statements = sqlContent.split("--> statement-breakpoint").map(s => s.trim()).filter(s => s.length > 0);
  
  for (const statement of statements) {
    try {
      await sql.unsafe(statement);
      console.log("Executed:", statement.split("\n")[0]);
    } catch (err) {
      console.error("Error executing:", statement.split("\n")[0]);
      console.error(err);
    }
  }
  
  console.log("Migration manual run complete.");
  process.exit(0);
}
main();
