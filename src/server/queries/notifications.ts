import "server-only";

import { db } from "../db";
import { notifications } from "../db/schema";
import { eq, desc, isNull, and, count } from "drizzle-orm";
import { requireUser, getCurrentUser } from "../auth-helpers";

export async function getMyNotifications(limit = 30) {
  const currentUser = await requireUser();

  return await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, currentUser.id))
    .orderBy(desc(notifications.createdAt))
    .limit(limit);
}

export async function getUnreadNotificationCount() {
  const currentUser = await getCurrentUser();
  if (!currentUser) return 0;

  const result = await db
    .select({ total: count() })
    .from(notifications)
    .where(
      and(
        eq(notifications.userId, currentUser.id),
        isNull(notifications.readAt)
      )
    );

  return Number(result[0]?.total || 0);
}
