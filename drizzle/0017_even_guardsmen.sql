CREATE TYPE "public"."answer_basis" AS ENUM('own_interview', 'secondhand', 'general_advice');--> statement-breakpoint
CREATE TYPE "public"."answer_display_mode" AS ENUM('named', 'anonymous_verified');--> statement-breakpoint
CREATE TYPE "public"."answer_source" AS ENUM('public', 'direct');--> statement-breakpoint
CREATE TYPE "public"."application_status" AS ENUM('applied', 'shortlisted', 'interviewing', 'offered', 'rejected', 'withdrawn');--> statement-breakpoint
CREATE TYPE "public"."claim_dimension" AS ENUM('round_sequence', 'round_present', 'oa_mode', 'oa_difficulty', 'topic_covered', 'topic_weight', 'dsa_difficulty', 'outcome_timeline');--> statement-breakpoint
CREATE TYPE "public"."invitation_status" AS ENUM('pending', 'accepted', 'declined', 'expired');--> statement-breakpoint
CREATE TYPE "public"."qa_moderation_state" AS ENUM('visible', 'held', 'removed');--> statement-breakpoint
CREATE TYPE "public"."question_intent" AS ENUM('selection_process', 'oa', 'dsa', 'fundamentals', 'development', 'interview_rounds', 'projects', 'hr', 'custom');--> statement-breakpoint
CREATE TYPE "public"."question_status" AS ENUM('open', 'answered', 'well_covered', 'merged', 'archived');--> statement-breakpoint
CREATE TABLE "alumni_cvs" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"storage_key" text NOT NULL,
	"file_name" text NOT NULL,
	"file_size" integer NOT NULL,
	"mime_type" text DEFAULT 'application/pdf' NOT NULL,
	"is_shared" boolean DEFAULT false NOT NULL,
	"uploaded_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "alumni_cvs_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "answer_claims" (
	"id" text PRIMARY KEY NOT NULL,
	"answer_id" text NOT NULL,
	"dimension" "claim_dimension" NOT NULL,
	"round_kind" text,
	"topic_id" text,
	"value_text" text,
	"value_num" real,
	"position" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "answer_feedback" (
	"id" text PRIMARY KEY NOT NULL,
	"answer_id" text NOT NULL,
	"user_id" text NOT NULL,
	"kind" text DEFAULT 'helpful' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "answer_feedback_user_answer_unq" UNIQUE("answer_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "answers" (
	"id" text PRIMARY KEY NOT NULL,
	"question_id" text NOT NULL,
	"author_id" text,
	"role_family_id" text,
	"hiring_cycle" text NOT NULL,
	"basis" "answer_basis" NOT NULL,
	"experience_id" text,
	"body" text,
	"display_mode" "answer_display_mode" DEFAULT 'named' NOT NULL,
	"source" "answer_source" DEFAULT 'public' NOT NULL,
	"source_direct_question_id" text,
	"revision" integer DEFAULT 1 NOT NULL,
	"moderation_state" "qa_moderation_state" DEFAULT 'visible' NOT NULL,
	"helpful_count" integer DEFAULT 0 NOT NULL,
	"deleted_at" timestamp,
	"deleted_by" text,
	"deletion_reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "drive_applications" (
	"id" text PRIMARY KEY NOT NULL,
	"drive_id" text NOT NULL,
	"drive_role_id" text,
	"student_id" text NOT NULL,
	"status" "application_status" DEFAULT 'applied' NOT NULL,
	"resume_url" text,
	"applied_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "question_asks" (
	"id" text PRIMARY KEY NOT NULL,
	"question_id" text NOT NULL,
	"user_id" text NOT NULL,
	"context_body" text,
	"hiring_cycle" text NOT NULL,
	"college_snapshot" text,
	"batch_snapshot" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "question_asks_user_question_unq" UNIQUE("question_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "question_invitations" (
	"id" text PRIMARY KEY NOT NULL,
	"question_id" text NOT NULL,
	"alumnus_id" text NOT NULL,
	"source" text DEFAULT 'automatic' NOT NULL,
	"match_score" real DEFAULT 0 NOT NULL,
	"match_reasons" jsonb,
	"status" "invitation_status" DEFAULT 'pending' NOT NULL,
	"invited_at" timestamp DEFAULT now() NOT NULL,
	"responded_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "question_topics" (
	"question_id" text NOT NULL,
	"topic_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text NOT NULL,
	"role_family_id" text,
	"intent" "question_intent" NOT NULL,
	"slot_key" text,
	"title" text NOT NULL,
	"title_normalized" text NOT NULL,
	"status" "question_status" DEFAULT 'open' NOT NULL,
	"moderation_state" "qa_moderation_state" DEFAULT 'visible' NOT NULL,
	"merged_into_id" text,
	"created_by" text,
	"ask_count" integer DEFAULT 1 NOT NULL,
	"answer_count" integer DEFAULT 0 NOT NULL,
	"eligible_answer_count" integer DEFAULT 0 NOT NULL,
	"last_answered_at" timestamp,
	"deleted_at" timestamp,
	"deleted_by" text,
	"deletion_reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "evidence" ADD COLUMN "storage_key" text;--> statement-breakpoint
ALTER TABLE "evidence" ADD COLUMN "file_name" text;--> statement-breakpoint
ALTER TABLE "evidence" ADD COLUMN "mime_type" text;--> statement-breakpoint
ALTER TABLE "evidence" ADD COLUMN "file_size" integer;--> statement-breakpoint
ALTER TABLE "evidence" ADD COLUMN "reference_url" text;--> statement-breakpoint
ALTER TABLE "evidence" ADD COLUMN "notes" text;--> statement-breakpoint
ALTER TABLE "evidence" ADD COLUMN "review_notes" text;--> statement-breakpoint
ALTER TABLE "placement_drives" ADD COLUMN "deadline" text;--> statement-breakpoint
ALTER TABLE "placement_drives" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "placement_drives" ADD COLUMN "tpo_coordinator_id" text;--> statement-breakpoint
ALTER TABLE "placement_drives" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "preparation_items" ADD COLUMN "drive_id" text;--> statement-breakpoint
ALTER TABLE "preparation_items" ADD COLUMN "source" text DEFAULT 'custom' NOT NULL;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "question_id" text;--> statement-breakpoint
ALTER TABLE "reports" ADD COLUMN "answer_id" text;--> statement-breakpoint
ALTER TABLE "alumni_cvs" ADD CONSTRAINT "alumni_cvs_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answer_claims" ADD CONSTRAINT "answer_claims_answer_id_answers_id_fk" FOREIGN KEY ("answer_id") REFERENCES "public"."answers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answer_claims" ADD CONSTRAINT "answer_claims_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answer_feedback" ADD CONSTRAINT "answer_feedback_answer_id_answers_id_fk" FOREIGN KEY ("answer_id") REFERENCES "public"."answers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answer_feedback" ADD CONSTRAINT "answer_feedback_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_role_family_id_role_titles_id_fk" FOREIGN KEY ("role_family_id") REFERENCES "public"."role_titles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_experience_id_experiences_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answers" ADD CONSTRAINT "answers_deleted_by_user_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drive_applications" ADD CONSTRAINT "drive_applications_drive_id_placement_drives_id_fk" FOREIGN KEY ("drive_id") REFERENCES "public"."placement_drives"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drive_applications" ADD CONSTRAINT "drive_applications_drive_role_id_drive_roles_id_fk" FOREIGN KEY ("drive_role_id") REFERENCES "public"."drive_roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drive_applications" ADD CONSTRAINT "drive_applications_student_id_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question_asks" ADD CONSTRAINT "question_asks_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question_asks" ADD CONSTRAINT "question_asks_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question_invitations" ADD CONSTRAINT "question_invitations_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question_invitations" ADD CONSTRAINT "question_invitations_alumnus_id_user_id_fk" FOREIGN KEY ("alumnus_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question_topics" ADD CONSTRAINT "question_topics_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question_topics" ADD CONSTRAINT "question_topics_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_role_family_id_role_titles_id_fk" FOREIGN KEY ("role_family_id") REFERENCES "public"."role_titles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_deleted_by_user_id_fk" FOREIGN KEY ("deleted_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "answer_claims_answer_idx" ON "answer_claims" USING btree ("answer_id");--> statement-breakpoint
CREATE INDEX "answer_claims_dimension_idx" ON "answer_claims" USING btree ("dimension");--> statement-breakpoint
CREATE INDEX "answer_feedback_answer_idx" ON "answer_feedback" USING btree ("answer_id");--> statement-breakpoint
CREATE INDEX "answers_question_idx" ON "answers" USING btree ("question_id");--> statement-breakpoint
CREATE INDEX "answers_author_idx" ON "answers" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "answers_moderation_idx" ON "answers" USING btree ("moderation_state");--> statement-breakpoint
CREATE INDEX "drive_applications_student_drive_idx" ON "drive_applications" USING btree ("student_id","drive_id");--> statement-breakpoint
CREATE INDEX "drive_applications_drive_status_idx" ON "drive_applications" USING btree ("drive_id","status");--> statement-breakpoint
CREATE INDEX "question_asks_question_idx" ON "question_asks" USING btree ("question_id");--> statement-breakpoint
CREATE INDEX "question_asks_user_idx" ON "question_asks" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "question_invitations_alumnus_idx" ON "question_invitations" USING btree ("alumnus_id");--> statement-breakpoint
CREATE INDEX "question_invitations_question_idx" ON "question_invitations" USING btree ("question_id");--> statement-breakpoint
CREATE INDEX "question_invitations_status_idx" ON "question_invitations" USING btree ("status");--> statement-breakpoint
CREATE INDEX "question_topics_pk" ON "question_topics" USING btree ("question_id","topic_id");--> statement-breakpoint
CREATE INDEX "questions_company_idx" ON "questions" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "questions_slot_key_idx" ON "questions" USING btree ("slot_key");--> statement-breakpoint
CREATE INDEX "questions_status_idx" ON "questions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "questions_moderation_idx" ON "questions" USING btree ("moderation_state");--> statement-breakpoint
CREATE INDEX "questions_title_trgm_idx" ON "questions" USING gin ("title_normalized" gin_trgm_ops);--> statement-breakpoint
ALTER TABLE "placement_drives" ADD CONSTRAINT "placement_drives_tpo_coordinator_id_user_id_fk" FOREIGN KEY ("tpo_coordinator_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "preparation_items" ADD CONSTRAINT "preparation_items_drive_id_placement_drives_id_fk" FOREIGN KEY ("drive_id") REFERENCES "public"."placement_drives"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reports" ADD CONSTRAINT "reports_answer_id_answers_id_fk" FOREIGN KEY ("answer_id") REFERENCES "public"."answers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "preparation_items_drive_idx" ON "preparation_items" USING btree ("drive_id");