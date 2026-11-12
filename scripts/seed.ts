/* eslint-disable */
import { config } from "dotenv";
config({ path: ".env" });

import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../src/server/db/schema";
import {
  companies,
  experiences,
  questions,
  alumniProfiles,
} from "../src/lib/mock-data";

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  console.log("Connecting to database...");
  const connection = postgres(process.env.DATABASE_URL, {
    max: 5,
    connect_timeout: 15,
    idle_timeout: 30,
  });
  const db = drizzle(connection, { schema });

  console.log("Seeding companies...");
  const explicitCompanies = [...companies];
  const missingCompanyRefs = [
    { id: "atlassian", name: "Atlassian" },
    { id: "uber", name: "Uber" },
    { id: "goldmansachs", name: "Goldman Sachs" },
  ];

  for (const ref of missingCompanyRefs) {
    if (!explicitCompanies.some((c) => c.id === ref.id)) {
      explicitCompanies.push({
        id: ref.id,
        name: ref.name,
        industry: "Unknown",
        roles: [],
        verificationStatus: "community",
        lastVerifiedAt: new Date().toISOString(),
        experienceCount: 0,
        topTopics: [],
      });
    }
  }

  await Promise.all(
    explicitCompanies.map((company) => {
      let domainStr: string | null = null;
      if (company.id === "google") domainStr = "google.com";
      else if (company.id === "microsoft") domainStr = "microsoft.com";
      else if (company.id === "philips") domainStr = "philips.com";
      else if (company.id === "wissen") domainStr = "wissen.com";
      else if (company.id === "adobe") domainStr = "adobe.com";

      return db
        .insert(schema.companies)
        .values({
          id: company.id,
          name: company.name,
          domain: domainStr,
          industry: company.industry,
          roles: company.roles,
          verificationStatus: company.verificationStatus as any,
          lastVerifiedAt: new Date(company.lastVerifiedAt).toISOString(),
          experienceCount: company.experienceCount,
          topTopics: company.topTopics,
        })
        .onConflictDoUpdate({
          target: schema.companies.id,
          set: {
            name: company.name,
            domain: domainStr,
            industry: company.industry,
            roles: company.roles,
            verificationStatus: company.verificationStatus as any,
            lastVerifiedAt: new Date(company.lastVerifiedAt).toISOString(),
            experienceCount: company.experienceCount,
            topTopics: company.topTopics,
          },
        });
    })
  );

  console.log("Seeding experiences, questions & alumni profiles...");
  await Promise.all([
    ...experiences.map((exp) =>
      db
        .insert(schema.experiences)
        .values({
          id: exp.id,
          companyId: exp.companyId,
          companyName: exp.companyName,
          role: exp.role,
          year: exp.year,
          type: exp.type,
          rounds: exp.rounds,
          difficulty: exp.difficulty,
          studentName: exp.studentName,
          isAnonymous: exp.isAnonymous,
          verificationStatus: exp.verificationStatus as any,
          summary: exp.summary,
          helpfulCount: exp.helpfulCount,
        })
        .onConflictDoUpdate({
          target: schema.experiences.id,
          set: {
            companyId: exp.companyId,
            companyName: exp.companyName,
            role: exp.role,
            year: exp.year,
            type: exp.type,
            rounds: exp.rounds,
            difficulty: exp.difficulty,
            studentName: exp.studentName,
            isAnonymous: exp.isAnonymous,
            verificationStatus: exp.verificationStatus as any,
            summary: exp.summary,
            helpfulCount: exp.helpfulCount,
          },
        })
    ),
    ...questions.map((q) => {
      const normalizedHash = q.text.trim().toLowerCase();
      return db
        .insert(schema.interviewQuestions)
        .values({
          id: q.id,
          canonicalText: q.text,
          normalizedHash,
        })
        .onConflictDoUpdate({
          target: schema.interviewQuestions.id,
          set: {
            canonicalText: q.text,
            normalizedHash,
          },
        });
    }),
    ...alumniProfiles.map((profile) =>
      db
        .insert(schema.alumniProfiles)
        .values({
          id: profile.id,
          name: profile.name,
          role: profile.role,
          company: profile.company,
          companyId: profile.companyId,
          college: profile.college,
          year: profile.year,
          interviewType: profile.interviewType,
          avatarBg: profile.avatarBg,
          quote: profile.quote,
          tags: profile.tags,
          roundsCount: profile.roundsCount,
          verifiedStatus: profile.verifiedStatus as any,
          responseRate: profile.responseRate,
        })
        .onConflictDoUpdate({
          target: schema.alumniProfiles.id,
          set: {
            name: profile.name,
            role: profile.role,
            company: profile.company,
            companyId: profile.companyId,
            college: profile.college,
            year: profile.year,
            interviewType: profile.interviewType,
            avatarBg: profile.avatarBg,
            quote: profile.quote,
            tags: profile.tags,
            roundsCount: profile.roundsCount,
            verifiedStatus: profile.verifiedStatus as any,
            responseRate: profile.responseRate,
          },
        })
    ),
  ]);

  console.log("Seeding placement information...");
  const demoRoleTitles = [
    { id: "rt_google_swe", companyId: "google", title: "Software Engineer" },
    { id: "rt_google_pm", companyId: "google", title: "Product Manager" },
    { id: "rt_philips_swe", companyId: "philips", title: "Software Engineer (Healthcare IT)" },
    { id: "rt_philips_embedded", companyId: "philips", title: "Embedded Firmware Engineer" },
    { id: "rt_wissen_sde", companyId: "wissen", title: "Software Development Engineer (Backend)" },
    { id: "rt_wissen_quant", companyId: "wissen", title: "Quantitative Systems Analyst" },
    { id: "rt_adobe_mts", companyId: "adobe", title: "Member of Technical Staff" },
  ];
  const demoDrives = [
    {
      id: "drive_google_fall_2024",
      companyId: "google",
      date: "August 2024",
      season: "Fall 2024",
      status: "Upcoming",
      eligibleStudentInformation: "Pre-final and Final year B.Tech/M.Tech students",
    },
    {
      id: "drive_google_spring_2024",
      companyId: "google",
      date: "February 2024",
      season: "Spring 2024",
      status: "Completed",
      eligibleStudentInformation: "Final year B.Tech students",
    },
    {
      id: "drive_philips_autumn_2026",
      companyId: "philips",
      date: "September 2026",
      season: "Autumn 2026",
      status: "Open",
      eligibleStudentInformation: "Final year B.Tech/M.Tech (CS, IT, ECE, EE). Minimum 7.5 CGPA with no standing backlogs.",
    },
    {
      id: "drive_wissen_fall_2026",
      companyId: "wissen",
      date: "August 2026",
      season: "Fall 2026",
      status: "Open",
      eligibleStudentInformation: "B.Tech/Dual Degree students (CS, IT, Mathematics & Computing). 7.5+ CGPA required.",
    },
    {
      id: "drive_adobe_fall_2026",
      companyId: "adobe",
      date: "October 2026",
      season: "Fall 2026",
      status: "Upcoming",
      eligibleStudentInformation: "Final year B.Tech & Dual Degree CS/IT students with strong DSA and competitive programming record.",
    },
  ];
  const demoDriveRoles = [
    {
      id: "dr_google_swe_fall_2024",
      driveId: "drive_google_fall_2024",
      roleId: "rt_google_swe",
      location: "Bangalore / Hyderabad",
      ctc: "32 LPA",
      employmentType: "Full-time",
    },
    {
      id: "dr_google_pm_fall_2024",
      driveId: "drive_google_fall_2024",
      roleId: "rt_google_pm",
      location: "Bangalore",
      ctc: "35 LPA",
      employmentType: "Full-time",
    },
    {
      id: "dr_philips_swe_autumn_2026",
      driveId: "drive_philips_autumn_2026",
      roleId: "rt_philips_swe",
      location: "Bangalore / Pune",
      ctc: "16 LPA",
      employmentType: "Full-time",
    },
    {
      id: "dr_philips_embedded_autumn_2026",
      driveId: "drive_philips_autumn_2026",
      roleId: "rt_philips_embedded",
      location: "Bangalore",
      ctc: "14.5 LPA",
      employmentType: "Full-time",
    },
    {
      id: "dr_wissen_sde_fall_2026",
      driveId: "drive_wissen_fall_2026",
      roleId: "rt_wissen_sde",
      location: "Bangalore / Mumbai",
      ctc: "20 LPA",
      employmentType: "Full-time",
    },
    {
      id: "dr_wissen_quant_fall_2026",
      driveId: "drive_wissen_fall_2026",
      roleId: "rt_wissen_quant",
      location: "Mumbai",
      ctc: "22 LPA",
      employmentType: "Full-time",
    },
    {
      id: "dr_adobe_mts_fall_2026",
      driveId: "drive_adobe_fall_2026",
      roleId: "rt_adobe_mts",
      location: "Noida / Bangalore",
      ctc: "28 LPA",
      employmentType: "Full-time",
    },
  ];

  await Promise.all([
    ...demoRoleTitles.map((rt) =>
      db
        .insert(schema.roleTitles)
        .values({ ...rt })
        .onConflictDoUpdate({
          target: [schema.roleTitles.id],
          set: { title: rt.title },
        })
    ),
    ...demoDrives.map((d) =>
      db
        .insert(schema.placementDrives)
        .values({ ...d })
        .onConflictDoUpdate({
          target: [schema.placementDrives.id],
          set: { ...d },
        })
    ),
  ]);

  await Promise.all(
    demoDriveRoles.map((dr) =>
      db
        .insert(schema.driveRoles)
        .values({ ...dr })
        .onConflictDoUpdate({
          target: [schema.driveRoles.id],
          set: { ...dr },
        })
    )
  );

  await Promise.all([
    db
      .insert(schema.eligibilityRequirements)
      .values({
        id: "er_google_swe_fall_2024",
        driveRoleId: "dr_google_swe_fall_2024",
        cgpa: "8.0+",
        branches: ["Computer Science", "Information Technology", "Electronics"],
        backlog: "No active backlogs",
        otherCriteria: "Must have completed Google Coding Assessment",
      })
      .onConflictDoUpdate({
        target: [schema.eligibilityRequirements.id],
        set: {
          cgpa: "8.0+",
          branches: ["Computer Science", "Information Technology", "Electronics"],
          backlog: "No active backlogs",
          otherCriteria: "Must have completed Google Coding Assessment",
        },
      }),
    db
      .insert(schema.eligibilityRequirements)
      .values({
        id: "er_philips_swe_autumn_2026",
        driveRoleId: "dr_philips_swe_autumn_2026",
        cgpa: "7.5+",
        branches: ["Computer Science", "Information Technology", "Electronics & Communication"],
        backlog: "No standing backlogs",
        otherCriteria: "Proficiency in C++ and Modern OOP",
      })
      .onConflictDoUpdate({
        target: [schema.eligibilityRequirements.id],
        set: {
          cgpa: "7.5+",
          branches: ["Computer Science", "Information Technology", "Electronics & Communication"],
          backlog: "No standing backlogs",
          otherCriteria: "Proficiency in C++ and Modern OOP",
        },
      }),
    db
      .insert(schema.eligibilityRequirements)
      .values({
        id: "er_wissen_sde_fall_2026",
        driveRoleId: "dr_wissen_sde_fall_2026",
        cgpa: "7.5+",
        branches: ["Computer Science", "Information Technology", "Mathematics & Computing"],
        backlog: "No active backlogs",
        otherCriteria: "Command over Core Java Concurrency & System Design",
      })
      .onConflictDoUpdate({
        target: [schema.eligibilityRequirements.id],
        set: {
          cgpa: "7.5+",
          branches: ["Computer Science", "Information Technology", "Mathematics & Computing"],
          backlog: "No active backlogs",
          otherCriteria: "Command over Core Java Concurrency & System Design",
        },
      }),
    db
      .insert(schema.eligibilityRequirements)
      .values({
        id: "er_adobe_mts_fall_2026",
        driveRoleId: "dr_adobe_mts_fall_2026",
        cgpa: "8.0+",
        branches: ["Computer Science", "Information Technology"],
        backlog: "No backlogs",
        otherCriteria: "High algorithmic problem solving & DSA speed",
      })
      .onConflictDoUpdate({
        target: [schema.eligibilityRequirements.id],
        set: {
          cgpa: "8.0+",
          branches: ["Computer Science", "Information Technology"],
          backlog: "No backlogs",
          otherCriteria: "High algorithmic problem solving & DSA speed",
        },
      }),
    db
      .insert(schema.preparationRequirements)
      .values({
        id: "pr_google_swe_fall_2024",
        driveRoleId: "dr_google_swe_fall_2024",
        requiredSkills: ["Data Structures", "Algorithms", "System Design"],
        suggestedTopics: ["Dynamic Programming", "Graphs", "Trees"],
        preparationResources: [
          { title: "Google Interview Prep Guide", url: "https://careers.google.com/interview-prep" },
        ],
      })
      .onConflictDoUpdate({
        target: [schema.preparationRequirements.id],
        set: {
          requiredSkills: ["Data Structures", "Algorithms", "System Design"],
          suggestedTopics: ["Dynamic Programming", "Graphs", "Trees"],
          preparationResources: [
            { title: "Google Interview Prep Guide", url: "https://careers.google.com/interview-prep" },
          ],
        },
      }),
    db
      .insert(schema.preparationRequirements)
      .values({
        id: "pr_philips_swe_autumn_2026",
        driveRoleId: "dr_philips_swe_autumn_2026",
        requiredSkills: ["C++", "Memory Management", "RTOS", "Multi-threading"],
        suggestedTopics: ["Smart Pointers", "IPC & Mutex", "Deadlock Prevention", "OOP Design"],
        preparationResources: [
          { title: "Philips Healthcare Engineering Guidelines", url: "https://www.philips.com/careers" },
        ],
      })
      .onConflictDoUpdate({
        target: [schema.preparationRequirements.id],
        set: {
          requiredSkills: ["C++", "Memory Management", "RTOS", "Multi-threading"],
          suggestedTopics: ["Smart Pointers", "IPC & Mutex", "Deadlock Prevention", "OOP Design"],
          preparationResources: [
            { title: "Philips Healthcare Engineering Guidelines", url: "https://www.philips.com/careers" },
          ],
        },
      }),
    db
      .insert(schema.preparationRequirements)
      .values({
        id: "pr_wissen_sde_fall_2026",
        driveRoleId: "dr_wissen_sde_fall_2026",
        requiredSkills: ["Core Java Concurrency", "Low-Level Design", "Lock-free Queues", "JVM Internals"],
        suggestedTopics: ["ConcurrentHashMap", "Garbage Collection Tuning", "Atomic Variables", "LOB Engine"],
        preparationResources: [
          { title: "Wissen Fintech Engineering Architecture", url: "https://www.wissen.com" },
        ],
      })
      .onConflictDoUpdate({
        target: [schema.preparationRequirements.id],
        set: {
          requiredSkills: ["Core Java Concurrency", "Low-Level Design", "Lock-free Queues", "JVM Internals"],
          suggestedTopics: ["ConcurrentHashMap", "Garbage Collection Tuning", "Atomic Variables", "LOB Engine"],
          preparationResources: [
            { title: "Wissen Fintech Engineering Architecture", url: "https://www.wissen.com" },
          ],
        },
      }),
  ]);

  console.log("Seeding sample published/draft experiences & structured rounds...");
  const demoExperiences = [
    {
      id: "exp_seed_published_1",
      companyId: "google",
      companyName: "Google",
      role: "Software Engineer",
      year: 2024,
      type: "Full-time",
      rounds: 4,
      difficulty: "Hard",
      studentName: "John Doe",
      isAnonymous: false,
      verificationStatus: "verified",
      summary: "Standard technical rounds, mostly DSA.",
      content: "I had 4 technical rounds. Round 1: Array manipulation. Round 2: Graphs. Round 3: System Design. Round 4: Googleyness.",
      outcome: "Offer",
      timeline: "Aug 2024 - Sep 2024",
      status: "published",
    },
    {
      id: "exp_seed_draft_1",
      companyId: "google",
      companyName: "Google",
      role: "Product Manager",
      year: 2024,
      type: "Internship",
      rounds: 2,
      difficulty: "Medium",
      studentName: "Jane Smith",
      isAnonymous: true,
      verificationStatus: "review",
      summary: "Behavioral and product design.",
      content: "Draft content... will finish later.",
      outcome: "Pending",
      timeline: "Oct 2024",
      status: "draft",
    },
  ];

  await Promise.all(
    demoExperiences.map((exp) =>
      db
        .insert(schema.experiences)
        .values({ ...exp } as any)
        .onConflictDoUpdate({
          target: [schema.experiences.id],
          set: { ...exp } as any,
        })
    )
  );

  await db
    .delete(schema.interviewRounds)
    .where(eq(schema.interviewRounds.experienceId, "exp_seed_published_1"));

  const roundTypesList = ["Online Assessment", "Technical", "Behavioral"];
  const seedTopics = ["Arrays", "Graphs", "DSA", "JavaScript", "Behavioral"];

  await Promise.all([
    db
      .insert(schema.roundTypes)
      .values(
        roundTypesList.map((rt) => ({
          id: `rt_seed_${rt.toLowerCase().replace(" ", "_")}`,
          name: rt,
        }))
      )
      .onConflictDoNothing(),
    db
      .insert(schema.topics)
      .values([
        ...seedTopics.map((t) => ({ id: `topic_seed_${t.toLowerCase()}`, name: t })),
        { id: "top_hash_tables", name: "Hash Tables" },
        { id: "top_sys_design", name: "System Design" },
        { id: "top_dynamic_prog", name: "Dynamic Programming" },
      ])
      .onConflictDoNothing(),
  ]);

  const [allTopics] = await Promise.all([
    db.select().from(schema.topics),
    db
      .insert(schema.interviewRounds)
      .values([
        {
          id: "round_seed_1",
          experienceId: "exp_seed_published_1",
          roundTypeId: "rt_seed_online_assessment",
          title: "CodeSignal OA",
          summary: "Standard 4 question CodeSignal.",
          difficulty: "Medium",
          order: 0,
        },
        {
          id: "round_seed_2",
          experienceId: "exp_seed_published_1",
          roundTypeId: "rt_seed_technical",
          title: "DSA and System Design",
          summary: "Focus on graph traversal and basic system design.",
          difficulty: "Hard",
          order: 1,
        },
      ]),
  ]);

  const topicMap = Object.fromEntries(allTopics.map((t) => [t.name, t.id]));

  const seedQuestions = [
    { id: "q_seed_1", text: "Two Sum variant", topicId: topicMap["Arrays"] },
    { id: "q_seed_2", text: "Graph traversal problem", topicId: topicMap["Graphs"] },
    { id: "q_seed_3", text: "Explain event loop", topicId: topicMap["JavaScript"] },
    { id: "q_seed_4", text: "Design a URL shortener", topicId: topicMap["DSA"] },
  ];

  await Promise.all([
    db
      .insert(schema.roundTopics)
      .values([
        { roundId: "round_seed_1", topicId: topicMap["Arrays"] },
        { roundId: "round_seed_1", topicId: topicMap["Graphs"] },
        { roundId: "round_seed_2", topicId: topicMap["DSA"] },
        { roundId: "round_seed_2", topicId: topicMap["JavaScript"] },
      ])
      .onConflictDoNothing(),
    db
      .insert(schema.interviewQuestions)
      .values(
        seedQuestions.map((q) => ({
          id: q.id,
          canonicalText: q.text,
          normalizedHash: q.text.trim().toLowerCase(),
          topicId: q.topicId,
        }))
      )
      .onConflictDoNothing(),
  ]);

  await db
    .insert(schema.experienceQuestions)
    .values([
      { id: "eq_seed_1", experienceId: "exp_seed_published_1", roundId: "round_seed_1", questionId: "q_seed_1", rawText: "Two Sum variant", order: 0 },
      { id: "eq_seed_2", experienceId: "exp_seed_published_1", roundId: "round_seed_1", questionId: "q_seed_2", rawText: "Graph traversal problem", order: 1 },
      { id: "eq_seed_3", experienceId: "exp_seed_published_1", roundId: "round_seed_2", questionId: "q_seed_3", rawText: "Explain event loop", order: 0 },
      { id: "eq_seed_4", experienceId: "exp_seed_published_1", roundId: "round_seed_2", questionId: "q_seed_4", rawText: "Design a URL shortener", order: 1 },
    ])
    .onConflictDoNothing();

  console.log("Seeding mentorship, notifications, preparation & extraction runs...");
  // Preserve existing user roles on re-seed (prevent student -> alumni overwrite)
  await db
    .insert(schema.user)
    .values([
      {
        id: "user_seed_alumni_1",
        name: "Rohan Verma",
        email: "rohan.verma@google.com",
        emailVerified: true,
        role: "alumni",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "user_seed_student_1",
        name: "Priya Sharma",
        email: "priya.student@college.edu",
        emailVerified: true,
        role: "student",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    .onConflictDoNothing();

  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const tomorrowEnd = new Date(Date.now() + 25 * 60 * 60 * 1000);

  await Promise.all([
    db
      .insert(schema.mockSlots)
      .values({
        id: "slot_seed_1",
        mentorId: "user_seed_alumni_1",
        startsAt: tomorrow,
        endsAt: tomorrowEnd,
        status: "available",
        notes: "System Design & LLD 1-on-1 Practice",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [schema.mockSlots.id],
        set: { status: "available", startsAt: tomorrow, endsAt: tomorrowEnd },
      }),
    db
      .insert(schema.mentorshipRequests)
      .values({
        id: "mr_seed_1",
        studentId: "user_seed_student_1",
        mentorId: "user_seed_alumni_1",
        message: "Hi Rohan, would love your guidance on preparing for the Google L3 SWE rounds!",
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [schema.mentorshipRequests.id],
        set: { status: "pending" },
      }),
    db
      .insert(schema.notifications)
      .values({
        id: "notif_seed_1",
        userId: "user_seed_student_1",
        type: "mentorship_accepted",
        title: "Mentorship Request Accepted",
        body: "Rohan Verma accepted your mentorship request!",
        href: "/profile",
        createdAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [schema.notifications.id],
        set: { title: "Mentorship Request Accepted" },
      }),
    db
      .insert(schema.preparationItems)
      .values({
        id: "prep_seed_1",
        userId: "user_seed_student_1",
        companyId: "google",
        title: "Solve Graph DFS and BFS Problems",
        description: "Focus on topological sort and cycle detection for Google L3 SWE",
        category: "DSA",
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [schema.preparationItems.id],
        set: { title: "Solve Graph DFS and BFS Problems" },
      }),
    db
      .insert(schema.extractionRuns)
      .values({
        id: "ext_seed_1",
        experienceId: "exp_seed_published_1",
        model: "mock-extractor-v1",
        promptVersion: "v1",
        schemaVersion: "v1",
        status: "succeeded",
        rawOutput: JSON.stringify({
          metadata: { roleCandidate: "Software Engineer", outcomeCandidate: "Offer", difficultyCandidate: "Medium" },
          rounds: [{ position: 1, roundType: "Technical Round 1", topics: [], questions: [] }],
        }),
        extractedData: {
          metadata: { roleCandidate: "Software Engineer", outcomeCandidate: "Offer", difficultyCandidate: "Medium" },
          rounds: [{ position: 1, roundType: "Technical Round 1", topics: [], questions: [] }],
        },
        createdAt: new Date(),
        completedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [schema.extractionRuns.id],
        set: { status: "succeeded" },
      }),
    db
      .insert(schema.topicAliases)
      .values({
        id: "alias_seed_1",
        topicId: "top_hash_tables",
        alias: "HashMaps",
        normalizedAlias: "hashmaps",
        createdAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [schema.topicAliases.id],
        set: { topicId: "top_hash_tables", alias: "HashMaps", normalizedAlias: "hashmaps" },
      }),
    db
      .insert(schema.consensusSnapshots)
      .values({
        id: "snap_seed_google_1",
        companyId: "google",
        formulaVersion: "v1",
        totalEligibleExperiences: 5,
        totalWeightedExperiences: 4.8,
        verificationScore: 88.5,
        createdAt: new Date(),
      })
      .onConflictDoNothing(),
  ]);

  await db
    .insert(schema.consensusItems)
    .values([
      {
        id: "ci_seed_1",
        snapshotId: "snap_seed_google_1",
        entityType: "topic",
        entityId: topicMap["DSA"] || "topic_seed_dsa",
        entityLabel: "Data Structures & Algorithms",
        reportCount: 5,
        effectiveSampleSize: 4.8,
        weightedPrevalence: 0.95,
        lowerBound: 0.75,
        upperBound: 0.99,
        totalWeight: 4.56,
        status: "published",
        formulaVersion: "v1",
        metadata: { supportingExperienceIds: ["exp_seed_published_1"] },
        createdAt: new Date(),
      },
    ])
    .onConflictDoNothing();

  console.log("Seeding complete! Closing connection...");
  await connection.end();
}

main().catch((err) => {
  console.error("Seeding failed:");
  console.error(err);
  process.exit(1);
});
