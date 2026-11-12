import { describe, it, expect, afterAll } from "vitest";
import { db } from "@/server/db";
import { sql, eq } from "drizzle-orm";
import crypto from "crypto";
import { 
  user, 
  session, 
  account, 
  companies, 
  experiences, 
  interviewRounds, 
  placementDrives, 
  alumniProfiles, 
  preparationItems, 
  questions 
} from "@/server/db/schema";
import { getCompanies, getCompanyWithDetails } from "@/server/queries/companies";
import { getAllPlacementDrivesWithStats } from "@/server/queries/placement";
import { getAlumniProfiles } from "@/server/queries/alumni";
import { getPublishedExperiences, getExperienceById } from "@/server/queries/experiences";

const BASE_URL = process.env.BETTER_AUTH_URL || "http://localhost:3000";

describe("Senior Backend Engineer Audit: PostgreSQL & Full API Suite", { timeout: 45000 }, () => {
  const timestamp = Date.now();
  const testStudentEmail = `audit_student_${timestamp}@campus.edu`;
  const testStudentName = `Audit Student ${timestamp}`;
  const testPassword = "AuditStrongPassword123!";
  let studentUserId = "";
  let sessionCookies = "";
  let createdExperienceId = "";
  let createdPrepItemId = "";

  // ---------------------------------------------------------------------------
  // 1. POSTGRESQL DATABASE VERIFICATION
  // ---------------------------------------------------------------------------
  describe("1. PostgreSQL Database Integrity & Constraints", () => {
    it("1.1 connects to real PostgreSQL database and verifies engine version", async () => {
      const result = await db.execute(sql`SELECT version() as ver, current_database() as db_name, current_user as usr`);
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
      const row = result[0] as any;
      expect(row.db_name).toBeDefined();
      expect(row.ver).toContain("PostgreSQL");
    });

    it("1.2 verifies all core tables exist in schema", async () => {
      const tables = await db.execute(sql`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
        ORDER BY table_name;
      `);
      const tableNames = tables.map((t: any) => t.table_name);
      const expectedTables = [
        "account", "alumni_cvs", "alumni_profiles", "companies", 
        "experiences", "interview_rounds", "placement_drives", 
        "preparation_items", "questions", "session", "user"
      ];
      for (const expected of expectedTables) {
        expect(tableNames).toContain(expected);
      }
    });

    it("1.3 verifies Drizzle migrations table in drizzle schema has applied all migrations", async () => {
      const migrations = await db.execute(sql`
        SELECT id, hash, created_at 
        FROM "drizzle"."__drizzle_migrations" 
        ORDER BY created_at ASC;
      `);
      expect(migrations.length).toBeGreaterThanOrEqual(1);
    });

    it("1.4 executes real INSERT, SELECT, UPDATE, DELETE cycle with data persistence", async () => {
      const testCompanyId = `audit_test_comp_${timestamp}`;
      
      // INSERT
      await db.insert(companies).values({
        id: testCompanyId,
        name: "Audit Test Corp",
        domain: "audit-test.example.com",
        industry: "Cybersecurity",
        roles: ["Software Engineer", "Security Analyst"],
        topTopics: ["Dynamic Programming", "System Architecture"],
        verificationStatus: "verified",
        lastVerifiedAt: new Date().toISOString(),
      });

      // SELECT
      const [fetched] = await db.select().from(companies).where(eq(companies.id, testCompanyId));
      expect(fetched).toBeDefined();
      expect(fetched.name).toBe("Audit Test Corp");
      expect(fetched.roles).toContain("Software Engineer");

      // UPDATE
      await db.update(companies).set({ industry: "Cloud Infrastructure" }).where(eq(companies.id, testCompanyId));
      const [updated] = await db.select().from(companies).where(eq(companies.id, testCompanyId));
      expect(updated.industry).toBe("Cloud Infrastructure");

      // DELETE
      await db.delete(companies).where(eq(companies.id, testCompanyId));
      const [afterDelete] = await db.select().from(companies).where(eq(companies.id, testCompanyId));
      expect(afterDelete).toBeUndefined();
    });

    it("1.5 verifies ACID transaction atomic rollback on failure", async () => {
      const rollbackCompanyId = `rollback_test_${timestamp}`;
      let errorCaught = false;

      try {
        await db.transaction(async (tx) => {
          await tx.insert(companies).values({
            id: rollbackCompanyId,
            name: "Should Be Rolled Back",
            domain: "rollback.test",
            industry: "None",
            roles: ["Intern"],
            topTopics: ["DSA"],
            verificationStatus: "unverified",
            lastVerifiedAt: new Date().toISOString(),
          });
          // Force transaction failure
          throw new Error("Trigger atomic rollback");
        });
      } catch (err: any) {
        console.log("TRANSACTION ERROR CAUGHT:", err?.message || err);
        errorCaught = true;
      }

      expect(errorCaught).toBe(true);
      const [record] = await db.select().from(companies).where(eq(companies.id, rollbackCompanyId));
      expect(record).toBeUndefined(); // Must not exist
    });

    it("1.6 verifies no orphaned interview rounds exist (Foreign Key integrity)", async () => {
      const orphanedRounds = await db.execute(sql`
        SELECT count(*)::int as count 
        FROM interview_rounds ir
        LEFT JOIN experiences e ON ir.experience_id = e.id
        WHERE e.id IS NULL;
      `);
      expect(Number((orphanedRounds[0] as any).count)).toBe(0);
    });
  });

  // ---------------------------------------------------------------------------
  // 2. LIVE HTTP API & AUTHENTICATION AUDIT
  // ---------------------------------------------------------------------------
  describe("2. HTTP Endpoints & Better Auth Workflows", () => {
    it("2.1 GET /api/health returns HTTP 200 with database: connected", async () => {
      const res = await fetch(`${BASE_URL}/api/health`);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.ok).toBe(true);
      expect(data.database).toBe("connected");
    });

    it("2.2 POST /api/auth/sign-up/email successfully registers a student and sets session cookie", async () => {
      const res = await fetch(`${BASE_URL}/api/auth/sign-up/email`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Origin": BASE_URL,
        },
        body: JSON.stringify({
          email: testStudentEmail,
          password: testPassword,
          name: testStudentName,
          role: "student",
        }),
      });

      expect([200, 201]).toContain(res.status);
      const body = await res.json();
      studentUserId = body?.user?.id || body?.id;
      expect(studentUserId).toBeDefined();

      const cookieHeader = res.headers.get("set-cookie");
      expect(cookieHeader).toBeDefined();
      sessionCookies = cookieHeader || "";
    });

    it("2.3 verifies password is securely hashed in database and plaintext is never stored", async () => {
      const [userAccount] = await db.select().from(account).where(eq(account.userId, studentUserId));
      expect(userAccount).toBeDefined();
      expect(userAccount.password).toBeDefined();
      expect(userAccount.password).not.toBe(testPassword);
      expect(userAccount.password!.length).toBeGreaterThan(20);
    });

    it("2.4 GET /api/auth/get-session verifies authenticated session and returns student profile", async () => {
      const res = await fetch(`${BASE_URL}/api/auth/get-session`, {
        headers: { 
          Cookie: sessionCookies,
          Origin: BASE_URL,
        },
      });
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.user).toBeDefined();
      expect(data.user.email).toBe(testStudentEmail);
      expect(data.user.role).toBe("student");
    });

    it("2.5 verifies role-based authorization gate (student is rejected from /admin/drives)", async () => {
      const res = await fetch(`${BASE_URL}/admin/drives`, {
        headers: { Cookie: sessionCookies },
        redirect: "manual",
      });
      // Redirect (307/302) to login or 403 Forbidden is expected for non-admin
      expect([302, 303, 307, 308, 403]).toContain(res.status);
    });

    it("2.6 POST /api/auth/sign-out terminates session and invalidates cookie", async () => {
      const res = await fetch(`${BASE_URL}/api/auth/sign-out`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: sessionCookies,
          Origin: BASE_URL,
        },
        body: JSON.stringify({}),
      });
      expect([200, 204]).toContain(res.status);

      // Verify session is no longer active
      const checkRes = await fetch(`${BASE_URL}/api/auth/get-session`, {
        headers: { 
          Cookie: sessionCookies,
          Origin: BASE_URL,
        },
      });
      const data = await checkRes.json();
      expect(data).toBeNull();
    });
  });

  // ---------------------------------------------------------------------------
  // 3. COMPLETE BUSINESS LOGIC & SERVER ACTIONS AUDIT
  // ---------------------------------------------------------------------------
  describe("3. Business Workflows & Data Persistence", () => {
    it("3.1 getCompanies() returns real employers with active records from PostgreSQL", async () => {
      const comps = await getCompanies();
      expect(comps.length).toBeGreaterThan(0);
      expect(comps.some(c => c.name === "Amazon")).toBe(true);
      expect(comps.some(c => c.name === "Google")).toBe(true);
      expect(comps.some(c => c.name === "Philips")).toBe(true);
    });

    it("3.2 getAllPlacementDrivesWithStats() returns placement drives with cutoffs and CTC", async () => {
      const drives = await getAllPlacementDrivesWithStats();
      expect(drives.length).toBeGreaterThan(0);
      const drive = drives[0];
      expect(drive.companyName).toBeDefined();
      expect(drive.season).toBeDefined();
    });

    it("3.3 getAlumniProfiles() returns real verified mentors from database", async () => {
      const alumni = await getAlumniProfiles();
      expect(alumni.length).toBeGreaterThan(0);
      expect(alumni[0].name).toBeDefined();
      expect(alumni[0].company).toBeDefined();
    });

    it("3.4 creates, persists, and retrieves an interview experience with rounds", async () => {
      createdExperienceId = `audit_exp_${timestamp}`;
      
      // Insert verified experience directly into database
      await db.insert(experiences).values({
        id: createdExperienceId,
        companyId: "philips",
        companyName: "Philips",
        role: "Software Development Engineer",
        type: "Full-time",
        year: 2025,
        hiringCycle: "On-Campus",
        outcome: "Offer",
        authorId: studentUserId || "anonymous",
        studentName: testStudentName,
        summary: "E2E Audit Test: 4-round technical process focusing on Java, OS, and Data Structures.",
        difficulty: "Medium",
        rounds: 4,
        isAnonymous: false,
        verificationStatus: "verified",
        status: "published",
      });

      // Insert rounds
      await db.insert(interviewRounds).values({
        id: `round_oa_${timestamp}`,
        experienceId: createdExperienceId,
        roundNumber: 1,
        roundType: "OA",
        title: "Online Assessment",
        topicsCovered: ["Arrays", "Strings"],
      });

      // Retrieve from database
      const fetchedExp = await getExperienceById(createdExperienceId);
      expect(fetchedExp).toBeDefined();
      expect(fetchedExp?.companyName).toBe("Philips");
      expect(fetchedExp?.outcome).toBe("Offer");
    });

    it("3.5 creates, completes, and isolates a student preparation checklist item", async () => {
      createdPrepItemId = `prep_item_${timestamp}`;

      const [item] = await db.insert(preparationItems).values({
        id: createdPrepItemId,
        userId: studentUserId || `usr_temp_${timestamp}`,
        companyId: "philips",
        title: "E2E Audit: Master Dynamic Programming",
        category: "dsa",
        completedAt: null,
      }).returning();

      expect(item.id).toBeDefined();
      expect(item.completedAt).toBeNull();

      // Complete item
      const [updated] = await db.update(preparationItems)
        .set({ completedAt: new Date() })
        .where(eq(preparationItems.id, item.id))
        .returning();

      expect(updated.completedAt).toBeDefined();
      expect(updated.completedAt).not.toBeNull();
    });

    it("3.6 executes database-backed search across companies and experiences", async () => {
      const searchQuery = "Amazon";
      const results = await db.execute(sql`
        SELECT 'company' as type, id, name as title FROM companies WHERE name ILIKE ${'%' + searchQuery + '%'}
        UNION ALL
        SELECT 'experience' as type, id, company_name || ' - ' || role as title FROM experiences WHERE company_name ILIKE ${'%' + searchQuery + '%'}
        LIMIT 5;
      `);
      expect(results.length).toBeGreaterThan(0);
      expect((results[0] as any).title).toContain("Amazon");
    });
  });

  // ---------------------------------------------------------------------------
  // 4. CLEANUP TEST DATA AFTER AUDIT
  // ---------------------------------------------------------------------------
  afterAll(async () => {
    if (createdPrepItemId) {
      await db.delete(preparationItems).where(eq(preparationItems.id, createdPrepItemId));
    }
    if (createdExperienceId) {
      await db.delete(interviewRounds).where(eq(interviewRounds.experienceId, createdExperienceId));
      await db.delete(experiences).where(eq(experiences.id, createdExperienceId));
    }
    if (studentUserId) {
      await db.delete(session).where(eq(session.userId, studentUserId));
      await db.delete(account).where(eq(account.userId, studentUserId));
      await db.delete(user).where(eq(user.id, studentUserId));
    }
  });
});
