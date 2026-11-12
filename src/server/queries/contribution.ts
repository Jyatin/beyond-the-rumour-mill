import "server-only";

import { db } from "../db";
import { experiences } from "../db/schema";
import { eq, and, or, count } from "drizzle-orm";
import { getCurrentUser } from "../auth-helpers";

export type ContributionStatus = "not_contributed" | "contributed" | "exempt";

export async function getMyContributionStatus(): Promise<{
  status: ContributionStatus;
  hasContributed: boolean;
  submittedCount: number;
}> {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return {
      status: "not_contributed",
      hasContributed: false,
      submittedCount: 0,
    };
  }

  // Admins are exempt from contribution requirement
  if (currentUser.role === "admin") {
    return {
      status: "exempt",
      hasContributed: true,
      submittedCount: 0,
    };
  }

  // Count submitted experiences authored by current user (pending, published, or flagged)
  const result = await db
    .select({ total: count() })
    .from(experiences)
    .where(
      and(
        eq(experiences.authorId, currentUser.id),
        or(
          eq(experiences.status, "pending"),
          eq(experiences.status, "published"),
          eq(experiences.status, "flagged")
        )
      )
    );

  const total = Number(result[0]?.total || 0);
  const hasContributed = total >= 1;

  return {
    status: hasContributed ? "contributed" : "not_contributed",
    hasContributed,
    submittedCount: total,
  };
}
