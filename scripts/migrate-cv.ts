import 'dotenv/config';
import { db } from '../src/server/db';
import { sql } from 'drizzle-orm';

async function main() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS alumni_cvs (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL UNIQUE REFERENCES "user"(id) ON DELETE CASCADE,
      storage_key TEXT NOT NULL,
      file_name TEXT NOT NULL,
      file_size INTEGER NOT NULL,
      mime_type TEXT NOT NULL DEFAULT 'application/pdf',
      is_shared BOOLEAN NOT NULL DEFAULT FALSE,
      uploaded_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `);
  console.log('Table alumni_cvs created successfully');
  process.exit(0);
}

main().catch(err => {
  console.error('Migration error:', err);
  process.exit(1);
});
