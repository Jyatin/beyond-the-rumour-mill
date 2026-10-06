"use client";

import * as React from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Loader2, GraduationCap, Briefcase } from "lucide-react";
import { GoogleIcon, LinkedInIcon } from "./auth-illustrations";
import { useAuthToast } from "./auth-toast";

type UserRole = "candidate" | "alumni";

export function SignUpForm() {
  const { showToast } = useAuthToast();

  const [role, setRole] = React.useState<UserRole>("candidate");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [agreedToTerms, setAgreedToTerms] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [socialLoading, setSocialLoading] = React.useState<string | null>(null);

  // Simple password strength calculation
  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  };

  const strength = getPasswordStrength();
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      showToast("Please fill in all required fields", "Email, password, and confirm password are required.", "warning");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match", "Please make sure your passwords match.", "warning");
      return;
    }

    if (!agreedToTerms) {
      showToast("Terms & Guidelines", "Please accept the community guidelines to create an account.", "warning");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast(
        "Account created successfully!",
        `Welcome to Beyond the Rumour Mill as a ${role === "alumni" ? "Placed Alumni" : "Tomorrow's Candidate"}.`,
        "success"
      );
    }, 800);
  };

  const handleSocialAuth = (provider: "Google" | "LinkedIn") => {
    setSocialLoading(provider);
    setTimeout(() => {
      setSocialLoading(null);
      showToast(
        `${provider} sign up (Mock Demo)`,
        "Frontend demo mode: Social authentication will connect to real OAuth provider in backend phase.",
        "info"
      );
    }, 600);
  };

  return (
    <div className="w-full max-w-[460px] mx-auto">
      {/* Form Header */}
      <div className="mb-6">
        <h1 className="type-display text-[32px] sm:text-[38px] leading-[1.08] text-[var(--foreground)] tracking-tight">
          Let&apos;s get you <em className="italic text-[#8D6BB3] font-normal">connected.</em>
        </h1>
        <p className="type-body mt-2 text-[14.5px] text-[var(--muted)] leading-relaxed">
          Create your account and start building meaningful connections.
        </p>
      </div>

      {/* Role Picker Pills */}
      <div className="mb-6 p-1.5 rounded-xl border border-[#111016]/10 bg-[var(--surface-elevated)] shadow-2xs">
        <div className="grid grid-cols-2 gap-1.5 text-center">
          <button
            type="button"
            onClick={() => setRole("candidate")}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[13px] font-medium transition-all ${
              role === "candidate"
                ? "bg-white dark:bg-[#252033] text-[var(--foreground)] shadow-xs border border-[#111016]/10 font-semibold"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <GraduationCap className="size-4 text-[#8D6BB3]" />
            <span>Candidate / Student</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("alumni")}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[13px] font-medium transition-all ${
              role === "alumni"
                ? "bg-white dark:bg-[#252033] text-[var(--foreground)] shadow-xs border border-[#111016]/10 font-semibold"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            <Briefcase className="size-4 text-[#557D70]" />
            <span>Placed Alumni</span>
          </button>
        </div>
      </div>

      {/* Main Sign Up Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Field */}
        <div>
          <label
            htmlFor="signup-email"
            className="block type-body text-[13px] font-semibold text-[var(--foreground)] mb-1.5"
          >
            Campus or Personal Email
          </label>
          <input
            id="signup-email"
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
          <label
            htmlFor="signup-password"
            className="block type-body text-[13px] font-semibold text-[var(--foreground)] mb-1.5"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
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

          {/* Password Strength Indicator */}
          {password.length > 0 && (
            <div className="mt-2 flex items-center gap-1.5">
              <div className="flex-1 h-1 rounded-full bg-[#111016]/10 overflow-hidden flex gap-1">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    strength >= 1
                      ? strength >= 3
                        ? "bg-[#557D70] w-full"
                        : "bg-[#E5C85C] w-full"
                      : "bg-[#A53D34] w-full"
                  }`}
                />
              </div>
              <span className="type-mono text-[10.5px] text-[var(--muted)]">
                {strength <= 1 ? "Weak" : strength <= 3 ? "Good" : "Strong"}
              </span>
            </div>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label
            htmlFor="signup-confirm-password"
            className="block type-body text-[13px] font-semibold text-[var(--foreground)] mb-1.5"
          >
            Confirm password
          </label>
          <div className="relative">
            <input
              id="signup-confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
              className={`w-full rounded-xl border bg-[var(--surface-elevated)] px-4 py-2.5 pr-11 text-[14px] text-[var(--foreground)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:ring-3 transition-all shadow-2xs ${
                passwordsMismatch
                  ? "border-[#A53D34] focus:ring-[#A53D34]/15"
                  : passwordsMatch
                  ? "border-[#557D70] focus:ring-[#557D70]/15"
                  : "border-[#111016]/20 focus:border-[#8D6BB3] focus:ring-[#8D6BB3]/15"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--foreground)] p-1 transition-colors"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {passwordsMismatch && (
            <p className="type-caption mt-1 text-[11.5px] text-[#A53D34]">
              Passwords do not match
            </p>
          )}
        </div>

        {/* Community Guidelines Checkbox */}
        <div className="flex items-start gap-2.5 pt-1">
          <input
            id="terms-check"
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="mt-1 size-4 rounded border-[#111016]/30 text-[#8D6BB3] focus:ring-[#8D6BB3]"
          />
          <label htmlFor="terms-check" className="type-caption text-[12px] text-[var(--muted)] leading-relaxed">
            I agree to the{" "}
            <Link href="/guidelines" className="text-[var(--foreground)] underline hover:text-[#8D6BB3]">
              Community Guidelines
            </Link>{" "}
            and zero-hearsay verification standard.
          </label>
        </div>

        {/* Primary CTA: Create Account */}
        <button
          type="submit"
          disabled={isLoading}
          className="group relative flex w-full items-center justify-center gap-2 rounded-full bg-[#111016] dark:bg-white text-white dark:text-[#111016] px-6 py-3 text-[14.5px] font-semibold shadow-sm transition-all hover:scale-[1.01] hover:shadow-md active:scale-[0.99] disabled:opacity-70 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4.5 animate-spin" />
              <span>Creating your account...</span>
            </>
          ) : (
            <>
              <span>Create account</span>
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
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-[var(--foreground)] underline decoration-[#8D6BB3] underline-offset-4 hover:text-[#8D6BB3] transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
