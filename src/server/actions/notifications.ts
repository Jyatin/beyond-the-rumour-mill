"use server";

import { eq, and, isNull } from "drizzle-orm";
import { db } from "../db";
import { notifications } from "../db/schema";
import { requireUser } from "../auth-helpers";
import { revalidatePath } from "next/cache";

export async function markNotificationReadAction(notificationId: string) {
  const currentUser = await requireUser();

  const [notif] = await db
    .select()
    .from(notifications)
    .where(eq(notifications.id, notificationId))
    .limit(1);

  if (!notif) {
    throw new Error("Notification not found");
  }

  // Authorization: Only the owner can mark their notification as read
  if (notif.userId !== currentUser.id) {
    throw new Error("Unauthorized: Cannot modify another user's notifications");
  }

  await db
    .update(notifications)
    .set({ readAt: new Date() })
    .where(eq(notifications.id, notificationId));

  revalidatePath("/profile");
  return { success: true };
}

export async function markAllNotificationsReadAction() {
  const currentUser = await requireUser();

  await db
    .update(notifications)
    .set({ readAt: new Date() })
    .where(
      and(
        eq(notifications.userId, currentUser.id),
        isNull(notifications.readAt)
      )
    );

  revalidatePath("/profile");
  return { success: true };
}
