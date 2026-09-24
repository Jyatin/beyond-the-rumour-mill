import { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginIllustrationColumn } from "@/components/auth/login-illustration";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign In · Beyond the Rumour Mill",
  description:
    "Sign in to your Beyond the Rumour Mill account to view verified placement breakdowns, active alumni chats, and real campus question signals.",
};

export default function LoginPage() {
  return (
    <AuthShell
      mode="login"
      illustration={<LoginIllustrationColumn />}
      form={<LoginForm />}
    />
  );
}
