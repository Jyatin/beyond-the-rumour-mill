# Phase 2.2 Final Report: Interview Experience Repository

## 1. Existing experience schema audit & 2. Reuse decision
The schema was audited, specifically the pre-existing `experiences` table from Phase 1. I decided to **reuse and extend** the `experiences` table rather than creating a duplicate table. It already contained the core fields (`companyId`, `companyName`, `role`, `roleId`, `year`, `type`, `rounds`, `difficulty`, `summary`) and was already deeply integrated with company intelligence queries. Extending it was far cleaner and correctly adhered to the architectural rule of avoiding duplicates.

## 3. Schema changes
The following fields were added to `experiences`:
- `content`: `text` (for full structured content)
- `outcome`: `text` (for offer, rejected, pending, etc.)
- `timeline`: `text` (for dates)
- `status`: `text` with default `'published'` (for draft vs. published state)
- `authorId`: `text` referencing `user.id`
- `updatedAt`: `timestamp`

## 4. Migration name
`0006_light_the_twelve.sql`

## 5. Query functions
`src/server/queries/experiences.ts` was extended with:
- `getPublishedExperiences()`
- `getExperienceById(id)`
- `getExperiencesByCompanyId(companyId)` (filtered by published)
- `getExperiencesByAuthorId(authorId)`
- `getMyExperiences()`

## 6. Server Actions
`src/server/actions/experiences.ts` was created, containing:
- `createExperienceAction(data)`
- `updateExperienceAction(id, data)`
- `submitExperienceAction(id)`

## 7. Authorization rules implemented
Server actions enforce:
- User must be authenticated (`requireUser()`).
- Authorship is injected directly from the session `user.id` on creation.
- A user can only edit or publish an experience if `existing.authorId === user.id`.

## 8. Submission/publication workflow
Users can submit a draft. Drafts are completely hidden from public queries (`getPublishedExperiences()`, `getExperiencesByCompanyId()`). Drafts can only be accessed directly by their `authorId`. Publishing an experience changes its status to `"published"`.

## 9. Repository routes
- `/experiences`: Lists all published experiences cleanly.

## 10. Submission/edit routes
- `/experiences/new`: Authenticated submission UI.
- `/experiences/[id]/edit`: Authenticated edit UI (with ownership checks).
- Both use a shared `ExperienceForm` component in JSX.

## 11. Company-page integration
`getCompanyIntelligence` in `src/server/queries/companies.ts` was updated to ONLY return published experiences. The company page dynamically handles empty states and lists published experiences seamlessly.

## 12. Seed data
`scripts/seed.ts` was extended with two deterministic experiences:
- 1 published Google SWE Offer
- 1 draft Google PM Internship
Seed script correctly maintained idempotency upon multiple runs.

## 13. Test count/results
27 tests successfully passed (including 6 new dedicated tests for Phase 2.2). Tests actively confirm draft isolation and correct ownership validations.

## 14. Lint result
Linting passed with 0 errors (only existing image warnings).

## 15. TypeScript result
`npx tsc --noEmit` passed with code 0.

## 16. Production build result
Optimized production build generated successfully in 2.8 seconds.

## 17. Security checks
- `authorId` is NOT client-controlled.
- `status` updates are strongly verified on the backend.
- Parametrized Drizzle ORM ensures SQL injection safety.
- Zod parsing validates form data at the server boundary.
- Unauthenticated users receive HTTP redirect blocks via `requireUser()`.

## 18. Files changed
- **Modified**: 
  - `src/server/db/schema.ts`
  - `src/server/queries/experiences.ts`
  - `src/server/queries/companies.ts`
  - `src/app/layout.jsx`
  - `src/components/marketing/editorial-sections.jsx`
  - `scripts/seed.ts`
  - `tests/experiences.test.ts`
  - `tests/seed.test.ts`
  - `tests/database.test.ts`
  - `drizzle/meta/_journal.json`
- **Created**: 
  - `src/app/experiences/page.jsx`
  - `src/app/experiences/[id]/page.jsx`
  - `src/app/experiences/new/page.jsx`
  - `src/app/experiences/[id]/edit/page.jsx`
  - `src/components/experiences/experience-form.jsx`
  - `src/server/actions/experiences.ts`
  - `drizzle/0006_light_the_twelve.sql`
  - `drizzle/meta/0006_snapshot.json`

## 19. Git status
Working tree reflects precisely these changes without any unexpected modifications.

## 20. Known limitations
The full "Phase 2.3" structured round/question breakdown is not implemented yet; only a single block of text (`content`) is stored per experience alongside high-level metadata (`rounds`, `difficulty`, `outcome`).

Phase 2.2 is COMPLETELY done. I am stopping execution.
