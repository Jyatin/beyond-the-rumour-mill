import Link from "next/link";
import { getHomepageFeaturedCompanies } from "@/server/queries/companies";
import { Reveal } from "./reveal";

function SketchFlair({ className }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 26L14 6M16 26L24 6M25 26L32 6"
        stroke="#155A38"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AmazonLogo({ className }) {
  return (
    <div className={`inline-flex flex-col items-center justify-center text-[#1A191D] ${className}`}>
      <span className="font-sans font-extrabold text-[20px] sm:text-[23px] md:text-[25px] tracking-tighter leading-none">
        Amazon
      </span>
      <svg viewBox="0 0 65 14" fill="currentColor" className="w-10 sm:w-11 h-2 -mt-0.5" aria-hidden="true">
        <path d="M53.8 8.5C41.2 13.8 23.9 15.5 10.2 11.2c-1.1-.3-2.1.5-1.1 1.3 12.8 9.5 32.2 9.8 45.4 1.8 1.1-.7.2-2.1-.7-1.8z" />
        <path d="M57.2 4.8c-.9-1.2-5.4-.6-7.5-.4-.6.1-.7-.5-.2-1 3.5-2.4 8.9-1.7 9.8-.4.9 1.3-.3 6.9-3.6 9.6-.5.4-1 .2-.7-.4 1-1.9 3.1-6.3 2.2-7.4z" />
      </svg>
    </div>
  );
}

function MicrosoftLogo({ className }) {
  return (
    <div className={`inline-flex items-center gap-2 sm:gap-2.5 text-[#1A191D] ${className}`}>
      <div className="grid grid-cols-2 gap-[2px] size-4 sm:size-4.5 shrink-0" aria-hidden="true">
        <div className="bg-[#F25022]" />
        <div className="bg-[#7FBA00]" />
        <div className="bg-[#00A4EF]" />
        <div className="bg-[#FFB900]" />
      </div>
      <span className="font-sans font-semibold text-[19px] sm:text-[22px] md:text-[24px] tracking-tight leading-none">
        Microsoft
      </span>
    </div>
  );
}

function GoogleLogo({ className }) {
  return (
    <span className={`font-sans font-medium text-[21px] sm:text-[24px] md:text-[26px] tracking-tight text-[#1A191D] leading-none ${className}`}>
      Google
    </span>
  );
}

function AtlassianLogo({ className }) {
  return (
    <div className={`inline-flex items-center gap-2 text-[#1A191D] ${className}`}>
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 sm:size-5.5 shrink-0" aria-hidden="true">
        <path d="M11.53 2c-.39 0-.75.22-.92.57L4.17 15.65c-.3.62.15 1.35.84 1.35h6.52c.46 0 .86-.31.97-.76l1.9-7.79c.28-1.16 1.4-1.9 2.56-1.7l2.87.5c.66.11 1.15.71 1.07 1.38L19.4 20.5c-.1.83-.8 1.5-1.64 1.5H6.26c-.96 0-1.74-.78-1.74-1.74 0-.25.05-.5.16-.72L11.53 2z" />
      </svg>
      <span className="font-sans font-bold text-[19px] sm:text-[22px] md:text-[24px] tracking-tight leading-none">
        Atlassian
      </span>
    </div>
  );
}

function UberLogo({ className }) {
  return (
    <span className={`font-sans font-bold text-[22px] sm:text-[25px] md:text-[28px] tracking-tighter text-[#1A191D] leading-none ${className}`}>
      Uber
    </span>
  );
}

function GoldmanSachsLogo({ className }) {
  return (
    <div className={`flex flex-col text-left leading-[0.92] font-serif font-bold text-[#1A191D] text-[13.5px] sm:text-[15.5px] md:text-[17px] tracking-tight select-none ${className}`}>
      <span>Goldman</span>
      <span>Sachs</span>
    </div>
  );
}

function renderCompanyLogo(comp) {
  const name = comp.name.toLowerCase();
  if (name.includes("amazon")) return <AmazonLogo />;
  if (name.includes("microsoft")) return <MicrosoftLogo />;
  if (name.includes("google")) return <GoogleLogo />;
  if (name.includes("atlassian")) return <AtlassianLogo />;
  if (name.includes("uber")) return <UberLogo />;
  if (name.includes("goldman")) return <GoldmanSachsLogo />;

  return (
    <span className="font-serif font-semibold text-[19px] sm:text-[22px] md:text-[25px] tracking-tight text-[#1A191D]">
      {comp.name}
    </span>
  );
}

export async function CompanyIntelligenceStrip() {
  const featuredCompanies = await getHomepageFeaturedCompanies();

  return (
    <section className="w-full bg-[#FAF7F3] pt-9 sm:pt-11 md:pt-12 pb-10 sm:pb-12 md:pb-14 border-b border-[#EBE4D8]">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 md:px-8">
        <Reveal>
          {/* Centered Editorial Heading */}
          <div className="text-center mb-5 sm:mb-6 md:mb-7">
            <h2 className="font-serif text-[22px] sm:text-[27px] md:text-[32px] text-[#1A191D] leading-[1.2] tracking-tight max-w-[36ch] mx-auto font-normal">
              Interview intelligence across the companies{" "}
              <br className="hidden sm:inline" />
              students{" "}
              <span className="relative inline-block italic font-serif font-normal text-[#1A191D] whitespace-nowrap">
                care about
                <SketchFlair className="absolute -top-3 -right-7 size-5.5 sm:size-6.5 md:size-7" />
              </span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={1}>
          {/* Refined Wide, Shallow Horizontal Bordered Container */}
          <div className="relative mx-auto w-[92%] sm:w-[88%] max-w-[1160px]">
            {/* Crisp White Inner Container Box */}
            <div className="relative w-full border-[1.8px] border-[#1A191D] bg-white py-4.5 sm:py-5 md:py-5.5 px-6 sm:px-10 md:px-14 rounded-none shadow-none">
              {/* Hand-drawn / Browser Header Dots (ooo) integrated on upper border */}
              <div
                className="absolute -top-[9px] left-4 bg-[#FAF7F3] px-1.5 flex items-center gap-1.2 text-[#1A191D] select-none"
                aria-hidden="true"
              >
                <span className="size-1.5 rounded-full border-[1.6px] border-current bg-transparent inline-block" />
                <span className="size-1.5 rounded-full border-[1.6px] border-current bg-transparent inline-block" />
                <span className="size-1.5 rounded-full border-[1.6px] border-current bg-transparent inline-block" />
              </div>

              {/* Single Horizontal Row of Refined Wordmarks */}
              <div className="flex items-center justify-between gap-6 sm:gap-9 md:gap-14 overflow-x-auto no-scrollbar py-0.5 whitespace-nowrap scroll-smooth">
                {featuredCompanies.map((comp) => {
                  const targetHref = comp.id ? `/companies/${comp.id}` : "/companies";
                  return (
                    <Link
                      key={comp.id}
                      href={targetHref}
                      className="shrink-0 group inline-flex items-center justify-center text-[#1A191D] hover:text-[#155A38] transition-colors duration-200 cursor-pointer focus:outline-hidden"
                      title={`View ${comp.name} interview intelligence`}
                      aria-label={`View ${comp.name} interview intelligence`}
                    >
                      {renderCompanyLogo(comp)}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
