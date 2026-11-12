import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/server/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await db.execute(sql`SELECT 1`);
    return NextResponse.json(
      { ok: true, database: "connected", timestamp: new Date().toISOString() },
      { status: 200 }
    );
  } catch (err) {
    console.error("Healthcheck DB probe failed:", err);
    return NextResponse.json(
      { ok: false, database: "unreachable", timestamp: new Date().toISOString() },
      { status: 503 }
    );
  }
}

