import "server-only";

import { eq, asc } from "drizzle-orm";
import { db } from "../db";
import { 
  interviewRounds, 
  roundTypes, 
  roundTopics, 
  topics, 
  experienceQuestions, 
  interviewQuestions 
} from "../db/schema";

export async function getExperienceWithRounds(experienceId: string) {
  // Fetch rounds
  const rounds = await db
    .select({
      id: interviewRounds.id,
      title: interviewRounds.title,
      summary: interviewRounds.summary,
      difficulty: interviewRounds.difficulty,
      order: interviewRounds.order,
      roundTypeName: roundTypes.name,
    })
    .from(interviewRounds)
    .leftJoin(roundTypes, eq(interviewRounds.roundTypeId, roundTypes.id))
    .where(eq(interviewRounds.experienceId, experienceId))
    .orderBy(asc(interviewRounds.order));

  // Fetch topics and questions for each round
  const enrichedRounds = await Promise.all(
    rounds.map(async (r) => {
      const rTopics = await db
        .select({ name: topics.name })
        .from(roundTopics)
        .innerJoin(topics, eq(roundTopics.topicId, topics.id))
        .where(eq(roundTopics.roundId, r.id));

      const rQuestions = await db
        .select({
          id: experienceQuestions.id,
          canonicalId: interviewQuestions.id,
          text: experienceQuestions.rawText, // Return rawText as text for frontend compatibility
          order: experienceQuestions.order,
        })
        .from(experienceQuestions)
        .innerJoin(interviewQuestions, eq(experienceQuestions.questionId, interviewQuestions.id))
        .where(eq(experienceQuestions.roundId, r.id))
        .orderBy(asc(experienceQuestions.order));

      return {
        ...r,
        topics: rTopics.map((t) => t.name),
        questions: rQuestions,
      };
    })
  );

  return enrichedRounds;
}
