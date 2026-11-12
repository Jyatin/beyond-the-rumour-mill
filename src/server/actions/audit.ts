import { db } from "../db";
import { auditLog } from "../db/schema";
import { requireUser } from "../auth-helpers";

export async function createAuditRecord({
  action,
  entityType,
  entityId,
  metadata,
}: {
  action: string;
  entityType: string;
  entityId: string;
  metadata?: Record<string, unknown>;
}) {
  const user = await requireUser().catch(() => null);

  await db.insert(auditLog).values({
    id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    actorId: user?.id,
    action,
    entityType,
    entityId,
    metadata,
  });
}
