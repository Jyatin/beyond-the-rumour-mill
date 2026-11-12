import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginIllustrationColumn } from "@/components/auth/login-illustration";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata = {
  title: "Reset Password · Beyond the Rumour Mill",
  description: "Set a new password for your Beyond the Rumour Mill account.",
};

export default function ResetPasswordPage() {
  return (
    <AuthShell
      mode="login"
      illustration={<LoginIllustrationColumn />}
      form={
        <Suspense fallback={<div className="h-[340px] animate-pulse rounded-xl bg-muted/20" />}>
          <ResetPasswordForm />
        </Suspense>
      }
    />
  );
}

