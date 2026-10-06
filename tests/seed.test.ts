import { describe, it, expect } from "vitest";
import { execSync } from "child_process";
import { getCompanies } from "../src/server/queries/companies";
import { getExperiences } from "../src/server/queries/experiences";

describe("Seed Idempotency Tests", () => {
  it("runs seed repeatedly without duplication", async () => {
    const initialCompanies = await getCompanies();
    const initialExperiences = await getExperiences();
    
    // Run seed again
    execSync("npm run db:seed", { stdio: "ignore" });

    const updatedCompanies = await getCompanies();
    const updatedExperiences = await getExperiences();

    // Counts should be completely stable
    expect(updatedCompanies.length).toBe(initialCompanies.length);
    expect(updatedExperiences.length).toBe(initialExperiences.length);
  });
});
