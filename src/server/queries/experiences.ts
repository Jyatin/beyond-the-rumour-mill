import "server-only";

import { eq } from "drizzle-orm";
import { db } from "../db";
import { experiences } from "../db/schema";

export async function getExperiences() {
  return await db.select().from(experiences);
}

export async function getExperienceById(id: string) {
  const result = await db
    .select()
    .from(experiences)
    .where(eq(experiences.id, id))
    .limit(1);
  return result[0] || null;
}

export async function getExperiencesByCompanyId(companyId: string) {
  return await db
    .select()
    .from(experiences)
    .where(eq(experiences.companyId, companyId));
}
