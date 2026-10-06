CREATE TABLE "drive_roles" (
	"id" text PRIMARY KEY NOT NULL,
	"drive_id" text NOT NULL,
	"role_id" text NOT NULL,
	"location" text,
	"ctc" text,
	"employment_type" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "eligibility_requirements" (
	"id" text PRIMARY KEY NOT NULL,
	"drive_role_id" text NOT NULL,
	"cgpa" text,
	"branches" jsonb,
	"backlog" text,
	"other_criteria" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "eligibility_requirements_drive_role_id_unique" UNIQUE("drive_role_id")
);
--> statement-breakpoint
CREATE TABLE "placement_drives" (
	"id" text PRIMARY KEY NOT NULL,
	"company_id" text NOT NULL,
	"date" text,
	"season" text,
	"status" text DEFAULT 'Upcoming' NOT NULL,
	"eligible_student_information" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "preparation_requirements" (
	"id" text PRIMARY KEY NOT NULL,
	"drive_role_id" text NOT NULL,
	"required_skills" jsonb,
	"suggested_topics" jsonb,
	"preparation_resources" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "preparation_requirements_drive_role_id_unique" UNIQUE("drive_role_id")
);
--> statement-breakpoint
ALTER TABLE "drive_roles" ADD CONSTRAINT "drive_roles_drive_id_placement_drives_id_fk" FOREIGN KEY ("drive_id") REFERENCES "public"."placement_drives"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "drive_roles" ADD CONSTRAINT "drive_roles_role_id_role_titles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."role_titles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eligibility_requirements" ADD CONSTRAINT "eligibility_requirements_drive_role_id_drive_roles_id_fk" FOREIGN KEY ("drive_role_id") REFERENCES "public"."drive_roles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "placement_drives" ADD CONSTRAINT "placement_drives_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "preparation_requirements" ADD CONSTRAINT "preparation_requirements_drive_role_id_drive_roles_id_fk" FOREIGN KEY ("drive_role_id") REFERENCES "public"."drive_roles"("id") ON DELETE cascade ON UPDATE no action;