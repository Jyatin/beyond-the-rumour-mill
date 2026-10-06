/* eslint-disable */
import { config } from "dotenv";
config({ path: ".env" });

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../src/server/db/schema";
import {
  companies,
  experiences,
  questions,
  alumniProfiles,
} from "../src/lib/mock-data";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  console.log("Connecting to database...");
  const connection = postgres(process.env.DATABASE_URL, { max: 1 });
  const db = drizzle(connection, { schema });

  console.log("Seeding companies...");
  
  // Inject missing companies required by alumniProfiles but not present in mock-data.ts
  const explicitCompanies = [...companies];
  const missingCompanyRefs = [
    { id: "atlassian", name: "Atlassian" },
    { id: "uber", name: "Uber" },
    { id: "goldmansachs", name: "Goldman Sachs" }
  ];
  
  for (const ref of missingCompanyRefs) {
    if (!explicitCompanies.some(c => c.id === ref.id)) {
      explicitCompanies.push({
        id: ref.id,
        name: ref.name,
        industry: "Unknown", // Required non-null fallback
        roles: [],
        verificationStatus: "community",
        lastVerifiedAt: new Date().toISOString(),
        experienceCount: 0,
        topTopics: [],
      });
    }
  }

  for (const company of explicitCompanies) {
    await db
      .insert(schema.companies)
      .values({
        id: company.id,
        name: company.name,
        industry: company.industry,
        roles: company.roles,
        verificationStatus: company.verificationStatus as any,
        lastVerifiedAt: new Date(company.lastVerifiedAt).toISOString(),
        experienceCount: company.experienceCount,
        topTopics: company.topTopics,
      })
      .onConflictDoUpdate({
        target: schema.companies.id,
        set: {
          name: company.name,
          industry: company.industry,
          roles: company.roles,
          verificationStatus: company.verificationStatus as any,
          lastVerifiedAt: new Date(company.lastVerifiedAt).toISOString(),
          experienceCount: company.experienceCount,
          topTopics: company.topTopics,
        },
      });
  }

  console.log("Seeding experiences...");
  for (const exp of experiences) {
    await db
      .insert(schema.experiences)
      .values({
        id: exp.id,
        companyId: exp.companyId,
        companyName: exp.companyName,
        role: exp.role,
        year: exp.year,
        type: exp.type,
        rounds: exp.rounds,
        difficulty: exp.difficulty,
        studentName: exp.studentName,
        isAnonymous: exp.isAnonymous,
        verificationStatus: exp.verificationStatus as any,
        summary: exp.summary,
        helpfulCount: exp.helpfulCount,
      })
      .onConflictDoUpdate({
        target: schema.experiences.id,
        set: {
          companyId: exp.companyId,
          companyName: exp.companyName,
          role: exp.role,
          year: exp.year,
          type: exp.type,
          rounds: exp.rounds,
          difficulty: exp.difficulty,
          studentName: exp.studentName,
          isAnonymous: exp.isAnonymous,
          verificationStatus: exp.verificationStatus as any,
          summary: exp.summary,
          helpfulCount: exp.helpfulCount,
        },
      });
  }

  console.log("Seeding interview questions...");
  for (const q of questions) {
    await db
      .insert(schema.interviewQuestions)
      .values({
        id: q.id,
        text: q.text,
        topic: q.topic,
        difficulty: q.difficulty,
        reportedIn: q.reportedIn,
      })
      .onConflictDoUpdate({
        target: schema.interviewQuestions.id,
        set: {
          text: q.text,
          topic: q.topic,
          difficulty: q.difficulty,
          reportedIn: q.reportedIn,
        },
      });
  }

  console.log("Seeding alumni profiles...");
  for (const profile of alumniProfiles) {
    await db
      .insert(schema.alumniProfiles)
      .values({
        id: profile.id,
        name: profile.name,
        role: profile.role,
        company: profile.company,
        companyId: profile.companyId,
        college: profile.college,
        year: profile.year,
        interviewType: profile.interviewType,
        avatarBg: profile.avatarBg,
        quote: profile.quote,
        tags: profile.tags,
        roundsCount: profile.roundsCount,
        verifiedStatus: profile.verifiedStatus as any,
        responseRate: profile.responseRate,
      })
      .onConflictDoUpdate({
        target: schema.alumniProfiles.id,
        set: {
          name: profile.name,
          role: profile.role,
          company: profile.company,
          companyId: profile.companyId,
          college: profile.college,
          year: profile.year,
          interviewType: profile.interviewType,
          avatarBg: profile.avatarBg,
          quote: profile.quote,
          tags: profile.tags,
          roundsCount: profile.roundsCount,
          verifiedStatus: profile.verifiedStatus as any,
          responseRate: profile.responseRate,
        },
      });
  }

  console.log("Seeding complete! Closing connection...");
  await connection.end();
}

main().catch((err) => {
  console.error("Seeding failed:");
  console.error(err);
  process.exit(1);
});
