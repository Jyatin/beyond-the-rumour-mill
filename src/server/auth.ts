import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { z } from "zod";
import { db } from "./db";
import * as schema from "./db/schema";
import { sendPasswordResetEmail } from "./email";

const ALLOWED_PUBLIC_SIGNUP_ROLES = new Set(["student", "alumni"]);

function getAuthBaseUrl(): string {
  if (process.env.BETTER_AUTH_URL) {
    // If on Vercel preview/production, ensure we don't accidentally use localhost
    if (process.env.VERCEL && process.env.BETTER_AUTH_URL.includes("localhost")) {
      if (process.env.NEXT_PUBLIC_APP_URL && !process.env.NEXT_PUBLIC_APP_URL.includes("localhost")) {
        return process.env.NEXT_PUBLIC_APP_URL;
      }
      if (process.env.VERCEL_PROJECT_PRODUCTION_URL && process.env.VERCEL_ENV === "production") {
        return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
      }
      if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
      }
    }
    return process.env.BETTER_AUTH_URL;
  }
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL && process.env.VERCEL_ENV === "production") {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

function getTrustedOrigins(): string[] {
  const origins = new Set<string>([
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
  ]);

  // 1. Explicit BETTER_AUTH_URL
  if (process.env.BETTER_AUTH_URL) {
    try {
      origins.add(new URL(process.env.BETTER_AUTH_URL).origin);
    } catch {}
  }

  // 2. Explicit NEXT_PUBLIC_APP_URL
  if (process.env.NEXT_PUBLIC_APP_URL) {
    try {
      origins.add(new URL(process.env.NEXT_PUBLIC_APP_URL).origin);
    } catch {}
  }

  // 3. Current Vercel deployment URL
  if (process.env.VERCEL_URL) {
    origins.add(`https://${process.env.VERCEL_URL}`);
  }

  // 4. Vercel Git branch URL
  if (process.env.VERCEL_BRANCH_URL) {
    origins.add(`https://${process.env.VERCEL_BRANCH_URL}`);
  }

  // 5. Vercel project production URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    origins.add(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }

  // 6. Explicitly allow the project's verified Preview deployment origins
  origins.add("https://beyond-the-rumour-mill-preview-jyatin1.vercel.app");
  origins.add("https://beyond-the-rumour-mill-main-jyatin1.vercel.app");
  origins.add("https://beyond-the-rumour-mill-main.vercel.app");
  origins.add("https://beyond-the-rumour-mill-main-9q8kjykhr-jyatin1.vercel.app");

  // Project-scoped pattern (scoped specifically to jyatin1 / beyond-the-rumour-mill-main, NOT an unrestricted *.vercel.app wildcard)
  origins.add("https://beyond-the-rumour-mill-main-*-jyatin1.vercel.app");

  return Array.from(origins);
}

export const auth = betterAuth({
  baseURL: getAuthBaseUrl(),
  trustedOrigins: getTrustedOrigins(),
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url }) {
      await sendPasswordResetEmail({
        to: user.email,
        recipientName: user.name || "there",
        resetUrl: url,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      enabled: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    },
    linkedin: {
      clientId: process.env.LINKEDIN_CLIENT_ID || "",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
      enabled: !!(process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET),
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "student",
        validator: {
          input: z.enum(["student", "alumni"]),
        },
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (userData) => {
          const requestedRole =
            typeof userData.role === "string" ? userData.role : "student";
          if (!ALLOWED_PUBLIC_SIGNUP_ROLES.has(requestedRole)) {
            throw new APIError("FORBIDDEN", {
              message: "Public signup only supports student or alumni accounts.",
            });
          }
          return {
            data: {
              ...userData,
              role: requestedRole,
            },
          };
        },
      },
      update: {
        before: async (userData, context) => {
          if (context && "role" in userData) {
            const sanitized = { ...userData };
            delete sanitized.role;
            return { data: sanitized };
          }
        },
      },
    },
  },
});
