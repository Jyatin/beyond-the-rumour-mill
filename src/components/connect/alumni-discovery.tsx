"use client";

import * as React from "react";
import { Search, Check, Send, X, ArrowUpRight } from "lucide-react";
import { alumniProfiles, AlumniProfile } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { DoodleSparkle, DoodleTape, DoodleUnderline, DoodleTinyCoder, DoodleHandshake } from "@/components/marketing/doodles";
import { Reveal } from "@/components/marketing/reveal";

export function AlumniDiscovery() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCompany, setSelectedCompany] = React.useState("All");
  const [selectedRole, setSelectedRole] = React.useState("All");
  const [selectedCollege, setSelectedCollege] = React.useState("All");

  // Interactive connection state map: id -> 'none' | 'pending' | 'connected'
  const [connectionStates, setConnectionStates] = React.useState<
    Record<string, "none" | "pending" | "connected">
  >({});

  // Active message modal state
  const [activeModalAlumni, setActiveModalAlumni] = React.useState<AlumniProfile | null>(null);
  const [messageText, setMessageText] = React.useState("");

  const companiesList = ["All", "Amazon", "Microsoft", "Google", "Atlassian", "Uber", "Goldman Sachs"];
  const rolesList = ["All", "SDE-1", "SWE", "Software Engineer", "Analyst (SWE)"];
  const collegesList = ["All", "IIT Delhi", "BITS Pilani", "IIIT Hyderabad", "NIT Trichy", "IIT Bombay", "DTU Delhi"];

  const filteredAlumni = alumniProfiles.filter((alumni) => {
    const matchesSearch =
      searchQuery === "" ||
      alumni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alumni.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCompany = selectedCompany === "All" || alumni.company === selectedCompany;
    const matchesRole = selectedRole === "All" || alumni.role === selectedRole;
    const matchesCollege = selectedCollege === "All" || alumni.college === selectedCollege;

    return matchesSearch && matchesCompany && matchesRole && matchesCollege;
  });

  const handleConnectClick = (alumni: AlumniProfile) => {
    const currentState = connectionStates[alumni.id] || "none";
    if (currentState === "none") {
      setActiveModalAlumni(alumni);
      setMessageText(`Hi ${alumni.name.split(" ")[0]}, I'm preparing for the ${alumni.company} ${alumni.role} interview and saw your verified experience report. Would love to ask a quick question about the technical rounds!`);
    } else if (currentState === "pending") {
      setConnectionStates((prev) => ({ ...prev, [alumni.id]: "connected" }));
    }
  };

  const handleSendMessage = () => {
    if (!activeModalAlumni) return;
    setConnectionStates((prev) => ({ ...prev, [activeModalAlumni.id]: "pending" }));
    setActiveModalAlumni(null);
  };

  return (
    <section id="alumni-directory" className="relative border-b border-[var(--hairline-soft)] bg-[var(--paper-tint)] py-20 md:py-28 overflow-hidden transition-colors duration-700">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8">
        <Reveal>
          <div className="mb-14 flex flex-col justify-between gap-6 lg:flex-row lg:items-end relative">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <DoodleSparkle className="size-5 text-[var(--brand)]" />
                <p className="type-data text-[12px] uppercase tracking-[0.16em] text-[var(--brand)] font-semibold">
                  Alumni Directory / 02 · Placed Mentors
                </p>
              </div>
              <h2 className="type-display max-w-[18ch] text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.02] text-[var(--ink)]">
                Find someone who&apos;s{" "}
                <span className="relative inline-block text-[var(--brand)] italic">
                  been there.
                  <DoodleUnderline className="absolute -bottom-2.5 left-0 w-full text-[var(--brand)] pointer-events-none" />
                </span>
              </h2>
            </div>

            <div className="max-w-[40ch] relative">
              {/* Floating Handshake Doodle */}
              <div className="absolute -top-12 right-0 hidden sm:block animate-float-gentle pointer-events-none">
                <DoodleHandshake className="w-14 h-9 text-[#8D6BB3]" />
              </div>
              <p className="type-body text-[16px] leading-relaxed text-[var(--ink-muted)]">
                Search placed alumni by company, role, college, or interview experience. Send a note and get real, unvarnished advice.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Search & Filter Controls */}
        <div className="mb-12 space-y-4">
          {/* Main Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 size-4.5 text-[var(--ink-muted)]" />
            <input
              type="text"
              placeholder="Search by company, role, college, or topic (e.g. Amazon, System Design, IIT Delhi)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12.5 pl-12 pr-4 bg-[#FFFFFF] dark:bg-[var(--surface)] border border-[var(--border)] rounded-full type-body text-[15px] text-[var(--ink)] placeholder:text-[var(--ink-muted)]/70 focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20 shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--ink-muted)] hover:text-[var(--ink)]"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="type-data text-[11px] uppercase tracking-wider text-[var(--ink-muted)] font-mono mr-2">
              Company:
            </span>
            {companiesList.map((comp) => (
              <button
                key={comp}
                onClick={() => setSelectedCompany(comp)}
                className={`type-data text-[11.5px] px-3 py-1 rounded-full border transition-all ${selectedCompany === comp
                    ? "bg-[#111016] text-white dark:bg-white dark:text-[#111016] border-[#111016] dark:border-white font-semibold shadow-xs"
                    : "bg-[#FFFFFF] dark:bg-[var(--surface)] border-[var(--border)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--brand)]"
                  }`}
              >
                {comp}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="type-data text-[11px] uppercase tracking-wider text-[var(--ink-muted)] font-mono mr-2">
              Role:
            </span>
            {rolesList.map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRole(r)}
                className={`type-data text-[11px] px-3 py-0.5 rounded-full border transition-all ${selectedRole === r
                    ? "bg-[#557D70] text-white border-[#557D70] font-semibold shadow-xs"
                    : "bg-[#FFFFFF] dark:bg-[var(--surface)] border-[var(--border)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--brand)]"
                  }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="type-data text-[11px] uppercase tracking-wider text-[var(--ink-muted)] font-mono mr-2">
              College:
            </span>
            {collegesList.map((col) => (
              <button
                key={col}
                onClick={() => setSelectedCollege(col)}
                className={`type-data text-[11px] px-3 py-0.5 rounded-full border transition-all ${selectedCollege === col
                    ? "bg-[var(--brand-bright)] text-white border-[var(--brand-bright)] font-semibold shadow-xs"
                    : "bg-[#FFFFFF] dark:bg-[var(--surface)] border-[var(--border)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--brand)]"
                  }`}
              >
                {col}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between">
          <p className="type-data text-[12px] font-mono text-[var(--ink-muted)]">
            Showing {filteredAlumni.length} placed alumni experience notes
          </p>
        </div>

        {/* Alumni Experience Cards Grid with Paper Collage Rotations */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
          {filteredAlumni.map((alumni, index) => {
            const rotations = ["rotate-[-1deg]", "rotate-[0.5deg]", "rotate-[-0.5deg]", "rotate-[1deg]"];
            const state = connectionStates[alumni.id] || "none";

            return (
              <Reveal key={alumni.id} delay={(index % 3) as 0 | 1 | 2} className="h-full">
                <div
                  className={`group relative flex flex-col justify-between h-full border border-[var(--border)] bg-[#FFFFFF] dark:bg-[var(--surface)] p-7 rounded-sm shadow-card transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:rotate-0 ${rotations[index % rotations.length]
                    }`}
                >
                  <DoodleTape className="absolute -top-2.5 right-10" />

                  <div>
                    {/* Top Header Strip: Verification & Response rate */}
                    <div className="flex items-center justify-between border-b border-[var(--border)] pb-3.5 mb-5">
                      <div className="flex items-center gap-2">
                        <span className="type-data text-[10px] font-mono uppercase px-2 py-0.5 rounded-xs bg-[#4A7768]/10 text-[#4A7768] font-bold border border-[#4A7768]/25">
                          ● VERIFIED PLACED
                        </span>
                      </div>
                      <span className="type-data text-[10.5px] font-mono text-[var(--muted)]">
                        Reply: {alumni.responseRate}
                      </span>
                    </div>

                    {/* Alumni Identity Header */}
                    <div className="flex items-start gap-3.5 mb-4">
                      <div
                        className={`size-12 rounded-full ${alumni.avatarBg} border border-[#111016]/15 flex items-center justify-center type-display text-[18px] font-bold text-[#18161C] shrink-0 shadow-xs`}
                      >
                        {alumni.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h3 className="type-display text-[22px] sm:text-[24px] text-[var(--ink)] leading-snug group-hover:text-[var(--brand)] transition-colors">
                          {alumni.name}
                        </h3>
                        <p className="type-body text-[13.5px] font-semibold text-[var(--brand-bright)] mt-0.5">
                          {alumni.role} @ {alumni.company}
                        </p>
                        <p className="type-data text-[11px] text-[var(--ink-muted)] font-mono">
                          {alumni.college} · {alumni.year} Batch
                        </p>
                      </div>
                    </div>

                    {/* Curated Experience Quote */}
                    <div className="my-4 p-3.5 bg-[#F7F6FB] dark:bg-[var(--surface-elevated)] border border-[var(--hairline-soft)] rounded-xs">
                      <p className="type-body text-[13.5px] leading-relaxed text-[var(--ink)] italic">
                        “{alumni.quote}”
                      </p>
                    </div>

                    {/* Topic Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {alumni.tags.map((tag) => (
                        <span
                          key={tag}
                          className="type-data text-[10.5px] font-mono bg-[var(--brand-soft)]/60 text-[var(--brand-bright)] px-2 py-0.5 rounded-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Rounds + Connect Action */}
                  <div className="mt-7 pt-4 border-t border-[var(--border)] flex items-center justify-between">
                    <span className="type-data text-[11px] font-mono text-[var(--ink-muted)]">
                      {alumni.roundsCount} rounds logged
                    </span>

                    {/* Connect Button States */}
                    <Button
                      size="sm"
                      onClick={() => handleConnectClick(alumni)}
                      className={`rounded-full px-4 py-1.5 text-[12.5px] font-medium transition-all shadow-xs ${state === "connected"
                          ? "bg-[#557D70] hover:bg-[#46695e] text-white"
                          : state === "pending"
                            ? "bg-[var(--brand-soft)] text-[var(--brand-bright)] border border-[var(--brand)] hover:bg-[var(--brand-soft)]"
                            : "bg-[#111016] hover:bg-[var(--brand-bright)] text-white dark:bg-white dark:text-[#111016] dark:hover:bg-[var(--brand)] dark:hover:text-white"
                        }`}
                    >
                      {state === "connected" && (
                        <span className="inline-flex items-center gap-1.5">
                          <Check className="size-3.5" /> Connected
                        </span>
                      )}
                      {state === "pending" && (
                        <span className="inline-flex items-center gap-1.5">
                          <Send className="size-3" /> Request sent
                        </span>
                      )}
                      {state === "none" && (
                        <span className="inline-flex items-center gap-1.5">
                          Connect <ArrowUpRight className="size-3.5" />
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Discovery Footer Note with Tiny Coder Illustration */}
        <div className="mt-14 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <DoodleTinyCoder className="w-12 h-10 text-[#8D6BB3]" />
            <p className="type-body text-[13.5px] text-[var(--ink-muted)]">
              Looking for a specific batch or round? All verified dossiers include interview timeline notes.
            </p>
          </div>
          <span className="type-mono text-[11px] font-semibold text-[#557D70] bg-[#557D70]/10 px-3 py-1 rounded-full">
            ● {filteredAlumni.length} Mentors Online
          </span>
        </div>
      </div>

      {/* Interactive Quick Connect Message Drawer/Modal */}
      {activeModalAlumni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-[#FFFFFF] dark:bg-[var(--surface)] border border-[var(--hairline-strong)] rounded-sm p-6 sm:p-8 shadow-2xl animate-paper-float">
            <button
              onClick={() => setActiveModalAlumni(null)}
              className="absolute right-5 top-5 text-[var(--ink-muted)] hover:text-[var(--ink)]"
            >
              <X className="size-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="size-2 rounded-full bg-[#557D70] animate-pulse" />
              <p className="type-data text-[11px] uppercase tracking-wider text-[var(--brand)] font-mono font-semibold">
                Direct Alumni Message
              </p>
            </div>

            <h3 className="type-display text-[24px] text-[var(--ink)] font-semibold leading-snug">
              Connect with {activeModalAlumni.name}
            </h3>
            <p className="type-body text-[13.5px] text-[var(--ink-muted)] mt-1">
              {activeModalAlumni.role} @ {activeModalAlumni.company} ({activeModalAlumni.college} · {activeModalAlumni.year})
            </p>

            <div className="mt-5">
              <label className="type-data text-[11px] uppercase tracking-wider text-[var(--ink)] font-mono font-semibold block mb-2">
                Your message / question:
              </label>
              <textarea
                rows={4}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="w-full p-3.5 bg-[#FAFAFA] dark:bg-[var(--surface-elevated)] border border-[var(--hairline-strong)] rounded-xs type-body text-[14px] text-[var(--ink)] focus:outline-none focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/20 shadow-inner"
              />
              <span className="type-data text-[10.5px] text-[var(--muted)] block mt-1.5">
                ● Replies are delivered to your student profile inbox within {activeModalAlumni.responseRate}.
              </span>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveModalAlumni(null)}
                className="rounded-full border-[var(--hairline-strong)]"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSendMessage}
                className="rounded-full bg-[var(--brand-bright)] hover:bg-[var(--brand)] text-white px-5"
              >
                Send Request & Start Chat <Send className="size-3.5 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
