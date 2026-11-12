ALTER TABLE "experiences" ADD COLUMN "content" text;--> statement-breakpoint
ALTER TABLE "experiences" ADD COLUMN "outcome" text;--> statement-breakpoint
ALTER TABLE "experiences" ADD COLUMN "timeline" text;--> statement-breakpoint
ALTER TABLE "experiences" ADD COLUMN "status" text DEFAULT 'published' NOT NULL;--> statement-breakpoint
ALTER TABLE "experiences" ADD COLUMN "author_id" text;--> statement-breakpoint
ALTER TABLE "experiences" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "experiences" ADD CONSTRAINT "experiences_author_id_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;