import { config } from "dotenv";
config({ path: ".env" });
import postgres from "postgres";

const connectionString = process.env.DATABASE_URL!;
const sql = postgres(connectionString);

async function main() {
  console.log("Migrating topics...");
  await sql`
    INSERT INTO "topics" ("id", "name")
    SELECT gen_random_uuid()::text, "topic"
    FROM "interview_questions"
    ON CONFLICT ("name") DO NOTHING;
  `;

  await sql`
    UPDATE "interview_questions"
    SET "topic_id" = "topics"."id"
    FROM "topics"
    WHERE "interview_questions"."topic" = "topics"."name";
  `;

  console.log("Migrating role_titles...");
  await sql`
    INSERT INTO "role_titles" ("id", "company_id", "title")
    SELECT gen_random_uuid()::text, "company_id", "role"
    FROM "experiences"
    GROUP BY "company_id", "role"
    ON CONFLICT ("company_id", "title") DO NOTHING;
  `;

  await sql`
    UPDATE "experiences"
    SET "role_id" = "role_titles"."id"
    FROM "role_titles"
    WHERE "experiences"."company_id" = "role_titles"."company_id"
      AND "experiences"."role" = "role_titles"."title";
  `;

  console.log("Data migration complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Data migration failed:", err);
  process.exit(1);
});
