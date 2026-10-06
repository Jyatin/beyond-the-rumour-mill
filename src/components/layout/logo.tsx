import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 shrink-0 ${className ?? ""}`}
    >
      <svg
        width="30"
        height="26"
        viewBox="0 0 34 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Left deep teal speech bubble */}
        <path
          d="M13 3C6.92487 3 2 7.25329 2 12.5C2 15.0205 3.12563 17.3065 4.97548 18.9768C4.46958 20.9702 3.44754 22.5606 2.18652 23.6348C4.16858 23.539 6.27376 22.778 7.94043 21.5605C9.49755 21.9575 11.1983 22 13 22C19.0751 22 24 17.7467 24 12.5C24 7.25329 19.0751 3 13 3Z"
          fill="#1B635C"
        />
        {/* Right lighter teal overlapping speech bubble */}
        <path
          d="M20 7C14.7 7 10.4 10.36 10.4 14.5C10.4 16.48 11.25 18.27 12.67 19.59C12.28 21.14 11.5 22.38 10.54 23.22C12.06 23.14 13.68 22.55 14.96 21.6C16.14 21.91 17.43 22.07 18.79 22.07C24.09 22.07 28.39 18.71 28.39 14.57C28.39 10.43 24.09 7 18.79 7H20Z"
          fill="#8AC4BE"
          fillOpacity="0.88"
        />
      </svg>
      <span className="font-serif text-[18px] md:text-[19px] font-normal tracking-[-0.01em] text-[#111111]">
        Beyond the Rumour Mill
      </span>
    </Link>
  );
}
