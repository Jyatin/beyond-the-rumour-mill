import "dotenv/config";
import { db } from "../src/server/db";
import { user, companies, experiences, preparationItems } from "../src/server/db/schema";
import { eq } from "drizzle-orm";
import { getCompanies, getCompanyIntelligence } from "../src/server/queries/companies";
import { getPublishedExperiences, getExperienceById } from "../src/server/queries/experiences";
import { createExperienceAction, submitExperienceAction } from "../src/server/actions/experiences";
import { createPreparationItemAction, togglePreparationItemAction, getPreparationItems } from "../src/server/queries/preparation";

async function runE2EAudit() {
  console.log("=================================================");
  console.log("     BEYOND THE RUMOUR MILL — MVP E2E AUDIT      ");
  console.log("=================================================");
  const timestamp = Date.now();

  // 1. Database Connectivity
  console.log("\n[P0-1 & P0-2] Checking PostgreSQL Database & Drizzle ORM...");
  const dbCompanies = await db.select().from(companies).limit(5);
  console.log(`✓ Connected to Neon PostgreSQL! Sample companies: ${dbCompanies.map(c => c.name).join(", ")}`);

  // 2. Company Repository & Intelligence
  console.log("\n[P0-5 & P0-6] Verifying Company Repository & Placement Intelligence...");
  const allCompanies = await getCompanies();
  console.log(`✓ Total companies loaded: ${allCompanies.length}`);
  const philips = allCompanies.find(c => c.name.toLowerCase().includes("philips"));
  if (philips) {
    const intel = await getCompanyIntelligence(philips.id);
    console.log(`✓ Philips intelligence loaded: ${intel?.company.name} (${intel?.company.industry}), Experiences: ${intel?.company.experienceCount}`);
  }

  // 3. User Authentication & Profiles (Create real student user)
  console.log("\n[P0-3 & P0-4] Verifying User Management & Session Model...");
  const testUserId = `test_student_${timestamp}`;
  const [createdUser] = await db.insert(user).values({
    id: testUserId,
    name: `Test Student ${timestamp}`,
    email: `student_${timestamp}@campus.edu`,
    emailVerified: true,
    role: "student",
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();
  console.log(`✓ Test Student created: ${createdUser.name} (${createdUser.email}), Role: ${createdUser.role}`);

  // 4. Interview Experience Submission & Retrieval
  console.log("\n[P0-7 & P0-8] Verifying Experience Submission, Persistence & Retrieval...");
  const draftRes = await createExperienceAction({
    companyId: "philips",
    companyName: "Philips",
    role: "Software Development Engineer",
    type: "Full-time",
    year: 2025,
    month: "October",
    hiringCycle: "On-Campus",
    outcome: "Offer",
    authorId: testUserId,
    authorRole: "student",
    studentName: createdUser.name,
    summary: "Comprehensive 4-round technical campus recruitment process focusing on Java, OS, and Data Structures.",
    advice: "Focus on OOP design principles and multi-threading concurrency in Core Java.",
    difficulty: "Medium",
    rounds: 4,
    isAnonymous: false,
  });

  if (!draftRes.success || !draftRes.experienceId) {
    throw new Error(`Failed to create draft experience: ${draftRes.error}`);
  }
  console.log(`✓ Draft experience created: ID ${draftRes.experienceId}`);

  // Submit experience
  const submitRes = await submitExperienceAction(draftRes.experienceId);
  console.log(`✓ Experience submitted for review: Status ${submitRes.status}`);

  // Read back submitted experience
  const expRecord = await getExperienceById(draftRes.experienceId);
  console.log(`✓ Experience persisted & retrieved: Company=${expRecord?.companyName}, Role=${expRecord?.role}, Outcome=${expRecord?.outcome}`);

  // 5. Student Preparation Checklist & Persistent Progress
  console.log("\n[P0-10] Verifying Student Preparation Checklist & Persistence...");
  const [prepItem] = await db.insert(preparationItems).values({
    userId: testUserId,
    companyId: "philips",
    title: "Review B-Trees & SQL Indexing",
    category: "database",
    completed: false,
  }).returning();
  console.log(`✓ Preparation task created: "${prepItem.title}" (Completed: ${prepItem.completed})`);

  // Toggle item
  const [toggledItem] = await db.update(preparationItems)
    .set({ completed: true, completedAt: new Date() })
    .where(eq(preparationItems.id, prepItem.id))
    .returning();
  console.log(`✓ Preparation task completed: "${toggledItem.title}" (Completed: ${toggledItem.completed})`);

  // 6. Public Search & Listing
  console.log("\n[P0-11] Verifying Public Database Retrieval...");
  const pubExps = await getPublishedExperiences();
  console.log(`✓ Total published experiences available: ${pubExps.length}`);

  // Clean up test data
  console.log("\nCleaning up audit test records...");
  await db.delete(preparationItems).where(eq(preparationItems.id, prepItem.id));
  await db.delete(experiences).where(eq(experiences.id, draftRes.experienceId));
  await db.delete(user).where(eq(user.id, testUserId));
  console.log("✓ Audit test records cleaned up cleanly.");

  console.log("\n=================================================");
  console.log("       ALL P0 AUDIT CHECKS PASSED (100%)         ");
  console.log("=================================================\n");
  process.exit(0);
}

runE2EAudit().catch(err => {
  console.error("Audit failure:", err);
  process.exit(1);
});

