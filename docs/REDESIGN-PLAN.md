# PadhoDost — Analysis & Rebuild Plan

*Repo root: `C:\Users\LENOVO\OneDrive\Desktop\Students portal\padhodost`. All paths below are relative to that root. This is a plan document — no code has been written or changed.*

---

## A) DIAGNOSIS — six root causes

Your instinct is right, but the reason is not "the colours are bad." There is a real product under here — 2,551 tagged questions, 59 explainers, All-India ranking, streaks, badges, per-chapter progress, IST-correct daily content. The presentation layer never caught up with it, and six structural decisions are producing every symptom you're seeing.

**1. There is no design system — only a token file nothing exercises.**
`src/app/globals.css` defines a full indigo/amber ramp and five semantic vars (`--background`, `--surface`, `--foreground`, `--muted`, `--border`), then every page hand-rolls its own markup. The literal string `border border-border bg-background p-` appears 18 times; `rounded-2xl` 47 times; **total shadow usage in the entire app is 5**, of which one is a modal. There is no `Button`, no `Card`, no `Badge`, no `Skeleton`, no icon set (141 emoji vs 3 `<svg>` elements). So every surface is the same flat 1px hairline rectangle at the same visual weight. On `src/app/dashboard/page.tsx` seven distinct information types — daily CTA, continue-reading, stat tiles, exam progress, badges, recent tests, focus areas — render as the same box. **Nothing is emphasised, therefore nothing is designed.** Every "looks amateur" symptom (no elevation, 67% of type at 12–14px, zero imagery, no dark mode, no focus states, no loading skeletons) is downstream of this one omission.

**2. The database contains an information architecture the product never exposes.**
`Subject` and `Chapter` are first-class models with `slug`, `name`, `order`, scoped per exam. Every question and explainer carries `subjectId` and `chapterId`. `difficulty` is populated on all 2,551 questions (844 EASY / 1,234 MEDIUM / 473 HARD). `StudyDay` is written daily. `Bookmark` exists with a `Question` relation. **Not one of these is read by any route.** Grep `subject` across `src/app` + `src/components` and you get three prose strings and one query filter. Result: ~106 indexable URLs where the data supports 300+, a `/study` page that is a flat wall of 59 cards ordered by cuid, exam pages that dump 20+ chapter tests in `createdAt` order, and no search anywhere in the app. **"The content is not marketing ready" is mostly this: the content is fine; the structure that makes it findable was never built.**

**3. The site is a collection of pages, not a loop.**
Every high-value surface terminates. The result page offers exactly "Retake test" and "More {exam} tests" (`src/app/test/[id]/result/[attemptId]/page.tsx:252-265`) — while `submitAttempt` has *already computed* per-chapter accuracy in `src/lib/test-actions.ts:79-84` and throws it away. Explainer pages have at most two outbound links. Leaderboard rows aren't links. `/exam-calendar` shows "212 days to NEET" with no link to NEET tests. `/current-affairs` items link *off your site* as their only action. The homepage's every CTA goes to `/exams` — it never mentions `/study`, `/daily`, `/gk`, `/current-affairs`, `/leaderboard`. For a business whose revenue is literally pageviews × return visits, the product is architected as a one-shot funnel.

**4. Nothing brings a student back, and a guest earns nothing.**
No push, no email, no service worker, no Telegram — zero re-engagement channels in the repo. The streak is computed correctly in `src/lib/progress.ts` and rendered in exactly one place: a tile on `/dashboard` that looks identical to "Tests taken." The daily challenge page — whose entire purpose is the streak — never shows the streak number. And `submitDaily` only bumps the streak when a session exists, while `DailyChallenge.tsx:95` tells *every* user "Streak kept alive 🔥" and then sends guests to `/dashboard`, which redirects to `/login`. **You are telling anonymous students they earned something, giving them nothing, and bouncing them into a login wall.** That is the single highest-intent signup moment in the product and it converts to a dead end.

**5. The product is anonymous, untrusted, and unmeasured.**
Nobody's name appears anywhere — no founder, no team, no legal entity, no grievance officer (which the IT Rules 2021 require given you host accounts and publish student names on a leaderboard). No testimonials, no student count, no social proof of any kind under a heading that literally says "Why students love PadhoDost." And there is **no analytics of any kind** — no GA4, no PostHog, nothing. Meanwhile `AdSlot` in `src/components/Ads.tsx` is exported and imported by zero files, while `AdScript` loads the AdSense library on every page. **You ship the data cost of ads on 4G and earn ₹0, and you cannot measure a single thing you're about to change.**

**6. The copy describes a better product than the one that ships — and undersells the one that does.**
`src/app/page.tsx` promises accuracy-by-topic (not built), offline study (no service worker), daily reminders (no notification code), PDFs (none exist), Hindi (no `textHi` field), and "visual explainers … with diagrams" — when the `Block` union in `src/content/explainers.ts` has **no image type at all**, making diagrams structurally unrepresentable. The Syllogism explainer teaches Venn diagrams with no Venn diagram. Simultaneously, line 144 says *"We're starting with SSC CGL and Class 10"* while nine exams are live, and your OG image hardcodes "1,400+ questions" against a real count of 2,551. **You over-promise features you don't have and under-sell inventory you do.** A first-generation aspirant screening for scams reads both as the same signal.

---

## B) THE SIX ASKS

### 1. Better UI
**Now:** One card recipe repeated 47×, five shadows total, a `--border` of `#e7e9ee` (≈1.1:1 on white — invisible on a sunlit budget LCD), 253 of 376 type utilities at 12–14px including *mock-test question text and answer options*, 141 emoji as the icon system, zero images, no dark mode despite a token layer built for it, and zero `focus-visible` styles in the entire codebase while `-webkit-tap-highlight-color: transparent` globally kills tap feedback.
**Change:** Build the design system first — three named elevation levels, a real 7-step type scale with 17px question text, `lucide-react` replacing emoji in all structural UI (keep emoji only on exam chips and badges), darkened `--border`/`--muted`, dark mode via the existing token indirection, one global focus rule, `:active` press feedback, a `Skeleton` primitive with `loading.tsx` on the conversion path, and a hero product screenshot of the actual test runner. Then re-skin the result page as the flagship: circular score dial, branded frame with your wordmark so every WhatsApp screenshot markets you.

### 2. Better UX
**Now:** Answering a question is two taps in two thumb zones with a scroll between them — options mid-screen, Prev/Next in non-sticky flow below the fold on a 640px viewport. The question palette is 30×36px on a 360px phone (Google's minimum is 48). Two stacked sticky bars eat ~150px of a test viewport. The timer starts on mount with no briefing screen. `alert()` and `window.confirm()` are the error and exit UI. And there is a **P0 defect**: on timer expiry, `doSubmit()` fires from `tick()`; a failed submit calls `setSubmitting(false)`, which remints `doSubmit`, which re-runs the timer effect, which calls `tick()` immediately with `timeLeft` still 0 — an unescapable native-alert loop that destroys a 60-minute attempt (`src/components/TestRunner.tsx:187-204`).
**Change:** Fix the loop and add retry-with-backoff plus a localStorage submit queue. Give `/test/[id]` its own route group with no navbar/footer/ads. Fixed bottom action bar with 48px targets and optional auto-advance. Palette to `grid-cols-5` at `h-11`. Pre-test briefing gate. Styled modals replacing `alert`. Staged 10/5/1-minute warnings before auto-submit. Screen-reader semantics on the option group and non-colour states in the palette.

### 3. Better user journey flow
**Now:** Cold visitor → `/exams` → exam page → scan four sections → a flat unsorted chapter list. The flagship full mock is **locked** for every guest unconditionally with a counter that can never decrement. Guests who sign up lose everything — `claimAnonData` re-points `Attempt` rows and never calls `recordTestProgress`, so they land on a dashboard with streak 0 and all badges grey at the exact moment you promised the opposite. Returning users get the identical cold-visitor homepage; the exam-goal cookie is read on two routes and never by the homepage or navbar. In-progress tests are persisted to localStorage and surfaced nowhere.
**Change:** Unlock full mock #1 for everyone including guests (gate mock #2+ instead). Fix `claimAnonData` to re-derive chapter progress and streak, and confirm it: *"We imported 6 tests, 4 chapters and a 3-day streak."* Make the homepage goal-aware. Add a resume strip. Rebuild the result page as the routing hub it should be: topic breakdown → weakest chapter → its explainer → the specific next test.

### 4. Better content visibility
**Now:** ~106 URLs against Testbook's tens of thousands, and the taxonomy for 250+ more is already seeded. No subject or chapter routes. No search input anywhere. `/study` is unfiltered and ordered by cuid. Exam pages never mention explainers. Explainer pages never mention their exam. Daily/GK/CA archives fall out of a rolling 7-day sitemap window and become permanently uncrawlable. Exam cards show zero counts — a student comparing against Testbook's "120 Tests | 4500 Questions" sees a card with no numbers and concludes you're empty.
**Change:** Ship `/exams/[slug]/[subject]` and `/exams/[slug]/[subject]/[chapter]` (~240 new pages from existing data). Ship `/search`. Group `/study` by exam→subject with goal-defaulted filter chips. Two-way explainer↔test linking. Real archive hubs with prev/next day nav and a sitemap that emits every date with content. Counts on every card via `_count`.

### 5. Better CRO
**Now:** Two competing hero CTAs, neither of which starts a test. The signup ask is a soft amber banner below the fold, quieter than the emerald share button that sends people *off-site* before the account exists. The share URL points at `/test/[id]` — a `noindex` page titled "Mock Test" that force-starts a live timer on a friend with zero context. **This is the worst conversion surface in the product and it's the one your growth loop routes into.** And no analytics exist, so none of this is falsifiable.
**Change:** One primary CTA deep-linking to a real short test. Reorder the guest result page to score → signup → share. Signup as a full-width button with a loss frame using numbers already in scope ("Your Rank 47 and 68% report disappear if you leave"), plus a sticky mobile bar during the long solutions scroll. Point shares at a new indexable `/share/[attemptId]` with a dynamic OG image carrying the actual score. Place `AdSlot` on the four high-dwell surfaces and gate `AdScript` off `/test/[id]`.

### 6. Better engagement flow
**Now:** Streak invisible, silently resets to 1 with no grace or warning. `StudyDay` written daily and never read — the "don't break the chain" grid is one query away and unbuilt. Reading an explainer doesn't count as studying. Badges cap out in week one with no earning moment. Leaderboard ranks lifetime cumulative correct answers with no personal rank row — unwinnable and invisible for the 95% who aren't in the top 25. `Bookmark` is 100% dead code. `difficulty` is fully populated and completely inert, so a student who scores 30% is offered only "Retake test."
**Change:** Streak pill in the navbar, at-risk amber state, two freeze tokens, a 12-week heatmap from `StudyDay`, reading counts toward streak. Weekly + per-exam leaderboard with a pinned "You — #147, 9 correct from #100." Ship bookmarks (UI only — the table exists). Difficulty-driven "Warm-up" mode after a bad score. Self-comparison ("Last time 42% → today 61%, +19") — the only contest a weak student can win. Then the actual return trigger: service worker + Web Push, and a Telegram channel fed by the existing cron.

---

## C) PHASED PLAN

I'm going to be blunt about ordering: **the design system and the landing/shell rewrite must come before any micro-optimisation.** Tuning a CTA inside a page where every element has identical visual weight is measuring noise. And instrumentation has to land *first of all*, on its own deploy, or you will ship the redesign with no baseline and never know if it worked.

### Phase 1 — Foundation (~3 weeks solo)

| # | Workstream | Specific changes | Effort |
|---|---|---|---|
| **W0** | **Ship alone, week 1** | GA4 + PostHog in `src/app/layout.tsx`; six events (`test_start`, `test_abandon`, `test_submit`, `signup_prompt_click`, `signup_complete`, `share_click`). `AdSlot` on result page, explainer mid-article, `/daily`, `/current-affairs`; gate `AdScript` off `/test`. Fix the auto-submit alert loop + retry/backoff + submit queue. | 2 d |
| **W1** | **Design system** | 3 elevation levels; type scale tokens (question text → 17px); `lucide-react` swap; `--border` → ~`#d8dce5`, `--muted` → ~`#556070`; dark mode via `prefers-color-scheme` + `data-theme`; global `:focus-visible`; `:active` feedback; `Skeleton` + `loading.tsx` on `/exams`, `/exams/[slug]`, `/study`, result, `/test`. | 5–6 d |
| **W2** | **App shell** | Navbar → server component reading `getSessionUser()` (removes ~50KB of `@supabase/ssr` from every route's shared bundle and kills the "Log in" flash for logged-in users). Mobile bottom tab bar (Home/Exams/Daily/Study/Progress). `usePathname` active state. Goal pill + streak pill. `/test/[id]` route group with no chrome, sticky bar to `top-0`. | 3 d |
| **W3** | **Homepage + copy truth pass** | H1 → the actual claim, brand pun to the eyebrow. Kill "starting with SSC CGL and Class 10" everywhere; derive from `liveCount`. "Today on PadhoDost" band (live daily question, 3 CA headlines, top-3 leaderboard). Content-type rails to `/study` and `/daily`. Real social proof from Prisma (attempts completed, students ranked, tests this week). Product screenshot in a phone frame. Dynamic OG image. Delete Vercel's SVGs from `public/`. Remove offline/reminders/PDF claims until they exist. | 4 d |
| **W4** | **Test player UX + result page** | Briefing gate; fixed bottom bar at 48px; palette `grid-cols-5 h-11`; staged time warnings; styled modals; a11y semantics. Result page rebuilt: score dial, branded hero, topic breakdown from `perChapter`, weakest-chapter → explainer → named next test, guest signup promoted above share. | 5 d |
| **W5** | **Unlock + claim** | Full mock #1 free for guests. `claimAnonData` re-derives progress + streak with an import confirmation. Auth-branched locked copy. | 1 d |

**Expected effect:** first-impression bounce down; test-start rate up (one clear CTA, unlocked flagship mock); completion rate up (no lost 60-minute attempts, thumb-reachable controls); pages/session up from ~1 toward 2.5–3 on the result page alone; and **ad RPM goes from ₹0 to a real number**, which is the entire business.

### Phase 2 — Findability & the loop (~3–4 weeks)

- **Topic hubs.** `/exams/[slug]/[subject]` and `/…/[chapter]` — ~240 new pages built entirely from seeded data. Add to sitemap. *This is the single highest-leverage route for organic growth in the whole plan.*
- **Search.** `/search?q=` over `MockTest.title`, `Explainer.title/summary`, `Chapter.name`, `Subject.name`, grouped by type. Navbar input + `SearchAction` JSON-LD.
- **`/study` rebuild.** Exam→subject grouping, goal-defaulted chips, reading-progress rings, continue-reading strip.
- **Exam page rebuild.** Collapsible subject sections in `Subject.order`, per-row progress state, sticky jump-nav, value strip under the H1, explainer links inside chapter cards.
- **Two-way linking.** Explainer footers (exam chip, sibling explainers, next-in-chapter); result-page weak chapters → explainers; dashboard focus areas become links.
- **Archives.** Real hubs for `/daily`, `/gk`, `/current-affairs` with prev/next nav; sitemap emits every date with content.
- **Content debt.** Five missing `ExamIntro` records (banking, railways, upsc, class-11, class-12) + a build-time guard so no live exam ships thin. Add a `figure`/`svg` block type so "visual explainers" stops being a lie.
- **Trust layer.** Named founder + bio on `/about`, bylines + `dateModified` on explainers, legal entity + grievance officer in the footer, an authenticated `/admin/messages` so "report a mistake" stops writing into a black hole.

### Phase 3 — Retention engine & moat (ongoing)

Push + service worker + PNG icons (the PWA currently *cannot* install), Telegram channel off the existing cron, streak freezes and at-risk states, `StudyDay` heatmap, weekly/per-exam leaderboard with a pinned self row, bookmarks, difficulty-graded warm-up ladder, self-comparison deltas, PYQ archive (public domain — 15 papers unlocks the highest-intent keyword set in this market), and a bilingual EN/हिं toggle seeded with one flagship mock per govt exam.

---

## D) QUICK WINS — first sitting (~half a day, visibly changes perception)

1. `globals.css:35-36` — darken `--muted` to ~`#556070` and `--border` to ~`#d8dce5`. **Two lines; the entire layout stops dissolving on a cheap LCD.**
2. One global `:focus-visible` rule + `:active` press states on primary buttons.
3. `whitespace-pre-wrap` on the formula block in `ExplainerReader.tsx` — **un-breaks 28 of 63 formulas** currently rendering as run-on garbage.
4. Palette `grid-cols-8 → grid-cols-5`, `h-9 → h-11`.
5. Guard the auto-submit loop (a ref + removing `submitting` from the `doSubmit` deps).
6. Delete `next.svg`, `vercel.svg`, `globe.svg`, `window.svg`, `file.svg` from `public/`.
7. Fix the copy lies: `page.tsx:144`, `exams/page.tsx:42-44`, and the hardcoded "1,400+ questions" in `opengraph-image.tsx`.
8. Swap the H1 and subhead on the homepage.
9. `_count` on `getExams()` → "24 tests · 480 questions · 6 explainers" on every `ExamCard`.
10. Paste the GA4 snippet in.

---

## E) EXPLICITLY OUT OF SCOPE — refuse to build

- **Video solutions, live classes, 1:1 doubt-solving.** You will lose to PW on video forever, and it destroys your only real edge: instant, data-light, no buffering on 4G. Answer it with rich-block worked solutions + explainer links instead.
- **A native Play Store app.** The PWA is the right answer and it's currently broken for the trivial reason that the manifest ships SVG-only icons. Fix that; don't start an app.
- **Translating all 2,551 questions to Hindi.** Ship the toggle with null-fallback and translate one flagship mock per govt exam. A visible working toggle buys more credibility than invisible 100% coverage.
- **ML/adaptive question selection.** You have a fully populated `difficulty` enum and no traffic. A rules-based ladder gets 90% of the value for 2% of the work.
- **A CMS or admin panel.** One authenticated `/admin/messages` page. Nothing more.
- **Adopting shadcn/MUI.** You have Tailwind v4 tokens already. Six primitives is cheaper than adopting and then fighting a library.
- **Scaling the current-affairs pipeline as-is.** Raw GNews `category=nation` headlines copied verbatim with an outbound-only CTA is the exact pattern Google's scaled-content-abuse policy targets — and enforcement is site-wide, not page-wide. Either editorialise it into exam-format facts with a derived quiz, or `noindex` it. Do not add volume to it.
- **State-board content.** Build the waitlist capture on the "Coming soon" card, not the content.
- **An elaborate badge economy.** Weekly leaderboard + self-comparison is where the motivation actually lives.
- **Sectional timing and an on-screen calculator** — real, but Phase 3, and only for full mocks and PYQs.

---

## F) HOW WE'LL KNOW IT WORKED

Ship **W0 alone in week 1** and let it run 7–10 days while you build the design system. That window *is* your baseline. Do not deploy instrumentation and the redesign together.

**Six events:** `test_start` (TestRunner ready), `test_abandon` (exit confirm), `test_submit`, `signup_prompt_click`, `signup_complete`, `share_click`.

**Five numbers that decide everything:**

| Metric | Definition | Why it's the one |
|---|---|---|
| **Start rate** | `test_start` / landing sessions | Tests whether the hero, unlock removal, and exam-card counts work |
| **Completion rate** | `test_submit` / `test_start` | Tests the player UX and the submit-failure fix directly |
| **Guest signup rate** | `signup_complete` / result views by guests | Tests the entire CRO workstream |
| **Pages / session** | GA4 | **This is your revenue.** Currently near 1 on most paths |
| **D1 / D7 return** | PostHog cohorts | Tests whether Phase 3 is worth building at all |

**Plus, non-negotiably:** AdSense **RPM and viewable impressions per session** — currently structurally zero because `AdSlot` renders nowhere. That number moving off zero in week 1 is the only thing in this plan that pays for the rest of it.

**Secondary health signals:** `share_click` rate, daily-challenge answer rate, % of active users with streak ≥3, and Search Console indexed-URL count (baseline ~106 → target 350+ after Phase 2).

---

## APPENDIX — all 114 verified findings

From a 9-lens audit (130 agents): 119 raw findings, 98 survived adversarial verification, 21 refuted, 16 added by the completeness critic.

| Sev | Dimension | Effort | Finding |
|---|---|---|---|
| 9 | performance | M | Timer expiry + a failed submit = unescapable alert loop; the 60-minute mock is lost |
| 8 | journey | M | Result page is a funnel dead end: no weak-topic breakdown and no next test to take |
| 8 | visibility | L | Subject and Chapter models exist in the schema but have no routes — zero topic hub pages |
| 8 | content | L | Previous Year Questions: the UI section exists but there is not a single PYQ in the database |
| 8 | content | L | No Hindi or bilingual question rendering — excludes the majority of the SSC/RRB/Banking audience |
| 8 | content | L | "Visual explainers" is structurally impossible — the Block union has no image, diagram or video type |
| 8 | content | L | Daily Current Affairs is a raw GNews national-headline dump — not exam CA — and is an AdSense policy risk |
| 8 | content | S | 28 of 63 formula blocks render as run-on garbage — multi-space alignment collapses in HTML |
| 7 | ux | M | Exam detail page dumps every chapter test in one flat createdAt-ordered list with no subject grouping or filter |
| 7 | ui | M | Mobile navigation is a hamburger-only pattern with no bottom tab bar — the pattern every Indian competitor abandoned |
| 7 | visibility | M | /study is a flat ungrouped grid with no exam filter, despite Explainer having subject and chapter relations |
| 7 | visibility | M | Subject exists as a first-class model but has no route, so a huge navigable and SEO-relevant layer is invisible |
| 7 | visibility | M | Homepage funnels 100% of cold traffic into /exams and hides the entire daily-return content library |
| 7 | engagement | M | Daily/GK/current-affairs — the return-visit engine — is invisible on the homepage |
| 7 | cro | S | No analytics of any kind — the funnel is completely unmeasured |
| 7 | cro | M | Shared WhatsApp links point at a noindex page that force-starts a timed test |
| 7 | engagement | M | The streak retention loop has no trigger — it depends entirely on the student remembering |
| 7 | engagement | L | Zero re-engagement channel: no push, no email, no service worker anywhere in the repo |
| 7 | engagement | M | Streak is computed and stored but invisible on every page except /dashboard |
| 7 | cro | M | Guest students earn nothing from the daily challenge and are never asked to sign up |
| 7 | visibility | M | Explainers are orphaned from every exam page — the study↔test link is one-way |
| 7 | visibility | M | Homepage surfaces one content type out of six — no explainers, daily, GK, or current affairs |
| 7 | engagement | S | Explainer pages are dead ends — no exam link, no related explainers, no next chapter |
| 7 | visibility | S | Exam cards and exam pages surface no content counts — volume is invisible |
| 7 | performance | M | Test runner blocks the whole test UI on a server round-trip before showing question 1 |
| 7 | journey | M | Answering a question takes two taps in two different thumb zones, with a scroll between them |
| 7 | journey | S | The full-length mock — the one thing students come for — is hard-locked behind login plus 5 cleared chapters |
| 7 | content | S | The product is completely anonymous — no team, no legal entity, no grievance officer |
| 7 | ux | M | "Report a mistake" and every contact message write to a table with no read path at all |
| 7 | content | L | Math is rendered as ASCII, with three competing notations across the same corpus |
| 7 | engagement | M | The Bookmark model is 100% dead code — there is no save-for-revision anywhere in the product |
| 7 | engagement | M | Every question is difficulty-labelled and nothing in the product uses it — no graded or adaptive path |
| 7 | engagement | M | Nothing anywhere compares a student to their own past — the only contest a weak student can win |
| 7 | ux | S | Auto-submit fires with no warning — the only low-time cue is a 60-second colour change |
| 6 | ui | M | Card treatment is one recipe repeated 47 times — no elevation hierarchy anywhere |
| 6 | performance | M | No loading skeletons anywhere — 1 spinner and 1 bare text string for the whole app |
| 6 | visibility | M | Navbar overflows on desktop, hides six primary destinations on mobile, and has no active-route state |
| 6 | visibility | M | No search function exists anywhere in the entire application |
| 6 | journey | S | Getting from "I study for IBPS PO" to a specific chapter test requires 3 clicks plus an unaided scroll through an unsorted list |
| 6 | visibility | S | Navbar exposes 6 links yet buries Daily GK, Current Affairs, Dashboard and Mistakes practice in the footer or nowhere |
| 6 | engagement | S | The chosen exam goal is stored but never shown in global navigation, so the app never feels personalized |
| 6 | ux | M | Guests are shown an unlock progress bar that can never move |
| 6 | journey | M | Returning users get the identical cold-visitor homepage — the exam goal cookie and in-progress test are ignored |
| 6 | cro | M | Saving a guest score costs a full page navigation plus an email round-trip, with no OTP option |
| 6 | visibility | M | Content depth is invisible on every entry point — no counts on exam cards or the exams grid |
| 6 | content | M | Only 4 of 9 live exams have exam-intro content — Banking, Railways, UPSC, Class 11/12 landing pages are near-empty |
| 6 | cro | M | Two competing hero CTAs that both fail to start a test |
| 6 | engagement | M | Streak is completely undefended — silent reset to 1, no at-risk warning, no freeze |
| 6 | engagement | M | StudyDay table is written on every session but never read — the 'don't break the chain' grid is one query away and unbuilt |
| 6 | engagement | M | Leaderboard ranks by lifetime cumulative correct answers — unwinnable for new students, and shows no personal rank |
| 6 | engagement | S | Reading an explainer contributes nothing to the streak, orphaning the entire /study surface from the retention loop |
| 6 | visibility | M | /study is a flat, unfiltered, unsearchable wall of 59 cards |
| 6 | content | L | Five of nine live exams have no explainers and no evergreen intro copy — thin pages that promise content they lack |
| 6 | journey | M | Post-test result page gives no 'what to study next' — the highest-intent moment is wasted |
| 6 | engagement | M | No exam-notification / admit-card / result-alert feed — the entire SarkariResult traffic engine is absent |
| 6 | content | M | No solution videos, no doubt-solving, no worked-solution depth beyond one paragraph of text |
| 6 | visibility | M | /study is one flat ungrouped grid of every explainer with no filter, search, or subject tree |
| 6 | ui | M | Test player is unusable with a screen reader and ambiguous for colourblind students |
| 6 | engagement | M | Zero community or social presence — no Telegram, YouTube, Instagram or WhatsApp channel anywhere |
| 6 | cro | S | The social share image hardcodes stale numbers and only 4 of the 9 live exams |
| 5 | ui | L | Zero imagery, illustration, or photography anywhere in the product |
| 5 | ui | M | 141 emoji used as the entire icon system — no icon set exists |
| 5 | ui | L | No dark mode despite a token architecture built for it |
| 5 | engagement | M | Result page — the shareable, most-screenshotted screen — is visually undesigned |
| 5 | ux | S | Timed tests run inside the full marketing chrome — navbar, footer and ad slots stay on screen |
| 5 | journey | M | Guest→account conversion silently discards streak, chapter progress and enrollment |
| 5 | cro | S | AdSense revenue model is not wired up — AdSlot is never rendered on any page |
| 5 | content | L | Homepage promises install-to-homescreen, offline study and daily reminders — none of which exist in the code |
| 5 | engagement | M | Daily, GK and Current Affairs are one-shot pages with no date navigation and no archive |
| 5 | ux | S | Test timer starts the instant the page loads — no pre-test briefing screen |
| 5 | ux | S | Dashboard 'Focus areas' names weak chapters but nothing there is clickable |
| 5 | journey | S | Explainer → test loop only closes in one direction, and only when a slug happens to match |
| 5 | engagement | S | Leaderboard, Predictor and Exam Calendar are terminal pages with no route back into the funnel |
| 5 | content | M | Zero social proof anywhere on the site — no student count, no testimonials, no results |
| 5 | cro | S | Exam landing pages never state why PadhoDost beats Testbook — no comparison, no differentiator above the fold |
| 5 | content | M | Test cards show marking scheme jargon but not difficulty, topic or who should take it |
| 5 | cro | S | AdSlot is never rendered on any page — the entire revenue model ships zero ad units |
| 5 | cro | M | The post-result signup CTA is a passive banner buried below the fold |
| 5 | journey | M | Result page has no next-test path — the two exit actions both risk ending the session |
| 5 | engagement | M | Daily challenge is one deterministic question with no per-user record — repeats on a fixed cycle and the streak is backdate-gameable |
| 5 | visibility | M | The three strongest daily-return surfaces are unreachable from the navigation |
| 5 | visibility | M | Daily, GK, and Current Affairs archives are permanently orphaned and fall out of the sitemap |
| 5 | visibility | M | No site search anywhere, and no SearchAction in the WebSite schema |
| 5 | performance | S | AdSlot is never rendered anywhere — AdSense script loads, zero ad units exist |
| 5 | performance | M | Navbar is a client component that fetches auth in useEffect, pushing @supabase/ssr into every page's bundle |
| 5 | performance | M | PWA manifest ships SVG-only icons — Android will not offer "Add to Home Screen" |
| 5 | ui | M | Two stacked sticky bars eat ~150px of a 640px test viewport |
| 5 | ux | S | Submit failure surfaces as a native alert() and offers no recovery path |
| 5 | visibility | M | Result page has no subject-wise or section-wise breakdown, though the homepage explicitly promises it |
| 5 | engagement | M | Leaderboard has no exam filter and never shows the viewer their own rank |
| 5 | content | S | Homepage makes three concrete promises the product does not keep: PDFs, offline, and daily reminders |
| 5 | ux | S | Offline and degraded-network state is invisible; every user is told progress "auto-saves on this device" |
| 5 | performance | S | Fonts load latin-only subsets, so the promised Hindi cannot render in the brand typeface |
| 4 | ui | M | Typographic scale is bottom-heavy and collapsed — 253 of 376 size utilities are text-sm/text-xs |
| 4 | ui | S | No focus-visible styling anywhere — keyboard and switch-access users get browser defaults or nothing |
| 4 | content | M | Homepage feature and step cards are unstyled text blocks — the marketing surface has no visual craft |
| 4 | journey | S | Exam-goal onboarding is skippable and only appears on one route |
| 4 | content | S | Headline "Padho, Dost! 📚" says nothing about the product |
| 4 | content | S | Homepage and /exams both claim "starting with SSC CGL and Class 10" while 9 exams are live |
| 4 | content | M | Explainer pages have no author, no credential, and no sourcing — pure anonymous content |
| 4 | content | S | Exam blurbs are syllabus lists, not benefit statements |
| 4 | content | L | The homepage promises offline mode and daily reminders that do not exist |
| 4 | cro | M | No mid-test signup nudge, and guests are told their progress is device-locked without being offered the fix |
| 4 | cro | M | Shared score cards render a generic site-wide OG image with no score in it |
| 4 | cro | S | Login page never states what a guest has already earned or stands to lose |
| 4 | content | S | Homepage promises offline study and daily reminders that do not exist |
| 4 | engagement | M | Badges are decorative, cap out in week one, and there is no moment of earning them |
| 4 | content | S | Homepage and /exams copy claim two exams while nine are live |
| 4 | ui | S | Question palette tap targets are ~30x36px — under half the recommended touch area |
| 4 | performance | M | The PWA is non-functional — SVG-only icons and no service worker, yet the homepage promises offline study |
| 4 | ux | M | Test player lacks sectional timing, calculator, and its question palette collapses two states into one |
| 3 | cro | S | "Coming soon" exam cards are inert dead ends with no capture mechanism |
| 3 | visibility | S | Listing pages carry no structured data — /exams and /study emit no JSON-LD |
| 3 | ux | S | Logged-in students see the logged-out navbar on every page load, then it flips |
