# Retiree Business Blueprint - Learning Platform

Custom-built online course platform for seniors launching businesses in retirement.

## 🚀 Quick Start

### For Development
```bash
cd src
npm run dev
# Open http://localhost:3000
```

### For AI Collaborators
1. Read `HANDOFF.md` first (context and collaboration protocol)
2. Check `GATES.md` for current status
3. Read `PROGRESS.md` for last action taken
4. Continue from current gate

## 📁 Project Structure

```
/rbb-platform/
├── GATES.md              # Master progress checklist
├── ARCHITECTURE.md       # System design decisions
├── HANDOFF.md           # AI collaboration guide
├── API_SPEC.md          # Database schema & API contracts
├── PROGRESS.md          # Daily work log
├── .env.example         # Required environment variables
├── /docs/               # Phase-by-phase instructions
│   ├── phase-1.md       # Gate 1: Database
│   ├── phase-2.md       # Gate 2: Auth + Payment
│   ├── phase-3.md       # Gate 3: Course Viewing
│   ├── phase-4.md       # Gate 4: Progress Tracking
│   ├── phase-5.md       # Gate 5: Admin Panel
│   └── phase-6.md       # Gate 6: Production Deploy
├── /src/                # Next.js application
│   ├── /app/            # App router pages
│   ├── /components/     # React components
│   └── /lib/            # Utilities & database
├── /supabase/           # Database migrations
└── /tests/              # Gate validation tests
```

## 🎯 Current Status

**Gate 0:** ✅ PASSED (Foundation complete)  
**Gate 1:** ⚪ Not Started (Database schema)

See `GATES.md` for full status.

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **Payments:** Stripe Checkout
- **Video:** Vimeo Pro
- **Deploy:** Vercel

## 📋 Development Workflow

### Making Progress
1. Pick unchecked task from current gate in `GATES.md`
2. Complete the task
3. Update checkbox in `GATES.md`
4. When gate complete, run validation test
5. Update `PROGRESS.md` with what you did

### Before Switching AI
- Update `PROGRESS.md` with next action
- Commit code if in working state
- Log any blockers

### After Switching AI
- Read `HANDOFF.md`
- Check `GATES.md` current gate
- Review `PROGRESS.md` last entry

## 🎓 Course Content

### Module 0: Welcome & Course Setup
- Lesson 0.1: Course Orientation
- Lesson 0.2: Mindset Preparation

### Module 1: Foundation & Decision Drivers
- Lesson 1.1: What Drives Your Decisions
- Lesson 1.2: Define Your Foundation
- Lesson 1.3: Positives & Negatives
- Lesson 1.4: Refine Your Foundation
- Lesson 1.5: Business Foundation Fit

(8 modules total, ~45 lessons)

## ♿ Accessibility

WCAG 2.1 Level AA minimum:
- Large fonts (18px+ body, 20-22px preferred)
- High contrast (7:1 ratios)
- Keyboard navigation
- Screen reader tested
- Captions on all videos
- Printable materials

## 🔐 Environment Variables

Copy `.env.example` to `.env.local` and fill in:
- Supabase keys (from Supabase dashboard)
- Stripe keys (from Stripe dashboard)
- Resend API key (for emails)

## 📝 Notes

- **Goal:** Ship Phase 1 (Gates 1-3) THIS WEEK
- **Philosophy:** Working > perfect. Iterate fast.
- **Collaboration:** Multiple AIs will work on this (Claude, ChatGPT, Gemini)
- **Owner:** A.J. (top 0.1% AI power user, execution is focus)

## 🐛 Troubleshooting

See `HANDOFF.md` → Common Questions section

## 📞 Questions?

Check:
1. `HANDOFF.md` for common questions
2. `PROGRESS.md` for past solutions
3. Ask A.J. directly if stuck

---

**Last Updated:** 2024-12-18  
**Status:** Gate 0 passed, ready for Gate 1 (Database)
