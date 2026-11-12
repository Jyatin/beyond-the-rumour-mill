import { describe, it, expect, vi, beforeAll } from "vitest";
import { eq } from "drizzle-orm";
import { db } from "../src/server/db";
import { 
  user, 
  notifications, 
  preparationItems, 
  experiences,
  mockSlots, 
  mockBookings, 
  mentorshipRequests 
} from "../src/server/db/schema";
import {
  createMentorshipRequestAction,
  acceptMentorshipRequestAction,
} from "../src/server/actions/mentorship";
import {
  createMockSlotAction,
  bookMockSlotAction,
  cancelMockBookingAction,
} from "../src/server/actions/mock-interviews";
import { getMyNotifications } from "../src/server/queries/notifications";
import { markNotificationReadAction } from "../src/server/actions/notifications";
import { getMyContributionStatus } from "../src/server/queries/contribution";
import { createExperienceAction, submitExperienceAction } from "../src/server/actions/experiences";
import {
  getPreparationItems,
  getPreparationProgress,
} from "../src/server/queries/preparation";
import {
  createPreparationItemAction,
  togglePreparationItemAction,
  deletePreparationItemAction,
} from "../src/server/actions/preparation";
import { getCurrentUser, requireUser, requireRole } from "../src/server/auth-helpers";

const studentUserA = { id: "p28_student_a", name: "Student Alpha", email: "student_a@test.com", role: "student" } as const;
const studentUserB = { id: "p28_student_b", name: "Student Beta", email: "student_b@test.com", role: "student" } as const;
const mentorUserA = { id: "p28_mentor_a", name: "Mentor Alpha", email: "mentor_a@test.com", role: "alumni" } as const;
const adminUserA = { id: "p28_admin_a", name: "Admin Alpha", email: "admin_a@test.com", role: "admin" } as const;

vi.mock("../src/server/auth-helpers", () => ({
  getCurrentUser: vi.fn(),
  requireUser: vi.fn(),
  requireRole: vi.fn(),
}));

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));

async function setUser(currentUser: typeof studentUserA | typeof studentUserB | typeof mentorUserA | typeof adminUserA | null) {
  // @ts-expect-error mock implementation
  requireUser.mockImplementation(() => (currentUser ? Promise.resolve(currentUser) : Promise.reject(new Error("Unauthorized"))));
  // @ts-expect-error mock implementation
  getCurrentUser.mockImplementation(() => Promise.resolve(currentUser));
  // @ts-expect-error mock implementation
  requireRole.mockImplementation((required: string) => {
    if (!currentUser) throw new Error("Unauthorized");
    if (currentUser.role !== required && currentUser.role !== "admin") {
      throw new Error(`Forbidden: requires role ${required}`);
    }
    return Promise.resolve(currentUser);
  });
}

describe("Phase 2.8 Notifications, Give-to-Get & Preparation Integration", () => {
  beforeAll(async () => {
    const testUsers = [studentUserA, studentUserB, mentorUserA, adminUserA];
    for (const u of testUsers) {
      const existing = await db.select().from(user).where(eq(user.id, u.id));
      if (existing.length === 0) {
        await db.insert(user).values({
          id: u.id,
          name: u.name,
          email: u.email,
          emailVerified: true,
          role: u.role,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    // Clean up test data for repeatability
    for (const u of testUsers) {
      await db.delete(notifications).where(eq(notifications.userId, u.id));
      await db.delete(preparationItems).where(eq(preparationItems.userId, u.id));
      await db.delete(mockBookings).where(eq(mockBookings.studentId, u.id));
      await db.delete(mockSlots).where(eq(mockSlots.mentorId, u.id));
      await db.delete(mentorshipRequests).where(eq(mentorshipRequests.studentId, u.id));
      await db.delete(mentorshipRequests).where(eq(mentorshipRequests.mentorId, u.id));
      await db.delete(experiences).where(eq(experiences.authorId, u.id));
    }
  });

  describe("Notifications Integration", () => {
    let createdReqId: string;
    let slotId: string;
    let bookingId: string;

    it("1. Mentorship request creates mentor notification", async () => {
      await setUser(studentUserA);
      const res = await createMentorshipRequestAction({
        mentorId: mentorUserA.id,
        message: "Need interview coaching",
      });
      createdReqId = res.id;

      await setUser(mentorUserA);
      const notifs = await getMyNotifications();
      const reqNotif = notifs.find((n) => n.type === "mentorship_request");
      expect(reqNotif).toBeDefined();
      expect(reqNotif?.userId).toBe(mentorUserA.id);
      expect(reqNotif?.title).toContain("Mentorship Request");
    });

    it("2. Mentorship acceptance creates student notification", async () => {
      await setUser(mentorUserA);
      await acceptMentorshipRequestAction(createdReqId);

      await setUser(studentUserA);
      const notifs = await getMyNotifications();
      const acceptNotif = notifs.find((n) => n.type === "mentorship_accepted");
      expect(acceptNotif).toBeDefined();
      expect(acceptNotif?.userId).toBe(studentUserA.id);
    });

    it("3. Mock booking creates mentor notification", async () => {
      // Mentor creates slot
      await setUser(mentorUserA);
      const startsAt = new Date(Date.now() + 48 * 60 * 60 * 1000);
      const endsAt = new Date(startsAt.getTime() + 60 * 60 * 1000);
      const slotRes = await createMockSlotAction({ startsAt, endsAt, notes: "System Design" });
      slotId = slotRes.id;

      // Student books slot
      await setUser(studentUserA);
      const bookRes = await bookMockSlotAction(slotId);
      bookingId = bookRes.id;

      // Check mentor received notification
      await setUser(mentorUserA);
      const notifs = await getMyNotifications();
      const bookNotif = notifs.find((n) => n.type === "mock_booking");
      expect(bookNotif).toBeDefined();
      expect(bookNotif?.userId).toBe(mentorUserA.id);
    });

    it("4. Booking cancellation creates appropriate notification", async () => {
      // Student cancels booking
      await setUser(studentUserA);
      await cancelMockBookingAction(bookingId);

      // Mentor should receive cancellation notification
      await setUser(mentorUserA);
      const notifs = await getMyNotifications();
      const cancelNotif = notifs.find((n) => n.type === "mock_booking_cancelled");
      expect(cancelNotif).toBeDefined();
    });

    it("5. User can only read own notifications", async () => {
      await setUser(studentUserB);
      const notifs = await getMyNotifications();
      // Student B should not see Student A's or Mentor A's notifications
      expect(notifs.every((n) => n.userId === studentUserB.id)).toBe(true);
    });

    it("6. Marking notification read works", async () => {
      await setUser(mentorUserA);
      const notifs = await getMyNotifications();
      expect(notifs.length).toBeGreaterThan(0);
      const targetNotif = notifs[0];

      await markNotificationReadAction(targetNotif.id);

      const updatedNotifs = await getMyNotifications();
      const updated = updatedNotifs.find((n) => n.id === targetNotif.id);
      expect(updated?.readAt).not.toBeNull();
    });
  });

  describe("Give-to-Get System", () => {
    it("7. User without submitted experience is not contributed", async () => {
      await setUser(studentUserB);
      const status = await getMyContributionStatus();
      expect(status.status).toBe("not_contributed");
      expect(status.hasContributed).toBe(false);
      expect(status.submittedCount).toBe(0);
    });

    it("8. Submitted experience changes contribution state to contributed", async () => {
      await setUser(studentUserB);
      const expRes = await createExperienceAction({
        companyId: "google",
        companyName: "Google",
        role: "Software Engineer",
        year: 2024,
        type: "Full-time",
        rounds: 3,
        difficulty: "Medium",
        studentName: "Student Beta",
        isAnonymous: false,
        status: "draft",
        summary: "Detailed interview round notes",
        content: "Coding + System Design round questions",
      });

      // Draft experience does not count yet
      let status = await getMyContributionStatus();
      expect(status.status).toBe("not_contributed");

      // Submit experience -> status becomes pending
      await submitExperienceAction(expRes.id);

      status = await getMyContributionStatus();
      expect(status.status).toBe("contributed");
      expect(status.hasContributed).toBe(true);
      expect(status.submittedCount).toBe(1);
    });

    it("9. Admin user is exempt from contribution requirement", async () => {
      await setUser(adminUserA);
      const status = await getMyContributionStatus();
      expect(status.status).toBe("exempt");
      expect(status.hasContributed).toBe(true);
    });
  });

  describe("Student Preparation Integration", () => {
    let prepTaskId: string;

    it("10. User can create checklist item", async () => {
      await setUser(studentUserA);
      const res = await createPreparationItemAction({
        companyId: "google",
        title: "Practice Binary Search on Answer",
        description: "LeetCode 875, 1011",
        category: "DSA",
      });

      expect(res.success).toBe(true);
      expect(res.item).toBeDefined();
      prepTaskId = res.item.id;

      const items = await getPreparationItems("google");
      expect(items.some((i) => i.id === prepTaskId)).toBe(true);
    });

    it("11. User can complete and reopen checklist item", async () => {
      await setUser(studentUserA);

      // Mark complete
      await togglePreparationItemAction(prepTaskId, true);
      let items = await getPreparationItems();
      let item = items.find((i) => i.id === prepTaskId);
      expect(item?.completedAt).not.toBeNull();

      // Reopen
      await togglePreparationItemAction(prepTaskId, false);
      items = await getPreparationItems();
      item = items.find((i) => i.id === prepTaskId);
      expect(item?.completedAt).toBeNull();
    });

    it("12. Progress calculation is correct", async () => {
      await setUser(studentUserA);

      // Add a second task
      await createPreparationItemAction({
        companyId: "google",
        title: "Review LRU Cache Implementation",
        category: "DSA",
      });

      let progress = await getPreparationProgress("google");
      expect(progress.total).toBe(2);
      expect(progress.completed).toBe(0);
      expect(progress.percentage).toBe(0);

      // Mark first task complete
      await togglePreparationItemAction(prepTaskId, true);

      progress = await getPreparationProgress("google");
      expect(progress.total).toBe(2);
      expect(progress.completed).toBe(1);
      expect(progress.percentage).toBe(50);
    });

    it("13. Another user cannot modify or delete checklist items", async () => {
      await setUser(studentUserB);

      // Student B attempts to toggle Student A's task
      await expect(togglePreparationItemAction(prepTaskId, true)).rejects.toThrow(
        "Unauthorized: Cannot modify another student's preparation checklist"
      );

      // Student B attempts to delete Student A's task
      await expect(deletePreparationItemAction(prepTaskId)).rejects.toThrow(
        "Unauthorized: Cannot delete another student's preparation checklist"
      );
    });

    it("14. Company preparation entry point resolves correctly", async () => {
      await setUser(studentUserA);
      const googleItems = await getPreparationItems("google");
      expect(googleItems.length).toBe(2);
      expect(googleItems.every((i) => i.companyId === "google")).toBe(true);

      const msftItems = await getPreparationItems("microsoft");
      expect(msftItems.length).toBe(0);
    });
  });
});
