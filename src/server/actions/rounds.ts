"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { 
  experiences, 
  interviewRounds, 
  roundTypes, 
  topics, 
  roundTopics, 
  interviewQuestions, 
  experienceQuestions 
} from "../db/schema";
import { requireUser } from "../auth-helpers";
import { revalidatePath } from "next/cache";

const questionSchema = z.object({
  text: z.string().min(1),
  topic: z.string().min(1),
  difficulty: z.string().min(1),
});

const roundSchema = z.object({
  roundTypeName: z.string().min(1),
  title: z.string().optional(),
  summary: z.string().optional(),
  difficulty: z.string().optional(),
  topics: z.array(z.string()).default([]),
  questions: z.array(questionSchema).default([]),
});

const updateRoundsSchema = z.object({
  experienceId: z.string().min(1),
  rounds: z.array(roundSchema),
});

export async function updateExperienceRoundsAction(data: z.infer<typeof updateRoundsSchema>) {
  const user = await requireUser();
  const parsed = updateRoundsSchema.parse(data);

  // Enforce ownership outside transaction to fail fast
  const existingExp = await db.select().from(experiences).where(eq(experiences.id, parsed.experienceId)).limit(1);
  if (!existingExp[0]) {
    throw new Error("Experience not found");
  }
  if (existingExp[0].authorId !== user.id) {
    throw new Error("Unauthorized to edit this experience");
  }

  await db.transaction(async (tx) => {
    // Delete existing rounds (cascade will handle round_topics and experience_questions)
    await tx.delete(interviewRounds).where(eq(interviewRounds.experienceId, parsed.experienceId));
    
    // Also explicitly delete any experience_questions that might not have a roundId
    await tx.delete(experienceQuestions).where(eq(experienceQuestions.experienceId, parsed.experienceId));

    // Insert new rounds
    let orderIndex = 0;
    for (const r of parsed.rounds) {
      // Upsert round type
      let rt = await tx.select().from(roundTypes).where(eq(roundTypes.name, r.roundTypeName)).limit(1);
      if (!rt[0]) {
        const rtId = `rt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        await tx.insert(roundTypes).values({ id: rtId, name: r.roundTypeName }).onConflictDoNothing();
        rt = await tx.select().from(roundTypes).where(eq(roundTypes.name, r.roundTypeName)).limit(1);
      }

      const roundId = `round_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      await tx.insert(interviewRounds).values({
        id: roundId,
        experienceId: parsed.experienceId,
        roundTypeId: rt[0].id,
        title: r.title,
        summary: r.summary,
        difficulty: r.difficulty,
        order: orderIndex++,
      });

      // Upsert topics and link
      for (const tName of r.topics) {
        let t = await tx.select().from(topics).where(eq(topics.name, tName)).limit(1);
        if (!t[0]) {
          const tId = `topic_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
          await tx.insert(topics).values({ id: tId, name: tName }).onConflictDoNothing();
          t = await tx.select().from(topics).where(eq(topics.name, tName)).limit(1);
        }
        await tx.insert(roundTopics).values({ roundId, topicId: t[0].id }).onConflictDoNothing();
      }

      // Upsert questions and link
      let qOrderIndex = 0;
      for (const q of r.questions) {
        const normalizedHash = q.text.trim().toLowerCase();
        
        // Find or create question by normalizedHash
        let iq = await tx.select().from(interviewQuestions).where(eq(interviewQuestions.normalizedHash, normalizedHash)).limit(1);
        if (!iq[0]) {
          // Find topic
          let qt = await tx.select().from(topics).where(eq(topics.name, q.topic)).limit(1);
          if (!qt[0]) {
            const tId = `topic_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
            await tx.insert(topics).values({ id: tId, name: q.topic }).onConflictDoNothing();
            qt = await tx.select().from(topics).where(eq(topics.name, q.topic)).limit(1);
          }

          const iqId = `iq_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
          await tx.insert(interviewQuestions).values({
            id: iqId,
            canonicalText: q.text,
            normalizedHash: normalizedHash,
            topicId: qt[0].id,
          }).onConflictDoNothing();
          
          iq = await tx.select().from(interviewQuestions).where(eq(interviewQuestions.normalizedHash, normalizedHash)).limit(1);
        }

        const eqId = `eq_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        await tx.insert(experienceQuestions).values({ 
          id: eqId,
          experienceId: parsed.experienceId,
          roundId, 
          questionId: iq[0].id, 
          rawText: q.text,
          order: qOrderIndex++ 
        });
      }
    }
  });

  revalidatePath(`/experiences/${parsed.experienceId}`);
  revalidatePath(`/experiences/${parsed.experienceId}/edit`);
  revalidatePath(`/companies/${existingExp[0].companyId}`);

  return { success: true };
}
