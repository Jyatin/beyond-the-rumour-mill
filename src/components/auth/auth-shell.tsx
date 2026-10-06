"use client";

import * as React from "react";
import { AuthToastProvider } from "./auth-toast";
import { DoodleTape, DoodleStar } from "@/components/marketing/doodles";

type AuthShellProps = {
  mode?: "signup" | "login";
  illustration: React.ReactNode;
  form: React.ReactNode;
};

export function AuthShell({ illustration, form }: AuthShellProps) {
  return (
    <AuthToastProvider>
      <div className="relative min-h-[calc(100vh-130px)] flex flex-col justify-center py-8 lg:py-14 px-5 md:px-8 selection:bg-[#9B7BC4] selection:text-white overflow-x-clip">
        {/* Subtle decorative background texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#111016_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

        {/* Ambient Backlight */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 size-[420px] rounded-full bg-gradient-to-tr from-[var(--brand-soft)]/20 to-[#F0EAF7]/20 blur-3xl pointer-events-none" />

        <div className="relative mx-auto w-full max-w-[1240px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center animate-fade-in">
            {/* Left Column: Hand-drawn Editorial Storytelling Illustration & Pathway */}
            <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
              {illustration}
            </div>

            {/* Right Column: Clean Editorial Form Card with Handcrafted Accents */}
            <div className="lg:col-span-5 flex flex-col justify-center order-1 lg:order-2 relative">
              {/* Decorative Tape Sticker on Top Corner */}
              <div className="absolute -top-3 right-8 z-10 hidden sm:block animate-sway-slow">
                <DoodleTape className="w-16" />
              </div>

              {/* Decorative Subtle Star near bottom */}
              <div className="absolute -bottom-4 -left-4 z-10 hidden sm:block pointer-events-none animate-spin-slow">
                <DoodleStar className="size-4 text-[#8D6BB3]" />
              </div>

              <div
                className="relative rounded-3xl border border-[#111016]/10 bg-[var(--surface)] p-6 sm:p-9 shadow-card backdrop-blur-xs overflow-hidden"
                style={{
                  boxShadow: "0 18px 36px -12px rgba(20, 20, 30, 0.08)",
                }}
              >
                {/* Subtle paper top-right tint stamp */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#E5D9F1]/30 via-[#F0EAF7]/20 to-transparent pointer-events-none rounded-tr-3xl" />

                {form}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthToastProvider>
  );
}
