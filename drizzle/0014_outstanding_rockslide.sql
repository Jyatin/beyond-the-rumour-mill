CREATE TYPE "public"."extraction_status" AS ENUM('pending', 'running', 'succeeded', 'failed');--> statement-breakpoint
CREATE TABLE "extraction_runs" (
	"id" text PRIMARY KEY NOT NULL,
	"experience_id" text NOT NULL,
	"model" text NOT NULL,
	"prompt_version" text NOT NULL,
	"schema_version" text NOT NULL,
	"status" "extraction_status" DEFAULT 'pending' NOT NULL,
	"raw_output" text,
	"extracted_data" jsonb,
	"error" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "extraction_runs" ADD CONSTRAINT "extraction_runs_experience_id_experiences_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "extraction_runs_experience_idx" ON "extraction_runs" USING btree ("experience_id");--> statement-breakpoint
CREATE INDEX "extraction_runs_status_idx" ON "extraction_runs" USING btree ("status");--> statement-breakpoint
CREATE INDEX "extraction_runs_created_at_idx" ON "extraction_runs" USING btree ("created_at");