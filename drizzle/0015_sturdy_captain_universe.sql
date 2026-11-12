CREATE TABLE "consensus_items" (
	"id" text PRIMARY KEY NOT NULL,
	"snapshot_id" text NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" text NOT NULL,
	"entity_label" text NOT NULL,
	"report_count" integer DEFAULT 0 NOT NULL,
	"effective_sample_size" real DEFAULT 0 NOT NULL,
	"weighted_prevalence" real DEFAULT 0 NOT NULL,
	"lower_bound" real DEFAULT 0 NOT NULL,
	"upper_bound" real DEFAULT 0 NOT NULL,
	"total_weight" real DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'published' NOT NULL,
	"formula_version" text NOT NULL,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "consensus_snapshots" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text NOT NULL,
	"role_title_id" text,
	"formula_version" text NOT NULL,
	"total_eligible_experiences" integer DEFAULT 0 NOT NULL,
	"total_weighted_experiences" real DEFAULT 0 NOT NULL,
	"verification_score" real DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "topic_aliases" (
	"id" text PRIMARY KEY NOT NULL,
	"topic_id" text NOT NULL,
	"alias" text NOT NULL,
	"normalized_alias" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "consensus_items" ADD CONSTRAINT "consensus_items_snapshot_id_consensus_snapshots_id_fk" FOREIGN KEY ("snapshot_id") REFERENCES "public"."consensus_snapshots"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consensus_snapshots" ADD CONSTRAINT "consensus_snapshots_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "consensus_snapshots" ADD CONSTRAINT "consensus_snapshots_role_title_id_role_titles_id_fk" FOREIGN KEY ("role_title_id") REFERENCES "public"."role_titles"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "topic_aliases" ADD CONSTRAINT "topic_aliases_topic_id_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "public"."topics"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "consensus_items_snapshot_idx" ON "consensus_items" USING btree ("snapshot_id");--> statement-breakpoint
CREATE INDEX "consensus_items_entity_type_idx" ON "consensus_items" USING btree ("entity_type");--> statement-breakpoint
CREATE INDEX "consensus_items_entity_id_idx" ON "consensus_items" USING btree ("entity_id");--> statement-breakpoint
CREATE INDEX "consensus_snapshots_company_idx" ON "consensus_snapshots" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX "consensus_snapshots_created_at_idx" ON "consensus_snapshots" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "topic_aliases_topic_idx" ON "topic_aliases" USING btree ("topic_id");--> statement-breakpoint
CREATE INDEX "topic_aliases_norm_alias_idx" ON "topic_aliases" USING btree ("normalized_alias");