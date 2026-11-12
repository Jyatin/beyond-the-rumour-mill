import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginIllustrationColumn } from "@/components/auth/login-illustration";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
  title: "Sign In · Beyond the Rumour Mill",
  description:
    "Sign in to your Beyond the Rumour Mill account to view verified placement breakdowns, active alumni chats, and real campus question signals.",
};

export default function LoginPage() {
  return (
    <AuthShell
      mode="login"
      illustration={<LoginIllustrationColumn />}
      form={
        <Suspense fallback={<div className="h-[420px] animate-pulse rounded-xl bg-muted/20" />}>
          <LoginForm />
        </Suspense>
      }
    />
  );
}
