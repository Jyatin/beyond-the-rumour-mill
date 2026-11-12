import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./reveal";

export function ContributeBanner() {
  return (
    <section className="relative w-full bg-[#491629] text-white py-14 sm:py-16 md:py-20 lg:py-24 border-t border-[#491629]">
      <div className="mx-auto max-w-[1360px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">

          {/* LEFT: Large Hand-Drawn Style Celebratory Illustration */}
          <div className="md:col-span-5 flex justify-center md:justify-start items-center">
            <div className="relative w-[260px] sm:w-[320px] md:w-[380px] lg:w-[410px] select-none pointer-events-none">
              <Image
                src="/assets/contribute-celebration.png"
                alt="Student celebrating placement offer with arms raised"
                width={620}
                height={730}
                priority
                className="w-full h-auto select-none pointer-events-none drop-shadow-sm"
              />
            </div>
          </div>

          {/* RIGHT: High-Contrast Editorial Typography & Pill CTA Matching Reference */}
          <div className="md:col-span-7 flex flex-col items-start text-left">
            <Reveal>
              <h2 className="font-serif text-[36px] sm:text-[44px] md:text-[50px] lg:text-[56px] font-normal leading-[1.08] tracking-tight text-white mb-4 sm:mb-5">
                Your experience could change <br className="hidden sm:inline" /> someone&apos;s future.
              </h2>

              <p className="font-sans text-[16px] sm:text-[17.5px] text-[#F3E8EE]/90 leading-relaxed max-w-[46ch] mb-8 sm:mb-9 font-normal">
                Share your interview journey and help other students prepare with greater confidence.
              </p>

              <Link
                href="/experiences/new"
                className="inline-flex items-center justify-center rounded-full border border-white/70 hover:border-white bg-transparent hover:bg-white/10 text-white font-sans font-medium text-[14.5px] sm:text-[15px] px-8 py-3.5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-none"
              >
                Share your experience
              </Link>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
