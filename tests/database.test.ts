import { describe, it, expect } from "vitest";
import { getCompanies, getCompanyById, getCompanyWithDetails } from "../src/server/queries/companies";
import { getPublishedExperiences } from "../src/server/queries/experiences";
import { getAlumniProfiles } from "../src/server/queries/alumni";
import { getInterviewQuestions } from "../src/server/queries/interview-questions";

describe("Database Queries Integration Tests", () => {
  it("getCompanies returns seeded companies", async () => {
    const companies = await getCompanies();
    expect(companies.length).toBeGreaterThan(0);
    expect(companies.some(c => c.name === "Amazon")).toBe(true);
  });

  it("getCompanyById returns correct company", async () => {
    const company = await getCompanyById("amazon");
    expect(company).toBeDefined();
    expect(company?.name).toBe("Amazon");
  });

  it("getCompanyWithDetails returns correct details", async () => {
    const details = await getCompanyWithDetails("amazon");
    expect(details).toBeDefined();
    expect(details?.experiences.length).toBeGreaterThan(0);
    expect(details?.alumniProfiles.length).toBe(1);
  });

  it("getExperiences returns seeded experiences", async () => {
    const experiences = await getPublishedExperiences();
    expect(experiences.length).toBeGreaterThan(0);
  });

  it("getAlumniProfiles returns seeded profiles", async () => {
    const profiles = await getAlumniProfiles();
    expect(profiles.length).toBeGreaterThan(0);
  });

  it("getInterviewQuestions returns seeded questions", async () => {
    const questions = await getInterviewQuestions();
    expect(questions.length).toBeGreaterThan(0);
  });
});
