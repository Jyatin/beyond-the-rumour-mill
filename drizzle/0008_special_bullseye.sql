ALTER TABLE "interview_questions" ADD COLUMN "canonical_text" text;--> statement-breakpoint
ALTER TABLE "interview_questions" ADD COLUMN "normalized_hash" text;--> statement-breakpoint
ALTER TABLE "interview_questions" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint

-- Migrate canonical questions data
UPDATE "interview_questions" SET "canonical_text" = "text", "normalized_hash" = "text";--> statement-breakpoint

ALTER TABLE "interview_questions" ALTER COLUMN "canonical_text" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "interview_questions" ALTER COLUMN "normalized_hash" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "interview_questions" ADD CONSTRAINT "interview_questions_normalized_hash_unique" UNIQUE("normalized_hash");--> statement-breakpoint

ALTER TABLE "experience_questions" ADD COLUMN "id" text;--> statement-breakpoint
ALTER TABLE "experience_questions" ADD COLUMN "round_id" text;--> statement-breakpoint
ALTER TABLE "experience_questions" ADD COLUMN "raw_text" text;--> statement-breakpoint
ALTER TABLE "experience_questions" ADD COLUMN "order" integer DEFAULT 0 NOT NULL;--> statement-breakpoint

-- Migrate existing experience_questions by filling missing data (they didn't have round_id or raw_text)
-- Actually experience_questions was mostly empty or mock data, but we update them if they exist
UPDATE "experience_questions" 
SET "id" = gen_random_uuid()::text, "raw_text" = iq."text"
FROM "interview_questions" iq
WHERE "experience_questions"."question_id" = iq."id";--> statement-breakpoint

-- Migrate data from round_questions to experience_questions
INSERT INTO "experience_questions" ("id", "experience_id", "round_id", "question_id", "raw_text", "order")
SELECT 
    gen_random_uuid()::text,
    ir."experience_id",
    rq."round_id",
    rq."question_id",
    iq."text",
    rq."order"
FROM "round_questions" rq
JOIN "interview_rounds" ir ON ir."id" = rq."round_id"
JOIN "interview_questions" iq ON iq."id" = rq."question_id";--> statement-breakpoint

-- Now enforce NOT NULL and Primary Key on experience_questions
ALTER TABLE "experience_questions" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "experience_questions" ALTER COLUMN "raw_text" SET NOT NULL;--> statement-breakpoint

-- Drop old constraints
DROP INDEX IF EXISTS "experience_questions_pk";--> statement-breakpoint
ALTER TABLE "experience_questions" ADD PRIMARY KEY ("id");--> statement-breakpoint

ALTER TABLE "experience_questions" ADD CONSTRAINT "experience_questions_round_id_interview_rounds_id_fk" FOREIGN KEY ("round_id") REFERENCES "public"."interview_rounds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint

-- Now it is safe to drop round_questions
ALTER TABLE "round_questions" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "round_questions" CASCADE;--> statement-breakpoint

-- And remove the unused columns from interview_questions
ALTER TABLE "interview_questions" DROP COLUMN IF EXISTS "text";--> statement-breakpoint
ALTER TABLE "interview_questions" DROP COLUMN IF EXISTS "topic";--> statement-breakpoint
ALTER TABLE "interview_questions" DROP COLUMN IF EXISTS "difficulty";--> statement-breakpoint
ALTER TABLE "interview_questions" DROP COLUMN IF EXISTS "reported_in";