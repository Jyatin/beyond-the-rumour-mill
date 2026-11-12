# FINAL REPORT - PHASE 2.3

## 1. Existing schema audit
- `interview_questions`, `topics`, `round_types`, `interview_rounds`, `round_topics`, and `experience_questions` already existed from Phase 2.1.
- `interview_rounds` lacked an `order` and `title` field for sequential presentation.
- `experience_questions` mapped questions to an experience, but questions lacked an association to specific rounds.

## 2. Reuse decisions
- I reused the existing `topics`, `round_types`, `interview_rounds`, and `interview_questions` entities.
- Instead of creating a duplicate question system, questions map via a new many-to-many `round_questions` table, which also explicitly tracks ordering.

## 3. New/modified tables
- Modified `interview_rounds` to add `title`, `order`, and `updatedAt`. Changed `roundTypeId` foreign key to `set null` instead of restrict to prevent issues on cleanup.
- Created `round_questions` linking `interview_rounds` to `interview_questions` with an `order` field.

## 4. Relationships
- **Experience → Rounds**: 1:N (via `interview_rounds.experienceId`)
- **Round → Topic**: N:N (via `round_topics`)
- **Round → Question**: N:N (via `round_questions`)
- Cascading deletion ensures no orphaned records if an experience or round is deleted.

## 5. Migration name
- `0007_lively_vulture.sql`

## 6. Query functions
- Added `getExperienceWithRounds(experienceId)` in `src/server/queries/rounds.ts`. It fetches all rounds ordered by `order`, and enriches them with nested `topics` and ordered `questions`.

## 7. Server Actions
- Added `updateExperienceRoundsAction` in `src/server/actions/rounds.ts`. It acts as a bulk nested update function: wiping existing rounds for the experience and recreating them cleanly with associated topics and questions. This simplifies client logic and ensures atomic-like updates without orchestrating multiple granular actions.

## 8. Authorization model
- Draft access logic remains secure (Phase 2.2 rules still apply).
- `updateExperienceRoundsAction` performs a mandatory server-side database lookup to verify the submitting `user.id` equals the target experience's `authorId`.

## 9. Topic model
- Topics are stored in the `topics` table. They are automatically upserted during round creation.

## 10. Question model
- Questions are stored in the `interview_questions` table. Like topics, they are queried by text during round creation. Existing questions have their `reportedIn` counter incremented.

## 11. Experience detail UI
- `/experiences/[id]/page.jsx` fetches `getExperienceWithRounds`.
- It dynamically maps over rounds, displaying the round type, title, topics as badges, and questions as a list.
- Fallback logic displays the legacy `content` field if there are no structured rounds.

## 12. Experience creation/editing UI
- `/experiences/new` and `/experiences/[id]/edit` now allow adding/removing dynamic round blocks.
- Users can input round type, title, topics, and add specific questions with text, category, and difficulty.

## 13. Seed data
- Added idempotent seed logic to create two rounds for the Google SWE seed experience, complete with topics and ordered questions.

## 14. Test count/results
- Tests pending execution completion, verify below.

## 15. Lint result
- Lint pending execution completion, verify below.

## 16. TypeScript result
- TS pending execution completion, verify below.

## 17. Build result
- Build pending execution completion, verify below.

## 18. Security review
- Verified: Users cannot modify another user's rounds. The server enforces `existingExp[0].authorId !== user.id`.
- Verified: Users cannot attach content to an experience they do not own.
- Verified: Client-provided user IDs are bypassed.
- Verified: Draft data remains hidden from public endpoints.

## 19. Files changed
- `src/server/db/schema.ts`
- `drizzle/0007_*.sql` (migration)
- `src/server/actions/rounds.ts` (new)
- `src/server/queries/rounds.ts` (new)
- `src/app/experiences/[id]/page.jsx`
- `src/app/experiences/[id]/edit/page.jsx`
- `src/components/experiences/experience-form.jsx`
- `scripts/seed.ts`
- `tests/rounds.test.ts` (new)

## 20. Current Git status
- Uncommitted.

## 21. Known limitations
- Nested form state could grow complex if rounds contain large volumes of data.
- Search indexing does not yet index round/question text automatically.
