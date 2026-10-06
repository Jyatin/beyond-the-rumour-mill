import { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignUpIllustrationColumn } from "@/components/auth/signup-illustration";
import { SignUpForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Create an Account · Beyond the Rumour Mill",
  description:
    "Join Beyond the Rumour Mill to connect with placed alumni, unlock verified interview dossiers, and prepare for placement season without the hearsay.",
};

export default function SignUpPage() {
  return (
    <AuthShell
      mode="signup"
      illustration={<SignUpIllustrationColumn />}
      form={<SignUpForm />}
    />
  );
}
