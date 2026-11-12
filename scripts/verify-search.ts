/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

// @ts-nocheck
import { config } from "dotenv";
config({ path: ".env" });

import module from "module";
// @ts-ignore
const originalRequire = module.prototype.require;
// @ts-ignore
module.prototype.require = function (id: string, ...args: any[]) {
  if (id === "server-only") return {};
  return originalRequire.apply(this, [id, ...args]);
};

import { search } from "../src/server/queries/search";

async function verify() {
  console.log("1. Exact company search ('Amazon'):");
  const exact = await search("Amazon");
  console.log("   Companies:", exact.companies.map(c => c.name));

  console.log("2. Partial company search ('Google'):");
  const partial = await search("Goo");
  console.log("   Companies:", partial.companies.map(c => c.name));

  console.log("3. Misspelled company search ('amazn'):");
  const misspelled = await search("amazn");
  console.log("   Companies:", misspelled.companies.map(c => c.name));

  console.log("4. Alumni name search ('Priya'):");
  const alumni = await search("Priya");
  console.log("   Alumni:", alumni.alumni.map(a => a.name));

  console.log("5. Empty query:");
  const empty = await search("");
  console.log("   Companies:", empty.companies.length, "Alumni:", empty.alumni.length);

  console.log("6. Query with whitespace ('   '):");
  const space = await search("   ");
  console.log("   Companies:", space.companies.length, "Alumni:", space.alumni.length);

  console.log("7. Query with special characters ('@!#$'):");
  const special = await search("@!#$");
  console.log("   Companies:", special.companies.length, "Alumni:", special.alumni.length);

  console.log("8. No-result query ('NonExistentCompanyXYZ'):");
  const noResult = await search("NonExistentCompanyXYZ");
  console.log("   Companies:", noResult.companies.length, "Alumni:", noResult.alumni.length);

  process.exit(0);
}

verify().catch(e => {
  console.error("Verification failed", e);
  process.exit(1);
});
