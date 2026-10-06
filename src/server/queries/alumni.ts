import "server-only";

import { eq } from "drizzle-orm";
import { db } from "../db";
import { alumniProfiles } from "../db/schema";

export async function getAlumniProfiles() {
  return await db.select().from(alumniProfiles);
}

export async function getAlumniProfileById(id: string) {
  const result = await db
    .select()
    .from(alumniProfiles)
    .where(eq(alumniProfiles.id, id))
    .limit(1);
  return result[0] || null;
}

export async function getAlumniProfilesByCompanyId(companyId: string) {
  return await db
    .select()
    .from(alumniProfiles)
    .where(eq(alumniProfiles.companyId, companyId));
}
