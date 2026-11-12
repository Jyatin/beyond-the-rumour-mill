import { describe, it, expect } from "vitest";
import { eq } from "drizzle-orm";
import { auth } from "../src/server/auth";
import { authClient } from "../src/lib/auth-client";
import { db } from "../src/server/db";
import { user } from "../src/server/db/schema";

describe("Better Auth & OAuth Integration Tests", () => {
  it("initializes Better Auth with email/password and social provider support", () => {
    expect(auth).toBeDefined();
    expect(typeof auth.api.getSession).toBe("function");
    expect(typeof auth.api.signInEmail).toBe("function");
    expect(typeof auth.api.signUpEmail).toBe("function");
    expect(typeof auth.api.signInSocial).toBe("function");
    expect(typeof auth.api.requestPasswordReset).toBe("function");
  });

  it("exports authClient with standard authentication and password reset methods", () => {
    expect(authClient).toBeDefined();
    expect(typeof authClient.signIn).toBe("function");
    expect(typeof authClient.signUp).toBe("function");
    expect(typeof authClient.signOut).toBe("function");
    expect(typeof authClient.signIn.social).toBe("function");
    expect(typeof authClient.signIn.email).toBe("function");
    expect(typeof authClient.signUp.email).toBe("function");
    expect(typeof authClient.requestPasswordReset).toBe("function");
    expect(typeof authClient.resetPassword).toBe("function");
  });

  it("exposes social sign-in endpoints on auth handler", async () => {
    expect(auth.api.signInSocial).toBeDefined();
  });

  it("verifies account table schema fields for OAuth token persistence", async () => {
    const { account, session } = await import("../src/server/db/schema");
    expect(account).toBeDefined();
    expect(account.userId).toBeDefined();
    expect(account.providerId).toBeDefined();
    expect(account.accountId).toBeDefined();
    expect(account.accessToken).toBeDefined();
    expect(account.refreshToken).toBeDefined();
    expect(account.idToken).toBeDefined();
    expect(account.scope).toBeDefined();

    expect(session.userId).toBeDefined();
    expect(session.token).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.role).toBeDefined();
  });

  it("verifies Next.js API auth catch-all handler routes GET and POST", async () => {
    const authRoute = await import("../src/app/api/auth/[...all]/route");
    expect(authRoute.GET).toBeDefined();
    expect(authRoute.POST).toBeDefined();
  });

  it("blocks self-registration with privileged admin or tpo roles", async () => {
    const authRoute = await import("../src/app/api/auth/[...all]/route");
    const blockedEmails = [
      `escalate_admin_${Date.now()}@test.com`,
      `escalate_tpo_${Date.now()}@test.com`,
    ];

    try {
      for (const [idx, role] of ["admin", "tpo"].entries()) {
        const req = new Request("http://localhost:3000/api/auth/sign-up/email", {
          method: "POST",
          headers: { "Content-Type": "application/json", origin: "http://localhost:3000" },
          body: JSON.stringify({
            name: "Escalation Test",
            email: blockedEmails[idx],
            password: "Password123!",
            role,
          }),
        });

        const res = await authRoute.POST(req);
        expect(res.ok).toBe(false);
        expect(res.status).toBeGreaterThanOrEqual(400);

        const [persisted] = await db
          .select({ id: user.id })
          .from(user)
          .where(eq(user.email, blockedEmails[idx]))
          .limit(1);
        expect(persisted).toBeUndefined();
      }
    } finally {
      for (const email of blockedEmails) {
        await db.delete(user).where(eq(user.email, email)).catch(() => {});
      }
    }
  });
});
