import { Metadata } from "next";
import { ConnectHero } from "@/components/connect/connect-hero";
import { AlumniDiscovery } from "@/components/connect/alumni-discovery";
import { ConversationShowcase } from "@/components/connect/conversation-showcase";
import { ConnectProcess } from "@/components/connect/connect-process";
import { ConnectFinalCta } from "@/components/connect/connect-final-cta";
import { SectionConnector, FloatingPaperDrift } from "@/components/marketing/section-connectors";

export const metadata: Metadata = {
  title: "Connect with Placed Alumni — Beyond the Rumour Mill",
  description:
    "Connecting placed alumni with tomorrow's talent. Learn from people who have already walked the placement path and prepare with authentic interview experiences.",
};

export default function ConnectPage() {
  return (
    <div className="connect-page overflow-x-clip">
      {/* 01. Hero Section */}
      <ConnectHero />

      {/* Visual Transition: Hero -> Discovery */}
      <SectionConnector type="curve-down" label="ALUMNI DIRECTORY" />

      {/* 02. Search & Discover Placed Alumni */}
      <AlumniDiscovery />

      {/* Visual Continuity: Floating Paper Drift */}
      <FloatingPaperDrift
        text="Verified Alumni Intel"
        sub="Rounds & follow-ups intact"
        rotation="-2deg"
      />

      {/* 03. Authentic Conversation & Q&A Showcase */}
      <ConversationShowcase />

      {/* Visual Transition: Conversation -> 3-Step Process */}
      <SectionConnector type="s-curve" label="HOW IT WORKS" />

      {/* 04. 3-Step Connection Process */}
      <ConnectProcess />

      {/* Visual Transition: Process -> Final CTA */}
      <SectionConnector type="curve-down" label="PASSING IT FORWARD" />

      {/* 05. Final Illustrated CTA */}
      <ConnectFinalCta />
    </div>
  );
}
