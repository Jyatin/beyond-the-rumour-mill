import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignUpIllustrationColumn } from "@/components/auth/signup-illustration";
import { SignUpForm } from "@/components/auth/signup-form";

export const metadata = {
  title: "Create an Account · Beyond the Rumour Mill",
  description:
    "Join Beyond the Rumour Mill to connect with placed alumni, unlock verified interview dossiers, and prepare for placement season without the hearsay.",
};

export default function SignUpPage() {
  return (
    <AuthShell
      mode="signup"
      illustration={<SignUpIllustrationColumn />}
      form={
        <Suspense fallback={<div className="h-[460px] animate-pulse rounded-xl bg-muted/20" />}>
          <SignUpForm />
        </Suspense>
      }
    />
  );
}
