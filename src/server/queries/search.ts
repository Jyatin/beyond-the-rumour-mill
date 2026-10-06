import "server-only";

import { db } from "../db";
import { companies, alumniProfiles } from "../db/schema";
import { sql, desc, or, ilike } from "drizzle-orm";

export async function search(query: string) {
  if (!query || query.trim().length === 0) {
    return {
      companies: [],
      alumni: [],
    };
  }

  const sanitizedQuery = query.trim();

  // We use pg_trgm similarity to rank results, and also filter by similarity > 0.1 or simple ilike
  const companiesSimilarity = sql<number>`similarity(${companies.name}, ${sanitizedQuery})`;
  
  const foundCompanies = await db
    .select({
      company: companies,
      rank: companiesSimilarity,
    })
    .from(companies)
    .where(
      or(
        ilike(companies.name, `%${sanitizedQuery}%`),
        sql`${companies.name} % ${sanitizedQuery}`
      )
    )
    .orderBy(desc(companiesSimilarity))
    .limit(5);

  const alumniSimilarityName = sql<number>`similarity(${alumniProfiles.name}, ${sanitizedQuery})`;
  const alumniSimilarityCollege = sql<number>`similarity(${alumniProfiles.college}, ${sanitizedQuery})`;
  const maxAlumniSimilarity = sql<number>`GREATEST(${alumniSimilarityName}, ${alumniSimilarityCollege})`;

  const foundAlumni = await db
    .select({
      alumni: alumniProfiles,
      rank: maxAlumniSimilarity,
    })
    .from(alumniProfiles)
    .where(
      or(
        ilike(alumniProfiles.name, `%${sanitizedQuery}%`),
        ilike(alumniProfiles.college, `%${sanitizedQuery}%`),
        sql`${alumniProfiles.name} % ${sanitizedQuery}`,
        sql`${alumniProfiles.college} % ${sanitizedQuery}`
      )
    )
    .orderBy(desc(maxAlumniSimilarity))
    .limit(5);

  return {
    companies: foundCompanies.map(r => r.company),
    alumni: foundAlumni.map(r => r.alumni),
  };
}
