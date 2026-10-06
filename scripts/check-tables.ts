import { config } from "dotenv";
config({ path: ".env" });
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL!;
const sql = postgres(connectionString);

async function main() {
  const result = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
  `;
  console.log(result.map(r => r.table_name));
  process.exit(0);
}
main();
