import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./reveal";

export function ContributeBanner() {
  return (
    <section className="relative w-full bg-[#491629] text-white py-12 sm:py-14 md:py-16 lg:py-18 border-t border-[#491629]">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-center">

          {/* LEFT: Hand-Drawn Style Celebratory Illustration */}
          <div className="md:col-span-5 flex justify-center md:justify-start items-center">
            <div className="relative w-[220px] sm:w-[260px] md:w-[300px] lg:w-[340px] select-none pointer-events-none">
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

          {/* RIGHT: High-Contrast Editorial Typography & Clearly Visible Pill CTA */}
          <div className="md:col-span-7 flex flex-col items-start text-left">
            <Reveal>
              <h2 className="font-serif text-[30px] sm:text-[36px] md:text-[42px] lg:text-[46px] font-normal leading-[1.1] tracking-tight text-white mb-3 sm:mb-4">
                Your experience could change <br className="hidden sm:inline" /> someone&apos;s future.
              </h2>

              <p className="font-sans text-[15px] sm:text-[16.5px] text-[#F3E8EE]/90 leading-relaxed max-w-[46ch] mb-6 sm:mb-7 font-normal">
                Share your interview journey and help other students prepare with greater confidence.
              </p>

              <Link
                href="/experiences/new"
                className="inline-flex items-center justify-center rounded-full bg-white text-[#491629] hover:bg-[#FAF0F3] active:bg-[#F3E2E8] font-sans font-semibold text-[14px] sm:text-[14.5px] px-7 py-3 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#491629]"
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
