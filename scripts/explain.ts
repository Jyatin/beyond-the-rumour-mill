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

import { db } from "../src/server/db";
import { sql } from "drizzle-orm";

async function verify() {
  const result = await db.execute(sql`EXPLAIN SELECT * FROM companies WHERE name ILIKE '%amazn%' OR name % 'amazn'`);
  console.log("EXPLAIN Companies Search:");
  console.log(result.map(r => r["QUERY PLAN"]).join("\n"));
  
  const resultAlumni = await db.execute(sql`EXPLAIN SELECT * FROM alumni_profiles WHERE name ILIKE '%Priya%' OR name % 'Priya'`);
  console.log("\nEXPLAIN Alumni Search:");
  console.log(resultAlumni.map(r => r["QUERY PLAN"]).join("\n"));
  process.exit(0);
}
verify().catch(e => { console.error(e); process.exit(1); });
