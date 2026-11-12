"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Laptop,
  Landmark,
  BrainCircuit,
  Cpu,
  LineChart,
  Building2,
  HelpCircle,
  Code2,
  Network,
  Users,
  FileText,
  Coffee,
  Target,
  Layers,
  GraduationCap,
  Sparkles,
} from "lucide-react";

const ICON_MAP = {
  laptop: Laptop,
  landmark: Landmark,
  brain: BrainCircuit,
  cpu: Cpu,
  chart: LineChart,
  building: Building2,
  help: HelpCircle,
  code: Code2,
  network: Network,
  users: Users,
  file: FileText,
  coffee: Coffee,
  target: Target,
  layers: Layers,
  grad: GraduationCap,
  sparkles: Sparkles,
};

/**
 * Textured Watercolor / Patterned Wash Banner (inspired by User Interviews reference)
 * Renders an organic, soft-tinted backdrop with subtle artistic texture and pastel accents.
 */
export function TexturedWashBanner({
  className,
  children,
  variant = "teal", // teal | mint | purple | cream
}) {
  const bgStyles = {
    teal: "bg-[#E6F3F0] text-[#142B28]",
    mint: "bg-[#EAF5EF] text-[#113B2A]",
    purple: "bg-[#F3EEFA] text-[#251B38]",
    cream: "bg-[#FAF7F2] text-[#2C2825]",
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden border-y border-[#ECEAE5] py-12 sm:py-16 transition-colors",
        bgStyles[variant] || bgStyles.teal,
        className
      )}
    >
      {/* Organic hand-painted watercolor blob decorations */}
      <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-white/60 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 rounded-full bg-[#DCEEEF]/50 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 rounded-full bg-[#E8DCF5]/40 blur-2xl pointer-events-none" />

      {/* Subtle organic wavy texture lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 300"
        preserveAspectRatio="none"
      >
        <path
          d="M0 50 C 150 120, 350 0, 500 60 C 650 120, 850 30, 1000 80 L 1000 300 L 0 300 Z"
          fill="currentColor"
        />
        <path
          d="M0 140 C 200 80, 400 200, 600 130 C 800 60, 900 180, 1000 140 L 1000 300 L 0 300 Z"
          fill="currentColor"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 md:px-8">
        {children}
      </div>
    </div>
  );
}

/**
 * Editorial Character Vignette with circular pastel aura
 * Incorporates real character illustration matching the user's reference image 1.
 */
export function EditorialCharacterVignette({
  imageSrc = "/assets/editorial-character-quote.png",
  alt = "Editorial career character",
  quote,
  author,
  role,
  accentColor = "purple", // purple | mint | teal | peach
  className,
}) {
  const accentAura = {
    purple: "bg-[#EAE2F8] border-[#D6C7EE]",
    mint: "bg-[#E2F3EB] border-[#C3E5D4]",
    teal: "bg-[#DCEEEF] border-[#B8DDE0]",
    peach: "bg-[#FDECE7] border-[#F8D4C9]",
  };

  return (
    <div className={cn("relative flex items-center justify-center select-none", className)}>
      {/* Circular Pastel Backdrop Aura */}
      <div
        className={cn(
          "relative w-[280px] sm:w-[320px] aspect-square rounded-full border flex items-center justify-center overflow-hidden p-3 shadow-sm",
          accentAura[accentColor] || accentAura.purple
        )}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-white/70">
          <Image
            src={imageSrc}
            alt={alt}
            width={340}
            height={340}
            priority
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Floating Quote Stamp Badge */}
      {quote && (
        <div className="absolute -bottom-3 -left-3 sm:-left-6 bg-white border border-[#ECEAE5] rounded-2xl p-3.5 shadow-md max-w-[240px] z-20 animate-fade-in">
          <p className="text-xs italic text-[#111111] leading-snug font-serif">
            &ldquo;{quote}&rdquo;
          </p>
          {(author || role) && (
            <p className="text-[10px] font-mono text-[#63606B] mt-1 uppercase font-semibold">
              — {author} {role ? `(${role})` : ""}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Editorial Centerpiece Emblem (inspired by Reference 2 "SOS Bottle" and Reference 3 "Botanical Icon")
 * Renders a crisp vector icon or illustration inside a hand-crafted watercolor aura circle.
 */
export function EditorialCenterpieceEmblem({
  icon,
  imageSrc,
  alt = "Editorial centerpiece emblem",
  variant = "teal", // teal | mint | purple | peach
  className,
}) {
  const variantStyles = {
    teal: "bg-[#E2F2EF] border-[#8AC4BE]/60 text-[#1B635C] shadow-[#1B635C]/5",
    mint: "bg-[#E4F5EC] border-[#8CD1AD]/60 text-[#17563F] shadow-[#17563F]/5",
    purple: "bg-[#ECE4F8] border-[#BFA7E8]/60 text-[#6B46C1] shadow-[#6B46C1]/5",
    peach: "bg-[#FDECE7] border-[#F4BDB0]/60 text-[#C84B31] shadow-[#C84B31]/5",
  };

  const ResolvedIcon = typeof icon === "string" ? ICON_MAP[icon.toLowerCase()] || Building2 : icon;

  return (
    <div className={cn("relative flex items-center justify-center select-none", className)}>
      <div
        className={cn(
          "relative size-16 sm:size-18 rounded-full border-2 flex items-center justify-center shadow-md p-3.5 transition-all duration-300 hover:scale-105 hover:rotate-2",
          variantStyles[variant] || variantStyles.teal
        )}
      >
        {imageSrc ? (
          <div className="relative w-full h-full">
            <Image src={imageSrc} alt={alt} fill className="object-contain" />
          </div>
        ) : ResolvedIcon ? (
          <ResolvedIcon className="size-7 sm:size-8 stroke-[2.2]" />
        ) : null}
      </div>
    </div>
  );
}

/**
 * Horizontal Floating Category Card Strip (inspired by User Interviews topic strip)
 */
export function FloatingTopicStrip({ title = "Browse by category", items = [], onSelect, activeId }) {
  return (
    <div className="space-y-4">
      {title && (
        <div className="text-center">
          <span className="text-[11.5px] font-mono uppercase tracking-[0.12em] font-semibold text-[#111111] bg-white/90 px-4 py-1 rounded-full border border-[#ECEAE5] shadow-2xs">
            {title}
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {items.map((item) => {
          const isActive = activeId === item.id;
          const ResolvedIcon = typeof item.icon === "string" ? ICON_MAP[item.icon.toLowerCase()] : item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect && onSelect(item.id)}
              className={cn(
                "group relative p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 shadow-2xs cursor-pointer flex flex-col justify-between space-y-3",
                isActive
                  ? "bg-[#1B635C] text-white border-[#1B635C] shadow-md -translate-y-1"
                  : "bg-white text-[#111111] border-[#ECEAE5] hover:border-[#1B635C]/50 hover:shadow-sm hover:-translate-y-0.5"
              )}
            >
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "size-10 rounded-xl flex items-center justify-center transition-colors",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#F4F9F7] text-[#1B635C] border border-[#DCEEEF]"
                  )}
                >
                  {ResolvedIcon ? (
                    typeof ResolvedIcon === "function" ? (
                      <ResolvedIcon className="size-5" />
                    ) : React.isValidElement(ResolvedIcon) ? (
                      ResolvedIcon
                    ) : (
                      <span className="text-xl" role="img" aria-hidden="true">
                        {item.icon}
                      </span>
                    )
                  ) : (
                    <span className="text-xl" role="img" aria-hidden="true">
                      {item.icon}
                    </span>
                  )}
                </div>
                {item.badge && (
                  <span
                    className={cn(
                      "text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-semibold",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-[#F7FAF9] text-[#1B635C] border border-[#8AC4BE]/40"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              <div>
                <h4
                  className={cn(
                    "font-bold text-sm tracking-tight leading-snug",
                    isActive ? "text-white" : "text-[#111111] group-hover:text-[#1B635C]"
                  )}
                >
                  {item.title}
                </h4>
                {item.description && (
                  <p
                    className={cn(
                      "text-xs line-clamp-2 mt-1 leading-relaxed",
                      isActive ? "text-white/80" : "text-[#63606B]"
                    )}
                  >
                    {item.description}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Magazine-style Featured Spotlight Card (inspired by Image 3 Featured Post)
 */
export function FeaturedSpotlightCard({
  eyebrow = "FEATURED INTELLIGENCE REPORT",
  title,
  excerpt,
  bannerTitle,
  bannerSubtitle,
  bannerColor = "purple", // purple | teal | burgundy | mint
  href,
  metaAuthor,
  metaRole,
  badges = [],
}) {
  const bannerThemes = {
    purple: "bg-[#3D2C59] text-white",
    teal: "bg-[#174A45] text-white",
    burgundy: "bg-[#521C28] text-white",
    mint: "bg-[#D4EAE2] text-[#0F3529]",
  };

  return (
    <div className="relative rounded-3xl border border-[#ECEAE5] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Graphics Block */}
        <div
          className={cn(
            "lg:col-span-4 p-8 sm:p-10 flex flex-col justify-between min-h-[220px] relative overflow-hidden",
            bannerThemes[bannerColor] || bannerThemes.purple
          )}
        >
          {/* Subtle background circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-black/10 pointer-events-none" />

          <div className="relative z-10">
            <span className="text-[10.5px] font-mono uppercase tracking-[0.14em] opacity-80 font-bold block mb-2">
              SPOTLIGHT
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              {bannerTitle || "2026 RECRUITING DOSSIER"}
            </h3>
          </div>

          <div className="relative z-10 pt-4">
            <p className="text-xs font-mono opacity-80 uppercase tracking-wider">
              {bannerSubtitle || "CAMPUS VERIFICATION ARCHIVE"}
            </p>
          </div>
        </div>

        {/* Right Editorial Story Column */}
        <div className="lg:col-span-8 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-3.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full bg-[#F7FAF9] border border-[#8AC4BE]/50 text-[#1B635C]">
                {eyebrow}
              </span>
              {badges.map((b, i) => (
                <span
                  key={i}
                  className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#FAF7F3] border border-[#EBE4D8] text-[#111111]"
                >
                  {b}
                </span>
              ))}
            </div>

            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#111111] leading-tight hover:text-[#1B635C] transition-colors">
              <Link href={href || "#"}>{title}</Link>
            </h2>

            <p className="text-sm sm:text-[14.5px] text-[#4A4752] leading-relaxed line-clamp-3">
              {excerpt}
            </p>
          </div>

          <div className="pt-4 border-t border-[#ECEAE5] flex flex-wrap items-center justify-between gap-4">
            {(metaAuthor || metaRole) && (
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-full bg-[#1B635C] text-white font-bold text-xs flex items-center justify-center font-mono">
                  {metaAuthor ? metaAuthor.charAt(0) : "C"}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#111111]">{metaAuthor}</p>
                  <p className="text-[11px] text-[#63606B]">{metaRole}</p>
                </div>
              </div>
            )}

            {href && (
              <Link
                href={href}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1B635C] hover:text-[#154D48] transition-colors group"
              >
                <span>Read Full Breakdown</span>
                <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Editorial Article Row (inspired by Image 3 "LATEST ARTICLES" stream)
 */
export function EditorialArticleRow({
  tag = "INTERVIEW ROUNDS",
  tagColor = "green", // green | blue | yellow | pink | purple
  title,
  excerpt,
  meta,
  href,
}) {
  const tagStyles = {
    green: "bg-[#E6F4EA] text-[#137333] border-[#CEEAD6]",
    blue: "bg-[#E8F0FE] text-[#1A73E8] border-[#D2E3FC]",
    yellow: "bg-[#FEF7E0] text-[#B06000] border-[#FEEFC3]",
    pink: "bg-[#FCE8E6] text-[#C5221F] border-[#FAD2CF]",
    purple: "bg-[#F3E8FD] text-[#8430CE] border-[#E9D2FD]",
  };

  return (
    <article className="group py-6 border-b border-[#ECEAE5] last:border-0 space-y-2.5 transition-colors">
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "text-[10px] font-mono uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full border",
            tagStyles[tagColor] || tagStyles.green
          )}
        >
          {tag}
        </span>
      </div>

      <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#111111] group-hover:text-[#1B635C] transition-colors leading-snug">
        <Link href={href || "#"}>{title}</Link>
      </h3>

      {excerpt && (
        <p className="text-xs sm:text-[13.5px] text-[#55515D] leading-relaxed line-clamp-2">
          {excerpt}
        </p>
      )}

      {meta && (
        <p className="text-[11px] font-mono text-[#8C8794] uppercase tracking-wider pt-1">
          {meta}
        </p>
      )}
    </article>
  );
}
