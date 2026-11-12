import { db } from "./index";
import { sql } from "drizzle-orm";

export async function runQaMigration() {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE question_intent AS ENUM (
        'selection_process', 'oa', 'dsa', 'fundamentals', 'development',
        'interview_rounds', 'projects', 'hr', 'custom'
      );
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE question_status AS ENUM (
        'open', 'answered', 'well_covered', 'merged', 'archived'
      );
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE qa_moderation_state AS ENUM (
        'visible', 'held', 'removed'
      );
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE answer_basis AS ENUM (
        'own_interview', 'secondhand', 'general_advice'
      );
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE answer_display_mode AS ENUM (
        'named', 'anonymous_verified'
      );
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE answer_source AS ENUM (
        'public', 'direct'
      );
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE claim_dimension AS ENUM (
        'round_sequence', 'round_present', 'oa_mode', 'oa_difficulty',
        'topic_covered', 'topic_weight', 'dsa_difficulty', 'outcome_timeline'
      );
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE invitation_status AS ENUM (
        'pending', 'accepted', 'declined', 'expired'
      );
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    -- Questions Table
    CREATE TABLE IF NOT EXISTS questions (
      id TEXT PRIMARY KEY,
      company_id TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
      role_family_id TEXT REFERENCES role_titles(id) ON DELETE SET NULL,
      intent question_intent NOT NULL,
      slot_key TEXT,
      title TEXT NOT NULL,
      title_normalized TEXT NOT NULL,
      status question_status NOT NULL DEFAULT 'open',
      moderation_state qa_moderation_state NOT NULL DEFAULT 'visible',
      merged_into_id TEXT,
      created_by TEXT REFERENCES "user"(id) ON DELETE SET NULL,
      ask_count INTEGER NOT NULL DEFAULT 1,
      answer_count INTEGER NOT NULL DEFAULT 0,
      eligible_answer_count INTEGER NOT NULL DEFAULT 0,
      last_answered_at TIMESTAMP,
      deleted_at TIMESTAMP,
      deleted_by TEXT REFERENCES "user"(id) ON DELETE SET NULL,
      deletion_reason TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS questions_company_idx ON questions(company_id);
    CREATE INDEX IF NOT EXISTS questions_slot_key_idx ON questions(slot_key);
    CREATE INDEX IF NOT EXISTS questions_status_idx ON questions(status);
    CREATE INDEX IF NOT EXISTS questions_moderation_idx ON questions(moderation_state);
    CREATE INDEX IF NOT EXISTS questions_title_trgm_idx ON questions USING gin (title_normalized gin_trgm_ops);

    -- Question Asks Table
    CREATE TABLE IF NOT EXISTS question_asks (
      id TEXT PRIMARY KEY,
      question_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
      user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
      context_body TEXT,
      hiring_cycle TEXT NOT NULL,
      college_snapshot TEXT,
      batch_snapshot TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      CONSTRAINT question_asks_user_question_unq UNIQUE (question_id, user_id)
    );

    CREATE INDEX IF NOT EXISTS question_asks_question_idx ON question_asks(question_id);
    CREATE INDEX IF NOT EXISTS question_asks_user_idx ON question_asks(user_id);

    -- Question Topics Table
    CREATE TABLE IF NOT EXISTS question_topics (
      question_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
      topic_id TEXT NOT NULL REFERENCES topics(id) ON DELETE CASCADE,
      CONSTRAINT question_topics_pk PRIMARY KEY (question_id, topic_id)
    );

    -- Answers Table
    CREATE TABLE IF NOT EXISTS answers (
      id TEXT PRIMARY KEY,
      question_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
      author_id TEXT REFERENCES "user"(id) ON DELETE SET NULL,
      role_family_id TEXT REFERENCES role_titles(id) ON DELETE SET NULL,
      hiring_cycle TEXT NOT NULL,
      basis answer_basis NOT NULL,
      experience_id TEXT REFERENCES experiences(id) ON DELETE SET NULL,
      body TEXT,
      display_mode answer_display_mode NOT NULL DEFAULT 'named',
      source answer_source NOT NULL DEFAULT 'public',
      source_direct_question_id TEXT,
      revision INTEGER NOT NULL DEFAULT 1,
      moderation_state qa_moderation_state NOT NULL DEFAULT 'visible',
      helpful_count INTEGER NOT NULL DEFAULT 0,
      deleted_at TIMESTAMP,
      deleted_by TEXT REFERENCES "user"(id) ON DELETE SET NULL,
      deletion_reason TEXT,
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS answers_question_idx ON answers(question_id);
    CREATE INDEX IF NOT EXISTS answers_author_idx ON answers(author_id);
    CREATE INDEX IF NOT EXISTS answers_moderation_idx ON answers(moderation_state);

    -- Answer Claims Table
    CREATE TABLE IF NOT EXISTS answer_claims (
      id TEXT PRIMARY KEY,
      answer_id TEXT NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
      dimension claim_dimension NOT NULL,
      round_kind TEXT,
      topic_id TEXT REFERENCES topics(id) ON DELETE SET NULL,
      value_text TEXT,
      value_num REAL,
      position INTEGER,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS answer_claims_answer_idx ON answer_claims(answer_id);
    CREATE INDEX IF NOT EXISTS answer_claims_dimension_idx ON answer_claims(dimension);

    -- Answer Feedback Table
    CREATE TABLE IF NOT EXISTS answer_feedback (
      id TEXT PRIMARY KEY,
      answer_id TEXT NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
      user_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
      kind TEXT NOT NULL DEFAULT 'helpful',
      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
      CONSTRAINT answer_feedback_user_answer_unq UNIQUE (answer_id, user_id)
    );

    CREATE INDEX IF NOT EXISTS answer_feedback_answer_idx ON answer_feedback(answer_id);

    -- Question Invitations Table
    CREATE TABLE IF NOT EXISTS question_invitations (
      id TEXT PRIMARY KEY,
      question_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
      alumnus_id TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
      source TEXT NOT NULL DEFAULT 'automatic',
      match_score REAL NOT NULL DEFAULT 0,
      match_reasons JSONB,
      status invitation_status NOT NULL DEFAULT 'pending',
      invited_at TIMESTAMP NOT NULL DEFAULT NOW(),
      responded_at TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS question_invitations_alumnus_idx ON question_invitations(alumnus_id);
    CREATE INDEX IF NOT EXISTS question_invitations_question_idx ON question_invitations(question_id);
    CREATE INDEX IF NOT EXISTS question_invitations_status_idx ON question_invitations(status);

    -- Alter Reports Table if question_id / answer_id not present
    ALTER TABLE reports ADD COLUMN IF NOT EXISTS question_id TEXT REFERENCES questions(id) ON DELETE SET NULL;
    ALTER TABLE reports ADD COLUMN IF NOT EXISTS answer_id TEXT REFERENCES answers(id) ON DELETE SET NULL;
  `);
}

if (process.argv[1] && process.argv[1].includes("qa-migration")) {
  runQaMigration().then(() => {
    console.log("QA Migration finished successfully");
    process.exit(0);
  }).catch((err) => {
    console.error("QA Migration failed:", err);
    process.exit(1);
  });
}
