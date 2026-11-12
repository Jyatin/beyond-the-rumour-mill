CREATE TYPE "public"."evidence_kind" AS ENUM('work_email', 'offer_screenshot', 'linkedin_url', 'other');--> statement-breakpoint
CREATE TYPE "public"."evidence_status" AS ENUM('pending', 'accepted', 'rejected');--> statement-breakpoint
CREATE TABLE "evidence" (
	"id" text PRIMARY KEY NOT NULL,
	"experience_id" text,
	"employment_id" text,
	"kind" "evidence_kind" NOT NULL,
	"status" "evidence_status" DEFAULT 'pending' NOT NULL,
	"reviewed_by" text,
	"reviewed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification_challenges" (
	"id" text PRIMARY KEY NOT NULL,
	"employment_id" text NOT NULL,
	"email" text NOT NULL,
	"otp_hash" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"max_attempts" integer DEFAULT 3 NOT NULL,
	"consumed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "domain" text;--> statement-breakpoint
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_experience_id_experiences_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_employment_id_alumni_profiles_id_fk" FOREIGN KEY ("employment_id") REFERENCES "public"."alumni_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "evidence" ADD CONSTRAINT "evidence_reviewed_by_user_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "verification_challenges" ADD CONSTRAINT "verification_challenges_employment_id_alumni_profiles_id_fk" FOREIGN KEY ("employment_id") REFERENCES "public"."alumni_profiles"("id") ON DELETE cascade ON UPDATE no action;