"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Loader2, KeyRound, X } from "lucide-react";
import { GoogleIcon, LinkedInIcon } from "./auth-illustrations";
import { useAuthToast } from "./auth-toast";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function getSafeNextPath(rawNext) {
  if (!rawNext || !rawNext.startsWith("/") || rawNext.startsWith("//") || rawNext.includes("\\")) {
    return "/";
  }
  return rawNext;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = getSafeNextPath(searchParams.get("next"));
  const { showToast } = useAuthToast();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [socialLoading, setSocialLoading] = React.useState(null);

  const [forgotOpen, setForgotOpen] = React.useState(false);
  const [resetEmail, setResetEmail] = React.useState("");
  const [resetSent, setResetSent] = React.useState(false);
  const [resetLoading, setResetLoading] = React.useState(false);
  const [resetError, setResetError] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("Please enter your credentials", "Email and password are required.", "warning");
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: nextPath,
      });
      if (error) {
        showToast("Authentication Failed", error.message || "Invalid email or password.", "error");
        setIsLoading(false);
        return;
      }
      showToast("Signed in successfully!", "Welcome back to Beyond the Rumour Mill.", "success");
      router.push(nextPath);
      router.refresh();
    } catch (err) {
      showToast("Error", err?.message || "An unexpected error occurred during sign in.", "error");
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider) => {
    const providerKey = provider.toLowerCase();
    setSocialLoading(provider);
    try {
      const res = await authClient.signIn.social({
        provider: providerKey,
        callbackURL: nextPath,
      });
      if (res?.error) {
        showToast(
          `${provider} Login Unavailable`,
          res.error.message || `To enable ${provider} login, configure ${provider.toUpperCase()}_CLIENT_ID and ${provider.toUpperCase()}_CLIENT_SECRET on the server.`,
          "error"
        );
        setSocialLoading(null);
      }
    } catch (err) {
      showToast(
        `${provider} Login Unavailable`,
        err?.message || `To enable ${provider} login, configure ${provider.toUpperCase()}_CLIENT_ID and ${provider.toUpperCase()}_CLIENT_SECRET on the server.`,
        "error"
      );
      setSocialLoading(null);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const targetEmail = resetEmail.trim();
    if (!targetEmail || resetLoading) return;

    setResetLoading(true);
    setResetError("");
    try {
      const redirectTo = `${window.location.origin}/reset-password`;
      const { error } = await authClient.requestPasswordReset({
        email: targetEmail,
        redirectTo,
      });
      if (error) {
        setResetError(error.message || "Unable to send password reset link.");
        return;
      }
      setResetSent(true);
      showToast(
        "Reset instructions dispatched",
        `If an account exists for ${targetEmail}, a password reset link has been sent.`,
        "info"
      );
    } catch (err) {
      setResetError(err?.message || "Failed to request password reset.");
    } finally {
      setResetLoading(false);
    }
  };

  const signupHref = nextPath !== "/" ? `/signup?next=${encodeURIComponent(nextPath)}` : "/signup";

  return (
    <div className="w-full max-w-[460px] mx-auto">
      <div className="mb-8">
        <h1 className="font-editorial text-[34px] sm:text-[40px] leading-[1.06] text-foreground tracking-tight">
          Welcome <em className="italic text-brand font-normal">back.</em>
        </h1>
        <p className="font-sans mt-2.5 text-[14.5px] text-muted leading-relaxed">
          Sign in to access verified placement intelligence and active alumni chats.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4.5">
        <div>
          <label htmlFor="login-email" className="block font-sans text-[13px] font-semibold text-foreground mb-1.5">
            Email address
          </label>
          <Input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@campus.edu or personal email"
            required
            className="rounded-xl px-4 py-2.5 text-[14px] shadow-2xs"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="login-password" className="font-sans text-[13px] font-semibold text-foreground">
              Password
            </label>
            <button
              type="button"
              onClick={() => {
                setResetEmail(email);
                setResetSent(false);
                setResetError("");
                setForgotOpen(true);
              }}
              className="text-[12.5px] text-brand hover:underline transition-all cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your account password"
              required
              className="rounded-xl px-4 py-2.5 pr-11 text-[14px] shadow-2xs"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground p-1 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          variant="primary"
          className="w-full gap-2 mt-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4.5 animate-spin" />
              <span>Signing you in...</span>
            </>
          ) : (
            <>
              <span>Sign in</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </>
          )}
        </Button>
      </form>

      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-[12px] font-mono uppercase tracking-wider text-muted">
            OR
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialAuth("Google")}
          disabled={socialLoading !== null}
          className="w-full gap-3 border border-border bg-surface-elevated shadow-2xs"
        >
          {socialLoading === "Google" ? <Loader2 className="size-4.5 animate-spin text-[#4285F4]" /> : <GoogleIcon className="size-4.5" />}
          <span>Continue with Google</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => handleSocialAuth("LinkedIn")}
          disabled={socialLoading !== null}
          className="w-full gap-3 border border-border bg-surface-elevated shadow-2xs"
        >
          {socialLoading === "LinkedIn" ? <Loader2 className="size-4.5 animate-spin text-[#0A66C2]" /> : <LinkedInIcon className="size-4.5" />}
          <span>Continue with LinkedIn</span>
        </Button>
      </div>

      <div className="mt-8 text-center">
        <p className="font-sans text-[13.5px] text-muted">
          Don&apos;t have an account?{" "}
          <Link href={signupHref} className="font-semibold text-foreground underline decoration-brand underline-offset-4 hover:text-brand transition-colors">
            Sign up
          </Link>
        </p>
      </div>

      {forgotOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="reset-password-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
        >
          <div className="relative w-full max-w-[420px] rounded-2xl border border-border bg-surface-elevated p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setForgotOpen(false)}
              className="absolute right-4 top-4 text-muted hover:text-foreground p-1 rounded-full transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="size-4" />
            </button>

            <div className="flex size-10 items-center justify-center rounded-full bg-[#E5D9F1] text-brand mb-4">
              <KeyRound className="size-5" />
            </div>

            <h3 id="reset-password-dialog-title" className="font-editorial text-[22px] font-semibold text-foreground">
              Reset your password
            </h3>
            <p className="font-sans mt-1 text-[13.5px] text-muted leading-relaxed">
              Enter your email address and we&apos;ll send you a link to reset your account password.
            </p>

            {resetSent ? (
              <div className="mt-5 rounded-xl border border-success/20 bg-success/10 p-4 text-center">
                <p className="font-sans text-[13.5px] font-semibold text-success">
                  Reset link dispatched!
                </p>
                <p className="mt-1 text-[12px] text-muted">
                  If an account exists for <span className="font-mono text-foreground">{resetEmail}</span>, check your inbox for the reset link.
                </p>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => setForgotOpen(false)}
                  className="mt-4"
                >
                  Back to Sign In
                </Button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="mt-5 space-y-4">
                {resetError && (
                  <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[12.5px] text-red-700">
                    {resetError}
                  </p>
                )}
                <div>
                  <label htmlFor="reset-email" className="block text-[12.5px] font-semibold text-foreground mb-1">
                    Your email address
                  </label>
                  <Input
                    id="reset-email"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="you@campus.edu"
                    required
                    className="rounded-xl px-3.5 py-2 text-[13.5px]"
                  />
                </div>
                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setForgotOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={resetLoading}
                    className="gap-1.5"
                  >
                    {resetLoading && <Loader2 className="size-3.5 animate-spin" />}
                    <span>{resetLoading ? "Sending..." : "Send reset link"}</span>
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
