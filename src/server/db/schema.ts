import { pgTable, text, timestamp, integer, boolean, jsonb, pgEnum, index, unique } from "drizzle-orm/pg-core";
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
  helpfulCount: integer("helpful_count").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const interviewQuestions = pgTable("interview_questions", {
  id: text("id").primaryKey(),
  text: text("text").notNull(),
  topic: text("topic").notNull(),
  topicId: text("topic_id").references(() => topics.id, { onDelete: "set null" }),
  difficulty: text("difficulty").notNull(), // "Easy" | "Medium" | "Hard"
  reportedIn: integer("reported_in").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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
    .notNull()
    .references(() => roundTypes.id, { onDelete: "restrict" }),
  summary: text("summary"),
  difficulty: text("difficulty"), // "Easy" | "Medium" | "Hard"
  createdAt: timestamp("created_at").defaultNow().notNull(),
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
  experienceId: text("experience_id")
    .notNull()
    .references(() => experiences.id, { onDelete: "cascade" }),
  questionId: text("question_id")
    .notNull()
    .references(() => interviewQuestions.id, { onDelete: "cascade" }),
}, (t) => ({
  pk: index("experience_questions_pk").on(t.experienceId, t.questionId),
}));

// ---- PHASE 2.1: PLACEMENT INFORMATION ----

export const placementDrives = pgTable("placement_drives", {
  id: text("id").primaryKey(),
  companyId: text("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  date: text("date"), 
  season: text("season"), 
  status: text("status").notNull().default("Upcoming"),
  eligibleStudentInformation: text("eligible_student_information"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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
