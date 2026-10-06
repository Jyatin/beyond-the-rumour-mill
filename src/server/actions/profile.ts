"use server";

import { createProfile, updateProfile } from "../queries/profiles";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function onboardUserAction(formData: FormData) {
  const displayName = formData.get("display_name") as string;
  const headline = formData.get("headline") as string;
  const bio = formData.get("bio") as string;
  const college = formData.get("college") as string;
  const gradYear = parseInt(formData.get("grad_year") as string, 10);
  const avatarUrl = formData.get("avatar_url") as string | null;
  const openToMentoring = formData.get("open_to_mentoring") === "true";
  const visibility = (formData.get("visibility") as string) || "public";
  
  const role = formData.get("role") as string;

  if (!displayName || !headline || !bio || !college || !gradYear) {
    throw new Error("Missing required fields");
  }

  if (role !== "student" && role !== "alumni") {
    throw new Error("Invalid role selection");
  }

  await createProfile({
    displayName,
    headline,
    bio,
    college,
    gradYear,
    avatarUrl,
    openToMentoring,
    visibility,
  }, role);

  revalidatePath("/");
  redirect("/connect");
}

export async function updateProfileAction(formData: FormData) {
  const displayName = formData.get("display_name") as string;
  const headline = formData.get("headline") as string;
  const bio = formData.get("bio") as string;
  const college = formData.get("college") as string;
  const gradYear = parseInt(formData.get("grad_year") as string, 10);
  const avatarUrl = formData.get("avatar_url") as string | null;
  const openToMentoring = formData.get("open_to_mentoring") === "true";
  const visibility = (formData.get("visibility") as string) || "public";

  await updateProfile({
    displayName,
    headline,
    bio,
    college,
    gradYear,
    avatarUrl,
    openToMentoring,
    visibility,
  });

  revalidatePath("/profile");
}
