import { describe, it, expect } from "vitest";
import { search } from "../src/server/queries/search";

describe("Search Integration Tests", () => {
  it("exact company search works", async () => {
    const results = await search("Amazon");
    expect(results.companies.some(c => c.name === "Amazon")).toBe(true);
  });

  it("partial company search works", async () => {
    const results = await search("Googl");
    expect(results.companies.some(c => c.name === "Google")).toBe(true);
  });

  it("typo-tolerant company search works", async () => {
    const results = await search("amazn");
    expect(results.companies.some(c => c.name === "Amazon")).toBe(true);
  });

  it("alumni name search works", async () => {
    const results = await search("Priya");
    expect(results.alumni.some(a => a.name === "Priya Patel")).toBe(true);
  });

  it("empty query returns 0 results", async () => {
    const res = await search("");
    expect(res.companies.length).toBe(0);
    expect(res.alumni.length).toBe(0);
  });

  it("whitespace query returns 0 results", async () => {
    const res = await search("    ");
    expect(res.companies.length).toBe(0);
  });

  it("no results for non-existent", async () => {
    const res = await search("NonExistentCompanyXYZ");
    expect(res.companies.length).toBe(0);
  });
});
