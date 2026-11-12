import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { z } from "zod";
import { db } from "./db";
import * as schema from "./db/schema";
import { sendPasswordResetEmail } from "./email";

const ALLOWED_PUBLIC_SIGNUP_ROLES = new Set(["student", "alumni"]);

export const auth = betterAuth({
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
