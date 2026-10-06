import "server-only";

import { eq } from "drizzle-orm";
import { db } from "../db";
import {
  placementDrives,
  driveRoles,
  eligibilityRequirements,
  preparationRequirements,
  roleTitles,
} from "../db/schema";

export async function getPlacementDrives(companyId: string) {
  return await db.select().from(placementDrives).where(eq(placementDrives.companyId, companyId));
}

export async function getPlacementDriveById(id: string) {
  const result = await db.select().from(placementDrives).where(eq(placementDrives.id, id)).limit(1);
  return result[0] || null;
}

export async function getPlacementDriveWithDetails(id: string) {
  const drive = await getPlacementDriveById(id);
  if (!drive) return null;

  // Fetch drive roles mapped to their titles
  const rolesData = await db
    .select({
      driveRole: driveRoles,
      title: roleTitles.title,
    })
    .from(driveRoles)
    .innerJoin(roleTitles, eq(driveRoles.roleId, roleTitles.id))
    .where(eq(driveRoles.driveId, id));

  // For each role, fetch eligibility and preparation
  const rolesWithDetails = await Promise.all(
    rolesData.map(async ({ driveRole, title }) => {
      const eligibility = await db
        .select()
        .from(eligibilityRequirements)
        .where(eq(eligibilityRequirements.driveRoleId, driveRole.id))
        .limit(1)
        .then((res) => res[0] || null);

      const preparation = await db
        .select()
        .from(preparationRequirements)
        .where(eq(preparationRequirements.driveRoleId, driveRole.id))
        .limit(1)
        .then((res) => res[0] || null);

      return {
        ...driveRole,
        title,
        eligibility,
        preparation,
      };
    })
  );

  return {
    ...drive,
    roles: rolesWithDetails,
  };
}

export async function getCompanyPlacementInformation(companyId: string) {
  const drives = await getPlacementDrives(companyId);
  const detailedDrives = await Promise.all(
    drives.map((d) => getPlacementDriveWithDetails(d.id))
  );

  // Return non-null detailed drives
  return detailedDrives.filter((d) => d !== null);
}
