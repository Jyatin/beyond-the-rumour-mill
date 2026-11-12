import { Hero } from "@/components/marketing/hero";
import { CompanyIntelligenceStrip } from "@/components/marketing/company-intelligence-strip";
import { HomeActionCards } from "@/components/marketing/home-action-cards";
import { HowItWorksCompact } from "@/components/marketing/how-it-works-compact";
import { StartPreparingProcess } from "@/components/marketing/start-preparing-process";
import { ContributeBanner } from "@/components/marketing/contribute-banner";

export const metadata = {
  title: "Beyond the Rumour Mill — Authentic Interview Intelligence",
  description: "Find alumni, read real interview experiences, and prepare with evidence instead of placement rumours."
};

export default function Home() {
  return (
    <main className="home-page overflow-x-clip bg-[var(--background)]">
      {/* HERO SECTION */}
      <Hero />

      {/* SECTION A: COMPACT COMPANY INTELLIGENCE STRIP */}
      <CompanyIntelligenceStrip />

      {/* SECTIONS B, C, D: EDITORIAL MAIN INTRO, TWO-CARD FEATURE HUB & STATISTICS STRIP */}
      <HomeActionCards />

      {/* SECTION E: 3-STEP HOW IT WORKS */}
      <HowItWorksCompact />

      {/* SECTION F: PROCESS / RECRUITING-STYLE SECTION (START PREPARING) */}
      <StartPreparingProcess />

      {/* SECTION G: COMMUNITY CONTRIBUTION BURGUNDY BANNER */}
      <ContributeBanner />
    </main>
  );
}