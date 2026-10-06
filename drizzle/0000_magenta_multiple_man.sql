CREATE TYPE "public"."verification_status" AS ENUM('official', 'verified', 'community', 'review', 'outdated');--> statement-breakpoint
CREATE TABLE "alumni_profiles" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"role" text NOT NULL,
	"company" text NOT NULL,
	"company_id" text NOT NULL,
	"college" text NOT NULL,
	"year" integer NOT NULL,
	"interview_type" text NOT NULL,
	"avatar_bg" text NOT NULL,
	"quote" text NOT NULL,
	"tags" jsonb NOT NULL,
	"rounds_count" integer NOT NULL,
	"verified_status" "verification_status" NOT NULL,
	"response_rate" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"industry" text NOT NULL,
	"roles" jsonb NOT NULL,
	"verification_status" "verification_status" NOT NULL,
	"last_verified_at" timestamp NOT NULL,
	"experience_count" integer DEFAULT 0 NOT NULL,
	"top_topics" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "experiences" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text NOT NULL,
	"company_name" text NOT NULL,
	"role" text NOT NULL,
	"year" integer NOT NULL,
	"type" text NOT NULL,
	"rounds" integer NOT NULL,
	"difficulty" text NOT NULL,
	"student_name" text NOT NULL,
	"is_anonymous" boolean DEFAULT false NOT NULL,
	"verification_status" "verification_status" NOT NULL,
	"summary" text NOT NULL,
	"helpful_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interview_questions" (
	"id" text PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"topic" text NOT NULL,
	"difficulty" text NOT NULL,
	"reported_in" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "alumni_profiles" ADD CONSTRAINT "alumni_profiles_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;