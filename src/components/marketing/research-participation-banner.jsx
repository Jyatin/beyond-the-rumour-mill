import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./reveal";

export function ResearchParticipationBanner() {
  return (
    <section className="relative w-full bg-[#010131] text-white overflow-hidden py-14 sm:py-16 md:py-20 border-t border-[#121245]">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 md:px-14 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left: Research Participant Illustration with Lavender Circle & Doodles */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div className="relative w-[280px] sm:w-[320px] md:w-[360px] max-w-full select-none pointer-events-none">
              <Image
                src="/assets/research-illustration-2x.png"
                alt="Participate in research and earn money"
                width={720}
                height={610}
                className="w-full h-auto object-contain"
                priority={false}
              />
            </div>
          </div>

          {/* Right: Bold Question Heading, Subtitle & Outline CTA Pill */}
          <div className="md:col-span-7 flex flex-col items-start text-left">
            <Reveal>
              <h2 className="font-sans font-bold text-[32px] sm:text-[40px] md:text-[46px] lg:text-[50px] leading-[1.12] tracking-tight text-white mb-3 sm:mb-4">
                Want to earn money <br className="hidden sm:inline" />
                participating in research?
              </h2>

              <p className="font-sans text-[15px] sm:text-[16.5px] md:text-[17.5px] text-white/90 leading-relaxed mb-6 sm:mb-8 max-w-[540px]">
                Participants have earned{" "}
                <span className="font-bold text-white">$60 million</span>{" "}
                sharing feedback with leading companies.
              </p>

              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border-[1.5px] border-[#B59CB1] hover:border-white bg-transparent hover:bg-white/10 text-white font-sans font-medium text-[14px] sm:text-[15px] px-7 py-3 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-xs"
              >
                Sign up to participate
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

