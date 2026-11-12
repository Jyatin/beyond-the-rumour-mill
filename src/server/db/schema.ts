import { pgTable, text, timestamp, integer, boolean, jsonb, pgEnum, index, unique, real } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const user = pgTable("user", {
					id: text("id").primaryKey(),
					name: text("name").notNull(),
					email: text("email").notNull().unique(),
					emailVerified: boolean("email_verified").notNull(),
					image: text("image"),
					createdAt: timestamp("created_at").notNull(),
					updatedAt: timestamp("updated_at").notNull(),
					role: text("role").notNull().default("student"),
				});

export const profiles = pgTable("profiles", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().unique().references(() => user.id, { onDelete: "cascade" }),
  displayName: text("display_name").notNull(),
  headline: text("headline").notNull(),
  bio: text("bio").notNull(),
  college: text("college").notNull(),
  gradYear: integer("grad_year").notNull(),
  avatarUrl: text("avatar_url"),
  openToMentoring: boolean("open_to_mentoring").notNull().default(false),
  visibility: text("visibility").notNull().default("public"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const session = pgTable("session", {
					id: text("id").primaryKey(),
					expiresAt: timestamp("expires_at").notNull(),
					token: text("token").notNull().unique(),
					createdAt: timestamp("created_at").notNull(),
					updatedAt: timestamp("updated_at").notNull(),
					ipAddress: text("ip_address"),
					userAgent: text("user_agent"),
					userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
				});

export const account = pgTable("account", {
					id: text("id").primaryKey(),
					accountId: text("account_id").notNull(),
					providerId: text("provider_id").notNull(),
					userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
					accessToken: text("access_token"),
					refreshToken: text("refresh_token"),
					idToken: text("id_token"),
					accessTokenExpiresAt: timestamp("access_token_expires_at"),
					refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
					scope: text("scope"),
					password: text("password"),
					createdAt: timestamp("created_at").notNull(),
					updatedAt: timestamp("updated_at").notNull()
				});

export const verification = pgTable("verification", {
					id: text("id").primaryKey(),
					identifier: text("identifier").notNull(),
					value: text("value").notNull(),
					expiresAt: timestamp("expires_at").notNull(),
					createdAt: timestamp("created_at"),
					updatedAt: timestamp("updated_at")
				});


export const experienceStatusEnum = pgEnum("experience_status", [
  "draft",
  "pending",
  "published",
  "flagged",
  "removed"
]);

export const reportStatusEnum = pgEnum("report_status", [
  "open",
  "reviewing",
  "resolved",
  "dismissed"
]);

export const verificationStatusEnum = pgEnum("verification_status", [
  "official",
  "verified",
  "community",
  "review",
  "outdated",
]);

export const companies = pgTable("companies", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  domain: text("domain"), // Phase 2.4 Verification Domain
  industry: text("industry").notNull(),
  roles: jsonb("roles").$type<string[]>().notNull(),
  verificationStatus: verificationStatusEnum("verification_status").notNull(),
  lastVerifiedAt: timestamp("last_verified_at", { mode: 'string' }).notNull(),
  experienceCount: integer("experience_count").notNull().default(0),
  topTopics: jsonb("top_topics").$type<{ topic: string; pct: number }[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return {
    nameTrgmIdx: index("companies_name_trgm_idx").using(
      "gin",
      sql`${table.name} gin_trgm_ops`
    ),
  };
});

export const experiences = pgTable("experiences", {
  id: text("id").primaryKey(),
  companyId: text("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  companyName: text("company_name").notNull(),
  role: text("role").notNull(),
  roleId: text("role_id").references(() => roleTitles.id, { onDelete: "set null" }),
  year: integer("year").notNull(),
  type: text("type").notNull(), // "Internship" | "Full-time"
  rounds: integer("rounds").notNull(),
  difficulty: text("difficulty").notNull(), // "Easy" | "Medium" | "Hard" | "Medium-Hard"
  studentName: text("student_name").notNull(),
  isAnonymous: boolean("is_anonymous").notNull().default(false),
  verificationStatus: verificationStatusEnum("verification_status").notNull(),
  summary: text("summary").notNull(),
  content: text("content"),
  outcome: text("outcome"),
  timeline: text("timeline"),
  status: experienceStatusEnum("status").notNull().default("published"),
  authorId: text("author_id").references(() => user.id, { onDelete: "set null" }),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  helpfulCount: integer("helpful_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const interviewQuestions = pgTable("interview_questions", {
  id: text("id").primaryKey(),
  canonicalText: text("canonical_text").notNull(),
  normalizedHash: text("normalized_hash").notNull().unique(),
  topicId: text("topic_id").references(() => topics.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const alumniProfiles = pgTable("alumni_profiles", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  company: text("company").notNull(),
  companyId: text("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  college: text("college").notNull(),
  year: integer("year").notNull(),
  interviewType: text("interview_type").notNull(), // "Full-time" | "Internship"
  avatarBg: text("avatar_bg").notNull(),
  quote: text("quote").notNull(),
  tags: jsonb("tags").$type<string[]>().notNull(),
  roundsCount: integer("rounds_count").notNull(),
  verifiedStatus: verificationStatusEnum("verified_status").notNull(),
  responseRate: text("response_rate").notNull(),
  userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => {
  return {
    nameTrgmIdx: index("alumni_name_trgm_idx").using(
      "gin",
      sql`${table.name} gin_trgm_ops`
    ),
    collegeTrgmIdx: index("alumni_college_trgm_idx").using(
      "gin",
      sql`${table.college} gin_trgm_ops`
    ),
  };
});

export const alumniCvs = pgTable("alumni_cvs", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().unique().references(() => user.id, { onDelete: "cascade" }),
  storageKey: text("storage_key").notNull(),
  fileName: text("file_name").notNull(),
  fileSize: integer("file_size").notNull(),
  mimeType: text("mime_type").notNull().default("application/pdf"),
  isShared: boolean("is_shared").notNull().default(false), // Private by default
  uploadedAt: timestamp("uploaded_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ---- PHASE 2: COMPANY INTELLIGENCE FOUNDATION ----

export const roleTitles = pgTable("role_titles", {
  id: text("id").primaryKey(),
  companyId: text("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (t) => ({
  unq: unique("role_titles_company_title_unq").on(t.companyId, t.title),
}));

export const roundTypes = pgTable("round_types", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const interviewRounds = pgTable("interview_rounds", {
  id: text("id").primaryKey(),
  experienceId: text("experience_id")
    .notNull()
    .references(() => experiences.id, { onDelete: "cascade" }),
  roundTypeId: text("round_type_id")
    .references(() => roundTypes.id, { onDelete: "set null" }),
  title: text("title"),
  order: integer("order").notNull().default(0),
  summary: text("summary"),
  difficulty: text("difficulty"), // "Easy" | "Medium" | "Hard"
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const topics = pgTable("topics", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const roundTopics = pgTable("round_topics", {
  roundId: text("round_id")
    .notNull()
    .references(() => interviewRounds.id, { onDelete: "cascade" }),
  topicId: text("topic_id")
    .notNull()
    .references(() => topics.id, { onDelete: "cascade" }),
}, (t) => ({
  pk: index("round_topics_pk").on(t.roundId, t.topicId),
}));

export const experienceQuestions = pgTable("experience_questions", {
  id: text("id").primaryKey(),
  experienceId: text("experience_id")
    .notNull()
    .references(() => experiences.id, { onDelete: "cascade" }),
  roundId: text("round_id")
    .references(() => interviewRounds.id, { onDelete: "cascade" }),
  questionId: text("question_id")
    .notNull()
    .references(() => interviewQuestions.id, { onDelete: "restrict" }),
  rawText: text("raw_text").notNull(),
  order: integer("order").notNull().default(0),
});

// ---- PHASE 2.1: PLACEMENT INFORMATION ----

export const placementDrives = pgTable("placement_drives", {
  id: text("id").primaryKey(),
  companyId: text("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  date: text("date"), 
  season: text("season"), 
  status: text("status").notNull().default("Upcoming"),
  deadline: text("deadline"),
  location: text("location"),
  eligibleStudentInformation: text("eligible_student_information"),
  tpoCoordinatorId: text("tpo_coordinator_id").references(() => user.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const driveRoles = pgTable("drive_roles", {
  id: text("id").primaryKey(),
  driveId: text("drive_id")
    .notNull()
    .references(() => placementDrives.id, { onDelete: "cascade" }),
  roleId: text("role_id")
    .notNull()
    .references(() => roleTitles.id, { onDelete: "cascade" }),
  location: text("location"),
  ctc: text("ctc"),
  employmentType: text("employment_type"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const eligibilityRequirements = pgTable("eligibility_requirements", {
  id: text("id").primaryKey(),
  driveRoleId: text("drive_role_id")
    .notNull()
    .unique()
    .references(() => driveRoles.id, { onDelete: "cascade" }),
  cgpa: text("cgpa"),
  branches: jsonb("branches").$type<string[]>(),
  backlog: text("backlog"),
  otherCriteria: text("other_criteria"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const preparationRequirements = pgTable("preparation_requirements", {
  id: text("id").primaryKey(),
  driveRoleId: text("drive_role_id")
    .notNull()
    .unique()
    .references(() => driveRoles.id, { onDelete: "cascade" }),
  requiredSkills: jsonb("required_skills").$type<string[]>(),
  suggestedTopics: jsonb("suggested_topics").$type<string[]>(),
  preparationResources: jsonb("preparation_resources").$type<{ title: string; url?: string }[]>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const applicationStatusEnum = pgEnum("application_status", [
  "applied",
  "shortlisted",
  "interviewing",
  "offered",
  "rejected",
  "withdrawn",
]);

export const driveApplications = pgTable("drive_applications", {
  id: text("id").primaryKey(),
  driveId: text("drive_id")
    .notNull()
    .references(() => placementDrives.id, { onDelete: "cascade" }),
  driveRoleId: text("drive_role_id")
    .references(() => driveRoles.id, { onDelete: "cascade" }),
  studentId: text("student_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  status: applicationStatusEnum("status").notNull().default("applied"),
  resumeUrl: text("resume_url"),
  appliedAt: timestamp("applied_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  notes: text("notes"),
}, (table) => ({
  studentDriveIdx: index("drive_applications_student_drive_idx").on(table.studentId, table.driveId),
  driveStatusIdx: index("drive_applications_drive_status_idx").on(table.driveId, table.status),
}));

// ---- PHASE 2.4: EVIDENCE + VERIFICATION ----

export const evidenceKindEnum = pgEnum("evidence_kind", [
  "work_email",
  "offer_screenshot",
  "linkedin_url",
  "other",
]);

export const evidenceStatusEnum = pgEnum("evidence_status", [
  "pending",
  "accepted",
  "rejected",
]);

export const evidence = pgTable("evidence", {
  id: text("id").primaryKey(),
  experienceId: text("experience_id").references(() => experiences.id, { onDelete: "cascade" }),
  employmentId: text("employment_id").references(() => alumniProfiles.id, { onDelete: "cascade" }),
  kind: evidenceKindEnum("kind").notNull(),
  status: evidenceStatusEnum("status").notNull().default("pending"),
  storageKey: text("storage_key"),
  fileName: text("file_name"),
  mimeType: text("mime_type"),
  fileSize: integer("file_size"),
  referenceUrl: text("reference_url"),
  notes: text("notes"),
  reviewNotes: text("review_notes"),
  reviewedBy: text("reviewed_by").references(() => user.id, { onDelete: "set null" }),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const verificationChallenges = pgTable("verification_challenges", {
  id: text("id").primaryKey(),
  employmentId: text("employment_id")
    .notNull()
    .references(() => alumniProfiles.id, { onDelete: "cascade" }),
  email: text("email").notNull(),
  otpHash: text("otp_hash").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  attempts: integer("attempts").notNull().default(0),
  maxAttempts: integer("max_attempts").notNull().default(3),
  consumedAt: timestamp("consumed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// ---- PHASE 2.6: MODERATION & REPORTS ----

export const reports = pgTable("reports", {
  id: text("id").primaryKey(),
  reporterId: text("reporter_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  experienceId: text("experience_id").references(() => experiences.id, { onDelete: "set null" }),
  questionId: text("question_id").references(() => questions.id, { onDelete: "set null" }),
  answerId: text("answer_id").references(() => answers.id, { onDelete: "set null" }),
  reason: text("reason").notNull(),
  details: text("details"),
  status: reportStatusEnum("status").notNull().default("open"),
  resolvedBy: text("resolved_by").references(() => user.id, { onDelete: "set null" }),
  resolvedAt: timestamp("resolved_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const auditLog = pgTable("audit_log", {
  id: text("id").primaryKey(),
  actorId: text("actor_id").references(() => user.id, { onDelete: "set null" }),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id").notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ---- PHASE 2.7: MENTORSHIP & MOCK INTERVIEWS ----

export const mentorshipRequestStatusEnum = pgEnum("mentorship_request_status", [
  "pending",
  "accepted",
  "rejected",
  "cancelled",
]);

export const mockSlotStatusEnum = pgEnum("mock_slot_status", [
  "available",
  "booked",
  "cancelled",
]);

export const mockBookingStatusEnum = pgEnum("mock_booking_status", [
  "confirmed",
  "cancelled",
  "completed",
]);

export const mentorshipRequests = pgTable("mentorship_requests", {
  id: text("id").primaryKey(),
  studentId: text("student_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  mentorId: text("mentor_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  message: text("message"),
  status: mentorshipRequestStatusEnum("status").notNull().default("pending"),
  respondedAt: timestamp("responded_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  studentIdx: index("mentorship_requests_student_idx").on(table.studentId),
  mentorIdx: index("mentorship_requests_mentor_idx").on(table.mentorId),
  statusIdx: index("mentorship_requests_status_idx").on(table.status),
}));

export const mockSlots = pgTable("mock_slots", {
  id: text("id").primaryKey(),
  mentorId: text("mentor_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  startsAt: timestamp("starts_at").notNull(),
  endsAt: timestamp("ends_at").notNull(),
  status: mockSlotStatusEnum("status").notNull().default("available"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  mentorIdx: index("mock_slots_mentor_idx").on(table.mentorId),
  statusIdx: index("mock_slots_status_idx").on(table.status),
  startsAtIdx: index("mock_slots_starts_at_idx").on(table.startsAt),
}));

export const mockBookings = pgTable("mock_bookings", {
  id: text("id").primaryKey(),
  slotId: text("slot_id")
    .notNull()
    .references(() => mockSlots.id, { onDelete: "cascade" }),
  studentId: text("student_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  status: mockBookingStatusEnum("status").notNull().default("confirmed"),
  cancelledAt: timestamp("cancelled_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  slotIdx: index("mock_bookings_slot_idx").on(table.slotId),
  studentIdx: index("mock_bookings_student_idx").on(table.studentId),
  statusIdx: index("mock_bookings_status_idx").on(table.status),
}));

// ---- PHASE 2.8: NOTIFICATIONS & STUDENT PREPARATION ----

export const notificationTypeEnum = pgEnum("notification_type", [
  "mentorship_request",
  "mentorship_accepted",
  "mentorship_rejected",
  "mock_booking",
  "mock_booking_cancelled",
  "mock_slot_cancelled",
  "experience_published",
  "experience_removed",
  "experience_flagged",
  "verification_completed",
  "contribution_required",
]);

export const notifications = pgTable("notifications", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: notificationTypeEnum("type").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  href: text("href"),
  readAt: timestamp("read_at"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  userIdx: index("notifications_user_idx").on(table.userId),
  readAtIdx: index("notifications_read_at_idx").on(table.readAt),
  createdAtIdx: index("notifications_created_at_idx").on(table.createdAt),
}));

export const preparationItems = pgTable("preparation_items", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  companyId: text("company_id")
    .references(() => companies.id, { onDelete: "cascade" }),
  driveId: text("drive_id")
    .references(() => placementDrives.id, { onDelete: "cascade" }),
  source: text("source").notNull().default("custom"),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  userIdx: index("preparation_items_user_idx").on(table.userId),
  companyIdx: index("preparation_items_company_idx").on(table.companyId),
  driveIdx: index("preparation_items_drive_idx").on(table.driveId),
}));

// ---- PHASE 3.1: AI EXTRACTION & STRUCTURED INTERVIEW INTELLIGENCE ----

export const extractionStatusEnum = pgEnum("extraction_status", [
  "pending",
  "running",
  "succeeded",
  "failed",
]);

export const extractionRuns = pgTable("extraction_runs", {
  id: text("id").primaryKey(),
  experienceId: text("experience_id")
    .notNull()
    .references(() => experiences.id, { onDelete: "cascade" }),
  model: text("model").notNull(),
  promptVersion: text("prompt_version").notNull(),
  schemaVersion: text("schema_version").notNull(),
  status: extractionStatusEnum("status").notNull().default("pending"),
  rawOutput: text("raw_output"),
  extractedData: jsonb("extracted_data").$type<Record<string, unknown>>(),
  error: text("error"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
}, (table) => ({
  experienceIdx: index("extraction_runs_experience_idx").on(table.experienceId),
  statusIdx: index("extraction_runs_status_idx").on(table.status),
  createdAtIdx: index("extraction_runs_created_at_idx").on(table.createdAt),
}));

// ---- PHASE 3.2: NORMALIZATION & DETERMINISTIC CONSENSUS ----

export const topicAliases = pgTable("topic_aliases", {
  id: text("id").primaryKey(),
  topicId: text("topic_id")
    .notNull()
    .references(() => topics.id, { onDelete: "cascade" }),
  alias: text("alias").notNull(),
  normalizedAlias: text("normalized_alias").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  topicIdx: index("topic_aliases_topic_idx").on(table.topicId),
  normAliasIdx: index("topic_aliases_norm_alias_idx").on(table.normalizedAlias),
}));

export const consensusSnapshots = pgTable("consensus_snapshots", {
  id: text("id").primaryKey(),
  companyId: text("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  roleTitleId: text("role_title_id")
    .references(() => roleTitles.id, { onDelete: "set null" }),
  formulaVersion: text("formula_version").notNull(),
  totalEligibleExperiences: integer("total_eligible_experiences").notNull().default(0),
  totalWeightedExperiences: real("total_weighted_experiences").notNull().default(0),
  verificationScore: real("verification_score").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  companyIdx: index("consensus_snapshots_company_idx").on(table.companyId),
  createdAtIdx: index("consensus_snapshots_created_at_idx").on(table.createdAt),
}));

export const consensusItems = pgTable("consensus_items", {
  id: text("id").primaryKey(),
  snapshotId: text("snapshot_id")
    .notNull()
    .references(() => consensusSnapshots.id, { onDelete: "cascade" }),
  entityType: text("entity_type").notNull(), // "topic" | "question" | "round_type" | "difficulty" | "outcome"
  entityId: text("entity_id").notNull(),
  entityLabel: text("entity_label").notNull(),
  reportCount: integer("report_count").notNull().default(0),
  effectiveSampleSize: real("effective_sample_size").notNull().default(0),
  weightedPrevalence: real("weighted_prevalence").notNull().default(0),
  lowerBound: real("lower_bound").notNull().default(0),
  upperBound: real("upper_bound").notNull().default(0),
  totalWeight: real("total_weight").notNull().default(0),
  status: text("status").notNull().default("published"), // "published" | "insufficient_evidence" | "pending_review"
  formulaVersion: text("formula_version").notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  snapshotIdx: index("consensus_items_snapshot_idx").on(table.snapshotId),
  entityTypeIdx: index("consensus_items_entity_type_idx").on(table.entityType),
  entityIdIdx: index("consensus_items_entity_id_idx").on(table.entityId),
}));

// ---- PHASE 3.3: INTELLIGENCE REVIEW QUEUE ----

export const normalizationReviews = pgTable("normalization_reviews", {
  id: text("id").primaryKey(),
  candidate: text("candidate").notNull(),
  candidateType: text("candidate_type").notNull(), // "topic" | "question"
  proposedEntityId: text("proposed_entity_id"),
  proposedEntityLabel: text("proposed_entity_label"),
  confidence: real("confidence"),
  status: text("status").notNull().default("pending"), // "pending" | "approved" | "rejected"
  reviewedBy: text("reviewed_by").references(() => user.id, { onDelete: "set null" }),
  reviewedAt: timestamp("reviewed_at"),
  reason: text("reason"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  statusIdx: index("normalization_reviews_status_idx").on(table.status),
  candidateTypeIdx: index("normalization_reviews_type_idx").on(table.candidateType),
  createdAtIdx: index("normalization_reviews_created_at_idx").on(table.createdAt),
}));

// ---- PHASE 3.5: STUDENT QUESTIONS + ALUMNI ANSWERS SYSTEM ----

export const questionIntentEnum = pgEnum("question_intent", [
  "selection_process",
  "oa",
  "dsa",
  "fundamentals",
  "development",
  "interview_rounds",
  "projects",
  "hr",
  "custom",
]);

export const questionStatusEnum = pgEnum("question_status", [
  "open",
  "answered",
  "well_covered",
  "merged",
  "archived",
]);

export const qaModerationStateEnum = pgEnum("qa_moderation_state", [
  "visible",
  "held",
  "removed",
]);

export const answerBasisEnum = pgEnum("answer_basis", [
  "own_interview",
  "secondhand",
  "general_advice",
]);

export const answerDisplayModeEnum = pgEnum("answer_display_mode", [
  "named",
  "anonymous_verified",
]);

export const answerSourceEnum = pgEnum("answer_source", [
  "public",
  "direct",
]);

export const claimDimensionEnum = pgEnum("claim_dimension", [
  "round_sequence",
  "round_present",
  "oa_mode",
  "oa_difficulty",
  "topic_covered",
  "topic_weight",
  "dsa_difficulty",
  "outcome_timeline",
]);

export const invitationStatusEnum = pgEnum("invitation_status", [
  "pending",
  "accepted",
  "declined",
  "expired",
]);

export const questions = pgTable("questions", {
  id: text("id").primaryKey(),
  companyId: text("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  roleFamilyId: text("role_family_id")
    .references(() => roleTitles.id, { onDelete: "set null" }),
  intent: questionIntentEnum("intent").notNull(),
  slotKey: text("slot_key"), // e.g., "philips:software-engineer:selection_process"
  title: text("title").notNull(),
  titleNormalized: text("title_normalized").notNull(),
  status: questionStatusEnum("status").notNull().default("open"),
  moderationState: qaModerationStateEnum("moderation_state").notNull().default("visible"),
  mergedIntoId: text("merged_into_id"),
  createdBy: text("created_by").references(() => user.id, { onDelete: "set null" }),
  askCount: integer("ask_count").notNull().default(1),
  answerCount: integer("answer_count").notNull().default(0),
  eligibleAnswerCount: integer("eligible_answer_count").notNull().default(0),
  lastAnsweredAt: timestamp("last_answered_at"),
  deletedAt: timestamp("deleted_at"),
  deletedBy: text("deleted_by").references(() => user.id, { onDelete: "set null" }),
  deletionReason: text("deletion_reason"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  companyIdx: index("questions_company_idx").on(table.companyId),
  slotKeyIdx: index("questions_slot_key_idx").on(table.slotKey),
  statusIdx: index("questions_status_idx").on(table.status),
  moderationIdx: index("questions_moderation_idx").on(table.moderationState),
  titleTrgmIdx: index("questions_title_trgm_idx").using(
    "gin",
    sql`${table.titleNormalized} gin_trgm_ops`
  ),
}));

export const questionAsks = pgTable("question_asks", {
  id: text("id").primaryKey(),
  questionId: text("question_id")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  contextBody: text("context_body"),
  hiringCycle: text("hiring_cycle").notNull(), // e.g., "2026/27"
  collegeSnapshot: text("college_snapshot"),
  batchSnapshot: text("batch_snapshot"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  unqAsk: unique("question_asks_user_question_unq").on(table.questionId, table.userId),
  questionIdx: index("question_asks_question_idx").on(table.questionId),
  userIdx: index("question_asks_user_idx").on(table.userId),
}));

export const questionTopics = pgTable("question_topics", {
  questionId: text("question_id")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  topicId: text("topic_id")
    .notNull()
    .references(() => topics.id, { onDelete: "cascade" }),
}, (table) => ({
  pk: index("question_topics_pk").on(table.questionId, table.topicId),
}));

export const answers = pgTable("answers", {
  id: text("id").primaryKey(),
  questionId: text("question_id")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  authorId: text("author_id")
    .references(() => user.id, { onDelete: "set null" }),
  roleFamilyId: text("role_family_id")
    .references(() => roleTitles.id, { onDelete: "set null" }),
  hiringCycle: text("hiring_cycle").notNull(),
  basis: answerBasisEnum("basis").notNull(),
  experienceId: text("experience_id")
    .references(() => experiences.id, { onDelete: "set null" }),
  body: text("body"),
  displayMode: answerDisplayModeEnum("display_mode").notNull().default("named"),
  source: answerSourceEnum("source").notNull().default("public"),
  sourceDirectQuestionId: text("source_direct_question_id"),
  revision: integer("revision").notNull().default(1),
  moderationState: qaModerationStateEnum("moderation_state").notNull().default("visible"),
  helpfulCount: integer("helpful_count").notNull().default(0),
  deletedAt: timestamp("deleted_at"),
  deletedBy: text("deleted_by").references(() => user.id, { onDelete: "set null" }),
  deletionReason: text("deletion_reason"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => ({
  questionIdx: index("answers_question_idx").on(table.questionId),
  authorIdx: index("answers_author_idx").on(table.authorId),
  moderationIdx: index("answers_moderation_idx").on(table.moderationState),
}));

export const answerClaims = pgTable("answer_claims", {
  id: text("id").primaryKey(),
  answerId: text("answer_id")
    .notNull()
    .references(() => answers.id, { onDelete: "cascade" }),
  dimension: claimDimensionEnum("dimension").notNull(),
  roundKind: text("round_kind"),
  topicId: text("topic_id")
    .references(() => topics.id, { onDelete: "set null" }),
  valueText: text("value_text"),
  valueNum: real("value_num"),
  position: integer("position"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  answerIdx: index("answer_claims_answer_idx").on(table.answerId),
  dimensionIdx: index("answer_claims_dimension_idx").on(table.dimension),
}));

export const answerFeedback = pgTable("answer_feedback", {
  id: text("id").primaryKey(),
  answerId: text("answer_id")
    .notNull()
    .references(() => answers.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  kind: text("kind").notNull().default("helpful"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  unqFeedback: unique("answer_feedback_user_answer_unq").on(table.answerId, table.userId),
  answerIdx: index("answer_feedback_answer_idx").on(table.answerId),
}));

export const questionInvitations = pgTable("question_invitations", {
  id: text("id").primaryKey(),
  questionId: text("question_id")
    .notNull()
    .references(() => questions.id, { onDelete: "cascade" }),
  alumnusId: text("alumnus_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  source: text("source").notNull().default("automatic"),
  matchScore: real("match_score").notNull().default(0),
  matchReasons: jsonb("match_reasons").$type<string[]>(),
  status: invitationStatusEnum("status").notNull().default("pending"),
  invitedAt: timestamp("invited_at").defaultNow().notNull(),
  respondedAt: timestamp("responded_at"),
}, (table) => ({
  alumnusIdx: index("question_invitations_alumnus_idx").on(table.alumnusId),
  questionIdx: index("question_invitations_question_idx").on(table.questionId),
  statusIdx: index("question_invitations_status_idx").on(table.status),
}));

