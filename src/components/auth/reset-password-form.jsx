"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle, KeyRound, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const urlError = searchParams.get("error") || "";

  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(
    urlError === "INVALID_TOKEN"
      ? "This password reset link has expired or is invalid. Please request a new one from the Sign In page."
      : ""
  );
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Missing reset token. Please request a fresh password reset link from the Sign In page.");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const { error: resetError } = await authClient.resetPassword({
        newPassword,
        token,
      });
      if (resetError) {
        setError(resetError.message || "Failed to reset password. Your link may have expired.");
        setIsLoading(false);
        return;
      }
      setSuccess(true);
    } catch (err) {
      setError(err?.message || "An unexpected error occurred while resetting your password.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-[460px] mx-auto rounded-2xl border border-[#111016]/10 bg-[var(--surface)] p-7 shadow-sm space-y-4">
        <div className="flex size-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="size-6" />
        </div>
        <h1 className="type-display text-[30px] leading-tight text-[var(--foreground)]">
          Password updated
        </h1>
        <p className="type-body text-[14.5px] text-[var(--muted)] leading-relaxed">
          Your account password has been updated securely. You can now sign in with your new credentials.
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#111016] dark:bg-white text-white dark:text-[#111016] px-6 py-3 text-[14px] font-semibold cursor-pointer"
          >
            <span>Continue to Sign In</span>
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[460px] mx-auto">
      <div className="mb-6">
        <div className="flex size-10 items-center justify-center rounded-full bg-[#E5D9F1] text-[#8D6BB3] mb-4">
          <KeyRound className="size-5" />
        </div>
        <h1 className="type-display text-[32px] sm:text-[38px] leading-[1.08] text-[var(--foreground)] tracking-tight">
          Choose a new <em className="italic text-[#8D6BB3] font-normal">password.</em>
        </h1>
        <p className="type-body mt-2 text-[14.5px] text-[var(--muted)] leading-relaxed">
          Enter a new password of at least 8 characters for your account.
        </p>
      </div>

      {error && (
        <div role="alert" className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-700">
          <AlertCircle className="size-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {!token ? (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 space-y-3">
          <p className="type-body text-[13.5px] text-[var(--muted)]">
            No valid reset token was found in this URL.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#1B635C] hover:underline"
          >
            &larr; Return to Sign In to request a reset link
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="new-password" className="block type-body text-[13px] font-semibold text-[var(--foreground)] mb-1.5">
              New password
            </label>
            <div className="relative">
              <input
                id="new-password"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                minLength={8}
                required
                className="w-full rounded-xl border border-[#111016]/20 bg-[var(--surface-elevated)] px-4 py-2.5 pr-11 text-[14px] text-[var(--foreground)] focus:border-[#8D6BB3] focus:outline-none focus:ring-3 focus:ring-[#8D6BB3]/15"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)] p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirm-new-password" className="block type-body text-[13px] font-semibold text-[var(--foreground)] mb-1.5">
              Confirm new password
            </label>
            <input
              id="confirm-new-password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your new password"
              minLength={8}
              required
              className="w-full rounded-xl border border-[#111016]/20 bg-[var(--surface-elevated)] px-4 py-2.5 text-[14px] text-[var(--foreground)] focus:border-[#8D6BB3] focus:outline-none focus:ring-3 focus:ring-[#8D6BB3]/15"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#111016] dark:bg-white text-white dark:text-[#111016] px-6 py-3 text-[14px] font-semibold shadow-sm transition-all hover:scale-[1.01] disabled:opacity-70 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Updating password...</span>
              </>
            ) : (
              <>
                <span>Reset Password</span>
                <ArrowRight className="size-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

