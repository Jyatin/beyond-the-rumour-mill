/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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

import { getCompanies, getCompanyWithDetails } from "../src/server/queries/companies";
import { getAlumniProfiles } from "../src/server/queries/alumni";
import { getExperiences } from "../src/server/queries/experiences";
import { getInterviewQuestions } from "../src/server/queries/interview-questions";
import postgres from "postgres";

async function verify() {
  console.log("Verifying companies query...");
  const companies = await getCompanies();
  console.log(`- Found ${companies.length} companies.`);

  console.log("Verifying alumni profiles query...");
  const alumni = await getAlumniProfiles();
  console.log(`- Found ${alumni.length} alumni.`);

  console.log("Verifying experiences query...");
  const experiences = await getExperiences();
  console.log(`- Found ${experiences.length} experiences.`);

  console.log("Verifying interview questions query...");
  const questions = await getInterviewQuestions();
  console.log(`- Found ${questions.length} questions.`);

  console.log("Verifying relationships query (getCompanyWithDetails)...");
  if (companies.length > 0) {
    const details = await getCompanyWithDetails(companies[0].id);
    console.log(`- Fetched details for ${details?.name}:`);
    console.log(`  - Experiences count: ${details?.experiences.length}`);
    console.log(`  - Alumni count: ${details?.alumniProfiles.length}`);
  }

  // A missing company lookup
  console.log("Verifying not-found handling...");
  const notFound = await getCompanyWithDetails("does-not-exist");
  console.log(`- getCompanyWithDetails("does-not-exist") returned: ${notFound}`);

  process.exit(0);
}

verify().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
