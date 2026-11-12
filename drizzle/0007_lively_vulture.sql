CREATE TABLE "round_questions" (
	"round_id" text NOT NULL,
	"question_id" text NOT NULL,
	"order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "interview_rounds" DROP CONSTRAINT "interview_rounds_round_type_id_round_types_id_fk";
--> statement-breakpoint
ALTER TABLE "interview_rounds" ALTER COLUMN "round_type_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "interview_rounds" ADD COLUMN "title" text;--> statement-breakpoint
ALTER TABLE "interview_rounds" ADD COLUMN "order" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "interview_rounds" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "round_questions" ADD CONSTRAINT "round_questions_round_id_interview_rounds_id_fk" FOREIGN KEY ("round_id") REFERENCES "public"."interview_rounds"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "round_questions" ADD CONSTRAINT "round_questions_question_id_interview_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."interview_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "round_questions_pk" ON "round_questions" USING btree ("round_id","question_id");--> statement-breakpoint
ALTER TABLE "interview_rounds" ADD CONSTRAINT "interview_rounds_round_type_id_round_types_id_fk" FOREIGN KEY ("round_type_id") REFERENCES "public"."round_types"("id") ON DELETE set null ON UPDATE no action;