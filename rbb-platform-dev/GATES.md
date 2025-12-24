# RBB Platform - Hard Gates Checklist

**Last Updated:** 2024-12-18  
**Current Gate:** Gate 1 (Database Schema)  
**Status:** Ready to Start

---

## Gate 0: Foundation ✅ PASSED
**Goal:** Project initialized, docs created, stack confirmed, team can collaborate

### Entry Criteria
- [x] Stack decision made (Next.js + Supabase + Stripe)
- [x] Project goals documented
- [x] Collaboration protocol established

### Tasks
- [x] Create project directory structure
- [x] Create GATES.md (this file)
- [x] Create ARCHITECTURE.md
- [x] Create HANDOFF.md
- [x] Create API_SPEC.md
- [x] Create PROGRESS.md
- [x] Create phase documentation
- [x] Initialize Next.js project
- [x] Install core dependencies
- [x] Set up environment variables template

### Validation Test
```bash
# All tests passed ✓
✓ Gate 0 PASSED
```

### Artifacts
- ✅ Documentation files (GATES, ARCHITECTURE, HANDOFF, API_SPEC, PROGRESS)
- ✅ Phase documentation (phase-1 through phase-6)
- ✅ Next.js project initialized with TypeScript
- ✅ Dependencies installed (Supabase, Stripe)
- ✅ `.env.example` with required variables

### Blockers
- None - Gate 0 PASSED ✓

---

## Gate 1: Database Schema ⏳ NOT STARTED
**Goal:** Supabase schema designed, migrations created, test data working

### Entry Criteria
- [x] Gate 0 passed
- [ ] Supabase project created
- [ ] Database requirements documented

### Tasks
- [ ] Design database schema (users, courses, lessons, progress, etc.)
- [ ] Create SQL migration files
- [ ] Set up Supabase project
- [ ] Run migrations
- [ ] Seed test data
- [ ] Write example queries
- [ ] Document all tables/relationships

### Validation Test
```bash
# Queries must work against test data:
# - Fetch user with course enrollments
# - Get lesson progress for user
# - Mark lesson complete
# - Calculate course completion percentage
```

### Artifacts
- `schema.sql` - Full database schema
- `seed.sql` - Test data
- `migrations/` - Versioned migrations
- `API_SPEC.md` - Updated with schema docs

### Blockers
- TBD

---

## Gate 2: Auth + Payment ⏳ NOT STARTED
**Goal:** User can signup, pay with Stripe, get access to portal

### Entry Criteria
- [x] Gate 1 passed
- [ ] Stripe account connected
- [ ] Supabase Auth configured

### Tasks
- [ ] Implement Supabase Auth (email/password)
- [ ] Create signup/login pages
- [ ] Integrate Stripe Checkout
- [ ] Handle webhook for successful payment
- [ ] Create user enrollment on purchase
- [ ] Redirect to student portal after payment
- [ ] Test full flow end-to-end

### Validation Test
```bash
# Manual test checklist:
# 1. New user signs up
# 2. User completes Stripe payment
# 3. User is redirected to portal
# 4. User sees enrolled course
# 5. Database shows enrollment record
```

### Artifacts
- Auth pages (signup, login, reset password)
- Stripe integration code
- Webhook handler
- Protected route middleware

### Blockers
- TBD

---

## Gate 3: Course Viewing ⏳ NOT STARTED
**Goal:** Enrolled user can watch videos, mark lessons complete, navigate course

### Entry Criteria
- [x] Gate 2 passed
- [ ] Sample videos uploaded to Vimeo/Mux
- [ ] Course content structure finalized

### Tasks
- [ ] Build course overview page
- [ ] Build lesson viewer page
- [ ] Integrate video player (Vimeo/Mux)
- [ ] Add "Mark Complete" functionality
- [ ] Show downloadable worksheets
- [ ] Add prev/next lesson navigation
- [ ] Lock lessons based on prerequisites
- [ ] Test with real course content

### Validation Test
```bash
# User can:
# - See list of enrolled courses
# - Click into course → see module/lesson list
# - Watch video lesson
# - Download PDF worksheet
# - Mark lesson complete (persists to DB)
# - Navigate to next lesson
# - Cannot access locked lessons
```

### Artifacts
- Student portal pages
- Video player component
- Progress tracking logic
- Lesson navigation system

### Blockers
- TBD

---

## Gate 4: Progress Tracking ⏳ NOT STARTED
**Goal:** Dashboard shows completion %, quiz system works with scoring

### Entry Criteria
- [x] Gate 3 passed
- [ ] Quiz content written

### Tasks
- [ ] Build progress dashboard
- [ ] Calculate completion percentage
- [ ] Show module/lesson status (not started, in progress, complete)
- [ ] Build quiz component
- [ ] Implement quiz scoring
- [ ] Store quiz attempts
- [ ] Show quiz results
- [ ] Generate certificates on course completion

### Validation Test
```bash
# User dashboard shows:
# - Overall course progress (%)
# - Module-by-module breakdown
# - Next recommended lesson
# - Quiz scores
# - Certificate download (if 100% complete)
```

### Artifacts
- Dashboard UI
- Quiz engine
- Certificate generator
- Progress calculation logic

### Blockers
- TBD

---

## Gate 5: Admin Panel ⏳ NOT STARTED
**Goal:** Non-developer can add/edit lessons, upload videos, publish content

### Entry Criteria
- [x] Gate 4 passed
- [ ] Admin requirements gathered

### Tasks
- [ ] Create admin authentication
- [ ] Build course management UI
- [ ] Add lesson editor (WYSIWYG or Markdown)
- [ ] Video upload interface
- [ ] Worksheet upload interface
- [ ] Quiz builder
- [ ] Publish/unpublish functionality
- [ ] Preview mode
- [ ] User management (view enrollments, reset passwords)

### Validation Test
```bash
# Admin can (without touching code):
# 1. Create new lesson
# 2. Upload video
# 3. Attach worksheet PDF
# 4. Write lesson description
# 5. Publish lesson
# 6. Student sees new lesson in portal
```

### Artifacts
- Admin dashboard
- Content management system
- File upload handlers
- User management tools

### Blockers
- TBD

---

## Gate 6: Production Deploy ⏳ NOT STARTED
**Goal:** Live site, working payments, monitoring active

### Entry Criteria
- [x] Gate 5 passed
- [ ] Domain purchased
- [ ] Vercel account set up
- [ ] Production Supabase/Stripe configured

### Tasks
- [ ] Set up Vercel project
- [ ] Configure environment variables
- [ ] Set up custom domain
- [ ] SSL certificate
- [ ] Production Stripe keys
- [ ] Production Supabase keys
- [ ] Set up error tracking (Sentry)
- [ ] Set up analytics
- [ ] Test payment flow in production
- [ ] Load testing
- [ ] SEO optimization
- [ ] Accessibility audit

### Validation Test
```bash
# Production checklist:
# - Site loads at custom domain
# - HTTPS working
# - Real payment processes successfully
# - User can access course after payment
# - Videos play smoothly
# - Mobile responsive
# - Lighthouse score 90+
# - No console errors
```

### Artifacts
- Deployed application
- Monitoring dashboards
- Analytics setup
- SEO configuration

### Blockers
- TBD

---

## Quick Status View

| Gate | Status | Blocker | Owner |
|------|--------|---------|-------|
| 0: Foundation | 🟢 Passed | None | Claude |
| 1: Database | ⚪ Not Started | - | - |
| 2: Auth + Payment | ⚪ Not Started | - | - |
| 3: Course Viewing | ⚪ Not Started | - | - |
| 4: Progress Tracking | ⚪ Not Started | - | - |
| 5: Admin Panel | ⚪ Not Started | - | - |
| 6: Production Deploy | ⚪ Not Started | - | - |

**Legend:**
- 🟢 Passed
- 🟡 In Progress
- ⚪ Not Started
- 🔴 Blocked

---

## How to Use This File

**For humans:**
- Check "Quick Status View" to see overall progress
- Dive into specific gate for task breakdown
- Update checkboxes as work completes

**For AI collaborators:**
1. Read current gate status
2. Check validation test to understand "done"
3. Pick unchecked tasks
4. Update checkboxes when complete
5. Run validation test
6. Update PROGRESS.md when gate passes

**When switching AI:**
- New AI should read HANDOFF.md first
- Then check this file for current gate
- Then read gate-specific docs
