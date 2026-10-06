/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { config } from "dotenv";
config({ path: ".env" });

import module from "module";
const originalRequire = module.prototype.require;
module.prototype.require = function (id: string, ...args: any[]) {
  if (id === "server-only") return {};
  if (id === "next/headers") {
    return {
      headers: () => new Map()
    };
  }
  if (id === "../auth-helpers" || id.endsWith("auth-helpers.ts") || id.endsWith("auth-helpers")) {
    return {
      requireUser: async () => global.mockUser,
      getCurrentSession: async () => ({ user: global.mockUser }),
      getCurrentUser: async () => global.mockUser,
      requireRole: async () => global.mockUser,
    };
  }
  return originalRequire.apply(this, [id, ...args]);
};

import { createProfile, createProfileImpl, getProfileByUserId, updateProfile, updateProfileImpl } from "../src/server/queries/profiles";
import { db } from "../src/server/db";
import { user } from "../src/server/db/schema";
import { eq } from "drizzle-orm";

async function verifyProfile() {
  console.log("Starting Profile Verification...");

  // Setup a real user in the DB for the foreign key
  const mockId = "test-user-" + Date.now();
  await db.insert(user).values({
    id: mockId,
    name: "Test User",
    email: `${mockId}@example.com`,
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "student",
  });
  console.log("✓ Created Better Auth user in DB.");

  global.mockUser = { id: mockId, role: "student" };

  // 1. Confirm no profile exists
  let profile = await getProfileByUserId(mockId);
  if (profile) throw new Error("Profile should not exist yet");
  console.log("✓ Verified no profile initially exists.");

  // 2. Complete onboarding (create profile)
  await createProfileImpl(global.mockUser as any, {
    displayName: "Jane Doe",
    headline: "CS Student",
    bio: "Love coding",
    college: "State University",
    gradYear: 2026,
    avatarUrl: null,
    openToMentoring: true,
    visibility: "public",
  }, "alumni");
  console.log("✓ Completed onboarding.");

  // Verify role was updated
  const updatedUser = await db.select().from(user).where(eq(user.id, mockId)).limit(1);
  if (updatedUser[0].role !== "alumni") throw new Error("Role was not updated to alumni");
  global.mockUser.role = "alumni";
  console.log("✓ Verified role was updated.");

  // 3. Confirm profile is inserted
  profile = await getProfileByUserId(mockId);
  if (!profile || profile.displayName !== "Jane Doe") throw new Error("Profile not retrieved correctly");
  console.log("✓ Profile retrieved successfully.");

  // 4. Update the profile
  await updateProfileImpl(global.mockUser as any, {
    headline: "Senior Engineer",
  });
  console.log("✓ Profile updated.");

  profile = await getProfileByUserId(mockId);
  if (profile?.headline !== "Senior Engineer") throw new Error("Profile update didn't persist");
  console.log("✓ Profile update persisted.");

  // 5. Attempt to create admin through client input
  try {
    await createProfileImpl(global.mockUser as any, {
      displayName: "Hacker",
      headline: "Hack",
      bio: "Hack",
      college: "Hack",
      gradYear: 2026,
      avatarUrl: null,
      openToMentoring: true,
      visibility: "public",
    }, "admin" as any);
    throw new Error("Should not be able to create profile as admin");
  } catch (e: any) {
    if (e.message !== "Profile already exists") {
      throw new Error("Unexpected error: " + e.message);
    }
  }

  // To properly test the role restriction, let's mock another user
  const hackerId = "hacker-" + Date.now();
  await db.insert(user).values({
    id: hackerId,
    name: "Hacker",
    email: `${hackerId}@example.com`,
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "student",
  });
  global.mockUser = { id: hackerId, role: "student" };

  await createProfileImpl(global.mockUser as any, {
    displayName: "Hacker",
    headline: "Hack",
    bio: "Hack",
    college: "Hack",
    gradYear: 2026,
    avatarUrl: null,
    openToMentoring: true,
    visibility: "public",
  }, "admin" as any); // The query layer restricts updating to `student` or `alumni`. If they pass `admin`, it just gets ignored or fails.
  
  const hackerUser = await db.select().from(user).where(eq(user.id, hackerId)).limit(1);
  if (hackerUser[0].role === "admin") throw new Error("User was able to escalate to admin!");
  console.log("✓ Server prevented admin escalation.");

  console.log("All Profile verifications passed.");
  process.exit(0);
}

verifyProfile().catch(e => {
  console.error("Profile verification error:", e);
  process.exit(1);
});
