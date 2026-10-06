# CLAUDE MEMORY

## 1. Project Identity
**Beyond the Rumour Mill** — CareerTech / Placement Intelligence Platform.
Users: Students, Placed Students/Alumni, Admins.
Core purpose: replace scattered, unreliable placement rumours with structured,
verified student experiences and actionable preparation intelligence.

## 2. Product Vision
"Career intelligence built from real student experiences." A premium,
editorial-feeling CareerTech product — not a college ERP, not a generic
shadcn dashboard.

## 3. Core Problem
Students rely on WhatsApp forwards, half-remembered senior anecdotes, and
stale eligibility info. No verification, no structure, no freshness signal.

## 4. Product Principles
- Nothing is "verified" until an admin confirms it.
- Always show sample size behind aggregated stats — never imply certainty.
- AI (later phase) enhances; it never fabricates experiences/questions/stats.
- LinkedIn is an outbound link only — never scraped, never cloned.

## 5. Technology Stack
**IMPLEMENTED (Phase 1 — frontend only):**
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
next-themes (light/dark) · cmdk (command palette) · lucide-react ·
class-variance-authority · @radix-ui/react-slot · @radix-ui/react-dialog
(via cmdk) · self-hosted fonts via @fontsource-variable/fraunces,
@fontsource-variable/inter-tight, @fontsource/ibm-plex-mono.

**PLANNED (later phases, per spec):** MongoDB + Mongoose, Auth.js/NextAuth,
TanStack Query, Zustand, React Hook Form + Zod, TanStack Table, Tiptap,
Recharts/Nivo, Sonner, GSAP (only where genuinely useful — not used yet).

**NOT YET DECIDED:** whether Motion (framer-motion successor) gets used for
page-load reveals in Phase 2, or held for the Experience/Company editorial
pages where it will matter more.

## 6. Architecture (current)
```
Next.js App Router
  -> Server Components (default)
  -> Client Components: nav, theme toggle, command palette (interaction/state only)
  -> lib/mock-data.ts (typed mock service — stands in for API until Phase 3+)
```
No backend yet. No data fetching layer yet — everything reads from
`src/lib/mock-data.ts` directly.

## 7. Folder Structure
```
src/
  app/            — routes (only "/" exists so far)
  components/
    ui/           — primitives (button.tsx so far)
    layout/       — nav, mobile nav, command palette, logo, theme toggle
    marketing/    — landing page sections
    providers/    — theme-provider
  lib/
    utils.ts      — cn() helper
    nav-data.ts   — nav link source of truth
    mock-data.ts  — typed mock Company/Experience/Question data
```

## 8. Implementation Status
| Feature | Status | Notes |
|---|---|---|
| Design tokens (color/type/spacing) | COMPLETE | See CLAUDE_FRONTEND_MEMORY.md |
| Light/dark theme | COMPLETE | next-themes, class strategy |
| Global nav (desktop) | COMPLETE | Logo, primary links, search trigger, Share CTA, theme toggle, profile |
| Mobile bottom nav | COMPLETE | Home/Explore/Share/Saved/Profile |
| Command palette (⌘K) | COMPLETE | Searches mock companies/experiences/questions; theme toggle action |
| Landing page | COMPLETE | Hero, Problem, How it works, Verification model, Companies ledger, Final CTA |
| Companies, Experiences, Questions pages | TODO | Phase 2+ |
| Auth | TODO | Phase 4 |
| Database / API routes | TODO | Phase 3, 6+ |
| Admin, Preparation, Dashboard | TODO | Later phases |

## 9. Known Issues
- None currently blocking. Google Fonts CDN is unreachable in this sandbox's
  network egress rules, so fonts are self-hosted via @fontsource instead of
  next/font/google — intentional, not a bug (see §5, §Decision Log).
- No live-browser screenshot verification was possible in this sandbox
  session (dev server port binding issues); verified instead via clean
  `tsc --noEmit`, `next build`, and `eslint` passes plus manual review
  against the design checklist.

## 10. Important Constraints
- Frontend only for Phase 1 — no Mongoose/Auth/AI backend yet (explicit user instruction).
- Do not build all 15 phases at once — Phase 1 must be verified before Phase 2 starts.
- No purple/indigo, no gradients, no glassmorphism-by-default, no generic
  "Why choose us" sections — enforced per the design-instruction file.
- Reuse existing components before creating new ones (Button, nav-data, mock-data).

## 11. Decision Log

### Decision: Self-host fonts via @fontsource instead of next/font/google
**Reason:** this sandbox's network policy blocks fonts.googleapis.com, so
next/font/google fails at build time. @fontsource ships the same font files
as an npm package (allowed registry), giving identical rendering with zero
external requests. **Status:** Active — carry this forward into Claude Code
too unless that environment can reach Google Fonts directly.

### Decision: Palette anchored on paper/ink + forest-green "verified" accent
**Reason:** the product's core mechanic is verification; green as the accent
is functional (it's the badge color), not decorative, and avoids the
purple/indigo AI-tell. **Status:** Active.

### Decision: Experience/question repository reads mock data directly, no fetch layer yet
**Reason:** Phase 1 is frontend-only per explicit instruction. TanStack
Query wiring arrives with the real API in a later phase. **Status:** Active,
temporary.

## 12. Next Recommended Task
Phase 2: Companies Explorer (`/companies`) and Company Profile
(`/companies/[companyId]`) — still frontend-only, still on mock data.
