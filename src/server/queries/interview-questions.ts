import "server-only";

import { eq } from "drizzle-orm";
import { db } from "../db";
import { interviewQuestions } from "../db/schema";

export async function getInterviewQuestions() {
  return await db.select().from(interviewQuestions);
}

export async function getInterviewQuestionById(id: string) {
  const result = await db
    .select()
    .from(interviewQuestions)
    .where(eq(interviewQuestions.id, id))
    .limit(1);
  return result[0] || null;
}
