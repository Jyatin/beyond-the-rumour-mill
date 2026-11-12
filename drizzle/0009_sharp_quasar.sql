ALTER TABLE "experience_questions" DROP CONSTRAINT "experience_questions_question_id_interview_questions_id_fk";
--> statement-breakpoint
ALTER TABLE "experience_questions" ADD CONSTRAINT "experience_questions_question_id_interview_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."interview_questions"("id") ON DELETE restrict ON UPDATE no action;