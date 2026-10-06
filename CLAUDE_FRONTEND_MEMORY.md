# CLAUDE FRONTEND MEMORY

Persistent frontend-specific context. Read this before touching any UI —
CLAUDE_MEMORY.md covers product/architecture; this covers design system
and component inventory in detail.

## Design Direction
Editorial / trustworthy CareerTech. Not a dashboard-everywhere product —
Experience, Company, and Profile pages are explicitly editorial (spec §5,
§19). Reference screenshots (User Interviews marketing site) were analyzed
for principles only — asymmetric hero composition, a real illustrated/data
artifact instead of a stat row, restrained motion — and NOT cloned. Palette,
type, and the verification-stamp motif are original to this product.

## Design Tokens (`src/app/globals.css`)
Semantic CSS custom properties, light values in `:root`, dark values under
`.dark` (next-themes `attribute="class"`):

- `--background` / `--foreground` — page base
- `--surface` / `--surface-elevated` — raised panels, alternating section bg
- `--border` (`--hairline`) — all borders route through this
- `--muted` — secondary text
- `--primary` / `--primary-foreground` — ink-on-paper (buttons, active states)
- `--accent` / `--accent-foreground` — forest green, used ONLY for
  verification/success signaling (badges, active nav indicator, hero dot) —
  never as a decorative brand color
- `--success` / `--warning` / `--error` / `--info` — status system,
  `--success` = `--accent` (same green, verification = success)

**Hard rule carried from the design-instruction file:** no purple/indigo as
primary, no gradients (headline or background), no glassmorphism, no
meaningless stat blocks, no emoji in headings. Checked against the vibe-code
checklist before Phase 1 was called done.

## Typography
- Display: **Fraunces Variable** (`--font-display`) — hero headline, section
  theses only. Used sparingly per `.type-display` / `.type-h1` / `.type-h2`.
- Body: **Inter Tight Variable** (`--font-sans`) — everything else.
- Data: **IBM Plex Mono** (`--font-mono`) — reserved for numbers only:
  percentages, sample sizes, timestamps, counts, ⌘K shortcut. Never used for
  prose.
- Fonts are **self-hosted via @fontsource** (not next/font/google) — see
  CLAUDE_MEMORY.md Decision Log for why. Imported once in `src/app/layout.tsx`.
- Utility classes: `.type-display .type-h1 .type-h2 .type-h3 .type-body
  .type-body-lg .type-small .type-caption .type-data` — use these instead of
  ad-hoc `font-family`/`font-weight` declarations.

## Component Inventory (don't recreate — extend/reuse)
- `components/ui/button.tsx` — `Button` with variants
  `primary | outline | ghost | accent | link`, sizes
  `default | sm | lg | icon`. This is the ONLY button primitive — do not add
  a second one.
- `components/layout/logo.tsx` — verification-seal wordmark, responsive
  (`Beyond the Rumour Mill` → `Rumour Mill` under `sm:`).
- `components/layout/site-nav.tsx` — desktop header, sticky, backdrop-blur.
  Search trigger and mobile search icon both carry `data-command-trigger`
  (see command palette below) — any future search entry point should reuse
  this attribute rather than wiring its own click handler.
- `components/layout/mobile-nav.tsx` — bottom nav, safe-area aware.
- `components/layout/command-palette.tsx` — cmdk `Command.Dialog`. Opens on
  ⌘K/Ctrl+K or any `[data-command-trigger]` click. Currently searches
  `lib/mock-data.ts` companies/experiences/questions client-side (no fuzzy
  search yet — cmdk's default filter). Wire to real search once an API
  exists; keep the same group structure (Companies/Experiences/Questions/Actions).
- `components/layout/theme-toggle.tsx` — icon button, Moon/Sun via
  lucide-react, mount-guarded for SSR-safe hydration.
- `components/marketing/*` — landing page sections (`hero`, `problem-section`,
  `how-it-works`, `verification-model`, `companies-strip`, `final-cta`). Each
  has an intentionally different composition (asymmetric grid / prose /
  numbered sequence / status list / ledger list / left-aligned CTA) — do NOT
  collapse these into a shared `<Section><Card/></Section>` pattern; that's
  exactly the "component factory" anti-pattern the design brief forbids.
- `lib/nav-data.ts` — single source of truth for nav links (`primaryNav`,
  `mobileNav`). Add new routes here, not inline in nav components.
- `lib/mock-data.ts` — typed `Company`, `Experience`, `InterviewQuestion`
  mocks + `VerificationStatus` union. This is what every page should read
  from until a real API exists. Extend this file for new mock records rather
  than inlining data in page components.
- `lib/utils.ts` — `cn()` (clsx + tailwind-merge). Use for all conditional
  class logic.

## Responsive
Breakpoints used: default (mobile) / `sm:` (640px, search icon swap) /
`md:` (768px, desktop nav appears, mobile nav hides) — matches spec's
mobile-first requirement. Not yet stress-tested at 1440px+ for the landing
page's wider grid columns — check this in Phase 2 when more pages exist to
compare against.

## Motion
None used yet in Phase 1 beyond CSS `transition-colors` on hover/focus
states. GSAP/Motion intentionally deferred to pages where it earns its
place (Experience timeline reveal, Company interview-pattern chart) rather
than added preemptively to the landing page.

## Verification Notes (Phase 1)
`tsc --noEmit`, `next build`, and `eslint` all pass clean. Live dev-server
screenshot verification was not possible in this sandbox (port-binding
issue in the container); reviewed instead by reading every component
against the vibe-code checklist. **Re-run a real desktop/mobile screenshot
pass in Claude Code or locally before treating Phase 1 as fully closed.**

## Revision: Warmer, illustrated direction (post-Phase-1 feedback)
Per explicit user direction, pulled the visual language much closer to a
warm illustrated reference (rounded pills, cream + teal, hand-drawn accents)
rather than the original cooler editorial-ledger look:

- **Palette shift:** `--primary`/`--accent` now teal (`#16755f` light /
  `#56b791` dark) instead of ink-black; added `--paper-tint` (warm pink-cream,
  `#f3e9e2`) for alternating section bands; added `--band` (dark teal-ink,
  `#12211d`) for a colored closing-CTA section; `--hairline` repurposed to
  mean a **crisp near-black border** (`--border-strong`) for "sketch box"
  panels, while `--hairline-soft` covers ordinary quiet dividers.
- **Shape:** `Button` is now `rounded-full` (pill) by default — this is a
  breaking visual change from Phase 1's `rounded-md`. New `outline-light`
  variant added for buttons on dark bands.
- **Doodle accents:** `components/marketing/doodles.tsx` — original
  hand-drawn-style SVGs (star, swoosh, dots, underline), stroke-only, tied to
  `--accent`/`--ink`. Use sparingly (1–2 per section max) — do not let this
  become a repeated pattern per the design brief's own restraint rule.
- **Default theme is now light** (`defaultTheme="light"`, `enableSystem={false}`
  in `ThemeProvider`) — the warm palette is the primary design; dark mode
  still exists and uses the same token names but is secondary, not equally
  designed. Revisit dark-mode band/tint colors in Phase 2 if it gets more use.
- **IMPORTANT — do not literally clone the reference site.** The direction
  (teal/cream/pills/hand-drawn accents) is intentionally borrowed; the
  specific illustrations, copy, and logo are original to this product. Keep
  building new doodle assets rather than importing/tracing the reference's
  actual SVGs.

## Revision 2: Brand purple + fuller illustrations (explicit user override)
User explicitly requested purple as the brand color, overriding the design
brief's own hard ban ("purple is the single biggest AI-slop tell"). Per that
same brief's own escape clause ("if the client genuinely wants it, the brief
wins — execute with care"), implemented as follows:

- **`--brand` (`#4f2f7a` light / `#9b7fd4` dark) is now `--primary`/`--accent`**
  — drives buttons, the hero's italic accent word, the logo mark, and the
  closing CTA band (`--band` is now deep purple-ink, not teal-ink).
- **`--verified` (green) is deliberately kept separate from brand color** —
  it is used ONLY for "Verified"/status badges (hero card, trust-model
  section, companies list). This is intentional UX practice, not a
  half-applied purple: don't "finish the job" by making verified badges
  purple too, that would remove the status signal.
- **`--paper-tint` shifted from pink-cream to a warm lilac-cream** (`#f1e9f4`)
  to stay in the same family as the new brand color.
- **New illustrations** (`components/marketing/illustrations.tsx`):
  `PersonWithLaptopIllustration` (hero), `CertificateIllustration` (trust
  model section), `GrowthIllustration` (closing CTA band). These are fuller
  line-art figures (not just accent doodles) — original compositions using
  basic shapes, purple stroke/fill, aimed at the "premium illustrated" feel
  the user asked for. Extend this file for future illustration needs rather
  than starting a third illustration system.

## Revision 2: Purple brand + full illustrated figures (explicit user direction)
User explicitly asked for purple in place of the teal accent, plus fuller
illustrated artwork (not just line-doodle accents). Both applied:

- **Palette:** `--brand` (deep plum `#4f2f7a` light / lavender `#9b7fd4`
  dark) now drives `--primary`/`--accent` everywhere — buttons, the italic
  headline word, active nav state, doodle strokes. **Kept `--verified` as
  its own green**, deliberately decoupled from the brand color — a
  verification checkmark reads as a trust signal precisely because it isn't
  the same hue as every other purple element on the page. This is a
  one-line deviation from the "single accent color" idea in the original
  design-instruction file — flagged, not silently changed.
- **Illustrations** (`components/marketing/illustrations.tsx`): three fuller
  original line-art figures — `PersonWithLaptopIllustration` (hero),
  `CertificateIllustration` (trust-model section), `GrowthIllustration`
  (closing band). Same sketch-stroke language as the doodle accents but
  larger, with actual figures/objects rather than abstract marks.
- **Known gotcha, already handled:** `GrowthIllustration` sits on the
  `final-cta` band, which forces a dark background regardless of the active
  theme. Its strokes use `var(--ink)`, which stays dark in light mode — so
  it's wrapped in a `<div style={{ '--ink': '#fff', ... }}>` to locally
  override the CSS vars for that one instance. **If you add another
  illustration to a forced-dark surface, use this same scoped-override
  pattern** rather than fighting it with Tailwind child selectors.
