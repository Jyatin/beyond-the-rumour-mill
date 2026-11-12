import Link from "next/link";
import { EditorialPageHeader } from "@/components/ui/editorial-page-header";
import { ArrowRight } from "lucide-react";

const POLICY_DOCS = {
  guidelines: {
    eyebrow: "COMMUNITY STANDARD",
    title: "Community Guidelines & Zero-Hearsay Standard",
    summary:
      "Every record on Beyond the Rumour Mill exists to replace second-hand campus rumours with verified, specific interview intelligence.",
    sections: [
      {
        heading: "1. Direct Experience Only",
        body: "Only submit rounds you personally interviewed for or campus drive data directly verified with coordinators. Speculative hearsay, leaked confidential test keys, or copied rumours are removed during moderation.",
      },
      {
        heading: "2. Verification & Evidence",
        body: "Alumni employment badges are granted through corporate work-email OTP verification or moderator review of uploaded offer letters, ID cards, or LinkedIn profiles.",
      },
      {
        heading: "3. Respect Privacy & Anonymity",
        body: "Never include private interviewer names, recruiter phone numbers, personal email addresses, or compensation figures you do not have permission to share.",
      },
    ],
  },
  editorial: {
    eyebrow: "EDITORIAL POLICY",
    title: "How Consensus & Verification Work",
    summary:
      "Our intelligence pages report statistical consensus only once enough independent candidates confirm a pattern.",
    sections: [
      {
        heading: "Minimum Publication Threshold",
        body: "Topic prevalence and interview pattern breakdowns require at least 5 independent reports before being published as consensus signal.",
      },
      {
        heading: "Credibility & Recency Weighting",
        body: "Verified employment records and recent interview cycles receive higher weight with 12-month recency decay so outdated placement rumours do not mislead incoming batches.",
      },
      {
        heading: "Human Moderation + Audit Trail",
        body: "Flagged submissions and verification documents pass through admin moderation with immutable audit log entries.",
      },
    ],
  },
  security: {
    eyebrow: "PRIVACY & SHIELD",
    title: "Data Protection & Private Evidence",
    summary:
      "Sensitive student CVs and alumni verification proof are stored privately and served only to authorized owners and reviewers.",
    sections: [
      {
        heading: "Private Document Streaming",
        body: "Verification documents and private alumni CVs are validated by magic-byte inspection and streamed through authenticated, role-checked endpoints rather than public directory listings.",
      },
      {
        heading: "Anonymous Author Masking",
        body: "When a contributor publishes anonymously, author identity is stored server-side for anti-abuse checks and stripped from public query payloads.",
      },
      {
        heading: "Role-Based Access Control",
        body: "Placement drive publishing, moderation approvals, and candidate review actions enforce strict server-side student, alumni, TPO, and admin role checks.",
      },
    ],
  },
  about: {
    eyebrow: "ABOUT THE PROJECT",
    title: "Beyond the Rumour Mill",
    summary:
      "Built so students without senior referral networks get equal access to verified company drive requirements, real round transcripts, and structured prep plans.",
    sections: [
      {
        heading: "1. Placement Information",
        body: "Structured company drives, eligibility cutoffs, deadlines, and preparation links managed transparently with Training & Placement coordinators.",
      },
      {
        heading: "2. Verified Experience Repository",
        body: "Round-by-round interview records, alumni Q&A threads, and work-email or evidence-backed verification.",
      },
      {
        heading: "3. Preparation Command Center",
        body: "One-click personalized checklists generated from active drive criteria and historical questions, tracked against a weighted Readiness Index.",
      },
    ],
  },
  terms: {
    eyebrow: "TERMS OF USE",
    title: "Platform Terms of Use",
    summary:
      "Participation in Beyond the Rumour Mill is free for university students and alumni contributing honest placement knowledge.",
    sections: [
      {
        heading: "Acceptable Academic & Placement Use",
        body: "You agree to post truthful placement experiences and refrain from spam, solicitation, harassment, or scraping student/alumni contact details.",
      },
      {
        heading: "Content Moderation",
        body: "Moderators may flag, redact, or remove submissions that violate NDA privacy boundaries, fabricate verification evidence, or breach campus conduct rules.",
      },
    ],
  },
  privacy: {
    eyebrow: "PRIVACY NOTICE",
    title: "Student & Alumni Privacy Policy",
    summary:
      "We collect only the academic and placement details needed to match drive eligibility, compute readiness plans, and verify alumni credentials.",
    sections: [
      {
        heading: "Account & Academic Data",
        body: "Profile details such as branch, graduation year, and CGPA are user-managed in /profile and never sold or shared for sponsored advertisements.",
      },
      {
        heading: "Document & Email Confidentiality",
        body: "Work emails submitted for OTP verification are hashed/recorded for domain checks without exposing personal addresses in public listings.",
      },
    ],
  },
};

const NAV_LINKS = [
  { slug: "about", label: "About the Platform" },
  { slug: "editorial", label: "Editorial Policy" },
  { slug: "guidelines", label: "Community Guidelines" },
  { slug: "security", label: "Security & Shield" },
  { slug: "privacy", label: "Privacy Policy" },
  { slug: "terms", label: "Terms of Use" },
];

export function EditorialInfoPage({ slug }) {
  const doc = POLICY_DOCS[slug] || POLICY_DOCS.about;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Editorial Header */}
      <EditorialPageHeader
        eyebrow={doc.eyebrow}
        title={doc.title}
        subtitle={doc.summary}
        badges={["Zero-Hearsay Policy", "Verified by Campus Consensus", "Updated 2026 Batch"]}
      />

      <div className="mx-auto max-w-[1360px] py-10 px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-3 space-y-2 p-4 rounded-2xl bg-[#FAF7F3] border border-[#EBE4D8]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#63606B] font-semibold block px-2 mb-2">
              Policy &amp; Standards
            </span>
            <nav className="space-y-1">
              {NAV_LINKS.map((item) => {
                const active = item.slug === slug;
                return (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}`}
                    className={`block px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                      active
                        ? "bg-[#1B635C] text-white font-semibold shadow-xs"
                        : "text-[#4A4752] hover:bg-white hover:text-[#111111]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-9 space-y-6">
            <div className="space-y-6">
              {doc.sections.map((sec, idx) => (
                <section
                  key={sec.heading}
                  className="p-6 sm:p-8 rounded-2xl border border-[#ECEAE5] bg-[#FFFFFF] dark:bg-[var(--surface)] space-y-3 shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="size-6 rounded-full bg-[#1B635C]/10 text-[#1B635C] flex items-center justify-center font-mono font-bold text-xs">
                      {idx + 1}
                    </span>
                    <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#111111] dark:text-foreground">
                      {sec.heading}
                    </h2>
                  </div>
                  <p className="text-sm sm:text-[14.5px] text-[#4A4752] leading-relaxed pl-8">
                    {sec.body}
                  </p>
                </section>
              ))}
            </div>

            {/* Quick Links Footer */}
            <div className="pt-6 border-t border-[#ECEAE5] flex flex-wrap items-center gap-4 text-xs font-semibold text-[#1B635C]">
              <Link href="/companies" className="hover:underline flex items-center gap-1">
                <span>Explore Companies</span>
                <ArrowRight className="size-3" />
              </Link>
              <Link href="/prepare" className="hover:underline flex items-center gap-1">
                <span>Preparation Hub</span>
                <ArrowRight className="size-3" />
              </Link>
              <Link href="/experiences" className="hover:underline flex items-center gap-1">
                <span>Interview Experiences</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
