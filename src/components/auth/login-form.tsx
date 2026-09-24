"use client";

import * as React from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Loader2, KeyRound, X } from "lucide-react";
import { GoogleIcon, LinkedInIcon } from "./auth-illustrations";
import { useAuthToast } from "./auth-toast";

export function LoginForm() {
  const { showToast } = useAuthToast();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [socialLoading, setSocialLoading] = React.useState<string | null>(null);

  // Forgot password modal state
  const [forgotOpen, setForgotOpen] = React.useState(false);
  const [resetEmail, setResetEmail] = React.useState("");
  const [resetSent, setResetSent] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showToast("Please enter your credentials", "Email and password are required.", "warning");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast(
        "Signed in successfully!",
        "Welcome back to Beyond the Rumour Mill.",
        "success"
      );
    }, 700);
  };

  const handleSocialAuth = (provider: "Google" | "LinkedIn") => {
    setSocialLoading(provider);
    setTimeout(() => {
      setSocialLoading(null);
      showToast(
        `${provider} sign in (Mock Demo)`,
        "Frontend demo mode: Social authentication will connect to real OAuth provider in backend phase.",
        "info"
      );
    }, 600);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    setResetSent(true);
    setTimeout(() => {
      showToast(
        "Reset link sent (Mock)",
        `A password reset link was dispatched to ${resetEmail}.`,
        "info"
      );
    }, 400);
  };

  return (
    <div className="w-full max-w-[460px] mx-auto">
      {/* Form Header */}
      <div className="mb-8">
        <h1 className="type-display text-[34px] sm:text-[40px] leading-[1.06] text-[var(--foreground)] tracking-tight">
          Welcome <em className="italic text-[#8D6BB3] font-normal">back.</em>
        </h1>
        <p className="type-body mt-2.5 text-[14.5px] text-[var(--muted)] leading-relaxed">
          Sign in to access verified placement intelligence and active alumni chats.
        </p>
      </div>

      {/* Main Sign In Form */}
      <form onSubmit={handleSubmit} className="space-y-4.5">
        {/* Email Field */}
        <div>
          <label
            htmlFor="login-email"
            className="block type-body text-[13px] font-semibold text-[var(--foreground)] mb-1.5"
          >
            Email address
          </label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@campus.edu or personal email"
            required
            className="w-full rounded-xl border border-[#111016]/20 bg-[var(--surface-elevated)] px-4 py-2.5 text-[14px] text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:border-[#8D6BB3] focus:outline-none focus:ring-3 focus:ring-[#8D6BB3]/15 transition-all shadow-2xs"
          />
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="login-password"
              className="type-body text-[13px] font-semibold text-[var(--foreground)]"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => {
                setResetEmail(email);
                setResetSent(false);
                setForgotOpen(true);
              }}
              className="type-caption text-[12.5px] text-[#8D6BB3] hover:underline transition-all"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your account password"
              required
              className="w-full rounded-xl border border-[#111016]/20 bg-[var(--surface-elevated)] px-4 py-2.5 pr-11 text-[14px] text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:border-[#8D6BB3] focus:outline-none focus:ring-3 focus:ring-[#8D6BB3]/15 transition-all shadow-2xs"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)] p-1 transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {/* Primary CTA: Sign In */}
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex w-full items-center justify-center gap-2 rounded-full bg-[#111016] dark:bg-white text-white dark:text-[#111016] px-6 py-3 text-[14.5px] font-semibold shadow-sm transition-all hover:scale-[1.01] hover:shadow-md active:scale-[0.99] disabled:opacity-70 cursor-pointer mt-2"
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
        </button>
      </form>

      {/* OR Divider */}
      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#111016]/10" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-[var(--background)] px-3 text-[12px] font-mono uppercase tracking-wider text-[var(--muted)]">
            OR
          </span>
        </div>
      </div>

      {/* Social Auth Buttons (Google & LinkedIn) */}
      <div className="space-y-3">
        {/* Google */}
        <button
          type="button"
          onClick={() => handleSocialAuth("Google")}
          disabled={socialLoading !== null}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-[#111016]/20 bg-[var(--surface-elevated)] px-4 py-2.5 text-[13.5px] font-medium text-[var(--foreground)] transition-all hover:bg-[var(--paper-tint)] hover:border-[#111016]/30 hover:scale-[1.005] active:scale-[0.99] shadow-2xs cursor-pointer"
        >
          {socialLoading === "Google" ? (
            <Loader2 className="size-4.5 animate-spin text-[#4285F4]" />
          ) : (
            <GoogleIcon className="size-4.5" />
          )}
          <span>Continue with Google</span>
        </button>

        {/* LinkedIn */}
        <button
          type="button"
          onClick={() => handleSocialAuth("LinkedIn")}
          disabled={socialLoading !== null}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-[#111016]/20 bg-[var(--surface-elevated)] px-4 py-2.5 text-[13.5px] font-medium text-[var(--foreground)] transition-all hover:bg-[var(--paper-tint)] hover:border-[#111016]/30 hover:scale-[1.005] active:scale-[0.99] shadow-2xs cursor-pointer"
        >
          {socialLoading === "LinkedIn" ? (
            <Loader2 className="size-4.5 animate-spin text-[#0A66C2]" />
          ) : (
            <LinkedInIcon className="size-4.5" />
          )}
          <span>Continue with LinkedIn</span>
        </button>
      </div>

      {/* Bottom Switch Link */}
      <div className="mt-8 text-center">
        <p className="type-body text-[13.5px] text-[var(--muted)]">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-[var(--foreground)] underline decoration-[#8D6BB3] underline-offset-4 hover:text-[#8D6BB3] transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>

      {/* Forgot Password Modal (Mock Dialog) */}
      {forgotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-fade-in">
          <div className="relative w-full max-w-[420px] rounded-2xl border border-[#111016]/10 bg-[var(--surface)] p-6 shadow-2xl animate-scale-up">
            <button
              onClick={() => setForgotOpen(false)}
              className="absolute right-4 top-4 text-[var(--muted)] hover:text-[var(--foreground)] p-1 rounded-full transition-colors"
              aria-label="Close dialog"
            >
              <X className="size-4" />
            </button>

            <div className="flex size-10 items-center justify-center rounded-full bg-[#E5D9F1] text-[#8D6BB3] mb-4">
              <KeyRound className="size-5" />
            </div>

            <h3 className="type-display text-[22px] font-semibold text-[var(--foreground)]">
              Reset your password
            </h3>
            <p className="type-body mt-1 text-[13.5px] text-[var(--muted)] leading-relaxed">
              Enter your email address and we&apos;ll send you a link to reset your account password.
            </p>

            {resetSent ? (
              <div className="mt-5 rounded-xl border border-[#557D70]/20 bg-[#557D70]/10 p-4 text-center">
                <p className="type-body text-[13.5px] font-semibold text-[#557D70]">
                  Reset link dispatched!
                </p>
                <p className="type-caption mt-1 text-[12px] text-[var(--muted)]">
                  Please check your inbox at <span className="font-mono text-[var(--foreground)]">{resetEmail}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setForgotOpen(false)}
                  className="mt-4 inline-flex rounded-full bg-[#111016] dark:bg-white text-white dark:text-[#111016] px-5 py-2 text-[13px] font-medium"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="mt-5 space-y-4">
                <div>
                  <label htmlFor="reset-email" className="block type-caption text-[12.5px] font-semibold text-[var(--foreground)] mb-1">
                    Your email address
                  </label>
                  <input
                    id="reset-email"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="you@campus.edu"
                    required
                    className="w-full rounded-xl border border-[#111016]/20 bg-[var(--surface-elevated)] px-3.5 py-2 text-[13.5px] text-[var(--foreground)] focus:border-[#8D6BB3] focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setForgotOpen(false)}
                    className="rounded-full px-4 py-2 text-[13px] text-[var(--muted)] hover:text-[var(--foreground)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-[#111016] dark:bg-white text-white dark:text-[#111016] px-5 py-2 text-[13px] font-medium shadow-xs hover:scale-[1.02] transition-transform"
                  >
                    Send reset link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
