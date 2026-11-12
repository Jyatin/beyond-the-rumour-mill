import Link from "next/link";
import { getHomepageMetrics } from "@/server/queries/companies";
import { Reveal } from "./reveal";
import { DoodleStar, DoodleSparkle } from "./doodles";

function ThinCheck({ className = "size-4 text-[#17563F]" }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="3 8.5 6.5 12 13 4.5" />
    </svg>
  );
}

function HeaderWalkingStickFigures({ className }) {
  return (
    <svg
      viewBox="0 0 100 65"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Hand-drawn stick figure 1 (left) */}
      <circle cx="28" cy="18" r="7" stroke="#1A191D" strokeWidth="2" fill="none" />
      <path d="M28 25v16M28 32l-7 7M28 32l8 6M28 41l-6 15M28 41l8 14" stroke="#1A191D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Hat on figure 1 */}
      <path d="M18 16c4-6 16-6 20 0M15 17h26" stroke="#1A191D" strokeWidth="1.8" strokeLinecap="round" />

      {/* Hand-drawn stick figure 2 (right) */}
      <circle cx="68" cy="20" r="7" stroke="#1A191D" strokeWidth="2" fill="none" />
      <path d="M68 27v16M68 33l-8 5M68 33l7 6M68 43l-5 13M68 43l8 12" stroke="#1A191D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Crown / Cup shape on figure 2 */}
      <path d="M60 14l4-8 4 4 4-4 4 8z" stroke="#1A191D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MockupDoodleBurst({ className }) {
  return (
    <svg viewBox="0 0 50 50" fill="none" className={className} aria-hidden="true">
      <path
        d="M25 4v8M25 38v8M4 25h8M38 25h8M10.2 10.2l5.6 5.6M34.2 34.2l5.6 5.6M10.2 39.8l5.6-5.6M34.2 15.8l5.6-5.6M25 15l2.5 7.5L35 25l-7.5 2.5L25 35l-2.5-7.5L15 25l7.5-2.5z"
        stroke="#1B2540"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#EEF1F8"
      />
    </svg>
  );
}

export async function HomeActionCards() {
  const metrics = await getHomepageMetrics();

  return (
    <section className="relative border-b border-[#EBE4D8] bg-[#FAF7F3] py-14 sm:py-18 md:py-22 overflow-hidden transition-colors duration-500">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 md:px-8">
        {/* TOP HEADER BLOCK */}
        <Reveal>
          <div className="relative text-center max-w-[760px] mx-auto mb-10 sm:mb-12">
            {/* Top-left walking stick figure doodle */}
            <HeaderWalkingStickFigures className="absolute -top-6 -left-6 sm:-left-12 size-16 sm:size-20 opacity-80 pointer-events-none hidden xs:block" />

            {/* Top Badge Callout Pill */}
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="border border-[#1A191D]/30 bg-white/95 rounded-full px-3.5 py-1 text-[11px] font-mono uppercase tracking-[0.08em] font-semibold text-[#1A191D] inline-flex items-center gap-2 shadow-2xs">
                <span className="size-2 rounded-full bg-[#155A38] inline-block" />
                <span>BUILT FOR STUDENTS, BY STUDENTS</span>
              </div>
            </div>

            {/* Main Editorial Heading on Two Lines */}
            <h2 className="font-serif text-[32px] sm:text-[44px] md:text-[52px] font-normal leading-[1.1] tracking-tight text-[#1A191D] mb-3">
              <span className="block">Real experiences. Real questions.</span>
              <span className="block">Better preparation.</span>
            </h2>

            {/* Subtitle */}
            <p className="font-sans text-[15.5px] sm:text-[17.5px] text-[#4A4950] leading-relaxed max-w-[52ch] mx-auto mb-6">
              Learn from candidates who have actually been through the process.
            </p>

            {/* Category Filter Pills / Understated Navigation Actions */}
            <div className="inline-flex items-center flex-wrap justify-center gap-2 sm:gap-2.5 bg-[#FAF7F3] px-3 py-1.5 rounded-full">
              <span className="text-[13.5px] font-sans font-medium text-[#6B7280]">Explore</span>
              <Link
                href="/experiences"
                className="bg-white border border-[#1A191D]/30 text-[#155A38] text-[11px] font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-2xs hover:bg-[#F2F7F4] transition-all hover:scale-102 cursor-pointer"
              >
                INTERVIEW EXPERIENCES
              </Link>
              <span className="text-[13px] font-sans text-[#6B7280]">or</span>
              <Link
                href="/questions"
                className="bg-[#DBEFE4] hover:bg-[#cce6d9] text-[#1D2A44] border border-[#155A38]/30 text-[11px] font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full transition-all hover:scale-102 cursor-pointer"
              >
                PLACEMENT QUESTIONS
              </Link>
            </div>
          </div>
        </Reveal>

        {/* TWO SIDE-BY-SIDE PRODUCT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-[1260px] mx-auto my-8 sm:my-10">
          {/* CARD 1: SHARED INTERVIEW EXPERIENCES (LEFT) */}
          <Reveal delay={1} className="h-full">
            <div className="relative flex flex-col justify-between h-full bg-[#F1F6F4] rounded-[var(--card-radius,4px)] p-6 md:p-10 shadow-none border-0">
              <div className="flex-1 flex flex-col">
                {/* Hero Area: Cropped Product UI Mockup */}
                <div
                  className="relative w-full h-[225px] sm:h-[240px] mb-8 overflow-hidden rounded-[var(--mockup-radius,8px)] select-none pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="absolute top-1 left-1 right-0 sm:-right-4 bg-white border border-[#E3E8E5] rounded-[var(--mockup-radius,8px)] p-4 sm:p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)]">
                    {/* Mockup Header + Overlapping Corner Avatars */}
                    <div className="flex items-start justify-between mb-3.5">
                      <div>
                        <div className="text-[14px] sm:text-[15px] font-sans font-semibold text-[#14201B] tracking-tight">
                          Share interview experience
                        </div>
                        <div className="text-[11px] font-mono text-[#55515D] mt-0.5">
                          Step 1 of 3 &middot; Candidate Submission
                        </div>
                      </div>
                      {/* Overlapping corner avatars (38px, overlapping right edge) */}
                      <div className="flex -space-x-2.5 items-center pl-2 -mr-1">
                        <div className="size-9 rounded-full ring-2 ring-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] overflow-hidden bg-[#D3E5DC] flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 36 36" fill="none" className="size-full">
                            <rect width="36" height="36" fill="#D3E5DC" />
                            <circle cx="18" cy="13" r="5.5" fill="#17563F" />
                            <path d="M8 30c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="#17563F" />
                          </svg>
                        </div>
                        <div className="size-9 rounded-full ring-2 ring-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] overflow-hidden bg-[#D5E0EE] flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 36 36" fill="none" className="size-full">
                            <rect width="36" height="36" fill="#D5E0EE" />
                            <circle cx="18" cy="13" r="5.5" fill="#1B2540" />
                            <path d="M8 30c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="#1B2540" />
                          </svg>
                        </div>
                        <div className="size-9 rounded-full ring-2 ring-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] overflow-hidden bg-[#DFDAEC] flex items-center justify-center shrink-0">
                          <svg viewBox="0 0 36 36" fill="none" className="size-full">
                            <rect width="36" height="36" fill="#DFDAEC" />
                            <circle cx="18" cy="13" r="5.5" fill="#382F58" />
                            <path d="M8 30c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="#382F58" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Form Field 1: Company & Role */}
                    <div className="mb-2.5">
                      <div className="text-[11px] font-mono font-semibold uppercase tracking-[0.06em] text-[#17563F] mb-1">
                        COMPANY &amp; ROLE
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="h-[28px] inline-flex items-center gap-1.5 px-2.5 rounded-[4px] bg-[#F8FAFC] border border-[#D8DFDC] text-[12px] sm:text-[12.5px] font-medium text-[#14201B]">
                          Google <span className="text-[#8A9590] text-[10px]">&times;</span>
                        </span>
                        <span className="h-[28px] inline-flex items-center gap-1.5 px-2.5 rounded-[4px] bg-[#F8FAFC] border border-[#D8DFDC] text-[12px] sm:text-[12.5px] font-medium text-[#14201B]">
                          Software Engineer <span className="text-[#8A9590] text-[10px]">&times;</span>
                        </span>
                      </div>
                    </div>

                    {/* Form Field 2: Rounds Faced */}
                    <div className="mb-2.5">
                      <div className="text-[11px] font-mono font-semibold uppercase tracking-[0.06em] text-[#17563F] mb-1">
                        ROUNDS FACED
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="h-[28px] inline-flex items-center gap-1 px-2.5 rounded-[4px] bg-[#F8FAFC] border border-[#D8DFDC] text-[11.5px] sm:text-[12px] font-medium text-[#14201B]">
                          Round 1 (OA) <span className="text-[#8A9590] text-[10px]">&times;</span>
                        </span>
                        <span className="h-[28px] inline-flex items-center gap-1 px-2.5 rounded-[4px] bg-[#F8FAFC] border border-[#D8DFDC] text-[11.5px] sm:text-[12px] font-medium text-[#14201B]">
                          Round 2 (DSA) <span className="text-[#8A9590] text-[10px]">&times;</span>
                        </span>
                        <span className="h-[28px] inline-flex items-center gap-1 px-2.5 rounded-[4px] bg-[#F8FAFC] border border-[#D8DFDC] text-[11.5px] sm:text-[12px] font-medium text-[#14201B]">
                          Round 3 (System) <span className="text-[#8A9590] text-[10px]">&times;</span>
                        </span>
                      </div>
                    </div>

                    {/* Form Field 3: Difficulty & Focus */}
                    <div>
                      <div className="text-[11px] font-mono font-semibold uppercase tracking-[0.06em] text-[#17563F] mb-1">
                        DIFFICULTY &amp; TOPICS
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <span className="h-[28px] inline-flex items-center gap-1 px-2.5 rounded-[4px] bg-[#EBF4F0] border border-[#C5DED3] text-[11.5px] sm:text-[12px] font-semibold text-[#17563F]">
                          Medium-Hard
                        </span>
                        <span className="h-[28px] inline-flex items-center gap-1 px-2.5 rounded-[4px] bg-[#F8FAFC] border border-[#D8DFDC] text-[11.5px] sm:text-[12px] font-medium text-[#14201B]">
                          Binary Trees <span className="text-[#8A9590] text-[10px]">+</span>
                        </span>
                        <span className="h-[28px] inline-flex items-center gap-1 px-2.5 rounded-[4px] bg-[#F8FAFC] border border-[#D8DFDC] text-[11.5px] sm:text-[12px] font-medium text-[#14201B]">
                          Graphs <span className="text-[#8A9590] text-[10px]">+</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Eyebrow Lockup */}
                <div className="flex items-center mb-4">
                  <svg viewBox="0 0 16 16" fill="currentColor" className="size-4 text-[#17563F] shrink-0" aria-hidden="true">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5 6a5 5 0 0 1 10 0H3Z" />
                  </svg>
                  <span className="font-sans font-semibold text-[16px] sm:text-[17px] text-[#14201B] tracking-tight ml-2.5">
                    experiences
                  </span>
                  <span className="w-px h-4 bg-[#14201B]/25 mx-3 inline-block shrink-0" aria-hidden="true" />
                  <span className="font-mono text-[11px] font-semibold tracking-[0.08em] uppercase text-[#14201B] bg-[#D4E8DC] px-2 py-0.5 rounded-[3px]">
                    INTERVIEW EXPERIENCES
                  </span>
                </div>

                {/* Main Card Serif Heading */}
                <h3 className="font-serif text-[28px] sm:text-[34px] md:text-[40px] lg:text-[46px] font-normal leading-[1.12] tracking-[-0.02em] text-[#14201B] mb-6">
                  Share what your interview was really like
                </h3>

                {/* Bullet Points List */}
                <ul className="space-y-3.5 my-6 font-sans text-[15px] sm:text-[15.5px] text-[#2B3A34] leading-[1.5]">
                  <li className="flex items-start gap-3">
                    <ThinCheck className="size-[18px] text-[#17563F] shrink-0 mt-0.5" />
                    <span>Share the rounds you faced</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ThinCheck className="size-[18px] text-[#17563F] shrink-0 mt-0.5" />
                    <span>Document DSA, fundamentals and technical questions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ThinCheck className="size-[18px] text-[#17563F] shrink-0 mt-0.5" />
                    <span>Help future candidates prepare with first-hand information</span>
                  </li>
                </ul>
              </div>

              {/* Primary CTA Button */}
              <div className="mt-auto pt-9">
                <Link
                  href="/experiences/new"
                  className="inline-flex items-center justify-center rounded-full bg-[#17563F] hover:bg-[#114230] text-white font-sans font-semibold text-[15px] px-6 py-3.5 transition-colors duration-150 cursor-pointer shadow-none"
                >
                  Share your experience
                </Link>
              </div>
            </div>
          </Reveal>

          {/* CARD 2: ASK A PLACEMENT QUESTION (RIGHT) */}
          <Reveal delay={2} className="h-full">
            <div className="relative flex flex-col justify-between h-full bg-[#EEF1F8] rounded-[var(--card-radius,4px)] p-6 md:p-10 shadow-none border-0">
              <div className="flex-1 flex flex-col">
                {/* Hero Area: Cropped Product UI Mockup */}
                <div
                  className="relative w-full h-[225px] sm:h-[240px] mb-8 overflow-hidden rounded-[var(--mockup-radius,8px)] select-none pointer-events-none"
                  aria-hidden="true"
                >
                  <div className="absolute top-1 left-1 right-0 sm:-right-4 bg-white border border-[#E3E8E5] rounded-[var(--mockup-radius,8px)] p-4 sm:p-6 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)]">
                    {/* Q&A Thread Header + Starburst Doodle */}
                    <div className="flex items-start justify-between mb-3 pb-2 border-b border-[#E3E8E5] relative">
                      <div className="flex items-center gap-1.5 text-[14px] sm:text-[15px] font-sans font-semibold text-[#14201B]">
                        <span>Placement Q&amp;A Thread</span>
                        <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-2 text-[#717684] ml-0.5" aria-hidden="true">
                          <path d="M2 3.5 5 6.5 8 3.5" />
                        </svg>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase font-semibold text-[#1B2540] bg-[#EEF1F8] border border-[#D5DEEE] px-2 py-0.5 rounded-[2px]">
                          1 Answer Verified
                        </span>
                      </div>
                      {/* Top-right Starburst doodle accent */}
                      <MockupDoodleBurst className="absolute -top-3.5 -right-3 size-14 sm:size-18 pointer-events-none opacity-90" />
                    </div>

                    {/* Student Question */}
                    <div className="mb-2.5">
                      <div className="text-[11px] font-mono font-semibold uppercase tracking-[0.06em] text-[#1B2540] mb-0.5">
                        STUDENT QUESTION &middot; CS &apos;26
                      </div>
                      <div className="text-[12px] sm:text-[12.5px] font-medium text-[#14201B] leading-snug">
                        &ldquo;What DSA patterns were asked in Google Round 2? Is graph DP common?&rdquo;
                      </div>
                    </div>

                    {/* Alumni Answer Panel */}
                    <div className="bg-[#FAFBFD] border border-[#E3E8E5] rounded-[4px] p-2.5 sm:p-3">
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <div className="size-5 rounded-full bg-[#1B2540] text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                            AS
                          </div>
                          <span className="text-[11.5px] sm:text-[12px] font-semibold text-[#14201B] truncate">
                            Aarav Sharma
                          </span>
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[2px] bg-[#EEF1F8] border border-[#D5DEEE] text-[9.5px] font-semibold text-[#1B2540] shrink-0">
                            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" className="size-2 text-[#1B2540]">
                              <path d="M2 6.5l2.5 2.5 5.5-6" />
                            </svg>
                            Verified Alum
                          </span>
                        </div>
                        <span className="text-[10px] sm:text-[10.5px] font-mono text-[#55515D] shrink-0">
                          SDE-2 @ Google
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-[11.5px] text-[#2B3A34] leading-relaxed line-clamp-2">
                        Focus heavily on binary search on answer and BFS/DFS with cycle detection. No graph DP was asked, but interviewers grilled edge cases.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Eyebrow Lockup */}
                <div className="flex items-center mb-4">
                  <svg viewBox="0 0 16 16" fill="currentColor" className="size-4 text-[#1B2540] shrink-0" aria-hidden="true">
                    <path d="M8 1a7 7 0 0 0-7 7c0 2.22 1.03 4.2 2.64 5.48V15a.5.5 0 0 0 .8.4l1.9-1.27A6.97 6.97 0 0 0 8 15a7 7 0 0 0 0-14Z" />
                  </svg>
                  <span className="font-sans font-semibold text-[16px] sm:text-[17px] text-[#14201B] tracking-tight ml-2.5">
                    questions
                  </span>
                  <span className="w-px h-4 bg-[#14201B]/25 mx-3 inline-block shrink-0" aria-hidden="true" />
                  <span className="font-mono text-[11px] font-semibold tracking-[0.08em] uppercase text-[#14201B] bg-[#D8E2F2] px-2 py-0.5 rounded-[3px]">
                    PLACEMENT QUESTIONS
                  </span>
                </div>

                {/* Main Card Serif Heading */}
                <h3 className="font-serif text-[28px] sm:text-[34px] md:text-[40px] lg:text-[46px] font-normal leading-[1.12] tracking-[-0.02em] text-[#14201B] mb-6">
                  Ask someone who&apos;s been through it
                </h3>

                {/* Bullet Points List */}
                <ul className="space-y-3.5 my-6 font-sans text-[15px] sm:text-[15.5px] text-[#2B3A34] leading-[1.5]">
                  <li className="flex items-start gap-3">
                    <ThinCheck className="size-[18px] text-[#17563F] shrink-0 mt-0.5" />
                    <span>Ask about rounds, DSA and fundamentals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ThinCheck className="size-[18px] text-[#17563F] shrink-0 mt-0.5" />
                    <span>Get first-hand answers from relevant alumni</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ThinCheck className="size-[18px] text-[#17563F] shrink-0 mt-0.5" />
                    <span>Find existing answers before asking</span>
                  </li>
                </ul>
              </div>

              {/* Primary CTA Button */}
              <div className="mt-auto pt-9">
                <Link
                  href="/questions"
                  className="inline-flex items-center justify-center rounded-full bg-[#1B2540] hover:bg-[#121A2D] text-white font-sans font-semibold text-[15px] px-6 py-3.5 transition-colors duration-150 cursor-pointer shadow-none"
                >
                  Ask a question
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* BOTTOM DOUBLE-BORDERED HAND-DRAWN / RETRO PROOF STRIP */}
        <Reveal delay={3}>
          <div className="relative mx-auto max-w-[1240px] my-10 sm:my-14">
            {/* Outer border box with thin border and inner double line matching reference screenshot */}
            <div className="relative border-[1.5px] border-[#1A191D] p-[3px] bg-[#FAF7F3] shadow-[2px_2px_0px_rgba(26,25,29,0.06)]">
              <div className="border border-[#1A191D] bg-white py-4 sm:py-5 px-4 sm:px-8 flex items-center justify-between gap-4">

                {/* Left Ribbon Medal Icon (Exact match to reference) */}
                <div className="hidden sm:flex items-center justify-center text-[#1A191D] shrink-0 pl-1 pr-3" aria-hidden="true">
                  <svg viewBox="0 0 32 32" fill="none" className="size-7 sm:size-8" stroke="#1A191D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="16" cy="12" r="8" />
                    <polygon points="16,8 17.5,11.5 21,11.5 18,13.8 19.2,17 16,14.8 12.8,17 14,13.8 11,11.5 14.5,11.5" strokeWidth="1.2" fill="none" />
                    <path d="M12 18.5L9 28l7-4 7 4-3-9.5" />
                  </svg>
                </div>

                {/* Center: Two-row Horizontally Aligned Statistics with Pipes */}
                <div className="flex-1 flex flex-col items-center justify-center text-center font-mono text-[11.5px] sm:text-[13px] text-[#1A191D] tracking-tight leading-relaxed select-none">
                  {/* Row 1 */}
                  <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1">
                    <span>
                      <strong className="font-bold font-mono text-[13px] sm:text-[14.5px]">{metrics.companiesCovered} COMPANIES</strong> covered
                    </span>
                    <span className="text-[#1A191D]/35 font-light">|</span>
                    <span>
                      <strong className="font-bold font-mono text-[13px] sm:text-[14.5px]">{metrics.interviewExperiences} INTERVIEW EXPERIENCES</strong> documented
                    </span>
                    <span className="text-[#1A191D]/35 font-light hidden md:inline">|</span>
                    <span className="hidden md:inline">
                      <strong className="font-bold font-mono text-[13px] sm:text-[14.5px]">98% POSITIVE</strong> candidate verification
                    </span>
                  </div>

                  {/* Row 2 */}
                  <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1 mt-1 sm:mt-1.5 text-[#33313B]">
                    <span>
                      <strong className="font-bold font-mono text-[13px] sm:text-[14.5px]">{metrics.verifiedAlumni} VERIFIED ALUMNI</strong> active
                    </span>
                    <span className="text-[#1A191D]/35 font-light">|</span>
                    <span>
                      <strong className="font-bold font-mono text-[13px] sm:text-[14.5px]">{metrics.placementQuestions} PLACEMENT QUESTIONS</strong> answered
                    </span>
                    <span className="text-[#1A191D]/35 font-light hidden md:inline">|</span>
                    <span className="hidden md:inline">
                      <strong className="font-bold font-mono text-[13px] sm:text-[14.5px]">100% COMMUNITY</strong> evidence-based
                    </span>
                  </div>
                </div>

                {/* Right Sparkle Doodle Icon (Exact match to reference) */}
                <div className="hidden sm:flex items-center justify-center text-[#1A191D] shrink-0 pl-3 pr-1" aria-hidden="true">
                  <svg viewBox="0 0 32 32" fill="none" className="size-6 sm:size-7" stroke="#1A191D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {/* Big sparkle */}
                    <path d="M14 4l2.5 7.5L24 14l-7.5 2.5L14 24l-2.5-7.5L4 14l7.5-2.5z" />
                    {/* Small sparkle top right */}
                    <path d="M25 6l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" strokeWidth="1.2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
