CREATE TABLE "normalization_reviews" (
	"id" text PRIMARY KEY NOT NULL,
	"candidate" text NOT NULL,
	"candidate_type" text NOT NULL,
	"proposed_entity_id" text,
	"proposed_entity_label" text,
	"confidence" real,
	"status" text DEFAULT 'pending' NOT NULL,
	"reviewed_by" text,
	"reviewed_at" timestamp,
	"reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "normalization_reviews" ADD CONSTRAINT "normalization_reviews_reviewed_by_user_id_fk" FOREIGN KEY ("reviewed_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "normalization_reviews_status_idx" ON "normalization_reviews" USING btree ("status");--> statement-breakpoint
CREATE INDEX "normalization_reviews_type_idx" ON "normalization_reviews" USING btree ("candidate_type");--> statement-breakpoint
CREATE INDEX "normalization_reviews_created_at_idx" ON "normalization_reviews" USING btree ("created_at");