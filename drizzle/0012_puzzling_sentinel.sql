CREATE TYPE "public"."mentorship_request_status" AS ENUM('pending', 'accepted', 'rejected', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."mock_booking_status" AS ENUM('confirmed', 'cancelled', 'completed');--> statement-breakpoint
CREATE TYPE "public"."mock_slot_status" AS ENUM('available', 'booked', 'cancelled');--> statement-breakpoint
CREATE TABLE "mentorship_requests" (
	"id" text PRIMARY KEY NOT NULL,
	"student_id" text NOT NULL,
	"mentor_id" text NOT NULL,
	"message" text,
	"status" "mentorship_request_status" DEFAULT 'pending' NOT NULL,
	"responded_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mock_bookings" (
	"id" text PRIMARY KEY NOT NULL,
	"slot_id" text NOT NULL,
	"student_id" text NOT NULL,
	"status" "mock_booking_status" DEFAULT 'confirmed' NOT NULL,
	"cancelled_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "mock_slots" (
	"id" text PRIMARY KEY NOT NULL,
	"mentor_id" text NOT NULL,
	"starts_at" timestamp NOT NULL,
	"ends_at" timestamp NOT NULL,
	"status" "mock_slot_status" DEFAULT 'available' NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "mentorship_requests" ADD CONSTRAINT "mentorship_requests_student_id_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mentorship_requests" ADD CONSTRAINT "mentorship_requests_mentor_id_user_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_bookings" ADD CONSTRAINT "mock_bookings_slot_id_mock_slots_id_fk" FOREIGN KEY ("slot_id") REFERENCES "public"."mock_slots"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_bookings" ADD CONSTRAINT "mock_bookings_student_id_user_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mock_slots" ADD CONSTRAINT "mock_slots_mentor_id_user_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "mentorship_requests_student_idx" ON "mentorship_requests" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "mentorship_requests_mentor_idx" ON "mentorship_requests" USING btree ("mentor_id");--> statement-breakpoint
CREATE INDEX "mentorship_requests_status_idx" ON "mentorship_requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "mock_bookings_slot_idx" ON "mock_bookings" USING btree ("slot_id");--> statement-breakpoint
CREATE INDEX "mock_bookings_student_idx" ON "mock_bookings" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "mock_bookings_status_idx" ON "mock_bookings" USING btree ("status");--> statement-breakpoint
CREATE INDEX "mock_slots_mentor_idx" ON "mock_slots" USING btree ("mentor_id");--> statement-breakpoint
CREATE INDEX "mock_slots_status_idx" ON "mock_slots" USING btree ("status");--> statement-breakpoint
CREATE INDEX "mock_slots_starts_at_idx" ON "mock_slots" USING btree ("starts_at");