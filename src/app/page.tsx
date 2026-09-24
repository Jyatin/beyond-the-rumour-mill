import { Hero } from "@/components/marketing/hero";
import { AlumniDiscovery } from "@/components/connect/alumni-discovery";
import { ConversationShowcase } from "@/components/connect/conversation-showcase";
import { ProblemSection } from "@/components/marketing/problem-section";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { VerificationModel } from "@/components/marketing/verification-model";
import { CompaniesStrip } from "@/components/marketing/companies-strip";
import { ConnectFinalCta } from "@/components/connect/connect-final-cta";
import {
  CommunitySection,
  DiscoverySection,
  EvidenceSection,
  MetricsSection,
  QuestionsSection,
} from "@/components/marketing/editorial-sections";
import {
  SectionConnector,
  FloatingPaperDrift,
} from "@/components/marketing/section-connectors";

export default function Home() {
  return (
    <div className="home-page overflow-x-clip">
      {/* 01. Hero Section: Connecting Placed Alumni with Tomorrow's Talent */}
      <Hero />

      {/* Visual Transition: Hero -> Alumni Network Directory */}
      <SectionConnector type="curve-down" label="FIND AN ALUMNI" />

      {/* 02. Alumni Discovery & Direct Connect Suite */}
      <AlumniDiscovery />

      {/* Visual Continuity: Floating Paper Drift */}
      <FloatingPaperDrift
        text="Verified Alumni Intel"
        sub="Rounds & follow-ups intact"
        rotation="-2deg"
      />

      {/* 03. Problem: Campus Rumour & Noise Thesis */}
      <ProblemSection />

      {/* Visual Transition: Problem -> The Process Pathway */}
      <SectionConnector type="s-curve" label="THE LOOP" />

      {/* 04. How It Works: Connected 01 -> 02 -> 03 Pathway */}
      <HowItWorks />

      {/* Visual Continuity: Floating Paper Drift */}
      <FloatingPaperDrift
        text="Fresh OA Submission"
        sub="Rounds & coding problems intact"
        rotation="1.5deg"
      />

      {/* 05. Experience Discovery: Live Field Notes */}
      <DiscoverySection />

      {/* Visual Transition: Discovery -> Real Discussion Showcase */}
      <SectionConnector type="curve-down" label="Q&A EXCHANGE" />

      {/* 06. Authentic 1-on-1 Alumni Dialogue Showcase */}
      <ConversationShowcase />

      {/* Visual Transition: Conversation -> The Archive */}
      <SectionConnector type="loop" label="VERIFIED ARCHIVE" />

      {/* 07. Evidence: Verified Experiences Collage */}
      <EvidenceSection />

      {/* 08. Metrics Bar */}
      <MetricsSection />

      {/* Visual Continuity: Question Memo Slip */}
      <FloatingPaperDrift
        text="Live Interview Question Memo"
        sub="45 reported signals verified"
        rotation="2deg"
      />

      {/* 09. Questions Archive: Interview Signals */}
      <QuestionsSection />

      {/* Visual Transition: Questions -> Community */}
      <SectionConnector type="curve-down" label="PEER VOICES" />

      {/* 10. Community Voices & Shared Knowledge */}
      <CommunitySection />

      {/* Visual Continuity: Trust Standard Badge */}
      <FloatingPaperDrift
        text="Consensus Record"
        sub="Dual-peer audit confirmed"
        rotation="-1deg"
      />

      {/* 11. Trust Architecture & Verification Standard */}
      <VerificationModel />

      {/* 12. Top Hiring Companies Strip */}
      <CompaniesStrip />

      {/* Visual Transition: Companies -> Final CTA */}
      <SectionConnector type="curve-down" label="PASSING IT FORWARD" />

      {/* 13. Final Illustrated CTA: Passing the Torch */}
      <ConnectFinalCta />
    </div>
  );
}
