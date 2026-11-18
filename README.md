# Beyond the Rumour Mill

<p align="center">
  <strong>Turn placement uncertainty into career clarity.</strong>
  <br />
  A community-driven platform for structured interview experiences, placement intelligence, and meaningful alumni connections.
</p>

<p align="center">
  <a href="https://github.com/Jyatin/beyond-the-rumour-mill"><img src="https://img.shields.io/badge/Project-Beyond%20the%20Rumour%20Mill-6D5AE6?style=flat-square" alt="Project" /></a>
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=flat-square&logo=postgresql" alt="PostgreSQL" />
</p>

<p align="center">
  <a href="#overview">Overview</a> ·
  <a href="#why-beyond-the-rumour-mill">Why it matters</a> ·
  <a href="#what-the-platform-is-building">Features</a> ·
  <a href="#technology">Technology</a> ·
  <a href="#getting-started">Getting started</a> ·
  <a href="#contributing">Contributing</a>
</p>

---

## Overview

**Beyond the Rumour Mill** is a placement intelligence and alumni-connect platform designed to make career preparation more transparent and evidence-led.

Students often prepare for hiring processes using scattered messages, outdated interview questions, and second-hand accounts. The platform brings this information into one structured space—organising interview experiences by company, role, hiring cycle, and round while creating a path for students to learn directly from people who have already been through the process.

The goal is simple: **replace campus hearsay with useful, contextual, and verifiable career knowledge.**

## Why Beyond the Rumour Mill?

Placement information is valuable, but it is rarely easy to find or assess.

- **Fragmented knowledge:** Interview experiences are spread across chats, documents, and personal conversations.
- **Unclear reliability:** Students often cannot tell whether an account is first-hand, recent, or independently corroborated.
- **Repeated questions:** Alumni receive the same preparation questions individually, with little shared context.
- **Limited access to guidance:** Students may struggle to find relevant seniors based on company, role, or experience.

Beyond the Rumour Mill is being built to bring these signals together in a structured, searchable, and community-oriented product.

## What the Platform Is Building

### Interview experience intelligence

- Company- and role-specific interview experiences.
- Round-by-round summaries, topics, difficulty, and reported questions.
- Hiring-cycle context to help readers judge relevance.
- Structured records that can be reviewed and compared.

### Evidence and verification

- Support for evidence-backed experience and employment verification.
- Clear verification states to distinguish verified information from community contributions.
- Moderation and reporting foundations for handling questionable or outdated content.
- A data model for consolidating repeated topics and interview questions.

### Alumni and mentorship

- Alumni profiles with professional and academic context.
- Discovery foundations for finding relevant mentors.
- Mentorship requests and mock-interview scheduling workflows.
- Student questions and alumni answers with context about the source of the response.

### Placement preparation

- Company and role information.
- Placement-drive and eligibility data.
- Preparation topics and resources.
- Personal preparation items and progress tracking foundations.

> **Development note:** The repository is under active development. Some areas have working application flows, while others are represented by backend, database, or product foundations still being integrated. The feature list describes the product direction and implemented foundations—not a claim that every workflow is production-ready.

## How It Fits Together

```text
  STUDENT / ALUMNI CONTRIBUTIONS
              |
              v
  Structured experiences, questions,
  answers and supporting evidence
              |
              v
  REVIEW, NORMALISATION & MODERATION
              |
              v
  SEARCHABLE PLACEMENT INTELLIGENCE
              |
       +------+------+
       |             |
       v             v
  Better-prepared   Alumni guidance,
  candidates        mentorship & mock interviews
```

The platform is designed around structured contributions rather than isolated anecdotes. Company, role, hiring cycle, interview round, topic, and verification context help make information easier to interpret and reuse.

## Technology

| Layer | Technologies |
| --- | --- |
| Application | Next.js 16, React 19, TypeScript |
| Styling & UI | Tailwind CSS 4, Radix UI, Lucide |
| Interaction | Motion, CMDK |
| Authentication | Better Auth |
| Database | PostgreSQL 16 |
| Data access & migrations | Drizzle ORM, Drizzle Kit |
| Email | Resend integration |
| File storage | Vercel Blob integration |
| Testing | Vitest |
| Code quality | ESLint, TypeScript |
| CI | GitHub Actions |
| Local infrastructure | Docker Compose |

## Architecture at a Glance

The application uses the **Next.js App Router** with a clear separation between the user interface and server-side capabilities.

- **App layer:** Routes, layouts, and page composition.
- **Component layer:** Reusable interface components grouped by product area.
- **Server layer:** Authentication, database access, and server-side services.
- **Data layer:** PostgreSQL schema managed with Drizzle ORM.
- **Quality layer:** Automated linting, type-checking, integration tests, and production builds in CI.

The database model covers users and profiles, companies, placement drives, interview experiences, questions and answers, evidence, moderation, mentorship, notifications, and structured interview-intelligence data.

## Repository Structure

```text
beyond-the-rumour-mill/
├── .github/
│   └── workflows/
│       └── ci.yml              # Continuous integration workflow
├── drizzle/                    # Generated database migrations
├── public/                     # Static assets
├── scripts/
│   └── seed.ts                 # Development database seeding
├── src/
│   ├── app/                    # Next.js routes and layouts
│   ├── components/             # Reusable UI and product components
│   ├── hooks/                  # Shared React hooks
│   ├── lib/                    # Shared utilities and application data
│   └── server/
│       ├── auth.ts             # Better Auth configuration
│       └── db/
│           ├── index.ts        # Drizzle database client
│           └── schema.ts       # PostgreSQL schema
├── .env.example                # Environment variable template
├── docker-compose.yml          # Local PostgreSQL service
├── drizzle.config.ts           # Drizzle Kit configuration
├── package.json
└── README.md
```

*The tree highlights the main application boundaries; individual feature files and modules may evolve as development continues.*

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm
- Docker Desktop (for the local PostgreSQL database)

### 1. Clone the repository

```bash
git clone https://github.com/Jyatin/beyond-the-rumour-mill.git
cd beyond-the-rumour-mill
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a local environment file from the example:

```bash
cp .env.example .env
```

Update the values in `.env` for your local setup. Never commit real credentials or API keys.

### 4. Start PostgreSQL

```bash
docker compose up -d
```

The Compose configuration exposes PostgreSQL on port `54320`.

### 5. Prepare the database

For a fresh local database, push the Drizzle schema and seed the development data:

```bash
npm run db:push
npm run db:seed
```

### 6. Run the application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

The repository includes an `.env.example` file. The main configuration groups are:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `BETTER_AUTH_SECRET` | Secret used by Better Auth |
| `BETTER_AUTH_URL` | Base URL for the application authentication server |
| `RESEND_API_KEY`, `EMAIL_FROM` | Outbound email configuration |
| `AI_PROVIDER`, `AI_MODEL`, `AI_API_KEY` | AI-assisted extraction configuration |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | Optional Google sign-in |
| `LINKEDIN_CLIENT_ID`, `LINKEDIN_CLIENT_SECRET` | Optional LinkedIn sign-in |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage access |
| `STORAGE_DIR` | Optional local storage directory |

Only configure integrations you intend to use. Keep secrets in your local environment or deployment provider—not in source control.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run the Vitest test suite |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:migrate` | Apply database migrations |
| `npm run db:push` | Push the schema to the database |
| `npm run db:seed` | Seed development data |
| `npm run db:studio` | Open Drizzle Studio |

Before submitting a change, run the relevant checks:

```bash
npm run lint
npx tsc --noEmit
npm run test
npm run build
```

## Continuous Integration

The GitHub Actions workflow runs against a PostgreSQL service and checks the project through:

1. Dependency installation
2. Database migration and seeding
3. ESLint
4. TypeScript compilation
5. Integration tests
6. Next.js production build

This helps catch regressions before changes are merged.

## Project Status

**Active development — full-stack foundation in progress.**

The project has moved beyond a static interface into a full-stack foundation with PostgreSQL, Drizzle ORM, Better Auth, database seeding, automated tests, and CI checks. Product capabilities are being developed incrementally, with a focus on reliable data, clear verification, and useful student–alumni workflows.

## Contributing

Contributions, bug reports, and thoughtful product feedback are welcome.

1. Fork the repository.
2. Create a focused branch: `git checkout -b feat/your-feature`.
3. Make your changes and add or update tests where appropriate.
4. Run the relevant quality checks.
5. Commit with a descriptive message.
6. Open a pull request explaining the problem, solution, and any relevant screenshots.

Please avoid including secrets, personal data, or unverified claims in sample content.

## Acknowledgements

Built for students, alumni, and contributors who believe career guidance should be more transparent and accessible.

<p align="center">
  <strong>Beyond the Rumour Mill</strong><br />
  <sub>Less hearsay. More signal. Better preparation.</sub>
</p>
