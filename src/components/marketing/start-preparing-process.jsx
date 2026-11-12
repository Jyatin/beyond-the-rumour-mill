import Link from "next/link";
import { Reveal } from "./reveal";

function DoodleRecruitingFigures({ className }) {
  return (
    <svg
      viewBox="0 0 160 90"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Figure 1 (Left): Holding Magnifying Glass */}
      {/* Magnifying Glass */}
      <circle cx="22" cy="42" r="12" stroke="#1A191D" strokeWidth="2.4" fill="white" />
      <path d="M14 50l-8 8" stroke="#1A191D" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M18 38a6 6 0 0 1 7 4" stroke="#1A191D" strokeWidth="1.6" strokeLinecap="round" />
      {/* Head */}
      <circle cx="44" cy="40" r="14" stroke="#1A191D" strokeWidth="2.4" fill="white" />
      {/* Eyes looking down/left through glass */}
      <circle cx="39" cy="38" r="2.2" fill="#1A191D" />
      <circle cx="47" cy="38" r="2.2" fill="#1A191D" />
      <path d="M40 46c2 2 6 2 8 0" stroke="#1A191D" strokeWidth="1.8" strokeLinecap="round" />
      {/* Body & Running Legs */}
      <path d="M44 54v14M44 68l-10 12M44 68l10 10M32 50l12 6" stroke="#1A191D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Figure 2 (Middle): Excited Runner */}
      {/* Head */}
      <circle cx="78" cy="38" r="14" stroke="#1A191D" strokeWidth="2.4" fill="white" />
      <circle cx="74" cy="36" r="2.2" fill="#1A191D" />
      <circle cx="82" cy="36" r="2.2" fill="#1A191D" />
      <path d="M75 44c2 2.5 5 2.5 7 0" stroke="#1A191D" strokeWidth="1.8" strokeLinecap="round" />
      {/* Body & Running Legs */}
      <path d="M78 52v15M78 67l-8 15M78 67l14 12M68 56l10-4 12 6" stroke="#1A191D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Figure 3 (Right): Holding Chart */}
      {/* Head */}
      <circle cx="112" cy="38" r="14" stroke="#1A191D" strokeWidth="2.4" fill="white" />
      <circle cx="108" cy="36" r="2.2" fill="#1A191D" />
      <circle cx="116" cy="36" r="2.2" fill="#1A191D" />
      <path d="M109 44c2 2 5 2 7 0" stroke="#1A191D" strokeWidth="1.8" strokeLinecap="round" />
      {/* Body & Running Legs */}
      <path d="M112 52v15M112 67l-12 14M112 67l10 13M102 54l10 4 14-8" stroke="#1A191D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Upward Line Chart Held in Hand */}
      <rect x="126" y="24" width="26" height="22" rx="2" stroke="#1A191D" strokeWidth="2" fill="white" />
      <path d="M130 39l5-6 6 3 7-8" stroke="#155A38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M145 28h3v3" stroke="#155A38" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HandDrawnTargetIcon() {
  return (
    <svg viewBox="0 0 36 36" fill="none" className="size-8 sm:size-9" stroke="#1A191D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="18" r="12" />
      <circle cx="18" cy="18" r="6" />
      <circle cx="18" cy="18" r="2" fill="#1A191D" />
      {/* Diagonal arrow hitting bullseye */}
      <path d="M7 29l7-7" stroke="#155A38" strokeWidth="2.2" />
      <path d="M10 29h4v-4" stroke="#155A38" strokeWidth="2" />
    </svg>
  );
}

function HandDrawnToolsIcon() {
  return (
    <svg viewBox="0 0 36 36" fill="none" className="size-8 sm:size-9" stroke="#1A191D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="8" y="10" width="20" height="18" rx="2" fill="white" />
      {/* Up arrow tray */}
      <path d="M18 22V14M14 17l4-4 4 4" stroke="#155A38" strokeWidth="2" />
      {/* Little geometric shapes underneath */}
      <circle cx="12" cy="30" r="2.5" />
      <polygon points="24,28 27,33 21,33" />
    </svg>
  );
}

function HandDrawnAutomateIcon() {
  return (
    <svg viewBox="0 0 36 36" fill="none" className="size-8 sm:size-9" stroke="#1A191D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* Sparkle 1 */}
      <path d="M18 8l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#FAF7F3" stroke="#155A38" strokeWidth="1.8" />
      {/* Mini Sparkles */}
      <path d="M10 24l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" fill="#FAF7F3" stroke="#1A191D" strokeWidth="1.3" />
      <path d="M26 12l1 2 2 1-2 1-1 2-1-2-2-1 2-1z" fill="#FAF7F3" stroke="#1A191D" strokeWidth="1.3" />
    </svg>
  );
}

export function StartPreparingProcess() {
  const steps = [
    {
      num: "STEP 1:",
      title: "Discover authentic experiences",
      description: "Find relevant interview journeys from students and alumni.",
      icon: HandDrawnTargetIcon,
    },
    {
      num: "STEP 2:",
      title: "Explore real questions",
      description: "Discover placement questions and company-specific topics.",
      icon: HandDrawnToolsIcon,
    },
    {
      num: "STEP 3:",
      title: "Plan your preparation",
      description: "Turn insights into focused interview preparation.",
      icon: HandDrawnAutomateIcon,
    },
  ];

  return (
    <section className="relative border-b border-[#ECEAE5] bg-white py-12 sm:py-16 md:py-20 overflow-hidden transition-colors duration-500">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">

          {/* LEFT COLUMN: Heading, Link, and Hand-Drawn Doodle */}
          <div className="lg:col-span-5 flex flex-col items-start pr-0 lg:pr-4">
            <Reveal>
              <h2 className="font-serif text-[34px] sm:text-[42px] md:text-[48px] font-normal leading-[1.1] tracking-tight text-[#1A191D] mb-2.5">
                Start preparing
              </h2>

              <Link
                href="#how-it-works"
                className="font-mono text-[11px] uppercase tracking-[0.14em] font-bold text-[#1A191D] hover:text-[#155A38] inline-flex items-center gap-1 transition-colors mb-6 sm:mb-8 cursor-pointer"
              >
                SEE HOW IT WORKS &rarr;
              </Link>

              {/* Hand-drawn style figures running (exact visual match to reference) */}
              <div className="w-full max-w-[240px] sm:max-w-[280px]">
                <DoodleRecruitingFigures className="w-full h-auto text-[#1A191D]" />
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN: 3 Horizontal Process Rows with Thin Separators and Button */}
          <div className="lg:col-span-7 flex flex-col justify-start">
            <Reveal delay={1}>
              <div className="w-full">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.num}
                      className="border-t border-[#1A191D] py-6 sm:py-7 flex items-start gap-4 sm:gap-6"
                    >
                      {/* Left Step Icon */}
                      <div className="shrink-0 mt-0.5">
                        <Icon />
                      </div>

                      {/* Step Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
                          <span className="font-mono text-[12.5px] sm:text-[13px] font-bold text-[#1A191D] tracking-wider">
                            {step.num}
                          </span>
                          <h3 className="font-sans font-bold text-[16px] sm:text-[17.5px] text-[#1A191D] tracking-tight">
                            {step.title}
                          </h3>
                        </div>
                        <p className="font-mono text-[12.5px] sm:text-[13px] text-[#55515D] leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* Final bottom line before CTA */}
                <div className="border-t border-[#1A191D] pt-8 sm:pt-9">
                  <Link
                    href="/experiences"
                    className="inline-flex items-center justify-center rounded-full bg-[#1B635C] hover:bg-[#144f49] text-white font-sans font-medium text-[14px] px-6 py-2.5 sm:py-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xs cursor-pointer"
                  >
                    Explore experiences
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
