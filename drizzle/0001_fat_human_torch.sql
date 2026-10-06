CREATE EXTENSION IF NOT EXISTS pg_trgm;--> statement-breakpoint
CREATE INDEX "alumni_name_trgm_idx" ON "alumni_profiles" USING gin ("name" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX "alumni_college_trgm_idx" ON "alumni_profiles" USING gin ("college" gin_trgm_ops);--> statement-breakpoint
CREATE INDEX "companies_name_trgm_idx" ON "companies" USING gin ("name" gin_trgm_ops);