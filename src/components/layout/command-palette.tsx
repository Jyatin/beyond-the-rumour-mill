"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  Building2,
  FileText,
  HelpCircle,
  Share2,
  User,
  Bookmark,
  SunMoon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { companies, experiences, questions } from "@/lib/mock-data";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) ) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    function onTriggerClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest("[data-command-trigger]");
      if (target) setOpen(true);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onTriggerClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onTriggerClick);
    };
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Search everything"
      overlayClassName="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]"
      contentClassName="fixed left-1/2 top-[14%] z-50 w-[92vw] max-w-[560px] -translate-x-1/2 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-[0_16px_48px_rgba(0,0,0,0.18)]"
    >
      <div className="flex items-center border-b border-[var(--border)] px-4">
        <Command.Input
          placeholder="Search companies, experiences, or questions..."
          className="h-12 w-full bg-transparent type-body text-[14px] outline-none placeholder:text-[var(--muted)]"
        />
      </div>
      <Command.List className="max-h-[60vh] overflow-y-auto p-2">
        <Command.Empty className="type-caption px-3 py-6 text-center text-[13px]">
          No results found.
        </Command.Empty>

        <Command.Group
          heading="Companies"
          className="type-caption px-2 pt-2 pb-1 text-[11px] uppercase tracking-wide [&_[cmdk-group-heading]]:px-1 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:type-caption [&_[cmdk-group-heading]]:text-[11px]"
        >
          {companies.map((c) => (
            <Command.Item
              key={c.id}
              onSelect={() => go(`/companies/${c.id}`)}
              className="flex items-center gap-2.5 rounded-md px-2.5 py-2 type-body text-[13.5px] cursor-pointer aria-selected:bg-[var(--surface-elevated)]"
            >
              <Building2 className="size-4 text-[var(--muted)]" />
              {c.name}
              <span className="type-caption text-[12px] ml-auto">
                {c.roles[0]}
              </span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Experiences" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:type-caption [&_[cmdk-group-heading]]:text-[11px]">
          {experiences.map((e) => (
            <Command.Item
              key={e.id}
              onSelect={() => go(`/experiences/${e.id}`)}
              className="flex items-center gap-2.5 rounded-md px-2.5 py-2 type-body text-[13.5px] cursor-pointer aria-selected:bg-[var(--surface-elevated)]"
            >
              <FileText className="size-4 text-[var(--muted)]" />
              {e.companyName} · {e.role} {e.year}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Questions" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:type-caption [&_[cmdk-group-heading]]:text-[11px]">
          {questions.map((q) => (
            <Command.Item
              key={q.id}
              onSelect={() => go(`/questions#${q.id}`)}
              className="flex items-center gap-2.5 rounded-md px-2.5 py-2 type-body text-[13.5px] cursor-pointer aria-selected:bg-[var(--surface-elevated)]"
            >
              <HelpCircle className="size-4 text-[var(--muted)]" />
              <span className="truncate">{q.text}</span>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Actions" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:type-caption [&_[cmdk-group-heading]]:text-[11px]">
          <Command.Item
            onSelect={() => go("/experiences/share")}
            className="flex items-center gap-2.5 rounded-md px-2.5 py-2 type-body text-[13.5px] cursor-pointer aria-selected:bg-[var(--surface-elevated)]"
          >
            <Share2 className="size-4 text-[var(--muted)]" />
            Share Experience
          </Command.Item>
          <Command.Item
            onSelect={() => go("/profile")}
            className="flex items-center gap-2.5 rounded-md px-2.5 py-2 type-body text-[13.5px] cursor-pointer aria-selected:bg-[var(--surface-elevated)]"
          >
            <User className="size-4 text-[var(--muted)]" />
            Open Profile
          </Command.Item>
          <Command.Item
            onSelect={() => go("/saved")}
            className="flex items-center gap-2.5 rounded-md px-2.5 py-2 type-body text-[13.5px] cursor-pointer aria-selected:bg-[var(--surface-elevated)]"
          >
            <Bookmark className="size-4 text-[var(--muted)]" />
            Saved Experiences
          </Command.Item>
          <Command.Item
            onSelect={() => {
              setTheme(resolvedTheme === "dark" ? "light" : "dark");
              setOpen(false);
            }}
            className="flex items-center gap-2.5 rounded-md px-2.5 py-2 type-body text-[13.5px] cursor-pointer aria-selected:bg-[var(--surface-elevated)]"
          >
            <SunMoon className="size-4 text-[var(--muted)]" />
            Toggle Theme
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
