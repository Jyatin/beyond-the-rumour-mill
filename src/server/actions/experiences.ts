"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { experiences } from "../db/schema";
import { requireUser } from "../auth-helpers";
import { revalidatePath } from "next/cache";

const experienceSchema = z.object({
  companyId: z.string().min(1, "Company is required"),
  companyName: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  type: z.string().min(1, "Type is required"),
  rounds: z.number().min(0),
  difficulty: z.string().min(1, "Difficulty is required"),
  studentName: z.string(),
  isAnonymous: z.boolean().default(false),
  summary: z.string().min(1, "Summary is required"),
  content: z.string().optional(),
  outcome: z.string().optional(),
  timeline: z.string().optional(),
  status: z.enum(["draft", "published"]).default("draft"),
});

export async function createExperienceAction(data: z.infer<typeof experienceSchema>) {
  const user = await requireUser();
  const parsed = experienceSchema.parse(data);

  const id = `exp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  await db.insert(experiences).values({
    id,
    ...parsed,
    authorId: user.id,
    studentName: parsed.isAnonymous ? "Anonymous" : user.name,
    verificationStatus: "review",
  });

  revalidatePath("/experiences");
  revalidatePath(`/companies/${parsed.companyId}`);
  
  return { success: true, id };
}

export async function updateExperienceAction(id: string, data: z.infer<typeof experienceSchema>) {
  const user = await requireUser();
  const parsed = experienceSchema.parse(data);

  const existing = await db.select().from(experiences).where(eq(experiences.id, id)).limit(1);
  if (!existing[0]) {
    throw new Error("Experience not found");
  }

  if (existing[0].authorId !== user.id) {
    throw new Error("Unauthorized to edit this experience");
  }

  await db.update(experiences).set({
    ...parsed,
    studentName: parsed.isAnonymous ? "Anonymous" : user.name,
    status: existing[0].status === "pending" || existing[0].status === "flagged" ? "draft" : existing[0].status,
    updatedAt: new Date(),
  }).where(eq(experiences.id, id));

  revalidatePath("/experiences");
  revalidatePath(`/experiences/${id}`);
  revalidatePath(`/companies/${parsed.companyId}`);

  return { success: true, id };
}

export async function submitExperienceAction(id: string) {
  const user = await requireUser();

  const existing = await db.select().from(experiences).where(eq(experiences.id, id)).limit(1);
  if (!existing[0]) {
    throw new Error("Experience not found");
  }

  if (existing[0].authorId !== user.id) {
    throw new Error("Unauthorized to edit this experience");
  }

  // Use a transaction for the status update and audit log
  await db.transaction(async (tx) => {
    await tx.update(experiences).set({
      status: "pending",
      updatedAt: new Date(),
    }).where(eq(experiences.id, id));

    const { createAuditRecord } = await import("./audit");
    await createAuditRecord({
      action: "experience_submitted",
      entityType: "experience",
      entityId: id,
    });
  });

  revalidatePath("/experiences");
  revalidatePath(`/experiences/${id}`);
  revalidatePath(`/companies/${existing[0].companyId}`);

  return { success: true, id };
}
