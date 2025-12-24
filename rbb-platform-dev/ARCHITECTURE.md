# RBB Platform - Architecture Documentation

**Last Updated:** 2024-12-18

---

## Executive Summary

Retiree Business Blueprint (RBB) is a custom online learning platform built for senior learners launching businesses in retirement. The platform prioritizes accessibility, simplicity, and performance over generic LMS features.

**Core Principle:** Best-in-class student experience, zero technical complexity for end users.

---

## Stack Decisions

### Frontend
**Next.js 14 (App Router) + TypeScript + Tailwind CSS**

**Why:**
- Server components = faster initial loads
- Built-in optimization (images, fonts, code splitting)
- TypeScript = catch bugs before production
- Tailwind = rapid UI development with consistent design
- Excellent accessibility support out of the box

**Alternatives considered:**
- WordPress + LearnDash: Rejected due to performance, maintenance overhead
- Kajabi/Teachable: Rejected due to limited UX customization
- Vue/Nuxt: Rejected due to smaller ecosystem for e-commerce

### Backend & Database
**Supabase (PostgreSQL)**

**Why:**
- PostgreSQL = robust relational data (courses, lessons, progress)
- Built-in auth with row-level security
- Real-time subscriptions (live progress updates)
- Generous free tier, scales easily
- Edge functions for serverless logic

**Alternatives considered:**
- Firebase: Rejected due to NoSQL complexity for hierarchical course data
- Custom Node API: Rejected due to increased maintenance

### Payment Processing
**Stripe Checkout + Webhooks**

**Why:**
- Industry standard, trusted by customers
- Handles PCI compliance
- Built-in receipt emails
- Subscription support (if needed for recurring revenue)
- Test mode for development

**Alternatives considered:**
- PayPal: Rejected due to worse UX, higher fees
- Paddle: Rejected due to less flexibility

### Video Hosting
**Vimeo Pro (or Mux as alternative)**

**Why:**
- High-quality adaptive streaming
- Privacy controls (domain-restricted embeds)
- Detailed analytics
- Captions/transcript support
- CDN delivery (fast global playback)

**Alternatives considered:**
- YouTube: Rejected due to lack of privacy, branding
- Self-hosted: Rejected due to bandwidth costs, complexity

### Email
**Resend (or SendGrid)**

**Why:**
- Simple API
- Email templates with React
- Excellent deliverability
- Affordable pricing

### Deployment
**Vercel**

**Why:**
- Built for Next.js (same company)
- Instant deploys from Git
- Automatic HTTPS
- Edge functions
- Web analytics included

---

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Vercel)                     │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Landing    │  │    Course    │  │    Admin     │  │
│  │     Pages    │  │    Portal    │  │    Panel     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                           │
│         Next.js 14 + TypeScript + Tailwind CSS           │
└─────────────────────────────────────────────────────────┘
                             │
                             │ API Calls
                             ▼
┌─────────────────────────────────────────────────────────┐
│                  BACKEND (Supabase)                      │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  PostgreSQL  │  │     Auth     │  │    Storage   │  │
│  │   Database   │  │    (JWT)     │  │   (S3-like)  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │          Edge Functions (Serverless)             │   │
│  │  - Webhook handlers                              │   │
│  │  - Enrollment logic                              │   │
│  │  - Certificate generation                        │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                             │
                             │ Webhooks
                             ▼
┌─────────────────────────────────────────────────────────┐
│               THIRD-PARTY SERVICES                       │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │    Stripe    │  │    Vimeo     │  │    Resend    │  │
│  │   Payments   │  │  Video CDN   │  │    Email     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## Database Schema (High-Level)

### Core Tables

**users**
- id (uuid, primary key)
- email (unique)
- created_at
- metadata (JSONB: name, phone, etc.)

**courses**
- id (uuid)
- title, description
- track_type ('essentials' | 'mastery')
- price_cents (integer)
- is_published (boolean)

**modules**
- id (uuid)
- course_id (foreign key)
- title, order
- is_published

**lessons**
- id (uuid)
- module_id (foreign key)
- title, description, order
- video_url (Vimeo embed)
- worksheet_url (PDF in Supabase Storage)
- duration_minutes
- prerequisites (JSONB: array of lesson IDs)

**enrollments**
- id (uuid)
- user_id (foreign key)
- course_id (foreign key)
- enrolled_at
- stripe_payment_id

**lesson_progress**
- id (uuid)
- user_id, lesson_id (composite unique)
- completed_at (nullable)
- watched_duration_seconds

**quizzes**
- id (uuid)
- lesson_id (foreign key)
- questions (JSONB)
- passing_score_percent

**quiz_attempts**
- id (uuid)
- user_id, quiz_id
- score, answers (JSONB)
- attempted_at

---

## Security Model

### Authentication
- Supabase Auth with JWT tokens
- Email/password (passwordless optional for later)
- Row-level security (RLS) on all tables
- Students can only see their own progress
- Admins have elevated permissions

### Payment Security
- Stripe handles all card data (PCI compliant)
- Webhook signature verification
- Enrollment creation only on verified payment

### Data Privacy
- GDPR compliant (Supabase EU region if needed)
- User data deletion on request
- No tracking beyond course progress

---

## Accessibility Requirements

**WCAG 2.1 Level AA minimum, AAA where possible**

- Semantic HTML throughout
- Keyboard navigation (no mouse required)
- Screen reader tested
- Color contrast ratios 7:1 (AAA)
- Large text (18px minimum, 20-22px preferred)
- Captions on all videos
- Downloadable transcripts
- Printable PDFs (large print option)
- Focus indicators
- Skip navigation links

---

## Performance Targets

- Lighthouse Score: 90+ (all categories)
- Time to Interactive (TTI): < 3s
- First Contentful Paint (FCP): < 1.5s
- Video start time: < 2s (Vimeo CDN)
- Page transitions: < 200ms

---

## Development Workflow

### Git Strategy
- `main` branch = production (auto-deploy to Vercel)
- `develop` branch = staging environment
- Feature branches: `feature/gate-2-auth`
- Pull requests required for main

### Testing Strategy
- Gate validation tests (manual checklists)
- Unit tests for critical logic (quiz scoring, progress calculation)
- E2E tests for payment flow (Playwright)
- Accessibility tests (axe-core)

### Code Standards
- TypeScript strict mode
- ESLint + Prettier
- Components in `/components` folder
- Server actions in `/app/actions`
- Database queries in `/lib/db`

---

## Deployment Strategy

### Environments

**Local Development:**
- `npm run dev`
- Supabase local via Docker (optional)
- Stripe test mode

**Staging (Vercel Preview):**
- Auto-deploys on PR to develop
- Staging Supabase project
- Stripe test mode

**Production (Vercel):**
- Auto-deploys on push to main
- Production Supabase project
- Stripe live mode
- Custom domain (rbb.com or similar)

### Environment Variables
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Email
RESEND_API_KEY=

# Vimeo (optional)
VIMEO_ACCESS_TOKEN=
```

---

## Monitoring & Analytics

### Error Tracking
- Sentry for runtime errors
- Log user context (sanitized)

### Usage Analytics
- Vercel Web Analytics (privacy-friendly)
- Custom events: course completion, quiz scores
- No third-party tracking pixels

### Performance Monitoring
- Vercel Speed Insights
- Core Web Vitals tracking

---

## Future Considerations

### Phase 2+ Features
- Mobile app (React Native)
- Offline video downloads
- Live cohort sessions (Zoom integration)
- Community forum
- Affiliate program
- Certification badges (verifiable)
- AI course assistant (ChatGPT integration)

### Scaling Considerations
- Supabase can handle 10K+ users on standard plan
- Vercel scales automatically
- Video bandwidth handled by Vimeo CDN
- Database read replicas if needed (Supabase Pro)

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2024-12-18 | Next.js over WordPress | Performance, UX control, maintainability |
| 2024-12-18 | Supabase over Firebase | Relational data better fit for courses |
| 2024-12-18 | Vimeo over self-hosted | CDN performance, lower complexity |
| 2024-12-18 | TypeScript required | Type safety critical for payment logic |

---

## Questions / Open Items

- [ ] Should we support multiple payment plans (monthly subscriptions)?
- [ ] Community forum in Phase 1 or defer to Phase 2?
- [ ] Email frequency/cadence for drip campaigns?
- [ ] Certificate design - who designs template?
