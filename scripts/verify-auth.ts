import { config } from "dotenv";
config({ path: ".env" });

async function verifyAuth() {
  console.log("Starting Better Auth Verification...");

  const BASE_URL = process.env.BETTER_AUTH_URL || "http://localhost:3000";

  const email = `test-${Date.now()}@example.com`;
  
  // 1. User Registration
  const registerRes = await fetch(`${BASE_URL}/api/auth/sign-up/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "origin": BASE_URL },
    body: JSON.stringify({
      email: email,
      password: "password123",
      name: "Test User",
    }),
  });

  if (!registerRes.ok && registerRes.status !== 400) { // 400 if already exists
    throw new Error("Registration failed: " + await registerRes.text());
  }
  console.log("✓ Registration endpoint hit successfully.");

  // 2. User Login
  const loginRes = await fetch(`${BASE_URL}/api/auth/sign-in/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "origin": BASE_URL },
    body: JSON.stringify({
      email: email,
      password: "password123",
    }),
  });

  if (!loginRes.ok) {
    throw new Error("Login failed: " + await loginRes.text());
  }
  
  const setCookie = loginRes.headers.get("set-cookie");
  if (!setCookie || !setCookie.includes("better-auth.session_token")) {
    throw new Error("No session cookie set on login.");
  }
  console.log("✓ Login successful, session established.");

  // 3. Invalid credentials fail safely
  const badLoginRes = await fetch(`${BASE_URL}/api/auth/sign-in/email`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "origin": BASE_URL },
    body: JSON.stringify({
      email: email,
      password: "wrongpassword",
    }),
  });

  if (badLoginRes.ok) {
    throw new Error("Invalid credentials did not fail.");
  }
  console.log("✓ Invalid credentials rejected.");

  // 4. Logout invalidates session
  const logoutRes = await fetch(`${BASE_URL}/api/auth/sign-out`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "origin": BASE_URL,
      "cookie": setCookie,
    },
    body: "{}"
  });

  if (!logoutRes.ok) {
    throw new Error("Logout failed: " + await logoutRes.text());
  }
  console.log("✓ Logout successful.");

  console.log("All Auth verifications passed.");
  process.exit(0);
}

verifyAuth().catch(e => {
  console.error("Auth verification error:", e);
  process.exit(1);
});
