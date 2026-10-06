/* eslint-disable @typescript-eslint/no-explicit-any */
import "server-only";

import { eq, inArray } from "drizzle-orm";
import { db } from "../db";
import {
  companies,
  experiences,
  alumniProfiles,
  roleTitles,
  interviewRounds,
  experienceQuestions,
  interviewQuestions,
  topics,
  roundTypes
} from "../db/schema";

export async function getCompanies() {
  return await db.select().from(companies);
}

export async function getCompanyById(id: string) {
  const result = await db.select().from(companies).where(eq(companies.id, id)).limit(1);
  return result[0] || null;
}

export async function getCompanyWithDetails(id: string) {
  const company = await getCompanyById(id);
  if (!company) return null;

  const companyExperiences = await db
    .select()
    .from(experiences)
    .where(eq(experiences.companyId, id));

  const alumni = await db
    .select()
    .from(alumniProfiles)
    .where(eq(alumniProfiles.companyId, id));

  return {
    ...company,
    experiences: companyExperiences,
    alumniProfiles: alumni,
  };
}

export async function getCompanyIntelligence(id: string) {
  const company = await getCompanyById(id);
  if (!company) return null;

  const roles = await db.select().from(roleTitles).where(eq(roleTitles.companyId, id));
  
  const companyExperiences = await db
    .select()
    .from(experiences)
    .where(eq(experiences.companyId, id));

  const alumni = await db
    .select()
    .from(alumniProfiles)
    .where(eq(alumniProfiles.companyId, id));

  const experienceIds = companyExperiences.map((e) => e.id);

  let rounds: Array<unknown> = [];
  let questions: Array<unknown> = [];

  if (experienceIds.length > 0) {
    rounds = await db
      .select({
        round: interviewRounds,
        type: roundTypes,
      })
      .from(interviewRounds)
      .leftJoin(roundTypes, eq(interviewRounds.roundTypeId, roundTypes.id))
      .where(inArray(interviewRounds.experienceId, experienceIds));

    const eqs = await db
      .select({
        question: interviewQuestions,
        topic: topics,
      })
      .from(experienceQuestions)
      .innerJoin(interviewQuestions, eq(experienceQuestions.questionId, interviewQuestions.id))
      .leftJoin(topics, eq(interviewQuestions.topicId, topics.id))
      .where(inArray(experienceQuestions.experienceId, experienceIds));
    
    questions = eqs.map(eq => ({ ...eq.question, topic: eq.topic?.name || eq.question.topic }));
  }

  return {
    company,
    roles,
    experiences: companyExperiences,
    rounds: (rounds as any[]).map((r) => ({ ...r.round, typeName: r.type?.name })),
    questions: questions as any[],
    alumni,
  };
}
