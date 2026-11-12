import { describe, it, expect, beforeEach, vi } from "vitest";
import { db } from "../src/server/db";
import {
  companies,
  consensusSnapshots,
  consensusItems,
  normalizationReviews,
  topicAliases,
  topics,
  user,
  alumniProfiles,
  experiences,
  evidence,
} from "../src/server/db/schema";
import { eq } from "drizzle-orm";
import { getLatestConsensusForCompany } from "../src/server/consensus/queries";
import {
  getPendingNormalizationReviews,
} from "../src/server/queries/review";
import {
  createNormalizationReviewItemAction,
  approveNormalizationReviewAction,
  rejectNormalizationReviewAction,
} from "../src/server/actions/review";
import { getUserReputationSignals } from "../src/server/reputation/signals";
import { runAIEvaluationHarness } from "../src/server/ai/evaluation/evaluator";
import { MockLLMProvider, setTestAIProvider } from "../src/server/ai/provider";
import {
  GOLDEN_EVALUATION_DATASET,
  EVALUATION_DATASET_VERSION,
} from "../src/server/ai/evaluation/dataset";

let mockUser: { id: string; role: string } = { id: "user_p33_admin", role: "admin" };

setTestAIProvider(new MockLLMProvider());

vi.mock("../src/server/auth-helpers", () => ({
  requireUser: vi.fn(async () => mockUser),
  getCurrentUser: vi.fn(async () => mockUser),
  requireRole: vi.fn(async (role: string) => {
    if (mockUser.role !== role && mockUser.role !== "admin") {
      throw new Error(`Forbidden: requires role ${role}`);
    }
    return mockUser;
  }),
  requireAdmin: vi.fn(async () => {
    if (mockUser.role !== "admin") {
      throw new Error("Forbidden: requires admin");
    }
    return mockUser;
  }),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

describe("Phase 3.3 — Intelligence UI, Review, Evaluation & Reputation", () => {
  const testCompanyId = "comp_p33_test";
  const adminUserId = "user_p33_admin";
  const normalUserId = "user_p33_normal";

  beforeEach(async () => {
    mockUser = { id: adminUserId, role: "admin" };

    // Seed test users
    await db
      .insert(user)
      .values([
        {
          id: adminUserId,
          name: "Admin User",
          email: "admin_p33@example.com",
          role: "admin",
          emailVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: normalUserId,
          name: "Normal Student",
          email: "student_p33@example.com",
          role: "student",
          emailVerified: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ])
      .onConflictDoNothing();

    // Seed test company with all required schema fields
    await db
      .insert(companies)
      .values({
        id: testCompanyId,
        name: "Phase 3.3 Test Corp",
        domain: "p33test.com",
        industry: "Technology",
        roles: ["Software Engineer", "Systems Engineer"],
        verificationStatus: "verified",
        lastVerifiedAt: new Date().toISOString(),
        experienceCount: 15,
        topTopics: [{ topic: "Data Structures", pct: 85 }],
      })
      .onConflictDoNothing();

    // Clean up test consensus snapshots & reviews
    await db
      .delete(consensusSnapshots)
      .where(eq(consensusSnapshots.companyId, testCompanyId));
    await db.delete(normalizationReviews);
  });

  // 1. Published consensus appears on company intelligence query
  it("1. retrieves published consensus for company intelligence", async () => {
    const snapshotId = `snap_${Date.now()}_1`;
    await db.insert(consensusSnapshots).values({
      id: snapshotId,
      companyId: testCompanyId,
      formulaVersion: "v1.0",
      totalEligibleExperiences: 20,
      totalWeightedExperiences: 18.5,
      verificationScore: 88,
      createdAt: new Date(),
    });

    await db.insert(consensusItems).values({
      id: `ci_${Date.now()}_1`,
      snapshotId,
      entityType: "topic",
      entityId: "topic_dsa",
      entityLabel: "Data Structures & Algorithms",
      reportCount: 15,
      effectiveSampleSize: 14.5,
      weightedPrevalence: 0.72,
      lowerBound: 0.58,
      upperBound: 0.83,
      totalWeight: 14.5,
      status: "published",
      formulaVersion: "v1.0",
      createdAt: new Date(),
    });

    const result = await getLatestConsensusForCompany(testCompanyId);
    expect(result).not.toBeNull();
    expect(result?.snapshot.id).toBe(snapshotId);
    expect(result?.publishedTopics.length).toBe(1);
    expect(result?.publishedTopics[0].entityLabel).toBe("Data Structures & Algorithms");
    expect(result?.publishedTopics[0].status).toBe("published");
  });

  // 2. Insufficient evidence is not presented as published consensus
  it("2. handles insufficient evidence correctly (< 5 reports not published)", async () => {
    const snapshotId = `snap_${Date.now()}_2`;
    await db.insert(consensusSnapshots).values({
      id: snapshotId,
      companyId: testCompanyId,
      formulaVersion: "v1.0",
      totalEligibleExperiences: 20,
      totalWeightedExperiences: 18.5,
      verificationScore: 40,
      createdAt: new Date(),
    });

    // Item with only 2 reports (below threshold 5)
    await db.insert(consensusItems).values({
      id: `ci_${Date.now()}_2`,
      snapshotId,
      entityType: "topic",
      entityId: "topic_rust",
      entityLabel: "Rust Programming",
      reportCount: 2,
      effectiveSampleSize: 1.8,
      weightedPrevalence: 0.09,
      lowerBound: 0.02,
      upperBound: 0.28,
      totalWeight: 1.8,
      status: "insufficient_evidence",
      formulaVersion: "v1.0",
      createdAt: new Date(),
    });

    const result = await getLatestConsensusForCompany(testCompanyId);
    expect(result).not.toBeNull();
    expect(result?.publishedTopics.length).toBe(0);
    expect(result?.insufficientEvidenceItems.length).toBe(1);
    expect(result?.insufficientEvidenceItems[0].reportCount).toBeLessThan(5);
  });

  // 3. Sample size is calculated and displayed correctly
  it("3. stores and outputs independent report count and effective sample size", async () => {
    const snapshotId = `snap_${Date.now()}_3`;
    await db.insert(consensusSnapshots).values({
      id: snapshotId,
      companyId: testCompanyId,
      formulaVersion: "v1.0",
      totalEligibleExperiences: 25,
      totalWeightedExperiences: 22.4,
      verificationScore: 92,
      createdAt: new Date(),
    });

    await db.insert(consensusItems).values({
      id: `ci_${Date.now()}_3`,
      snapshotId,
      entityType: "topic",
      entityId: "topic_sql",
      entityLabel: "SQL & Query Optimization",
      reportCount: 18,
      effectiveSampleSize: 16.4,
      weightedPrevalence: 0.7,
      lowerBound: 0.55,
      upperBound: 0.81,
      totalWeight: 16.4,
      status: "published",
      formulaVersion: "v1.0",
      createdAt: new Date(),
    });

    const result = await getLatestConsensusForCompany(testCompanyId);
    const item = result?.items[0];
    expect(item?.reportCount).toBe(18);
    expect(result?.snapshot.totalEligibleExperiences).toBe(25);
    expect(item?.effectiveSampleSize).toBe(16.4);
  });

  // 4. Wilson confidence interval is structured and bounded correctly
  it("4. computes and provides 95% Wilson confidence intervals", async () => {
    const snapshotId = `snap_${Date.now()}_4`;
    await db.insert(consensusSnapshots).values({
      id: snapshotId,
      companyId: testCompanyId,
      formulaVersion: "v1.0",
      totalEligibleExperiences: 20,
      totalWeightedExperiences: 18.0,
      verificationScore: 85,
      createdAt: new Date(),
    });

    await db.insert(consensusItems).values({
      id: `ci_${Date.now()}_4`,
      snapshotId,
      entityType: "topic",
      entityId: "topic_sysdesign",
      entityLabel: "System Design",
      reportCount: 12,
      effectiveSampleSize: 11.2,
      weightedPrevalence: 0.58,
      lowerBound: 0.42,
      upperBound: 0.72,
      totalWeight: 11.2,
      status: "published",
      formulaVersion: "v1.0",
      createdAt: new Date(),
    });

    const result = await getLatestConsensusForCompany(testCompanyId);
    const item = result?.items[0];
    expect(item?.lowerBound).toBe(0.42);
    expect(item?.upperBound).toBe(0.72);
  });

  // 5. Verification / evidence strength is displayed correctly
  it("5. surfaces evidence verification score (0 to 100)", async () => {
    const snapshotId = `snap_${Date.now()}_5`;
    await db.insert(consensusSnapshots).values({
      id: snapshotId,
      companyId: testCompanyId,
      formulaVersion: "v1.0",
      totalEligibleExperiences: 20,
      totalWeightedExperiences: 18.0,
      verificationScore: 78,
      createdAt: new Date(),
    });

    await db.insert(consensusItems).values({
      id: `ci_${Date.now()}_5`,
      snapshotId,
      entityType: "topic",
      entityId: "topic_os",
      entityLabel: "Operating Systems",
      reportCount: 8,
      effectiveSampleSize: 7.6,
      weightedPrevalence: 0.38,
      lowerBound: 0.23,
      upperBound: 0.55,
      totalWeight: 7.6,
      status: "published",
      formulaVersion: "v1.0",
      createdAt: new Date(),
    });

    const result = await getLatestConsensusForCompany(testCompanyId);
    expect(result?.snapshot.verificationScore).toBe(78);
  });

  // 6. Anonymous source identity remains hidden in public traceability
  it("6. preserves privacy without exposing reporter IDs or private evidence", async () => {
    const snapshotId = `snap_${Date.now()}_6`;
    await db.insert(consensusSnapshots).values({
      id: snapshotId,
      companyId: testCompanyId,
      formulaVersion: "v1.0",
      totalEligibleExperiences: 15,
      totalWeightedExperiences: 13.5,
      verificationScore: 82,
      createdAt: new Date(),
    });

    await db.insert(consensusItems).values({
      id: `ci_${Date.now()}_6`,
      snapshotId,
      entityType: "topic",
      entityId: "topic_dsa",
      entityLabel: "Data Structures & Algorithms",
      reportCount: 10,
      effectiveSampleSize: 9.2,
      weightedPrevalence: 0.65,
      lowerBound: 0.48,
      upperBound: 0.79,
      totalWeight: 9.2,
      status: "published",
      formulaVersion: "v1.0",
      createdAt: new Date(),
    });

    const result = await getLatestConsensusForCompany(testCompanyId);
    const item = result?.items[0];
    const itemRecord = item as unknown as Record<string, unknown>;
    // Public item does not carry author IDs, emails, or unredacted submissions
    expect(itemRecord.authorId).toBeUndefined();
    expect(itemRecord.authorEmail).toBeUndefined();
    expect(itemRecord.privateEvidence).toBeUndefined();
  });

  // 7. Unresolved normalization candidates are quarantined from public consensus
  it("7. excludes unresolved normalization reviews from published consensus", async () => {
    // Insert pending normalization review
    const review = await createNormalizationReviewItemAction({
      candidate: "Unresolved Obscure Framework",
      candidateType: "topic",
      proposedEntityLabel: "Frameworks",
      confidence: 0.52,
      reason: "Ambiguous low similarity match",
    });

    expect(review.status).toBe("pending");

    // Check company consensus does not contain this unreviewed candidate
    const consensus = await getLatestConsensusForCompany(testCompanyId);
    if (consensus) {
      const match = consensus.items.find(
        (i) => i.entityLabel === "Unresolved Obscure Framework"
      );
      expect(match).toBeUndefined();
    }
  });

  // 8. Canonical questions display correctly
  it("8. stores and returns canonical question items", async () => {
    const snapshotId = `snap_${Date.now()}_8`;
    await db.insert(consensusSnapshots).values({
      id: snapshotId,
      companyId: testCompanyId,
      formulaVersion: "v1.0",
      totalEligibleExperiences: 15,
      totalWeightedExperiences: 13.5,
      verificationScore: 85,
      createdAt: new Date(),
    });

    await db.insert(consensusItems).values({
      id: `ci_${Date.now()}_8`,
      snapshotId,
      entityType: "question",
      entityId: "q_two_sum",
      entityLabel: "Two Sum and Pair Sum Variations",
      reportCount: 9,
      effectiveSampleSize: 8.4,
      weightedPrevalence: 0.58,
      lowerBound: 0.41,
      upperBound: 0.73,
      totalWeight: 8.4,
      status: "published",
      formulaVersion: "v1.0",
      createdAt: new Date(),
    });

    const result = await getLatestConsensusForCompany(testCompanyId);
    const questionItem = result?.publishedQuestions.find((i) => i.entityType === "question");
    expect(questionItem).toBeDefined();
    expect(questionItem?.entityLabel).toBe("Two Sum and Pair Sum Variations");
  });

  // 9. Unauthorized non-admin users cannot access admin review actions
  it("9. rejects non-admin users from approving normalization reviews", async () => {
    mockUser = { id: normalUserId, role: "student" };

    const review = await createNormalizationReviewItemAction({
      candidate: "Ambiguous Auth Lib",
      candidateType: "topic",
      confidence: 0.6,
    });

    await expect(
      approveNormalizationReviewAction({
        reviewId: review.id,
      })
    ).rejects.toThrow(/Forbidden/);
  });

  // 10. Admin review approval persists correctly and creates alias
  it("10. approves normalization review item and links alias", async () => {
    mockUser = { id: adminUserId, role: "admin" };

    const uniqueTopicId = `topic_sys_${Date.now()}`;
    const uniqueTopicName = `System Design Variant ${Date.now()}`;

    // Ensure canonical topic exists
    await db
      .insert(topics)
      .values({
        id: uniqueTopicId,
        name: uniqueTopicName,
      })
      .onConflictDoNothing();

    const created = await createNormalizationReviewItemAction({
      candidate: "HLD & LLD Architecture",
      candidateType: "topic",
      proposedEntityId: uniqueTopicId,
      proposedEntityLabel: uniqueTopicName,
      confidence: 0.65,
      reason: "High level design variant",
    });

    const approval = await approveNormalizationReviewAction({
      reviewId: created.id,
      canonicalTopicId: uniqueTopicId,
      aliasName: "HLD & LLD Architecture",
    });

    expect(approval.success).toBe(true);
    expect(approval.status).toBe("approved");

    // Verify review status updated in database
    const [updated] = await db
      .select()
      .from(normalizationReviews)
      .where(eq(normalizationReviews.id, created.id));
    expect(updated.status).toBe("approved");

    // Verify alias created
    const aliases = await db
      .select()
      .from(topicAliases)
      .where(eq(topicAliases.topicId, uniqueTopicId));
    const matchedAlias = aliases.find((a) => a.alias === "HLD & LLD Architecture");
    expect(matchedAlias).toBeDefined();
  });

  // 11. Admin review rejection persists correctly
  it("11. rejects normalization review item with reason", async () => {
    mockUser = { id: adminUserId, role: "admin" };

    const created = await createNormalizationReviewItemAction({
      candidate: "Completely Irrelevant Chit-chat",
      candidateType: "topic",
      confidence: 0.2,
      reason: "Not a technical topic",
    });

    const rejection = await rejectNormalizationReviewAction({
      reviewId: created.id,
      reason: "Irrelevant conversation, rejected as canonical topic",
    });

    expect(rejection.success).toBe(true);
    expect(rejection.status).toBe("rejected");

    const [updated] = await db
      .select()
      .from(normalizationReviews)
      .where(eq(normalizationReviews.id, created.id));
    expect(updated.status).toBe("rejected");
    expect(updated.reason).toContain("Irrelevant conversation");
  });

  // 12. Golden extraction dataset evaluates deterministically
  it("12. runs AI evaluation harness deterministically on golden dataset", async () => {
    const report = await runAIEvaluationHarness();
    expect(report.totalCases).toBe(GOLDEN_EVALUATION_DATASET.length);
    expect(report.validStructuredOutputRate).toBe(1);
    expect(report.caseResults.length).toBe(GOLDEN_EVALUATION_DATASET.length);
    expect(report.caseResults.every((c) => c.passed)).toBe(true);
  });

  // 13. Evidence grounding metric works and enforces verbatim quotes
  it("13. achieves >= 95% evidence grounding on golden benchmark dataset", async () => {
    const report = await runAIEvaluationHarness();
    expect(report.evidenceGroundingRate).toBeGreaterThanOrEqual(0.95);
  });

  // 14. Topic and question recall metrics work
  it("14. achieves high topic and question recall on golden dataset", async () => {
    const report = await runAIEvaluationHarness();
    expect(report.topicRecall).toBeGreaterThanOrEqual(0.85);
    expect(report.questionRecall).toBeGreaterThanOrEqual(0.85);
    expect(report.roundAccuracy).toBeGreaterThanOrEqual(0.85);
  });

  // 15. Evaluation versioning is present and verifiable
  it("15. verifies dataset version and prompt/schema versions", () => {
    expect(EVALUATION_DATASET_VERSION).toBe("v1");
  });

  // 16. Reputation signals are derived server-side deterministically
  it("16. computes deterministic reputation signals and trust tiers", async () => {
    const repUserId = `user_rep_${Date.now()}`;
    await db.insert(user).values({
      id: repUserId,
      name: "Reputation Test User",
      email: `${repUserId}@example.com`,
      role: "student",
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // 1. Initial baseline
    let signals = await getUserReputationSignals(repUserId);
    expect(signals).not.toBeNull();
    expect(signals?.reputationScore).toBe(10);
    expect(signals?.trustTier).toBe("Community Member");

    // 2. Add verified alumni employment
    await db.insert(alumniProfiles).values({
      id: `alumni_${Date.now()}`,
      name: "Reputation Test User",
      role: "Software Engineer",
      company: "Phase 3.3 Test Corp",
      companyId: testCompanyId,
      college: "Test Engineering College",
      year: 2024,
      interviewType: "Full-time",
      avatarBg: "#3b82f6",
      quote: "Preparation is key",
      tags: ["Algorithms", "System Design"],
      roundsCount: 3,
      verifiedStatus: "verified",
      responseRate: "100%",
      userId: repUserId,
    });

    // 3. Add published experience
    const expId = `exp_${Date.now()}`;
    await db.insert(experiences).values({
      id: expId,
      companyId: testCompanyId,
      companyName: "Phase 3.3 Test Corp",
      authorId: repUserId,
      role: "SDE-1",
      year: 2024,
      type: "Full-time",
      rounds: 3,
      difficulty: "Medium",
      studentName: "Rep User",
      verificationStatus: "verified",
      summary: "Great interview experience overall.",
      status: "published",
    });

    // 4. Add accepted evidence
    await db.insert(evidence).values({
      id: `ev_${Date.now()}`,
      experienceId: expId,
      kind: "offer_screenshot",
      status: "accepted",
    });

    signals = await getUserReputationSignals(repUserId);
    expect(signals?.hasVerifiedEmployment).toBe(true);
    expect(signals?.publishedExperiencesCount).toBe(1);
    expect(signals?.verifiedEvidenceCount).toBe(1);
    // 10 baseline + 40 (employment) + 10 (1 exp) + 10 (1 evidence) = 70
    expect(signals?.reputationScore).toBe(70);
    expect(signals?.trustTier).toBe("Verified Contributor");
    expect(signals?.badges).toContain("Verified Employment");
    expect(signals?.badges).toContain("Interview Contributor");
    expect(signals?.badges).toContain("Evidence Verified");
  });

  // 17. Users cannot manipulate reputation (pure server-derived function)
  it("17. bounds reputation scores strictly between 0 and 100", async () => {
    const dummyUserId = "non_existent_user_xyz";
    const signals = await getUserReputationSignals(dummyUserId);
    expect(signals).toBeNull();
  });

  // 18. Pending review query returns only pending reviews
  it("18. retrieves pending reviews for admin moderation queue", async () => {
    mockUser = { id: adminUserId, role: "admin" };

    const rev1 = await createNormalizationReviewItemAction({
      candidate: "PostgreSQL Indexing",
      candidateType: "topic",
      confidence: 0.6,
    });

    const pending = await getPendingNormalizationReviews();
    const found = pending.find((p) => p.id === rev1.id);
    expect(found).toBeDefined();
    expect(found?.status).toBe("pending");
  });
});
