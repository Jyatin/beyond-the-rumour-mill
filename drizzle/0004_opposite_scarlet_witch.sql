CREATE TABLE "experience_questions" (
	"experience_id" text NOT NULL,
	"question_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "interview_rounds" (
	"id" text PRIMARY KEY NOT NULL,
	"experience_id" text NOT NULL,
	"round_type_id" text NOT NULL,
	"summary" text,
	"difficulty" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "role_titles" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "role_titles_company_title_unq" UNIQUE("company_id","title")
);
--> statement-breakpoint
CREATE TABLE "round_topics" (
	"round_id" text NOT NULL,
	"topic_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "round_types" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "round_types_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "topics" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "topics_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "experiences" ADD COLUMN "role_id" text;--> statement-breakpoint
ALTER TABLE "interview_questions" ADD COLUMN "topic_id" text;--> statement-breakpoint
ALTER TABLE "experience_questions" ADD CONSTRAINT "experience_questions_experience_id_experiences_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "experience_questions" ADD CONSTRAINT "experience_questions_question_id_interview_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."interview_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interview_rounds" ADD CONSTRAINT "interview_rounds_experience_id_experiences_id_fk" FOREIGN KEY ("experience_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interview_rounds" ADD CONSTRAINT "interview_rounds_round_type_id_round_types_id_fk" FOREIGN KEY ("round_type_id") REFERENCES "public"."round_types"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "role_titles" ADD CONSTRAINT "role_titles_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "round_topics" ADD CONSTRAINT "round_topics_round_id_interview_rounds_id_fk" FOREIGN KEY ("round_id") REFERENCES "public"."interview_rounds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "round_topics" ADD CONSTRAINT "round_topics_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "experience_questions_pk" ON "experience_questions" USING btree ("experience_id","question_id");--> statement-breakpoint
CREATE INDEX "round_topics_pk" ON "round_topics" USING btree ("round_id","topic_id");--> statement-breakpoint
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_role_id_role_titles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role_titles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interview_questions" ADD CONSTRAINT "interview_questions_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE set null ON UPDATE no action;