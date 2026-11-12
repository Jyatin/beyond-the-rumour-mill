import { createAuthClient } from "better-auth/react";

function getClientBaseUrl(): string {
  if (typeof window !== "undefined") {
    // When executing in a browser environment on Vercel preview or custom domain,
    // match the current window origin so client requests always match the host
    if (process.env.NEXT_PUBLIC_APP_URL) {
      try {
        const configuredUrl = new URL(process.env.NEXT_PUBLIC_APP_URL);
        // If NEXT_PUBLIC_APP_URL is localhost while the page is running on a deployed host, use window.location.origin
        if (
          (window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") &&
          (configuredUrl.hostname === "localhost" || configuredUrl.hostname === "127.0.0.1")
        ) {
          return window.location.origin;
        }
        return configuredUrl.origin;
      } catch {}
    }
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_APP_URL || process.env.BETTER_AUTH_URL || "";
}

export const authClient = createAuthClient({
  baseURL: getClientBaseUrl(),
});

export const { signIn, signUp, signOut, useSession } = authClient;
