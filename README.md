# Beyond the Rumour Mill

### Connecting placed alumni with tomorrow's talent.

> Real placement experiences, real questions, real people — turning campus rumours into useful career intelligence.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-13.4.0-FF0055?style=for-the-badge&logo=framer)](https://motion.dev/)
[![Architecture](https://img.shields.io/badge/Architecture-Frontend--First-7B5BF2?style=for-the-badge)]()
[![Status](https://img.shields.io/badge/Status-Active_Prototype-success?style=for-the-badge)]()

---

## 📖 Table of Contents

- [Project Overview](#-project-overview)
- [Why This Exists](#-why-this-exists)
- [Core Idea](#-core-idea)
- [Key Features](#-key-features)
- [Product Experience & Pages](#-product-experience--pages)
- [Editorial Design System](#-editorial-design-system)
- [Illustration & Asset System](#-illustration--asset-system)
- [Animation & Interaction Architecture](#-animation--interaction-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Current Frontend Capabilities vs. Planned Backend](#-current-frontend-capabilities-vs-planned-backend)
- [Local Development](#-local-development)
- [Environment Variables](#-environment-variables)
- [Current Status](#-current-status)
- [Future Roadmap](#-future-roadmap)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [Author & Acknowledgements](#-author--acknowledgements)

---

## 🌟 Project Overview

**Beyond the Rumour Mill** is an editorial-grade career platform engineered to bridge the critical gap between:

1. **Placed Alumni & Senior Students** who have navigated rigorous corporate placement seasons, technical assessments, coding interviews, and HR rounds.
2. **Pre-final & Aspiring Students** who are actively preparing for upcoming placement cycles and currently rely on fragmented, unverified WhatsApp forwards, Discord threads, and second-hand campus hearsay.

The platform transforms scattered rumors into **structured, high-signal placement intelligence**, documenting round-by-round interview breakdowns, algorithmic questions asked, technical domains tested, consensus difficulty ratings, and eventually connecting candidates directly with experienced alumni mentors.

---

## 🎯 Why This Exists

During campus placement seasons, students routinely face an overwhelming fog of misinformation:
- **Unverified Whispers**: "Company X only asks DP hard problems," or "Company Y has 5 secret elimination rounds."
- **Recency Bias & Panic**: Junior students preparing blindly without knowing the actual evaluation parameters.
- **Disconnected Alumni Networks**: Placed seniors eager to guide their juniors lack a dedicated, structured medium beyond sporadic LinkedIn messages.

**Beyond the Rumour Mill** replaces anxiety with clarity by archiving verified candidate dossiers and enabling curated alumni discovery.

---

## 💡 Core Idea

```
   CAMPUS NOISE                     BEYOND THE RUMOUR MILL                 CAREER OUTCOME
┌──────────────────┐               ┌──────────────────────────┐          ┌───────────────────┐
│ Unverified Rumors│  ──────────►  │ Structured Round Dossiers│  ──────► │ Confident, Target-│
│ WhatsApp Chunks  │  Filter &     │ Verified Coding Questions│          │ Ready Candidates  │
│ Discord Threads  │  Authenticate │ Placed Alumni Discovery  │          │ & Mentorship Pairs│
└──────────────────┘               └──────────────────────────┘          └───────────────────┘
```

1. **Verify the Signal**: Archive real question sets, assessment patterns, and round structures from verified candidates.
2. **Reconcile Consensus**: Aggregate multiple candidate records from the same company hiring season to surface reliable consensus on round formats and bar criteria.
3. **Pass the Torch**: Provide a seamless discovery space to connect with placed alumni working across Software Engineering, Quantitative Analysis, Product Management, Data Science, and Analytics.

---

## ✨ Key Features

### 📰 1. Editorial Homepage & Scrollytelling
- **Dynamic Hero**: Pure, uncluttered editorial illustration featuring interactive parallax, subtle floating physics, and hand-drawn sparkle accents.
- **Company Strip**: Interactive marquee and directory showcasing placement records across top hiring partners (Google, Microsoft, Amazon, Uber, Atlassian, Oracle, DE Shaw, and more).
- **The Problem Section (`FIG 02`)**: Editorial breakdown contrasting unstructured campus noise against structured signal.
- **Documenting Experience (`FIG 04`)**: Interactive round breakdown previews with difficulty tags, time limits, and topic tags.
- **Verification Model (`FIG 08`)**: Side-by-side reconciliation displaying hearsay vs. verified multi-candidate consensus.
- **Editorial Experience Dossiers**: Interactive cards previewing detailed round summaries, question lists, candidate verdicts, and preparation takeaways.

### 🤝 2. Alumni Connect & Discovery Hub (`/connect`)
- **Alumni Mentorship Showcase**: Searchable and filterable directory of placed seniors by company, domain, college batch, and expertise.
- **Direct Engagement CTAs**: Interface for scheduling 1-on-1 prep chats, mock interview requests, resume critiques, and referral requests.
- **Interactive Conversation Preview**: Realistic chat transcript showing an incoming applicant receiving round-specific guidance from a placed Google SWE alumni.
- **4-Stage Connection Journey**: Clear visual breakdown of Candidate Exploration $\rightarrow$ Structured Request $\rightarrow$ Synchronous Discussion $\rightarrow$ Actionable Career Blueprint.

### 🔐 3. Authentication Flow (`/login` & `/signup`)
- **Editorial Auth Shell**: Clean split-screen authentication architecture with dedicated editorial character illustrations.
- **OAuth Mock Flows**: One-click Google and LinkedIn single-sign-on (SSO) simulation.
- **Role Selection**: Toggle between *Aspirant / Student* and *Placed Alumni / Senior Contributor*.
- **Interactive Feedback**: Polished notifications confirming authentication state and guided next steps.

### 🎨 4. Design & Interaction Polish
- **Global Theme Engine**: First-class support for both pristine paper-light and sleek dark modes with smooth transitions via `next-themes`.
- **Command Palette (`Cmd+K` / `Ctrl+K`)**: Instant navigation across home sections, interview archives, alumni directory, and authentication.
- **Responsive Mobile Navigation**: Touch-friendly slide-over drawer with spring physics.
- **Hand-Drawn Vector Doodles**: High-fidelity SVG doodles (curved arrows, washi tape, stars, sparkles, scribbles, underline swirls).

---

## 🎨 Editorial Design System

The application is styled with a bespoke **Editorial Publication Design System**, blending traditional print journalism aesthetics with modern web interactions:

| Token | Light Mode | Dark Mode | Usage |
| :--- | :--- | :--- | :--- |
| **Canvas** | `#FAFAFC` (Crisp Paper) | `#0E0D13` (Deep Obsidian) | Primary page background |
| **Surface** | `#FFFFFF` (Pure White) | `#171520` (Elevated Charcoal) | Card containers & panels |
| **Brand Accent** | `#7B5BF2` (Lavender Violet) | `#9B82F6` (Electric Iris) | Primary buttons, active tabs, links |
| **Brand Soft** | `#F0EAF7` (Blush Lilac) | `#2A223D` (Muted Violet) | Badges, pills, highlights |
| **Ink** | `#1A1824` (Deep Charcoal) | `#F4F3F8` (Crisp White) | Headlines, primary text |
| **Ink Muted** | `#6B687B` (Slate Ash) | `#A3A0B3` (Soft Heather) | Captions, metadata, subtitles |
| **Hairline** | `#E8E6F0` (Subtle Lavender) | `#2B283A` (Dark Border) | Editorial borders & dividers |

### Typography Hierarchy
- **Display Serif**: `Fraunces Variable` — warm, characterful editorial serif used for major headlines, figure titles, and quote blocks.
- **Body Sans**: `Inter Tight Variable` — razor-sharp grotesque sans-serif engineered for high-density reading and UI controls.
- **Data Mono**: `IBM Plex Mono` — technical monospace font for round badges, timestamps, figures (`FIG 01`, `FIG 02`), and tags.

---

## 🖼️ Illustration & Asset System

All illustrations are curated, hand-drawn editorial ink-and-watercolor artworks that embody warmth, collaboration, and human mentorship:

1. **Hero Collaboration (`public/assets/hero-editorial-illustration.png`)**: Two students working side-by-side with notebook and laptop under ambient star accents.
2. **Campus Walking (`public/assets/campus-walking.png`)**: Two students in conversation walking across campus (`FIG 02: The Noise`).
3. **Desk Interview Notes (`public/assets/desk-interview-notes.png`)**: Peer interview preparation and question review (`FIG 04: Discovery`).
4. **Round Table Discussion (`public/assets/round-table-discussion.png`)**: Multi-record verification and consensus gathering (`FIG 08: Verification`).
5. **Mentor-Mentee Pair (`public/assets/mentor-mentee-pair.png`)**: Candidate and placed alumni collaborating over laptop (`/connect` Hero).

---

## ⚡ Animation & Interaction Architecture

- **Reveal on Scroll**: Custom viewport observer (`src/components/marketing/reveal.tsx`) triggering fluid slide-up and fade-in transitions.
- **Hanging & Floating Physics**: Multi-layered CSS keyframe animations simulating physical hanging placards, paper notes, and floating tape badges.
- **Smooth Theme Transitions**: Zero-flicker CSS variable interpolation across light and dark modes.
- **Page Transitions**: Route-level entrance animations powered by Motion (`motion/react`).

---

## 🛠️ Tech Stack

### Frontend Core
- **Framework**: [Next.js 16.3.5](https://nextjs.org/) (App Router, Turbopack, Server & Client Components)
- **Library**: [React 19.2.8](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict typing across components, nav, and mock data)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with PostCSS integration
- **Motion & Physics**: [Motion 13.4.0](https://motion.dev/) (Framer Motion)
- **UI Primitives**:
  - Radix UI Dialog ([@radix-ui/react-dialog](https://www.radix-ui.com/primitives/docs/components/dialog))
  - Radix UI Dropdown Menu ([@radix-ui/react-dropdown-menu](https://www.radix-ui.com/primitives/docs/components/dropdown-menu))
  - Radix UI Slot ([@radix-ui/react-slot](https://www.radix-ui.com/primitives/docs/components/slot))
  - CMDK ([cmdk](https://cmdk.paco.me/)) for Command Palette
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**:
  - `@fontsource-variable/fraunces`
  - `@fontsource-variable/inter-tight`
  - `@fontsource/ibm-plex-mono`
- **Theme Management**: [next-themes](https://github.com/pacocoursey/next-themes)

---

## 📁 Project Structure

```
beyond-the-rumour-mill/
├── public/
│   ├── assets/                             # Hand-drawn editorial illustration assets
│   │   ├── hero-editorial-illustration.png # Hero collaboration illustration
│   │   ├── campus-walking.png              # Problem section illustration
│   │   ├── desk-interview-notes.png        # Discovery section illustration
│   │   ├── round-table-discussion.png      # Verification model illustration
│   │   └── mentor-mentee-pair.png          # Connect hero illustration
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   └── vercel.svg
├── src/
│   ├── app/                                # Next.js App Router routes & layouts
│   │   ├── connect/                        # Alumni connect page route
│   │   │   └── page.tsx
│   │   ├── login/                          # Authentication / login route
│   │   │   └── page.tsx
│   │   ├── signup/                         # Registration route
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css                     # Design tokens, fonts, and keyframes
│   │   ├── layout.tsx                      # Root layout with fonts, theme, & nav
│   │   └── page.tsx                        # Master editorial homepage
│   ├── components/
│   │   ├── auth/                           # Login, signup, auth shell, & toasts
│   │   │   ├── auth-illustrations.tsx
│   │   │   ├── auth-shell.tsx
│   │   │   ├── auth-toast.tsx
│   │   │   ├── login-form.tsx
│   │   │   └── signup-form.tsx
│   │   ├── connect/                        # Alumni directory & connect features
│   │   │   ├── alumni-discovery.tsx
│   │   │   ├── connect-final-cta.tsx
│   │   │   ├── connect-hero.tsx
│   │   │   ├── connect-process.tsx
│   │   │   └── conversation-showcase.tsx
│   │   ├── layout/                         # Navigation, footer, command palette
│   │   │   ├── command-palette.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── logo.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   ├── site-nav.tsx
│   │   │   └── theme-toggle.tsx
│   │   ├── marketing/                      # Editorial homepage sections & figures
│   │   │   ├── companies-strip.tsx
│   │   │   ├── doodles.tsx                 # SVG hand-drawn stars, arrows, tape
│   │   │   ├── editorial-sections.tsx
│   │   │   ├── final-cta.tsx
│   │   │   ├── hero.tsx
│   │   │   ├── hero-illustration-interactive.tsx
│   │   │   ├── how-it-works.tsx
│   │   │   ├── illustrations.tsx           # Figure scene wrappers
│   │   │   ├── problem-section.tsx
│   │   │   ├── reveal.tsx
│   │   │   ├── scroll-story.tsx
│   │   │   └── verification-model.tsx
│   │   ├── providers/                      # Theme and page transition providers
│   │   │   ├── page-transition.tsx
│   │   │   └── theme-provider.tsx
│   │   └── ui/                             # Base UI components
│   │       └── button.tsx
│   ├── hooks/                              # Custom React utility hooks
│   └── lib/                                # Navigation data, mock dossiers, & utils
│       ├── mock-data.ts
│       ├── nav-data.ts
│       └── utils.ts
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

---

## ⚖️ Current Frontend Capabilities vs. Planned Backend

| Feature Domain | Current Frontend Implementation | Planned Backend Implementation |
| :--- | :--- | :--- |
| **Placement Archive** | Interactive client-side dossiers with full round data & questions | Server-side database (PostgreSQL/Prisma), full-text search, company filtering |
| **Alumni Directory** | Searchable mock alumni dataset with domain & company filters | Authenticated alumni profiles, LinkedIn identity verification, availability calendar |
| **Mentorship Requests** | Interactive UI state with simulated submission & toasts | Real-time messaging, WebSocket notification engine, Google Meet / calendar sync |
| **Authentication** | Simulated email/password and OAuth (Google / LinkedIn) flows | NextAuth.js / Supabase Auth with university email (`.edu`/`.ac.in`) verification |
| **Experience Submissions** | Multi-round editorial contribution form previews | Multi-step review workflow, anonymization pipeline, automated peer-consensus checks |

---

## 🚀 Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) version `18.18.0` or higher (Node 20+ recommended)
- `npm`, `yarn`, or `pnpm`

### 1. Clone the Repository
```bash
git clone https://github.com/Jyatin/beyond-the-rumour-mill.git
cd beyond-the-rumour-mill
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the platform.

### 4. Build for Production
To compile and test the optimized production build:
```bash
npm run build
npm run start
```

---

## 🔒 Environment Variables

The current frontend prototype runs entirely client-side without required environment variables for local testing.

When connecting future backend and auth providers, a `.env.example` will be provided:
```env
# Planned Future Providers
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=postgresql://user:password@localhost:5432/rumour_mill
NEXTAUTH_SECRET=your_auth_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
```

---

## 📌 Current Status

> **Frontend-First Prototype**: All pages (`/`, `/connect`, `/login`, `/signup`), editorial scrollytelling sections, illustration assets, dark/light themes, and interactions are fully functional in the frontend. Backend services, database persistence, real alumni connections, and production authentication providers are slated for the subsequent release phase.

---

## 🗺️ Future Roadmap

```
Phase 1: Editorial Frontend & Architecture (Completed ✓)
├── ✓ Bespoke editorial design system & typography
├── ✓ Responsive interactive hero & illustration collage
├── ✓ Placement experience archive & round breakdown cards
├── ✓ Scrollytelling & consensus verification model (FIG 01-08)
├── ✓ Alumni discovery directory & conversation showcase (/connect)
├── ✓ Authentication flow & role-selection UI (/login, /signup)
├── ✓ Global theme engine (Pristine Paper Light / Obsidian Dark)
└── ✓ Command palette navigation (Cmd+K)

Phase 2: Backend, Authentication & Live Mentorship (Upcoming →)
├── → Relational database integration (PostgreSQL / Supabase)
├── → University email verification & OAuth identity providers
├── → Candidate experience submission & peer moderation queue
├── → Live 1-on-1 mentorship scheduling & integrated video links
├── → Real-time messaging & query channels
└── → PDF export of company placement dossiers
```

---

## 📸 Screenshots

| Editorial Homepage | Alumni Discovery (`/connect`) |
| :---: | :---: |
| *Master hero with interactive editorial collage & company archives* | *Alumni search, mentorship filters & conversation preview* |

| Light Mode | Dark Mode |
| :---: | :---: |
| *Crisp paper aesthetic with purple ink accents* | *Deep obsidian surface with radiant lavender contrast* |

---

## 🤝 Contributing

Contributions, feature suggestions, and design feedback are welcome!

1. Fork the Project (`https://github.com/Jyatin/beyond-the-rumour-mill/fork`)
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👤 Author & Acknowledgements

- **Created by**: [Jyatin](https://github.com/Jyatin)
- **Project**: Beyond the Rumour Mill
- **GitHub Repository**: [https://github.com/Jyatin/beyond-the-rumour-mill](https://github.com/Jyatin/beyond-the-rumour-mill)

---

<div align="center">
  <sub>Built with craftsmanship for students and alumni everywhere.</sub>
</div>
