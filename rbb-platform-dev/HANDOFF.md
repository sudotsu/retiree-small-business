# RBB Platform - AI Handoff Guide

**Purpose:** This file helps any AI (Claude, ChatGPT, Gemini) pick up where another left off.

---

## Quick Start (Read This First)

You're working on **Retiree Business Blueprint**, a custom learning platform for seniors starting businesses.

**Your first 3 actions:**
1. Read `GATES.md` → See current gate status
2. Read this file → Understand context
3. Read `PROGRESS.md` → See last action taken

**Current Status:**
- **Gate:** Gate 0 (Foundation)
- **Last Updated:** 2024-12-18
- **Last Action:** Created project documentation structure
- **Next Action:** Complete Gate 0 tasks (initialize Next.js, create API_SPEC.md)

---

## Project Context

### What is this?
A premium online course platform for retirees launching businesses. Think Kajabi-level UX but custom-built for seniors (70+ age demographic).

### Why custom-built?
- Generic LMS platforms (LearnDash, Teachable) don't meet accessibility needs
- Need full control over UX for senior-friendly design
- Performance matters (WordPress too slow)
- Want to showcase AxProtocol integration later

### Who's building it?
**A.J.** - Top 0.1% AI power user, builder/strategist, tree service owner, drone video freelancer. Execution is his bottleneck, not technical skill.

**Goal:** Ship Phase 1 THIS WEEK to break execution deadlock.

### Success Criteria
Not "perfect" - **SHIPPED**. Working payment flow + video course viewing = win.

---

## Technical Stack (Decided)

**Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS  
**Backend:** Supabase (PostgreSQL + Auth + Storage)  
**Payments:** Stripe Checkout  
**Video:** Vimeo Pro  
**Email:** Resend  
**Deploy:** Vercel  

**Why this stack:** See `ARCHITECTURE.md` for full rationale.

---

## Collaboration Protocol

### Hard Gates System
- Work is divided into 6 gates (see `GATES.md`)
- Each gate has: entry criteria, tasks, validation test, artifacts
- **Never** skip to next gate without validating current gate
- Update `GATES.md` checkboxes as you complete tasks

### Documentation Rules
1. **GATES.md** = master checklist (always update)
2. **PROGRESS.md** = log of daily work (update at end of session)
3. **HANDOFF.md** = this file (update if major context changes)
4. **API_SPEC.md** = database schema, endpoints (update when DB changes)
5. Phase docs (`/docs/phase-X.md`) = detailed gate instructions

### When to Update What
- Completed a task? → Check box in `GATES.md`
- Finished working? → Update `PROGRESS.md` with next action
- Gate passed? → Update gate status in `GATES.md`, log in `PROGRESS.md`
- Schema changed? → Update `API_SPEC.md`
- Architecture decision? → Log in `ARCHITECTURE.md` decision log

### Code Organization
```
/src/
  /app/              # Next.js app router pages
  /components/       # React components
  /lib/              # Utilities, DB queries, helpers
  /types/            # TypeScript types
  /styles/           # Global CSS
```

**Naming:**
- Components: PascalCase (e.g., `CourseCard.tsx`)
- Files: kebab-case (e.g., `lesson-progress.ts`)
- Functions: camelCase (e.g., `calculateProgress`)

---

## Current Gate: Gate 0 Status

**Goal:** Foundation - docs created, Next.js initialized, ready to build.

**What's Done:**
- [x] Project directory created
- [x] GATES.md created
- [x] ARCHITECTURE.md created
- [x] HANDOFF.md created (you're reading it)

**What's Left:**
- [ ] Create API_SPEC.md (database schema design)
- [ ] Create PROGRESS.md
- [ ] Create phase documentation (phase-1.md, phase-2.md, etc.)
- [ ] Initialize Next.js project with TypeScript
- [ ] Install dependencies (Tailwind, Supabase client, Stripe)
- [ ] Create `.env.example`
- [ ] Run Gate 0 validation test

**Blocker:** None

**Next Action:** Create API_SPEC.md with full database schema.

---

## Common Questions (AI FAQ)

### Q: Can I refactor the architecture?
A: Only if there's a critical flaw. Speed matters more than perfection. Log major changes in `ARCHITECTURE.md`.

### Q: Should I write tests?
A: Gate validation tests (manual checklists) are required. Unit tests nice-to-have but not blocking.

### Q: What if I disagree with a past decision?
A: Document your concern in `PROGRESS.md` blocker section. A.J. makes final call.

### Q: How much documentation should I write?
A: Enough for next AI to understand, not more. Code comments > separate docs.

### Q: Can I use a different library/tool?
A: Check `ARCHITECTURE.md` first. If not listed, propose in `PROGRESS.md` before using.

### Q: The human asks me to skip ahead to Gate 3 but Gate 1 isn't done...
A: Push back. Gates exist to prevent broken foundations. Explain why order matters.

### Q: I'm stuck on something for >30 minutes
A: Log it in `PROGRESS.md` as a blocker with:
  - What you tried
  - Error messages
  - Specific question for next AI or human

---

## Handoff Checklist (When Switching AI)

Before handing off:
- [ ] Update `GATES.md` with completed tasks
- [ ] Update `PROGRESS.md` with:
  - What you just did
  - What's next
  - Any blockers
  - Time estimate for next task
- [ ] Commit code if in working state
- [ ] Run gate validation test if gate complete

When receiving handoff:
- [ ] Read `GATES.md` current gate
- [ ] Read `PROGRESS.md` last entry
- [ ] Review code changes since last handoff
- [ ] Ask human for clarification if context unclear

---

## Project Constraints

### Must-Haves (Non-Negotiable)
- WCAG 2.1 AA accessibility minimum
- Works without JavaScript (progressive enhancement)
- Keyboard navigation throughout
- Mobile responsive
- 18px+ font size
- High contrast (7:1 ratios)
- Printable worksheets

### Nice-to-Haves (Defer if Needed)
- Community forum
- Live Q&A integration
- Gamification (badges, streaks)
- Mobile app

### Absolutely Avoid
- Complex onboarding flows
- Small fonts or low contrast
- Required video watching (allow skip)
- Paywalls on free content
- Pop-ups or aggressive marketing

---

## Human Context (A.J.)

### Communication Style
- Prefers direct, no fluff
- Will push back if you're overengineering
- Wants to ship fast, iterate later
- Has GPT-4 and Gemini access (will use all 3 AIs)

### What motivates him
- Crossing the execution gap (his #1 issue)
- Building best-in-class products
- Using AI as leverage
- Autonomy and sovereignty

### What frustrates him
- Over-explanation when action is needed
- Generic "AI slop" suggestions
- Waiting for perfect before shipping

### How to help him best
1. Ship something working fast
2. Document clearly for next AI
3. Anticipate blockers before he hits them
4. Suggest next action, don't wait to be asked

---

## Emergency Contacts

If totally stuck:
1. Check `PROGRESS.md` for past solutions
2. Check project Discord/Slack (if exists)
3. Ask A.J. directly - he'd rather unblock you than have you spin

---

## Version History

| Date | AI | Changes |
|------|-----|---------|
| 2024-12-18 | Claude (Sonnet 4.5) | Created handoff system, scaffolded docs |

---

## Next Session TODO

1. Complete API_SPEC.md (database schema)
2. Initialize Next.js project
3. Create .env.example
4. Pass Gate 0 validation
5. Start Gate 1 (database implementation)

**Estimated Time:** 1-2 hours

---

**Remember:** The goal is to ship a working product, not build the perfect platform. Fast iteration > slow perfection.
